// Testy charakteryzujące dekoder .hbr2 (@hbra/replay-core, packages/replay-core, import wprost:
// bez vm, bez DOM i bez wycinania linii). Utrwalają to, co dekoder liczy na dwóch publicznych
// próbkach; niczego nie oceniają.
//
//   npm test                              porównanie z test/fixtures/<próbka>.expected.json
//   HBRA_UPDATE_FIXTURES=1 npm test       zapis nowych plików oczekiwanych z obecnego kodu
//   HBRA_RACE_REPLAY=<plik.hbr2> npm test  dodatkowo lokalna powtórka wyścigu (nigdy w repo)
'use strict';
const { describe, it, before } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

// Paczka jest modułem ES; test zostaje w CommonJS i ładuje ją przez import().
let core;
const loadCore = async () => (core ??= await import('@hbra/replay-core'));

const FIXTURES = path.join(__dirname, 'fixtures');
const SAMPLES = ['2020-05-07', 'HBReplay-2020-04-02-23h11m'];
const POSITIONS_EVERY = 3600; // 60 s gry (60 ticków na sekundę)
const UPDATE = process.env.HBRA_UPDATE_FIXTURES === '1';

const TEAM_STATS = ['shotsRed', 'shotsBlue', 'passesRed', 'passesBlue', 'kicksRed', 'kicksBlue', 'possRed', 'possBlue', 'thirds'];

// Wynik analizy w postaci do zapisu w JSON: wszystko, co liczy dekoder (bez czatu),
// stadion skrócony do nazwy, wymiarów i skrótu SHA-256 jego pełnego JSON-a.
function summarize(r) {
  const matches = r.matches.map((m, i) => {
    const { stadium, gameTicks, scoreRed, scoreBlue, goals, redTeam, blueTeam, player, ...rest } = m;
    return {
      stadium: stadium
        ? { name: stadium.name, width: stadium.width, height: stadium.height, sha256: crypto.createHash('sha256').update(JSON.stringify(stadium)).digest('hex') }
        : stadium,
      time: core.parseTime(gameTicks),
      gameTicks,
      scoreRed,
      scoreBlue,
      goals: goals.map((g, j) => {
        const at = r.goalTimes.find((t) => t.match === i && t.goal === j);
        return { ...g, at: at ? { time: at.time, gameTicks: at.gameTicks, replayTick: at.replayTick } : null };
      }),
      redTeam,
      blueTeam,
      player,
      ...rest,
    };
  });
  // przez JSON, żeby porównywać dokładnie to, co jest w pliku (bez undefined, -0 itp.)
  return JSON.parse(JSON.stringify({
    statsVersion: r.statsVersion,
    header: r.header,
    totalFrames: r.totalFrames,
    markers: r.markers,
    initialState: r.initialState,
    events: r.events,
    eventsByClass: r.eventsByClass,
    ticks: r.ticks,
    matches,
    positionsEvery: POSITIONS_EVERY,
    positions: r.positions,
    playerList: r.playerList,
    playerPos: summarizePlayerPos(r.playerPos),
  }));
}

// Dane do heatmap są duże (pozycja każdego gracza w każdym ticku), więc w pliku
// oczekiwanym tylko skrót: liczba meczów, długości list i SHA-256 całości w JSON.
function summarizePlayerPos(playerPos) {
  return {
    matches: playerPos.length,
    lengths: playerPos.map((m) => m.map((list) => (list ? list.length : null))),
    sha256: crypto.createHash('sha256').update(JSON.stringify(playerPos)).digest('hex'),
  };
}

// Reguły prawdziwe dla każdej powtórki (B-18), niezależne od plików oczekiwanych. Zwraca listę
// naruszeń; pusta = w porządku. Działa też na prywatnych powtórkach (HBRA_RACE_REPLAY).
function invariantErrors(r) {
  const errors = [];
  const names = new Set(r.playerList);
  if (names.size !== r.playerList.length) errors.push('playerList ma powtórzone nazwy');
  r.matches.forEach((m, i) => {
    const at = `mecz ${i + 1}`;
    const team = { Red: m.redTeam, Blue: m.blueTeam };
    if (m.goals.length !== m.scoreRed + m.scoreBlue) errors.push(`${at}: goli ${m.goals.length}, wynik ${m.scoreRed}:${m.scoreBlue}`);
    if (m.goals.filter((g) => g.for === 'Red').length !== m.scoreRed) errors.push(`${at}: gole Red nie zgadzają się z wynikiem`);
    for (const p of m.player) if (!names.has(p.nick)) errors.push(`${at}: gracz ${p.nick} spoza playerList`);
    m.goals.forEach((g, j) => {
      if (g.scorer === null || g.scorer.endsWith(' (own goal)')) return;
      if (!team[g.for].includes(g.scorer)) errors.push(`${at}, gol ${j + 1}: strzelec spoza drużyny ${g.for}`);
      if (g.assist && !m.spaceMode && !team[g.for].includes(g.assist.player)) errors.push(`${at}, gol ${j + 1}: asystent spoza drużyny ${g.for}`);
    });
    if (m.passesRed + m.passesBlue !== m.passes.length) errors.push(`${at}: passesRed + passesBlue != passes.length`);
    if (m.passes.length > m.kicks.length) errors.push(`${at}: więcej podań niż kopnięć`);
    if (m.shotsRed + m.shotsBlue !== m.shots.length) errors.push(`${at}: shotsRed + shotsBlue != shots.length`);
    if (m.shots.length > m.kicks.length) errors.push(`${at}: więcej strzałów niż kopnięć`);
    if (m.stadium) {
      // TD-048: celny strzał kończy się na linii bramki drużyny przeciwnej do strzelca
      m.shots.forEach((s, j) => {
        const shooter = m.redTeam.includes(s.player) ? 'red' : m.blueTeam.includes(s.player) ? 'blue' : null;
        const onLine = m.stadium.goals.some((g) => g.team !== shooter && distanceToSegment(s.to, g.p0, g.p1) < 1e-6);
        if (shooter && !onLine) errors.push(`${at}, strzał ${j + 1}: koniec poza linią bramki rywala`);
      });
    }
    if (!m.spaceMode) {
      m.passes.forEach((p, j) => {
        // TD-044: podanie ma oba końce i zaczyna się kopnięciem podającego w tym samym meczu
        if (!p.lastShot || !p.shot) errors.push(`${at}, podanie ${j + 1}: brak początku albo końca`);
        else if (p.lastShot.player !== p.player) errors.push(`${at}, podanie ${j + 1}: początek od innego gracza`);
      });
      if (m.kicks.length === 0 && m.possRed + m.possBlue > 0) errors.push(`${at}: posiadanie bez kopnięcia`);
    }
    if (m.possRed + m.possBlue > m.gameTicks + 1) errors.push(`${at}: posiadanie dłuższe niż mecz`);
  });
  return errors;
}

function distanceToSegment(pt, [x0, y0], [x1, y1]) {
  const ex = x1 - x0, ey = y1 - y0;
  const t = Math.max(0, Math.min(1, ((pt.x - x0) * ex + (pt.y - y0) * ey) / (ex * ex + ey * ey)));
  return Math.hypot(pt.x - (x0 + t * ex), pt.y - (y0 + t * ey));
}

function pick(obj, keys) {
  return Object.fromEntries(keys.map((k) => [k, obj[k]]));
}

for (const name of SAMPLES) {
  describe(name, () => {
    const replayFile = path.join(FIXTURES, name + '.hbr2');
    const expectedFile = path.join(FIXTURES, name + '.expected.json');
    let raw;
    let actual;
    let expected;

    before(async () => {
      const { analyzeReplay } = await loadCore();
      raw = analyzeReplay(fs.readFileSync(replayFile), { positionsEvery: POSITIONS_EVERY });
      actual = summarize(raw);
      if (UPDATE) fs.writeFileSync(expectedFile, JSON.stringify(actual, null, 1) + '\n');
      expected = JSON.parse(fs.readFileSync(expectedFile, 'utf8'));
    });

    it('nagłówek, znaczniki i zdarzenia', () => {
      const keys = ['header', 'totalFrames', 'markers', 'initialState', 'events', 'eventsByClass', 'ticks'];
      assert.deepEqual(pick(actual, keys), pick(expected, keys));
    });

    it('liczba meczów', () => {
      assert.equal(actual.matches.length, expected.matches.length);
    });

    it('wynik i czas każdego meczu', () => {
      const keys = ['time', 'gameTicks', 'scoreRed', 'scoreBlue'];
      assert.deepEqual(actual.matches.map((m) => pick(m, keys)), expected.matches.map((m) => pick(m, keys)));
    });

    it('gole (strzelec, drużyna, asysta, czas, pozycja piłki)', () => {
      assert.deepEqual(actual.matches.map((m) => m.goals), expected.matches.map((m) => m.goals));
    });

    it('składy i statystyki graczy', () => {
      const keys = ['redTeam', 'blueTeam', 'player'];
      assert.deepEqual(actual.matches.map((m) => pick(m, keys)), expected.matches.map((m) => pick(m, keys)));
    });

    it('statystyki drużyn (strzały, podania, kopnięcia, posiadanie, tercje)', () => {
      assert.deepEqual(actual.matches.map((m) => pick(m, TEAM_STATS)), expected.matches.map((m) => pick(m, TEAM_STATS)));
    });

    it('lista kopnięć, strzałów i podań', () => {
      const keys = ['kicks', 'shots', 'passes'];
      assert.deepEqual(actual.matches.map((m) => pick(m, keys)), expected.matches.map((m) => pick(m, keys)));
    });

    it('pozycje piłki i graczy co 60 s (fizyka)', () => {
      assert.deepEqual(actual.positions, expected.positions);
    });

    it('lista graczy i pozycje do heatmap (playerList, skrót playerPos)', () => {
      assert.deepEqual(pick(actual, ['playerList', 'playerPos']), pick(expected, ['playerList', 'playerPos']));
    });

    it('cały wynik (pozostałe pola: stadion, flagi, touches, changes)', () => {
      assert.deepEqual(actual, expected);
    });

    it('niezmienniki statystyk', () => {
      assert.deepEqual(invariantErrors(raw), []);
    });
  });
}

const race = process.env.HBRA_RACE_REPLAY;
describe('powtórka wyścigu (lokalnie)', () => {
  it('analiza do końca, czas gry 26:45', { skip: race ? false : 'brak zmiennej HBRA_RACE_REPLAY ze ścieżką do pliku' }, async (t) => {
    const { analyzeReplay, parseTime } = await loadCore();
    const t0 = performance.now();
    const r = analyzeReplay(fs.readFileSync(race));
    const seconds = (performance.now() - t0) / 1000;
    const longest = r.matches.reduce((a, b) => (b.gameTicks > a.gameTicks ? b : a));
    t.diagnostic(`czas analizy: ${seconds.toFixed(1)} s (symulacja ${(r.simulateMs / 1000).toFixed(1)} s), ticki: ${r.ticks}, zdarzenia: ${r.events}, mecze: ${r.matches.length}`);
    assert.equal(parseTime(longest.gameTicks), '26:45');
    assert.deepEqual(invariantErrors(r), []);
  });

  it('statystyki nie zmieniają fizyki: pozycje jak w symulacji bez statystyk (TD-053)', { skip: race ? false : 'brak zmiennej HBRA_RACE_REPLAY ze ścieżką do pliku' }, async () => {
    const { analyzeReplay } = await loadCore();
    const bytes = fs.readFileSync(race);
    const r = analyzeReplay(bytes, { positionsEvery: POSITIONS_EVERY });
    assert.equal(firstPositionDifference(r.positions, await simulatePositions(bytes, POSITIONS_EVERY)), null);
  });
});

// Symulacja powtórki bez statystyk (pętla jak w analyzeReplay i w odtwarzaczu), pozycje piłki i graczy
// co `every` ticków w postaci r.positions. `listener`: słuchacz statystyk podpięty do pokoju (opcjonalnie).
async function simulatePositions(bytes, every, listener) {
  const { Jb, fa, kc } = await import('@hbra/replay-core/haxball');
  kc.fj();
  const rep = new Jb(new Uint8Array(bytes), new fa(), 3);
  if (listener) rep.T.statsListener = listener;
  const positions = [];
  while (rep.Y < rep.mf) {
    while (rep.gg != null && rep.hg === rep.Y) {
      rep.gg.apply(rep.T);
      rep.Dl();
    }
    rep.Y++;
    rep.T.C(1);
    if (rep.Y % every === 0) {
      const game = rep.T.K;
      const ball = game && game.ta && game.ta.F && game.ta.F[0] && game.ta.F[0].a ? [game.ta.F[0].a.x, game.ta.F[0].a.y] : null;
      const players = rep.T.I.filter((p) => p.H).map((p) => [p.V, p.H.a.x, p.H.a.y]);
      positions.push({ tick: rep.Y, ball, players });
    }
  }
  return positions;
}

// Pierwsza różnica dwóch list pozycji (null = równe). assert.deepEqual na tak dużych listach przy
// różnicy buduje ogromny opis i kończy się brakiem pamięci, więc porównujemy próbka po próbce.
function firstPositionDifference(a, b) {
  if (a.length !== b.length) return `liczba próbek ${a.length} zamiast ${b.length}`;
  for (let i = 0; i < a.length; i++) {
    if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) return `tick ${b[i].tick}: ${JSON.stringify(a[i]).slice(0, 300)} zamiast ${JSON.stringify(b[i]).slice(0, 300)}`;
  }
  return null;
}

// TD-053: wynik słuchacza statystyk nie może zmienić przebiegu gry. Dawniej `false` z onPlayingTick
// (mapa bez dwóch bramek, np. wyścig) przerywał tick w O.C i analiza liczyła inną grę niż odtwarzacz.
describe('statystyki nie zmieniają fizyki (TD-053)', () => {
  for (const name of SAMPLES) {
    it(`${name}: pozycje z analizy jak bez statystyk`, async () => {
      const { analyzeReplay } = await loadCore();
      const bytes = fs.readFileSync(path.join(FIXTURES, name + '.hbr2'));
      const r = analyzeReplay(bytes, { positionsEvery: 60 });
      assert.equal(firstPositionDifference(r.positions, await simulatePositions(bytes, 60)), null);
    });
  }

  it('słuchacz zwracający false nie przerywa ticku', async () => {
    const bytes = fs.readFileSync(path.join(FIXTURES, SAMPLES[0] + '.hbr2'));
    // false tylko w pierwszym ticku gry, jak dawny football.js na mapie bez dwóch bramek
    let first = true;
    const hostile = { beforeTick() {}, onKick() {}, onPlayingTick: () => (first ? ((first = false), false) : undefined) };
    assert.equal(firstPositionDifference(await simulatePositions(bytes, 60, hostile), await simulatePositions(bytes, 60)), null);
  });
});

// Przypadki, których nie ma w próbkach (TD-046, TD-047): słuchacz statystyk na atrapie pokoju.
// Atrapa ma tylko pola, które czyta football.js: I (gracze: V id, w nick, ea.w drużyna), K (gra).
describe('statystyki na atrapie pokoju', () => {
  function fakeRoom(players) {
    const room = { I: players };
    room.K = { Ma: room, ta: { F: [{ a: { x: 12, y: -3 } }] } };
    return room;
  }
  const red = { w: 'Red' };
  const blue = { w: 'Blue' };
  const kick = { x: 0, y: 0, vx: 1, vy: 0 };

  it('TD-046: gol przed pierwszym kopnięciem nie przerywa analizy, strzelec nieznany', async () => {
    const { createFootballStats } = await loadCore();
    const stats = createFootballStats();
    const room = fakeRoom([{ V: 1, w: 'a', ea: red }]);
    stats.attach(room);
    stats.beforeTick({ Ma: room });
    room.Ni(red);
    stats.detach();
    const [goal] = stats.match[0].goals;
    assert.equal(goal.scorer, null);
    assert.equal(goal.assist, false);
    assert.equal(goal.for, 'Red');
    assert.deepEqual(goal.ballCoord, { x: 12, y: -3 });
    assert.equal(stats.match[0].scoreRed, 1);
  });

  it('TD-047: ten sam nick naraz = dwa wpisy, ponowne wejście łączy się po nicku', async () => {
    const { createFootballStats } = await loadCore();
    const stats = createFootballStats();
    const p1 = { V: 1, w: 'same', ea: red };
    const p2 = { V: 2, w: 'same', ea: blue };
    const room = fakeRoom([p1, p2]);
    stats.attach(room);
    stats.beforeTick({ Ma: room });
    assert.deepEqual(stats.playerList, ['same', 'same (2)']);
    stats.onKick(p1, kick);
    stats.onKick(p2, kick);
    // p1 wychodzi, wraca z nowym id, gdy p2 ("same (2)") jest w pokoju
    const p3 = { V: 3, w: 'same', ea: red };
    room.I = [p2, p3];
    room.tl(p3);
    stats.onKick(p3, kick);
    stats.detach();
    assert.deepEqual(stats.playerList, ['same', 'same (2)']);
    assert.deepEqual(stats.match[0].kicks.map((k) => k.player), ['same', 'same (2)', 'same']);
    assert.deepEqual(stats.match[0].player.map((p) => p.nick), ['same', 'same (2)']);
  });

  it('TD-044: podanie i asysta nie przechodzą przez gola ani na nowy mecz', async () => {
    const { createFootballStats } = await loadCore();
    const stats = createFootballStats();
    const a = { V: 1, w: 'a', ea: red };
    const b = { V: 2, w: 'b', ea: red };
    const room = fakeRoom([a, b]);
    stats.attach(room);
    stats.beforeTick({ Ma: room });
    stats.onKick(a, kick);
    room.Ni(red); // a strzela
    room.lq(); // wznowienie po golu
    stats.onKick(b, kick);
    room.Ni(red); // b strzela bez asysty a
    room.vf(null); // koniec gry
    room.Ki(); // nowy mecz
    stats.onKick(a, kick);
    stats.detach();
    const [m1, m2] = stats.match;
    assert.deepEqual(m1.goals.map((g) => [g.scorer, g.assist]), [['a', false], ['b', false]]);
    assert.equal(m1.passes.length, 0);
    assert.equal(m2.passes.length, 0);
  });
});

// Celny strzał (TD-048): lot swobodny piłki z jej tłumieniem i grawitacją, na każdą bramkę rywala.
// Obie próbki mają tłumienie 0,99 i bramki po bokach, więc te przypadki są tylko tutaj.
describe('celny strzał (shotTarget)', () => {
  const free = { damping: 0.99, gx: 0, gy: 0 };
  const right = { x0: 450, y0: -80, x1: 450, y1: 80, team: 'Blue' }; // bramka Blue po prawej
  const left = { x0: -450, y0: -80, x1: -450, y1: 80, team: 'Red' };

  it('zasięg zależy od tłumienia piłki (dawniej stała 99.762 dla każdego stadionu)', async () => {
    const { shotTarget } = await loadCore();
    const ball = { x: 0, y: 0, vx: 5, vy: 0 }; // zasięg 5 / (1 - tłumienie): 500 px przy 0,99, 250 px przy 0,98
    assert.deepEqual(shotTarget(ball, free, [left, right], 'Red'), { x: 450, y: 0 });
    assert.equal(shotTarget(ball, { damping: 0.98, gx: 0, gy: 0 }, [left, right], 'Red'), null);
  });

  it('tylko bramka rywala: kopnięcie we własną bramkę nie jest strzałem', async () => {
    const { shotTarget } = await loadCore();
    const ball = { x: 0, y: 0, vx: 10, vy: 0 };
    assert.equal(shotTarget(ball, free, [left, right], 'Blue'), null);
    assert.deepEqual(shotTarget({ ...ball, vx: -10 }, free, [left, right], 'Blue'), { x: -450, y: 0 });
  });

  it('bramki u góry i u dołu, kilka bramek jednej drużyny', async () => {
    const { shotTarget } = await loadCore();
    const top = { x0: -50, y0: -300, x1: 50, y1: -300, team: 'Blue' };
    const bottom = { x0: -50, y0: 300, x1: 50, y1: 300, team: 'Blue' };
    assert.deepEqual(shotTarget({ x: 0, y: 0, vx: 0, vy: -10 }, free, [top, bottom], 'Red'), { x: 0, y: -300 });
    assert.deepEqual(shotTarget({ x: 0, y: 0, vx: 0, vy: 10 }, free, [top, bottom], 'Red'), { x: 0, y: 300 });
    assert.equal(shotTarget({ x: 0, y: 0, vx: 10, vy: 0 }, free, [top, bottom], 'Red'), null);
  });

  it('grawitacja piłki zakrzywia tor', async () => {
    const { shotTarget } = await loadCore();
    const ball = { x: 0, y: 0, vx: 10, vy: 0 };
    assert.deepEqual(shotTarget(ball, free, [right], 'Red'), { x: 450, y: 0 });
    assert.equal(shotTarget(ball, { damping: 0.99, gx: 0, gy: 0.5 }, [right], 'Red'), null);
  });

  it('statystyki biorą tłumienie z kopniętego dysku i bramki ze stadionu gry', async () => {
    const { createFootballStats } = await loadCore();
    const stats = createFootballStats();
    const a = { V: 1, w: 'a', ea: { w: 'Red' } };
    const room = { I: [a] };
    const stadium = { tc: [{ W: { x: 450, y: -80 }, ca: { x: 450, y: 80 }, qe: { w: 'Blue' } }] };
    stats.attach(room);
    stats.beforeTick({ Ma: room, S: stadium });
    const ball = { x: 0, y: 10, vx: 5, vy: 0 };
    stats.onKick(a, ball, { Ca: 0.98, oa: { x: 0, y: 0 } });
    stats.onKick(a, ball, { Ca: 0.99, oa: { x: 0, y: 0 } });
    stats.detach();
    const [m] = stats.match;
    assert.equal(m.shotsRed, 1);
    assert.deepEqual(m.shots, [{ player: 'a', from: { x: 0, y: 10 }, to: { x: 450, y: 10 } }]);
  });
});

// Pasek „Analyzing...” (TD-041): raporty rosną, ostatni to dokładnie 1, także gdy liczba ticków
// nie dzieli się przez progressEvery; przy podzielnej 1 nie przychodzi dwa razy.
describe('postęp analizy (onProgress)', () => {
  for (const name of SAMPLES) {
    it(`${name}: raporty rosnące, ostatni = 1`, async () => {
      const { analyzeReplay } = await loadCore();
      const bytes = fs.readFileSync(path.join(FIXTURES, `${name}.hbr2`));
      const seen = [];
      const r = analyzeReplay(bytes, { progressEvery: 1000, onProgress: (v) => seen.push(v) });
      assert.ok(seen.length >= 2);
      for (let i = 1; i < seen.length; i++) assert.ok(seen[i] > seen[i - 1], `raport ${i}: ${seen[i]} po ${seen[i - 1]}`);
      assert.equal(seen[seen.length - 1], 1);
      // podzielna liczba ticków: 1 tylko raz
      const once = [];
      analyzeReplay(bytes, { progressEvery: r.ticks, onProgress: (v) => once.push(v) });
      assert.deepEqual(once, [1]);
    });
  }
});

// Plik .hbr2: "HBR2", wersja 3, długość w tickach, reszta to strumień deflate (raw).
function replayWith(totalFrames, compressed) {
  const head = Buffer.alloc(12);
  head.write('HBR2', 0, 'latin1');
  head.writeUInt32BE(3, 4);
  head.writeUInt32BE(totalFrames, 8);
  return Buffer.concat([head, Buffer.from(compressed)]);
}

describe('limity analizy (TD-042, TD-043)', () => {
  const name = '2020-05-07';
  let bytes;
  before(() => { bytes = fs.readFileSync(path.join(FIXTURES, `${name}.hbr2`)); });

  it('domyślne limity mają zapas: 12 h gry, 128 MiB po rozpakowaniu', async () => {
    const { DEFAULT_LIMITS } = await loadCore();
    assert.equal(DEFAULT_LIMITS.maxTicks, 2592000);
    assert.equal(DEFAULT_LIMITS.maxInflatedBytes, 128 * 1024 * 1024);
  });

  it('maxTicks: za długi nagłówek = replay_too_long przed rozpakowaniem', async () => {
    const { analyzeReplay } = await loadCore();
    const ticks = bytes.readUInt32BE(8);
    assert.throws(() => analyzeReplay(bytes, { maxTicks: ticks - 1 }),
      (e) => e.code === 'replay_too_long' && e.limit === ticks - 1 && e.value === ticks);
    // równo limit przechodzi; bez symulacji długość nie ma znaczenia
    assert.equal(analyzeReplay(bytes, { maxTicks: ticks }).ticks, ticks);
    assert.equal(analyzeReplay(bytes, { maxTicks: 1, simulate: false }).totalFrames, ticks);
  });

  it('maxTicks: nagłówek 2^32 − 1 odrzucony od razu z domyślnym limitem', async () => {
    const { analyzeReplay } = await loadCore();
    const evil = Buffer.from(bytes);
    evil.writeUInt32BE(0xffffffff, 8);
    const t0 = performance.now();
    assert.throws(() => analyzeReplay(evil), (e) => e.code === 'replay_too_long' && e.value === 0xffffffff);
    assert.ok(performance.now() - t0 < 1000);
  });

  it('maxInflatedBytes: za mało = replay_too_large z wartością limitu', async () => {
    const { analyzeReplay } = await loadCore();
    assert.throws(() => analyzeReplay(bytes, { maxInflatedBytes: 1000 }),
      (e) => e.code === 'replay_too_large' && e.limit === 1000);
    // limit sprawdzany też bez symulacji (rozpakowanie jest w konstruktorze Jb)
    assert.throws(() => analyzeReplay(bytes, { maxInflatedBytes: 1000, simulate: false }), (e) => e.code === 'replay_too_large');
  });

  it('maxInflatedBytes: bomba (16 MiB zer w ok. 16 KB) przerwana po limicie', async () => {
    const { analyzeReplay } = await loadCore();
    const pako = require('pako');
    const bomb = replayWith(100, pako.deflateRaw(new Uint8Array(16 * 1024 * 1024)));
    assert.ok(bomb.length < 64 * 1024, `bomba ma ${bomb.length} B`);
    assert.throws(() => analyzeReplay(bomb, { maxInflatedBytes: 1024 * 1024 }),
      (e) => e.code === 'replay_too_large' && e.limit === 1024 * 1024);
  });

  it('limit nie zmienia wyniku i nie zostaje po analizie (odtwarzacz rozpakowuje bez limitu)', async () => {
    const { analyzeReplay } = await loadCore();
    const { setInflateBudget } = await import('@hbra/replay-core/haxball');
    const free = analyzeReplay(bytes, { maxTicks: Infinity, maxInflatedBytes: Infinity });
    const limited = analyzeReplay(bytes);
    assert.deepEqual(summarize(limited), summarize(free));
    assert.throws(() => analyzeReplay(bytes, { maxInflatedBytes: 1000 }));
    const left = setInflateBudget(Infinity);
    assert.equal(left, Infinity);
  });
});

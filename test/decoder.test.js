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

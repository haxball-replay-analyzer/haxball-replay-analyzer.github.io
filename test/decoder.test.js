// Testy charakteryzujące dekoder .hbr2 (src/game2.js uruchamiany przez scripts/probe-node.js).
// Utrwalają to, co dekoder liczy dziś na dwóch publicznych próbkach; niczego nie oceniają.
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
const { analyzeReplay } = require('../scripts/probe-node.js');

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
      time: r.parseTime(gameTicks),
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

function pick(obj, keys) {
  return Object.fromEntries(keys.map((k) => [k, obj[k]]));
}

for (const name of SAMPLES) {
  describe(name, () => {
    const replayFile = path.join(FIXTURES, name + '.hbr2');
    const expectedFile = path.join(FIXTURES, name + '.expected.json');
    let actual;
    let expected;

    before(() => {
      actual = summarize(analyzeReplay(fs.readFileSync(replayFile), { simulate: true, positionsEvery: POSITIONS_EVERY }));
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
  });
}

const race = process.env.HBRA_RACE_REPLAY;
describe('powtórka wyścigu (lokalnie)', () => {
  it('analiza do końca, czas gry 26:45', { skip: race ? false : 'brak zmiennej HBRA_RACE_REPLAY ze ścieżką do pliku' }, (t) => {
    const t0 = performance.now();
    const r = analyzeReplay(fs.readFileSync(race), { simulate: true });
    const seconds = (performance.now() - t0) / 1000;
    const longest = r.matches.reduce((a, b) => (b.gameTicks > a.gameTicks ? b : a));
    t.diagnostic(`czas analizy: ${seconds.toFixed(1)} s (symulacja ${(r.simulateMs / 1000).toFixed(1)} s), ticki: ${r.ticks}, zdarzenia: ${r.events}, mecze: ${r.matches.length}`);
    assert.equal(r.parseTime(longest.gameTicks), '26:45');
  });
});

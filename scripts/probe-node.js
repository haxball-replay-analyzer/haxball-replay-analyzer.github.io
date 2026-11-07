// Dekoder .hbr2 z src/game2.js uruchamiany w Node bez DOM (vm + atrapy), bez zmian w src/.
// To nie jest kod produkcyjny: wycina z game2.js importy i IIFE Modernizra (szuka ich po treści
// linii, rzuca błąd, gdy ich nie ma). pako bierze z npm, tak jak import w game2.js.
// Start UI (u.qp) siedzi w eksporcie startApp(), którego tu nikt nie woła.
//
// Jako moduł (testy w test/decoder.test.js):
//   const { analyzeReplay } = require('./scripts/probe-node.js');
//   analyzeReplay(buffer, { simulate: true, positionsEvery: 3600 })
//
// Z wiersza poleceń (z rootu repo):
//   node scripts/probe-node.js src/game2.js src/vendor/pako-jszip.min.js <plik.hbr2> [--simulate] [--positions=60]
// (drugi argument zostaje dla zgodności i jest pomijany: pako jest z npm)
// Z --simulate zapisuje <plik.hbr2>.stats.json obok powtórki: trzymaj powtórki poza repo (nicki, czat).
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DEFAULT_GAME2 = path.join(__dirname, '..', 'src', 'game2.js');

// Tekst game2.js gotowy do vm: bez importów i Modernizra, eksporty jako zwykłe funkcje.
function prepareGame2Source(text) {
  const lines = text.split('\n');
  const find = (re, what) => {
    const i = lines.findIndex((l) => re.test(l));
    if (i < 0) throw new Error(`probe-node: w game2.js nie ma ${what} (zmienił się układ pliku, popraw scripts/probe-node.js)`);
    return i;
  };
  const modernizrStart = find(/^!function \(e, n, t\) \{/, 'początku IIFE Modernizra');
  const modernizrEnd = find(/^\}\(window, document\);/, 'końca IIFE Modernizra');
  if (modernizrEnd < modernizrStart) throw new Error('probe-node: koniec IIFE Modernizra przed początkiem');
  if (lines.some((l) => /^u\.qp\(\)/.test(l))) {
    throw new Error('probe-node: game2.js znowu startuje UI przy imporcie (u.qp() na najwyższym poziomie)');
  }
  let src = lines.map((l, i) => {
    if (/^import /.test(l)) return '';
    if (i >= modernizrStart && i <= modernizrEnd) return '';
    return l.replace(/^export function /, 'function ');
  }).join('\n');
  src += '\n;kc.fj();globalThis.__hbra = { analyzeReplay, parseTime };';
  return src;
}

const noop = () => {};
const fakeEl = () => new Proxy(function () {}, { get: (t, k) => (k === Symbol.toPrimitive ? () => '' : fakeEl()), apply: () => fakeEl(), construct: () => fakeEl(), set: () => true });

// Świeża piaskownica na każdą powtórkę: stan statystyk w game2.js to zmienne modułu.
function loadDecoder({ game2Path = DEFAULT_GAME2, log = noop } = {}) {
  const sandbox = {
    console, Math, Date, JSON, Error, TypeError, RangeError, Promise, Map, Set, WeakMap, Symbol, Proxy,
    ArrayBuffer, DataView, Uint8Array, Int8Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array,
    TextEncoder, TextDecoder, setTimeout, clearTimeout, setInterval, clearInterval,
    performance,
    pako: require('pako'), // w game2.js: import pako from 'pako'
    $: fakeEl(),
    document: fakeEl(),
    navigator: { userAgent: 'node' },
    localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
  };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);

  const t0 = performance.now();
  vm.runInContext(prepareGame2Source(fs.readFileSync(game2Path, 'utf8')), sandbox, { filename: 'game2.js' });
  vm.runInContext("configureReplayer({ onUpload: function () { throw new Error('onUpload (wysyłka na serwer) wywołane w próbie!'); } });", sandbox);
  log('game2.js evaluated in', Math.round(performance.now() - t0), 'ms');
  return { sandbox, H: sandbox.__hbra };
}

// Analiza jednej powtórki: analyzeReplay() z game2.js w świeżej piaskownicy vm.
//   buffer: Buffer / Uint8Array z plikiem .hbr2
//   simulate: odtwórz powtórkę do końca i policz statystyki (domyślnie false, jak dawniej)
//   positionsEvery: co ile ticków zapisać pozycje piłki i graczy (0 = wcale; wymaga simulate)
// Zwraca wynik analyzeReplay (header, totalFrames, markers, initialState, events, eventsByClass,
// przy simulate także ticks, simulateMs, matches, goalTimes, positions, playersAtEnd, playerList,
// playerPos, playerEntries) i parseTime (funkcja z game2.js, ticki -> m:ss).
function analyzeReplay(buffer, { simulate = false, positionsEvery = 0, game2Path, log = noop } = {}) {
  const { H } = loadDecoder({ game2Path, log });
  const r = H.analyzeReplay(buffer, { simulate, positionsEvery });
  log('HEADER', r.header, 'events', r.events, r.eventsByClass);
  if (simulate) {
    log('simulated', r.ticks, 'ticks in', Math.round(r.simulateMs), 'ms');
    log('matches:', r.matches.length, r.matches.map((x) => ({ stadium: x.stadium && x.stadium.name, ticks: x.gameTicks, score: x.scoreRed + ':' + x.scoreBlue, goals: x.goals.length, kicks: x.kicks.length, passes: x.passes.length, red: x.redTeam.length, blue: x.blueTeam.length })));
  }
  return Object.assign(r, { parseTime: H.parseTime });
}

module.exports = { analyzeReplay };

if (require.main === module) {
  const [game2Path, , replayPath] = process.argv.slice(2);
  const simulate = process.argv.includes('--simulate');
  // --positions=<N>: co N ticków zapisz pozycje dysków graczy [id, x, y] (próba JSON-a dla wyścigów)
  const posArg = process.argv.find((a) => a.startsWith('--positions='));
  const every = posArg ? +posArg.split('=')[1] : 0;
  const r = analyzeReplay(fs.readFileSync(replayPath), { simulate, positionsEvery: simulate ? every : 0, game2Path, log: console.log });
  if (simulate) {
    if (every) {
      const out = replayPath + '.positions-' + every + '.json';
      const samples = r.positions.map((s) => [s.tick, s.players.map(([id, x, y]) => [id, Math.round(x), Math.round(y)])]);
      fs.writeFileSync(out, JSON.stringify({ header: r.header, everyTicks: every, players: r.playersAtEnd, samples }));
      console.log('positions JSON written:', out, fs.statSync(out).size, 'bytes,', samples.length, 'samples');
    }
    fs.writeFileSync(replayPath + '.stats.json', JSON.stringify({ header: r.header, match: r.matches }, null, 1));
    console.log('stats JSON written:', replayPath + '.stats.json');
  }
}

// Dekoder .hbr2 z src/game2.js uruchamiany w Node bez DOM (vm + atrapy), bez zmian w src/.
// To nie jest kod produkcyjny: tnie game2.js po numerach linii (importy 18-21, Modernizr 135-408,
// ostatnie u.qp()) i sprawdza, że te zakresy dalej tam są; po zmianie game2.js trzeba je poprawić.
//
// Jako moduł (testy w test/decoder.test.js):
//   const { analyzeReplay } = require('./scripts/probe-node.js');
//   analyzeReplay(buffer, { simulate: true, positionsEvery: 3600 })
//
// Z wiersza poleceń (z rootu repo):
//   node scripts/probe-node.js src/game2.js src/vendor/pako-jszip.min.js <plik.hbr2> [--simulate] [--positions=60]
// Z --simulate zapisuje <plik.hbr2>.stats.json obok powtórki: trzymaj powtórki poza repo (nicki, czat).
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DEFAULT_GAME2 = path.join(__dirname, '..', 'src', 'game2.js');
const DEFAULT_PAKO = path.join(__dirname, '..', 'src', 'vendor', 'pako-jszip.min.js');

// Nagłówek bez game2.js (big endian, wg wiki).
function readHeader(buf) {
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const magic = dv.getUint32(0);
  return {
    magic: '0x' + magic.toString(16) + ' (' + Buffer.from(buf.subarray(0, 4)).toString('latin1') + ')',
    version: dv.getUint32(4),
    totalFrames: dv.getUint32(8),
    bytes: buf.length,
  };
}

// Tekst game2.js gotowy do vm: bez importów, Modernizra i startu UI, eksporty jako zwykłe funkcje.
function prepareGame2Source(text) {
  const lines = text.split('\n');
  const expect = (n, re, what) => {
    if (!re.test(lines[n - 1] || '')) {
      throw new Error(`probe-node: linia ${n} game2.js to nie ${what} (zmienił się układ pliku, popraw zakresy w scripts/probe-node.js)`);
    }
  };
  for (let n = 18; n <= 21; n++) expect(n, /^import /, 'import');
  expect(135, /^!function \(e, n, t\) \{/, 'początek IIFE Modernizra');
  expect(408, /^\}\(window, document\);/, 'koniec IIFE Modernizra');
  let src = lines.map((l, i) => {
    const n = i + 1;
    if (n >= 18 && n <= 21) return '';
    if (n >= 135 && n <= 408) return '';
    if (/^u\.qp\(\)\s*$/.test(l)) return '';
    return l.replace(/^export function /, 'function ');
  }).join('\n');
  src += '\n;kc.fj();globalThis.__hbra = { Jb, fa, F, V, O, m, parseTime, getMatch: () => match, getPlayerList: () => playerList, getPlayerPos: () => playerPos, getGoals: () => goals, getLoading: () => loading };';
  return src;
}

const noop = () => {};
const fakeEl = () => new Proxy(function () {}, { get: (t, k) => (k === Symbol.toPrimitive ? () => '' : fakeEl()), apply: () => fakeEl(), construct: () => fakeEl(), set: () => true });

// Świeża piaskownica na każdą powtórkę: stan statystyk w game2.js to zmienne modułu.
function loadDecoder({ game2Path = DEFAULT_GAME2, pakoPath = DEFAULT_PAKO, log = noop } = {}) {
  const sandbox = {
    console, Math, Date, JSON, Error, TypeError, RangeError, Promise, Map, Set, WeakMap, Symbol, Proxy,
    ArrayBuffer, DataView, Uint8Array, Int8Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array,
    TextEncoder, TextDecoder, setTimeout, clearTimeout, setInterval, clearInterval,
    performance,
    // eksporty z Home.js / Modal.js, które game2.js importuje
    showStats: noop, setGameStats: (m) => { sandbox.__stats = m; }, dispatchPlayerList: noop, dispatchPlayerPos: noop,
    dispatchClearStats: noop, sendSocketMessage: () => { throw new Error('sendSocketMessage wywołane w próbie!'); }, openModal: noop,
    $: fakeEl(),
    document: fakeEl(),
    navigator: { userAgent: 'node' },
    localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
  };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);

  // pako z vendor/pako-jszip.min.js (paczka browserify, ustawia window.pako)
  vm.runInContext(fs.readFileSync(pakoPath, 'utf8').replace(/^﻿/, ''), sandbox, { filename: 'pako-jszip.min.js' });
  log('pako loaded:', typeof sandbox.pako, typeof (sandbox.pako && sandbox.pako.inflateRaw));

  const t0 = performance.now();
  vm.runInContext(prepareGame2Source(fs.readFileSync(game2Path, 'utf8')), sandbox, { filename: 'game2.js' });
  log('game2.js evaluated in', Math.round(performance.now() - t0), 'ms');
  return { sandbox, H: sandbox.__hbra };
}

function discPos(d) {
  return d && d.a ? [d.a.x, d.a.y] : null;
}

// Analiza jednej powtórki.
//   buffer: Buffer / Uint8Array z plikiem .hbr2
//   simulate: odtwórz powtórkę do końca i policz statystyki (match)
//   positionsEvery: co ile ticków zapisać pozycje piłki i dysków graczy (0 = wcale; wymaga simulate)
// Zwraca: header, totalFrames, markers, initialState, events, eventsByClass,
// a przy simulate także ticks, simulateMs, matches (obiekt `match` z game2.js), goalTimes, positions.
function analyzeReplay(buffer, { simulate = false, positionsEvery = 0, game2Path, pakoPath, log = noop } = {}) {
  const buf = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  const header = readHeader(buf);
  log('HEADER', header);

  const { sandbox, H } = loadDecoder({ game2Path, pakoPath, log });

  // Odczyt powtórki klasą Jb (konstruktor: magic, wersja, inflate, znaczniki, stan początkowy)
  const rep = new H.Jb(new Uint8Array(buf), new H.fa, 3);
  log('Jb ok: totalFrames (mf) =', rep.mf, ', markers (Vk) =', rep.Vk.length, rep.Vk.slice(0, 5));
  const st = rep.T; // stan pokoju
  const initialState = { stadium: st.S ? st.S.w : null, players: st.I ? st.I.length : null };
  log('initial state: stadium =', initialState.stadium, ', players =', initialState.players);

  // Zdarzenia: liczymy, czytając strumień tak jak Dl(), kopią czytnika, żeby nie psuć stanu rep
  const L = rep.Lc;
  const L2 = new H.F(new DataView(L.o.buffer, L.o.byteOffset, L.o.byteLength), false);
  L2.a = L.a;
  let events = 0; const eventsByClass = {};
  while (L2.o.byteLength - L2.a > 0) {
    L2.Ab(); L2.Ob();
    const ev = H.m.fh(L2);
    const name = (ev.f && ev.f.name) || '?';
    eventsByClass[name] = (eventsByClass[name] || 0) + 1;
    events++;
  }
  log('events =', events, 'by class (minified names):', eventsByClass);

  const result = {
    header,
    totalFrames: rep.mf,
    markers: rep.Vk.map((k) => ({ mj: k.mj, kind: k.kind })),
    initialState,
    events,
    eventsByClass,
  };
  if (!simulate) return result;

  // Symulacja do końca bez requestAnimationFrame: krok po kroku jak Jb.C()
  const t1 = performance.now();
  let steps = 0;
  const target = rep.mf;
  // Dl() sprawdza loading.recLength; poprawne wartości ustawia newReplay() -> tu ręcznie
  Object.assign(H.getLoading(), { recLength: 1, progress: 0, analyzed: 0, changed: false, done: false });
  sandbox.__fake = fakeEl;
  sandbox.__rep = rep;
  // Gb = warstwa widoku z callbackami goli/startu/stopu; podpinamy ją z atrapą widoku
  vm.runInContext('keepUpdating = true; n.Na = __fake(); if (n.A == null) n.A = __fake(); __gb = new Gb(__fake()); __gb.ri(__rep.T);', sandbox);

  // Czas gola: game2.js go nie zapisuje, więc patrzymy, kiedy przybywa goli w bieżącym meczu.
  const goalTimes = [];
  let seenMatches = 0; let seenGoals = 0;
  const watchGoals = () => {
    const match = H.getMatch();
    if (match.length !== seenMatches) { seenMatches = match.length; seenGoals = 0; }
    const cur = match[match.length - 1];
    while (cur.goals.length > seenGoals) {
      goalTimes.push({ match: match.length - 1, goal: seenGoals, replayTick: rep.Y, gameTicks: cur.gameTicks, time: H.parseTime(cur.gameTicks) });
      seenGoals++;
    }
  };

  const positions = [];
  while (rep.Y < target) {
    // fragment pętli z Jb.prototype.C (bez zależności od czasu rzeczywistego)
    for (; null != rep.gg && rep.hg == rep.Y;) { const e = rep.gg; e.apply(rep.T); null != rep.fc && rep.fc(e); rep.Dl(); watchGoals(); }
    rep.Y++; rep.T.C(1); steps++;
    watchGoals();
    if (positionsEvery && rep.Y % positionsEvery === 0) {
      const game = rep.T.K; // trwająca gra (null poza meczem); piłka to pierwszy dysk
      const players = [];
      for (const p of rep.T.I) if (p.H) players.push([p.V, p.H.a.x, p.H.a.y]);
      positions.push({ tick: rep.Y, ball: game && game.ta && game.ta.F ? discPos(game.ta.F[0]) : null, players });
    }
  }
  const simulateMs = performance.now() - t1;
  const matches = H.getMatch();
  log('simulated', steps, 'ticks in', Math.round(simulateMs), 'ms');
  log('matches:', matches.length, matches.map((x) => ({ stadium: x.stadium && x.stadium.name, ticks: x.gameTicks, score: x.scoreRed + ':' + x.scoreBlue, goals: x.goals.length, kicks: x.kicks.length, passes: x.passes.length, red: x.redTeam.length, blue: x.blueTeam.length })));

  return Object.assign(result, {
    ticks: steps,
    simulateMs,
    matches,
    goalTimes,
    positions: positionsEvery ? positions : undefined,
    playerList: H.getPlayerList(), // nicki w kolejności, w jakiej indeksują player[] i playerPos (Redux)
    playerPos: H.getPlayerPos(), // [mecz][indeks w playerList] = [{x, y}] co tick meczu (heatmapy)
    playersAtEnd: rep.T.I.map((p) => ({ id: p.V, team: p.ea && p.ea.$ })),
    parseTime: H.parseTime,
  });
}

module.exports = { analyzeReplay, readHeader };

if (require.main === module) {
  const [game2Path, pakoPath, replayPath] = process.argv.slice(2);
  const simulate = process.argv.includes('--simulate');
  // --positions=<N>: co N ticków zapisz pozycje dysków graczy [id, x, y] (próba JSON-a dla wyścigów)
  const posArg = process.argv.find((a) => a.startsWith('--positions='));
  const every = posArg ? +posArg.split('=')[1] : 0;
  const r = analyzeReplay(fs.readFileSync(replayPath), { simulate, positionsEvery: simulate ? every : 0, game2Path, pakoPath, log: console.log });
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

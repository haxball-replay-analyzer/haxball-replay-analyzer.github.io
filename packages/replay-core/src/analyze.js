// Analiza powtórki bez odtwarzacza i bez DOM (kod HBRA, MIT).
/* eslint-disable eqeqeq, no-sequences, no-unused-expressions */

import { F, Jb, fa, kc, m, setInflateBudget } from './haxball.js';
import { createFootballStats, parseTime, STATS_VERSION } from './stats/football.js';

// Nagłówek pliku .hbr2 (big endian): "HBR2", wersja, długość w tickach.
function readReplayHeader(data) {
  var dv = new DataView(data.buffer, data.byteOffset, data.byteLength),
    magic = dv.getUint32(0);
  return {
    magic: '0x' + magic.toString(16) + ' (' + String.fromCharCode(data[0], data[1], data[2], data[3]) + ')',
    version: dv.getUint32(4),
    totalFrames: dv.getUint32(8),
    bytes: data.length
  }
}

// Domyślne limity (TD-042, TD-043) z dużym zapasem dla strony: prawdziwe powtórki mają do ok.
// 300 tys. ticków (1 h 22 min) i do ok. 5 MB po rozpakowaniu (stopień kompresji do 5,4).
// Serwer API poda ostrzejsze (plan API: 500 tys. ticków, 50 MB). Infinity = bez limitu.
var DEFAULT_LIMITS = {
  maxTicks: 12 * 60 * 60 * 60, // 12 h gry przy 60 tickach na sekundę = 2 592 000
  maxInflatedBytes: 128 * 1024 * 1024 // suma wszystkich rozpakowań w jednej analizie
};

function discPos(d) {
  return d && d.a ? [d.a.x, d.a.y] : null
}

// Analiza powtórki bez odtwarzacza i bez DOM: dekodowanie, symulacja tick po ticku (pętla z Jb.C bez
// czasu rzeczywistego) i statystyki piłkarskie (createFootballStats).
//   bytes: ArrayBuffer / Uint8Array z plikiem .hbr2
//   options.simulate (domyślnie true): false = tylko nagłówek, znaczniki i zdarzenia
//   options.positionsEvery: co ile ticków zapisać pozycje piłki i graczy (0 = wcale)
//   options.collectors: dodatkowi słuchacze pokoju ({ attach(room), detach() }), np. inne statystyki
//   options.onProgress(ułamek), options.progressEvery (ticki, domyślnie 6000); ostatni raport to 1
//   options.maxTicks: limit długości z nagłówka (domyślnie 12 h gry); przy simulate przekroczony
//     limit = Error z code 'replay_too_long' jeszcze przed rozpakowaniem (TD-042)
//   options.maxInflatedBytes: limit bajtów po rozpakowaniu, suma zdarzeń i stadionów (domyślnie
//     128 MiB); przekroczony = Error z code 'replay_too_large' (TD-043)
//   Błąd limitu ma pola code, limit i (przy 'replay_too_long') value.
// Rzuca błąd HaxBalla (q z Kb) przy wersji pliku innej niż 3.
export function analyzeReplay(bytes, options) {
  options = options || {};
  var maxInflatedBytes = null != options.maxInflatedBytes ? options.maxInflatedBytes : DEFAULT_LIMITS.maxInflatedBytes,
    oldBudget = setInflateBudget(maxInflatedBytes);
  try {
    return analyze(bytes, options)
  } catch (e) {
    // limit rozpakowania rzuca kod HaxBalla (haxball.js), który nie zna wartości limitu
    e && 'replay_too_large' === e.code && (e.limit = maxInflatedBytes);
    throw e
  } finally {
    setInflateBudget(oldBudget) // odtwarzacz (src/game2.js) rozpakowuje bez limitu
  }
}

function analyze(bytes, options) {
  var simulate = false !== options.simulate,
    positionsEvery = options.positionsEvery || 0,
    collectors = options.collectors || [],
    onProgress = options.onProgress,
    progressEvery = options.progressEvery || 6000;
  kc.fj();
  var data = new Uint8Array(bytes); // Jb czyta data.buffer od początku, więc kopia albo widok całego bufora
  var header = readReplayHeader(data),
    maxTicks = null != options.maxTicks ? options.maxTicks : DEFAULT_LIMITS.maxTicks;
  if (simulate && header.totalFrames > maxTicks) {
    var e = new Error('Replay too long: ' + header.totalFrames + ' ticks, limit ' + maxTicks);
    e.code = 'replay_too_long';
    e.limit = maxTicks;
    e.value = header.totalFrames;
    throw e
  }
  // konstruktor: magic, wersja, inflate, znaczniki, stan początkowy
  var rep = new Jb(data, new fa, 3);
  var st = rep.T;
  // zdarzenia: kopia czytnika, żeby nie przesunąć rep
  var L = rep.Lc,
    L2 = new F(new DataView(L.o.buffer, L.o.byteOffset, L.o.byteLength), !1);
  L2.a = L.a;
  var events = 0,
    eventsByClass = {};
  while (0 < L2.o.byteLength - L2.a) {
    L2.Ab();
    L2.Ob();
    var ev = m.fh(L2),
      name = ev.f && ev.f.name || '?'; // nazwa klasy po minifikacji (np. Ga); w buildzie strony inna
    eventsByClass[name] = (eventsByClass[name] || 0) + 1;
    events++
  }
  var result = {
    header: header,
    totalFrames: rep.mf,
    markers: rep.Vk.map(function (k) { return { mj: k.mj, kind: k.kind } }),
    initialState: { stadium: st.S ? st.S.w : null, players: st.I ? st.I.length : null },
    events: events,
    eventsByClass: eventsByClass
  };
  if (!simulate) return result;

  var t1 = performance.now(),
    steps = 0,
    target = rep.mf,
    stats = createFootballStats();
  stats.attach(rep.T);
  for (var i = 0; i < collectors.length; i++) collectors[i].attach(rep.T);
  // czas gola: statystyki go nie zapisują, więc sprawdzamy, kiedy przybywa goli w bieżącym meczu
  var goalTimes = [],
    seenMatches = 0,
    seenGoals = 0;
  function watchGoals() {
    var match = stats.match;
    match.length !== seenMatches && (seenMatches = match.length, seenGoals = 0);
    for (var cur = match[match.length - 1]; cur.goals.length > seenGoals;) goalTimes.push({ match: match.length - 1, goal: seenGoals, replayTick: rep.Y, gameTicks: cur.gameTicks, time: parseTime(cur.gameTicks) }), seenGoals++
  }
  var positions = [];
  while (rep.Y < target) {
    for (; null != rep.gg && rep.hg == rep.Y;) {
      var e = rep.gg;
      e.apply(rep.T);
      null != rep.fc && rep.fc(e);
      rep.Dl();
      watchGoals()
    }
    rep.Y++;
    rep.T.C(1);
    steps++;
    watchGoals();
    if (positionsEvery && 0 === rep.Y % positionsEvery) {
      var game = rep.T.K, // trwająca gra (null poza meczem); piłka to pierwszy dysk
        players = [];
      for (var j = 0, ps = rep.T.I; j < ps.length; j++) ps[j].H && players.push([ps[j].V, ps[j].H.a.x, ps[j].H.a.y]);
      positions.push({ tick: rep.Y, ball: game && game.ta && game.ta.F ? discPos(game.ta.F[0]) : null, players: players })
    }
    onProgress && 0 === steps % progressEvery && onProgress(rep.Y / target)
  }
  // koniec symulacji = 1; raport co progressEvery ticków zwykle kończy się niżej (wyścig: 98%, TD-041)
  onProgress && 0 !== steps % progressEvery && onProgress(1);
  stats.detach();
  for (i = 0; i < collectors.length; i++) collectors[i].detach && collectors[i].detach();
  result.ticks = steps;
  result.statsVersion = STATS_VERSION; // wersja definicji statystyk (football.js, TD-049)
  result.simulateMs = performance.now() - t1;
  result.matches = stats.match;
  result.goalTimes = goalTimes;
  result.positions = positionsEvery ? positions : void 0;
  result.playersAtEnd = rep.T.I.map(function (p) { return { id: p.V, team: p.ea && p.ea.$ } });
  result.playerList = stats.playerList; // nicki w kolejności, w jakiej indeksują player[] i playerPos
  result.playerPos = stats.playerPos; // [mecz][indeks w playerList] = [{x, y}] co tick meczu (heatmapy)
  // wejścia graczy w kolejności (z powtórzeniami): lista "Player To Follow" w odtwarzaczu
  // (kamera szuka gracza po id w bieżącym pokoju; indeks z tej listy nie pasuje do pokoju, TD-034)
  result.playerEntries = stats.players.map(function (p) { return { id: p.V, name: p.w } });
  return result
}

export { readReplayHeader, DEFAULT_LIMITS };

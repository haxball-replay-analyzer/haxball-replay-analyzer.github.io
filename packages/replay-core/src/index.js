// @hbra/replay-core: dekoder powtórek HaxBall (.hbr2) i statystyki bez przeglądarki.
//   import { analyzeReplay } from '@hbra/replay-core';
//   const r = analyzeReplay(bytes, { positionsEvery: 60 }); // nagłówek, znaczniki, mecze, gole, pozycje
// Klasy klienta HaxBall (dla odtwarzacza w src/game2.js): '@hbra/replay-core/haxball'.
// packAnalysis/unpackAnalysis: wynik analizy przez postMessage (Web Worker) bez kopiowania playerPos.
export { analyzeReplay, readReplayHeader } from './analyze.js';
export { createFootballStats, parseTime, shotTarget, STATS_VERSION } from './stats/football.js';
export { packAnalysis, unpackAnalysis, packPlayerPos, unpackPlayerPos } from './transfer.js';

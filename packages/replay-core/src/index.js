// @hbra/replay-core: dekoder powtórek HaxBall (.hbr2) i statystyki bez przeglądarki.
//   import { analyzeReplay } from '@hbra/replay-core';
//   const r = analyzeReplay(bytes, { positionsEvery: 60 }); // nagłówek, znaczniki, mecze, gole, pozycje
// Klasy klienta HaxBall (dla odtwarzacza w src/game2.js): '@hbra/replay-core/haxball'.
export { analyzeReplay, readReplayHeader } from './analyze.js';
export { createFootballStats, parseTime } from './stats/football.js';

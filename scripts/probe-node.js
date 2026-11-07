// Analiza powtórki .hbr2 z wiersza poleceń: cienka nakładka na @hbra/replay-core (packages/replay-core).
//
//   node scripts/probe-node.js <plik.hbr2> [--simulate] [--positions=60]
//   (dawna postać ze ścieżkami game2.js i pako przed plikiem nadal działa: liczy się ostatni argument)
//
// Bez --simulate: nagłówek, znaczniki i zdarzenia. Z --simulate zapisuje <plik.hbr2>.stats.json obok
// powtórki, z --positions=N także <plik.hbr2>.positions-N.json (pozycje graczy co N ticków).
// Trzymaj powtórki poza repo (nicki, czat).
'use strict';
const fs = require('fs');

async function main() {
  const args = process.argv.slice(2);
  const files = args.filter((a) => !a.startsWith('--'));
  const replayPath = files[files.length - 1];
  if (!replayPath) {
    console.error('użycie: node scripts/probe-node.js <plik.hbr2> [--simulate] [--positions=60]');
    process.exit(2);
  }
  const simulate = args.includes('--simulate');
  const posArg = args.find((a) => a.startsWith('--positions='));
  const every = simulate && posArg ? +posArg.split('=')[1] : 0;

  const { analyzeReplay } = await import('@hbra/replay-core');
  const r = analyzeReplay(fs.readFileSync(replayPath), { simulate, positionsEvery: every });
  console.log('HEADER', r.header);
  console.log('totalFrames =', r.totalFrames, ', markers =', r.markers.length, ', initial state:', r.initialState);
  console.log('events =', r.events, 'by class (minified names):', r.eventsByClass);
  if (!simulate) return;

  console.log('simulated', r.ticks, 'ticks in', Math.round(r.simulateMs), 'ms');
  console.log('matches:', r.matches.length, r.matches.map((x) => ({ stadium: x.stadium && x.stadium.name, ticks: x.gameTicks, score: x.scoreRed + ':' + x.scoreBlue, goals: x.goals.length, kicks: x.kicks.length, passes: x.passes.length, red: x.redTeam.length, blue: x.blueTeam.length })));
  if (every) {
    const out = replayPath + '.positions-' + every + '.json';
    const samples = r.positions.map((s) => [s.tick, s.players.map(([id, x, y]) => [id, Math.round(x), Math.round(y)])]);
    fs.writeFileSync(out, JSON.stringify({ header: r.header, everyTicks: every, players: r.playersAtEnd, samples }));
    console.log('positions JSON written:', out, fs.statSync(out).size, 'bytes,', samples.length, 'samples');
  }
  fs.writeFileSync(replayPath + '.stats.json', JSON.stringify({ header: r.header, match: r.matches }, null, 1));
  console.log('stats JSON written:', replayPath + '.stats.json');
}

main().catch((e) => { console.error(e); process.exit(1); });

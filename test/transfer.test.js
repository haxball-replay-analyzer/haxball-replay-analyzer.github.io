// Pakowanie wyniku analizy do przekazania z Web Workera (packages/replay-core/src/transfer.js):
// po spakowaniu i rozpakowaniu wynik ma być dokładnie taki sam (te same liczby double).
//
//   npm test
//   HBRA_RACE_REPLAY=<plik.hbr2> npm test  dodatkowo lokalna powtórka wyścigu (nigdy w repo)
'use strict';
const { describe, it, before } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

let core;
const loadCore = async () => (core ??= await import('@hbra/replay-core'));

const FIXTURES = path.join(__dirname, 'fixtures');
const RACE = process.env.HBRA_RACE_REPLAY;
const replays = [
  ['2020-05-07', path.join(FIXTURES, '2020-05-07.hbr2')],
  ['HBReplay-2020-04-02-23h11m', path.join(FIXTURES, 'HBReplay-2020-04-02-23h11m.hbr2')],
  ['wyścig (HBRA_RACE_REPLAY)', RACE],
];

for (const [name, file] of replays) {
  describe(`transfer: ${name}`, { skip: !file && 'bez HBRA_RACE_REPLAY' }, () => {
    let r;
    before(async () => {
      await loadCore();
      r = core.analyzeReplay(fs.readFileSync(file));
    });

    it('playerPos po pakowaniu i rozpakowaniu jest taki sam', () => {
      const { data, transfer } = core.packPlayerPos(r.playerPos);
      // tablice graczy mogą mieć dziury (wyścig: gracz bez pozycji w meczu); map je zachowuje,
      // więc bufor jest tylko dla istniejących wpisów
      assert.equal(transfer.length, r.playerPos.reduce((n, m) => n + m.filter(() => true).length, 0));
      assert.deepStrictEqual(core.unpackPlayerPos(data), r.playerPos);
    });

    it('cały wynik przez structuredClone z listą transfer jest taki sam', () => {
      const { message, transfer } = core.packAnalysis(r);
      assert.equal('playerPos' in message, false);
      const received = structuredClone(message, { transfer });
      // bufory przekazane: po stronie nadawcy puste
      assert.ok(transfer.every((b) => b.byteLength === 0));
      assert.deepStrictEqual(core.unpackAnalysis(received), r);
    });
  });
}

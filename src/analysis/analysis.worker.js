// Web Worker: analiza powtórki poza głównym wątkiem, żeby strona nie zamarzała (TD-019). Kod HBRA, MIT.
//
// Wejście:  { bytes: ArrayBuffer, progressEvery }
// Wyjście:  { type: 'progress', value }                ułamek 0..1 co progressEvery ticków
//           { type: 'result', result }                 wynik analyzeReplay() spakowany przez packAnalysis()
//           { type: 'error', kind: 'version', version }  plik w innej wersji niż 3 (błąd HaxBalla Kb)
//           { type: 'error', kind: 'other', message }
// Strona tworzy nowy Worker na każdą analizę i kończy go po wyniku (src/analysis/client.js).
import { analyzeReplay, packAnalysis } from '@hbra/replay-core';
import { Kb, q } from '@hbra/replay-core/haxball';

self.onmessage = function (ev) {
  var data = ev.data;
  try {
    var result = analyzeReplay(data.bytes, {
      progressEvery: data.progressEvery,
      onProgress: function (value) {
        self.postMessage({ type: 'progress', value: value })
      }
    });
    var packed = packAnalysis(result);
    self.postMessage({ type: 'result', result: packed.message }, packed.transfer)
  } catch (e) {
    var c = e instanceof q ? e.Ta : e;
    if (c instanceof Kb) self.postMessage({ type: 'error', kind: 'version', version: c.Id });
    else self.postMessage({ type: 'error', kind: 'other', message: String(c && c.message || c) })
  }
};

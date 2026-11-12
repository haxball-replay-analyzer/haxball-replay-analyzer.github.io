// Analiza powtórki w Web Workerze (analysis.worker.js), kod HBRA, MIT.
//
//   analyzeInWorker(bytes, { onProgress, progressEvery }) → Promise<wynik jak z analyzeReplay()>
//   cancelAnalysis()  przerywa trwającą analizę (jej Promise kończy się błędem z cancelled = true)
//
// Każda analiza dostaje nowy Worker, kończony po wyniku: nowa powtórka przerywa poprzednią,
// stan modułu HaxBalla nie przechodzi między analizami, pamięć wyniku zwalnia się od razu.
// Gdy przeglądarka nie ma Workerów albo Worker się nie wczytał, analiza idzie na głównym wątku
// (jak przed TD-019). Błąd wersji pliku: Error z polem replayVersion (z Workera nie da się
// przekazać obiektu błędu HaxBalla; game2.js odtwarza go jako Kb).
import { analyzeReplay, unpackAnalysis } from '@hbra/replay-core';

var current = null;

export function cancelAnalysis() {
  if (current) current.cancel()
}

export function analyzeInWorker(bytes, options) {
  options = options || {};
  cancelAnalysis();
  return new Promise(function (resolve, reject) {
    var worker = null,
      settled = false,
      heard = false; // czy Worker już coś przysłał (błąd przed tym = Worker się nie wczytał)
    var job = {
      cancel: function () {
        finish();
        var e = new Error('analysis cancelled');
        e.cancelled = true;
        reject(e)
      }
    };
    current = job;

    function finish() {
      settled = true;
      if (worker) worker.terminate(), worker = null;
      if (current === job) current = null
    }

    function runHere() {
      if (settled) return;
      try {
        var result = analyzeReplay(bytes, { onProgress: options.onProgress, progressEvery: options.progressEvery });
        finish();
        resolve(result)
      } catch (e) {
        finish();
        reject(e)
      }
    }

    if (typeof Worker === 'undefined') return runHere();
    try {
      worker = new Worker(new URL('./analysis.worker.js', import.meta.url), { type: 'module' })
    } catch (e) {
      worker = null;
      return runHere()
    }
    worker.onmessage = function (ev) {
      if (settled) return;
      heard = true;
      var m = ev.data;
      if ('progress' === m.type) options.onProgress && options.onProgress(m.value);
      else if ('result' === m.type) finish(), resolve(unpackAnalysis(m.result));
      else if ('error' === m.type) {
        finish();
        var e = new Error('version' === m.kind ? 'Incompatible replay version' : m.message);
        'version' === m.kind && (e.replayVersion = m.version);
        null != m.code && (e.code = m.code, e.limit = m.limit);
        reject(e)
      }
    };
    worker.onerror = function (ev) {
      if (settled) return;
      ev.preventDefault && ev.preventDefault();
      if (!heard) {
        // Worker się nie wczytał (albo padł przed pierwszą wiadomością): liczymy tutaj
        worker.terminate();
        worker = null;
        return runHere()
      }
      finish();
      reject(new Error(ev.message || 'analysis worker error'))
    };
    // kopia bajtów: oryginał jest dalej potrzebny odtwarzaczowi (i wysyłce na serwer)
    var copy = new Uint8Array(bytes).slice();
    worker.postMessage({ bytes: copy.buffer, progressEvery: options.progressEvery }, [copy.buffer])
  })
}

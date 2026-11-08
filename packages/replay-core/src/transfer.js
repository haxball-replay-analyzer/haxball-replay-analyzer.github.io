// Przekazanie wyniku analyzeReplay() między wątkami (Web Worker → strona), kod HBRA, MIT.
//
// postMessage kopiuje dane algorytmem structured clone. playerPos (pozycje graczy co tick, dla heatmap)
// to setki tysięcy do milionów obiektów {x, y}; ich odczyt po stronie odbiorcy blokował główny wątek
// na 1–3 s (wyścig 24 aut: 2,2 mln punktów). Tu playerPos idzie jako Float64Array (przekazanie bez
// kopii, lista `transfer`), a odbiorca odtwarza obiekty {x, y}. Float64Array trzyma każdą liczbę double
// dokładnie, więc wynik po rozpakowaniu jest taki sam jak przed spakowaniem.

// playerPos: [mecz][gracz] = [{x, y}, ...] → { data: [mecz][gracz] = Float64Array [x0, y0, x1, y1, ...], transfer }
export function packPlayerPos(playerPos) {
  var transfer = [];
  var data = playerPos.map(function (match) {
    return match.map(function (points) {
      var a = new Float64Array(2 * points.length);
      for (var i = 0; i < points.length; i++) {
        a[2 * i] = points[i].x;
        a[2 * i + 1] = points[i].y
      }
      transfer.push(a.buffer);
      return a
    })
  });
  return { data: data, transfer: transfer }
}

export function unpackPlayerPos(data) {
  return data.map(function (match) {
    return match.map(function (a) {
      var points = new Array(a.length / 2);
      for (var i = 0; i < points.length; i++) points[i] = { x: a[2 * i], y: a[2 * i + 1] };
      return points
    })
  })
}

// Cały wynik analizy: { message, transfer } do postMessage(message, transfer).
export function packAnalysis(result) {
  if (!result.playerPos) return { message: result, transfer: [] };
  var packed = packPlayerPos(result.playerPos),
    message = Object.assign({}, result, { playerPos: undefined, packedPlayerPos: packed.data });
  delete message.playerPos;
  return { message: message, transfer: packed.transfer }
}

export function unpackAnalysis(message) {
  if (!message.packedPlayerPos) return message;
  var result = Object.assign({}, message, { playerPos: unpackPlayerPos(message.packedPlayerPos) });
  delete result.packedPlayerPos;
  return result
}


export function handleFile(e) {
  var worker = new Worker('game2-worker.js');
  var c = this;
  var a = e.target.files;
  console.log('próba')
  worker.postMessage({ document: document });
  worker.postMessage({ window: window });
  // worker.postMessage({ do: 'newReplay' })
  if (!(1 > a.length)) {
    var a = a.item(0),
      b = new FileReader;
    // console.log(a);
    b.onload = function () {
      // if (b.result.byteLength < 3000000) sendSocketMessage(b.result, a.name.slice(0, -5), a.lastModified);
      // console.log(b.result.byteLength);
      // y.i(parseReplay, b.result)
      // worker.postMessage({ do: 'parseReplay', rec: b.result })
    };
    b.readAsArrayBuffer(a)
  }
  worker.onmessage = function (event) {
    // var results = event.data.results;
    console.log('ponk')
  };
};



export function replayFromSite(r) {
  // newReplay();
  // console.log(r);
  // y.i(parseReplay, r)
}

export function watchGoal(par) {
  // const g = document.getElementById("recGoal" + (Number(par) + 1)).offsetLeft;
  // autoClick = true;
  // autoClickValue = '' + g;
  // document.getElementsByClassName("timebar")[0].click();
}
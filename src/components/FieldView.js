import { useEffect, useState } from "react";

function FieldView() {

  // const [tick, setTick] = useState(0);
  var tick = 0
  var interval;

  function startDrawing() {
    interval = setInterval(function () {
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = 'darkblue'
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.fillStyle = 'red';
      // console.log(tick)
      ctx.arc(tick, tick, 20, 0, 2 * Math.PI)
      ctx.fill();
      // setTick(tick + 1);
      tick = tick + 2
      // console.log(tick)
    }, 1 / 60)
  }

  useEffect(() => {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'red';
    // ctx.fillRect(0, 0, 100, 100);
    console.log(canvas.width, canvas.height)
    startDrawing();

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div id='game-state-view' className="game-state-view">
      <div className="bar-container" >
        <div className="bar">
          <div className="scoreboard">
            <div className="teamicon red"></div>
            <div className="score" data-hook="red-score">0</div>
            <div>-</div>
            <div className="score" data-hook="blue-score">0</div>
            <div className="teamicon blue"></div>
          </div>
          <div data-hook="timer"></div>
        </div>
      </div>
      <canvas id="canvas" moz-opaque="" width={2000} height={800}></canvas>
    </div>
  );
}

export default FieldView;
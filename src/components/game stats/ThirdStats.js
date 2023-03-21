/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { drawStadium } from './StadiumCanvas';

function ThirdStats() {

  const match = useSelector(state => state.gameStats.matches);
  const mtc = useSelector(state => state.gameStats.selectedMatch)
  const stadium = match[mtc].stadium
  const canvasRef = useRef(null);

  function draw(ctx) {

    drawStadium(ctx, stadium);
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.font = "45px Arial";
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(175, 0, 150, 250);
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.lineWidth = 8;

    for (var i = 0; i < 3; i++) {
      ctx.strokeText("" + Math.round(100 * (match[mtc].thirds[i] / (match[mtc].thirds[0] + match[mtc].thirds[1] + match[mtc].thirds[2]))) + "%", 70 + 140 * i, 147);
      ctx.fillText("" + Math.round(100 * (match[mtc].thirds[i] / (match[mtc].thirds[0] + match[mtc].thirds[1] + match[mtc].thirds[2]))) + "%", 70 + 140 * i, 147);
    }
  };

  useEffect(() => {

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    draw(context)
  }, [draw])

  return (
    <canvas ref={canvasRef} width={500} height={250} style={{ margin: 'auto', display: 'block', position: 'absolute', top: 0, bottom: '50%', left: 0, right: 0 }} ></canvas>
  );
}

export default ThirdStats;
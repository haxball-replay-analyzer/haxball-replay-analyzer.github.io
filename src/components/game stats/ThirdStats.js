/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { drawStadium, stadiumSize, fitSize } from './StadiumCanvas';

function ThirdStats() {

  const match = useSelector(state => state.gameStats.matches);
  const mtc = useSelector(state => state.gameStats.selectedMatch)
  const stadium = match[mtc].stadium
  const canvasRef = useRef(null);
  // mapa w swoich proporcjach w ramce 500×250 px CSS, płótno w pikselach ekranu
  const css = fitSize(stadium, 500, 250);
  const dpr = window.devicePixelRatio || 1;
  const pxW = Math.round(css.width * dpr), pxH = Math.round(css.height * dpr);

  function draw(ctx) {

    drawStadium(ctx, stadium, pxW / stadiumSize(stadium).width);
    // nakładka w pikselach płótna, w tych samych proporcjach co dawniej na płótnie 500×250
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    const k = pxW / 500;
    const total = match[mtc].thirds[0] + match[mtc].thirds[1] + match[mtc].thirds[2];
    ctx.font = Math.round(45 * Math.min(k, pxH / 250)) + "px Arial";
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(175 * k, 0, 150 * k, pxH);
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.lineWidth = 8 * Math.min(k, pxH / 250);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (var i = 0; i < 3; i++) {
      const text = "" + Math.round(100 * (match[mtc].thirds[i] / total)) + "%";
      ctx.strokeText(text, (110 + 140 * i) * k, pxH / 2);
      ctx.fillText(text, (110 + 140 * i) * k, pxH / 2);
    }
  };

  useEffect(() => {

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    draw(context)
  })

  return (
    <canvas ref={canvasRef} width={pxW} height={pxH} style={{ width: css.width, height: css.height, margin: 'auto', display: 'block', position: 'absolute', top: 0, bottom: '50%', left: 0, right: 0 }} ></canvas>
  );
}

export default ThirdStats;

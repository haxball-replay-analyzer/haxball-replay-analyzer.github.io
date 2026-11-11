/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { drawStadium, stadiumSize, fitSize } from './StadiumCanvas';

// Ramka podglądu na stronie (px CSS). Mapa mieści się w niej w swoich proporcjach.
const PREVIEW_W = 500, PREVIEW_H = 250;
// Limit płótna eksportu: przeglądarki mają ok. 32767 px na bok i 268 Mpx powierzchni.
const EXPORT_MAX_SIDE = 16384, EXPORT_MAX_AREA = 200e6;

function useHeatmapData() {
  const match = useSelector(state => state.gameStats.matches)
  const mtc = useSelector(state => state.gameStats.selectedMatch)
  const playerPos = useSelector(state => state.gameStats.playerPos)
  const playerList = useSelector(state => state.gameStats.playerList)
  const selectedPlayer = useSelector(state => state.gameStats.selectedPlayer)
  const selectedHeatmap = useSelector(state => state.gameStats.selectedHeatmap)
  return { match, mtc, playerPos, playerList, selectedPlayer, selectedHeatmap };
}

function drawArrow(ctx, from, to) {
  var headlen = 15; // długość grotu w jednostkach gry
  var dx = to.x - from.x;
  var dy = to.y - from.y;
  var angle = Math.atan2(dy, dx);
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.lineTo(to.x - headlen * Math.cos(angle - Math.PI / 6), to.y - headlen * Math.sin(angle - Math.PI / 6));
  ctx.moveTo(to.x, to.y);
  ctx.lineTo(to.x - headlen * Math.cos(angle + Math.PI / 6), to.y - headlen * Math.sin(angle + Math.PI / 6));
  ctx.stroke();
}

// Rysuje mapę i heatmapę w skali `scale` (piksele płótna na jednostkę gry).
// Wszystkie rozmiary (linie, kółka, przezroczystość) są w jednostkach gry, więc obraz wygląda tak samo w każdej skali.
function drawHeatmap(ctx, scale, { match, mtc, playerPos, playerList, selectedPlayer, selectedHeatmap }) {
  drawStadium(ctx, match[mtc].stadium, scale);

  var player = selectedPlayer;
  if (player === -1) player = match[mtc].redTeam[0];

  if (selectedHeatmap === 'Heatmap') {
    ctx.fillStyle = "rgba(255, 0, 0, 0.006)";
    const pos = playerPos[mtc][playerList.indexOf(player)];
    if (pos === undefined) return;
    for (var i = 0; i < pos.length; i++) {
      ctx.beginPath();
      ctx.arc(pos[i].x, pos[i].y, 15, 0, 2 * Math.PI);
      ctx.fill();
    }
  } else {
    const stat = selectedHeatmap.split(' ')[0];
    if (stat === 'Goals') {
      for (let goal of match[mtc].goals) {
        // w trybie „space” gol nie ma współrzędnych strzału
        if (goal.scorer === player && goal.shot && goal.ballCoord) {
          ctx.beginPath();
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 5;
          ctx.moveTo(goal.shot.x, goal.shot.y);
          ctx.lineTo(goal.ballCoord.x, goal.ballCoord.y);
          ctx.stroke();
        }
      }
    } else if (stat === 'Assists') {
      for (let goal of match[mtc].goals) {
        if (goal.assist?.player === player && goal.assist.shot && goal.shot && goal.ballCoord) {
          ctx.beginPath();
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 5;
          ctx.moveTo(goal.assist.shot.x, goal.assist.shot.y);
          ctx.lineTo(goal.shot.x, goal.shot.y);
          ctx.lineTo(goal.ballCoord.x, goal.ballCoord.y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(goal.shot.x, goal.shot.y, 10, 0, 2 * Math.PI)
          ctx.fillStyle = 'red'
          ctx.fill();
        }
      }
    } else if (stat === 'Kicks') {
      for (let kick of match[mtc].kicks) {
        if (kick.player === player) {
          ctx.beginPath();
          ctx.fillStyle = 'red'
          ctx.arc(kick.x, kick.y, 5, 0, 2 * Math.PI)
          ctx.fill();
        }
      }
    } else if (stat === 'Passes') {
      for (let pass of match[mtc].passes) {
        // podanie bez początku (dawniej TD-044) pomijamy, zamiast rzucać wyjątek (TD-045)
        if (pass.player === player && pass.lastShot && pass.shot) {
          ctx.beginPath();
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 5;
          drawArrow(ctx, pass.lastShot, pass.shot)
        }
      }
    } else if (stat === 'Shots') {
      for (let shot of match[mtc].shots) {
        if (shot.player === player) {
          ctx.beginPath();
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 5;
          drawArrow(ctx, shot.from, shot.to)
        }
      }
    }
  }
}

function HeatMap() {

  const data = useHeatmapData();
  const stadium = data.match[data.mtc].stadium
  const canvasRef = useRef(null);
  const css = fitSize(stadium, PREVIEW_W, PREVIEW_H);
  // płótno w pikselach ekranu (ostre na ekranach z powiększeniem), na stronie w wymiarach CSS
  const dpr = window.devicePixelRatio || 1;
  const pxW = Math.round(css.width * dpr), pxH = Math.round(css.height * dpr);

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    drawHeatmap(context, pxW / stadiumSize(stadium).width, data)
  })

  return (
    <canvas ref={canvasRef} width={pxW} height={pxH} style={{ width: css.width, height: css.height, margin: 'auto', display: 'block', position: 'absolute', top: '50%', bottom: 0, left: 0, right: 0 }} ></canvas>
  );
}

// Przycisk pobierający heatmapę w rozmiarze mapy 1:1 (1 jednostka gry = 1 px, jak w grze przy zoomie 1).
export function HeatMapDownload() {

  const data = useHeatmapData();

  function download() {
    const { match, mtc, selectedPlayer, selectedHeatmap } = data;
    const size = stadiumSize(match[mtc].stadium);
    const scale = Math.min(1, EXPORT_MAX_SIDE / size.width, EXPORT_MAX_SIDE / size.height,
      Math.sqrt(EXPORT_MAX_AREA / (size.width * size.height)));
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(size.width * scale);
    canvas.height = Math.ceil(size.height * scale);
    const player = selectedPlayer === -1 ? match[mtc].redTeam[0] : selectedPlayer;
    const name = [match[mtc].stadium ? match[mtc].stadium.name : 'Classic', selectedHeatmap.split(' ')[0], player]
      .filter(Boolean).join(' - ').replace(/[\\/:*?"<>|\x00-\x1f]/g, '_') + '.png';
    try {
      drawHeatmap(canvas.getContext('2d'), scale, data);
      canvas.toBlob(blob => {
        if (!blob) { alert('The image is too large to export.'); return; }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }, 'image/png');
    } catch (e) {
      alert('The image could not be exported: ' + e.message);
    }
  }

  return <button onClick={download} style={{ marginLeft: 10 }}>Download PNG</button>;
}

export default HeatMap;

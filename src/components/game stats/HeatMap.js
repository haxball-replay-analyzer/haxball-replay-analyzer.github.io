/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { drawStadium } from './StadiumCanvas';

function HeatMap() {

  const match = useSelector(state => state.gameStats.matches)
  const mtc = useSelector(state => state.gameStats.selectedMatch)
  const playerPos = useSelector(state => state.gameStats.playerPos)
  const playerList = useSelector(state => state.gameStats.playerList)
  const selectedPlayer = useSelector(state => state.gameStats.selectedPlayer)
  const selectedHeatmap = useSelector(state => state.gameStats.selectedHeatmap)
  const stadium = match[mtc].stadium
  const canvasRef = useRef(null);

  function draw(ctx) {

    drawStadium(ctx, stadium);

    var par = selectedPlayer;
    if (par === -1) par = match[mtc].redTeam[0];

    if (selectedHeatmap === 'Heatmap') {
      ctx.fillStyle = "rgba(255, 0, 0, 0.006)";
      const pos = playerPos[mtc][playerList.indexOf(par)];
      if (pos === undefined) return;
      for (var i = 0; i < pos.length; i++) {
        ctx.beginPath();
        ctx.arc(pos[i].x, pos[i].y, 15, 0, 2 * Math.PI);
        ctx.fill();
      }
    } else {
      const stat = selectedHeatmap.split(' ');
      if (stat[0] === 'Goals') {

      } else if (stat[0] === 'Assists') {

      }
    }
  };

  useEffect(() => {

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    draw(context)
  }, [draw])

  return (
    <canvas ref={canvasRef} width={500} height={250} style={{ margin: 'auto', display: 'block', position: 'absolute', top: '50%', bottom: 0, left: 0, right: 0 }} ></canvas>
  );
}

export default HeatMap;
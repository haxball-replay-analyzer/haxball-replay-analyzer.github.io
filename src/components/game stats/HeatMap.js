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

  function drawArrow(ctx, from, to) {
    var headlen = 15; // length of head in pixels
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

  function draw(ctx) {

    drawStadium(ctx, stadium);

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
          if (goal.scorer == player) {
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
          if (goal.assist?.player === player) {
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
          if (pass.player === player) {
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 5;
            drawArrow(ctx, pass.lastShot, pass.shot)
          }
        }
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
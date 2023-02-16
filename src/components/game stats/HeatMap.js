/* eslint-disable react-hooks/exhaustive-deps */
import img from '../../images/haxpitch4.png'
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';

var img1;

var tile = new Image(128, 128);
tile.onload = function () {
  img1 = tile;
};
tile.src = img;

function HeatMap() {

  const match = useSelector(state => state.gameStats.matches)
  const mtc = useSelector(state => state.gameStats.selectedMatch)
  const playerPos = useSelector(state => state.gameStats.playerPos)
  const playerList = useSelector(state => state.gameStats.playerList)
  const selectedPlayer = useSelector(state => state.gameStats.selectedPlayer)
  const stadium = [match[mtc].stadium.width || match[mtc].stadium.bg.width, match[mtc].stadium.height || match[mtc].stadium.bg.height]
  const canvasRef = useRef(null);

  function draw(ctx2) {

    var par = selectedPlayer;
    if (par === -1) par = match[mtc].redTeam[0];

    ctx2.drawImage(img1, 0, 0);
    ctx2.fillStyle = "rgba(255, 0, 0, 0.006)";
    for (var i = 0; i < playerPos[mtc][playerList.indexOf(par)].length; i++) {
      ctx2.beginPath();
      ctx2.arc((playerPos[mtc][playerList.indexOf(par)][i].x + stadium[0]) * 433 / (2 * stadium[0]) + 33, (playerPos[mtc][playerList.indexOf(par)][i].y + stadium[1]) * 218 / (2 * stadium[1]) + 15, 7, 0, 2 * Math.PI);
      ctx2.fill();
    }
    ctx2.font = "20px Verdana";
    ctx2.textAlign = "center";
    ctx2.fillStyle = "rgba(0,0,0,1)";
    ctx2.fillText(par, 250, 15);
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
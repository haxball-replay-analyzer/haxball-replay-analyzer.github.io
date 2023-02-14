import { useSelector, useDispatch } from "react-redux";
import { setMainMode } from "../../slices/mainModeSlice";
import { useEffect, useState } from "react";
import PlayerStats from "./PlayerStats";
import $ from 'jquery'
import { selectMatch, showNextMatch, showPreviousMatch } from "../../slices/gameStatsSlice";

function GameStats() {

  const divStyle = useSelector((state) => state.gameStats.divStyle);
  const match = useSelector((state) => state.gameStats.matches)
  const mtc = useSelector((state) => state.gameStats.selectedMatch)
  const dispatch = useDispatch();

  const [redTeamName, setRedTeamName] = useState('RED');
  const [blueTeamName, setBlueTeamName] = useState('BLUE')

  var offset = {
    left: divStyle.offsetLeft,
    top: divStyle.offsetTop + divStyle.offsetParent.offsetTop
  }

  function closeStats() {

    $('#game-stats').animate({
      left: offset.left,
      opacity: 0.5,
      top: offset.top,
      width: divStyle.clientWidth,
      height: divStyle.clientHeight
    }, { duration: 300, easing: 'swing', queue: false });

    $('#greyer').animate({
      opacity: 0
    }, { duration: 300, easing: 'swing', queue: false, complete: function () { dispatch(setMainMode('home')) } });

  }

  function downloadMap() {
    var blob = new Blob([JSON.stringify(match[mtc].stadium, null, "\t")], { type: 'text' });
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = match[mtc].stadium.name + ".hbs";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function parseTime(par) {
    var gt = (par / 60).toFixed();
    var mins = Math.floor(gt / 60);
    gt -= mins * 60;
    if (gt < 10) gt = "0" + gt;
    return "" + mins + ":" + gt;
  }

  function showMatch(x) {
    return console.log(x)
    if (x === 'next') {
      dispatch(showNextMatch())
    } else if (x === 'previous') {
      dispatch(showPreviousMatch())
    } else {
      dispatch(selectMatch(x.target.value))
    }
  }

  function nextMatch() { showMatch('next') }
  function prevMatch() { showMatch('prev') }

  function handleInput(x) {
    if (x.target.id === 'redTeam') {
      setRedTeamName(x.target.value)
    } else if (x.target.id === 'blueTeam') {
      setBlueTeamName(x.target.value)
    }
  }

  function handleMouseOver(e) {
    e.target.bgColor = '#244a67';
    e.target.style.cursor = 'pointer'
  }

  function handleMouseOut(e) {
    e.target.bgColor = ''
  }

  function watchGoal(e) {
    console.log('będziem oglądać bramkie', $(e.target).attr('goalIndex'))
  }

  useEffect(() => {

    $('#game-stats').animate({
      left: '10vw',
      opacity: 1,
      top: '5vh',
      width: '80vw',
      height: '90vh'
    }, { duration: 300, easing: 'swing', queue: false });

    $('#greyer').animate({
      opacity: 0.5
    }, { duration: 300, easing: 'swing', queue: false });

  }, [])

  return (
    <>
      <div id='game-stats' className="dialog kick-player-view" style={{ zIndex: 2, opacity: 0.5, overflowY: 'hidden', position: 'absolute', left: offset.left, top: offset.top, width: divStyle.clientWidth, height: divStyle.clientHeight }}>
        <h1 id="title" className="title">
          Match stats{match[mtc].spaceMode && ' (space mode)'}:
          <select onChange={showMatch}>
            {match.map((m, index) => <option value={index} key={index} >
              {index + ': Red ' + match[index].scoreRed + ':' + match[index].scoreBlue + ' Blue'}
            </option>)}
          </select>
          {match[mtc].stadium && <button onClick={downloadMap} style={{ margin: '0 10px 0 30px' }}>Download map</button>}
        </h1>
        <button onClick={closeStats} style={{ position: 'absolute', right: 20 }} >Close ❌</button>
        <table><tbody>
          <tr>
            <td style={{ verticalAlign: 'top' }}>
              <table id='div.tabela' style={{ width: '100%' }}>
                <tbody>
                  <tr id='trosso' style={{ textAlign: 'center' }}>
                    <td style={{ fontSize: 40, color: 'red', width: 200 }}>
                      <input id='redTeam' type="text" value={redTeamName} onChange={handleInput} style={{ fontSize: 40, textAlign: 'right', color: 'red', borderStyle: 'hidden', backgroundColor: '#1a2125', width: 200 }} />
                    </td>
                    <td style={{ fontSize: 60 }}>
                      {match[mtc].scoreRed + ':' + match[mtc].scoreBlue}
                    </td>
                    <td style={{ fontSize: 40, color: 'red', width: 200 }}>
                      <input id='blueTeam' type="text" value={blueTeamName} onChange={handleInput} style={{ fontSize: 40, textAlign: 'right', color: 'red', borderStyle: 'hidden', backgroundColor: '#1a2125', width: 200 }} />
                    </td>
                  </tr>
                  <tr>
                    <td>

                    </td>
                    <td id='game-time' style={{ textAlign: 'center' }}>Game time: {parseTime(match[mtc].gameTicks)}</td>
                    <td></td>
                  </tr>
                  <tr style={{ height: 30, }}><td> </td></tr>
                  <tr style={{ fontSize: '20px', textAlign: 'center' }}>
                    <td style={{ width: 200 }}></td>
                    <td style={{ width: 200 }}>GOALS</td>
                    <td style={{ width: 200 }}></td>
                  </tr>
                  <tr style={{ height: 30 }}>
                    <td> </td>
                  </tr>
                  {/* tu brameczki */}

                  {match[mtc].goals.map((goal, index) => {
                    return (
                      <tr>
                        <td onClick={watchGoal} goalIndex={index} onMouseOverCapture={handleMouseOver} onMouseOutCapture={handleMouseOut} style={{ textAlign: 'right' }}>
                          {goal.for === 'Red' && goal.scorer + (goal.assist ? ' (' + goal.assist + ')' : '')}
                        </td>
                        <td style={{ textAlign: 'center', padding: 2 }}>
                          {goal.aktualnyWynik[0] + ':' + goal.aktualnyWynik[1]}
                        </td>
                        <td onClick={watchGoal} goalIndex={index} onMouseOverCapture={handleMouseOver} onMouseOutCapture={handleMouseOut} style={{ textAlign: 'left' }}>
                          {goal.for === 'Blue' && goal.scorer + (goal.assist ? ' (' + goal.assist + ')' : '')}
                        </td>
                      </tr>
                    )
                  })}

                  <tr></tr>

                  <tr style={{ fontSize: 20, textAlign: 'center' }}>
                    <td style={{ width: 200 }}></td>
                    <td style={{ width: 200 }}>STATS</td>
                    <td style={{ width: 200 }}></td>
                  </tr>
                  <tr style={{ height: 10 }}>
                    <td> </td>
                  </tr>

                  {/* tu staty */}

                  <tr>
                    <td className='redStats'>{(match[mtc].possRed / (match[mtc].possRed + match[mtc].possBlue) * 100).toFixed(1)}%</td>
                    <td className="center">POSSESSION</td>
                    <td className='blueStats'>{(match[mtc].possBlue / (match[mtc].possRed + match[mtc].possBlue) * 100).toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td className="redStats">{match[mtc].kicksRed}</td>
                    <td className="center">KICKS</td>
                    <td className="blueStats">{match[mtc].kicksBlue}</td>
                  </tr>
                  <tr>
                    <td className="redStats">{match[mtc].passesRed}</td>
                    <td className="center">PASSES</td>
                    <td className="blueStats">{match[mtc].passesBlue}</td>
                  </tr>
                  <tr>
                    <td className="redStats">{match[mtc].shotsRed}</td>
                    <td className="center">SHOTS ON GOAL</td>
                    <td className="blueStats">{match[mtc].shotsBlue}</td>
                  </tr>


                  <tr style={{ height: 30 }}>
                    <td> </td>
                  </tr>
                </tbody>
              </table>
              <table id='div.tabela2'>
                {/* <tr style={{ fontSize: 20, textAlign: 'center' }}>
                  <td style={{ width: 200 }}></td>
                  <td></td>
                  <td style={{ width: 100 }}>PLAYERS</td>
                  <td style={{ width: 100 }}></td>
                </tr>
                <tr style={{ height: 10 }}>
                  <td> </td>
                </tr> */}
                <PlayerStats />
              </table>
            </td>
            <td style={{ width: 10 }}></td>
            <td>
              <div id="thirdStats"></div>
              <br />
              <div id="heatmap"></div>
              <div className="row" />
            </td>
          </tr>
        </tbody>
        </table>
      </div>
      <div id='greyer' onClick={closeStats} style={{ zIndex: 1, opacity: 0, backgroundColor: 'rgba(115, 136, 92)', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}></div>
    </>
  );
}

export default GameStats;

//       var tableRef = document.getElementById("div.tabela").getElementsByTagName('tbody')[0];
//       var wiersz = 4;
//       for (var j = 0; j < match[mtc].goals.length; j++) {
//         var mar = document.getElementById("recGoal" + (match[mtc].goals[j].goalIndex + 1)).offsetLeft - 5;
//         var newRow = tableRef.insertRow(wiersz);
//         wiersz++;
//         var newCell_3 = newRow.insertCell(0);
//         var newCell_2 = newRow.insertCell(0);
//         var newCell_1 = newRow.insertCell(0);
//         newCell_1.style = "text-align: right";
//         newCell_3.style = "text-align: left";
//         if (match[mtc].goals[j].for == "Red") {
//           newCell_1.innerHTML = "" + match[mtc].goals[j].aktualnyWynik[0] + " : " + match[mtc].goals[j].aktualnyWynik[1] + " " + match[mtc].goals[j].scorer + (match[mtc].goals[j].assist == false ? "" : " (" + match[mtc].goals[j].assist + ")");
//           newCell_1.setAttribute('onclick', 'watchGoal(' + mar + ');');
//           newCell_1.setAttribute('onmouseover', 'this.style="cursor:pointer;background-color:#244a67;text-align: right;"');
//           newCell_1.setAttribute('onmouseout', 'this.style="text-align: right;"');
//         } else {
//           newCell_3.innerHTML = "" + match[mtc].goals[j].aktualnyWynik[0] + " : " + match[mtc].goals[j].aktualnyWynik[1] + " " + match[mtc].goals[j].scorer + (match[mtc].goals[j].assist == false ? "" : " (" + match[mtc].goals[j].assist + ")");
//           newCell_3.setAttribute('onclick', 'watchGoal(' + mar + ');');
//           newCell_3.setAttribute('onmouseover', 'this.style="cursor:pointer;background-color:#244a67;text-align: left;"');
//           newCell_3.setAttribute('onmouseout', 'this.style="text-align: left;"');
//         }
//         //console.log(newRow, newCell_1);
//       }
//       wiersz += 3;

//       var canvas = document.createElement("canvas");
//       if (canvas.getContext) {

//         var ctx = canvas.getContext('2d');
//         ctx.canvas.width = 500;
//         ctx.canvas.height = 250;

//         //Loading of the home test image - img1
//         var img1 = new Image();

//         //drawing of the test image - img1
//         img1.onload = function () {
//           //draw background image
//           ctx.drawImage(img1, 0, 0);
//           //draw a box over the top
//           ctx.font = "45px Arial";
//           ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
//           ctx.fillRect(175, 0, 150, 250);
//           ctx.fillStyle = "rgba(255, 255, 255, 1)";
//           ctx.strokeStyle = "rgba(0, 0, 0, 1)";
//           ctx.lineWidth = 8;
//           //console.log(match[mtc].thirds);

//           for (var i = 0; i < 3; i++) {
//             ctx.strokeText("" + Math.round(100 * (match[mtc].thirds[i] / (match[mtc].thirds[0] + match[mtc].thirds[1] + match[mtc].thirds[2]))) + "%", 70 + 140 * i, 147);
//             ctx.fillText("" + Math.round(100 * (match[mtc].thirds[i] / (match[mtc].thirds[0] + match[mtc].thirds[1] + match[mtc].thirds[2]))) + "%", 70 + 140 * i, 147);
//           }
//           document.getElementById("thirdStats").appendChild(canvas);

//         };

//         img1.src = 'https://haxball-replay-analyzer.github.io/images/haxpitch4.png';
//       }
//       var canvas2 = document.createElement("canvas");
//       if (canvas2.getContext) {

//         var ctx2 = canvas2.getContext('2d');
//         ctx2.canvas.width = 500;
//         ctx2.canvas.height = 250;

//         //Loading of the home test image - img1
//         var img2 = new Image();

//         //drawing of the test image - img1
//         img2.onload = function () {
//           //draw background image
//           ctx2.drawImage(img1, 0, 0);
//           //draw a box over the top
//           ctx2.fillStyle = "rgba(255, 0, 0, 0.006)";
//           //console.log(redGoalCord);
//           for (var i = 0; i < playerPos[0][1].length; i++) {
//             ctx2.beginPath();
//             //ctx2.arc((playerPos[0][2][i].x+606)*314/blueGoalCord[0],(playerPos[0][2][i].y+329)*1/2,7,0,2*Math.PI);
//             ctx2.arc((playerPos[0][1][i].x + stadion[0]) * 433 / (2 * stadion[0]) + 33, (playerPos[0][1][i].y + stadion[1]) * 218 / (2 * stadion[1]) + 15, 7, 0, 2 * Math.PI);
//             ctx2.fill();
//           }
//           ctx2.font = "20px Verdana";
//           ctx2.textAlign = "center";
//           ctx2.fillStyle = "rgba(0,0,0,1)";
//           ctx2.fillText(playerList[1], 250, 15);
//           /*ctx.fillRect(240, 0, 220, 350);
//           ctx.fillStyle = "rgba(255, 255, 255, 1)";
//           ctx.strokeStyle = "rgba(0, 0, 0, 1)";
//           ctx.lineWidth = 8;*/
//           //console.log(match[mtc].thirds);

//           document.getElementById("heatmap").appendChild(canvas2);

//         };
//         img2.src = 'https://haxball-replay-analyzer.github.io/images/haxpitch4.png';
//       }

//       //console.log("e",sortTable);
//       sortTable(-1);
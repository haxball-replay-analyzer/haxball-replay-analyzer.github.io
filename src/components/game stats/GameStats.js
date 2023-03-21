import { useSelector, useDispatch } from "react-redux";
import { setMainMode } from "../../slices/mainModeSlice";
import { useEffect, useState } from "react";
import PlayerStats from "./PlayerStats";
import ThirdStats from "./ThirdStats";
import { watchGoal } from "../../game2";
import $ from 'jquery'
import { selectMatch, showNextMatch, showPreviousMatch, setStats } from "../../slices/gameStatsSlice";
import HeatMap from "./HeatMap";

function GameStats() {

  const divStyle = useSelector((state) => state.gameStats.divStyle);
  const match = useSelector((state) => state.gameStats.matches)
  const mtc = useSelector((state) => state.gameStats.selectedMatch);
  const selectedPlayer = useSelector(state => state.gameStats.selectedPlayer)
  const selectedHeatmap = useSelector(state => state.gameStats.selectedHeatmap)
  const dispatch = useDispatch();

  const [redTeamName, setRedTeamName] = useState('RED');
  const [blueTeamName, setBlueTeamName] = useState('BLUE')

  var offset = {
    left: divStyle.offsetLeft,
    top: divStyle.offsetTop + divStyle.offsetParentTop
  }

  function closeStats(e, completeF = null) {

    function completeFunction() {
      dispatch(setMainMode('home'))
    }

    $("#prevMatch").css('display', 'none')
    $("#nextMatch").css('display', 'none')

    $('#game-stats').animate({
      left: offset.left,
      opacity: 0.5,
      top: offset.top,
      width: divStyle.clientWidth,
      height: divStyle.clientHeight
    }, { duration: 300, easing: 'swing', queue: false });

    $('#greyer').animate({
      opacity: 0
    }, { duration: 300, easing: 'swing', queue: false, complete: function () { completeF ? completeF() : completeFunction() } });

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
    if (x === 'next') {
      dispatch(showNextMatch())
    } else if (x === 'prev') {
      dispatch(showPreviousMatch())
    } else {
      dispatch(selectMatch(x.target.value))
    }
  }

  function nextMatch() {
    if (mtc < match.length - 1) {
      showMatch('next')
    }
  }
  function prevMatch() {
    if (mtc != 0) {
      showMatch('prev')
    }
  }

  function handleInput(x) {
    if (x.target.id === 'redTeam') {
      setRedTeamName(x.target.value)
    } else if (x.target.id === 'blueTeam') {
      setBlueTeamName(x.target.value)
    }

    var l = x.target.value.length
    if (l > 6) {
      var size = 50 - 2 * l;
      if (size < 14) size = 14;
      x.target.style['font-size'] = '' + size + 'px';
    } else x.target.style['font-size'] = '40px';
  }

  function handleMouseOver(e) {
    if (e.target.className === match[mtc].goals[$(e.target).attr('goalindex')].for) {
      e.target.bgColor = '#244a67'
      e.target.style.cursor = 'pointer'
    } else e.target.style.cursor = 'default'
  }

  function handleMouseOut(e) {
    e.target.bgColor = ''
  }

  function watchGoal_(e) {
    if (e.target.className === match[mtc].goals[$(e.target).attr('goalindex')].for) {
      var goalindex = Number($(e.target).attr('goalindex'));
      for (var i = 0; i < mtc; i++) {
        goalindex = goalindex + match[i].goals.length;
      }
      closeStats(watchGoal(goalindex))
    }
  }

  function connectHalves(e) {
    var newMatch = {
      gameTicks: match[0].gameTicks + match[1].gameTicks,
      goals: [...match[0].goals],
      kicks: match[0].kicks.concat(match[1].kicks),
      kicksRed: match[0].kicksRed + match[1].kicksBlue,
      kicksBlue: match[0].kicksBlue + match[1].kicksRed,
      passes: match[0].passes.concat(match[1].passes),
      passesRed: match[0].passesRed + match[1].passesBlue,
      passesBlue: match[0].passesBlue + match[1].passesRed,
      player: [...match[0].player],
      possRed: match[0].possRed + match[1].possBlue,
      possBlue: match[0].possBlue + match[1].possRed,
      scoreRed: match[0].scoreRed + match[1].scoreBlue,
      scoreBlue: match[0].scoreBlue + match[1].scoreRed,
      shots: match[0].shots.concat(match[1].shots),
      shotsRed: match[0].shotsRed + match[1].shotsBlue,
      shotsBlue: match[0].shotsBlue + match[1].shotsRed,
      spaceMode: match[0].spaceMode,
      stadium: match[0].stadium,
      thirds: [...match[0].thirds]
    }

    var newPlayers = [];
    for (let player of match[1].player) {
      if (!newMatch.player.includes(player)) newPlayers.push(player)
    }
    newMatch.player = match[0].player.concat(newPlayers);

    newMatch.redTeam = match[0].redTeam;
    var newRed = [];
    for (let player of match[1].blueTeam) {
      if (!newMatch.redTeam.includes(player)) newRed.push(player);
    }
    newMatch.redTeam = match[0].redTeam.concat(newRed)

    var newBlue = [];
    newMatch.blueTeam = match[0].blueTeam;
    for (let player of match[1].redTeam) {
      if (!newMatch.blueTeam.includes(player)) newBlue.push(player);
    }
    newMatch.blueTeam = match[0].blueTeam.concat(newBlue)

    for (let goal of match[1].goals) {
      var newGoal = JSON.parse(JSON.stringify(goal));
      newGoal.currentScore = [...newMatch.goals[newMatch.goals.length - 1].currentScore];
      if (newGoal.for === 'Red') {
        newGoal.for = 'Blue';
        newGoal.currentScore[1]++;
      } else {
        newGoal.for = 'Red';
        newGoal.currentScore[0]++;
      }
      newMatch.goals.push(newGoal)
    }

    newMatch.thirds[0] += match[1].thirds[2];
    newMatch.thirds[1] += match[1].thirds[1];
    newMatch.thirds[2] += match[1].thirds[0];

    dispatch(setStats([newMatch]))
  }

  function showButtons() {
    $('#prevMatch').css('display', mtc === 0 ? 'none' : 'block')
    $('#nextMatch').css('display', mtc === match.length - 1 ? 'none' : 'block')

    const newLeft = $("#greyer").width() * 0.1 - 50;
    const newRight = $("#greyer").width() * 0.9 + 10;
    $('#prevMatch').animate({
      left: newLeft
    }, { duration: 1000, easing: 'swing', queue: false });

    $('#nextMatch').animate({
      left: newRight
    }, { duration: 1000, easing: 'swing', queue: false });
  }

  useEffect(() => {
    $("#prevMatch").css('display', mtc === 0 ? 'none' : 'block')
    $("#nextMatch").css('display', mtc === match.length - 1 ? 'none' : 'block')
  }, [mtc])

  useEffect(() => {

    $("#prevMatch").css('display', 'none')
    $("#nextMatch").css('display', 'none')

    $('#game-stats').animate({
      left: '10vw',
      opacity: 1,
      top: '5vh',
      width: '80vw',
      height: '90vh'
    }, { duration: 300, easing: 'swing', queue: false, complete: function () { showButtons() } });

    $('#greyer').animate({
      opacity: 0.5
    }, { duration: 300, easing: 'swing', queue: false });

  }, [])

  return (
    <>
      <button id='prevMatch' onClick={prevMatch} style={{ display: 'none', zIndex: 2, fontSize: 25, position: 'fixed', width: 40, height: 40, padding: '0 0 0 0', top: 'calc(50% - 20px)', left: '10vw' }}>◄
        <span className="tooltip-left">Previous match</span>
      </button>
      <button id='nextMatch' onClick={nextMatch} style={{ display: 'none', zIndex: 2, fontSize: 25, position: 'fixed', width: 40, height: 40, padding: '0 0 0 0', top: 'calc(50% - 20px)', left: 'calc(90vw - 40px)' }}>►
        <span className="tooltip">Next match</span>
      </button>
      <div id='game-stats' className="dialog kick-player-view" style={{ zIndex: 2, opacity: 0.5, overflowY: 'hidden', position: 'absolute', left: offset.left, top: offset.top, width: divStyle.clientWidth, height: divStyle.clientHeight }}>
        <h1 id="title" className="title">
          Match stats{match[mtc].spaceMode && ' (space mode)'}:
          <select value={mtc} onChange={showMatch}>
            {match.map((m, index) => <option value={index} key={index} >
              {index + 1}: Red {match[index].scoreRed}:{match[index].scoreBlue} Blue
            </option>)}
          </select>
          {match.length === 2 && <button onClick={connectHalves} style={{ margin: '0 10px 0 30px' }}>Connect 2 halves</button>}
          {match[mtc].stadium.canBeStored && <button onClick={downloadMap} style={{ margin: '0 10px 0 30px' }}>Download map</button>}
        </h1>
        <button onClick={closeStats} style={{ position: 'absolute', right: 20 }} >Close ❌</button>
        <div id='leftHalf' style={{ overflowY: 'scroll', width: '50%', float: 'left', height: '100%' }}>
          <table style={{ width: '100%' }}><tbody>
            <tr id='trosso' style={{ textAlign: 'center' }}>
              <td style={{ fontSize: 40, color: 'red', width: '40%' }}>
                <input id='redTeam' type="text" value={redTeamName} onChange={handleInput} style={{ fontSize: 40, textAlign: 'right', color: 'red', borderStyle: 'hidden', backgroundColor: '#1a2125', width: 200 }} />
              </td>
              <td style={{ fontSize: 60, width: '20%' }}>
                {match[mtc].scoreRed + ':' + match[mtc].scoreBlue}
              </td>
              <td style={{ fontSize: 40, color: 'red', width: '40%' }}>
                <input id='blueTeam' type="text" value={blueTeamName} onChange={handleInput} style={{ fontSize: 40, textAlign: 'left', color: '#5688e5', borderStyle: 'hidden', backgroundColor: '#1a2125', width: 200 }} />
              </td>
            </tr>
            <tr>
              <td>
              </td>
              <td id='game-time' style={{ textAlign: 'center' }}>Game time: {parseTime(match[mtc].gameTicks)}</td>
              <td></td>
            </tr>
            <tr style={{ height: 15 }}><td> </td></tr>
            <tr style={{ fontSize: '20px', textAlign: 'center' }}>
              <td></td>
              <td>GOALS</td>
              <td></td>
            </tr>
            <tr style={{ height: 15 }}>
              <td> </td>
            </tr>
          </tbody></table>

          <table style={{ width: '100%' }}><tbody>

            {match[mtc].goals.map((goal, index) => {
              return (
                <tr key={index}>
                  <td className="Red" onClick={watchGoal_} goalindex={index} onMouseOverCapture={handleMouseOver} onMouseOutCapture={handleMouseOut} style={{ width: '45%', textAlign: 'right' }}>
                    {goal.for === 'Red' && goal.scorer + (goal.assist ? ' (' + goal.assist.player + ')' : '')}
                  </td>
                  <td style={{ width: '10%', textAlign: 'center', padding: 2 }}>
                    {goal.currentScore[0] + ':' + goal.currentScore[1]}
                  </td>
                  <td className="Blue" onClick={watchGoal_} goalindex={index} onMouseOverCapture={handleMouseOver} onMouseOutCapture={handleMouseOut} style={{ width: '45%', textAlign: 'left' }}>
                    {goal.for === 'Blue' && goal.scorer + (goal.assist ? ' (' + goal.assist.player + ')' : '')}
                  </td>
                </tr>
              )
            })}

          </tbody></table>

          <table style={{ width: '100%' }}><tbody>
            <tr style={{ height: 15 }}></tr>

            <tr style={{ fontSize: 20, textAlign: 'center' }}>
              <td style={{ width: '33%' }}></td>
              <td style={{ width: '34%' }}>STATS</td>
              <td style={{ width: '33%' }}></td>
            </tr>
            <tr style={{ height: 10 }}>
              <td> </td>
            </tr>

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


            <tr style={{ height: 20 }}>
              <td> </td>
            </tr>

            <tr style={{ fontSize: 20, textAlign: 'center' }}>
              <td></td>
              <td>PLAYERS</td>
              <td></td>
            </tr>
          </tbody>
          </table>
          <table id='div.tabela2' style={{ width: '100%' }}>
            <PlayerStats />
          </table>
        </div >
        <div id='rightHalf' style={{ position: 'absolute', left: '50%', top: '10%', overflowY: 'hidden', width: '50%', height: '90%' }}>
          <div style={{ height: '50%', overflow: 'hidden' }}>
            <ThirdStats />
          </div>
          <div style={{ height: '50%', overflow: 'hidden' }}>
            <p style={{ textAlign: 'center', fontSize: 18 }}>{selectedHeatmap.split(' ')[0]} of {selectedPlayer == -1 ? match[mtc].redTeam[0] : selectedPlayer}:</p>
            {match[mtc].stadium ? <HeatMap /> : null}
          </div>
        </div >
      </div>
      <div id='greyer' onClick={closeStats} style={{ zIndex: 1, opacity: 0, backgroundColor: 'rgba(115, 136, 92)', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}></div>
    </>
  );
}

export default GameStats;
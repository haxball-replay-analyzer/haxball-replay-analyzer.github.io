import { useSelector, useDispatch } from "react-redux";
import { selectStat, selectPlayer, selectHeatmap } from "../../slices/gameStatsSlice";
import React from "react";

function PlayerStats() {

  const match = useSelector((state) => state.gameStats.matches);
  const mtc = useSelector((state) => state.gameStats.selectedMatch);
  const par = useSelector((state) => state.gameStats.selectedStat)
  const dispatch = useDispatch();

  var tab = [];
  for (var i = 0; i < match[mtc].player.length; i++) {
    var pr = match[mtc].player[i], prGoals = 0, prAssists = 0, prKicks = 0, prPasses = 0, prShots = 0, prBumps = 0, prTouches = 0;
    for (var j = 0; j < match[mtc].goals.length; j++) {
      if (match[mtc].goals[j].scorer === pr.nick) prGoals++;
      else if (match[mtc].goals[j].assist.player === pr.nick) prAssists++;
    }
    for (var j = 0; j < match[mtc].kicks.length; j++) if (match[mtc].kicks[j].player === pr.nick) prKicks++;
    for (var j = 0; j < match[mtc].passes.length; j++) if (match[mtc].passes[j].player === pr.nick) prPasses++;
    for (var j = 0; j < match[mtc].shots.length; j++) if (match[mtc].shots[j] === pr.nick) prShots++;
    if (match[mtc].spaceMode) {
      for (var j = 0; j < match[mtc].bumps.length; j++) if (match[mtc].bumps[j] === pr.nick) prBumps++;
      for (var j = 0; j < match[mtc].touches.length; j++) if (match[mtc].touches[j] === pr.nick) prTouches++;
      tab.push([pr.nick, pr.nation, prGoals, prAssists, prKicks, prPasses, prShots, prBumps, prTouches]);
    } else tab.push([pr.nick, pr.nation, prGoals, prAssists, prKicks, prPasses, prShots]);
  }
  if (par > 0) {
    var tab2 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    for (var i = 0; i < tab.length; i++) {
      if (!match[mtc].redTeam.includes(tab[i][0]) && !match[mtc].blueTeam.includes(tab[i][0])) continue;
      for (var j = 0; j < tab2.length; j++) {
        if (tab[i][par] >= tab2[j][par]) {
          tab2.splice(j, 0, tab[i]);
          break;
        }
      }
    }
    tab2.splice(tab2.length - 1, 1);
    tab = tab2;
  } else {
    var tab2 = [];
    for (var i = 0; i < tab.length; i++) {
      if (match[mtc].redTeam.includes(tab[i][0])) tab2.splice(0, 0, tab[i]);
      else if (match[mtc].blueTeam.includes(tab[i][0])) tab2.push(tab[i])
    }
    tab = tab2;
  }

  function handleClick(e) {
    const tab = ['Players', '', 'Goals', 'Assists', 'Kicks', 'Passes', 'Shots On Goal', 'Bumps', 'Touches'];
    dispatch(selectStat(tab.indexOf(e.target.textContent)))
  }

  function handleMouseOver(e) {
    // console.log('over', e.target)
    e.target.style.cursor = 'pointer';
    e.target.bgColor = 'darkgrey'
  }

  function handleMouseOut(e) {
    e.target.bgColor = ''
  }

  function showHeatMap(e) {
    e.target.style.cursor = 'pointer';
    e.target.bgColor = 'darkgrey'
    if (e.target.className === 'leftStat') {
      dispatch(selectHeatmap('Heatmap'))
      dispatch(selectPlayer(e.target.textContent.substring(1)))
    }
  }

  function changeHeatmap(e) {
    dispatch(selectPlayer(e.target.attributes.player.value))
    dispatch(selectHeatmap(e.target.attributes.stat.value))
  }

  return (
    <tbody>
      <tr style={{ height: 10 }}>
        <td> </td>
      </tr>
      <tr onClick={handleClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <td className="leftStat" style={{ width: '25%' }}>Players</td>
        <td className="centerStat">Goals</td>
        <td className="centerStat">Assists</td>
        <td className="centerStat">Kicks</td>
        <td className="centerStat">Passes</td>
        <td className="centerStat">Shots On Goal</td>
        {match[mtc].spaceMode && (
          <>
            <td className="centerStat">Bumps</td>
            <td className="centerStat">Touches</td>
          </>
        )}
      </tr>
      {tab.map((stat, index) => {
        return (
          <React.Fragment key={index}>
            <tr style={{ height: 5 }}></tr>
            <tr style={{ backgroundColor: match[mtc].redTeam.includes(stat[0]) ? '#9c0603' : '#244a67' }}>
              <td className="leftStat" onMouseOver={showHeatMap} onMouseOut={handleMouseOut}>
                <div className={"flagico f-" + stat[1]} /> {stat[0]}
              </td>
              <td className="centerStat" onClick={changeHeatmap} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} stat={"Goals"} player={stat[0]}>{stat[2]}</td>
              <td className="centerStat" onClick={changeHeatmap} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} stat={"Assists"} player={stat[0]}>{stat[3]}</td>
              <td className="centerStat" onClick={changeHeatmap} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} stat={"Kicks"} player={stat[0]}>{stat[4]}</td>
              <td className="centerStat" onClick={changeHeatmap} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} stat={"Passes"} player={stat[0]}>{stat[5]}</td>
              <td className="centerStat">{stat[6]}</td>
              {match[mtc].spaceMode && (
                <>
                  <td className="centerStat">{stat[7]}</td>
                  <td className="centerStat">{stat[8]}</td>
                </>
              )}
            </tr>
          </React.Fragment>
        )
      })}
    </tbody>
  );
}

export default PlayerStats;
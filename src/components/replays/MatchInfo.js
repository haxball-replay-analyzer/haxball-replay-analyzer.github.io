import { useSelector } from "react-redux";
import React from "react";

function MatchInfo(props) {

  const ri = props.replayIndex;
  const match = props.match;
  const goals = useSelector(state => state.replays.replays.goals[ri]).filter(goal => goal.MatchId === match.MatchId)
  const players = useSelector(state => state.replays.replays.players[ri]).filter(player => [match.RedTeamId, match.BlueTeamId].includes(player.TeamId))
  const teams = useSelector(state => state.replays.replays.teams[ri])
  const redTeamName = teams.filter(team => team.TeamId === match.RedTeamId)[0]?.TeamName;
  const blueTeamName = teams.filter(team => team.TeamId === match.BlueTeamId)[0]?.TeamName;
  var newPlayers = JSON.parse(JSON.stringify(players));
  const player4Search = useSelector(state => state.replays.player4Search)

  for (let player of newPlayers) {
    player.goals = 0;
  }
  for (let goal of goals) {
    if (!goal.Nick.endsWith('(own goal)') & newPlayers.filter(player => player.Nick === goal.Nick).length > 0) {
      newPlayers.filter(player => player.Nick === goal.Nick)[0].goals++;
    }
  }

  var redTeam = [], blueTeam = []
  for (let player of newPlayers) {
    for (var j = 0; j < player.goals; j++) {
      player.Nick += '⚽'
    }
    // if (player4Search != null && player4Search != '') {
    //   if (player.Nick.includes(player4Search)) player.Nick = player.Nick
    //     .split(player4Search)
    //     .join(`<strong>${player4Search}</strong>`);
    // }
    if (player.TeamId === match.RedTeamId) redTeam.push(player.Nick)
    else blueTeam.push(player.Nick)
  }

  return (
    <div className="matchInfo" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>
        {redTeamName || 'RED'} {match.RedScore}:{match.BlueScore} {blueTeamName || 'BLUE'}
      </div>
      <div style={{ flex: 3, display: 'flex', flexDirection: 'row', fontSize: '75%', overflowY: 'auto' }}>
        <div style={{ flex: 1, textAlign: 'center', color: '#E56E56' }}>
          {redTeam.map((nick, index) => (
            <React.Fragment key={index}>
              {index > 0 && ', '}
              {(player4Search !== null && player4Search !== '' && nick.toLowerCase().includes(player4Search.toLowerCase())) ? <span style={{ fontWeight: 700, borderBottom: '1px solid white' }}>{nick}</span> : <span>{nick}</span>}
            </React.Fragment>
          ))}
        </div>
        <div style={{ flex: 1, textAlign: 'center', color: '#5689E5' }}>
          {blueTeam.map((nick, index) => (
            <React.Fragment key={index}>
              {index > 0 && ', '}
              {(player4Search !== null && player4Search !== '' && nick.toLowerCase().includes(player4Search.toLowerCase())) ? <span style={{ fontWeight: 700, borderBottom: '1px solid white' }}>{nick}</span> : <span>{nick}</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, textAlign: 'center', fontSize: '80%' }}>
        Stadium: {match.StadiumName}
      </div>
    </div>
  )
}

export default MatchInfo;
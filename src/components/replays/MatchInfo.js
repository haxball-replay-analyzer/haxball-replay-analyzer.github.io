import { useSelector } from "react-redux";

function MatchInfo(props) {

  const i = props.i;
  const ri = props.replayIndex;
  const match = props.match;
  const test = useSelector(state => state.replays.replays);
  console.log('xxx', test, ri)
  const goals = useSelector(state => state.replays.replays.goals[ri]).filter(goal => goal.MatchId === match.MatchId)
  const players = useSelector(state => state.replays.replays.players[ri]).filter(player => [match.RedTeamId, match.BlueTeamId].includes(player.TeamId))
  const teams = useSelector(state => state.replays.replays.teams[ri])
  const redTeamName = teams.filter(team => team.TeamId === match.RedTeamId).TeamName;
  const blueTeamName = teams.filter(team => team.TeamId === match.BlueTeamId).TeamName;
  var newPlayers = JSON.parse(JSON.stringify(players))

  for (let player of newPlayers) {
    player.goals = 0;
  }
  for (let goal of goals) {
    newPlayers.filter(player => player.Nick === goal.Nick).goals++;
  }

  var redTeam = [], blueTeam = []
  for (let player of newPlayers) {
    for (var j = 0; j < player.goals; j++) {
      player.Nick += '⚽'
    }
    if (player.TeamId === match.RedTeamId) redTeam.push(player.Nick)
    else blueTeam.push(player.Nick)
  }

  return (
    <div className="matchInfo">
      <div>
        {redTeamName} {match.RedScore}:{match.BlueScore} {blueTeamName}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>{redTeam.join(',  ')}</div>
        <div>{blueTeam.join(',  ')}</div>
      </div>
      <div>
        Stadium: {match.StadiumName}
      </div>
    </div>
  )
}

export default MatchInfo;
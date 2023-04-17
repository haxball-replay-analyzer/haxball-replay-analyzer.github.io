import { useState } from "react";
import { useSelector } from "react-redux";
import MatchInfo from "./MatchInfo";

function ReplayInfo(props) {

  const i = props.i;
  const replays = useSelector(state => state.replays.replays.replays)
  const goals = useSelector(state => state.replays.replays.goals)
  const matches = useSelector(state => state.replays.replays.matches)
  const players = useSelector(state => state.replays.replays.players)
  const teams = useSelector(state => state.replays.replays.teams)

  console.log('eeee', matches[i]);

  return (
    <div className="replayInfo">
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>{replays[i].ReplayName}</div>
        <div style={{ flex: 2, display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', fontSize: '200%', alignItems: 'center' }}>{replays[i].ViewsCount}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>views</div>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>Sent: {new Date(replays[i].LastModified).toISOString().split('T')[0]}</div>
      </div>
      <div className="replayMatches">
        {matches[i].map((m, index) => <MatchInfo key={index} match={m} i={index} replayIndex={i} />)}
      </div>
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <button>Watch</button>
      </div>
    </div>
  );
}

export default ReplayInfo;
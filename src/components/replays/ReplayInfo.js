import { useState } from "react";
import { useSelector } from "react-redux";

function ReplayInfo(props) {

  const i = props.i;
  const replays = useSelector(state => state.replays.replays.replays)
  const goals = useSelector(state => state.replays.replays.goals)
  const matches = useSelector(state => state.replays.replays.matches)
  const players = useSelector(state => state.replays.replays.players)
  const teams = useSelector(state => state.replays.replays.teams)

  console.log('e', replays, i, replays[i]);

  return (
    <div className="replayInfo">
      <div>
        <p>Replaysdasdasdasdasdas</p>
        <p>{replays[i].ReplayName}</p>
        <p>{replays[i].ViewsCount}, {matches[i]?.stadiumName}</p>
      </div>
    </div>
  );
}

export default ReplayInfo;
function ReplayInfo(props) {

  return (
    <div className="replayInfo">
      <div>
        <p>Replaysdasdasdasdasdas</p>
        <p>{props.replay.name}</p>
        <p>{props.replay.views}</p>
      </div>
    </div>
  );
}

export default ReplayInfo;
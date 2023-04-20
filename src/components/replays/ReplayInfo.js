import { useSelector } from "react-redux";
import MatchInfo from "./MatchInfo";
import { checkParamsExp } from "../Home";
import $ from 'jquery'

function ReplayInfo(props) {

  function watchReplay(e) {
    // console.log(replays[i].ReplayId);
    const addURL = "?replayId=" + replays[i].ReplayId;
    window.history.replaceState(null, null, addURL);
    checkParamsExp();
    $('#mostViewedReplays').animate({
      left: '150%',
    }, { duration: 700, easing: 'swing', queue: false });
  }

  const i = props.i;
  const replays = useSelector(state => state.replays.replays.replays)
  const matches = useSelector(state => state.replays.replays.matches)

  return (
    <div className="replayInfo">
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'start', overflow: "hidden" }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>{replays[i].ReplayName}</div>
        <div style={{ flex: 2, display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', fontSize: '200%', alignItems: 'center', padding: '5px', fontWeight: 'bold' }}>{replays[i].ViewsCount}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>views</div>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>Sent: {new Date(replays[i].LastModified).toISOString().split('T')[0]}</div>
      </div>
      <div className="replayMatches">
        {matches[i].map((m, index) => <MatchInfo key={index} match={m} i={index} replayIndex={i} />)}
      </div>
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={watchReplay} className="watchReplayButton" replayId={replays[i].ReplayId}>Watch</button>
      </div>
    </div>
  );
}

export default ReplayInfo;
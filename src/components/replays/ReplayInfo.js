import { useSelector } from "react-redux";
import MatchInfo from "./MatchInfo";
import { checkParamsExp } from "../Home";
import $ from 'jquery'
import { useDispatch } from "react-redux";
import { setMainMode } from "../../slices/mainModeSlice";

function ReplayInfo(props) {

  const dispatch = useDispatch();
  function watchReplay() {
    const addURL = "?replayId=" + replays[i].ReplayId;
    window.history.replaceState(null, null, addURL);
    checkParamsExp();
    $('#ReplaysList').animate({
      left: '-150%',
    }, { duration: 700, easing: 'swing', queue: false, complete: function () { dispatch(setMainMode('home')) } });
  }

  const i = props.i;
  const replays = useSelector(state => state.replays.replays.replays)
  const matches = useSelector(state => state.replays.replays.matches)

  function formatDate(date) {
    const year = date.getFullYear()
    var month = date.getMonth() + 1;
    month = (month < 10 ? '0' + month : month)
    var day = date.getDate();
    day = (day < 10 ? '0' + day : day)
    var hours = date.getHours();
    hours = (hours < 10 ? '0' + hours : hours)
    var minutes = date.getMinutes();
    minutes = (minutes < 10 ? '0' + minutes : minutes)
    return (year + '-' + month + '-' + day + ' ' + hours + ':' + minutes)
  }

  return (
    <div className="replayInfo" style={{
      height: props.isScrollingUp ? '20%' : '17.5%',
      transition: 'height 0.5s'
    }}>
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'start', overflow: "hidden" }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>{replays[i].ReplayName}</div>
        <div style={{ flex: 2, display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', fontSize: '200%', alignItems: 'center', padding: '5px', fontWeight: 'bold' }}>{replays[i].ViewsCount}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>views</div>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>Sent: {replays[i].SentDate && formatDate(new Date(replays[i].SentDate))}</div>
      </div>
      <div className="replayMatches">
        {matches[i].map((m, index) => <MatchInfo key={index} match={m} i={index} replayIndex={i} />)}
      </div>
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={watchReplay} className="watchReplayButton">Watch</button>
      </div>
    </div>
  );
}

export default ReplayInfo;
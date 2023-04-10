import { useDispatch, useSelector } from "react-redux";
import { setMainMode } from "../../slices/mainModeSlice";
import $ from 'jquery'
import ReplayInfo from "./ReplayInfo";

function MostViewedReplays() {

  const dispatch = useDispatch();
  const replays = useSelector(state => state.replays.replays)

  function closeReplays() {
    dispatch(setMainMode('home'))
    console.log(replays);

    $('.roomlist-view').animate({
      left: '0%',
    }, { duration: 700, easing: 'swing', queue: false });

    $('#mostViewedReplays').animate({
      left: '150%',
    }, { duration: 700, easing: 'swing', queue: false });
  }

  return (
    <div id="mostViewedReplays">
      <h1>Most viewed replays</h1>
      <button onClick={closeReplays} id="closeReplaysButton" >Close ❌</button>
      {replays.map((r, index) => <ReplayInfo replay={r} key={index} />)}
    </div>
  );
}

export default MostViewedReplays;
import { useDispatch, useSelector } from "react-redux";
import { setMainMode } from "../../slices/mainModeSlice";
import $ from 'jquery'
import ReplayInfo from "./ReplayInfo";
import { useEffect } from "react";
import ReplaysFilters from "./ReplaysFilters";

function MostViewedReplays() {

  const dispatch = useDispatch();
  const replays = useSelector(state => state.replays.replays);

  function callbackFn() {
    dispatch(setMainMode('home'))
  }

  function closeReplays() {

    $('.roomlist-view').animate({
      left: '0%',
    }, { duration: 700, easing: 'swing', queue: false });

    $('#mostViewedReplays').animate({
      left: '150%',
    }, { duration: 700, easing: 'swing', queue: false, complete: { callbackFn } });
  }

  useEffect(() => {
    $('.roomlist-view').animate({
      left: '-150%',
    }, { duration: 700, easing: 'swing', queue: false });

    $('#mostViewedReplays').animate({
      left: '10%',
    }, { duration: 700, easing: 'swing', queue: false });
  })

  return (
    <div id="mostViewedReplays">
      <h1>Most viewed replays</h1>
      <button onClick={closeReplays} id="closeReplaysButton" >Close ❌</button>
      <div className="replaysContainer" style={{ display: 'flex', flexDirection: 'column' }}>
        <ReplaysFilters />
        <div style={{ height: '85%' }}>
          {replays.replays.map((r, index) => <ReplayInfo key={index} i={index} />)}
        </div>
      </div>
    </div>
  );
}

export default MostViewedReplays;
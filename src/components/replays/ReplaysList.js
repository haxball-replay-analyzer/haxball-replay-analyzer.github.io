import { useDispatch, useSelector } from "react-redux";
import { setMainMode } from "../../slices/mainModeSlice";
import $ from 'jquery'
import ReplayInfo from "./ReplayInfo";
import { useEffect } from "react";
import ReplaysFilters from "./ReplaysFilters";
import { setReplaysType } from "../../slices/replaysSlice";

function ReplaysList() {

  const dispatch = useDispatch();
  const replays = useSelector(state => state.replays.replays);
  const replaysType = useSelector(state => state.replays.type)

  function callbackFn() {
    dispatch(setMainMode('home'))
  }

  function closeReplays() {

    $('.roomlist-view').animate({
      left: '0%',
    }, { duration: 700, easing: 'swing', queue: false });

    $('#ReplaysList').animate({
      left: '150%',
    }, { duration: 700, easing: 'swing', queue: false, complete: { callbackFn } });
  }

  function changeReplaysType(ev) {
    console.log('e');
    if (ev.target.textContent.startsWith('Most vi')) dispatch(setReplaysType('mostViewed'))
    else dispatch(setReplaysType('latest'))
  }

  useEffect(() => {
    $('.roomlist-view').animate({
      left: '-150%',
    }, { duration: 700, easing: 'swing', queue: false });

    $('#ReplaysList').animate({
      left: '10%',
    }, { duration: 700, easing: 'swing', queue: false });
  })

  return (
    <div id="ReplaysList">
      <h1>{replaysType === 'mostViewed' ? 'Most viewed replays' : 'Latest replays'}</h1>
      <button onClick={closeReplays} id="closeReplaysButton" >Close ❌</button>
      <button id="otherReplaysButton" onClick={changeReplaysType}>{replaysType === 'mostViewed' ? 'Latest replays' : 'Most viewed replays'}</button>
      <div className="replaysContainer" style={{ display: 'flex', flexDirection: 'column' }}>
        <ReplaysFilters />
        <div style={{ height: '85%' }}>
          {replays.replays.map((r, index) => <ReplayInfo key={index} i={index} />)}
        </div>
      </div>
    </div>
  );
}

export default ReplaysList;
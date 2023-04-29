import { useDispatch, useSelector } from "react-redux";
import { setMainMode } from "../../slices/mainModeSlice";
import $ from 'jquery'
import ReplayInfo from "./ReplayInfo";
import { useEffect } from "react";
import ReplaysFilters from "./ReplaysFilters";
import { setReplaysType } from "../../slices/replaysSlice";
import { search4Replays } from "../Home";

function ReplaysList() {

  const dispatch = useDispatch();
  const replays = useSelector(state => state.replays.replays);
  const replaysType = useSelector(state => state.replays.type);
  var mainMode = useSelector(stats => stats.mainMode.value)

  function callbackFn() {
    dispatch(setMainMode('home'))
    console.log('nie robie tego');
  }

  function closeReplays() {

    $('.roomlist-view').animate({
      left: '0%',
    }, { duration: 700, easing: 'swing', queue: false });

    $('#ReplaysList').animate({
      left: '150%',
    }, { duration: 700, easing: 'swing', queue: false, complete: callbackFn });
  }

  function changeReplaysType(ev) {
    // console.log('e');
    const toSend = {
      header: 'top10',
      replaysType: (replaysType === 'latest' ? 'mostViewed' : 'latest')
    }
    if (ev.target.textContent.startsWith('Most vi')) dispatch(setReplaysType('mostViewed'))
    else dispatch(setReplaysType('latest'))
    search4Replays(toSend)
  }

  useEffect(() => {
    if (mainMode === 'replays') {
      $('.roomlist-view').animate({
        left: '-150%',
      }, { duration: 700, easing: 'swing', queue: false });

      $('#ReplaysList').animate({
        left: '10%',
      }, { duration: 700, easing: 'swing', queue: false });
    }
  })

  return (
    <div id="ReplaysList">
      <h1>{replaysType === 'mostViewed' ? 'Most viewed replays' : 'Latest replays'}</h1>
      <button onClick={closeReplays} id="closeReplaysButton" >Close ❌</button>
      <button id="otherReplaysButton" onClick={changeReplaysType}>{replaysType === 'mostViewed' ? 'Latest replays' : 'Most viewed replays'}</button>
      <div className="replaysContainer" style={{ display: 'flex', flexDirection: 'column' }}>
        <ReplaysFilters />
        <div className="replaysList" style={{ height: '85%' }}>
          {
            replays.replays.length !== 0 ?
              replays.replays.map((r, index) => <ReplayInfo key={index} i={index} />) :
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                <div style={{ textAlign: 'center' }}>There is no replay with given filters</div>
              </div>
          }
        </div>
      </div>
    </div>
  )
}
export default ReplaysList;
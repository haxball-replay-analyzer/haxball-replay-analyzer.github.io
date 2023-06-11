import { useDispatch, useSelector } from "react-redux";
import { setMainMode } from "../../slices/mainModeSlice";
import $ from 'jquery'
import ReplayInfo from "./ReplayInfo";
import { useEffect, useState } from "react";
import ReplaysFilters from "./ReplaysFilters";
import { setReplaysType, setLoadingMore } from "../../slices/replaysSlice";
import { loadMoreReplays, search4Replays } from "../Home";
import CircularProgress from '@mui/material/CircularProgress';

function ReplaysList() {

  const dispatch = useDispatch();
  const replays = useSelector(state => state.replays.replays);
  const replaysType = useSelector(state => state.replays.type);
  var mainMode = useSelector(stats => stats.mainMode.value)
  var replaysLoaded = useSelector(state => state.replays.loaded)
  const loadingMore = useSelector(state => state.replays.loadingMore)
  const allReplaysLoaded = useSelector(state => state.replays.allReplaysLoaded)
  const [isScrollingUp, setIsScrollingUp] = useState(true);

  function callbackFn() {
    dispatch(setMainMode('home'))
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
    const toSend = {
      header: 'top10',
      period: 'week',
      replaysType: (replaysType === 'latest' ? 'mostViewed' : 'latest')
    }
    if (ev.target.textContent.startsWith('Most vi')) dispatch(setReplaysType('mostViewed'))
    else dispatch(setReplaysType('latest'))
    search4Replays(toSend)
  }

  function handleScroll(ev) {
    if (ev.target.className !== 'replaysContainer') return;
    const scrollTop = ev.target.scrollTop;
    const isScrollingUpNow = scrollTop < ev.target.dataset.scrollTop;

    setIsScrollingUp(isScrollingUpNow);
    ev.target.dataset.scrollTop = scrollTop;

    if (ev.target.scrollTop === ev.target.scrollTopMax & ev.target.scrollTop !== 0) {
      if (!loadingMore) {
        dispatch(setLoadingMore(true));
        loadMoreReplays()
      }
    }
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

  useEffect(() => {
    setLoadingMore(false)
  }, [replays])

  return (
    <div id="ReplaysList">
      <h1>{replaysType === 'mostViewed' ? 'Most viewed replays' : 'Latest replays'}</h1>
      <button onClick={closeReplays} id="closeReplaysButton" >Close ❌</button>
      <button id="otherReplaysButton" onClick={changeReplaysType}>{replaysType === 'mostViewed' ? 'Latest replays' : 'Most viewed replays'}</button>
      <ReplaysFilters isScrollingUp={isScrollingUp} />
      <div className="replaysContainer" style={{ display: 'flex', flexDirection: 'column' }} onScrollCapture={handleScroll}>
        {replaysLoaded ? (
          <div className="replaysList" style={{ height: '100%' }}>
            {
              replays.replays.length !== 0 ?
                replays.replays.map((r, index) => <ReplayInfo key={index} i={index} isScrollingUp={isScrollingUp} />) :
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <div style={{ textAlign: 'center' }}>There is no replay with given filters</div>
                </div>
            }
            {loadingMore && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}> <CircularProgress /> </div>}
            {allReplaysLoaded && replays.replays.length !== 0 && <div style={{ textAlign: 'center', paddingTop: '10px', paddingBottom: '10px' }}>Found {replays.replays.length} replays with given filters</div>}
          </div>
        ) : (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85%' }}> <CircularProgress /> </div>)}
      </div>
    </div>
  )
}
export default ReplaysList;
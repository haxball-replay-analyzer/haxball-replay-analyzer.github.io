import Changelog from "./changelog/Changelog";
import $ from 'jquery'
import { handleFile } from "../game2.js";
import LoadingScreen from "./LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { setMainMode } from "../slices/mainModeSlice";
import { setDivStyle, setStats, setPlayerList, setPlayerPos, clearStats } from "../slices/gameStatsSlice";
import GameStats from "./game stats/GameStats";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useEffect } from "react";

export function showStats() { }
export function setGameStats() { }
export function dispatchPlayerList() { }
export function dispatchPlayerPos() { }
export function dispatchClearStats() { }
export function sendSocketMessage() { }

function Home() {

  const socketUrl = 'ws://localhost:8080/';
  const { sendMessage, readyState, getWebSocket } = useWebSocket(socketUrl);

  const dispatch = useDispatch();
  const mainMode = useSelector((state) => state.mainMode.value);
  const version = useSelector((state) => state.mainMode.version);

  function showStatsExp(elStyle) {
    const { offsetLeft, offsetTop, clientWidth, clientHeight } = elStyle;
    const offsetParentTop = elStyle.offsetParent.offsetTop;
    dispatch(setDivStyle({ offsetLeft, offsetTop, offsetParentTop, clientWidth, clientHeight }));
    dispatch(setMainMode('stats'));
  }

  function setGameStatsExp(stats) {
    dispatch(setStats(stats));
  }

  function setPlayerListExp(el) {
    dispatch(setPlayerList(el));
  }

  function setPlayerPosExp(el) {
    dispatch(setPlayerPos(el));
  }

  function dispatchClearStatsExp() {
    dispatch(clearStats());
  }

  function sendSocketMessageExp(m) {
    sendMessage(m);
  }

  showStats = showStatsExp;
  setGameStats = setGameStatsExp;
  dispatchPlayerList = setPlayerListExp;
  dispatchPlayerPos = setPlayerPosExp;
  dispatchClearStats = dispatchClearStatsExp;
  sendSocketMessage = sendSocketMessageExp;

  function callbackFn(e) {
    handleFile(e);
  }

  function handleChange(e) {

    // sendMessage('Hello');
    getWebSocket().onmessage = ev => console.log(ev.data);

    $(function () {

      $('.roomlist-view').animate({
        left: '-150%',
      }, { duration: 700, easing: 'swing', queue: false });

      $('#loading-screen').animate({
        left: '35vw',
      }, { duration: 700, easing: 'swing', queue: false, complete: function () { callbackFn(e) } });

    })

  }


  useEffect(() => {

  }, []);

  return (
    <>
      <div className='roomlist-view' style={{ zIndex: 5 }}>
        <div className="sqlReplays">
          <button>Most viewed replays</button>
          <button>New replays</button>
        </div>
        <div className='dialog'>
          <h1>Haxball Replay Analyzer v{version}</h1>
          <p>Contact: <br />Discord: Falafel#3895, you can find me at discord.io/haxracing<br />turbofalafel@gmail.com</p>
          <div className='file-btn'>
            <label htmlFor='replayfile'>
              <span style={{ float: 'left' }}>►</span>
              <span style={{ float: 'center' }}>Load replay</span>
            </label>
            <input id='replayfile' type='file' accept='.hbr2' data-hook='replayfile' onChange={handleChange} />
            <br /><br />
            <Changelog />
          </div>
        </div>
      </div>
      <LoadingScreen />
      {mainMode === 'stats' && <GameStats />}
    </>
  );
}

export default Home;
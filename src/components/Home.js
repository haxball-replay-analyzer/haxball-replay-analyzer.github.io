import Changelog from "./changelog/Changelog";
import $ from 'jquery'
// import "../game-original";
import { handleFile } from "../game2.js";
import LoadingScreen from "./LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { setMainMode } from "../slices/mainModeSlice";
import { setDivStyle, setStats, setPlayerList, setPlayerPos } from "../slices/gameStatsSlice";
import GameStats from "./game stats/GameStats";

export function showStats() { }
export function setGameStats() { }
export function dispatchPlayerList() { }
export function dispatchPlayerPos() { }

function Home() {

  const dispatch = useDispatch();
  const mainMode = useSelector((state) => state.mainMode.value)
  var divStyle = {};

  function showStatsExp(elStyle) {
    dispatch(setDivStyle(elStyle));
    dispatch(setMainMode('stats'));
    divStyle = elStyle.clientWidth;
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

  showStats = showStatsExp;
  setGameStats = setGameStatsExp;
  dispatchPlayerList = setPlayerListExp;
  dispatchPlayerPos = setPlayerPosExp;

  function callbackFn(e) {
    handleFile(e);
  }

  function handleChange(e) {

    $(function () {

      $('.roomlist-view').animate({
        left: '-150%',
      }, { duration: 700, easing: 'swing', queue: false });

      $('#loading-screen').animate({
        left: '35vw',
      }, { duration: 700, easing: 'swing', queue: false, complete: function () { callbackFn(e) } });

    })

  }

  return (
    <>
      <div className='roomlist-view'>
        <div className='dialog'>
          <h1>Haxball Replay Analyzer v2.0.0</h1>
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
      {mainMode === 'stats' && <GameStats divStyle={divStyle} />}
    </>
  );
}

export default Home;
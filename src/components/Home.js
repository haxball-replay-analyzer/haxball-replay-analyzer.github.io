import Changelog from "./changelog/Changelog";
import { useContext, useEffect } from "react";
import { AnalyzerContext } from "../App";
import $ from 'jquery'
// import "../game-original";
import { handleFile } from "../game2.js";
import LoadingScreen from "./LoadingScreen";
// import '../game-original.js'

export function setMode(e) {
  console.log('xd')
}

function Home() {

  const { mainMode, setMainMode } = useContext(AnalyzerContext);
  console.log(handleFile)

  function callbackFn(e) {
    console.log('zrobiene')
    handleFile(e);
  }

  function handleChange(e) {
    // $('.roomlist-view').slideUp(400, 'swing', function () {
    //   setMode('replay');
    //   handleFile(e)
    // })

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
    setMode = setMainMode;
  }, []);

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
    </>
  );
}

export default Home;
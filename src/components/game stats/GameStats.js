import { useSelector } from "react-redux";
import { useEffect } from "react";
import $ from 'jquery'

function GameStats() {

  const divStyle = useSelector((state) => state.gameStats.divStyle);
  // console.log(divStyle.clientWidth, divStyle.clientHeight)

  var offset = {
    left: divStyle.offsetLeft,
    top: divStyle.offsetTop + divStyle.offsetParent.offsetTop
  }

  useEffect(() => {
    console.log('montuję');

    $('#game-stats').animate({
      left: '10vw',
      opacity: 1,
      top: 0,
      width: '80vw',
      // height: 'calc(96vh - 35px)',
      height: '90%'
    }, { duration: 300, easing: 'swing', queue: false });

  }, [])

  return (
    <div data-hook='popups' style={{ display: 'flex' }}>
      <div id='game-stats' className="dialog kick-player-view" style={{ opacity: 0.5, overflowY: 'scroll', position: 'absolute', left: offset.left, top: offset.top, width: divStyle.clientWidth, height: divStyle.clientHeight }}>
        <h1 id="title" className="title">Match stats</h1>
        Tu będą se leganckie statystyki
      </div>
    </div>
  );
}

export default GameStats;
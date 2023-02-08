import React from "react";

function Replay() {
  return (
    <div id='game-state-view' className="game-state-view">
      <div className="bar-container" >
        <div className="bar">
          <div className="scoreboard">
            <div className="teamicon red"></div>
            <div className="score" data-hook="red-score">0</div>
            <div>-</div>
            <div className="score" data-hook="blue-score">0</div>
            <div className="teamicon blue"></div>
          </div>
          <div data-hook="timer"></div>
        </div>
      </div>
      <div className="canvas" data-hook="canvas"></div>
    </div>
  );
}

export default Replay;

// </div></div><div class=\'canvas\' data-hook=\'canvas\'></div></div>';

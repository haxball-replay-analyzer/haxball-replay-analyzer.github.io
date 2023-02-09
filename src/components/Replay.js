import RoomView from "./RoomView";
import { useState } from "react";
import FieldView from "./FieldView";

function Replay() {

  const [isField, setField] = useState(false);

  function handleButton() {
    setField(!isField);
  }

  return (
    <div className="game-view replayer" tabIndex={-1}>
      <div className="top-section" data-hook="gameplay-section">
        {isField ? <FieldView /> : <RoomView />}
      </div>
      <div className="bottom-section">
        <div className="stats-view" data-hook="stats">
          Ping: eeeee
        </div>
        <div className="chatbox-view" data-hook="chatbox"></div>
        <div className="buttons">
          <button data-hook="menu" onClick={handleButton}>☰ Menu
            <span className="tooltip">Toggle room menu [Escape]</span>
          </button>
          <button data-hook="settings" >⛭ Settings</button>
          <button id="button_staty" data-hook="staty" >📈 Game stats</button>
        </div>
        <div className="replay-controls-view">
          <button id="reset_button" data-hook='reset'>⏮</button>
          <button id="play_button" data-hook="play">
            <i className="playicon"></i>
          </button>
          <div data-hook="spd">1x</div>
          <button id="spddown">-</button>
          <button id="spdup">+</button>
          <div data-hook="time">00:00</div>
          <div className="timebar" data-hook="timebar">
            <div className="barbg">
              <div className="bar" data-hook='progbar'></div>
            </div>
            <div className="timetooltip" data-hook="timetooltip"></div>
          </div>
          <button id="button_leave">Leave</button>
        </div>
      </div>
    </div >
  );
}

export default Replay;

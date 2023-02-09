import { useContext } from "react";
import { AnalyzerContext } from "../App";

function RoomView() {

  const context = useContext(AnalyzerContext)
  // console.log(context.roomName)

  return (
    <div id="room-view" className="room-view" >
      <div className="container" >
        <h1>{context.roomName}</h1>
        <div className="header-btns">
          <button data-hook="rec-btn">
            <i className="icon-circle"></i>
            Rec
          </button>
          <button data-hook="link-btn">
            <i className="icon-link"></i>
            Link
          </button>
          <button data-hook="leave-btn">
            <i className="icon-logout"></i>
            Leave
          </button>
        </div>
        <div className="teams">
          <div className="tools admin-only">
            <button data-hook="auto-btn">Auto</button>
            <button data-hook="rand-btn">Rand</button>
            <button data-hook="lock-btn">Lock</button>
            <button data-hook="reset-all-btn">Reset</button>
          </div>
          <div data-hook="red-list"></div>
          <div data-hook="spec-list"></div>
          <div data-hook="blue-list"></div>
          <div className="spacer admin-only"></div>
        </div>
        <div className="settings">
          <div>
            <label className="lbl">Time limit</label>
            <select data-hook="time-limit-sel"></select>
          </div>
          <div>
            <label className="lbl">Score limit</label>
            <select data-hook="score-limit-sel"></select>
          </div>
          <div>
            <label className="val" data-hook="stadium-name">ee</label>
            <button className="admin-only" data-hook="stadium-pick">Pick</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomView;

// <div class=\'controls admin-only\'><button data-hook=\'start-btn\'><i class=\'icon-play\'></i>Start game</button><button data-hook=\'stop-btn\'><i class=\'icon-stop\'></i>Stop game</button><button data-hook=\'pause-btn\'><i class=\'icon-pause\'></i>Pause</button></div></div></div>';

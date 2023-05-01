import Changelog from "./changelog/Changelog";
import $ from 'jquery'
import { handleFile, replayFromSite } from "../game2.js";
import LoadingScreen from "./LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { setMainMode, setUserUploaded } from "../slices/mainModeSlice";
import { setDivStyle, setStats, setPlayerList, setPlayerPos, clearStats, setConnectHalves, setRedTeamName, setBlueTeamName, setConnectedHalves } from "../slices/gameStatsSlice";
import GameStats from "./game stats/GameStats";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useEffect, useState } from "react";
import ReplaysList from "./replays/ReplaysList";
import { setReplays, setReplaysType } from "../slices/replaysSlice";
import { openModal } from "./Modal";

export function showStats() { }
export function setGameStats() { }
export function dispatchPlayerList() { }
export function dispatchPlayerPos() { }
export function dispatchClearStats() { }
export function sendSocketMessage() { }
export function sendMessageExp() { }
export function search4Replays() { }
export function checkParamsExp() { }
export function changeTeamNames() { }

var queryMessage = {};
var replayData = [];
var waitingForStats = true;
var waitingForSocket = true;
var replayIdToSend;

function Home() {

  const socketUrl = 'ws://34.116.179.44:8080/';
  const STATIC_OPTIONS = {
    onOpen: () => {
      // console.log('Connected with WebSocket')
      getWebSocket().onmessage = ev => receiveMessage(ev);
      if (!paramsChecked) {
        checkParams();
        setParamsChecked(true)
      }
    },
    onClose: (e) => {
      // console.log('Connection closed', e.reason);
    },
    shouldReconnect: (closeEvent) => false
  }
  const { sendMessage, readyState, getWebSocket } = useWebSocket(socketUrl, STATIC_OPTIONS);
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const dispatch = useDispatch();
  const mainMode = useSelector((state) => state.mainMode.value);
  const version = useSelector((state) => state.mainMode.version);
  const userDidUpload = useSelector(state => state.mainMode.userUploaded);
  const [replayId, setReplayId] = useState(null);
  const [replayName, setReplayName] = useState(null);
  const [replayLastModified, setLastModified] = useState(null);
  const [paramsChecked, setParamsChecked] = useState(false);
  const [IP, setIP] = useState(null)

  function receiveMessage(m) {
    const x = JSON.parse(m.data);
    if (x.header === 'insertedReplayId') {
      const addURL = "?replayId=" + x.id;
      window.history.pushState(null, null, addURL);
      setReplayId(x.id);
      waitingForSocket = false;
      replayIdToSend = x.id;
      if (!waitingForStats) {
        sendMessage(JSON.stringify(queryMessage));
      }
    } else if (x.header === 'replayPart') {
      replayData = replayData.concat(x.rec.data);
    } else if (x.header === 'replaySent') {
      if (x?.connectHalves) dispatch(setConnectHalves(true))
      else dispatch(setConnectHalves(false))

      for (var i = 0; i < x.teamNames.length; i++) {
        const j = Math.floor(i / 2);
        if (i % 2 === 0) {
          dispatch(setRedTeamName({ mtc: j, name: x.teamNames[i].TeamName }))
        } else dispatch(setBlueTeamName({ mtc: j, name: x.teamNames[i].TeamName }))
      }

      const y = replayData;
      const buffer = new ArrayBuffer(y.length);
      const uint8View = new Uint8Array(buffer);
      for (let i = 0; i < y.length; i++) {
        uint8View[i] = y[i]; // zapisywanie danych z tablicy do bufora ArrayBuffer
      }
      const newBuffer = uint8View.buffer; // konwersja widoku Uint8Array na ArrayBuffer
      dispatch(setUserUploaded(false));
      replayData = [];

      $(function () {

        $('.roomlist-view').animate({
          left: '-150%',
        }, { duration: 700, easing: 'swing', queue: false });

        $('#loading-screen').animate({
          left: '35vw',
        }, { duration: 700, easing: 'swing', queue: false, complete: function () { replayFromSite(newBuffer); } });

      })
    } else if (x.header === 'alreadyUploaded') {
      const addURL = "?replayId=" + x.replayId;
      window.history.pushState(null, null, addURL);
      setReplayId(x.id);
      openModal('This recording has already been uploaded. Redirected to this replay.', 'darkgoldenrod', 5)
    } else if (x.header === 'top10 stats') {
      for (var i = 0; i < x.replays.replays.length; i++) {
        if (x.replays.replays[i].ConnectedHalves) {
          connectHalves(x.replays, i)
        }
      }
      dispatch(setReplays(x.replays));
      dispatch(setMainMode('replays'));
    } else if (x.header === 'invalidLink') {
      openModal('Invalid link - replay with given ID doesn\'t exist', 'darkgoldenrod', 4)
    }
  }

  function connectHalves(replays, i) {
    const firstMatchId = replays.matches[i][0].MatchId;
    const firstTeamId = replays.teams[i][0].TeamId;
    const teamIds = [firstTeamId, firstTeamId + 1, firstTeamId + 2, firstTeamId + 3]
    for (let goal of replays.goals[i]) {
      goal.MatchId = firstMatchId;
    }
    replays.matches[i][0].RedScore += replays.matches[i][1].BlueScore;
    replays.matches[i][0].BlueScore += replays.matches[i][1].RedScore;
    replays.matches[i].splice(1, 1);
    var tempPlayers = [];
    for (let player of replays.players[i]) {
      if (!tempPlayers.includes(player.Nick)) {
        if (player.TeamId === teamIds[2]) player.TeamId = teamIds[1];
        if (player.TeamId === teamIds[3]) player.TeamId = teamIds[0];
      }
      tempPlayers.push(player.Nick)
    }
  }

  function checkParams() {
    const params = window.location.toLocaleString().split('?replayId=');
    if (params.length > 1) {
      const toSend = {
        header: 'select',
        id: params[1]
      }
      sendMessage(JSON.stringify(toSend))
    }
  }

  function showReplays(ev) {
    if (connectionStatus === 'Open') {
      if (ev.target.textContent === 'Most viewed replays') {
        var replaysType = 'mostViewed'
      } else {
        var replaysType = 'latest'
      }

      dispatch(setReplaysType(replaysType))

      const toSend = {
        header: 'top10',
        period: 'week',
        replaysType: replaysType
      }
      sendMessage(JSON.stringify(toSend))
    } else {
      openModal('Error: Can\'t connect to server. Try again later.', 'darkred', 4)
    }
  }

  async function getIP() {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json();
    setIP(data.ip)
  }

  function showStatsExp(elStyle) {
    const { offsetLeft, offsetTop, clientWidth, clientHeight } = elStyle;
    const offsetParentTop = elStyle.offsetParent.offsetTop;
    dispatch(setDivStyle({ offsetLeft, offsetTop, offsetParentTop, clientWidth, clientHeight }));
    dispatch(setMainMode('stats'));
  }

  function setGameStatsExp(stats) {
    dispatch(setStats(stats));
    if (userDidUpload) {
      var message = [];
      for (var i = 0; i < stats.length; i++) {
        const match = stats[i];
        dispatch(setRedTeamName({ mtc: i, name: 'RED' }))
        dispatch(setBlueTeamName({ mtc: i, name: 'BLUE' }))
        message.push({
          blueTeam: match.blueTeam,
          goals: match.goals,
          redTeam: match.redTeam,
          scoreBlue: match.scoreBlue,
          scoreRed: match.scoreRed,
          spaceMode: match.spaceMode,
          realSoccerMode: match.realSoccerMode,
          stadiumName: match.stadium.name
        })
      }
      const toSend = {
        header: 'setStats',
        stats: message,
        replayId: replayIdToSend,
        replayName: replayName,
        lastModified: replayLastModified,
        IP: IP
      }
      queryMessage = toSend;
      waitingForStats = false;
      if (!waitingForSocket) {
        sendMessage(JSON.stringify(queryMessage))
      }
    }
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

  changeTeamNames = function (names, matchId) {
    const toSend = {
      header: 'changeTeamNames',
      names: names,
      matchId: matchId,
      replayId: replayId
    }
    sendMessage(JSON.stringify(toSend))
  }

  sendMessageExp = function (m) {
    sendMessage(JSON.stringify(m))
  }

  sendSocketMessage = function (m, n, o) {
    setReplayName(n);
    if (m.byteLength > 50_000) {
      var replayParts = [];
      var x = new Uint8Array(m);
      x = Array.from(x)
      do {
        replayParts.push(x.splice(0, 50_000))
      } while (x.length > 50_000)
      replayParts.push(x);
      for (let part of replayParts) {
        const buffer = new ArrayBuffer(part.length);
        const uint8View = new Uint8Array(buffer);
        for (let i = 0; i < part.length; i++) {
          uint8View[i] = part[i]; // zapisywanie danych z tablicy do bufora ArrayBuffer
        }
        const newBuffer = uint8View.buffer;
        sendMessage(newBuffer)
      }
    } else {
      sendMessage(m)
    }
    const toSend = {
      header: 'replaySent'
    }
    sendMessage(JSON.stringify(toSend))
    setLastModified(o);
  }

  search4Replays = function (toSend) {
    sendMessage(JSON.stringify(toSend))
  }

  showStats = showStatsExp;
  setGameStats = setGameStatsExp;
  dispatchPlayerList = setPlayerListExp;
  dispatchPlayerPos = setPlayerPosExp;
  dispatchClearStats = dispatchClearStatsExp;
  checkParamsExp = function () {
    checkParams();
  }

  function callbackFn(e) {
    handleFile(e);
  }

  function handleChange(e) {

    dispatch(setUserUploaded(true));
    dispatch(setConnectHalves(false))
    dispatch(setConnectedHalves(false))
    setReplayId(null);
    waitingForSocket = true;
    waitingForStats = true;

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
    getIP();
  }, []);

  return (
    <>
      <div className='roomlist-view' style={{ zIndex: 5 }}>
        <div className="sqlReplays">
          <button onClick={showReplays}>Most viewed replays</button>
          <button onClick={showReplays}>Latest replays</button>
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
          </div>
          <Changelog />
        </div>
      </div>
      <LoadingScreen />
      {mainMode === 'stats' && <GameStats replayId={replayId} />}
      {mainMode === 'replays' && <ReplaysList />}
    </>
  );
}

export default Home;
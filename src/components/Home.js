import Changelog from "./changelog/Changelog";
import $ from 'jquery'
import { handleFile, replayFromSite } from "../game2.js";
import LoadingScreen from "./LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { setMainMode, setUserUploaded } from "../slices/mainModeSlice";
import { setDivStyle, setStats, setPlayerList, setPlayerPos, clearStats } from "../slices/gameStatsSlice";
import GameStats from "./game stats/GameStats";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useEffect, useState } from "react";
import MostViewedReplays from "./replays/MostViewedReplays";

export function showStats() { }
export function setGameStats() { }
export function dispatchPlayerList() { }
export function dispatchPlayerPos() { }
export function dispatchClearStats() { }
export function sendSocketMessage() { }

var queryMessages = [];

function Home() {

  const socketUrl = 'ws://localhost:8080/';
  const STATIC_OPTIONS = {
    onOpen: () => {
      console.log('Connected with WebSocket')
      if (paramsChecked) {
        sendQueryMessages();
      } else {
        checkParams();
        setParamsChecked(true)
      }
    },
    onClose: () => {
      console.log('Connection closed');
    },
    shouldReconnect: (closeEvent) => true
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

  function queryMessage(m) {
    // console.log(connectionStatus, m);
    // if (connectionStatus === 'Open') sendMessage(m)
    /*else*/ queryMessages.push(m);
  }

  function checkConnection() {
    // console.log('wysyłam przechowywane wiadomości', queryMessages);
    console.log('sprawdzam połączenie')
    sendMessage('ping');
  }

  function sendQueryMessages() {
    console.log('próbuję wysłać oczekujące wiadomości: ', queryMessages)
    if (queryMessages.length > 0) {
      setTimeout(function () {
        sendMessage(queryMessages[0]);
      }, 1000)
    }
  }

  function receiveMessage(m) {
    if (m.data === 'pong') {
      console.log('pong')
      sendQueryMessages();
      return;
    }
    const x = JSON.parse(m.data);
    if (x.header === 'insertedReplayId') {
      const addURL = "?replayId=" + x.id;
      window.history.replaceState(null, null, addURL);
      setReplayId(x.id);
      sendMessage(queryMessages[1]);
      queryMessages = [];
    } else if (x.header === 'selected') {
      const y = x.rec.data
      const buffer = new ArrayBuffer(y.length);
      const uint8View = new Uint8Array(buffer);
      for (let i = 0; i < y.length; i++) {
        uint8View[i] = y[i]; // zapisywanie danych z tablicy do bufora ArrayBuffer
      }
      const newBuffer = uint8View.buffer; // konwersja widoku Uint8Array na ArrayBuffer
      // console.log(newBuffer); // wyświetlenie ArrayBuffer w konsoli
      dispatch(setUserUploaded(false));

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
      window.history.replaceState(null, null, addURL);
      setReplayId(x.id);
    }
  }

  function checkParams() {
    getWebSocket().onmessage = ev => receiveMessage(ev);
    const params = window.location.toLocaleString().split('?replayId=');
    if (params.length > 1) {
      // console.log('Pokażę powtórkę nr ', params[1]);
      const toSend = {
        header: 'select',
        id: params[1]
      }
      queryMessage(JSON.stringify(toSend))
    }
  }

  function showReplays() {
    // sendMessage('poka') musi być header i coś
    $(function () {

      $('.roomlist-view').animate({
        left: '-150%',
      }, { duration: 700, easing: 'swing', queue: false });

      $('#loading-screen').animate({
        left: '35vw',
      }, { duration: 700, easing: 'swing', queue: false });

    })


    // dispatch(setMainMode('replays'))

    // $('.roomlist-view').animate({
    //   left: '-150%',
    // }, { duration: 700, easing: 'swing', queue: false });

    // $('#mostViewedReplays').animate({
    //   left: '10%',
    // }, { duration: 700, easing: 'swing', queue: false });
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
      for (let match of stats) {
        message.push({
          blueTeam: match.blueTeam,
          goals: match.goals,
          redTeam: match.redTeam,
          scoreBlue: match.scoreBlue,
          scoreRed: match.scoreRed,
          spaceMode: match.spaceMode,
          stadiumName: match.stadium.name
        })
      }
      const toSend = {
        header: 'setStats',
        stats: message,
        replayId: replayId,
        replayName: replayName,
        lastModified: replayLastModified
      }
      // queryMessage(JSON.stringify(toSend))
      console.log('przyszły staty, próbuję sprawdzić połączenie')
      // checkConnection();
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

  sendSocketMessage = function (m, n, o) {
    console.log('a');
    setReplayName(n);
    // queryMessages.push(m);
    setLastModified(o);
    console.log(queryMessages);
  }

  showStats = showStatsExp;
  setGameStats = setGameStatsExp;
  dispatchPlayerList = setPlayerListExp;
  dispatchPlayerPos = setPlayerPosExp;
  dispatchClearStats = dispatchClearStatsExp;

  function callbackFn(e) {
    handleFile(e);
  }

  function handleChange(e) {

    // sendMessage('Hello');
    dispatch(setUserUploaded(true));
    setReplayId(null)

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
          <button onClick={showReplays}>Most viewed replays</button>
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
      <MostViewedReplays />
    </>
  );
}

export default Home;
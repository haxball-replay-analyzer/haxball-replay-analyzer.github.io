import Changelog from "./changelog/Changelog";
import $ from 'jquery'
import { handleFile, replayFromSite, configureReplayer } from "../game2.js";
import LoadingScreen from "./LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { setMainMode, setUserUploaded } from "../slices/mainModeSlice";
import { setDivStyle, setStats, setPlayerList, setPlayerPos, clearStats, setConnectHalves, setRedTeamName, setBlueTeamName, setConnectedHalves } from "../slices/gameStatsSlice";
import GameStats from "./game stats/GameStats";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useEffect, useRef, useState } from "react";
import ReplaysList from "./replays/ReplaysList";
import { setReplays, setReplaysLoaded, setReplaysType, setLoadingMore, addMoreReplays } from "../slices/replaysSlice";
import { openModal } from "./Modal";
import Downloading from "./Downloading";

export function sendMessageExp() { }
export function search4Replays() { }
export function checkParamsExp() { }
export function changeTeamNames() { }
export function loadMoreReplays() { }

var queryMessage = {};
var replayData = [];
var waitingForStats = true;
var waitingForSocket = true;
var replayIdToSend;
var replaySource = null; // 'file', 'server' albo 'thehax': skąd jest wczytywana powtórka

// Adres serwera powtórek (TD-012). VITE_HBRA_SOCKET_URL: adres ws:// albo wss://, albo `off` (bez serwera).
// Bez zmiennej: build strony łączy się z produkcją, a `npm start` (tryb deweloperski) pracuje bez serwera,
// żeby próbne powtórki nie trafiały do publicznej bazy.
const PRODUCTION_SOCKET_URL = 'wss://haxball-replay-analyzer.com:443/';

function configuredSocketUrl() {
  const fromEnv = (import.meta.env.VITE_HBRA_SOCKET_URL || '').trim();
  const url = fromEnv !== '' ? fromEnv : (import.meta.env.DEV ? 'off' : PRODUCTION_SOCKET_URL);
  return url === 'off' ? null : url;
}

const SOCKET_URL = configuredSocketUrl();
const RECONNECT_ATTEMPTS = 5;

// Parametr powtórki w adresie strony (TD-013): `?replayId=<liczba>` to powtórka z serwera HBRA,
// `?thehax=<UUID>` to plik z replay.thehax.pl. Do serwera HBRA idzie tylko poprawne id liczbowe.
const THEHAX_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SERVER_REPLAY_ID = /^[1-9][0-9]{0,14}$/;

function readReplayParam() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('replayId')) {
    const id = params.get('replayId').trim();
    return SERVER_REPLAY_ID.test(id) ? { kind: 'server', id: Number(id) } : { kind: 'invalid' };
  }
  if (params.has('thehax')) {
    const uuid = params.get('thehax').trim();
    return THEHAX_UUID.test(uuid) ? { kind: 'thehax', uuid: uuid } : { kind: 'invalid' };
  }
  return null;
}

function isHbr2(buffer) {
  const head = new Uint8Array(buffer, 0, Math.min(4, buffer.byteLength));
  return String.fromCharCode(...head) === 'HBR2';
}

function Home() {

  // Ponowne łączenie tylko po zerwaniu połączenia, które już działało: gdy serwer jest wyłączony,
  // strona nie ponawia prób przy każdym wejściu.
  const wasOpenRef = useRef(false);
  // Powtórka z `?replayId=` czekająca na otwarcie połączenia.
  const pendingServerReplayRef = useRef(null);
  const STATIC_OPTIONS = {
    onOpen: () => {
      // console.log('Connected with WebSocket')
      wasOpenRef.current = true;
      getWebSocket().onmessage = ev => receiveMessage(ev);
      if (pendingServerReplayRef.current !== null) {
        const id = pendingServerReplayRef.current;
        pendingServerReplayRef.current = null;
        requestServerReplay(id);
      }
    },
    onClose: (e) => {
      console.log('Connection closed', e.reason);
    },
    shouldReconnect: () => wasOpenRef.current,
    reconnectAttempts: RECONNECT_ATTEMPTS,
    reconnectInterval: (attempt) => Math.min(1000 * 2 ** attempt, 16000)
  }
  const { sendMessage, readyState, getWebSocket } = useWebSocket(SOCKET_URL, STATIC_OPTIONS);
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
  const [IP, setIP] = useState(null);
  const [analysisProgress, setAnalysisProgress] = useState(null); // 0..1, analiza w Web Workerze
  const filterPlayer = useSelector(state => state.replays.filters.player)
  const filterTeam = useSelector(state => state.replays.filters.team)
  const filterReplay = useSelector(state => state.replays.filters.replay)
  const filterGoal = useSelector(state => state.replays.filters.goal)
  const filterStadium = useSelector(state => state.replays.filters.stadium)
  const filterSpaceMode = useSelector(state => state.replays.filters.spaceMode)
  const filterRealSoccer = useSelector(state => state.replays.filters.realSoccer)
  const searchText = useSelector(state => state.replays.filters.searchText)
  const periodState = useSelector(state => state.replays.filters.period)
  const replaysType = useSelector(state => state.replays.type);
  const replays = useSelector(state => state.replays.replays);
  const replaysQty = replays.replays?.length;
  const startDate = useSelector(state => state.replays.filters.startDate)
  const endDate = useSelector(state => state.replays.filters.endDate)

  function receiveMessage(m) {
    const x = JSON.parse(m.data);
    // console.log(x);
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
      replaySource = 'server';
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

        $('#downloading-screen').animate({
          left: '-150%',
        }, { duration: 700, easing: 'swing', queue: false, complete: function () { $("#downloading-screen").css('left', '100%') } });

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
      // console.log(x.replays);
      dispatch(setReplaysLoaded(true));
      dispatch(setReplays(x.replays));
      dispatch(setMainMode('replays'));
    } else if (x.header === 'invalidLink') {
      openModal('Invalid link - replay with given ID doesn\'t exist', 'darkgoldenrod', 4)
    } else if (x.header === 'next10 stats') {
      for (var i = 0; i < x.replays.replays.length; i++) {
        if (x.replays.replays[i].ConnectedHalves) {
          connectHalves(x.replays, i)
        }
      }
      if (x.replays.replays.length > 0) dispatch(addMoreReplays(x.replays));
      dispatch(setLoadingMore(false))
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

  // Wołane raz przy wejściu na stronę i z listy powtórek (ReplayInfo ustawia `?replayId=`).
  function checkParams() {
    const param = readReplayParam();
    if (param === null) return;
    if (param.kind === 'invalid') {
      openModal('Invalid replay ID format', 'darkgoldenrod', 4);
    } else if (param.kind === 'thehax') {
      loadFromTheHax(param.uuid);
    } else if (SOCKET_URL === null) {
      openModal('Replay server is turned off in this build.', 'darkgoldenrod', 4);
    } else {
      const ws = getWebSocket();
      if (ws && ws.readyState === WebSocket.OPEN) requestServerReplay(param.id);
      else pendingServerReplayRef.current = param.id; // wyśle onOpen
    }
  }

  function showDownloadingScreen() {
    $(function () {

      $('.roomlist-view').animate({
        left: '-150%',
      }, { duration: 700, easing: 'swing', queue: false });

      $('#downloading-screen').animate({
        left: '35vw',
      }, { duration: 700, easing: 'swing', queue: false });

    })
  }

  function hideDownloadingScreen() {
    $(function () {
      $('#downloading-screen').animate({
        left: '-150%',
      }, { duration: 700, easing: 'swing', queue: false, complete: function () { $("#downloading-screen").css('left', '100%') } });

      $('.roomlist-view').animate({
        left: 0,
      }, { duration: 700, easing: 'swing', queue: false });
    })
  }

  function requestServerReplay(id) {
    sendMessage(JSON.stringify({ header: 'select', id: id }))
    showDownloadingScreen();
  }

  function loadFromTheHax(uuid) {
    showDownloadingScreen();

    fetch(`https://replay.thehax.pl/${uuid}/download`)
      .then(response => {
        if (!response.ok) {
          openModal('Replay not found', 'darkred', 4);
          return null;
        }
        if (response.headers.get('content-length') === '0') {
          openModal('Replay is empty', 'darkred', 4);
          return null;
        }
        return response.arrayBuffer()
      })
      .then(data => {
        if (data === null || data.byteLength === 0) {
          if (data !== null) openModal('Replay is empty', 'darkred', 4);
          hideDownloadingScreen();
          return;
        }
        // Dla nieistniejącej powtórki thehax.pl odpowiada stroną HTML ze statusem 200; plik .hbr2 zaczyna się od „HBR2”.
        if (!isHbr2(data)) {
          openModal('Replay not found', 'darkred', 4);
          hideDownloadingScreen();
          return;
        }
        replaySource = 'thehax';
        dispatch(setConnectHalves(false))
        const buffer = data; // dane są już w formacie ArrayBuffer
        dispatch(setUserUploaded(false));
        replayData = [];

        $(function () {
          $('#downloading-screen').animate({
            left: '-150%',
          }, { duration: 700, easing: 'swing', queue: false, complete: function () { $("#downloading-screen").css('left', '100%') } });

          $('#loading-screen').animate({
            left: '35vw',
          }, { duration: 700, easing: 'swing', queue: false, complete: function () { replayFromSite(buffer); } });
        })
      })
      .catch(err => {
        console.error('Błąd podczas pobierania danych:', err);
        openModal('Error: Can\'t download the replay. Try again later.', 'darkred', 4);
        hideDownloadingScreen();
      });
  }

  function showReplays(ev) {
    // console.log('showreplays');
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
    } else if (connectionStatus === 'Connecting') {
      openModal('Connecting to server... Please try again after few seconds.', 'darkgoldenrod', 4)
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
    // Nazwy drużyn: powtórka z serwera HBRA ma swoje (komunikat `replaySent`), plik z dysku i z thehax.pl nie.
    if (replaySource !== 'server') {
      for (var i = 0; i < stats.length; i++) {
        dispatch(setRedTeamName({ mtc: i, name: 'RED' }))
        dispatch(setBlueTeamName({ mtc: i, name: 'BLUE' }))
      }
    }
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

  loadMoreReplays = function (a) {
    const toSend = {
      header: 'next10 filtered',
      replaysType: replaysType,
      searchText: searchText,
      filterPlayer: filterPlayer,
      filterGoal: filterGoal,
      filterRealSoccer: filterRealSoccer,
      filterReplay: filterReplay,
      filterSpaceMode: filterSpaceMode,
      filterStadium: filterStadium,
      filterTeam: filterTeam,
      period: periodState,
      alreadyLoaded: replaysQty,
      startDate: startDate,
      endDate: endDate
    }
    sendMessage(JSON.stringify(toSend))
  }

  sendMessageExp = function (m) {
    sendMessage(JSON.stringify(m))
  }

  function uploadReplay(m, n, o) {
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
    dispatch(setReplaysLoaded(false));
    sendMessage(JSON.stringify(toSend))
  }

  // Przy każdym renderze, tak jak dawniej nadpisywane eksporty: funkcje widzą bieżące
  // userDidUpload, IP, replayName (stan z tego renderu).
  configureReplayer({
    onShowStats: showStatsExp,
    onStats: setGameStatsExp,
    onPlayerList: setPlayerListExp,
    onPlayerPos: setPlayerPosExp,
    onClearStats: dispatchClearStatsExp,
    onUpload: uploadReplay,
    onMessage: (message, color, seconds) => openModal(message, color, seconds),
    onProgress: setAnalysisProgress
  });
  checkParamsExp = function () {
    checkParams();
  }

  function callbackFn(e) {
    handleFile(e);
  }

  function handleChange(e) {

    replaySource = 'file';
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
    checkParams();
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
      <Downloading />
      <LoadingScreen progress={analysisProgress} />
      {mainMode === 'stats' && <GameStats replayId={replayId} />}
      {mainMode === 'replays' && <ReplaysList />}
    </>
  );
}

export default Home;
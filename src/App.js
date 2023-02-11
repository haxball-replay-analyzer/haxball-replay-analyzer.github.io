import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { useState, createContext, useEffect } from 'react';
import './game.js'
import Replay from './components/Replay';
import LoadingScreen from './components/LoadingScreen';
import $ from 'jquery'

export const AnalyzerContext = createContext(null);

export function setName() {
  console.log('nic sie nie zmienia')
}

export function setRec() {
  console.log('error')
}

function App() {

  const [mainMode, setMainMode] = useState("home");
  const [roomName, setRoomName] = useState('room name');
  const [recInfo, setRecInfo] = useState({})

  setName = setRoomName;
  setRec = setRecInfo;

  useEffect(() => {
    $('#mainDiv').fadeIn(700)
  }, [])

  return (
    <AnalyzerContext.Provider value={{ mainMode, setMainMode, roomName, setRoomName }}>
      <div id='mainDiv' className="container flexCol" style={{ display: 'none' }}>
        <Header />
        <div className="flexRow flexGrow">
          {mainMode === 'home' && <Home />}
          {mainMode === 'loading' && <LoadingScreen />}
          {mainMode === 'replay' && <Replay />}
        </div>
      </div>
    </AnalyzerContext.Provider>
  );
}

export default App;

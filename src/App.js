import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { useState, createContext } from 'react';
import './game.js'
import Replay from './components/Replay';

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

  return (
    <AnalyzerContext.Provider value={{ mainMode, setMainMode, roomName, setRoomName }}>
      <div className="container flexCol">
        <Header />
        {mainMode === 'home' && <Home />}
        {mainMode === 'replay' && <Replay />}
      </div>
    </AnalyzerContext.Provider>
  );
}

export default App;

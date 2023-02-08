import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { useState, createContext } from 'react';
import './game.js'
import Replay from './components/Replay';

export const AnalyzerContext = createContext(null);

function App() {

  const [mainMode, setMainMode] = useState("home");

  return (
    <AnalyzerContext.Provider value={{ mainMode, setMainMode }}>
      <div className="container flexCol">
        <Header />
        {mainMode === 'home' && <Home />}
        {mainMode === 'replay' && <Replay />}
      </div>
    </AnalyzerContext.Provider>
  );
}

export default App;

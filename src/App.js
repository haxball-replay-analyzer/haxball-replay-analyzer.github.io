import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import React, { useEffect } from 'react';
import Replay from './components/Replay';
import LoadingScreen from './components/LoadingScreen';
import $ from 'jquery'
import { useSelector } from 'react-redux'

function App() {

  const mainMode = useSelector((state) => state.mainMode.value)

  useEffect(() => {
    $('#mainDiv').fadeIn(700)
  }, [])

  return (
    <div id='mainDiv' className="container flexCol" style={{ display: 'none' }}>
      <Header />
      <div className="flexRow flexGrow">
        <Home />
      </div>
    </div>
  );
}

export default App;

import './App.scss';
import Header from './components/Header';
import Home from './components/Home';
import React, { useEffect } from 'react';
import $ from 'jquery'
import Modal from './components/Modal';

function App() {

  useEffect(() => {
    $('#mainDiv').fadeIn(700)
  }, [])

  return (
    <div id='mainDiv' className="container flexCol" style={{ display: 'none' }}>
      <Header />
      <div className="flexRow flexGrow">
        <Home />
        <Modal />
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { startApp } from './game2.js';

// Interfejs odtwarzacza HaxBall startuje przed Reactem, tak jak dawniej przy imporcie game2.js.
startApp();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

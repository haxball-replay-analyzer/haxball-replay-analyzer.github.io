import { useEffect } from "react";
import $ from 'jquery'

function LoadingScreen() {

  return (
    <div id='loading-screen' className="loading">
      <h1>Analyzing... 5%</h1>
      <div style={{ borderStyle: 'solid', borderWidth: 2, borderColor: '#c13535', borderRadius: 8, margin: 5, width: '25vw', alignSelf: 'center' }}>
        <div id="box" style={{ backgroundColor: '#e4e5f1', height: 20, width: '50%', borderRadius: 8 }}></div>
      </div>
    </div>
  );
}

export default LoadingScreen;
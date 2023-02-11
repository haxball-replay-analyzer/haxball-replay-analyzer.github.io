import { useEffect, useState } from "react";

export function setLoadingProgress2(x) { }

function LoadingScreen() {

  const [loadingProgress, setLoadingProgress] = useState('0%')

  useEffect(() => {
    setLoadingProgress2 = setLoadingProgress;
  }, [])

  useEffect(() => {
    console.log(loadingProgress)
  }, [loadingProgress])

  return (
    <div id='loading-screen' className="loading">
      <h1>Analyzing...</h1>
      {/* <div style={{ borderStyle: 'solid', borderWidth: 2, borderColor: '#c13535', borderRadius: 8, margin: 5, width: '25vw', alignSelf: 'center' }}>
        <div id="loading-progress" style={{ backgroundColor: '#e4e5f1', height: 20, width: loadingProgress, borderRadius: 8 }}></div>
      </div> */}
      Please wait, it may a take few seconds.
    </div>
  );
}

export default LoadingScreen;
// Ekran „Analyzing...”: od TD-019 analiza idzie w Web Workerze, więc strona może pokazać postęp.
function LoadingScreen({ progress }) {
  const percent = progress == null ? null : Math.round(100 * progress);
  return (
    <div id='loading-screen' className="loading">
      <h1>Analyzing...{percent != null && ` ${percent}%`}</h1>
      Please wait, it may take a few seconds.
      {percent != null && (
        <div className='loading-progress' role='progressbar' aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
          <div style={{ width: `${percent}%` }} />
        </div>
      )}
    </div>
  );
}

export default LoadingScreen;

import Changelog from "./changelog/Changelog";

function Home() {
  return (
    <div class='roomlist-view'>
      <div class='dialog'>
        <h1>Haxball Replay Analyzer v2.0.0</h1>
        <p>Contact: <br />Discord: Falafel#3895, you can find me at discord.io/haxracing<br />turbofalafel@gmail.com</p>
        <div class='file-btn'>
          <label for='replayfile'>
            <span style={{ float: 'left' }}>►</span>
            <span style={{ float: 'center' }}>Load replay</span>
          </label>
          <input id='replayfile' type='file' accept='.hbr2' data-hook='replayfile' />
          <br /><br />
          <Changelog />
        </div>
      </div>
    </div>
  );
}

export default Home;
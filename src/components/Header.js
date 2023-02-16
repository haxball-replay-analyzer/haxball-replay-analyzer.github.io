import { useSelector } from "react-redux";

function Header() {

  const version = useSelector((state) => state.mainMode.version);

  return (
    <div className="header">
      <span className="title">Haxball Replay Analyzer v{version}</span>
      <a href="http://blog.haxball.com" target="_blank" rel='noreferrer'>News</a>
      <a href="https://www.haxball.com/play" className="active" target="_blank" rel='noreferrer'>Play</a>
      <a href="https://www.haxball.com/community" target="_blank" rel='noreferrer'>Community</a>
      <a href="https://www.discord.io/haxracing" target="_blank" rel='noreferrer'>HaxRacing</a>
      <a href="https://haxball-stadium-editor.github.io" target="_blank" rel='noreferrer'>Stadium Editor</a>
      {/* {mainMode === 'stats' && <div id='headerGreyer' style={{ zIndex: 2, opacity: 0, backgroundColor: 'rgba(115, 136, 92)', position: 'absolute', top: 0, width: '100%', height: 35 }}></div>} */}
    </div >
  );
}

export default Header;
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
      <a href="https://github.com/haxball-replay-analyzer/haxball-replay-analyzer.github.io/issues" target="_blank" rel='noreferrer'>Report Bugs</a>
      <a href="https://kpias760.github.io/haxball-replay-analyzer.github.io/" target="_blank" rel='noreferrer'>Old version</a>
    </div >
  );
}

export default Header;
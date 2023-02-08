function Header() {

  return (
    <div className="header">
      <span className="title">Haxball Replay Analyzer</span>
      <a href="http://blog.haxball.com" target="_blank" rel='noreferrer'>News</a>
      <a href="https://www.haxball.com/play" className="active" target="_blank" rel='noreferrer'>Play</a>
      <a href="https://www.haxball.com/community" target="_blank" rel='noreferrer'>Community</a>
      <a href="https://www.discord.io/haxracing" target="_blank" rel='noreferrer'>HaxRacing</a>
      <a href="https://haxball-stadium-editor.github.io" target="_blank" rel='noreferrer'>Stadium Editor</a>
    </div >
  );
}

export default Header;
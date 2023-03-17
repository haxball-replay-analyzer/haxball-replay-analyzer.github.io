/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';

var bg_patterns = {};

function load_tile(name) {
  var tile = new Image(128, 128);
  tile.onload = function () {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    bg_patterns[name] = ctx.createPattern(tile, 'repeat');
  };
  tile.src = "https://raw.githubusercontent.com/haxball-stadium-editor/haxball-stadium-editor.github.io/v2.11/" + name + "tile.png"
}

load_tile('grass');
load_tile('hockey');

// dać te patterny do store'a

export function drawStadium(ctx, stadium) {

  function norm(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
  }

  function normalise(v) {
    var k = norm(v);

    var x = v[0] / k;
    var y = v[1] / k;

    return [x, y];
  }

  function angle_to(o, p) {
    return Math.atan2(p[1] - o[1], p[0] - o[0]);
  }

  function calculate_arc(a, b, curve) {
    var arc = {};

    if (curve < 0) {
      curve = -curve;
      var c = a;
      a = b;
      b = c;
    }

    var c = [b[0] - a[0], b[1] - a[1]];
    var d = [
      a[0] + c[0] / 2,
      a[1] + c[1] / 2
    ];
    var nc = norm(c);

    if (curve == 180) {
      arc.radius = nc / 2;
      arc.center = d;
      arc.from = angle_to(d, a);
      arc.to = angle_to(d, b);
      return arc;
    }

    var angle = curve * Math.PI / 180;
    var spa2 = Math.sin(Math.PI / 2 - angle / 2);
    var radius = Math.abs(nc * spa2 / Math.sin(angle));

    var cp = normalise([c[1], -c[0]]);

    var l = Math.sqrt((nc * nc / 4) + radius * radius - nc * radius * Math.cos(Math.PI / 2 - angle / 2));

    if (curve > 180)
      l = -l;

    arc.radius = radius;

    arc.center = [
      d[0] - cp[0] * l,
      d[1] - cp[1] * l
    ];

    arc.from = angle_to(arc.center, a);
    arc.to = angle_to(arc.center, b);

    return arc;
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(500 / stadium.width / 2, 250 / stadium.height / 2)
  ctx.translate(stadium.width, stadium.height);
  ctx.beginPath();

  const st = stadium;

  var bg = st.bg;
  var haxball = {
    hockey: {
      bg_color: 'rgb(85, 85, 85)',
      border_color: 'rgb(233,204,110)'
    },
    grass: {
      bg_color: 'rgb(113,140,90)',
      border_color: 'rgb(199,230,189)'
    },
    segment_color: 'rgb(0,0,0)',
    disc_color: 'rgb(255,255,255)',
    default_disc_radius: 10,
    default_player_radius: 15
  };

  ctx.save();

  if (bg.type == 'grass' || bg.type == 'hockey') {

    ctx.fillStyle = haxball[bg.type].bg_color;
    if (bg.color) {
      if (bg.color.match('^[A-Fa-f0-9]{6}$')) ctx.fillStyle = '#' + bg.color;
    }
    ctx.fillRect(-st.width, -st.height,
      2 * st.width, 2 * st.height);

    ctx.beginPath();

    if (bg.cornerRadius == undefined) bg.cornerRadius = 0;
    if (bg.kickOffRadius == undefined) bg.kickOffRadius = 0;

    ctx.moveTo(-bg.width + bg.cornerRadius, -bg.height);
    ctx.arcTo(bg.width, -bg.height, bg.width, -bg.height + bg.cornerRadius, bg.cornerRadius);
    ctx.arcTo(bg.width, bg.height, bg.width - bg.cornerRadius, bg.height, bg.cornerRadius);
    ctx.arcTo(-bg.width, bg.height, -bg.width, bg.height - bg.cornerRadius, bg.cornerRadius);
    ctx.arcTo(-bg.width, -bg.height, -bg.width + bg.cornerRadius, -bg.height, bg.cornerRadius);

    ctx.save();
    ctx.clip();
    ctx.fillStyle = bg_patterns[bg.type];
    ctx.fillRect(-st.width, -st.height, 2 * st.width, 2 * st.height);
    ctx.restore();

    ctx.moveTo(0, -bg.height);
    ctx.lineTo(0, bg.height);
    ctx.moveTo(bg.kickOffRadius, 0);
    ctx.arc(0, 0, bg.kickOffRadius, 0, Math.PI * 2, true);

    ctx.lineWidth = 3;
    ctx.strokeStyle = haxball[bg.type].border_color;
    ctx.stroke();
  } else {
    ctx.fillStyle = haxball.grass.bg_color;
    if (bg.color.match('^[A-Fa-f0-9]{6}$')) ctx.fillStyle = '#' + bg.color;
    ctx.fillRect(-st.width, -st.height, 2 * st.width, 2 * st.height);
  }

  for (let segment of st.segments) {
    if (segment.vis == false) continue;
    const v0 = st.vertexes[segment.v0];
    const v1 = st.vertexes[segment.v1];
    ctx.beginPath();
    if (segment.curve != 0) {
      var arc = calculate_arc([v0.x, v0.y], [v1.x, v1.y], segment.curve)
      ctx.arc(arc.center[0], arc.center[1], arc.radius, arc.from, arc.to, false);
    } else {
      ctx.moveTo(v0.x, v0.y);
      ctx.lineTo(v1.x, v1.y);
    }
    ctx.lineWidth = 3; // na pewno?
    ctx.strokeStyle = '#' + segment.color;
    ctx.stroke();
  }

  for (let disc of st.discs) {
    ctx.beginPath();
    var radius = disc.radius
    ctx.arc(disc.pos[0], disc.pos[1], radius, 0, Math.PI * 2, true);
    ctx.strokeStyle = 'rgb(0,0,0)';
    ctx.lineWidth = 2;
    if (disc.color != "transparent") {
      ctx.fillStyle = '#' + disc.color;
      ctx.fill();
    }
    ctx.stroke();
  }
}

function HeatMap() {

  const match = useSelector(state => state.gameStats.matches)
  const mtc = useSelector(state => state.gameStats.selectedMatch)
  const playerPos = useSelector(state => state.gameStats.playerPos)
  const playerList = useSelector(state => state.gameStats.playerList)
  const selectedPlayer = useSelector(state => state.gameStats.selectedPlayer)
  const stadium = match[mtc].stadium
  const canvasRef = useRef(null);



  function draw(ctx2) {

    drawStadium(ctx2, stadium);

    var par = selectedPlayer;
    if (par === -1) par = match[mtc].redTeam[0];

    ctx2.fillStyle = "rgba(255, 0, 0, 0.006)";
    const pos = playerPos[mtc][playerList.indexOf(par)];
    if (pos === undefined) return;
    for (var i = 0; i < pos.length; i++) {
      ctx2.beginPath();
      ctx2.arc(pos[i].x, pos[i].y, 15, 0, 2 * Math.PI);
      ctx2.fill();
    }

    return;

    ctx2.font = "20px Verdana";
    ctx2.textAlign = "center";
    ctx2.fillStyle = "rgba(0,0,0,1)";
    ctx2.fillText(par, 250, 15);
  };

  useEffect(() => {

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    draw(context)
  }, [draw])

  return (
    <canvas ref={canvasRef} width={500} height={250} style={{ margin: 'auto', display: 'block', position: 'absolute', top: '50%', bottom: 0, left: 0, right: 0 }} ></canvas>
  );
}

export default HeatMap;
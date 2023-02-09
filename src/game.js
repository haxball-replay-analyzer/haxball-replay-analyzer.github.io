/* eslint-disable no-unused-expressions */
import $ from 'jquery';
import { setMode } from './components/Home';
import './vendor/pako-jszip.min.js';
import { setName, setRec } from './App';

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-canvas-datachannel-dataview-es6collections-localstorage-peerconnection-promises-websockets-setclasses-cssclassprefix:md- !*/
!function (e, n, t) {
  function r(e, n) {
    return typeof e === n
  }
  function o() {
    var e,
      n,
      t,
      o,
      i,
      a,
      s;
    for (var l in C) if (C.hasOwnProperty(l)) {
      if (e = [
      ], n = C[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++) e.push(n.options.aliases[t].toLowerCase());
      for (o = r(n.fn, 'function') ? n.fn() : n.fn, i = 0; i < e.length; i++) a = e[i],
        s = a.split('.'),
        1 === s.length ? Modernizr[s[0]] = o : (!Modernizr[s[0]] || Modernizr[s[0]] instanceof Boolean || (Modernizr[s[0]] = new Boolean(Modernizr[s[0]])), Modernizr[s[0]][s[1]] = o),
        h.push((o ? '' : 'no-') + s.join('-'))
    }
  }
  function i(e) {
    var n = _.className,
      t = Modernizr._config.classPrefix || '';
    if (P && (n = n.baseVal), Modernizr._config.enableJSClass) {
      var r = new RegExp('(^|\\s)' + t + 'no-js(\\s|$)');
      n = n.replace(r, '$1' + t + 'js$2')
    }
    Modernizr._config.enableClasses && (n += ' ' + t + e.join(' ' + t), P ? _.className.baseVal = n : _.className = n)
  }
  function a() {
    return 'function' != typeof n.createElement ? n.createElement(arguments[0]) : P ? n.createElementNS.call(n, 'http://www.w3.org/2000/svg', arguments[0]) : n.createElement.apply(n, arguments)
  }
  function s(e) {
    return e.replace(/([a-z])-([a-z])/g, function (e, n, t) {
      return n + t.toUpperCase()
    }).replace(/^-/, '')
  }
  function l(e, n) {
    return !!~('' + e).indexOf(n)
  }
  function f(e, n) {
    return function () {
      return e.apply(n, arguments)
    }
  }
  function u(e, n, t) {
    var o;
    for (var i in e) if (e[i] in n) return t === !1 ? e[i] : (o = n[e[i]], r(o, 'function') ? f(o, t || n) : o);
    return !1
  }
  function c(e) {
    return e.replace(/([A-Z])/g, function (e, n) {
      return '-' + n.toLowerCase()
    }).replace(/^ms-/, '-ms-')
  }
  function d(n, t, r) {
    var o;
    if ('getComputedStyle' in e) {
      o = getComputedStyle.call(e, n, t);
      var i = e.console;
      if (null !== o) r && (o = o.getPropertyValue(r));
      else if (i) {
        var a = i.error ? 'error' : 'log';
        i[a].call(i, 'getComputedStyle returning null, its possible modernizr test results are inaccurate')
      }
    } else o = !t && n.currentStyle && n.currentStyle[r];
    return o
  }
  function p() {
    var e = n.body;
    return e || (e = a(P ? 'svg' : 'body'), e.fake = !0),
      e
  }
  function m(e, t, r, o) {
    var i,
      s,
      l,
      f,
      u = 'modernizr',
      c = a('div'),
      d = p();
    if (parseInt(r, 10)) for (; r--;) l = a('div'),
      l.id = o ? o[r] : u + (r + 1),
      c.appendChild(l);
    return i = a('style'),
      i.type = 'text/css',
      i.id = 's' + u,
      (d.fake ? d : c).appendChild(i),
      d.appendChild(c),
      i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(n.createTextNode(e)),
      c.id = u,
      d.fake && (d.style.background = '', d.style.overflow = 'hidden', f = _.style.overflow, _.style.overflow = 'hidden', _.appendChild(d)),
      s = t(c, e),
      d.fake ? (d.parentNode.removeChild(d), _.style.overflow = f, _.offsetHeight) : c.parentNode.removeChild(c),
      !!s
  }
  function v(n, r) {
    var o = n.length;
    if ('CSS' in e && 'supports' in e.CSS) {
      for (; o--;) if (e.CSS.supports(c(n[o]), r)) return !0;
      return !1
    }
    if ('CSSSupportsRule' in e) {
      for (var i = [
      ]; o--;) i.push('(' + c(n[o]) + ':' + r + ')');
      return i = i.join(' or '),
        m('@supports (' + i + ') { #modernizr { position: absolute; } }', function (e) {
          return 'absolute' == d(e, null, 'position')
        })
    }
    return t
  }
  function g(e, n, o, i) {
    function f() {
      c && (delete N.style, delete N.modElem)
    }
    if (i = r(i, 'undefined') ? !1 : i, !r(o, 'undefined')) {
      var u = v(e, o);
      if (!r(u, 'undefined')) return u
    }
    for (var c, d, p, m, g, y = [
      'modernizr',
      'tspan',
      'samp'
    ]; !N.style && y.length;) c = !0,
      N.modElem = a(y.shift()),
      N.style = N.modElem.style;
    for (p = e.length, d = 0; p > d; d++) if (m = e[d], g = N.style[m], l(m, '-') && (m = s(m)), N.style[m] !== t) {
      if (i || r(o, 'undefined')) return f(),
        'pfx' == n ? m : !0;
      try {
        N.style[m] = o
      } catch (h) {
      }
      if (N.style[m] != g) return f(),
        'pfx' == n ? m : !0
    }
    return f(),
      !1
  }
  function y(e, n, t, o, i) {
    var a = e.charAt(0).toUpperCase() + e.slice(1),
      s = (e + ' ' + k.join(a + ' ') + a).split(' ');
    return r(n, 'string') || r(n, 'undefined') ? g(s, n, o, i) : (s = (e + ' ' + b.join(a + ' ') + a).split(' '), u(s, n, t))
  }
  var h = [
  ],
    C = [
    ],
    S = {
      _version: '3.5.0',
      _config: {
        classPrefix: 'md-',
        enableClasses: !0,
        enableJSClass: !0,
        usePrefixes: !0
      },
      _q: [
      ],
      on: function (e, n) {
        var t = this;
        setTimeout(function () {
          n(t[e])
        }, 0)
      },
      addTest: function (e, n, t) {
        C.push({
          name: e,
          fn: n,
          options: t
        })
      },
      addAsyncTest: function (e) {
        C.push({
          name: null,
          fn: e
        })
      }
    },
    Modernizr = function () {
    };
  Modernizr.prototype = S,
    Modernizr = new Modernizr,
    Modernizr.addTest('dataview', 'undefined' != typeof DataView && 'getFloat64' in DataView.prototype);
  var w = !1;
  try {
    w = 'WebSocket' in e && 2 === e.WebSocket.CLOSING
  } catch (x) {
  }
  Modernizr.addTest('websockets', w),
    Modernizr.addTest('es6collections', !!(e.Map && e.Set && e.WeakMap && e.WeakSet)),
    Modernizr.addTest('promises', function () {
      return 'Promise' in e && 'resolve' in e.Promise && 'reject' in e.Promise && 'all' in e.Promise && 'race' in e.Promise && function () {
        var n;
        return new e.Promise(function (e) {
          n = e
        }),
          'function' == typeof n
      }()
    }),
    Modernizr.addTest('localstorage', function () {
      var e = 'modernizr';
      try {
        return localStorage.setItem(e, e),
          localStorage.removeItem(e),
          !0
      } catch (n) {
        return !1
      }
    });
  var _ = n.documentElement,
    P = 'svg' === _.nodeName.toLowerCase();
  Modernizr.addTest('canvas', function () {
    var e = a('canvas');
    return !(!e.getContext || !e.getContext('2d'))
  });
  var T = 'Moz O ms Webkit',
    b = S._config.usePrefixes ? T.toLowerCase().split(' ') : [
    ];
  S._domPrefixes = b;
  var k = S._config.usePrefixes ? T.split(' ') : [
  ];
  S._cssomPrefixes = k;
  var z = function (n) {
    var r,
      o = prefixes.length,
      i = e.CSSRule;
    if ('undefined' == typeof i) return t;
    if (!n) return !1;
    if (n = n.replace(/^@/, ''), r = n.replace(/-/g, '_').toUpperCase() + '_RULE', r in i) return '@' + n;
    for (var a = 0; o > a; a++) {
      var s = prefixes[a],
        l = s.toUpperCase() + '_' + r;
      if (l in i) return '@-' + s.toLowerCase() + '-' + n
    }
    return !1
  };
  S.atRule = z;
  var E = {
    elem: a('modernizr')
  };
  Modernizr._q.push(function () {
    delete E.elem
  });
  var N = {
    style: E.elem.style
  };
  Modernizr._q.unshift(function () {
    delete N.style
  }),
    S.testAllProps = y;
  var j = S.prefixed = function (e, n, t) {
    return 0 === e.indexOf('@') ? z(e) : (- 1 != e.indexOf('-') && (e = s(e)), n ? y(e, n, t) : y(e, 'pfx'))
  };
  Modernizr.addTest('peerconnection', !!j('RTCPeerConnection', e)),
    Modernizr.addTest('datachannel', function () {
      if (!Modernizr.peerconnection) return !1;
      for (var n = 0, t = b.length; t > n; n++) {
        var r = e[b[n] + 'RTCPeerConnection'];
        if (r) {
          var o = new r(null);
          return 'createDataChannel' in o
        }
      }
      return !1
    }),
    o(),
    i(h),
    delete S.addTest,
    delete S.addAsyncTest;
  for (var L = 0; L < Modernizr._q.length; L++) Modernizr._q[L]();
  e.Modernizr = Modernizr
}(window, document);


var rc = 0;

var kicker, lastKicker, goals = [], match = [{ started: true, stopped: false, spaceMode: false, touches: [], thirds: [0, 0, 0], changes: [], gameTicks: -1, kicks: [], shots: [], redTeam: [], blueTeam: [], shotsRed: 0, shotsBlue: 0, passes: [], passesRed: 0, passesBlue: 0, kicksRed: 0, kicksBlue: 0, possRed: 0, possBlue: 0, scoreRed: 0, scoreBlue: 0, player: [], goals: [] }], player = [], players = [], playerList = [], czyAktualizowacGraczy = true;
var toucher = { name: "", team: "0" }, lastToucher = "", czasGry = 0, czasik = [], mtc = 0, playSounds = false, pileczka = [], aktualizuj = true, aktualizujStadion = true;
var redGoalCord = [], blueGoalCord = [], redName = "RED", blueName = "BLUE", checkTeams = true, autoClick = false, autoClickValue;
var goalParsed = 0, goalMarkers = [], playerPos = [], stadion = [0, 0], ballRadius = 10;
var haxracing = false;
var kanwasy = [], pozycje, paintedCanvases = [];
const RecInfo = { kicks: [] }

export function handleFile(e) {
  var name = e.target.files[0].name;
  if (!name.endsWith('.hbr2')) return alert('Incorrect file extension. Please load .hbr2 file')
  $('.roomlist-view').slideUp(400, 'swing', function () {
    setMode('replay')
  })
  var b = new FileReader();
  b.onload = function () {
    // console.log(b.result)
    parseReplay(b.result)
  };
  b.readAsArrayBuffer(e.target.files[0])
}

const parseCzas = function (par) {
  var gt = (par / 60).toFixed();
  var mins = Math.floor(gt / 60);
  gt -= mins * 60;
  if (gt < 10) gt = "0" + gt;
  return "" + mins + ":" + gt;
}

const selectChange = function () {
  //console.log('zmiana',document.getElementById('displayedMatch').selectedIndex);
  mtc = document.getElementById('displayedMatch').selectedIndex;
  document.getElementById("button_close").click();
  document.getElementById("button_staty").click();
}

const odleglosc = function (a, b) {
  return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

const watchGoal = function (par) {
  document.getElementById("button_close").click();
  autoClick = true;
  autoClickValue = par;
  //document.getElementById("recGoal1").click();
  document.getElementsByClassName("timebar")[0].click();
}

const heatMap = function (par) {
  //console.log(par);
  var canvas2 = document.createElement("canvas");
  if (canvas2.getContext) {

    var ctx2 = canvas2.getContext('2d');
    ctx2.canvas.width = 500;
    ctx2.canvas.height = 250;

    //Loading of the home test image - img1
    var img2 = new Image();

    //drawing of the test image - img1
    img2.onload = function () {
      //draw background image
      ctx2.drawImage(img2, 0, 0);
      //draw a box over the top
      ctx2.fillStyle = "rgba(255, 0, 0, 0.006)";
      //console.log(playerPos[mtc][playerList.indexOf(par)]);
      //console.log(redGoalCord);
      for (var i = 0; i < playerPos[mtc][playerList.indexOf(par)].length; i++) {
        ctx2.beginPath();
        //ctx2.arc((playerPos[0][2][i].x+606)*314/blueGoalCord[0],(playerPos[0][2][i].y+329)*1/2,7,0,2*Math.PI);
        ctx2.arc((playerPos[mtc][playerList.indexOf(par)][i].x + stadion[0]) * 433 / (2 * stadion[0]) + 33, (playerPos[mtc][playerList.indexOf(par)][i].y + stadion[1]) * 218 / (2 * stadion[1]) + 15, 7, 0, 2 * Math.PI);
        ctx2.fill();
      }
      ctx2.font = "20px Verdana";
      ctx2.textAlign = "center";
      ctx2.fillStyle = "rgba(0,0,0,1)";
      ctx2.fillText(par, 250, 15);
      /*ctx.fillRect(240, 0, 220, 350);
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.strokeStyle = "rgba(0, 0, 0, 1)";
      ctx.lineWidth = 8;*/
      //console.log(match[mtc].thirds);
      document.getElementById("heatmap").innerHTML = "";
      document.getElementById("heatmap").appendChild(canvas2);

    };
    img2.src = 'https://haxball-replay-analyzer.github.io/images/haxpitch4.png';
  }
}

function parseReplay(a) {
  if (a == null) return alert("Can't load this file");
  try {
    var b = new Vb(new Jb(new Uint8Array(a), new fa(), 3));
    b.je.de = function () {
      console.log('tutaj')
      u.xb()
    };
    //console.log("E",b);
    setTimeout(function () {
      /*console.log(document.getElementById("game-state-view").style);
      document.getElementById("game-state-view").style.display="none";
      //document.getElementById("room-view").style.display="none";
      console.log(document.getElementsByClassName("chatbox-view"));*/
      //console.log(match, player, playerList, goals, czasik);
      //console.log(match);



      /*

      document.getElementById("spddown").click();
      document.getElementById("spddown").click();
      document.getElementById("spddown").click();
      document.getElementById("spddown").click();
      document.getElementById("spddown").click();
      document.getElementById("spddown").click();
      document.getElementById("reset_button").click();
      document.getElementById("play_button").click();

      TO WCZEŚNIEJ BYŁO WŁĄCZONE

      */




      //document.getElementById("spddown").click();
    }, 1000);
    x.La(b.j.g)
  } catch (e) {
    console.log(e)
    alert("Replay error. Couldn't load the file.");
    setMode('home');
  }
  /*checkpoint usuwanie rzeczy
  document.getElementsByClassName("top-section")[0].style.display="none";//checkpoint chowanie obrazu
  //document.getElementsByClassName("bottom-section")[0].style.display="none";
  document.getElementsByClassName("bottom-section")[0].innerHTML = "<div id=\"room-view\" class=\"room-view\"><div class=\"container\"><h1 data-hook=\"room-name\">Dupa</h1></div></div>"
  //document.getElementsByClassName("bottom-section")[0].style.display="none"
  console.log(document.getElementsByClassName("top-section")[0]);
s  //document.getElementById("div_staty").style.display="block";
*/
}
function u() {
}
u.xb = function () {
  var a = new Aa(n.A.Lh());
  x.La(a.Ja);
  a.Ym = function (b) {
    if (9 != b.vd.Id) {
      var c;
      9 > b.vd.Id ? (b = 'Old version room', c = 'The room is running an older version, an update must have happened recently.') : (b = 'New version', c = 'The room is running a new version of haxball, refresh the site to update.');
      var d = new P(b, c, [
        'Ok'
      ]);
      x.La(d.g);
      d.Va = function () {
        x.La(a.Ja);
        return d.Va = null
      }
    } else b.vd.Ib ? u.Dh(b.$) : u.Pf(b.$)
  };
  a.ws = function () {
    u.oo()
  };
  a.vs = function () {
    u.jk(u.xb)
  };
  a.ys = function () {
    u.mk()
  };
  a.xs = function (a) {
    u.po(a)
  }
};

var x = {
  La: function (a) {
    if (x.Vm != null) {
      x.Vm.remove();
      if (null != a) {
        x.Pg.appendChild(a);
        x.Vm = a;
      }
    }
  }
}

var napisz = 0;
function Vb(a) {
  this.$c = window.performance.now();
  this.sd = this.De = 0;
  var b = this;
  this.ya = a;
  console.log(a)
  this.j = new ja(a.uc);
  var c = new Gb(this.j);
  c.ri(a.T);
  window.document.addEventListener('keydown', G(this, this.Bd));
  window.document.addEventListener('keyup', G(this, this.Cd));
  if (napisz < 1000) {
    console.log(this, this.bf);
    napisz++;
  }
  window.requestAnimationFrame(G(this, this.bf));
  // CHECKPOINT po co ten interval
  // this.Gh = window.setInterval(function () {
  //   b.j.pe.hm(b.sd);
  //   console.log('czy to co sekundę coś robi')
  //   b.sd = 0
  // }, 1000);
  this.uf(n.A.Tb.L());
  this.j.g.classList.add('replayer');
  this.je = new ha(a);
  this.je.Vp = function () {
    c.Lr(a.T)
  };
  this.je.Up = function () {
    b.j.me(null == a.T.K);
    c.ri(a.T)
  };
  this.je.el = function () {
    b.j.Fb.Eb.Xq()
  };
  this.j.g.appendChild(this.je.g)
}

function ha(a) {
  function b() {
    var b = g[f];
    a.pl = e ? b : 0;
    d.get('spd').textContent = b + 'x'
  }
  this.Wf = !1;
  var c = this;
  this.g = v.Ga(ha.N);
  var d = v.Ea(this.g);
  this.ti = a;
  d.get('reset').onclick = function () {
    a.ui();
    c.el()
  };
  var e = !0,
    f = 8,
    g = [
      0.1,
      0.5,
      1,
      2,
      3,
      5,
      20,
      50,
      10000
    ];
  b();
  var k = d.get('playicon');
  //k.classList.add('icon-pause');
  d.get('play').onclick = function () {
    e = !e;
    /*
      var a = k.classList;
      a.toggle('icon-play', !e);
      a.toggle('icon-pause', e);
    */
    e ? k.innerHTML = '⏸' : k.innerHTML = '⏵';
    b()
  };
  d.get('spdup').onclick = function () {
    f += 1;
    var a = g.length - 1;
    f > a && (f = a);
    b()
  };
  d.get('spddn').onclick = function () {
    --f;
    0 > f && (f = 0);
    //console.log("juz odtwarza chyba");
    playSounds = true;
    b()
  };
  this.Er = d.get('time');
  var l = d.get('timebar');
  l.id = "pasek";
  this.Aq = d.get('progbar');
  //console.log(a.mf, ha.Wk(a.mf * a.mh));//checkpoint czas nagrania
  //console.log(a.Vk);
  for (var t = d.get('timetooltip'), h = 0, m = a.Vk; h < m.length;) {
    var n = m[h];
    //console.log(m);
    ++h;
    var p = window.document.createElement('div');
    p.className = 'marker';
    p.classList.add('k' + n.kind);
    p.id = "recGoal" + h;
    //console.log(n);
    p.style.left = 100 * n.mj + '%';
    l.appendChild(p);
    /*console.log(document.getElementById("recGoal1"));
    goalMarkers.push(p.offsetLeft);*/
  };
  //console.log(document.getElementsByClassName("recGoal1")[0]);
  l.onclick = function (b) {
    //console.log(b);    TU DAĆ AUTOKLIKNIĘCIE
    if (autoClick) {
      //console.log("autoklik",b,autoClickValue);
      a.er((autoClickValue) / l.clientWidth * a.mh * a.mf);
      if (c.Wf) {
        c.Wf = !0;
        c.Vp();
        c.el();
      }
      autoClick = false;
      return;
    }
    //console.log(b);
    a.er((b.pageX - l.offsetLeft) / l.clientWidth * a.mh * a.mf);
    if (c.Wf) {
      c.Wf = !0;
      c.Vp();
      c.el();
    }
  };
  l.onmousemove = function (b) {
    b = (b.pageX - l.offsetLeft) / l.clientWidth;
    t.textContent = ha.Wk(a.mf * a.mh * b);
    //console.log(a.mf, a.mh,b);
    return t.style.left = 'calc(' + 100 * b + '% - 30px)'
  };
  this.fp = d.get('leave');
  this.fp.onclick = function () {
    A.i(c.de);
    aktualizuj = true;
    kicker = []; lastKicker = []; goals = []; match = [{ started: true, stopped: false, spaceMode: false, touches: [], thirds: [0, 0, 0], changes: [], gameTicks: -1, kicks: [], shots: [], redTeam: [], blueTeam: [], shotsRed: 0, shotsBlue: 0, passes: [], passesRed: 0, passesBlue: 0, kicksRed: 0, kicksBlue: 0, possRed: 0, possBlue: 0, scoreRed: 0, scoreBlue: 0, player: [], goals: [] }]; player = []; players = []; playerList = []; czyAktualizowacGraczy = true;
    czasGry = 0; czasik = []; mtc = 0; playSounds = false; pileczka = []; aktualizuj = true; aktualizujStadion = true;
    redGoalCord = []; blueGoalCord = []; redName = "RED"; blueName = "BLUE"; goalParsed = 0; goalMarkers = []; playerPos = [];
  }
}
ha.b = !0;
ha.Wk = function (a) {
  a = a / 1000 | 0;
  return (a / 60 | 0) + ':' + J.Af(K.ye(a % 60))
};
ha.prototype = {
  C: function () {
    this.Er.textContent = ha.Wk(this.ti.Qb);
    this.Aq.style.width = 100 * this.ti.Go() + '%';
    !this.Wf || 0 < this.ti.Fd || (this.Wf = !1, this.Up())
  },
  f: ha
};

var n = {
  A: {
    Tb: {
      L: function () {
        return this.Hm
      }
    }
  }
}

function Gb(a, b) {
  this.Rh = null;
  this.j = a;
  null != b && (this.Rh = '@' + J.replace(b, ' ', '_'))
}

Gb.b = !0;
Gb.prototype = {
  Ti: function (a) {
    var b = this.j.Qa.Bc,
      c = [
      ],
      d = 0;
    for (a = a.I; d < a.length;) {
      var e = a[d];
      ++d;
      c.push({
        w: e.w,
        $: e.V
      })
    }
    b.Hj = c
  },
  ri: function (a) {
    function b(a) {
      return null == a ? '' : ' by ' + a.w
    }
    var c = this;
    this.Ti(a);
    a.tl = function (b) {
      c.j.Qa.Gb('' + b.w + ' has joined');
      n.Na.cd(n.Na.$o);
      //console.log("wejscie",b, a);
      if (aktualizuj) {
        players.push(b);
        if (!playerList.includes(b.w)) {
          playerList.push(b.w);
          match[match.length - 1].player.push({
            id: b.V,
            nick: b.w,
            nation: b.Kd,
            goals: 0,
            assists: 0,
            kicks: 0
          });
        }
        c.Ti(a)
      }
    };
    a.ul = function (d, e, f, g) {
      y.i(c.Op, d.V);
      null == e ? d = '' + d.w + ' has left' : (vb.i(c.Np, d.V, e, null != g ? g.w : null, f), d = '' + d.w + ' was ' + (f ? 'banned' : 'kicked') + b(g) + ('' != e ? ' (' + e + ')' :
        ''));
      c.j.Qa.Gb(d);
      n.Na.cd(n.Na.ep);
      c.Ti(a)
    };
    a.rl = function (a, b) {
      var d = null != c.Rh && - 1 != b.indexOf(c.Rh);
      c.j.Qa.ba('' + a.w + ': ' + b, d ? 'highlight' : null);
      n.A.om.L() && d ? n.Na.cd(n.Na.zk) : n.A.Hi.L() && n.Na.cd(n.Na.Rj)
    };
    a.Vl = function (a, b, f, g) {
      c.j.Qa.pp(a, b, f);
      if (n.A.Hi.L()) switch (g) {
        case 1:
          n.Na.cd(n.Na.Rj);
          break;
        case 2:
          n.Na.cd(n.Na.zk)
      }
    };
    a.ji = function () {
      n.Na.cd(n.Na.bp);
      //console.log("kick",n);
    };
    a.Ni = function (a) {
      n.Na.cd(n.Na.Io);
      var b = c.j.Fb.Eb.td;
      if (playSounds) b.Pa(a == p.fa ? b.Fq : b.Bn);
      czasik.push(c.j.Fb.xc.Ke);
      var dupsko = this;
      //console.log("Tu niby gol",czasGry, match[match.length-1].goals/*a,b,c.j.Fb.xc.Ke,d,e,f,g,h,i,j,k*/);
      //console.log("GOOOOOOOOOOOOOOOOOOOOOOOOOOOOL",kicker.name, kicker.team, lastKicker.name, match[match.length-1].scoreRed, match[match.length-1].scoreBlue);
      //console.log(ha.Wk(20494*16.6666666666666));
      if (aktualizuj) {
        console.log('gooooooool')
        if (a.w == "Red") match[match.length - 1].scoreRed++;//aktualny wynik red lub blue = a.$
        else match[match.length - 1].scoreBlue++;
        if (match[match.length - 1].spaceMode) {
          //eeee
          if (a.w == toucher.team) {
            match[match.length - 1].goals.push({ scorer: toucher.name, aktualnyWynik: [match[match.length - 1].scoreRed, match[match.length - 1].scoreBlue] });
            match[match.length - 1].player[playerList.indexOf(toucher.name)].goals++;
            if (lastToucher.name != undefined && a.w == lastToucher.team) {
              match[match.length - 1].goals[match[match.length - 1].goals.length - 1].assist = lastToucher.name;
              match[match.length - 1].player[playerList.indexOf(lastToucher.name)].assists++;
            } else {
              match[match.length - 1].goals[match[match.length - 1].goals.length - 1].assist = false;
            }
          } else {
            match[match.length - 1].goals.push({ scorer: toucher.name + " (own goal)", assist: false, aktualnyWynik: [match[match.length - 1].scoreRed, match[match.length - 1].scoreBlue] });
          }
        } else {
          if (a.w == kicker.team) {
            match[match.length - 1].goals.push({ scorer: kicker.name, aktualnyWynik: [match[match.length - 1].scoreRed, match[match.length - 1].scoreBlue] });
            match[match.length - 1].player[playerList.indexOf(kicker.name)].goals++;
            if (lastKicker != undefined && a.w == lastKicker.team) {
              match[match.length - 1].goals[match[match.length - 1].goals.length - 1].assist = lastKicker.name;
              match[match.length - 1].player[playerList.indexOf(lastKicker.name)].assists++;
            } else {
              match[match.length - 1].goals[match[match.length - 1].goals.length - 1].assist = false;
            }
          } else {
            match[match.length - 1].goals.push({ scorer: kicker.name + " (own goal)", assist: false, aktualnyWynik: [match[match.length - 1].scoreRed, match[match.length - 1].scoreBlue] });
          }
        }
        match[match.length - 1].goals[match[match.length - 1].goals.length - 1].for = a.w;
        match[match.length - 1].goals[match[match.length - 1].goals.length - 1].goalIndex = goalParsed;
        goalParsed++;
      }
    };
    a.Oi = function (a) {
      //console.log("Ktoś wygrał");
      var b = c.j.Fb.Eb.td;
      if (playSounds) b.Pa(a == p.fa ? b.Gq : b.Cn);
      if (aktualizuj) match[match.length - 1].stopped = true;
      //console.log("kuniec",match[match.length-1].gameTicks);
      c.j.Qa.Gb('' + a.w + ' team won the match')
    };
    a.ml = function (a, e, f) {
      e && !f && c.j.Qa.Gb('Game paused' + b(a))
    };
    a.Pi = function () {
      var a = c.j.Fb.Eb.td;
      if (aktualizuj) match[match.length - 1].stopped = true;
      //console.log("kuniec",match[match.length-1].gameTicks);
      if (playSounds) a.Pa(a.Ar)
    };
    a.Ki = function (a) {
      c.j.me(!1);
      c.j.Fb.Eb.td.Nn();
      //console.log("game started", a, b, c);
      /*match[match.length-1].player = player;
      player = [];
      players = [];
      czyAktualizowacGraczy = true;
      match[match.length-1].goals = goals;
      goals = [];*/
      if (match[match.length - 1].stopped && aktualizuj) {
        //console.log(match.length, match[match.length-1].gameTicks);
        //if (match.length>0 && match[match.length-1].gameTicks == -1) match.splice(match.length-1, 1);
        match.push({ started: true, stopped: false, spaceMode: false, touches: [], thirds: [0, 0, 0], changes: [], gameTicks: -1, kicks: [], shots: [], redTeam: [], blueTeam: [], shotsRed: 0, shotsBlue: 0, passes: [], passesRed: 0, passesBlue: 0, kicksRed: 0, kicksBlue: 0, possRed: 0, possBlue: 0, scoreRed: 0, scoreBlue: 0, goals: [], player: match[match.length - 1].player });
        playerPos.push([]);
        for (var i = 0; i < match[match.length - 1].player.length; i++) {
          var pr = match[match.length - 1].player[i];
          match[match.length - 1].player[i].goals = 0;
          match[match.length - 1].player[i].assists = 0;
          match[match.length - 1].player[i].kicks = 0;
        }
      }
      aktualizujStadion = true;
      c.j.Qa.Gb('Game started' + b(a))
    };
    a.vf = function (a) {
      //console.log("Game stopped");
      if (aktualizuj) {
        match[match.length - 1].stopped = true;
        if (match.length > 1 && match[match.length - 1].gameTicks == -1) match.splice(match.length - 1, 1);
      }
      checkTeams = true;
      //czyAktualizowacGraczy = true;
      null != a && c.j.Qa.Gb('Game stopped' + b(a))
    };
    a.Ii = function (a, e) {
      aktualizujStadion = true;
      if (!e.Pe()) {
        var d = J.Vg(e.Sj(), 8);
        //console.log(e);
        //console.log("stadium loaded",a,e);
        c.j.Qa.Gb('Stadium "' + e.w + '" (' + d + ') loaded' + b(a))
      }
    };
    a.sl = function (a) {
      c.j.Qa.Gb('' + a.w + ' ' + (a.Ld ? 'has desynchronized' : 'is back in sync'))
    };
    a.xl = function (d, e, f) {
      checkTeams = true;
      if (aktualizuj && match[match.length - 1].started && !match[match.length - 1].stopped && match[match.length - 1].gameTicks > 0) {
        match[match.length - 1].changes.push([e.w, f.w, parseCzas(match[match.length - 1].gameTicks)]);
      }
      null != a.K && c.j.Qa.Gb('' +
        e.w + ' was moved to ' + f.w + b(d))
    };
    a.ii = function (a, e) {
      var d = e.w;
      c.j.Qa.Gb((e.cb ? '' + d + ' was given admin rights' : '' + d + '\'s admin rights were taken away') + b(a))
    };
    a.wl = function (a, b) {
      c.j.Fb.Eb.Po(a, b)
    };
    a.Hk = function (a, e, f, g) {
      c.j.Qa.Gb('Kick Rate Limit set to (min: ' + e + ', rate: ' + f + ', burst: ' + g + ')' + b(a))
    }
  },
  Lr: function (a) {
    a.tl = null;
    a.ul = null;
    a.rl = null;
    a.Vl = null;
    a.ji = null;
    a.Ni = null;
    a.Oi = null;
    a.ml = null;
    a.Pi = null;
    a.Ki = null;
    a.vf = null;
    a.Ii = null;
    a.sl = null;
    a.xl = null;
    a.ii = null;
    a.wl = null;
    a.Hk = null
  },
  f: Gb
};

function J() {
}
J.replace = function (a, b, c) {
  return a.split(b).join(c)
}
J.Af = function (a) {
  var b,
    c = '';
  for (b = 2 - a.length; c.length < b;) c += '0';
  return c + (null == a ? 'null' : '' + a)
};
J.Vg = function (a, b) {
  for (var c = ''; c = '0123456789ABCDEF'.charAt(a & 15) + c, a >>>= 4, 0 < a;);
  if (null != b) for (; c.length < b;) c = '0' + c;
  return c
};

function ja(a) {
  this.Fb = new hb();
  this.Gd = !1;
  this.pe = new Xa();
  this.Qa = new Da();
  var b = this;
  this.Wa = new Ya(a);
  this.Fb.Nb = a;
  this.g = v.Ga(ja.N);
  a = v.Ea(this.g);
  this.Jh = a.get('gameplay-section');
  this.hf = a.get('popups');
  this.hf.style.display = 'none';
  v.xe(a.get('chatbox'), this.Qa.g);
  v.xe(a.get('stats'), this.pe.g);
  this.bi = a.get('menu');
  this.bi.onclick = function () {
    b.me(!b.Gd);
    b.bi.blur()
  };

  a.get('settings').onclick = function () {
    console.log('ustawienia, tym sie zajmiemy potem')
    // CHECKPOINT
    // var a = new aa;
    // a.qb = function () {
    //   b.bb(null)
    // };
    // //console.log(a.g);
    // b.bb(a.g)
  };
  a.get('staty').onclick = function () {
    console.log('ładujemy staty')
    //CHECKPOINT
    // var cod = new gxd(a);
    // //console.log(cod);
    // if (match.length > 1 && match[0].gameTicks == -1) match.splice(0, 1);

    // setTimeout(function () {
    //   if (match[mtc].spaceMode) document.getElementById("tytul").innerHTML = 'Match stats (space mode):<select onchange="selectChange()" id="displayedMatch"><option value="0">1: Red ' + match[0].scoreRed + ':' + match[0].scoreBlue + ' Blue</option></select>';
    //   else document.getElementById("tytul").innerHTML = 'Match stats:<select onchange="selectChange()" id="displayedMatch"><option value="0">1: Red ' + match[0].scoreRed + ':' + match[0].scoreBlue + ' Blue</option></select>';
    //   for (var i = 1; i < match.length; i++) {
    //     var mA = document.createElement("option");
    //     mA.value = i;
    //     mA.text = '' + (i + 1) + ': Red ' + match[i].scoreRed + ':' + match[i].scoreBlue + ' Blue';
    //     document.getElementById('displayedMatch').add(mA);
    //   }
    //   document.getElementById('displayedMatch').selectedIndex = mtc;
    //   document.getElementById("div.wynik").innerHTML = "" + match[mtc].scoreRed + ":" + match[mtc].scoreBlue;
    //   //console.log(document.getElementById('displayedMatch'));
    //   //document.getElementById('dessert').[0]
    //   var tableRef = document.getElementById("div.tabela").getElementsByTagName('tbody')[0];
    //   /*if (mtc==0) document.getElementById("prevMatch").style="background-color: grey";
    //   else document.getElementById("prevMatch").style="";
    //   if (mtc==match.length-1) document.getElementById("nextMatch").style="background-color: grey";
    //   else document.getElementById("nextMatch").style="";*/
    //   document.getElementById("game-time").innerHTML = "Game time: " + parseCzas(match[mtc].gameTicks);
    //   //console.log(tableRef);
    //   //console.log(playerPos);
    //   var wiersz = 4;
    //   for (var j = 0; j < match[mtc].goals.length; j++) {
    //     var mar = document.getElementById("recGoal" + (match[mtc].goals[j].goalIndex + 1)).offsetLeft - 5;
    //     var newRow = tableRef.insertRow(wiersz);
    //     wiersz++;
    //     var newCell_3 = newRow.insertCell(0);
    //     var newCell_2 = newRow.insertCell(0);
    //     var newCell_1 = newRow.insertCell(0);
    //     newCell_1.style = "text-align: right";
    //     newCell_3.style = "text-align: left";
    //     if (match[mtc].goals[j].for == "Red") {
    //       newCell_1.innerHTML = "" + match[mtc].goals[j].aktualnyWynik[0] + " : " + match[mtc].goals[j].aktualnyWynik[1] + " " + match[mtc].goals[j].scorer + (match[mtc].goals[j].assist == false ? "" : " (" + match[mtc].goals[j].assist + ")");
    //       newCell_1.setAttribute('onclick', 'watchGoal(' + mar + ');');
    //       newCell_1.setAttribute('onmouseover', 'this.style="cursor:pointer;background-color:#244a67;text-align: right;"');
    //       newCell_1.setAttribute('onmouseout', 'this.style="text-align: right;"');
    //     } else {
    //       newCell_3.innerHTML = "" + match[mtc].goals[j].aktualnyWynik[0] + " : " + match[mtc].goals[j].aktualnyWynik[1] + " " + match[mtc].goals[j].scorer + (match[mtc].goals[j].assist == false ? "" : " (" + match[mtc].goals[j].assist + ")");
    //       newCell_3.setAttribute('onclick', 'watchGoal(' + mar + ');');
    //       newCell_3.setAttribute('onmouseover', 'this.style="cursor:pointer;background-color:#244a67;text-align: left;"');
    //       newCell_3.setAttribute('onmouseout', 'this.style="text-align: left;"');
    //     }
    //     //console.log(newRow, newCell_1);
    //   }
    //   wiersz += 3;
    //   var newRow = tableRef.insertRow(wiersz);
    //   var newCell_3 = newRow.insertCell(0);
    //   var newCell_2 = newRow.insertCell(0);
    //   var newCell_1 = newRow.insertCell(0);
    //   newCell_1.style = "text-align: right; color:red";
    //   newCell_2.style = "text-align: center";
    //   newCell_3.style = "text-align: left; color: #5688e5";
    //   newCell_1.innerHTML = "" + (match[mtc].possRed / (match[mtc].possRed + match[mtc].possBlue) * 100).toFixed(1) + "%";
    //   newCell_2.innerHTML = "POSSESSION";
    //   newCell_3.innerHTML = "" + (match[mtc].possBlue / (match[mtc].possRed + match[mtc].possBlue) * 100).toFixed(1) + "%";
    //   wiersz++;

    //   newRow = tableRef.insertRow(wiersz);
    //   newCell_3 = newRow.insertCell(0);
    //   newCell_2 = newRow.insertCell(0);
    //   newCell_1 = newRow.insertCell(0);
    //   newCell_1.style = "text-align: right; color:red";
    //   newCell_2.style = "text-align: center";
    //   newCell_3.style = "text-align: left; color: #5688e5";
    //   newCell_1.innerHTML = "" + match[mtc].kicksRed;
    //   newCell_2.innerHTML = "KICKS";
    //   newCell_3.innerHTML = "" + match[mtc].kicksBlue;

    //   newRow = tableRef.insertRow(wiersz);
    //   newCell_1 = newRow.insertCell();
    //   newCell_1.innerHTML = "" + match[mtc].passesRed;
    //   newCell_1.style = "text-align: right; color:red";
    //   newCell_1 = newRow.insertCell();
    //   newCell_1.innerHTML = "PASSES";
    //   newCell_1.style = "text-align: center";
    //   newCell_1 = newRow.insertCell();
    //   newCell_1.innerHTML = "" + match[mtc].passesBlue;
    //   newCell_1.style = "text-align: left; color: #5688e5";

    //   newRow = tableRef.insertRow(wiersz);
    //   newCell_1 = newRow.insertCell();
    //   newCell_1.innerHTML = "" + match[mtc].shotsRed;
    //   newCell_1.style = "text-align: right; color:red";
    //   newCell_1 = newRow.insertCell();
    //   newCell_1.innerHTML = "SHOTS ON GOAL";
    //   newCell_1.style = "text-align: center";
    //   newCell_1 = newRow.insertCell();
    //   newCell_1.innerHTML = "" + match[mtc].shotsBlue;
    //   newCell_1.style = "text-align: left; color: #5688e5";

    //   document.getElementById("prevMatch").onclick = function () {
    //     if (mtc > 0) {
    //       mtc--;
    //       document.getElementById("button_close").click();
    //       document.getElementById("button_staty").click();
    //     }
    //   }
    //   document.getElementById("nextMatch").onclick = function () {
    //     if (mtc < match.length - 1) {
    //       mtc++;
    //       document.getElementById("button_close").click();
    //       document.getElementById("button_staty").click();
    //       exd('Incompatible replay version', 'The replay file is of a different version. You can open simple player, without stats', [
    //         'Open player',
    //         'Cancel'
    //       ]);
    //     }
    //   }
    //   document.getElementById("input_redTeam").onchange = function () {
    //     redName = document.getElementById("input_redTeam").value;
    //   }
    //   document.getElementById("input_redTeam").value = redName;
    //   document.getElementById("input_blueTeam").onchange = function () {
    //     blueName = document.getElementById("input_blueTeam").value;
    //   }
    //   document.getElementById("input_blueTeam").value = blueName;
    //   tableRef = document.getElementById("div.tabela2").getElementsByTagName('tbody')[0];

    //   var canvas = document.createElement("canvas");
    //   if (canvas.getContext) {

    //     ctx = canvas.getContext('2d');
    //     ctx.canvas.width = 500;
    //     ctx.canvas.height = 250;

    //     //Loading of the home test image - img1
    //     var img1 = new Image();

    //     //drawing of the test image - img1
    //     img1.onload = function () {
    //       //draw background image
    //       ctx.drawImage(img1, 0, 0);
    //       //draw a box over the top
    //       ctx.font = "45px Arial";
    //       ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    //       ctx.fillRect(175, 0, 150, 250);
    //       ctx.fillStyle = "rgba(255, 255, 255, 1)";
    //       ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    //       ctx.lineWidth = 8;
    //       //console.log(match[mtc].thirds);

    //       for (var i = 0; i < 3; i++) {
    //         ctx.strokeText("" + Math.round(100 * (match[mtc].thirds[i] / (match[mtc].thirds[0] + match[mtc].thirds[1] + match[mtc].thirds[2]))) + "%", 70 + 140 * i, 147);
    //         ctx.fillText("" + Math.round(100 * (match[mtc].thirds[i] / (match[mtc].thirds[0] + match[mtc].thirds[1] + match[mtc].thirds[2]))) + "%", 70 + 140 * i, 147);
    //       }
    //       document.getElementById("thirdStats").appendChild(canvas);

    //     };

    //     img1.src = 'https://haxball-replay-analyzer.github.io/images/haxpitch4.png';
    //   }
    //   var canvas2 = document.createElement("canvas");
    //   if (canvas2.getContext) {

    //     ctx2 = canvas2.getContext('2d');
    //     ctx2.canvas.width = 500;
    //     ctx2.canvas.height = 250;

    //     //Loading of the home test image - img1
    //     var img2 = new Image();

    //     //drawing of the test image - img1
    //     img2.onload = function () {
    //       //draw background image
    //       ctx2.drawImage(img1, 0, 0);
    //       //draw a box over the top
    //       ctx2.fillStyle = "rgba(255, 0, 0, 0.006)";
    //       //console.log(redGoalCord);
    //       for (var i = 0; i < playerPos[0][1].length; i++) {
    //         ctx2.beginPath();
    //         //ctx2.arc((playerPos[0][2][i].x+606)*314/blueGoalCord[0],(playerPos[0][2][i].y+329)*1/2,7,0,2*Math.PI);
    //         ctx2.arc((playerPos[0][1][i].x + stadion[0]) * 433 / (2 * stadion[0]) + 33, (playerPos[0][1][i].y + stadion[1]) * 218 / (2 * stadion[1]) + 15, 7, 0, 2 * Math.PI);
    //         ctx2.fill();
    //       }
    //       ctx2.font = "20px Verdana";
    //       ctx2.textAlign = "center";
    //       ctx2.fillStyle = "rgba(0,0,0,1)";
    //       ctx2.fillText(playerList[1], 250, 15);
    //       /*ctx.fillRect(240, 0, 220, 350);
    //       ctx.fillStyle = "rgba(255, 255, 255, 1)";
    //       ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    //       ctx.lineWidth = 8;*/
    //       //console.log(match[mtc].thirds);

    //       document.getElementById("heatmap").appendChild(canvas2);

    //     };
    //     img2.src = 'https://haxball-replay-analyzer.github.io/images/haxpitch4.png';
    //   }

    //   //console.log("e",sortTable);
    //   sortTable(-1);
    //   //console.log("f",document.getElementById("thisCell"));

    //   //console.log("g",document.getElementById("thisCell"));
    //   //console.log(match);
    // }, 50);
    // cod.qb = function () {
    //   b.bb(null)
    // };
    // //console.log(a);
    // b.bb(cod.g);
    // //console.log(goals);
    // //document.getElementById("label1").innerHTML="Gole"+goals[0].scorer+" ("+goals[0].assist+")";
  };
  this.Jh.appendChild(this.Fb.g);
  this.Wa.de = function () {
    var a = new fb();
    a.qb = function (a) {
      b.bb(null);
      a && A.i(b.de)
    };
    b.bb(a.g)
  };
  this.Wa.Xp = function () {
    console.log('tutaj')
    var a = new eb;
    a.ci = function () {
      b.bb(null)
    };
    a.og = function (a) {
      y.i(b.og, a);
      b.bb(null)
    };
    a.fi = function (a) {
      a = new P('Error loading stadium', a, [
        'Ok'
      ]);
      a.Va = function () {
        b.bb(null)
      };
      b.bb(a.g)
    };
    b.bb(a.g)
  }
}
ja.b = !0;
ja.prototype = {
  C: function (a) {
    null == a.T.K && this.me(!0);
    A.i(this.yl);
    this.bi.disabled = null == a.T.K;
    this.Gd ? this.Wa.C(a.T, a.T.na(a.uc)) : (a = a.Sf(), this.Fb.C(a), n.Na.Xj.Ls(a))
  },
  me: function (a) {
    this.Gd != a && ((this.Gd = a) ? (this.Jh.appendChild(this.Wa.g), this.Fb.g.remove()) : (this.Jh.appendChild(this.Fb.g), this.Wa.g.remove()))
  },
  Zo: function () {
    return null != ja.kq
  },
  bb: function (a, b) {
    v.Cf(this.hf);
    ja.kq = a;
    null != a ? (this.hf.style.display = 'flex', this.hf.appendChild(a), this.yl = b) : (this.hf.style.display = 'none', this.yl = null)
  },
  f: ja
};

function fb() {
  var a = this;
  this.g = v.Ga(fb.N);
  var b = v.Ea(this.g);
  console.log('tutaj')
  b.get('cancel').onclick = function () {
    y.i(a.qb, !1)
  };
  b.get('leave').onclick = function () {
    y.i(a.qb, !0)
  }
}

function Ya(a) {
  //console.log(a);
  this.fk = !1;
  this.qm = new za(p.Ia);
  this.Lj = new za(p.xa);
  this.Hl = new za(p.fa);
  var b = this;
  this.g = v.Ga(Ya.N);
  var c = v.Ea(this.g);
  this.jc = c.get('room-name');
  this.tm = c.get('start-btn');
  this.vm = c.get('stop-btn');
  this.gi = c.get('pause-btn');
  this.xn = c.get('auto-btn');
  this.Nk = c.get('lock-btn');
  this.Rl = c.get('reset-all-btn');
  this.Fl = c.get('rec-btn');
  var d = c.get('link-btn'),
    e = c.get('leave-btn'),
    f = c.get('rand-btn');
  this.wf = c.get('time-limit-sel');
  this.qf = c.get('score-limit-sel');
  this.rm = c.get('stadium-name');
  this.sm = c.get('stadium-pick');
  this.sm.onclick = function () {
    A.i(b.Xp)
  };
  this.Th(c.get('red-list'), this.Hl, p.fa, a);
  this.Th(c.get('blue-list'), this.Lj, p.xa, a);
  this.Th(c.get('spec-list'), this.qm, p.Ia, a);
  this.Uk(this.wf, this.Tk(15));
  this.Uk(this.qf, this.Tk(15));
  this.wf.onchange = function () {
    y.i(b.aq, b.wf.selectedIndex)
  };
  this.qf.onchange = function () {
    y.i(b.Tp, b.qf.selectedIndex)
  };
  this.tm.onclick = function () {
    A.i(b.Yp)
  };
  this.vm.onclick = function () {
    A.i(b.Zp)
  };
  this.gi.onclick = function () {
    A.i(b.Mp)
  };
  this.xn.onclick = function () {
    A.i(b.Dp)
  };
  this.Nk.onclick = function () {
    y.i(b.$p, !b.Xh)
  };
  this.Rl.onclick = function () {
    null != b.ee && (b.ee(p.xa), b.ee(p.fa))
  };
  this.Fl.onclick = function () {
    A.i(b.Qp)
  };
  d.onclick = function () {
    A.i(b.Wp)
  };
  e.onclick = function () {
    A.i(b.de)
  };
  f.onclick = function () {
    A.i(b.Pp)
  };
  this.Bj(!1);
  this.Cj(!1)
}

Ya.b = !0;
Ya.prototype = {
  Th: function (a, b, c, d) {
    var e = this;
    v.xe(a, b.g);
    b.mg = function (a, b) {
      ia.i(e.mg, a, b)
    };
    b.ee = function (a) {
      y.i(e.ee, a)
    };
    b.Kp = function (a) {
      ia.i(e.mg, d, a)
    };
    b.ff = function (a) {
      y.i(e.ff, a)
    }
  },
  Tk: function (a) {
    for (var b = [
    ], c = 0; c <
      a;) {
      var d = c++;
      b.push(null == d ? 'null' : '' + d)
    }
    return b
  },
  Uk: function (a, b) {
    for (var c = 0; c < b.length;) {
      var d = b[c++],
        e = window.document.createElement('option');
      e.textContent = d;
      a.appendChild(e)
    }
  },
  rr: function (a) {
    this.Fl.classList.toggle('active', a)
  },
  C: function (a, b) {
    this.Uq != a.jc && (this.Uq = a.jc, this.jc.textContent = a.jc);
    var c = null == b ? !1 : b.cb;
    this.fk != c && (this.g.className = 'room-view' + (c ? ' admin' : ''), this.fk = c);
    var d = !c || null != a.K;
    this.wf.disabled = d;
    this.qf.disabled = d;
    this.sm.disabled = d;
    d = null != a.K;
    this.tm.hidden = d;
    this.vm.hidden = !d;
    this.gi.hidden = !d;
    this.wf.selectedIndex = a.Da;
    this.qf.selectedIndex = a.ib;
    this.rm.textContent = a.S.w;
    this.rm.classList.toggle('custom', !a.S.Pe());
    var e = a.Pc;
    this.Hl.C(a.I.filter(function (a) {
      return a.ea == p.fa
    }), e, d, c);
    this.Lj.C(a.I.filter(function (a) {
      return a.ea == p.xa
    }), e, d, c);
    this.qm.C(a.I.filter(function (a) {
      return a.ea == p.Ia
    }), e, d, c);
    this.Rl.disabled = d;
    this.Xh != a.Pc && this.Bj(a.Pc);
    d && (c = 120 == a.K.Oa, this.ll != c && this.Cj(c))
  },
  Bj: function (a) {
    this.Xh = a;
    this.Nk.innerHTML = this.Xh ? '<i class=\'icon-lock\'></i>Unlock' :
      '<i class=\'icon-lock-open\'></i>Lock'
  },
  Cj: function (a) {
    this.ll = a;
    this.gi.innerHTML = '<i class=\'icon-pause\'></i>' + (this.ll ? 'Resume (P)' : 'Pause (P)')
  },
  f: Ya
};

function za(a) {
  this.xd = new Map();
  var b = this;
  this.g = v.Ga(za.N);
  this.g.className += ' ' + a.io;
  var c = v.Ea(this.g);
  this.ab = c.get('list');
  this.Vh = c.get('join-btn');
  this.vi = c.get('reset-btn');
  a == p.Ia && this.vi.remove();
  this.Vh.textContent = '' + a.w;
  this.g.ondragover = this.g.Qs = function (a) {
    - 1 != a.dataTransfer.types.indexOf('player') && a.preventDefault()
  };
  this.g.ondrop = function (c) {
    c.preventDefault();
    c = c.dataTransfer.getData('player');
    null != c && (c = K.parseInt(c), null != c && ia.i(b.mg, c, a))
  };
  this.Vh.onclick = function () {
    y.i(b.Kp, a)
  };
  this.vi.onclick = function () {
    y.i(b.ee, a)
  }
}

za.b = !0;
za.prototype = {
  C: function (a, b, c, d) {
    var e = this;
    this.Vh.disabled = b || c;
    this.vi.disabled = c;
    b = new Set;
    c = this.xd.keys();
    for (var f = c.next(); !f.done;) {
      var g = f.value,
        f = c.next();
      b.add(g)
    }
    for (c = 0; c < a.length;) f = a[c],
      ++c,
      g = this.xd.get(f.V),
      null == g && (g = new cb(f), g.ff = function (a) {
        y.i(e.ff, a)
      }, this.xd.set(f.V, g), this.ab.appendChild(g.g)),
      g.C(f, d),
      b['delete'](f.V);
    d = b.values();
    for (b = d.next(); !b.done;) c = b.value,
      b = d.next(),
      this.xd.get(c).g.remove(),
      this.xd['delete'](c);
    d = 0;
    for (b = a.length -
      1; d < b;) f = d++,
        c = this.xd.get(a[f].V).g,
        f = this.xd.get(a[f + 1].V).g,
        c.nextSibling != f && this.ab.insertBefore(c, f)
  },
  f: za
}

function Da() {
  function a() {
    null != b.fl && '' != b.gb.value && b.fl(b.gb.value);
    b.gb.value = '';
    b.gb.blur()
  }
  var b = this;
  this.g = v.Ga(Da.N);
  var c = v.Ea(this.g);
  this.dc = c.get('log');
  // CHECKPOINT koment
  // this.vg = Ba.cg(this.dc);
  // this.gb = c.get('input');
  // this.gb.maxLength = 140;
  // c.get('send').onclick = a;
  this.Bc = new lb(c.get('autocompletebox'), function (a, c) {
    b.gb.value = a;
    b.gb.setSelectionRange(c, c)
  });
  // this.gb.onkeydown = function (c) {
  //   switch (c.keyCode) {
  //     case 9:
  //       b.Bc.Mb.hidden || (b.Bc.qo(), c.preventDefault());
  //       break;
  //     case 13:
  //       a();
  //       break;
  //     case 27:
  //       b.Bc.Mb.hidden ? (b.gb.value = '', b.gb.blur()) : b.Bc.Qh();
  //       break;
  //     case 38:
  //       b.Bc.Qj(- 1);
  //       break;
  //     case 40:
  //       b.Bc.Qj(1)
  //   }
  //   c.stopPropagation()
  // };
  // this.gb.onfocus = function () {
  //   null != b.ig && b.ig(!0)
  // };
  // this.gb.onblur = function () {
  //   null != b.ig && b.ig(!1);
  //   b.Bc.Qh()
  // };
  // this.gb.oninput = function () {
  //   b.Bc.Hn(b.gb.value, b.gb.selectionStart)
  // }
}

Da.b = !0;
Da.Yo = function (a) {
  return a.parentElement.querySelector(':hover') == a
};
Da.prototype = {
  pp: function (a, b, c) {
    var d = window.document.createElement('p');
    d.className = 'announcement';
    d.textContent = a;
    0 <= b && (d.style.color = N.lc(b));
    switch (c) {
      case 1:
      case 4:
        d.style.fontWeight = 'bold';
        break;
      case 2:
      case 5:
        d.style.fontStyle = 'italic'
    }
    switch (c) {
      case 3:
      case 4:
      case 5:
        d.style.fontSize = '12px'
    }
    this.Ok(d)
  },
  Ok: function (a) {
    var b = this.dc.clientHeight,
      b = this.dc.scrollTop + b - this.dc.scrollHeight >= 0.5 * - b || !Da.Yo(this.dc);
    this.dc.appendChild(a);
    b && (this.dc.scrollTop = a.offsetTop);
    for (a = b ? 50 : 100; this.dc.childElementCount > a;) this.dc.firstElementChild.remove();
    // this.vg.update()
  },
  ba: function (a, b) {
    var c = window.document.createElement('p');
    null != b && (c.className = b);
    c.textContent = a;
    this.Ok(c)
  },
  Gb: function (a) {
    this.ba(a, 'notice');
  },
  f: Da
};

function lb(a, b) {
  this.Hj = [
  ];
  this.Iq = /[#@][^\s@#]*$/;
  this.Mb = a;
  this.Rp = b;
  a.hidden = !0
}

function Xa() {
  this.nl = new Qb();
  this.g = v.Ga(Xa.N);
  var a = v.Ea(this.g);
  this.rg = a.get('ping');
  this.wp = a.get('max-ping');
  this.wo = a.get('fps');
  v.xe(a.get('graph'), this.nl.g)
}
Xa.b = !0;
Xa.prototype = {
  qr: function (a) {
    this.rg.textContent = null == a ? 'null' : '' + a
  },
  or: function (a) {
    this.wp.textContent = '' + a
  },
  hm: function (a) {
    this.wo.textContent = null == a ? 'null' : '' + a
  },
  f: Xa
};

function Qb() {
  this.Ah = 0;
  this.vp = 400;
  this.yk = 64;
  this.Vi = 32;
  this.sa = window.document.createElement('canvas');
  this.Qf = window.document.createElement('canvas');
  this.g = window.document.createElement('div');
  this.Qf.width = this.sa.width = this.Vi;
  this.Qf.height = this.sa.height = this.yk;
  this.Eh = this.Qf.getContext('2d', null);
  this.c = this.sa.getContext('2d', null);
  this.c.fillStyle = 'green';
  for (var a = [
  ], b = 0, c = this.Vi; b < c;) {
    ++b;
    a.push(0);
  }
  this.fq = a;
  this.g.appendChild(this.Qf);
  this.g.className = 'graph'
}

function xa(a, b) {
  this.Di = [
  ];
  this.pi = [
  ];
  this.ug = new Ia();
  this.Ap = 1;
  this.pd = this.zm = 0;
  this.Qi = new Mb(50);
  this.sg = new Mb(50);
  this.nn = 1000;
  this.ek = '';
  var c = this;
  V.call(this, b.state);
  this.Uh = b.Ms;
  this.Je = b.ds;
  var d = null,
    d = function (e) {
      c.tf(0);
      var f = w.ha();
      f.Ub(b.version);
      f.Db(b.password);
      c.pc = new wb(b.ij, b.iceServers, a, Zb.Km, f, b.gn);
      c.pc.rh = e;
      c.pc.zd = function (a) {
        c.pc = null;
        c.pa = a;
        a.lg = function (a) {
          a = new F(new DataView(a));
          c.uq(a)
        };
        a.cf = function () {
          console.log('tutaj');
          3 != c.pd && y.i(c.df, xb.ih('Connection closed'));
          c.ia()
        };
        a = window.setTimeout(function () {
          console.log('tutaj');
          y.i(c.df, xb.ih('Game state timeout'));
          c.ia()
        }, 10000);
        c.re = a;
        c.tf(2)
      };
      c.pc.gl = function () {
        c.tf(1)
      };
      var g = !1;
      c.pc.Zk = function () {
        return g = !0
      };
      c.pc.bd = function (a) {
        if (!e && 1 == c.pd && g) {
          A.i(c.Sp);
          d(!0);
        } else {
          console.log('tutaj')
          var b = wb.Do(a);
          switch (a.nb) {
            case 0:
              a = xb.jh;
              break;
            case 1:
              a = xb.lh(a.code);
              break;
            case 2:
              a = xb.hh;
              break;
            default:
              a = xb.ih(b)
          }
          y.i(c.df, a);
          c.ia(b)
        }
      }
    };
  d(null != b.cn && b.cn)
}

var A = {
  i: function (a) {
    null != a && a()
  }
}

var Zb = {
  Km: [
    {
      "name": "ro",
      "reliable": true,
      "kj": true
    },
    {
      "name": "ru",
      "reliable": true,
      "kj": false
    },
    {
      "name": "uu",
      "reliable": false,
      "kj": false
    }
  ]
}

function wb(a, b, c, d, e, f) {
  this.rh = this.yh = !1;
  var g = this;
  this.pa = new Va(0, b, d);
  this.pa.bd = function () {
    g.Oe(Ob.jh);
  };
  this.pa.zd = function () {
    null != g.zd && g.zd(new Nb(g.pa));
    g.pa = null;
    g.Uj()
  };
  this.pa.di = function (b) {
    g.jr = b;
    g.X = new WebSocket(a + 'client?id=' + c + (null == f ? '' : '&token=' + f));
    g.X.binaryType = 'arraybuffer';
    g.X.onclose = function (a) {
      g.yh || g.Oe(Ob.lh(a.code))
    };
    g.X.onerror = function () {
      g.yh || g.Oe(Ob.Error)
    };
    g.X.onmessage = G(g, g.Ph);
    g.X.onopen = function () {
      null != g.gl && g.gl();
      g.pa.Mi();
      g.Bi(g.jr, g.pa.Uf, e);
      g.pa.jg = G(g, g.yi);
      g.pa.Sh.then(function () {
        g.Nc(0, null)
      })
    }
  };
  this.pa.eo()
}

function G(a, b) {
  if (null == b) return null;
  null == b.oh && (b.oh = rc++);
  var c;
  null == a.ej ? a.ej = {
  }
    : c = a.ej[b.oh];
  if (null == c) {
    c = b.bind(a);
    a.ej[b.oh] = c;
  }
  return c
}

var Ob = {
  lh: function (a) {
    return {
      nb: 1,
      code: a,
      eb: 'bas.basnet.FailReason',
      toString: ga
    }
  }
}

function ga() {
  return r.Be(this, '')
}

var r = {
  Be: function (a, b) {
    if (null == a) return 'null';
    if (5 <= b.length) return '<...>';
    var c = typeof a;
    'function' == c && (a.b || a.Gf) && (c = 'object');
    switch (c) {
      case 'function':
        return '<function>';
      case 'object':
        if (a.eb) {
          var d = Ab[a.eb],
            c = d.nh[a.nb],
            e = d[c];
          if (e.Ae) {
            b += '\t';
            for (var c = c + '(', d = [
            ], f = 0, e = e.Ae; f < e.length;) {
              var g = e[f];
              ++f;
              d.push(r.Be(a[g], b))
            }
            return c + d.join(',') + ')'
          }
          return c
        }
        if (a instanceof Array) {
          c = a.length;
          d = '[';
          b += '\t';
          for (f = 0; f < c;) {
            e = f++;
            d += (0 < e ? ',' : '') + r.Be(a[e], b);
          }
          return d + ']'
        }
        try {
          d = a.toString
        } catch (k) {
          return '???'
        }
        if (null != d && d != Object.toString && 'function' == typeof d && (c = a.toString(), '[object Object]' != c)) return c;
        c = null;
        d = '{\n';
        b += '\t';
        f = null != a.hasOwnProperty;
        for (c in a) {
          if (f) {
            if (!a.hasOwnProperty(c) || 'prototype' == c || '__class__' == c || '__super__' == c || '__interfaces__' == c || '__properties__' == c) {
              if (2 != d.length) {
                (d += ', \n');
                d += b + c + ' : ' + r.Be(a[c], b);
              }
            }
          }
        }
        b = b.substring(1);
        return d + ('\n' + b + '}');
      case 'string':
        return a;
      default:
        return String(a)
    }
  }
}

var Ab = {
  "bas.basnet.FailReason": {
    "Gf": true,
    "nh": [
      "PeerFailed",
      "Rejected",
      "Cancelled",
      "Error"
    ],
    "jh": {
      "nb": 0,
      "eb": "bas.basnet.FailReason"
    },
    "hh": {
      "nb": 2,
      "eb": "bas.basnet.FailReason"
    },
    "Error": {
      "nb": 3,
      "eb": "bas.basnet.FailReason"
    }
  },
  "bas.basnet.ConnectionRequestResponse": {
    "Gf": true,
    "nh": [
      "Accept",
      "Reject"
    ],
    "hn": {
      "nb": 0,
      "eb": "bas.basnet.ConnectionRequestResponse"
    }
  },
  "bas.marf.net.ConnFailReason": {
    "Gf": true,
    "nh": [
      "Cancelled",
      "PeerFailed",
      "Rejected",
      "Other"
    ],
    "hh": {
      "nb": 0,
      "eb": "bas.marf.net.ConnFailReason"
    },
    "jh": {
      "nb": 1,
      "eb": "bas.marf.net.ConnFailReason"
    }
  }
}

function Nb(a) {
  this.gd = null;
  this.Eq = 10000;
  this.wd = !0;
  var b = this;
  a.Tj();
  this.Ra = a.Ra;
  this.Vc = a.Vc;
  this.oe = a.oe;
  this.gd = a.gd;
  this.ym = window.performance.now();
  var c = null,
    c = function () {
      var a = b.Eq - b.Br();
      if (0 >= a) {
        b.ia()
      } else {
        window.clearTimeout(b.Am);
        a = window.setTimeout(c, a + 1000);
        b.Am = a
      }
    };
  c();
  this.Ra.oniceconnectionstatechange = function () {
    var a = b.Ra.iceConnectionState;
    'closed' != a && 'failed' != a || b.ia()
  };
  a = 0;
  for (var d = this.Vc; a < d.length;) {
    var e = d[a];
    ++a;
    e.onmessage = function (a) {
      if (b.wd) {
        b.ym = window.performance.now();
        null != b.lg && b.lg(a.data)
      }
    };
    e.onclose = function () {
      b.ia()
    }
  }
}

function Va(a, b, c) {
  this.gd = this.re = null;
  this.oe = [
  ];
  this.ak = 0;
  this.hl = !1;
  this.Uf = [
  ];
  this.Vc = [
  ];
  var d = this;
  this.Ra = new RTCPeerConnection({
    iceServers: b
  }, Va.Yn);
  this.Sh = new Promise(function (a) {
    d.Vo = a
  });
  this.Ra.onicecandidate = function (a) {
    if (a.candidate == null) {
      d.Vo(d.Uf)
    } else {
      a = a.candidate;
      if (a.candidate != null && a.candidate != '') {
        if (d.jg != null) {
          d.jg(a);
          d.Uf.push(a)
        }
      }
    }
  };
  for (b = 0; b < c.length;) this.co(c[b++]);
  this.$ = a
}

var w = {
  ha: function (a, b) {
    null == b && (b = !1);
    null == a && (a = 16);
    return new wCustom(new DataView(new ArrayBuffer(a)), b)
  }
}

function wCustom(a, b) {
  null == b && (b = !1);
  this.o = a;
  this.Sa = b;
  this.a = 0
}

function Mb(a) {
  this.rs = a;
  this.$a = [
  ]
}

function hb() {
  this.Nb = - 1;
  this.Eb = new N();
  this.xc = new Rb();
  this.g = v.Ga(hb.N);
  var a = v.Ea(this.g);
  this.Pb = new Db(a.get('red-score'), 0);
  this.Kb = new Db(a.get('blue-score'), 0);
  v.xe(a.get('timer'), this.xc.g);
  v.xe(a.get('canvas'), this.Eb.sa)
}
hb.prototype = {
  Gg: function (a) {
    this.g.classList.toggle('restricted', a)
  },
  C: function (a) {
    var b = a.K;
    //console.log(a.K.Hc, "eeee", (b.Hc | 0));//checkpoint czas w s.ms
    null != b && (this.xc.tr(60 * a.Da), this.xc.sr(b.Hc), this.Kb.set(b.Kb), this.Pb.set(b.Pb), this.Eb.Kc(a, this.Nb))
  },
  f: hb
};

function Db(a, b) {
  this.Ja = a;
  this.value = b;
  a.textContent = '' + b
}

Db.prototype = {
  set: function (a) {
    if (this.value != a) {
      this.value = a;
      this.Ja.textContent = '' + this.value
    }
  },
  f: Db
};

var v = {
  Ga: function (a, b) {
    null == b && (b = 'div');
    var c = window.document.createElement(b);
    c.innerHTML = a;
    return c.firstElementChild
  },
  Ea: function (a) {
    var b = new Map();
    var c = 0;
    for (a = a.querySelectorAll('[data-hook]'); c < a.length;) {
      var d = a[c++];
      b.set(d.getAttribute('data-hook'), d)
    }
    return b
  },
  xe: function (a, b) {
    a.parentElement.replaceChild(b, a)
  }
}

function Rb() {
  this.Da = 0;
  this.hk = this.ik = !1;
  this.Ke = 0;
  this.g = window.document.createElement('div');
  this.g.className = 'game-timer-view';
  this.g.appendChild(this.bq = this.Wd('OVERTIME!', 'overtime'));
  this.g.appendChild(this.zp = this.Wd('0', 'digit'));
  this.g.appendChild(this.yp = this.Wd('0', 'digit'));
  this.g.appendChild(this.Wd(':', null));
  this.g.appendChild(this.dr = this.Wd('0', 'digit'));
  this.g.appendChild(this.cr = this.Wd('0', 'digit'));
  this.g.appendChild(this.Wd('.', null));
  this.g.appendChild(this.dziesiate = this.Wd('0', 'digit'));
  this.g.appendChild(this.setne = this.Wd('0', 'digit'));
  this.g.appendChild(this.tysieczne = this.Wd('0', 'digit'))
}

Rb.prototype = {
  Wd: function (a, b) {
    var c = window.document.createElement('span');
    c.textContent = a;
    c.className = b;
    return c
  },
  sr: function (a) {
    if (a != this.Ke) {
      var b = Math.floor(a % 60),
        c = a / 60 | 0,
        d = a - Math.floor(a);
      var e = d.toFixed(3);
      //console.log(a);
      if (e == 1) {
        b++;
        e = "0.0000";
      }
      //console.log(a,b,c,d,e);
      //console.log(a,b,c);checkpoint czas
      this.cr.textContent = '' + b % 10;
      this.dr.textContent = '' + (b / 10 | 0) % 10;
      this.yp.textContent = '' + c % 10;
      this.zp.textContent = '' + (c / 10 | 0) % 10;
      this.dziesiate.textContent = '' + Math.floor(e * 10);
      this.setne.textContent = '' + e.charAt(3);
      this.tysieczne.textContent = '' + e.charAt(4);
      /*console.log(d);
      if (d.toFixed(3)==1) {
        czasGry = this.cr.textContent + this.dr.textContent + this.yp.textContent + this.zp.textContent;
        console.log(czasGry);
      }*/
      //console.log(this.setne.textContent,this.tysieczne.textContent);
      //console.log(this.cr.textContent);
      this.Ke = a
    }
    this.Jl();
    this.Kl()
  },
  tr: function (a) {
    this.Da = a;
    this.Jl();
    this.Kl()
  },
  Jl: function () {
    this.pr(0 != this.Da && this.Ke > this.Da)
  },
  Kl: function () {
    this.ur(this.Ke < this.Da && this.Ke > this.Da - 30)
  },
  pr: function (a) {
    if (a != this.hk) {
      this.bq.className = a ? 'overtime on' : 'overtime', this.hk = a
    }
  },
  ur: function (a) {
    a != this.ik && (this.g.className = a ? 'game-timer-view time-warn' : 'game-timer-view', this.ik = a)
  },
  f: Rb
};

function N() {
  this.$c = window.performance.now();
  this.Jg = new Map();
  this.dd = new Map();
  this.zg = 1;
  this.xf = 35;
  this.jf = 0;
  this.kf = 1.5;
  this.Ya = new H(0, 0);
  this.Dk = !1;
  this.td = new Sb();
  this.sa = window.document.createElement('canvas');
  this.sa.mozOpaque = !0;
  this.c = this.sa.getContext('2d', {
    alpha: !1
  });
  this.Lo = this.c.createPattern(n.Ko, null);
  this.Wn = this.c.createPattern(n.Vn, null);
  this.Un = this.c.createPattern(n.Tn, null)
}
N.lc = function (a) {
  return 'rgba(' + [(a & 16711680) >>> 16,
  (a & 65280) >>> 8,
  a & 255].join() + ',255)'
};

N.prototype = {
  Po: function (a, b) {
    var c = this.dd.get(a.V);
    if (null != c) switch (b) {
      case 0:
        c.Xf = !0;
        break;
      case 1:
        c.Xf = !1
    }
  },
  Pr: function () {
    if (null != this.sa.parentElement) {
      var a = window.devicePixelRatio * this.zg,
        b = this.sa.getBoundingClientRect(),
        c = Math.round(b.width * a),
        a = Math.round(b.height * a);
      if (this.sa.width !=
        c || this.sa.height != a) this.sa.width = c,
          this.sa.height = a
    }
  },
  Kc: function (a, b) {
    var c = window.performance.now(),
      d = (c - this.$c) / 1000;
    this.$c = c;
    this.Jg.clear();
    console.log('chyba se próbuje rysować')
    this.Pr();
    N.Gi(this.c, !0);
    this.c.resetTransform();
    if (null != a.K) {
      var c = a.K,
        e = c.ta,
        f = a.na(b),
        g = null != f ? f.H : null,
        k = 0 != this.jf ? this.sa.height / this.jf : this.kf * window.devicePixelRatio * this.zg,
        h = this.xf * this.zg,
        m = c.S.Ye,
        n = this.sa.width / k;
      0 < m && n > m && (n = m, k = this.sa.width / m);
      m = (this.sa.height - h) / k;
      this.Mr(c, g, n, m, d);
      for (var p = 0, q = a.I; p < q.length;) {
        var r = q[p];
        ++p;
        if (null != r.H) {
          var u = this.dd.get(r.V);
          null == u && (u = new Ea, this.dd.set(r.V, u));
          u.C(r, a);
          this.Jg.set(r.H, u)
        }
      }
      this.c.translate(this.sa.width / 2, (this.sa.height + h) / 2);
      this.c.scale(k, k);
      this.c.translate(- this.Ya.x, - this.Ya.y);
      this.c.lineWidth = 3;
      this.Sq(c.S);
      this.Rq(c.S);
      k = e.F;
      h = 0;
      for (p = e.pb; h < p.length;) this.Mq(p[h++], k);
      this.Lq(a, n, m);
      this.Nq(a, f);
      null != g && this.Pq(g.a);
      this.c.lineWidth = 2;
      f = 0;
      for (g = a.I; f < g.length;) n = g[f],
        ++f,
        m = n.H,
        null != m && this.Ll(m, this.dd.get(n.V));
      console.log('rysuje każdego gracza')
      f = 0;
      for (e = e.F; f < e.length;) g = e[f],
        ++f,
        null ==
        this.Jg.get(g) && this.Ll(g, null);
      this.c.lineWidth = 3;
      this.c.resetTransform();
      this.c.translate(this.sa.width / 2, this.sa.height / 2);
      this.Oq(c);
      0 >= c.Oa && (this.td.C(d), this.td.Kc(this.c));
      this.Jg.clear();
      this.Kq(a)
    }
  },
  Kq: function (a) {
    var b = new Set,
      c = 0;
    for (a = a.I; c < a.length;) b.add(a[c++].V);
    c = this.dd.keys();
    for (a = c.next(); !a.done;) {
      var d = a.value;
      a = c.next();
      if (!b.has(d)) this.dd['delete'](d)
    }
  },
  Mr: function (a, b, c, d, e) {
    var f,
      g;
    if (null != b && 1 == a.S.Ge) g = b.a,
      f = g.x,
      g = g.y;
    else if (g = a.ta.F[0].a, f = g.x, g = g.y, null != b) {
      var k = b.a;
      f = 0.5 * (f + k.x);
      g = 0.5 * (g + k.y);
      var h = 0.5 * c,
        m = 0.5 * d;
      b = k.x - h + 50;
      var n = k.y - m + 50,
        h = k.x + h - 50,
        k = k.y + m - 50;
      f = f > h ? h : f < b ? b : f;
      g = g > k ? k : g < n ? n : g
    }
    n = 60 * e;
    1 < n && (n = 1);
    b = e = this.Ya;
    n *= 0.04;
    h = b.x;
    b = b.y;
    e.x = h + (f - h) * n;
    e.y = b + (g - b) * n;
    this.Xn(c, d, a.S)
  },
  Xn: function (a, b, c) {
    a > 2 * c.$b ? this.Ya.x = 0 : this.Ya.x + 0.5 * a > c.$b ? this.Ya.x = c.$b - 0.5 * a : this.Ya.x - 0.5 * a < - c.$b && (this.Ya.x = - c.$b + 0.5 * a);
    b > 2 * c.qc ? this.Ya.y = 0 : this.Ya.y + 0.5 * b > c.qc ? this.Ya.y = c.qc - 0.5 * b : this.Ya.y - 0.5 * b < - c.qc && (this.Ya.y = - c.qc + 0.5 * b)
  },
  Pq: function (a) {
    this.c.beginPath();
    this.c.strokeStyle = 'white';
    this.c.globalAlpha = 0.3;
    this.c.arc(a.x, a.y, 25, 0, 2 * Math.PI, !1);
    this.c.stroke();
    this.c.globalAlpha = 1
  },
  Oq: function (a) {
    var b = 0 < a.Oa;
    this.lr(b);
    b && (120 != a.Oa && (a = a.Oa / 120 * 200, this.c.fillStyle = 'white', this.c.fillRect(0.5 * - a, 100, a, 20)), this.td.eq.Tq(this.c))
  },
  lr: function (a) {
    this.Dk != a && (this.sa.style.filter = a ? 'grayscale(70%)' : '', this.Dk = a)
  },
  Wl: function (a, b, c, d, e, f) {
    d = b + d;
    e = c + e;
    a.beginPath();
    a.moveTo(d - f, c);
    a.arcTo(d, c, d, c + f, f);
    a.lineTo(d, e - f);
    a.arcTo(d, e, d - f, e, f);
    a.lineTo(b + f, e);
    a.arcTo(b, e, b, e - f, f);
    a.lineTo(b, c + f);
    a.arcTo(b, c, b + f, c, f);
    a.closePath()
  },
  Sq: function (a) {
    var b = this;
    N.Gi(this.c, !1);
    var c = a.Td,
      d = a.Sd;
    if (1 == a.ld) this.c.save(),
      this.c.resetTransform(),
      this.c.fillStyle = N.lc(a.jd),
      this.c.fillRect(0, 0, this.sa.width, this.sa.height),
      this.c.restore(),
      this.c.strokeStyle = '#C7E6BD',
      this.c.fillStyle = this.Lo,
      this.Wl(this.c, - c, - d, 2 * c, 2 * d, a.Uc),
      this.c.save(),
      this.c.scale(2, 2),
      this.c.fill(),
      this.c.restore(),
      this.c.moveTo(0, - d),
      this.c.lineTo(0, d),
      this.c.stroke(),
      this.c.beginPath(),
      this.c.arc(0, 0, a.kd, 0, 2 * Math.PI),
      this.c.stroke();
    else if (2 == a.ld) {
      this.c.strokeStyle = '#E9CC6E';
      this.c.save();
      this.c.beginPath();
      this.c.rect(this.Ya.x - 10000, this.Ya.y - 10000, 20000, 20000);
      this.c.scale(2, 2);
      this.c.fillStyle = this.Un;
      this.c.fill();
      this.c.restore();
      this.c.save();
      this.Wl(this.c, - c, - d, 2 * c, 2 * d, a.Uc);
      this.c.scale(2, 2);
      this.c.fillStyle = this.Wn;
      this.c.fill();
      this.c.restore();
      this.c.stroke();
      this.c.beginPath();
      this.c.moveTo(0, - d);
      this.c.setLineDash([15,
        15]);
      this.c.lineTo(0, d);
      this.c.stroke();
      this.c.setLineDash([]);
      var e = a.Fe,
        c = c - e;
      e < a.Uc && (c = 0);
      e = function (c, e, h) {
        b.c.beginPath();
        b.c.strokeStyle = c;
        b.c.arc(0, 0, a.kd, - 1.5707963267948966, 1.5707963267948966, h);
        0 != e && (b.c.moveTo(e, - d), b.c.lineTo(e, d));
        b.c.stroke()
      };
      e('#85ACF3', c, !1);
      e('#E18977', - c, !0)
    } else this.c.save(),
      this.c.resetTransform(),
      this.c.fillStyle = N.lc(a.jd),
      this.c.fillRect(0, 0, this.sa.width, this.sa.height),
      this.c.restore();
    N.Gi(this.c, !0)
  },
  Nq: function (a, b) {
    for (var c = n.A.Ak.L(), d = 0, e = a.I; d < e.length;) {
      var f = e[d];
      ++d;
      var g = f.H;
      if (null != g) {
        var g = g.a,
          h = this.dd.get(f.V);
        c && h.Xf && this.c.drawImage(n.Dm, g.x - 0.5 * n.Dm.width, g.y - 35);
        f != b && h.so(this.c, g.x, g.y + 50)
      }
    }
  },
  Ll: function (a, b) {
    this.c.beginPath();
    null == b ? (this.c.fillStyle = N.lc(a.R), this.c.strokeStyle = 'black') : (this.c.fillStyle = b.Ij, this.c.strokeStyle = b.lo);
    this.c.beginPath();
    console.log('tu chyba próbuje rysować każdego gracza')
    this.c.arc(a.a.x, a.a.y, a.Z, 0, 2 * Math.PI, !1);
    if (null != b) {
      this.c.save();
      var c = a.Z / 32;
      this.c.translate(a.a.x, a.a.y);
      this.c.scale(c, c);
      this.c.translate(- 32, - 32);
      this.c.fill();
      this.c.restore()
    } else - 1 != (a.R | 0) && this.c.fill();
    this.c.stroke()
  },
  Rq: function (a) {
    if (null !=
      a) {
      var b = 0;
      for (a = a.U; b < a.length;) this.Qq(a[b++])
    }
  },
  Mq: function (a, b) {
    if (!(0 > a.R)) {
      this.c.beginPath();
      this.c.strokeStyle = N.lc(a.R);
      var c = b[a.Yd],
        d = b[a.Zd];
      null != c && null != d && (c = c.a, d = d.a, this.c.moveTo(c.x, c.y), this.c.lineTo(d.x, d.y), this.c.stroke())
    }
  },
  Qq: function (a) {
    if (a.Za) {
      this.c.beginPath();
      this.c.strokeStyle = N.lc(a.R);
      var b = a.W.a,
        c = a.ca.a;
      if (0 != 0 * a.vb) this.c.moveTo(b.x, b.y),
        this.c.lineTo(c.x, c.y);
      else {
        a = a.Xd;
        var d = b.x - a.x,
          b = b.y - a.y;
        this.c.arc(a.x, a.y, Math.sqrt(d * d + b * b), Math.atan2(b, d), Math.atan2(c.y -
          a.y, c.x - a.x))
      }
      this.c.stroke()
    }
  },
  Lq: function (a, b, c) {
    var d = a.K;
    if (null != d) for (d = d.ta.F[0], this.nk(d.a, d.R, b, c), d = 0, a = a.I; d < a.length;) {
      var e = a[d];
      ++d;
      null != e.H && this.nk(e.H.a, e.ea.R, b, c)
    }
  },
  nk: function (a, b, c, d) {
    c = 0.5 * c - 25;
    d = 0.5 * d - 25;
    var e = this.Ya,
      f = a.x - e.x,
      e = a.y - e.y,
      g = - c,
      h = - d,
      l = this.Ya;
    c = l.x + (f > c ? c : f < g ? g : f);
    d = l.y + (e > d ? d : e < h ? h : e);
    f = a.x - c;
    a = a.y - d;
    900 < f * f + a * a && (this.c.fillStyle = 'rgba(0,0,0,0.5)', this.pk(c + 2, d + 2, Math.atan2(a, f)), this.c.fillStyle = N.lc(b), this.pk(c - 2, d - 2, Math.atan2(a, f)))
  },
  pk: function (a, b, c) {
    this.c.save();
    this.c.translate(a, b);
    this.c.rotate(c);
    this.c.beginPath();
    this.c.moveTo(15, 0);
    this.c.lineTo(0, 7);
    this.c.lineTo(0, - 7);
    this.c.closePath();
    this.c.fill();
    this.c.restore()
  },
  Xq: function () {
    for (var a = this.dd.values(), b = a.next(); !b.done;) {
      var c = b.value,
        b = a.next();
      c.Xf = !1
    }
  },
  f: N
};

function Ea() {
  this.Xf = !1;
  this.w = '';
  this.uh = 0;
  this.Jf = '';
  this.kb = new ka;
  var a = window.document.createElement('canvas');
  a.width = 64;
  a.height = 64;
  this.rb = a.getContext('2d', null);
  this.Ij = this.rb.createPattern(this.rb.canvas, 'no-repeat');
  this.fo()
}

Ea.prototype = {
  fo: function () {
    var a = window.document.createElement('canvas');
    a.width = 160;
    a.height = 34;
    this.vl = a.getContext('2d', null)
  },
  Or: function () {
    var a = this.vl;
    a.resetTransform();
    a.clearRect(0, 0, 160, 34);
    a.font = '26px sans-serif';
    a.fillStyle = 'white';
    160 < a.measureText(this.w).width ? (a.textAlign = 'left', a.translate(2, 29)) : (a.textAlign = 'center', a.translate(80, 29));
    a.fillText(this.w, 0, 0)
  },
  so: function (a, b, c) {
    a.drawImage(this.vl.canvas, 0, 0, 160, 34, b - 40, c - 34, 80, 17)
  },
  C: function (a, b) {
    if (null != a.H) {
      var c = n.A.xm.L() ? b.kb[a.ea.$] : a.ea.wm,
        d = null != a.Jd ? a.Jd : a.Xb,
        e = n.A.lm.L() && null != d;
      if (!Ea.Ln(this.kb, c) || !e && a.Jb != this.uh || e && this.Jf != d) Ea.ao(this.kb, c),
        e ? (this.Jf = d, this.uh = - 1) : (this.Jf = '' + a.Jb, this.uh = a.Jb),
        this.Hq(this.Jf)
    }
    this.lo = 0 < b.K.Oa || !a.Wb ? 'black' : a.Wb && 0 >= a.Sc && 0 <= a.yc ? 'white' : 'black';
    a.w != this.w && (this.w = a.w, this.Or())
  },
  Hq: function (a) {
    var b = this.kb.fb;
    if (!(1 > b.length)) {
      this.rb.save();
      this.rb.translate(32, 32);
      this.rb.rotate(3.141592653589793 * this.kb.hd / 128);
      for (var c = - 32, d = 64 / b.length, e = 0; e < b.length;) this.rb.fillStyle = N.lc(b[e++]),
        this.rb.fillRect(c, - 32, d + 4, 64),
        c += d;
      this.rb.restore();
      this.rb.fillStyle = N.lc(this.kb.ed);
      this.rb.textAlign = 'center';
      this.rb.textBaseline = 'alphabetic';
      this.rb.font = '900 34px \'Arial Black\',\'Arial Bold\',Gadget,sans-serif';
      this.rb.fillText(a, 32, 44);
      this.Ij = this.rb.createPattern(this.rb.canvas, 'no-repeat')
    }
  },
  f: Ea
};

function Sb() {
  //console.log("kicker");
  this.xc = 0;
  this.ab = [
  ];
  this.Ar = new R(['Time is',
    'Up!'], 16777215);
  this.Gq = new R(['Red is',
    'Victorious!'], 15035990);
  this.Fq = new R(['Red',
    "Scores!"], 15035990);
  this.Cn = new R(['Blue is',
    'Victorious!'], 625603);
  this.Bn = new R(['Blue',
    'Scores!'], 625603);
  this.eq = new R(['Game',
    'Paused'], 16777215)
}

Sb.prototype = {
  Pa: function (a) {
    this.ab.push(a)
  },
  Nn: function () {
    this.ab = [
    ];
    this.xc = 0
  },
  C: function (a) {
    if (0 < this.ab.length) {
      this.xc += a;
      if (this.xc > this.ab[0].zo()) {
        this.xc = 0;
        this.ab.shift();
      }
    }
  },
  Kc: function (a) {
    0 < this.ab.length && this.ab[0].Kc(a, this.xc)
  },
  f: Sb
};

function R(a, b) {
  for (var c = [
  ], d = 0; d < a.length;) c.push(this.sp(a[d++], b));
  this.We = c
}

R.prototype = {
  zo: function () {
    return 2.31 + 0.1155 * (this.We.length - 1)
  },
  Kc: function (a, b) {
    var c = b / 2.31,
      d = 0;
    a.imageSmoothingEnabled = !0;
    for (var e = 0, f = this.We; e < f.length;) {
      var g = f[e];
      ++e;
      var h = c - 0.05 * d,
        l = 180 * R.kn.eval(h) * (0 != (d & 1) ? - 1 : 1);
      a.globalAlpha = R.jn.eval(h);
      a.drawImage(g, l - 0.5 * g.width, 35 * - (this.We.length - 1) + 70 * d - 0.5 * g.height);
      a.globalAlpha = 1;
      ++d
    }
    a.imageSmoothingEnabled = !1
  },
  Tq: function (a) {
    var b = 0;
    a.imageSmoothingEnabled = !0;
    for (var c = 0, d = this.We; c < d.length;) {
      var e = d[c];
      ++c;
      a.drawImage(e, 0.5 * - e.width, 35 * - (this.We.length - 1) + 70 * b - 0.5 * e.height);
      ++b
    }
    a.imageSmoothingEnabled = !1
  },
  lc: function (a) {
    return 'rgba(' + [(a & 16711680) >>> 16,
    (a & 65280) >>> 8,
    a & 255].join() + ',255)'
  },
  sp: function (a, b) {
    var c = window.document.createElement('canvas'),
      d = c.getContext('2d', null);
    d.font = '900 70px Arial Black,Arial Bold,Gadget,sans-serif';
    c.width = Math.ceil(d.measureText(a).width) + 7;
    c.height = 90;
    d.font = '900 70px Arial Black,Arial Bold,Gadget,sans-serif';
    d.textAlign = 'left';
    d.textBaseline = 'middle';
    d.fillStyle = 'black';
    d.fillText(a, 7, 52);
    d.fillStyle = this.lc(b);
    d.fillText(a, 0, 45);
    return c
  },
  f: R
};

function Jb(a, b, c) {
  this.Vk = [
  ];
  this.pl = 5;
  this.Fd = - 1;
  this.hg = this.Qb = this.Wh = this.sk = 0;
  V.call(this, b);
  a = new F(new DataView(a.buffer), !1);
  if (1212305970 != a.hb()) throw new q('');
  b = a.hb();
  if (c != b) throw new q(new Kb(b));
  this.mf = a.hb();
  c = window.pako.inflateRaw(a.sb());
  this.Lc = new F(new DataView(c.buffer, c.byteOffset, c.byteLength));
  this.Cq(this.Lc);
  c = this.Lc.sb();
  this.Lc = new F(new DataView(c.buffer, c.byteOffset, c.byteLength), !1);
  this.ui();
  this.Wh = window.performance.now();
  this.uc = - 1
}

var ya = {
  zc: 0
}

function C(a, b) {
  var c = Object.create(a),
    d;
  for (d in b) c[d] = b[d];
  b.toString !== Object.prototype.toString && (c.toString = b.toString);
  return c
}

Jb.prototype = C(V.prototype, {
  Cq: function (a) {
    for (var b = a.Ob(), c = 0, d = 0; d < b;) {
      ++d;
      var c = c + a.Ab(),
        e = a.B();
      //console.log("TU",a,b,c,d,e);
      if (aktualizuj) {
        kicker = undefined;
        lastKicker = undefined;
        goals = [];
        match = [{ started: true, stopped: false, spaceMode: false, touches: [], thirds: [0, 0, 0], changes: [], gameTicks: -1, kicks: [], shots: [], redTeam: [], blueTeam: [], shotsRed: 0, shotsBlue: 0, passes: [], passesRed: 0, passesBlue: 0, kicksRed: 0, kicksBlue: 0, possRed: 0, possBlue: 0, scoreRed: 0, scoreBlue: 0, player: [], goals: [] }];
        player = []; players = []; playerList = []; czyAktualizowacGraczy = true;
        czasGry = 0; czasik = []; mtc = 0;
      }
      this.Vk.push({
        mj: c / this.mf,
        kind: e
      })
    }
  },
  Dl: function () {
    var a = this.Lc;
    if (0 < a.o.byteLength - a.a) {
      a = this.Lc.Ab();
      this.hg += a;
      a = this.Lc.Ob();
      // console.log(this.Lc)
      this.gg = m.fh(this.Lc);
      this.gg.P = a
    } else {
      this.gg = null
    }
  },
  Go: function () {
    return this.Y / this.mf
  },
  ra: function () {
  },
  Sf: function () {
    this.C();
    ya.zc++;
    var a = this.T.sc();
    a.C(this.sk);
    return a
  },
  C: function () {
    // console.log('chyba wykonuję ważną funkcję')
    var a = window.performance.now(),
      b = a - this.Wh;
    this.Wh = a;
    if (0 < this.Fd) {
      this.Qb += 10000;
      if (this.Qb > this.Fd) {
        this.Qb = this.Fd;
        this.Fd = - 1;
      }
    } else {
      this.Qb += b * this.pl;
    }
    a = this.mf * this.mh;
    this.Qb > a && (this.Qb = a);
    b = this.Qb * this.Ac;
    a = b | 0;
    for (this.sk = b - a; this.Y < a;) {
      for (; null != this.gg && this.hg == this.Y;) {
        b = this.gg;
        // CHECKPOINT warunkuję
        // if (typeof b.apply !== 'function') continue;
        // console.log(b.apply)
        b.apply(this.T);
        null != this.fc && this.fc(b);
        this.Dl();
      }
      this.Y++;
      this.T.C(1)
    }
  },
  er: function (a) {
    this.Fd = a;
    a < this.Qb && this.ui()
  },
  ui: function () {
    this.hg = 0;
    this.Qb = this.Y = this.Lc.a = 0;
    this.T.ja(this.Lc);
    this.Dl()
  },
  f: Jb
});

var m = {

}

m.prototype = {
  $m: function () {
    return !0
  },
  apply: function () {
    throw new q('missing implementation');
  },
  va: function () {
    throw new q('missing implementation');
  },
  ua: function () {
    throw new q('missing implementation');
  },
  f: m
};

m.b = !0;
m.Fa = function (a) {
  null == a.Aa && (a.Aa = !0);
  null == a.Ba && (a.Ba = !0);
  return a
};
m.Ha = function (a) {
  a.on = m.yf;
  if (null == a.za) throw new q('Class doesn\'t have a config');
  a.prototype.zf = a.za;
  m.Qm.set(m.yf, a);
  m.yf++
};
m.lj = function (a, b) {
  var c = (null ==
    a ? null : r.Nm(a)).on;
  if (null == c) throw new q('Tried to pack unregistered action');
  b.l(c);
  a.ua(b)
};


// JEST PROBLEM Z TĄ FUNKCJĄ, TRZEBA USIĄŚĆ
m.fh = function (a) {
  // console.log(a);
  var b = a.B();
  // console.log(b);
  b = Object.create(m.Qm.get(b).prototype);
  b.da = 0;
  b.mb = 0;
  // console.log(b.va.toString());
  b.va(a);
  return b
}

function Kb(a) {
  this.Id = a
}

function q(a) {
  this.Ta = a;
  Error.captureStackTrace && Error.captureStackTrace(this, q)
}

function F(a, b) {
  null == b && (b = !1);
  this.o = a;
  this.Sa = b;
  this.a = 0
}

F.jo = function (a, b) {
  var c = a.getUint8(b),
    d,
    e,
    f,
    g,
    k,
    l = b;
  if (0 == (c & 128)) ++b;
  else if (192 == (c & 224)) {
    d = a.getUint8(b + 1);
    c = (c & 31) << 6 | d & 63;
    b += 2;
  } else if (224 == (c & 240)) {
    d = a.getUint8(b + 1);
    e = a.getUint8(b + 2);
    c = (c & 15) << 12 | (d & 63) << 6 | e & 63;
    b += 3;
  } else if (240 == (c & 248)) {
    d = a.getUint8(b + 1);
    e = a.getUint8(b + 2);
    f = a.getUint8(b + 3);
    c = (c & 7) << 18 | (d & 63) << 12 | (e & 63) << 6 | f & 63;
    b += 4;
  } else if (248 == (c & 252)) {
    d = a.getUint8(b + 1);
    e = a.getUint8(b + 2);
    f = a.getUint8(b + 3);
    g = a.getUint8(b + 4);
    c = (c & 3) << 24 | (d & 63) << 18 | (e & 63) << 12 | (f & 63) << 6 | g & 63;
    b += 5;
  } else if (252 == (c & 254)) {
    d = a.getUint8(b + 1);
    e = a.getUint8(b + 2);
    f = a.getUint8(b + 3);
    g = a.getUint8(b + 4);
    k = a.getUint8(b + 5);
    c = (c & 1) << 30 | (d & 63) << 24 | (e & 63) << 18 | (f & 63) << 12 | (g & 63) << 6 | k & 63;
    b += 6;
  } else throw new q('Cannot decode UTF8 character at offset ' + b + ': charCode (' + c + ') is invalid');
  return {
    'char': c,
    length: b - l
  }
};

F.prototype = {
  sb: function (a) {
    null == a && (a = this.o.byteLength - this.a);
    if (this.a + a > this.o.byteLength) throw new q('Read too much');
    var b = new Uint8Array(this.o.buffer, this.o.byteOffset + this.a, a);
    this.a += a;
    return b
  },
  Cl: function (a) {
    var b = this.sb(a);
    a = new ArrayBuffer(a);
    (new Uint8Array(a)).set(b);
    return a
  },
  lf: function () {
    return this.o.getInt8(this.a++)
  },
  B: function () {
    return this.o.getUint8(this.a++)
  },
  ni: function () {
    var a = this.o.getInt16(this.a, this.Sa);
    this.a += 2;
    return a
  },
  Ob: function () {
    var a = this.o.getUint16(this.a, this.Sa);
    this.a += 2;
    return a
  },
  M: function () {
    var a = this.o.getInt32(this.a, this.Sa);
    this.a += 4;
    return a
  },
  hb: function () {
    var a = this.o.getUint32(this.a, this.Sa);
    this.a += 4;
    return a
  },
  mi: function () {
    var a = this.o.getFloat32(this.a, this.Sa);
    this.a += 4;
    return a
  },
  u: function () {
    var a = this.o.getFloat64(this.a, this.Sa);
    this.a += 8;
    return a
  },
  Ab: function () {
    for (var a = this.a, b = 0, c, d = 0; c = this.o.getUint8(a + b), 5 >
      b && (d |= (c & 127) << 7 * b >>> 0), ++b, 0 != (c & 128););
    //console.log("Wywołanie funkcji Ab", d);
    this.a += b;
    return d | 0
  },
  ie: function (a) {
    var b = this.a,
      c,
      d = '';
    for (a = b + a; b < a;) {
      c = F.jo(this.o, b);
      b += c.length;
      d += String.fromCodePoint(c['char']);
    }
    if (b != a) throw new q('Actual string length differs from the specified: ' + (b - a) + ' bytes');
    this.a = b;
    return d
  },
  zb: function () {
    var a = this.Ab();
    return 0 >= a ? null : this.ie(a - 1)
  },
  ic: function () {
    return this.ie(this.Ab())
  },
  El: function () {
    return this.ie(this.B())
  },
  wg: function () {
    var a = this.ic();
    return JSON.parse(a)
  },
  f: F
};

function V(a) {
  this.Ri = new Ia();
  this.te = this.cc = 0;
  this.le = new Ia();
  this.uc = this.bc = this.rd = 0;
  this.Ac = 0.06;
  this.mh = 16.666666666666668;
  this.Ff = 120;
  yb.call(this, a)
}

function Ia() {
  this.list = [
  ]
}

function yb(a) {
  this.Y = 0;
  this.T = a
}

function fa() {
  this.hc = - 1;
  this.S = this.gc = null;
  this.yd = 2;
  this.Zc = 0;
  this.ce = 1;
  this.ib = this.Da = 3;
  this.Pc = !1;
  this.K = null;
  this.I = [
  ];
  this.jc = '';
  this.S = h.Kh()[0];
  this.kb = [
    null,
    new ka(),
    new ka()
  ];
  this.kb[1].fb.push(15035990);
  this.kb[2].fb.push(5671397)
}

function ka() {
  this.ed = 16777215;
  this.fb = [
  ]
}

function ua() {
  this.h = this.v = 63;
  this.R = 16777215;
  this.Ca = 0.99;
  this.aa = 1;
  this.m = 0.5;
  this.Z = 10;
  this.oa = new H(0, 0);
  this.D = new H(0, 0);
  this.a = new H(0, 0)
}

function h() {
  this.J = [
  ];
  this.U = [
  ];
  this.qa = [
  ];
  this.tc = [
  ];
  this.F = [
  ];
  this.pb = [
  ];
  this.Dd = [
  ];
  this.md = [
  ];
  this.ge = new Eb();
  this.Bh = 255;
  this.Ge = this.Ye = 0;
  this.Lf = !0;
  this.pf = !1;

  this.dg = function () {
    var a = new ua;
    a.R = 16777215;
    a.h = 63;
    a.v = 193;
    a.Z = 10;
    a.Ca = 0.99;
    a.aa = 1;
    a.m = 0.5;
    return a
  }
  this.ad = function (a, b, c, d, e, f, g, k) {
    null == k && (k = 0);
    this.w = a;
    this.F.push(this.dg());
    this.$b = b;
    this.qc = c;
    this.ld = 1;
    this.jd = 7441498;
    this.Td = d;
    this.Sd = e;
    this.kd = g;
    this.Uc = k;
    this.kc = 0.75 * d;
    400 < this.kc && (this.kc = 400);
    a = new L;
    var l = a.wa;
    l.x = 0;
    l.y = 1;
    a.Ua = - c;
    a.m = 0;
    this.qa.push(a);
    a = new L;
    l = a.wa;
    l.x = 0;
    l.y = - 1;
    a.Ua = - c;
    a.m = 0;
    this.qa.push(a);
    a = new L;
    l = a.wa;
    l.x = 1;
    l.y = 0;
    a.Ua = - b;
    a.m = 0;
    this.qa.push(a);
    a = new L;
    l = a.wa;
    l.x = - 1;
    l.y = 0;
    a.Ua = - b;
    a.m = 0;
    this.qa.push(a);
    this.eg(d, 1, f, 13421823, p.xa);
    this.eg(- d, - 1, f, 16764108, p.fa);
    this.Rk(g, c);
    b = new L;
    c = b.wa;
    c.x = 0;
    c.y = 1;
    b.Ua = - e;
    b.h = 1;
    this.qa.push(b);
    b = new L;
    c = b.wa;
    c.x = 0;
    c.y = - 1;
    b.Ua = - e;
    b.h = 1;
    this.qa.push(b);
    b = new B;
    c = b.a;
    c.x = - d;
    c.y = - e;
    b.h = 0;
    c = new B;
    g = c.a;
    g.x = d;
    g.y = - e;
    c.h = 0;
    g = new B;
    a = g.a;
    a.x = d;
    a.y = - f;
    g.h = 0;
    a = new B;
    l = a.a;
    l.x = d;
    l.y = f;
    a.h = 0;
    var l = new B,
      h = l.a;
    h.x = d;
    h.y = e;
    l.h = 0;
    var h = new B,
      m = h.a;
    m.x = - d;
    m.y = e;
    h.h = 0;
    var m = new B,
      n = m.a;
    n.x = - d;
    n.y = f;
    m.h = 0;
    var n = new B,
      q = n.a;
    q.x = - d;
    q.y = - f;
    n.h = 0;
    f = new E;
    f.W = c;
    f.ca = g;
    f.h = 1;
    f.Za = !1;
    q = new E;
    q.W = a;
    q.ca = l;
    q.h = 1;
    q.Za = !1;
    var r = new E;
    r.W = h;
    r.ca = m;
    r.h = 1;
    r.Za = !1;
    var u = new E;
    u.W = n;
    u.ca = b;
    u.h = 1;
    u.Za = !1;
    this.J.push(b);
    this.J.push(c);
    this.J.push(g);
    this.J.push(a);
    this.J.push(l);
    this.J.push(h);
    this.J.push(m);
    this.J.push(n);
    this.U.push(f);
    this.U.push(q);
    this.U.push(r);
    this.U.push(u);
    this.Pk(d, e, k);
    this.he()
  }
}

h.ja = function (a) {
  var b = a.B();
  return 255 == b ? (b = new h, b.Kr(a), b) : h.Kh()[b]
};

function Eb() {
  this.Se = 0;
  this.Z = 15;
  this.v = 0;
  this.oa = new H(0, 0);
  this.aa = this.m = 0.5;
  this.Ca = 0.96;
  this.Ce = 0.1;
  this.Te = 0.07;
  this.Ue = 0.96;
  this.Re = 5
}

function H(a, b) {
  this.x = a;
  this.y = b
}

h.Kh = function () {
  if (null == h.wb) {
    h.wb = [
    ];
    var a = new h();
    a.ad('Classic', 420, 200, 370, 170, 64, 75);
    h.wb.push(a);
    a = new h();
    a.ad('Easy', 420, 200, 370, 170, 90, 75);
    h.wb.push(a);
    a = new h();
    a.ad('Small', 420, 200, 320, 130, 55, 70);
    h.wb.push(a);
    a = new h();
    a.ad('Big', 600, 270, 550, 240, 80, 80);
    h.wb.push(a);
    a = new h();
    a.ad('Rounded', 420, 200, 370, 170, 64, 75, 75);
    h.wb.push(a);
    a = new h();
    a.Qk('Hockey', 420, 204, 398, 182, 68, 120, 75, 100);
    h.wb.push(a);
    a = new h();
    a.Qk('Big Hockey', 600, 270, 550, 240, 90, 160, 75, 150);
    h.wb.push(a);
    a = new h();
    a.ad('Big Easy', 600, 270, 550, 240, 95, 80);
    h.wb.push(a);
    a = new h();
    a.ad('Big Rounded', 600, 270, 550, 240, 80, 75, 100);
    h.wb.push(a);
    a = new h();
    a.ad('Huge', 750, 350, 700, 320, 100, 80);
    h.wb.push(a);
    for (var a = 0, b = h.wb.length; a < b;) {
      var c = a++;
      h.wb[c].Bh = c
    }
  }
  return h.wb
}

function B() {
  this.ud = 0;
  this.v = 32;
  this.h = 63;
  this.m = 1;
  this.a = new H(0, 0)
}

B.prototype = {
  ga: function (a) {
    var b = this.a;
    a.s(b.x);
    a.s(b.y);
    a.s(this.m);
    a.O(this.h);
    a.O(this.v)
  },
  ja: function (a) {
    var b = this.a;
    b.x = a.u();
    b.y = a.u();
    this.m = a.u();
    this.h = a.M();
    this.v = a.M()
  },
  f: B
};

function E() {
  this.Hg = this.Ig = this.wa = null;
  this.Yj = 0;
  this.ca = this.W = this.Xd = null;
  this.Cc = 0;
  this.m = 1;
  this.h = 63;
  this.v = 32;
  this.vb = 1 / 0;
  this.Za = !0;
  this.R = 0
}

E.prototype = {
  ga: function (a) {
    var b = 0,
      c = a.a;
    a.l(0);
    a.l(this.W.ud);
    a.l(this.ca.ud);
    if (0 != this.Cc) {
      b = 1;
      a.s(this.Cc);
    }
    if (this.vb != 1 / 0) {
      b |= 2;
      a.s(this.vb);
    }
    if (0 != this.R) {
      b |= 4;
      a.O(this.R);
    }
    this.Za && (b |= 8);
    a.o.setUint8(c, b);
    a.s(this.m);
    a.O(this.h);
    a.O(this.v)
  },
  ja: function (a, b) {
    var c = a.B();
    this.W = b[a.B()];
    this.ca = b[a.B()];
    this.Cc = 0 != (c & 1) ? a.u() : 0;
    this.vb = 0 != (c & 2) ? a.u() : 1 / 0;
    this.R = 0 != (c & 4) ? a.M() : 0;
    this.Za = 0 != (c & 8);
    this.m = a.u();
    this.h = a.M();
    this.v = a.M()
  },
  Oc: function (a) {
    a *= 0.017453292519943295;
    if (0 > a) {
      a = - a;
      var b = this.W;
      this.W = this.ca;
      this.ca = b;
      this.Cc = - this.Cc
    }
    a > E.mn && a < E.ln && (this.vb = 1 / Math.tan(a / 2))
  },
  Co: function () {
    return 0 != 0 * this.vb ? 0 : 114.59155902616465 * Math.atan(1 / this.vb)
  },
  he: function () {
    if (0 == 0 * this.vb) {
      var a = this.ca.a,
        b = this.W.a,
        c = 0.5 * (a.x - b.x),
        a = 0.5 * (a.y - b.y),
        b = this.W.a,
        d = this.vb;
      this.Xd = new H(b.x + c + - a * d, b.y + a + c * d);
      a = this.W.a;
      b = this.Xd;
      c = a.x - b.x;
      a = a.y - b.y;
      this.Yj = Math.sqrt(c * c + a * a);
      c = this.W.a;
      a = this.Xd;
      this.Hg = new H(- (c.y - a.y), c.x - a.x);
      c = this.Xd;
      a = this.ca.a;
      this.Ig = new H(- (c.y - a.y), c.x - a.x);
      if (0 >= this.vb) {
        a = c = this.Hg;
        c.x = - a.x;
        c.y = - a.y;
        a = c = this.Ig;
        c.x = - a.x;
        c.y = - a.y;
      }
    } else {
      a = this.W.a;
      b = this.ca.a;
      c = a.x - b.x;
      a = - (a.y - b.y);
      b = Math.sqrt(a * a + c * c);
      this.wa = new H(a / b, c / b)
    }
  },
  f: E
};

function L() {
  this.v = 32;
  this.h = 63;
  this.m = 1;
  this.Ua = 0;
  this.wa = new H(0, 0)
}

L.prototype = {
  ga: function (a) {
    var b = this.wa;
    a.s(b.x);
    a.s(b.y);
    a.s(this.Ua);
    a.s(this.m);
    a.O(this.h);
    a.O(this.v)
  },
  ja: function (a) {
    var b = this.wa;
    b.x = a.u();
    b.y = a.u();
    this.Ua = a.u();
    this.m = a.u();
    this.h = a.M();
    this.v = a.M()
  },
  f: L
};

var z = Number;
var oc = Boolean;

h.prototype = {
  dg: function () {
    var a = new ua;
    a.R = 16777215;
    a.h = 63;
    a.v = 193;
    a.Z = 10;
    a.Ca = 0.99;
    a.aa = 1;
    a.m = 0.5;
    return a
  },
  ga: function (a) {
    a.l(this.Bh);
    if (!this.Pe()) {
      a.Db(this.w);
      a.O(this.ld);
      a.s(this.Td);
      a.s(this.Sd);
      a.s(this.kd);
      a.s(this.Uc);
      a.s(this.Fe);
      a.O(this.jd);
      a.s(this.$b);
      a.s(this.qc);
      a.s(this.kc);
      this.ge.ga(a);
      a.Ub(this.Ye);
      a.l(this.Ge);
      a.l(this.Lf ? 1 : 0);
      a.l(this.pf ? 1 : 0);
      a.l(this.J.length);
      for (var b = 0, c = this.J.length; b < c;) {
        var d = b++,
          e = this.J[d];
        e.ud = d;
        e.ga(a)
      }
      a.l(this.U.length);
      b = 0;
      for (c = this.U; b < c.length;) c[b++].ga(a);
      a.l(this.qa.length);
      b = 0;
      for (c = this.qa; b < c.length;) c[b++].ga(a);
      a.l(this.tc.length);
      b = 0;
      for (c = this.tc; b < c.length;) c[b++].ga(a);
      a.l(this.F.length);
      b = 0;
      for (c = this.F; b < c.length;) c[b++].ga(a);
      a.l(this.pb.length);
      b = 0;
      for (c = this.pb; b < c.length;) c[b++].ga(a);
      a.l(this.Dd.length);
      b = 0;
      for (c = this.Dd; b < c.length;) {
        d = c[b];
        ++b;
        a.s(d.x);
        a.s(d.y);
      }
      a.l(this.md.length);
      b = 0;
      for (c = this.md; b < c.length;) {
        d = c[b];
        ++b;
        a.s(d.x);
        a.s(d.y);
      }
    }
  },
  Kr: function (a) {
    function b() {
      for (var b = [
      ], c = a.B(), d = 0; d < c;) {
        ++d;
        var e = new H(0, 0);
        e.x = a.u();
        e.y = a.u();
        b.push(e)
      }
      return b
    }
    this.w = a.zb();
    this.ld = a.M();
    this.Td = a.u();
    this.Sd = a.u();
    this.kd = a.u();
    this.Uc = a.u();
    this.Fe = a.u();
    this.jd = a.M();
    this.$b = a.u();
    this.qc = a.u();
    this.kc = a.u();
    this.ge.ja = function (a) {
      this.m = a.u();
      this.aa = a.u();
      this.Ca = a.u();
      this.Ce = a.u();
      this.Te = a.u();
      this.Ue = a.u();
      this.Re = a.u();
      var b = this.oa;
      b.x = a.u();
      b.y = a.u();
      this.v = a.M();
      this.Z = a.u();
      this.Se = a.u()
    }
    this.ge.ja(a);
    // STADION jest tu thisem
    this.Ye = a.Ob();
    this.Ge = a.B();
    this.Lf = 0 != a.B();
    this.pf = 0 != a.B();
    this.J = [
    ];
    for (var c = a.B(), d = 0; d < c;) {
      var e = new B;
      e.ja(a);
      e.ud = d++;
      this.J.push(e)
    }
    this.U = [
    ];
    c = a.B();
    for (d = 0; d < c;) {
      ++d;
      e = new E;
      e.ja(a, this.J);
      this.U.push(e);
    }
    this.qa = [
    ];
    c = a.B();
    for (d = 0; d < c;) {
      ++d;
      e = new L;
      e.ja(a);
      this.qa.push(e);
    }
    this.tc = [
    ];
    c = a.B();
    for (d = 0; d < c;) {
      ++d;
      e = new sb;
      e.ja(a);
      this.tc.push(e);
    }
    this.F = [
    ];
    c = a.B();
    for (d = 0; d < c;) {
      ++d;
      e = new ua;
      e.ja(a);
      this.F.push(e);
    }
    this.pb = [
    ];
    c = a.B();
    for (d = 0; d < c;) {
      ++d;
      e = new nb;
      e.ja(a);
      this.pb.push(e);
    }
    this.Dd = b();
    this.md = b();
    this.he()
  },
  he: function () {
    for (var a = 0, b = this.U; a < b.length;) b[a++].he()
  },
  Pe: function () {
    return 255 != this.Bh
  },
  be: function (a, b, c) {
    a = a[b];
    return null != a ? r.G(a, z) : c
  },
  op: function (a, b, c) {
    a = a[b];
    return null != a ? r.G(a, oc) : c
  },
  se: function () {
    return JSON.stringify(this.Hr())
  },
  Hr: function () {
    if (!this.Lf) throw new q(0);
    for (var a = {
    }, b = 0, c = [
    ], d = 0, e = this.J; d < e.length;) {
      var f = e[d];
      ++d;
      f.ud = b++;
      c.push(h.Tr(f))
    }
    d = new E;
    b = [
    ];
    e = 0;
    for (f = this.U; e < f.length;) b.push(h.fr(f[e++], d));
    d = [
    ];
    e = 0;
    for (f = this.qa; e < f.length;) d.push(h.gq(f[e++]));
    for (var e = [
    ], f = 0, g = this.tc; f < g.length;) e.push(h.Jo(g[f++]));
    for (var f = h.jq(this.ge), k = new ua, g = [
    ], l = 0, t = this.F; l < t.length;) g.push(h.mo(t[l++], k));
    k = [
    ];
    l = 0;
    for (t = this.pb; l < t.length;) k.push(h.ap(t[l++]));
    for (var l = [
    ], t = 0, m = this.Dd; t < m.length;) {
      var n = m[t];
      ++t;
      l.push([n.x,
      n.y])
    }
    t = [
    ];
    m = 0;
    for (n = this.md; m < n.length;) {
      var p = n[m];
      ++m;
      t.push([p.x,
      p.y])
    }
    c = {
      name: this.w,
      width: this.$b,
      height: this.qc,
      bg: a,
      vertexes: c,
      segments: b,
      planes: d,
      goals: e,
      discs: g,
      playerPhysics: f,
      ballPhysics: 'disc0'
    };
    console.log("stadion", c);
    h.ka(c, 'maxViewWidth', this.Ye, 0);
    h.ka(c, 'cameraFollow', 1 == this.Ge ? 'player' : '', '');
    h.ka(c, 'spawnDistance', this.kc, 200);
    0 != k.length && (c.joints = k);
    0 != l.length && (c.redSpawnPoints = l);
    0 != t.length && (c.blueSpawnPoints = t);
    h.ka(c, 'kickOffReset', this.pf ? 'full' : 'partial', 'partial');
    switch (this.ld) {
      case 1:
        b = 'grass';
        break;
      case 2:
        b = 'hockey';
        break;
      default:
        b = 'none'
    }
    h.ka(a, 'type', b, 'none');
    h.ka(a, 'width', this.Td, 0);
    h.ka(a, 'height', this.Sd, 0);
    h.ka(a, 'kickOffRadius', this.kd, 0);
    h.ka(a, 'cornerRadius', this.Uc, 0);
    h.qg(a, this.jd, 7441498);
    h.ka(a, 'goalLine', this.Fe, 0);
    return c
  },
  Lk: function (a) {
    function b(a) {
      var b = r.G(a[0], z);
      a = r.G(a[1], z);
      return new H(b, a)
    }
    function c(a, b, c, d) {
      null == d && (d = !1);
      var f = e[b];
      if (!d || null != f) if (d = r.G(f, Array), null != d) for (f = 0; f < d.length;) {
        var k = d[f];
        ++f;
        try {
          h.wn(k, g);
          a.push(c(k))
        } catch (wc) {
          throw new q(new Bb('Error in "' + b + '" index: ' + a.length));
        }
      }
    }
    var d = this,
      e = JSON.parse(a);
    // CHECKPOINT było JSON5, zmieniłem na JSON
    this.J = [
    ];
    this.U = [
    ];
    this.qa = [
    ];
    this.tc = [
    ];
    this.F = [
    ];
    this.pb = [
    ];
    this.w = r.G(e.name, String);
    this.$b = r.G(e.width, z);
    this.qc = r.G(e.height, z);
    this.Ye = this.be(e, 'maxViewWidth', 0) | 0;
    'player' == e.cameraFollow && (this.Ge = 1);
    this.kc = 200;
    a = e.spawnDistance;
    null != a && (this.kc = r.G(a, z));
    a = e.bg;
    var f;
    switch (a.type) {
      case 'grass':
        f = 1;
        break;
      case 'hockey':
        f = 2;
        break;
      default:
        f = 0
    }
    this.ld = f;
    this.Td = this.be(a, 'width', 0);
    this.Sd = this.be(a, 'height', 0);
    this.kd = this.be(a, 'kickOffRadius', 0);
    this.Uc = this.be(a, 'cornerRadius', 0);
    this.jd = 7441498;
    null != a.color && (this.jd = h.$f(a.color));
    this.Fe = this.be(a, 'goalLine', 0);
    this.Lf = this.op(e, 'canBeStored', !0);
    this.pf = 'full' == e.kickOffReset;
    var g = e.traits;
    a = e.ballPhysics;
    if ('disc0' != a) {
      if (null != a) {
        a = h.Mk(a, this.dg());
        a.v |= 192;
        this.F.push(a)
      }
    } else {
      this.F.push(this.dg())
    }
    c(this.J, 'vertexes', h.np);
    c(this.U, 'segments', function (a) {
      return h.mp(a, d.J)
    });
    c(this.tc, 'goals', h.ip);
    c(this.F, 'discs', function (a) {
      return h.Mk(a, new ua)
    });
    c(this.qa, 'planes', h.kp);
    c(this.pb, 'joints', function (a) {
      return h.jp(a, d.F)
    }, !0);
    c(this.Dd, 'redSpawnPoints', b, !0);
    c(this.md, 'blueSpawnPoints', b, !0);
    a = e.playerPhysics;
    null != a && (this.ge = h.lp(a));
    if (255 < this.J.length || 255 < this.U.length || 255 < this.qa.length || 255 < this.tc.length || 255 < this.F.length) throw new q('Error');
    this.he()
  },
  Sj: function () {
    var a = h.Fr;
    //CHECKPOINT dodaje ten warunek
    if (a == undefined) {
      console.log('nie mogę tu')
      return;
    }
    a.a = 0;
    this.ga(a);
    var b = new dc;
    b.Yr(a.Sb());
    b.hash = (b.hash += b.hash << 3) ^ b.hash >>> 11;
    b.hash += b.hash << 15;
    return b.hash | 0
  },
  Kn: function (a, b) {
    for (var c = 0, d = this.tc; c < d.length;) {
      var e = d[c];
      ++c;
      var f = e.W,
        g = e.ca,
        k = b.x - a.x,
        l = b.y - a.y;
      if (0 < - (f.y - a.y) * k + (f.x - a.x) * l == 0 < - (g.y - a.y) * k + (g.x - a.x) * l) {
        f = !1;
      } else {
        k = g.x - f.x;
        g = g.y - f.y;
        if (f = 0 < - (a.y - f.y) * k + (a.x - f.x) * g == 0 < - (b.y - f.y) * k + (b.x - f.x) * g) {
          return !1;
        } else {
          return !0;
          // CHECKPOINT w tych miejscach nie jestem pewien, być może to się odnosi do f, a nie return
        }
      }
      if (f) return e.qe
    }
    return p.Ia
  },
  ad: function (a, b, c, d, e, f, g, k) {
    null == k && (k = 0);
    this.w = a;
    this.F.push(this.dg());
    this.$b = b;
    this.qc = c;
    this.ld = 1;
    this.jd = 7441498;
    this.Td = d;
    this.Sd = e;
    this.kd = g;
    this.Uc = k;
    this.kc = 0.75 * d;
    400 < this.kc && (this.kc = 400);
    a = new L;
    var l = a.wa;
    l.x = 0;
    l.y = 1;
    a.Ua = - c;
    a.m = 0;
    this.qa.push(a);
    a = new L;
    l = a.wa;
    l.x = 0;
    l.y = - 1;
    a.Ua = - c;
    a.m = 0;
    this.qa.push(a);
    a = new L;
    l = a.wa;
    l.x = 1;
    l.y = 0;
    a.Ua = - b;
    a.m = 0;
    this.qa.push(a);
    a = new L;
    l = a.wa;
    l.x = - 1;
    l.y = 0;
    a.Ua = - b;
    a.m = 0;
    this.qa.push(a);
    this.eg(d, 1, f, 13421823, p.xa);
    this.eg(- d, - 1, f, 16764108, p.fa);
    this.Rk(g, c);
    b = new L;
    c = b.wa;
    c.x = 0;
    c.y = 1;
    b.Ua = - e;
    b.h = 1;
    this.qa.push(b);
    b = new L;
    c = b.wa;
    c.x = 0;
    c.y = - 1;
    b.Ua = - e;
    b.h = 1;
    this.qa.push(b);
    b = new B;
    c = b.a;
    c.x = - d;
    c.y = - e;
    b.h = 0;
    c = new B;
    g = c.a;
    g.x = d;
    g.y = - e;
    c.h = 0;
    g = new B;
    a = g.a;
    a.x = d;
    a.y = - f;
    g.h = 0;
    a = new B;
    l = a.a;
    l.x = d;
    l.y = f;
    a.h = 0;
    var l = new B,
      h = l.a;
    h.x = d;
    h.y = e;
    l.h = 0;
    var h = new B,
      m = h.a;
    m.x = - d;
    m.y = e;
    h.h = 0;
    var m = new B,
      n = m.a;
    n.x = - d;
    n.y = f;
    m.h = 0;
    var n = new B,
      q = n.a;
    q.x = - d;
    q.y = - f;
    n.h = 0;
    f = new E;
    f.W = c;
    f.ca = g;
    f.h = 1;
    f.Za = !1;
    q = new E;
    q.W = a;
    q.ca = l;
    q.h = 1;
    q.Za = !1;
    var r = new E;
    r.W = h;
    r.ca = m;
    r.h = 1;
    r.Za = !1;
    var u = new E;
    u.W = n;
    u.ca = b;
    u.h = 1;
    u.Za = !1;
    this.J.push(b);
    this.J.push(c);
    this.J.push(g);
    this.J.push(a);
    this.J.push(l);
    this.J.push(h);
    this.J.push(m);
    this.J.push(n);
    this.U.push(f);
    this.U.push(q);
    this.U.push(r);
    this.U.push(u);
    this.Pk(d, e, k);
    this.he()
  },
  Qk: function (a, b, c, d, e, f, g, k, l) {
    this.w = a;
    this.F.push(this.dg());
    this.$b = b;
    this.qc = c;
    this.ld = 2;
    this.Td = d;
    this.Sd = e;
    this.kd = k;
    this.Uc = l;
    this.Fe = g;
    this.kc = 0.75 * (d - g);
    400 < this.kc && (this.kc = 400);
    a = new L;
    var h = a.wa;
    h.x = 0;
    h.y = 1;
    a.Ua = - c;
    a.m = 0;
    this.qa.push(a);
    a = new L;
    h = a.wa;
    h.x = 0;
    h.y = - 1;
    a.Ua = - c;
    a.m = 0;
    this.qa.push(a);
    a = new L;
    h = a.wa;
    h.x = 1;
    h.y = 0;
    a.Ua = - b;
    a.m = 0;
    this.qa.push(a);
    a = new L;
    h = a.wa;
    h.x = - 1;
    h.y = 0;
    a.Ua = - b;
    a.m = 0;
    this.qa.push(a);
    this.eg(d - g, 1, f, 13421823, p.xa, 63);
    this.eg(- d + g, - 1, f, 16764108, p.fa, 63);
    this.Rk(k, c);
    b = new L;
    c = b.wa;
    c.x = 0;
    c.y = 1;
    b.Ua = - e;
    b.h = 1;
    this.qa.push(b);
    b = new L;
    c = b.wa;
    c.x = 0;
    c.y = - 1;
    b.Ua = - e;
    b.h = 1;
    this.qa.push(b);
    b = new L;
    c = b.wa;
    c.x = 1;
    c.y = 0;
    b.Ua = - d;
    b.h = 1;
    this.qa.push(b);
    b = new L;
    c = b.wa;
    c.x = - 1;
    c.y = 0;
    b.Ua = - d;
    b.h = 1;
    this.qa.push(b);
    this.Pk(d, e, l);
    this.he()
  },
  eg: function (a, b, c, d, e, f, g) {
    null == g && (g = 32);
    null == f && (f = 1);
    var k = new B,
      l = k.a;
    l.x = a + 8 * b;
    l.y = - c;
    var l = new B,
      h = l.a;
    h.x = a + 8 * b;
    h.y = c;
    var m = new B,
      h = m.a;
    h.x = k.a.x + 22 * b;
    h.y = k.a.y + 22;
    var n = new B,
      h = n.a;
    h.x = l.a.x + 22 * b;
    h.y = l.a.y - 22;
    h = new E;
    h.W = k;
    h.ca = m;
    h.Oc(90 * b);
    var p = new E;
    p.W = n;
    p.ca = m;
    var q = new E;
    q.W = n;
    q.ca = l;
    q.Oc(90 * b);
    b = this.J.length;
    this.J.push(k);
    this.J.push(l);
    this.J.push(m);
    this.J.push(n);
    k = b;
    for (b = this.J.length; k < b;) {
      l = k++;
      this.J[l].h = f;
      this.J[l].v = g;
      this.J[l].m = 0.1;
    }
    b = this.U.length;
    this.U.push(h);
    this.U.push(p);
    this.U.push(q);
    k = b;
    for (b = this.U.length; k < b;) {
      l = k++;
      this.U[l].h = f;
      this.U[l].v = g;
      this.U[l].m = 0.1;
    }
    f = new ua;
    g = f.a;
    g.x = a;
    g.y = - c;
    f.aa = 0;
    f.Z = 8;
    f.R = d;
    this.F.push(f);
    f = new ua;
    g = f.a;
    g.x = a;
    g.y = c;
    f.aa = 0;
    f.Z = 8;
    f.R = d;
    this.F.push(f);
    d = new sb;
    f = d.W;
    f.x = a;
    f.y = - c;
    f = d.ca;
    f.x = a;
    f.y = c;
    d.qe = e;
    this.tc.push(d)
  },
  Rk: function (a, b) {
    var c = new B,
      d = c.a;
    d.x = 0;
    d.y = - b;
    c.m = 0.1;
    c.v = 24;
    c.h = 6;
    var d = new B,
      e = d.a;
    e.x = 0;
    e.y = - a;
    d.m = 0.1;
    d.v = 24;
    d.h = 6;
    var e = new B,
      f = e.a;
    f.x = 0;
    f.y = a;
    e.m = 0.1;
    e.v = 24;
    e.h = 6;
    var f = new B,
      g = f.a;
    g.x = 0;
    g.y = b;
    f.m = 0.1;
    f.v = 24;
    f.h = 6;
    g = new E;
    g.W = c;
    g.ca = d;
    g.v = 24;
    g.h = 6;
    g.Za = !1;
    g.m = 0.1;
    var k = new E;
    k.W = e;
    k.ca = f;
    k.v = 24;
    k.h = 6;
    k.Za = !1;
    k.m = 0.1;
    var l = new E;
    l.W = d;
    l.ca = e;
    l.v = 8;
    l.h = 6;
    l.Za = !1;
    l.Oc(180);
    l.m = 0.1;
    var h = new E;
    h.W = e;
    h.ca = d;
    h.v = 16;
    h.h = 6;
    h.Za = !1;
    h.Oc(180);
    h.m = 0.1;
    this.J.push(c);
    this.J.push(d);
    this.J.push(e);
    this.J.push(f);
    this.U.push(g);
    this.U.push(k);
    this.U.push(l);
    this.U.push(h)
  },
  Pk: function (a, b, c) {
    if (!(0 >= c)) {
      var d = new B,
        e = d.a;
      e.x = - a + c;
      e.y = - b;
      d.h = 0;
      var e = new B,
        f = e.a;
      f.x = - a;
      f.y = - b + c;
      e.h = 0;
      var f = new B,
        g = f.a;
      g.x = - a + c;
      g.y = b;
      f.h = 0;
      var g = new B,
        k = g.a;
      k.x = - a;
      k.y = b - c;
      g.h = 0;
      var k = new B,
        l = k.a;
      l.x = a - c;
      l.y = b;
      k.h = 0;
      var l = new B,
        h = l.a;
      h.x = a;
      h.y = b - c;
      l.h = 0;
      var h = new B,
        m = h.a;
      m.x = a - c;
      m.y = - b;
      h.h = 0;
      var m = new B,
        n = m.a;
      n.x = a;
      n.y = - b + c;
      m.h = 0;
      a = new E;
      a.W = d;
      a.ca = e;
      a.h = 1;
      a.Za = !1;
      a.m = 1;
      a.Oc(- 90);
      b = new E;
      b.W = f;
      b.ca = g;
      b.h = 1;
      b.Za = !1;
      b.m = 1;
      b.Oc(90);
      c = new E;
      c.W = k;
      c.ca = l;
      c.h = 1;
      c.Za = !1;
      c.m = 1;
      c.Oc(- 90);
      n = new E;
      n.W = h;
      n.ca = m;
      n.h = 1;
      n.Za = !1;
      n.m = 1;
      n.Oc(90);
      this.J.push(d);
      this.J.push(e);
      this.J.push(f);
      this.J.push(g);
      this.J.push(k);
      this.J.push(l);
      this.J.push(h);
      this.J.push(m);
      this.U.push(a);
      this.U.push(b);
      this.U.push(c);
      this.U.push(n)
    }
  },
  f: h
};

function dc() {
  this.hash = 0
}

dc.prototype = {
  Yr: function (a) {
    for (var b = 0, c = a.length; b < c;) {
      this.hash += a[b++];
      this.hash += this.hash << 10;
      this.hash ^= this.hash >>> 6
    }
  },
  f: dc
};

function Bb(a) {
  this.xp = a
}

function nb() {
  this.R = 0;
  this.ne = 1 / 0;
  this.Hb = this.ec = 100;
  this.Yd = this.Zd = 0
}

nb.prototype = {
  ga: function (a) {
    a.l(this.Yd);
    a.l(this.Zd);
    a.s(this.Hb);
    a.s(this.ec);
    a.s(this.ne);
    a.O(this.R)
  },
  ja: function (a) {
    this.Yd = a.B();
    this.Zd = a.B();
    this.Hb = a.u();
    this.ec = a.u();
    this.ne = a.u();
    this.R = a.M()
  },
  C: function (a) {
    var b = a[this.Yd];
    a = a[this.Zd];
    if (null != b && null != a) {
      var c = b.a,
        d = a.a,
        e = c.x - d.x,
        c = c.y - d.y,
        f = Math.sqrt(e * e + c * c);
      if (!(0 >= f)) {
        e /= f;
        c /= f;
        d = b.aa / (b.aa + a.aa);
        d != d && (d = 0.5);
        var g,
          k;
        if (this.Hb >= this.ec) {
          g = this.Hb;
          k = 0;
        } else if (f <= this.Hb) {
          g = this.Hb;
          k = 1;
        } else if (f >= this.ec) {
          g = this.ec;
          k = - 1;
        } else return;
        f = g - f;
        if (0 == 0 * this.ne) {
          d = this.ne * f * 0.5;
          e *= d;
          c *= d;
          k = d = b.D;
          b = b.aa;
          d.x = k.x + e * b;
          d.y = k.y + c * b;
          d = b = a.D;
          a = a.aa;
          b.x = d.x + - e * a;
          b.y = d.y + - c * a;
        } else {
          g = f * d;
          var l = b.a,
            h = b.a;
          l.x = h.x + e * g * 0.5;
          l.y = h.y + c * g * 0.5;
          h = l = a.a;
          f -= g;
          l.x = h.x - e * f * 0.5;
          l.y = h.y - c * f * 0.5;
          f = b.D;
          g = a.D;
          f = e * (f.x - g.x) + c * (f.y - g.y);
          if (0 >= f * k) {
            d *= f;
            b = k = b.D;
            k.x = b.x - e * d;
            k.y = b.y - c * d;
            a = b = a.D;
            d = f - d;
            b.x = a.x + e * d;
            b.y = a.y + c * d
          }
        }
      }
    }
  },
  f: nb
};

function sb() {
  this.qe = p.Ia;
  this.ca = new H(0, 0);
  this.W = new H(0, 0)
}

sb.prototype = {
  ga: function (a) {
    var b = this.W;
    a.s(b.x);
    a.s(b.y);
    b = this.ca;
    a.s(b.x);
    a.s(b.y);
    a.l(this.qe.$)
  },
  ja: function (a) {
    var b = this.W;
    b.x = a.u();
    b.y = a.u();
    b = this.ca;
    b.x = a.u();
    b.y = a.u();
    a = a.lf();
    this.qe = 1 == a ? p.fa : 2 == a ? p.xa : p.Ia
  },
  f: sb
};

Vb.prototype = {
  ia: function () {
    console.log('czyżby tu koniec')
    window.document.removeEventListener('keydown', G(this, this.Bd));
    window.document.removeEventListener('keyup', G(this, this.Cd));
    window.onbeforeunload = null;
    window.cancelAnimationFrame(this.De);
    window.clearInterval(this.Gh)
  },
  bf: function () {
    this.De = window.requestAnimationFrame(G(this, this.bf));
    // CHECKPOINT BARDZO WAŻNY
    this.ya.C();
    this.Kc()
  },
  Kc: function () {
    this.je.C();
    var a = window.performance.now();
    if (1 == n.A.Fh.L() && 28.333333333333336 > a - this.$c) {
      this.$c = a;
      this.sd++;
      this.uf(n.A.Tb.L());
      0 < this.ya.Fd || this.j.C(this.ya)
    }
  },
  Bd: function (a) {
    switch (a.keyCode) {
      case 27:
        var b = this.j;
        b.me(!b.Gd);
        a.preventDefault();
        break;
      case 49:
        n.A.Tb.Xa(1);
        break;
      case 50:
        n.A.Tb.Xa(2);
        break;
      case 51:
        n.A.Tb.Xa(3);
        break;
      case 52:
        n.A.Tb.Xa(0)
    }
  },
  uf: function (a) {
    var b = this.j.Fb;
    if (0 >= a) {
      b.Gg(!0);
      b.Eb.kf = 1;
      b.Eb.xf = 0
    } else {
      b.Gg(!1);
      b.Eb.xf = 35;
      b.Eb.kf = 1 + 0.25 * (a - 1)
    }
  },
  Cd: function () {
  },
  f: Vb
};

fa.prototype = {
  yr: function (a) {
    if (null == this.K) {
      this.K = new O;
      for (var b = 0, c = this.I; b < c.length;) {
        var d = c[b];
        ++b;
        d.H = null;
        d.Jb = 0
      }
      this.K.Wo(this);
      null != this.Ki && this.Ki(a)
    }
  },
  Mf: function (a, b, c) {
    if (b.ea != c) {
      b.ea = c;
      D.remove(this.I, b);
      this.I.push(b);
      if (null != this.K) {
        if (null != b.H) {
          D.remove(this.K.ta.F, b.H);
          b.H = null;
        }
        this.K.Ck(b);
        for (var d = 0, e = !1; !e;) {
          ++d;
          for (var e = !0, f = 0, g = this.I; f < g.length;) {
            var k = g[f];
            ++f;
            if (k != b && k.ea == b.ea && k.Jb == d) {
              e = !1;
              break
            }
          }
        }
        b.Jb = d
      }
      Cb.i(this.xl, a, b, c)
    }
  },
  na: function (a) {
    for (var b = 0, c = this.I; b < c.length;) {
      var d = c[b];
      ++b;
      if (d.V == a) return d
    }
    return null
  },
  C: function (a) {
    null != this.K && this.K.C(a)
  },
  ga: function (a) {
    a.Db(this.jc);
    a.l(this.Pc ? 1 : 0);
    a.O(this.ib);
    a.O(this.Da);
    a.Xi(this.ce);
    a.l(this.Zc);
    a.l(this.yd);
    this.S.ga(a);
    a.l(null != this.K ? 1 : 0);
    null != this.K && this.K.ga(a);
    a.l(this.I.length);
    for (var b = 0, c = this.I; b < c.length;) c[b++].ua(a);
    this.kb[1].ga(a);
    this.kb[2].ga(a)
  },
  ja: function (a) {
    this.jc = a.zb();
    setName(this.jc)
    this.Pc = 0 != a.B();
    this.ib = a.M();
    this.Da = a.M();
    this.ce = a.ni();
    this.Zc = a.B();
    this.yd = a.B();
    this.S = h.ja(a);
    var b = 0 != a.B();
    this.K = null;
    if (b) {
      this.K = new O;
      this.K.ja(a, this);
    }
    for (var b = null == this.K ? null : this.K.ta.F, c = a.B(), d = this.I; d.length > c;) d.pop();
    for (d = 0; d < c;) {
      var e = new ea;
      e.va(a, b);
      this.I[d++] = e
    }
    this.kb[1].ja(a);
    this.kb[2].ja(a)
  },
  uk: function () {
    var a = 0,
      b = w.ha();
    this.ga(b);
    for (b = b.Gr(); 4 <= b.o.byteLength - b.a;) a ^= b.M();
    return a
  },
  Ao: function () {
    var a = w.ha(4);
    a.O(this.uk());
    return a.Kg()
  },
  Sn: function (a) {
    a = (new F(new DataView(a))).M();
    y.i(this.ko, this.uk() != a)
  },
  km: function (a) {
    this.Ol = a
  },
  Lb: function (a) {
    if (0 == a) return !0;
    a = this.na(a);
    return null != a && a.cb ? !0 : !1
  },
  mr: function (a, b, c, d) {
    this.yd = 0 > b ? 0 : 255 < b ? 255 : b;
    this.Zc = 0 > c ? 0 : 255 < c ? 255 : c;
    d = 0 > d ? 0 : 100 < d ? 100 : d;
    this.ce = this.Zc * d;
    vb.i(this.Hk, a, this.yd, this.Zc, d)
  },
  sc: function () {
    var a = ya.zc,
      b = this.gc;
    if (this.hc != a) {
      if (null == b) {
        this.gc = b = new fa;
        this.hc = a;
        fa.qd(b, this)
      }
    }
    return b
  },
  f: fa
};

function O() {
  this.hc = - 1;
  this.gc = null;
  this.Pb = this.Kb = this.Hc = this.Oa = 0;
  this.ae = p.fa;
  this.vc = this.Bb = 0;
  this.ta = new Fa;
  this.Da = 0;
  this.ib = 5;
  this.S = null
}

O.prototype = {
  Wo: function (a) {
    this.Ma = a;
    this.ib = a.ib;
    this.Da = a.Da;
    this.S = a.S;
    this.ta.J = this.S.J;
    this.ta.qa = this.S.qa;
    this.ta.U = this.S.U;
    this.ta.pb = this.S.pb;
    a = 0;
    for (var b = this.S.F; a < b.length;) this.ta.F.push(b[a++].rp());
    this.Gk()
  },
  Ck: function (a) {
    if (a.ea == p.Ia) a.H = null;
    else {
      a.ob = 0;
      var b = a.H;
      if (null == b) {
        b = new ca;
        a.H = b;
        this.ta.F.push(b);
      }
      var c = this.S.ge;
      b.R = 0;
      b.Z = c.Z;
      b.aa = c.aa;
      b.Ca = c.Ca;
      b.m = c.m;
      b.h = 39;
      b.v = a.ea.v | c.v;
      var d = a.ea == p.fa ? this.S.Dd : this.S.md;
      if (0 == d.length) {
        b.a.x = a.ea.Ch * this.S.$b;
        b.a.y = 0
      } else {
        a = b.a;
        d = d[d.length - 1];
        a.x = d.x;
        a.y = d.y
      }
      d = b.D;
      d.x = 0;
      d.y = 0;
      b = b.oa;
      c = c.oa;
      b.x = c.x;
      b.y = c.y
    }
  },
  C: function (a) {
    if (0 < this.Oa) 120 > this.Oa && this.Oa--;
    else {
      var b = this.Ma.Os;
      null != b && b();
      if (czyAktualizowacGraczy && aktualizuj) {
        let li = this.Ma.I;
        // console.log("chyba lista graczy", li);
        players = players.concat(li);
        for (var i = 0; i < li.length; i++) {
          if (!playerList.includes(li[i].w)) {
            playerList.push(li[i].w);
            match[match.length - 1].player.push({
              id: li[i].V,
              nick: li[i].w,
              nation: li[i].Kd,
              goals: 0,
              assists: 0,
              kicks: 0
            });
          }
        }
        //console.log(playerList);
        czyAktualizowacGraczy = false;
      }
      for (var b = this.Ma.I, c = 0; c < b.length;) {
        var d = b[c];
        ++c;
        if (null != d.H) {
          0 == (d.ob & 16) && (d.Wb = !1);
          var e = this.S.ge;
          0 < d.Sc && d.Sc--;
          d.yc < this.Ma.ce && d.yc++;
          if (d.Wb && 0 >= d.Sc && 0 <= d.yc) {
            // CHECKPOINT console.log("iksnął", d.w, d.Wb, d.Sc, d.yc);
            RecInfo.kicks.push({ player: d.w, Wb: d.Wb })
            // console.log(RecInfo)
            for (var f = !1, g = 0, k = this.ta.F; g < k.length;) {
              var l = k[g];
              ++g;
              if (0 != (l.v & 64) && l != d.H) {
                var t = l.a,
                  h = d.H.a,
                  m = t.x - h.x,
                  t = t.y - h.y,
                  h = Math.sqrt(m * m + t * t);
                if (4 > h - l.Z - d.H.Z) {
                  //console.log("pileczka",l.a.x,l.a.y); TU KORDY PILKI
                  let ball = { x: l.a.x, y: l.a.y };
                  var f = m / h,
                    m = t / h,
                    t = e.Re,
                    n = h = l.D,
                    l = l.aa;
                  h.x = n.x + f * t * l;
                  h.y = n.y + m * t * l;
                  //console.log("wektor piłki",h.x,h.y,e); TU WEKTOR PO STRZALE
                  ball.vx = h.x;
                  ball.vy = h.y;
                  n = d.H;
                  l = - e.Se;
                  h = t = n.D;
                  n = n.aa;
                  t.x = h.x + f * l * n;
                  t.y = h.y + m * l * n;//checkpoint kick
                  //console.log(t.x,t.y);
                  //console.log("kopnięcie chyba",d);//,d.w,d.ea.w);
                  //console.log(ball);
                  let rA = ball.vy / ball.vx;
                  let rB = 1;
                  let rC = ball.y - (ball.vy / ball.vx) * ball.x;
                  if (aktualizuj) {
                    if (d.ea.w == "Red" && ball.vx > 0 && 99.762 * ball.vx + ball.x > blueGoalCord[0] && ball.x < blueGoalCord[0]) {
                      let poz = rA * blueGoalCord[0] + rC;
                      if (poz > blueGoalCord[1] && poz < blueGoalCord[2]) {
                        //console.log("Celny strzał "+d.w);
                        match[match.length - 1].shots.push(d.w);
                        match[match.length - 1].shotsRed++;
                      }
                    } else if (d.ea.w == "Blue" && ball.vx < 0 && 99.762 * ball.vx + ball.x < redGoalCord[0] && ball.x > redGoalCord[0]) {
                      let poz = rA * redGoalCord[0] + rC;
                      if (poz > redGoalCord[1] && poz < redGoalCord[2]) {
                        //console.log("Celny strzał"+d.w);
                        match[match.length - 1].shots.push(d.w);
                        match[match.length - 1].shotsBlue++;
                      }
                    }
                    if (d.ea.w == "Red") match[match.length - 1].kicksRed++;
                    else match[match.length - 1].kicksBlue++;
                    //console.log("sprawdzenie czasu po kopnięciu",this.Hc)
                    //console.log("UWAGA",match,playerList)
                    match[match.length - 1].kicks.push(d.w);
                    pileczka.push(/*[k[0].D,k[0].a]*/[t, l]);
                    //console.log("sprawdzenie czegoś tam",k[0].D,k[0].a);
                    if (match[match.length - 1].spaceMode) {
                      match[match.length - 1].touches.push(d.w);
                      if (toucher.name != undefined && d.w != toucher.name) {
                        lastToucher = toucher;
                        if (lastToucher.team == d.ea.w) {
                          //console.log("Podanie ",lastKicker.name+" do "+d.w);
                          match[match.length - 1].passes.push(lastToucher.name);
                          if (lastToucher.team == "Red") match[match.length - 1].passesRed++;
                          else match[match.length - 1].passesBlue++;
                        }
                        //console.log("tacz",d.w);
                      }
                      toucher = {
                        name: d.w,
                        team: d.ea.w
                      };
                    } else {
                      if (kicker != undefined && d.w != kicker.name) {
                        lastKicker = kicker;
                        if (lastKicker.team == d.ea.w) {
                          //console.log("Podanie ",lastKicker.name+" do "+d.w);
                          match[match.length - 1].passes.push(lastKicker.name);
                          if (lastKicker.team == "Red") match[match.length - 1].passesRed++;
                          else match[match.length - 1].passesBlue++;
                        }
                      }
                      kicker = {
                        name: d.w,
                        team: d.ea.w
                      };
                    }
                  }
                  //console.log("chyba pozycja piłki (jednak nie)",h,l,d,f,t,n);
                  f = !0
                }
              }
            }
            //console.log("chyba ruch",d.w, d.H.D.x, d.H.D.y);
            //console.log("chyba iksuje", d.w, d.Sc, d.cb);
            if (f) {
              if (null != this.Ma.ji) {
                this.Ma.ji(d);
                d.Wb = !1;
                d.Sc = this.Ma.yd;
                d.yc -= this.Ma.Zc
              }
            }
          }
          f = d.ob;
          k = g = 0;
          0 != (f & 1) && --k;
          0 != (f & 2) && ++k;
          0 != (f & 4) && --g;
          0 != (f & 8) && ++g;
          if (0 != g && 0 != k) {
            f = Math.sqrt(g * g + k * k);
            g /= f;
            k /= f;
          }
          f = d.H.D;
          l = d.Wb ? e.Te : e.Ce;
          f.x += g * l;
          f.y += k * l;
          d.H.Ca = d.Wb ? e.Ue : e.Ca
        }
      }
      c = 0;
      d = this.ta.F;
      e = 0;
      for (g = d.length; e < g;) {
        f = e++;
        k = d[f];
        if (0 != (k.v & 128)) {
          O.dk[c] = f;
          f = O.Yk[c];
          k = k.a;
          f.x = k.x;
          f.y = k.y;
          ++c;
        }
      }
      this.ta.C(a);
      if (0 == this.Bb) {
        for (a = 0; a < b.length;) {
          c = b[a];
          ++a;
          null != c.H && (c.H.h = 39 | this.ae.cp);
        }
        b = this.ta.F[0].D;
        0 < b.x * b.x + b.y * b.y && (this.Bb = 1)
      } else if (1 == this.Bb) {
        this.Hc +=
          0.016666666666666666;
        if (aktualizujStadion) {
          //console.log(a.S);//cały czas wyyświetlany stadion checkpoint
          //console.log('stadion',this.S);
          if (this.S.tc.length < 2) {
            aktualizujStadion = false;
            return;
          }
          var std = this.S.tc[0];
          //console.log(this.S);
          ballRadius = this.S.F[0].Z;
          //console.log(ballRadius);
          //console.log(this.S.ge.m);// bCoef graczów
          if (this.S.ge.m > 1) {
            match[match.length - 1].spaceMode = true;
            match[match.length - 1].bumps = [];
          }
          else match[match.length - 1].spaceMode = false;
          stadion = [this.S.Td, this.S.Sd];
          if (this.S.Td == 0) stadion = [this.S.$b, this.S.qc];
          //console.log(stadion);
          if (std.qe.w == "Red") redGoalCord = [std.W.x, std.W.y, std.ca.y];
          else blueGoalCord = [std.W.x, std.W.y, std.ca.y];

          std = this.S.tc[1];
          if (std.qe.w == "Red") redGoalCord = [std.W.x, std.ca.y, std.W.y];
          else blueGoalCord = [std.W.x, std.W.y, std.ca.y];
          if (redGoalCord[2] < redGoalCord[1]) {
            redGoalCord.push(redGoalCord[1]);
            redGoalCord.splice(1, 1);
          }
          if (blueGoalCord[2] < blueGoalCord[1]) {
            blueGoalCord.push(blueGoalCord[1]);
            blueGoalCord.splice(1, 1);
          }
          aktualizujStadion = false;
          //console.log(redGoalCord,blueGoalCord);

        }
        //console.log("coś",this.Hc);//checkpoint every tick
        //if (Math.random()<0.01) console.log(b); // gracze są na v==4 i v==2 (redblue)
        if (aktualizuj) {
          //if (Math.random() < 0.002) console.log(a,b);
          //kanwasy.push(document.getElementById('game-state-view').lastChild);
          match[match.length - 1].gameTicks++;
          //if (match.length==11 && Math.random()<0.01) console.log(k.a.x);
          if (d[0].a.x < (redGoalCord[0] / 3)) match[match.length - 1].thirds[0]++;
          else if (d[0].a.x < (blueGoalCord[0] / 3)) match[match.length - 1].thirds[1]++;
          else match[match.length - 1].thirds[2]++;
          //if (Math.random()<0.002) console.log(b[3]);
          if (match.length > playerPos.length) playerPos.push([]);
          for (var i = 0; i < b.length; i++) {
            if (playerPos[match.length - 1][playerList.indexOf(b[i].w)] == undefined) playerPos[match.length - 1][playerList.indexOf(b[i].w)] = [];
            if (b[i].H != null) playerPos[match.length - 1][playerList.indexOf(b[i].w)].push({ x: b[i].H.a.x, y: b[i].H.a.y });
          }
          pozycje = playerPos;
          if (match[match.length - 1].spaceMode) {
            for (var i = 0; i < b.length; i++) {
              if (b[i].H == null) continue;
              if (odleglosc(b[i].H.a, d[0].a) < (15 + ballRadius + 0.0001)) {
                //console.log("touch",b[i]);// checkpoint teraz
                if (toucher.name != b[i].w) {
                  lastToucher = toucher;
                  toucher = { name: b[i].w, team: b[i].ea.w };
                  match[match.length - 1].touches.push(b[i].w);
                }
              }
              for (var j = i + 1; j < b.length; j++) {
                if (b[j].H == null) continue;
                //if (Math.random()<0.01) console.log(odleglosc(b[i].H.a,b[j].H.a));
                if (odleglosc(b[i].H.a, b[j].H.a) < 30.0001) match[match.length - 1].bumps.push(b[i].w, b[j].w);
                //if (odleglosc(b[i].H.a,b[j].H.a) < 30.0001) console.log("bump ",b[i].w, b[j].w, odleglosc(b[i].H.a,b[j].H.a));
              }
            }
          }
        }
        if (checkTeams && aktualizuj) {
          for (var i = 0; i < b.length; i++) {
            if (b[i].ea.w == "Red" && !match[match.length - 1].redTeam.includes(b[i].w)) match[match.length - 1].redTeam.push(b[i].w);
            else if (b[i].ea.w == "Blue" && !match[match.length - 1].blueTeam.includes(b[i].w)) match[match.length - 1].blueTeam.push(b[i].w);
          }
          checkTeams = false;
        }
        if (match[match.length - 1].spaceMode && aktualizuj) {
          if (toucher.team == "Red") match[match.length - 1].possRed++;
          else if (toucher.team == "Blue") match[match.length - 1].possBlue++;
        } else if (kicker != undefined && aktualizuj) {
          if (kicker.team == "Red") match[match.length - 1].possRed++;
          else match[match.length - 1].possBlue++;
        }
        czasGry = this.Hc;
        for (a = 0; a < b.length;) {
          d = b[a];
          ++a;
          null != d.H && (d.H.h = 39);
        }
        d = p.Ia;
        b = this.ta.F;
        for (a = 0; a < c && (d = a++, d = this.S.Kn(b[O.dk[d]].a, O.Yk[d]), d == p.Ia););
        //if (Math.random()<0.002) console.log(b);
        //if(d!=p.Ia) //console.log(this.Ma.Pi);//console.log("coś tu chyba gol",a,b,c,d,e,f,g,h,i,k);//k.a = piłka
        if (d != p.Ia) {
          this.Bb = 2;
          this.vc = 150;
          this.ae = d;
          d == p.fa ? this.Kb++ : this.Pb++;
          null != this.Ma.Ni && this.Ma.Ni(d.pg);
          null != this.Ma.Ol && this.Ma.Ol(d.$);
        } else {
          if (0 < this.Da && this.Hc >= 60 * this.Da && this.Pb != this.Kb) {
            null != this.Ma.Pi && this.Ma.Pi();
            this.um()
          }
        }
      } else if (2 == this.Bb) {
        this.vc--;
        if (0 >= this.vc) {
          if (0 < this.ib && (this.Pb >= this.ib || this.Kb >= this.ib) || 0 < this.Da && this.Hc >= 60 * this.Da && this.Pb != this.Kb) {
            this.um()
          } else {
            this.Gk();
            null != this.Ma.lq && this.Ma.lq();
          }
        }
      } else if (3 == this.Bb && (this.vc--, 0 >= this.vc && (b = this.Ma, null != b.K))) {
        b.K = null;
        a = 0;
        for (c = b.I; a < c.length;) {
          d = c[a];
          ++a;
          d.H = null;
          d.Jb = 0;
        }
        null != b.vf && b.vf(null)
      }
    }
  },
  um: function () {
    this.vc = 300;
    this.Bb = 3;
    // CHECKPOINT console.log(pileczka);
    //console.log("Chyba koniec meczu", match);
    null != this.Ma.Oi && this.Ma.Oi(this.Pb > this.Kb ? p.fa : p.xa)
  },
  Gk: function () {
    var a = this.Ma.I;
    this.Bb = 0;
    for (var b = this.S.F, c = this.ta.F, d = 0, e = this.S.pf ? b.length : 1; d < e;) {
      var f = d++;
      b[f].Bk(c[f])
    }
    b = [
      0,
      0,
      0
    ];
    for (c = 0; c < a.length;) if (d = a[c], ++c, this.Ck(d), e = d.ea, e != p.Ia) {
      var f = d.H.a,
        g = this.S,
        k = b[e.$],
        l = e == p.fa ? g.Dd : g.md;
      if (0 == l.length) {
        l = k + 1 >> 1;
        0 == (k & 1) && (l = - l);
        g = g.kc * e.Ch;
        k = 55 * l
      } else {
        k >= l.length && (k = l.length - 1);
        k = l[k];
        g = k.x;
        k = k.y;
      }
      f.x = g;
      f.y = k;
      b[e.$]++;
      d.Jb = b[e.$]
    }
  },
  ga: function (a) {
    this.ta.ga(a);
    a.O(this.vc);
    a.O(this.Bb);
    a.O(this.Pb);
    a.O(this.Kb);
    a.s(this.Hc);
    a.O(this.Oa);
    a.l(this.ae.$)
  },
  ja: function (a, b) {
    this.ta.ja(a);
    this.vc = a.M();
    this.Bb = a.M();
    this.Pb = a.M();
    this.Kb = a.M();
    this.Hc = a.u();
    this.Oa = a.M();
    var c = a.lf();
    this.ae = 1 == c ? p.fa : 2 == c ? p.xa : p.Ia;
    this.Ma = b;
    this.ib = b.ib;
    this.Da = b.Da;
    this.S = b.S;
    this.ta.J = this.S.J;
    this.ta.U = this.S.U;
    this.ta.qa = this.S.qa;
    this.ta.pb = this.S.pb
  },
  sc: function () {
    var a = ya.zc,
      b = this.gc;
    if (this.hc != a) {
      null == b && (this.gc = b = new O);
      this.hc = a;
      O.qd(b, this);
    }
    return b
  },
  f: O
};

var D = {
  remove: function (a, b) {
    var c = a.indexOf(b);
    if (- 1 == c) return !1;
    a.splice(c, 1);
    return !0
  }
}

var Cb = {
  i: function (a, b, c, d) {
    null != a && a(b, c, d)
  }
}

function ea() {
  this.zc = - 1;
  this.an = null;
  this.ea = p.Ia;
  this.H = null;
  this.yc = this.Sc = 0;
  this.Wb = !1;
  this.ob = this.V = 0;
  this.w = 'Player';
  this.Ug = this.yb = 0;
  this.Kd = null;
  this.Ld = !1;
  this.Xb = this.Jd = null;
  this.Jb = 0;
  this.cb = !1
}

ea.prototype = {
  ua: function (a) {
    a.l(this.cb ? 1 : 0);
    a.O(this.Jb);
    a.Db(this.Xb);
    a.Db(this.Jd);
    a.l(this.Ld ? 1 : 0);
    a.Db(this.Kd);
    a.O(this.Ug);
    a.Db(this.w);
    a.O(this.ob);
    a.lb(this.V);
    a.l(this.Wb ? 1 : 0);
    a.Xi(this.yc);
    a.l(this.Sc);
    a.l(this.ea.$);
    a.Xi(null ==
      this.H ? - 1 : this.H.jl)
  },
  va: function (a, b) {
    this.cb = 0 != a.B();
    this.Jb = a.M();
    this.Xb = a.zb();
    this.Jd = a.zb();
    this.Ld = 0 != a.B();
    this.Kd = a.zb();
    this.Ug = a.M();
    this.w = a.zb();
    this.ob = a.M();
    this.V = a.Ab();
    this.Wb = 0 != a.B();
    this.yc = a.ni();
    this.Sc = a.B();
    var c = a.lf();
    this.ea = 1 == c ? p.fa : 2 == c ? p.xa : p.Ia;
    c = a.ni();
    this.H = 0 > c ? null : b[c]
  },
  hs: function () {
    var a = ya.zc,
      b = this.an;
    if (this.zc != a) {
      null == b && (this.an = b = new ea);
      this.zc = a;
      ea.$r(b, this)
    }
    return b
  },
  f: ea
};

var y = {
  i: function (a, b) {
    null != a && a(b)
  }
}

var vb = {
  i: function (a, b, c, d, e) {
    null != a && a(b, c, d, e)
  }
}

function Fa() {
  this.hc = - 1;
  this.gc = null;
  this.F = [
  ]
}

Fa.prototype = {
  ga: function (a) {
    a.l(this.F.length);
    for (var b = 0, c = this.F.length; b < c;) {
      var d = b++,
        e = this.F[d];
      e.jl = d;
      e.ga(a)
    }
  },
  ja: function (a) {
    this.F = [
    ];
    for (var b = a.B(), c = 0; c < b;) {
      ++c;
      var d = new ca;
      d.ja(a);
      this.F.push(d)
    }
  },
  C: function (a) {
    for (var b = 0, c = this.F; b < c.length;) {
      var d = c[b];
      ++b;
      var e = d.a,
        f = d.a,
        g = d.D;
      e.x = f.x + g.x * a;
      e.y = f.y + g.y * a;
      f = e = d.D;
      g = d.oa;
      d = d.Ca;
      e.x = (f.x + g.x) * d;
      e.y = (f.y + g.y) * d
    }
    a = 0;
    for (b = this.F.length; a < b;) {
      d = a++;
      c = this.F[d];
      d += 1;
      for (e = this.F.length; d < e;) {
        f = this.F[d++];
        0 != (f.h & c.v) && 0 != (f.v & c.h) && c.Pn(f);
      }
      if (0 != c.aa) {
        d = 0;
        for (e = this.qa; d < e.length;) if (f = e[d], ++d, 0 != (f.h & c.v) && 0 != (f.v & c.h)) {
          var g = f.wa,
            k = c.a,
            g = f.Ua - (g.x * k.x + g.y * k.y) + c.Z;
          if (0 < g) {
            var l = k = c.a,
              h = f.wa;
            k.x = l.x + h.x * g;
            k.y = l.y + h.y * g;
            g = c.D;
            k = f.wa;
            g = g.x * k.x + g.y * k.y;
            if (0 > g) {
              g *= c.m * f.m + 1;
              l = k = c.D;
              f = f.wa;
              k.x = l.x - f.x * g;
              k.y = l.y - f.y * g
            }
          }
        }
        d = 0;
        for (e = this.U; d < e.length;) {
          f = e[d];
          ++d;
          0 != (f.h & c.v) && 0 != (f.v & c.h) && c.Qn(f);
        }
        d = 0;
        for (e = this.J; d < e.length;) if (f = e[d], ++d, 0 != (f.h & c.v) && 0 != (f.v & c.h) && (k = c.a, l = f.a, g = k.x - l.x, k = k.y - l.y, l = g * g + k * k, 0 < l && l <= c.Z * c.Z)) {
          var l = Math.sqrt(l),
            g = g / l,
            k = k / l,
            l = c.Z - l,
            m = h = c.a;
          h.x = m.x + g * l;
          h.y = m.y + k * l;
          l = c.D;
          l = g * l.x + k * l.y;
          if (0 > l) {
            l *= c.m * f.m + 1;
            h = f = c.D;
            f.x = h.x - g * l;
            f.y = h.y - k * l;
          }
        }
      }
    }
    for (a = 0; 2 > a;) for (++a, b = 0, c = this.pb; b < c.length;) c[b++].C(this.F)
  },
  sc: function () {
    var a = ya.zc,
      b = this.gc;
    if (this.hc != a) {
      null == b && (this.gc = b = new Fa);
      this.hc = a;
      Fa.qd(b, this);
    }
    return b
  },
  f: Fa
};

function ca() {
  this.hc = - 1;
  this.gc = null;
  this.jl = 0;
  this.h = this.v = 63;
  this.Mj = 0;
  this.R = 16777215;
  this.Ca = 0.99;
  this.aa = 1;
  this.m = 0.5;
  this.Z = 10;
  this.oa = new H(0, 0);
  this.D = new H(0, 0);
  this.a = new H(0, 0)
}

ca.prototype = {
  ga: function (a) {
    var b = this.a;
    a.s(b.x);
    a.s(b.y);
    b = this.D;
    a.s(b.x);
    a.s(b.y);
    b = this.oa;
    a.s(b.x);
    a.s(b.y);
    a.s(this.Z);
    a.s(this.m);
    a.s(this.aa);
    a.s(this.Ca);
    a.tb(this.R);
    a.O(this.h);
    a.O(this.v)
  },
  ja: function (a) {
    var b = this.a;
    b.x = a.u();
    b.y = a.u();
    b = this.D;
    b.x = a.u();
    b.y = a.u();
    b = this.oa;
    b.x = a.u();
    b.y = a.u();
    this.Z = a.u();
    this.m = a.u();
    this.aa = a.u();
    this.Ca = a.u();
    this.R = a.hb();
    this.h = a.M();
    this.v = a.M()
  },
  Pn: function (a) {
    var b = this.a,
      c = a.a,
      d = b.x - c.x,
      b = b.y - c.y,
      e = a.Z + this.Z,
      f = d * d + b * b;
    if (0 < f && f <= e * e) {
      var f = Math.sqrt(f),
        d = d / f,
        b = b / f,
        c = this.aa / (this.aa + a.aa),
        e = e - f,
        f = e * c,
        g = this.a,
        k = this.a;
      g.x = k.x + d * f;
      g.y = k.y + b * f;
      k = g = a.a;
      e -= f;
      g.x = k.x - d * e;
      g.y = k.y - b * e;
      e = this.D;
      f = a.D;
      e = d * (e.x - f.x) + b * (e.y - f.y);
      if (0 > e) {
        e *= this.m * a.m + 1;
        c *= e;
        g = f = this.D;
        f.x = g.x - d * c;
        f.y = g.y - b * c;
        a = f = a.D;
        c = e - c;
        f.x = a.x + d * c;
        f.y = a.y + b * c;
      }
    }
  },
  Qn: function (a) {
    var b,
      c,
      d;
    if (0 != 0 * a.vb) {
      b = a.W.a;
      var e = a.ca.a;
      c = e.x - b.x;
      var f = e.y - b.y,
        g = this.a;
      d = g.x - e.x;
      e = g.y - e.y;
      g = this.a;
      if (0 >= (g.x - b.x) * c + (g.y - b.y) * f || 0 <= d * c + e * f) return;
      c = a.wa;
      b = c.x;
      c = c.y;
      d = b * d + c * e
    } else {
      c = a.Xd;
      d = this.a;
      b = d.x - c.x;
      c = d.y - c.y;
      d = a.Hg;
      e = a.Ig;
      if ((0 < d.x * b + d.y * c && 0 < e.x * b + e.y * c) == 0 >= a.vb) return;
      e = Math.sqrt(b * b + c * c);
      if (0 == e) return;
      d = e - a.Yj;
      b /= e;
      c /= e
    }
    e = a.Cc;
    if (0 == e) {
      if (0 > d) {
        d = - d;
        b = - b;
        c = - c
      }
    } else if (0 > e && (e = - e, d = - d, b = - b, c = - c), d < - e) return;
    if (d >= this.Z) {
      d = this.Z - d;
      f = e = this.a;
      e.x = f.x + b * d;
      e.y = f.y + c * d;
      d = this.D;
      d = b * d.x + c * d.y;
      if (0 > d) {
        d *= this.m * a.m + 1;
        e = a = this.D;
        a.x = e.x - b * d;
        a.y = e.y - c * d;
      }
    }
  },
  sc: function () {
    var a = ya.zc,
      b = this.gc;
    if (this.hc != a) {
      null == b && (this.gc = b = new ca);
      this.hc = a;
      ca.qd(b, this);
    }
    return b
  },
  f: ca
};

ua.prototype = {
  ga: function (a) {
    var b = this.a;
    a.s(b.x);
    a.s(b.y);
    b = this.D;
    a.s(b.x);
    a.s(b.y);
    b = this.oa;
    a.s(b.x);
    a.s(b.y);
    a.s(this.Z);
    a.s(this.m);
    a.s(this.aa);
    a.s(this.Ca);
    a.tb(this.R);
    a.O(this.h);
    a.O(this.v)
  },
  ja: function (a) {
    var b = this.a;
    b.x = a.u();
    b.y = a.u();
    b = this.D;
    b.x = a.u();
    b.y = a.u();
    b = this.oa;
    b.x = a.u();
    b.y = a.u();
    this.Z = a.u();
    this.m = a.u();
    this.aa = a.u();
    this.Ca = a.u();
    this.R = a.hb();
    this.h = a.M();
    this.v = a.M()
  },
  rp: function () {
    var a = new ca;
    this.Bk(a);
    return a
  },
  Bk: function (a) {
    var b = a.a,
      c = this.a;
    b.x = c.x;
    b.y = c.y;
    b = a.D;
    c = this.D;
    b.x = c.x;
    b.y = c.y;
    b = a.oa;
    c = this.oa;
    b.x = c.x;
    b.y = c.y;
    a.Z = this.Z;
    a.m = this.m;
    a.aa = this.aa;
    a.Ca = this.Ca;
    a.R = this.R;
    a.h = this.h;
    a.v = this.v
  },
  f: ua
};

ka.prototype = {
  ga: function (a) {
    a.l(this.hd);
    a.O(this.ed);
    a.l(this.fb.length);
    for (var b = 0, c = this.fb; b < c.length;) a.O(c[b++])
  },
  ja: function (a) {
    this.hd = a.B();
    this.ed = a.M();
    var b = a.B();
    if (3 < b) throw new q('too many');
    this.fb = [
    ];
    for (var c = 0; c < b;) {
      ++c;
      this.fb.push(a.M())
    }
  },
  f: ka
};

function Yb() {
  function a(a) {
    return new wa(a, e, function (a) {
      if (null == a) return null;
      try {
        return T.Hh(a)
      } catch (k) {
        return null
      }
    }, function (a) {
      if (null == a) return null;
      try {
        return a.se()
      } catch (k) {
        return null
      }
    })
  }
  function b(a) {
    return new wa(a, e, function (a) {
      return null != a ? '0' != a : !0
    }, function (a) {
      return a ? '1' : '0'
    })
  }
  function c(a, b) {
    return new wa(a, e, function (a) {
      var c = b;
      try {
        null != a && (c = K.parseInt(a))
      } catch (t) {
      }
      return c
    }, function (a) {
      return '' + a
    })
  }
  function d(a, b, c) {
    return new wa(a, e, function (a) {
      return null == a ? b : U.Qc(a, c)
    }, function (a) {
      return a
    })
  }
  var e = Xb.Pm();
  this.fe = d('player_name', '', 25);
  this.Tb = c('view_mode', - 1);
  this.Fh = c('fps_limit', 0);
  this.sh = d('avatar', null, 2);
  d('rctoken', null, 1024);
  this.xm = b('team_colors');
  this.Ak = b('show_indicators');
  this.pm = b('sound_main');
  this.Hi = b('sound_chat');
  this.om = b('sound_highlight');
  this.nm = b('sound_crowd');
  this.Gj = d('player_auth_key', null, 1024);
  this.rd = c('extrapolation', 0);
  this.Sl = function (a, b) {
    return new wa(a, e, function (a) {
      var c = b;
      try {
        null != a && (c = parseFloat(a))
      } catch (t) {
      }
      return c
    }, function (a) {
      return '' + a
    })
  }('resolution_scale', 1);
  this.lm = b('show_avatars');
  this.Me = a('geo');
  this.Ne = a('geo_override');
  this.tg = function () {
    return new wa('player_keys', e, function (a) {
      if (null == a) return W.$j();
      try {
        return W.Hh(a)
      } catch (g) {
        return W.$j()
      }
    }, function (a) {
      try {
        return a.se()
      } catch (g) {
        return null
      }
    })
  }()
}

function W() {
  this.Yc = new Map
}

W.Hh = function (a) {
  return W.Rf(JSON.parse(a))
};
W.$j = function () {
  var a = new W;
  a.Pa('ArrowUp', 'Up');
  a.Pa('KeyW', 'Up');
  a.Pa('ArrowDown', 'Down');
  a.Pa('KeyS', 'Down');
  a.Pa('ArrowLeft', 'Left');
  a.Pa('KeyA', 'Left');
  a.Pa('ArrowRight', 'Right');
  a.Pa('KeyD', 'Right');
  a.Pa('KeyX', 'Kick');
  a.Pa('Space', 'Kick');
  a.Pa('ControlLeft', 'Kick');
  a.Pa('ControlRight', 'Kick');
  a.Pa('ShiftLeft', 'Kick');
  a.Pa('ShiftRight', 'Kick');
  a.Pa('Numpad0', 'Kick');
  return a
};

W.prototype = {
  Pa: function (a, b) {
    this.Yc.set(a, b)
  },
  L: function (a) {
    return this.Yc.get(a)
  },
  Jq: function (a) {
    this.Yc['delete'](a)
  },
  Eo: function (a) {
    for (var b = [
    ], c = this.Yc.keys(), d = c.next(); !d.done;) {
      var e = d.value,
        d = c.next();
      this.Yc.get(e) == a && b.push(e)
    }
    return b
  },
  se: function () {
    for (var a = {
    }, b = this.Yc.keys(), c = b.next(); !c.done;) {
      var d = c.value,
        c = b.next();
      a[d] = this.Yc.get(d)
    }
    return JSON.stringify(a)
  },
  f: W
};

function Xb() { }

Xb.Pm = function () {
  try {
    var a = window.localStorage;
    a.getItem('');
    if (0 == a.length) {
      var b = '_hx_' + Math.random();
      a.setItem(b, b);
      a.removeItem(b)
    }
    return a
  } catch (c) {
    return null
  }
};

function U() { }

U.Qc = function (a, b) {
  return a.length <= b ? a : D.substr(a, 0, b)
};

function K() {

}
K.ye = function (a) {
  return r.Be(a, '')
};

K.parseInt = function (a) {
  a = parseInt(a, !a || '0' != a[0] || 'x' != a[1] && 'X' != a[1] ? 10 : 16);
  return isNaN(a) ? null : a
};

function wa(a, b, c, d) {
  this.w = a;
  this.Ur = d;
  this.Yh = b;
  d = null;
  null != b && (d = b.getItem(a));
  this.Hm = c(d)
}

wa.prototype = {
  L: function () {
    return this.Hm
  },
  Xa: function (a) {
    this.Hm = a;
    if (null != this.Yh) try {
      var b = this.Ur(a);
      null == b ? this.Yh.removeItem(this.w) : this.Yh.setItem(this.w, b)
    } catch (c) {
    }
  },
  f: wa
};

Yb.prototype = {
  Lh: function () {
    return null != this.Ne.L() ? this.Ne.L() : null != this.Me.L() ? this.Me.L() : new T
  },
  f: Yb
};

m.Qm = new Map;
m.yf = 0;
function mc() {
}
n.A = new Yb;

u.qp = function () {
  mc.ts();
  x.fj(function () {
    u.jk(u.xq)
  });
  u.hp()
};

mc.b = !0;
mc.ts = function () {
  var a = window;
  a.RTCPeerConnection = a.webkitRTCPeerConnection || a.mozRTCPeerConnection || a.RTCPeerConnection;
  a.RTCIceCandidate = a.webkitRTCIceCandidate || a.mozRTCIceCandidate || a.RTCIceCandidate;
  a.RTCSessionDescription = a.webkitRTCSessionDescription || a.mozRTCSessionDescription || a.RTCSessionDescription;
  var b = new RTCPeerConnection({
    iceServers: [
    ]
  });
  try {
    b.createAnswer()['catch'](function () {
    })
  } catch (e) {
    var a = a.RTCPeerConnection.prototype,
      c = a.createOffer,
      d = a.createAnswer;
    a.createOffer = function (a) {
      var b = this;
      return new Promise(function (d, e) {
        c.call(b, d, e, a)
      })
    };
    a.createAnswer = function (a) {
      var b = this;
      return new Promise(function (c, e) {
        d.call(b, c, e, a)
      })
    }
  }
};

u.xq = function () {
  console.log('?')
  var a = Hb.L(),
    b = a.get('c'),
    c = a.get('p');
  a.get('v');
  console.log('hello')
  null != b ? null != c ? u.Dh(b) : u.Pf(b) : u.xb()
};

u.jk = function (a) {
  var b = new kb(n.A.fe.L());
  console.log('jestem')
  b.cl = function (b) {
    n.A.fe.Xa(b);
    n.Na.Tl();
    a()
  };
  x.La(b.g);
  b.Cb.focus()
};

u.hp = function () {
  var a = n.A.Gj.L();
  if (null == a) I.yo().then(function (a) {
    u.Je = a;
    n.A.Gj.Xa(a.Ir())
  })['catch'](function () {
    return {
    }
  });
  else I.xo(a).then(function (a) {
    return u.Je = a
  })['catch'](function () {
    return {
    }
  })
};

var I = {};

I.xo = function (a) {
  a = a.split('.');
  if (4 != a.length || 'idkey' != a[0]) return Promise.reject('Invalid id format');
  var b = a[1],
    c = a[2],
    d = a[3];
  return I.Xr(b, c, d).then(function (a) {
    var e = new I;
    e.Yi = b;
    e.Zi = c;
    e.Zj = d;
    e.Al = a;
    return e
  })
};

I.Xr = function (a, b, c) {
  try {
    return window.crypto.subtle.importKey('jwk', {
      crv: 'P-256',
      ext: !0,
      key_ops: [
        'sign'
      ],
      kty: 'EC',
      d: c,
      x: a,
      y: b
    }, I.qh, !0, [
      'sign'
    ])
  } catch (d) {
    return Promise.reject(d instanceof q ? d.Ta : d)
  }
};

I.yo = function () {
  try {
    return window.crypto.subtle.generateKey(I.qh, !0, [
      'sign',
      'verify'
    ]).then(function (a) {
      var b = a.privateKey;
      return window.crypto.subtle.exportKey('jwk', b).then(function (a) {
        var c = a.y,
          e = a.d,
          f = new I;
        f.Yi = a.x;
        f.Zi = c;
        f.Zj = e;
        f.Al = b;
        return f
      })
    })
  } catch (a) {
    return Promise.reject(a instanceof q ? a.Ta : a)
  }
};

x.es = function (a) {
  for (var b = Modernizr, c = 'canvas datachannel dataview es6collections peerconnection promises websockets'.split(' '), d = [
  ], e = 0; e < c.length;) {
    var f = c[e];
    ++e;
    b[f] || d.push(f)
  }
  0 != d.length ? (window.document.body.innerHTML = '', x.Pg = window.document.createElement('div'), window.document.body.appendChild(x.Pg), a = new Wa(d), x.La(a.g)) : a()
};

function Wa(a) {
  this.g = v.Ga(Wa.N);
  v.Ea(this.g).get('features').textContent = a.join(', ')
}

Wa.prototype = {
  f: Wa
};

x.fj = function (a) {
  x.ks() && x.es(function () {
    kc.fj();
    var b;
    null == n.A.Me.L() ? T.Fo().then(function (a) {
      n.A.Me.Xa(a)
    }, function () {
      return {
      }
    }) : b = Promise.resolve(null);
    return Promise.all([M.L('https://haxball-replay-analyzer.github.io/pliki/res.dat', 'arraybuffer').then(function (a) {
      a = new window.JSZip(a);
      n.Na = new Ub(a);
      return Promise.all([n.Na.ro,
      x.Wg(a.file('images/grass.png').asArrayBuffer()).then(function (a) {
        return n.Ko = a
      }),
      x.Wg(a.file('images/concrete.png').asArrayBuffer()).then(function (a) {
        return n.Vn = a
      }),
      x.Wg(a.file('images/concrete2.png').asArrayBuffer()).then(function (a) {
        return n.Tn = a
      }),
      x.Wg(a.file('images/typing.png').asArrayBuffer()).then(function (a) {
        return n.Dm = a
      })])
    }),
      b]).then(function () {
        x.us(a)
      })
  })
};

x.ks = function () {
  try {
    // return window.self != window.top
    return true // CHECKPOINT overwriting it for my purposes
  } catch (a) {
    return !0
  }
};

function Ub(a) {
  function b(b) {
    return new Promise(function (d, f) {
      var e = a.file(b).asArrayBuffer();
      return c.c.decodeAudioData(e, d, f)
    })
  }
  var c = this;
  this.c = new AudioContext;
  this.ag = this.c.createGain();
  this.im(n.A.pm.L() ? 1 : 0);
  this.ag.connect(this.c.destination);
  this.ro = Promise.all([b('sounds/chat.ogg').then(function (a) {
    //onsole.log(playSounds);
    //if (playSounds==false) return false;
    return c.Rj = a
  }),
  b('sounds/highlight.wav').then(function (a) {
    return c.zk = a
  }),
  b('sounds/kick.ogg').then(function (a) {
    return c.bp = a
  }),
  b('sounds/goal.ogg').then(function (a) {
    return c.Io = a
  }),
  b('sounds/join.ogg').then(function (a) {
    return c.$o = a
  }),
  b('sounds/leave.ogg').then(function (a) {
    return c.ep = a
  }),
  b('sounds/crowd.ogg').then(function (a) {
    c.ho = a;
    c.Xj = new Tb(c.ho, c.c);
    c.Xj.connect(c.ag)
  })])
}

function Tb(a, b) {
  this.gh = null;
  this.Js = 0.025;
  this.ve = this.dh = this.Ef = 0;
  this.Tg = b.createGain();
  this.Tg.gain.value = 0;
  var c = b.createBufferSource();
  c.buffer = a;
  c.connect(this.Tg);
  c.loop = !0;
  c.start()
}

Tb.prototype = {
  update: function () {
    var a = window.performance.now(),
      b = a - this.Um;
    this.Um = a;
    this.ve += (this.dh - this.ve) * this.Js;
    this.Ef -= b;
    0 >= this.Ef && (this.Ef = this.dh = 0);
    if (0 >= this.dh && 0.05 > this.ve) {
      window.clearInterval(this.gh);
      this.gh = null;
      this.ve = 0;
    }
    this.Tg.gain.value = n.A.nm.L() ? this.ve : 0
  },
  qj: function (a) {
    var b = this;
    this.dh = a;
    this.Ef = 166.66666666666666;
    if (null == this.gh) {
      this.gh = window.setInterval(function () {
        b.update()
      }, 17);
      this.Um = window.performance.now()
    }
  },
  connect: function (a) {
    this.Tg.connect(a)
  },
  Ls: function (a) {
    var b = a.K;
    if (null != b) if (2 == b.Bb) 0 >= b.Oa && this.qj(1);
    else if (1 == b.Bb) {
      var c = b.ta.F[0],
        d = null,
        e = null,
        f = null,
        g = 0,
        k = null,
        l = null,
        t = null,
        h = 0,
        m = p.fa.Ch,
        n = 0;
      for (a = a.I; n < a.length;) {
        var q = a[n];
        ++n;
        if (null != q.H) {
          var r = q.H.a,
            v = c.a,
            u = r.x - v.x,
            r = r.y - v.y,
            u = u * u + r * r;
          if (q.ea == p.fa) {
            if (null == d || d.a.x * m < q.H.a.x * m) d = q.H;
            if (null == e || e.a.x * m > q.H.a.x * m) e = q.H;
            if (null == f || u < g) {
              f = q.H;
              g = u
            }
          } else if (q.ea == p.xa) {
            if (null == k || k.a.x * m < q.H.a.x * m) k = q.H;
            if (null == l || l.a.x * m > q.H.a.x * m) l = q.H;
            if (null == t || u < h) {
              t = q.H;
              h = u
            }
          }
        }
      }
      if (null != l && null != e && 0 >= b.Oa) {
        f.a.x > l.a.x && c.a.x > l.a.x && 20 < c.a.x && this.qj(0.3);
        t.a.x < e.a.x && c.a.x < e.a.x && - 20 > c.a.x && this.qj(0.3)
      }
    }
  },
  f: Tb
};

Ub.prototype = {
  Tl: function () {
    this.c.resume()
  },
  cd: function (a) {
    var b = this.c.createBufferSource();
    b.buffer = a;
    b.connect(this.ag);
    if (playSounds) b.start()
  },
  im: function (a) {
    this.ag.gain.value = a
  },
  f: Ub
};

var T = {};

T.Fo = function () {
  return M.tk(/*n.Ee + 'api/geo'*/"https://haxball-replay-analyzer.github.io/pliki/geo.json").then(function (a) {
    return T.Rf(a)
  })
  //return false;
};

var M = {};

M.tk = function (a) {
  return M.L(a, 'json').then(function (a) {
    var b = a.error;
    if (null != b) throw new q(b);
    return a.data
  })
};

kc.fj = function () {
  m.Ha(rb);
  m.Ha(na);
  m.Ha(Ua);
  m.Ha(Ga);
  m.Ha(Na);
  m.Ha(oa);
  m.Ha(Y);
  m.Ha(Ma);
  m.Ha(La);
  m.Ha(Oa);
  m.Ha(da);
  m.Ha(qa);
  m.Ha(S);
  m.Ha(pa);
  m.Ha(sa);
  m.Ha(Qa);
  m.Ha(ta);
  m.Ha(la);
  m.Ha(ra);
  m.Ha(Pa);
  m.Ha(pb);
  m.Ha(ma);
  m.Ha(qb);
  m.Ha(ob)
};

function la() {
  this.da = 0
}
la.ma = m;
la.prototype = C(m.prototype, {
  apply: function (a) {
    if (0 == this.P) {
      a = a.I;
      for (var b = 0, c = a.length; b < c;) {
        var d = b++;
        if (d >= this.we.length) break;
        a[d].yb = this.we[d]
      }
    }
  },
  ua: function (a) {
    a.lb(this.we.length);
    for (var b = 0, c = this.we; b < c.length;) a.lb(c[b++])
  },
  va: function (a) {
    this.we = [
    ];
    for (var b = a.Ab(), c = 0; c < b;) ++c,
      this.we.push(a.Ab())
  },
  f: la
});
function La() {
  this.da = 0
}
function Ma() {
  this.da = 0
}
function Ua() {
  this.da = 0
}
Ua.za = m.Fa({
  Ba: !1,
  Aa: !1
});
function ma() {
  this.da = 0
}
function ob() {
  this.da = 0
}
function pb() {
  this.da = 0
}
function Y() {
  this.Qg = !1;
  this.da = 0
}
function kc() {
}
function na() {
  this.da = 0
}
function Ga() {
  this.da = 0
}
function Na() {
  this.da = 0
}
function Oa() {
  this.da = 0
}
function qb() {
  this.da = 0
}
function oa() {
  this.da = 0
}
function pa() {
  this.da = 0
}
function Pa() {
  this.da = 0
}
function qa() {
  this.da = 0
}
function S() {
  this.da = 0
}
function ra() {
  this.da = 0
}
function sa() {
  this.da = 0
}
function da() {
  this.da = 0
}
function Qa() {
  this.da = 0
}
function rb() {
  this.da = 0
}
rb.b = !0;
rb.ma = m;
rb.prototype = C(m.prototype, {
  apply: function (a) {
    0 == this.P && vb.i(a.Vl, this.Tc, this.color, this.style, this.fn)
  },
  ua: function (a) {
    a.mc(U.Qc(this.Tc, 1000));
    a.O(this.color);
    a.l(this.style);
    a.l(this.fn)
  },
  va: function (a) {
    this.Tc = a.ic();
    if (1000 < this.Tc.length) throw new q('message too long');
    this.color = a.M();
    this.style = a.B();
    this.fn = a.B()
  },
  f: rb
});
function ta() {
  this.da = 0
}
ta.za = m.Fa({
  Ba: !1,
  Aa: !1
});
rb.za = m.Fa({
  Ba: !1,
  Aa: !1,
  oj: {
    $i: 10,
    uj: 900
  }
});
Qa.za = m.Fa({
  Ba: !1,
  Aa: !1
});
da.za = m.Fa({
  Ba: !1,
  Aa: !1
});
sa.za = m.Fa({
  Ba: !1,
  Aa: !1
});
ra.za = m.Fa({
  Ba: !1,
  Aa: !1
});
S.za = m.Fa({
  Ba: !1,
  Aa: !1
});
qa.za = m.Fa({
  Ba: !1,
  Aa: !1,
  oj: {
    $i: 10,
    uj: 2000
  }
});
Pa.za = m.Fa({
  Ba: !1,
  Aa: !1
});
pa.za = m.Fa({
  Ba: !1,
  Aa: !1
});
oa.za = m.Fa({
  Ba: !1,
  Aa: !1
});
qb.za = m.Fa({
  Ba: !1,
  Aa: !1
});
Oa.za = m.Fa({
});
Na.za = m.Fa({
  Ba: !1,
  Aa: !1,
  oj: {
    $i: 10,
    uj: 900
  }
});
Ga.za = m.Fa({
});
na.za = m.Fa({
  Ba: !1,
  Aa: !1
});
Y.za = m.Fa({
  Ba: !1,
  Aa: !1
});
pb.za = m.Fa({
  Ba: !1,
  Aa: !1
});
ob.za = m.Fa({
  Ba: !1,
  Aa: !1
});
ma.za = m.Fa({
  Ba: !1,
  Aa: !1
});
Ma.za = m.Fa({
  Ba: !1,
  Aa: !1
});
La.za = m.Fa({
  Ba: !1,
  Aa: !1
});
la.za = m.Fa({
  Ba: !1,
  Aa: !1
});

M.Pl = function (a, b, c, d, e) {
  return new Promise(function (f, g) {
    var k = new XMLHttpRequest;
    k.open(b, a);
    k.responseType = c;
    k.onload = function () {
      200 <= k.status && 300 > k.status ? null != k.response ? f(k.response) :
        g(null) : g('status: ' + k.status)
    };
    k.onerror = function (a) {
      g(a)
    };
    null != e && k.setRequestHeader('Content-type', e);
    k.send(d)
  })
};
M.L = function (a, b) {
  return M.Pl(a, 'GET', b, null)
};

x.Wg = function (a) {
  return new Promise(function (b, c) {
    var d = window.document.createElement('img');
    d.onload = function () {
      URL.revokeObjectURL(d.src);
      d.onload = null;
      b(d)
    };
    d.onerror = function () {
      URL.revokeObjectURL(d.src);
      c(null)
    };
    return d.src = URL.createObjectURL(new Blob([a], {
      type: 'image/png'
    }))
  })
};

x.us = function (a) {
  // CHECKPOINT kompletnie nie wiem czemu to ma usuwać całą stronę i tworzyć diva
  return;
  window.document.body.innerHTML = '';
  x.Pg = window.document.createElement('div');
  window.document.body.appendChild(x.Pg);
  var b = null,
    b = function () {
      n.Na.Tl();
      window.document.removeEventListener('click', b, !0)
    };
  window.document.addEventListener('click', b, !0);
  a()
};

function kb(a) {
  a = "Dupa";
  //console.log("dupunia");
  function b() {
    c.Dc() && null != c.cl && c.cl(c.Cb.value);
    //console.log("wcis",c);
    //document.getElementById("button_ok").click();
  }
  var c = this;
  this.g = v.Ga(kb.N);
  var d = v.Ea(this.g);
  // CHECKPOINT tu komentuję bo niepotrzebny kod
  // this.Cb = d.get('input');
  // this.af = d.get('ok');
  // this.Cb.maxLength = 25;
  // this.Cb.value = a;
  //console.log(a,b,c,d);
  //this.Cb.oninput = function () {
  c.C()
  //};
  // this.Cb.onkeydown = function (a) {
  //   13 == a.keyCode && b()
  // };
  // this.af.onclick = b;
  this.C();
}

kb.b = !0;
kb.prototype = {
  Dc: function () {
    var a = this.Cb.value;
    return 25 >= a.length ? 0 < a.length : !1
  },
  C: function () {
    //this.af.disabled = !this.Dc()
  },
  f: kb
};

function p(a, b, c, d, e, f, g, k) {
  this.pg = null;
  this.$ = a;
  this.R = b;
  this.Ch = c;
  this.cp = d;
  this.w = e;
  this.io = f;
  this.v = k;
  this.wm = new ka;
  this.wm.fb.push(b)
}

p.b = !0;
p.prototype = {
  f: p
};

p.Ia = new p(0, 16777215, 0, - 1, 'Spectators', 't-spec', 0, 0);
p.fa = new p(1, 15035990, - 1, 8, 'Red', 't-red', 0, 2);
p.xa = new p(2, 5671397, 1, 16, 'Blue', 't-blue', 0, 4);
p.Ia.pg = p.Ia;
p.fa.pg = p.xa;
p.xa.pg = p.fa;

function Ba() {

};
Ba.cg = function (a) {
  return new PerfectScrollbar(a, {
    handlers: Ba.Uo
  })
};

Y.b = !0; Y.la = function (a, b, c) {
  var d = new Y;
  d.V = a;
  d.fd = b;
  d.Qg = c;
  return d
}; Y.ma = m; Y.prototype = C(m.prototype, {
  apply: function (a) {
    if (0 != this.V && a.Lb(this.P, 128)) {
      var b = a.na(this.V);
      if (null != b) {
        var c = a.na(this.P);
        D.remove(a.I, b);
        null != a.K && D.remove(a.K.ta.F, b.H);
        vb.i(a.ul, b, this.fd, this.Qg, c)
      }
    }
  },
  ua: function (a) {
    null != this.fd && (this.fd = U.Qc(this.fd, 100));
    a.O(this.V);
    a.Db(this.fd);
    a.l(this.Qg ? 1 : 0)
  },
  va: function (a) {
    this.V = a.M();
    this.fd = a.zb();
    this.Qg = 0 != a.B();
    if (null != this.fd && 100 < this.fd.length) throw new q('string too long');
  },
  f: Y
}); pb.b = !0; pb.ma = m; pb.prototype = C(m.prototype, {
  apply: function (a) {
    if (0 == this.P) {
      for (var b = new Map, c = 0, d = a.I; c < d.length;) {
        var e = d[c];
        ++c;
        b.set(e.V, e)
      }
      c = [
      ];
      d = 0;
      for (e = this.Zg; d < e.length;) {
        var f = e[d];
        ++d;
        var g = b.get(f);
        null != g && (b['delete'](f), c.push(g))
      }
      d = [
      ];
      b = b.values();
      for (e = b.next(); !e.done;) f = e.value,
        e = b.next(),
        d.push(f);
      a.I = this.Zm ? c.concat(d) : d.concat(c)
    }
  },
  ua: function (a) {
    a.l(this.Zm ? 1 : 0);
    a.l(this.Zg.length);
    for (var b = 0, c = this.Zg; b < c.length;) a.O(c[b++])
  },
  va: function (a) {
    this.Zm = 0 != a.B();
    var b = a.B();
    this.Zg = [
    ];
    for (var c = 0; c < b;) ++c,
      this.Zg.push(a.M())
  },
  f: pb
}); ob.b = !0; ob.ma = m; ob.prototype = C(m.prototype, {
  apply: function (a) {
    if (0 == this.P) {
      var b = a.K;
      if (null != b) {
        if (this.Sm) {
          a = a.na(this.ze);
          if (null == a) return;
          a = a.H
        } else a = b.ta.F[this.ze];
        null != a && (null != this.Ka[0] && (a.a.x = this.Ka[0]), null != this.Ka[1] && (a.a.y = this.Ka[1]), null != this.Ka[2] && (a.D.x = this.Ka[2]), null != this.Ka[3] && (a.D.y = this.Ka[3]), null != this.Ka[4] && (a.oa.x = this.Ka[4]), null != this.Ka[5] && (a.oa.y = this.Ka[5]), null != this.Ka[6] && (a.Z = this.Ka[6]), null != this.Ka[7] && (a.m = this.Ka[7]), null != this.Ka[8] && (a.aa = this.Ka[8]), null != this.Ka[9] && (a.Ca = this.Ka[9]), null != this.Rc[0] && (a.R = this.Rc[0]), null != this.Rc[1] && (a.h = this.Rc[1]), null != this.Rc[2] && (a.v = this.Rc[2]))
      }
    }
  },
  ua: function (a) {
    a.O(this.ze);
    a.l(this.Sm ? 1 : 0);
    var b = a.a;
    a.Ub(0);
    for (var c = 0, d = 1, e = 0, f = this.Ka; e < f.length;) {
      var g = f[e];
      ++e;
      null != g && (c |= d, a.Wi(g));
      d <<= 1
    }
    e = 0;
    for (f = this.Rc; e < f.length;) g = f[e],
      ++e,
      null != g && (c |= d, a.O(g)),
      d <<= 1;
    d = a.a;
    a.a = b;
    a.Ub(c);
    a.a = d
  },
  va: function (a) {
    this.ze = a.M();
    this.Sm = 0 != a.B();
    var b = a.Ob();
    this.Ka = [
    ];
    for (var c = 0; 10 > c;) {
      var d = c++;
      this.Ka[d] = null;
      0 != (b & 1) && (this.Ka[d] = a.mi());
      b >>>= 1
    }
    this.Rc = [
    ];
    for (c = 0; 3 > c;) d = c++,
      this.Rc[d] = null,
      0 != (b & 1) && (this.Rc[d] = a.M()),
      b >>>= 1
  },
  f: ob
}); ma.b = !0; ma.la = function (a, b, c) {
  var d = new ma;
  d.min = a;
  d.nj = b;
  d.aj = c;
  return d
}; ma.ma = m; ma.prototype = C(m.prototype, {
  apply: function (a) {
    a.Lb(this.P, 2) && a.mr(a.na(this.P), this.min, this.nj, this.aj)
  },
  ua: function (a) {
    a.O(this.min);
    a.O(this.nj);
    a.O(this.aj)
  },
  va: function (a) {
    this.min = a.M();
    this.nj = a.M();
    this.aj = a.M()
  },
  f: ma
}); Ma.b = !0; Ma.ma = m; Ma.prototype = C(m.prototype, {
  apply: function (a) {
    a.Lb(this.P, 32) && a.yr(a.na(this.P), 0)
  },
  ua: function () {
  },
  va: function () {
  },
  f: Ma
}); La.b = !0; La.ma = m; La.prototype = C(m.prototype, {
  apply: function (a) {
    if (a.Lb(this.P, 32)) {
      var b = a.na(this.P);
      if (null != a.K) {
        a.K = null;
        for (var c = 0, d = a.I; c < d.length;) {
          var e = d[c];
          ++c;
          e.H = null;
          e.Jb = 0
        }
        null != a.vf && a.vf(b)
      }
    }
  },
  ua: function () {
  },
  va: function () {
  },
  f: La
}); la.b = !0; la.la = function (a) {
  for (var b = new la, c = a.T.I, d = [
  ], e = 0; e < c.length;) {
    var f = a.Ie.get(c[e++].V);
    d.push(null == f ? 0 : f.yb)
  }
  b.we = d;
  return b
};

ta.b = !0;
ta.la = function (a) {
  var b = new ta;
  b.Yg = a;
  return b
};
ta.ma = m;
ta.prototype = C(m.prototype, {
  apply: function (a) {
    var b = a.na(this.P);
    null != b && this.Yg != b.Ld && (b.Ld = this.Yg, y.i(a.sl, b))
  },
  ua: function (a) {
    a.l(this.Yg ? 1 : 0)
  },
  va: function (a) {
    this.Yg = 0 != a.B()
  },
  f: ta
});
rb.b = !0;
rb.ma = m;
rb.prototype = C(m.prototype, {
  apply: function (a) {
    0 == this.P && vb.i(a.Vl, this.Tc, this.color, this.style, this.fn)
  },
  ua: function (a) {
    a.mc(U.Qc(this.Tc, 1000));
    a.O(this.color);
    a.l(this.style);
    a.l(this.fn)
  },
  va: function (a) {
    this.Tc = a.ic();
    if (1000 < this.Tc.length) throw new q('message too long');
    this.color = a.M();
    this.style = a.B();
    this.fn = a.B()
  },
  f: rb
});
Qa.b = !0;
Qa.ma = m;
Qa.prototype = C(m.prototype, {
  apply: function (a) {
    if (a.Lb(this.P, 1)) {
      for (var b = a.na(this.P), c = a.I, d = [
      ], e = 0, f = 0, g = 0; g < c.length;) {
        var k = c[g];
        ++g;
        k.ea == p.Ia && d.push(k);
        k.ea == p.fa ? ++e : k.ea == p.xa && ++f
      }
      c = d.length;
      0 != c && (f == e ? 2 > c || (a.Mf(b, d[0], p.fa), a.Mf(b, d[1], p.xa)) : a.Mf(b, d[0], f > e ? p.fa : p.xa))
    }
  },
  ua: function () {
  },
  va: function () {
  },
  f: Qa
});
da.b = !0;
da.la = function (a, b) {
  var c = new da;
  c.rj = a;
  c.newValue = b;
  return c
};
da.ma = m;
da.prototype = C(m.prototype, {
  apply: function (a) {
    if (a.Lb(this.P, 2) && null == a.K) switch (this.rj) {
      case 0:
        var b = this.newValue;
        a.ib = 0 > b ? 0 : 99 < b ? 99 : b;
        break;
      case 1:
        b = this.newValue,
          a.Da = 0 > b ? 0 : 99 < b ? 99 : b
    }
  },
  ua: function (a) {
    a.O(this.rj);
    a.O(this.newValue)
  },
  va: function (a) {
    this.rj = a.M();
    this.newValue = a.M()
  },
  f: da
}); sa.b = !0; sa.la = function (a, b) {
  var c = new sa;
  c.Md = a;
  c.Xg = b;
  return c
}; sa.ma = m; sa.prototype = C(m.prototype, {
  apply: function (a) {
    if (a.Lb(this.P, 4)) {
      var b = a.na(this.P),
        c = a.na(this.Md);
      null != c && 0 != c.V && c.cb != this.Xg && (c.cb = this.Xg, null != a.ii && a.ii(b, c))
    }
  },
  ua: function (a) {
    a.O(this.Md);
    a.l(this.Xg ? 1 : 0)
  },
  va: function (a) {
    this.Md = a.M();
    this.Xg = 0 != a.B()
  },
  f: sa
}); ra.b = !0; ra.la = function (a) {
  var b = new ra;
  b.Zb = a;
  return b
}; ra.ma = m; ra.prototype = C(m.prototype, {
  apply: function (a) {
    a = a.na(this.P);
    null != a && (a.Xb = this.Zb)
  },
  ua: function (a) {
    a.Db(this.Zb)
  },
  va: function (a) {
    this.Zb = a.zb();
    null != this.Zb && (this.Zb = U.Qc(this.Zb, 2))
  },
  f: ra
}); S.b = !0; S.la = function (a, b) {
  var c = new S;
  c.Md = a;
  c.jj = b;
  return c
}; S.ma = m; S.prototype = C(m.prototype, {
  apply: function (a) {
    var b = a.na(this.Md);
    if (null != b) {
      var c = a.na(this.P),
        d = a.Lb(this.P, 1);
      (d = d || b == c && !a.Pc && null == a.K) && a.Mf(c, b, this.jj)
    }
  },
  ua: function (a) {
    a.O(this.Md);
    a.l(this.jj.$)
  },
  va: function (a) {
    this.Md = a.M();
    a = a.lf();
    this.jj = 1 == a ? p.fa : 2 == a ? p.xa : p.Ia
  },
  f: S
}); qa.b = !0; qa.la = function (a) {
  var b = new qa;
  b.Pd = a;
  return b
}; qa.ma = m; qa.prototype = C(m.prototype, {
  apply: function (a) {
    if (a.Lb(this.P, 8)) {
      var b = a.na(this.P);
      //console.log("chyba ladowanie stadionu",a,b);
      null == a.K && (a.S = this.Pd, null != a.Ii && a.Ii(b, this.Pd))
    }
  },
  ua: function (a) {
    var b = w.ha();
    this.Pd.ga(b);
    b = pako.deflateRaw(b.Sb());
    a.Ub(b.byteLength);
    a.Vb(b)
  },
  va: function (a) {
    a = pako.inflateRaw(a.sb(a.Ob()));
    this.Pd = h.ja(new F(new DataView(a.buffer, a.byteOffset, a.byteLength)))
  },
  f: qa
}); Pa.b = !0; Pa.ma = m; Pa.prototype = C(m.prototype, {
  apply: function (a) {
    a.Lb(this.P, 2) && this.ea != p.Ia && (a.kb[this.ea.$] = this.Sg)
  },
  ua: function (a) {
    a.l(this.ea.$);
    this.Sg.ga(a)
  },
  va: function (a) {
    var b = a.lf();
    this.ea = 1 == b ? p.fa : 2 == b ? p.xa : p.Ia;
    this.Sg = new ka;
    this.Sg.ja(a)
  },
  f: Pa
}); pa.b = !0; pa.la = function (a) {
  var b = new pa;
  b.newValue = a;
  return b
}; pa.ma = m; pa.prototype = C(m.prototype, {
  apply: function (a) {
    a.Lb(this.P, 2) && (a.Pc = this.newValue)
  },
  ua: function (a) {
    a.l(this.newValue ?
      1 : 0)
  },
  va: function (a) {
    this.newValue = 0 != a.B()
  },
  f: pa
}); oa.b = !0; oa.la = function (a, b, c, d) {
  var e = new oa;
  e.V = a;
  e.name = b;
  e.cj = c;
  e.Xb = d;
  return e
}; oa.ma = m; oa.prototype = C(m.prototype, {
  apply: function (a) {
    if (0 == this.P) {
      var b = new ea;
      b.V = this.V;
      b.w = this.name;
      b.Kd = this.cj;
      b.Xb = this.Xb;
      a.I.push(b);
      a = a.tl;
      null != a && a(b)
    }
  },
  ua: function (a) {
    a.O(this.V);
    a.Db(this.name);
    a.Db(this.cj);
    a.Db(this.Xb)
  },
  va: function (a) {
    this.V = a.M();
    this.name = a.zb();
    this.cj = a.zb();
    this.Xb = a.zb()
  },
  f: oa
}); qb.b = !0; qb.ma = m; qb.prototype = C(m.prototype, {
  apply: function (a) {
    a = a.na(this.ze);
    null != a && 0 == this.P && (a.Jd = this.Zb)
  },
  ua: function (a) {
    a.Db(this.Zb);
    a.O(this.ze)
  },
  va: function (a) {
    this.Zb = a.zb();
    this.ze = a.M();
    null != this.Zb && (this.Zb = U.Qc(this.Zb, 2))
  },
  f: qb
}); Oa.b = !0; Oa.ma = m; Oa.prototype = C(m.prototype, {
  apply: function (a) {
    var b = a.K;
    if (null != b && a.Lb(this.P, 16)) {
      var c = a.na(this.P),
        d = 120 == b.Oa,
        e = 0 < b.Oa;
      this.Bf ? b.Oa = 120 : 120 == b.Oa && (b.Oa = 119);
      d != this.Bf && Cb.i(a.ml, c, this.Bf, e)
    }
  },
  ua: function (a) {
    a.l(this.Bf ? 1 : 0)
  },
  va: function (a) {
    this.Bf = 0 != a.B()
  },
  f: Oa
}); Na.b = !0; Na.ma = m; Na.prototype = C(m.prototype, {
  $m: function (a) {
    if (null != a.hq) {
      var b = a.na(this.P);
      return null == b ? !1 : a.hq(b, this.Tc)
    }
    return !0
  },
  apply: function (a) {
    var b = a.na(this.P);
    null != b && ia.i(a.rl, b, this.Tc)
  },
  ua: function (a) {
    a.mc(U.Qc(this.Tc, 140))
  },
  va: function (a) {
    this.Tc = a.ic();
    if (140 < this.Tc.length) throw new q('message too long');
  },
  f: Na
}); Ga.b = !0; Ga.ma = m; Ga.prototype = C(m.prototype, {
  apply: function (a) {
    var b = a.na(this.P);
    if (null != b) {
      var c = this.input;
      0 == (b.ob & 16) && 0 != (c & 16) && (b.Wb = !0);
      b.ob = c;
      null != a.iq && a.iq(b)
    }
  },
  ua: function (a) {
    a.tb(this.input)
  },
  va: function (a) {
    this.input = a.hb()
  },
  f: Ga
}); na.b = !0; na.la = function (a) {
  var b = new na;
  b.sj = a;
  return b
}; na.ma = m; na.prototype = C(m.prototype, {
  apply: function (a) {
    var b = a.na(this.P);
    null != b && ia.i(a.wl, b, this.sj)
  },
  ua: function (a) {
    a.l(this.sj)
  },
  va: function (a) {
    this.sj = a.B()
  },
  f: na
});

O.Yk = function () {
  for (var a = [
  ], b = 0; 256 > b;) ++b,
    a.push(new H(0, 0));
  return a
}(this);
O.dk = function () {
  for (var a = [
  ], b = 0; 256 > b;) ++b,
    a.push(0);
  return a
}(this);

function ia() {
}
ia.b = !0;
ia.i = function (a, b, c) {
  null != a && a(b, c)
};

// mb.N = '<div class=\'dialog change-location-view\'><h1>Change Location</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'change\'>Change</button><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
Da.N = '<div class=\'chatbox-view\'><div data-hook=\'log\' class=\'log\'><p>Controls:<br/>Move: WASD or Arrows<br/>Kick: X, Space, Ctrl, Shift, Numpad 0<br/>View: Numbers 1 to 4</p></div><div class=\'autocompletebox\' data-hook=\'autocompletebox\'></div><div class=\'input\'><input data-hook=\'input\' type=\'text\' /><button data-hook=\'send\'>Send</button></div></div>';
kb.N = '<div class=\'choose-nickname-view\'><img src="https://haxball-replay-analyzer.github.io/images/falafcio.png" /><div class=\'dialog\'><h1>Haxball Replay Analyzer</h1><div style=\'display: none\' class=\'label-input\'><label>Nick:</label><input data-hook=\'input\' type=\'text\' /></div><button id=\'button_ok\' data-hook=\'ok\'>Start</button></div></div>';
// jb.N = '<div class=\'connecting-view\'><div class=\'dialog\'><h1>Connecting</h1><div class=\'connecting-view-log\' data-hook=\'log\'></div><button data-hook=\'cancel\'>Cancel</button></div></div>';
// ib.N = '<div class=\'create-room-view\'><div class=\'dialog\'><h1>Create room</h1><div class=\'label-input\'><label>Room name:</label><input data-hook=\'name\' required /></div><div class=\'label-input\'><label>Password:</label><input data-hook=\'pass\' /></div><div class=\'label-input\'><label>Max players:</label><select data-hook=\'max-pl\'></select></div><button data-hook=\'unlisted\'></button><div class=\'row\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'create\'>Create</button></div></div></div>';
// Ka.N = '<div class=\'disconnected-view\'><div class=\'dialog basic-dialog\'><h1>Disconnected</h1><p data-hook=\'reason\'></p><div class=\'buttons\'><button data-hook=\'ok\'>Ok</button><button data-hook=\'replay\'>Save replay</button></div></div></div>';
hb.N = '<div id=\'game-state-view\' class=\'game-state-view\'><div class=\'bar-container\'><div class=\'bar\'><div class=\'scoreboard\'><div class=\'teamicon red\'></div><div class=\'score\' data-hook=\'red-score\'>0</div><div>-</div><div class=\'score\' data-hook=\'blue-score\'>0</div><div class=\'teamicon blue\'></div></div><div data-hook=\'timer\'></div></div></div><div class=\'canvas\' data-hook=\'canvas\'></div></div>';
ja.N = '<div class=\'game-view\' tabindex=\'-1\'><div class=\'top-section\' data-hook=\'gameplay-section\'></div><div class=\'bottom-section\'><div data-hook=\'stats\'></div><div data-hook=\'chatbox\'></div><div class=\'buttons\'><button data-hook=\'menu\'>☰ Menu<span class=\'tooltip\'>Toggle room menu [Escape]</span></button><button data-hook=\'settings\'>⛭ Settings</button><button id=\'button_staty\' data-hook=\'staty\'>📈 Game stats</button><button id=\'button_gif\' data-hook=\'settings\' style=\'display:none\'>📷 Create GIF</button></div></div><div data-hook=\'popups\'></div></div>';
// gb.N = '<div class=\'dialog kick-player-view\'><h1 id="tytul" data-hook=\'title\'></h1><div class=label-input><label>Reason: </label><input type=\'text\' data-hook=\'reason\' /></div><button data-hook=\'ban-btn\'><i class=\'icon-block\'></i>Ban from rejoining: <span data-hook=\'ban-text\'></span></button><div class="row"><button data-hook=\'close\'>Cancel</button><button data-hook=\'kick\'>Kick</button></div></div>';
// gxd.N = '<div style=\'overflow-y: scroll; position:fixed; top:10px; height: 700px\' class=\'dialog kick-player-view\'><h1 data-hook=\'title\'></h1><button style=\'display:none\' id=\'button_close\' data-hook=\'close\'>❌ Close</button><table><tr><td><button id=\'prevMatch\' data-hook=\'close2\'>◀️ Previous match</button></td><td style="width:30px"></td><td><button id=\'nextMatch\' data-hook=\'kick\'>Next match ▶️</button></td></tr></table><table><tr><td style=\'vertical-align:top\'><table id="div.tabela" style="width: 100%"><tr id=\'trosso\' style="text-align: center"><td style="font-size: 40px; color: red; width: 200px"><input style="font-size: 40px; text-align:right; color: red;border-style:hidden;background-color: #1a2125; width: 200px" id="input_redTeam" value="' + redName + '" autocomplete="off"></td><td id="div.wynik" style="font-size: 60px">-:-</td><td style="font-size: 40px; color: #5688e5"><input style="font-size: 40px; text-align:left;border-style:hidden;background-color: #1a2125; color: #5688e5; width: 200px" id="input_blueTeam" value="BLUE" autocomplete="off"></td></tr><tr><td></td><td id=\'game-time\' style=\'text-align:center\'>Game time: </td><td></td></tr><tr style="height: 30px"><td> </td></tr><tr style="font-size: 20px; text-align: center"><td style="width: 200px"></td><td style="width: 200px">GOALS</td><td style="width: 200px"></td></tr><tr style="height: 30px"><td> </td></tr><tr style="font-size: 20px; text-align: center"><td style="width: 200px"></td><td style="width: 200px">STATS</td><td style="width: 200px"></td></tr><tr style="height: 10px"><td> </td></tr><tr style="height: 30px"><td> </td></tr></table><table id=\'div.tabela2\'><tr style="font-size: 20px; text-align: center"><td style="width: 200px"></td><td></td><td style="width: 100px">PLAYERS</td><td style="width: 100px"></td></tr><tr style="height: 10px"><td> </td></tr></table></td><td style="width:10px"></td><td><div id="thirdStats"></div><br><div id="heatmap"></div><div class="row"></td></tr></table></div></div>';
// exd.N = '<div class=\'simple-dialog-view\'><div class=\'dialog basic-dialog\'><h1 data-hook=\'title\'></h1><p data-hook=\'content\'></p><div class=\'buttons\' data-hook=\'buttons\'></div></div></div>';
fb.N = '<div class=\'dialog basic-dialog leave-room-view\'><h1>Leave room?</h1><p>Are you sure you want to leave the room?</p><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'leave\'><i class=\'icon-logout\'></i>Leave</button></div></div>';
// eb.N = '<div class=\'dialog pick-stadium-view\'><h1>Pick a stadium</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'pick\'>Pick</button><button data-hook=\'delete\'>Delete</button><div class=\'file-btn\'><label for=\'stadfile\'>Load</label><input id=\'stadfile\' type=\'file\' accept=\'.hbs\' data-hook=\'file\'/></div><button data-hook=\'export\'>Export</button><div class=\'spacer\'></div><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
// db.N = '<div class=\'dialog\' style=\'min-width:200px\'><h1 data-hook=\'name\'></h1><button data-hook=\'admin\'></button><button data-hook=\'kick\'>Kick</button><button data-hook=\'close\'>Close</button></div>';
// cb.N = '<div class=\'player-list-item\'><div data-hook=\'flag\' class=\'flagico\'></div><div data-hook=\'name\'></div><div data-hook=\'ping\'></div></div>';
za.N = '<div class=\'player-list-view\'><div class=\'buttons\'><button data-hook=\'join-btn\'>Join</button><button data-hook=\'reset-btn\' class=\'admin-only\'></button></div><div class=\'list\' data-hook=\'list\'></div></div>';
ha.N = '<div class=\'replay-controls-view\'><button id=\'reset_button\' data-hook=\'reset\'>⏮</button><button id=\'play_button\' data-hook=\'play\'><i data-hook=\'playicon\'></i></button><div data-hook=\'spd\'>1x</div><button id=\'spddown\' data-hook=\'spddn\'>-</button><button data-hook=\'spdup\'>+</button><div data-hook=\'time\'>00:00</div><div class=\'timebar\' data-hook=\'timebar\'><div class=\'barbg\'><div class=\'bar\' data-hook=\'progbar\'></div></div><div class=\'timetooltip\' data-hook=\'timetooltip\'></div></div><button id=\'button_leave\' data-hook=\'leave\'>Leave</button></div>';
// bb.N = '<div class=\'dialog basic-dialog room-link-view\'><h1>Room link</h1><p>Use this url to link others directly into this room.</p><input data-hook=\'link\' readonly></input><div class=\'buttons\'><button data-hook=\'close\'>Close</button><button data-hook=\'copy\'>Copy to clipboard</button></div></div>';
// ab.tj = '<tr><td><span data-hook=\'tag\'></span><span data-hook=\'name\'></span></td><td data-hook=\'players\'></td><td data-hook=\'pass\'></td><td><div data-hook=\'flag\' class=\'flagico\'></div><span data-hook=\'distance\'></span></td></tr>';
// Aa.tj = '<div class=\'roomlist-view\'><div class=\'notice\' data-hook=\'notice\' hidden><div data-hook=\'notice-contents\'>Testing the notice.</div><div data-hook=\'notice-close\'><i class=\'icon-cancel\'></i></div></div><div class=\'dialog\'><h1>Haxball Replay Analyzer v1.16</h1><p>Contact: <br>Discord: Falafel#3895, you can find me at discord.io/haxracing<br>turbofalafel@gmail.com</p><br><br><div class=\'splitter\'><div style=\'display: none\' class=\'list\'><table class=\'header\'><colgroup><col><col><col><col></colgroup><thead><tr><td>Name</td><td>Players</td><td>Pass</td><td>Distance</td></tr></thead></table><div class=\'separator\'></div><div class=\'content\' data-hook=\'listscroll\'><table><colgroup><col><col><col><col></colgroup><tbody data-hook=\'list\'></tbody></table></div><div class=\'filters\'><span class=\'bool\' data-hook=\'fil-pass\'>Show locked <i></i></span><span class=\'bool\' data-hook=\'fil-full\'>Show full <i></i></span></div></div><div class=\'buttons\'><button style=\'display: none\' data-hook=\'refresh\'><i class=\'icon-cw\'></i><div>Refresh</div></button><button style=\'display: none\' data-hook=\'join\'><i class=\'icon-login\'></i><div>Join Room</div></button><button style=\'display: none\' data-hook=\'create\'><i class=\'icon-plus\'></i><div>Create Room</div></button><div style=\'display: none\' class=\'spacer\'></div><div class=\'file-btn\'><label for=\'replayfile\'>►<div>Load replay</div></label><input id=\'replayfile\' type=\'file\' accept=\'.hbr2\' data-hook=\'replayfile\'/></div><button style=\'display: none\' data-hook=\'settings\'><i class=\'icon-cog\'></i><div>Settings</div></button><button style=\'display: none\' data-hook=\'changenick\'><i class=\'icon-cw\'></i><div>Change Nick</div></button><br><br>' + ListaZmian + '</div></div></div></div>';
// Za.N = '<div class=\'room-password-view\'><div class=\'dialog\'><h1>Password required</h1><div class=\'label-input\'><label>Password:</label><input data-hook=\'input\' /></div><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'ok\'>Ok</button></div></div></div>';
Ya.N = '<div id=\'room-view\' class=\'room-view\'><div class=\'container\'><h1 data-hook=\'room-name\'></h1><div class=\'header-btns\'><button data-hook=\'rec-btn\'><i class=\'icon-circle\'></i>Rec</button><button data-hook=\'link-btn\'><i class=\'icon-link\'></i>Link</button><button data-hook=\'leave-btn\'><i class=\'icon-logout\'></i>Leave</button></div><div class=\'teams\'><div class=\'tools admin-only\'><button data-hook=\'auto-btn\'>Auto</button><button data-hook=\'rand-btn\'>Rand</button><button data-hook=\'lock-btn\'>Lock</button><button data-hook=\'reset-all-btn\'>Reset</button></div><div data-hook=\'red-list\'></div><div data-hook=\'spec-list\'></div><div data-hook=\'blue-list\'></div><div class=\'spacer admin-only\'></div></div><div class=\'settings\'><div><label class=\'lbl\'>Time limit</label><select data-hook=\'time-limit-sel\'></select></div><div><label class=\'lbl\'>Score limit</label><select data-hook=\'score-limit-sel\'></select></div><div><label class=\'lbl\'>Stadium</label><label class=\'val\' data-hook=\'stadium-name\'>testing the stadium name</label><button class=\'admin-only\' data-hook=\'stadium-pick\'>Pick</button></div></div><div class=\'controls admin-only\'><button data-hook=\'start-btn\'><i class=\'icon-play\'></i>Start game</button><button data-hook=\'stop-btn\'><i class=\'icon-stop\'></i>Stop game</button><button data-hook=\'pause-btn\'><i class=\'icon-pause\'></i>Pause</button></div></div></div>';
// aa.N = '<div class=\'dialog settings-view\'><h1>Settings</h1><button data-hook=\'close\'>Close</button><div class=\'tabs\'><button data-hook=\'soundbtn\'>Sound</button><button data-hook=\'videobtn\'>Video</button><button data-hook=\'inputbtn\'>Input</button><button data-hook=\'miscbtn\'>Misc</button></div><div data-hook=\'presskey\' tabindex=\'-1\'><div>Press a key</div></div><div class=\'tabcontents\'><div class=\'section\' data-hook=\'miscsec\'><div class=\'loc\' data-hook=\'loc\'></div><div class=\'loc\' data-hook=\'loc-ovr\'></div><button data-hook=\'loc-ovr-btn\'></button></div><div class=\'section\' data-hook=\'soundsec\'><div data-hook="tsound-main">Sounds enabled</div><div data-hook="tsound-chat">Chat sound enabled</div><div data-hook="tsound-highlight">Nick highlight sound enabled</div><div data-hook="tsound-crowd">Crowd sound enabled</div></div><div class=\'section\' data-hook=\'inputsec\'></div><div class=\'section\' data-hook=\'videosec\'><div>Viewport Mode:<select data-hook=\'viewmode\'><option>Dynamic</option><option>Restricted 840x410</option><option>Full 1x Zoom</option><option>Full 1.25x Zoom</option><option>Full 1.5x Zoom</option><option>Full 1.75x Zoom</option><option>Full 2x Zoom</option><option>Full 2.25x Zoom</option><option>Full 2.5x Zoom</option></select></div><div>FPS Limit:<select data-hook=\'fps\'><option>None (Recommended)</option><option>30</option></select></div><div>Resolution Scaling:<select data-hook=\'resscale\'><option>100%</option><option>75%</option><option>50%</option><option>25%</option></select></div><div data-hook="tvideo-teamcol">Custom team colors enabled</div><div data-hook="tvideo-showindicators">Show chat indicators</div><div data-hook="tvideo-showavatars">Show player avatars</div></div></div></div>';
// aa.$l = 0;
// P.N = '<div class=\'simple-dialog-view\'><div class=\'dialog basic-dialog\'><h1 data-hook=\'title\'></h1><p data-hook=\'content\'></p><div class=\'buttons\' data-hook=\'buttons\'></div></div></div>';
Xa.N = '<div class=\'stats-view\'><p>Ping: <span data-hook=\'ping\'></span></p><p>Max Ping: <span data-hook=\'max-ping\'></span></p><p>Fps: <span data-hook=\'fps\'></span></p><div data-hook=\'graph\'></div></div>';
Wa.N = '<div class=\'unsupported-browser-view\'><div class=\'dialog\'><h1>Unsupported Browser</h1><p>Sorry! Your browser doesn\'t yet implement some features which are required for HaxBall to work.</p><p>The missing features are: <span data-hook=\'features\'></span></p><h2>Recommended browsers:</h2><div><a href="https://www.mozilla.org/firefox/new/"><img src="images/firefox-icon.png"/>Firefox</a></div><div><a href="https://www.google.com/chrome/"><img src="images/chrome-icon.png"/>Chrome</a></div><div><a href="http://www.opera.com/"><img src="images/opera-icon.png"/>Opera</a></div></div></div>';
// r.sn = {
// }.toString;

u.qp()

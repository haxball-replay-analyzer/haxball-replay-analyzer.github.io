/* eslint-disable no-useless-concat */
/* eslint-disable no-extend-native */
/* eslint-disable no-self-compare */
/* eslint-disable no-cond-assign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-mixed-operators */
/* eslint-disable default-case */
/* eslint-disable no-loop-func */
/* eslint-disable new-parens */
/* eslint-disable no-sequences */
/* eslint-disable no-array-constructor */
/* eslint-disable no-redeclare */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

import $ from 'jquery';
import './vendor/pako-jszip.min.js'; // tylko JSZip (window.JSZip) dla UI; pako niżej z npm
import pako from 'pako';
import { analyzeInWorker, cancelAnalysis } from './analysis/client.js';
// klasy klienta HaxBall wydzielone do rdzenia (nazwy po minifikacji)
import {
  Ab, Bb, C, Cb, D, F, Ga, H, Ia, J, Jb, K, Kb, La, Ma, Na, Oa, Pa, Qa, S, U, Ua, V, Y,
  addRoomListener, da, ea, ec, fa, h, ia, ka, kc, la, m, ma, na, oa, p, pa, q, qa, r, ra,
  removeRoomListener, sa, ta, vb, w, y
} from '@hbra/replay-core/haxball';

// Wywołania zwrotne do aplikacji (Redux, serwer, komunikaty). Ustawia je Home.js przez
// configureReplayer(); dawniej game2.js importował puste funkcje z Home.js i Modal.js,
// które tamte nadpisywały (import cykliczny, TD-005).
var replayerHooks = {
  onClearStats: function () { },
  onStats: function (match) { },
  onPlayerList: function (playerList) { },
  onPlayerPos: function (playerPos) { },
  onProgress: function (fraction) { }, // postęp analizy 0..1 (ekran „Analyzing...”)
  onShowStats: function (element) { },
  onUpload: function (bytes, name, lastModified) { },
  onMessage: function (message, color, seconds) { }
};

export function configureReplayer(hooks) {
  Object.assign(replayerHooks, hooks);
}

function resetReplay() {

}

function newReplay() {
  replayerHooks.onClearStats();
}

function bringReplayer() {
  $('.top-section').animate({
    left: 0,
  }, { duration: 700, easing: 'swing', queue: false });

  $('.bottom-section').animate({
    left: 0,
  }, { duration: 700, easing: 'swing', queue: false });

  $('.replay-controls-view').animate({
    left: 0,
  }, { duration: 700, easing: 'swing', queue: false });

  $('#loading-screen').animate({
    left: '-150%',
  }, { duration: 700, easing: 'swing', queue: false });
}

function leaveReplayer() {
  cancelAnalysis();
  lastAnalysis = null;
  players = [];
  playSounds = false;

  $('.roomlist-view').animate({
    left: 0,
  }, { duration: 700, easing: 'swing', queue: false });

  $('.top-section').animate({
    left: '150%',
  }, { duration: 700, easing: 'swing', queue: false });

  $('.bottom-section').animate({
    left: '150%',
  }, { duration: 700, easing: 'swing', queue: false });

  $('.replay-controls-view').animate({
    left: '150%',
  }, { duration: 700, easing: 'swing', queue: false, complete: function () { resetReplay() } });

  $("#loading-screen").css('left', '150%')
}

function bringSettings() {
  $("#popups").click(function (e) {
    if (e.target.id == 'popups') {
      leaveSettings();
    }
  })

  const parent = $("#settings_button")[0];

  $('.settings-view').css({
    'position': 'fixed',
    'left': parent.offsetLeft + 'px',
    'top': parent.offsetTop + parent.offsetParent.offsetTop + 35 + 'px',
    'width': parent.clientWidth + 'px',
    'height': parent.clientHeight + 'px'
  })
  $('.settings-view').css('visibility', 'visible');
  $('#popups').animate({
    opacity: 1
  }, { duration: 300, easing: 'swing', queue: false });
  $('.settings-view').animate({
    visibility: 'visible',
    opacity: 1,
    width: '25vw',
    height: '50vh',
    maxHeight: '400px',
    top: '25vh',
    left: '37.5vw'
  }, { duration: 300, easing: 'swing', queue: false });
}

function leaveSettings() {
  const parent = $("#settings_button")[0];

  $('#popups').animate({
    opacity: 0
  }, { duration: 300, easing: 'swing', queue: false });

  $('.settings-view').animate({
    left: parent.offsetLeft + 'px',
    top: parent.offsetTop + parent.offsetParent.offsetTop + 35 + 'px',
    width: parent.clientWidth + 'px',
    height: parent.clientHeight + 'px',
  }, { duration: 300, easing: 'swing', queue: false, complete: function () { removePopups() } });
}

function removePopups() {
  $('.settings-view').css('visibility', 'hidden');
  $('#popups').css('display', 'none')
}

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

var players = [], playSounds = false, autoClick = false, autoClickValue;
var lastAnalysis = null; // wynik analyzeReplay() wczytanej powtórki
var playerToFollow = 0, mainCanvas, mousepos = { clientX: 0, clientY: 0 };
var globalPlayerHovered = false;

function playersToFollowList() {
  var a = [
    {
      id: 0,
      name: 'ball'
    }
  ];
  var b = '<option value=0>[0] ball</option>';
  for (var i = 0; i < players.length; i++) {
    if (players[i].V == 0) continue;
    a.push({
      id: players[i].V,
      name: players[i].w
    });
    b = b + '<option value=' + a[a.length - 1].id + (playerToFollow == a[a.length - 1].id ? ' selected=true> [' : ' > [') + a[a.length - 1].id + '] ' + a[a.length - 1].name + '</option > ';
  }
  return b;
}

const setPlayerToFollow = function () {
  playerToFollow = document.getElementById('selectPlayerToFollow').value;
}

function getCanvas(a) {
  mainCanvas = a;
  mainCanvas.onmousemove = function (e) {
    mousepos = e;
  }
  mainCanvas.onclick = function (e) {
    if (globalPlayerHovered) {
      playerToFollow = globalPlayerHovered;
    }
  }
}

export function watchGoal(par) {
  const g = document.getElementById("recGoal" + (Number(par) + 1)).offsetLeft;
  autoClick = true;
  autoClickValue = '' + g;
  document.getElementsByClassName("timebar")[0].click();
}

function hc() {
}
function Wa(a) {
  this.g = v.Ga(Wa.N);
  v.Ea(this.g).get('features').textContent = a.join(', ')
}
function Xa() {
  this.nl = new Qb;
  this.g = v.Ga(Xa.N);
  var a = v.Ea(this.g);
  this.rg = a.get('ping');
  this.wp = a.get('max-ping');
  this.wo = a.get('fps');
  v.xe(a.get('graph'), this.nl.g)
}
function P(a, b, c) {
  var d = this;
  this.g = v.Ga(P.N);
  var e = v.Ea(this.g);
  e.get('ok');
  e.get('cancel');
  this.Vd = e.get('content');
  for (var f = e.get('title'), e = e.get('buttons'), g = 0, k = 0; k < c.length;) {
    var l = c[k++],
      t = window.document.createElement('button');
    t.textContent = l;
    t.onclick = function (a) {
      return function () {
        y.i(d.Va, a[0])
      }
    }([g++]);
    e.appendChild(t)
  }
  this.Vd.textContent = b;
  f.textContent = a
}
function aa(a) {
  function b(a) {
    var b = window.document.createElement('div');
    b.className = 'inputrow';
    var c = window.document.createElement('div');
    c.textContent = a;
    b.appendChild(c);
    for (var c = p.Eo(a), d = 0; d < c.length;) {
      var e = [
        c[d]
      ];
      ++d;
      var f = [
        window.document.createElement('div')
      ],
        g = e[0];
      J.startsWith(e[0], 'Key') && (g = D.substr(e[0], 3, null));
      f[0].textContent = g;
      b.appendChild(f[0]);
      g = window.document.createElement('i');
      g.className = 'icon-cancel';
      g.onclick = function (a, b) {
        return function () {
          p.Jq(b[0]);
          n.A.tg.Xa(p);
          a[0].remove()
        }
      }(f, e);
      f[0].appendChild(g)
    }
    c = window.document.createElement('i');
    c.className = 'icon-plus';
    b.appendChild(c);
    c.onclick = function () {
      q.classList.toggle('show', !0);
      q.focus();
      q.onkeydown = function (b) {
        q.classList.toggle('show', !1);
        b.stopPropagation();
        b = b.code;
        null == p.L(b) && (p.Pa(b, a), n.A.tg.Xa(p), r())
      }
    };
    return b
  }
  function c(a, b, c) {
    a = l.get(a);
    if (null == c) a.hidden = !0;
    else {
      a.innerHTML = b + ': <div class=\'flagico\'></div> <span></span>';
      b = a.querySelector('.flagico');
      a = a.querySelector('span');
      try {
        b.classList.add('f-' + c.ub)
      } catch (vc) {
      }
      a.textContent = c.ub.toUpperCase()
    }
  }
  function d(a, b, c, d) {
    var e = l.get(a);
    e.selectedIndex = d(b.L());
    e.onchange = function () {
      var a = c(e.selectedIndex);
      //console.log("czendż",a);
      b.Xa(a)
    }
  }
  function e(a, b, c) {
    function d(a) {
      e.classList.toggle('icon-ok', a);
      e.classList.toggle('icon-cancel', !a)
    }
    a = l.get(a);
    a.classList.add('toggle');
    var e = window.document.createElement('i');
    e.classList.add('icon-ok');
    a.insertBefore(e, a.firstChild);
    a.onclick = function () {
      var a = !b.L();
      b.Xa(a);
      d(a);
      null != c && c(a)
    };
    d(b.L())
  }
  function f(a) {
    var b = {
      Jm: l.get(a + 'btn'),
      bh: l.get(a + 'sec')
    };
    t.push(b);
    b.Jm.onclick = function (el) {
      g(b);
      if (el.target.id === 'video_button') {
        $("#selectPlayerToFollow")[0].onchange = function () {
          setPlayerToFollow();
        }
      }
    }
  }
  function g(a) {
    for (var b = 0, c = 0; c < t.length;) {
      var d = t[c];
      ++c;
      var e = d == a;
      e && (aa.$l = b);
      d.bh.classList.toggle('selected', e);
      d.Jm.classList.toggle('selected', e);
      ++b
    }
  }
  null == a && (a = !1);
  var k = this;
  aa.N = '<div class=\'dialog settings-view\'><h1>Settings</h1><button data-hook=\'close\'>Close</button><div class=\'tabs\'><button data-hook=\'soundbtn\'>Sound</button><button id=\'video_button\' data-hook=\'videobtn\'>Video</button><button data-hook=\'inputbtn\'>Input</button><button data-hook=\'miscbtn\'>Misc</button></div><div data-hook=\'presskey\' tabindex=\'-1\'><div>Press a key</div></div><div class=\'tabcontents\'><div class=\'section\' data-hook=\'miscsec\'><div class=\'loc\' data-hook=\'loc\'></div><div class=\'loc\' data-hook=\'loc-ovr\'></div><button data-hook=\'loc-ovr-btn\'></button></div><div class=\'section\' data-hook=\'soundsec\'><div data-hook="tsound-main">Sounds enabled</div><div data-hook="tsound-chat">Chat sound enabled</div><div data-hook="tsound-highlight">Nick highlight sound enabled</div><div data-hook="tsound-crowd">Crowd sound enabled</div></div><div class=\'section\' data-hook=\'inputsec\'></div><div class=\'section\' data-hook=\'videosec\'><div>Viewport Mode:<select data-hook=\'viewmode\'><option>Dynamic</option><option>Restricted 840x410</option><option>Full 1x Zoom</option><option>Full 1.25x Zoom</option><option>Full 1.5x Zoom</option><option>Full 1.75x Zoom</option><option>Full 2x Zoom</option><option>Full 2.25x Zoom</option><option>Full 2.5x Zoom</option></select></div><div>FPS Limit:<select data-hook=\'fps\'><option>None (Recommended)</option><option>30</option></select></div><div>Resolution Scaling:<select data-hook=\'resscale\'><option>100%</option><option>75%</option><option>50%</option><option>25%</option></select></div><div>Player To Follow:<select id="selectPlayerToFollow" >' + playersToFollowList() + '</select></div><div data-hook="tvideo-teamcol">Custom team colors enabled</div><div data-hook="tvideo-showindicators">Show chat indicators</div><div data-hook="tvideo-showavatars">Show player avatars</div></div></div></div>';
  this.g = v.Ga(aa.N);
  var l = v.Ea(this.g);
  // console.log(l, this.g)
  // console.log('e', l.get('videosec'))
  this.nd = l.get('close');
  var t = [
  ];
  f('sound');
  f('video');
  f('misc');
  f('input');
  g(t[aa.$l]);
  e('tsound-main', n.A.pm, function (a) {
    n.Na.im(a ? 1 : 0)
  });
  e('tsound-chat', n.A.Hi);
  e('tsound-highlight', n.A.om);
  e('tsound-crowd', n.A.nm);
  d('viewmode', n.A.Tb, function (a) {
    //console.log(n.A.Tb);
    //console.log(a-1);
    return a - 1
  }, function (a) {
    return a + 1
  });
  d('fps', n.A.Fh, function (a) {
    return a
  }, function (a) {
    return a
  });
  var h = [
    1,
    0.75,
    0.5,
    0.25
  ];
  d('resscale', n.A.Sl, function (a) {
    return h[a]
  }, function (a) {
    for (var b = 0, c = h.length - 1; b < c && !(h[b] <= a);) ++b;
    return b
  });
  e('tvideo-teamcol', n.A.xm);
  e('tvideo-showindicators', n.A.Ak);
  e('tvideo-showavatars', n.A.lm);
  var m = null,
    m = function () {
      var b = n.A.Ne.L();
      c('loc', 'Detected location', n.A.Me.L());
      c('loc-ovr', 'Location override', b);
      var d = l.get('loc-ovr-btn');
      d.disabled = !a;
      null == b ? (d.textContent = 'Override location', d.onclick = function () {
        A.i(k.Ep)
      }) : (d.textContent = 'Remove override', d.onclick = function () {
        n.A.Ne.Xa(null);
        m()
      })
    };
  m();
  var p = n.A.tg.L(),
    q = l.get('presskey'),
    r,
    u = l.get('inputsec');
  r = function () {
    v.Cf(u);
    var a = b('Up');
    u.appendChild(a);
    a = b('Down');
    u.appendChild(a);
    a = b('Left');
    u.appendChild(a);
    a = b('Right');
    u.appendChild(a);
    a = b('Kick');
    u.appendChild(a)
  };
  r();
  this.nd.onclick = function () {
    leaveSettings();
    // A.i(k.qb)
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
function Za() {
  var a = this;
  this.g = v.Ga(Za.N);
  var b = v.Ea(this.g);
  this.Cb = b.get('input');
  this.af = b.get('ok');
  console.log(this.af);
  b.get('cancel').onclick = function () {
    null != a.Va && a.Va(null)
  };
  this.Cb.maxLength = 30;
  this.Cb.oninput = function () {
    a.C()
  };
  this.Cb.onkeydown = function (b) {
    13 == b.keyCode && a.Dc() && null != a.Va && a.Va(a.Cb.value)
  };
  this.af.onclick = function () {
    console.log("się klika");
    a.Dc() && null != a.Va && a.Va(a.Cb.value)
  };
  this.C()
}
function $a(a) {
  this.Xk = a.get('notice');
  this.$n = a.get('notice-contents');
  this.nd = a.get('notice-close');
  this.Il()
}
export function handleFile(e) {
  var c = this;
  var a = e.target.files;
  newReplay();
  if (!(1 > a.length)) {
    var a = a.item(0),
      b = new FileReader;
    // console.log(a);
    b.onload = function () {
      if (b.result.byteLength < 3000000) replayerHooks.onUpload(b.result, a.name.slice(0, -5), a.lastModified);
      else replayerHooks.onMessage('This file is too big to be sent to server. But don\'t worry, you can still watch it offline.', 'darkgoldenrod', 7)
      // console.log(b.result);
      if (b.result.byteLength > 50_000) {
        ///////////////////////////////////////
        // console.log(b.result);
        // var replayParts = [], newBuffer, replayData = [];
        // var x = new Uint8Array(b.result);
        // x = Array.from(x)
        // do {
        //   replayParts.push(x.splice(0, 50_000))
        // } while (x.length > 50_000)
        // replayParts.push(x);
        // console.log(replayParts)
        // for (let part of replayParts) {
        //   const buffer = new ArrayBuffer(part.length);
        //   const uint8View = new Uint8Array(buffer);
        //   for (let i = 0; i < part.length; i++) {
        //     uint8View[i] = part[i];
        //   }
        //   newBuffer = uint8View.buffer;
        //   console.log(newBuffer);
        // }
        // for (let part of replayParts) {
        //   var x = new Uint8Array(part);
        //   x = Array.from(part)
        //   replayData = replayData.concat(x)
        // }
        // const buffer = new ArrayBuffer(replayData.length);
        // const uint8View = new Uint8Array(buffer);
        // for (let i = 0; i < replayData.length; i++) {
        //   uint8View[i] = replayData[i];
        // }
        // newBuffer = uint8View.buffer;
        // console.log(newBuffer, b.result);
        // console.log(newBuffer == b.result);
        // console.log(new Uint8Array(newBuffer).every((value, index) => value === new Uint8Array(b.result)[index]));
        /////////////////////////////////////
      }
      // console.log(b.result);
      y.i(parseReplay, b.result)
    };
    b.readAsArrayBuffer(a)
  }
};
export function replayFromSite(r) {
  newReplay();
  // console.log(r);
  y.i(parseReplay, r)
}
function parseReplay(a) {
  u.po(a)
}
function Aa(a) {
  function b(a) {
    function b() {
      e.className = f.Ta ? 'icon-ok' : 'icon-cancel'
    }
    a = d.get(a);
    var e = a.querySelector('i'),
      f = {
        Ta: !0
      };
    b();
    a.onclick = function () {
      f.Ta = !f.Ta;
      b();
      c.bn(c.dj)
    };
    return f
  }
  this.dj = [
  ];
  var c = this;
  this.gs = a;
  Aa.tj = '<div style="display: none" class=\'roomlist-view\'><div class=\'notice\' data-hook=\'notice\' hidden><div data-hook=\'notice-contents\'>Testing the notice.</div><div data-hook=\'notice-close\'><i class=\'icon-cancel\'></i></div></div><div class=\'dialog\'><h1>Haxball Replay Analyzer v1.17</h1><p>Contact: <br>Discord: Falafel#3895, you can find me at discord.io/haxracing<br>turbofalafel@gmail.com</p><br><br><div class=\'splitter\'><div style=\'display: none\' class=\'list\'><table class=\'header\'><colgroup><col><col><col><col></colgroup><thead><tr><td>Name</td><td>Players</td><td>Pass</td><td>Distance</td></tr></thead></table><div class=\'separator\'></div><div class=\'content\' data-hook=\'listscroll\'><table><colgroup><col><col><col><col></colgroup><tbody data-hook=\'list\'></tbody></table></div><div class=\'filters\'><span class=\'bool\' data-hook=\'fil-pass\'>Show locked <i></i></span><span class=\'bool\' data-hook=\'fil-full\'>Show full <i></i></span></div></div><div class=\'buttons\'><button style=\'display: none\' data-hook=\'refresh\'><i class=\'icon-cw\'></i><div>Refresh</div></button><button style=\'display: none\' data-hook=\'join\'><i class=\'icon-login\'></i><div>Join Room</div></button><button style=\'display: none\' data-hook=\'create\'><i class=\'icon-plus\'></i><div>Create Room</div></button><div style=\'display: none\' class=\'spacer\'></div><div class=\'file-btn\'><label for=\'replayfile\'>►<div>Load replay</div></label><input id=\'replayfile\' type=\'file\' accept=\'.hbr2\' data-hook=\'replayfile\'/></div><button style=\'display: none\' data-hook=\'settings\'><i class=\'icon-cog\'></i><div>Settings</div></button><button style=\'display: none\' data-hook=\'changenick\'><i class=\'icon-cw\'></i><div>Change Nick</div></button><br><br></div></div></div></div>';
  this.Ja = v.Ga(Aa.tj);
  // console.log(Aa.tj);
  var d = v.Ea(this.Ja),
    e = new $a(d);
  this.pj = d.get('refresh');
  this.Tm = d.get('join');
  a = d.get('create');
  this.cs = d.get('count');
  a.onclick = function () {
    A.i(c.ws)
  };
  d.get('changenick').onclick = function () {
    A.i(c.vs)
  };
  d.get('settings').onclick = function () {
    A.i(c.ys);
    //console.log(c.ys);
  };
  var f = d.get('replayfile');

  this.fs = b('fil-full');
  this.zs = b('fil-pass');
  this.ns = d.get('listscroll');
  this.Bs = Ba.cg(this.ns);
  this.gj = d.get('list');
  this.pj.onclick = function () {
    e.Il();
    c.Om()
  };
  this.Tm.onclick = function () {
    null != c.Od && y.i(c.Ym, c.Od.Fs)
  };
  this.Om();
}

function ab(a) {
  this.Ja = v.Ga(ab.tj, 'tbody');
  var b = v.Ea(this.Ja),
    c = b.get('name'),
    d = b.get('rs'),
    e = b.get('distance'),
    f = b.get('pass'),
    b = b.get('flag');
  //console.log(b.get('players'));
  this.Fs = a;
  var g = a.vd;
  c.textContent = g.w;
  d.textContent = '' + g.I + '/' + g.Xe;
  f.textContent = g.Ib ? 'Yes' : 'No';
  e.textContent = '' + (a.Le | 0) + 'km';
  try {
    b.classList.add('f-' + g.ub.toLowerCase())
  } catch (k) {
  }
  9 > a.vd.Id && this.Ja.classList.add('old')
}
function bb() {
  this.gk = null;
  var a = this;
  this.g = v.Ga(bb.N);
  var b = v.Ea(this.g);
  this.Zf = b.get('link');
  var c = b.get('copy'),
    b = b.get('close');
  this.Zf.onfocus = function () {
    a.Zf.select()
  };
  c.onclick = function () {
    a.Zf.select();
    return window.document.execCommand('Copy')
  };
  b.onclick = function () {
    A.i(a.qb)
  }
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
  var e = !1, // pauza (dawniej start w 10000x do analizy, potem kliknięcia)
    f = 2, // 1x
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
  // ikony z fontello (src/styles/icons.scss): znak ⏵ (U+23F5) w Open Sans z Google Fonts jest pusty
  var k = d.get('playicon');
  function setPlayIcon() {
    k.classList.toggle('icon-play', !e);
    k.classList.toggle('icon-pause', e)
  }
  setPlayIcon();
  d.get('play').onclick = function () {
    e = !e;
    setPlayIcon();
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
  // console.log('wykrywam pasek', l)
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
  };
  //console.log(document.getElementsByClassName("recGoal1")[0]);
  l.onclick = function (b) {
    // console.log(l, b, a.mh, a.mf)
    if (autoClick) {
      var toClick = (autoClickValue) / l.clientWidth * a.mh * a.mf - 5000;
      if (toClick < 0) toClick = 0;
      a.er(toClick);
      c.Wf || (c.Wf = !0, c.Vp(), c.el());
      autoClick = false;
      return;
    }
    a.er((b.pageX - l.offsetLeft) / l.clientWidth * a.mh * a.mf);
    c.Wf || (c.Wf = !0, c.Vp(), c.el())
  };
  l.onmousemove = function (b) {
    b = (b.pageX - l.offsetLeft) / l.clientWidth;
    t.textContent = ha.Wk(a.mf * a.mh * b);
    //console.log(a.mf, a.mh,b);
    return t.style.left = 'calc(' + 100 * b + '% - 30px)'
  };
  this.fp = d.get('leave');
  this.fp.onclick = function () {
    // A.i(c.de);
    resetReplay = function () {
      A.i(c.de);
    }
    leaveReplayer();
  }
}
function Q(a) {
  var b = this,
    c = new P('Only humans', '', [
    ]);
  this.g = c.g;
  c.Vd.style.minHeight = '78px';
  Ja.gp().then(function (d) {
    null == Q.xg && (Q.xg = window.document.createElement('div'), c.Vd.appendChild(Q.xg), Q.Dq = d.render(Q.xg, {
      sitekey: a,
      callback: function (a) {
        y.i(Q.Gl, a)
      },
      theme: 'dark'
    }));
    //console.log(a);
    d.reset(Q.Dq);
    Q.Gl = function (a) {
      window.setTimeout(function () {
        y.i(b.Va, a)
      }, 1000);
      Q.Gl = null
    };
    c.Vd.appendChild(Q.xg)
  })
}
function za(a) {
  this.xd = new Map;
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
function cb(a) {
  var b = this;
  this.w = a.w;
  this.yb = a.yb;
  this.$ = a.V;
  this.g = v.Ga(cb.N);
  var c = v.Ea(this.g);
  this.Ze = c.get('name');
  this.rg = c.get('ping');
  try {
    c.get('flag').classList.add('f-' + a.Kd)
  } catch (d) {
  }
  this.Ze.textContent = this.w;
  this.rg.textContent = '' + this.yb;
  this.g.ondragstart = function (a) {
    a.dataTransfer.setData('player', K.ye(b.$))
  };
  this.g.oncontextmenu = function (a) {
    a.preventDefault();
    y.i(b.ff, b.$)
  };
  this.em(a.cb)
}
function db(a, b) {
  var c = this;
  this.g = v.Ga(db.N);
  var d = v.Ea(this.g);
  this.Ze = d.get('name');
  this.Hf = d.get('admin');
  this.Qe = d.get('kick');
  this.nd = d.get('close');
  this.Hf.onclick = function () {
    ia.i(c.Cp, c.Nb, !c.ql)
  };
  this.Qe.onclick = function () {
    y.i(c.ei, c.Nb)
  };
  this.nd.onclick = function () {
    A.i(c.qb)
  };
  this.Nb = a.V;
  this.Ej(a.w);
  this.Dj(a.cb);
  this.Hf.disabled = !b || 0 == this.Nb;
  this.Qe.disabled = !b || 0 == this.Nb
}
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
  ], b = 0, c = this.Vi; b < c;) ++b,
    a.push(0);
  this.fq = a;
  this.g.appendChild(this.Qf);
  this.g.className = 'graph'
}
function eb() {
  this.jb = null;
  var a = this;
  this.g = v.Ga(eb.N);
  var b = v.Ea(this.g);
  b.get('cancel').onclick = function () {
    A.i(a.ci)
  };
  this.hi = b.get('pick');
  this.bk = b.get('delete');
  this.rk = b.get('export');
  var c = b.get('list'),
    d = b.get('file');
  this.Lg();
  this.hi.onclick = function () {
    null !=
      a.jb && a.jb.Pd().then(function (b) {
        y.i(a.og, b)
      })
  };
  this.bk.onclick = function () {
    if (null != a.jb) {
      var b = a.jb.Lm;
      null != b && (a.jb.Ja.remove(), a.jb = null, b(), a.Lg())
    }
  };
  this.rk.onclick = function () {
    null != a.jb && a.jb.Pd().then(function (a) {
      Ca.br(a.se(), a.w + '.hbs')
    })
  };
  this.ki(c);
  this.vg = Ba.cg(c);
  window.setTimeout(function () {
    a.vg.update()
  }, 0);
  d.onchange = function () {
    var b = d.files;
    if (!(1 > b.length)) {
      var b = b.item(0),
        c = new FileReader;
      c.onload = function () {
        try {
          var b = new h;
          b.Lk(c.result);
          y.i(a.og, b)
        } catch (k) {
          b = k instanceof q ? k.Ta :
            k,
            b instanceof SyntaxError ? y.i(a.fi, 'SyntaxError in line: ' + K.ye(b.lineNumber)) : b instanceof Bb ? y.i(a.fi, b.xp) : y.i(a.fi, 'Error loading stadium file.')
        }
      };
      c.readAsText(b)
    }
  }
}
function fb() {
  var a = this;
  this.g = v.Ga(fb.N);
  var b = v.Ea(this.g);
  b.get('cancel').onclick = function () {
    y.i(a.qb, !1)
  };
  b.get('leave').onclick = function () {
    y.i(a.qb, !0)
  }
}
function gb(a) {
  var b = this;
  this.g = v.Ga(gb.N);
  var c = v.Ea(this.g);
  this.Ze = c.get('title');
  this.oi = c.get('reason');
  //this.yn = c.get('ban-btn');
  this.An = c.get('ban-text');
  this.Qe = c.get('kick');
  this.nd = c.get('close');
  this.yn.onclick = function () {
    b.Aj(!b.Jj)
  };
  this.nd.onclick = function () {
    A.i(b.qb)
  };
  this.Qe.onclick = function () {
    Cb.i(b.ei, b.Nb, b.oi.value, b.Jj)
  };
  this.oi.onkeydown = function (a) {
    return a.stopPropagation()
  };
  this.oi.maxLength = 100;
  this.Nb = a.V;
  this.Ze.textContent = 'Kick ' + a.w;
  this.Aj(!1)
}
function gxd(a) {
  var b = this;
  this.g = v.Ga(gxd.N);
  var c = v.Ea(this.g);
  this.Ze = c.get('title');
  //this.oi = c.get('reason');
  this.yn = c.get('ban-btn');
  this.An = c.get('ban-text');
  this.Qe = c.get('kick');
  this.nd = c.get('close');
  /*this.yn.onclick = function () {
    b.Aj(!b.Jj)
  };*/
  this.nd.onclick = function () {
    A.i(b.qb)
  };
  this.Qe.onclick = function () {
    Cb.i(b.ei, b.Nb, b.oi.value, b.Jj)
  };
  /*this.oi.onkeydown = function (a) {
    return a.stopPropagation()
  };*/
  //this.oi.maxLength = 100;
  this.Nb = a.V;
  this.Ze.textContent = 'Match stats:';
  this.Ze.id = "tytul";
  this.Aj(!1)
}
function exd(a, b, c) {
  var d = this;
  this.g = v.Ga(exd.N);
  var e = v.Ea(this.g);
  e.get('ok');
  e.get('cancel');
  this.Vd = e.get('content');
  for (var f = e.get('title'), e = e.get('buttons'), g = 0, k = 0; k < c.length;) {
    var l = c[k++],
      t = window.document.createElement('button');
    t.textContent = l;
    t.onclick = function (a) {
      return function () {
        y.i(d.Va, a[0])
      }
    }([g++]);
    e.appendChild(t)
  }
  this.Vd.textContent = b;
  f.textContent = a
}
function ja(a) {
  //console.log(a);
  this.Fb = new hb;
  this.Gd = !1;
  this.pe = new Xa;
  this.Qa = new Da;
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
    var a = new aa;
    a.qb = function () {
      b.bb(null)
    };
    //console.log(a.g);
    b.bb(a.g);
    bringSettings();
  };
  a.get('staty').onclick = function (el) {

    if (lastAnalysis && lastAnalysis.matches.length > 0) replayerHooks.onShowStats(el.target);
    else replayerHooks.onMessage('Error: this replay doesn\'t contain any started match.', 'darkred', 4)

  };
  this.Jh.appendChild(this.Fb.g);
  this.Wa.de = function () {
    var a = new fb;
    a.qb = function (a) {
      b.bb(null);
      a && A.i(b.de)
    };
    b.bb(a.g)
  };
  this.Wa.Xp = function () {
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
function hb() {
  this.Nb = - 1;
  this.Eb = new N;
  this.xc = new Rb;
  this.g = v.Ga(hb.N);
  var a = v.Ea(this.g);
  this.Pb = new Db(a.get('red-score'), 0);
  this.Kb = new Db(a.get('blue-score'), 0);
  v.xe(a.get('timer'), this.xc.g);
  v.xe(a.get('canvas'), this.Eb.sa)
}
function Ka(a, b) {
  var c = this;
  this.g = v.Ga(Ka.N);
  var d = v.Ea(this.g);
  this.Bp = d.get('ok');
  this.Bp.onclick = function () {
    A.i(c.Va)
  };
  this.Nl = d.get('replay');
  var e = null != b;
  this.Nl.hidden = !e;
  e && (this.Nl.onclick = function () {
    ba.Yl(b)
  });
  d.get('reason').textContent = a
}
function ib(a) {
  var b = this;
  this.g = v.Ga(ib.N);
  var c = v.Ea(this.g);
  this.vh = c.get('cancel');
  this.Wj = c.get('create');
  this.$e = c.get('name');
  this.kl = c.get('pass');
  this.ai = c.get('max-pl');
  this.Em = c.get('unlisted');
  this.$e.maxLength = 40;
  this.$e.value = a;
  this.$e.oninput = function () {
    b.C()
  };
  this.kl.maxLength = 30;
  this.Em.onclick = function () {
    b.Fj(!b.Fm)
  };
  this.vh.onclick = function () {
    A.i(b.ci)
  };
  this.Wj.onclick = function () {
    if (b.Dc()) {
      var a = b.kl.value;
      '' == a && (a = null);
      y.i(b.Jp, {
        name: b.$e.value,
        password: a,
        qs: b.ai.selectedIndex + 2,
        Ks: b.Fm
      })
    }
  };
  for (a = 2; 21 > a;) c = window.document.createElement('option'),
    c.textContent = '' + a++,
    this.ai.appendChild(c);
  this.ai.selectedIndex = 10;
  this.Fj(!1);
  this.C()
}
function jb() {
  this.g = v.Ga(jb.N);
  var a = v.Ea(this.g);
  this.dc = a.get('log');
  this.vh = a.get('cancel')
}
function kb(a) {
  a = "DefaultName";
  function b() {
    c.Dc() && null != c.cl && c.cl(c.Cb.value);
  }
  var c = this;
}
function lb(a, b) {
  this.Hj = [
  ];
  this.Iq = /[#@][^\s@#]*$/;
  this.Mb = a;
  this.Rp = b;
  a.hidden = !0
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
  this.vg = Ba.cg(this.dc);
  this.gb = c.get('input');
  this.gb.maxLength = 140;
  c.get('send').onclick = a;
  this.Bc = new lb(c.get('autocompletebox'), function (a, c) {
    b.gb.value = a;
    b.gb.setSelectionRange(c, c)
  });
  this.gb.onkeydown = function (c) {
    switch (c.keyCode) {
      case 9:
        b.Bc.Mb.hidden || (b.Bc.qo(), c.preventDefault());
        break;
      case 13:
        a();
        break;
      case 27:
        b.Bc.Mb.hidden ? (b.gb.value = '', b.gb.blur()) : b.Bc.Qh();
        break;
      case 38:
        b.Bc.Qj(- 1);
        break;
      case 40:
        b.Bc.Qj(1)
    }
    c.stopPropagation()
  };
  this.gb.onfocus = function () {
    null != b.ig && b.ig(!0)
  };
  this.gb.onblur = function () {
    null != b.ig && b.ig(!1);
    b.Bc.Qh()
  };
  this.gb.oninput = function () {
    b.Bc.Hn(b.gb.value, b.gb.selectionStart)
  }
}
function mb() {
  this.rf = null;
  var a = this;
  this.g = v.Ga(mb.N);
  var b = v.Ea(this.g);
  b.get('cancel').onclick = function () {
    A.i(a.qb)
  };
  this.wh = b.get('change');
  this.wh.disabled = !0;
  this.wh.onclick = function () {
    null != a.rf && a.Zl(a.rf.index)
  };
  b = b.get('list');
  this.ki(b);
  var c = Ba.cg(b);
  window.setTimeout(function () {
    c.update()
  }, 0)
}
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
function R(a, b) {
  for (var c = [
  ], d = 0; d < a.length;) c.push(this.sp(a[d++], b));
  this.We = c
}
function N() {
  this.$c = window.performance.now();
  this.Jg = new Map;
  this.dd = new Map;
  this.zg = 1;
  this.xf = 35;
  this.jf = 0;
  this.kf = 1.5;
  this.Ya = new H(0, 0);
  this.Dk = !1;
  this.td = new Sb;
  this.sa = window.document.createElement('canvas');
  this.sa.mozOpaque = !0;
  this.c = this.sa.getContext('2d', {
    alpha: !1
  });
  getCanvas(this.sa);
  this.Lo = this.c.createPattern(n.Ko, null);
  this.Wn = this.c.createPattern(n.Vn, null);
  this.Un = this.c.createPattern(n.Tn, null)
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
function Z() {
}
function va() {
}
function Fb() {
}
function Vb(a) {
  this.$c = window.performance.now();
  this.sd = this.De = 0;
  var b = this;
  this.ya = a;
  this.j = new ja(a.uc);
  var c = new Gb(this.j);
  c.ri(a.T);
  window.document.addEventListener('keydown', G(this, this.Bd));
  window.document.addEventListener('keyup', G(this, this.Cd));
  window.requestAnimationFrame(G(this, this.bf));
  this.Gh = window.setInterval(function () {
    b.j.pe.hm(b.sd);
    b.sd = 0
  }, 1000);
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
function x() {
}
function u() {
}
function Wb() {
}
function n() {
}
function W() {
  this.Yc = new Map
}
function wa(a, b, c, d) {
  this.w = a;
  this.Ur = d;
  this.Yh = b;
  d = null;
  null != b && (d = b.getItem(a));
  this.Hm = c(d)
}
function Xb() {
}
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
function T() {
  this.ub = '';
  this.Ec = this.Gc = 0
}
function Ra() {
  this.$d = this.Yf = 0;
  window.document.addEventListener('focusout', G(this, this.al))
}
function Gb(a, b) {
  this.Rh = null;
  this.j = a;
  null != b && (this.Rh = '@' + J.replace(b, ' ', '_'))
}
function ba(a) {
  this.Nf = null;
  this.Ik = this.zh = !1;
  this.$c = window.performance.now();
  this.Ed = null;
  this.De = 0;
  this.Jn = new tb(3, 1000);
  this.ob = new Ra;
  this.Bg = 'Waiting for link';
  this.xi = this.am = !1;
  this.sd = 0;
  var b = this;
  this.Of = new ub(a, function (a) {
    b.j.Qa.Gb(a)
  });
  this.ya = a;
  a.T.ko = function (c) {
    b.am != c && (b.am = c, c = ta.la(c), a.ra(c))
  };
  this.j = new ja(a.uc);
  this.Ih = new Gb(this.j, a.T.na(a.uc).w);
  this.Ih.ri(a.T);
  this.j.Qa.fl = G(this, this.Gp);
  this.j.Qa.ig = G(this, this.Fp);
  window.document.addEventListener('keydown', G(this, this.Bd));
  window.document.addEventListener('keyup', G(this, this.Cd));
  window.onbeforeunload = function () {
    return 'Are you sure you want to leave the room?'
  };
  this.ob.ng = function (b) {
    a.ra(b)
  };
  this.j.Wa.aq = function (b) {
    b = da.la(1, b);
    a.ra(b)
  };
  this.j.Wa.Tp = function (b) {
    b = da.la(0, b);
    a.ra(b)
  };
  this.j.og = function (b) {
    b = qa.la(b);
    a.ra(b)
  };
  this.j.Wa.Yp = function () {
    a.ra(new Ma)
  };
  this.j.Wa.Zp = function () {
    a.ra(new La)
  };
  this.j.Wa.Mp = function () {
    b.Bm()
  };
  this.j.Wa.mg = function (b, c) {
    var d = S.la(b, c);
    a.ra(d)
  };
  this.j.Wa.ee = G(this, this.Wq);
  this.j.Wa.Dp = function () {
    a.ra(new Qa)
  };
  this.j.Wa.Pp = function () {
    ba.Bq(a)
  };
  this.j.Wa.$p = function (b) {
    b = pa.la(b);
    a.ra(b)
  };
  this.j.Wa.ff = function (c) {
    var d = a.T.na(c);
    if (null != d) {
      var e = new db(d, b.xi);
      e.qb = function () {
        b.j.bb(null)
      };
      e.Cp = function (b, c) {
        var d = sa.la(b, c);
        a.ra(d)
      };
      e.ei = function () {
        b.vr(d)
      };
      b.j.bb(e.g, function () {
        e.C(a.T, b.xi)
      })
    }
  };
  this.j.Wa.Wp = function () {
    var a = new bb;
    a.qb = function () {
      b.j.bb(null)
    };
    b.j.bb(a.g, function () {
      a.nr(b.Bg)
    })
  };
  this.j.Wa.Qp = function () {
    if (null == b.Ed) b.zr();
    else {
      var a = b.Ed.stop();
      b.Ed = null;
      ba.Yl(a)
    }
    b.j.Wa.rr(null != b.Ed)
  };
  window.requestAnimationFrame(G(this, this.bf));
  this.Gh = window.setInterval(function () {
    b.j.pe.hm(b.sd);
    b.sd = 0
  }, 1000);
  this.Qr = window.setInterval(function () {
    a.C()
  }, 50);
  this.uf();
  var c = n.A.rd.L(),
    c = - 200 > c ? - 200 : 200 < c ? 200 : c;
  if (0 != c) {
    var d = n.A.rd.L();
    //console.log("exp",d);
    a.gm(d);
    this.j.Qa.Gb('Extrapolation set to ' + c + ' msec');
  }
}
function Ha() {
}
function ub(a, b) {
  this.ya = a;
  this.ba = b
}
function Hb() {
}
function tb(a, b) {
  this.Nj = a;
  this.Si = b;
  this.oc = a;
  this.Ve = window.performance.now()
}
function A() {
}
function M() {
}
function Ib(a) {
  this.Yb = a.slice()
}
function Zb() {
}
function $b(a) {
  this.xj = new Map;
  this.Ho = new tb(100, 16);
  this.yg = !1;
  this.yb = 0;
  this.pa = a;
  a = w.ha(8);
  a.s(Math.random());
  this.He = a.Sb()
}
function Lb(a) {
  this.Kj = new Map;
  this.Ib = null;
  this.fg = 32;
  this.Ie = new Map;
  this.ac = [
  ];
  this.wi = 4;
  this.Mn = 600;
  var b = this;
  V.call(this, a.state);
  this.tp = a.ij;
  this.Sr = a.version;
  this.up = 1;
  this.Jk = this.uc = 0;
  this.Li = window.performance.now();
  this.Ic = new Sa(this.tp, a.iceServers, Zb.Km, a.gn);
  this.Ic.Vj = G(this, this.Oo);
  this.Ic.bl = function (a) {
    b.Lp(a)
  };
  this.Ic.kg = function (a) {
    y.i(b.kg, a)
  };
  this.Ic.ef = function (a, d) {
    null != b.ef && b.ef(a, d)
  }
}
function xa(a, b) {
  this.Di = [
  ];
  this.pi = [
  ];
  this.ug = new Ia;
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
          3 != c.pd && y.i(c.df, xb.ih('Connection closed'));
          c.ia()
        };
        a = window.setTimeout(function () {
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
        if (!e && 1 == c.pd && g) A.i(c.Sp),
          d(!0);
        else {
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
function ac(a, b) {
  this.Xm = 0;
  this.version = 1;
  this.ah = 0;
  this.Nd = w.ha(1000);
  this.Df = w.ha(16384);
  var c = this;
  this.version = b;
  var d = this.ah = a.Y;
  this.hj = a;
  a.T.ga(this.Df);
  a.fc = function (b) {
    var e = a.Y;
    c.Df.lb(e - d);
    d = e;
    c.Df.Ub(b.P);
    m.lj(b, c.Df)
  };
  this.Nd.Ub(0);
  var e = this.ah;
  a.T.km(function (b) {
    var d = a.Y;
    c.Nd.lb(d - e);
    c.Nd.l(b);
    c.Xm++;
    e = d
  })
}
function bc() {
}
function Mb(a) {
  this.rs = a;
  this.$a = [
  ]
}
function lc() {
}
function zb() {
}
function v() {
}
function Db(a, b) {
  this.Ja = a;
  this.value = b;
  a.textContent = '' + b
}
function Ca() {
}
function mc() {
}
function Ba() {
}
function Ja() {
}
function I() {
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
      0 >= a ? b.ia() : (window.clearTimeout(b.Am), a = window.setTimeout(c, a + 1000), b.Am = a)
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
      b.wd && (b.ym = window.performance.now(), null != b.lg && b.lg(a.data))
    };
    e.onclose = function () {
      b.ia()
    }
  }
}
function nc() {
}
function Sa(a, b, c, d) {
  this.th = new Set;
  this.If = new Set;
  this.Ag = this.nf = this.dm = !1;
  this.Mc = null;
  this.$ = '';
  this.$q = 50000;
  this.Zq = 10000;
  this.od = new Map;
  this.xr = a;
  this.Vf = b;
  this.In = c;
  this.Dg = d;
  null == this.Dg && (this.Dg = '');
  this.Ji()
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
    null == a.candidate ? d.Vo(d.Uf) : (a = a.candidate, null != a.candidate && '' != a.candidate && (null != d.jg && d.jg(a), d.Uf.push(a)))
  };
  for (b = 0; b < c.length;) this.co(c[b++]);
  this.$ = a
}
function wb(a, b, c, d, e, f) {
  this.rh = this.yh = !1;
  var g = this;
  this.pa = new Va(0, b, d);
  this.pa.bd = function () {
    g.Oe(Ob.jh)
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
function fc(a, b) {
  this.r = new RegExp(a, b.split('u').join(''))
}
function ga() {
  return r.Be(this, '')
}
function G(a, b) {
  if (null == b) return null;
  null == b.oh && (b.oh = rc++);
  var c;
  null == a.ej ? a.ej = {
  }
    : c = a.ej[b.oh];
  null == c && (c = b.bind(a), a.ej[b.oh] = c);
  return c
}
var X;
fc.b = !0;
fc.prototype = {
  match: function (a) {
    this.r.global && (this.r.lastIndex = 0);
    this.r.nc = this.r.exec(a);
    this.r.bh = a;
    return null != this.r.nc
  },
  Wm: function (a) {
    if (null != this.r.nc && 0 <= a && a < this.r.nc.length) return this.r.nc[a];
    throw new q('EReg::matched');
  },
  ps: function () {
    if (null == this.r.nc) throw new q('No string matched');
    return {
      mj: this.r.nc.index,
      ms: this.r.nc[0].length
    }
  },
  os: function (a, b, c) {
    null == c && (c = - 1);
    if (this.r.global) {
      this.r.lastIndex = b;
      this.r.nc = this.r.exec(0 >
        c ? a : D.substr(a, 0, b + c));
      if (b = null != this.r.nc) this.r.bh = a;
      return b
    }
    if (c = this.match(0 > c ? D.substr(a, b, null) : D.substr(a, b, c))) this.r.bh = a,
      this.r.nc.index += b;
    return c
  },
  f: fc
};
Math.b = !0;
var Ob = Ab['bas.basnet.FailReason'] = {
  Gf: !0,
  nh: [
    'PeerFailed',
    'Rejected',
    'Cancelled',
    'Error'
  ],
  jh: {
    nb: 0,
    eb: 'bas.basnet.FailReason',
    toString: ga
  },
  lh: (X = function (a) {
    return {
      nb: 1,
      code: a,
      eb: 'bas.basnet.FailReason',
      toString: ga
    }
  }, X.Ae = [
    'code'
  ], X),
  hh: {
    nb: 2,
    eb: 'bas.basnet.FailReason',
    toString: ga
  },
  Error: {
    nb: 3,
    eb: 'bas.basnet.FailReason',
    toString: ga
  }
};
wb.b = !0;
wb.Do = function (a) {
  switch (a.nb) {
    case 0:
      return 'Failed';
    case 1:
      return pc.description(a.code);
    case 2:
      return '';
    case 3:
      return 'Master connection error'
  }
};
wb.prototype = {
  Gn: function () {
    this.Oe(Ob.hh)
  },
  Uj: function () {
    null != this.X && (this.X.onclose = null, this.X.onmessage = null, this.X.onerror = null, this.X.onopen = null, this.X.close(), this.X = null);
    null != this.pa && (this.pa.ia(), this.pa = null)
  },
  Oe: function (a) {
    null != this.bd && this.bd(a);
    this.Uj()
  },
  Ph: function (a) {
    a = new F(new DataView(a.data));
    var b = a.B();
    0 < a.o.byteLength - a.a && (a = new F(new DataView(pako.inflateRaw(a.sb()).buffer), !1));
    switch (b) {
      case 1:
        for (var b = a.ic(), c = a.wg(), d = [
        ], e = 0; e < c.length;) d.push(new RTCIceCandidate(c[e++]));
        this.Oh(b, d, a);
        break;
      case 4:
        this.Nh(new RTCIceCandidate(a.wg()))
    }
  },
  Oh: function (a, b) {
    var c = this;
    this.pa.Mi(this.rh ? 10000 : 4000);
    this.yh = !0;
    null != this.Zk && this.Zk();
    this.pa.Ra.setRemoteDescription(new RTCSessionDescription({
      sdp: a,
      type: 'answer'
    }), function () {
      for (var a = 0; a < b.length;) c.pa.Ra.addIceCandidate(b[a++])
    }, function () {
      c.Oe(Ob.Error)
    })
  },
  Nh: function (a) {
    this.pa.Ra.addIceCandidate(a)
  },
  Nc: function (a, b) {
    if (null != this.X) {
      var c = w.ha(32, !1);
      c.l(a);
      null != b && c.Vb(pako.deflateRaw(b.Sb()));
      this.X.send(c.Hd())
    }
  },
  Bi: function (a, b, c) {
    var d = w.ha(32, !1);
    d.l(this.rh ? 1 : 0);
    d.mc(a.sdp);
    d.Ng(b);
    null != c && d.Vb(c.Sb());
    this.Nc(1, d)
  },
  yi: function (a) {
    var b = w.ha(32, !1);
    b.Ng(a);
    this.Nc(4, b)
  },
  f: wb
};
Va.b = !0;
Va.prototype = {
  Mi: function (a) {
    null == a && (a = 10000);
    window.clearTimeout(this.re);
    this.re = window.setTimeout(G(this, this.To), a)
  },
  bo: function (a, b) {
    var c = this;
    this.ck(this.Ra.setRemoteDescription(a).then(function () {
      return c.Ra.createAnswer()
    }), b, 500)
  },
  eo: function () {
    this.ck(this.Ra.createOffer(), [
    ], 1000)
  },
  ck: function (a, b, c) {
    var d = this;
    a.then(function (a) {
      return d.Ra.setLocalDescription(a).then(function () {
        return a
      })
    }).then(function (a) {
      function e() {
        return a
      }
      for (var g = 0; g < b.length;) d.yj(b[g++]);
      return lc.Dr(d.Sh, c).then(e, e)
    }).then(function (a) {
      d.di(a)
    })['catch'](function () {
      d.Tf()
    })
  },
  co: function (a) {
    var b = this,
      c = {
        id: this.Vc.length,
        negotiated: !0,
        ordered: a.kj
      };
    a.reliable || (c.maxRetransmits = 0);
    a = this.Ra.createDataChannel(a.name, c);
    a.binaryType = 'arraybuffer';
    a.onopen = function () {
      for (var a = 0, c = b.Vc; a < c.length;) if ('open' != c[a++].readyState) return;
      null != b.zd && b.zd()
    };
    a.onclose = function () {
      b.Tf()
    };
    a.onmessage = function () {
      b.Tf()
    };
    this.Vc.push(a)
  },
  yj: function (a) {
    var b = this;
    window.setTimeout(function () {
      return b.Ra.addIceCandidate(a)
    }, this.ak)
  },
  To: function () {
    this.Tf()
  },
  Tf: function () {
    null != this.bd && this.bd();
    this.ia()
  },
  ia: function () {
    this.Tj();
    this.Ra.close()
  },
  Tj: function () {
    window.clearTimeout(this.re);
    this.di = this.zd = this.jg = this.bd = null;
    this.Ra.onicecandidate = null;
    this.Ra.ondatachannel = null;
    this.Ra.onsignalingstatechange = null;
    this.Ra.oniceconnectionstatechange = null;
    for (var a = 0, b = this.Vc; a < b.length;) {
      var c = b[a];
      ++a;
      c.onopen = null;
      c.onclose = null;
      c.onmessage = null
    }
  },
  f: Va
};
var gc = Ab['bas.basnet.ConnectionRequestResponse'] = {
  Gf: !0,
  nh: [
    'Accept',
    'Reject'
  ],
  hn: {
    nb: 0,
    eb: 'bas.basnet.ConnectionRequestResponse',
    toString: ga
  },
  kh: (X = function (a) {
    return {
      nb: 1,
      reason: a,
      eb: 'bas.basnet.ConnectionRequestResponse',
      toString: ga
    }
  }, X.Ae = [
    'reason'
  ], X)
};
Sa.b = !0;
Sa.vk = function (a) {
  try {
    var b = nc.gf(a.candidate);
    if ('srflx' == b.Jr) return b.Xo
  } catch (c) {
  }
  return null
};
Sa.prototype = {
  ia: function () {
    window.clearTimeout(this.Ul);
    window.clearTimeout(this.ke);
    this.ke = null;
    window.clearInterval(this.ol);
    this.X.onmessage = null;
    this.X.onerror = null;
    this.X.onclose = null;
    this.X.onopen = null;
    this.X.close();
    this.X = null;
    this.qk()
  },
  Fi: function (a) {
    var b = this;
    if (null != this.Mc || null != a) {
      if (null != this.Mc && null != a && this.Mc.byteLength == a.byteLength) {
        for (var c = new Uint8Array(this.Mc), d = new Uint8Array(a), e = !1, f = 0, g = this.Mc.byteLength; f < g;) {
          var k = f++;
          if (c[k] != d[k]) {
            e = !0;
            break
          }
        }
        if (!e) return
      }
      this.Mc = a.slice(0);
      this.Ag = !0;
      null != this.X && 1 == this.X.readyState && null == this.ke && (this.Ai(), this.ke = window.setTimeout(function () {
        b.ke = null;
        1 == b.X.readyState && b.Ag && b.Ai()
      }, 10000))
    }
  },
  Ei: function (a) {
    function b() {
      null != c.X && 1 == c.X.readyState && c.nf != c.dm && c.cm();
      c.Ql = null
    }
    var c = this;
    this.nf = a;
    null == this.Ql && (b(), this.Ql = window.setTimeout(b, 1000))
  },
  Ji: function (a) {
    function b(a) {
      a = a.sitekey;
      if (null == a) throw new q(null);
      null != d.ef && d.ef(a, function (a) {
        d.Ji(a)
      })
    }
    function c(a) {
      var b = a.url;
      if (null == b) throw new q(null);
      a = a.token;
      if (null == a) throw new q(null);
      d.X = new WebSocket(b +
        '?token=' + a);
      d.X.binaryType = 'arraybuffer';
      d.X.onopen = function () {
        d.So()
      };
      d.X.onclose = function (a) {
        d.Mh(4001 != a.code)
      };
      d.X.onerror = function () {
        d.Mh(!0)
      };
      d.X.onmessage = G(d, d.Ph)
    }
    null == a && (a = '');
    var d = this;
    M.zl(this.xr, 'token=' + this.Dg + '&rcr=' + a, M.vj).then(function (a) {
      switch (a.action) {
        case 'connect':
          c(a);
          break;
        case 'recaptcha':
          b(a)
      }
    })['catch'](function () {
      d.Mh(!0)
    })
  },
  So: function () {
    var a = this;
    null != this.Mc && this.Ai();
    0 != this.nf && this.cm();
    this.ol = window.setInterval(function () {
      a.zi()
    }, 40000)
  },
  Ph: function (a) {
    a = new F(new DataView(a.data), !1);
    switch (a.B()) {
      case 1:
        this.Oh(a);
        break;
      case 4:
        this.Nh(a);
        break;
      case 5:
        this.No(a);
        break;
      case 6:
        this.Qo(a)
    }
  },
  Oh: function (a) {
    var b = a.hb(),
      c = U.Zr(a.sb(a.B())),
      d,
      e,
      f;
    try {
      a = new F(new DataView(pako.inflateRaw(a.sb()).buffer), !1);
      d = 0 != a.B();
      e = a.ic();
      for (var g = a.wg(), k = [
      ], l = 0; l < g.length;) k.push(new RTCIceCandidate(g[l++]));
      f = k
    } catch (t) {
      this.sf(b, 0);
      return
    }
    this.Ro(b, c, e, f, a, d)
  },
  Ro: function (a, b, c, d, e, f) {
    var g = this;
    if (16 <= this.od.size) this.sf(a, 4104);
    else if (this.th.has(b)) this.sf(a, 4102);
    else {
      for (var k = [
      ], l = 0; l < d.length;) {
        var t = Sa.vk(d[l++]);
        if (null != t) {
          if (this.If.has(t)) {
            this.sf(a, 4102);
            return
          }
          k.push(t)
        }
      }
      if (null != this.Vj && (l = new F(e.o), l.a = e.a, e = this.Vj(b, l), 1 == e.nb)) {
        this.sf(a, e.reason);
        return
      }
      var h = new Va(a, this.Vf, this.In);
      f && (h.ak = 2500);
      h.oe = k;
      h.gd = b;
      this.od.set(a, h);
      h.bd = function () {
        g.Nc(0, h, null);
        g.od['delete'](h.$)
      };
      h.zd = function () {
        g.od['delete'](h.$);
        g.Nc(0, h, null);
        null != g.bl && g.bl(new Nb(h))
      };
      h.di = function (a) {
        g.Bi(h, a, h.Uf, null);
        h.Sh.then(function () {
          g.Nc(0, h, null)
        });
        h.jg = function (a) {
          g.yi(h, a)
        }
      };
      h.Mi();
      h.bo(new RTCSessionDescription({
        sdp: c,
        type: 'offer'
      }), d)
    }
  },
  Nh: function (a) {
    var b = a.hb(),
      c;
    try {
      a = new F(new DataView(pako.inflateRaw(a.sb()).buffer), !1),
        c = new RTCIceCandidate(a.wg())
    } catch (d) {
      return
    }
    this.Mo(b, c)
  },
  Mo: function (a, b) {
    var c = this.od.get(a);
    if (null != c) {
      var d = Sa.vk(b);
      if (null != d && (c.oe.push(d), this.If.has(d))) return;
      c.yj(b)
    }
  },
  No: function (a) {
    this.$ = a.ie(a.B());
    null != this.kg && this.kg(this.$)
  },
  Qo: function (a) {
    this.Dg = a.ie(a.o.byteLength - a.a)
  },
  Nc: function (a, b, c) {
    if (!b.hl) {
      0 ==
        a && (b.hl = !0);
      b = b.$;
      var d = w.ha(32, !1);
      d.l(a);
      d.tb(b);
      null != c && d.Vb(pako.deflateRaw(c.Sb()));
      this.X.send(d.Hd())
    }
  },
  sf: function (a, b) {
    var c = w.ha(16, !1);
    c.l(0);
    c.tb(a);
    c.Ub(b);
    this.X.send(c.Hd())
  },
  zi: function () {
    var a = w.ha(1, !1);
    a.l(8);
    this.X.send(a.Hd())
  },
  Ai: function () {
    this.Ag = !1;
    var a = w.ha(256, !1);
    a.l(7);
    null != this.Mc && a.Mg(this.Mc);
    this.X.send(a.Hd())
  },
  cm: function () {
    var a = w.ha(2, !1);
    a.l(9);
    a.l(this.nf ? 1 : 0);
    this.X.send(a.Hd());
    this.dm = this.nf
  },
  Bi: function (a, b, c, d) {
    var e = w.ha(32, !1);
    e.mc(b.sdp);
    e.Ng(c);
    null != d && e.Vb(d.Sb());
    this.Nc(1, a, e)
  },
  yi: function (a, b) {
    var c = w.ha(32, !1);
    c.Ng(b);
    this.Nc(4, a, c)
  },
  qk: function () {
    for (var a = this.od.values(), b = a.next(); !b.done;) {
      var c = b.value,
        b = a.next();
      c.ia()
    }
    this.od.clear()
  },
  Mh: function (a) {
    var b = this;
    this.qk();
    window.clearTimeout(this.ke);
    this.ke = null;
    this.Ag = !1;
    window.clearInterval(this.ol);
    window.clearTimeout(this.Ul);
    a && (this.Ul = window.setTimeout(function () {
      b.Ji()
    }, this.Zq + Math.random() * this.$q | 0))
  },
  zn: function (a) {
    for (var b = 0, c = a.oe; b < c.length;) this.If.add(c[b++]);
    null != a.gd && this.th.add(a.gd);
    return {
      Rs: a.oe,
      Ps: a.gd
    }
  },
  Ud: function () {
    this.If.clear();
    this.th.clear()
  },
  f: Sa
};
nc.b = !0;
nc.gf = function (a) {
  a = a.split(' ');
  if ('typ' != a[6]) throw new q(null);
  return {
    Jr: a[7],
    Xo: a[4]
  }
};
Nb.b = !0;
Nb.prototype = {
  Br: function () {
    return window.performance.now() - this.ym
  },
  Rb: function (a, b) {
    if (this.wd) {
      var c = this.Vc[a];
      if ('open' == c.readyState) {
        var d = b.Kg();
        try {
          c.send(d)
        } catch (e) {
          window.console.log(e instanceof q ? e.Ta : e)
        }
      }
    }
  },
  ia: function () {
    window.clearTimeout(this.Am);
    this.wd && (this.wd = !1, this.Ra.close(), null != this.cf && this.cf())
  },
  f: Nb
};
var pc = {
  b: !0,
  description: function (a) {
    switch (a) {
      case 4001:
        return 'The room was closed.';
      case 4100:
        return 'The room is full.';
      case 4101:
        return 'Wrong password.';
      case 4102:
        return 'You are banned from this room.';
      case 4103:
        return 'Incompatible game version.';
      default:
        return 'Connection closed (' + a + ')'
    }
  }
};
I.b = !0;
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
I.Rr = function (a, b) {
  try {
    var c = new F(new DataView(a.buffer, a.byteOffset, a.byteLength), !1);
    c.B();
    var d = c.sb(c.Ob()),
      e = c.sb(),
      f = new F(new DataView(d.buffer, d.byteOffset, d.byteLength), !1),
      g = f.ic(),
      k = f.ic(),
      l = f.sb();
    if (l.byteLength != b.byteLength) return Promise.reject(null);
    for (var c = 0, t = l.byteLength; c <
      t;) {
      var h = c++;
      if (l[h] != b[h]) return Promise.reject(null)
    }
    return I.Wr(g, k).then(function (a) {
      return window.crypto.subtle.verify(I.mm, a, e, d)
    }).then(function (a) {
      if (!a) throw new q(null);
      return g
    })
  } catch (jc) {
    return Promise.reject(jc instanceof q ? jc.Ta : jc)
  }
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
I.Wr = function (a, b) {
  try {
    return window.crypto.subtle.importKey('jwk', {
      crv: 'P-256',
      ext: !0,
      key_ops: [
        'verify'
      ],
      kty: 'EC',
      x: a,
      y: b
    }, I.qh, !0, [
      'verify'
    ])
  } catch (c) {
    return Promise.reject(c instanceof q ? c.Ta : c)
  }
};
I.prototype = {
  Ir: function () {
    return 'idkey.' + this.Yi + '.' + this.Zi + '.' + this.Zj
  },
  wr: function (a) {
    try {
      var b = w.ha(1024);
      b.l(1);
      var c = b.a;
      b.Ub(0);
      var d = b.a;
      b.mc(this.Yi);
      b.mc(this.Zi);
      b.Vb(a);
      var e = b.a - d;
      b.o.setUint16(c, e, b.Sa);
      var f = new Uint8Array(b.o.buffer, b.o.byteOffset + d, e);
      return window.crypto.subtle.sign(I.mm, this.Al, f).then(function (a) {
        b.Mg(a);
        return b.Sb()
      })
    } catch (g) {
      return Promise.reject(g instanceof q ? g.Ta : g)
    }
  },
  f: I
};
Ja.b = !0;
Ja.gp = function () {
  if (null != Ja.li) return Ja.li;
  Ja.li = new Promise(function (a, b) {
    var c = window.grecaptcha;
    null != c ? a(c) : (c = window.document.createElement('script'), c.src = 'https://www.google.com/recaptcha/api.js?onload=___recaptchaload&render=explicit', window.document.head.appendChild(c), window.___recaptchaload = function () {
      a(window.grecaptcha)
    }, c.onerror = function () {
      b(null)
    })
  });
  return Ja.li
};
Ba.b = !0;
Ba.cg = function (a) {
  // CHECKPOINT overwrite bo nie mogę perfectscrollbara
  return true;
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
Ca.b = !0;
Ca.ar = function (a, b) {
  Ca.Xl(new Blob([a], {
    type: 'octet/stream'
  }), b)
};
Ca.br = function (a, b) {
  Ca.Xl(new Blob([a], {
    type: 'text/plain'
  }), b)
};
Ca.Xl = function (a, b) {
  var c = window.document.createElement('a');
  c.style.display = 'display: none';
  window.document.body.appendChild(c);
  var d = URL.createObjectURL(a);
  c.href = d;
  c.download = b;
  c.click();
  URL.revokeObjectURL(d);
  c.remove()
};
Db.b = !0;
Db.prototype = {
  set: function (a) {
    this.value !=
      a && (this.value = a, this.Ja.textContent = '' + this.value)
  },
  f: Db
};
v.b = !0;
v.Ea = function (a) {
  var b = new Map,
    c = 0;
  for (a = a.querySelectorAll('[data-hook]'); c < a.length;) {
    var d = a[c++];
    b.set(d.getAttribute('data-hook'), d)
  }
  return b
};
v.Ga = function (a, b) {
  null == b && (b = 'div');
  var c = window.document.createElement(b);
  c.innerHTML = a;
  return c.firstElementChild
};
v.xe = function (a, b) {
  a.parentElement.replaceChild(b, a)
};
v.Cf = function (a) {
  for (var b = a.firstChild; null != b;) a.removeChild(b),
    b = a.firstChild
};
zb.b = !0;
zb.eh = function (a) {
  return new Promise(function (b, c) {
    a.onsuccess = function () {
      b(a.result)
    };
    a.onerror = c
  })
};
lc.b = !0;
lc.Dr = function (a, b) {
  return new Promise(function (c, d) {
    var e = window.setTimeout(function () {
      d('Timed out')
    }, b);
    a.then(function (a) {
      window.clearTimeout(e);
      c(a)
    }, function (a) {
      window.clearTimeout(e);
      d(a)
    })
  })
};
Mb.b = !0;
Mb.prototype = {
  add: function (a) {
    for (var b = this.$a.length, c = 0, d = this.Qd = 0; d < b;) {
      var e = d++,
        f = this.$a[e];
      f.index++;
      f.weight *= 0.97;
      this.$a[c].index < f.index && (c = e);
      this.Qd += f.weight
    }
    b >= this.rs ? (b = this.$a[c], this.Qd -= b.weight, this.$a.splice(c, 1)) : b = new bc;
    b.value = a;
    b.weight = 1;
    b.index = 0;
    this.Qd += b.weight;
    for (a = 0; a < this.$a.length && this.$a[a].value <= b.value;) ++a;
    this.$a.splice(a, 0, b)
  },
  $g: function (a) {
    if (0 == this.$a.length) return 0;
    if (1 == this.$a.length) return this.$a[0].value;
    a *= this.Qd;
    for (var b = this.$a[0].weight, c = 0; c < this.$a.length - 1 && !(b >= a);) ++c,
      b += this.$a[c].weight;
    return this.$a[c].value
  },
  max: function () {
    return 0 == this.$a.length ? 0 : this.$a[this.$a.length - 1].value
  },
  f: Mb
};
bc.b = !0;
bc.prototype = {
  f: bc
};
ac.b = !0;
ac.prototype = {
  stop: function () {
    this.hj.fc = null;
    this.hj.T.km(null);
    this.Nd.o.setUint16(0, this.Xm, this.Nd.Sa);
    this.Nd.Vb(this.Df.Sb());
    var a = pako.deflateRaw(this.Nd.Sb()),
      b = w.ha(a.byteLength + 32);
    b.Og('HBR2');
    b.tb(this.version);
    b.tb(this.hj.Y - this.ah);
    b.Vb(a);
    return b.Sb()
  },
  f: ac
};
var xb = Ab['bas.marf.net.ConnFailReason'] = {
  Gf: !0,
  nh: [
    'Cancelled',
    'PeerFailed',
    'Rejected',
    'Other'
  ],
  hh: {
    nb: 0,
    eb: 'bas.marf.net.ConnFailReason',
    toString: ga
  },
  jh: {
    nb: 1,
    eb: 'bas.marf.net.ConnFailReason',
    toString: ga
  },
  lh: (X = function (a) {
    return {
      nb: 2,
      reason: a,
      eb: 'bas.marf.net.ConnFailReason',
      toString: ga
    }
  }, X.Ae = [
    'reason'
  ], X),
  ih: (X = function (a) {
    return {
      nb: 3,
      description: a,
      eb: 'bas.marf.net.ConnFailReason',
      toString: ga
    }
  }, X.Ae = [
    'description'
  ], X)
};
xa.b = !0;
xa.xh = function (a) {
  switch (a.nb) {
    case 0:
      return 'Cancelled';
    case 1:
      return 'Failed to connect to peer.';
    case 2:
      return pc.description(a.reason);
    case 3:
      return a.description
  }
};
xa.ma = V;
xa.prototype = C(V.prototype, {
  ia: function (a) {
    null != this.pc && (this.pc.bd = null, this.pc.Gn(), this.pc = null);
    window.clearTimeout(this.re);
    null != this.pa && (this.pa.cf = null, this.pa.ia(), this.pa = null);
    this.ek = null == a ? 'Connection closed' : a;
    this.tf(4)
  },
  tf: function (a) {
    this.pd != a && (this.pd = a, null !=
      this.Ad && this.Ad(a))
  },
  wd: function () {
    return 3 == this.pd
  },
  C: function () {
    this.wd() && window.performance.now() - this.zm > this.nn && this.zi();
    this.Xc = window.performance.now() * this.Ac + this.Qi.$g(0.5) - this.Y;
    this.Oj()
  },
  Sf: function () {
    return this.wd() ? (0 > this.bc && (this.bc = 0), this.wk(window.performance.now() * this.Ac + this.Qi.$g(0.5) - this.Y + this.bc + this.rd, this.ug)) : this.T
  },
  Oj: function () {
    0 > this.Xc && (this.Xc = 0);
    this.Xc > this.Ff && (this.Xc = this.Ff)
  },
  uq: function (a) {
    switch (a.B()) {
      case 0:
        this.rq(a);
        break;
      case 1:
        this.qq(a);
        break;
      case 2:
        this.nq(a);
        break;
      case 3:
        this.wq(a);
        break;
      case 4:
        this.tq(a);
        break;
      case 5:
        this.pq(a);
        break;
      case 6:
        this.vq(a)
    }
  },
  rq: function (a) {
    var b = this;
    a = a.sb(a.Ab());
    var c = Promise.resolve(null);
    null != this.Je && (c = this.Je.wr(a));
    c['catch'](function () {
      return null
    }).then(function (a) {
      b.ir(a)
    })
  },
  qq: function (a) {
    a = pako.inflateRaw(a.sb());
    a = new F(new DataView(a.buffer, a.byteOffset, a.byteLength));
    this.uc = a.Ob();
    this.Y = a.hb();
    this.te = a.hb();
    this.cc = a.Ab();
    this.Xc = 10;
    for (this.T.ja(a); 0 < a.o.byteLength - a.a;) this.Cg(this.Gm(a));
    window.clearTimeout(this.re);
    this.tf(3)
  },
  ir: function (a) {
    var b = w.ha();
    b.l(0);
    null != a ? (b.lb(a.byteLength), b.Vb(a)) : b.lb(0);
    b.lb(this.Uh.byteLength);
    b.Mg(this.Uh);
    this.Rb(b);
    this.Uh = null
  },
  Rb: function (a, b) {
    null == b && (b = 0);
    this.pa.Rb(b, a)
  },
  Gm: function (a) {
    var b = a.hb(),
      c = a.Ab(),
      d = a.Ob(),
      e = a.hb();
    a = m.fh(a);
    a.P = d;
    a.ue = e;
    a.mb = b;
    a.da = c;
    return a
  },
  nq: function (a) {
    a = this.Gm(a);
    this.Cg(a);
    a.P == this.uc && this.ug.Ds(a.ue);
    this.Bl()
  },
  vq: function (a) {
    a = m.fh(a);
    a.P = 0;
    a.ue = 0;
    a.apply(this.T);
    null != this.fc && this.fc(a)
  },
  wq: function (a) {
    var b = a.hb();
    a = a.hb();
    this.pi.push({
      frame: b,
      yf: a
    });
    this.Bl()
  },
  Bl: function () {
    if (3 == this.pd) {
      for (var a = 0, b = this.pi; a < b.length;) {
        var c = b[a];
        ++a;
        c.frame <= this.Y || c.yf == this.te + this.cc + this.le.bs(c.frame) && this.vn(c.frame - this.Y)
      }
      for (var a = 0, b = this.pi, c = 0, d = b.length; c < d;) {
        var e = b[c++];
        e.frame > this.Y && (b[a] = e, ++a)
      }
      for (; b.length > a;) b.pop();
      this.ug.Cs(this.Y)
    }
  },
  pq: function (a) {
    var b = 0 != a.B(),
      c = a.ic(),
      d = '';
    0 < a.o.byteLength - a.a && (d = a.ic());
    a = b ? 'You were banned' : 'You were kicked';
    '' != d && (a += ' by ' + d);
    '' != c && (a += ' (' +
      c + ')');
    this.ia(a)
  },
  tq: function (a) {
    var b = a.u();
    a = a.u();
    var c = window.performance.now() - a;
    this.Qi.add(b - a * this.Ac);
    this.sg.add(c);
    for (var d = b = 0, e = this.Di; d < e.length;) {
      var f = e[d];
      ++d;
      if (f > a) break;
      f < a ? y.i(this.dl, - 1) : y.i(this.dl, c);
      ++b
    }
    this.Di.splice(0, b)
  },
  zi: function () {
    var a = window.performance.now();
    this.zm = a;
    this.Di.push(a);
    var b = this.sg.$g(0.5) | 0,
      c = w.ha();
    c.l(2);
    c.s(a);
    c.lb(b);
    this.Rb(c, 2)
  },
  vn: function (a) {
    this.zj(a);
    this.Xc -= a;
    this.Oj()
  },
  ra: function (a) {
    if (3 == this.pd) {
      var b = this.Ap++,
        c = 0;
      0 > this.bc && (this.bc = 0);
      a.zf.Aa && (c = this.Y + (this.Xc | 0) + this.bc);
      var d = w.ha();
      d.l(1);
      d.tb(c);
      d.tb(b);
      m.lj(a, d);
      this.Rb(d);
      a.zf.Ba && (a.ue = b, a.P = this.uc, a.mb = c, this.ug.Rm(a))
    }
  },
  f: xa
}); Lb.b = !0; Lb.ma = V; Lb.prototype = C(V.prototype, {
  ia: function () {
    this.Ic.ia();
    for (var a = 0, b = this.ac; a < b.length;) {
      var c = b[a++].pa;
      c.cf = null;
      c.lg = null;
      c.ia()
    }
  },
  to: function (a, b, c, d) {
    var e = this.Ie.get(a);
    if (null != e) {
      if (d) {
        var f = this.Ic.zn(e.pa);
        this.Kj.set(a, f)
      }
      a = w.ha();
      a.l(5);
      a.l(d ? 1 : 0);
      a.mc(b);
      null == c && (c = '');
      a.mc(c);
      e.Rb(a);
      e.pa.ia()
    }
  },
  Ud: function () {
    this.Ic.Ud();
    this.Kj.clear()
  },
  Fi: function (a) {
    this.Ic.Fi(a)
  },
  Ei: function (a) {
    this.Ic.Ei(a)
  },
  ra: function (a) {
    a.P = 0;
    var b = this.Y + this.wi + this.bc;
    a.zf.Aa || (b = this.Y);
    a.mb = b;
    this.Cg(a);
    this.Ci();
    0 < this.ac.length && this.Eg(this.Zh(a), 1)
  },
  C: function () {
    var a = ((window.performance.now() - this.Li) * this.Ac | 0) - this.Y;
    0 < a && this.zj(a);
    7 <= this.Y - this.Kk && this.Ci();
    this.Y - this.Jk >= this.Mn && (this.Ci(), this.gr())
  },
  Sf: function () {
    0 > this.bc && (this.bc = 0);
    return this.wk((window.performance.now() - this.Li) * this.Ac - this.Y + this.wi + this.bc + this.rd)
  },
  Oo: function (a, b) {
    if (this.ac.length >= this.fg) return gc.kh(4100);
    try {
      if (b.Ob() != this.Sr) throw new q(null);
    } catch (d) {
      return gc.kh(4103)
    }
    try {
      var c = b.zb();
      if (null != this.Ib && c != this.Ib) throw new q(null);
    } catch (d) {
      return gc.kh(4101)
    }
    return gc.hn
  },
  Lp: function (a) {
    var b = this;
    if (this.ac.length >= this.fg) a.ia();
    else {
      var c = new $b(a);
      this.ac.push(c);
      a.lg = function (a) {
        a = new F(new DataView(a));
        b.oq(a, c)
      };
      a.cf = function () {
        D.remove(b.ac, c);
        b.Ie['delete'](c.$);
        y.i(b.Ip, c.$)
      };
      a = w.ha(1 + c.He.byteLength);
      a.l(0);
      a.lb(c.He.byteLength);
      a.Vb(c.He);
      c.Rb(a)
    }
  },
  Zh: function (a) {
    var b = w.ha();
    b.l(2);
    this.il(a, b);
    return b
  },
  il: function (a, b) {
    b.tb(a.mb);
    b.lb(a.da);
    b.Ub(a.P);
    b.tb(a.ue);
    m.lj(a, b)
  },
  Ci: function () {
    if (!(0 >= this.Y - this.Kk) && 0 != this.ac.length) {
      var a = w.ha();
      a.l(3);
      a.tb(this.Y);
      a.tb(this.te);
      this.Eg(a, 2);
      this.Kk = this.Y
    }
  },
  Eg: function (a, b) {
    null == b && (b = 0);
    for (var c = 0, d = this.ac; c < d.length;) {
      var e = d[c];
      ++c;
      e.yg && e.Rb(a, b)
    }
  },
  hr: function (a) {
    var b = w.ha();
    b.l(1);
    var c = w.ha();
    c.Ub(a.$);
    c.tb(this.Y);
    c.tb(this.te);
    c.lb(this.cc);
    this.T.ga(c);
    for (var d = this.le.list, e = 0, f = d.length; e < f;) this.il(d[e++], c);
    b.Vb(pako.deflateRaw(c.Sb()));
    a.Rb(b)
  },
  gr: function () {
    this.Jk = this.Y;
    if (0 != this.ac.length) {
      var a = new Ua;
      a.mb = this.Y;
      a.da = this.cc++;
      a.P = 0;
      a.Rg = this.T.Ao();
      this.Eg(this.Zh(a))
    }
  },
  yq: function (a, b) {
    var c = this,
      d = a.sb(a.Ab()),
      e = a.sb(a.Ab()),
      f = b.He;
    b.He = null;
    I.Rr(d, f)['catch'](function () {
      return null
    }).then(function (a) {
      try {
        if (- 1 != c.ac.indexOf(b)) {
          b.Ns = a;
          var d = c.up++;
          b.$ = d;
          c.Ie.set(d, b);
          ia.i(c.Hp, d, new F(new DataView(e.buffer, e.byteOffset, e.byteLength), !1));
          b.yg = !0;
          c.hr(b)
        }
      } catch (l) {
        c.xk(b, l instanceof q ? l.Ta : l)
      }
    })
  },
  oq: function (a, b) {
    this.C();
    try {
      if (!b.Ho.Cm()) throw new q(1);
      var c = a.B();
      if (b.yg) switch (c) {
        case 1:
          this.zq(a, b);
          break;
        case 2:
          this.sq(a, b);
          break;
        default:
          throw new q(0);
      } else if (0 == c) this.yq(a, b);
      else throw new q(0);
      if (0 < a.o.byteLength - a.a) throw new q(2);
    } catch (d) {
      this.xk(b, d instanceof q ? d.Ta : d)
    }
  },
  xk: function (a, b) {
    window.console.log(b);
    this.Ie['delete'](a.$);
    D.remove(this.ac, a);
    a.yg && null != this.$k && this.$k(a.$);
    a.pa.ia()
  },
  sq: function (a, b) {
    var c = a.u();
    b.yb = a.Ab();
    var d = w.ha();
    d.l(4);
    d.s((window.performance.now() - this.Li) * this.Ac + this.wi);
    d.s(c);
    b.Rb(d, 2)
  },
  zq: function (a, b) {
    var c = a.hb(),
      d = a.hb(),
      e = m.fh(a),
      f = e.zf.oj;
    if (null != f) {
      var g = b.xj.get(f);
      null == g && (g = new tb(f.$i, f.uj), b.xj.set(f, g));
      if (!g.Cm()) throw new q(3);
    }
    f = this.Y;
    g = this.Y + 120;
    e.ue = d;
    e.P = b.$;
    e.mb = c < f ? f : c > g ? g : c;
    e.$m(this.T) && (this.Cg(e), this.Eg(this.Zh(e), 1))
  },
  f: Lb
}); $b.b = !0; $b.prototype = {
  Rb: function (a, b) {
    null == b && (b = 0);
    this.pa.Rb(b, a)
  },
  f: $b
}; Zb.b = !0; Ib.b = !0; Ib.prototype = {
  eval: function (a) {
    var b = this.Yb.length - 1;
    if (a <= this.Yb[0]) return this.Yb[1];
    if (a >= this.Yb[b]) return this.Yb[b - 2];
    for (var c = 0, b = b / 5 | 0; ;) {
      var d = b + c >>> 1;
      a > this.Yb[5 * d] ? c = d + 1 : b = d - 1;
      if (!(c <= b)) break
    }
    c = 5 * b;
    b = this.Yb[c];
    a = (a - b) / (this.Yb[c + 5] - b);
    b = a * a;
    d = b * a;
    return (2 * d - 3 * b + 1) * this.Yb[c + 1] + (d - 2 * b + a) * this.Yb[c + 2] + (- 2 * d + 3 * b) * this.Yb[c + 3] + (d - b) * this.Yb[c + 4]
  },
  f: Ib
}; M.b = !0; M.Pl = function (a, b, c, d, e) {
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
}; M.L = function (a, b) {
  return M.Pl(a, 'GET', b, null)
}; M.tk = function (a) {
  return M.L(a, 'json').then(function (a) {
    var b = a.error;
    if (null != b) throw new q(b);
    return a.data
  })
}; M.mq = function (a, b, c) {
  return M.Pl(a, 'POST', 'json', b, c)
}; M.zl = function (a, b, c) {
  return M.mq(a, b, c).then(function (a) {
    var b = a.error;
    if (null != b) throw new q(b);
    return a.data
  })
}; A.b = !0; A.i = function (a) {
  null != a && a()
}; tb.b = !0; tb.prototype = {
  Cm: function (a) {
    null == a && (a = 1);
    this.C();
    return a <= this.oc ? (this.oc -= a, !0) : !1
  },
  Cr: function (a) {
    this.C();
    a -= this.oc;
    return 0 >= a ? 0 : this.Ve + a * this.Si - window.performance.now()
  },
  Zn: function (a, b) {
    var c = this.Cr(a);
    this.oc -= a;
    window.setTimeout(b, c | 0)
  },
  C: function () {
    var a = window.performance.now(),
      b = Math.floor((a - this.Ve) / this.Si);
    this.Ve += b * this.Si;
    this.oc += b;
    this.oc >= this.Nj && (this.oc = this.Nj, this.Ve = a)
  },
  f: tb
}; Hb.b = !0; Hb.gf = function (a) {
  var b = new fc('([^&=]+)=?([^&]*)', 'g');
  a = a.substring(1);
  for (var c = 0, d = new Map; b.os(a, c);) {
    var c = b.Wm(1),
      c = decodeURIComponent(c.split('+').join(' ')),
      e = b.Wm(2);
    d.set(c, decodeURIComponent(e.split('+').join(' ')));
    c = b.ps();
    c = c.mj + c.ms
  }
  return d
}; Hb.L = function () {
  //console.log(window.top.location);
  return Hb.gf("")
}; ub.b = !0; ub.cq = function (a) {
  if (3 > a.length) throw new q('Not enough arguments');
  if (7 < a.length) throw new q('Too many arguments');
  var b = new Pa,
    c = new ka;
  b.Sg = c;
  switch (a[1]) {
    case 'blue':
      c.fb = [
        p.xa.R
      ];
      b.ea = p.xa;
      break;
    case 'red':
      c.fb = [
        p.fa.R
      ];
      b.ea = p.fa;
      break;
    default:
      throw new q('First argument must be either "red" or "blue"');
  }
  if ('clear' == a[2]) return b;
  c.hd = 256 * K.parseInt(a[2]) / 360 | 0;
  c.ed = K.parseInt('0x' + a[3]);
  if (4 < a.length) {
    c.fb = [
    ];
    for (var d = 4, e = a.length; d < e;) c.fb.push(K.parseInt('0x' + a[d++]))
  }
  return b
};
ub.prototype = {
  gf: function (a) {
    var b = this;
    if ('/' != a.charAt(0)) return !1;
    if (1 == a.length) return !0;
    a = J.Gs(D.substr(a, 1, null)).split(' ');
    var c = a[0];
    switch (c) {
      case 'avatar':
        2 == a.length && (this.fm(a[1]), this.ba('Avatar set'));
        break;
      case 'checksum':
        var d = this.ya.T.S;
        a = d.w;
        d.Pe() ? this.ba('Current stadium is original: "' + a + '"') : (d = J.Vg(d.Sj(), 8), this.ba('Stadium: "' + a + '" (checksum: ' + d + ')'));
        break;
      case 'clear_avatar':
        this.fm(null);
        this.ba('Avatar cleared');
        break;
      case 'clear_bans':
        null == this.Ud ? this.ba('Only the host can clear bans') : (this.Ud(), this.ba('All bans have been cleared'));
        break;
      case 'clear_password':
        null == this.Fg ? this.ba('Only the host can change the password') : (this.Fg(null), this.ba('Password cleared'));
        break;
      case 'colors':
        try {
          d = ub.cq(a),
            this.ya.ra(d)
        } catch (g) {
          a = g instanceof q ? g.Ta : g,
            'string' == typeof a && this.ba(a)
        }
        break;
      case 'extrapolation':
        2 == a.length ? (a = K.parseInt(a[1]), null != a && - 200 <= a && 200 >= a ? (n.A.rd.Xa(a), this.ya.gm(a), this.ba('Extrapolation set to ' + a + ' msec')) : this.ba('Extrapolation must be a value between -200 and 50 milliseconds')) : this.ba('Extrapolation requires a value in milliseconds.');
        break;
      case 'handicap':
        2 == a.length ? (a = K.parseInt(a[1]), null != a && 0 <= a && 300 >= a ? (this.ya.kr(a), this.ba('Ping handicap set to ' + a + ' msec')) : this.ba('Ping handicap must be a value between 0 and 300 milliseconds')) : this.ba('Ping handicap requires a value in milliseconds.');
        break;
      case 'kick_ratelimit':
        if (4 > a.length) this.ba('Usage: /kick_ratelimit <min> <rate> <burst>');
        else {
          var d = K.parseInt(a[1]),
            e = K.parseInt(a[2]);
          a = K.parseInt(a[3]);
          null == d || null == e || null == a ? this.ba('Invalid arguments') : this.ya.ra(ma.la(d, e, a))
        }
        break;
      case 'recaptcha':
        if (null == this.jm) this.ba('Only the host can set recaptcha mode');
        else try {
          if (2 == a.length) {
            switch (a[1]) {
              case 'off':
                e = !1;
                break;
              case 'on':
                e = !0;
                break;
              default:
                throw new q(null);
            }
            this.jm(e);
            this.ba('Room join Recaptcha ' + (e ? 'enabled' : 'disabled'))
          } else throw new q(null);
        } catch (g) {
          this.ba('Usage: /recaptcha <on|off>')
        }
        break;
      case 'set_password':
        2 == a.length && (null == this.Fg ? this.ba('Only the host can change the password') : (this.Fg(a[1]), this.ba('Password set')));
        break;
      case 'store':
        var f = this.ya.T.S;
        f.Pe() ? this.ba('Can\'t store default stadium.') : Z.Es().then(function () {
          return Z.add(f)
        }).then(function () {
          b.ba('Stadium stored')
        }, function () {
          b.ba('Couldn\'t store stadium')
        });
        break;
      default:
        this.ba('Unrecognized command: "' + c + '"')
    }
    return !0
  },
  fm: function (a) {
    null != a && (a = U.Qc(a, 2));
    n.A.sh.Xa(a);
    this.ya.ra(ra.la(a))
  },
  f: ub
};
Ha.b = !0;
ba.b = !0;
ba.Yl = function (a) {
  var b = new Date;
  Ca.ar(a, 'HBReplay-' + b.getFullYear() + '-' + J.Af('' + (b.getMonth() + 1)) + '-' + J.Af('' + b.getDate()) + '-' + J.Af('' + b.getHours()) + 'h' + J.Af('' + b.getMinutes()) + 'm.hbr2')
};
ba.Bq = function (a) {
  for (var b = a.T.I, c = [
  ], d = 0, e = 0, f = 0; f < b.length;) {
    var g = b[f];
    ++f;
    g.ea == p.Ia && c.push(g.V);
    g.ea ==
      p.fa ? ++d : g.ea == p.xa && ++e
  }
  f = c.length;
  0 != f && (b = function () {
    return c.splice(Math.random() * c.length | 0, 1)[0]
  }, e == d ? 2 > f || (a.ra(S.la(b(), p.fa)), a.ra(S.la(b(), p.xa))) : (d = e > d ? p.fa : p.xa, a.ra(S.la(b(), d))))
};
ba.prototype = {
  zr: function () {
    this.Ed = new ac(this.ya, 3)
  },
  vr: function (a) {
    var b = this;
    a = new gb(a);
    a.qb = function () {
      b.j.bb(null)
    };
    a.ei = function (a, d, e) {
      b.ya.ra(Y.la(a, d, e));
      b.j.bb(null)
    };
    this.j.bb(a.g)
  },
  ia: function () {
    window.document.removeEventListener('keydown', G(this, this.Bd));
    window.document.removeEventListener('keyup', G(this, this.Cd));
    window.onbeforeunload = null;
    window.cancelAnimationFrame(this.De);
    this.ob.ia();
    window.clearInterval(this.Gh);
    window.clearInterval(this.Qr);
    window.clearTimeout(this.Nf)
  },
  Wq: function (a) {
    for (var b = [
    ], c = 0, d = this.ya.T.I; c < d.length;) {
      var e = d[c];
      ++c;
      e.ea == a && b.push(S.la(e.V, p.Ia))
    }
    for (a = 0; a < b.length;) this.ya.ra(b[a++])
  },
  bf: function () {
    this.De = window.requestAnimationFrame(G(this, this.bf));
    this.ob.C();
    this.ya.C();
    this.Kc()
  },
  Kc: function () {
    var a = window.performance.now();
    1 == n.A.Fh.L() && 28.333333333333336 >
      a - this.$c || (this.$c = a, this.sd++, this.uf(), a = this.ya.T.na(this.ya.uc), null != a && (this.xi = a.cb), this.j.C(this.ya))
  },
  Gp: function (a) {
    var b = this;
    this.Of.gf(a) || this.Jn.Zn(1, function () {
      var c = new Na;
      c.Tc = a;
      b.ya.ra(c)
    })
  },
  Fp: function (a) {
    var b = this;
    this.zh = a;
    null == this.Nf && (this.Nf = window.setTimeout(function () {
      b.Nf = null;
      b.bm(b.zh)
    }, 1000), this.bm(this.zh))
  },
  bm: function (a) {
    a != this.Ik && (this.ya.ra(na.la(a ? 0 : 1)), this.Ik = a)
  },
  Bm: function () {
    if (null != this.ya.T.K) {
      var a = new Oa;
      a.Bf = 120 != this.ya.T.K.Oa;
      this.ya.ra(a)
    }
  },
  Bd: function (a) {
    switch (a.keyCode) {
      case 9:
      case 13:
        this.j.Qa.gb.focus();
        a.preventDefault();
        break;
      case 27:
        if (this.j.Zo()) this.j.bb(null);
        else {
          var b = this.j;
          b.me(!b.Gd)
        }
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
        n.A.Tb.Xa(0);
        break;
      case 80:
        this.Bm();
        break;
      default:
        this.ob.Bd(a.code)
    }
  },
  uf: function () {
    var a = n.A.Tb.L(),
      b = this.j.Fb,
      c = b.Eb;
    c.zg = n.A.Sl.L();
    0 == a ? (b.Gg(!0), c.kf = 1, c.jf = 0, c.xf = 0) : (b.Gg(!1), c.xf = 35, - 1 == a ? c.jf = 450 : (c.jf = 0, c.kf = 1 + 0.25 * (a - 1)))
  },
  Cd: function (a) {
    this.ob.Cd(a.code)
  },
  f: ba
};
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
    var c = this,
      handlers = {};
    removeRoomListener(a, this.roomHandlers); // ponowne ri dawniej nadpisywało pola
    this.Ti(a);
    handlers.tl = function (b) {
      c.j.Qa.Gb('' + b.w + ' has joined');
      n.Na.cd(n.Na.$o);
      //console.log("wejscie",b, a);
      c.Ti(a)
    };
    handlers.ul = function (d, e, f, g) {
      y.i(c.Op, d.V);
      null == e ? d = '' + d.w + ' has left' : (vb.i(c.Np, d.V, e, null != g ? g.w : null, f), d = '' + d.w + ' was ' + (f ? 'banned' : 'kicked') + b(g) + ('' != e ? ' (' + e + ')' :
        ''));
      c.j.Qa.Gb(d);
      n.Na.cd(n.Na.ep);
      c.Ti(a)
    };
    handlers.rl = function (a, b) {
      var d = null != c.Rh && - 1 != b.indexOf(c.Rh);
      c.j.Qa.ba('' + a.w + ': ' + b, d ? 'highlight' : null);
      n.A.om.L() && d ? n.Na.cd(n.Na.zk) : n.A.Hi.L() && n.Na.cd(n.Na.Rj)
    };
    handlers.Vl = function (a, b, f, g) {
      c.j.Qa.pp(a, b, f);
      if (n.A.Hi.L()) switch (g) {
        case 1:
          n.Na.cd(n.Na.Rj);
          break;
        case 2:
          n.Na.cd(n.Na.zk)
      }
    };
    handlers.ji = function () {
      n.Na.cd(n.Na.bp);
      //console.log("kick",n);
    };
    handlers.Ni = function (a) {
      n.Na.cd(n.Na.Io);
      var b = c.j.Fb.Eb.td;
      if (playSounds) b.Pa(a == p.fa ? b.Fq : b.Bn);
      //console.log("Tu niby gol", match[match.length-1].goals/*a,b,c.j.Fb.xc.Ke,d,e,f,g,h,i,j,k*/);
      //console.log("GOOOOOOOOOOOOOOOOOOOOOOOOOOOOL",kicker.name, kicker.team, lastKicker.name, match[match.length-1].scoreRed, match[match.length-1].scoreBlue);
      //console.log(ha.Wk(20494*16.6666666666666));
      // console.log(c.j.Fb.Eb.Ya);
      // console.log(this.K.Ma.K.ta.F[0].a); - BALL COORDINATES
    };
    handlers.Oi = function (a) {
      //console.log("Ktoś wygrał");
      var b = c.j.Fb.Eb.td;
      if (playSounds) b.Pa(a == p.fa ? b.Gq : b.Cn);
      //console.log("kuniec",match[match.length-1].gameTicks);
      c.j.Qa.Gb('' + a.w + ' team won the match')
    };
    handlers.ml = function (a, e, f) {
      e && !f && c.j.Qa.Gb('Game paused' + b(a))
    };
    handlers.Pi = function () {
      var a = c.j.Fb.Eb.td;
      //console.log("kuniec",match[match.length-1].gameTicks);
      if (playSounds) a.Pa(a.Ar)
    };
    handlers.Ki = function (a) {
      c.j.me(!1);
      c.j.Fb.Eb.td.Nn();
      //console.log("game started", a, b, c);
      c.j.Qa.Gb('Game started' + b(a))
    };
    handlers.vf = function (a) {
      //console.log("Game stopped");
      null != a && c.j.Qa.Gb('Game stopped' + b(a))
    };
    handlers.Ii = function (a, e) {
      if (!e.Pe()) {
        var d = J.Vg(e.Sj(), 8);
        //console.log("stadium loaded",a,e);
        c.j.Qa.Gb('Stadium "' + e.w + '" (' + d + ') loaded' + b(a))
      }
    };
    handlers.sl = function (a) {
      c.j.Qa.Gb('' + a.w + ' ' + (a.Ld ? 'has desynchronized' : 'is back in sync'))
    };
    handlers.xl = function (d, e, f) {
      null != a.K && c.j.Qa.Gb('' +
        e.w + ' was moved to ' + f.w + b(d))
    };
    handlers.ii = function (a, e) {
      var d = e.w;
      c.j.Qa.Gb((e.cb ? '' + d + ' was given admin rights' : '' + d + '\'s admin rights were taken away') + b(a))
    };
    handlers.wl = function (a, b) {
      c.j.Fb.Eb.Po(a, b)
    };
    handlers.Hk = function (a, e, f, g) {
      c.j.Qa.Gb('Kick Rate Limit set to (min: ' + e + ', rate: ' + f + ', burst: ' + g + ')' + b(a))
    };
    this.roomHandlers = handlers;
    addRoomListener(a, handlers)
  },
  Lr: function (a) {
    removeRoomListener(a, this.roomHandlers)
  },
  f: Gb
};
Ra.b = !0;
Ra.Fk = function (a) {
  switch (n.A.tg.L().L(a)) {
    case 'Down':
      return 2;
    case 'Kick':
      return 16;
    case 'Left':
      return 4;
    case 'Right':
      return 8;
    case 'Up':
      return 1;
    default:
      return 0
  }
};
Ra.prototype = {
  ia: function () {
    window.document.removeEventListener('focusout', G(this, this.al))
  },
  C: function () {
    var a = this.$d;
    if (null != this.ng && a != this.Yf) {
      this.Yf = a;
      var b = new Ga;
      b.input = a;
      this.ng(b)
    }
  },
  Bd: function (a) {
    this.$d |= Ra.Fk(a)
  },
  Cd: function (a) {
    this.$d &= ~Ra.Fk(a)
  },
  al: function () {
    if (null != this.ng && 0 != this.Yf) {
      this.Yf = this.$d = 0;
      var a = new Ga;
      a.input = 0;
      this.ng(a)
    }
  },
  f: Ra
};
T.b = !0;
T.Hh = function (a) {
  return T.Rf(JSON.parse(a))
};
T.Rf = function (a) {
  var b = new T;
  b.Ec = a.lat;
  b.Gc = a.lon;
  b.ub = a.code.toLowerCase();
  return b
};
T.Fo = function () {
  return M.tk(/*n.Ee + 'api/geo'*/"https://kpias760.github.io/haxball-replay-analyzer.github.io/pliki/geo.json").then(function (a) {
    return T.Rf(a)
  })
  //return false;
};
T.prototype = {
  se: function () {
    return JSON.stringify({
      lat: this.Ec,
      lon: this.Gc,
      code: this.ub
    })
  },
  f: T
};
Yb.b = !0;
Yb.prototype = {
  Lh: function () {
    return null != this.Ne.L() ? this.Ne.L() : null != this.Me.L() ? this.Me.L() : new T
  },
  f: Yb
};
Xb.b = !0;
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
wa.b = !0;
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
W.b = !0;
W.Rf = function (a) {
  for (var b = new W, c = ec.Mm(a), d = 0; d < c.length;) {
    var e = c[d];
    ++d;
    b.Yc.set(e, a[e])
  }
  return b
};
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
n.b = !0;
Wb.b = !0;
Wb.prototype = {
  f: Wb
};
u.b = !0;
u.qp = function () {
  mc.ts();
  x.fj(function () {
    u.jk(u.xq)
  });
  u.hp()
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
u.Bo = function () {
  var a = Xb.Pm();
  return null != a ? null != a.getItem('crappy_router') : !1
};
u.jk = function (a) {
  var b = new kb(n.A.fe.L());
  b.cl = function (b) {
    n.A.fe.Xa(b);
    n.Na.Tl();
    a()
  };
  x.La(b.g);
  // CHECKPOINT koment
  // b.Cb.focus()
};
u.kk = function (a, b) {
  var c = new Q(a);
  c.Va = b;
  x.La(c.g)
};
u.no = function (a, b) {
  function c() {
    var a = new Ka('Failed', null);
    a.Va = function () {
      u.xb()
    };
    x.La(a.g)
  }
  function d(b) {
    b = b.sitekey;
    if (null == b) throw new q(null);
    u.kk(b, function (b) {
      e(a, b)
    })
  }
  x.La((new P('Connecting', 'Connecting...', [
  ])).g);
  var e;
  e = function (a, e) {
    M.zl(n.Ee +
      'api/client', 'room=' + a + '&rcr=' + e, M.vj).then(function (a) {
        switch (a.action) {
          case 'connect':
            a = a.token;
            if (null == a) throw new q(null);
            b(a);
            break;
          case 'recaptcha':
            d(a);
            break;
          default:
            throw new q(null);
        }
      })['catch'](function () {
        c()
      })
  };
  e(a, '')
};
u.xq = function () {
  var a = Hb.L(),
    b = a.get('c'),
    c = a.get('p');
  a.get('v');
  null != b ? null != c ? u.Dh(b) : u.Pf(b) : u.xb()
};
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
u.mk = function () {
  var a = new aa(!0),
    b = window.document.createElement('div');
  b.className = 'view-wrapper';
  b.appendChild(a.g);
  x.La(b);
  a.qb = function () {
    u.xb()
  };
  a.Ep = function () {
    var a = new mb,
      b = window.document.createElement('div');
    b.className = 'view-wrapper';
    b.appendChild(a.g);
    x.La(b);
    return a.qb = function () {
      u.mk()
    }
  }
};
u.$h = function (a, b) {
  return '' + window.location.origin + '/play?c=' + a + (b ? '&p=1' : '')
};
u.oo = function () {
  var a = n.A.fe.L(),
    b = new ib('' + a + '\'s room');
  x.La(b.g);
  b.ci = function () {
    u.xb()
  };
  b.Jp = function (b) {
    function c() {
      if (!b.Ks) {
        var a = new Fb;
        a.Id = 9;
        a.w = g.jc;
        a.I = g.I.length;
        a.Xe = l.fg + 1;
        a.ub = f.ub;
        a.Ib = null != l.Ib;
        a.Ec = f.Ec;
        a.Gc = f.Gc;
        var c = w.ha(16);
        a.ga(c);
        a = c.Kg();
        l.Fi(a)
      }
    }
    x.La((new P('Tworzenie ruma', 'Connecting...', [
    ])).g);
    var e = null,
      f = n.A.Lh(),
      g = new fa;
    g.jc = b.name;
    var k = new ea;
    k.w = a;
    k.cb = !0;
    k.Kd = f.ub;
    k.Xb = n.A.sh.L();
    g.I.push(k);
    var l = new Lb({
      iceServers: n.Vf,
      ij: 'https://kpias760.github.io/haxball-replay-analyzer.github.io/pliki/host.json',
      //ij: "pliki/host.json",
      state: g,
      version: 9
    });
    //console.log(n.Ee);
    l.fg = b.qs - 1;
    l.Ib = b.password;
    c();
    var t = new ba(l),
      h = !1;
    l.ef = function (a, b) {
      u.kk(a, function (a) {
        b(a);
        x.La(t.j.g);
        return h = !0
      })
    };
    var m = window.setInterval(function () {
      var a = la.la(l);
      l.ra(a)
    }, 3000);
    l.$k = function (a) {
      null != g.na(a) && (a = Y.la(a, 'Bad actor', !1), l.ra(a))
    };
    l.Hp = function (a, b) {
      var d = b.ic();
      if (25 < d.length) throw new q('name too long');
      var e = b.ic();
      if (3 < e.length) throw new q('country too long');
      var f = b.zb();
      if (null != f && 2 < f.length) throw new q('avatar too long');
      d = oa.la(a, d, e, f);
      l.ra(d);
      c()
    };
    l.Ip = function (a) {
      null != g.na(a) && (a = Y.la(a, null, !1), l.ra(a))
    };
    l.kg = function (a) {
      e = a;
      t.Bg = u.$h(a, null != l.Ib);
      h || (h = !0, x.La(t.j.g))
    };
    t.Ih.Np = function (a, b, c, d) {
      l.to(a, b, c, d)
    };
    t.Ih.Op = function () {
      c()
    };
    t.j.de = function () {
      l.ia();
      t.ia();
      u.xb();
      window.clearInterval(m)
    };
    t.Of.Fg = function (a) {
      l.Ib = a;
      c();
      null != e && (t.Bg = u.$h(e, null != l.Ib))
    };
    t.Of.jm = function (a) {
      l.Ei(a)
    };
    t.Of.Ud = G(l, l.Ud)
  }
};
u.Dh = function (a) {
  var b = new Za;
  x.La(b.g);
  b.Va = function (b) {
    null == b ? u.xb() : u.Pf(a, b)
  }
};
var analysisSeq = 0; // numer wczytania: wynik starszej analizy (przerwanej nową powtórką) pomijamy
u.po = function (a) {
  var seq = ++analysisSeq;
  replayerHooks.onProgress(0);
  // statystyki bez odtwarzacza, w Web Workerze (TD-019); odtwarzacz otwiera się po nich
  analyzeInWorker(a, {
    progressEvery: 2000,
    onProgress: function (v) { seq === analysisSeq && replayerHooks.onProgress(v) }
  }).then(function (result) {
    seq === analysisSeq && u.analysisDone(a, result)
  }, function (e) {
    if (seq !== analysisSeq || e && e.cancelled) return;
    // błąd wersji z Workera: ten sam obiekt błędu HaxBalla co przy analizie na głównym wątku
    null != e && null != e.replayVersion && (e = new Kb(e.replayVersion));
    u.replayError(e)
  })
};
u.analysisDone = function (a, result) {
  try {
    lastAnalysis = result;
    players = result.playerEntries.map(function (p) { return { V: p.id, w: p.name } });
    replayerHooks.onProgress(1);
    replayerHooks.onPlayerList(result.playerList);
    replayerHooks.onPlayerPos(result.playerPos);
    replayerHooks.onStats(result.matches);
  } catch (e) {
    u.replayError(e);
    return
  }
  // odtwarzacz potrzebuje zasobów gry (res.dat): bez nich renderer rzuca wyjątek (TD-033)
  if (gameResources.ready) u.openPlayer(a);
  else if (null != gameResources.error) u.resourcesFailed();
  else gameResources.pending = a // otworzy go x.fj po wczytaniu zasobów
};
// komunikat i powrót z ekranu „Analyzing...” do listy
u.resourcesFailed = function () {
  replayerHooks.onMessage(RESOURCES_ERROR_MESSAGE, 'darkred', 10);
  leaveReplayer()
};
u.openPlayer = function (a) {
  try {
    // odtwarzacz tylko do oglądania: start na początku, pauza, 1x (ha)
    var b = new Vb(new Jb(new Uint8Array(a), new fa, 3));
    b.je.de = function () {
      b.ia();
      u.xb()
    };
    playSounds = true; // dawniej włączało je programowe kliknięcie "spddown" po analizie
    x.La(b.j.g);
    bringReplayer()
  } catch (e) {
    u.replayError(e)
  }
};
u.replayError = function (e) {
  var a;
  var c = e instanceof q ? e.Ta : e;
  if (c instanceof Kb) a = new P('Incompatible replay version', 'The replay file is of a different version. You can open simple player, without stats', [
    'Open player',
    'Cancel'
  ]),
    x.La(a.g),
    a.Va = function (a) {
      console.log(c);
      window.top.open('https://www.haxball.com' + '/replay?v=' + c.Id, '_self')
      //0 == a ? (/*a = window.top.location,*/window.top.open('https://www.haxball.com'+'/replay?v=' + c.Id, '_self'))  : u.xb()
    };
  else {
    var d = new P('Replay error', 'Couldn\'t load the file.', [
      'Ok'
    ]);
    x.La(d.g);
    d.Va = function () {
      d.Va = null;
      // u.xb()
      $('.simple-dialog-view').animate({
        left: '150%',
      }, { duration: 700, easing: 'swing', queue: false });
      leaveReplayer();
    }
  }
};
u.Pf = function (a, b, c) {
  try {
    var d = u.Bo(),
      e = new fa,
      f = w.ha();
    f.mc(n.A.fe.L());
    f.mc(n.A.Lh().ub);
    f.Db(n.A.sh.L());
    var g = n.Vf,
      k = n.Vr,
      l = f.Kg(),
      t = new xa(a, {
        iceServers: g,
        ij: k,
        state: e,
        version: 9,
        Ms: l,
        password: b,
        cn: d,
        gn: c,
        ds: u.Je
      }),
      h = new jb;
    h.ba('Connecting to master...');
    h.vh.onclick = function () {
      t.Ad = null;
      t.df = null;
      t.ia();
      u.xb()
    };
    x.La(h.g);
    var m = function (a, b) {
      var c = new Ka(a, b);
      c.Va = function () {
        u.xb()
      };
      x.La(c.g)
    },
      p = function () {
        var a = new P('Connection Failed', '', [
          'Ok'
        ]);
        a.Vd.innerHTML = '<p>Failed to connect to room host.</p><p>If this problem persists please see the <a href=\'https://github.com/haxball/haxball-issues/wiki/Connection-Issues\' target=\'_blank\'>troubleshooting guide</a>.</p>';
        a.Va = function () {
          u.xb()
        };
        x.La(a.g)
      },
      r = function () {
        var b = new ba(t);
        t.dl = function (a) {
          b.j.pe.qr((10 * t.sg.$g(0.5) | 0) / 10);
          b.j.pe.or((10 * t.sg.max() | 0) / 10);
          b.j.pe.nl.tn(a)
        };
        b.Bg = u.$h(a, !1);
        x.La(b.j.g);
        b.j.de = function () {
          t.Ad = null;
          t.ia();
          b.ia();
          u.xb()
        };
        t.Ad = function () {
          t.Ad = null;
          b.ia();
          var a = null == b.Ed ? null : b.Ed.stop();
          m(t.ek, a)
        }
      };
    t.df = function (c) {
      t.df = null;
      t.Ad = null;
      switch (c.nb) {
        case 1:
          p();
          break;
        case 2:
          switch (c.reason) {
            case 4004:
              u.no(a, function (c) {
                u.Pf(a, b, c)
              });
              break;
            case 4101:
              null == b ? u.Dh(a) : m(xa.xh(c), null);
              break;
            default:
              m(xa.xh(c), null)
          }
          break;
        default:
          m(xa.xh(c), null)
      }
    };
    t.Ad = function (a) {
      switch (a) {
        case 1:
          h.ba('Connecting to peer...');
          break;
        case 2:
          h.ba('Awaiting state...');
          break;
        case 3:
          r()
      }
    };
    t.Sp = function () {
      h.ba('Trying reverse connection...')
    }
  } catch (ic) {
    window.console.log(ic instanceof q ? ic.Ta : ic),
      c = new P('Unexpected Error', '', [
      ]),
      c.Vd.innerHTML = 'An error ocurred while attempting to join the room.<br><br>This might be caused by a browser extension, try disabling all extensions and refreshing the site.<br><br>The error has been printed to the inspector console.',
      x.La(c.g)
  }
};
x.b = !0;
x.ks = function () {
  // CHECKPOINT overwrite
  return true;
  try {
    return window.self != window.top
  } catch (a) {
    return !0
  }
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
    return Promise.all([M.L('https://kpias760.github.io/haxball-replay-analyzer.github.io/pliki/res.dat', 'arraybuffer').then(function (a) {
      a = new JSZip(a);
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
        gameResources.ready = true;
        x.us(a);
        // powtórka wczytana, zanim doszły zasoby: odtwarzacz teraz
        var pending = gameResources.pending;
        gameResources.pending = null;
        null != pending && u.openPlayer(pending)
      }, function (err) {
        // dawniej nieobsłużone: x.us się nie wykonywało, a wczytanie powtórki kończyło się TypeError (TD-033)
        console.error('HBRA: game resources (res.dat) failed to load', err);
        gameResources.error = err;
        if (null != gameResources.pending) {
          // powtórka czekała na zasoby: komunikat i powrót z ekranu „Analyzing...”
          gameResources.pending = null;
          u.resourcesFailed()
        } else replayerHooks.onMessage(RESOURCES_ERROR_MESSAGE, 'darkred', 10)
      })
  })
};
// zasoby gry z res.dat (dźwięki, obrazki boiska); bez nich odtwarzacz nie ruszy, statystyki tak
var gameResources = { ready: false, error: null, pending: null };
var RESOURCES_ERROR_MESSAGE = 'Error: game resources didn\'t load, so the replay player can\'t start. Check your connection and refresh the page.';
// kontener okien (x.La); tworzony przy pierwszym użyciu, żeby komunikat błędu działał także przed x.us
x.kontener = function () {
  null == x.Pg && (x.Pg = window.document.createElement('div'), window.document.body.appendChild(x.Pg));
  return x.Pg
};
x.es = function (a) {
  for (var b = Modernizr, c = 'canvas dataview es6collections peerconnection promises websockets'.split(' '), d = [
  ], e = 0; e < c.length;) {
    var f = c[e];
    ++e;
    b[f] || d.push(f)
  }
  0 != d.length ? (window.document.body.innerHTML = '', x.Pg = window.document.createElement('div'), window.document.body.appendChild(x.Pg), a = new Wa(d), x.La(a.g)) : a()
};
x.us = function (a) {
  // CHECKPOINT return
  // return;
  // window.document.body.innerHTML = '';
  x.kontener();
  var b = null,
    b = function () {
      n.Na.Tl();
      window.document.removeEventListener('click', b, !0)
    };
  window.document.addEventListener('click', b, !0);
  a()
};
x.La = function (a) {
  null !=
    x.Vm && x.Vm.remove();
  null != a && (x.kontener().appendChild(a), x.Vm = a)
};
Vb.b = !0;
Vb.prototype = {
  ia: function () {
    window.document.removeEventListener('keydown', G(this, this.Bd));
    window.document.removeEventListener('keyup', G(this, this.Cd));
    window.onbeforeunload = null;
    window.cancelAnimationFrame(this.De);
    window.clearInterval(this.Gh)
  },
  bf: function () {
    this.De = window.requestAnimationFrame(G(this, this.bf));
    this.ya.C();
    this.Kc()
  },
  Kc: function () {
    this.je.C();
    var a = window.performance.now();
    1 == n.A.Fh.L() && 28.333333333333336 > a - this.$c || (this.$c = a, this.sd++, this.uf(n.A.Tb.L()), 0 < this.ya.Fd || this.j.C(this.ya))
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
    0 >= a ? (b.Gg(!0), b.Eb.kf = 1, b.Eb.xf = 0) : (b.Gg(!1), b.Eb.xf = 35, b.Eb.kf = 1 + 0.25 * (a - 1))
  },
  Cd: function () {
  },
  f: Vb
};
Fb.b = !0;
Fb.prototype = {
  Pj: function () {
    this.w = U.Qc(this.w, 40);
    this.ub = U.Qc(this.ub, 3)
  },
  ga: function (a) {
    this.Pj();
    a.Sa = !0;
    a.Ub(this.Id);
    a.Im(this.w);
    a.Im(this.ub);
    a.Wi(this.Ec);
    a.Wi(this.Gc);
    a.l(this.Ib ? 1 : 0);
    a.l(this.Xe);
    a.l(this.I);
    a.Sa = !1
  },
  ja: function (a) {
    a.Sa = !0;
    this.Id = a.Ob();
    this.w = a.El();
    this.ub = a.El();
    this.Ec = a.mi();
    this.Gc = a.mi();
    this.Ib = 0 != a.B();
    this.Xe = a.B();
    this.I = a.B();
    a.Sa = !1;
    if (30 < this.I || 30 < this.Xe) throw new q(null);
    this.Pj()
  },
  f: Fb
};
va.b = !0;
va.parse = function (a) {
  a.B();
  for (var b = [
  ]; 0 != a.o.byteLength - a.a;) {
    var c = a.ie(a.Ob()),
      d = a.Cl(a.Ob());
    try {
      var e = new Fb;
      e.ja(new F(new DataView(d), !1));
      var f = new Wb;
      f.vd = e;
      f.$ = c;
      b.push(f)
    } catch (g) {
    }
  }
  return b
};
va.js = function (a, b, c, d) {
  return Math.acos(Math.sin(a) * Math.sin(c) + Math.cos(a) * Math.cos(c) * Math.cos(b - d))
};
va.Hs = function (a, b) {
  for (var c = a.Ec, d = a.Gc, e = 0; e < b.length;) {
    var f = b[e];
    ++e;
    var g = f.vd;
    f.Le = 6378 * va.js(0.017453292519943295 * g.Ec, 0.017453292519943295 * g.Gc, 0.017453292519943295 * c, 0.017453292519943295 * d);
    isFinite(f.Le) || (f.Le = 22000)
  }
};
va.get = function () {
  return M.L(/*n.Ee + */'https://kpias760.github.io/haxball-replay-analyzer.github.io/pliki/geo.json', 'arraybuffer').then(function (a) {
    return va.parse(new F(new DataView(a), !1))
  })
};
Z.b = !0;
Z['delete'] = function (a) {
  return null == window.indexedDB ? Promise.reject('IndexedDB not supported by browser.') : new Promise(function (b, c) {
    var d = window.indexedDB.open('stadiums', 1);
    d.onblocked = d.onerror = c;
    d.onupgradeneeded = function (a) {
      var b = d.result;
      b.onerror = c;
      1 > a.oldVersion && (b.createObjectStore('files', {
        autoIncrement: !0
      }), b.createObjectStore('meta', {
        keyPath: 'id'
      }))
    };
    d.onsuccess = function () {
      var e = d.result;
      e.onerror = c;
      var f = e.transaction(['meta',
        'files'], 'readwrite');
      f.onerror = f.onabort = function (a) {
        c(a);
        e.close()
      };
      f.oncomplete = function () {
        b(0);
        e.close()
      };
      f.objectStore('files')['delete'](a);
      f.objectStore('meta')['delete'](a)
    }
  })
};
Z.get = function (a) {
  return null == window.indexedDB ? Promise.reject('IndexedDB not supported by browser.') : new Promise(function (b, c) {
    var d = window.indexedDB.open('stadiums', 1);
    d.onblocked = d.onerror = c;
    d.onupgradeneeded = function (a) {
      var b = d.result;
      b.onerror = c;
      1 > a.oldVersion && (b.createObjectStore('files', {
        autoIncrement: !0
      }), b.createObjectStore('meta', {
        keyPath: 'id'
      }))
    };
    d.onsuccess = function () {
      var e = d.result;
      e.onerror = c;
      var f = e.transaction(['files']);
      f.onerror = f.onabort = function (a) {
        c(a);
        e.close()
      };
      f.oncomplete = function () {
        e.close()
      };
      zb.eh(f.objectStore('files').get(a)).then(function (a) {
        try {
          var d = new h;
          d.Lk(a);
          b(d)
        } catch (l) {
          c(l instanceof q ? l.Ta : l)
        }
      }, c)
    }
  })
};
Z.getAll = function () {
  return null == window.indexedDB ? Promise.reject('IndexedDB not supported by browser.') : new Promise(function (a, b) {
    var c = window.indexedDB.open('stadiums', 1);
    c.onblocked = c.onerror = b;
    c.onupgradeneeded = function (a) {
      var d = c.result;
      d.onerror = b;
      1 > a.oldVersion && (d.createObjectStore('files', {
        autoIncrement: !0
      }), d.createObjectStore('meta', {
        keyPath: 'id'
      }))
    };
    c.onsuccess = function () {
      var d = c.result;
      d.onerror = b;
      var e = d.transaction(['meta']);
      e.onerror = e.onabort = function (a) {
        b(a);
        d.close()
      };
      e.oncomplete = function () {
        d.close()
      };
      zb.eh(e.objectStore('meta').getAll()).then(a, b)
    }
  })
};
Z.Es = function () {
  var a = window.navigator.storage;
  if (null == a || null == a.persist) return Promise.resolve(!1);
  try {
    return a.persisted().then(function (b) {
      return b ? !0 : a.persist()
    })['catch'](function () {
      return !1
    })
  } catch (b) {
    return Promise.resolve(!1)
  }
};
Z.add = function (a) {
  return null == window.indexedDB ? Promise.reject('IndexedDB not supported by browser.') : new Promise(function (b, c) {
    var d = window.indexedDB.open('stadiums', 1);
    d.onblocked = d.onerror = c;
    d.onupgradeneeded = function (a) {
      var b = d.result;
      b.onerror = c;
      1 > a.oldVersion && (b.createObjectStore('files', {
        autoIncrement: !0
      }), b.createObjectStore('meta', {
        keyPath: 'id'
      }))
    };
    d.onsuccess = function () {
      var e = d.result;
      e.onerror = c;
      var f = e.transaction(['files',
        'meta'], 'readwrite');
      f.onerror = f.onabort = function (a) {
        c(a);
        e.close()
      };
      f.oncomplete = function () {
        b(0);
        e.close()
      };
      try {
        zb.eh(f.objectStore('files').add(a.se())).then(function (b) {
          b = {
            name: a.w,
            id: b
          };
          return zb.eh(f.objectStore('meta').add(b))
        })['catch'](c)
      } catch (g) {
        c(0)
      }
    }
  })
};
Ub.b = !0;
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
Tb.b = !0;
Tb.prototype = {
  update: function () {
    var a = window.performance.now(),
      b = a - this.Um;
    this.Um = a;
    this.ve += (this.dh - this.ve) * this.Js;
    this.Ef -= b;
    0 >= this.Ef && (this.Ef = this.dh = 0);
    0 >= this.dh && 0.05 > this.ve && (window.clearInterval(this.gh), this.gh = null, this.ve = 0);
    this.Tg.gain.value = n.A.nm.L() ? this.ve : 0
  },
  qj: function (a) {
    var b = this;
    this.dh = a;
    this.Ef = 166.66666666666666;
    null == this.gh && (this.gh = window.setInterval(function () {
      b.update()
    }, 17), this.Um = window.performance.now())
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
            if (null == f || u < g) f = q.H,
              g = u
          } else if (q.ea == p.xa) {
            if (null == k || k.a.x * m < q.H.a.x * m) k = q.H;
            if (null == l || l.a.x * m > q.H.a.x * m) l = q.H;
            if (null == t || u < h) t = q.H,
              h = u
          }
        }
      }
      null != l && null != e && 0 >= b.Oa && (f.a.x > l.a.x && c.a.x > l.a.x && 20 < c.a.x && this.qj(0.3), t.a.x < e.a.x && c.a.x < e.a.x && - 20 > c.a.x && this.qj(0.3))
    }
  },
  f: Tb
}; N.b = !0; N.lc = function (a) {
  return 'rgba(' + [(a & 16711680) >>> 16,
  (a & 65280) >>> 8,
  a & 255].join() + ',255)'
}; N.Gi = function (a, b) {
  a.imageSmoothingEnabled = b;
  a.mozImageSmoothingEnabled = b
}; N.prototype = {
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

      // console.log(a, b, c, d, e)
      // console.log(a.I[1].H.D, a.I[1].H.a)
      // a.I[i].V - id gracza
      // a.I[i].H nie może być null

      // this.c.translate(-a.I[1].H.a.x, -a.I[1].H.a.y)

      var translatetoDisc = {
        x: this.Ya.x,
        y: this.Ya.y
      }
      if (playerToFollow != 0) {
        // gracz po id w bieżącym pokoju (a.na); indeks z listy wejść `players` nie pasuje do a.I
        // po wejściach przed grą, wyjściach i zmianie kolejności graczy (TD-034)
        var followedPlayer = a.na(Number(playerToFollow));
        if (null != followedPlayer && null != followedPlayer.H) {
          translatetoDisc.x = followedPlayer.H.a.x;
          translatetoDisc.y = followedPlayer.H.a.y;
        }
      }
      this.c.translate(- translatetoDisc.x, - translatetoDisc.y);

      var mouseTranslated = {
        x: (mousepos.clientX + translatetoDisc.x) - (this.sa.width / 2) / k,
        y: (mousepos.clientY + translatetoDisc.y) - ((this.sa.height + h) / 2) / k
      }

      if (k == 1.5625) {
        mouseTranslated.x = ((mousepos.clientX + translatetoDisc.x) - (this.sa.width / 2) / k) // 1.25;
        mouseTranslated.x = ((mousepos.clientX + translatetoDisc.x) * k - (this.sa.width / 2)) / k;
        mouseTranslated.y = ((mousepos.clientY + translatetoDisc.y) - ((this.sa.height + h) / 2) / k) / 1.25
      } else if (k == 1.875) {
        mouseTranslated.x = ((mousepos.clientX + translatetoDisc.x) - (this.sa.width / 2) / k) // 1.5;
        mouseTranslated.y = ((mousepos.clientY + translatetoDisc.y) - ((this.sa.height + h) / 2) / k) // 1.5
      }

      // console.log(k, a.I[1].H.a, mouseTranslated)
      // var playerHovered = false
      // for (var i = 0; i < a.I.length; i++) {
      //   if (a.I[i].H != null) {
      //     if (distanceBetween(a.I[i].H.a, mouseTranslated) < a.I[i].H.Z) {
      //       playerHovered = a.I[i].V; // CHECKPOINT - na razie działa tylko na powiększeniu 1 (k) i promień gracza 15
      //       globalPlayerHovered = playerHovered;
      //     }
      //   }
      // }
      // if (playerHovered) mainCanvas.style.cursor = 'pointer'
      // else mainCanvas.style.cursor = 'default'

      // console.log(a.I[1].H.a.x, (mousepos.clientX + this.Ya.x) - (this.sa.width / 2) / k) - przełożenie myszki na mapę
      // CHECKPOINT moment, w którym widok centruje się na piłce
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
      ///// odtąd rysuje kulki każdego gracza (bez nicków)
      f = 0;
      for (g = a.I; f < g.length;) n = g[f],
        ++f,
        m = n.H,
        null != m && this.Ll(m, this.dd.get(n.V));
      /////////////////////////////////////////// dotąd
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
R.b = !0;
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
Sb.b = !0;
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
    0 < this.ab.length && (this.xc += a, this.xc > this.ab[0].zo() && (this.xc = 0, this.ab.shift()))
  },
  Kc: function (a) {
    0 < this.ab.length && this.ab[0].Kc(a, this.xc)
  },
  f: Sb
};
Ea.b = !0;
Ea.Ln = function (a, b) {
  if (a.hd != b.hd || a.ed != b.ed) return !1;
  var c = a.fb,
    d = b.fb;
  if (c.length != d.length) return !1;
  for (var e = 0, f = c.length; e < f;) {
    var g = e++;
    if (c[g] != d[g]) return !1
  }
  return !0
};
Ea.ao = function (a, b) {
  a.hd = b.hd;
  a.ed = b.ed;
  a.fb = b.fb.slice(0)
};
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
    a.fillText(this.w, 0, 0) //CHECKPOINT w tym miejscu podpisuje kulkę gracza
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
mb.b = !0;
mb.prototype = {
  ki: function (a) {
    for (var b = this, c = 0, d = Ha.ab.length >> 2; c < d;) {
      var e = c++,
        f = [
          e
        ],
        g = Ha.ab[e << 2],
        e = Ha.ab[(e << 2) + 1].toLowerCase(),
        h = [
          window.document.createElement('div')
        ];
      h[0].className = 'elem';
      h[0].innerHTML = '<div class="flagico f-' + e + '"></div> ' + g;
      a.appendChild(h[0]);
      h[0].onclick = function (a, c) {
        return function () {
          null != b.rf && b.rf.Ja.classList.remove('selected');
          b.wh.disabled = !1;
          b.rf = {
            Ja: a[0],
            index: c[0]
          };
          a[0].classList.add('selected')
        }
      }(h, f);
      h[0].ondblclick = function (a) {
        return function () {
          b.Zl(a[0])
        }
      }(f)
    }
  },
  Zl: function (a) {
    var b = new T;
    b.ub = Ha.ab[(a << 2) + 1].toLowerCase();
    b.Ec = Ha.ab[(a << 2) + 2];
    b.Gc = Ha.ab[(a << 2) + 3];
    n.A.Ne.Xa(b);
    A.i(this.qb)
  },
  f: mb
};
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
lb.b = !0;
lb.vo = function (a) {
  return - 1 != '.$^{[(|)*+?\\'.indexOf(a) ? '\\' + a : a
};
lb.prototype = {
  Qh: function () {
    this.Ui(null)
  },
  Hn: function (a, b) {
    var c = this.Iq.exec(D.substr(a, 0, b));
    if (null != c) {
      var d = c[0],
        e = new RegExp(D.substr(d, 1, null).split('').map(lb.vo).join('.*?'), 'i');
      this.Ek = '#' == d.charAt(0);
      this.si = c.index;
      this.Vq = d.length;
      this.Ml = a;
      for (var c = function (a) {
        a = e.exec(a.w);
        return null == a ? - 1 : a.index + a[0].length
      }, d = [
      ], f = 0, g = this.Hj; f < g.length;) {
        var h = g[f];
        ++f;
        var l = c(h);
        0 <= l && d.push({
          dn: l,
          item: h
        })
      }
      d.sort(function (a, b) {
        return a.dn - b.dn
      });
      this.Ui(d)
    } else this.Ui(null)
  },
  lk: function (a) {
    a = this.Ek ? '#' + a.$ : '@' + J.replace(a.w, ' ', '_');
    this.Rp(D.substr(this.Ml, 0, this.si) + a + ' ' + D.substr(this.Ml, this.si + this.Vq, null), this.si + a.length + 1)
  },
  Ui: function (a) {
    var b = this,
      c = null != a && 0 != a.length;
    this.Mb.hidden || v.Cf(this.Mb);
    this.Wc = null;
    this.Mb.hidden = !c;
    if (c) {
      for (var c = [
      ], d = 0; d < a.length;) {
        var e = a[d++],
          f = window.document.createElement('div'),
          e = [
            e.item
          ],
          g = e[0].w;
        this.Ek && (g = '(' + e[0].$ + ') ' + g);
        f.textContent = g;
        this.Mb.appendChild(f);
        f.onclick = function (a) {
          return function () {
            b.lk(a[0])
          }
        }(e);
        c.push({
          item: e[0],
          Ja: f
        })
      }
      this.Wc = c;
      this.Wc[0].Ja.classList.toggle('selected', !0);
      this.wc = 0
    }
  },
  Qj: function (a) {
    if (null != this.Wc) {
      var b = this.wc;
      this.wc += a;
      a = this.Wc.length - 1;
      0 > this.wc ? this.wc = a : this.wc > a && (this.wc = 0);
      a = this.Wc[this.wc];
      b != this.wc && (a.Ja.classList.toggle('selected', !0), this.Wc[b].Ja.classList.toggle('selected', !1));
      a = a.Ja;
      b = a.offsetTop;
      a = b + a.offsetHeight;
      var c = this.Mb.scrollTop +
        this.Mb.clientHeight;
      b < this.Mb.scrollTop ? this.Mb.scrollTop = b : a > c && (this.Mb.scrollTop = a - this.Mb.clientHeight)
    }
  },
  qo: function () {
    null != this.Wc && (this.lk(this.Wc[this.wc].item), this.Qh())
  },
  f: lb
};
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
jb.b = !0;
jb.prototype = {
  ba: function (a) {
    var b = window.document.createElement('p');
    b.textContent = a;
    this.dc.appendChild(b)
  },
  f: jb
};
ib.b = !0;
ib.prototype = {
  Fj: function (a) {
    this.Fm = a;
    this.Em.textContent = 'Show in room list: ' + (a ? 'No' : 'Yes')
  },
  Dc: function () {
    var a = this.$e.value;
    return 40 >= a.length ? 0 < a.length : !1
  },
  C: function () {
    this.Wj.disabled = !this.Dc()
  },
  f: ib
};
Ka.b = !0;
Ka.prototype = {
  f: Ka
};
hb.b = !0;
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
Rb.b = !0;
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
        d = a - Math.floor(a),
        e = d.toFixed(3);
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
    a != this.hk && (this.bq.className = a ? 'overtime on' : 'overtime', this.hk = a)
  },
  ur: function (a) {
    a != this.ik && (this.g.className = a ? 'game-timer-view time-warn' : 'game-timer-view', this.ik = a)
  },
  f: Rb
};
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
gb.b = !0;
gb.prototype = {
  Aj: function (a) {
    this.Jj = a;
    this.An.textContent = a ? 'Yes' : 'No'
  },
  f: gb
};
gxd.prototype = {
  Aj: function (a) {
    this.Jj = a;
    //this.An.textContent = a ? 'Yes' : 'No'
  },
  f: gb
};
fb.b = !0;
fb.prototype = {
  f: fb
};
eb.b = !0;
eb.prototype = {
  Lg: function () {
    this.hi.disabled = null == this.jb;
    this.bk.disabled = null == this.jb || null == this.jb.Lm;
    this.rk.disabled = null == this.jb
  },
  Sk: function (a, b, c) {
    var d = this,
      e = window.document.createElement('div');
    e.textContent = a;
    e.className = 'elem';
    null != c && e.classList.add('custom');
    var f = {
      Ja: e,
      Pd: b,
      Lm: c
    };
    e.onclick = function () {
      null != d.jb && d.jb.Ja.classList.remove('selected');
      d.jb = f;
      e.classList.add('selected');
      d.Lg()
    };
    e.ondblclick = function () {
      d.jb = f;
      d.Lg();
      return d.hi.onclick()
    };
    return e
  },
  ki: function (a) {
    for (var b = this, c = h.Kh(), d = 0; d < c.length;) {
      var e = [
        c[d]
      ];
      ++d;
      e = this.Sk(e[0].w, function (a) {
        return function () {
          return Promise.resolve(a[0])
        }
      }(e), null);
      a.appendChild(e)
    }
    Z.getAll().then(function (c) {
      for (var d = 0; d < c.length;) {
        var e = c[d];
        ++d;
        var f = [
          e.id
        ],
          e = b.Sk(e.name, function (a) {
            return function () {
              return Z.get(a[0])
            }
          }(f), function (a) {
            return function () {
              return Z['delete'](a[0])
            }
          }(f));
        a.appendChild(e)
      }
      b.vg.update()
    })
  },
  f: eb
};
Qb.b = !0;
Qb.prototype = {
  tn: function (a) {
    0 > a ? (a = 150, this.c.fillStyle = '#c13535') : this.c.fillStyle = 'green';
    var b = this.Vi,
      c = this.yk,
      d = this.Ah++;
    this.Ah >= b && (this.Ah = 0);
    this.fq[d] = a;
    this.c.clearRect(d, 0, 1, c);
    a = a * c / this.vp;
    this.c.fillRect(d, c - a, 1, a);
    this.Eh.clearRect(0, 0, b, c);
    this.Eh.drawImage(this.sa, b - d - 1, 0);
    this.Eh.drawImage(this.sa, - d - 1, 0)
  },
  f: Qb
};
db.b = !0;
db.prototype = {
  C: function (a, b) {
    var c = a.na(this.Nb);
    null == c ? A.i(this.qb) : (this.Nr(c), this.Hf.disabled = !b || 0 == this.Nb, this.Qe.disabled = !b || 0 == this.Nb)
  },
  Nr: function (a) {
    this.fe != a.w && this.Ej(a.w);
    this.ql != a.cb && this.Dj(a.cb)
  },
  Ej: function (a) {
    this.fe = a;
    this.Ze.textContent = a
  },
  Dj: function (a) {
    this.ql = a;
    this.Hf.textContent = a ? 'Remove Admin' : 'Give Admin'
  },
  f: db
};
cb.b = !0;
cb.prototype = {
  C: function (a, b) {
    this.g.draggable = b;
    this.yb != a.yb && (this.yb = a.yb, this.rg.textContent = '' + this.yb);
    this.un != a.cb && this.em(a.cb)
  },
  em: function (a) {
    this.un = a;
    this.g.className = 'player-list-item' + (a ? ' admin' : '')
  },
  f: cb
};
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
};
Q.b = !0;
Q.prototype = {
  f: Q
};
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
bb.b = !0;
bb.prototype = {
  nr: function (a) {
    this.gk != a && (this.gk = a, this.Zf.value = a)
  },
  f: bb
};
ab.b = !0;
ab.prototype = {
  f: ab
};
Aa.b = !0;
Aa.As = function (a) {
  return Promise.race([new Promise(function (a, c) {
    return window.setTimeout(function () {
      c(null)
    }, 5000)
  }),
    a])
};
Aa.prototype = {
  Om: function () {
    function a() {
      b.pj.disabled = !1;
      b.bn(c)
    }
    var b = this;
    this.en(null);
    this.pj.disabled = !0;
    v.Cf(this.gj);
    var c = [
    ];
    this.dj = [
    ];
    Aa.As(va.get().then(function (a) {
      return c = a
    }, function () {
      return {
      }
    })).then(a, a)
  },
  bn: function (a) {
    var b = this;
    this.dj = a;
    va.Hs(this.gs, a);
    a.sort(function (a, b) {
      return a.Le - b.Le
    });
    v.Cf(this.gj);
    for (var c = 0, d = 0, e = !this.fs.Ta, f = !this.zs.Ta, g = 0; g < a.length;) {
      var h = [
        a[g]
      ];
      ++g;
      var l = h[0].vd;
      if (!(e && l.I >= l.Xe || f && l.Ib)) {
        var m = [
          new ab(h[0])
        ];
        m[0].Ja.ondblclick = function (a) {
          return function () {
            y.i(b.Ym, a[0])
          }
        }(h);
        m[0].Ja.onclick = function (a) {
          return function () {
            b.en(a[0])
          }
        }(m);
        this.gj.appendChild(m[0].Ja);
        c += l.I;
        ++d
      }
    }
    // CHECKPOINT komentuję poniżej
    // this.Bs.update()
  },
  en: function (a) {
    null != this.Od && this.Od.Ja.classList.remove('selected');
    this.Od = a;
    null != this.Od && this.Od.Ja.classList.add('selected');
    this.Tm.disabled = null == this.Od
  },
  f: Aa
};
$a.b = !0;
$a.prototype = {
  Il: function () {
    var a = this;
    M.tk(/*n.Ee + 'api/notice'*/"https://kpias760.github.io/haxball-replay-analyzer.github.io/pliki/notice.json").then(function (b) {
      var c = b.content;
      null != c && '' != c && $a.On != c && (a.$n.innerHTML = c, a.Xk.hidden = !1, a.nd.onclick = function () {
        $a.On = c;
        return a.Xk.hidden = !0
      })
    })
  },
  f: $a
};
Za.b = !0;
Za.prototype = {
  Dc: function () {
    var a = this.Cb.value;
    return 30 >= a.length ? 0 < a.length : !1
  },
  C: function () {
    this.af.disabled = !this.Dc()
  },
  f: Za
};
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
aa.b = !0;
aa.prototype = {
  f: aa
};
P.b = !0;
P.prototype = {
  f: P
};
Xa.b = !0;
Xa.prototype = {
  qr: function (a) {
    this.rg.textContent = null == a ? 'null' : '' + a
  },
  or: function (a) {
    this.wp.textContent = '' + a
  },
  hm: function (a) {
    if (this.wo !== undefined) {
      this.wo.textContent = null == a ? 'null' : '' + a
    }
  },
  f: Xa
};
Wa.b = !0;
Wa.prototype = {
  f: Wa
};
hc.b = !0;
hc.Is = function (a, b) {
  var c = new Uint8Array(this, a, null == b ? null : b - a),
    d = new Uint8Array(c.byteLength);
  d.set(c);
  return d.buffer
};
var rc = 0;
String.prototype.f = String;
String.b = !0;
Array.b = !0;
Date.prototype.f = Date;
Date.b = 'Date';
Object.defineProperty(q.prototype, 'message', {
  get: function () {
    return String(this.Ta)
  }
});
null == ArrayBuffer.prototype.slice && (ArrayBuffer.prototype.slice = hc.Is);
Va.Yn = {
  mandatory: {
    OfferToReceiveAudio: !1,
    OfferToReceiveVideo: !1
  }
};
I.qh = {
  name: 'ECDSA',
  namedCurve: 'P-256'
};
I.mm = {
  name: 'ECDSA',
  hash: {
    name: 'SHA-256'
  }
};
Ba.Uo = [
  'click-rail',
  'drag-thumb',
  'wheel',
  'touch'
];
Zb.Km = [
  {
    name: 'ro',
    reliable: !0,
    kj: !0
  },
  {
    name: 'ru',
    reliable: !0,
    kj: !1
  },
  {
    name: 'uu',
    reliable: !1,
    kj: !1
  }
];
M.vj = 'application/x-www-form-urlencoded';
Ha.ab = [
  'Afghanistan',
  'AF',
  33.3,
  65.1,
  'Albania',
  'AL',
  41.1,
  20.1,
  'Algeria',
  'DZ',
  28,
  1.6,
  'American Samoa',
  'AS',
  - 14.2,
  - 170.1,
  'Andorra',
  'AD',
  42.5,
  1.6,
  'Angola',
  'AO',
  - 11.2,
  17.8,
  'Anguilla',
  'AI',
  18.2,
  - 63,
  'Antigua and Barbuda',
  'AG',
  17,
  - 61.7,
  'Argentina',
  'AR',
  - 34.5,
  - 58.4,
  'Armenia',
  'AM',
  40,
  45,
  'Aruba',
  'AW',
  12.5,
  - 69.9,
  'Australia',
  'AU',
  - 25.2,
  133.7,
  'Austria',
  'AT',
  47.5,
  14.5,
  'Azerbaijan',
  'AZ',
  40.1,
  47.5,
  'Bahamas',
  'BS',
  25,
  - 77.3,
  'Bahrain',
  'BH',
  25.9,
  50.6,
  'Bangladesh',
  'BD',
  23.6,
  90.3,
  'Barbados',
  'BB',
  13.1,
  - 59.5,
  'Belarus',
  'BY',
  53.7,
  27.9,
  'Belgium',
  'BE',
  50.5,
  4.4,
  'Belize',
  'BZ',
  17.1,
  - 88.4,
  'Benin',
  'BJ',
  9.3,
  2.3,
  'Bermuda',
  'BM',
  32.3,
  - 64.7,
  'Bhutan',
  'BT',
  27.5,
  90.4,
  'Bolivia',
  'BO',
  - 16.2,
  - 63.5,
  'Bosnia and Herzegovina',
  'BA',
  43.9,
  17.6,
  'Botswana',
  'BW',
  - 22.3,
  24.6,
  'Bouvet Island',
  'BV',
  - 54.4,
  3.4,
  'Brazil',
  'BR',
  - 14.2,
  - 51.9,
  'British Indian Ocean Territory',
  'IO',
  - 6.3,
  71.8,
  'British Virgin Islands',
  'VG',
  18.4,
  - 64.6,
  'Brunei',
  'BN',
  4.5,
  114.7,
  'Bulgaria',
  'BG',
  42.7,
  25.4,
  'Burkina Faso',
  'BF',
  12.2,
  - 1.5,
  'Burundi',
  'BI',
  - 3.3,
  29.9,
  'Cambodia',
  'KH',
  12.5,
  104.9,
  'Cameroon',
  'CM',
  7.3,
  12.3,
  'Canada',
  'CA',
  56.1,
  - 106.3,
  'Cape Verde',
  'CV',
  16,
  - 24,
  'Cayman Islands',
  'KY',
  19.5,
  - 80.5,
  'Central African Republic',
  'CF',
  6.6,
  20.9,
  'Chad',
  'TD',
  15.4,
  18.7,
  'Chile',
  'CL',
  - 35.6,
  - 71.5,
  'China',
  'CN',
  35.8,
  104.1,
  'Christmas Island',
  'CX',
  - 10.4,
  105.6,
  'Colombia',
  'CO',
  4.5,
  - 74.2,
  'Comoros',
  'KM',
  - 11.8,
  43.8,
  'Congo [DRC]',
  'CD',
  - 4,
  21.7,
  'Congo [Republic]',
  'CG',
  - 0.2,
  15.8,
  'Cook Islands',
  'CK',
  - 21.2,
  - 159.7,
  'Costa Rica',
  'CR',
  9.7,
  - 83.7,
  'Croatia',
  'HR',
  45.1,
  15.2,
  'Cuba',
  'CU',
  21.5,
  - 77.7,
  'Cyprus',
  'CY',
  35.1,
  33.4,
  'Czech Republic',
  'CZ',
  49.8,
  15.4,
  'Côte d\'Ivoire',
  'CI',
  7.5,
  - 5.5,
  'Denmark',
  'DK',
  56.2,
  9.5,
  'Djibouti',
  'DJ',
  11.8,
  42.5,
  'Dominica',
  'DM',
  15.4,
  - 61.3,
  'Dominican Republic',
  'DO',
  18.7,
  - 70.1,
  'Ecuador',
  'EC',
  - 1.8,
  - 78.1,
  'Egypt',
  'EG',
  26.8,
  30.8,
  'El Salvador',
  'SV',
  13.7,
  - 88.8,
  'Equatorial Guinea',
  'GQ',
  1.6,
  10.2,
  'Eritrea',
  'ER',
  15.1,
  39.7,
  'Estonia',
  'EE',
  58.5,
  25,
  'Ethiopia',
  'ET',
  9.1,
  40.4,
  'Faroe Islands',
  'FO',
  61.8,
  - 6.9,
  'Fiji',
  'FJ',
  - 16.5,
  179.4,
  'Finland',
  'FI',
  61.9,
  25.7,
  'France',
  'FR',
  46.2,
  2.2,
  'French Guiana',
  'GF',
  3.9,
  - 53.1,
  'French Polynesia',
  'PF',
  - 17.6,
  - 149.4,
  'Gabon',
  'GA',
  - 0.8,
  11.6,
  'Gambia',
  'GM',
  13.4,
  - 15.3,
  'Georgia',
  'GE',
  42.3,
  43.3,
  'Germany',
  'DE',
  51.1,
  10.4,
  'Ghana',
  'GH',
  7.9,
  - 1,
  'Gibraltar',
  'GI',
  36.1,
  - 5.3,
  'Greece',
  'GR',
  39,
  21.8,
  'Greenland',
  'GL',
  71.7,
  - 42.6,
  'Grenada',
  'GD',
  12.2,
  - 61.6,
  'Guadeloupe',
  'GP',
  16.9,
  - 62,
  'Guam',
  'GU',
  13.4,
  144.7,
  'Guatemala',
  'GT',
  15.7,
  - 90.2,
  'Guinea',
  'GN',
  9.9,
  - 9.6,
  'Guinea-Bissau',
  'GW',
  11.8,
  - 15.1,
  'Guyana',
  'GY',
  4.8,
  - 58.9,
  'Haiti',
  'HT',
  18.9,
  - 72.2,
  'Honduras',
  'HN',
  15.1,
  - 86.2,
  'Hong Kong',
  'HK',
  22.3,
  114.1,
  'Hungary',
  'HU',
  47.1,
  19.5,
  'Iceland',
  'IS',
  64.9,
  - 19,
  'India',
  'IN',
  20.5,
  78.9,
  'Indonesia',
  'ID',
  - 0.7,
  113.9,
  'Iran',
  'IR',
  32.4,
  53.6,
  'Iraq',
  'IQ',
  33.2,
  43.6,
  'Ireland',
  'IE',
  53.4,
  - 8.2,
  'Israel',
  'IL',
  31,
  34.8,
  'Italy',
  'IT',
  41.8,
  12.5,
  'Jamaica',
  'JM',
  18.1,
  - 77.2,
  'Japan',
  'JP',
  36.2,
  138.2,
  'Jordan',
  'JO',
  30.5,
  36.2,
  'Kazakhstan',
  'KZ',
  48,
  66.9,
  'Kenya',
  'KE',
  - 0,
  37.9,
  'Kiribati',
  'KI',
  - 3.3,
  - 168.7,
  'Kosovo',
  'XK',
  42.6,
  20.9,
  'Kuwait',
  'KW',
  29.3,
  47.4,
  'Kyrgyzstan',
  'KG',
  41.2,
  74.7,
  'Laos',
  'LA',
  19.8,
  102.4,
  'Latvia',
  'LV',
  56.8,
  24.6,
  'Lebanon',
  'LB',
  33.8,
  35.8,
  'Lesotho',
  'LS',
  - 29.6,
  28.2,
  'Liberia',
  'LR',
  6.4,
  - 9.4,
  'Libya',
  'LY',
  26.3,
  17.2,
  'Liechtenstein',
  'LI',
  47.1,
  9.5,
  'Lithuania',
  'LT',
  55.1,
  23.8,
  'Luxembourg',
  'LU',
  49.8,
  6.1,
  'Macau',
  'MO',
  22.1,
  113.5,
  'Macedonia [FYROM]',
  'MK',
  41.6,
  21.7,
  'Madagascar',
  'MG',
  - 18.7,
  46.8,
  'Malawi',
  'MW',
  - 13.2,
  34.3,
  'Malaysia',
  'MY',
  4.2,
  101.9,
  'Maldives',
  'MV',
  3.2,
  73.2,
  'Mali',
  'ML',
  17.5,
  - 3.9,
  'Malta',
  'MT',
  35.9,
  14.3,
  'Marshall Islands',
  'MH',
  7.1,
  171.1,
  'Martinique',
  'MQ',
  14.6,
  - 61,
  'Mauritania',
  'MR',
  21,
  - 10.9,
  'Mauritius',
  'MU',
  - 20.3,
  57.5,
  'Mayotte',
  'YT',
  - 12.8,
  45.1,
  'Mexico',
  'MX',
  23.6,
  - 102.5,
  'Micronesia',
  'FM',
  7.4,
  150.5,
  'Moldova',
  'MD',
  47.4,
  28.3,
  'Monaco',
  'MC',
  43.7,
  7.4,
  'Mongolia',
  'MN',
  46.8,
  103.8,
  'Montenegro',
  'ME',
  42.7,
  19.3,
  'Montserrat',
  'MS',
  16.7,
  - 62.1,
  'Morocco',
  'MA',
  31.7,
  - 7,
  'Mozambique',
  'MZ',
  - 18.6,
  35.5,
  'Myanmar [Burma]',
  'MM',
  21.9,
  95.9,
  'Namibia',
  'NA',
  - 22.9,
  18.4,
  'Nauru',
  'NR',
  - 0.5,
  166.9,
  'Nepal',
  'NP',
  28.3,
  84.1,
  'Netherlands',
  'NL',
  52.1,
  5.2,
  'Netherlands Antilles',
  'AN',
  12.2,
  - 69,
  'New Caledonia',
  'NC',
  - 20.9,
  165.6,
  'New Zealand',
  'NZ',
  - 40.9,
  174.8,
  'Nicaragua',
  'NI',
  12.8,
  - 85.2,
  'Niger',
  'NE',
  17.6,
  8,
  'Nigeria',
  'NG',
  9,
  8.6,
  'Niue',
  'NU',
  - 19,
  - 169.8,
  'Norfolk Island',
  'NF',
  - 29,
  167.9,
  'North Korea',
  'KP',
  40.3,
  127.5,
  'Northern Mariana Islands',
  'MP',
  17.3,
  145.3,
  'Norway',
  'NO',
  60.4,
  8.4,
  'Oman',
  'OM',
  21.5,
  55.9,
  'Pakistan',
  'PK',
  30.3,
  69.3,
  'Palau',
  'PW',
  7.5,
  134.5,
  'Palestinian Territories',
  'PS',
  31.9,
  35.2,
  'Panama',
  'PA',
  8.5,
  - 80.7,
  'Papua New Guinea',
  'PG',
  - 6.3,
  143.9,
  'Paraguay',
  'PY',
  - 23.4,
  - 58.4,
  'Peru',
  'PE',
  - 9.1,
  - 75,
  'Philippines',
  'PH',
  12.8,
  121.7,
  'Pitcairn Islands',
  'PN',
  - 24.7,
  - 127.4,
  'Poland',
  'PL',
  51.9,
  19.1,
  'Portugal',
  'PT',
  39.3,
  - 8.2,
  'Puerto Rico',
  'PR',
  18.2,
  - 66.5,
  'Qatar',
  'QA',
  25.3,
  51.1,
  'Romania',
  'RO',
  45.9,
  24.9,
  'Russia',
  'RU',
  61.5,
  105.3,
  'Rwanda',
  'RW',
  - 1.9,
  29.8,
  'Réunion',
  'RE',
  - 21.1,
  55.5,
  'Saint Helena',
  'SH',
  - 24.1,
  - 10,
  'Saint Kitts',
  'KN',
  17.3,
  - 62.7,
  'Saint Lucia',
  'LC',
  13.9,
  - 60.9,
  'Saint Pierre',
  'PM',
  46.9,
  - 56.2,
  'Saint Vincent',
  'VC',
  12.9,
  - 61.2,
  'Samoa',
  'WS',
  - 13.7,
  - 172.1,
  'San Marino',
  'SM',
  43.9,
  12.4,
  'Saudi Arabia',
  'SA',
  23.8,
  45,
  'Scotland',
  'SCT',
  56.5,
  4.2,
  'Senegal',
  'SN',
  14.4,
  - 14.4,
  'Serbia',
  'RS',
  44,
  21,
  'Seychelles',
  'SC',
  - 4.6,
  55.4,
  'Sierra Leone',
  'SL',
  8.4,
  - 11.7,
  'Singapore',
  'SG',
  1.3,
  103.8,
  'Slovakia',
  'SK',
  48.6,
  19.6,
  'Slovenia',
  'SI',
  46.1,
  14.9,
  'Solomon Islands',
  'SB',
  - 9.6,
  160.1,
  'Somalia',
  'SO',
  5.1,
  46.1,
  'South Africa',
  'ZA',
  - 30.5,
  22.9,
  'South Georgia',
  'GS',
  - 54.4,
  - 36.5,
  'South Korea',
  'KR',
  35.9,
  127.7,
  'Spain',
  'ES',
  40.4,
  - 3.7,
  'Sri Lanka',
  'LK',
  7.8,
  80.7,
  'Sudan',
  'SD',
  12.8,
  30.2,
  'Suriname',
  'SR',
  3.9,
  - 56,
  'Svalbard and Jan Mayen',
  'SJ',
  77.5,
  23.6,
  'Swaziland',
  'SZ',
  - 26.5,
  31.4,
  'Sweden',
  'SE',
  60.1,
  18.6,
  'Switzerland',
  'CH',
  46.8,
  8.2,
  'Syria',
  'SY',
  34.8,
  38.9,
  'São Tomé and Príncipe',
  'ST',
  0.1,
  6.6,
  'Taiwan',
  'TW',
  23.6,
  120.9,
  'Tajikistan',
  'TJ',
  38.8,
  71.2,
  'Tanzania',
  'TZ',
  - 6.3,
  34.8,
  'Thailand',
  'TH',
  15.8,
  100.9,
  'Timor-Leste',
  'TL',
  - 8.8,
  125.7,
  'Togo',
  'TG',
  8.6,
  0.8,
  'Tokelau',
  'TK',
  - 8.9,
  - 171.8,
  'Tonga',
  'TO',
  - 21.1,
  - 175.1,
  'Trinidad and Tobago',
  'TT',
  10.6,
  - 61.2,
  'Tunisia',
  'TN',
  33.8,
  9.5,
  'Turkey',
  'TR',
  38.9,
  35.2,
  'Turkmenistan',
  'TM',
  38.9,
  59.5,
  'Turks and Caicos Islands',
  'TC',
  21.6,
  - 71.7,
  'Tuvalu',
  'TV',
  - 7.1,
  177.6,
  'U.S. Minor Outlying Islands',
  'UM',
  0,
  0,
  'U.S. Virgin Islands',
  'VI',
  18.3,
  - 64.8,
  'Uganda',
  'UG',
  1.3,
  32.2,
  'Ukraine',
  'UA',
  48.3,
  31.1,
  'United Arab Emirates',
  'AE',
  23.4,
  53.8,
  'United Kingdom',
  'GB',
  55.3,
  - 3.4,
  'United States',
  'US',
  37,
  - 95.7,
  'Uruguay',
  'UY',
  - 32.5,
  - 55.7,
  'Uzbekistan',
  'UZ',
  41.3,
  64.5,
  'Vanuatu',
  'VU',
  - 15.3,
  166.9,
  'Vatican City',
  'VA',
  41.9,
  12.4,
  'Venezuela',
  'VE',
  6.4,
  - 66.5,
  'Vietnam',
  'VN',
  14,
  108.2,
  'Wallis and Futuna',
  'WF',
  - 13.7,
  - 177.1,
  'Western Sahara',
  'EH',
  24.2,
  - 12.8,
  'Yemen',
  'YE',
  15.5,
  48.5,
  'Zambia',
  'ZM',
  - 13.1,
  27.8,
  'Zimbabwe',
  'ZW',
  - 19,
  29.1
];
n.Vr = 'wss://p2p.haxball.com/';
n.Ee = 'https://haxball-replay-analyzer.github.io/';
n.Vf = [
  {
    urls: 'stun:stun.l.google.com:19302'
  }
];
n.A = new Yb;
R.jn = new Ib([0,
  0,
  2,
  1,
  0,
  0.35,
  1,
  0,
  1,
  0,
  0.7,
  1,
  0,
  0,
  0,
  1]);
R.kn = new Ib([0,
  - 1,
  3,
  0,
  0,
  0.35,
  0,
  0,
  0,
  0,
  0.65,
  0,
  0,
  1,
  3,
  1]);
mb.N = '<div class=\'dialog change-location-view\'><h1>Change Location</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'change\'>Change</button><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
Da.N = '<div class=\'chatbox-view\'><div data-hook=\'log\' class=\'log\'><p>Controls:<br/>Move: WASD or Arrows<br/>Kick: X, Space, Ctrl, Shift, Numpad 0<br/>View: Numbers 1 to 4</p></div><div class=\'autocompletebox\' data-hook=\'autocompletebox\'></div><div class=\'input\'><input data-hook=\'input\' type=\'text\' /><button data-hook=\'send\'>Send</button></div></div>';
kb.N = '<div class=\'choose-nickname-view\'><img src="https://kpias760.github.io/haxball-replay-analyzer.github.io/images/falafcio.png" /><div class=\'dialog\'><h1>Haxball Replay Analyzer</h1><div style=\'display: none\' class=\'label-input\'><label>Nick:</label><input data-hook=\'input\' type=\'text\' /></div><button id=\'button_ok\' data-hook=\'ok\'>Start</button></div></div>';
jb.N = '<div class=\'connecting-view\'><div class=\'dialog\'><h1>Connecting</h1><div class=\'connecting-view-log\' data-hook=\'log\'></div><button data-hook=\'cancel\'>Cancel</button></div></div>';
ib.N = '<div class=\'create-room-view\'><div class=\'dialog\'><h1>Create room</h1><div class=\'label-input\'><label>Room name:</label><input data-hook=\'name\' required /></div><div class=\'label-input\'><label>Password:</label><input data-hook=\'pass\' /></div><div class=\'label-input\'><label>Max players:</label><select data-hook=\'max-pl\'></select></div><button data-hook=\'unlisted\'></button><div class=\'row\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'create\'>Create</button></div></div></div>';
Ka.N = '<div class=\'disconnected-view\'><div class=\'dialog basic-dialog\'><h1>Disconnected</h1><p data-hook=\'reason\'></p><div class=\'buttons\'><button data-hook=\'ok\'>Ok</button><button data-hook=\'replay\'>Save replay</button></div></div></div>';
hb.N = '<div id=\'game-state-view\' class=\'game-state-view\'><div class=\'bar-container\'><div class=\'bar\'><div class=\'scoreboard\'><div class=\'teamicon red\'></div><div class=\'score\' data-hook=\'red-score\'>0</div><div>-</div><div class=\'score\' data-hook=\'blue-score\'>0</div><div class=\'teamicon blue\'></div></div><div data-hook=\'timer\'></div></div></div><div class=\'canvas\' data-hook=\'canvas\'></div></div>';
ja.N = '<div class=\'game-view\' tabindex=\'-1\'><div class=\'top-section\' data-hook=\'gameplay-section\'></div><div class=\'bottom-section\'><div data-hook=\'stats\'></div><div data-hook=\'chatbox\'></div><div class=\'buttons\'><button data-hook=\'menu\'>☰ Menu<span class=\'tooltip\'>Toggle room menu [Escape]</span></button><button id="settings_button" data-hook=\'settings\'>⛭ Settings</button><button id=\'button_staty\' data-hook=\'staty\'>📈 Game stats</button><button id=\'button_gif\' data-hook=\'gif_creator\' style=\'display:none\'>📷 Create GIF</button></div></div><div id="popups" data-hook=\'popups\'></div></div>';
gb.N = '<div class=\'dialog kick-player-view\'><h1 id="tytul" data-hook=\'title\'></h1><div class=label-input><label>Reason: </label><input type=\'text\' data-hook=\'reason\' /></div><button data-hook=\'ban-btn\'><i class=\'icon-block\'></i>Ban from rejoining: <span data-hook=\'ban-text\'></span></button><div class="row"><button data-hook=\'close\'>Cancel</button><button data-hook=\'kick\'>Kick</button></div></div>';
gxd.N = '';
exd.N = '<div class=\'simple-dialog-view\'><div class=\'dialog basic-dialog\'><h1 data-hook=\'title\'></h1><p data-hook=\'content\'></p><div class=\'buttons\' data-hook=\'buttons\'></div></div></div>';
fb.N = '<div class=\'dialog basic-dialog leave-room-view\'><h1>Leave room?</h1><p>Are you sure you want to leave the room?</p><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'leave\'><i class=\'icon-logout\'></i>Leave</button></div></div>';
eb.N = '<div class=\'dialog pick-stadium-view\'><h1>Pick a stadium</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'pick\'>Pick</button><button data-hook=\'delete\'>Delete</button><div class=\'file-btn\'><label for=\'stadfile\'>Load</label><input id=\'stadfile\' type=\'file\' accept=\'.hbs\' data-hook=\'file\'/></div><button data-hook=\'export\'>Export</button><div class=\'spacer\'></div><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
db.N = '<div class=\'dialog\' style=\'min-width:200px\'><h1 data-hook=\'name\'></h1><button data-hook=\'admin\'></button><button data-hook=\'kick\'>Kick</button><button data-hook=\'close\'>Close</button></div>';
cb.N = '<div class=\'player-list-item\'><div data-hook=\'flag\' class=\'flagico\'></div><div data-hook=\'name\'></div><div data-hook=\'ping\'></div></div>';
za.N = '<div class=\'player-list-view\'><div class=\'buttons\'><button data-hook=\'join-btn\'>Join</button><button data-hook=\'reset-btn\' class=\'admin-only\'></button></div><div class=\'list\' data-hook=\'list\'></div></div>';
ha.N = '<div class=\'replay-controls-view\'><button id=\'reset_button\' data-hook=\'reset\'>⏮<span class="tooltip">Reset</span></button><button id=\'play_button\' data-hook=\'play\'><i data-hook=\'playicon\'></i><span class="tooltip">Play/Pause</span></button><div data-hook=\'spd\'>1x</div><button id=\'spddown\' data-hook=\'spddn\'>-<span class="tooltip">Slower</span></button><button data-hook=\'spdup\'>+<span class="tooltip">Faster</span></button><div data-hook=\'time\'>00:00</div><div class=\'timebar\' data-hook=\'timebar\'><div class=\'barbg\'><div class=\'bar\' data-hook=\'progbar\'></div></div><div class=\'timetooltip\' data-hook=\'timetooltip\'></div></div><button id=\'button_leave\' data-hook=\'leave\'>Leave</button></div>';
bb.N = '<div class=\'dialog basic-dialog room-link-view\'><h1>Room link</h1><p>Use this url to link others directly into this room.</p><input data-hook=\'link\' readonly></input><div class=\'buttons\'><button data-hook=\'close\'>Close</button><button data-hook=\'copy\'>Copy to clipboard</button></div></div>';
ab.tj = '<tr><td><span data-hook=\'tag\'></span><span data-hook=\'name\'></span></td><td data-hook=\'players\'></td><td data-hook=\'pass\'></td><td><div data-hook=\'flag\' class=\'flagico\'></div><span data-hook=\'distance\'></span></td></tr>';
Aa.tj = '<div></div>';
Za.N = '<div class=\'room-password-view\'><div class=\'dialog\'><h1>Password required</h1><div class=\'label-input\'><label>Password:</label><input data-hook=\'input\' /></div><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'ok\'>Ok</button></div></div></div>';
Ya.N = '<div id=\'room-view\' class=\'room-view\'><div class=\'container\'><h1 data-hook=\'room-name\'></h1><div class=\'header-btns\'><button data-hook=\'rec-btn\'><i class=\'icon-circle\'></i>Rec</button><button data-hook=\'link-btn\'><i class=\'icon-link\'></i>Link</button><button data-hook=\'leave-btn\'><i class=\'icon-logout\'></i>Leave</button></div><div class=\'teams\'><div class=\'tools admin-only\'><button data-hook=\'auto-btn\'>Auto</button><button data-hook=\'rand-btn\'>Rand</button><button data-hook=\'lock-btn\'>Lock</button><button data-hook=\'reset-all-btn\'>Reset</button></div><div data-hook=\'red-list\'></div><div data-hook=\'spec-list\'></div><div data-hook=\'blue-list\'></div><div class=\'spacer admin-only\'></div></div><div class=\'settings\'><div><label class=\'lbl\'>Time limit</label><select data-hook=\'time-limit-sel\'></select></div><div><label class=\'lbl\'>Score limit</label><select data-hook=\'score-limit-sel\'></select></div><div><label class=\'lbl\'>Stadium</label><label class=\'val\' data-hook=\'stadium-name\'>testing the stadium name</label><button class=\'admin-only\' data-hook=\'stadium-pick\'>Pick</button></div></div><div class=\'controls admin-only\'><button data-hook=\'start-btn\'><i class=\'icon-play\'></i>Start game</button><button data-hook=\'stop-btn\'><i class=\'icon-stop\'></i>Stop game</button><button data-hook=\'pause-btn\'><i class=\'icon-pause\'></i>Pause</button></div></div></div>';
aa.N = '<div class=\'dialog settings-view\'><h1>Settings</h1><button data-hook=\'close\'>Close</button><div class=\'tabs\'><button data-hook=\'soundbtn\'>Sound</button><button data-hook=\'videobtn\'>Video</button><button data-hook=\'inputbtn\'>Input</button><button data-hook=\'miscbtn\'>Misc</button></div><div data-hook=\'presskey\' tabindex=\'-1\'><div>Press a key</div></div><div class=\'tabcontents\'><div class=\'section\' data-hook=\'miscsec\'><div class=\'loc\' data-hook=\'loc\'></div><div class=\'loc\' data-hook=\'loc-ovr\'></div><button data-hook=\'loc-ovr-btn\'></button></div><div class=\'section\' data-hook=\'soundsec\'><div data-hook="tsound-main">Sounds enabled</div><div data-hook="tsound-chat">Chat sound enabled</div><div data-hook="tsound-highlight">Nick highlight sound enabled</div><div data-hook="tsound-crowd">Crowd sound enabled</div></div><div class=\'section\' data-hook=\'inputsec\'></div><div class=\'section\' data-hook=\'videosec\'><div>Viewport Mode:<select data-hook=\'viewmode\'><option>Dynamic</option><option>Restricted 840x410</option><option>Full 1x Zoom</option><option>Full 1.25x Zoom</option><option>Full 1.5x Zoom</option><option>Full 1.75x Zoom</option><option>Full 2x Zoom</option><option>Full 2.25x Zoom</option><option>Full 2.5x Zoom</option></select></div><div>FPS Limit:<select data-hook=\'fps\'><option>None (Recommended)</option><option>30</option></select></div><div>Resolution Scaling:<select data-hook=\'resscale\'><option>100%</option><option>75%</option><option>50%</option><option>25%</option></select></div><div>Player To Follow:<select data-hook=\'follow\'>' + playersToFollowList() + '</select></div><div data-hook="tvideo-teamcol">Custom team colors enabled</div><div data-hook="tvideo-showindicators">Show chat indicators</div><div data-hook="tvideo-showavatars">Show player avatars</div></div></div></div>';
aa.$l = 0;
P.N = '<div class=\'simple-dialog-view\'><div class=\'dialog basic-dialog\'><h1 data-hook=\'title\'></h1><p data-hook=\'content\'></p><div class=\'buttons\' data-hook=\'buttons\'></div></div></div>';
Xa.N = '<div class=\'stats-view\'><div data-hook=\'graph\'></div></div>';
Wa.N = '<div class=\'unsupported-browser-view\'><div class=\'dialog\'><h1>Firefox issue</h1><p>Sorry! It seems that the newest version of Firefox has some major bug, that doesn\'t allow </p><p>The missing features are: <span data-hook=\'features\'></span></p><h2>Recommended browsers:</h2><div><a href="https://www.mozilla.org/firefox/new/"><img src="images/firefox-icon.png"/>Firefox</a></div><div><a href="https://www.google.com/chrome/"><img src="images/chrome-icon.png"/>Chrome</a></div><div><a href="http://www.opera.com/"><img src="images/opera-icon.png"/>Opera</a></div></div></div>';

// Start interfejsu odtwarzacza (DOM, zasoby, IndexedDB). Dawniej u.qp() przy imporcie
// modułu; teraz woła go src/index.js przed pierwszym renderem Reacta.
export function startApp() {
  u.qp()
}

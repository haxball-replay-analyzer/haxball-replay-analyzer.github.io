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

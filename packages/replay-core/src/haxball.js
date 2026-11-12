// Klient gry HaxBall (dekoder .hbr2, stan pokoju, fizyka) wydzielony z src/game2.js.
// To jest przerobiony kod HaxBalla (nazwy po minifikacji), NIE jest objęty licencją MIT repozytorium
// (patrz README i decyzje właściciela): nie publikować jako osobnej paczki.
// Dopiski HBRA: lista słuchaczy pokoju (roomDispatch, addRoomListener, removeRoomListener),
// wywołania słuchacza statystyk w O.prototype.C (this.Ma.statsListener; tylko czyta stan, nie
// zmienia przebiegu ticku, TD-053), kc.fj() raz, limit rozpakowania (inflateRawLimited, TD-043).
// Bez DOM: tylko ES, performance i console (sprawdza ESLint no-undef, patrz package.json).
/* eslint-disable no-useless-concat, no-extend-native, no-self-compare, no-cond-assign, no-use-before-define, no-mixed-operators, default-case, no-loop-func, new-parens, no-sequences, no-array-constructor, no-redeclare, eqeqeq, no-unused-vars, no-unused-expressions */
/* global JSON5, qc -- wolne odwołania z klienta HaxBall: JSON5 (parser stadionu z pliku .hbs, tylko UI), qc (rejestr klas Haxe, nieużywany) */

import pako from 'pako';

// Limit bajtów po rozpakowaniu (TD-043, dopisek HBRA): wspólny budżet dla każdego inflateRaw
// (zdarzenia w Jb i stadiony w Pa.va), ustawiany przez analyzeReplay na czas analizy.
// Rozpakowanie strumieniowe przerywa się po przekroczeniu budżetu, więc mały plik z dużym blokiem
// zer nie zajmie gigabajtów. Infinity (domyślnie, odtwarzacz) = zwykłe pako.inflateRaw.
var inflateBudget = Infinity;
function setInflateBudget(n) {
  var old = inflateBudget;
  inflateBudget = n;
  return old
}
function inflateRawLimited(data) {
  if (Infinity === inflateBudget) return pako.inflateRaw(data);
  var inf = new pako.Inflate({ raw: !0, chunkSize: 65536 }),
    collect = inf.onData;
  inf.onData = function (chunk) {
    inflateBudget -= chunk.length;
    if (0 > inflateBudget) {
      var e = new Error('Replay too large after decompression');
      e.code = 'replay_too_large';
      throw e
    }
    collect.call(this, chunk)
  };
  inf.push(data, !0);
  if (inf.err) throw inf.msg || 'inflate error ' + inf.err;
  return inf.result
}

// Wywołania zwrotne pokoju (fa: tl wejście gracza, Ni gol, Ki start meczu, vf stop...) jako lista
// słuchaczy. Dawniej każde pole miało jedną funkcję ustawianą przez widok (Gb.ri); teraz widok
// i statystyki to osobni słuchacze. Klon pokoju (fa.qd, rysowanie) nie kopiuje słuchaczy.
function roomDispatch(room, key) {
  var f = function () {
    for (var ls = room.roomListeners.slice(), i = 0; i < ls.length; i++) {
      var g = ls[i][key];
      null != g && g.apply(this, arguments)
    }
  };
  f.roomDispatch = !0;
  return f
}

function addRoomListener(room, listener) {
  null == room.roomListeners && (room.roomListeners = []);
  0 > room.roomListeners.indexOf(listener) && room.roomListeners.push(listener);
  for (var k in listener) {
    var f = room[k];
    null != f && f.roomDispatch || (room[k] = roomDispatch(room, k))
  }
}

function removeRoomListener(room, listener) {
  if (null == listener || null == room.roomListeners) return;
  var i = room.roomListeners.indexOf(listener);
  0 <= i && room.roomListeners.splice(i, 1);
  for (var k in listener) {
    for (var used = !1, j = 0; j < room.roomListeners.length; j++) null != room.roomListeners[j][k] && (used = !0);
    used || (room[k] = null)
  }
}
function r() {
}
function q(a) {
  this.Ta = a;
  Error.captureStackTrace && Error.captureStackTrace(this, q)
}
function B() {
  this.ud = 0;
  this.v = 32;
  this.h = 63;
  this.m = 1;
  this.a = new H(0, 0)
}
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
function L() {
  this.v = 32;
  this.h = 63;
  this.m = 1;
  this.Ua = 0;
  this.wa = new H(0, 0)
}
function Fa() {
  this.hc = - 1;
  this.gc = null;
  this.F = [
  ]
}
function nb() {
  this.R = 0;
  this.ne = 1 / 0;
  this.Hb = this.ec = 100;
  this.Yd = this.Zd = 0
}
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
function la() {
  this.da = 0
}
function La() {
  this.da = 0
}
function Ma() {
  this.da = 0
}
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
function ta() {
  this.da = 0
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
    new ka,
    new ka
  ];
  this.kb[1].fb.push(p.fa.R);
  this.kb[2].fb.push(p.xa.R)
}
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
function ka() {
  this.ed = 16777215;
  this.fb = [
  ]
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
  this.ge = new Eb;
  this.Bh = 255;
  this.Ge = this.Ye = 0;
  this.Lf = !0;
  this.pf = !1
}
function Bb(a) {
  this.xp = a
}
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
function sb() {
  this.qe = p.Ia;
  this.ca = new H(0, 0);
  this.W = new H(0, 0)
}
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
function vb() {
}
function Cb() {
}
function ia() {
}
function y() {
}
function H(a, b) {
  this.x = a;
  this.y = b
}
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
  c = inflateRawLimited(a.sb());
  this.Lc = new F(new DataView(c.buffer, c.byteOffset, c.byteLength));
  this.Cq(this.Lc);
  c = this.Lc.sb();
  this.Lc = new F(new DataView(c.buffer, c.byteOffset, c.byteLength), !1);
  this.ui();
  this.Wh = performance.now();
  this.uc = - 1
}
function Kb(a) {
  this.Id = a
}
function V(a) {
  this.Ri = new Ia;
  this.te = this.cc = 0;
  this.le = new Ia;
  this.uc = this.bc = this.rd = 0;
  this.Ac = 0.06;
  this.mh = 16.666666666666668;
  this.Ff = 120;
  yb.call(this, a)
}
function ya() {
}
function Ta() {
}
function cc() {
}
function Ua() {
  this.da = 0
}
function yb(a) {
  this.Y = 0;
  this.T = a
}
function Ia() {
  this.list = [
  ]
}
function m() {
  this.da = 0
}
function w(a, b) {
  null == b && (b = !1);
  this.o = a;
  this.Sa = b;
  this.a = 0
}
function F(a, b) {
  null == b && (b = !1);
  this.o = a;
  this.Sa = b;
  this.a = 0
}
function dc() {
  this.hash = 0
}
function U() {
}
function J() {
}
function K() {
}
function ec() {
}
function D() {
}
function C(a, b) {
  var c = Object.create(a),
    d;
  for (d in b) c[d] = b[d];
  b.toString !== Object.prototype.toString && (c.toString = b.toString);
  return c
}
var Ab = Ab || {
};
D.b = !0;
D.bj = function (a, b) {
  var c = a.charCodeAt(b);
  if (c == c) return c
};
D.substr = function (a, b, c) {
  if (null == c) c = a.length;
  else if (0 > c) if (0 == b) c = a.length + c;
  else return '';
  return a.substr(b, c)
};
D.remove = function (a, b) {
  var c = a.indexOf(b);
  if (- 1 == c) return !1;
  a.splice(c, 1);
  return !0
};
ec.b = !0;
ec.Mm = function (a) {
  var b = [
  ];
  if (null != a) {
    var c = Object.prototype.hasOwnProperty,
      d;
    for (d in a) '__id__' != d && 'hx__closures__' != d && c.call(a, d) && b.push(d)
  }
  return b
};
K.b = !0;
K.ye = function (a) {
  return r.Be(a, '')
};
K.parseInt = function (a) {
  a = parseInt(a, !a || '0' != a[0] || 'x' != a[1] && 'X' != a[1] ? 10 : 16);
  return isNaN(a) ? null : a
};
J.b = !0;
J.startsWith = function (a, b) {
  return a.length >= b.length ? D.substr(a, 0, b.length) == b : !1
};
J.ls = function (a, b) {
  var c = D.bj(a, b);
  return 8 < c && 14 > c ? !0 : 32 == c
};
J.Gs = function (a) {
  for (var b = a.length, c = 0; c < b && J.ls(a, b - c - 1);) ++c;
  return 0 < c ? D.substr(a, 0, b - c) : a
};
J.Af = function (a) {
  var b,
    c = '';
  for (b = 2 - a.length; c.length < b;) c += '0';
  return c + (null == a ? 'null' : '' + a)
};
J.replace = function (a, b, c) {
  return a.split(b).join(c)
};
J.Vg = function (a, b) {
  for (var c = ''; c = '0123456789ABCDEF'.charAt(a & 15) + c, a >>>= 4, 0 < a;);
  if (null != b) for (; c.length < b;) c = '0' + c;
  return c
};
U.b = !0;
U.Qc = function (a, b) {
  return a.length <= b ? a : D.substr(a, 0, b)
};
U.Zr = function (a) {
  for (var b = '', c = 0, d = a.byteLength; c < d;) b += J.Vg(a[c++], 2);
  return b
};
dc.b = !0;
dc.prototype = {
  Yr: function (a) {
    for (var b = 0, c = a.length; b < c;) this.hash += a[b++],
      this.hash += this.hash << 10,
      this.hash ^= this.hash >>> 6
  },
  f: dc
};
F.b = !0;
F.jo = function (a, b) {
  var c = a.getUint8(b),
    d,
    e,
    f,
    g,
    k,
    l = b;
  if (0 == (c & 128)) ++b;
  else if (192 == (c & 224)) d = a.getUint8(b + 1),
    c = (c & 31) << 6 | d & 63,
    b += 2;
  else if (224 == (c & 240)) d = a.getUint8(b + 1),
    e = a.getUint8(b + 2),
    c = (c & 15) << 12 | (d & 63) << 6 | e & 63,
    b += 3;
  else if (240 == (c & 248)) d = a.getUint8(b + 1),
    e = a.getUint8(b + 2),
    f = a.getUint8(b + 3),
    c = (c & 7) << 18 | (d & 63) << 12 | (e & 63) << 6 | f & 63,
    b += 4;
  else if (248 == (c & 252)) d = a.getUint8(b + 1),
    e = a.getUint8(b + 2),
    f = a.getUint8(b + 3),
    g = a.getUint8(b + 4),
    c = (c & 3) << 24 | (d & 63) << 18 | (e & 63) << 12 | (f & 63) << 6 | g & 63,
    b += 5;
  else if (252 == (c & 254)) d = a.getUint8(b + 1),
    e = a.getUint8(b + 2),
    f = a.getUint8(b + 3),
    g = a.getUint8(b + 4),
    k = a.getUint8(b + 5),
    c = (c & 1) << 30 | (d & 63) << 24 | (e & 63) << 18 | (f & 63) << 12 | (g & 63) << 6 | k & 63,
    b += 6;
  else throw new q('Cannot decode UTF8 character at offset ' + b + ': charCode (' + c + ') is invalid');
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
    for (a = b + a; b < a;) c = F.jo(this.o, b),
      b += c.length,
      d += String.fromCodePoint(c['char']);
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
w.b = !0;
w.ha = function (a, b) {
  null == b && (b = !1);
  null == a && (a = 16);
  return new w(new DataView(new ArrayBuffer(a)), b)
};
w.uo = function (a, b, c) {
  var d = c;
  if (0 > a) throw new q('Cannot encode UTF8 character: charCode (' + a + ') is negative');
  if (128 > a) b.setUint8(c, a & 127),
    ++c;
  else if (2048 > a) b.setUint8(c, a >> 6 & 31 | 192),
    b.setUint8(c + 1, a & 63 | 128),
    c += 2;
  else if (65536 > a) b.setUint8(c, a >> 12 & 15 | 224),
    b.setUint8(c + 1, a >> 6 & 63 | 128),
    b.setUint8(c + 2, a & 63 | 128),
    c += 3;
  else if (2097152 > a) b.setUint8(c, a >> 18 & 7 | 240),
    b.setUint8(c + 1, a >> 12 & 63 | 128),
    b.setUint8(c + 2, a >> 6 & 63 | 128),
    b.setUint8(c + 3, a & 63 | 128),
    c += 4;
  else if (67108864 > a) b.setUint8(c, a >> 24 & 3 | 248),
    b.setUint8(c + 1, a >> 18 & 63 | 128),
    b.setUint8(c + 2, a >> 12 & 63 | 128),
    b.setUint8(c + 3, a >> 6 & 63 | 128),
    b.setUint8(c + 4, a & 63 | 128),
    c += 5;
  else if (- 2147483648 > a) b.setUint8(c, a >> 30 & 1 | 252),
    b.setUint8(c + 1, a >> 24 & 63 | 128),
    b.setUint8(c + 2, a >> 18 & 63 | 128),
    b.setUint8(c + 3, a >> 12 & 63 | 128),
    b.setUint8(c + 4, a >> 6 & 63 | 128),
    b.setUint8(c + 5, a & 63 | 128),
    c += 6;
  else throw new q('Cannot encode UTF8 character: charCode (' + a + ') is too large (>= 0x80000000)');
  return c - d
};
w.En = function (a) {
  if (0 >
    a) throw new q('Cannot calculate length of UTF8 character: charCode (' + a + ') is negative');
  if (128 > a) return 1;
  if (2048 > a) return 2;
  if (65536 > a) return 3;
  if (2097152 > a) return 4;
  if (67108864 > a) return 5;
  if (- 2147483648 > a) return 6;
  throw new q('Cannot calculate length of UTF8 character: charCode (' + a + ') is too large (>= 0x80000000)');
};
w.Kf = function (a) {
  for (var b = 0, c = a.length, d = 0; d < c;) b += w.En(D.bj(a, d++));
  return b
};
w.Fn = function (a) {
  a >>>= 0;
  return 128 > a ? 1 : 16384 > a ? 2 : 2097152 > a ? 3 : 268435456 > a ? 4 : 5
};
w.prototype = {
  Kg: function () {
    var a = new ArrayBuffer(this.a),
      b = new Uint8Array(this.o.buffer, this.o.byteOffset, this.a);
    (new Uint8Array(a)).set(b);
    return a
  },
  Sb: function () {
    return new Uint8Array(this.o.buffer, this.o.byteOffset, this.a)
  },
  Hd: function () {
    return new DataView(this.o.buffer, this.o.byteOffset, this.a)
  },
  Gr: function () {
    return new F(this.Hd(), this.Sa)
  },
  rc: function (a) {
    this.o.byteLength < a && this.Yq(2 * this.o.byteLength >= a ? 2 * this.o.byteLength : a)
  },
  Yq: function (a) {
    if (1 > a) throw new q('Can\'t resize buffer to a capacity lower than 1');
    if (this.o.byteLength <
      a) {
      var b = new Uint8Array(this.o.buffer);
      a = new ArrayBuffer(a);
      (new Uint8Array(a)).set(b);
      this.o = new DataView(a)
    }
  },
  l: function (a) {
    var b = this.a++;
    this.rc(this.a);
    this.o.setUint8(b, a)
  },
  Xi: function (a) {
    var b = this.a;
    this.a += 2;
    this.rc(this.a);
    this.o.setInt16(b, a, this.Sa)
  },
  Ub: function (a) {
    var b = this.a;
    this.a += 2;
    this.rc(this.a);
    this.o.setUint16(b, a, this.Sa)
  },
  O: function (a) {
    var b = this.a;
    this.a += 4;
    this.rc(this.a);
    this.o.setInt32(b, a, this.Sa)
  },
  tb: function (a) {
    var b = this.a;
    this.a += 4;
    this.rc(this.a);
    this.o.setUint32(b, a, this.Sa)
  },
  Wi: function (a) {
    var b = this.a;
    this.a += 4;
    this.rc(this.a);
    this.o.setFloat32(b, a, this.Sa)
  },
  s: function (a) {
    var b = this.a;
    this.a += 8;
    this.rc(this.a);
    this.o.setFloat64(b, a, this.Sa)
  },
  Vb: function (a) {
    var b = this.a;
    this.a += a.byteLength;
    this.rc(this.a);
    (new Uint8Array(this.o.buffer, this.o.byteOffset, this.o.byteLength)).set(a, b)
  },
  Mg: function (a) {
    this.Vb(new Uint8Array(a))
  },
  mc: function (a) {
    this.lb(w.Kf(a));
    this.Og(a)
  },
  Db: function (a) {
    null == a ? this.lb(0) : (this.lb(w.Kf(a) + 1), this.Og(a))
  },
  Im: function (a) {
    var b = w.Kf(a);
    if (255 < b) throw new q(null);
    this.l(b);
    this.Og(a)
  },
  Ng: function (a) {
    this.mc(JSON.stringify(a))
  },
  Og: function (a) {
    var b = this.a;
    this.rc(b + w.Kf(a));
    for (var c = a.length, d = 0; d < c;) b += w.uo(D.bj(a, d++), this.o, b);
    this.a = b
  },
  lb: function (a) {
    var b = this.a;
    a >>>= 0;
    this.rc(b + w.Fn(a));
    this.o.setUint8(b, a | 128);
    128 <= a ? (this.o.setUint8(b + 1, a >> 7 | 128), 16384 <= a ? (this.o.setUint8(b + 2, a >> 14 | 128), 2097152 <= a ? (this.o.setUint8(b + 3, a >> 21 | 128), 268435456 <= a ? (this.o.setUint8(b + 4, a >> 28 & 127), a = 5) : (this.o.setUint8(b + 3, this.o.getUint8(b +
      3) & 127), a = 4)) : (this.o.setUint8(b + 2, this.o.getUint8(b + 2) & 127), a = 3)) : (this.o.setUint8(b + 1, this.o.getUint8(b + 1) & 127), a = 2)) : (this.o.setUint8(b, this.o.getUint8(b) & 127), a = 1);
    this.a += a
  },
  f: w
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
m.fh = function (a) {
  var b = a.B(),
    b = Object.create(m.Qm.get(b).prototype);
  b.da = 0;
  b.mb = 0;
  b.va(a);
  return b
};
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
Ia.b = !0;
Ia.ss = function (a, b, c) {
  if (0 == a.length) for (a = 0; a < b.length;) c.push(b[a++]);
  else if (0 == b.length) for (b = 0; b < a.length;) c.push(a[b++]);
  else for (var d = 0, e = a.length, f = 0, g = b.length; ;) {
    var k = a[d],
      l = b[f];
    if (k.mb <= l.mb) {
      if (c.push(k), ++d, d >= e) {
        for (; f < g;) c.push(b[f++]);
        break
      }
    } else if (c.push(l), ++f, f >= g) {
      for (; d < e;) c.push(a[d++]);
      break
    }
  }
};
Ia.prototype = {
  Rm: function (a) {
    for (var b = 0, c = a.mb, d = a.da, e = 0, f = this.list; e < f.length;) {
      var g = f[e];
      ++e;
      var k = g.mb;
      if (k > c) break;
      if (k == c) {
        g = g.da;
        if (g > d) break;
        g == d && ++d
      }
      ++b
    }
    a.da = d;
    this.list.splice(b, 0, a)
  },
  Cs: function (a) {
    for (var b = 0, c = 0, d = this.list; c < d.length && !(d[c++].mb >= a);) ++b;
    this.list.splice(0, b)
  },
  as: function (a, b) {
    for (var c = this.list; 0 < c.length;) c.pop();
    Ia.ss(a.list, b.list, this.list)
  },
  Ds: function (a) {
    for (var b = 0, c = this.list, d = 0, e = c.length; d < e;) {
      var f = c[d++];
      f.ue != a && (c[b] = f, ++b)
    }
    for (; c.length > b;) c.pop()
  },
  bs: function (a) {
    for (var b = 0, c = 0, d = this.list; c < d.length && !(d[c++].mb >= a);) ++b;
    return b
  },
  f: Ia
};
yb.b = !0;
yb.prototype = {
  f: yb
};
Ua.b = !0;
Ua.ma = m;
Ua.prototype = C(m.prototype, {
  apply: function (a) {
    a.Sn(this.Rg)
  },
  ua: function (a) {
    a.lb(this.Rg.byteLength);
    a.Mg(this.Rg)
  },
  va: function (a) {
    this.Rg = a.Cl(a.Ab())
  },
  f: Ua
});
cc.b = !0;
cc.prototype = {
  f: cc
};
Ta.b = !0;
ya.b = !0;
V.b = !0;
V.ma = yb;
V.prototype = C(yb.prototype, {
  ra: function () {
    throw new q('missing implementation');
  },
  Sf: function () {
    throw new q('missing implementation');
  },
  C: function () {
    throw new q('missing implementation');
  },
  zj: function (a) {
    for (var b = this.le.list, c = 0, d = b.length, e = 0; e < a;) {
      for (++e; c < d;) {
        var f = b[c];
        if (f.mb != this.Y) break;
        f.apply(this.T);
        null != this.fc && this.fc(f);
        this.cc++;
        ++c
      }
      this.T.C(1);
      this.te += this.cc;
      this.cc = 0;
      this.Y++
    }
    for (; c < d;) {
      a = b[c];
      if (a.mb != this.Y || a.da != this.cc) break;
      a.apply(this.T);
      null != this.fc && this.fc(a);
      this.cc++;
      ++c
    }
    b.splice(0, c)
  },
  Cg: function (a) {
    a.mb == this.Y && a.da <= this.cc ? (a.da = this.cc++, a.apply(this.T), null != this.fc && this.fc(a)) : this.le.Rm(a)
  },
  wk: function (a, b) {
    if (0 >= a) return this.T;
    a > this.Ff && (a = this.Ff);
    ya.zc++;
    var c = this.T.sc(),
      d;
    null != b ? (this.Ri.as(this.le, b), d = this.Ri) : d = this.le;
    d = d.list;
    for (var e = 0, f = d.length, g = this.Y, k = a | 0, l = g + k; g <= l;) {
      for (; e < f;) {
        var t = d[e];
        if (t.mb > g) break;
        t.zf.Ba && t.apply(c);
        ++e
      }
      c.C(g != l ? 1 : a - k);
      ++g
    }
    for (d = this.Ri.list; 0 < d.length;) d.pop();
    return c
  },
  kr: function (a) {
    300 < a && (a = 300);
    0 > a && (a = 0);
    this.bc = this.Ac * a | 0
  },
  gm: function (a) {
    this.rd = this.Ac * (- 200 > a ? - 200 : 200 < a ? 200 : a)
  },
  f: V
}); Kb.b = !0; Kb.prototype = {
  f: Kb
}; Jb.b = !0; Jb.ma = V; Jb.prototype = C(V.prototype, {
  Cq: function (a) {
    for (var b = a.Ob(), c = 0, d = 0; d < b;) {
      ++d;
      var c = c + a.Ab(),
        e = a.B();
      //console.log("TU",a,b,c,d,e);
      this.Vk.push({
        mj: c / this.mf,
        kind: e
      })
    }
  },
  Dl: function () {
    var a = this.Lc;
    0 < a.o.byteLength - a.a ? (a = this.Lc.Ab(), this.hg += a, a = this.Lc.Ob(), this.gg = m.fh(this.Lc), this.gg.P = a) : this.gg = null
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
    var a = performance.now(),
      b = a - this.Wh;
    this.Wh = a;
    0 < this.Fd ? (this.Qb +=
      10000, this.Qb > this.Fd && (this.Qb = this.Fd, this.Fd = - 1)) : this.Qb += b * this.pl;
    a = this.mf * this.mh;
    this.Qb > a && (this.Qb = a);
    b = this.Qb * this.Ac;
    a = b | 0;
    for (this.sk = b - a; this.Y < a;) {
      for (; null != this.gg && this.hg == this.Y;) b = this.gg,
        b.apply(this.T),
        null != this.fc && this.fc(b),
        this.Dl();
      this.Y++;
      this.T.C(1)
    }
  },
  er: function (a) {
    this.Fd = a;
    a < this.Qb && this.ui();
    // console.log('e', this.ui.toString());
    // console.log(this.Lc);
  },
  ui: function () {
    this.hg = 0;
    this.Qb = this.Y = this.Lc.a = 0;
    this.T.ja(this.Lc);
    this.Dl()
  },
  f: Jb
}); H.b = !0; H.prototype = {
  f: H
}; y.b = !0; y.i = function (a, b) {
  null != a && a(b)
}; ia.b = !0; ia.i = function (a, b, c) {
  null != a && a(b, c)
}; Cb.b = !0; Cb.i = function (a, b, c, d) {
  null != a && a(b, c, d)
}; vb.b = !0; vb.i = function (a, b, c, d, e) {
  null != a && a(b, c, d, e)
};
ua.b = !0;
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
O.b = !0;
O.Rd = [
  Ta
];
O.qd = function (a, b) {
  a.Ma = b.Ma.sc();
  a.ib = b.ib;
  a.Da = b.Da;
  a.ta = b.ta.sc();
  a.vc = b.vc;
  a.Bb = b.Bb;
  a.Pb = b.Pb;
  a.Kb = b.Kb;
  a.Hc = b.Hc;
  a.Oa = b.Oa;
  a.S = b.S;
  a.ae = b.ae
};
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
      null == b && (b = new ca, a.H = b, this.ta.F.push(b));
      var c = this.S.ge;
      b.R = 0;
      b.Z = c.Z;
      b.aa = c.aa;
      b.Ca = c.Ca;
      b.m = c.m;
      b.h = 39;
      b.v = a.ea.v | c.v;
      var d = a.ea == p.fa ? this.S.Dd : this.S.md;
      0 == d.length ? (b.a.x = a.ea.Ch * this.S.$b, b.a.y = 0) : (a = b.a, d = d[d.length - 1], a.x = d.x, a.y = d.y);
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
      var footballStats = this.Ma.statsListener; // createFootballStats() podpięte do pokoju (tylko analiza)
      null != footballStats && footballStats.beforeTick(this);
      for (var b = this.Ma.I, c = 0; c < b.length;) {
        var d = b[c];
        ++c;
        if (null != d.H) {
          0 == (d.ob & 16) && (d.Wb = !1);
          var e = this.S.ge;
          0 < d.Sc && d.Sc--;
          d.yc < this.Ma.ce && d.yc++;
          if (d.Wb && 0 >= d.Sc && 0 <= d.yc) {
            // console.log("iksnął", d.w, d.Wb, d.Sc, d.yc);
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
                  let ballDisc = l; // kopnięty dysk: tłumienie i grawitacja do celnego strzału (TD-048)
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
                  null != footballStats && footballStats.onKick(d, ball, ballDisc);
                  //console.log("chyba pozycja piłki (jednak nie)",h,l,d,f,t,n);
                  f = !0
                }
              }
            }
            //console.log("chyba ruch",d.w, d.H.D.x, d.H.D.y);
            //console.log("chyba iksuje", d.w, d.Sc, d.cb);
            f && (null != this.Ma.ji && this.Ma.ji(d), d.Wb = !1, d.Sc = this.Ma.yd, d.yc -= this.Ma.Zc)
          }
          f = d.ob;
          k = g = 0;
          0 != (f & 1) && --k;
          0 != (f & 2) && ++k;
          0 != (f & 4) && --g;
          0 != (f & 8) && ++g;
          0 != g && 0 != k && (f = Math.sqrt(g * g + k * k), g /= f, k /= f);
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
      for (g = d.length; e < g;) f = e++,
        k = d[f],
        0 != (k.v & 128) && (O.dk[c] = f, f = O.Yk[c], k = k.a, f.x = k.x, f.y = k.y, ++c);
      this.ta.C(a);
      if (0 == this.Bb) {
        for (a = 0; a < b.length;) c = b[a],
          ++a,
          null != c.H && (c.H.h = 39 | this.ae.cp);
        b = this.ta.F[0].D;
        0 < b.x * b.x + b.y * b.y && (this.Bb = 1)
      } else if (1 == this.Bb) {
        this.Hc +=
          0.016666666666666666;
        // słuchacz tylko czyta stan: jego wynik nie może przerwać ticku (dawniej `return` przy false
        // pomijał zdjęcie barier KO graczom i sprawdzenie goli, więc analiza liczyła inną grę, TD-053)
        null != footballStats && footballStats.onPlayingTick(this, d, b);
        for (a = 0; a < b.length;) d = b[a],
          ++a,
          null != d.H && (d.H.h = 39);
        d = p.Ia;
        b = this.ta.F;
        for (a = 0; a < c && (d = a++, d = this.S.Kn(b[O.dk[d]].a, O.Yk[d]), d == p.Ia););
        //if(d!=p.Ia) //console.log(this.Ma.Pi);//console.log("coś tu chyba gol",a,b,c,d,e,f,g,h,i,k);//k.a = piłka
        d != p.Ia ? (this.Bb = 2, this.vc = 150, this.ae = d, d == p.fa ? this.Kb++ : this.Pb++, null != this.Ma.Ni && this.Ma.Ni(d.pg), null != this.Ma.Ol && this.Ma.Ol(d.$)) : 0 < this.Da && this.Hc >= 60 * this.Da && this.Pb != this.Kb && (null != this.Ma.Pi && this.Ma.Pi(), this.um())
      } else if (2 == this.Bb) this.vc--,
        0 >= this.vc && (0 < this.ib && (this.Pb >= this.ib || this.Kb >= this.ib) || 0 < this.Da && this.Hc >= 60 * this.Da && this.Pb != this.Kb ? this.um() : (this.Gk(), null != this.Ma.lq && this.Ma.lq()));
      else if (3 == this.Bb && (this.vc--, 0 >= this.vc && (b = this.Ma, null != b.K))) {
        b.K = null;
        a = 0;
        for (c = b.I; a < c.length;) d = c[a],
          ++a,
          d.H = null,
          d.Jb = 0;
        null != b.vf && b.vf(null)
      }
    }
  },
  um: function () {
    this.vc = 300;
    this.Bb = 3;
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
      0 == l.length ? (l = k + 1 >> 1, 0 == (k & 1) && (l = - l), g = g.kc * e.Ch, k = 55 * l) : (k >= l.length && (k = l.length - 1), k = l[k], g = k.x, k = k.y);
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
    this.hc != a && (null == b && (this.gc = b = new O), this.hc = a, O.qd(b, this));
    return b
  },
  f: O
};
sb.b = !0;
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
Eb.b = !0;
Eb.prototype = {
  ga: function (a) {
    a.s(this.m);
    a.s(this.aa);
    a.s(this.Ca);
    a.s(this.Ce);
    a.s(this.Te);
    a.s(this.Ue);
    a.s(this.Re);
    var b = this.oa;
    a.s(b.x);
    a.s(b.y);
    a.O(this.v);
    a.s(this.Z);
    a.s(this.Se)
  },
  ja: function (a) {
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
  },
  f: Eb
};
Bb.b = !0;
Bb.prototype = {
  f: Bb
};
h.b = !0;
h.ja = function (a) {
  var b = a.B();
  return 255 == b ? (b = new h, b.Kr(a), b) : h.Kh()[b]
};
h.Kh = function () {
  if (null == h.wb) {
    h.wb = [
    ];
    var a = new h;
    a.ad('Classic', 420, 200, 370, 170, 64, 75);
    h.wb.push(a);
    a = new h;
    a.ad('Easy', 420, 200, 370, 170, 90, 75);
    h.wb.push(a);
    a = new h;
    a.ad('Small', 420, 200, 320, 130, 55, 70);
    h.wb.push(a);
    a = new h;
    a.ad('Big', 600, 270, 550, 240, 80, 80);
    h.wb.push(a);
    a = new h;
    a.ad('Rounded', 420, 200, 370, 170, 64, 75, 75);
    h.wb.push(a);
    a = new h;
    a.Qk('Hockey', 420, 204, 398, 182, 68, 120, 75, 100);
    h.wb.push(a);
    a = new h;
    a.Qk('Big Hockey', 600, 270, 550, 240, 90, 160, 75, 150);
    h.wb.push(a);
    a = new h;
    a.ad('Big Easy', 600, 270, 550, 240, 95, 80);
    h.wb.push(a);
    a = new h;
    a.ad('Big Rounded', 600, 270, 550, 240, 80, 75, 100);
    h.wb.push(a);
    a = new h;
    a.ad('Huge', 750, 350, 700, 320, 100, 80);
    h.wb.push(a);
    for (var a = 0, b = h.wb.length; a < b;) {
      var c = a++;
      h.wb[c].Bh = c
    }
  }
  return h.wb
};
h.wn = function (a, b) {
  if (null != a.trait) {
    var c = b[r.G(a.trait, String)];
    if (null != c) for (var d = 0, e = ec.Mm(c); d < e.length;) {
      var f = e[d];
      ++d;
      null == a[f] && (a[f] = c[f])
    }
  }
};
h.Dn = function (a) {
  if (63 == a) return ['all'];
  var b = [
  ];
  0 != (a & 2) && b.push('red');
  0 != (a & 4) && b.push('blue');
  0 != (a & 1) && b.push('ball');
  0 != (a & 8) && b.push('redKO');
  0 != (a & 16) && b.push('blueKO');
  0 != (a & 32) && b.push('wall');
  0 != (a & 64) && b.push('kick');
  0 != (a & 128) && b.push('score');
  0 != (a & 268435456) && b.push('c0');
  0 != (a & 536870912) && b.push('c1');
  0 != (a & 1073741824) && b.push('c2');
  0 != (a & - 2147483648) && b.push('c3');
  return b
};
h.Fc = function (a) {
  a = r.G(a, Array);
  for (var b = 0, c = 0; c < a.length;) switch (a[c++]) {
    case 'all':
      b |= 63;
      break;
    case 'ball':
      b |= 1;
      break;
    case 'blue':
      b |= 4;
      break;
    case 'blueKO':
      b |= 16;
      break;
    case 'c0':
      b |= 268435456;
      break;
    case 'c1':
      b |= 536870912;
      break;
    case 'c2':
      b |= 1073741824;
      break;
    case 'c3':
      b |= - 2147483648;
      break;
    case 'kick':
      b |= 64;
      break;
    case 'red':
      b |= 2;
      break;
    case 'redKO':
      b |= 8;
      break;
    case 'score':
      b |= 128;
      break;
    case 'wall':
      b |= 32
  }
  return b
};
h.Jc = function (a, b, c, d) {
  c != d && (a[b] = h.Dn(c))
};
h.qg = function (a, b, c) {
  b != c && (a.color = h.Rn(b))
};
h.Rn = function (a) {
  a |= 0;
  return 0 > a ? 'transparent' : J.Vg(a)
};
h.$f = function (a) {
  if ('transparent' == a) return - 1;
  if ('string' == typeof a) return K.parseInt('0x' + K.ye(a));
  if (a instanceof Array && null == a.eb) return ((a[0] | 0) << 16) + ((a[1] | 0) << 8) + (a[2] | 0);
  throw new q('Bad color');
};
h.Tr = function (a) {
  var b = {
    x: a.a.x,
    y: a.a.y
  };
  h.ka(b, 'bCoef', a.m, 1);
  h.Jc(b, 'cMask', a.h, 63);
  h.Jc(b, 'cGroup', a.v, 32);
  return b
};
h.np = function (a) {
  var b = new B;
  b.a.x = r.G(a.x, z);
  b.a.y = r.G(a.y, z);
  var c = a.bCoef;
  null != c && (b.m = r.G(c, z));
  c = a.cMask;
  null != c && (b.h = h.Fc(c));
  a = a.cGroup;
  null != a && (b.v = h.Fc(a));
  return b
};
h.fr = function (a, b) {
  var c = {
    v0: a.W.ud,
    v1: a.ca.ud
  };
  h.ka(c, 'bias', a.Cc, b.Cc);
  h.ka(c, 'bCoef', a.m, b.m);
  var d = a.Co();
  h.ka(c, 'curve', d, 0);
  0 != d && (c.curveF = a.vb);
  h.ka(c, 'vis', a.Za, b.Za);
  h.Jc(c, 'cMask', a.h, b.h);
  h.Jc(c, 'cGroup', a.v, b.v);
  h.qg(c, a.R, b.R);
  return c
};
h.mp = function (a, b) {
  var c = new E,
    d = r.G(a.v1, Pb);
  c.W = b[r.G(a.v0, Pb)];
  c.ca = b[d];
  var d = a.bias,
    e = a.bCoef,
    f = a.curve,
    g = a.curveF,
    k = a.vis,
    l = a.cMask,
    t = a.cGroup,
    m = a.color;
  null != d && (c.Cc = r.G(d, z));
  null != e && (c.m = r.G(e, z));
  null != g ? c.vb = r.G(g, z) : null != f && c.Oc(r.G(f, z));
  null != k && (c.Za = r.G(k, oc));
  null != l && (c.h = h.Fc(l));
  null != t && (c.v = h.Fc(t));
  null != m && (c.R = h.$f(m));
  return c
};
h.ap = function (a) {
  var b = {
    d0: a.Yd,
    d1: a.Zd,
    length: a.Hb >= a.ec ? a.Hb : [
      a.Hb,
      a.ec
    ]
  };
  h.qg(b, a.R, 0);
  h.ka(b, 'strength', a.ne, 1 / 0);
  return b
};
h.jp = function (a, b) {
  var c = new nb,
    d = r.G(a.d0, Pb),
    e = r.G(a.d1, Pb),
    f = a.color,
    g = a.strength,
    k = a.length;
  if (d >= b.length || 0 > d) throw new q(null);
  if (e >= b.length || 0 > e) throw new q(null);
  c.Yd = d;
  c.Zd = e;
  null == k ? (d = b[d], k = b[e], null == d || null == k ? c.ec = c.Hb = 100 : (e = d.a, k = k.a, d = e.x - k.x, e = e.y - k.y, c.ec = c.Hb = Math.sqrt(d * d + e * e))) : k instanceof Array && null == k.eb ? (c.Hb = r.G(k[0], z), c.ec = r.G(k[1], z)) : c.ec = c.Hb = r.G(k, z);
  c.ne = null == g || 'rigid' == g ? 1 / 0 : r.G(g, z);
  null != f && (c.R = h.$f(f));
  return c
};
h.gq = function (a) {
  var b = {
    normal: [
      a.wa.x,
      a.wa.y
    ],
    dist: a.Ua
  };
  h.ka(b, 'bCoef', a.m, 1);
  h.Jc(b, 'cMask', a.h, 63);
  h.Jc(b, 'cGroup', a.v, 32);
  return b
};
h.kp = function (a) {
  var b = new L,
    c = r.G(a.normal, Array),
    d = r.G(c[0], z),
    c = r.G(c[1], z),
    e = b.wa,
    f = Math.sqrt(d * d + c * c);
  e.x = d / f;
  e.y = c / f;
  b.Ua = r.G(a.dist, z);
  d = a.bCoef;
  c = a.cMask;
  a = a.cGroup;
  null != d && (b.m = r.G(d, z));
  null != c && (b.h = h.Fc(c));
  null != a && (b.v = h.Fc(a));
  return b
};
h.Jo = function (a) {
  return {
    p0: [
      a.W.x,
      a.W.y
    ],
    p1: [
      a.ca.x,
      a.ca.y
    ],
    team: a.qe == p.fa ? 'red' : 'blue'
  }
};
h.ip = function (a) {
  var b = new sb,
    c = r.G(a.p0, Array),
    d = r.G(a.p1, Array),
    e = b.W;
  e.x = c[0];
  e.y = c[1];
  c = b.ca;
  c.x = d[0];
  c.y = d[1];
  switch (a.team) {
    case 'blue':
      a = p.xa;
      break;
    case 'red':
      a = p.fa;
      break;
    default:
      throw new q('Bad team value');
  }
  b.qe = a;
  return b
};
h.jq = function (a) {
  var b = {
  };
  h.ka(b, 'bCoef', a.m, 0.5);
  h.ka(b, 'invMass', a.aa, 0.5);
  h.ka(b, 'damping', a.Ca, 0.96);
  h.ka(b, 'acceleration', a.Ce, 0.1);
  h.ka(b, 'kickingAcceleration', a.Te, 0.07);
  h.ka(b, 'kickingDamping', a.Ue, 0.96);
  h.ka(b, 'kickStrength', a.Re, 5);
  h.Jc(b, 'cGroup', a.v, 0);
  if (0 != a.oa.x || 0 != a.oa.y) b.gravity = [
    a.oa.x,
    a.oa.y
  ];
  h.ka(b, 'radius', a.Z, 15);
  h.ka(b, 'kickback', a.Se, 0);
  return b
};
h.lp = function (a) {
  var b = new Eb,
    c = a.bCoef,
    d = a.invMass,
    e = a.damping,
    f = a.acceleration,
    g = a.kickingAcceleration,
    k = a.kickingDamping,
    l = a.kickStrength,
    t = a.gravity,
    m = a.cGroup,
    n = a.radius;
  a = a.kickback;
  null != c && (b.m = r.G(c, z));
  null != d && (b.aa = r.G(d, z));
  null != e && (b.Ca = r.G(e, z));
  null != f && (b.Ce = r.G(f, z));
  null != g && (b.Te = r.G(g, z));
  null != k && (b.Ue = r.G(k, z));
  null != l && (b.Re = r.G(l, z));
  null != t && (c = b.oa, d = r.G(t[1], z), c.x = r.G(t[0], z), c.y = d);
  null != m && (b.v = h.Fc(m));
  null != n && (b.Z = r.G(n, z));
  null != a && (b.Se = r.G(a, z));
  return b
};
h.mo = function (a, b) {
  var c = {
  };
  if (a.a.x != b.a.x || a.a.y != b.a.y) c.pos = [
    a.a.x,
    a.a.y
  ];
  if (a.D.x != b.D.x || a.D.y != b.D.y) c.speed = [
    a.D.x,
    a.D.y
  ];
  if (a.oa.x != b.oa.x || a.oa.y != b.oa.y) c.gravity = [
    a.oa.x,
    a.oa.y
  ];
  h.ka(c, 'radius', a.Z, b.Z);
  h.ka(c, 'bCoef', a.m, b.m);
  h.ka(c, 'invMass', a.aa, b.aa);
  h.ka(c, 'damping', a.Ca, b.Ca);
  h.qg(c, a.R, b.R);
  h.Jc(c, 'cMask', a.h, b.h);
  h.Jc(c, 'cGroup', a.v, b.v);
  return c
};
h.Mk = function (a, b) {
  var c = a.pos,
    d = a.speed,
    e = a.gravity,
    f = a.radius,
    g = a.bCoef,
    k = a.invMass,
    l = a.damping,
    t = a.color,
    m = a.cMask,
    n = a.cGroup;
  if (null != c) {
    var p = b.a;
    p.x = c[0];
    p.y = c[1]
  }
  null != d && (c = b.D, c.x = d[0], c.y = d[1]);
  null != e && (d = b.oa, d.x = e[0], d.y = e[1]);
  null != f && (b.Z = r.G(f, z));
  null != g && (b.m = r.G(g, z));
  null != k && (b.aa = r.G(k, z));
  null != l && (b.Ca = r.G(l, z));
  null != t && (b.R = h.$f(t));
  null != m && (b.h = h.Fc(m));
  null != n && (b.v = h.Fc(n));
  return b
};
h.ka = function (a, b, c, d) {
  c != d && (a[b] = c)
};
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
      for (c = this.Dd; b < c.length;) d = c[b],
        ++b,
        a.s(d.x),
        a.s(d.y);
      a.l(this.md.length);
      b = 0;
      for (c = this.md; b < c.length;) d = c[b],
        ++b,
        a.s(d.x),
        a.s(d.y)
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
    this.ge.ja(a);
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
    for (d = 0; d < c;) ++d,
      e = new E,
      e.ja(a, this.J),
      this.U.push(e);
    this.qa = [
    ];
    c = a.B();
    for (d = 0; d < c;) ++d,
      e = new L,
      e.ja(a),
      this.qa.push(e);
    this.tc = [
    ];
    c = a.B();
    for (d = 0; d < c;) ++d,
      e = new sb,
      e.ja(a),
      this.tc.push(e);
    this.F = [
    ];
    c = a.B();
    for (d = 0; d < c;) ++d,
      e = new ua,
      e.ja(a),
      this.F.push(e);
    this.pb = [
    ];
    c = a.B();
    for (d = 0; d < c;) ++d,
      e = new nb,
      e.ja(a),
      this.pb.push(e);
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
          h.wn(k, g),
            a.push(c(k))
        } catch (wc) {
          throw new q(new Bb('Error in "' + b + '" index: ' + a.length));
        }
      }
    }
    var d = this,
      e = JSON5.parse(a);
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
    'disc0' != a && (null != a ? (a = h.Mk(a, this.dg()), a.v |= 192, this.F.push(a)) : this.F.push(this.dg()));
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
      0 < - (f.y - a.y) * k + (f.x - a.x) * l == 0 < - (g.y - a.y) * k + (g.x - a.x) * l ? f = !1 : (k = g.x - f.x, g = g.y - f.y, f = 0 < - (a.y - f.y) * k + (a.x - f.x) * g == 0 < - (b.y - f.y) * k + (b.x - f.x) * g ? !1 : !0);
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
    for (b = this.J.length; k < b;) l = k++,
      this.J[l].h = f,
      this.J[l].v = g,
      this.J[l].m = 0.1;
    b = this.U.length;
    this.U.push(h);
    this.U.push(p);
    this.U.push(q);
    k = b;
    for (b = this.U.length; k < b;) l = k++,
      this.U[l].h = f,
      this.U[l].v = g,
      this.U[l].m = 0.1;
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
ka.b = !0;
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
    for (var c = 0; c < b;) ++c,
      this.fb.push(a.M())
  },
  f: ka
};
p.b = !0;
p.prototype = {
  f: p
};
fa.b = !0;
fa.Rd = [
  Ta,
  cc
];
fa.qd = function (a, b) {
  a.jc = b.jc;
  if (null ==
    b.I) a.I = null;
  else {
    null == a.I && (a.I = [
    ]);
    for (var c = a.I, d = b.I, e = d.length; c.length > e;) c.pop();
    for (var e = 0, f = d.length; e < f;) {
      var g = e++;
      c[g] = d[g].hs()
    }
  }
  a.K = null == b.K ? null : b.K.sc();
  a.Pc = b.Pc;
  a.ib = b.ib;
  a.Da = b.Da;
  a.ce = b.ce;
  a.Zc = b.Zc;
  a.yd = b.yd;
  a.S = b.S;
  a.kb = b.kb
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
        null !=
          b.H && (D.remove(this.K.ta.F, b.H), b.H = null);
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
    this.Pc = 0 != a.B();
    this.ib = a.M();
    this.Da = a.M();
    this.ce = a.ni();
    this.Zc = a.B();
    this.yd = a.B();
    this.S = h.ja(a);
    var b = 0 != a.B();
    this.K = null;
    b && (this.K = new O, this.K.ja(a, this));
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
    this.hc != a && (null == b && (this.gc = b = new fa), this.hc = a, fa.qd(b, this));
    return b
  },
  f: fa
};
ea.b = !0;
ea.Rd = [
  Ta
];
ea.$r = function (a, b) {
  a.cb = b.cb;
  a.Jb = b.Jb;
  a.Xb = b.Xb;
  a.Jd = b.Jd;
  a.Ld = b.Ld;
  a.Kd = b.Kd;
  a.Ug = b.Ug;
  a.yb = b.yb;
  a.w = b.w;
  a.ob = b.ob;
  a.V = b.V;
  a.Wb = b.Wb;
  a.yc = b.yc;
  a.Sc = b.Sc;
  a.H = null == b.H ? null : b.H.sc();
  a.ea = b.ea
};
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
    this.zc != a && (null == b && (this.an = b = new ea), this.zc = a, ea.$r(b, this));
    return b
  },
  f: ea
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
    a = inflateRawLimited(a.sb(a.Ob()));
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
}); kc.b = !0; kc.fj = function () {
  // rejestr klas zdarzeń: drugie wywołanie nadałoby klasom nowe numery, więc tylko raz
  if (kc.ready) return;
  kc.ready = !0;
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
}; Y.b = !0; Y.la = function (a, b, c) {
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
}; la.ma = m; la.prototype = C(m.prototype, {
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
}); ca.b = !0; ca.Rd = [
  Ta
]; ca.qd = function (a, b) {
  a.Z = b.Z;
  a.m = b.m;
  a.aa = b.aa;
  a.Ca = b.Ca;
  a.R = b.R;
  a.Mj = b.Mj;
  a.h = b.h;
  a.v = b.v;
  var c = a.a,
    d = b.a;
  c.x = d.x;
  c.y = d.y;
  c = a.D;
  d = b.D;
  c.x = d.x;
  c.y = d.y;
  c = a.oa;
  d = b.oa;
  c.x = d.x;
  c.y = d.y
}; ca.prototype = {
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
      0 > e && (e *= this.m * a.m + 1, c *= e, g = f = this.D, f.x = g.x - d * c, f.y = g.y - b * c, a = f = a.D, c = e - c, f.x = a.x + d * c, f.y = a.y + b * c)
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
    if (0 == e) 0 > d && (d = - d, b = - b, c = - c);
    else if (0 > e && (e = - e, d = - d, b = - b, c = - c), d < - e) return;
    d >= this.Z || (d = this.Z - d, f = e = this.a, e.x = f.x + b * d, e.y = f.y + c * d, d = this.D, d = b * d.x + c * d.y, 0 > d && (d *= this.m * a.m + 1, e = a = this.D, a.x = e.x - b * d, a.y = e.y - c * d))
  },
  sc: function () {
    var a = ya.zc,
      b = this.gc;
    this.hc != a && (null == b && (this.gc = b = new ca), this.hc = a, ca.qd(b, this));
    return b
  },
  f: ca
}; nb.b = !0; nb.Rd = [
  Ta
]; nb.prototype = {
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
        if (this.Hb >= this.ec) g = this.Hb,
          k = 0;
        else if (f <=
          this.Hb) g = this.Hb,
            k = 1;
        else if (f >= this.ec) g = this.ec,
          k = - 1;
        else return;
        f = g - f;
        if (0 == 0 * this.ne) d = this.ne * f * 0.5,
          e *= d,
          c *= d,
          k = d = b.D,
          b = b.aa,
          d.x = k.x + e * b,
          d.y = k.y + c * b,
          d = b = a.D,
          a = a.aa,
          b.x = d.x + - e * a,
          b.y = d.y + - c * a;
        else {
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
          0 >= f * k && (d *= f, b = k = b.D, k.x = b.x - e * d, k.y = b.y - c * d, a = b = a.D, d = f - d, b.x = a.x + e * d, b.y = a.y + c * d)
        }
      }
    }
  },
  f: nb
}; Fa.b = !0; Fa.Rd = [
  Ta
]; Fa.qd = function (a, b) {
  if (null == b.F) a.F = null;
  else {
    null == a.F && (a.F = [
    ]);
    for (var c = a.F, d = b.F, e = d.length; c.length > e;) c.pop();
    for (var e = 0, f = d.length; e < f;) {
      var g = e++;
      c[g] = d[g].sc()
    }
  }
  a.J = b.J;
  a.U = b.U;
  a.qa = b.qa;
  a.pb = b.pb
}; Fa.prototype = {
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
      for (e = this.F.length; d < e;) f = this.F[d++],
        0 != (f.h & c.v) && 0 != (f.v & c.h) && c.Pn(f);
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
            0 > g && (g *= c.m * f.m + 1, l = k = c.D, f = f.wa, k.x = l.x - f.x * g, k.y = l.y - f.y * g)
          }
        }
        d = 0;
        for (e = this.U; d < e.length;) f = e[d],
          ++d,
          0 != (f.h & c.v) && 0 != (f.v & c.h) && c.Qn(f);
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
          0 > l && (l *= c.m * f.m + 1, h = f = c.D, f.x = h.x - g * l, f.y = h.y - k * l)
        }
      }
    }
    for (a = 0; 2 > a;) for (++a, b = 0, c = this.pb; b < c.length;) c[b++].C(this.F)
  },
  sc: function () {
    var a = ya.zc,
      b = this.gc;
    this.hc != a && (null == b && (this.gc = b = new Fa), this.hc = a, Fa.qd(b, this));
    return b
  },
  f: Fa
}; L.b = !0; L.prototype = {
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
}; E.b = !0; E.prototype = {
  ga: function (a) {
    var b = 0,
      c = a.a;
    a.l(0);
    a.l(this.W.ud);
    a.l(this.ca.ud);
    0 != this.Cc && (b = 1, a.s(this.Cc));
    this.vb != 1 / 0 && (b |= 2, a.s(this.vb));
    0 != this.R && (b |= 4, a.O(this.R));
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
      0 >= this.vb && (a = c = this.Hg, c.x = - a.x, c.y = - a.y, a = c = this.Ig, c.x = - a.x, c.y = - a.y)
    } else a = this.W.a,
      b = this.ca.a,
      c = a.x - b.x,
      a = - (a.y - b.y),
      b = Math.sqrt(a * a + c * c),
      this.wa = new H(a / b, c / b)
  },
  f: E
}; B.b = !0; B.prototype = {
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
q.b = !0;
q.ma = Error;
q.prototype = C(Error.prototype, {
  f: q
});
r.b = !0;
r.Nm = function (a) {
  if (a instanceof Array && null == a.eb) return Array;
  var b = a.f;
  if (null != b) return b;
  a = r.wj(a);
  return null != a ? r.rn(a) : null
};
r.Be = function (a, b) {
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
        for (f = 0; f < c;) e = f++,
          d += (0 < e ? ',' : '') + r.Be(a[e], b);
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
      for (c in a) f && !a.hasOwnProperty(c) || 'prototype' == c || '__class__' == c || '__super__' == c || '__interfaces__' == c || '__properties__' == c || (2 != d.length && (d += ', \n'), d += b + c + ' : ' + r.Be(a[c], b));
      b = b.substring(1);
      return d + ('\n' + b + '}');
    case 'string':
      return a;
    default:
      return String(a)
  }
};
r.ph = function (a, b) {
  if (null == a) return !1;
  if (a == b) return !0;
  var c = a.Rd;
  if (null != c) for (var d = 0, e = c.length; d < e;) {
    var f = c[d++];
    if (f == b || r.ph(f, b)) return !0
  }
  return r.ph(a.ma, b)
};
r.pn = function (a, b) {
  if (null == b) return !1;
  switch (b) {
    case Array:
      return a instanceof Array ? null == a.eb : !1;
    case oc:
      return 'boolean' == typeof a;
    case sc:
      return !0;
    case z:
      return 'number' == typeof a;
    case Pb:
      return 'number' == typeof a ? (a | 0) === a : !1;
    case String:
      return 'string' == typeof a;
    default:
      if (null != a) if ('function' == typeof b) {
        if (a instanceof b || r.ph(r.Nm(a), b)) return !0
      } else {
        if ('object' == typeof b && r.qn(b) && a instanceof b) return !0
      } else return !1;
      return b == tc && null != a.b || b == uc && null != a.Gf ? !0 : Ab[a.eb] == b
  }
};
r.G = function (a, b) {
  if (r.pn(a, b)) return a;
  throw new q('Cannot cast ' + K.ye(a) + ' to ' + K.ye(b));
};
r.wj = function (a) {
  a = r.sn.call(a).slice(8, - 1);
  return 'Object' == a || 'Function' == a || 'Math' == a || 'JSON' == a ? null : a
};
r.qn = function (a) {
  return null != r.wj(a)
};
r.rn = function (a) {
  return qc[a]
};
null == String.fromCodePoint && (String.fromCodePoint = function (a) {
  return 65536 > a ? String.fromCharCode(a) : String.fromCharCode((a >> 10) + 55232) + String.fromCharCode((a & 1023) + 56320)
});
var Pb = {
},
  sc = {
  },
  z = Number,
  oc = Boolean,
  tc = {
  },
  uc = {
  };
p.Ia = new p(0, 16777215, 0, - 1, 'Spectators', 't-spec', 0, 0);
p.fa = new p(1, 15035990, - 1, 8, 'Red', 't-red', 0, 2);
p.xa = new p(2, 5671397, 1, 16, 'Blue', 't-blue', 0, 4);
p.Ia.pg = p.Ia;
p.fa.pg = p.xa;
p.xa.pg = p.fa;
m.Qm = new Map;
m.yf = 0;
Ua.za = m.Fa({
  Ba: !1,
  Aa: !1
});
ya.zc = 0;
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
h.Fr = w.ha(1024);
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
E.mn = 0.17435839227423353;
E.ln = 5.934119456780721;
r.sn = {
}.toString;

export {
  Ab, Bb, C, Cb, D, F, Ga, H, Ia, J, Jb, K, Kb, La, Ma, Na, Oa, Pa, Qa, S, U, Ua, V, Y,
  addRoomListener, da, ea, ec, fa, h, ia, ka, kc, la, m, ma, na, oa, p, pa, q, qa, r, ra,
  inflateRawLimited, removeRoomListener, sa, setInflateBudget, ta, vb, w, y
};

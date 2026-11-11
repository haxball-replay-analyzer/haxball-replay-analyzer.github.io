// Statystyki piłkarskie HBRA (kod właściciela, MIT): słuchacz pokoju i pętli fizyki.
// Przeniesione z src/game2.js (dawniej zmienne modułu); od 2026-11 z poprawkami TD-044, TD-046–TD-048.
/* eslint-disable eqeqeq, no-mixed-operators, no-redeclare, no-unused-vars, no-loop-func */

import { addRoomListener, p, removeRoomListener } from '../haxball.js';

// Wersja definicji statystyk (TD-049). Podnieś o 1 przy każdej zmianie, która zmienia liczby dla tej
// samej powtórki (podanie, asysta, posiadanie, strzał, gol, klucz gracza). Wynik analizy niesie ją
// w polu statsVersion, a pliki oczekiwane testów razem z liczbami.
//   1: wersja strony 3.3.2: akcja od startu meczu i od wznowienia po golu (TD-044), gol bez kopiącego
//      (TD-046), gracz to wejście do pokoju, nie nick (TD-047)
//   2: celny strzał z lotu piłki z tłumieniem i grawitacją piłki, na każdą bramkę rywala (TD-048)
var STATS_VERSION = 2;

// Ile ticków lotu piłki sprawdza celny strzał: 20 s gry. Piłka bez grawitacji kończy wcześniej,
// gdy jej prędkość spadnie poniżej SHOT_MIN_SPEED (dalej przy tłumieniu 0,99 przeleci < 1 px).
var SHOT_MAX_TICKS = 1200;
var SHOT_MIN_SPEED = 0.01;

// Celny strzał (TD-048): piłka po kopnięciu, lecąc swobodnie, przetnie linię bramki rywala.
// Lot jak w kroku fizyki HaxBalla (ta.C): pozycja += prędkość, potem prędkość = (prędkość +
// grawitacja) * tłumienie; przecięcie jak przy wykrywaniu gola (S.Kn): odcinek ruchu środka piłki
// w jednym ticku przecina odcinek między słupkami. Lot pomija odbicia od ścian, słupków i graczy:
// strzał zablokowany albo obroniony też jest celny, odbity od ściany do bramki nie jest.
//   ball: { x, y, vx, vy } tuż po kopnięciu
//   phys: { damping, gx, gy } kopniętego dysku (Ca, oa)
//   goals: [{ x0, y0, x1, y1, team }], team = drużyna, której to bramka ("Red" albo "Blue")
//   team: drużyna kopiącego
// Zwraca punkt przecięcia linii bramki { x, y } albo null.
function shotTarget(ball, phys, goals, team) {
  var targets = goals.filter(function (g) { return g.team != team });
  if (targets.length == 0) return null;
  var x = ball.x, y = ball.y, vx = ball.vx, vy = ball.vy,
    damping = phys.damping, gx = phys.gx || 0, gy = phys.gy || 0,
    still = gx == 0 && gy == 0;
  for (var t = 0; t < SHOT_MAX_TICKS; t++) {
    var nx = x + vx, ny = y + vy;
    for (var i = 0; i < targets.length; i++) {
      var hit = crossing(x, y, nx, ny, targets[i]);
      if (hit) return hit;
    }
    x = nx;
    y = ny;
    vx = (vx + gx) * damping;
    vy = (vy + gy) * damping;
    if (still && vx * vx + vy * vy < SHOT_MIN_SPEED * SHOT_MIN_SPEED) break;
  }
  return null;
}

// Odcinek (ax, ay)–(bx, by) przecina linię bramki: te same nierówności co S.Kn w haxball.js.
// Zwraca punkt przecięcia albo null.
function crossing(ax, ay, bx, by, g) {
  var kx = bx - ax, ky = by - ay;
  if (0 < -(g.y0 - ay) * kx + (g.x0 - ax) * ky == 0 < -(g.y1 - ay) * kx + (g.x1 - ax) * ky) return null;
  var ex = g.x1 - g.x0, ey = g.y1 - g.y0;
  if (0 < -(ay - g.y0) * ex + (ax - g.x0) * ey == 0 < -(by - g.y0) * ex + (bx - g.x0) * ey) return null;
  // punkt przecięcia: a + s * (b - a), s z iloczynów wektorowych
  var den = kx * ey - ky * ex;
  var s = den == 0 ? 0 : ((g.x0 - ax) * ey - (g.y0 - ay) * ex) / den;
  return { x: ax + s * kx, y: ay + s * ky };
}

// Bramki stadionu (S.tc) w postaci dla shotTarget.
function goalLines(stadium) {
  return stadium.tc.map(function (g) {
    return { x0: g.W.x, y0: g.W.y, x1: g.ca.x, y1: g.ca.y, team: g.qe.w };
  });
}

function parseTime(par) {
  var gt = (par / 60).toFixed();
  var mins = Math.floor(gt / 60);
  gt -= mins * 60;
  if (gt < 10) gt = "0" + gt;
  return "" + mins + ":" + gt;
}

function distanceBetween(a, b) {
  return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

// Statystyki piłkarskie jednej analizy (dawniej zmienne modułu, TD-004). Kod przeniesiony bez zmian
// kolejności działań z O.prototype.C i Gb.ri; O.C woła beforeTick, onKick i onPlayingTick w tych
// samych miejscach pętli, w których stał. attach(room) podpina też wywołania zwrotne pokoju.
function createFootballStats() {
  var kicker, lastKicker, match = [{ stadium: false, started: true, stopped: false, spaceMode: false, realSoccerMode: false, touches: [], thirds: [0, 0, 0], changes: [], gameTicks: -1, kicks: [], shots: [], redTeam: [], blueTeam: [], shotsRed: 0, shotsBlue: 0, passes: [], passesRed: 0, passesBlue: 0, kicksRed: 0, kicksBlue: 0, possRed: 0, possBlue: 0, scoreRed: 0, scoreBlue: 0, player: [], goals: [] }], players = [], playerList = [], updatePlayers = true;
  var toucher = { name: "", team: "0" }, lastToucher = "";
  var redGoalCord = [], blueGoalCord = [], checkTeams = true;
  var goalParsed = 0, playerPos = [], ballRadius = 10;
  var room = null;
  var labels = {};
  var goals = [], goalsStadium = null; // bramki stadionu bieżącej gry (shotTarget)

  // Nazwa gracza w statystykach (TD-047): gracz to wejście do pokoju (id V), nie nick. Zwykle nazwa
  // to nick. Gdy w pokoju jest już inny gracz (inne id) z tą nazwą, kolejny dostaje "nick (2)",
  // "nick (3)"... Ponowne wejście tej samej osoby (nowe id, nikt obecny nie ma tej nazwy) dostaje
  // z powrotem sam nick i łączy się z dawnym wpisem. Nazwa nie zmienia się przez całą powtórkę.
  function label(pl) {
    var l = labels[pl.V];
    if (l !== undefined) return l;
    var taken = [];
    for (var i = 0, li = room ? room.I : []; i < li.length; i++) {
      if (li[i].V != pl.V && labels[li[i].V] !== undefined) taken.push(labels[li[i].V]);
    }
    l = pl.w;
    for (var n = 2; taken.includes(l); n++) l = pl.w + " (" + n + ")";
    labels[pl.V] = l;
    return l;
  }

  // Ostatni kopiący i dotykający liczą się tylko w jednej akcji: od startu meczu albo od wznowienia
  // po golu (TD-044). Bez tego podanie, asysta i posiadanie przechodzą przez gol i z meczu na mecz.
  function resetPlay() {
    kicker = undefined;
    lastKicker = undefined;
    toucher = { name: "", team: "0" };
    lastToucher = "";
  }

  // pierwszy tick gry (O.C, przed pętlą po graczach): gracze obecni od początku
  function beforeTick(game) {
    // bramki czytane z gry przed kopnięciami tego ticku: pierwsze kopnięcie meczu (przy rozpoczęciu)
    // jest przed onPlayingTick, który zapisuje stadion
    if (game.S && game.S !== goalsStadium) {
      goalsStadium = game.S;
      goals = goalLines(game.S);
    }
    if (updatePlayers) {
      let li = game.Ma.I;
      // console.log("chyba lista graczy", li);
      players = players.concat(li);
      for (var i = 0; i < li.length; i++) {
        if (!playerList.includes(label(li[i]))) {
          playerList.push(label(li[i]));
          // console.log('dodałem', li[i].w);
          match[match.length - 1].player.push({
            id: li[i].V,
            nick: label(li[i]),
            nation: li[i].Kd,
            goals: 0,
            assists: 0,
            kicks: 0
          });
        }
      }
      updatePlayers = false;
    }
  }

  // kopnięcie (O.C, pętla po graczach, po zmianie prędkości piłki i gracza); ball = { x, y, vx, vy },
  // disc = kopnięty dysk (tłumienie Ca, grawitacja oa)
  function onKick(d, ball, disc) {
    var phys = disc ? { damping: disc.Ca, gx: disc.oa.x, gy: disc.oa.y } : { damping: 0.99, gx: 0, gy: 0 };
    var to = shotTarget(ball, phys, goals, d.ea.w);
    if (to) {
      match[match.length - 1].shots.push({
        player: label(d),
        from: {
          x: ball.x,
          y: ball.y
        },
        to: to
      });
      if (d.ea.w == "Red") match[match.length - 1].shotsRed++;
      else match[match.length - 1].shotsBlue++;
    }
    if (d.ea.w == "Red") match[match.length - 1].kicksRed++;
    else match[match.length - 1].kicksBlue++;
    //console.log("sprawdzenie czasu po kopnięciu",this.Hc)
    //console.log("UWAGA",match,playerList)
    match[match.length - 1].kicks.push({
      player: label(d),
      x: ball.x,
      y: ball.y
    });
    //console.log("sprawdzenie czegoś tam",k[0].D,k[0].a);
    if (match[match.length - 1].spaceMode) {
      match[match.length - 1].touches.push(label(d));
      if (toucher.name != undefined && label(d) != toucher.name) {
        lastToucher = toucher;
        if (lastToucher.team == d.ea.w) {
          //console.log("Podanie ",lastKicker.name+" do "+label(d));
          match[match.length - 1].passes.push(lastToucher.name);
          if (lastToucher.team == "Red") match[match.length - 1].passesRed++;
          else match[match.length - 1].passesBlue++;
        }
        //console.log("tacz",label(d));
      }
      toucher = {
        name: label(d),
        team: d.ea.w
      };
    } else {
      if (kicker != undefined && label(d) != kicker.name) {
        lastKicker = kicker;
        if (lastKicker.team == d.ea.w) {
          //console.log("Podanie ",lastKicker.name+" do "+label(d));
          match[match.length - 1].passes.push({
            player: lastKicker.name,
            shot: ball,
            lastShot: match[match.length - 1].kicks[match[match.length - 1].kicks.length - 2]
          });
          if (lastKicker.team == "Red") match[match.length - 1].passesRed++;
          else match[match.length - 1].passesBlue++;
        }
      }
      kicker = {
        name: label(d),
        team: d.ea.w
      };
    }
  }

  // tick trwającego meczu (O.C, stan 1, po kroku fizyki, przed sprawdzeniem gola);
  // false = przerwij O.C jak dawny "return" w bloku stadionu (stadion z mniej niż 2 bramkami)
  function onPlayingTick(game, d, b) {
    if (!match[match.length - 1].stadium) {
      //console.log(a.S);//cały czas wyyświetlany stadion checkpoint
      // console.log('stadion', match, p.fa, game.S);
      // console.log(game.S)
      var st = game.S;
      // console.log(h.qg.toString())
      function getColor(x) {
        if (x < 0) return 'transparent'
        else if (x == 0) return '000000'
        else {
          for (
            var c = "";
            (c = "0123456789ABCDEF".charAt(x & 15) + c), (x >>>= 4), 0 < x;

          );
          // if (null != b) for (; c.length < b; ) c = "0" + c;
          return c;
        }
      }
      function getCMask(x) {
        if (63 == x) return ["all"];
        var b = [];
        0 != (x & 2) && b.push("red");
        0 != (x & 4) && b.push("blue");
        0 != (x & 1) && b.push("ball");
        0 != (x & 8) && b.push("redKO");
        0 != (x & 16) && b.push("blueKO");
        0 != (x & 32) && b.push("wall");
        0 != (x & 64) && b.push("kick");
        0 != (x & 128) && b.push("score");
        0 != (x & 268435456) && b.push("c0");
        0 != (x & 536870912) && b.push("c1");
        0 != (x & 1073741824) && b.push("c2");
        0 != (x & -2147483648) && b.push("c3");
        return b;
      }
      match[match.length - 1].stadium = {
        name: st.w,
        height: st.qc,
        width: st.$b,
        maxViewWidth: st.Ye,
        cameraFollow: (st.Ge == 1 ? 'player' : 'ball'),
        spawnDistance: st.kc,
        kickOffReset: (st.pf ? 'full' : 'partial'),
        bg: {
          type: (st.ld == 1 ? 'grass' : (st.ld == 2 ? 'hockey' : 'none')),
          width: st.Td,
          height: st.Sd,
          kickOffRadius: st.kd,
          cornerRadius: st.Uc,
          color: getColor(st.jd),
          goalLine: st.Fe
        },
        canBeStored: st.Lf,
        redSpawnPoints: st.Dd.map((a) => ([a.x, a.y])),
        blueSpawnPoints: st.md.map((a) => ([a.x, a.y])),
        playerPhysics: {
          bCoef: st.ge.m,
          invMass: st.ge.aa,
          damping: st.ge.Ca,
          acceleration: st.ge.Ce,
          kickingAcceleration: st.ge.Te,
          kickingDamping: st.ge.Ue,
          kickStrength: st.ge.Re,
          cGroup: getCMask(st.ge.v),
          gravity: [st.ge.oa.x, st.ge.oa.y],
          radius: st.ge.Z,
          kickback: st.ge.Se
        },
        segments: st.U.map((a) => ({
          v0: a.W.ud,
          v1: a.ca.ud,
          bias: a.Cc,
          bCoef: a.m,
          curve: (0 != 0 * a.vb ? 0 : Math.abs(114.59155902616465 * Math.atan(1 / a.vb))),
          vis: a.Za,
          cMask: getCMask(a.h),
          cGroup: getCMask(a.v),
          color: getColor(a.R)
        })),
        vertexes: st.J.map((a) => ({
          x: a.a.x,
          y: a.a.y,
          bCoef: a.m,
          cMask: getCMask(a.h),
          cGroup: getCMask(a.v)
        })),
        goals: st.tc.map((a) => ({
          p0: [a.W.x, a.W.y],
          p1: [a.ca.x, a.ca.y],
          team: (a.qe == p.fa ? "red" : "blue")
        })),
        planes: st.qa.map((a) => ({
          normal: [a.wa.x, a.wa.y],
          dist: a.Ua,
          bCoef: a.m,
          cMask: getCMask(a.h),
          cGroup: getCMask(a.v)
        })),
        discs: st.F.map((a) => ({
          pos: [a.a.x, a.a.y],
          speed: [a.D.x, a.D.y],
          gravity: [a.oa.x, a.oa.y],
          radius: a.Z,
          bCoef: a.m,
          invMass: a.aa,
          damping: a.Ca,
          color: getColor(a.R),
          cMask: getCMask(a.h),
          cGroup: getCMask(a.v)
        })),
        joints: st.pb.map((a) => ({
          d0: a.Yd,
          d1: a.Zd,
          length: a.Hb >= a.ec ? a.Hb : [a.Hb, a.ec],
          color: getColor(a.R),
          strength: a.ne == Infinity ? 'rigid' : a.ne
        }))
      }

      match[match.length - 1].stadium.ballPhysics = match[match.length - 1].stadium.discs.splice(0, 1)[0];
      delete match[match.length - 1].stadium.ballPhysics.pos;
      if (match[match.length - 1].stadium.bg.type != 'grass' && match[match.length - 1].stadium.bg.color == '718C5A') {
        delete match[match.length - 1].stadium.bg.color;
      }
      var segments = match[match.length - 1].stadium.segments;
      var trueSegments = st.U;
      var vertexes = match[match.length - 1].stadium.vertexes;
      for (var i = 0; i < segments.length; i++) {
        // console.log('in', segments[i])
        if (segments[i].v0 == 0 && segments[i].v1 == 0) {
          for (var j = 0; j < vertexes.length; j++) {
            if (vertexes[j].x == trueSegments[i].W.a.x && vertexes[j].y == trueSegments[i].W.a.y) segments[i].v0 = j;
            else if (vertexes[j].x == trueSegments[i].ca.a.x && vertexes[j].y == trueSegments[i].ca.a.y) segments[i].v1 = j;
            if (segments[i].v0 != 0 && segments[i].v1 != 0) break;
          }
        }
        // console.log('out', segments[i])
      }
      if (game.S.tc.length < 2) {
        return !1;
      }
      var std = game.S.tc[0];
      ballRadius = game.S.F[0].Z;
      if (game.S.ge.m > 1) {
        match[match.length - 1].spaceMode = true;
        match[match.length - 1].bumps = [];
      }
      else match[match.length - 1].spaceMode = false;
      if (st.w.toLowerCase().includes('real soccer') | st.w.toLowerCase().includes('realsoccer')) match[match.length - 1].realSoccerMode = true;
      if (st.ld === 1 & st.Td > 700 & st.Sd > 400 & (st.w.includes("RS") | st.w.toLowerCase().includes('soccer'))) match[match.length - 1].realSoccerMode = true;

      if (std.qe.w == "Red") redGoalCord = [std.W.x, std.W.y, std.ca.y];
      else blueGoalCord = [std.W.x, std.W.y, std.ca.y];

      std = game.S.tc[1];
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
    }
    //console.log("coś",game.Hc);//checkpoint every tick
    //if (Math.random()<0.01) console.log(b); // gracze są na v==4 i v==2 (redblue)
    //if (Math.random() < 0.002) console.log(a,b);
    match[match.length - 1].gameTicks++;
    if (d[0].a.x < (redGoalCord[0] / 3)) match[match.length - 1].thirds[0]++;
    else if (d[0].a.x < (blueGoalCord[0] / 3)) match[match.length - 1].thirds[1]++;
    else match[match.length - 1].thirds[2]++;
    if (match.length > playerPos.length) playerPos.push([]);
    for (var i = 0; i < b.length; i++) {
      var pi = playerList.indexOf(label(b[i]));
      if (playerPos[match.length - 1][pi] == undefined) playerPos[match.length - 1][pi] = [];
      if (b[i].H != null) playerPos[match.length - 1][pi].push({ x: b[i].H.a.x, y: b[i].H.a.y });
    }
    if (match[match.length - 1].spaceMode) {
      for (var i = 0; i < b.length; i++) {
        if (b[i].H == null) continue;
        if (distanceBetween(b[i].H.a, d[0].a) < (15 + ballRadius + 0.0001)) {
          //console.log("touch",b[i]);// checkpoint teraz
          if (toucher.name != label(b[i])) {
            lastToucher = toucher;
            toucher = { name: label(b[i]), team: b[i].ea.w };
            match[match.length - 1].touches.push(label(b[i]));
          }
        }
        for (var j = i + 1; j < b.length; j++) {
          if (b[j].H == null) continue;
          //if (Math.random()<0.01) console.log(distanceBetween(b[i].H.a,b[j].H.a));
          if (distanceBetween(b[i].H.a, b[j].H.a) < 30.0001) match[match.length - 1].bumps.push(label(b[i]), label(b[j]));
          //if (distanceBetween(b[i].H.a,b[j].H.a) < 30.0001) console.log("bump ",label(b[i]), label(b[j]), distanceBetween(b[i].H.a,b[j].H.a));
        }
      }
    }
    if (checkTeams) {
      for (var i = 0; i < b.length; i++) {
        if (b[i].ea.w == "Red" && !match[match.length - 1].redTeam.includes(label(b[i]))) match[match.length - 1].redTeam.push(label(b[i]));
        else if (b[i].ea.w == "Blue" && !match[match.length - 1].blueTeam.includes(label(b[i]))) match[match.length - 1].blueTeam.push(label(b[i]));
      }
      checkTeams = false;
    }
    if (match[match.length - 1].spaceMode) {
      if (toucher.team == "Red") match[match.length - 1].possRed++;
      else if (toucher.team == "Blue") match[match.length - 1].possBlue++;
    } else if (kicker != undefined) {
      if (kicker.team == "Red") match[match.length - 1].possRed++;
      else match[match.length - 1].possBlue++;
    }
  }

  var roomHandlers = {
    tl: function (b) {
      players.push(b);
      if (!playerList.includes(label(b))) {
        playerList.push(label(b));
        match[match.length - 1].player.push({
          id: b.V,
          nick: label(b),
          nation: b.Kd,
          goals: 0,
          assists: 0,
          kicks: 0
        });
      }
    },
    Ni: function (a) {
      if (a.w == "Red") match[match.length - 1].scoreRed++;//aktualny wynik red lub blue = a.$
      else match[match.length - 1].scoreBlue++;
      if (match[match.length - 1].spaceMode ? toucher.name === "" : kicker == undefined) {
        // gol, zanim ktokolwiek kopnął (dotknął) piłkę w tej akcji (TD-046): strzelec nieznany
        var unknown = { scorer: null, assist: false, currentScore: [match[match.length - 1].scoreRed, match[match.length - 1].scoreBlue] };
        if (!match[match.length - 1].spaceMode) unknown.ballCoord = { x: this.K.Ma.K.ta.F[0].a.x, y: this.K.Ma.K.ta.F[0].a.y };
        match[match.length - 1].goals.push(unknown);
      } else if (match[match.length - 1].spaceMode) {
        if (a.w == toucher.team) {
          match[match.length - 1].goals.push({
            scorer: toucher.name,
            currentScore: [match[match.length - 1].scoreRed, match[match.length - 1].scoreBlue]
          });
          match[match.length - 1].player[playerList.indexOf(toucher.name)].goals++;
          if (lastToucher.name != undefined && a.w == lastToucher.team) {
            match[match.length - 1].goals[match[match.length - 1].goals.length - 1].assist = lastToucher.name;
            match[match.length - 1].player[playerList.indexOf(lastToucher.name)].assists++;
          } else {
            match[match.length - 1].goals[match[match.length - 1].goals.length - 1].assist = false;
          }
        } else {
          match[match.length - 1].goals.push({ scorer: toucher.name + " (own goal)", assist: false, currentScore: [match[match.length - 1].scoreRed, match[match.length - 1].scoreBlue] });
        }
      } else {
        if (a.w == kicker.team) {
          match[match.length - 1].goals.push({
            scorer: kicker.name,
            currentScore: [match[match.length - 1].scoreRed, match[match.length - 1].scoreBlue],
            shot: match[match.length - 1].kicks[match[match.length - 1].kicks.length - 1],
            ballCoord: {
              x: this.K.Ma.K.ta.F[0].a.x,
              y: this.K.Ma.K.ta.F[0].a.y
            }
          });
          match[match.length - 1].player[playerList.indexOf(kicker.name)].goals++;
          if (lastKicker != undefined && a.w == lastKicker.team) {
            match[match.length - 1].goals[match[match.length - 1].goals.length - 1].assist = {
              player: lastKicker.name,
              shot: match[match.length - 1].kicks[match[match.length - 1].kicks.length - 2]
            }
            match[match.length - 1].player[playerList.indexOf(lastKicker.name)].assists++;
          } else {
            match[match.length - 1].goals[match[match.length - 1].goals.length - 1].assist = false;
          }
        } else {
          match[match.length - 1].goals.push({ scorer: kicker.name + " (own goal)", assist: false, currentScore: [match[match.length - 1].scoreRed, match[match.length - 1].scoreBlue] });
        }
      }
      match[match.length - 1].goals[match[match.length - 1].goals.length - 1].for = a.w;
      match[match.length - 1].goals[match[match.length - 1].goals.length - 1].goalIndex = goalParsed;
      goalParsed++;
    },
    Oi: function (a) {
      match[match.length - 1].stopped = true;
    },
    Pi: function () {
      match[match.length - 1].stopped = true;
    },
    // wznowienie po golu (Gk, ustawienie do rozpoczęcia): nowa akcja (TD-044)
    lq: function () {
      resetPlay();
    },
    Ki: function (a) {
      resetPlay(); // start meczu: nowa akcja (TD-044)
      if (match[match.length - 1].stopped) {
        match.push({ started: true, stopped: false, spaceMode: false, realSoccerMode: false, touches: [], thirds: [0, 0, 0], changes: [], gameTicks: -1, kicks: [], shots: [], redTeam: [], blueTeam: [], shotsRed: 0, shotsBlue: 0, passes: [], passesRed: 0, passesBlue: 0, kicksRed: 0, kicksBlue: 0, possRed: 0, possBlue: 0, scoreRed: 0, scoreBlue: 0, goals: [], player: match[match.length - 1].player });
        playerPos.push([]);
        for (var i = 0; i < match[match.length - 1].player.length; i++) {
          match[match.length - 1].player[i].goals = 0;
          match[match.length - 1].player[i].assists = 0;
          match[match.length - 1].player[i].kicks = 0;
        }
      }
    },
    vf: function (a) {
      match[match.length - 1].stopped = true;
      if (match.length > 1 && match[match.length - 1].gameTicks == -1) match.splice(match.length - 1, 1);
      checkTeams = true;
    },
    xl: function (d, e, f) {
      checkTeams = true;
      if (match[match.length - 1].started && !match[match.length - 1].stopped && match[match.length - 1].gameTicks > 0) {
        match[match.length - 1].changes.push([label(e), f.w, parseTime(match[match.length - 1].gameTicks)]);
      }
    }
  };

  var api = {
    beforeTick: beforeTick,
    onKick: onKick,
    onPlayingTick: onPlayingTick,
    attach: function (r) {
      room = r;
      r.statsListener = api;
      addRoomListener(r, roomHandlers)
    },
    detach: function () {
      if (null == room) return;
      room.statsListener = null;
      removeRoomListener(room, roomHandlers);
      room = null
    },
    get match() { return match },
    get playerList() { return playerList },
    get playerPos() { return playerPos },
    get players() { return players }
  };
  return api
}

export { createFootballStats, parseTime, distanceBetween, shotTarget, STATS_VERSION };

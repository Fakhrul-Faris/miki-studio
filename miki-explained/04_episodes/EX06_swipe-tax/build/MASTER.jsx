// MASTER. Cut to the voice (sfx/mix.wav; each shot starts on its word, audio/vo_timeline.json).
// Transitions: camera carry into the sign (1A→1B), paper tears and paper slides. No dissolves. Flat shots drift (camera clock).
var SHOTS = [["1A", 62], ["1B", 129, 10], ["2A", 230, 8], ["2B", 141, 10], ["3A", 140, 8], ["4A", 236, 10], ["5A", 70, 8], ["5B", 80]];
var total = 0; for (var i = 0; i < SHOTS.length; i++) total += SHOTS[i][1];
var c = freshComp("MASTER", total); c.bgColor = [0, 0, 0];
var at = 0, L = {}, START = {}, LEN = {};
for (var i = 0; i < SHOTS.length; i++) {
  var s = SHOTS[i], l = c.layers.add(item(s[0])); l.name = s[0];
  l.startTime = at * F; l.inPoint = at * F; l.outPoint = (at + s[1] + (s[2] || 0)) * F;
  L[s[0]] = l; START[s[0]] = at; LEN[s[0]] = s[1] + (s[2] || 0); at += s[1];
}
function k(shot, rel) { return START[shot] + rel; }
function mk(p, shot, list, mode) { var out = []; for (var i = 0; i < list.length; i++) out.push([k(shot, list[i][0]), list[i][1]]); stepped(keys(p, out), mode || "out"); }
function shadowOn(l) { app.run("comp.open", { comp: "MASTER" }); app.run("layer.style.dropShadow", { layers: [l.index] });
  var v = { useGlobalLight: false, angle: 90, distance: 18, size: 40, opacity: 45 }; for (var q in v) app.run("prop.set", { layer: l.id, path: "layerStyles/dropShadow/" + q, value: v[q] }); }
function matchIn(shot, a, from, s0) { var l = L[shot]; A(l).setValue(a); P(l).setValue(a);
  mk(P(l), shot, [[0, from], [8, a]]); mk(S(l), shot, [[0, [s0, s0]], [8, [100, 100]]]); }
function slideIn(shot, dx, dy) { mk(P(L[shot]), shot, [[0, [W / 2 + dx, H / 2 + dy]], [8, [W / 2, H / 2]]]); shadowOn(L[shot]); }
function drift(shot, s1) { var l = L[shot]; smooth(keys(S(l), [[k(shot, 0), [100, 100]], [k(shot, LEN[shot] - 1), [s1, s1]]]), 40); }
function tear(shot, nextShot, y, seed) {
  var src = L[shot], cut = k(nextShot, 0), r = seed;
  function rnd() { r = (r * 9301 + 49297) % 233280; return r / 233280; }
  var line = []; for (var x = -20; x <= W + 20; x += 22 + Math.round(rnd() * 14)) line.push([x, y + Math.round((rnd() - 0.5) * 34)]);
  for (var h = 0; h < 2; h++) {
    var d = src.duplicate(); d.name = shot + (h ? " torn bottom" : " torn top"); d.inPoint = cut * F; d.outPoint = (cut + 10) * F;
    d.moveBefore(L[nextShot]);
    app.run("comp.open", { comp: "MASTER" }); app.run("layer.addMask", { layer: d.id, shape: "rect", rect: [0, 0, W, H] });
    var sh = new Shape(), v = line.slice(); v = h ? [[-20, H + 40]].concat(v).concat([[W + 20, H + 40]]) : [[-20, -40]].concat(v).concat([[W + 20, -40]]);
    sh.vertices = v; sh.closed = true; d.property("ADBE Mask Parade").property(1).property("ADBE Mask Shape").setValue(sh);
    var dp = P(d); for (var q = dp.numKeys; q >= 1; q--) dp.removeKey(q);
    A(d).setValue([W / 2, y]); dp.setValue([W / 2, y]);
    mk(P(d), nextShot, [[0, [W / 2, y]], [10, [W / 2 + (h ? 160 : -120), y + (h ? 1500 : -1500)]]], "in");
    mk(R(d), nextShot, [[0, 0], [10, h ? 7 : -9]], "in");
    shadowOn(d);
  }
  src.outPoint = cut * F;
}
drift("2A", 104); drift("2B", 104); drift("4A", 103);
matchIn("1B", [540, 960], [540, 960], 150);   // 1A pushes through the struck FREE into the sign's paper → 1B opens on paper
tear("1B", "2A", 960, 11);
slideIn("2B", W, 0);                          // a new page slides over the coin stacks
tear("2B", "3A", 900, 23);
slideIn("4A", 0, H);                          // the receipt page slides up over the price tag
tear("4A", "5A", 1000, 37);
slideIn("5B", -W, 0);                         // back to the sign: the loop
// T3 persistent title: an ochre chip top-left (inside the safe area), from just after the strike until the title fills 5B
var pc = c.layers.addShape(); pc.name = "T3 chip"; A(pc).setValue([0, 0]); P(pc).setValue([245, 200]);
rectIn(grp(pc), [370, 54], null, OCHRE, INK, 2); R(pc).setValue(-1.5);
var pt = text(c, "T3 title", "THE SWIPE TAX", "IBM Plex Mono", "Bold", 30, INK, [70, 182, 350, 44], "center", 60); tiltAbout(pt, [245, 200], -1.5);
for (var q = 0; q < 2; q++) { var tl = q ? c.layer("T3 title") : c.layer("T3 chip"); tl.inPoint = 52 * F; tl.outPoint = START["5B"] * F; }
// A1 light flicker: the whole frame breathes 0–4% darker per 12fps step
var fl = c.layers.addSolid([0, 0, 0], "A1 flicker", W, H, 1); fl.blendingMode = BlendingMode.MULTIPLY;
O(fl).expression = "posterizeTime(12); seedRandom(5 + Math.floor(time * 12), true); random(0, 4)";
// Subtitles: IBM Plex Mono on a paper pill, inside the TikTok safe area (pill bottom above y 1440)
for (var si = 0; si < SUBS.length; si++) {
  var sb = SUBS[si], txt = sb[2], wpx = txt.length * 26.4 + 60, SY = 1390;
  var pill = c.layers.addShape(); pill.name = "sub pill " + (si + 1); P(pill).setValue([0, 0]); A(pill).setValue([0, 0]);
  var pg = pill.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group").property("ADBE Vectors Group");
  var pr = pg.addProperty("ADBE Vector Shape - Rect"); pr.property("ADBE Vector Rect Size").setValue([wpx, 78]); pr.property("ADBE Vector Rect Position").setValue([W / 2, SY]); pr.property("ADBE Vector Rect Roundness").setValue(8);
  pg.addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(PAPER);
  O(pill).setValue(92); pill.inPoint = sb[0] * F; pill.outPoint = sb[1] * F;
  var tl = text(c, "sub " + (si + 1), txt, "IBM Plex Mono", "Medium", 44, INK, [60, SY - 30, W - 120, 62], "center", 0);
  tl.inPoint = sb[0] * F; tl.outPoint = sb[1] * F;
}
app.run("comp.open", { comp: "MASTER" });
app.run("file.import", { paths: [DIR + "sfx/mix.wav"], addToComp: true, time: 0 });
c.layer(1).name = "VO + SFX mix.wav";
var log = []; for (var n in START) log.push(n + "@" + START[n]);
"MASTER built, " + total + " frames: " + log.join(" ");

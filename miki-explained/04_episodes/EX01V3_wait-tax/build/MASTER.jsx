// MASTER. Cut to the voice (audio/voice.wav via sfx/mix.wav; each shot starts on its word, audio/vo_timeline.json).
// Transitions: match cuts, camera carries, paper slides and tears. No dissolves.
var SHOTS = [["1A", 103], ["1B", 108, 8], ["1C", 93, 10], ["2A", 81], ["2B", 70], ["2C", 81], ["2D", 88, 8], ["2E", 43], ["3A", 105, 10],
  ["4A", 42], ["4B", 75], ["5A", 73], ["5B", 54], ["5C", 69]];
var total = 0; for (var i = 0; i < SHOTS.length; i++) total += SHOTS[i][1];
var c = freshComp("MASTER", total); c.bgColor = [0, 0, 0];
var at = 0, L = {}, START = {};
for (var i = 0; i < SHOTS.length; i++) {
  var s = SHOTS[i], l = c.layers.add(item(s[0])); l.name = s[0];
  l.startTime = at * F; l.inPoint = at * F; l.outPoint = (at + s[1] + (s[2] || 0)) * F;
  L[s[0]] = l; START[s[0]] = at; at += s[1];
}
function k(shot, rel) { return START[shot] + rel; }
function mk(p, shot, list, mode) { var out = []; for (var i = 0; i < list.length; i++) out.push([k(shot, list[i][0]), list[i][1]]); stepped(keys(p, out), mode || "out"); }
function shadowOn(l) { app.run("comp.open", { comp: "MASTER" }); app.run("layer.style.dropShadow", { layers: [l.index] });
  var v = { useGlobalLight: false, angle: 90, distance: 18, size: 40, opacity: 45 }; for (var q in v) app.run("prop.set", { layer: l.id, path: "layerStyles/dropShadow/" + q, value: v[q] }); }
function matchIn(shot, a, from, s0) { var l = L[shot]; A(l).setValue(a); P(l).setValue(a);
  mk(P(l), shot, [[0, from], [8, a]]); mk(S(l), shot, [[0, [s0, s0]], [8, [100, 100]]]); }
function slideIn(shot, dx, dy) { mk(P(L[shot]), shot, [[0, [W / 2 + dx, H / 2 + dy]], [8, [W / 2, H / 2]]]); shadowOn(L[shot]); }
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
    var dp = P(d); for (var q = dp.numKeys; q >= 1; q--) dp.removeKey(q);   // a slid-in shot carries position keys
    A(d).setValue([W / 2, y]); dp.setValue([W / 2, y]);
    mk(P(d), nextShot, [[0, [W / 2, y]], [10, [W / 2 + (h ? 160 : -120), y + (h ? 1500 : -1500)]]], "in");
    mk(R(d), nextShot, [[0, 0], [10, h ? 7 : -9]], "in");
    shadowOn(d);
  }
  src.outPoint = cut * F;
}
matchIn("1B", [522, 1008], [540, 960], 170);     // 1A pushes into the clock hub → the carousel opens in its place
slideIn("1C", 0, H);                              // the holiday print slides up over the carousel
tear("1C", "2A", 900, 11);                        // the holiday page tears away to the airport
slideIn("2E", W, 0);                              // a clean page pulls across the split screen
tear("3A", "4A", 960, 29);                        // the research card tears away to the real bench
matchIn("4B", [375, 1013], [700, 1180], 130);     // the real bench → the paper bench
matchIn("5A", [HUB[0], HUB[1]], [540, 960], 190); // 4B pushes into the wall clock → the big clock
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
// Background music as its own layer, as the user set it for the final: Dark Synthwave Beat at -15 dB (about 8 dB under the voice).
app.run("file.import", { paths: [DIR + "audio/Dark Synthwave Beat.mp3"], addToComp: true, time: 0 });
var mu = c.layer(1); mu.name = "Dark Synthwave Beat.mp3"; mu.outPoint = c.duration;
mu.property("ADBE Audio Group").property("ADBE Audio Levels").setValue([-15, -15]);
var log = []; for (var n in START) log.push(n + "@" + START[n]);
"MASTER built, " + total + " frames: " + log.join(" ");

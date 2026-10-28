// MASTER. Cut to the voice (audio/voice.wav; each shot starts on its word, audio/vo_timeline.json).
// Transitions: no dissolves. Paper slides and tears (the previous shot runs a few frames longer underneath), match cuts that
// open registered to the last shot's shape and glide to rest, and camera moves carried inside the shots.
var SHOTS = [["1A", 81], ["1B", 51, 8], ["2A", 95, 8], ["2B", 33], ["2D", 58], ["2C", 43], ["3A", 18], ["3B", 32], ["4A", 34], ["4B", 53],
  ["4C", 34], ["4D", 34], ["4E", 82], ["4F", 65, 10], ["5A", 114, 10], ["6A", 98], ["6B", 55], ["6C", 68]];
var total = 0; for (var i = 0; i < SHOTS.length; i++) total += SHOTS[i][1];
var c = freshComp("MASTER", total); c.bgColor = [0, 0, 0];
var at = 0, L = {}, START = {};
for (var i = 0; i < SHOTS.length; i++) {
  var s = SHOTS[i], l = c.layers.add(item(s[0])); l.name = s[0];
  l.startTime = at * F; l.inPoint = at * F; l.outPoint = (at + s[1] + (s[2] || 0)) * F;
  L[s[0]] = l; START[s[0]] = at; at += s[1];
}
function k(shot, rel) { return START[shot] + rel; }
// keys on a MASTER layer, frames relative to that shot's start
function mk(p, shot, list, mode) { var out = []; for (var i = 0; i < list.length; i++) out.push([k(shot, list[i][0]), list[i][1]]); stepped(keys(p, out), mode || "out"); }
function shadowOn(l) { app.run("comp.open", { comp: "MASTER" }); app.run("layer.style.dropShadow", { layers: [l.index] });
  var v = { useGlobalLight: false, angle: 90, distance: 18, size: 40, opacity: 45 }; for (var q in v) app.run("prop.set", { layer: l.id, path: "layerStyles/dropShadow/" + q, value: v[q] }); }
// match: open with anchor point `a` (in the shot) sitting at screen point `from` at `s0` %, glide to rest over 8 frames
function matchIn(shot, a, from, s0) { var l = L[shot]; A(l).setValue(a); P(l).setValue(a);
  mk(P(l), shot, [[0, from], [8, a]]); mk(S(l), shot, [[0, [s0, s0]], [8, [100, 100]]]); }
// tear: the outgoing shot splits along a jagged line at y and the halves fall away over 10 frames, colour drained
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
    var fx = d.property("ADBE Effect Parade").addProperty("ADBE Tint"); fx.property(3).setValue(100);   // colour drains
    A(d).setValue([W / 2, y]); P(d).setValue([W / 2, y]);
    mk(P(d), nextShot, [[0, [W / 2, y]], [10, [W / 2 + (h ? 160 : -120), y + (h ? 1500 : -1500)]]], "in");
    mk(R(d), nextShot, [[0, 0], [10, h ? 7 : -9]], "in");
    shadowOn(d);
  }
  src.outPoint = cut * F;
}
// 1B → 2A: the street sheet slides up over the corridor
mk(P(L["2A"]), "2A", [[0, [W / 2, H / 2 + H]], [8, [W / 2, H / 2]]]); shadowOn(L["2A"]);
// 2A → 2B: the tape sheet pulls across from the right
mk(P(L["2B"]), "2B", [[0, [W / 2 + W, H / 2]], [8, [W / 2, H / 2]]]); shadowOn(L["2B"]);
// 2D → 2C: arriving from the push into the scissors
mk(S(L["2C"]), "2C", [[0, [140, 140]], [8, [100, 100]]]);
// 2C → 3A: the stopwatch's 10 opens where the tape's 10 was
matchIn("3A", [827, 1102], [537, 986], 420);
// 4D → 4E: the lamp opens where 4D's lamp was, then the wall settles; 4E ends pushing into its lamp
var e = L["4E"]; matchIn("4E", [744, 662], [576, 684], 160);
mk(S(e), "4E", [[0, [160, 160]], [8, [100, 100]], [74, [100, 100]], [81, [320, 320]]]);
// 4F → 5A and 5A → 6A: paper tears
tear("4F", "5A", 1000, 11);
tear("5A", "6A", 818, 29);
// Subtitles: IBM Plex Mono, ink on a paper pill, lower third; cut on per phrase, hidden where the words are already on screen
for (var si = 0; si < SUBS.length; si++) {
  var sb = SUBS[si], txt = sb[2], wpx = txt.length * 26.4 + 60, SY = 1612;
  var pill = c.layers.addShape(); pill.name = "sub pill " + (si + 1); P(pill).setValue([0, 0]); A(pill).setValue([0, 0]);
  var pg = pill.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group").property("ADBE Vectors Group");
  var pr = pg.addProperty("ADBE Vector Shape - Rect"); pr.property("ADBE Vector Rect Size").setValue([wpx, 78]); pr.property("ADBE Vector Rect Position").setValue([W / 2, SY]); pr.property("ADBE Vector Rect Roundness").setValue(8);
  pg.addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(PAPER);
  O(pill).setValue(92); pill.inPoint = sb[0] * F; pill.outPoint = sb[1] * F;
  var tl = text(c, "sub " + (si + 1), txt, "IBM Plex Mono", "Medium", 44, INK, [40, SY - 30, W - 80, 62], "center", 0);
  tl.inPoint = sb[0] * F; tl.outPoint = sb[1] * F;
}
app.run("comp.open", { comp: "MASTER" });
app.run("file.import", { paths: [DIR + "sfx/mix.wav"], addToComp: true, time: 0 });
c.layer(1).name = "VO + SFX mix.wav";
var log = []; for (var n in START) log.push(n + "@" + START[n]);
"MASTER built, " + total + " frames: " + log.join(" ");

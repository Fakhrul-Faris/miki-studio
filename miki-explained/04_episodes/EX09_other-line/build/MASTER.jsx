// MASTER. Cut to the voice (sfx/mix.wav). 1A → 2A is one Blender move (match cut); 2A → 3A → 4A share the lane diagram;
// a paper tear into the snaking-line set (4A → 5A); 5A → 6A is one Blender orbit; 6A's last frame = 1A's first (S1 loop).
var SHOTS = [["1A", 103], ["2A", 178], ["3A", 285], ["4A", 211, 10], ["5A", 148], ["6A", 159]];
var total = 0; for (var i = 0; i < SHOTS.length; i++) total += SHOTS[i][1];
var c = freshComp("MASTER", total); c.bgColor = [0, 0, 0];
var at = 0, L = {}, START = {};
for (var i = 0; i < SHOTS.length; i++) {
  var s = SHOTS[i], l = c.layers.add(item(s[0])); l.name = s[0];
  l.startTime = at * F; l.inPoint = at * F; l.outPoint = (at + s[1] + (s[2] || 0)) * F; L[s[0]] = l; START[s[0]] = at; at += s[1];
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
tear("4A", "5A", 960, 17);
// subtitles (house pill), hidden where the same words are stamped (2 OF 3, IT'S MATH, the jams, the minutes, FAST ONE, the CTA)
var SUBS = [[5, 27, "Why does the other line"], [28, 58, "always move faster?"], [64, 100, "Because it usually does."],
  [103, 145, "Pick one of three checkout lines."], [149, 182, "Only one can be the fastest."], [213, 240, "Another line beats yours."], [242, 258, "It's not bad luck,"],
  [281, 318, "Every line hides a jam."], [389, 420, "One slow customer,"], [423, 456, "and everyone behind them freezes,"], [459, 500, "while the next counter sits empty."],
  [503, 528, "You can't see it coming,"], [531, 565, "so you can't pick around it."],
  [566, 600, "The fix is one long line."], [603, 646, "Airports use it. Banks use it."], [649, 674, "It snakes back and forth"], [676, 700, "and looks twice as long,"],
  [703, 731, "but it feeds every counter,"], [734, 776, "so nobody gets stuck behind the jam."],
  [777, 797, "Three counters,"], [799, 830, "one standard queue model."], [833, 849, "Separate lines:"], [881, 903, "One snaking line:"],
  [925, 960, "So next time you see"], [962, 1000, "one long snaking line, don't groan."]];
for (var si = 0; si < SUBS.length; si++) {
  var sb = SUBS[si], txt = sb[2], wpx = txt.length * 24 + 60, SY = 1390;
  var pill = c.layers.addShape(); pill.name = "sub pill " + (si + 1); P(pill).setValue([0, 0]); A(pill).setValue([0, 0]);
  var pr = grp(pill).addProperty("ADBE Vector Shape - Rect"); pr.property("ADBE Vector Rect Size").setValue([wpx, 72]); pr.property("ADBE Vector Rect Position").setValue([W / 2, SY]); pr.property("ADBE Vector Rect Roundness").setValue(8);
  c.layer("sub pill " + (si + 1)).property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(PAPER);
  O(c.layer("sub pill " + (si + 1))).setValue(92);
  text(c, "sub " + (si + 1), txt, "IBM Plex Mono", "Medium", 40, INK, [60, SY - 27, W - 120, 56], "center", 0);
}
app.run("comp.open", { comp: "MASTER" });
app.run("file.import", { paths: [DIR + "sfx/mix.wav"], addToComp: true, time: 0 });
c.layer(1).name = "VO + bed + SFX mix.wav";
for (var si = 0; si < SUBS.length; si++) { var sb = SUBS[si], ps = [c.layer("sub pill " + (si + 1)), c.layer("sub " + (si + 1))];
  for (var q = 0; q < 2; q++) { ps[q].inPoint = sb[0] * F; ps[q].outPoint = (sb[1] + 1) * F; } }
var log = []; for (var n in START) log.push(n + "@" + START[n]);
"MASTER built, " + total + " frames: " + log.join(" ");

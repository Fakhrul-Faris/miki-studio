// MASTER. Cut to the voice (sfx/mix.wav; shots start on their words, audio/vo_timeline.json).
// 1A → 1B → 2A stay in the one Blender set (match cuts: same set, next moment). Then a tear, slides and a tear; 5A's last
// frame flows into 1A's first (S1 loop). T1: big word-by-word captions in the middle, hidden where the words are stamped.
var SHOTS = [["1A", 80], ["1B", 135], ["2A", 138, 10], ["2B", 165, 8], ["3A", 91, 10], ["4A", 129, 8], ["5A", 64]];
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
tear("2A", "2B", 960, 13);
slideIn("3A", W, 0);                        // the photo slides over the curve
tear("3A", "4A", 900, 29);
slideIn("5A", -W, 0);                       // back to the shop: the loop
// T1 captions [from, to, text, word frames] (MASTER frames, audio/vo_timeline.json)
var CAP = [[4, 35, "ONE SICK BARBER CAN TURN", [4, 9, 13, 20, 27]],
  [80, 106, "YOUR SHOP IS HUMMING", [80, 84, 90, 93]], [108, 123, "THREE BARBERS", [108, 112]],
  [215, 229, "THEN ONE BARBER", [215, 219, 224]], [230, 254, "CALLS IN SICK", [230, 237, 242]], [255, 276, "TWO BARBERS NOW", [255, 258, 267]],
  [291, 309, "WALKING IN", [291, 298]], [311, 326, "THAT'S ONLY", [311, 315]], [336, 352, "BUSIER", [336]],
  [353, 374, "MATHEMATICIANS HAVE A NAME", [353, 364, 368, 370]], [375, 407, "FOR WHAT HAPPENS NEXT", [375, 380, 384, 392]],
  [432, 443, "NEAR FULL", [432, 434]], [444, 463, "EVERY EXTRA CUSTOMER", [444, 447, 454]], [464, 481, "ADDS MORE WAIT", [464, 470, 475]],
  [482, 517, "THAN THE LAST", [482, 487, 490]], [519, 539, "SO THE SHOP ISN'T", [519, 523, 527, 532]],
  [610, 629, "BUSY CLIMBS", [610, 616]], [678, 697, "THE WAIT JUMPS", [678, 681, 685]],
  [738, 760, "MOST QUEUES ARE CLOSER", [738, 743, 748, 754]], [761, 776, "TO THAT EDGE", [761, 767, 771]], [777, 801, "THAN THEY LOOK", [777, 782, 786]]];
var CY = 1384;
for (var ci = 0; ci < CAP.length; ci++) {
  var cp = CAP[ci], sz = cp[2].length > 18 ? 66 : 80, wpx = Math.min(1000, cp[2].length * sz * 0.43 + 70);
  var st = c.layers.addShape(); st.name = "cap strip " + (ci + 1); A(st).setValue([0, 0]); P(st).setValue([W / 2, CY]);
  rectIn(grp(st), [wpx, sz * 1.25], null, CREAM, INK, 3); R(st).setValue(ci % 2 ? 0.8 : -0.8);
  st.inPoint = cp[0] * F; st.outPoint = (cp[1] + 1) * F;
  var tl = text(c, "cap " + (ci + 1), cp[2], "Anton", "Regular", sz, INK, [40, CY - sz * 0.68, W - 80, sz * 1.4], "center", 10);
  tiltAbout(tl, [W / 2, CY], ci % 2 ? 0.8 : -0.8);
  var wf = []; for (var j = 0; j < cp[3].length; j++) wf.push(cp[3][j]); cutWords(tl, wf);
  tl.inPoint = cp[0] * F; tl.outPoint = (cp[1] + 1) * F;
}
app.run("comp.open", { comp: "MASTER" });
app.run("file.import", { paths: [DIR + "sfx/mix.wav"], addToComp: true, time: 0 });
c.layer(1).name = "VO + bed + SFX mix.wav";
var log = []; for (var n in START) log.push(n + "@" + START[n]);
"MASTER built, " + total + " frames: " + log.join(" ");

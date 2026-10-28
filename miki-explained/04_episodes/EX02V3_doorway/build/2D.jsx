// SHOT 2D. The Shop Opens. 72 frames. Walls stand up from a slight fold (user: ~5°, don't push it): scaleY 92→100% about
// the floor edge, expo out, hard stop. Awning folds down from its top edge. Slow 8° orbit.
var c = freshComp("2D", 58);
var pl = plate(c, "2D_plate.png", "2D_plate", 0);
function wall(file, name, hinge, f, from) {
  var l = plate(c, file, name, -1), k = S(l).value[0], hp = sp(hinge[0], hinge[1]);
  A(l).setValue([hinge[0], hinge[1], 0]); P(l).setValue([hp[0], hp[1], -1]);
  stepped(keys(S(l), [[0, [k, k * from, k]], [f, [k, k * from, k]], [f + 6, [k, k, k]]]), "out");
  return l;
}
wall("2D_wall_back.png", "2D_wall_back", [960, 1360], 26, 0.92);
wall("2D_wall_left.png", "2D_wall_left", [352, 1286], 30, 0.92);
var awn = wall("2D_awning.png", "2D_awning", [955, 741], 36, 0.8);
// CUT. ONLY. on the awning, following its slope and fold (parented, positions in the awning's source space)
var t = text(c, "CUT. ONLY.", "CUT. ONLY.", "Anton", "Regular", 92, INK, [0, 0, 700, 120], "center", 10);
t.blendingMode = BlendingMode.MULTIPLY; O(t).setValue(90);
var r = t.sourceRectAtTime(0, false); A(t).setValue([r.left + r.width / 2, r.top + r.height / 2]);
t.threeDLayer = true; t.parent = c.layer("2D_awning");
P(t).setValue([968, 832, -2]); S(t).setValue([100, 100, 100]); R(t).setValue(15.6);
// 1996 top right, stamped at f48 (120→100% in 2 frames), ink bleed = misregistered copy
var y = text(c, "1996", "1996", "IBM Plex Mono", "Bold", 120, INK, [600, 100, 370, 140], "center", 0);
threeD(y, -3); y.blendingMode = BlendingMode.MULTIPLY; stamp(y, 6, 120); misreg(y, 4, 4, 55);
onFrom(c.layer("1996 misreg"), 6);
// camera: slow orbit about 8° in Y over 72 frames, slightly closer so the plate edges stay out of frame
var cam = camera(c), D = ZOOM / 1.12, pp = [];
for (var f = 0; f <= 48; f += 6) { var a = (4 - 8 * f / 57) * Math.PI / 180; pp.push([f, [W / 2 + D * Math.sin(a), H / 2, -D * Math.cos(a)]]); }
pp.push([57, [225, 1575, -480]]);   // into the scissors on the table: the match into 2C
keys(P(cam), pp);
keys(tf(cam).property("ADBE Anchor Point"), [[0, [W / 2, H / 2, 0]], [48, [W / 2, H / 2, 0]], [57, [225, 1575, 0]]]);
overlay(c);
marker(c, 6, "SFX: stamp thud"); marker(c, 26, "SFX: paper fold"); marker(c, 30, "SFX: paper fold"); marker(c, 36, "SFX: paper fold");
finishComp(c); "2D built";

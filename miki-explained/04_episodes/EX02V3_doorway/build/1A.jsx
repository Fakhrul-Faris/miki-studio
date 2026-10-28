// SHOT 1A. The Door. 72 frames.
// Layers (back to front): 1A_interior_bench (z 400), 1A_glass (reflections, screen), native WAIT printed on the door glass,
// 1A_door_frame (z 0, openings cut out), 1A_foreground_shadow (the floor with its baked shadow, z -150).
var c = freshComp("1A", 81)   // "…you'll wait", then a 1 s hold;

var interior = plate(c, "1A_interior_bench.png", "1A_interior_bench", 400);
// bench holds still with a 1px stepped wobble at 12fps (1px on screen = 1.27 world units at this depth)
P(interior).expression = "posterizeTime(12); seedRandom(7, false); add(value, [random(-1.27, 1.27), random(-1.27, 1.27), 0]);";

var glass = plate(c, "1A_glass.png", "1A_glass", 3); glass.blendingMode = BlendingMode.SCREEN; O(glass).setValue(25);

// WAIT on the door glass, read from outside (not mirrored). Hard wipe left to right in 4 frames from f12, multiply 85%.
var word = text(c, "WAIT", "WAIT", "Anton", "Regular", 150, INK, [W / 2 - 220, 805, 440, 190], "center", 20);
threeD(word, 2); word.blendingMode = BlendingMode.MULTIPLY; O(word).setValue(85);
// Linear Wipe sweeps the whole text layer (far wider than the word), so wipe with a rect mask over the word's own bounds:
// hold keys every 2 frames (12fps): f12 1/3, f14 2/3, f16 all.
var r = word.sourceRectAtTime(0, false);
app.run("comp.open", { comp: "1A" });
app.run("layer.addMask", { layer: word.id, shape: "rect", rect: [r.left - 10, r.top - 30, 1, r.height + 60] });
var mp = word.property("ADBE Mask Parade").property(1).property("ADBE Mask Shape");
function maskTo(f, frac) { var sh = new Shape(), x0 = r.left - 10, x1 = x0 + Math.max(0.1, (r.width + 20) * frac), y0 = r.top - 30, y1 = r.top + r.height + 30;
  sh.vertices = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]; sh.closed = true; mp.setValueAtTime(f * F, sh); }
maskTo(0, 0); maskTo(44, 1 / 3); maskTo(46, 2 / 3); maskTo(48, 1);  // on "wait"
for (var mk = 1; mk <= mp.numKeys; mk++) mp.setInterpolationTypeAtKey(mk, KeyframeInterpolationType.HOLD);
misreg(word, 4, 3, 50);

var frame = plate(c, "1A_door_frame.png", "1A_door_frame", 0);
var floor = plate(c, "1A_foreground_shadow.png", "1A_foreground_shadow", -150);

// camera: smooth push toward the door, 12% scale-equivalent in Z over 72 frames, ease in-out, drifting down to the door's centre
var cam = camera(c), poi = tf(cam).property("ADBE Anchor Point");
// ends by pushing through the door glass (centre 540, 1055): linear Z reads as an accelerating push into the cut
keys(P(cam), [[0, [W / 2, H / 2, camZ(1)]], [80, [540, 1055, camZ(3.2)]]]); keys(poi, [[0, [W / 2, H / 2, 0]], [80, [540, 1055, 0]]]);
var e0 = [new KeyframeEase(0, 55)], e1 = [new KeyframeEase(0, 0.1)];
P(cam).setTemporalEaseAtKey(1, e0, e0); P(cam).setTemporalEaseAtKey(2, e1, e1); poi.setTemporalEaseAtKey(1, e0, e0); poi.setTemporalEaseAtKey(2, e1, e1);

overlay(c);
marker(c, 20, "SFX: clock tick");
marker(c, 76, "SFX: relay click");
for (var j = 1; j <= c.numLayers; j++) { c.layer(j).inPoint = 0; c.layer(j).outPoint = c.duration; }
var w0 = P(interior).valueAtTime(0, false), w2 = P(interior).valueAtTime(2 * F, false), w3 = P(interior).valueAtTime(3 * F, false);
"1A built. wobble f0 " + w0[0].toFixed(2) + "," + w0[1].toFixed(2) + " f2 " + w2[0].toFixed(2) + "," + w2[1].toFixed(2) + " f3 " + w3[0].toFixed(2) + "," + w3[1].toFixed(2);

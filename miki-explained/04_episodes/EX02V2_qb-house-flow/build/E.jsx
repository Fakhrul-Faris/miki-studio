// E — Turn (L05 31.3–36.0): the camera pushes into one green lamp until it fills the frame; it deepens to brown.
// Inside: M3 in a door-shaped frame, a full bench, a visitor at the doorway who guesses.
var PUSH0 = 30.5, PUSH1 = 31.45;
// centre signal's green lamp sits at world [540, 960]: scaling CAM about it keeps it centred
var cs = tf(comp.layer("CAM")).property("ADBE Scale"), cp = P(comp.layer("CAM"));
cs.setValueAtTime(PUSH0, [24, 24]); cs.setValueAtTime(PUSH1, [2600, 2600]);
cp.setValueAtTime(PUSH0, [540, 1060]); cp.setValueAtTime(PUSH1, [540, 960]);
soft(cs, 70); soft(cp, 70);
opac(comp.layer("Lamp Green"), [[END = 28.3, 0], [PUSH0 - 0.4, 0], [PUSH0, 100]]);   // the centre lamp lights again before we dive into it
leave(comp.layer("Panel"), PUSH0 - 0.3, 0.4); leave(comp.layer("Count"), PUSH0 - 0.3, 0.4); leave(comp.layer("Count label"), PUSH0 - 0.3, 0.4);
comp.layers.addSolid(BROWN, "Brown", W, H, 1); opac(comp.layer("Brown"), [[0, 0], [PUSH1 - 0.15, 0], [PUSH1 + 0.35, 100]]);
// the doorway: M3 inside a door-shaped frame
still("M3.png", "M3"); var m3 = comp.layer("M3"); P(m3).setValue([540, 900]); tf(m3).property("ADBE Scale").setValue([75, 75]);
app.run("layer.addMask", { layer: m3.index, shape: "rect", rect: [320, 613, 800, 1333] });
enter(comp.layer("M3"), w("L05", 3), 0.9);
anim(tf(comp.layer("M3")).property("ADBE Scale"), [[w("L05", 3), [75, 75]], [44.8, [80, 80]]], 10);
var df = shapeLayer("Door frame"), dg = grp(df); pathIn(dg, [[240, 1400], [240, 400], [840, 400], [840, 1400]]); stroke(dg, CREAM, 5, 1); trimIn(dg, w("L05", 4), w("L05", 4) + 0.9, 85);
ws("Your door", "Your door.", "Medium", 88, CREAM, [110, 200, 860, 120]); calmReveal(comp.layer("Your door"), [w("L05", 3), w("L05", 4)]);
inc("Saturday", "Saturday", "SemiBold", 40, ANSWER, [110, 318, 400, 56]); calmReveal(comp.layer("Saturday"), [w("L05", 7)]);
// a full bench (dots), then the visitor at the threshold, then the guess
for (var i = 0; i < 5; i++) { circle("Bench " + (i + 1), 54, CREAM, [330 + i * 105, 1200], true); enter(comp.layer("Bench " + (i + 1)), w("L05", 11) + i * 0.09, 0.6); }
circle("Guest", 70, BLUE, [1180, 1350], true);
opac(comp.layer("Guest"), [[0, 0], [w("L05", 8) - F, 0], [w("L05", 8), 100]]);
glide(comp.layer("Guest"), [[w("L05", 8), [1180, 1350]], [w("L05", 10) + 0.4, [780, 1350]]], 40);
ws("Guess", "?", "SemiBold", 90, CREAM, [730, 1180, 100, 110], "center"); enter(comp.layer("Guess"), w("L05", 16) - 0.05, 0.6);
"E: " + comp.numLayers;

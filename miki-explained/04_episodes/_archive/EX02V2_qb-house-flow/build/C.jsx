// C — Guess (L03 15.3–17.0): the 10-minute arc spins once, fast, then settles. "Speed?" with a soft line through it.
var arc = comp.layer("Arc Cut"); var rot = tf(arc).property("ADBE Rotate Z");
tf(comp.layer("Arc Cut")).property("ADBE Anchor Point").setValue([540, 760]); P(comp.layer("Arc Cut")).setValue([540, 760]);
rot.setValueAtTime(15.55, 0); rot.setValueAtTime(16.5, 720);
rot.setTemporalEaseAtKey(1, [new KeyframeEase(0, 55)], [new KeyframeEase(0, 55)]); rot.setTemporalEaseAtKey(2, [new KeyframeEase(0, 85)], [new KeyframeEase(0, 85)]);
comp.layer("Arc Cut").motionBlur = true;
leave(comp.layer("Ten"), 15.2, 0.35);
inc("Think", "You'd think it was…", "Medium", 42, MUTED, [80, 1120, 920, 60], "center"); calmReveal(comp.layer("Think"), [w("L03", 0), w("L03", 1)]);
ws("Speed", "Speed?", "SemiBold", 120, INK, [80, 1180, 920, 160], "center"); calmReveal(comp.layer("Speed"), [w("L03", 2)]);
var ln = shapeLayer("Speed line"), lg = grp(ln); pathIn(lg, [[330, 1262], [750, 1262]]); stroke(lg, INK, 6, 2); trimIn(lg, 16.45, 16.95, 85);
leave(comp.layer("Think"), 17.15, 0.4, -12); leave(comp.layer("Speed"), 17.15, 0.4, -12); leave(comp.layer("Speed line"), 17.15, 0.4, -12);
"C: " + comp.numLayers;

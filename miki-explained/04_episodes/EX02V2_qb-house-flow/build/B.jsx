// B — Setup (L02 4.6–14.4): the dot grows into a clock ring with the 1990s barber inside; one hour in four parts → just the cut, 10 min
var DOT = [540, 760], RR = 300;
function inCam(n) { comp.layer(n).parent = comp.layer("CAM"); }
// the dot swells and becomes the ring (circle → circle)
var dS = tf(comp.layer("Dot")).property("ADBE Scale"); dS.setValueAtTime(4.7, [100, 100]); dS.setValueAtTime(5.5, [660, 660]); soft(dS);
leave(comp.layer("Dot"), 5.1, 0.5); leave(comp.layer("Dot glow"), 4.8, 0.5);
var trk = shapeLayer("Track"), tg = grp(trk); var el = tg.addProperty("ADBE Vector Shape - Ellipse"); el.property("ADBE Vector Ellipse Size").setValue([RR * 2, RR * 2]); el.property("ADBE Vector Ellipse Position").setValue(DOT);
stroke(tg, TRACK, 40, 1); inCam("Track"); enter(comp.layer("Track"), 5.0, 0.8);
// M2 inside the ring (circular mask)
still("M2.png", "M2"); var m2 = comp.layer("M2"); P(m2).setValue(DOT); tf(m2).property("ADBE Scale").setValue([50, 50]);
app.run("layer.addMask", { layer: m2.index, shape: "ellipse", rect: [180, 740, 1080, 1080] }); tint("M2", 55); inCam("M2");
opac(comp.layer("M2"), [[0, 0], [w("L02", 3) - 0.2, 0], [w("L02", 3) + 0.6, 100], [11.9, 100], [12.5, 0]]);
anim(tf(comp.layer("M2")).property("ADBE Scale"), [[5.0, [48, 48]], [12.5, [53, 53]]], 10);
// four parts of the hour, drawn one after another on "why does a haircut take over an hour?"
var SEG = [["Shave", 0, 28, BLUE], ["Shampoo", 28, 52, [0.55, 0.62, 0.97]], ["Massage", 52, 76, [0.72, 0.76, 0.98]], ["Cut", 76, 100, ANSWER]];
for (var i = 0; i < 4; i++) {
  var s = SEG[i], n = "Arc " + s[0], L = shapeLayer(n), g = grp(L);
  var e = g.addProperty("ADBE Vector Shape - Ellipse"); e.property("ADBE Vector Ellipse Size").setValue([RR * 2, RR * 2]); e.property("ADBE Vector Ellipse Position").setValue(DOT);
  stroke(g, s[3], 40, 1);
  var tr = g.addProperty("ADBE Vector Filter - Trim"), t0 = w("L02", 12) + i * 0.32;
  tr.property("ADBE Vector Trim Start").setValue(s[1]);
  var te = tr.property("ADBE Vector Trim End"); te.setValueAtTime(t0, s[1]); te.setValueAtTime(t0 + 0.55, s[2]); soft(te);
  inCam(n);
  // label just outside the ring at the arc's middle
  var mid = ((s[1] + s[2]) / 2) / 100 * 2 * Math.PI - Math.PI / 2, lx = DOT[0] + Math.cos(mid) * (RR + 95), ly = DOT[1] + Math.sin(mid) * (RR + 95);
  inc("Lab " + s[0], s[0], "SemiBold", 32, MUTED, [lx - 110, ly - 22, 220, 46], "center"); inCam("Lab " + s[0]); enter(comp.layer("Lab " + s[0]), t0 + 0.2, 0.6);
}
ws("Hour", "over 1 hour", "Light", 60, INK, [80, 1150, 920, 90], "center"); calmReveal(comp.layer("Hour"), [w("L02", 17), w("L02", 18), w("L02", 19)]);
ws("Year", "1996", "Light", 120, INK, [340, 690, 400, 150], "center"); inCam("Year"); enter(comp.layer("Year"), w("L02", 22) + 0.9, 0.8);
// "Just the cut": the other parts fade; the cut arc travels to the top and becomes 10 minutes (1/6 of the hour)
var JC = w("L02", 28);
for (i = 0; i < 3; i++) { leave(comp.layer("Arc " + SEG[i][0]), JC + i * 0.1, 0.5); leave(comp.layer("Lab " + SEG[i][0]), JC + i * 0.1, 0.4); }
leave(comp.layer("Lab Cut"), JC + 0.2, 0.4);
var cut = comp.layer("Arc Cut").property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").property("ADBE Vector Filter - Trim");
var cs = cut.property("ADBE Vector Trim Start"), ce = cut.property("ADBE Vector Trim End");
cs.setValueAtTime(JC + 0.3, 76); cs.setValueAtTime(JC + 1.1, 0); soft(cs);
ce.setValueAtTime(JC + 0.3, 100); ce.setValueAtTime(JC + 1.1, 16.7); soft(ce);
leave(comp.layer("Hour"), w("L02", 31) - 0.35, 0.3); leave(comp.layer("Year"), w("L02", 31) - 0.35, 0.4);
ws("Ten", "10 min", "Light", 60, ANSWER, [80, 1150, 920, 90], "center"); calmReveal(comp.layer("Ten"), [w("L02", 31), w("L02", 32)]);
"B: " + comp.numLayers;

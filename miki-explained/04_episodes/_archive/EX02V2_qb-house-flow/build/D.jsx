// D — Reveal (L04 17.5–30.4): ring → dot → three lamps (the signal). Lamps light as named; a ticket flips it; a visitor walks in;
// the camera pulls back: it's one of a field of signals; 701 on a calm panel.
var DOT = [540, 760];
function inCam(n) { comp.layer(n).parent = comp.layer("CAM"); }
var C0 = w("L04", 0);
// the ring and arc collapse back into a single dot
var parts = ["Track", "Arc Cut"];
for (var i = 0; i < 2; i++) {
  var L = comp.layer(parts[i]); tf(L).property("ADBE Anchor Point").setValue(DOT); P(comp.layer(parts[i])).setValue(DOT);
  var s = tf(comp.layer(parts[i])).property("ADBE Scale"); s.setValueAtTime(C0, [100, 100]); s.setValueAtTime(C0 + 0.8, [15, 15]); soft(s);
  leave(comp.layer(parts[i]), C0 + 0.5, 0.35);
}
// three lamps: the green one is born where the dot was, then the stack opens (green down, yellow and red rise out of it)
var LAMP = [["Red", RED, 560], ["Yellow", YELLOW, 760], ["Green", ANSWER, 960]];
var SPLIT = w("L04", 5);
for (i = 0; i < 3; i++) {
  var nm = "Lamp " + LAMP[i][0];
  circle(nm + " glow", 220, LAMP[i][1], DOT, true); blurFx(comp.layer(nm + " glow")).setValue(45); inCam(nm + " glow");
  circle(nm + " dim", 110, LAMP[i][1], DOT, true); inCam(nm + " dim");
  circle(nm, 110, LAMP[i][1], DOT, true); inCam(nm);
  var tgt = [540, LAMP[i][2]], st = SPLIT + (2 - i) * 0.06;
  var trio = [nm + " glow", nm + " dim", nm];
  for (var j = 0; j < 3; j++) { glide(comp.layer(trio[j]), [[st, DOT], [st + 0.9, tgt]], i == 1 ? 0 : (i == 0 ? 60 : -60)); }
  if (i == 2) opac(comp.layer(nm + " dim"), [[0, 0], [C0 + 0.6, 0], [C0 + 0.95, 100], [SPLIT + 0.4, 100], [SPLIT + 0.9, 26]]);   // the dot IS the green lamp
  else opac(comp.layer(nm + " dim"), [[0, 0], [st, 0], [st + 0.4, 26]]);                                     // the others emerge from it
}
var hs = shapeLayer("Housing"), hg = grp(hs); var hr = rectIn(hg, [200, 600], 100, [540, 760]); stroke(hg, INK, 4, 1); trimIn(hg, SPLIT + 0.5, SPLIT + 1.3, 80); inCam("Housing");
// lamp states: [lamp, on, off] — green, yellow, red as named; the ticket flips red → yellow; green for the walk-in
var G0 = w("L04", 8), Y0 = w("L04", 12), R0 = w("L04", 17), SC = w("L04", 28), WI = w("L04", 29), END = 28.3;
function lampState(nm, ranges) {
  var on = [[0, 0]], g = [[0, 0]];
  for (var r = 0; r < ranges.length; r++) { on.push([ranges[r][0] - 0.2, 0], [ranges[r][0] + 0.15, 100], [ranges[r][1] - 0.05, 100], [ranges[r][1] + 0.25, 0]); g.push([ranges[r][0] - 0.2, 0], [ranges[r][0] + 0.3, 55], [ranges[r][1] - 0.05, 55], [ranges[r][1] + 0.3, 0]); }
  opac(comp.layer(nm), on); opac(comp.layer(nm + " glow"), g);
}
lampState("Lamp Green", [[G0, Y0], [WI, END]]);
lampState("Lamp Yellow", [[Y0, R0], [SC, WI]]);
lampState("Lamp Red", [[R0, SC]]);
var LAB = [["Lab Green", "Go straight in", 960, G0, Y0], ["Lab Yellow", "5–10 min", 760, Y0, R0], ["Lab Red", "15+ min", 560, R0, SC]];
for (i = 0; i < 3; i++) {
  var lb = LAB[i]; ws(lb[0], lb[1], "Medium", 54, INK, [680, lb[2] - 40, 380, 80]); inCam(lb[0]);
  opac(comp.layer(lb[0]), [[0, 0], [lb[3] - 0.15, 0], [lb[3] + 0.3, 100], [lb[4], 100], [lb[4] + 0.4, 38], [END, 38], [END + 0.4, 0]]);
}
// the ticket glides in on a curve, touches the signal on "scanned", then drifts off
card("Ticket", [-200, 1180], [230, 120], 18); inCam("Ticket");
inc("Ticket no", "No. 042", "SemiBold", 36, INK, [-300, 1158, 200, 46], "center"); inCam("Ticket no");
var TK0 = w("L04", 21), TK1 = w("L04", 28);
glide(comp.layer("Ticket"), [[TK0, [-200, 1180]], [TK1, [330, 1060]]], -90);
nudge(comp.layer("Ticket no"), [[TK0, [0, 0]], [TK1, [530, -120]]], 88);   // text boxes carry an offset: move by delta
leave(comp.layer("Ticket"), WI + 0.1, 0.5, 30); leave(comp.layer("Ticket no"), WI + 0.1, 0.5, 30);
// a visitor dot reads green and walks in
circle("Visitor", 64, BLUE, [140, 1330], true); inCam("Visitor");
opac(comp.layer("Visitor"), [[0, 0], [WI - 0.1, 0], [WI + 0.3, 100]]);
glide(comp.layer("Visitor"), [[w("L04", 31), [140, 1330]], [w("L04", 33) + 0.6, [880, 1330]]], 0);
leave(comp.layer("Visitor"), END - 0.2, 0.4);
// the pull-back: the signal is one of a field of signals; 701 on a calm panel
camMove([END, END + 1.8, 100, 24, [540, 960], [540, 1060]]);
var k = 0, field = [];
for (var gx = -5; gx <= 5; gx++) for (var gy = -6; gy <= 6; gy++) {
  if (gx == 0 && gy == 0) continue;
  var cx = 540 + gx * 420, cy = 760 + gy * 760, fn = "Sig " + (++k), sl = shapeLayer(fn);
  var bg = grp(sl); rectIn(bg, [200, 600], 100, [cx, cy]); stroke(bg, INK, 6, 1);
  var lit = (gx * 5 + gy * 3 + 20) % 3;
  for (var q = 0; q < 3; q++) { var lg = grp(sl); lg.addProperty("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([110, 110]);
    lg.property(1).property("ADBE Vector Ellipse Position").setValue([cx, cy - 200 + q * 200]);
    var cc = [RED, YELLOW, ANSWER][q]; fill(lg, q == lit ? cc : [cc[0] * 0.25 + 0.72, cc[1] * 0.25 + 0.71, cc[2] * 0.25 + 0.69]); }   // one lit, the others pale
  var d = Math.sqrt(gx * gx + gy * gy), t1 = END + 0.3 + d * 0.12;
  field.push([fn, d]);
  opac(comp.layer(fn), [[0, 0], [t1, 0], [t1 + 0.6, 80]]);
}
depth(field, 0.1, "Dot glow");   // the field curves away from the hero: far signals lag on the pull-back and the push
card("Panel", [540, 400], [940, 340], 44, CREAM); enter(comp.layer("Panel"), w("L04", 34) + 0.2, 0.8);
ws("Count", "0", "Light", 170, INK, [40, 250, 1000, 220], "center"); enter(comp.layer("Count"), w("L04", 35), 0.6);
app.run("prop.setExpression", { layer: comp.layer("Count").index, path: "text/sourceText",
  expression: "var k = Math.min(1, Math.max(0, (time - " + w("L04", 35) + ") / 1.1)); k = 1 - Math.pow(1 - k, 3); Math.round(k * 701)" });
inc("Count label", "QB House shops · 575 in Japan, 126 overseas", "Medium", 36, MUTED, [80, 470, 920, 56], "center"); calmReveal(comp.layer("Count label"), WT.L04.slice(38, 42));
"D: " + comp.numLayers;

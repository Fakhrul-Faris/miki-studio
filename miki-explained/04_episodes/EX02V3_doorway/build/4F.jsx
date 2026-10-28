// SHOT 4F. 700+. 84 frames. 130 native door icons pop on in waves out from Tokyo (2-frame steps), 60/25/15 green/yellow/red.
var c = freshComp("4F", 75)   // 64 + 10 under the tear into 5A;
plate(c, "4F1.png", "4F_map_japan_dots", 0);
var COL = { G: GREEN, Y: YELLOW, R: RED };
for (var i = 0; i < DOORS.length; i++) {
  var d = DOORS[i]; if (i == 0) { d[2] = 0; d[3] = "Y"; } var p = sp(d[0], d[1]), s = c.layers.addShape(); s.name = "door " + (i + 1);
  s.threeDLayer = true; P(s).setValue([p[0], p[1], -2]); A(s).setValue([0, 0, 0]);
  var root = s.property("ADBE Root Vectors Group");
  var g1 = root.addProperty("ADBE Vector Group").property("ADBE Vectors Group");     // light (drawn first = on top)
  g1.addProperty("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([9, 9]);
  g1.property(1).property("ADBE Vector Ellipse Position").setValue([0, -16]);
  g1.addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(COL[d[3]]);
  var g2 = root.addProperty("ADBE Vector Group").property("ADBE Vectors Group");     // door
  var r = g2.addProperty("ADBE Vector Shape - Rect"); r.property("ADBE Vector Rect Size").setValue([15, 22]); r.property("ADBE Vector Rect Position").setValue([0, 0]);
  var r2 = g2.addProperty("ADBE Vector Shape - Rect"); r2.property("ADBE Vector Rect Size").setValue([21, 6]); r2.property("ADBE Vector Rect Position").setValue([0, -15]);
  g2.addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(INK);
  if (i == 0) S(s).setValue([170, 170, 100]); else hold(S(s), [[0, [0, 0, 100]], [2 + 2 * Math.round((d[2] - 6) / 2 * 0.613), [170, 170, 100]]]);
}
var n = text(c, "counter", "0", "IBM Plex Mono", "Bold", 120, INK, [560, 1660, 480, 150], "right", 0);
threeD(n, -2);
n.property("ADBE Text Properties").property("ADBE Text Document").expression =
  'posterizeTime(12); time >= 44 / 24 ? "700+" : String(Math.floor(linear(time, 2 / 24, 22 / 24, 0, 700)))';
var cam = camera(c);
// M1, the real storefront, pinned beside Tokyo; the shot opens on its signal (its middle lamp lit yellow, carrying 4E's light)
var PS = 0.27, PL = [330, 760], LAMP1 = [1107, 740];
var ph = img(c, "4F_photo_M1.png", "M1 storefront photo"); threeD(ph, -4); A(ph).setValue([LAMP1[0], LAMP1[1], 0]); P(ph).setValue([PL[0], PL[1], -4]); S(ph).setValue([PS * 100, PS * 100, PS * 100]); R(ph).setValue(-3);
app.run("comp.open", { comp: "4F" }); app.run("layer.style.dropShadow", { layers: [ph.index] });
var ds = { useGlobalLight: false, angle: 120, distance: 6, size: 12, opacity: 40 }; for (var q in ds) app.run("prop.set", { layer: ph.id, path: "layerStyles/dropShadow/" + q, value: ds[q] });
var lg = glowLayer(c, "M1 lamp glow", [PL[0], PL[1]], 22, YELLOW, 100); threeD(lg, -5);
var T0 = PL;
smooth(keys(P(cam), [[0, [T0[0], T0[1], camZ(6)]], [14, [W / 2, H / 2, camZ(1)]], [63, [W / 2 + 15, H / 2 - 40, camZ(1.08)]]]), 40);
smooth(keys(tf(cam).property("ADBE Anchor Point"), [[0, [T0[0], T0[1], 0]], [14, [W / 2, H / 2, 0]], [63, [W / 2 + 15, H / 2 - 40, 0]]]), 40);
overlay(c);
marker(c, 6, "SFX: rising stepped ticks f2–f40");
finishComp(c); "4F built";

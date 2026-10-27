// Beat E (L05 32.7–39.8): brown + barbershop photo — Your shop / Saturday lit / the bench fills / How much longer?
function w(L, i) { return WT[L][i]; }
var CUT = 32.45, DIMC = [0.957, 0.945, 0.918], CHIPC = [0.235, 0.2, 0.17];
comp.layers.addSolid(BROWN, "Brown", W, H, 1); life(comp.layer("Brown"), CUT);
app.run("file.import", { paths: [DIR + "media/M3.png"], sequence: false, addToComp: true, time: 0 }); comp.layer(1).name = "M3";
var m3 = comp.layer("M3"); m3.outPoint = comp.duration; m3 = comp.layer("M3");
P(m3).setValue([540, 960]);
anim(tf(m3).property("ADBE Scale"), [[CUT, [75, 75]], [49, [82, 82]]], 5);
opac(m3, [[0, 0], [CUT - F, 0], [CUT, 22], [40.0, 22], [40.6, 10]]);
nul("B4", [540, 960]); comp.layer("B4").parent = comp.layer("DRIFT");
function in4(n) { comp.layer(n).parent = comp.layer("B4"); }
ws("Ghost SATURDAY", "SATURDAY", "Black", 420, DIMC, [-260, 560, 1700, 460]); in4("Ghost SATURDAY");
opac(comp.layer("Ghost SATURDAY"), [[0, 0], [w("L05", 6), 0], [w("L05", 6) + 0.3, 6]]);
nudge(comp.layer("Ghost SATURDAY"), [[w("L05", 6), [0, 0]], [49, [-260, 0]]], 10);
ws("Your shop", "Your shop.", "Medium", 96, DIMC, [110, 250, 860, 130]); wordReveal(comp.layer("Your shop"), [w("L05", 2), w("L05", 3)]); in4("Your shop");
var days = ["Thursday", "Friday", "Saturday", "Sunday"];
for (var i = 0; i < 4; i++) {
  var n = "Day " + days[i]; ws(n, days[i], "Light", 112, DIMC, [110, 450 + i * 140, 900, 150]); in4(n);
  opac(comp.layer(n), [[0, 0], [w("L05", 4) + i * 0.08, 0], [w("L05", 4) + 0.25 + i * 0.08, 22]]);
}
ws("Day Saturday lit", "Saturday", "Light", 112, ORANGE, [110, 730, 900, 150]); in4("Day Saturday lit"); life(comp.layer("Day Saturday lit"), w("L05", 6), null, 0.1);
circle("Active dot", 22, ORANGE, [80, 806], true); in4("Active dot"); pop(comp.layer("Active dot"), w("L05", 6));
bar("Bench", [150, 1400], [930, 1400], DIMC, 4, w("L05", 7) - 0.2, w("L05", 7) + 0.25); in4("Bench");
var xs = [210, 330, 450, 570, 690];
for (i = 0; i < 5; i++) {
  var pn = "Person " + (i + 1);
  tile(pn, [xs[i], 1352], 76, ORANGE, pictPerson); in4(pn); pop(comp.layer(pn), w("L05", 7) + i * 0.12);
  // "watching the chairs": everyone leans toward the chairs
  anim(tf(comp.layer(pn)).property("ADBE Rotate Z"), [[w("L05", 12) + i * 0.04, 0], [w("L05", 12) + 0.3 + i * 0.04, 7]], 70);
  comp.layer(pn).motionBlur = true;
}
card("Bubble", [600, 1215], [520, 100], 50, CHIPC); in4("Bubble"); pop(comp.layer("Bubble"), w("L05", 15), 0.2);
inc("Bubble text", "How much longer?", "Medium", 38, DIMC, [340, 1192, 520, 50], "center"); in4("Bubble text");
wordReveal(comp.layer("Bubble text"), [w("L05", 16), w("L05", 17), w("L05", 18)], 10);
"E: " + comp.numLayers;

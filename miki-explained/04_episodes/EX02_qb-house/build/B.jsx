// Beat B (L02 4.6–14.4): 1990s print + a segmented "over an hour" bar → just the cut, 10 min
nul("B2", [540, 960]); comp.layer("B2").parent = comp.layer("DRIFT");
function in2(n) { comp.layer(n).parent = comp.layer("B2"); }
// M2 framed print
card("Print", [540, 520], [720, 640], 24); pop(comp.layer("Print"), w("L02", 0) + 0.05, 0.22);
still("M2.png", "M2"); var m2 = comp.layer("M2");
app.run("layer.addMask", { layer: m2.index, shape: "rect", rect: [70, 680, 1300, 1200] });
m2 = comp.layer("M2"); P(m2).setValue([540, 520]); m2.parent = comp.layer("Print"); m2 = comp.layer("M2"); P(m2).setValue([0, 0]);
anim(tf(m2).property("ADBE Scale"), [[4.6, [50, 50]], [10.6, [54, 54]]], 10);
anim(tf(comp.layer("Print")).property("ADBE Rotate Z"), [[4.7, 0], [5.1, 2]], 70);
card("Era chip", [380, 860], [230, 56], 28, INK); pop(comp.layer("Era chip"), w("L02", 3));
inc("Era chip text", "Early 1990s", "SemiBold", 26, CREAM, [275, 842, 210, 40], "center"); life(comp.layer("Era chip text"), w("L02", 3) + 0.1, null, 0.1);
fadeAt(["Print", "M2", "Era chip", "Era chip text"], w("L02", 20) - 0.1, 0.3);
// the card: one long visit split into four services
card("Visit card", [540, 1210], [900, 380], 40); in2("Visit card");
anim(P(comp.layer("Visit card")), [[w("L02", 12) - 0.4, [540, 1330]], [w("L02", 12), [540, 1210]]], 88); life(comp.layer("Visit card"), w("L02", 12) - 0.4, null, 0.2);
ws("Visit title", "A haircut", "Medium", 44, INK, [150, 1050, 400, 60]); in2("Visit title"); wordReveal(comp.layer("Visit title"), [w("L02", 13), w("L02", 15)]);
ws("Visit time", "over 1 hour", "Light", 44, INK, [560, 1050, 370, 60], "right"); in2("Visit time"); wordReveal(comp.layer("Visit time"), [w("L02", 17), w("L02", 18), w("L02", 19)]);
var SEG = [["Shave", 150, 345, BLUE], ["Shampoo", 345, 540, [0.55, 0.62, 0.97]], ["Massage", 540, 735, [0.72, 0.76, 0.98]], ["Cut", 735, 930, ORANGE]];
for (var i = 0; i < 4; i++) {
  var s = SEG[i], t0 = w("L02", 12) + 0.15 + i * 0.22;
  bar("Seg " + s[0], [s[1] + 6, 1170], [s[2] - 6, 1170], s[3], 26, t0, t0 + 0.25); in2("Seg " + s[0]);
  inc("Seg label " + s[0], s[0], "SemiBold", 26, MUTED, [s[1], 1205, s[2] - s[1], 40], "center"); in2("Seg label " + s[0]);
  life(comp.layer("Seg label " + s[0]), t0 + 0.1, null, 0.12);
}
// "Just the cut": strike the extras, slide the cut to the front, 10 min
var JC = w("L02", 29);
for (i = 0; i < 3; i++) {
  s = SEG[i];
  bar("Strike " + s[0], [s[1] + 2, 1170], [s[2] - 2, 1170], INK, 4, JC + i * 0.08, JC + 0.18 + i * 0.08); in2("Strike " + s[0]);
  fadeAt(["Seg " + s[0], "Seg label " + s[0], "Strike " + s[0]], JC + 0.55, 0.25);
}
nudge(comp.layer("Seg Cut"), [[JC + 0.6, [0, 0]], [JC + 1.0, [-585, 0]]], 85);
nudge(comp.layer("Seg label Cut"), [[JC + 0.6, [0, 0]], [JC + 1.0, [-585, 0]]], 85);
fadeAt(["Visit time"], w("L02", 31) - 0.15, 0.15);
ws("Visit ten", "10 min", "Light", 44, ORANGE, [560, 1050, 370, 60], "right"); in2("Visit ten"); wordReveal(comp.layer("Visit ten"), [w("L02", 31), w("L02", 32)]);
card("Year chip", [820, 1360], [150, 52], 26, INK); in2("Year chip"); pop(comp.layer("Year chip"), w("L02", 22));
inc("Year chip text", "1996", "SemiBold", 26, CREAM, [745, 1343, 150, 40], "center"); in2("Year chip text"); life(comp.layer("Year chip text"), w("L02", 22) + 0.1, null, 0.1);
"B: " + comp.numLayers;

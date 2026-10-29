// Beat C (L03 12.8–15.4): card dims; "Still not / fast enough?" then a strike
function w(L, i) { return WT[L][i]; }
comp.layers.addSolid(CREAM, "Dimmer", W, H, 1);
opac(comp.layer("Dimmer"), [[0, 0], [12.55, 0], [12.95, 93], [15.75, 93], [16.05, 0]]);
inc("Most say", "Most people would say…", "Medium", 42, MUTED, [80, 700, 920, 60], "center");
wordReveal(comp.layer("Most say"), [w("L03", 0), w("L03", 1), w("L03", 2), w("L03", 3)]);
ws("Still not", "Still not", "SemiBold", 96, INK, [80, 800, 920, 130], "center"); wordReveal(comp.layer("Still not"), [w("L03", 4), w("L03", 5)]);
ws("Fast enough", "fast enough?", "SemiBold", 96, INK, [80, 920, 920, 130], "center"); wordReveal(comp.layer("Fast enough"), [w("L03", 6), w("L03", 7)]);
dashLine("Fast underline", [240, 1052], [840, 1052], BLUE, w("L03", 7), w("L03", 7) + 0.35);
bar("Strike", [220, 990], [860, 990], ORANGE, 10, 15.42, 15.72);
var cs = ["Most say", "Still not", "Fast enough", "Fast underline", "Strike"];
for (var i = 0; i < cs.length; i++) { var o = tf(comp.layer(cs[i])).property("ADBE Opacity"); o.setValueAtTime(15.78, 100); o.setValueAtTime(16.0, 0); }
"C: " + comp.numLayers;

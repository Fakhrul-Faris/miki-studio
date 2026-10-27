// Beat C (L03 15.3–16.9): "Speed?" — then struck
comp.layers.addSolid(CREAM, "Dimmer", W, H, 1);
opac(comp.layer("Dimmer"), [[0, 0], [15.1, 0], [15.45, 93], [17.3, 93], [17.6, 0]]);
inc("Think", "You'd think it was…", "Medium", 42, MUTED, [80, 760, 920, 60], "center"); wordReveal(comp.layer("Think"), [w("L03", 0), w("L03", 1)]);
ws("Speed", "Speed?", "SemiBold", 170, INK, [80, 840, 920, 220], "center"); wordReveal(comp.layer("Speed"), [w("L03", 2)]);
dashLine("Speed underline", [300, 1075], [780, 1075], BLUE, w("L03", 3), w("L03", 5));
bar("Speed strike", [270, 960], [810, 960], ORANGE, 14, w("L03", 6), w("L03", 6) + 0.3);
fadeAt(["Think", "Speed", "Speed underline", "Speed strike"], 17.25, 0.25);
// Beat B's card leaves under the dimmer
fadeAt(["Visit card", "Visit title", "Visit ten", "Seg Cut", "Seg label Cut", "Year chip", "Year chip text"], 17.2, 0.2);
"C: " + comp.numLayers;

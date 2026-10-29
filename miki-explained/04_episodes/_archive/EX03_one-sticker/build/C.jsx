// Beat C (L03 13.9–15.4): "One app wins?" — struck
dimmer(13.65, 15.5);
inc("Think", "You'd think…", "Medium", 42, MUTED, [80, 700, 920, 60], "center"); wordReveal(comp.layer("Think"), [w("L03", 0), w("L03", 1)]);
ws("Wins 1", "One app", "SemiBold", 130, INK, [80, 780, 920, 170], "center"); wordReveal(comp.layer("Wins 1"), [w("L03", 2), w("L03", 3)]);
ws("Wins 2", "wins?", "SemiBold", 130, INK, [80, 940, 920, 170], "center"); wordReveal(comp.layer("Wins 2"), [w("L03", 5)]);
bar("Wins strike", [270, 1020], [810, 1020], PROBLEM, 14, 15.15, 15.4);
fadeAt(["Think", "Wins 1", "Wins 2", "Wins strike"], 15.5, 0.25);
// Beat B's phone and cash leave under the dimmer (the sticker row stays for the reveal)
fadeAt(["Phone", "Phone app", "Phone QR", "No match", "Cash", "Cash label", "Mamak chip", "Mamak chip text", "Counter"], 15.4, 0.2);
"C: " + comp.numLayers;

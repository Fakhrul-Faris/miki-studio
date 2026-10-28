// SHOT 6C. The Question. 84 frames. Headline cut on one character per frame from f6; ochre glow in the header hole at f56; black f80.
var c = freshComp("6C", 68);
plate(c, "6C.png", "6C_door_wide", 0);
var t = text(c, "headline", "WHAT DOES YOUR\rDOOR TELL THEM?", "Anton", "Regular", 66, INK, [70, 84, 940, 220], "center", 10);
threeD(t, -2); t.blendingMode = BlendingMode.MULTIPLY; cutWords(t, [0, 4, 9, 12, 16, 22]);   // word by word with the voice
var g = glowLayer(c, "6C_header_hole glow", sp(720, 474), 70, OCHRE, 35); threeD(g, -2); onFrom(g, 34);
var cam = camera(c);
smooth(keys(P(cam), [[0, [W / 2, H / 2, camZ(1.05)]], [67, [W / 2, H / 2, camZ(1)]]]), 40);
overlay(c);
var blk = c.layers.addSolid([0, 0, 0], "cut to black", W, H, 1); hold(O(blk), [[0, 0], [64, 100]]);
marker(c, 34, "SFX: single relay click. Nothing follows.");
finishComp(c); "6C built";

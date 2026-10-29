// 5C. "What does your bench give them to do?" 69 frames. Word by word; one ochre pulse in the clock; cut to black.
var c = freshComp("5C", 69);
plate(c, "5C.png", "5C empty bench", 0);
var q = text(c, "question", "WHAT DOES YOUR BENCH\rGIVE THEM TO DO?", "Anton", "Regular", 60, INK, [100, 262, 880, 150], "center", 10);
threeD(q, -2); q.blendingMode = BlendingMode.MULTIPLY; cutWords(q, [0, 6, 9, 11, 18, 24, 29, 33]);
var g = glowLayer(c, "clock glow", sp(696, 907), 80, OCHRE, 35); threeD(g, -2); onFrom(g, 45);
var cam = camera(c); smooth(keys(P(cam), [[0, [W / 2, H / 2, camZ(1.05)]], [68, [W / 2, H / 2, camZ(1)]]]), 40);
overlay(c);
var blk = c.layers.addSolid([0, 0, 0], "cut to black", W, H, 1); hold(O(blk), [[0, 0], [64, 100]]);
marker(c, 45, "SFX: last tick"); finishComp(c); "5C built";

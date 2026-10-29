// 5A. "That's what they remember. What's the last thing your customers feel?" 102 frames; cut to black at the end.
var c = freshComp("5A", 102);
plate(c, "5A.png", "5A empty counter", 0);
var q = text(c, "question", "WHAT'S THE LAST THING\rYOUR CUSTOMERS FEEL?", "Anton", "Regular", 62, INK, [100, 270, 880, 160], "center", 10);
threeD(q, -2); q.blendingMode = BlendingMode.MULTIPLY; cutWords(q, [28, 34, 36, 43, 49, 53, 62]);
var cam = camera(c); smooth(keys(P(cam), [[0, [W / 2, H / 2, camZ(1.05)]], [101, [W / 2, H / 2, camZ(1)]]]), 40);
overlay(c);
var blk = c.layers.addSolid([0, 0, 0], "cut to black", W, H, 1); hold(O(blk), [[0, 0], [96, 100]]);
finishComp(c); "5A built";

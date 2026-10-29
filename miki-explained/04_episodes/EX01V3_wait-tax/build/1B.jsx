// 1B. "Everyone thinks customers hate long waits. They don't. They hate empty ones." 108 frames (+8 under the 1C slide).
var c = freshComp("1B", 116);
plate(c, "1B.png", "1B_carousel", 0);
var lw = headline(c, "LONG WAITS", "LONG WAITS", 150, [80, 190, 900, 170], 38, -2);       // on "long waits"
var st = inkLine(c, "strike", [190, 290], [890, 280], 20, 61, 64); threeD(st, -3);         // on "They don't"
var eo = headline(c, "EMPTY ONES", "EMPTY ONES", 150, [80, 380, 900, 170], 86, -2);   // on "empty"
var cam = camera(c);
smooth(keys(P(cam), [[0, [W / 2, H / 2, camZ(1)]], [115, [W / 2, H / 2, camZ(1.05)]]]), 40);
overlay(c);
marker(c, 61, "SFX: rip"); finishComp(c); "1B built";

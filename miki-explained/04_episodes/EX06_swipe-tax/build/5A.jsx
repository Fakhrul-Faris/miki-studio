// 5A. "Your shop pays this exact fee, every single tap." 70 f + 8 (slide). Bridge: on. Documentary M1; a coin leaves the
// reader on every tap word.
var c = freshComp("5A", 78);
paperBg(c);
plate(c, "M1_print.png", "M1", 0);
var y = chip(c, "yours", "YOUR SHOP PAYS THIS", [540, 430], 640, 40, 4); threeD(y[0], -5); threeD(y[1], -5);
var RD = [570, 960, -4], TAPS = [[35, [180, 200]], [46, [560, 110]], [51, [930, 190]]];         // "every", "single", "tap"
for (var i = 0; i < 3; i++) { var t = TAPS[i], k = popCoin(c, "tap coin " + (i + 1), 36, t[0], [RD[0], RD[1]], [[t[0] + 2, [RD[0], RD[1] - 60]], [t[0] + 9, t[1]]], 140 + i); }
camDrift(c, [[0, [540, 960], 1], [77, [566, 965], 1.22]]);
overlay(c); finishComp(c); "5A built";

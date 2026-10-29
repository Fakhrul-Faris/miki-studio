// 4A. "Now think about your shop. A great cut." 53 frames (+8 under the 4B slide).
var c = freshComp("4A", 61);
paperBg(c);
var p = photo(c, "M2_print.png", "M2 barbershop", 70, [540, 960], 1.0);
keys(S(p), [[0, [70, 70]], [60, [73, 73]]]); smooth(S(p), 40);
overlay(c); finishComp(c); "4A built";

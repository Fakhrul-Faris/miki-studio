// 4A. "Now picture your shop on a Saturday." 42 frames. The real bench.
var c = freshComp("4A", 42);
paperBg(c);
var p = photo(c, "M3_print.png", "M3 barbershop bench", 72, [540, 960], 0.8);
keys(S(p), [[0, [72, 72]], [41, [76, 76]]]); smooth(S(p), 40);
overlay(c); finishComp(c); "4A built";

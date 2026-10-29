// 3B. "Psychologists call it the peak-end rule." 66 frames (+10 under the tear).
var c = freshComp("3B", 76);
paperBg(c);
headline(c, "title", "THE\rPEAK-END\rRULE", 200, [60, 520, 960, 700], 27);   // on "peak"
inkLine(c, "rule", [250, 1260], [830, 1260], 5, 31, 39);
overlay(c); marker(c, 27, "SFX: stamp"); finishComp(c); "3B built";

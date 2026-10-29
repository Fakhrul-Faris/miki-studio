// 1C. "And your longest queues of the year are almost here: the holiday season." 93 frames (+10 under the tear).
var c = freshComp("1C", 103);
paperBg(c);
var p = photo(c, "M4_print.png", "M4 holiday rush", 60, [540, 1110], -1.5);
P(p).expression = "posterizeTime(12); add(value, [0, -time * 20])";
headline(c, "HOLIDAY SEASON", "HOLIDAY SEASON", 118, [70, 165, 940, 140], 65);              // on "holiday"
overlay(c); marker(c, 65, "SFX: stamp"); finishComp(c); "1C built";

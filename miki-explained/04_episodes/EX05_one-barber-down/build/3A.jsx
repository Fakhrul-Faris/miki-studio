// 3A. "So the shop isn't one and a half times slower. It's ten times slower." 91 f + 10 (tear). Documentary M1: the
// crowded bench. ×1.5 SLOWER stamps and is struck; ×10 SLOWER stamps and crash-zooms (MASTER 581; grid 576).
var c = freshComp("3A", 101);
paperBg(c);
var pl = img(c, "M1_print.png", "M1"); S(pl).setValue([75, 75]); P(pl).setValue([W / 2, H / 2]);
var a = bigChip(c, "x15", "×1.5 SLOWER", [540, 500], 760, 120, 22, -2);                     // "one and a half"
var st = inkLine(c, "strike", [190, 520], [890, 470], 20, 39, 42, INK);                      // "slower,"
var b = bigChip(c, "x10", "×10 SLOWER", [540, 860], 900, 170, 63, 2);                        // "ten"
var z = zoomRig(c, [pl, st].concat(a, b)); crash(z, [[63, null, 1], [67, [540, 860], 1.3], [100, [540, 860], 1.34]]);
overlay(c); finishComp(c); "3A built";

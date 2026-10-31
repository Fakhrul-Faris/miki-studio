// 1A. "One sick barber can turn a four-minute wait into forty-five." 80 f. H3: frame 0 is mid-stride (LOOP f65), the
// middle barber already walking out. C5: crash zoom into 45 MIN on "forty-five".
var c = freshComp("1A", 80);
paperBg(c);
var pl = seq(c, "LOOP", "shop", 65);
var a = bigChip(c, "4min", "4 MIN", [300, 395], 400, 130, 36, -2);                         // "four"
var st = inkLine(c, "strike", [130, 410], [470, 372], 18, 51, 54, INK);                   // "into"
var b = bigChip(c, "45min", "45 MIN", [745, 395], 430, 130, 56, 2);                        // "forty-five"
var z = zoomRig(c, [pl, st].concat(a, b)); crash(z, [[56, null, 1], [60, [745, 395], 1.45], [79, [745, 395], 1.5]]);
overlay(c); finishComp(c); "1A built";

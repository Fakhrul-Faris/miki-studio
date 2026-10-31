// 4A. "The fix is one long line. Airports use it, banks use it. It snakes back and forth and looks twice as long, but it
// feeds every counter, so nobody gets stuck behind the jam." 211 f + 10 (tear). A3: the three lanes fold away and one
// snaking line draws on; dots peel off to whichever till is free. M1 (the airport) slides in on "Airports use it".
var c = freshComp("4A", 221);
paperBg(c);
var L3 = lanes(c, 0, false);
for (var i = 0; i < L3.length; i++) if (L3[i].name.indexOf("lane ") == 0) stepped(keys(S(L3[i]), [[4, [100, 100]], [16, [0, 100]]]), "in");
var SN = [[540, 1290], [180, 1290], [180, 1110], [900, 1110], [900, 930], [180, 930], [180, 750], [900, 750], [900, 600], [540, 600], [540, 550]];
polyline(c, "snake", SN, INK, 10, 6, 23);                                                                 // "one long line"
for (var j = 0; j < 12; j++) { var s0 = 26 + j * 13, k = dot(c, "snake dot " + j, SN[0], j == 4 ? OCHRE : INK, 22);
  ride(k, SN, s0, s0 + 46); var tillX = LANE_X[j % 3], last = along(SN, 1);
  keys(P(k), [[s0 + 48, [tillX, TILL_Y + 70]]]); interpHold(P(k)); onBetween(k, s0, s0 + 54); }
var ap = img(c, "M1_print.png", "airport"); S(ap).setValue([70, 70]); P(ap).setValue([W / 2 + 1100, H / 2]); shadowLayer(c, ap, 12, 26, 45);
stepped(keys(P(ap), [[37, [W / 2 + 1100, H / 2]], [45, [W / 2, H / 2]], [76, [W / 2, H / 2]], [84, [W / 2 - 1100, H / 2]]]), "out");   // "Airports use it"
bigChip(c, "longer", "LOOKS LONGER", [540, 232], 620, 80, 115, -2);                                     // "twice as long"
inkLine(c, "strike longer", [250, 248], [830, 222], 16, 137, 140, INK);                                  // "but"
bigChip(c, "faster", "IS FASTER", [540, 345], 520, 96, 143, 2);
overlay(c); finishComp(c); "4A built";

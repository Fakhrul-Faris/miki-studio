// 2A. "Here's the trick. Your bank holds your money. It pays you almost nothing for holding it. About 0.07%. Then it lends
// that same money out at over 11%." 230 f + 8 (slide). A1 stop-motion: the notes drop in, the coins stack on twos.
var c = freshComp("2A", 238);
paperBg(c);
headline(c, "trick", "HERE'S THE TRICK", 120, [60, 190, 960, 150], 10);                     // on "trick"
var T = hl(c, "trick"); offAt(T[0], 57); offAt(T[1], 57);
var bun = ctrl(c, "bundle", [540, 680]), parts = [];
var NB = [[540, 694, -4, 23], [550, 678, 3, 27], [530, 664, -1, 31]];                         // "your bank holds your money"
for (var i = 0; i < 3; i++) { var b = NB[i], n = note(c, "note " + (i + 1), [b[0], b[1]], 78, b[2]);
  keys(P(n), [[b[3] - 4, [b[0], b[1] - 300]], [b[3], [b[0], b[1]]]]); boil(n, 40 + i, 1.5, 0.5, "in"); onFrom(n, b[3] - 4); parts.push(n); }
var mine = chip(c, "mine", "YOUR MONEY", [540, 880], 360, 34, 43); parts.push(mine[0], mine[1]);
for (var i = 0; i < parts.length; i++) parts[i].parent = bun;
stepped(keys(P(bun), [[57, [540, 680]], [63, [540, 400]]]), "out"); stepped(keys(S(bun), [[57, [100, 100]], [63, [74, 74]]]), "out");
// left: what it pays you — a shaving of a coin, circled
chip(c, "pays", "PAYS YOU", [300, 668], 380, 40, 57);
inkLine(c, "shelf L", [110, 1300], [490, 1300], 6, 57, 63, INK);
var sl = coinSide(c, "sliver", [300, 1294], 340, 6); onFrom(sl, 93);
inkRing(c, "sliver ring", [300, 1294], [440, 140], 100, 110);
headline(c, "pct L", "0.07%", 170, [40, 690, 520, 220], 115);                                 // on "0.07%"
// right: what it lends at — coins stack on twos
chip(c, "lends", "LENDS AT", [780, 668], 380, 40, 150);
inkLine(c, "shelf R", [590, 1300], [970, 1300], 6, 150, 156, INK);
for (var i = 0; i < 11; i++) { var f = 170 + 3 * i, x = 780 + ((i * 37) % 11) - 5, y = 1300 - 18 - 33 * i;
  var k = coinSide(c, "coin " + (i + 1), [x, y], 340, 33); keys(P(k), [[f - 4, [x, y - 700]], [f, [x, y]]]); boil(k, 60 + i, 1, 0.4, "in"); onFrom(k, f - 4); }
headline(c, "pct R", "11%+", 170, [520, 690, 520, 220], 208);                                 // on "11%"
overlay(c); marker(c, 10, "SFX: stamp"); marker(c, 115, "SFX: stamp"); marker(c, 208, "SFX: stamp");
finishComp(c); "2A built";

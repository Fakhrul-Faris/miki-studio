// 4A. "Merchants say it costs households over $1,000 a year. Card fees topped nearly $200 billion last year, and that's on
// top of the spread on your money." 236 f + 10 (tear). A year of card fees prints out; a tower of notes; the coin stack on top.
var c = freshComp("4A", 246);
paperBg(c);
var pg = ctrl(c, "print group", [540, 960]);
var rc = c.layers.add(item("RECEIPT")); rc.name = "receipt"; A(rc).setValue([260, 0]); P(rc).setValue([540, 290]); S(rc).setValue([100, 100]);
shadowLayer(c, rc, 8, 18, 35); rc = c.layer("receipt");
var st = []; for (var f = 0; f <= 44; f += 2) st.push([f, Math.min(1, (f + 2) / 44)]); revealDown(c, rc, 520, 1130, st);
var hs = shapeAt(c, "printer", [540, 140]); rectIn(grp(hs), [460, 14], [0, 140], INK); rectIn(grp(hs), [720, 300], null, NOTEPAPER, INK, 3, 6); shadowLayer(c, hs, 8, 20, 40);
var rr = inkRing(c, "total ring", [540, 1232], [460, 180], 50, 58);
var pp = [c.layer("receipt"), c.layer("printer"), c.layer("total ring")]; for (var i = 0; i < pp.length; i++) pp[i].parent = pg;
stepped(keys(P(pg), [[80, [540, 960]], [88, [-640, 960]]]), "in");
// the tower: banded notes drop in on twos
var tw = ctrl(c, "tower", [540, 1300]), tp = [];
for (var i = 0; i < 20; i++) { var f = 90 + 2 * i, x = 540 + ((i * 53) % 17) - 8, y = 1300 - 26 - 52 * i;
  var b = brick(c, "brick " + (i + 1), [x, y], 560, 52); keys(P(b), [[f - 4, [x, y - 900]], [f, [x, y]]]); boil(b, 80 + i, 1, 0.3, "in"); onFrom(b, f - 4); tp.push(b); }
var big = shapeAt(c, "billion strip", [540, 650]); rectIn(grp(big), [950, 215], null, CREAM, INK, 3); R(big).setValue(-3); shadowLayer(c, big, 10, 22, 45); onFrom(c.layer("billion strip"), 103);
headline(c, "billion", "$198 BILLION", 150, [65, 545, 950, 190], 103);                         // on "nearly $200 billion"
var BL = hl(c, "billion"); R(BL[0]).setValue(-3); R(BL[1]).setValue(-3);
var us = chip(c, "us", "US CARD FEES, 2025", [540, 808], 540, 30, 110, CREAM, -3);
tp.push(c.layer("billion strip"), BL[0], BL[1], us[0], us[1]); for (var i = 0; i < tp.length; i++) tp[i].parent = tw;
stepped(keys(S(tw), [[165, [100, 100]], [173, [72, 72]]]), "out"); stepped(keys(P(tw), [[165, [540, 1300]], [173, [330, 1300]]]), "out");
// "on top of the spread on your money": 2A's coin stack lands beside it
for (var i = 0; i < 12; i++) { var f = 177 + 3 * i, x = 800 + ((i * 37) % 11) - 5, y = 1300 - 17 - 30 * i;
  var k = coinSide(c, "coin " + (i + 1), [x, y], 320, 30); keys(P(k), [[f - 4, [x, y - 800]], [f, [x, y]]]); boil(k, 120 + i, 1, 0.4, "in"); onFrom(k, f - 4); }
inkLine(c, "shelf", [130, 1302], [970, 1302], 6, 165, 171, INK);
chip(c, "spread", "+ THE SPREAD ON\rYOUR MONEY", [800, 1376], 420, 30, 205);
overlay(c); marker(c, 43, "SFX: tick"); marker(c, 103, "SFX: stamp");
finishComp(c); "4A built";

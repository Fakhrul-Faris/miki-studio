// 2B. "Meanwhile, every card swipe sends the shop a bill too. About 2.4% of the sale, to the bank." 141 f + 10 (tear).
// The $10 sale rises out of the till; a cut line, a snip, and a 2.4% sliver flies off to the bank.
var c = freshComp("2B", 151);
paperBg(c);
var CUT = NW - SLIVER, sx = 540 + (CUT + SLIVER / 2 - NW / 2);                               // sliver centre, x
var n = note(c, "sale", [540, 1000], 100, 0); rectMask(c, n, [0, 0, CUT, NH]); n = c.layer("sale");
keys(P(n), [[22, [540, 1000]], [32, [540, 660]]]); boil(n, 31, 1.5, 0.3); onFrom(n, 22);       // "every card swipe"
var s = note(c, "sliver", [540, 1000], 100, 0); rectMask(c, s, [CUT, 0, SLIVER, NH]); s = c.layer("sliver");
A(s).setValue([CUT + SLIVER / 2, NH / 2]); P(s).setValue([sx, 1000]);
keys(P(s), [[22, [sx, 1000]], [32, [sx, 660]], [61, [sx, 660]], [65, [sx + 30, 620]], [78, [1220, 110]]]); boil(s, 31, 1.5, 0.3);
keys(R(s), [[61, 0], [78, 50]]); onFrom(s, 22);
var cut = inkLine(c, "cut line", [540 + CUT - NW / 2, 486], [540 + CUT - NW / 2, 834], 4, 39, 50, INK); offAt(cut, 61);   // "sends the shop a bill"
var reg = img(c, "CO_register.png", "register"); A(reg).setValue([726, 1251]); S(reg).setValue([62, 62]); P(reg).setValue([540, 1330]); boil(reg, 32, 1.5, 0.3);
headline(c, "pct", "2.4%", 230, [60, 150, 960, 270], 89);                                     // on "2.4%"
chip(c, "bank", "OF EVERY SALE  →  TO THE BANK", [540, 876], 780, 30, 107);
overlay(c); marker(c, 61, "SFX: snip"); marker(c, 89, "SFX: stamp");
finishComp(c); "2B built";

// 3A. "So 'free' isn't free. You already paid for it. It's baked into every price tag, even if you pay cash." 140 f + 8.
// E7 freeze + call-out: on "baked into" the frame freezes and an ochre ring circles the fee hidden on the tag.
// Then a cash note slides in with the same sliver already missing.
var c = freshComp("3A", 148);
plate(c, "3A.png", "3A tag", 0);
var pr = text(c, "price", "$10", "Anton", "Regular", 200, INK, [335, 790, 400, 240], "center", 0); pr.blendingMode = BlendingMode.MULTIPLY;
tiltAbout(pr, [535, 935], -5); threeD(pr, -1);
var fee = text(c, "fee", "incl. 24¢ card fee", "Bradley Hand", "Bold", 42, INK, [330, 1078, 430, 64], "center", 0); fee.blendingMode = BlendingMode.MULTIPLY;
tiltAbout(fee, [545, 1110], -5); threeD(fee, -1); onFrom(fee, 63);
threeD(inkRing(c, "fee ring", [545, 1112], [420, 128], 63, 77, -5), -1.5);
var hf = chip(c, "hidden", "HIDDEN FEE", [815, 1250], 300, 30, 77, CREAM, 3); threeD(hf[0], -2); threeD(hf[1], -2); offAt(hf[0], 107); offAt(hf[1], 107);
headline(c, "FREE?", "FREE?", 150, [80, 285, 920, 200], 4, -3);
threeD(inkLine(c, "strike2", [250, 400], [830, 372], 18, 10, 17, INK), -3);
var cash = note(c, "cash", [540, 2250], 72, -3); rectMask(c, cash, [0, 0, NW - SLIVER, NH]); cash = c.layer("cash"); threeD(cash, -6);
keys(P(cash), [[107, [540, 2250, -6]], [115, [540, 1330, -6]]]); boil(cash, 51, 1.5, 0.3, "out"); onFrom(cash, 107);   // "even if you pay cash"
threeD(inkRing(c, "cut ring", [806, 1316], [96, 290], 118, 126), -7);
var ec = chip(c, "even", "EVEN IN CASH", [540, 580], 480, 40, 115); threeD(ec[0], -4); threeD(ec[1], -4);
camDrift(c, [[0, [540, 960], 1], [63, [537, 975], 1.12], [107, [537, 975], 1.12], [147, [540, 1010], 1.04]]);
var ov = overlay(c); ov.property("ADBE Time Remapping").expression = "var t = time < " + 63 * F + " ? time : (time < " + 107 * F + " ? " + 63 * F + " : time - " + 44 * F + "); Math.floor(t * 12) / 12";
marker(c, 4, "SFX: stamp"); marker(c, 10, "SFX: rip"); marker(c, 63, "E7 freeze to 107");
finishComp(c); "3A built";

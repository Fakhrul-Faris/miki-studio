// EX07 MASTER: one unbroken take (E1). One paper canvas, stations stacked down it, one camera travelling through on the
// voice beats (audio/vo_timeline.json). C8: torn-paper occluders in front (z −350), the diagram (z 0), a paper ground behind.
// A8: odometer wheels, flip rows, a pull-tab, a slider gauge, a night wheel, a pop-up bank, a card pull-tab.
var END = 690, c = freshComp("MASTER", END);
var gnd = img(c, "paper.png", "ground"); S(gnd).setValue([600, 600]); P(gnd).setValue([540, 3800]);
// ---------- ST1 (y 0–1920): the hotel → 100 hotels, <1 % owned ----------
var GX = 198, GY = 508, CELL = 76, IW = 52, IH = 62;
for (var r = 0; r < 10; r++) {
  var xs = []; for (var q = 0; q < 10; q++) if (r || q) xs.push(GX + q * CELL);
  var front = hotelRow(c, "row " + r, GY + r * CELL, xs, IW, IH, false), fr = 127 + 2 * r;   // "owned by strangers": the rows flip
  onFrom(front, 44 + 2 * r); hold(S(front), [[0, [100, 100]], [fr, [100, 100]], [fr + 2, [100, 0]]]);
  var own = hotelRow(c, "owners " + r, GY + r * CELL, xs, IW, IH, true); onFrom(own, fr + 2); hold(S(own), [[0, [100, 0]], [fr + 2, [100, 0]], [fr + 4, [100, 100]]]);
}
var hero = img(c, "CO_hotel.png", "hotel hero"); A(hero).setValue([591, 1253]); S(hero).setValue([60, 60]); P(hero).setValue([540, 960]);
smooth(keys(S(hero), [[40, [60, 60]], [60, [2.5, 2.5]]]), 60); smooth(keys(P(hero), [[40, [540, 960]], [60, [GX, GY]]]), 60);
var share = shapeAt(c, "owned share", [GX, GY + IH / 2]); rectIn(grp(share), [IW, IH * 0.54], [0, -IH * 0.27], OCHRE); share.blendingMode = BlendingMode.MULTIPLY; onFrom(share, 73);
inkRing(c, "owned ring", [GX, GY], [118, 128], 73, 80);
bigChip(c, "owned", "<1% OWNED", [540, 300], 700, 130, 2, -2);                                // H2: the answer on frame 2
odo(c, "count", "9,361", [400, 1272], 80, 96, 115);                                         // "over nine thousand"
var hl1 = mono(c, "count label", "HOTELS", 40, [580, 1246, 330, 56], "left"); onFrom(hl1, 100);
// ---------- ST2 (y ~2800): "where does the money come from?" → the minibar loses money ----------
var tabS = shapeAt(c, "tab", [540, 2330]); rectIn(grp(tabS), [620, 150], null, OCHRE, INK, 4);
var tabT = text(c, "tab text", "WHERE'S THE MONEY?", "Anton", "Regular", 62, INK, [240, 2330 - 42, 600, 90], "center", 10);
var tp = P(tabT).value; stepped(keys(P(tabS), [[166, [540, 2330]], [178, [540, 2150]]]), "out"); stepped(keys(P(tabT), [[166, [tp[0], tp[1]]], [178, [tp[0], tp[1] - 180]]]), "out");
var pocket = shapeAt(c, "pocket", [540, 2360]); rectIn(grp(pocket), [660, 190], null, CREAM, INK, 4); shadowLayer(c, pocket, 8, 18, 40);
var mb = shapeAt(c, "minibar", [540, 2800]), g = grp(mb);
for (var k = 0; k < 3; k++) rectIn(g, [44, 110], [-90 + k * 90, 10], OCHRE, INK, 3);
rectIn(g, [300, 8], [0, 80], INK); rectIn(g, [300, 8], [0, -70], INK); rectIn(g, [320, 420], null, [0.86, 0.82, 0.74]); rectIn(grp(mb), [380, 480], null, INK);
var door = shapeAt(c, "minibar door", [350, 2800]), dg = grp(door); rectIn(dg, [30, 70], [300, 0], OCHRE, INK, 2); rectIn(dg, [370, 470], [185, 0], CREAM, INK, 4);
stepped(keys(S(door), [[197, [100, 100]], [205, [-25, 100]]]), "out");                        // "not the minibar": the door swings open
var gz = shapeAt(c, "gauge", [880, 2800]), gg = grp(gz); rectIn(gg, [60, 4], [0, 0], INK); rectIn(gg, [34, 460], null, CREAM, INK, 3);
var gp = mono(c, "gauge +", "+", 40, [850, 2540, 60, 50]), gm = mono(c, "gauge −", "−", 40, [850, 3030, 60, 50]);
var knob = shapeAt(c, "knob", [880, 2800]); rectIn(grp(knob), [76, 34], null, OCHRE, INK, 3);
stepped(keys(P(knob), [[222, [880, 2800]], [231, [880, 3000]]]), "out");                     // "that loses money"
bigChip(c, "loses", "LOSES MONEY", [540, 3170], 640, 110, 227, 2);
// ---------- ST3 (y ~4600): owners pay for the name, every room, every night → $5.4B ----------
var h2 = img(c, "CO_hotel.png", "hotel"); A(h2).setValue([591, 1253]); S(h2).setValue([20, 20]); P(h2).setValue([250, 4060]);
var gst = img(c, "M1_print.png", "guests"); S(gst).setValue([20, 20]); P(gst).setValue([250, 4610]); shadowLayer(c, gst, 8, 18, 40);
chip(c, "owners", "OWNERS", [250, 3760], 240, 30, 248);
inkLine(c, "not guests a", [140, 4420], [360, 4800], 14, 449, 453, INK); inkLine(c, "not guests b", [360, 4420], [140, 4800], 14, 454, 458, INK);   // "isn't from guests at all"
var T1 = [[390, 4200], [520, 4330], [600, 4440]]; track(c, "track 1", T1, 250, 262);
var tag = shapeAt(c, "tag", [790, 4450]), tg = grp(tag); rectIn(tg, [26, 26], [-150, 0], CREAM, INK, 3); rectIn(tg, [380, 200], null, OCHRE, INK, 4); R(tag).setValue(-3); shadowLayer(c, tag, 8, 18, 40); onFrom(tag, 258);
headline(c, "brand", "MARRIOTT", 82, [620, 4392, 360, 110], 260); R(c.layer("brand")).setValue(-3); R(c.layer("brand misreg")).setValue(-3);
var wh = ring(c, "night wheel", [790, 4080], 55, [["day", OCHRE, 110, 0, 50], ["night", INK, 110, 50, 100]]);
var whl = c.layer("night wheel"); stepped(keys(R(whl), [[300, 0], [305, 180], [316, 180], [321, 360]]), "out"); onFrom(whl, 298);
var ptr = shapeAt(c, "pointer", [790, 3955]), pg = grp(ptr); pathIn(pg, [[-16, -14], [16, -14], [0, 12]], true); fillIn(pg, INK); onFrom(ptr, 298);
var nl = mono(c, "night label", "EVERY NIGHT", 32, [640, 3880, 300, 46]); onFrom(nl, 298);
var coinAt = [266, 274, 282, 305, 321];                                                        // "a cut of every room, every night"
for (var i = 0; i < coinAt.length; i++) { var cn = coinTop(c, "fee coin " + i, T1[0], 22); onFrom(cn, coinAt[i]); ride(cn, T1, coinAt[i], coinAt[i] + 10); offAt(cn, coinAt[i] + 12); }
odo(c, "fees", "$5.4B", [600, 4790], 120, 339, 358);                                          // "five point four billion"
var fl = mono(c, "fees label", "IN FEES, 2025", 36, [350, 4642, 500, 50]); onFrom(fl, 379);
// ---------- ST4/5 (y ~6400): it's from banks → points → the card ----------
var T2 = [[900, 4560], [935, 4760], [935, 6080], [700, 6250]]; track(c, "track 2", T2, 458, 478);
var bank = shapeAt(c, "bank", [540, 6560]), bg = grp(bank);
pathIn(bg, [[-250, -300], [250, -300], [0, -410]], true); strokeIn(bg, INK, 4); fillIn(bg, OCHRE);
bg = grp(bank); rectIn(bg, [470, 34], [0, -282], CREAM, INK, 4);
for (var k = 0; k < 4; k++) { bg = grp(bank); rectIn(bg, [44, 220], [-156 + k * 104, -152], CREAM, INK, 4); }
bg = grp(bank); rectIn(bg, [280, 10], [0, -16], INK); bg = grp(bank); rectIn(bg, [500, 42], [0, -21], CREAM, INK, 4);
hold(S(bank), [[0, [100, 0]]]); stepped(keys(S(bank), [[480, [100, 0]], [486, [100, 100]]]), "out"); onFrom(bank, 480);   // "it's from banks": it pops up
var card = shapeAt(c, "card", [540, 6470]), cg = grp(card); rectIn(cg, [52, 40], [-108, -40], CREAM, INK, 3); cg = grp(card); rectIn(cg, [340, 26], [0, 46], INK);
cg = grp(card); rectIn(cg, [340, 214], null, OCHRE, INK, 4, 18); card.moveAfter(bank);
stepped(keys(P(card), [[574, [540, 6470]], [588, [540, 6690]]]), "out"); onFrom(card, 574);  // "to give away on credit cards"
odo(c, "banks", "$716M", [540, 5880], 120, 518, 532);                                        // "seven hundred million"
var bl = mono(c, "banks label", "BANKS PAID, 2025", 40, [270, 5990, 540, 60]); onFrom(bl, 540);
for (var i = 0; i < 8; i++) { var s0 = 507 + 6 * i, sp = star(c, "point " + i, T2[0], 26); onFrom(sp, s0); ride(sp, T2, s0, s0 + 28); offAt(sp, s0 + 30); }
var SPOTS = [[470, 6660], [540, 6725], [612, 6655]];
for (var i = 0; i < 3; i++) { var f = 583 + 4 * i, sc = star(c, "card point " + i, [540, 6380], i == 2 ? 30 : 24); onFrom(sc, f);
  stepped(keys(P(sc), [[f, [540, 6380]], [f + 8, SPOTS[i]]]), "in"); }
var you = shapeAt(c, "you", SPOTS[2]), yg = grp(you); ellIn(yg, [8, 8], [0, -6], INK); yg = grp(you); rectIn(yg, [9, 11], [0, 4], INK, null, 0, 3); onFrom(you, 599);
var yc = bigChip(c, "points", "YOU'RE THE POINTS", [612, 6605], 210, 26, 645, -2);
// ---------- C8: torn paper in front (parallax), then everything 3D ----------
var OCC = [["3B_strip.png", [40, 3400], 60, 80], ["3B_tear_patch.png", [1060, 4100], 40, 20], ["3B_strip.png", [1050, 5400], 55, -95], ["2B_scraps_front.png", [520, 7200], 70, 180]];
var keep = {};
for (var i = 0; i < OCC.length; i++) { var o = img(c, OCC[i][0], "occluder " + i); S(o).setValue([OCC[i][2], OCC[i][2]]); P(o).setValue(OCC[i][1]); R(o).setValue(OCC[i][3]); threeD(o, -350); keep[o.name] = 1; }
threeD(gnd, 6); keep["ground"] = 1;
all3D(c, keep);
var cam = camDrift(c, [[0, [540, 960], 1], [40, [540, 945], 1.06], [62, [540, 930], 1.0], [150, [540, 960], 1.03], [195, [540, 2760], 1.0], [235, [540, 2790], 1.05],
  [258, [540, 4560], 1.0], [380, [540, 4630], 1.03], [405, [540, 4700], 1.04], [456, [520, 4720], 1.06], [480, [560, 6300], 1.0], [505, [540, 6330], 1.0], [600, [540, 6470], 1.05], [618, [570, 6580], 1.5], [650, [612, 6645], 3.6], [END - 1, [612, 6645], 3.75]]);
overlay(c);
// subtitles (house pill, 2D on top), hidden where the same words are on screen; MASTER frames from audio/vo_timeline.json
var SUBS = [[5, 34, "Marriott barely owns"], [35, 58, "any of its hotels."], [127, 158, "owned by strangers."], [161, 194, "So where does the money come from?"],
  [197, 222, "Not the minibar."], [248, 270, "Owners pay Marriott"], [271, 296, "to use the name."], [298, 336, "A cut of every room, every night."],
  [384, 404, "last year."], [408, 445, "But the fastest-growing money"], [446, 478, "isn't from guests at all."], [480, 504, "It's from banks."],
  [505, 517, "Banks paid"], [540, 572, "for Marriott points,"], [574, 614, "to give away on credit cards."], [618, 642, "You're not the guest."]];
for (var si = 0; si < SUBS.length; si++) {
  var sb = SUBS[si], txt = sb[2], wpx = txt.length * 24 + 60, SY = 1390;
  var pill = c.layers.addShape(); pill.name = "sub pill " + (si + 1); P(pill).setValue([0, 0]); A(pill).setValue([0, 0]);
  var pr = grp(pill).addProperty("ADBE Vector Shape - Rect"); pr.property("ADBE Vector Rect Size").setValue([wpx, 72]); pr.property("ADBE Vector Rect Position").setValue([W / 2, SY]); pr.property("ADBE Vector Rect Roundness").setValue(8);
  c.layer("sub pill " + (si + 1)).property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(PAPER);
  O(c.layer("sub pill " + (si + 1))).setValue(92);
  text(c, "sub " + (si + 1), txt, "IBM Plex Mono", "Medium", 40, INK, [60, SY - 27, W - 120, 56], "center", 0);
}
app.run("comp.open", { comp: "MASTER" });
app.run("file.import", { paths: [DIR + "sfx/mix.wav"], addToComp: true, time: 0 });
c.layer(1).name = "VO + bed + SFX mix.wav";
finishComp(c);
for (var si = 0; si < SUBS.length; si++) { var sb = SUBS[si], ps = [c.layer("sub pill " + (si + 1)), c.layer("sub " + (si + 1))];
  for (var q = 0; q < 2; q++) { ps[q].inPoint = sb[0] * F; ps[q].outPoint = (sb[1] + 1) * F; } }
"MASTER (one take) built, " + END + " frames";

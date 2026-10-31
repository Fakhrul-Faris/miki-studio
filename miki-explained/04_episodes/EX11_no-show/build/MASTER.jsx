// MASTER, one comp (461 f = 19.2 s). The picture is two MASTER-aligned Blender sequences (build/clinic.py, rendered on
// threes = A1 8 fps): DESK and ROOM. E5: every cut is on an even beat of the 100 BPM bed (28.8 f) — the cuts live in
// clinic.py's camera keys and in the DESK/ROOM switches below. Paper chips, subtitles and the follow card ride on top.
var TOTAL = 461, c = freshComp("MASTER", TOTAL); c.bgColor = PAPER;
paperBg(c);
var desk = seq(c, "DESK", "desk", 1), room = seq(c, "ROOM", "room", 1);
var ROOM_SPANS = [[86, 144], [259, 317]];
hold(O(desk), [[0, 100], [86, 0], [144, 100], [259, 0], [317, 100]]);
hold(O(room), [[0, 0], [86, 100], [144, 0], [259, 100], [317, 0]]);

// 2A: the study (Barts Health NHS Trust, London; trial 1: 10,111 patients)
var s1 = chip(c, "study", "BARTS HEALTH NHS TRUST · LONDON", [540, 250], 760, 30, 62, null, -1.5);
var s2 = chip(c, "patients", "10,111 PATIENTS · 2013–14", [540, 340], 560, 30, 66, null, 1.2);
offAll(s1.concat(s2), 86);
// "one in nine never came" — 4 of 36 seats, ringed in the set
var nine = bigChip(c, "nine", "1 IN 9 NEVER CAME", [540, 230], 760, 100, 127, -2); offAll(nine, 144);
// 3A: the usual reminder; then the extra line
var us = chip(c, "usual", "THE USUAL REMINDER", [540, 230], 520, 30, 150, null, -1.5); offAll(us, 173);
var one = bigChip(c, "oneline", "+ ONE LINE", [540, 220], 520, 96, 165, 2); offAll(one, 202);
// 4A: a quarter fewer missed appointments (trial 1: 11.1% → 8.4%)
var q = bigChip(c, "quarter", "A QUARTER FEWER", [540, 260], 760, 96, 285, -2);
var qn = chip(c, "qnums", "NO-SHOWS: 11.1% TO 8.4%", [540, 400], 600, 30, 288, null, 1.5);
offAll(q.concat(qn), 317);

// the follow card (CTA-end) over the desk, 403 → end; silent logo
var cp = shapeAt(c, "cta", [540, 360]); rectIn(grp(cp), [700, 300], null, CREAM, INK, 4); shadowLayer(c, cp, 10, 22, 40); onFrom(c.layer("cta"), 403);
var lg = img(c, "logo.png", "logo"); S(lg).setValue([38, 38]); P(lg).setValue([310, 360]); onFrom(lg, 406);
var t1 = text(c, "cta follow", "FOLLOW", "IBM Plex Mono", "Bold", 40, INK, [420, 262, 360, 60], "left", 40); onFrom(t1, 403);
var t2 = text(c, "cta name", "MEIKIGO", "Anton", "Regular", 120, INK, [420, 300, 400, 150], "left", 10); stamp(t2, 406);
var t3 = text(c, "cta more", "FOR MORE", "IBM Plex Mono", "Bold", 34, INK, [420, 462, 360, 50], "left", 40); onFrom(t3, 409);

// subtitles (house pill), hidden where the same words are in the set (the slip, the phone, £160, THE PRICE DID., the card)
var SUBS = [[44, 57, "Barely."], [60, 100, "A London hospital tested it."], [101, 117, "With the usual text,"], [118, 152, "one in nine never came."],
  [154, 186, "Then they added one line:"], [256, 296, "Missed appointments fell by a quarter."], [297, 314, "Same hospital."], [315, 334, "One extra line."],
  [336, 377, "The reminder didn't stop no-shows."]];
for (var si = 0; si < SUBS.length; si++) {
  var sb = SUBS[si], txt = sb[2], wpx = txt.length * 24 + 60, SY = 1560;
  var pill = c.layers.addShape(); pill.name = "sub pill " + (si + 1); P(pill).setValue([0, 0]); A(pill).setValue([0, 0]);
  var pr = grp(pill).addProperty("ADBE Vector Shape - Rect"); pr.property("ADBE Vector Rect Size").setValue([wpx, 72]); pr.property("ADBE Vector Rect Position").setValue([W / 2, SY]); pr.property("ADBE Vector Rect Roundness").setValue(8);
  c.layer("sub pill " + (si + 1)).property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(PAPER);
  O(c.layer("sub pill " + (si + 1))).setValue(92);
  text(c, "sub " + (si + 1), txt, "IBM Plex Mono", "Medium", 40, INK, [60, SY - 27, W - 120, 56], "center", 0);
}
overlay(c);
app.run("comp.open", { comp: "MASTER" });
app.run("file.import", { paths: [DIR + "sfx/mix.wav"], addToComp: true, time: 0 });
c.layer(1).name = "VO + music + paper mix.wav";
finishComp(c);
for (var si = 0; si < SUBS.length; si++) { var sb = SUBS[si], ps = [c.layer("sub pill " + (si + 1)), c.layer("sub " + (si + 1))];
  for (var k = 0; k < 2; k++) { ps[k].inPoint = sb[0] * F; ps[k].outPoint = (sb[1] + 1) * F; } }
"MASTER built, " + TOTAL + " frames";

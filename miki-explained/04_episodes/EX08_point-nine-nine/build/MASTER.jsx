// EX08 "The .99 Trick": type only (A2), no voice (U3), locked-off frame (C7), a card every 1.5 beats of the 71 bpm track
// (1.27 s, E2), a 3-2-1 countdown (S3), the guess-timer hook (H6), "WHY .99?" persistent (T3). Cards are listed in units of
// 1.5 beats; every card's layers live only inside its window (set after finishComp, which resets in/out points).
var U = 1.5 * 60 / 71 * FPS, OFF = 1.7;                                 // 30.42 frames; first beat at 0.07 s
function T(u) { return Math.round(OFF + u * U); }
var END = T(34), c = freshComp("MASTER", END);
paperBg(c);
var CARDS = [];
function card(u, len, build) { var n0 = c.numLayers; build(T(u)); var names = []; for (var i = 1; i <= c.numLayers - n0; i++) names.push(c.layer(i).name); CARDS.push([names, T(u), T(u + len)]); }
var NAMES = 0;
function big(str, size, y, f, col, rot) {                               // stamped Anton, centred on y, inside x 60–960
  var name = "t" + (NAMES++), n = str.split("\r").length, top = y - 0.31 * size - ((n - 1) * 1.05 * size + 0.73 * size) / 2;
  var t = text(c, name, str, "Anton", "Regular", size, col || INK, [60, top, 900, n * size * 1.05 + size * 0.6], "center", 10);
  if (!col || col == INK) t.blendingMode = BlendingMode.MULTIPLY;
  stamp(t, f); if (rot) R(t).setValue(rot);
  if (!col || col == INK) { var m = misreg(t, 4, 3, 50); onFrom(m, f); if (rot) R(m).setValue(rot); }
  return t;
}
function small(str, size, y, f, col) { var name = "m" + (NAMES++);
  var t = text(c, name, str, "IBM Plex Mono", "Bold", size, col || INK, [60, y - size * 0.7, 900, size * 1.6], "center", 30); onFrom(t, f); return t; }
// ---- hook (H6): the question, then a 3-second guess timer ----
card(0, 1, function (s) { big("WHY DOES\rEVERYTHING", 170, 860, s); });
card(1, 1, function (s) { small("END IN", 64, 560, s); big(".99?", 380, 900, s + 2, OCHRE); });
card(2, 2, function (s) {
  big("GUESS WHY", 130, 420, s);
  disc(c, "timer disc", [510, 960], 230, CREAM); shadowLayer(c, c.layer("timer disc"), 8, 18, 35);
  var r = ring(c, "timer", [510, 960], 205, [["t", INK, 26, 0, 100]]); stepped(keys(r.t.property("ADBE Vector Trim End"), [[s, 100], [s + 60, 0]]), "lin");
  var a = big("3", 260, 960, s), b = big("2", 260, 960, s + 20), d = big("1", 260, 960, s + 40);
  offAt(a, s + 20); offAt(c.layer(a.name + " misreg"), s + 20); offAt(b, s + 40); offAt(c.layer(b.name + " misreg"), s + 40);
  small("GUESS BEFORE IT RUNS OUT", 40, 1300, s + 6);
});
// ---- stakes ----
card(4, 1, function (s) { big("RM 9.90", 250, 900, s); });
card(5, 1, function (s) { big("$19.99", 250, 900, s); });
card(6, 1, function (s) { big("4.99", 300, 900, s, OCHRE); });
card(7, 1, function (s) { big("IT'S EVERYWHERE.", 120, 800, s); big("NOT AN ACCIDENT.", 110, 1020, s + 8, OCHRE); });
// ---- 3: the story (unproven) ----
card(8, 1, function (s) { big("3", 620, 760, s, OCHRE); big("THE STORY", 120, 1240, s + 4); });
card(9, 2, function (s) {
  big(".99 FORCED THE\rCASHIER TO\rMAKE CHANGE", 100, 500, s);
  var dr = shapeAt(c, "drawer", [510, 1140]); rectIn(grp(dr), [560, 100], null, OCHRE, INK, 4);
  stepped(keys(P(dr), [[s + 20, [510, 1140]], [s + 24, [510, 1235]]]), "out");          // the till opens on the beat
  var tl = shapeAt(c, "till", [510, 1040]); rectIn(grp(tl), [640, 240], null, CREAM, INK, 5); shadowLayer(c, tl, 8, 18, 35);
  small("TILL", 70, 1040, s);
});
card(11, 1, function (s) { big("SO THEY COULDN'T\rPOCKET THE CASH.", 115, 900, s); });
card(12, 1, function (s) { big("NICE STORY.", 150, 760, s); var k = inkLine(c, "strike story", [130, 780], [890, 740], 18, s + 8, s + 11, INK);
  big("UNPROVEN.", 200, 1080, s + 14, OCHRE, -6); });
// ---- 2: the left digit ----
card(13, 1, function (s) { big("2", 620, 700, s, OCHRE); big("YOUR BRAIN READS\rLEFT → RIGHT", 100, 1230, s + 4); });
card(14, 2, function (s) {
  var two = text(c, "two", "2", "Anton", "Regular", 560, OCHRE, [110, 380, 420, 760], "center", 0); stamp(two, s);
  var dot = text(c, "dot99", ".99", "Anton", "Regular", 200, INK, [470, 720, 420, 300], "left", 0); dot.blendingMode = BlendingMode.MULTIPLY; stamp(dot, s + 10);
  small("FEELS LIKE 2. NOT 3.", 56, 1260, s + 22);
});
card(16, 2, function (s) { big("THE LEFT-DIGIT\rEFFECT", 150, 860, s); small("THOMAS & MORWITZ, 2005", 40, 1230, s + 10); });
// ---- 1: the dress (the twist) ----
card(18, 1, function (s) { big("1", 620, 700, s, OCHRE); big("ONE CATALOG", 110, 1230, s + 4); });
card(19, 2, function (s) { big("SAME DRESS.\rTHREE PRICES.", 110, 480, s);
  var X = [230, 510, 790], P3 = ["$34", "$39", "$44"];
  for (var i = 0; i < 3; i++) bigChip(c, "tag" + i, P3[i], [X[i], 950], 250, 120, s + 8 + 10 * i, (i - 1) * 3); });
card(21, 2, function (s) {
  var X = [230, 510, 790], P3 = ["$34", "$39", "$44"], N = [46, 66, 45], BASE = 1250;
  inkLine(c, "bars base", [90, BASE], [930, BASE], 6, s, s + 2, INK);
  for (var i = 0; i < 3; i++) {
    var h = N[i] * 9, b = shapeAt(c, "bar" + i, [X[i], BASE]), g = grp(b); rectIn(g, [180, 1], null, i == 1 ? OCHRE : INK, INK, 3);
    var rs = g.property(1).property("ADBE Vector Rect Size"), rp = g.property(1).property("ADBE Vector Rect Position");
    stepped(keys(rs, [[s + 2, [180, 1]], [s + 18, [180, h]]]), "out"); stepped(keys(rp, [[s + 2, [0, 0]], [s + 18, [0, -h / 2]]]), "out");
    var lb = text(c, "units" + i, "" + N[i], "Anton", "Regular", 90, INK, [X[i] - 120, BASE - h - 130, 240, 120], "center", 0); onFrom(lb, s + 18);
    var pl = text(c, "price" + i, P3[i], "IBM Plex Mono", "Bold", 44, INK, [X[i] - 120, BASE + 20, 240, 60], "center", 0); onFrom(pl, s);
  }
  small("DRESSES SOLD", 40, 1390, s + 4);
});
card(23, 1, function (s) { big("$39", 300, 640, s, OCHRE); inkRing(c, "ring39", [510, 640], [520, 330], s + 4, s + 10);
  big("SOLD ~40% MORE\rTHAN $34", 100, 1150, s + 8); });
// ---- payoff ----
card(24, 1, function (s) { big("A 9 DOESN'T JUST\rLOOK CHEAPER.", 110, 900, s); });
card(25, 1, function (s) { big("IT SAYS", 110, 600, s); big("DEAL.", 360, 980, s + 6, OCHRE, -4); });
card(26, 1, function (s) { big("EVEN WHEN\rIT ISN'T.", 160, 900, s); });
// ---- bridge (Malaysia, your price list) ----
card(27, 2, function (s) { big("MALAYSIA DROPPED\rTHE 1-SEN COIN\rIN 2008.", 110, 700, s); big("SO OUR .99 IS .90", 90, 1180, s + 30, OCHRE); });
card(29, 1, function (s) { big("NOW LOOK AT\rYOUR PRICE LIST:", 115, 900, s); });
card(30, 2, function (s) { big("RM 20", 220, 520, s); small("OR", 60, 790, s + 10); var rmT = text(c, "rm label", "RM", "Anton", "Regular", 170, INK, [70, 1060 - 0.68 * 170, 200, 240], "center", 0); stamp(rmT, s + 18);
  odo(c, "rm", "19.90?", [600, 1060], 170, s + 18, s + 40); });
// ---- loop ----
card(32, 2, function (s) { big("DID YOU\rGUESS RIGHT?", 160, 820, s);
  var r = ring(c, "timer back", [510, 1260], 80, [["t", INK, 14, 0, 0]]); stepped(keys(r.t.property("ADBE Vector Trim End"), [[s + 10, 0], [s + 55, 100]]), "lin"); });
// ---- T3: the persistent headline, top-left inside the safe area ----
var pc = shapeAt(c, "T3 chip", [200, 205]); rectIn(grp(pc), [280, 56], null, OCHRE, INK, 2); R(pc).setValue(-1.5);
var pt = text(c, "T3 text", "WHY .99?", "IBM Plex Mono", "Bold", 34, INK, [60, 186, 280, 46], "center", 40); tiltAbout(pt, [200, 205], -1.5);
overlay(c);
app.run("comp.open", { comp: "MASTER" });
app.run("file.import", { paths: [DIR + "sfx/mix.wav"], addToComp: true, time: 0 });
c.layer(1).name = "music + SFX mix.wav";
finishComp(c);
for (var i = 0; i < CARDS.length; i++) { var cd = CARDS[i]; for (var j = 0; j < cd[0].length; j++) { var l = c.layer(cd[0][j]); l.inPoint = cd[1] * F; l.outPoint = cd[2] * F; } }
c.layer("T3 chip").inPoint = T(4) * F; c.layer("T3 text").inPoint = T(4) * F;
"EX08 MASTER built: " + CARDS.length + " cards, " + END + " frames";

// MASTER, one comp (1150 f ≈ 47.9 s). The picture is five MASTER-aligned Blender sequences (build/sets.py, on twos) switched
// on hard cuts, plus the M1 print shot (274–384) built here. C4: every set is seen first-person; E13: shots 3–5 (1 · 2 · 3)
// share one framing; the break (TABLE) pulls back to show the three buttons as paper props.
var TOTAL = 1150, c = freshComp("MASTER", TOTAL); c.bgColor = PAPER;
paperBg(c);
var SPANS = { LIFT: [[0, 274], [384, 409], [979, TOTAL]], CROSS: [[409, 589]], OFFICE: [[589, 637]], TABLE: [[637, 797]], COUNTER: [[797, 979]] };
for (var n in SPANS) {
  var l = seq(c, n, n.toLowerCase(), 1), sp = SPANS[n], k = [[0, 0]];
  for (var i = 0; i < sp.length; i++) { k.push([sp[i][0], 100]); if (sp[i][1] < TOTAL) k.push([sp[i][1], 0]); }
  if (sp[0][0] == 0) k.shift();
  hold(O(l), k);
}
// 2b (274–384): the documentary print — a real panel, the close button — and what the button often is
var m1 = photo(c, "M1_print.png", "M1 print", 62, [540, 900], -2); onBetween(m1, 274, 384);
smooth(keys(S(m1), [[274, [62, 62]], [383, [70, 70]]]), 30);
var d1 = bigChip(c, "delay", "ON A DELAY", [540, 300], 560, 90, 313, -2), d2 = bigChip(c, "off", "SWITCHED OFF", [540, 440], 640, 90, 326, 1.5),
    d3 = bigChip(c, "key", "FIREFIGHTER'S KEY ONLY", [540, 580], 900, 80, 359, -1);
offAll(d1.concat(d2, d3), 384);

// 1 (0–166): the guess timer, then the answer
var tm = [["GUESS · 0:03", 37, 61], ["GUESS · 0:02", 61, 85], ["GUESS · 0:01", 85, 109], ["TIME · 0:00", 109, 124]];
for (var i = 0; i < tm.length; i++) { var t = chip(c, "timer " + i, tm[i][0], [540, 250], 460, 40, tm[i][1], null, -1.5); offAll(t, tm[i][2]); }
var often = bigChip(c, "often", "OFTEN: NOTHING.", [540, 260], 720, 100, 105, -2); offAll(often, 166);
// 2a (166–274): the rule
var r1 = bigChip(c, "rule", "DOORS STAY OPEN 3 SECONDS", [540, 250], 960, 76, 252, -1.5);
var r2 = chip(c, "ada", "US ADA STANDARDS · §407.3.5", [540, 370], 560, 26, 256, null, 1.2); offAll(r1.concat(r2), 274);
// S3: one · two · three (big mono numbers on the matched shots)
function num(name, str, f, f1) { var t = text(c, name, str, "Anton", "Regular", 340, INK, [70, 120, 300, 400], "left", 0); t.blendingMode = BlendingMode.MULTIPLY; stamp(t, f); onFrom(misreg(t, 6, 4, 50), f); offAt(t, f1); offAt(c.layer(name + " misreg"), f1); }
num("n1", "1", 397, 409); num("n2", "2", 411, 445); num("n3", "3", 591, 637);
// 4 (409–589): the crosswalks
var ny = chip(c, "ny", "NEW YORK CITY · 2004", [540, 250], 520, 30, 459, null, -1.5);
var nyn = bigChip(c, "nyn", "2,500 OF 3,250", [540, 370], 700, 110, 494, 2);
var nyw = chip(c, "nyw", "WALK BUTTONS", [540, 480], 360, 30, 550, null, -1);
var nyd = bigChip(c, "nyd", "DID NOTHING.", [540, 600], 620, 96, 578, -2); offAll(ny.concat(nyn, nyw, nyd), 589);
var th = chip(c, "therm", "THE OFFICE THERMOSTAT", [600, 250], 560, 30, 607, null, 1.5); offAll(th, 637);
// 6 (637–797): the break
var nb = bigChip(c, "notbroken", "THEY'RE NOT BROKEN.", [540, 260], 860, 92, 670, -2); offAll(nb, 721);
var you = bigChip(c, "you", "IT'S YOU.", [540, 280], 560, 150, 721, 2);
var st = chip(c, "shorter", "SOMETHING TO DO = A SHORTER WAIT", [540, 450], 760, 30, 767, null, -1); offAll(you.concat(st), 797);
// 7 (797–979): the counter; the phone card gives them something to hold
var tw = chip(c, "ten", "10 WAITING · NOTHING TO PRESS", [540, 250], 640, 30, 866, null, -1.5); offAll(tw, 889);
var ph = shapeAt(c, "phone card", [540, 470]); rectIn(grp(ph), [520, 400], null, CREAM, INK, 5, 36); shadowLayer(c, ph, 12, 26, 45);
stepped(keys(P(ph), [[889, [540, 1300]], [897, [540, 470]]]), "out"); onFrom(ph, 889);
var p1 = text(c, "p1", "#47", "Anton", "Regular", 150, INK, [300, 300, 480, 170], "center", 10); stamp(p1, 913);
var p2 = mono(c, "p2", "3 AHEAD OF YOU", 34, [300, 470, 480, 50]); onFrom(p2, 927);
var p3 = mono(c, "p3", "ABOUT 6 MIN", 34, [300, 540, 480, 50]); onFrom(p3, 944);
offAll([ph, p1, c.layer("p1 misreg") || p1, p2, p3], 979);
// 8 (979–1150): the end and the follow card (silent logo)
var calm = bigChip(c, "calm", "IT'S KEEPING YOU CALM.", [540, 260], 960, 84, 1058, -2); offAll(calm, 1089);
var cp = shapeAt(c, "cta", [540, 360]); rectIn(grp(cp), [700, 300], null, CREAM, INK, 4); shadowLayer(c, cp, 10, 22, 40); onFrom(c.layer("cta"), 1089);
var lg = img(c, "logo.png", "logo"); S(lg).setValue([38, 38]); P(lg).setValue([310, 360]); onFrom(lg, 1092);
var t1 = text(c, "cta follow", "FOLLOW", "IBM Plex Mono", "Bold", 40, INK, [420, 262, 360, 60], "left", 40); onFrom(t1, 1089);
var t2 = text(c, "cta name", "MEIKIGO", "Anton", "Regular", 120, INK, [420, 300, 400, 150], "left", 10); stamp(t2, 1092);
var t3 = text(c, "cta more", "FOR MORE", "IBM Plex Mono", "Bold", 34, INK, [420, 462, 360, 50], "left", 40); onFrom(t3, 1095);

// T1: big word captions, word by word
var CY = 1384;
for (var ci = 0; ci < CAP.length; ci++) {
  var cpp = CAP[ci], sz = cpp[2].length > 18 ? 64 : 78, wpx = Math.min(1000, cpp[2].length * sz * 0.43 + 70);
  var stp = c.layers.addShape(); stp.name = "cap strip " + (ci + 1); A(stp).setValue([0, 0]); P(stp).setValue([W / 2, CY]);
  rectIn(grp(stp), [wpx, sz * 1.25], null, CREAM, INK, 3); R(stp).setValue(ci % 2 ? 0.8 : -0.8);
  var tl = text(c, "cap " + (ci + 1), cpp[2], "Anton", "Regular", sz, INK, [40, CY - sz * 0.68, W - 80, sz * 1.4], "center", 10);
  tiltAbout(tl, [W / 2, CY], ci % 2 ? 0.8 : -0.8);
  cutWords(tl, cpp[3]);
}
overlay(c);
app.run("comp.open", { comp: "MASTER" });
app.run("file.import", { paths: [DIR + "sfx/mix.wav"], addToComp: true, time: 0 });
c.layer(1).name = "VO + paper foley mix.wav";
finishComp(c);
for (var ci = 0; ci < CAP.length; ci++) { var cpp = CAP[ci], ls = [c.layer("cap strip " + (ci + 1)), c.layer("cap " + (ci + 1))];
  for (var q = 0; q < 2; q++) { ls[q].inPoint = cpp[0] * F; ls[q].outPoint = (cpp[1] + 1) * F; } }
"MASTER built, " + TOTAL + " frames, " + CAP.length + " captions";

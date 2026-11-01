// MASTER, one comp (1041 f ≈ 43.4 s), cut to audio/vo_timeline.json. Four Opuscar clips (build/opus: the board 1A/4A/7A in
// the News Package system, the 3A chart in the Data Storytelling style), the printed 3D queue (build/queue.py → layers/5A),
// and two collage shots built here: 2A (the ride entrance print, you join) and 6A (the nasi kandar counter: 15 → 10).
var TOTAL = 1041, c = freshComp("MASTER", TOTAL); c.bgColor = INK;
function clip(file, name, f0, f1) {
  var it = item(file);
  if (!it) { app.run("file.import", { paths: [DIR + "layers/clips/" + file], sequence: false, addToComp: false }); it = item(file); }
  var l = c.layers.add(it); l.name = name; l.startTime = f0 * F; onBetween(l, f0, f1); return l;
}
clip("1A.mp4", "1A board", 0, 98);
clip("3A.mp4", "3A chart", 200, 363);
clip("4A.mp4", "4A quote", 363, 540);
var q = seq(c, "5A", "5A queue", 1); q.startTime = 540 * F; onBetween(q, 540, 767);
clip("7A.mp4", "7A board", 911, TOTAL);

// ---------- 2A (98–200) "You're at Pirates of the Caribbean, in July…": the print slides up over the board ----------
var bg2 = paperBg(c); bg2.name = "2A paper";
var m1 = photo(c, "M1_print.png", "2A M1 print", 55, [540, 900], 1.5);
var sixty = text(c, "2A sixty", "60\rMIN", "Anton", "Regular", 74, OCHRE, [700, 640, 150, 200], "center", 0);
tiltAbout(sixty, [772, 735], 1.5); sixty.parent = m1;
var pir = chip(c, "2A pirates", "PIRATES OF THE CARIBBEAN", [540, 245], 760, 34, 106, null, -1.5);
var jul = chip(c, "2A july", "JULY · A DISNEY WORLD QUEUE", [540, 330], 600, 26, 137, null, 1);
var you2 = cut2D(c, "CO_queue3.png", "2A you", [358, 1158]); S(you2).setValue([42, 42]); P(you2).setValue([1300, 1560]);
stepped(keys(P(you2), [[168, [1300, 1560]], [176, [800, 1560]]]), "out"); shadowLayer(c, you2, 10, 22, 40);
var rig2 = ctrl(c, "2A rig", [540, 960]);
var g2 = [bg2, m1, you2].concat(pir, jul);
for (var i = 0; i < g2.length; i++) { g2[i].parent = rig2; onBetween(g2[i], 98, 200); }
onBetween(sixty, 106, 200); stamp(sixty, 106);
stepped(keys(P(rig2), [[98, [540, 2900]], [104, [540, 960]]]), "out");                  // paper slide up over the board
smooth(keys(S(m1), [[104, [55, 55]], [199, [60, 60]]]), 30);                            // a slow push on the print

// ---------- 6A (767–911) "Now picture your nasi kandar counter at one o'clock…" ----------
var bg6 = paperBg(c); bg6.name = "6A paper";
var m2 = photo(c, "M2_print.png", "6A M2 print", 52, [540, 930], -2);
var nk = chip(c, "6A nk", "NASI KANDAR · 1 PM", [540, 250], 560, 34, 783, null, -1.5);
var plate6 = img(c, "ENV_counter.png", "6A counter"); S(plate6).setValue([75, 75]); P(plate6).setValue([540, 960]);
var fif = text(c, "6A fifteen", "15 MIN", "Bradley Hand", "Bold", 120, PAPER, [370, 320, 450, 170], "center", 0);
var dish = cut2D(c, "CO_plate.png", "6A plate", [713, 598]); S(dish).setValue([30, 30]); P(dish).setValue([600, 2300]); shadowLayer(c, dish, 8, 16, 40);
stepped(keys(P(dish), [[854, [600, 2300]], [860, [600, 1000]]]), "out");
var ten = bigChip(c, "6A ten", "SERVED IN 10", [600, 640], 600, 84, 860, -2);
var qs = [["CO_queue1.png", [377, 1161], [660, 1330]], ["CO_queue2.png", [347, 1140], [430, 1360]], ["CO_queue3.png", [358, 1158], [190, 1270]]];
var qls = [];
for (var i = 0; i < qs.length; i++) {
  var ql = cut2D(c, qs[i][0], "6A queuer " + (i + 1), qs[i][1]); S(ql).setValue([38, 38]); shadowLayer(c, ql, 10, 22, 40);
  var to = qs[i][2]; stepped(keys(P(ql), [[873 + 3 * i, [to[0] + 700, to[1]]], [881 + 3 * i, to]]), "out"); qls.push(ql);
}
if (true) { // the line bends round the corner: an ink arrow from the counter to the corner
  inkLine(c, "6A bend", [700, 1500], [120, 1420], 8, 885, 900, OCHRE);
}
onBetween(bg6, 767, 911); onBetween(m2, 767, 806); offAll(nk, 806);
var rig6 = ctrl(c, "6A rig", [540, 960]); m2.parent = rig6; stepped(keys(P(rig6), [[767, [540, 2900]], [773, [540, 960]]]), "out");
onBetween(plate6, 801, 911); stepped(keys(P(plate6), [[801, [540, 2900]], [807, [540, 960]]]), "out");   // the counter slides up over the print
onBetween(fif, 835, 911); stamp(fif, 835);
onBetween(dish, 854, 911); offAll(ten, 911);
for (var i = 0; i < qls.length; i++) onBetween(qls[i], 873, 911);
offAt(c.layer("6A bend"), 911);

// ---------- 7A: the follow card on "Follow Meikigo for more." (1006 →), over the board's loop ----------
var cp = shapeAt(c, "cta", [540, 1180]); rectIn(grp(cp), [700, 300], null, CREAM, INK, 4); shadowLayer(c, cp, 10, 22, 40); onFrom(c.layer("cta"), 1006);
var lg = img(c, "logo.png", "logo"); S(lg).setValue([38, 38]); P(lg).setValue([310, 1180]); onFrom(lg, 1009);
var t1 = text(c, "cta follow", "FOLLOW", "IBM Plex Mono", "Bold", 40, INK, [420, 1082, 360, 60], "left", 40); onFrom(t1, 1006);
var t2 = text(c, "cta name", "MEIKIGO", "Anton", "Regular", 120, INK, [420, 1120, 400, 150], "left", 10); stamp(t2, 1009);
var t3 = text(c, "cta more", "FOR MORE", "IBM Plex Mono", "Bold", 34, INK, [420, 1282, 360, 50], "left", 40); onFrom(t3, 1012);

// ---------- subtitles (house pill strips, hidden where the words are on screen) ----------
var CY = 1384;
for (var ci = 0; ci < CAP.length; ci++) {
  var cpp = CAP[ci], sz = cpp[2].length > 18 ? 56 : 66, wpx = Math.min(1000, cpp[2].length * sz * 0.43 + 70);
  var stp = c.layers.addShape(); stp.name = "cap strip " + (ci + 1); A(stp).setValue([0, 0]); P(stp).setValue([W / 2, CY]);
  rectIn(grp(stp), [wpx, sz * 1.25], null, CREAM, INK, 3); R(stp).setValue(ci % 2 ? 0.8 : -0.8);
  var tl = text(c, "cap " + (ci + 1), cpp[2], "Anton", "Regular", sz, INK, [40, CY - sz * 0.68, W - 80, sz * 1.4], "center", 10);
  tiltAbout(tl, [W / 2, CY], ci % 2 ? 0.8 : -0.8);
  cutWords(tl, cpp[3]);
}
overlay(c);
app.run("comp.open", { comp: "MASTER" });
app.run("file.import", { paths: [DIR + "sfx/mix.wav"], addToComp: true, time: 0 });
c.layer(1).name = "VO + drone + hits mix.wav";
finishComp(c);
// finishComp opens every layer for the whole comp: re-apply the clip and shot in/out points
function span(name, f0, f1) { var l = c.layer(name); if (l) { l.inPoint = f0 * F; l.outPoint = f1 * F; } }
span("1A board", 0, 98); span("3A chart", 200, 363); span("4A quote", 363, 540); span("5A queue", 540, 767); span("7A board", 911, TOTAL);
for (var ci = 0; ci < CAP.length; ci++) { var cpp = CAP[ci], ls = [c.layer("cap strip " + (ci + 1)), c.layer("cap " + (ci + 1))];
  for (var qq = 0; qq < 2; qq++) { ls[qq].inPoint = cpp[0] * F; ls[qq].outPoint = (cpp[1] + 1) * F; } }
"MASTER built, " + TOTAL + " frames, " + CAP.length + " captions";

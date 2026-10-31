// 5A. "The average guest spends $7.62 on food and drink. AMC keeps about six of it. From the ticket, it keeps about the same."
// 172 f. The real snack counter (M1) pulls back; A7: it breaks into halftone dots, the dots fall into two bars; ≈.
var c = freshComp("5A", 172);
paperBg(c);
var zp = ctrl(c, "photo zoom", [540, 960]);
var zr = ctrl(c, "zoom", [540, 960]);
var ph = img(c, "M1_print.png", "photo"); A(ph).setValue([720, 2560]); P(ph).setValue([540, 1920]); S(ph).setValue([75, 75]);
var ht = img(c, "M1_halftone.png", "halftone"); A(ht).setValue([720, 2560]); P(ht).setValue([540, 1920]); S(ht).setValue([75, 75]); onFrom(ht, 79);
var st = []; for (var f = 79; f <= 91; f += 2) st.push([f, (f - 77) / 14]); revealDown(c, c.layer("halftone"), 1440, 2560, st);   // "AMC keeps"
var pp = [c.layer("photo"), c.layer("halftone")]; pp[0].parent = zp; pp[1].parent = zp;
crash(zp, [[0, [756, 730], 3.2], [26, null, 1]]);                                      // opens inside the photo's popcorn (C1 from 4A)
for (var i = 0; i < 2; i++) stepped(keys(S(pp[i]), i ? [[96, [75, 75]], [104, [75, 0]]] : [[96, [75, 75]], [104, [75, 0]]]), "in");   // the dots fall into the bars
var odoL = odo(c, "spend", "$7.62", [540, 300], 120, 27, 40); mono(c, "spend label", "PER GUEST · FOOD & DRINK", 32, [60, 400, 960, 50]); onFrom(c.layer("spend label"), 30);
var BASE = 1240, K = 110;
function bar(name, x, v, col, f0, label) { var h = v * K, s = shapeAt(c, name, [x, BASE]), g = grp(s); rectIn(g, [240, 1], null, col, INK, 4);
  var rs = g.property(1).property("ADBE Vector Rect Size"), rp = g.property(1).property("ADBE Vector Rect Position");
  stepped(keys(rs, [[f0, [240, 1]], [f0 + 12, [240, h]]]), "out"); stepped(keys(rp, [[f0, [0, 0]], [f0 + 12, [0, -h / 2]]]), "out"); onFrom(s, f0);
  var t = text(c, name + " v", "$" + v.toFixed(2), "Anton", "Regular", 90, INK, [x - 160, BASE - h - 130, 320, 120], "center", 0); onFrom(t, f0 + 12);
  var l = text(c, name + " l", label, "IBM Plex Mono", "Bold", 32, INK, [x - 160, BASE + 14, 320, 50], "center", 30); onFrom(l, f0); return [s, t, l]; }
var bS = bar("snacks", 730, 6.13, OCHRE, 100, "SNACKS"), bT = bar("ticket", 350, 6.28, INK, 128, "TICKET");   // "keeps about six" / "from the ticket"
var ap = bigChip(c, "approx", "≈", [540, 640], 140, 120, 156, 0);                                               // "about the same"
offAt(c.layer("approx"), 163); offAt(c.layer("approx misreg"), 163);
var dv = [c.layer("approx strip"), c.layer("approx"), c.layer("approx misreg")]; for (var i = 0; i < dv.length; i++) dv[i].parent = zr;
A(zr).setValue([540, 640]); P(zr).setValue([540, 640]); smooth(keys(S(zr), [[162, [100, 100]], [171, [1400, 1400]]]), 20);   // into the ≈ chip (cream)
overlay(c); finishComp(c); "5A built";

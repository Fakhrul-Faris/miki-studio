// 3A. "Because we don't remember how long something lasted. We remember the worst moment… and the last one." 128 frames.
var c = freshComp("3A", 128);
paperBg(c);
mono(c, "axis", "HOW IT FELT, OVER TIME", 32, [90, 470, 900, 50], "left");
var pts = [[110, 900], [200, 860], [290, 940], [380, 780], [470, 1180], [560, 900], [650, 980], [740, 860], [830, 930], [930, 820]];
var s = c.layers.addShape(); s.name = "visit line"; P(s).setValue([0, 0]); A(s).setValue([0, 0]);
var g = s.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group").property("ADBE Vectors Group"), sh = new Shape();
sh.vertices = pts; sh.closed = false; g.addProperty("ADBE Vector Shape - Group").property("ADBE Vector Shape").setValue(sh);
var st = g.addProperty("ADBE Vector Graphic - Stroke"); st.property("ADBE Vector Stroke Color").setValue(INK); st.property("ADBE Vector Stroke Width").setValue(9); st.property("ADBE Vector Stroke Line Join").setValue(2);
stepped(keys(g.addProperty("ADBE Vector Filter - Trim").property("ADBE Vector Trim End"), [[0, 0], [36, 100]]), "lin");
var len = inkLine(c, "length", [110, 1345], [930, 1345], 6, 18, 36, INK); O(len).setValue(35);
var ll = mono(c, "LENGTH", "LENGTH: FORGOTTEN", 30, [90, 530, 900, 50], "left"); O(ll).setValue(45); onFrom(ll, 41);   // on "lasted"
function point(name, p, f, lab, ly) { var d = disc(c, name, p, 26, OCHRE); var dd = c.layer(name); A(dd).setValue(p); P(dd).setValue(p);
  stepped(keys(S(dd), [[0, [0, 0]], [f, [0, 0]], [f + 2, [118, 118]], [f + 4, [100, 100]]]), "out");
  headline(c, lab, lab, 90, [Math.min(p[0] - 200, 560), ly, 400, 100], f); }   // keep labels inside x 960
point("worst", [470, 1180], 80, "WORST", 1215);    // on "worst"
point("last", [930, 820], 108, "LAST", 680);       // on "last"
overlay(c); finishComp(c); "3A built";

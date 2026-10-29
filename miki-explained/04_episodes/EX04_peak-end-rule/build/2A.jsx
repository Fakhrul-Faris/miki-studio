// 2A. The two groups on the clipboard. "The pain at the end fell from 2.5 to 1.7. And over the next five years, slightly more of them came back." 156 frames (+10 under the tear).
var c = freshComp("2A", 166);
var pl = img(c, "2A.png", "2A clipboard"); S(pl).setValue([75, 75]); P(pl).setValue([W / 2, H / 2]);
mono(c, "head", "PAIN AT THE END (OUT OF 10)", 32, [200, 520, 700, 50]);
var BASE = 1150, K = 150;                                                   // bar height per point
function bar(name, x, v, f, col) { var s = c.layers.addShape(); s.name = name; P(s).setValue([0, 0]); A(s).setValue([0, 0]);
  var g = s.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group").property("ADBE Vectors Group");
  var r = g.addProperty("ADBE Vector Shape - Rect"); r.property("ADBE Vector Rect Size").setValue([170, v * K]); r.property("ADBE Vector Rect Position").setValue([x, BASE - v * K / 2]);
  g.addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(col);
  A(s).setValue([x, BASE]); P(s).setValue([x, BASE]); stepped(keys(S(s), [[0, [100, 0]], [f, [100, 0]], [f + 6, [100, 100]]]), "out"); return s; }
bar("bar short", 385, 2.5, 22, INK); bar("bar long", 695, 1.7, 44, OCHRE);
headline(c, "2.5", "2.5", 110, [285, 560, 200, 120], 28); headline(c, "1.7", "1.7", 110, [595, 760, 200, 120], 50);   // on "2.5", "1.7"
mono(c, "label short", "SHORTER\rPROCEDURE", 30, [255, 1170, 260, 90]); mono(c, "label long", "LONGER,\rGENTLER END", 30, [565, 1170, 260, 90]);
var cb = mono(c, "came back", "5 YEARS LATER:\rSLIGHTLY MORE CAME BACK", 30, [200, 1290, 700, 90]); cutOn(cb, 113, 1, 40);   // on "slightly"
overlay(c); marker(c, 28, "SFX: click"); marker(c, 50, "SFX: click"); finishComp(c); "2A built";

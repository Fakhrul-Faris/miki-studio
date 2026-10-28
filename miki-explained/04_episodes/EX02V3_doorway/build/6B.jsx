// SHOT 6B. Title. 60 frames. Camera locked. Flaps rotate away f0–f8, title wipes top to bottom in 2 steps at f10, rule f30–f40.
var c = freshComp("6B", 55)   // title holds 1 s longer;
var bg = img(c, "3B_paper_bg.png", "6B_paper_bg"); S(bg).setValue([75, 75]); P(bg).setValue([W / 2, H / 2]);
var t = text(c, "THE DOORWAY DECISION", "THE\rDOORWAY\rDECISION", "Anton", "Regular", 200, INK, [40, 470, 1000, 720], "center", 10);
t.blendingMode = BlendingMode.MULTIPLY; maskReveal(c, t, "tb", [[9, 0.5], [11, 1]]);
var m = misreg(t, 4, 4, 50); onFrom(t, 9); onFrom(m, 9);  // on "doorway"
var rl = c.layers.addShape(); rl.name = "rule"; P(rl).setValue([0, 0]); A(rl).setValue([0, 0]);
var g = rl.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group").property("ADBE Vectors Group"), sh = new Shape();
sh.vertices = [[250, 1230], [830, 1230]]; sh.closed = false; g.addProperty("ADBE Vector Shape - Group").property("ADBE Vector Shape").setValue(sh);
var st = g.addProperty("ADBE Vector Graphic - Stroke"); st.property("ADBE Vector Stroke Color").setValue(INK); st.property("ADBE Vector Stroke Width").setValue(5);
stepped(keys(g.addProperty("ADBE Vector Filter - Trim").property("ADBE Vector Trim End"), [[13, 0], [21, 100]]), "lin");
function flap(file, name, ax, to) { var l = c.layers.add(item("6A")); l.name = name; threeD(l, -1); l.timeRemapEnabled = true; l.property("ADBE Time Remapping").expression = "97 / 24";
  app.run("comp.open", { comp: "6B" }); app.run("layer.addMask", { layer: l.id, shape: "rect", rect: ax ? [540, 0, 540, H] : [0, 0, 540, H] });
  A(l).setValue([ax, H / 2, 0]); P(l).setValue([ax, H / 2, -1]);
  stepped(keys(tf(l).property("ADBE Rotate Y"), [[0, 0], [6, to]]), "out"); onBetween(l, 0, 6); return l; }  // edge-on by f8, then gone
flap(null, "6B_flap_left (6A left half)", 0, -90);
flap(null, "6B_flap_right (6A right half)", W, 90);
camera(c);
overlay(c);
var tv = P(t).value, mv = P(m).value;
stepped(keys(P(t), [[0, tv], [47, tv], [54, [tv[0], tv[1] - 980]]]), "out"); stepped(keys(P(m), [[0, mv], [47, mv], [54, [mv[0], mv[1] - 980]]]), "out");
stepped(keys(P(rl), [[0, [0, 0]], [47, [0, 0]], [54, [0, -980]]]), "out");   // the rule rises to 6C's strip edge
marker(c, 9, "SFX: low drone starts");
finishComp(c); "6B built";

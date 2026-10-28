// SHOT 2C. "Just the cut. Ten minutes." 43 frames. Typography on paper: JUST THE CUT. word by word, an ink line snaps
// through on "cut", then a big 10 stamps on "10" where the stopwatch's 10 opens in 3A (the match cut), MINUTES under it.
var c = freshComp("2C", 43);
var bg = img(c, "3B_paper_bg.png", "paper"); S(bg).setValue([75, 75]); P(bg).setValue([W / 2, H / 2]);
var j = text(c, "JUST THE CUT.", "JUST THE CUT.", "Anton", "Regular", 150, INK, [0, 330, W, 180], "center", 10);
j.blendingMode = BlendingMode.MULTIPLY; cutWords(j, [0, 4, 8]);
var ln = c.layers.addShape(); ln.name = "cut line"; P(ln).setValue([0, 0]); A(ln).setValue([0, 0]);
var g = ln.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group").property("ADBE Vectors Group"), sh = new Shape();
sh.vertices = [[90, 560], [990, 552]]; sh.closed = false; g.addProperty("ADBE Vector Shape - Group").property("ADBE Vector Shape").setValue(sh);
var st = g.addProperty("ADBE Vector Graphic - Stroke"); st.property("ADBE Vector Stroke Color").setValue(INK); st.property("ADBE Vector Stroke Width").setValue(5);
stepped(keys(g.addProperty("ADBE Vector Filter - Trim").property("ADBE Vector Trim End"), [[9, 0], [11, 100]]), "lin");   // snaps on "cut"
var ten = text(c, "10", "10", "Anton", "Regular", 340, INK, [337, 790, 400, 400], "center", 0);
ten.blendingMode = BlendingMode.MULTIPLY; stamp(ten, 21); onFrom(misreg(ten, 5, 4, 50), 21);
var m = text(c, "MINUTES", "MINUTES", "IBM Plex Mono", "Bold", 64, INK, [0, 1210, W, 90], "center", 200); onFrom(m, 24);
overlay(c);
marker(c, 9, "SFX: snip"); marker(c, 21, "SFX: stamp");
finishComp(c); "2C built";

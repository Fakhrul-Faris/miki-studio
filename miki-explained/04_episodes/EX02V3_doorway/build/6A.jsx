// SHOT 6A. Known vs Unknown, as a line diagram. 98 frames. Camera locked.
// Top, "A long wait…": a clean ink line to a flag (40 MIN), a dot travels it and arrives.
// Bottom, "An unknown wait…" (f46): the same line breaks into a scribble and a ?, the dot stops at the break and turns back on "walk away" (f74).
var c = freshComp("6A", 98);
var bg = img(c, "3B_paper_bg.png", "paper"); S(bg).setValue([75, 75]); P(bg).setValue([W / 2, H / 2]);
function shp(name) { var s = c.layers.addShape(); s.name = name; P(s).setValue([0, 0]); A(s).setValue([0, 0]); return s.property("ADBE Root Vectors Group"); }
function path(root, pts, w, col) { var g = root.addProperty("ADBE Vector Group").property("ADBE Vectors Group"), sh = new Shape(); sh.vertices = pts; sh.closed = false;
  g.addProperty("ADBE Vector Shape - Group").property("ADBE Vector Shape").setValue(sh);
  var st = g.addProperty("ADBE Vector Graphic - Stroke"); st.property("ADBE Vector Stroke Color").setValue(col || INK); st.property("ADBE Vector Stroke Width").setValue(w); st.property("ADBE Vector Stroke Line Cap").setValue(2); st.property("ADBE Vector Stroke Line Join").setValue(2);
  return g; }
function trim(g, f0, f1) { stepped(keys(g.addProperty("ADBE Vector Filter - Trim").property("ADBE Vector Trim End"), [[f0, 0], [f1, 100]]), "lin"); }
function dot(name, col) { var r = shp(name), g = r.addProperty("ADBE Vector Group").property("ADBE Vectors Group");
  g.addProperty("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([38, 38]); g.addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(col); return c.layer(name); }
// divider
trim(path(shp("divider"), [[60, 960], [1020, 960]], 2, INK), 0, 4);
// top
var TY = 640;
var l1 = text(c, "A LONG WAIT", "A LONG WAIT", "IBM Plex Mono", "Bold", 48, INK, [100, 440, 800, 70], "left", 60); cutOn(l1, 2, 2, 11);
trim(path(shp("top line"), [[110, TY], [880, TY]], 7), 2, 20);
var flag = shp("flag");
path(flag, [[880, TY], [880, TY - 190]], 5);
var fb = flag.addProperty("ADBE Vector Group").property("ADBE Vectors Group"), rc = fb.addProperty("ADBE Vector Shape - Rect");
rc.property("ADBE Vector Rect Size").setValue([170, 66]); rc.property("ADBE Vector Rect Position").setValue([967, TY - 157]);
fb.addProperty("ADBE Vector Graphic - Stroke").property("ADBE Vector Stroke Color").setValue(INK); fb.addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(OCHRE);
var fl = text(c, "40 MIN", "40 MIN", "IBM Plex Mono", "Bold", 38, INK, [882, TY - 182, 170, 50], "center", 0);
var d1 = dot("top dot", INK), k = [];
for (var f = 4; f <= 28; f += 2) k.push([f, [110 + (858 - 110) * (f - 4) / 24, TY]]);
hold(P(d1), [[0, [110, TY]]].concat(k));
// bottom
var BY = 1360;
var l2 = text(c, "AN UNKNOWN WAIT", "AN UNKNOWN WAIT", "IBM Plex Mono", "Bold", 48, INK, [100, 1160, 860, 70], "left", 60); cutOn(l2, 46, 2, 15);
var bl = path(shp("bottom line"), [[110, BY], [520, BY]], 7); trim(bl, 46, 56); onFrom(c.layer("bottom line"), 46);
// scribble: deterministic loops drifting right
var sp_ = [], r = 7; function rnd() { r = (r * 9301 + 49297) % 233280; return r / 233280; }
for (var i = 0; i <= 60; i++) { var t = i / 60, a = i * 1.9; sp_.push([520 + 330 * t + Math.cos(a) * (30 + 50 * rnd()), BY + Math.sin(a) * (40 + 70 * rnd()) - 40 * t]); }
trim(path(shp("scribble"), sp_, 4), 56, 68); onFrom(c.layer("scribble"), 56);
var q = text(c, "?", "?", "Anton", "Regular", 170, INK, [860, BY - 210, 160, 220], "center", 0); onFrom(q, 66);
var d2 = dot("bottom dot", INK), kb = [];
for (var f2 = 48; f2 <= 62; f2 += 2) kb.push([f2, [110 + (500 - 110) * (f2 - 48) / 14, BY]]);
for (var f3 = 76; f3 <= 96; f3 += 2) kb.push([f3, [500 - 600 * (f3 - 74) / 22, BY]]);
hold(P(d2), [[0, [110, BY]]].concat(kb)); onFrom(d2, 46);
overlay(c);
marker(c, 4, "SFX: soft steps, top f4–f28"); marker(c, 48, "SFX: soft steps, bottom f48–f62"); marker(c, 62, "SFX: bottom goes silent");
finishComp(c); "6A built";

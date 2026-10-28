// SHOT 4E. The Scan. 72 frames. Camera locked (2D). Ticket slides under the scanner f6, ochre flash f14, counter 0 → 1 at f16,
// ink line scanner → light f18–f36 (linear, stepped), light green → yellow at f38.
var c = freshComp("4E", 82);
var bg = img(c, "4E_wall_cutaway.png", "4E_wall_cutaway"); S(bg).setValue([75, 75]); P(bg).setValue([W / 2, H / 2]);
var t = cut2D(c, "4E_ticket.png", "4E_ticket", [357, 1793]), tp = P(t).value;
stepped(keys(P(t), [[0, [tp[0] - 420, tp[1]]], [18, [tp[0] - 420, tp[1]]], [24, tp]]), "out");  // on "ticket"
var fl = c.layers.addShape(); fl.name = "scanner flash"; P(fl).setValue([0, 0]); A(fl).setValue([0, 0]);
var g = fl.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group").property("ADBE Vectors Group");
var rc = g.addProperty("ADBE Vector Shape - Rect"); rc.property("ADBE Vector Rect Size").setValue([150, 44]); rc.property("ADBE Vector Rect Position").setValue([316, 1236]);
g.addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(OCHRE);
fl.blendingMode = BlendingMode.SCREEN; hold(O(fl), [[0, 0], [31, 85], [33, 0]]);  // on "scanned"
var n = text(c, "counter", "0", "IBM Plex Mono", "Bold", 56, PAPER, [430, 1244, 85, 76], "center", 0);
n.property("ADBE Text Properties").property("ADBE Text Document").expression = 'time >= 33 / 24 ? "1" : "0"';
var ln = c.layers.addShape(); ln.name = "ink line"; P(ln).setValue([0, 0]); A(ln).setValue([0, 0]);
var lg = ln.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group").property("ADBE Vectors Group");
var sh = new Shape(); sh.vertices = [[320, 1219], [320, 1148], [564, 1148], [564, 684], [652, 684]]; sh.closed = false;
lg.addProperty("ADBE Vector Shape - Group").property("ADBE Vector Shape").setValue(sh);
var st = lg.addProperty("ADBE Vector Graphic - Stroke"); st.property("ADBE Vector Stroke Color").setValue(INK); st.property("ADBE Vector Stroke Width").setValue(5);
stepped(keys(lg.addProperty("ADBE Vector Filter - Trim").property("ADBE Vector Trim End"), [[34, 0], [56, 100]]), "lin");
var L = [744, 662];
var gg = glowLayer(c, "light green", L, 110, GREEN, 100); onBetween(gg, 0, 58);
var wg = washLayer(c, "wash green", L, GREEN, 0); onBetween(wg, 0, 58);
var gy = glowLayer(c, "light yellow", L, 110, YELLOW, 100); onFrom(gy, 58);
var wy = washLayer(c, "wash yellow", L, YELLOW, 0); hold(O(wy), [[0, 0], [58, 25]]);
overlay(c);
marker(c, 31, "SFX: scanner beep"); marker(c, 58, "SFX: relay click");
finishComp(c); "4E built";

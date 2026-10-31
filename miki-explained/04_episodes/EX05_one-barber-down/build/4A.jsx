// 4A. "Busy climbs from fifty-six percent to eighty-three. The wait jumps from four minutes to forty-five." 129 f + 8.
// Bars on twos: busy 56 → 83 (×1.5), wait 4 → 45 (×10). 45 MIN crash-zooms. E4: ×1.5 at 63 (MASTER 672).
var c = freshComp("4A", 137);
paperBg(c);
var BASE = 1300;
function bar(name, x, h, col, f0, f1) { var s = shapeAt(c, name, [x, BASE]); var g = grp(s); rectIn(g, [170, 1], [0, 0], col, INK, 3);
  var rp = g.property(1).property("ADBE Vector Rect Size"), pp = g.property(1).property("ADBE Vector Rect Position");
  stepped(keys(rp, [[f0, [170, 1]], [f1, [170, h]]]), "out"); stepped(keys(pp, [[f0, [0, 0]], [f1, [0, -h / 2]]]), "out"); onFrom(s, f0); shadowLayer(c, s, 6, 12, 30); return s; }
inkLine(c, "base", [90, BASE], [990, BASE], 6, 0, 6, INK);
mono(c, "h busy", "HOW BUSY", 46, [60, 300, 460, 64]); mono(c, "h wait", "THE WAIT", 46, [560, 300, 460, 64]);
bar("b56", 190, 0.56 * 700, INK, 16, 22); bar("b83", 390, 0.83 * 700, OCHRE, 45, 51);
text(c, "l56", "56%", "Anton", "Regular", 80, INK, [90, BASE - 392 - 130, 200, 110], "center", 0); stamp(c.layer("l56"), 22);
text(c, "l83", "83%", "Anton", "Regular", 80, INK, [290, BASE - 581 - 130, 200, 110], "center", 0); stamp(c.layer("l83"), 51);
var x15 = chip(c, "x15", "×1.5", [290, 500], 200, 44, 63);
bar("w4", 680, 4 / 45 * 780, INK, 85, 89); bar("w45", 880, 780, OCHRE, 103, 107);
text(c, "l4", "4 MIN", "Anton", "Regular", 80, INK, [560, BASE - 69 - 130, 240, 110], "center", 0); stamp(c.layer("l4"), 89);
text(c, "l45", "45 MIN", "Anton", "Regular", 80, INK, [750, BASE - 780 - 130, 260, 110], "center", 0); stamp(c.layer("l45"), 107);
chip(c, "x10", "×10", [680, 1000], 200, 44, 112);
var ls = []; for (var i = 1; i <= c.numLayers; i++) ls.push(c.layer(i));
var z = zoomRig(c, ls); crash(z, [[107, null, 1], [111, [880, 470], 1.35], [136, [880, 470], 1.38]]);
overlay(c); finishComp(c); "4A built";

// 1A. Data first. Frame 0 shows all three lines; each gets an ochre underline as the voice says it. 170 frames (+8 under 2A).
var c = freshComp("1A", 178);
paperBg(c);
var D = [["682 PATIENTS", 140, 29], ["LONGER PROCEDURE", 96, 75], ["LESS PAIN", 150, 146]];   // sized to sit inside x 60–960
var y = 210;
for (var i = 0; i < D.length; i++) {
  var h = D[i][1] * 1.1;
  var t = text(c, D[i][0], D[i][0], "Anton", "Regular", D[i][1], INK, [90, y, 840, h], "center", 10);
  t.blendingMode = BlendingMode.MULTIPLY; var m = misreg(t, 4, 3, 50);
  var r = t.sourceRectAtTime(0, false), x0 = 540 - r.width / 2 + 10, x1 = 540 + r.width / 2 - 10, uy = y + h + 6;
  inkLine(c, "underline " + (i + 1), [x0, uy], [x1, uy], 12, D[i][2], D[i][2] + 4, OCHRE);   // on "682", "longer", "less painful"
  y += h + 40;
}
var p = photo(c, "M1_print.png", "M1 hospital corridor", 40, [540, 1330], -1.5);   // below the three data lines
stepped(keys(P(p), [[0, [540, 2900]], [114, [540, 2900]], [122, [540, 1330]]]), "out");    // slides in on "patients"
overlay(c); marker(c, 0, "SFX: stamp (frame 0)"); finishComp(c); "1A built";

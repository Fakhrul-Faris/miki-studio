// 5A. "It's not the minutes they mind. It's the empty ones." 73 frames. The clock's empty arc fills ochre on "empty".
var c = freshComp("5A", 73);
plate(c, "1A_dial.png", "5A dial", 0);
var R0 = 150, pie = ring(c, "empty arc", [HUB[0], HUB[1]], R0, [["tax", OCHRE, 2 * R0, 12.5, 12.5]]);
threeD(c.layer("empty arc"), -1); c.layer("empty arc").blendingMode = BlendingMode.MULTIPLY; O(c.layer("empty arc")).setValue(75);
stepped(keys(pie.tax.property("ADBE Vector Trim End"), [[54, 12.5], [62, 100]]), "out");   // on "empty"
hands(c, [HUB[0], HUB[1]], 0.75, -2);
var cam = camera(c); smooth(keys(P(cam), [[0, [HUB[0], HUB[1], camZ(1.15)]], [72, [HUB[0], HUB[1] + 40, camZ(1.05)]]]), 40);
smooth(keys(tf(cam).property("ADBE Anchor Point"), [[0, [HUB[0], HUB[1], 0]], [72, [HUB[0], HUB[1] + 40, 0]]]), 40);
overlay(c); finishComp(c); "5A built";

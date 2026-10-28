// SHOT 2A. WHY? 96 frames. Layers: 2A_plate (street, man removed, z 0), 2A_man (z -150). Native WHY? stamped ×3.
var c = freshComp("2A", 103)   // 95 + 8 under the 2B slide;
plate(c, "2A_plate.png", "2A_plate", 0);
plate(c, "2A_man.png", "2A_man", -150);                     // holds still; parallax comes from the camera
var SIZES = [[63, 0.6], [80, 0.8], [89, 1]];   // on "question", "Why", "haircut"
for (var i = 0; i < 3; i++) {
  var f = SIZES[i][0], k = SIZES[i][1], sz = Math.round(330 * k);
  var t = text(c, "WHY? " + (i + 1), "WHY?", "Anton", "Regular", sz, INK, [0, 330 - sz * 0.55, W, sz * 1.2], "center", 10);
  threeD(t, -60); t.blendingMode = BlendingMode.MULTIPLY;
  stamp(t, f);
  var m = misreg(t, 4, 3, 50);
  // earlier stamps stay behind as ghosts at 35% once the next one hits
  var next = i < 2 ? SIZES[i + 1][0] : 0;
  hold(O(t), next ? [[0, 0], [f, 100], [next, 35]] : [[0, 0], [f, 100]]);
  hold(O(m), next ? [[0, 0], [f, 50], [next, 0]] : [[0, 0], [f, 50]]);
}
var cam = camera(c);
smooth(keys(P(cam), [[0, [W / 2, H / 2, camZ(1)]], [94, [W / 2, H / 2 - 30, camZ(1.07)]]]), 50);
smooth(keys(tf(cam).property("ADBE Anchor Point"), [[0, [W / 2, H / 2, 0]], [94, [W / 2, H / 2 - 30, 0]]]), 50);
overlay(c);
marker(c, 63, "SFX: stamp thud"); marker(c, 80, "SFX: stamp thud"); marker(c, 89, "SFX: stamp thud");
finishComp(c); "2A built";

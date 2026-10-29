// 4B. "Then the last thirty seconds: waiting to pay, digging for change." 93 frames. A 0:30 countdown starts on "30".
var c = freshComp("4B", 93);
plate(c, "4B.png", "4B counter", 0);
var cd = text(c, "countdown", "0:30", "IBM Plex Mono", "Bold", 120, INK, [560, 190, 400, 150], "right", 0); threeD(cd, -2);
cd.property("ADBE Text Properties").property("ADBE Text Document").expression = 'var s = 30 - Math.max(0, Math.floor(time - 15 / 24)); "0:" + (s < 10 ? "0" + s : s)';
hold(O(cd), [[0, 0], [15, 100]]);                                           // on "30"
headline(c, "WAITING TO PAY", "WAITING TO PAY", 92, [60, 360, 960, 110], 36, -2);     // on "waiting"
headline(c, "DIGGING FOR CHANGE", "DIGGING FOR CHANGE", 92, [60, 470, 960, 110], 57, -2);   // on "digging"
var cam = camera(c); smooth(keys(P(cam), [[0, [W / 2, H / 2, camZ(1)]], [92, [W / 2 + 40, H / 2, camZ(1.06)]]]), 40);
smooth(keys(tf(cam).property("ADBE Anchor Point"), [[0, [W / 2, H / 2, 0]], [92, [W / 2 + 40, H / 2, 0]]]), 40);
overlay(c); marker(c, 15, "SFX: tick"); finishComp(c); "4B built";

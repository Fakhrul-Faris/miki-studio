// 1A. "The fastest way to fix a long wait… isn't making it shorter." 103 frames (1 s hold after the line).
var c = freshComp("1A", 103);
plate(c, "1A_dial.png", "1A_dial", 0);
hands(c, [HUB[0], HUB[1]], 0.75, -1);
headline(c, "A LONG WAIT", "A LONG WAIT", 130, [80, 175, 900, 150], 30, -2);              // on "long wait"
var sh = headline(c, "SHORTER", "SHORTER", 170, [80, 1150, 900, 190], 63, -2);            // on "shorter"
var strike = inkLine(c, "strike", [250, 1250], [830, 1238], 18, 65, 69); threeD(strike, -3);   // the fix isn't "shorter"
var cam = camera(c), poi = tf(cam).property("ADBE Anchor Point");
keys(P(cam), [[0, [W / 2, H / 2, camZ(1)]], [80, [W / 2, H / 2 - 40, camZ(1.06)]], [102, [HUB[0], HUB[1], camZ(2.2)]]]);
keys(poi, [[0, [W / 2, H / 2, 0]], [80, [W / 2, H / 2 - 40, 0]], [102, [HUB[0], HUB[1], 0]]]);
smooth(P(cam), 50); smooth(poi, 50);
overlay(c);
marker(c, 8, "SFX: tick"); marker(c, 63, "SFX: stamp");
finishComp(c); "1A built";

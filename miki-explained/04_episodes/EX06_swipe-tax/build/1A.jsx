// 1A. "Your bank says checking is free. It isn't." 62 f. H4 wrong-on-purpose: FREE stamps inside the blank sign on "free"
// (f33) and is struck on "isn't" (f45). The camera pushes in and carries into the blank sign: 1B opens on that paper.
var c = freshComp("1A", 62);
plate(c, "1A.png", "1A sign", 0);
headline(c, "FREE", "FREE", 260, [144, 720, 792, 330], 33, -2);
var st = inkLine(c, "strike", [250, 950], [830, 880], 26, 45, 50, INK); threeD(st, -3);
var cam = camDrift(c, [[0, [540, 950], 1], [50, [540, 920], 1.09], [61, [540, 912], 3.4]]);
P(cam).setInterpolationTypeAtKey(3, KeyframeInterpolationType.LINEAR); tf(cam).property("ADBE Anchor Point").setInterpolationTypeAtKey(3, KeyframeInterpolationType.LINEAR);
overlay(c);
finishComp(c); "1A built";

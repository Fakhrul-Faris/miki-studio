// SHOT 3A. Speed. 36 frames.
// Layers (back to front): paper, 3A_ghost_shop (faint), 3A_lines_left (mirror of the right lines), 3A_lines_right,
// 3A_stopwatch_face, 3A_hand (multiply, pivot on the hub), native SPEED. Freeze from f24.
var c = freshComp("3A", 18);
var FREEZE = 24;

var bg = plate(c, "3B_paper_bg.png", "paper", 0); S(bg).setValue([90, 90, 90]);   // oversize: the whip pans 86 px
var ghost = plate(c, "3A_ghost_shop.png", "3A_ghost_shop", -40); O(ghost).setValue(40);
var right = plate(c, "3A_lines_right.png", "3A_lines_right", -80);
var left = plate(c, "3A_lines_right.png", "3A_lines_left", -80);
var k = S(left).value; S(left).setValue([-k[0], k[1], k[2]]);                       // mirrored about the frame centre
var watch = plate(c, "3A_stopwatch_face.png", "3A_stopwatch_face", -150);
var hand = plate(c, "3A_hand.png", "3A_hand", -151); hand.blendingMode = BlendingMode.MULTIPLY;

// lines slide in from both edges, f0–f6, expo out, stepped
var pr = P(right).value, pl = P(left).value;
stepped(keys(P(right), [[0, [pr[0] + 760, pr[1], pr[2]]], [6, pr]]), "out");
stepped(keys(P(left), [[0, [pl[0] - 760, pl[1], pl[2]]], [6, pl]]), "out");

// hand: one revolution per 12 frames, linear, stepped, about the hub (source 718, 1615); stops at the freeze
var HUB = [718, 1615], hk = S(hand).value[0] / 100, hp = P(hand).value;
A(hand).setValue([HUB[0], HUB[1], 0]);
P(hand).setValue([hp[0] + (HUB[0] - 720) * hk, hp[1] + (HUB[1] - 1280) * hk, hp[2]]);
stepped(keys(R(hand), [[0, 0], [18, 540]]), "lin");

// SPEED above the dial, stamped at f0 with misregistration
var word = text(c, "SPEED", "SPEED", "Anton", "Regular", 330, INK, [0, 110, W, 420], "center", 10);
threeD(word, -10); word.blendingMode = BlendingMode.MULTIPLY;
stamp(word, 10);  // on "speed"
misreg(word, 4, 3, 50);

// camera: whip left 8% of the width in 8 frames, ease-in, motion blur. Smooth (24fps), never stepped.
var cam = camera(c), DX = -0.08 * W;
var poi = tf(cam).property("ADBE Anchor Point");
keys(P(cam), [[0, [W / 2, H / 2, -ZOOM]], [8, [W / 2 + DX, H / 2, -ZOOM]]]);
keys(poi, [[0, [W / 2, H / 2, 0]], [8, [W / 2 + DX, H / 2, 0]]]);
var ein = [new KeyframeEase(0, 1)], eout = [new KeyframeEase(0, 75)];
P(cam).setTemporalEaseAtKey(1, eout, eout); P(cam).setTemporalEaseAtKey(2, ein, ein);
poi.setTemporalEaseAtKey(1, eout, eout); poi.setTemporalEaseAtKey(2, ein, ein);
c.motionBlur = true;
// blur only the layers that move with the camera alone: on a stepped layer the shutter straddles a 12fps step and doubles it
var MB = ["paper", "3A_ghost_shop", "3A_stopwatch_face"];
for (var i = 0; i < MB.length; i++) c.layer(MB[i]).motionBlur = true;

overlay(c);
marker(c, 0, "SFX: whoosh");

for (var j = 1; j <= c.numLayers; j++) { c.layer(j).inPoint = 0; c.layer(j).outPoint = c.duration; }
"3A built";

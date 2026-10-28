// SHOT 4A. The Hole. 48 frames. Camera only, no colour. f0 matches the end of 3B: the 4A hole at 31.115%, centred.
var c = freshComp("4A", 34); c.bgColor = [0x2e / 255, 0x2a / 255, 0x25 / 255];
var S0 = 31.115, HA = [753, 1271, 0];
var surround = c.layers.addSolid([0x2a / 255, 0x27 / 255, 0x22 / 255], "dark surround", W, H, 1);   // comp bgColor does not render when nested
var pl = threeD(img(c, "4A_dark_paper.png", "4A_dark_paper"), 0);
A(pl).setValue(HA); P(pl).setValue([W / 2, H / 2, 0]); S(pl).setValue([S0, S0, S0]);
app.run("comp.open", { comp: "4A" });
app.run("layer.addMask", { layer: pl.id, shape: "rect", rect: [60, 60, 1320, 2440] });
pl.property("ADBE Mask Parade").property(1).property("ADBE Mask Feather").setValue([120, 120]);
var hole = threeD(img(c, "3B_tear_patch.png", "4A_hole_and_header"), -0.5);
A(hole).setValue(HA); P(hole).setValue([W / 2, H / 2, -0.5]); S(hole).setValue([S0, S0, S0]);
// push in toward the hole, ease-in, 100% → 400%, aiming at the dark header band so the last frame is near-black
var cam = camera(c), poi = tf(cam).property("ADBE Anchor Point"), Y1 = H / 2 - 34;
keys(P(cam), [[0, [W / 2, H / 2, camZ(1)]], [33, [W / 2, Y1, camZ(4)]]]); keys(poi, [[0, [W / 2, H / 2, 0]], [33, [W / 2, Y1, 0]]]);
var ein = [new KeyframeEase(0, 1)], eout = [new KeyframeEase(0, 85)];
P(cam).setTemporalEaseAtKey(1, eout, eout); P(cam).setTemporalEaseAtKey(2, ein, ein); poi.setTemporalEaseAtKey(1, eout, eout); poi.setTemporalEaseAtKey(2, ein, ein);
overlay(c); finishComp(c); "4A built";

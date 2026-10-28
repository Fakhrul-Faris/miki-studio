// SHOT 4B. Green Ignites. 84 frames. Starts on black; f6 hard cut to the scene (light dark); f8 light on in green.
var c = freshComp("4B", 53);
plate(c, "4B_scene.png", "4B_scene", 0);
var man = plate(c, "4B_silhouette_stride.png", "4B_silhouette_stride", -1);
// strides toward the door: stepped bob every 4 frames, drifting up toward the threshold (kept small: the plate behind him is a rough fill)
var k = bob(man, 0, 50, 8, 4), v = P(man).value;
for (var i = 0; i < k.length; i++) k[i][1][1] -= 70 * k[i][0] / 50;
hold(P(man), k);
signalLight(c, GREEN, 6);  // on "light"
label(c, "GO", 31);
tiltCam(c, 53, 0, 121);
overlay(c);
var blk = c.layers.addSolid([0, 0, 0], "black open", W, H, 1); hold(O(blk), [[0, 100], [4, 0]]);
marker(c, 6, "SFX: relay click"); marker(c, 31, "SFX: stamp");
finishComp(c); "4B built";

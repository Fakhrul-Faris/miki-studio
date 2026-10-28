// SHOT 4C. Yellow. 48 frames. Same scene and camera as 4B; light and wash yellow by hard cut at f0, "5-10" at f8.
// Pose swap by whole stills (the two stills differ only in the arm): arm down f0–f15, watch from f16.
var c = freshComp("4C", 34);
var a = plate(c, "4C1_scene.png", "4C_arm_down", 0); onBetween(a, 0, 16);
var b = plate(c, "4C_scene.png", "4C_watch", 0.5); onFrom(b, 16);
signalLight(c, YELLOW, 0);
label(c, "5-10", 10);
tiltCam(c, 34, 53, 121);
overlay(c);
marker(c, 0, "SFX: relay click"); marker(c, 10, "SFX: stamp");
finishComp(c); "4C built";

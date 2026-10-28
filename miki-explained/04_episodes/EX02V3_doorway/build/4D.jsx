// SHOT 4D. Red. 48 frames. Light red at f0, "15+" at f8. The customer steps in (f0–f8), hesitates, turns by a hard flip at f24,
// and walks away f30–f48: back toward the camera and out of frame bottom-left (growing, so the filled plate stays covered).
var c = freshComp("4D", 34);
plate(c, "4D_scene.png", "4D_scene", 0);
var w = plate(c, "4D_silhouette.png", "4D_silhouette", -1), sc = S(w).value[0], CX = [382, 1835, 0];
var p0 = P(w).value; A(w).setValue(CX); var pc = [p0[0] + (CX[0] - 720) * sc / 100, p0[1] + (CX[1] - 1280) * sc / 100, -1]; P(w).setValue(pc);
hold(P(w), [[0, pc], [4, [pc[0], pc[1] - 8, -1]], [8, [pc[0] + 6, pc[1] - 16, -1]]]);
var pz = [pc[0] + 6, pc[1] - 16, -1];
keys(P(w), [[20, pz], [33, [pz[0] - 520, pz[1] + 420, -1]]]); stepped(P(w), "in");
var S1 = [-sc, sc, sc];
keys(S(w), [[0, [sc, sc, sc]], [17, [sc, sc, sc]], [18, S1], [20, S1], [33, [-sc * 1.7, sc * 1.7, sc]]]);
stepped(S(w), "in");
signalLight(c, RED, 0);
label(c, "15+", 10);
tiltCam(c, 34, 87, 121);
overlay(c);
marker(c, 0, "SFX: relay click"); marker(c, 10, "SFX: stamp");
finishComp(c); "4D built";

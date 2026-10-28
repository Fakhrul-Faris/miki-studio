// SHOT 5A. The Guess. 168 frames. Monochrome again; header empty, no light.
var c = freshComp("5A", 124)   // 115 + 10 under the tear into 6A;
plate(c, "5A_wall.png", "5A_wall", 0);
var man = plate(c, "5A_silhouette.png", "5A_silhouette", -1);
P(man).expression = "posterizeTime(12); seedRandom(3, false); add(value, [random(-1, 1), random(-1, 1), 0]);";   // 1px breathing wobble
var coin = plate(c, "5A_coin.png", "5A_coin", -2), k = S(coin).value[0], cp = P(coin).value, CA = [244, 1311];
A(coin).setValue([CA[0], CA[1], 0]); P(coin).setValue([cp[0] + (CA[0] - 720) * k / 100, cp[1] + (CA[1] - 1280) * k / 100, -2]);
tf(coin).property("ADBE Rotate Y").expression = "posterizeTime(12); time * 540";
P(coin).expression = "posterizeTime(12); add(value, [0, -6 * Math.abs(Math.sin(time * Math.PI * 1.5)), 0]);";
// scribble question mark above the head, f20–f50 (trim, stepped)
var q = c.layers.addShape(); q.name = "scribble ?"; q.threeDLayer = true; P(q).setValue([0, 0, -3]); A(q).setValue([0, 0, 0]);
var g = q.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group").property("ADBE Vectors Group");
var sh = new Shape();
sh.vertices = [[292, 826], [306, 800], [334, 792], [356, 806], [356, 832], [334, 850], [318, 866], [316, 890], [320, 868], [338, 848], [352, 822], [340, 798], [312, 798], [298, 818]];
sh.closed = false; g.addProperty("ADBE Vector Shape - Group").property("ADBE Vector Shape").setValue(sh);
var dot = g.addProperty("ADBE Vector Shape - Ellipse"); dot.property("ADBE Vector Ellipse Size").setValue([12, 12]); dot.property("ADBE Vector Ellipse Position").setValue([317, 914]);
var st = g.addProperty("ADBE Vector Graphic - Stroke"); st.property("ADBE Vector Stroke Color").setValue(INK); st.property("ADBE Vector Stroke Width").setValue(6); st.property("ADBE Vector Stroke Line Cap").setValue(2);
stepped(keys(g.addProperty("ADBE Vector Filter - Trim").property("ADBE Vector Trim End"), [[92, 0], [108, 100]]), "lin");  // on "guesses"
// M3, the real doorway, holds until "and guesses" (f92), then the illustration takes over
var m3 = plate(c, "5A_photo_M3.png", "M3 doorway photo", -6); R(m3).setValue(1.2); onBetween(m3, 0, 92);
app.run("comp.open", { comp: "5A" }); app.run("layer.style.dropShadow", { layers: [m3.index] });
var ds = { useGlobalLight: false, angle: 120, distance: 14, size: 30, opacity: 45 }; for (var q in ds) app.run("prop.set", { layer: m3.id, path: "layerStyles/dropShadow/" + q, value: ds[q] });
var sat = text(c, "SATURDAY", "SATURDAY", "IBM Plex Mono", "Bold", 40, INK, [40, 1480, 400, 56], "left", 80);
threeD(sat, -2); stamp(sat, 40);  // on "Saturday"
var cam = camera(c);
smooth(keys(P(cam), [[0, [W / 2, H / 2, camZ(1)]], [123, [W / 2 - 60, H / 2, camZ(1.08)]]]), 40);
smooth(keys(tf(cam).property("ADBE Anchor Point"), [[0, [W / 2, H / 2, 0]], [123, [W / 2 - 60, H / 2, 0]]]), 40);
overlay(c);
marker(c, 0, "SFX: room tone returns"); marker(c, 20, "SFX: coin spin loop f92–f124");
finishComp(c); "5A built";

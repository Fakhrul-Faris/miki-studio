// SHOT 2B. "take over an hour?" 33 frames (+8 under nothing). M2 (an old full-service barbershop, a shave in progress) as a
// torn photo on paper, with OVER / AN HOUR? stamped on the words and an ochre underline drawn on "hour".
var c = freshComp("2B", 33);
var bg = img(c, "3B_paper_bg.png", "paper"); S(bg).setValue([75, 75]); P(bg).setValue([W / 2, H / 2]);
var ph = img(c, "2B_photo_M2.png", "M2 old barbershop photo"); A(ph).setValue([720, 1368]); P(ph).setValue([540, 1130]); S(ph).setValue([74, 74]); R(ph).setValue(-1.5);
app.run("comp.open", { comp: "2B" }); app.run("layer.style.dropShadow", { layers: [ph.index] });
var ds = { useGlobalLight: false, angle: 120, distance: 14, size: 30, opacity: 45 }; for (var q in ds) app.run("prop.set", { layer: ph.id, path: "layerStyles/dropShadow/" + q, value: ds[q] });
P(ph).expression = "posterizeTime(12); add(value, [0, -time * 24])";   // slow drift up, stepped
var o = text(c, "OVER", "OVER", "Anton", "Regular", 190, INK, [0, 70, W, 210], "center", 10);
o.blendingMode = BlendingMode.MULTIPLY; stamp(o, 7); onFrom(misreg(o, 4, 3, 50), 7);   // on "over"
var h = text(c, "AN HOUR?", "AN HOUR?", "Anton", "Regular", 150, INK, [0, 270, W, 170], "center", 10);
h.blendingMode = BlendingMode.MULTIPLY; stamp(h, 18); onFrom(misreg(h, 4, 3, 50), 18);   // on "hour"
var u = c.layers.addShape(); u.name = "ochre underline"; P(u).setValue([0, 0]); A(u).setValue([0, 0]);
var g = u.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group").property("ADBE Vectors Group"), sh = new Shape();
sh.vertices = [[260, 452], [820, 446]]; sh.closed = false; g.addProperty("ADBE Vector Shape - Group").property("ADBE Vector Shape").setValue(sh);
var st = g.addProperty("ADBE Vector Graphic - Stroke"); st.property("ADBE Vector Stroke Color").setValue(OCHRE); st.property("ADBE Vector Stroke Width").setValue(14); st.property("ADBE Vector Stroke Line Cap").setValue(2);
stepped(keys(g.addProperty("ADBE Vector Filter - Trim").property("ADBE Vector Trim End"), [[20, 0], [26, 100]]), "lin");
overlay(c);
marker(c, 7, "SFX: stamp"); marker(c, 18, "SFX: stamp");
finishComp(c); "2B built";

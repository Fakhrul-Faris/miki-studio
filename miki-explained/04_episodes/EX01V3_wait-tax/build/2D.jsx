// 2D. "So they moved the gates further away. People walked six times longer." 88 frames (+8 under the 2E slide).
// Split screen: walking (M2, top) over standing (2C, bottom); the walking arc grows six times on "six".
var c = freshComp("2D", 96);
paperBg(c);
var bot = img(c, "2C.png", "standing half"); S(bot).setValue([75, 75]); P(bot).setValue([540, 1160]);
app.run("comp.open", { comp: "2D" }); app.run("layer.addMask", { layer: bot.id, shape: "rect", rect: [0, 960 / 0.75 - 1160 / 0.75 + 1280, 1440, 1400] });
var top = img(c, "M2_print.png", "walking half (M2)"); S(top).setValue([75, 75]); P(top).setValue([540, 600]);
app.run("comp.open", { comp: "2D" }); app.run("layer.addMask", { layer: top.id, shape: "rect", rect: [0, 0, 1440, 960 / 0.75 - 600 / 0.75 + 1280] });
var tp = P(top).value; stepped(keys(P(top), [[0, [tp[0] - 1100, tp[1]]], [8, tp]]), "out");   // slides in from the left
inkLine(c, "divider", [0, 960], [W, 960], 8, 6, 10);
mono(c, "WALKING", "WALKING", 40, [70, 190, 400, 56], "left"); hold(O(c.layer("WALKING")), [[0, 0], [8, 100]]);
mono(c, "STANDING", "STANDING", 40, [70, 1000, 400, 56], "left"); hold(O(c.layer("STANDING")), [[0, 0], [8, 100]]);
var RC = [820, 960];
disc(c, "ring disc", RC, 120, PAPER); shadowLayer(c, c.layer("ring disc"), 8, 16, 35);
var arcs = ring(c, "ring", RC, 82, [["walk", INK, 26, 0, 12.5], ["stand", OCHRE, 26, 12.5, 100]]);
stepped(keys(arcs.walk.property("ADBE Vector Trim End"), [[58, 12.5], [66, 75]]), "out");     // on "six"
stepped(keys(arcs.stand.property("ADBE Vector Trim Start"), [[58, 12.5], [66, 75]]), "out");
var x6 = headline(c, "×6", "×6", 120, [700, 1110, 240, 140], 60);
overlay(c); marker(c, 0, "SFX: (footsteps if available)"); finishComp(c); "2D built";

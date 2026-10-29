// 5B. "That's the wait tax." 54 frames. 5A splits into flaps that fold away; THE WAIT TAX wipes on; 1 s hold; title rises.
var c = freshComp("5B", 54);
paperBg(c);
var t = text(c, "title", "THE\rWAIT TAX", "Anton", "Regular", 210, INK, [60, 560, 960, 520], "center", 10);
t.blendingMode = BlendingMode.MULTIPLY; maskReveal(c, t, "tb", [[12, 0.5], [14, 1]]);
var m = misreg(t, 4, 4, 50); onFrom(t, 12); onFrom(m, 12);
var rl = inkLine(c, "rule", [250, 1130], [830, 1130], 5, 16, 24);
function flap(name, ax, to) { var l = c.layers.add(item("5A")); l.name = name; threeD(l, -1); l.timeRemapEnabled = true; l.property("ADBE Time Remapping").expression = "72 / 24";
  app.run("comp.open", { comp: "5B" }); app.run("layer.addMask", { layer: l.id, shape: "rect", rect: ax ? [540, 0, 540, H] : [0, 0, 540, H] });
  A(l).setValue([ax, H / 2, 0]); P(l).setValue([ax, H / 2, -1]);
  stepped(keys(tf(l).property("ADBE Rotate Y"), [[0, 0], [6, to]]), "out"); onBetween(l, 0, 6); }
flap("flap left (5A)", 0, -90); flap("flap right (5A)", W, 90);
var tv = P(t).value, mv = P(m).value;
stepped(keys(P(t), [[0, tv], [46, tv], [53, [tv[0], tv[1] - 714]]]), "out"); stepped(keys(P(m), [[0, mv], [46, mv], [53, [mv[0], mv[1] - 714]]]), "out");
stepped(keys(P(rl), [[0, [0, 0]], [46, [0, 0]], [53, [0, -714]]]), "out");                // the rule rises to 5C's strip edge
camera(c); overlay(c); marker(c, 12, "SFX: swell peaks"); finishComp(c); "5B built";

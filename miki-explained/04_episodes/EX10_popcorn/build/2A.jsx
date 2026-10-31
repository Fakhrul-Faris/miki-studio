// 2A. "Imagine a $12 ticket at AMC, America's biggest chain. About half goes straight back to the studio. In a big film's
// first weeks, even more." 211 f. Inside the screen: the ticket tears in half; the top half flies to STUDIO.
var c = freshComp("2A", 211);
paperBg(c);
var zr = ctrl(c, "zoom", [540, 1236]);
function half(name, rect) { var t = img(c, "CO_ticket.png", name); S(t).setValue([70, 70]); P(t).setValue([540, 960]); shadowLayer(c, t, 10, 22, 40); rectMask(c, c.layer(name), rect); return c.layer(name); }
var top = half("ticket top", [0, 0, 1058, 789]), bot = half("ticket bottom", [0, 789, 1058, 789]);
hold(S(top), [[0, [70, 70]]]); hold(S(bot), [[0, [70, 70]]]);
var t12 = text(c, "t12", "$12", "Anton", "Regular", 300, INK, [190, 750, 700, 400], "center", 0); t12.blendingMode = BlendingMode.MULTIPLY; stamp(t12, 12); offAt(t12, 97);
stepped(keys(P(top), [[97, [540, 960]], [100, [560, 900]], [112, [790, 330]]]), "in"); stepped(keys(R(top), [[97, 0], [112, 14]]), "in");
stepped(keys(S(top), [[97, [70, 70]], [112, [30, 30]]]), "in");                                               // "half goes straight back"
var t6 = text(c, "t6", "$6", "Anton", "Regular", 260, INK, [290, 1050, 500, 350], "center", 0); t6.blendingMode = BlendingMode.MULTIPLY; stamp(t6, 105);
chip(c, "amc", "AMC · AMERICA'S BIGGEST CHAIN", [540, 240], 700, 30, 35);
bigChip(c, "studio", "STUDIO", [790, 470], 360, 90, 132, 3);                                                    // "the studio"
chip(c, "share", "48.1% OF TICKETS · AMC 2025", [790, 590], 520, 26, 140);
bigChip(c, "more", "WEEK 1: EVEN MORE", [540, 700], 600, 80, 175, -2);                                         // "first weeks"
// C1: dive into the torn bottom half (cream) — it fills the frame on the cut to 3A
offAt(t6, 196); offAt(c.layer("t6 misreg") || t6, 196);
var clear = ["amc strip", "amc", "studio strip", "studio", "studio misreg", "share strip", "share", "more strip", "more", "more misreg", "ticket top"];
for (var i = 0; i < clear.length; i++) if (c.layer(clear[i])) offAt(c.layer(clear[i]), 200);
var dive = [bot, t6]; for (var i = 0; i < dive.length; i++) dive[i].parent = zr;
smooth(keys(S(zr), [[198, [100, 100]], [210, [900, 900]]]), 20);
overlay(c); finishComp(c); "2A built";

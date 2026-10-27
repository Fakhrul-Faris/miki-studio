// Beat 1 (L01 0.5–4.3): complaint burst → collapse → "By making people / walk further"
for (var k = comp.numLayers; k >= 1; k--) comp.layer(k).remove();
var names = ["L01", "L02", "L03", "L04"], starts = [T1, T2, T3, T4];
for (var a = 0; a < 4; a++) app.run("file.import", { paths: [DIR + "audio/" + names[a] + ".mp3"], addToComp: true, time: starts[a] });

var drift = nul("DRIFT", [540, 960]);
nul("B1", [540, 960]); comp.layer("B1").parent = comp.layer("DRIFT");
function loc(p) { return p; } // B1 anchor = position, so local = comp
var HUB = [540, 900], OUT = 4.4, b1 = [];

// complaint cards: built static at their targets, then keyed in B1 space
var C = [["Bags take forever.", [270, 520], -4], ["Still waiting at the belt…", [790, 560], 3],
         ["Where is my luggage?", [250, 880], 2], ["Any update?", [850, 930], -3],
         ["Worst wait ever.", [280, 1260], 3], ["30 people. One belt.", [800, 1300], -2]];
for (var i = 0; i < C.length; i++) {
  var pos = C[i][1], c = card("Complaint " + (i + 1), pos, [430, 132], 30);
  var lab = inc("Complaint " + (i + 1) + " label", "COMPLAINT", "SemiBold", 20, ORANGE, [pos[0] - 185, pos[1] - 46, 370, 30]);
  var txt = inc("Complaint " + (i + 1) + " text", C[i][0], "Medium", 32, INK, [pos[0] - 185, pos[1] - 14, 370, 50]);
  var nm = "Complaint " + (i + 1);           // handles go stale after native commands: re-fetch by name
  c = comp.layer(nm); comp.layer(nm + " label").parent = c; comp.layer(nm + " text").parent = c; c = comp.layer(nm); c.parent = comp.layer("B1"); c = comp.layer(nm);
  var t0 = T1 + 0.05 + i * 0.07, t1 = 1.80 + i * 0.045;
  anim(P(c), [[t0, loc(HUB)], [t0 + 0.4, loc(pos)]], 85);
  P(c).expression = "value + (time > " + (t0 + 0.4) + " && time < " + t1 + " ? wiggle(0.8, 6) - value : [0,0])";
  P(c).setValueAtTime(t1, loc(pos)); P(c).setValueAtTime(t1 + 0.28, loc(HUB));
  anim(tf(c).property("ADBE Scale"), [[t0, [0, 0]], [t0 + 0.4, [100, 100]], [t1, [100, 100]], [t1 + 0.28, [0, 0]]], 80);
  anim(tf(c).property("ADBE Rotate Z"), [[t0, 0], [t0 + 0.4, C[i][2]], [t1, C[i][2]], [t1 + 0.28, 0]], 70);
}
// hub: orange suitcase tile, on top of the cards
tile("Hub", HUB, 150, ORANGE, pictCase); var hub = comp.layer("Hub");
pop(hub, 0.3, 0.24);
var hubS = tf(hub).property("ADBE Scale");
hubS.setValueAtTime(2.08, [100, 100]); hubS.setValueAtTime(2.2, [118, 118]); hubS.setValueAtTime(2.36, [100, 100]);
anim(P(hub), [[2.4, loc(HUB)], [2.8, loc([235, 760])]], 85);
hubS.setValueAtTime(2.4, [100, 100]); hubS.setValueAtTime(2.8, [80, 80]);
// carried: the suitcase becomes the card's "Standing" tile (84 px at 190,1080)
P(hub).setValueAtTime(4.4, [235, 760]); P(hub).setValueAtTime(4.95, [190, 1080]); easeAll(P(hub), 88);
hubS.setValueAtTime(4.4, [80, 80]); hubS.setValueAtTime(4.95, [56, 56]); easeAll(hubS, 80);
opac(hub, [[4.95, 100], [5.0, 0]]);

// chip under the hub: names the place on "Houston Airport"
card("Place chip", [540, 1010], [330, 64], 32, INK);
inc("Place chip text", "Houston Airport", "SemiBold", 28, CREAM, [390, 990, 300, 40], "center");
comp.layer("Place chip text").parent = comp.layer("Place chip");
comp.layer("Place chip").parent = comp.layer("B1");
var chip = comp.layer("Place chip"); pop(chip, 0.55, 0.2);
var cs2 = tf(chip).property("ADBE Scale"); cs2.setValueAtTime(1.75, [100, 100]); cs2.setValueAtTime(2.0, [0, 0]);

// "By making people / [→] walk further."
var l1 = ws("Line 1", "By making people", "Medium", 88, INK, [170, 850, 900, 120], "left");
wordReveal(l1, [2.79, 2.88, 3.06]);
tile("Arrow tile", [232, 1046], 112, BLUE, pictArrowRight); pop(comp.layer("Arrow tile"), 3.30, 0.2);
var l2 = ws("Line 2", "walk further.", "SemiBold", 88, INK, [312, 980, 760, 120], "left");
wordReveal(l2, [3.34, 3.60]);
var dl = dashLine("Slot underline", [316, 1102], [836, 1102], BLUE, 3.5, 3.9);
// carried: the arrow becomes the card's "Walking" tile (84 px at 190,900)
var ar = comp.layer("Arrow tile");
P(ar).setValueAtTime(4.4, [232, 1046]); P(ar).setValueAtTime(4.95, [190, 900]); easeAll(P(ar), 88);
var arS = tf(ar).property("ADBE Scale"); arS.setValueAtTime(4.4, [100, 100]); arS.setValueAtTime(4.95, [75, 75]); easeAll(arS, 80);
opac(ar, [[4.95, 100], [5.0, 0]]);
var under = ["Line 1", "Line 2", "Slot underline"];
for (i = 0; i < under.length; i++) { comp.layer(under[i]).parent = comp.layer("B1"); }
b1 = []; for (i = 1; i <= 6; i++) b1.push("Complaint " + i); b1 = b1.concat(under);

// exit: push everything up and fade
anim(P(comp.layer("B1")), [[OUT - 0.05, [540, 960]], [OUT + 0.4, [540, 760]]], 85);
for (i = 0; i < b1.length; i++) { var o = tf(comp.layer(b1[i])).property("ADBE Opacity"); o.setValueAtTime(OUT, 100); o.setValueAtTime(OUT + 0.3, 0); }
anim(tf(comp.layer("DRIFT")).property("ADBE Scale"), [[0, [100, 100]], [18, [104, 104]]], 0.1);
for (i = 1; i <= 6; i++) comp.layer("Complaint " + i).motionBlur = true;
"beat 1: " + comp.numLayers + " layers";

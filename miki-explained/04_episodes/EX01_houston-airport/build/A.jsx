// Beat A (L01): carousel photo + complaint burst → photo and cards collapse into the hub → "By making people / walk further"
for (var k = comp.numLayers; k >= 1; k--) comp.layer(k).remove();
function w(L, i) { return WT[L][i]; }
var LN = ["L01", "L02", "L03", "L04", "L05", "L06"];
for (var a = 0; a < 6; a++) app.run("file.import", { paths: [DIR + "audio/" + LN[a] + ".mp3"], addToComp: true, time: T[LN[a]] });
nul("DRIFT", [540, 960]);
nul("B1", [540, 960]); comp.layer("B1").parent = comp.layer("DRIFT");
// imported stills: find the new layer by source name
function still(file, name) { app.run("file.import", { paths: [DIR + "media/" + file], sequence: false, addToComp: true, time: 0 }); var l = comp.layer(1); l.name = name; l.outPoint = comp.duration; return comp.layer(name); } // sequence:false, or M1–M3 import as one 3-frame sequence
function tint(name, amt) { try { var fx = comp.layer(name).property("ADBE Effect Parade").addProperty("ADBE Tint"); comp.layer(name).property("ADBE Effect Parade").property(1).property(3).setValue(amt); } catch (e) { writeLn("tint: " + e); } }

var HUB = [540, 900], OUT = 4.3, COL = 1.95;
// M1 carousel photo: full-bleed, desaturated, slow push, then shrinks into the hub on "complaints"
still("M1.png", "M1"); tint("M1", 75);
var m1 = comp.layer("M1"); m1.parent = comp.layer("B1"); m1 = comp.layer("M1");
P(m1).setValue([540, 960]);
var ms = tf(m1).property("ADBE Scale");
ms.setValueAtTime(0, [75, 75]); ms.setValueAtTime(COL, [80, 80]); ms.setValueAtTime(COL + 0.4, [10.4, 10.4]); easeAll(ms, 85);
anim(P(m1), [[COL, [540, 960]], [COL + 0.4, HUB]], 85);
opac(m1, [[0, 100], [COL + 0.32, 100], [COL + 0.4, 0]]);
comp.layer("M1").motionBlur = true;

var C = [["Bags take forever.", [270, 520], -4], ["Still waiting at the belt…", [790, 560], 3],
         ["Where is my luggage?", [250, 880], 2], ["Any update?", [850, 930], -3],
         ["Worst wait ever.", [280, 1260], 3], ["30 people. One belt.", [800, 1300], -2]];
for (var i = 0; i < C.length; i++) {
  var pos = C[i][1], nm = "Complaint " + (i + 1);
  card(nm, pos, [430, 132], 30);
  inc(nm + " label", "COMPLAINT", "SemiBold", 20, ORANGE, [pos[0] - 185, pos[1] - 46, 370, 30]);
  inc(nm + " text", C[i][0], "Medium", 32, INK, [pos[0] - 185, pos[1] - 14, 370, 50]);
  var c = comp.layer(nm); comp.layer(nm + " label").parent = c; comp.layer(nm + " text").parent = c;
  comp.layer(nm).parent = comp.layer("B1"); c = comp.layer(nm);
  var t0 = w("L01", 1) + i * 0.07, t1 = COL - 0.05 + i * 0.04;
  anim(P(c), [[t0, HUB], [t0 + 0.4, pos]], 85);
  P(c).expression = "value + (time > " + (t0 + 0.4) + " && time < " + t1 + " ? wiggle(0.8, 6) - value : [0,0])";
  P(c).setValueAtTime(t1, pos); P(c).setValueAtTime(t1 + 0.28, HUB);
  anim(tf(c).property("ADBE Scale"), [[t0, [0, 0]], [t0 + 0.4, [100, 100]], [t1, [100, 100]], [t1 + 0.28, [0, 0]]], 80);
  anim(tf(c).property("ADBE Rotate Z"), [[t0, 0], [t0 + 0.4, C[i][2]], [t1, C[i][2]], [t1 + 0.28, 0]], 70);
  comp.layer(nm).motionBlur = true;
}
// hub tile (green suitcase) on top; chip names the place on "Houston"
tile("Hub", HUB, 150, ORANGE, pictCase); var hub = comp.layer("Hub");
pop(hub, 0.25);
var hubS = tf(hub).property("ADBE Scale");
hubS.setValueAtTime(COL + 0.3, [100, 100]); hubS.setValueAtTime(COL + 0.42, [118, 118]); hubS.setValueAtTime(COL + 0.56, [100, 100]);
anim(P(hub), [[COL + 0.6, HUB], [COL + 1.0, [235, 760]]], 85);
hubS.setValueAtTime(COL + 0.6, [100, 100]); hubS.setValueAtTime(COL + 1.0, [80, 80]); easeAll(hubS, 75);
card("Place chip", [540, 1010], [330, 64], 32, INK);
inc("Place chip text", "Houston Airport", "SemiBold", 28, CREAM, [390, 990, 300, 40], "center");
comp.layer("Place chip text").parent = comp.layer("Place chip"); comp.layer("Place chip").parent = comp.layer("B1");
var chip = comp.layer("Place chip"); pop(chip, w("L01", 3));
var cs2 = tf(chip).property("ADBE Scale"); cs2.setValueAtTime(COL, [100, 100]); cs2.setValueAtTime(COL + 0.25, [0, 0]);

ws("Line 1", "By making people", "Medium", 88, INK, [170, 850, 900, 120], "left");
wordReveal(comp.layer("Line 1"), [w("L01", 7), w("L01", 8), w("L01", 9)]);
tile("Arrow tile", [232, 1046], 112, BLUE, pictArrowRight); pop(comp.layer("Arrow tile"), w("L01", 10) - 0.06);
ws("Line 2", "walk further.", "SemiBold", 88, INK, [312, 980, 760, 120], "left");
wordReveal(comp.layer("Line 2"), [w("L01", 10), w("L01", 11)]);
dashLine("Slot underline", [316, 1102], [836, 1102], BLUE, w("L01", 11) - 0.1, w("L01", 11) + 0.3);
var under = ["Line 1", "Line 2", "Slot underline", "Arrow tile"];
for (i = 0; i < under.length; i++) comp.layer(under[i]).parent = comp.layer("B1");
// exit: push up and fade; the hub is carried into the next card
anim(P(comp.layer("B1")), [[OUT - 0.05, [540, 960]], [OUT + 0.4, [540, 760]]], 85);
var outs = under.concat(["Place chip"]);
for (i = 0; i < outs.length; i++) { var o = tf(comp.layer(outs[i])).property("ADBE Opacity"); o.setValueAtTime(OUT, 100); o.setValueAtTime(OUT + 0.3, 0); }
"A: " + comp.numLayers;

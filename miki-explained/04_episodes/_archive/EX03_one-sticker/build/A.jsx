// Beat A (L01 0.4–5.0): the sticker wall → six QR tiles burst → collapse into ONE green QR on "one sticker"
clearComp(); importLines(["L01", "L02", "L03", "L04", "L05", "L06"]); group("DRIFT");
bleed("M1.png", "M1", 0, 5.0, { anchor: [640, 1300], at: [540, 980], s0: 75, s1: 88, tint: 30, fo: 0.35 });
var mb = comp.layer("M1").property("ADBE Effect Parade").addProperty("ADBE Gaussian Blur 2");
var bl = comp.layer("M1").property("ADBE Effect Parade").property(2).property(1); bl.setValueAtTime(4.7, 0); bl.setValueAtTime(5.05, 50);
// six app stickers burst out in a row (each a different app: coral = the friction of many)
var HUBA = [540, 560], XS = [150, 306, 462, 618, 774, 930];
for (var i = 0; i < 6; i++) {
  var n = "Burst " + (i + 1);
  tile(n, [XS[i], 560], 128, i % 2 ? CARD : [1, 0.93, 0.9], pictQR);
  var t0 = w("L01", 0) + i * 0.08;
  anim(P(comp.layer(n)), [[t0, HUBA], [t0 + 0.35, [XS[i], 560]], [4.2, [XS[i], 560]], [4.42, HUBA]], 85);
  anim(tf(comp.layer(n)).property("ADBE Scale"), [[t0, [0, 0]], [t0 + 0.35, [100, 100]], [4.2, [100, 100]], [4.42, [0, 0]]], 80);
  anim(tf(comp.layer(n)).property("ADBE Rotate Z"), [[t0, 0], [t0 + 0.35, (i % 2 ? 4 : -4)], [4.2, (i % 2 ? 4 : -4)], [4.42, 0]], 70);
  comp.layer(n).motionBlur = true; shadow(comp.layer(n), 10, 30, 18);
}
// "one sticker": one green QR
tile("One QR", HUBA, 200, ANSWER, pictQR); pop(comp.layer("One QR"), w("L01", 15) - 0.02, 0.2);
// the hook on a cream card (84 px)
card("Hook card", [540, 1180], [960, 460], 40, CREAM);
anim(P(comp.layer("Hook card")), [[0.25, [540, 1320]], [0.65, [540, 1180]]], 88); life(comp.layer("Hook card"), 0.25, null, 0.15);
ws("Hook 1", "Malaysia didn't go cashless because of a better app.", "SemiBold", 84, INK, [100, 975, 880, 300]);
wordReveal(comp.layer("Hook 1"), WT.L01.slice(0, 9));
fadeAt(["Hook 1"], 2.9, 0.15);
ws("Hook 2", "It went cashless because of", "SemiBold", 84, INK, [100, 975, 880, 200]); wordReveal(comp.layer("Hook 2"), WT.L01.slice(9, 14));
ws("Hook 3", "one sticker.", "SemiBold", 84, ANSWER, [100, 1170, 880, 100]); wordReveal(comp.layer("Hook 3"), WT.L01.slice(14));
fadeAt(["Hook card", "Hook 2", "Hook 3", "One QR"], 4.95, 0.3);
"A: " + comp.numLayers;

// Beat A (L01 0.4–4.2): the storefront signal, then the hook on a card
for (var k = comp.numLayers; k >= 1; k--) comp.layer(k).remove();
var LN = ["L01", "L02", "L03", "L04", "L05", "L06"];
for (var a = 0; a < 6; a++) app.run("file.import", { paths: [DIR + "audio/" + LN[a] + ".mp3"], addToComp: true, time: T[LN[a]] });
nul("DRIFT", [540, 960]);
// M1: anchored on the signal (source px 1100,740) so the push keeps the light in place on screen
var SIG = [825, 555];
still("M1.png", "M1"); tint("M1", 35);
var m1 = comp.layer("M1"); tf(m1).property("ADBE Anchor Point").setValue([1100, 740]); P(m1).setValue(SIG);
anim(tf(m1).property("ADBE Scale"), [[0, [75, 75]], [4.3, [92, 92]]], 20);
var mb = m1.property("ADBE Effect Parade").addProperty("ADBE Gaussian Blur 2");
var mbl = comp.layer("M1").property("ADBE Effect Parade").property(2).property(1); mbl.setValueAtTime(4.15, 0); mbl.setValueAtTime(4.55, 50);
opac(comp.layer("M1"), [[0, 100], [4.2, 100], [4.55, 0]]);
// the signal callout: ring + chip on "how long you'll wait"
ripple("Signal ripple", SIG, w("L01", 4), ORANGE);
ripple("Signal ripple again", SIG, w("L01", 11), ORANGE);
card("Signal chip", [680, 410], [250, 56], 28, INK); pop(comp.layer("Signal chip"), w("L01", 5));
inc("Signal chip text", "Wait signal", "SemiBold", 26, CREAM, [570, 392, 220, 40], "center"); life(comp.layer("Signal chip text"), w("L01", 5) + 0.1, null, 0.1);
bar("Signal leader", [770, 438], [812, 520], CREAM, 3, w("L01", 5), w("L01", 5) + 0.25);
// the hook on a cream card
card("Hook card", [540, 1290], [960, 400], 40, CREAM);
anim(P(comp.layer("Hook card")), [[0.3, [540, 1420]], [0.75, [540, 1290]]], 88); life(comp.layer("Hook card"), 0.3, null, 0.15);
ws("Hook 1", "This barbershop tells you how long you'll wait", "SemiBold", 66, INK, [110, 1135, 860, 170]);
wordReveal(comp.layer("Hook 1"), WT.L01.slice(0, 8));
ws("Hook 2", "before you even walk in.", "SemiBold", 66, ORANGE, [110, 1315, 860, 90]);
wordReveal(comp.layer("Hook 2"), WT.L01.slice(8));
fadeAt(["Hook card", "Hook 1", "Hook 2", "Signal chip", "Signal chip text", "Signal leader"], 4.2, 0.3);
"A: " + comp.numLayers;

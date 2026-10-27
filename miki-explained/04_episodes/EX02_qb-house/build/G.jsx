// G: source credit, captions, sound, outro (blur + logo)
// credit chip during the hook
card("Credit chip", [262, 250], [404, 52], 26, INK);
inc("Credit text", "Source: QB Net Holdings, 2024", "SemiBold", 24, CREAM, [70, 234, 384, 36], "center");
opac(comp.layer("Credit chip"), [[0, 0], [0.3 - F, 0], [0.3, 92], [4.1, 92], [4.3, 0]]);
opac(comp.layer("Credit text"), [[0, 0], [0.3 - F, 0], [0.3, 100], [4.1, 100], [4.3, 0]]);
// captions: one dark pill per phrase, words revealed as spoken; above the bottom UI zone
for (var i = 0; i < CAPS.length; i++) {
  var c = CAPS[i], n = "Cap " + (i + 1), wpx = Math.min(980, c.t.length * 20 + 70);
  card(n + " pill", [540, 1515], [wpx, 72], 36, INK);
  opac(comp.layer(n + " pill"), [[0, 0], [c.s - F, 0], [c.s, 88], [c.e, 88], [c.e + F, 0]]);
  inc(n, c.t, "SemiBold", 38, CREAM, [60, 1490, 960, 54], "center");
  opac(comp.layer(n), [[0, 0], [c.s - F, 0], [c.s, 100], [c.e, 100], [c.e + F, 0]]);
  wordReveal(comp.layer(n), c.w, 0);
}
// sound: one pre-mixed track (synth SFX + drone bed, see sfx/events.txt)
app.run("file.import", { paths: [DIR + "sfx/sfx_mix.wav"], addToComp: true, time: 0 });
// outro: blur and dim everything, then the logo
var OB = 45.0;
comp.layers.addSolid([0.5, 0.5, 0.5], "Outro blur", W, H, 1);
comp.layer("Outro blur").adjustmentLayer = true;
comp.layer("Outro blur").property("ADBE Effect Parade").addProperty("ADBE Gaussian Blur 2");
var bl = comp.layer("Outro blur").property("ADBE Effect Parade").property(1).property(1);
bl.setValueAtTime(OB, 0); bl.setValueAtTime(OB + 0.55, 46); easeAll(bl, 70);
comp.layers.addSolid(BROWN, "Outro dim", W, H, 1);
opac(comp.layer("Outro dim"), [[0, 0], [OB, 0], [OB + 0.55, 40]]);
app.run("file.import", { paths: [DIR + "media/logo.png"], sequence: false, addToComp: true, time: 0 }); comp.layer(1).name = "Logo";
var lg = comp.layer("Logo"); lg.outPoint = comp.duration; lg = comp.layer("Logo");
P(lg).setValue([540, 900]);
var ls = tf(lg).property("ADBE Scale");
ls.setValueAtTime(45.4, [0, 0]); ls.setValueAtTime(45.62, [78, 78]); ls.setValueAtTime(45.74, [68, 68]); ls.setValueAtTime(45.86, [70, 70]); ls.setValueAtTime(48, [73, 73]); easeAll(ls, 75);
anim(tf(lg).property("ADBE Rotate Z"), [[45.4, -12], [45.8, 0]], 80);
comp.layer("Logo").motionBlur = true;
"G: " + comp.numLayers;

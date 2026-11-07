// MASTER, 60 fps, one comp over the whole Blender run (build/episode.py → out/frames). On top: EX15 caption blocks
// (capBlock, caps.jsx), the hook text and the loss counter (L01), the follow card (silent), and the mix (sfx/mix.wav).
var TOTAL = 1858, c = freshComp("MASTER", TOTAL); c.bgColor = BGD;
app.run("file.import", { paths: [DIR + "out/frames/f_0000.png"], sequence: true, addToComp: false });
var seqIt = app.project.item(app.project.numItems); seqIt.mainSource.conformFrameRate = FPS; seqIt.name = "SEQ_world";
c.layers.add(seqIt).name = "world";

for (var i = 0; i < CAP.length; i++) capBlock(c, CAP[i], i);

// a centre card: rises 24 px and fades in over 12 frames at f0, fades out over 10 frames before f1
function card(name, str, font, style, size, col, box, f0, f1, just, tracking) {
  app.run("comp.open", { comp: c.name });
  app.run("layer.newText", { text: str, name: name, font: font, style: style, size: size, fill: hex(col), box: box,
    justify: just || "center", tracking: tracking || 0, leading: Math.round(size * 1.12) });
  var l = c.layer(1), p = P(l).value;
  smooth(keys(P(l), [[f0, [p[0], p[1] + 24]], [f0 + 12, p]]), 85);
  keys(O(l), [[f0, 0], [f0 + 10, 100], [f1 - 10, 100], [f1, 0]]);
  var ds = l.property("ADBE Effect Parade").addProperty("ADBE Drop Shadow");
  ds.property(1).setValue([0.02, 0.02, 0.03]); ds.property(2).setValue(230); ds.property(3).setValue(180); ds.property(4).setValue(0); ds.property(5).setValue(size > 60 ? 60 : 30);
  l.inPoint = f0 * F; l.outPoint = f1 * F; return l;
}
// L01 hook (sound-off text on frame 1), then the loss rolling up on "tens of millions" — inside the safe area
card("hook", "TENS OF MILLIONS\rLOST IN ONE NIGHT.", "Inter Display", "Black", 92, WARM, [60, 250, 960, 230], 0, 230, "center", -10);
var cnt = card("loss counter", "€10,000,000+", "Inter Display", "Black", 150, ACC, [30, 560, 1020, 190], 52, 300, "center", -20);
cnt.property("ADBE Text Properties").property("ADBE Text Document").expression =
  "var u = Math.min(1, Math.max(0, (time - " + (52 * F) + ") / " + ((170 - 52) * F) + ")); u = 1 - Math.pow(1 - u, 3);" +
  "var v = Math.round(10000000 * u).toString(); '€' + v.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',') + (u >= 1 ? '+' : '');";
card("loss label", "ESTIMATED LOSSES · FRANCE · 11 OCT 2026", "IBM Plex Mono", "Medium", 30, WARM, [60, 760, 960, 48], 70, 300, "center", 40);
// L06 follow card (silent): the Meikigo logo, then the line under it
var lg = img(c, "logo.png", "logo"); S(lg).setValue([42, 42]);
smooth(keys(P(lg), [[1771, [540, 834]], [1783, [540, 810]]]), 85); keys(O(lg), [[1771, 0], [1781, 100]]);
lg.inPoint = 1771 * F; lg.outPoint = (TOTAL + 10) * F;
card("follow", "Follow Meikigo\rfor more.", "Inter Display", "Bold", 66, WARM, [60, 985, 960, 170], 1777, TOTAL + 10, "center", -10);

app.run("comp.open", { comp: "MASTER" });
app.run("file.import", { paths: [DIR + "sfx/mix.wav"], addToComp: true, time: 0 });
c.layer(1).name = "voice + bed + hits (sfx/mix.wav)";
"MASTER built, " + TOTAL + " frames, " + CAP.length + " caption blocks";

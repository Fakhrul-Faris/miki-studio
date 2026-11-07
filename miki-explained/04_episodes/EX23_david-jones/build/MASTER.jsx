// MASTER, 30 fps (v4), one comp over the Blender run (build/episode.py -> out/frames). On top: caption blocks (capBlock,
// caps.jsx, EX15 style) and the follow card. Labels live in the world (3D type in the sets), so no pins here.
var TOTAL = 1927, c = freshComp("MASTER", TOTAL); c.bgColor = BGD;
app.run("file.import", { paths: [DIR + "out/frames/f_0000.png"], sequence: true, addToComp: false });
var seqIt = app.project.item(app.project.numItems); seqIt.mainSource.conformFrameRate = FPS; seqIt.name = "SEQ_world";
c.layers.add(seqIt).name = "world";
for (var i = 0; i < CAP.length; i++) capBlock(c, CAP[i], i);
function card(name, str, font, style, size, col, box, f0, f1, just, tracking) {
  app.run("comp.open", { comp: c.name });
  app.run("layer.newText", { text: str, name: name, font: font, style: style, size: size, fill: hex(col), box: box,
    justify: just || "center", tracking: tracking || 0, leading: Math.round(size * 1.12) });
  var l = c.layer(1), p = P(l).value;
  smooth(keys(P(l), [[f0, [p[0], p[1] + 24]], [f0 + 6, p]]), 85);
  keys(O(l), [[f0, 0], [f0 + 5, 100], [f1 - 5, 100], [f1, 0]]);
  var ds = l.property("ADBE Effect Parade").addProperty("ADBE Drop Shadow");
  ds.property(1).setValue([0.02, 0.02, 0.03]); ds.property(2).setValue(230); ds.property(3).setValue(180); ds.property(4).setValue(0); ds.property(5).setValue(30);
  l.inPoint = f0 * F; l.outPoint = f1 * F; return l;
}
// L01 hook (sound-off text on frame 1)
card("hook", "$2.1B → $100M →\rRENT DUE", "Inter Display", "Black", 92, WARM, [60, 250, 960, 230], 0, 150, "center", -10);
// the world dims under the follow card (the ceiling meter's type sits where the card goes)
var dim = c.layers.addSolid([0.03, 0.03, 0.04], "follow dim", W, H, 1); keys(O(dim), [[1876, 0], [1890, 82]]); dim.inPoint = 1876 * F; dim.outPoint = (TOTAL + 5) * F;
var lg = img(c, "logo.png", "logo"); S(lg).setValue([42, 42]);
smooth(keys(P(lg), [[1883, [540, 834]], [1889, [540, 810]]]), 85); keys(O(lg), [[1883, 0], [1888, 100]]);
lg.inPoint = 1883 * F; lg.outPoint = (TOTAL + 5) * F;
card("follow", "Follow Meikigo\rfor more.", "Inter Display", "Bold", 66, WARM, [60, 985, 960, 170], 1886, TOTAL + 5, "center", -10);
app.run("comp.open", { comp: "MASTER" });
app.run("file.import", { paths: [DIR + "sfx/mix.wav"], addToComp: true, time: 0 });
c.layer(1).name = "voice + bed + hits (sfx/mix.wav)";
"MASTER built, " + TOTAL + " frames, " + CAP.length + " caption blocks";

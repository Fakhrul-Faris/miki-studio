// MASTER, 30 fps (v4 clay), one comp over the Blender run (build/episode.py -> out/frames). On top: Bebas caption phrases
// (capBebas, caps.jsx) and the follow card; the logo has no sound.
// Labels live in the world (3D type on the map), so no pins here.
var TOTAL = 1758, c = freshComp("MASTER", TOTAL); c.bgColor = BGD;
app.run("file.import", { paths: [DIR + "out/frames/f_0000.png"], sequence: true, addToComp: false });
var seqIt = app.project.item(app.project.numItems); seqIt.mainSource.conformFrameRate = FPS; seqIt.name = "SEQ_world";
c.layers.add(seqIt).name = "world";
for (var i = 0; i < CAP.length; i++) capBebas(c, CAP[i], i);            // v4 clay captions
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
var lg = img(c, "logo.png", "logo"); S(lg).setValue([42, 42]);
smooth(keys(P(lg), [[1714, [540, 834]], [1720, [540, 810]]]), 85); keys(O(lg), [[1714, 0], [1719, 100]]);
lg.inPoint = 1714 * F; lg.outPoint = (TOTAL + 5) * F;
card("follow", "FOLLOW MEIKIGO\rFOR MORE.", "Bebas Neue", "Regular", 92, WARM, [60, 975, 960, 200], 1717, TOTAL + 5, "center", 10);
app.run("comp.open", { comp: "MASTER" });
app.run("file.import", { paths: [DIR + "sfx/mix.wav"], addToComp: true, time: 0 });
c.layer(1).name = "voice + bed + hits (sfx/mix.wav)";
"MASTER built, " + TOTAL + " frames, " + CAP.length + " caption blocks";

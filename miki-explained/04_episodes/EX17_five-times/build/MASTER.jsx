// MASTER, 60 fps, one comp over the whole Blender run (build/episode.py -> out/frames). On top: caption blocks (capBlock,
// caps.jsx), labels pinned to the world (pin(), anchors.jsx: the strata, the void, the roads, the value bars) and the
// follow card. No centre cards; Bridge off.
var TOTAL = 2206, c = freshComp("MASTER", TOTAL); c.bgColor = BGD;
app.run("file.import", { paths: [DIR + "out/frames/f_0000.png"], sequence: true, addToComp: false });
var seqIt = app.project.item(app.project.numItems); seqIt.mainSource.conformFrameRate = FPS; seqIt.name = "SEQ_world";
c.layers.add(seqIt).name = "world";

for (var i = 0; i < CAP.length; i++) capBlock(c, CAP[i], i);

// labels pinned to the world (episode.py anchors): the strata, the void, the roads, the value bars
var MONO = ["IBM Plex Mono", "Bold", 30];
pin(c, "s1980:a", "LATE 1980s  \u00B7  RULE OF THUMB", MONO[0], MONO[1], MONO[2], WARM, 388, 540, 0, -10, "center");
pin(c, "s1990:a", "1990  \u00B7  HARVARD BUSINESS REVIEW", MONO[0], MONO[1], MONO[2], WARM, 548, 680, 0, -10, "center");
pin(c, "void:a", "NO STUDY", "Inter Display", "Black", 52, ACC, 690, 1060, 0, 0, "center");
pin(c, "s2014:a", "2014  \u00B7  5\u201325\u00D7", MONO[0], MONO[1], MONO[2], WARM, 818, 1000, 0, -10, "center");
pin(c, "road start:a", "$51 TO WIN ONE", MONO[0], MONO[1], MONO[2], WARM, 1399, 1520, 0, -20, "center");
pin(c, "leaver:a", "\u2212$21", "Inter Display", "Black", 44, WARM, 1582, 1625, 90, -30, "center");
pin(c, "road 0:a", "20% LEAVE EACH YEAR", MONO[0], MONO[1], MONO[2], WARM, 1370, 1630, 0, -40, "center");
pin(c, "road 1:a", "10% LEAVE EACH YEAR", MONO[0], MONO[1], MONO[2], ACC, 1645, 1800, 300, 60, "center");
pin(c, "bar 0:a", "$134", "Inter Display", "Black", 48, WARM, 1816, 2000, 0, -20, "center");
pin(c, "bar 1:a", "$300", "Inter Display", "Black", 56, ACC, 1885, 2000, 0, -240, "center");

// a centre card (follow only, this episode): rises 24px and fades in over 12 frames at f0
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
// L07 follow card (silent): the Meikigo logo, then the line under it
var lg = img(c, "logo.png", "logo"); S(lg).setValue([42, 42]);
smooth(keys(P(lg), [[2121, [540, 834]], [2133, [540, 810]]]), 85); keys(O(lg), [[2121, 0], [2131, 100]]);
lg.inPoint = 2121 * F; lg.outPoint = (TOTAL + 10) * F;
card("follow", "Follow Meikigo\rfor more.", "Inter Display", "Bold", 66, WARM, [60, 985, 960, 170], 2127, TOTAL + 10, "center", -10);

app.run("comp.open", { comp: "MASTER" });
app.run("file.import", { paths: [DIR + "sfx/mix.wav"], addToComp: true, time: 0 });
c.layer(1).name = "voice + bed + hits (sfx/mix.wav)";
"MASTER built, " + TOTAL + " frames, " + CAP.length + " caption blocks";

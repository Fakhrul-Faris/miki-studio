// MASTER, 60 fps, one comp over the whole Blender run (build/episode.py -> out/frames; the world already renders in the
// true accent green, no recolour pass needed). On top: caption blocks (capBlock, caps.jsx), labels pinned to the
// v2 world (pin(), anchors.jsx: the tower, the lanes, the crack, the clinic) and the follow card. No centre cards —
// Bridge off; the tower's 100 beds carry the numbers in-world.
var TOTAL = 2264, c = freshComp("MASTER", TOTAL); c.bgColor = BGD;
app.run("file.import", { paths: [DIR + "out/frames/f_0000.png"], sequence: true, addToComp: false });
var seqIt = app.project.item(app.project.numItems); seqIt.mainSource.conformFrameRate = FPS; seqIt.name = "SEQ_world";
c.layers.add(seqIt).name = "world";

for (var i = 0; i < CAP.length; i++) capBlock(c, CAP[i], i);

// labels pinned to the world (episode.py anchors): the tower's count, the lanes, the crack, the clinic
pin(c, "tower top:a", "71.8%  \u00B7  72 OF 100 BEDS", "Inter Display", "Black", 44, ACC, 150, 428, 0, -10, "center");
pin(c, "tower top:b", "LAST YEAR  55.3%", "Inter Display", "Black", 44, WARM, 436, 626, 0, -10, "center");
pin(c, "tower top:c", "71.8%  \u00B7  SAME 100 BEDS", "Inter Display", "Black", 44, ACC, 634, 700, 0, -10, "center");
pin(c, "lane 1:a", "1  RESUSCITATION", "IBM Plex Mono", "Bold", 30, ACC, 1085, 1290, 0, -40, "center");
pin(c, "lane 5:a", "5  ROUTINE", "IBM Plex Mono", "Bold", 30, WARM, 1175, 1235, 10, -40, "left");
pin(c, "crack:a", "OLD SCALE  \u00B7  3 LEVELS", "IBM Plex Mono", "Bold", 30, WARM, 1330, 1470, 0, -80, "center");
pin(c, "crack:b", "NEW SCALE  \u00B7  5 LEVELS", "IBM Plex Mono", "Bold", 30, ACC, 1480, 1580, 0, -80, "center");
pin(c, "clinic top:a", "91.3%  \u00B7  UNDER 4 HOURS", "Inter Display", "Black", 42, ACC, 1680, 1950, 0, -10, "center");

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
smooth(keys(P(lg), [[2178, [540, 834]], [2190, [540, 810]]]), 85); keys(O(lg), [[2178, 0], [2188, 100]]);
lg.inPoint = 2178 * F; lg.outPoint = (TOTAL + 10) * F;
card("follow", "Follow Meikigo\rfor more.", "Inter Display", "Bold", 66, WARM, [60, 985, 960, 170], 2184, TOTAL + 10, "center", -10);

app.run("comp.open", { comp: "MASTER" });
app.run("file.import", { paths: [DIR + "sfx/mix.wav"], addToComp: true, time: 0 });
c.layer(1).name = "voice + bed + hits (sfx/mix.wav)";
"MASTER built, " + TOTAL + " frames, " + CAP.length + " caption blocks";

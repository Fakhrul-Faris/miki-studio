// MASTER, 60 fps, one comp over the whole Blender run (build/episode.py -> out/frames). On top: caption blocks (capBlock,
// caps.jsx), labels pinned to the world (pin(), anchors.jsx: the piles, 1954, the plots, the world) and the
// follow card. No centre cards; Bridge off.
var TOTAL = 4340, c = freshComp("MASTER", TOTAL); c.bgColor = BGD;
app.run("file.import", { paths: [DIR + "out/frames/f_0000.png"], sequence: true, addToComp: false });
var seqIt = app.project.item(app.project.numItems); seqIt.mainSource.conformFrameRate = FPS; seqIt.name = "SEQ_world";
c.layers.add(seqIt).name = "world";

for (var i = 0; i < CAP.length; i++) capBlock(c, CAP[i], i);

// labels pinned to the world (episode.py anchors) + the Ray Kroc photo card (Wikimedia Commons, public domain, 1976)
var MONO = ["IBM Plex Mono", "Bold", 30];
pin(c, "pile r1:a", "$1.4B  \u00B7  RUNS IT ITSELF", MONO[0], MONO[1], MONO[2], WARM, 506, 880, 0, -30, "center");
pin(c, "pile r2:a", "$13.9B  \u00B7  RENTS IT OUT", "Inter Display", "Black", 40, ACC, 666, 880, 0, -30, "center");
pin(c, "brothers:a", "THE McDONALD BROTHERS", MONO[0], MONO[1], MONO[2], WARM, 1310, 1500, 0, -30, "center");
pin(c, "office:a", "KROC'S THIN SLICE", MONO[0], MONO[1], MONO[2], WARM, 1770, 2000, 0, -30, "center");
pin(c, "brothers:b", "0.5% TO THE BROTHERS", MONO[0], MONO[1], MONO[2], WARM, 1899, 2050, 0, -30, "center");
pin(c, "stand1:c", "HARRY SONNEBORN'S IDEA", MONO[0], MONO[1], MONO[2], WARM, 2073, 2300, 0, -330, "center");
pin(c, "stand1:a", "OWN THE GROUND", "Inter Display", "Black", 44, ACC, 2331, 2510, 0, -330, "center");
pin(c, "stand1:b", "RENT + MARKUP", MONO[0], MONO[1], MONO[2], ACC, 2518, 2640, 0, -300, "center");
pin(c, "brothers:c", "BOUGHT OUT  \u00B7  $2.7M", MONO[0], MONO[1], MONO[2], WARM, 2792, 2880, 0, -30, "center");
pin(c, "city:a", "95% RUN BY FRANCHISEES", MONO[0], MONO[1], MONO[2], ACC, 3029, 3200, 0, -40, "center");
pin(c, "world:a", "45,000 RESTAURANTS  \u00B7  100+ COUNTRIES", MONO[0], MONO[1], MONO[2], ACC, 3210, 3450, 0, 0, "center");
pin(c, "world:b", "$10.4B IN RENT  \u00B7  2025", "Inter Display", "Black", 44, ACC, 3453, 3690, 0, 0, "center");
pin(c, "ribbon:a", "$31B FUTURE RENT, ALREADY OWED", MONO[0], MONO[1], MONO[2], WARM, 3821, 3960, 0, 0, "center");

// Ray Kroc photo card: rises in on "Ray Kroc", out before "Two brothers"
var kr = img(c, "kroc.png", "Ray Kroc 1976 (public domain)"); S(kr).setValue([62, 62]);
smooth(keys(P(kr), [[1107, [540, 470]], [1121, [540, 446]]]), 85); keys(O(kr), [[1107, 0], [1119, 100], [1296, 100], [1308, 0]]);
kr.inPoint = 1107 * F; kr.outPoint = 1310 * F;
pin(c, "kroc:a", "RAY KROC", MONO[0], MONO[1], MONO[2], WARM, 1130, 1300, 0, -40, "center");

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
smooth(keys(P(lg), [[4255, [540, 834]], [4267, [540, 810]]]), 85); keys(O(lg), [[4255, 0], [4265, 100]]);
lg.inPoint = 4255 * F; lg.outPoint = (TOTAL + 10) * F;
card("follow", "Follow Meikigo\rfor more.", "Inter Display", "Bold", 66, WARM, [60, 985, 960, 170], 4261, TOTAL + 10, "center", -10);

app.run("comp.open", { comp: "MASTER" });
app.run("file.import", { paths: [DIR + "sfx/mix.wav"], addToComp: true, time: 0 });
c.layer(1).name = "voice + bed + hits (sfx/mix.wav)";
"MASTER built, " + TOTAL + " frames, " + CAP.length + " caption blocks";

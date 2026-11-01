// MASTER, 60 fps, one comp over the whole Blender run (build/episode.py → out/frames), its ochre recoloured to the green
// accent (accent()). On top: caption blocks at the bottom (capBlock)
// (caps.jsx), the name card, the 60 % source line, the quote card, the 729,000,000 counter, the title card, the follow card,
// and the mix (sfx/mix.wav). Frames are 60 fps MASTER frames (audio/vo_timeline.json × 60).
var TOTAL = 2776, c = freshComp("MASTER", TOTAL); c.bgColor = BGD;
app.run("file.import", { paths: [DIR + "out/frames/f_0000.png"], sequence: true, addToComp: false });
var seqIt = app.project.item(app.project.numItems); seqIt.mainSource.conformFrameRate = FPS; seqIt.name = "SEQ_world";
var world = c.layers.add(seqIt); world.name = "world"; accent(world);

for (var i = 0; i < CAP.length; i++) capBlock(c, CAP[i], i);

// a text layer that rises 24 px and fades in over 12 frames at f0, fades out over 10 frames before f1
function card(name, str, font, style, size, col, box, f0, f1, just, tracking) {
  app.run("comp.open", { comp: c.name });
  app.run("layer.newText", { text: str, name: name, font: font, style: style, size: size, fill: hex(col), box: box,
    justify: just || "center", tracking: tracking || 0, leading: Math.round(size * 1.12) });
  var l = c.layer(1), p = P(l).value;
  smooth(keys(P(l), [[f0, [p[0], p[1] + 24]], [f0 + 12, p]]), 85);
  keys(O(l), [[f0, 0], [f0 + 10, 100], [f1 - 10, 100], [f1, 0]]);
  var ds = l.property("ADBE Effect Parade").addProperty("ADBE Drop Shadow");            // the same dark halo as the big words
  ds.property(1).setValue([0.02, 0.02, 0.03]); ds.property(2).setValue(230); ds.property(3).setValue(180); ds.property(4).setValue(0); ds.property(5).setValue(size > 60 ? 60 : 30);
  l.inPoint = f0 * F; l.outPoint = f1 * F; return l;
}
// L03 name card (lower third, left): "Alan Penn" → "One path"
card("penn name", "PROF. ALAN PENN", "Inter Display", "Bold", 54, WARM, [130, 250, 820, 70], 627, 727, "left", 10);
card("penn role", "UCL · BARTLETT SCHOOL OF ARCHITECTURE", "IBM Plex Mono", "Medium", 30, GREY, [132, 320, 860, 44], 631, 727, "left", 40);
var bar = shapeAt(c, "penn bar", [104, 300]); rectIn(grp(bar), [8, 96], null, ACC); keys(O(bar), [[627, 0], [637, 100], [717, 100], [727, 0]]);
bar.inPoint = 627 * F; bar.outPoint = 727 * F;
// L04: the 60 % is Penn's estimate
card("estimate", "ESTIMATE · PROF. A. PENN, UCL, 2011", "IBM Plex Mono", "Medium", 30, GREY, [60, 1010, 960, 44], 1192, 1365, "center", 40);
// L04 quote card: "no, no, no, this is a big shop"
card("quote", "“No, no, no,\rthis is a big shop.”", "Inter Display", "Bold", 84, WARM, [60, 880, 960, 220], 1647, 1785, "center", -10);
card("quote by", "SHOPPERS, AS TOLD BY IKEA'S HEAD OF RETAIL\rINGKA GROUP · FORTUNE, 2023", "IBM Plex Mono", "Medium", 28, GREY, [60, 1125, 960, 80], 1655, 1785, "center", 40);
// L05 counter: 0 → 729,000,000 on "seven hundred and twenty-nine million"
var cnt = card("counter", "729,000,000", "Inter Display", "Black", 150, ACC, [30, 900, 1020, 190], 1871, 2044, "center", -20);
cnt.property("ADBE Text Properties").property("ADBE Text Document").expression =
  "var u = Math.min(1, Math.max(0, (time - " + (1871 * F) + ") / " + ((1940 - 1871) * F) + ")); u = 1 - Math.pow(1 - u, 3);" +
  "var v = Math.round(729000000 * u).toString(); v.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');";
card("counter label", "IKEA STORE VISITS · ONE YEAR", "IBM Plex Mono", "Medium", 34, WARM, [60, 1110, 960, 48], 1880, 2044, "center", 40);
card("counter source", "INGKA GROUP ANNUAL SUMMARY FY24", "IBM Plex Mono", "Medium", 28, GREY, [60, 1165, 960, 44], 1886, 2044, "center", 40);
// the named concept
card("title 1", "THE PATH IS", "Inter Display", "Black", 128, WARM, [30, 850, 1020, 150], 2118, 2165, "center", -20);
card("title 2", "THE SHELF.", "Inter Display", "Black", 128, ACC, [30, 990, 1020, 150], 2124, 2165, "center", -20);
// L08 follow card (silent): the Meikigo logo, then the line under it
var lg = img(c, "logo.png", "logo"); S(lg).setValue([42, 42]);
smooth(keys(P(lg), [[2691, [540, 834]], [2703, [540, 810]]]), 85); keys(O(lg), [[2691, 0], [2701, 100]]);
lg.inPoint = 2691 * F; lg.outPoint = (TOTAL + 10) * F;
card("follow", "Follow Meikigo\rfor more.", "Inter Display", "Bold", 66, WARM, [60, 985, 960, 170], 2697, TOTAL + 10, "center", -10);

app.run("comp.open", { comp: "MASTER" });
app.run("file.import", { paths: [DIR + "sfx/mix.wav"], addToComp: true, time: 0 });
c.layer(1).name = "voice + bed + hits (sfx/mix.wav)";
"MASTER built, " + TOTAL + " frames, " + CAP.length + " words";

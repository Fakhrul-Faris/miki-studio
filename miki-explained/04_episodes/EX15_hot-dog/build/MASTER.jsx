// MASTER, 60 fps, one comp over the whole Blender run (build/episode.py → out/frames). On top: caption blocks (capBlock,
// caps.jsx), the centre cards (the price, the quote, the counter, the title, the follow card) and labels pinned to the
// world (pin(), anchors.jsx: the price bars, the money columns, the car wash), and the mix (sfx/mix.wav).
var TOTAL = 2697, c = freshComp("MASTER", TOTAL); c.bgColor = BGD;
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
// L01: the price, then the year
card("price", "$1.50", "Inter Display", "Black", 210, ACC, [30, 780, 1020, 250], 75, 262, "center", -20);
card("since", "SINCE 1985", "IBM Plex Mono", "Medium", 40, WARM, [60, 1040, 960, 56], 160, 262, "center", 60);
// L02: everything else rises, the hot dog doesn't
pin(c, "bar 1985", "1985", "IBM Plex Mono", "Medium", 30, GREY, 290, 440, 0, 46, "center");
pin(c, "hotdog bar", "HOT DOG · $1.50", "IBM Plex Mono", "Medium", 30, ACC, 385, 560, 0, -10, "center");
// the quote
card("quote", "“If you raise the effing hot dog, I will kill you.”", "Inter Display", "Bold", 74, WARM, [70, 760, 940, 270], 662, 845, "center", -10);
card("quote by", "JIM SINEGAL, CO-FOUNDER\rAS TOLD BY EX-CEO CRAIG JELINEK, 2018", "IBM Plex Mono", "Medium", 28, GREY, [60, 1060, 960, 80], 670, 845, "center", 40);
// L03 counter: 0 → 245,000,000 on "two hundred and forty-five million"
var cnt = card("counter", "245,000,000", "Inter Display", "Black", 150, ACC, [30, 860, 1020, 190], 1063, 1188, "center", -20);
cnt.property("ADBE Text Properties").property("ADBE Text Document").expression =
  "var u = Math.min(1, Math.max(0, (time - " + (1063 * F) + ") / " + ((1130 - 1063) * F) + ")); u = 1 - Math.pow(1 - u, 3);" +
  "var v = Math.round(245000000 * u).toString(); v.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');";
card("counter label", "HOT DOG COMBOS · FISCAL 2025", "IBM Plex Mono", "Medium", 34, WARM, [60, 1070, 960, 48], 1072, 1188, "center", 40);
card("counter source", "COSTCO CFO, SEP 2025", "IBM Plex Mono", "Medium", 28, GREY, [60, 1125, 960, 44], 1078, 1188, "center", 40);
// L04: the two columns, labelled where they stand (left of the green, right of the grey)
pin(c, "fees top", "$5.3B", "Inter Display", "Black", 84, ACC, 1521, 1785, -70, 0, "right");
pin(c, "fees top:sub", "MEMBERSHIP FEES", "IBM Plex Mono", "Medium", 26, WARM, 1530, 1785, -70, 40, "right");
pin(c, "profit top", "$8.1B", "Inter Display", "Black", 84, WARM, 1682, 1785, 70, 0, "left");
pin(c, "profit top:sub", "ENTIRE PROFIT · FY2025", "IBM Plex Mono", "Medium", 26, GREY, 1690, 1785, 70, 40, "left");
// the named concept
card("title 1", "THE PRICE THAT", "Inter Display", "Black", 116, WARM, [30, 850, 1020, 140], 1742, 1842, "center", -20);
card("title 2", "NEVER MOVES.", "Inter Display", "Black", 116, ACC, [30, 980, 1020, 140], 1748, 1842, "center", -20);
// L06: the car wash, labelled on its stations
pin(c, "basic gantry", "BASIC WASH · ONE PRICE", "IBM Plex Mono", "Medium", 28, WARM, 2203, 2335, 330, -40, "center");
pin(c, "wax", "WAX", "IBM Plex Mono", "Bold", 30, ACC, 2328, 2430, 0, -20, "center");
pin(c, "vacuum", "VACUUM", "IBM Plex Mono", "Bold", 30, ACC, 2359, 2430, 0, -20, "center");
// L08 follow card (silent): the Meikigo logo, then the line under it
var lg = img(c, "logo.png", "logo"); S(lg).setValue([42, 42]);
smooth(keys(P(lg), [[2612, [540, 834]], [2624, [540, 810]]]), 85); keys(O(lg), [[2612, 0], [2622, 100]]);
lg.inPoint = 2612 * F; lg.outPoint = (TOTAL + 10) * F;
card("follow", "Follow Meikigo\rfor more.", "Inter Display", "Bold", 66, WARM, [60, 985, 960, 170], 2618, TOTAL + 10, "center", -10);

app.run("comp.open", { comp: "MASTER" });
app.run("file.import", { paths: [DIR + "sfx/mix.wav"], addToComp: true, time: 0 });
c.layer(1).name = "voice + bed + hits (sfx/mix.wav)";
"MASTER built, " + TOTAL + " frames, " + CAP.length + " caption blocks";

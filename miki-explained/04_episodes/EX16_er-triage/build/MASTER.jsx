// MASTER, 60 fps, one comp over the whole Blender run (build/episode.py -> out/frames; the world already renders in the
// true accent green, no recolour pass needed). On top: caption blocks (capBlock, caps.jsx), labels pinned to the gauges
// (pin(), anchors.jsx), the climbing wait counter pinned above "you", and the follow card. No centre cards — Bridge off,
// no quote/counter/title card this episode (the gauges and legend carry the numbers in-world).
var TOTAL = 2264, c = freshComp("MASTER", TOTAL); c.bgColor = BGD;
app.run("file.import", { paths: [DIR + "out/frames/f_0000.png"], sequence: true, addToComp: false });
var seqIt = app.project.item(app.project.numItems); seqIt.mainSource.conformFrameRate = FPS; seqIt.name = "SEQ_world";
c.layers.add(seqIt).name = "world";

for (var i = 0; i < CAP.length; i++) capBlock(c, CAP[i], i);

// gauge value labels: pinned where the gauge sits, shown only while the camera actually frames that gauge
pin(c, "gauge 718:A", "71.8%", "Inter Display", "Black", 46, ACC, 12, 95, 0, -70, "center");
pin(c, "gauge 718:B", "71.8%", "Inter Display", "Black", 40, ACC, 1661, 1945, 0, -62, "center");
pin(c, "gauge 553:A", "55.3%", "Inter Display", "Bold", 32, WARM, 1661, 1945, 0, -48, "center");
pin(c, "gauge 913:A", "91.3%", "Inter Display", "Bold", 32, WARM, 1661, 1945, 0, -46, "center");

// the climbing wait counter above "you": position tracks the pinned world anchor, text climbs (1 "min" per 1.5s),
// freezes the instant "you" is finally called (YOU_CALL = L06 start, 1945), fades out as they walk to the desk
var YOU_CALL = 1945;
app.run("comp.open", { comp: c.name });
app.run("layer.newText", { text: "0 MIN", name: "you counter", font: "IBM Plex Mono", style: "Bold", size: 34, fill: hex(WARM), position: [0, 0], justify: "center", tracking: 20 });
var wc = c.layer(1), wa = ANCH["you counter"], wk = [];
for (var wi = 0; wi < wa.length; wi++) if (wa[wi][0] % 2 == 0) wk.push([wa[wi][0], [wa[wi][1], wa[wi][2] - 50]]);
keys(P(wc), wk); keys(O(wc), [[30, 0], [60, 100], [YOU_CALL + 60, 100], [YOU_CALL + 85, 0]]);
wc.property("ADBE Text Properties").property("ADBE Text Document").expression =
  "var capped = Math.min(time, " + (YOU_CALL * F) + "); Math.floor(capped / 1.5) + ' MIN';";
var wds = wc.property("ADBE Effect Parade").addProperty("ADBE Drop Shadow");
wds.property(1).setValue([0.02, 0.02, 0.03]); wds.property(2).setValue(230); wds.property(3).setValue(180); wds.property(4).setValue(0); wds.property(5).setValue(26);
wc.inPoint = 0; wc.outPoint = (YOU_CALL + 85) * F;

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

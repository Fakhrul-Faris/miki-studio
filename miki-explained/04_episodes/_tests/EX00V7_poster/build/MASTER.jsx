// MASTER for the EX00V7 test (200 f = EX13 L01–L02): the Blender run (build/poster.py → out/frames), one big word at a time
// in the centre (r44), "60" and "23" stamped in ochre, the grain overlay, and EX13's first 8.33 s of voice + hits (audio/mix.wav).
var TOTAL = 200, c = freshComp("MASTER", TOTAL); c.bgColor = INK;
var it = item("SEQ_poster");
if (!it) { app.run("file.import", { paths: [DIR + "out/frames/f_0000.png"], sequence: true, addToComp: false });
  it = app.project.item(app.project.numItems); it.mainSource.conformFrameRate = FPS; it.name = "SEQ_poster"; }
var bg = c.layers.add(it); bg.name = "poster run";

// [frame, word]; each word holds until the next one (EX13 audio/vo_timeline.json), numbers are stamped big in ochre
var WORDS = [[4, "DISNEY'S"], [14, "SIGN"], [19, "SAYS"], [24, "60"], [33, "MINUTES."], [48, "YOU"], [52, "WAIT"], [55, "23."],
  [77, "THAT'S"], [81, "NOT"], [84, "LUCK."], [98, "YOU'RE"], [104, "AT"], [106, "PIRATES"], [117, "OF"], [119, "THE"],
  [121, "CARIBBEAN"], [131, "IN"], [137, "JULY,"], [149, "YOU"], [151, "GROAN"], [162, "AND"], [165, "YOU"], [168, "JOIN"],
  [173, "THE"], [177, "LINE"], [183, "ANYWAY."]];
var CY = 1000;
app.run("comp.open", { comp: "MASTER" });
for (var i = 0; i < WORDS.length; i++) {
  var f0 = WORDS[i][0], f1 = i + 1 < WORDS.length ? WORDS[i + 1][0] : TOTAL, w = WORDS[i][1], num = /^\d/.test(w);
  var sz = num ? 420 : (w.length > 7 ? 150 : 170);
  app.run("layer.newText", { text: w, name: "word " + (i + 1) + " " + w, font: "Anton", style: "Regular", size: sz,
    fill: hex(num ? OCHRE : PAPER), stroke: hex(INK), applyStroke: true, strokeWidth: num ? 16 : 12, strokeOverFill: false,
    box: [20, CY - sz * 0.72, W - 40, sz * 1.45], justify: "center", tracking: 10, leading: Math.round(sz * 1.05) });
  var l = c.layer(1);
  if (num) stamp(l, f0, 125);
  l.inPoint = f0 * F; l.outPoint = f1 * F;
}
overlay(c);
app.run("comp.open", { comp: "MASTER" });
app.run("file.import", { paths: [DIR + "audio/mix.wav"], addToComp: true, time: 0 });
c.layer(1).name = "EX13 voice + hits (first 8.33 s)";
"MASTER built, " + TOTAL + " frames, " + WORDS.length + " words";

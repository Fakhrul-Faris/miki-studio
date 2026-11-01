// 60 fps motion test: the Blender test run + the hook as big words (fake timing until the voice is in)
var TOTAL = 180, c = freshComp("TYPETEST", TOTAL); c.bgColor = BGD;
app.run("file.import", { paths: [DIR + "out/test/t_0000.png"], sequence: true, addToComp: false });
var it = app.project.item(app.project.numItems); it.mainSource.conformFrameRate = FPS; c.layers.add(it).name = "world";
var WS = [[8, "IKEA'S"], [26, "MAZE"], [46, "ISN'T"], [62, "BAD"], [78, "DESIGN."], [118, "IT'S"], [132, "THE"], [142, "WHOLE"], [156, "BUSINESS."]];
for (var i = 0; i < WS.length; i++) {
  var f1 = i + 1 < WS.length ? WS[i + 1][0] : TOTAL, w = WS[i][1];
  bigWord(c, w, WS[i][0], f1, (w == "MAZE" || w == "BUSINESS.") ? OCHRE : WARM);
}
"TYPETEST built";

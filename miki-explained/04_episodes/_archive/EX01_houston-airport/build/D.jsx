// Beat D (L04 15.9–32.2): timeline card → corridor photo → walk ×6 → complaints ~0 → same 8 min → zoom + pointer → zoom-through
function w(L, i) { return WT[L][i]; }
function in2(n) { comp.layer(n).parent = comp.layer("B2"); }
function fadeAt(names, t, d) { for (var i = 0; i < names.length; i++) { var o = tf(comp.layer(names[i])).property("ADBE Opacity"); o.setValueAtTime(t, 100); o.setValueAtTime(t + (d || 0.2), 0); } }
// clear Beat B's rows (the card shell and header stay)
fadeAt(["Comp label", "Comp track", "Comp fill", "Comp still", "Wait label", "Wait track", "Wait fill", "Wait min", "Handler 1", "Handler 2", "Handler 3", "Handlers label"], 15.85, 0.2);
// "eight minutes" chip in the header
card("Eight chip", [820, 740], [190, 56], 28, INK); in2("Eight chip"); pop(comp.layer("Eight chip"), w("L04", 4));
inc("Eight chip text", "8 minutes", "SemiBold", 26, CREAM, [735, 722, 170, 40], "center"); in2("Eight chip text"); life(comp.layer("Eight chip text"), w("L04", 4) + 0.1, null, 0.1);
fadeAt(["Head place"], w("L04", 4) - 0.1, 0.1);
// giant 7 behind the card
ws("Giant 7", "7", "Light", 1100, ORANGE, [400, -180, 1000, 1300]); in2("Giant 7");
comp.layer("Giant 7").moveAfter(comp.layer("Card"));
opac(comp.layer("Giant 7"), [[0, 0], [w("L04", 9), 0], [w("L04", 9) + 0.3, 14], [24.4, 14], [24.8, 0]]);
nudge(comp.layer("Giant 7"), [[w("L04", 9), [60, 0]], [w("L04", 9) + 0.65, [0, 0]]], 70);
// walking row (blue): 1 unit = 83.25 px of the 666 px track
var X0 = 262, X1 = 928;
tile("Walk tile", [190, 900], 84, BLUE, pictArrowRight); in2("Walk tile"); pop(comp.layer("Walk tile"), w("L04", 6));
ws("Walk label", "Walking", "Medium", 46, INK, [262, 866, 400, 64]); in2("Walk label"); wordReveal(comp.layer("Walk label"), [w("L04", 8)]);
ws("Walk min", "1 min", "Light", 46, INK, [690, 866, 240, 64], "right"); in2("Walk min"); life(comp.layer("Walk min"), w("L04", 6), null, 0.12);
app.run("prop.setExpression", { layer: comp.layer("Walk min").index, path: "text/sourceText", expression: "Math.round(linear(time, 24.44, 25.6, 1, 6)) + ' min'" });
bar("Walk track", [X0, 958], [X1, 958], TRACK, 14); in2("Walk track"); life(comp.layer("Walk track"), w("L04", 6), null, 0.2);
bar("Walk fill", [X0, 958], [X1, 958], BLUE, 14); in2("Walk fill");
var wt = comp.layer("Walk fill").property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").addProperty("ADBE Vector Filter - Trim").property("ADBE Vector Trim End");
wt.setValueAtTime(w("L04", 6), 0); wt.setValueAtTime(w("L04", 8), 12.5); wt.setValueAtTime(24.44, 12.5); wt.setValueAtTime(25.7, 75); easeAll(wt, 75);
// standing row (green): 7 units, shrinks to 2
tile("Stand tile", [190, 1080], 84, ORANGE, pictPause); in2("Stand tile"); pop(comp.layer("Stand tile"), w("L04", 9));
ws("Stand label", "Standing", "Medium", 46, INK, [262, 1046, 400, 64]); in2("Stand label"); wordReveal(comp.layer("Stand label"), [w("L04", 11)]);
ws("Stand min", "1 min", "Light", 46, ORANGE, [690, 1046, 240, 64], "right"); in2("Stand min"); life(comp.layer("Stand min"), w("L04", 9), null, 0.12);
app.run("prop.setExpression", { layer: comp.layer("Stand min").index, path: "text/sourceText",
  expression: "time < 24 ? Math.round(linear(time, " + w("L04", 9) + ", " + (w("L04", 9) + 0.7) + ", 1, 7)) + ' min' : Math.round(linear(time, 24.44, 25.6, 7, 2)) + ' min'" });
bar("Stand track", [X0, 1138], [X1, 1138], TRACK, 14); in2("Stand track"); life(comp.layer("Stand track"), w("L04", 9), null, 0.2);
bar("Stand fill", [X0 + 83.25, 1138], [X1, 1138], ORANGE, 14); in2("Stand fill");
var sg = comp.layer("Stand fill").property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").addProperty("ADBE Vector Filter - Trim");
var se = sg.property("ADBE Vector Trim End"), ss = sg.property("ADBE Vector Trim Start");
se.setValueAtTime(w("L04", 10), 0); se.setValueAtTime(w("L04", 10) + 1.0, 100); easeAll(se, 70);
ss.setValueAtTime(24.44, 0); ss.setValueAtTime(25.7, 71.43); easeAll(ss, 75);
// "doing nothing"
pulse(comp.layer("Stand tile"), w("L04", 15));
inc("Nothing", "doing nothing", "SemiBold", 30, ORANGE, [690, 1158, 240, 44], "right"); in2("Nothing");
typeOn(comp.layer("Nothing"), w("L04", 15), w("L04", 16) + 0.3); fadeAt(["Nothing"], 24.3, 0.2);
// corridor photo as a framed print above the card (not zoomed with it)
card("Photo frame", [540, 395], [720, 500], 24); pop(comp.layer("Photo frame"), w("L04", 19) - 0.05, 0.22);
app.run("file.import", { paths: [DIR + "media/M2.png"], sequence: false, addToComp: true, time: 0 }); comp.layer(1).name = "M2";
var m2 = comp.layer("M2"); m2.outPoint = comp.duration; m2 = comp.layer("M2");
P(m2).setValue([540, 395]);
app.run("layer.addMask", { layer: m2.index, shape: "rect", rect: [60, 820, 1320, 900] });
m2 = comp.layer("M2"); m2.parent = comp.layer("Photo frame"); m2 = comp.layer("M2");
P(m2).setValue([0, 0]);
anim(tf(m2).property("ADBE Scale"), [[w("L04", 19), [50, 50]], [29.8, [54, 54]]], 10);
opac(comp.layer("Photo frame"), [[0, 0], [w("L04", 19) - 0.05 - F, 0], [w("L04", 19) - 0.05, 100], [29.6, 100], [29.85, 0]]);
opac(comp.layer("M2"), [[0, 0], [w("L04", 19) - 0.05 - F, 0], [w("L04", 19) - 0.05, 100], [29.6, 100], [29.85, 0]]);
anim(tf(comp.layer("Photo frame")).property("ADBE Rotate Z"), [[w("L04", 19), 0], [w("L04", 19) + 0.4, -2]], 70);
// "complaints dropped to almost zero"
card("Zero chip", [540, 1388], [560, 96], 48, INK); pop(comp.layer("Zero chip"), w("L04", 31));
tile("Zero tile", [310, 1388], 64, BLUE, pictArrowRight); pop(comp.layer("Zero tile"), w("L04", 31) + 0.08);
tf(comp.layer("Zero tile")).property("ADBE Rotate Z").setValue(90);
inc("Zero text", "Complaints: almost zero", "SemiBold", 32, CREAM, [360, 1366, 460, 50]); typeOn(comp.layer("Zero text"), w("L04", 32), w("L04", 35) + 0.2);
fadeAt(["Zero chip", "Zero tile", "Zero text"], 29.6, 0.25);
// "the bags took the same time"
inc("Same", "Same 8 minutes.", "Medium", 38, INK, [150, 1196, 700, 56]); in2("Same"); typeOn(comp.layer("Same"), w("L04", 36), w("L04", 41) + 0.2);
dashLine("Same underline", [296, 1254], [442, 1254], BLUE, w("L04", 39), w("L04", 41)); in2("Same underline");
// zoom on the standing row (s = 1.4), then the arc pointer
var Z0 = 29.85, Z1 = 30.5;
anim(P(comp.layer("B2")), [[Z0, [540, 960]], [Z1, [540, 982]]], 92);
anim(tf(comp.layer("B2")).property("ADBE Scale"), [[Z0, [100, 100]], [Z1, [140, 140]]], 92);
var FROM = [904, 1231], TO = [150, 330], D0 = 30.35, D1 = 30.8;
circle("Pointer", 30, ORANGE, FROM, true);
var dp = P(comp.layer("Pointer")); dp.setValueAtTime(D0, FROM); dp.setValueAtTime(D1, TO);
dp.setSpatialTangentsAtKey(1, [0, 0], [-80, -560]); dp.setSpatialTangentsAtKey(2, [320, -40], [0, 0]);
var de = new KeyframeEase(0, 85); dp.setTemporalEaseAtKey(2, [de], [de]);
life(comp.layer("Pointer"), D0 - 0.1, null, 0.1); comp.layer("Pointer").motionBlur = true;
var tr = shapeLayer("Pointer trail"), g = grp(tr);
pathIn(g, [FROM, TO], false, [[0, 0], [320, -40]], [[-80, -560], [0, 0]]);
var st = stroke(g, ORANGE, 4, 1); var dd = st.property("ADBE Vector Stroke Dashes");
dd.addProperty("ADBE Vector Stroke Dash 1").setValue(10); dd.addProperty("ADBE Vector Stroke Gap 1").setValue(12);
trimIn(g, D0, D1, 85);
ripple("Ripple", TO, D1, ORANGE);
ws("Empty", "The waiting just stopped feeling empty.", "SemiBold", 66, INK, [192, 288, 860, 180]);
wordReveal(comp.layer("Empty"), [w("L04", 42), w("L04", 43), w("L04", 44), w("L04", 45), w("L04", 46), w("L04", 47)]);
// zoom-through: the standing bar swells green → brown
var fl = centred("Fill through", [540, 1231]), fg = grp(fl), fr = rectIn(fg, [1200, 20], 0);
var fc = fg.addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color");
fc.setValueAtTime(32.2, ORANGE.concat([1])); fc.setValueAtTime(32.45, BROWN.concat([1]));
anim(fr.property("ADBE Vector Rect Size"), [[31.95, [1200, 20]], [32.25, [1200, 2600]]], 90);
opac(comp.layer("Fill through"), [[0, 0], [31.95 - F, 0], [31.95, 100]]);
comp.layer("Fill through").motionBlur = true;
"D: " + comp.numLayers;

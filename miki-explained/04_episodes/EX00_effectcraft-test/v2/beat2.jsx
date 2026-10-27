// Beat 2 (L02 4.8–8.7): the timeline as a UI card with two rows
nul("B2", [540, 960]); comp.layer("B2").parent = comp.layer("DRIFT");
var b2 = [];
function add2(n) { comp.layer(n).parent = comp.layer("B2"); b2.push(n); }
// giant light numeral behind the card (scale contrast), on "seven"
ws("Giant 7", "7", "Light", 1100, ORANGE, [430, 380, 1000, 1300]); add2("Giant 7");
opac(comp.layer("Giant 7"), [[0, 0], [7.95, 0], [8.25, 14]]);
nudge(comp.layer("Giant 7"), [[7.95, [60, 0]], [8.6, [0, 0]]], 70);
card("Card", [540, 1000], [900, 560], 40); add2("Card");
anim(P(comp.layer("Card")), [[4.45, [540, 1180]], [4.95, [540, 1000]]], 88);
life(comp.layer("Card"), 4.45, null, 0.2);
comp.layer("Card").motionBlur = true;
P(comp.layer("Card")).expression = "time > 5 ? value + [0, Math.sin((time - 5) * 1.3) * 4] : value";
inc("Card header", "BAGGAGE CLAIM · HOUSTON", "SemiBold", 26, MUTED, [150, 760, 700, 40]); typeOn(comp.layer("Card header"), 4.95, 5.4); add2("Card header");
// row 1: walking (blue)
tile("Walk tile", [190, 900], 84, BLUE, pictArrowRight); life(comp.layer("Walk tile"), 4.95); add2("Walk tile");
ws("Walk label", "Walking", "Medium", 46, INK, [262, 866, 400, 64]); wordReveal(comp.layer("Walk label"), [5.24]); add2("Walk label");
ws("Walk min", "1 min", "Light", 46, INK, [690, 866, 240, 64], "right"); wordReveal(comp.layer("Walk min"), [5.52, 5.78]); add2("Walk min");
bar("Walk track", [262, 958], [928, 958], TRACK, 14); life(comp.layer("Walk track"), 5.15, null, 0.2); add2("Walk track");
bar("Walk fill", [262, 958], [345, 958], BLUE, 14, 5.24, 5.95); add2("Walk fill");
// row 2: standing (orange) — starts where walking ends
tile("Stand tile", [190, 1080], 84, ORANGE, pictPause); add2("Stand tile");
opac(comp.layer("Stand tile"), [[0, 0], [4.95 - F, 0], [4.95, 45], [7.22, 45], [7.3, 100]]); pulse(comp.layer("Stand tile"), 7.27);
ws("Stand label", "Standing", "Medium", 46, INK, [262, 1046, 400, 64]); wordReveal(comp.layer("Stand label"), [7.52]); add2("Stand label");
ws("Stand min", "1 min", "Light", 46, ORANGE, [690, 1046, 240, 64], "right"); add2("Stand min");
life(comp.layer("Stand min"), 7.5, null, 0.15);
app.run("prop.setExpression", { layer: comp.layer("Stand min").index, path: "text/sourceText",
  expression: "Math.round(linear(time, 7.55, 8.3, 1, 7)) + ' min'" });
bar("Stand track", [262, 1138], [928, 1138], TRACK, 14); life(comp.layer("Stand track"), 7.3, null, 0.2); add2("Stand track");
bar("Stand fill", [345, 1138], [928, 1138], ORANGE, 14, 7.52, 8.4); add2("Stand fill");
"beat 2: " + comp.numLayers + " layers";

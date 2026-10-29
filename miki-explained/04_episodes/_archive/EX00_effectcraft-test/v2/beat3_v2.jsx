// Beat 3 (L03 9.2–13.6): "Same 8 minutes" slot → macro zoom into the standing bar → arc pointer
function add3(n) { comp.layer(n).parent = comp.layer("B2"); }
inc("Same", "Same 8 minutes.", "Medium", 38, INK, [150, 1186, 700, 56]); typeOn(comp.layer("Same"), 9.2, 9.75); add3("Same");
dashLine("Same underline", [296, 1244], [442, 1244], BLUE, 9.45, 9.85); add3("Same underline");
// zoom: world = P + (x - 540,960) * s ; standing row (y 1080) → screen 1150 at s = 1.4, card top lands at 646
var B2 = comp.layer("B2");
anim(P(B2), [[10.6, [540, 960]], [11.45, [540, 982]]], 92);
anim(tf(B2).property("ADBE Scale"), [[10.6, [100, 100]], [11.45, [140, 140]]], 92);
// arc pointer, unparented, in screen space
var FROM = [764, 1231], TO = [150, 360], D0 = 11.55, D1 = 12.05;
circle("Pointer", 30, ORANGE, FROM, true);
var dp = P(comp.layer("Pointer")); dp.setValueAtTime(D0, FROM); dp.setValueAtTime(D1, TO);
dp.setSpatialTangentsAtKey(1, [0, 0], [-60, -520]); dp.setSpatialTangentsAtKey(2, [260, -40], [0, 0]);
var de = new KeyframeEase(0, 85); dp.setTemporalEaseAtKey(2, [de], [de]);
life(comp.layer("Pointer"), D0 - 0.1, null, 0.1);
var tr = shapeLayer("Pointer trail"), g = grp(tr);
pathIn(g, [FROM, TO], false, [[0, 0], [260, -40]], [[-60, -520], [0, 0]]);
var st = stroke(g, ORANGE, 4, 1); var d = st.property("ADBE Vector Stroke Dashes");
d.addProperty("ADBE Vector Stroke Dash 1").setValue(10); d.addProperty("ADBE Vector Stroke Gap 1").setValue(12);
trimIn(g, D0, D1, 85);
ripple("Ripple", TO, D1, ORANGE);
ws("Hated", "The part people hated.", "SemiBold", 66, INK, [192, 318, 880, 90]);
wordReveal(comp.layer("Hated"), [12.13, 12.32, 12.5, 12.74]);
inc("Hated detail", "7 of 8 minutes, standing still.", "Medium", 40, ORANGE, [196, 410, 860, 60]);
typeOn(comp.layer("Hated detail"), 13.0, 13.6);
"beat 3: " + comp.numLayers;

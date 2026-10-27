// Beat B (L02 4.7–12.4): the hub becomes the card header; complaints high, handlers hired, wait drops, complaints don't
function w(L, i) { return WT[L][i]; }
nul("B2", [540, 960]); comp.layer("B2").parent = comp.layer("DRIFT");
function in2(n) { comp.layer(n).parent = comp.layer("B2"); }
card("Card", [540, 980], [900, 640], 40); in2("Card");
anim(P(comp.layer("Card")), [[4.4, [540, 1160]], [4.9, [540, 980]]], 88); life(comp.layer("Card"), 4.4, null, 0.2);
comp.layer("Card").motionBlur = true;
// hub (from A) flies into the header slot, then hands off to the card's own tile
var hub = comp.layer("Hub");
P(hub).setValueAtTime(4.3, [235, 760]); P(hub).setValueAtTime(4.85, [175, 740]); easeAll(P(hub), 88);
var hs = tf(hub).property("ADBE Scale"); hs.setValueAtTime(4.3, [80, 80]); hs.setValueAtTime(4.85, [56, 56]); easeAll(hs, 80);
opac(hub, [[4.85, 100], [4.85 + F, 0]]);
tile("Head tile", [175, 740], 84, ORANGE, pictCase); in2("Head tile"); life(comp.layer("Head tile"), 4.85);
ws("Head title", "Baggage claim", "Medium", 44, INK, [235, 710, 500, 60]); in2("Head title"); wordReveal(comp.layer("Head title"), [4.9, 5.0]);
inc("Head place", "HOUSTON", "SemiBold", 24, MUTED, [700, 724, 230, 40], "right"); in2("Head place"); typeOn(comp.layer("Head place"), 5.0, 5.3);
var BSET = ["Head place"];
// complaints row: full and high on "angry"
ws("Comp label", "Complaints", "Medium", 42, INK, [150, 828, 400, 60]); in2("Comp label"); wordReveal(comp.layer("Comp label"), [w("L02", 2)]);
bar("Comp track", [150, 922], [930, 922], TRACK, 14); in2("Comp track"); life(comp.layer("Comp track"), w("L02", 2), null, 0.2);
bar("Comp fill", [150, 922], [930, 922], ORANGE, 14, w("L02", 2), w("L02", 2) + 0.7); in2("Comp fill");
// "The complaints didn't": the bar shakes, a label confirms
P(comp.layer("Comp fill")).expression = "(time > " + w("L02", 22) + " && time < " + (w("L02", 23) + 0.5) + ") ? value + [wiggle(18, 7)[0] - value[0], 0] : value";
inc("Comp still", "still high", "SemiBold", 30, ORANGE, [690, 838, 240, 50], "right"); in2("Comp still"); typeOn(comp.layer("Comp still"), w("L02", 23), w("L02", 23) + 0.4);
// wait row: long on "waiting", shrinks on "wait dropped", reads 8 min on "eight minutes"
ws("Wait label", "Wait", "Medium", 42, INK, [150, 1008, 300, 60]); in2("Wait label"); wordReveal(comp.layer("Wait label"), [w("L02", 4)]);
bar("Wait track", [150, 1102], [930, 1102], TRACK, 14); in2("Wait track"); life(comp.layer("Wait track"), w("L02", 4), null, 0.2);
bar("Wait fill", [150, 1102], [930, 1102], BLUE, 14, w("L02", 4), w("L02", 4) + 0.7); in2("Wait fill");
var wf = comp.layer("Wait fill").property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").property("ADBE Vector Filter - Trim").property("ADBE Vector Trim End");
wf.setValueAtTime(w("L02", 17), 100); wf.setValueAtTime(w("L02", 17) + 0.6, 42); easeAll(wf, 80);
ws("Wait min", "8 min", "Light", 42, BLUE, [690, 1008, 240, 60], "right"); in2("Wait min"); wordReveal(comp.layer("Wait min"), [w("L02", 19), w("L02", 20)]);
// "hired more baggage handlers": person tiles
var hx = [186, 270, 354], ht = [w("L02", 11), w("L02", 12), w("L02", 13)];
for (var i = 0; i < 3; i++) { tile("Handler " + (i + 1), [hx[i], 1196], 72, BLUE, pictPerson); in2("Handler " + (i + 1)); pop(comp.layer("Handler " + (i + 1)), ht[i]); }
inc("Handlers label", "+ more handlers", "Medium", 30, MUTED, [410, 1176, 400, 44]); in2("Handlers label"); typeOn(comp.layer("Handlers label"), w("L02", 13), w("L02", 14) + 0.3);
"B: " + comp.numLayers;

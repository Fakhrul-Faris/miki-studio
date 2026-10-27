// Beat F (L06 40.2–46.3, hold to 49): one walks out → the empty minutes → The Wait Tax → the question
function w(L, i) { return WT[L][i]; }
var DIMC = [0.957, 0.945, 0.918];
function in4(n) { comp.layer(n).parent = comp.layer("B4"); }
function fadeTo(names, t, v, d) { for (var i = 0; i < names.length; i++) { var o = tf(comp.layer(names[i])).property("ADBE Opacity"); o.setValueAtTime(t, o.valueAtTime(t, false)); o.setValueAtTime(t + (d || 0.3), v); } }
fadeTo(["Your shop", "Day Thursday", "Day Friday", "Day Saturday", "Day Sunday", "Day Saturday lit", "Active dot", "Ghost SATURDAY", "Bubble", "Bubble text"], 40.0, 0, 0.35);
// the last customer gives up
var last = comp.layer("Person 5");
nudge(last, [[40.35, [0, 0]], [40.95, [580, 0]]], 60);
inc("Minus one", "−1 customer", "SemiBold", 34, ORANGE, [620, 1418, 320, 50], "right"); in4("Minus one");
life(comp.layer("Minus one"), 40.7, 43.0, 0.12, 0.3);
ws("Not minutes", "It's not the minutes\rthey hate.", "Medium", 64, DIMC, [110, 270, 880, 170]);
wordReveal(comp.layer("Not minutes"), [w("L06", 0), w("L06", 1), w("L06", 2), w("L06", 3), w("L06", 4), w("L06", 5)]);
ws("Empty minutes", "It's the empty minutes.", "SemiBold", 64, ORANGE, [110, 450, 880, 90]);
wordReveal(comp.layer("Empty minutes"), [w("L06", 6), w("L06", 7), w("L06", 8), w("L06", 9)]);
// The Wait Tax: big, with a green highlighter behind line 2
fadeTo(["Not minutes", "Empty minutes", "Bench", "Person 1", "Person 2", "Person 3", "Person 4"], 43.0, 25, 0.3);
ws("Tax The", "The", "Black", 150, DIMC, [80, 690, 920, 180]); wordReveal(comp.layer("Tax The"), [w("L06", 11)]);
bar("Highlighter", [70, 958], [880, 958], ORANGE, 170, w("L06", 12) - 0.05, w("L06", 13) + 0.2);
ws("Tax Wait", "Wait Tax.", "Black", 150, DIMC, [80, 860, 920, 180]); wordReveal(comp.layer("Tax Wait"), [w("L06", 12), w("L06", 13)]);
inc("Question", "What does your shop do about it?", "Medium", 46, DIMC, [80, 1130, 920, 70]);
wordReveal(comp.layer("Question"), [w("L06", 14), w("L06", 15), w("L06", 16), w("L06", 17), w("L06", 18), w("L06", 19), w("L06", 20)], 12);
"F: " + comp.numLayers;

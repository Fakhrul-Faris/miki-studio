// Beat F (L06 36.7–44.9): plan around vs walk away → The Doorway Decision → the question
var DIMC = [0.957, 0.945, 0.918];
function in4(n) { comp.layer(n).parent = comp.layer("B4"); }
fadeTo(["Your door", "Sat chip", "Sat chip text"], 36.5, 0, 0.35);
ws("Plan", "A long wait,\rpeople can plan around.", "Medium", 64, DIMC, [110, 260, 880, 170]);
wordReveal(comp.layer("Plan"), WT.L06.slice(0, 7));
ws("Away", "An unknown wait,\rthey walk away from.", "SemiBold", 64, ORANGE, [110, 470, 880, 170]);
wordReveal(comp.layer("Away"), WT.L06.slice(7, 14));
// the visitor gives up on "walk away"
fadeAt(["Guess bubble", "Guess mark"], w("L06", 11) - 0.1, 0.15);
nudge(comp.layer("Visitor"), [[w("L06", 11), [0, 0]], [w("L06", 13) + 0.3, [420, 0]]], 60);
comp.layer("Visitor").motionBlur = true;
inc("Minus one", "−1 customer", "SemiBold", 34, ORANGE, [620, 1290, 320, 50], "right"); in4("Minus one"); life(comp.layer("Minus one"), w("L06", 13), 41.0, 0.12, 0.3);
// The Doorway Decision
fadeTo(["Plan", "Away", "Door", "Bench", "Seated 1", "Seated 2", "Seated 3", "Seated 4", "Seated 5"], 40.75, 22, 0.3);
ws("Dec 1", "The Doorway", "Black", 130, DIMC, [80, 700, 960, 160]); wordReveal(comp.layer("Dec 1"), [w("L06", 15), w("L06", 16)]);
bar("Highlighter", [70, 945], [800, 945], ORANGE, 150, w("L06", 17) - 0.05, w("L06", 17) + 0.3);
ws("Dec 2", "Decision.", "Black", 130, DIMC, [80, 860, 960, 160]); wordReveal(comp.layer("Dec 2"), [w("L06", 17)]);
inc("Question", "What does your door tell them?", "Medium", 46, DIMC, [80, 1100, 920, 70]);
wordReveal(comp.layer("Question"), WT.L06.slice(18), 12);
"F: " + comp.numLayers;

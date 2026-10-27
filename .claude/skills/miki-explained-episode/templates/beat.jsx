// Beat X (L0N t0–t1): one line of what this beat shows.
// Beat A only: clearComp(); importLines(["L01","L02","L03","L04","L05","L06"]); group("DRIFT");
group("BX", "DRIFT");                                   // a group to zoom/push this beat's diagram
card("X card", [540, 1000], [900, 560], 40); comp.layer("X card").parent = comp.layer("BX");
ws("X title", "Title", "Medium", 46, INK, [150, 760, 600, 64]); wordReveal(comp.layer("X title"), [w("L0N", 0)]);
tile("X tile", [190, 900], 84, BLUE, pictPerson); pop(comp.layer("X tile"), w("L0N", 3));
bar("X fill", [262, 958], [928, 958], PROBLEM, 14, w("L0N", 4), w("L0N", 6));
fadeAt(["X card", "X title", "X tile", "X fill"], T.L0M - 0.2, 0.25);   // L0M = the next line: leave before it starts
"X: " + comp.numLayers;

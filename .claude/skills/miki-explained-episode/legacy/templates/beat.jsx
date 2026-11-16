// Beat X (L0N t0–t1): one line of what this beat shows.
// Beat A only: clearComp(); importLines(["L01","L02","L03","L04","L05","L06"]); group("DRIFT");
group("BX", "DRIFT");                                   // a group to zoom/push this beat's diagram
// camera: always camMove (ease-in-out, log-space zoom), never keys + soft(). seg = [t0, t1, s0, s1, [x0, y0], [x1, y1]]
// camMove([w("L0N", 2), w("L0N", 2) + 1.6, 100, 60, [540, 960], [540, 960]]);  depth([[name, distance], ...], 0.1, "below") for a field
card("X card", [540, 1000], [900, 560], 40); comp.layer("X card").parent = comp.layer("BX");
ws("X title", "Title", "Medium", 46, INK, [150, 760, 600, 64]); wordReveal(comp.layer("X title"), [w("L0N", 0)]);
tile("X tile", [190, 900], 84, BLUE, pictPerson); pop(comp.layer("X tile"), w("L0N", 3));
bar("X fill", [262, 958], [928, 958], PROBLEM, 14, w("L0N", 4), w("L0N", 6));
fadeAt(["X card", "X title", "X tile", "X fill"], T.L0M - 0.2, 0.25);   // L0M = the next line: leave before it starts
"X: " + comp.numLayers;

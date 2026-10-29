// Beat E (L05 28.0–33.0): brown + barbershop counter — the three questions, in coral
bleed("M3.png", "M3", 28.0, 45, { s0: 75, s1: 82, op: 24 });
group("B4", "DRIFT");
ws("Your counter", "Your counter.", "Medium", 96, CREAM, [110, 250, 860, 130]); wordReveal(comp.layer("Your counter"), [w("L05", 3), w("L05", 4)]);
var Q = [["Q1", "Cash only?", [330, 640], [380, 112], w("L05", 5)],
         ["Q2", "Which app?", [730, 820], [380, 112], w("L05", 7)],
         ["Q3", "Transfer first, then show me the screenshot?", [540, 1060], [920, 176], w("L05", 9)]];
for (var i = 0; i < 3; i++) {
  var q = Q[i];
  card(q[0], q[2], q[3], 50, PROBLEM); pop(comp.layer(q[0]), q[4], 0.2);
  inc(q[0] + " text", q[1], "SemiBold", 44, CREAM, [q[2][0] - q[3][0] / 2 + 30, q[2][1] - q[3][1] / 2 + 22, q[3][0] - 60, q[3][1] - 30], "center");
  life(comp.layer(q[0] + " text"), q[4] + 0.08, null, 0.1);
}
"E: " + comp.numLayers;

// Beat F (L06 33.9–41.1): every question is friction → the bubbles strike out → Zero-Question Checkout → the question
fadeAt(["Your counter"], 33.7, 0.3);
ws("Friction", "Every question at the counter is a little friction.", "Medium", 60, CREAM, [110, 230, 880, 170]);
wordReveal(comp.layer("Friction"), WT.L06.slice(0, 9));
var Q = [["Q1", [330, 640], 380], ["Q2", [730, 820], 380], ["Q3", [540, 1060], 920]];
for (var i = 0; i < 3; i++) {
  var t = w("L06", 10) + i * 0.3, q = Q[i];
  bar(q[0] + " strike", [q[1][0] - q[2] / 2 + 20, q[1][1]], [q[1][0] + q[2] / 2 - 20, q[1][1]], CREAM, 8, t, t + 0.2);
  fadeAt([q[0], q[0] + " text", q[0] + " strike"], t + 0.35, 0.25);
}
ws("Asks none", "The best checkout asks none.", "SemiBold", 60, ANSWER, [110, 420, 880, 90]);
wordReveal(comp.layer("Asks none"), WT.L06.slice(9, 14));
fadeTo(["Friction", "Asks none"], 38.1, 22, 0.3);
concept("Zero-Question", "Checkout.", 720, [w("L06", 16), w("L06", 17)], [w("L06", 18)], WT.L06.slice(19), "How many does yours ask?", ANSWER, 110);
"F: " + comp.numLayers;

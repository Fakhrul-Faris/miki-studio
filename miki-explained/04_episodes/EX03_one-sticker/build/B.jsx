// Beat B (L02 5.4–12.9): a row of app stickers on a counter; your app isn't there → cash
group("B2", "DRIFT");
var APPS = ["Wallet A", "Wallet B", "Bank C", "Wallet D", "Bank E"], SX = [168, 354, 540, 726, 912];
for (var i = 0; i < 5; i++) {
  var n = "Sticker " + (i + 1), t = w("L02", 4) + i * 0.3;
  card(n + " card", [SX[i], 860], [166, 210], 22); pop(comp.layer(n + " card"), t);
  tile(n, [SX[i], 830], 110, i % 2 ? [1, 0.93, 0.9] : CARD, pictQR); pop(comp.layer(n), t + 0.04);
  inc(n + " label", APPS[i], "SemiBold", 32, INK, [SX[i] - 80, 905, 160, 44], "center"); life(comp.layer(n + " label"), t + 0.12, null, 0.12);
}
// the counter they sit on + "your mamak"
bar("Counter", [80, 990], [1000, 990], INK, 6, w("L02", 14) - 0.1, w("L02", 14) + 0.4);
chip("Mamak chip", "Your mamak", [540, 1060], 260, w("L02", 17));
// "if your app wasn't on the wall": a phone with Wallet F → coral ✕ → cash
card("Phone", [820, 1300], [220, 300], 36, INK);
anim(P(comp.layer("Phone")), [[w("L02", 23), [1200, 1300]], [w("L02", 25), [820, 1300]]], 85); life(comp.layer("Phone"), w("L02", 23), null, 0.1);
inc("Phone app", "Wallet F", "SemiBold", 34, CREAM, [720, 1225, 200, 50], "center");
nudge(comp.layer("Phone app"), [[w("L02", 23), [380, 0]], [w("L02", 25), [0, 0]]], 85);
tile("Phone QR", [820, 1330], 96, CREAM, pictQR); nudge(comp.layer("Phone QR"), [[w("L02", 23), [380, 0]], [w("L02", 25), [0, 0]]], 85);
var X = shapeLayer("No match"), xg = grp(X); pathIn(xg, [[760, 1240], [880, 1360]]); pathIn(xg, [[880, 1240], [760, 1360]]); stroke(xg, PROBLEM, 14, 2); trimIn(xg, w("L02", 29), w("L02", 29) + 0.2);
card("Cash", [470, 1300], [260, 140], 18, PROBLEM); pop(comp.layer("Cash"), w("L02", 31));
ws("Cash label", "Cash", "SemiBold", 48, CREAM, [370, 1268, 200, 64], "center"); life(comp.layer("Cash label"), w("L02", 31) + 0.08, null, 0.1);
"B: " + comp.numLayers;

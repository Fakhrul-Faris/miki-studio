// Beat D (L04 15.8–27.4): the row becomes a ring → everyone connects to ONE QR → 3,000,000+ → 2028, single-app codes gone
var HUB = [540, 880], SX = [168, 354, 540, 726, 912];
var RING = [[540, 540], [863, 775], [740, 1155], [340, 1155], [217, 775]];
var MOVE0 = w("L04", 5), MOVE1 = w("L04", 7) + 0.2;          // "made them share"
for (var i = 0; i < 5; i++) {
  var n = "Sticker " + (i + 1), dx = RING[i][0] - SX[i], dy = RING[i][1] - 860;
  var parts = [n + " card", n, n + " label"];
  for (var j = 0; j < 3; j++) nudge(comp.layer(parts[j]), [[MOVE0 + i * 0.05, [0, 0]], [MOVE1 + i * 0.05, [dx, dy]]], 85);
  dashLine("Link " + (i + 1), RING[i], HUB, ANSWER, MOVE1, MOVE1 + 0.5);
  // "any bank, any e-wallet, one sticker": absorbed into the hub
  var a0 = w("L04", 14) + i * 0.12, hx = HUB[0] - SX[i], hy = HUB[1] - 860;
  for (j = 0; j < 3; j++) {
    var L = comp.layer(parts[j]);
    nudge(L, [[a0, [dx, dy]], [a0 + 0.35, [hx, hy]]], 85);
    opac(L, [[a0 + 0.25, 100], [a0 + 0.35, 0]]);
  }
  fadeAt(["Link " + (i + 1)], a0, 0.2);
}
tile("Hub QR", HUB, 220, ANSWER, pictQR); pop(comp.layer("Hub QR"), w("L04", 8));
chip("Hub chip", "DuitNow QR", [540, 712], 260, w("L04", 11));
pulse(comp.layer("Hub QR"), w("L04", 20));
// "over 3 million of them"
var UP = w("L04", 21);
nudge(comp.layer("Hub QR"), [[UP, [0, 0]], [UP + 0.4, [0, -330]]], 85);
nudge(comp.layer("Hub chip"), [[UP, [0, 0]], [UP + 0.4, [0, -330]]], 85); nudge(comp.layer("Hub chip text"), [[UP, [0, 0]], [UP + 0.4, [0, -330]]], 85);
ws("Count", "0", "Light", 190, INK, [40, 770, 1000, 240], "center"); life(comp.layer("Count"), UP + 0.2, null, 0.15);
app.run("prop.setExpression", { layer: comp.layer("Count").index, path: "text/sourceText",
  expression: "var n = Math.round(linear(time, " + w("L04", 24) + ", " + (w("L04", 26) + 0.3) + ", 0, 3000000)); n.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',') + (n >= 3000000 ? '+' : '')" });
inc("Count label", "QR touchpoints across Malaysia", "Medium", 40, MUTED, [80, 1010, 920, 60], "center"); typeOn(comp.layer("Count label"), w("L04", 26), w("L04", 28) + 0.2);
// "by 2028, the single-app codes are gone"
chip("Year chip", "By 30 June 2028", [540, 1140], 330, w("L04", 31));
var GX = [270, 450, 630, 810];
for (i = 0; i < 4; i++) {
  var g = "Single " + (i + 1); tile(g, [GX[i], 1310], 96, [1, 0.93, 0.9], pictQR); pop(comp.layer(g), w("L04", 33) + i * 0.06);
  nudge(comp.layer(g), [[w("L04", 37) + i * 0.05, [0, 0]], [w("L04", 37) + 0.4 + i * 0.05, [0, 140]]], 70);
  opac(comp.layer(g), [[w("L04", 37) + i * 0.05, 100], [w("L04", 37) + 0.4 + i * 0.05, 0]]);
}
bar("Single strike", [210, 1310], [870, 1310], PROBLEM, 10, w("L04", 36), w("L04", 37));
fadeAt(["Single strike"], w("L04", 37) + 0.2, 0.2);
fadeAt(["Count", "Count label", "Year chip", "Year chip text", "Hub chip", "Hub chip text"], 27.2, 0.25);
// zoom-through from the hub (now at y 550)
zoomThrough(550, 27.45, ANSWER);
"D: " + comp.numLayers;

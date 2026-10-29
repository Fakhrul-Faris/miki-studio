// Beat D (L04 17.5–30.4): back to the door → the signal, lamp by lamp → ticket flips it → walks in → 701 → zoom-through
// M1 again: deep push into the real signal, then it dims under the diagram
still("M1.png", "M1 again"); tint("M1 again", 35);
var mA = comp.layer("M1 again"); tf(mA).property("ADBE Anchor Point").setValue([1100, 740]); P(mA).setValue([540, 760]);
anim(tf(mA).property("ADBE Scale"), [[17.4, [80, 80]], [19.0, [240, 240]]], 85);
opac(comp.layer("M1 again"), [[0, 0], [17.4 - F, 0], [17.4, 100], [18.7, 100], [19.1, 14], [28.2, 14], [28.6, 0]]);
// the signal diagram
nul("SIGD", [540, 960]); comp.layer("SIGD").parent = comp.layer("DRIFT");
function inS(n) { comp.layer(n).parent = comp.layer("SIGD"); }
card("Housing", [330, 760], [230, 600], 40, INK); inS("Housing"); pop(comp.layer("Housing"), w("L04", 5), 0.22);
var LAMP = [["Red", RED, 580], ["Yellow", YELLOW, 760], ["Green", ORANGE, 940]];
for (var i = 0; i < 3; i++) {
  var nm = "Lamp " + LAMP[i][0];
  circle(nm + " off", 150, LAMP[i][1], [330, LAMP[i][2]], true); inS(nm + " off");
  opac(comp.layer(nm + " off"), [[0, 0], [w("L04", 7) - F, 0], [w("L04", 7), 22]]);
  circle(nm, 150, LAMP[i][1], [330, LAMP[i][2]], true); inS(nm);
}
// labels to the right of each lamp
var LAB = [["Label Green", "Go straight in", 940], ["Label Yellow", "5–10 min", 760], ["Label Red", "15+ min", 580]];
for (i = 0; i < 3; i++) { ws(LAB[i][0], LAB[i][1], "Medium", 58, INK, [480, LAB[i][2] - 40, 560, 80]); inS(LAB[i][0]); }
// lamp states over time: [t, which] — green, yellow, red as named; the ticket flips red → yellow; then green for the walk-in
var G0 = w("L04", 8), Y0 = w("L04", 12), R0 = w("L04", 17), SC = w("L04", 28), WI = w("L04", 29);  // 28 "scanned", 29 "so"
function lampOn(nm, ranges) { var k = [[0, 0]]; for (var r = 0; r < ranges.length; r++) { k.push([ranges[r][0] - F, 0], [ranges[r][0], 100], [ranges[r][1] - F, 100], [ranges[r][1], 0]); } opac(comp.layer(nm), k); }
lampOn("Lamp Green", [[G0, Y0], [WI, 28.3]]);
lampOn("Lamp Yellow", [[Y0, R0], [SC, WI]]);
lampOn("Lamp Red", [[R0, SC]]);
function labOn(nm, t, tOff) { opac(comp.layer(nm), [[0, 0], [t - F, 0], [t, 100], [tOff, 100], [tOff + 0.2, 35]]); }
labOn("Label Green", G0, Y0); labOn("Label Yellow", Y0, R0); labOn("Label Red", R0, SC);
for (i = 0; i < 3; i++) { pulse(comp.layer("Lamp " + LAMP[i][0]), [G0, Y0, R0][2 - i]); }
// "every time a ticket is scanned": a ticket slides to the door and flips the light
card("Ticket", [700, 1290], [300, 130], 20); inS("Ticket");
var TK0 = w("L04", 21), TK1 = w("L04", 26);  // "It" → "ticket"
nudge(comp.layer("Ticket"), [[TK0, [-900, 0]], [TK1, [0, 0]]], 85);
inc("Ticket label", "TICKET", "SemiBold", 22, MUTED, [580, 1245, 240, 34]); inS("Ticket label");
ws("Ticket no", "No. 042", "Medium", 40, INK, [580, 1275, 240, 56]); inS("Ticket no");
nudge(comp.layer("Ticket label"), [[TK0, [-900, 0]], [TK1, [0, 0]]], 85);
nudge(comp.layer("Ticket no"), [[TK0, [-900, 0]], [TK1, [0, 0]]], 85);
ripple("Scan ripple", [700, 1290], SC, ORANGE);
// "so nobody walks in blind": a customer reads green and walks in
bar("Floor", [140, 1410], [940, 1410], INK, 3, WI - 0.3, WI + 0.2); inS("Floor");
tile("Walker", [180, 1360], 84, BLUE, pictPerson); inS("Walker"); pop(comp.layer("Walker"), WI - 0.2);
nudge(comp.layer("Walker"), [[w("L04", 31), [0, 0]], [w("L04", 33) + 0.5, [560, 0]]], 60);  // "walks" → "blind"
fadeAt(["Ticket", "Ticket label", "Ticket no", "Walker", "Floor"], 28.2, 0.3);
fadeAt(["Housing", "Lamp Red off", "Lamp Yellow off", "Lamp Green off", "Lamp Green", "Label Green", "Label Yellow", "Label Red"], 28.2, 0.3);
// "over 700 of these shops"
ws("Count", "0", "Light", 300, INK, [80, 740, 920, 340], "center"); life(comp.layer("Count"), w("L04", 34) - 0.1, null, 0.15);  // "Today"
app.run("prop.setExpression", { layer: comp.layer("Count").index, path: "text/sourceText", expression: "Math.round(linear(time, " + w("L04", 35) + ", " + (w("L04", 38) + 0.2) + ", 0, 701))" });
inc("Count detail", "575 in Japan · 126 overseas", "Medium", 40, MUTED, [80, 1090, 920, 60], "center"); typeOn(comp.layer("Count detail"), w("L04", 39), w("L04", 41) + 0.3);
inc("Count unit", "SHOPS", "SemiBold", 30, ORANGE, [80, 700, 920, 50], "center"); life(comp.layer("Count unit"), w("L04", 41), null, 0.15);
// zoom-through from the count: a green bar swells and darkens to brown
var fl = centred("Fill through", [540, 960]), fg = grp(fl), fr = rectIn(fg, [1200, 20], 0);
var fc = fg.addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color");
fc.setValueAtTime(30.75, ORANGE.concat([1])); fc.setValueAtTime(31.0, BROWN.concat([1]));
anim(fr.property("ADBE Vector Rect Size"), [[30.45, [1200, 20]], [30.8, [1200, 2600]]], 90);
opac(comp.layer("Fill through"), [[0, 0], [30.45 - F, 0], [30.45, 100]]);
comp.layer("Fill through").motionBlur = true;
"D: " + comp.numLayers;

// Beat 4 (L04 14.3–18): hard cut to dark brown — Your shop / day list with Saturday lit / waiting counter
var CUT = 13.75;
comp.layers.addSolid(BROWN, "Brown", W, H, 1); life(comp.layer("Brown"), CUT);
nul("B4", [540, 960]); comp.layer("B4").parent = comp.layer("DRIFT");
function add4(n) { comp.layer(n).parent = comp.layer("B4"); }
var DIM = [0.957, 0.945, 0.918];
ws("Your shop", "Your shop.", "Medium", 96, DIM, [110, 430, 860, 130]); wordReveal(comp.layer("Your shop"), [14.68, 14.88]); add4("Your shop");
var days = ["Thursday", "Friday", "Saturday", "Sunday"];
for (var i = 0; i < 4; i++) {
  var n = "Day " + days[i];
  ws(n, days[i], "Light", 124, DIM, [110, 660 + i * 160, 900, 160]); add4(n);
  opac(comp.layer(n), [[0, 0], [14.95 + i * 0.08, 0], [15.2 + i * 0.08, 22]]);
}
// Saturday lights up orange on "Saturday"
ws("Day Saturday lit", "Saturday", "Light", 124, ORANGE, [110, 980, 900, 160]); add4("Day Saturday lit");
life(comp.layer("Day Saturday lit"), 15.72, null, 0.12);
circle("Active dot", 22, ORANGE, [78, 1068], true); add4("Active dot"); pop(comp.layer("Active dot"), 15.72, 0.18);
// waiting counter chip (contents not parented: parenting does not compensate)
card("Wait chip", [640, 1560], [560, 150], 40, [0.235, 0.2, 0.17]); add4("Wait chip"); pop(comp.layer("Wait chip"), 16.0, 0.25);
tile("Wait tile", [440, 1560], 90, ORANGE, pictPerson); add4("Wait tile"); pop(comp.layer("Wait tile"), 16.15, 0.2);
inc("Wait label", "WAITING", "SemiBold", 26, MUTED, [510, 1506, 380, 40]); add4("Wait label"); life(comp.layer("Wait label"), 16.2, null, 0.15);
ws("Wait count", "1 person", "Medium", 60, ORANGE, [510, 1538, 380, 80]); add4("Wait count"); life(comp.layer("Wait count"), 16.3, null, 0.12);
app.run("prop.setExpression", { layer: comp.layer("Wait count").index, path: "text/sourceText",
  expression: "var n = Math.max(1, Math.round(linear(time, 16.4, 17.6, 1, 6))); n + (n == 1 ? ' person' : ' people')" });
"beat 4: " + comp.numLayers;

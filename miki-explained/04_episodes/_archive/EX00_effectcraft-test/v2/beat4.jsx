// Beat 4 (L04 14.3–18): zoom-through lands in brown — Your shop / Saturday lit / the bench / one walks out
// Safe zones: nothing important below y 1536 or right of x 960.
var CUT = 13.86;
comp.layers.addSolid(BROWN, "Brown", W, H, 1); life(comp.layer("Brown"), CUT);
nul("B4", [540, 960]); comp.layer("B4").parent = comp.layer("DRIFT");
function add4(n) { comp.layer(n).parent = comp.layer("B4"); }
var DIM = [0.957, 0.945, 0.918], CHIP = [0.235, 0.2, 0.17];
// ghost giant word behind everything (scale contrast)
ws("Ghost SATURDAY", "SATURDAY", "Black", 420, DIM, [-260, 560, 1700, 460]); add4("Ghost SATURDAY");
opac(comp.layer("Ghost SATURDAY"), [[0, 0], [15.72, 0], [16.0, 6]]);
nudge(comp.layer("Ghost SATURDAY"), [[15.72, [0, 0]], [18, [-140, 0]]], 20);
ws("Your shop", "Your shop.", "Medium", 96, DIM, [110, 250, 860, 130]); wordReveal(comp.layer("Your shop"), [14.68, 14.88]); add4("Your shop");
var days = ["Thursday", "Friday", "Saturday", "Sunday"];
for (var i = 0; i < 4; i++) {
  var n = "Day " + days[i];
  ws(n, days[i], "Light", 112, DIM, [110, 450 + i * 140, 900, 150]); add4(n);
  opac(comp.layer(n), [[0, 0], [14.95 + i * 0.08, 0], [15.2 + i * 0.08, 22]]);
}
ws("Day Saturday lit", "Saturday", "Light", 112, ORANGE, [110, 730, 900, 150]); add4("Day Saturday lit");
life(comp.layer("Day Saturday lit"), 15.72, null, 0.1);
circle("Active dot", 22, ORANGE, [80, 806], true); add4("Active dot"); pop(comp.layer("Active dot"), 15.72);
// the bench: waiting customers stack up
bar("Bench", [150, 1400], [930, 1400], DIM, 4, 15.85, 16.25); add4("Bench");
var xs = [210, 330, 450, 570, 690];
for (i = 0; i < xs.length; i++) {
  var pn = "Person " + (i + 1);
  tile(pn, [xs[i], 1352], 76, ORANGE, pictPerson); add4(pn); pop(comp.layer(pn), 16.0 + i * 0.12);
  comp.layer(pn).motionBlur = true;
}
// the question every barber hears
card("Bubble", [600, 1215], [560, 100], 50, CHIP); add4("Bubble"); pop(comp.layer("Bubble"), 16.75, 0.2);
inc("Bubble text", "How much longer?", "Medium", 36, DIM, [340, 1192, 520, 50], "center"); add4("Bubble text");
life(comp.layer("Bubble text"), 16.85, null, 0.1);
// one gives up and walks out of frame
var last = comp.layer("Person 5");
P(last).setValueAtTime(17.25, [690, 1352]); P(last).setValueAtTime(17.8, [1260, 1352]); easeAll(P(last), 60);
inc("Minus one", "−1 customer", "SemiBold", 34, ORANGE, [620, 1450, 320, 50], "right"); add4("Minus one");
life(comp.layer("Minus one"), 17.45, null, 0.12);
"beat 4: " + comp.numLayers;

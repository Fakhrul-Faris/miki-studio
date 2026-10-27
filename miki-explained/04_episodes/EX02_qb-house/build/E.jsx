// Beat E (L05 31.3–35.9): brown + the Malaysian doorway — your door, Saturday, a full bench, someone guesses
var CUT = 31.0, DIMC = [0.957, 0.945, 0.918], CHIPC = [0.235, 0.2, 0.17];
comp.layers.addSolid(BROWN, "Brown", W, H, 1); life(comp.layer("Brown"), CUT);
still("M3.png", "M3"); P(comp.layer("M3")).setValue([540, 960]);
anim(tf(comp.layer("M3")).property("ADBE Scale"), [[CUT, [75, 75]], [48, [82, 82]]], 5);
opac(comp.layer("M3"), [[0, 0], [CUT - F, 0], [CUT, 26], [36.5, 26], [37.1, 10]]);
nul("B4", [540, 960]); comp.layer("B4").parent = comp.layer("DRIFT");
function in4(n) { comp.layer(n).parent = comp.layer("B4"); }
ws("Your door", "Your door.", "Medium", 96, DIMC, [110, 250, 860, 130]); in4("Your door"); wordReveal(comp.layer("Your door"), [w("L05", 3), w("L05", 4)]);
card("Sat chip", [215, 430], [210, 60], 30, ORANGE); in4("Sat chip"); pop(comp.layer("Sat chip"), w("L05", 7));
inc("Sat chip text", "Saturday", "SemiBold", 28, INK, [115, 411, 200, 40], "center"); in4("Sat chip text"); life(comp.layer("Sat chip text"), w("L05", 7) + 0.1, null, 0.1);
// the doorway (right) and the bench inside (left)
var DOOR = shapeLayer("Door"), dg = grp(DOOR); pathIn(dg, [[700, 1440], [700, 900], [960, 900], [960, 1440]]); stroke(dg, DIMC, 5, 1); trimIn(dg, w("L05", 4) - 0.1, w("L05", 4) + 0.5); in4("Door");
bar("Bench", [130, 1440], [640, 1440], DIMC, 4, w("L05", 12) - 0.2, w("L05", 12) + 0.2); in4("Bench");
var xs = [180, 290, 400, 510, 620];
for (var i = 0; i < 5; i++) { var pn = "Seated " + (i + 1); tile(pn, [xs[i] - 10, 1392], 76, ORANGE, pictPerson); in4(pn); pop(comp.layer(pn), w("L05", 12) + i * 0.1); }
tile("Visitor", [830, 1380], 96, BLUE, pictPerson); in4("Visitor"); pop(comp.layer("Visitor"), w("L05", 8));
anim(tf(comp.layer("Visitor")).property("ADBE Rotate Z"), [[w("L05", 9), 0], [w("L05", 9) + 0.3, -8]], 70);   // "looks in"
card("Guess bubble", [830, 1225], [120, 110], 55, CHIPC); in4("Guess bubble"); pop(comp.layer("Guess bubble"), w("L05", 16));
ws("Guess mark", "?", "SemiBold", 80, DIMC, [770, 1175, 120, 100], "center"); in4("Guess mark"); life(comp.layer("Guess mark"), w("L05", 16) + 0.08, null, 0.1);
"E: " + comp.numLayers;

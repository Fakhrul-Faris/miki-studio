// SHOT 1B. The Arrow. 48 frames.
// Layers: 1B_floor_and_door (header hole dark), 1B_arrow (the cut-paper ochre strip), 1B_header_glow (the still's own lit hole).
var c = freshComp("1B", 59)   // 56 + 8 under the 2A slide;
var plateL = plate(c, "1B_floor_and_door.png", "1B_floor_and_door", 0);
var arrow = plate(c, "1B_arrow.png", "1B_arrow", -1);
var glow = plate(c, "1B_header_glow.png", "1B_header_hole glow", -1);

// arrow draws itself from the foreground to the threshold, f0–f30, 12fps steps (a mask edge rising, linear)
app.run("comp.open", { comp: "1B" });
app.run("layer.addMask", { layer: arrow.id, shape: "rect", rect: [0, 2560, 1440, 40] });
var mp = arrow.property("ADBE Mask Parade").property(1).property("ADBE Mask Shape");
function top(f, y) { var sh = new Shape(); sh.vertices = [[0, y], [1440, y], [1440, 2600], [0, 2600]]; sh.closed = true; mp.setValueAtTime(f * F, sh); }
for (var f = 0; f <= 30; f += 2) top(f, 2600 - (2600 - 1350) * f / 30);
for (var k = 1; k <= mp.numKeys; k++) mp.setInterpolationTypeAtKey(k, KeyframeInterpolationType.HOLD);

// f36: the header hole steps on to a faint ochre glow, hard cut
keys(O(glow), [[0, 0], [36, 0], [37, 60]]);  // on "in"
for (var g = 1; g <= 3; g++) O(glow).setInterpolationTypeAtKey(g, KeyframeInterpolationType.HOLD);

// camera: hold with a 2% creep push over the whole shot
var cam = camera(c);
smooth(keys(P(cam), [[0, [W / 2, H / 2, camZ(1.3)]], [12, [W / 2, H / 2, camZ(1)]], [58, [W / 2, H / 2, camZ(1.03)]]]), 40);   // lands from the 1A push

overlay(c);
marker(c, 0, "SFX: paper score f0–f30");
marker(c, 37, "SFX: relay click");
for (var j = 1; j <= c.numLayers; j++) { c.layer(j).inPoint = 0; c.layer(j).outPoint = c.duration; }
"1B built";

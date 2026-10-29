// OVERLAY precomp (brief rule 7): grain 7% overlay, paper texture 12% multiply, very subtle vignette.
// Built once, laid on top of every shot as a 2D layer; each shot steps it to 12fps through time remap.
var c = freshComp("OVERLAY", 1272);

var paper = img(c, "paper.png", "paper texture");          // clean cream paper plate, full frame
S(paper).setValue([75, 75]); P(paper).setValue([W / 2, H / 2]);
paper.blendingMode = BlendingMode.MULTIPLY; O(paper).setValue(12);

var grain = c.layers.addSolid([0.5, 0.5, 0.5], "grain", W, H, 1);
grain.property("ADBE Effect Parade").addProperty("ADBE Noise").property(1).setValue(60);
grain.blendingMode = BlendingMode.OVERLAY; O(grain).setValue(7);

var vig = c.layers.addSolid([0, 0, 0], "vignette", W, H, 1);
app.run("comp.open", { comp: "OVERLAY" });
app.run("layer.addMask", { layer: vig.id, shape: "ellipse", rect: [-140, -160, W + 280, H + 320] });
var m = vig.property("ADBE Mask Parade").property(1);
m.inverted = true; m.property("ADBE Mask Feather").setValue([520, 520]);
vig.blendingMode = BlendingMode.MULTIPLY; O(vig).setValue(18);

for (var i = 1; i <= c.numLayers; i++) { c.layer(i).inPoint = 0; c.layer(i).outPoint = c.duration; }
"OVERLAY built";

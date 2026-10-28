// SHOT 3B. Struck Out. 36 frames. Technique test.
// Layers (back to front): 3B_paper_bg, 3B_tear_patch (the 4A hole: match cut, option A), 3B_STRIP precomp (strip + SPEED + strike).
// Camera: smooth pull-back 100% → 92% over 36 frames (not stepped). Strike f0–f6, peel f12–f22 around the strip's right edge.

// --- strip precomp: two mirrored halves of the real torn strip, native SPEED, the real brush strike revealed by a stepped wipe
var SW = 1500, SH = 762, SY = 911;                         // strip art: source rows 911–1673, cut at x=750 and mirrored
var sc = freshComp("3B_STRIP", 32, SW, SH);
var a = img(sc, "3B_strip.png", "strip left");  P(a).setValue([720, 1280 - SY]);
var b = img(sc, "3B_strip.png", "strip right"); P(b).setValue([780, 1280 - SY]); S(b).setValue([-100, 100]);
var word = text(sc, "SPEED", "SPEED", "Anton", "Regular", 400, INK, [0, 95, SW, 560], "center", 10);
word.blendingMode = BlendingMode.MULTIPLY;
misreg(word, 4, 3, 50);
var strike = img(sc, "3B_strike.png", "strike");          // brush stroke cut from the still (x 17–835, y 1222–1344)
A(strike).setValue([17, 1283]); P(strike).setValue([130, 1283 - SY]); S(strike).setValue([151, 100]);
var wipe = strike.property("ADBE Effect Parade").addProperty("ADBE Linear Wipe");
wipe.property(2).setValue(270);                             // reveal left to right
stepped(keys(wipe.property(1), [[10, 100], [14, 0]]), "out");
for (var i = 1; i <= sc.numLayers; i++) { sc.layer(i).inPoint = 0; sc.layer(i).outPoint = sc.duration; }

// --- shot comp
var c = freshComp("3B", 32);
var bg = threeD(img(c, "3B_paper_bg.png", "3B_paper_bg"), 0);
P(bg).setValue([W / 2, H / 2, 0]); S(bg).setValue([160, 160, 160]);          // 82% so the 92% pull-back never shows an edge

var PATCH = 33.8, PZ = -1;                                                // hole fits under the strip's opaque band
var patch = threeD(img(c, "3B_tear_patch.png", "3B_tear_patch"), PZ);
A(patch).setValue([753, 1271, 0]); P(patch).setValue([W / 2, H / 2, PZ]); S(patch).setValue([PATCH, PATCH, PATCH]);

var strip = c.layers.add(sc); strip.name = "3B_strip";
threeD(strip, -20);
A(strip).setValue([SW, 379, 0]); S(strip).setValue([90, 90, 90]);
var X0 = W / 2 + (SW / 2) * 0.9;                                          // right edge, so the strip centres on the frame
keys(P(strip), [[0, [X0, H / 2, -20]], [18, [X0, H / 2, -20]], [28, [2750, H / 2, -20]]]); stepped(P(strip), "in");
keys(R(strip), [[0, 0], [18, 0], [28, 25]]); stepped(R(strip), "in");
app.run("comp.open", { comp: "3B" });
app.run("layer.style.dropShadow", { layers: [strip.index] });
var sh = { useGlobalLight: false, angle: 120, distance: 8, size: 14, opacity: 28 };
for (var k in sh) app.run("prop.set", { layer: strip.id, path: "layerStyles/dropShadow/" + k, value: sh[k] });

var cam = camera(c);
smooth(keys(P(cam), [[0, [W / 2, H / 2 + 630, camZ(1.08)]], [8, [W / 2, H / 2, camZ(0.985)]], [31, [W / 2, H / 2, camZ(0.92)]]]), 60);
smooth(keys(tf(cam).property("ADBE Anchor Point"), [[0, [W / 2, H / 2 + 630, 0]], [8, [W / 2, H / 2, 0]]]), 60);   // SPEED registered with 3A's, then settles

overlay(c);
marker(c, 18, "SFX: paper rip");
for (var j = 1; j <= c.numLayers; j++) { c.layer(j).inPoint = 0; c.layer(j).outPoint = c.duration; }

// the hole's on-screen scale at the last frame: 4A must open at exactly this (match cut)
var endScale = PATCH * ZOOM / (PZ - camZ(0.92));
"3B built. Hole at f35: centre (540, 960), scale " + endScale.toFixed(3) + "% of the 4A source";

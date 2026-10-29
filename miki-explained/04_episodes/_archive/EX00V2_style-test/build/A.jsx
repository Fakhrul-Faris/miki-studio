// EX00V2 style test: 2D velocity → 3D orbit ring → hub → spiral absorb + particles → crane over a field → 2D shatter
clearComp(); importLines(["L01"]);
comp.bgColor = NAVY;
app.run("comp.settings", { comp: COMPNAME, renderer: "advanced3D", shutterAngle: 200 });
function wt(i) { return w("L01", i); }
function to3D(n, p) { comp.layer(n).threeDLayer = true; var l = comp.layer(n); P(l).setValue(p); return comp.layer(n); }
var C3 = [540, 960, 0], IN = 1.62;

// ---- S1 (2D velocity): words slam in on curved paths, then whip up
var WD = [["That's", [90, 640, 560, 170], 0, [-900, -260]], ["not", [610, 640, 400, 170], 1, [900, -180]],
          ["what", [90, 800, 500, 170], 2, [-900, 220]], ["happened.", [90, 960, 900, 170], 3, [900, 300]]];
for (var i = 0; i < 4; i++) {
  var d = WD[i]; ws("S1 " + d[0], d[0], "Black", 140, CREAM, d[1]);
  var L = comp.layer("S1 " + d[0]); L.motionBlur = true;
  nudge(L, [[wt(d[2]) - 0.12, d[3]], [wt(d[2]) + 0.14, [0, 0]], [1.45, [0, 0]], [1.62, [0, -1500]]], 92);
  opac(comp.layer("S1 " + d[0]), [[0, 0], [wt(d[2]) - 0.12 - F, 0], [wt(d[2]) - 0.12, 100]]);
  anim(tf(comp.layer("S1 " + d[0])).property("ADBE Rotate Z"), [[wt(d[2]) - 0.12, (i % 2 ? 8 : -8)], [wt(d[2]) + 0.14, 0]], 90);
}
bar("S1 strike", [80, 1080], [80, 1080], PROBLEM, 12);   // placeholder layer kept tiny (no-op)

// ---- 3D set: floor, camera, light
app.run("layer.new3dPrimitive", { kind: "plane", name: "Floor", width: 7000, height: 7000, position: [540, 1250, 1200], baseColor: [0.08, 0.09, 0.12], roughness: 0.95 });
tf(comp.layer("Floor")).property("ADBE Orientation").setValue([90, 0, 0]);
opac(comp.layer("Floor"), [[0, 0], [IN - F, 0], [IN, 100]]);
comp.layers.addLight("Key", [540, 960]); P(comp.layer("Key")).setValue([300, -300, -700]);   // high, so flat floor tiles catch light
comp.layers.addLight("Fill", [540, 960]);
try { comp.layer("Fill").lightType = LightType.AMBIENT; comp.layer("Fill").property("ADBE Light Options Group").property("ADBE Light Intensity").setValue(55); } catch (x) { writeLn("ambient: " + x); }
comp.layers.addCamera("Cam", [540, 960]);
var cam = comp.layer("Cam"), cP = P(cam), cA = tf(comp.layer("Cam")).property("ADBE Anchor Point");
var CK = [[IN, [540, 1200, -1900], C3], [2.9, [260, 1080, -1650], C3], [3.8, [540, 980, -1350], C3], [5.3, [580, 960, -1380], C3],
          [6.9, [860, 880, -1500], C3], [7.6, [860, 880, -1500], C3], [8.9, [540, 150, -1450], [540, 1150, 400]], [12.5, [540, 130, -1500], [540, 1150, 430]]];   // camera stays above the floor (y 1250)
for (i = 0; i < CK.length; i++) { cP.setValueAtTime(CK[i][0], CK[i][1]); cA.setValueAtTime(CK[i][0], CK[i][2]); }
easeAll(cP, 85); easeAll(cA, 85);
comp.layer("Cam").motionBlur = true;

// ---- S2/S4 (3D): five app cards scattered in depth → orbit ring on "share" → spiral into the hub on "any bank, any e-wallet"
var S0 = [[180, 700, 700], [900, 620, 300], [260, 1180, -250], [860, 1220, 520], [560, 480, 950]];
var T0 = wt(6), T1 = wt(7) + 0.5, SP = wt(14);
for (i = 0; i < 5; i++) {
  var n = "App " + (i + 1);
  tile(n, [0, 0], 170, i % 2 ? [1, 0.93, 0.9] : CARD, pictQR); to3D(n, S0[i]);
  var a0 = (i * 72) * Math.PI / 180, s = S0[i], ab0 = SP + i * 0.12, ab1 = ab0 + 0.85;
  P(comp.layer(n)).expression =
    "var a = " + a0 + " + Math.max(0, time - " + T0 + ") * 1.25;" +
    "var R = linear(time, " + ab0 + ", " + ab1 + ", 400, 0);" +
    "var ring = [540 + R * Math.cos(a), 960 + 50 * Math.sin(a * 2), R * Math.sin(a)];" +
    "var k = ease(time, " + T0 + ", " + T1 + ", 0, 1);" +
    "[" + s[0] + " + (ring[0] - " + s[0] + ") * k, " + s[1] + " + (ring[1] - " + s[1] + ") * k, " + s[2] + " + (ring[2] - " + s[2] + ") * k]";
  try { comp.layer(n).autoOrient = AutoOrientType.CAMERA_OR_POINT_OF_INTEREST; } catch (x) {}
  pop(comp.layer(n), IN + 0.05 + i * 0.06, 0.2);
  var sc = tf(comp.layer(n)).property("ADBE Scale"); sc.setValueAtTime(ab0, [100, 100]); sc.setValueAtTime(ab1, [25, 25]);
  opac(comp.layer(n), [[0, 0], [IN + 0.05 + i * 0.06 - F, 0], [IN + 0.05 + i * 0.06, 100], [ab1 - 0.1, 100], [ab1, 0]]);
  comp.layer(n).motionBlur = true;
}
// ---- S3 (3D): the hub, a green slab with a QR face, rises on "One national QR"
app.run("layer.new3dPrimitive", { kind: "cube", name: "Hub", width: 270, height: 270, depth: 60, position: [540, 960, 32], baseColor: [0.13, 0.64, 0.37], roughness: 0.35, metallic: 0.1 });
tile("Hub face", [0, 0], 270, ANSWER, pictQR); to3D("Hub face", [540, 960, 0]);
var HB = wt(8);
for (var h = 0; h < 2; h++) {
  var hn = h ? "Hub face" : "Hub", hp = h ? [540, 960, 0] : [540, 960, 32];
  var hs = tf(comp.layer(hn)).property("ADBE Scale");
  hs.setValueAtTime(HB, [0, 0, 0]); hs.setValueAtTime(HB + 0.3, [112, 112, 112]); hs.setValueAtTime(HB + 0.45, [100, 100, 100]);
  hs.setValueAtTime(wt(20), [100, 100, 100]); hs.setValueAtTime(wt(20) + 0.12, [118, 118, 118]); hs.setValueAtTime(wt(20) + 0.3, [100, 100, 100]); easeAll(hs, 80);
  anim(tf(comp.layer(hn)).property("ADBE Rotate Y"), [[HB, -40], [HB + 0.6, 0], [wt(20), 0], [wt(20) + 0.5, 360]], 85);
}
chip("Hub chip", "DuitNow QR", [540, 1290], 300, wt(11));
fadeAt(["Hub chip", "Hub chip text"], wt(20) + 0.5, 0.25);
// particles burst when the apps are absorbed
comp.layers.addSolid([0, 0, 0], "Burst", 1080, 1920, 1);
var pw = comp.layer("Burst").property("ADBE Effect Parade").addProperty("CC Particle World");
var br = comp.layer("Burst").property("ADBE Effect Parade").property(1).property("Birth Rate");
br.setValueAtTime(0, 0); br.setValueAtTime(wt(19) - F, 0); br.setValueAtTime(wt(19), 6); br.setValueAtTime(wt(20) + 0.25, 0);

// ---- S5 (3D): crane up over a field of green QR tiles to the horizon; 2D count on top
var k2 = 0;
for (var gx = 0; gx < 8; gx++) for (var gz = 0; gz < 8; gz++) {
  var fn = "Field " + (++k2), fx = -540 + gx * 300, fz = -100 + gz * 330;
  tile(fn, [0, 0], 110, ANSWER, pictQR); to3D(fn, [fx, 1248, fz]);
  tf(comp.layer(fn)).property("ADBE Orientation").setValue([-90, 0, 0]);   // face up
  var dist = Math.sqrt(Math.pow(fx - 540, 2) + Math.pow(fz, 2)), tt = wt(21) + dist * 0.00045;
  opac(comp.layer(fn), [[0, 0], [tt - F, 0], [tt, 100]]); pop(comp.layer(fn), tt, 0.22);
}
ws("Count", "0", "Light", 190, CREAM, [40, 330, 1000, 240], "center"); life(comp.layer("Count"), wt(21) + 0.2, null, 0.15);
app.run("prop.setExpression", { layer: comp.layer("Count").index, path: "text/sourceText",
  expression: "var n = Math.round(linear(time, " + wt(25) + ", " + (wt(26) + 0.3) + ", 0, 3000000)); n.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',') + (n >= 3000000 ? '+' : '')" });
inc("Count label", "QR touchpoints across Malaysia", "Medium", 40, CREAM, [80, 570, 920, 60], "center"); typeOn(comp.layer("Count label"), wt(26), wt(28) + 0.2);

// ---- S6 (2D): navy wipes over, 2028, the single-app codes shatter
comp.layers.addSolid(NAVY, "Navy", 1080, 1920, 1);
var nv = comp.layer("Navy"); var nvS = tf(nv).property("ADBE Scale");
nvS.setValueAtTime(wt(29) - 0.25, [100, 0]); nvS.setValueAtTime(wt(29) + 0.05, [100, 100]); easeAll(nvS, 90);
opac(comp.layer("Navy"), [[0, 0], [wt(29) - 0.25 - F, 0], [wt(29) - 0.25, 100]]);
chip("Year", "By 30 June 2028", [540, 820], 360, wt(31));
var GX = [240, 420, 600, 780];
for (i = 0; i < 4; i++) {
  var g = "Single " + (i + 1); tile(g, [GX[i] + 60, 1080], 150, [1, 0.93, 0.9], pictQR); pop(comp.layer(g), wt(33) + i * 0.07);
  var ang = (i - 1.5) * 0.7, gone = wt(37);
  nudge(comp.layer(g), [[gone, [0, 0]], [gone + 0.45, [Math.sin(ang) * 900, 700 + Math.abs(i - 1.5) * 200]]], 30);
  anim(tf(comp.layer(g)).property("ADBE Rotate Z"), [[gone, 0], [gone + 0.45, (i - 1.5) * 70]], 30);
  comp.layer(g).motionBlur = true;
}
// coral shards radiate from the centre on "gone"
for (i = 0; i < 10; i++) {
  var sh = "Shard " + (i + 1), aa = i * 36 * Math.PI / 180;
  var sl = centred(sh, [540, 1080]), sg = grp(sl); pathIn(sg, [[0, -18], [10, 14], [-10, 14]], true); fill(sg, PROBLEM);
  nudge(comp.layer(sh), [[wt(37), [0, 0]], [wt(37) + 0.55, [Math.cos(aa) * 620, Math.sin(aa) * 620]]], 20);
  opac(comp.layer(sh), [[0, 0], [wt(37) - F, 0], [wt(37), 100], [wt(37) + 0.45, 100], [wt(37) + 0.6, 0]]);
  anim(tf(comp.layer(sh)).property("ADBE Rotate Z"), [[wt(37), 0], [wt(37) + 0.55, 260]], 20);
  comp.layer(sh).motionBlur = true;
}
"A: " + comp.numLayers;

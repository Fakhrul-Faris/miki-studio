// EX00V3 flow test. One thread: a sticker → five apps orbiting → they merge into one green QR → it's one of a field of
// three million → the single-app (coral) ones dissolve. Camera always moving slowly. No bounce, no bursts.
clearComp(); importLines(["L01"]);
function wt(i) { return w("L01", i); }
var CEN = [540, 860];
var cam = camera("CAM");
// the camera: slow push through the first half, a long pull-back on "Today", then a slow drift
var cs = tf(comp.layer("CAM")).property("ADBE Scale");
cs.setValueAtTime(0, [100, 100]); cs.setValueAtTime(7.5, [114, 114]); cs.setValueAtTime(9.6, [34, 34]); cs.setValueAtTime(13.5, [37, 37]);
soft(cs, 92);
var cp = P(comp.layer("CAM"));
cp.setValueAtTime(0, [540, 960]); cp.setValueAtTime(7.5, [540, 990]); cp.setValueAtTime(9.6, [540, 1010]); cp.setValueAtTime(13.5, [520, 1000]);
soft(cp, 92);
function cam_(n) { comp.layer(n).parent = comp.layer("CAM"); }

// ---- S1: one sticker drifts in; the line writes in calmly
var TINT = [CARD, [1, 0.95, 0.9], [0.92, 0.95, 1], [1, 0.97, 0.88], [0.95, 0.92, 1]];
tile("App 1", CEN, 210, TINT[0], pictQR); shadow(comp.layer("App 1"), 18, 60, 10); cam_("App 1");
enter(comp.layer("App 1"), 0.15, 0.9);
ws("Line", "That's not what happened.", "SemiBold", 72, INK, [90, 1140, 900, 100], "center");
calmReveal(comp.layer("Line"), [wt(0), wt(1), wt(2), wt(3)]);
leave(comp.layer("Line"), 1.55, 0.45, -24);

// ---- S2: it becomes five; they glide out on curved paths into a ring that turns slowly ("made them share")
for (var i = 2; i <= 5; i++) { tile("App " + i, CEN, 210, TINT[i - 1], pictQR); shadow(comp.layer("App " + i), 18, 60, 10); cam_("App " + i); }
var R = 330, T0 = wt(4), SPIN = 0.32, M0 = wt(8), M1 = wt(10) + 0.55;      // ring forms on "Malaysia", merges on "One national QR"
for (i = 1; i <= 5; i++) {
  var a0 = (-90 + (i - 1) * 72) * Math.PI / 180, st = T0 + (i - 1) * 0.07;
  P(comp.layer("App " + i)).expression =
    "function dec(t, a, d) { var k = Math.min(1, Math.max(0, (t - a) / d)); return 1 - Math.pow(1 - k, 3); }" +
    "var out = dec(time, " + st + ", 0.95), inn = dec(time, " + (M0 + (i - 1) * 0.06) + ", 0.8);" +
    "var r = " + R + " * out * (1 - inn), a = " + a0 + " + Math.max(0, time - " + T0 + ") * " + SPIN + " + out * 0.6;" +
    "[" + CEN[0] + " + r * Math.cos(a), " + CEN[1] + " + r * Math.sin(a)]";
  if (i > 1) opac(comp.layer("App " + i), [[0, 0], [st - F, 0], [st, 100]]);
  var sc = tf(comp.layer("App " + i)).property("ADBE Scale");
  sc.setValueAtTime(st, [70, 70]); sc.setValueAtTime(st + 0.9, [78, 78]); sc.setValueAtTime(M0, [78, 78]); sc.setValueAtTime(M1, [100, 100]); soft(sc);
  opac(comp.layer("App " + i), [[M1 - 0.2, 100], [M1 + 0.1, 0]]);
}
inc("Share", "Every app. One code.", "Medium", 46, MUTED, [90, 1330, 900, 70], "center"); calmReveal(comp.layer("Share"), [wt(5), wt(6), wt(7)]);
leave(comp.layer("Share"), M0 - 0.1, 0.4, -16);

// ---- S3: they merge into ONE green QR (a cross-fade morph at the same place and size)
tile("One", CEN, 210, ANSWER, pictQR); shadow(comp.layer("One"), 18, 60, 14); cam_("One");
opac(comp.layer("One"), [[0, 0], [M1 - 0.25, 0], [M1 + 0.15, 100]]);
var b1 = blurFx(comp.layer("One")); b1.setValueAtTime(M1 - 0.25, 10); b1.setValueAtTime(M1 + 0.3, 0); soft(b1);
ws("DuitNow", "DuitNow QR", "SemiBold", 64, INK, [90, 1110, 900, 90], "center"); calmReveal(comp.layer("DuitNow"), [wt(11), wt(13)]);
// ---- S4: four thin lines reach in from bank / e-wallet labels, then draw back into the code ("one sticker")
var SRC = [["Bank", [210, 560]], ["E-wallet", [870, 560]], ["Bank", [200, 1440]], ["E-wallet", [880, 1440]]], tL = [wt(14), wt(16), wt(14) + 0.2, wt(16) + 0.2];
for (i = 0; i < 4; i++) {
  var s = SRC[i], nm = "Src " + (i + 1);
  inc(nm, s[0], "SemiBold", 36, MUTED, [s[1][0] - 110, s[1][1] - 24, 220, 50], "center"); cam_(nm); enter(comp.layer(nm), tL[i] - 0.1, 0.6);
  var ln = shapeLayer("Link " + (i + 1)), lg = grp(ln); pathIn(lg, [s[1], CEN]); stroke(lg, ANSWER, 3, 2);
  var tr = lg.addProperty("ADBE Vector Filter - Trim"), te = tr.property("ADBE Vector Trim End"), ts = tr.property("ADBE Vector Trim Start");
  te.setValueAtTime(tL[i], 0); te.setValueAtTime(tL[i] + 0.7, 100); soft(te);
  ts.setValueAtTime(wt(19), 0); ts.setValueAtTime(wt(20) + 0.5, 100); soft(ts);
  cam_("Link " + (i + 1));
  leave(comp.layer(nm), wt(19), 0.5);
}
leave(comp.layer("DuitNow"), wt(21) - 0.3, 0.5, -16);

// ---- S5: the long pull-back — it's one of a field (2D grid fades in from the centre outward as the camera retreats)
var k = 0;
for (var gx = -5; gx <= 5; gx++) for (var gy = -9; gy <= 9; gy++) {
  if (gx == 0 && gy == 0) continue;
  var gp = [CEN[0] + gx * 300, CEN[1] + gy * 300], coral = ((gx * 7 + gy * 13) % 9 == 0);
  var gn = "Field " + (++k); tile(gn, gp, 210, coral ? [0.98, 0.84, 0.8] : ANSWER, pictQR); cam_(gn);
  var dist = Math.sqrt(gx * gx + gy * gy), t1 = wt(21) + 0.2 + dist * 0.11;
  opac(comp.layer(gn), [[0, 0], [t1, 0], [t1 + 0.6, coral ? 90 : 72]]);
  if (coral) { comp.layer(gn).comment = "single-app"; }
}
// a calm cream panel holds the numbers above the busy field (screen space, not under the camera)
card("Panel", [540, 410], [940, 360], 44, CREAM); enter(comp.layer("Panel"), wt(21) + 0.5, 0.9);
ws("Count", "0", "Light", 170, INK, [40, 260, 1000, 220], "center"); enter(comp.layer("Count"), wt(22), 0.7);
app.run("prop.setExpression", { layer: comp.layer("Count").index, path: "text/sourceText",
  expression: "var k = Math.min(1, Math.max(0, (time - " + wt(25) + ") / 1.2)); k = 1 - Math.pow(1 - k, 3); var n = Math.round(k * 3000000); n.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',') + (n >= 3000000 ? '+' : '')" });
inc("Count label", "QR touchpoints across Malaysia", "Medium", 40, MUTED, [80, 480, 920, 60], "center"); calmReveal(comp.layer("Count label"), [wt(26), wt(27), wt(28)]);
// ---- S6: 2028 — the single-app (coral) codes dissolve in a soft wave; the count steps aside
leave(comp.layer("Count"), wt(29) - 0.2, 0.5, -20); leave(comp.layer("Count label"), wt(29) - 0.2, 0.5, -20);
ws("Year", "By 30 June 2028", "SemiBold", 64, INK, [80, 300, 920, 90], "center"); calmReveal(comp.layer("Year"), [wt(30), wt(31)]);
inc("Year note", "single-app QR codes are switched off", "Medium", 40, MUTED, [80, 400, 920, 60], "center"); calmReveal(comp.layer("Year note"), WT.L01.slice(32, 37));
for (var j = 1; j <= k; j++) {
  var fl = comp.layer("Field " + j); if (fl.comment != "single-app") continue;
  var tg = wt(37) + (j % 7) * 0.06; leave(comp.layer("Field " + j), tg, 0.6, 30);
}
"A: " + comp.numLayers;

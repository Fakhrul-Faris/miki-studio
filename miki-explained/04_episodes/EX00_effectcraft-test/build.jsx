// EX00 — EffectCraft test build. Run:
// effectcraft-cli script build.jsx --empty --save-as EX00.ecproj
// Timings come from audio/words.json (whisper word starts, corrected with silencedetect pauses).

var DIR = "/Users/user/Private/miki-studio/miki-explained/04_episodes/EX00_effectcraft-test/";
var W = 1080, H = 1920, FPS = 24, DUR = 18;

var CREAM = [0.965, 0.945, 0.902], INK = [0.078, 0.078, 0.078], GREY = [0.62, 0.60, 0.56];
var RED = [0.851, 0.231, 0.231], DARK = [0.055, 0.055, 0.055];
function hex(c) { var s = "#"; for (var i = 0; i < 3; i++) { var h = Math.round(c[i] * 255).toString(16); s += (h.length < 2 ? "0" : "") + h; } return s; }

// line start times in comp seconds
var T1 = 0.5, T2 = 4.8, T3 = 9.2, T4 = 14.3;

var comp = app.project.items.addComp("EX00", W, H, 1, DUR, FPS);
comp.bgColor = CREAM;
app.run("comp.open", { comp: "EX00" });

function tf(l) { return l.property("ADBE Transform Group"); }
function ease(p) {
  var n = p.value instanceof Array ? p.value.length : 1, e = [], i;
  for (i = 0; i < n; i++) e.push(new KeyframeEase(0, 75));
  for (i = 1; i <= p.numKeys; i++) p.setTemporalEaseAtKey(i, e, e);
}
function fadeIn(l, t, d) { var o = tf(l).property("ADBE Opacity"); o.setValueAtTime(t, 0); o.setValueAtTime(t + (d || 0.15), 100); }
function fadeOut(l, t, d) { var o = tf(l).property("ADBE Opacity"); o.setValueAtTime(t, 100); o.setValueAtTime(t + (d || 0.3), 0); }

// Text through the native command (the script font property falls back silently).
function text(name, str, font, style, size, color, box, justify, tracking, leading) {
  app.run("layer.newText", { text: str, name: name, font: font, style: style, size: size, fill: hex(color),
    box: box, justify: justify || "center", tracking: tracking || 0, leading: leading || Math.round(size * 1.05) });
  return comp.layer(1);
}
function heavy(name, str, size, color, box, justify) { return text(name, str, "Work Sans", "Black", size, color, box, justify, -10); }
function detail(name, str, size, color, box, justify) { return text(name, str, "Inclusive Sans", "SemiBold", size, color, box, justify, 60); }

// D02 word-locked reveal: each word fades + rises over 0.12s at its spoken time.
function wordReveal(l, times) {
  var a = l.property("ADBE Text Properties").property("ADBE Text Animators").addProperty("ADBE Text Animator");
  var ap = a.property("ADBE Text Animator Properties");
  ap.addProperty("ADBE Text Opacity").setValue(0);
  ap.addProperty("ADBE Text Position 3D").setValue([0, 28, 0]);
  var sel = a.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
  sel.property("advanced").property("basedOn").setValue(3);
  sel.property("advanced").property("smoothness").setValue(100);
  var st = sel.property("start"), n = times.length;
  st.setValueAtTime(0, 0);
  var F = 1 / FPS;
  for (var i = 0; i < n; i++) {
    var next = i + 1 < n ? times[i + 1] : times[i] + 1;
    var d = Math.max(F, Math.min(0.12, next - times[i] - 2 * F));
    if (times[i] - F > 0) st.setValueAtTime(times[i] - F, i / n * 100);
    st.setValueAtTime(times[i] + d, (i + 1) / n * 100);
  }
}
// D03 typewriter by characters.
function typeOn(l, t0, t1) {
  var a = l.property("ADBE Text Properties").property("ADBE Text Animators").addProperty("ADBE Text Animator");
  a.property("ADBE Text Animator Properties").addProperty("ADBE Text Opacity").setValue(0);
  var sel = a.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
  sel.property("advanced").property("basedOn").setValue(1);
  sel.property("advanced").property("smoothness").setValue(0);
  sel.property("start").setValueAtTime(t0, 0);
  sel.property("start").setValueAtTime(t1, 100);
}

// Shape layer in comp coordinates (position and anchor at 0,0).
function shapeLayer(name) {
  var s = comp.layers.addShape(); s.name = name;
  tf(s).property("ADBE Position").setValue([0, 0]); tf(s).property("ADBE Anchor Point").setValue([0, 0]);
  return s;
}
function grp(s) { return s.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group").property("ADBE Vectors Group"); }
// D05 line draw-on via Trim Paths.
function line(name, pts, color, width, t0, t1, inT, outT) {
  var s = shapeLayer(name), g = grp(s);
  var sh = new Shape(); sh.vertices = pts; sh.closed = false;
  if (inT) sh.inTangents = inT; if (outT) sh.outTangents = outT;
  g.addProperty("ADBE Vector Shape - Group").property("ADBE Vector Shape").setValue(sh);
  var st = g.addProperty("ADBE Vector Graphic - Stroke");
  st.property("ADBE Vector Stroke Color").setValue(color); st.property("ADBE Vector Stroke Width").setValue(width);
  st.property("ADBE Vector Stroke Line Cap").setValue(2);
  var tr = g.addProperty("ADBE Vector Filter - Trim").property("ADBE Vector Trim End");
  tr.setValueAtTime(t0, 0); tr.setValueAtTime(t1, 100);
  return s;
}
function circle(name, size, color, pos, filled, width) {
  var s = comp.layers.addShape(); s.name = name; var g = grp(s);
  g.addProperty("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([size, size]);
  if (filled) g.addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(color);
  else { var st = g.addProperty("ADBE Vector Graphic - Stroke"); st.property("ADBE Vector Stroke Color").setValue(color); st.property("ADBE Vector Stroke Width").setValue(width || 3); }
  tf(s).property("ADBE Position").setValue(pos);
  return s;
}
// D07/D17 ripple: two rings expand and fade.
function ripple(name, pos, t, color) {
  for (var i = 0; i < 2; i++) {
    var r = circle(name + " " + (i + 1), 30, color, pos, false, 3), t0 = t + i * 0.14;
    var sc = tf(r).property("ADBE Scale"); sc.setValueAtTime(t0, [100, 100]); sc.setValueAtTime(t0 + 0.55, [420, 420]);
    var o = tf(r).property("ADBE Opacity"); o.setValueAtTime(0, 0); o.setValueAtTime(t0 - 1 / FPS, 0); o.setValueAtTime(t0, 90); o.setValueAtTime(t0 + 0.55, 0);
  }
}

// ---------- audio ----------
var names = ["L01", "L02", "L03", "L04"], starts = [T1, T2, T3, T4];
for (var a = 0; a < 4; a++) {
  app.run("file.import", { paths: [DIR + "audio/" + names[a] + ".mp3"], addToComp: true, time: starts[a] });
}

// ---------- Beat 1: hook (L01) ----------
var hook = heavy("Hook", "HOUSTON AIRPORT FIXED ITS COMPLAINTS BY MAKING PEOPLE WALK FURTHER.", 96, INK, [80, 660, 920, 600]);
wordReveal(hook, [T1 + 0.00, T1 + 0.26, T1 + 0.60, T1 + 0.96, T1 + 1.20, T1 + 2.29, T1 + 2.38, T1 + 2.56, T1 + 2.84, T1 + 3.10]);
// D08 defocus chapter break
var blur = hook.property("ADBE Effect Parade").addProperty("ADBE Gaussian Blur 2");
var bl = blur.property(1); bl.setValueAtTime(4.30, 0); bl.setValueAtTime(4.70, 60);
fadeOut(hook, 4.35, 0.35);

// ---------- Beat 2: timeline chart (L02) ----------
// 8 minutes across x 140..940 (100 px per minute), axis at y 1000.
var X0 = 190, PX = 88, Y = 1000;
function mx(m) { return X0 + m * PX; }
var kicker = detail("Kicker", "HOUSTON AIRPORT · BAGGAGE CLAIM", 38, GREY, [60, 640, 960, 70]);
typeOn(kicker, T2, T2 + 0.6);
var axis = line("Axis", [[mx(0), Y], [mx(8), Y]], INK, 3, T2 + 0.1, T2 + 0.8);
for (var m = 0; m <= 8; m++) {
  var tk = line("Tick " + m, [[mx(m), Y - 12], [mx(m), Y + 12]], INK, 3, T2 + 0.2 + m * 0.06, T2 + 0.3 + m * 0.06);
}
var lab0 = detail("Label 0", "0", 34, INK, [mx(0) - 40, Y + 30, 80, 50]); fadeIn(lab0, T2 + 0.5);
var lab8 = detail("Label 8", "8 MIN", 34, INK, [mx(8) - 90, Y + 30, 180, 50]); fadeIn(lab8, T2 + 0.9);
// walking: grey, 0→1 min, on "walked one minute"
var walk = line("Walk", [[mx(0), Y - 34], [mx(1), Y - 34]], GREY, 22, T2 + 0.44, T2 + 1.26);
var walkL = detail("Walk label", "WALKING · 1 MIN", 36, GREY, [mx(0) - 10, Y - 120, 520, 60], "left"); typeOn(walkL, T2 + 0.72, T2 + 1.3);
// standing: red, 1→8 min, on "stood there for seven"
var stand = line("Stand", [[mx(1), Y - 34], [mx(8), Y - 34]], RED, 22, T2 + 2.72, T2 + 3.6);
var standL = detail("Stand label", "STANDING · 7 MIN", 36, RED, [mx(8) - 520, Y + 90, 540, 60], "right"); typeOn(standL, T2 + 3.2, T2 + 3.8);

// ---------- Beat 3: same 8 minutes → push in → arc pointer (L03) ----------
var brk = line("Bracket", [[mx(0), Y - 150], [mx(0), Y - 170], [mx(8), Y - 170], [mx(8), Y - 150]], INK, 3, T3, T3 + 0.6);
var brkL = detail("Bracket label", "SAME 8 MINUTES", 36, INK, [mx(0), Y - 240, 704, 60]); typeOn(brkL, T3 + 0.15, T3 + 0.75);

// camera: parent the chart to a null, push in on the red segment
var CX = mx(4), CY = Y - 34;
var cam = comp.layers.addNull(); cam.name = "CAM";
tf(cam).property("ADBE Anchor Point").setValue([50, 50]);
tf(cam).property("ADBE Position").setValue([CX, CY]);
var chart = ["Kicker", "Axis", "Label 0", "Label 8", "Walk", "Walk label", "Stand", "Stand label", "Bracket", "Bracket label"];
for (m = 0; m <= 8; m++) chart.push("Tick " + m);
for (var c = 0; c < chart.length; c++) comp.layer(chart[c]).parent = cam;
var S = 1.3, PUSH0 = T3 + 1.42, PUSH1 = T3 + 2.4;
var cs = tf(cam).property("ADBE Scale"); cs.setValueAtTime(PUSH0, [100, 100]); cs.setValueAtTime(PUSH1, [S * 100, S * 100]); ease(cs);
var cp = tf(cam).property("ADBE Position"); cp.setValueAtTime(PUSH0, [CX, CY]); cp.setValueAtTime(PUSH1, [540, 1180]); ease(cp);
fadeOut(comp.layer("Kicker"), PUSH0, 0.3);
// screen position of a chart point after the push
function scr(x, y) { return [540 + (x - CX) * S, 1180 + (y - CY) * S]; }

// arc pointer (D07): from the red segment up to the annotation, lands with a ripple
var from = scr(mx(3), Y - 34), to = [130, 640];
var DOT0 = T3 + 2.35, DOT1 = T3 + 2.85;
var dot = circle("Pointer", 26, RED, from, true);
var dp = tf(dot).property("ADBE Position");
dp.setValueAtTime(DOT0, from); dp.setValueAtTime(DOT1, to);
dp.setSpatialTangentsAtKey(1, [0, 0], [-40, -320]); dp.setSpatialTangentsAtKey(2, [140, -60], [0, 0]);
var de = new KeyframeEase(0, 80); dp.setTemporalEaseAtKey(2, [de], [de]);
fadeIn(dot, DOT0 - 0.12, 0.12);
var trail = line("Pointer trail", [from, to], RED, 3, DOT0, DOT1, [[0, 0], [140, -60]], [[-40, -320], [0, 0]]);
var tst = trail.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").property("ADBE Vector Graphic - Stroke");
var dashes = tst.property("ADBE Vector Stroke Dashes");
if (dashes) { try { dashes.addProperty("ADBE Vector Stroke Dash 1").setValue(10); dashes.addProperty("ADBE Vector Stroke Gap 1").setValue(12); } catch (e) { writeLn("dash: " + e); } }
ripple("Ripple", to, DOT1, RED);
// annotation types from the landing point
var ann = heavy("Annotation", "THE PART PEOPLE HATED.", 64, INK, [175, 605, 840, 80], "left");
wordReveal(ann, [T3 + 2.93, T3 + 3.12, T3 + 3.30, T3 + 3.54]);
var annD = detail("Annotation detail", "7 OF 8 MINUTES, STANDING STILL.", 36, RED, [178, 690, 860, 60], "left");
typeOn(annD, T3 + 3.95, T3 + 4.6);

// ---------- Beat 4: flip to dark (L04) ----------
var darkBg = comp.layers.addSolid(DARK, "Dark", W, H, 1);
var wipe = darkBg.property("ADBE Effect Parade").addProperty("ADBE Linear Wipe");
var wc = wipe.property(1); wc.setValueAtTime(13.75, 100); wc.setValueAtTime(14.2, 0); ease(wc);
var yours = heavy("Your shop", "YOUR SHOP.", 110, CREAM, [80, 700, 920, 140]);
wordReveal(yours, [T4 + 0.38, T4 + 0.58]);
var sat = heavy("Saturday", "ON A SATURDAY.", 110, RED, [80, 840, 920, 140]);
wordReveal(sat, [T4 + 1.23, T4 + 1.32, T4 + 1.42]);
var bench = line("Bench", [[340, 1200], [740, 1200]], CREAM, 3, T4 + 1.5, T4 + 2.0);
var cust = circle("Customer", 30, RED, [540, 1178], true);
var cpos = tf(cust).property("ADBE Position"); cpos.setValueAtTime(T4 + 2.0, [540, 1100]); cpos.setValueAtTime(T4 + 2.3, [540, 1178]); ease(cpos);
fadeIn(cust, T4 + 1.95, 0.12);
ripple("Wait ripple", [540, 1178], T4 + 2.35, RED);
ripple("Wait ripple again", [540, 1178], T4 + 3.2, RED);

writeLn("layers: " + comp.numLayers);
"built";

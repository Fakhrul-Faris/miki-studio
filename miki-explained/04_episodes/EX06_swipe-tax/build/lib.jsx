// EX06 "The Swipe Tax" (kit copied forward): shared helpers for the headless shot builds.
// Brief: ../_archive/EX02_qb-house/instruction.md (overrides in media-to-generate.md and the episode memory: 9:16, stop after every shot).
// Each shot script rebuilds its own comps from scratch, so it can be rerun safely.
var W = 1080, H = 1920, FPS = 24, F = 1 / 24;
var DIR = "/Users/user/Private/miki-studio/miki-explained/04_episodes/EX06_swipe-tax/";
var PAPER = [0xEF / 255, 0xE8 / 255, 0xDC / 255], INK = [0x11 / 255, 0x11 / 255, 0x11 / 255], OCHRE = [0xC9 / 255, 0x8A / 255, 0x2B / 255];
var ZOOM = 1500;   // default camera zoom for a 1080-wide comp: a layer at z=0 shows at 100% when the camera sits at z=-ZOOM

function item(name) { for (var i = 1; i <= app.project.numItems; i++) if (app.project.item(i).name == name) return app.project.item(i); return null; }
function freshComp(name, frames, w, h) { var c = item(name); if (c) c.remove(); c = app.project.items.addComp(name, w || W, h || H, 1, frames / FPS, FPS); c.bgColor = PAPER; return c; }
function footage(file) { var it = item(file); if (!it) { app.run("file.import", { paths: [DIR + "layers/" + file], sequence: false, addToComp: false }); it = item(file); } return it; }
function img(c, file, name) { var l = c.layers.add(footage(file)); l.name = name; return l; }
function tf(l) { return l.property("ADBE Transform Group"); }
function P(l) { return tf(l).property("ADBE Position"); }
function S(l) { return tf(l).property("ADBE Scale"); }
function A(l) { return tf(l).property("ADBE Anchor Point"); }
function R(l) { return tf(l).property("ADBE Rotate Z"); }
function O(l) { return tf(l).property("ADBE Opacity"); }
function keys(p, k) { for (var i = 0; i < k.length; i++) p.setValueAtTime(k[i][0] * F, k[i][1]); return p; }   // k = [[frame, value], …]

// Two clocks: every element steps on 12fps (posterizeTime) with the brief's curves. The camera never gets this.
//   out = expo ease-out 1 - 2^(-10t)   in = cubic ease-in   lin = linear (mechanical motion)
function stepped(p, mode) {
  var q = mode == "in" ? "t * t * t" : mode == "lin" ? "t" : "1 - Math.pow(2, -10 * t)";
  p.expression = "posterizeTime(12);\nvar n = numKeys;\nif (n < 2 || time <= key(1).time) { value; } else if (time >= key(n).time) { key(n).value; } else {\n" +
    "  var i = 1; while (i < n - 1 && key(i + 1).time <= time) i++;\n" +
    "  var a = key(i), b = key(i + 1), t = (time - a.time) / (b.time - a.time), q = " + q + ";\n  add(a.value, mul(sub(b.value, a.value), q));\n}";
  return p;
}
function smooth(p, inf) { var e = [], n = p.value instanceof Array ? p.value.length : 1, i; for (i = 0; i < n; i++) e.push(new KeyframeEase(0, inf || 60)); for (i = 1; i <= p.numKeys; i++) p.setTemporalEaseAtKey(i, e, e); return p; }

function camera(c, name) { var cam = c.layers.addCamera(name || "Camera", [W / 2, H / 2]); P(cam).setValue([W / 2, H / 2, -ZOOM]); return cam; }
// camera z that shows the z=0 plane at scale s
function camZ(s) { return -ZOOM / s; }
function threeD(l, z) { l.threeDLayer = true; var p = P(l).value; P(l).setValue([p[0], p[1], z || 0]); return l; }

function text(c, name, str, font, style, size, color, box, justify, tracking) {
  app.run("comp.open", { comp: c.name });
  app.run("layer.newText", { text: str, name: name, font: font, style: style, size: size, fill: hex(color), box: box,
    justify: justify || "center", tracking: tracking || 0, leading: Math.round(size * 1.05) });
  return c.layer(1);
}
function hex(col) { var s = "#"; for (var i = 0; i < 3; i++) { var h = Math.round(col[i] * 255).toString(16); s += (h.length < 2 ? "0" : "") + h; } return s; }
// Misregistration: a multiplied copy of a headline, offset a few px (brief rule 4).
function misreg(l, dx, dy, opac) { var d = l.duplicate(); d.name = l.name + " misreg"; var p = P(d).value; P(d).setValue(p.length == 3 ? [p[0] + dx, p[1] + dy, p[2]] : [p[0] + dx, p[1] + dy]); d.blendingMode = BlendingMode.MULTIPLY; var o = O(d); for (var k = o.numKeys; k >= 1; k--) o.removeKey(k); o.setValue(opac || 50); return d; }
function marker(c, frame, comment) { app.run("comp.open", { comp: c.name }); app.run("comp.addMarker", { time: frame * F, comment: comment }); }
// freeze (frame, optional): the grain holds from that frame on, for time-hold shots
function overlay(c, freeze) { var l = c.layers.add(item("OVERLAY")); l.name = "OVERLAY"; l.timeRemapEnabled = true;
  l.property("ADBE Time Remapping").expression = "Math.floor(" + (freeze ? "Math.min(time, " + freeze * F + ")" : "time") + " * 12) / 12"; return l; }
// Stamp (brief rule 4): instant cut-on at frame f, scale 118% → 100% in 2 frames. Anchor goes to the text's centre first.
function stamp(l, f, from) {
  var r = l.sourceRectAtTime(0, false), a = [r.left + r.width / 2, r.top + r.height / 2], p = P(l).value;
  A(l).setValue(l.threeDLayer ? [a[0], a[1], 0] : a);
  P(l).setValue(l.threeDLayer ? [p[0] + a[0], p[1] + a[1], p[2]] : [p[0] + a[0], p[1] + a[1]]);
  var s0 = from || 118, s = l.threeDLayer ? function (v) { return [v, v, v]; } : function (v) { return [v, v]; };
  stepped(keys(S(l), [[f, s(s0)], [f + 2, s(100)]]), "out");
  if (f > 0) keys(O(l), [[0, 0], [f - 1, 0], [f, 100]]).setInterpolationTypeAtKey(1, KeyframeInterpolationType.HOLD);
  return l;
}
// Fit a full-canvas 1440×2560 still into the 9:16 comp at depth z, so it frames exactly like the still at the start
function plate(c, file, name, z) { var l = threeD(img(c, file, name), z); var k = 75 * (ZOOM + z) / ZOOM; S(l).setValue([k, k, k]); P(l).setValue([W / 2, H / 2, z]); return l; }

// Hold keys (hard cuts): k = [[frame, value], …]
function hold(p, k) { keys(p, k); for (var i = 1; i <= p.numKeys; i++) p.setInterpolationTypeAtKey(i, KeyframeInterpolationType.HOLD); return p; }
function onFrom(l, f) { if (f > 0) hold(O(l), [[0, 0], [f, O(l).value]]); return l; }
function onBetween(l, f0, f1) { var v = O(l).value; hold(O(l), f0 > 0 ? [[0, 0], [f0, v], [f1, 0]] : [[0, v], [f1, 0]]); return l; }
// source pixel of a 1440×2560 still → comp px (z=0 plates at 75%)
function sp(x, y) { return [x * 0.75, y * 0.75]; }
// Native light (brief: radial glow, screen): a feathered ellipse solid, 2D comp-space
function glowLayer(c, name, pos, r, col, opac) {
  var g = c.layers.addSolid(col, name, W, H, 1);
  app.run("comp.open", { comp: c.name });
  app.run("layer.addMask", { layer: g.id, shape: "ellipse", rect: [pos[0] - r, pos[1] - r, 2 * r, 2 * r] });
  g.property("ADBE Mask Parade").property(1).property("ADBE Mask Feather").setValue([r * 0.9, r * 0.9]);
  g.blendingMode = BlendingMode.SCREEN; O(g).setValue(opac || 100); return g;
}
// Colour wash (overlay 25%) with an ellipse mask expanding from the light over 4 frames (expo, stepped)
function washLayer(c, name, pos, col, f0) {
  var g = c.layers.addSolid(col, name, W, H, 1);
  app.run("comp.open", { comp: c.name });
  app.run("layer.addMask", { layer: g.id, shape: "ellipse", rect: [pos[0] - 10, pos[1] - 10, 20, 20] });
  var m = g.property("ADBE Mask Parade").property(1); m.property("ADBE Mask Feather").setValue([300, 300]);
  var mp = m.property("ADBE Mask Shape");
  function circ(f, r) { var sh = new Shape(), k = 0.5523 * r, x = pos[0], y = pos[1];
    sh.vertices = [[x, y - r], [x + r, y], [x, y + r], [x - r, y]]; sh.inTangents = [[-k, 0], [0, -k], [k, 0], [0, k]]; sh.outTangents = [[k, 0], [0, k], [-k, 0], [0, -k]]; sh.closed = true; mp.setValueAtTime(f * F, sh); }
  if (f0 > 0) circ(0, 10);
  var R = 2600, steps = [[f0, 0.75], [f0 + 2, 0.97], [f0 + 4, 1]];   // 1 - 2^(-10t) at the 12fps steps
  for (var i = 0; i < steps.length; i++) circ(steps[i][0], Math.max(10, R * steps[i][1]));
  for (var j = 1; j <= mp.numKeys; j++) mp.setInterpolationTypeAtKey(j, KeyframeInterpolationType.HOLD);
  g.blendingMode = BlendingMode.OVERLAY; O(g).setValue(25); if (f0 > 0) onFrom(g, f0); return g;
}
// Characters cut on: n chars, one every `per` frames from f0 (hold keys, no fades)
function cutOn(l, f0, per, n) {
  var a = l.property("ADBE Text Properties").property("ADBE Text Animators").addProperty("ADBE Text Animator");
  a.property("ADBE Text Animator Properties").addProperty("ADBE Text Opacity").setValue(0);
  var sel = a.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
  sel.property("advanced").property("basedOn").setValue(1); sel.property("advanced").property("smoothness").setValue(0);
  var st = sel.property("start"), k = [[0, 0]];
  for (var i = 1; i <= n; i++) k.push([f0 + (i - 1) * per, i / n * 100]);
  if (f0 == 0) k.shift();
  hold(st, k); return l;
}
// Rect mask on a text layer's own bounds, revealed in hold steps: dir "lr" or "tb"; steps = [[frame, fraction], …]
function maskReveal(c, l, dir, steps) {
  var r = l.sourceRectAtTime(0, false), x0 = r.left - 10, y0 = r.top - 30, w = r.width + 20, h = r.height + 60;
  app.run("comp.open", { comp: c.name });
  app.run("layer.addMask", { layer: l.id, shape: "rect", rect: [x0, y0, w, h] });
  var mp = l.property("ADBE Mask Parade").property(1).property("ADBE Mask Shape");
  function at(f, q) { var sh = new Shape(), q2 = Math.max(0.001, q);
    var x1 = dir == "lr" ? x0 + w * q2 : x0 + w, y1 = dir == "tb" ? y0 + h * q2 : y0 + h;
    sh.vertices = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]; sh.closed = true; mp.setValueAtTime(f * F, sh); }
  if (steps[0][0] > 0) at(0, 0);
  for (var i = 0; i < steps.length; i++) at(steps[i][0], steps[i][1]);
  for (var j = 1; j <= mp.numKeys; j++) mp.setInterpolationTypeAtKey(j, KeyframeInterpolationType.HOLD);
  return l;
}
function finishComp(c) { for (var j = 1; j <= c.numLayers; j++) { c.layer(j).inPoint = 0; c.layer(j).outPoint = c.duration; } }
// a 2D cut-out still placed exactly over its plate, anchored at source point a
function cut2D(c, file, name, a) { var l = img(c, file, name); A(l).setValue(a); P(l).setValue(sp(a[0], a[1])); S(l).setValue([75, 75]); return l; }

// Segment 4 signal colours (only 4B–4F)
var GREEN = [0x27 / 255, 0xD4 / 255, 0x5A / 255], YELLOW = [0xF5 / 255, 0xC5 / 255, 0x18 / 255], RED = [0xE5 / 255, 0x32 / 255, 0x2D / 255];
var LAMP = [574, 660];                                  // the header lamp in the 4B–4D stills (source 765, 880)
function signalLight(c, col, fOn, pos, r) {
  var g = glowLayer(c, "light", pos || LAMP, r || 120, col, 100); threeD(g, -3);
  var w = washLayer(c, "wash", pos || LAMP, col, fOn); threeD(w, -3);
  if (fOn > 0) onFrom(g, fOn);
  return [g, w];
}
function label(c, str, f) {
  var t = text(c, str, str, "Anton", "Regular", 92, INK, [640, 560, 250, 110], "center", 10);
  threeD(t, -2); t.blendingMode = BlendingMode.MULTIPLY; stamp(t, f); var m = misreg(t, 4, 3, 50); onFrom(m, f); return t;
}
// tilt-up with parallax, slightly closer so the 80 px tilt never shows a plate edge
// g0/G: this shot's place in one continuous tilt that runs across 4B, 4C and 4D (G frames in all)
function tiltCam(c, frames, g0, G) {
  var cam = camera(c), D = ZOOM / 1.06, poi = tf(cam).property("ADBE Anchor Point");
  function y(g) { return H / 2 + 40 - 80 * g / (G - 1); }
  keys(P(cam), [[0, [W / 2, y(g0), -D]], [frames - 1, [W / 2, y(g0 + frames - 1), -D]]]);
  keys(poi, [[0, [W / 2, y(g0), 0]], [frames - 1, [W / 2, y(g0 + frames - 1), 0]]]);
  return cam;
}
function bob(l, f0, f1, amp, every) { var p = P(l), v = p.value, k = [], up = false;   // stepped bob: holds, never eases
  for (var f = f0; f <= f1; f += every) { k.push([f, [v[0], v[1] - (up ? amp : 0), v[2]]]); up = !up; }
  return k; }
// Words cut on with the voice: one hold key per word start (frames relative to the shot)
function cutWords(l, frames) {
  var a = l.property("ADBE Text Properties").property("ADBE Text Animators").addProperty("ADBE Text Animator");
  a.property("ADBE Text Animator Properties").addProperty("ADBE Text Opacity").setValue(0);
  var sel = a.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
  sel.property("advanced").property("basedOn").setValue(3); sel.property("advanced").property("smoothness").setValue(0);
  var k = [[0, 0]], n = frames.length;
  for (var i = 0; i < n; i++) k.push([frames[i], (i + 1) / n * 100]);
  if (frames[0] == 0) k.shift();
  hold(sel.property("start"), k); return l;
}

// ---- EX01V3 additions -----------------------------------------------------------------
// Paper background plate (2D)
function paperBg(c) { var l = img(c, "paper.png", "paper"); S(l).setValue([75, 75]); P(l).setValue([W / 2, H / 2]); return l; }
// Clock hands at hub (comp px), length k × base, ticking on 12fps steps (two ticks a second). 3D at z when z given.
function hands(c, hub, k, z) {
  function hand(name, len, wid, rot) {
    var s = c.layers.addShape(); s.name = name; A(s).setValue([0, 0]); P(s).setValue(hub);
    var g = s.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group").property("ADBE Vectors Group");
    var r = g.addProperty("ADBE Vector Shape - Rect"); r.property("ADBE Vector Rect Size").setValue([wid * k, len * k]);
    r.property("ADBE Vector Rect Position").setValue([0, -len * k / 2 + 8 * k]); r.property("ADBE Vector Rect Roundness").setValue(wid * k / 2);
    g.addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(INK);
    R(s).expression = rot;
    if (z !== undefined) { s.threeDLayer = true; P(s).setValue([hub[0], hub[1], z]); }
    return s;
  }
  var hr = hand("hour hand", 170, 22, "posterizeTime(12); -60 + Math.floor(time * 2) * 2.5");
  var mn = hand("minute hand", 270, 16, "posterizeTime(12); 60 + Math.floor(time * 2) * 30");
  var hb = c.layers.addShape(); hb.name = "hub"; A(hb).setValue([0, 0]); P(hb).setValue(hub);
  var g = hb.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group").property("ADBE Vectors Group");
  g.addProperty("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([44 * k, 44 * k]);
  g.addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(OCHRE);
  if (z !== undefined) { hb.threeDLayer = true; P(hb).setValue([hub[0], hub[1], z - 0.1]); }
  return [hr, mn, hb];
}
// A ring of arcs around ctr: each arc [name, colour, width, startPct, endPct]; returns the trim properties
function ring(c, name, ctr, r, arcs) {
  var s = c.layers.addShape(); s.name = name; A(s).setValue([0, 0]); P(s).setValue(ctr);
  var out = {};
  for (var i = 0; i < arcs.length; i++) {
    var a = arcs[i], g = s.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group").property("ADBE Vectors Group");
    g.addProperty("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([2 * r, 2 * r]);
    var st = g.addProperty("ADBE Vector Graphic - Stroke"); st.property("ADBE Vector Stroke Color").setValue(a[1]); st.property("ADBE Vector Stroke Width").setValue(a[2]); st.property("ADBE Vector Stroke Line Cap").setValue(1);
    var tr = g.addProperty("ADBE Vector Filter - Trim"); tr.property("ADBE Vector Trim Start").setValue(a[3]); tr.property("ADBE Vector Trim End").setValue(a[4]);
    out[a[0]] = tr;
  }
  return out;
}
// A filled disc (paper sticker) behind a ring
function disc(c, name, ctr, r, col) { var s = c.layers.addShape(); s.name = name; A(s).setValue([0, 0]); P(s).setValue(ctr);
  var g = s.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group").property("ADBE Vectors Group");
  g.addProperty("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([2 * r, 2 * r]);
  g.addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(col || PAPER); return s; }
// An ink line (strike / rule) drawn with a stepped trim
function inkLine(c, name, p0, p1, w, f0, f1, col) { var s = c.layers.addShape(); s.name = name; P(s).setValue([0, 0]); A(s).setValue([0, 0]);
  var g = s.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group").property("ADBE Vectors Group"), sh = new Shape();
  sh.vertices = [p0, p1]; sh.closed = false; g.addProperty("ADBE Vector Shape - Group").property("ADBE Vector Shape").setValue(sh);
  var st = g.addProperty("ADBE Vector Graphic - Stroke"); st.property("ADBE Vector Stroke Color").setValue(col || INK); st.property("ADBE Vector Stroke Width").setValue(w); st.property("ADBE Vector Stroke Line Cap").setValue(2);
  stepped(keys(g.addProperty("ADBE Vector Filter - Trim").property("ADBE Vector Trim End"), [[f0, 0], [f1, 100]]), "lin"); return s; }
// z: put the word and its misregistered copy in 3D at that depth (both, or the camera leaves the copy behind)
function headline(c, name, str, size, box, f, z) { var t = text(c, name, str, "Anton", "Regular", size, INK, box, "center", 10);
  t.blendingMode = BlendingMode.MULTIPLY; if (z !== undefined) threeD(t, z); stamp(t, f); onFrom(misreg(t, 4, 3, 50), f); return t; }
function mono(c, name, str, size, box, justify) { return text(c, name, str, "IBM Plex Mono", "Bold", size, INK, box, justify || "center", 40); }
function shadowLayer(c, l, dist, size, op) { app.run("comp.open", { comp: c.name }); app.run("layer.style.dropShadow", { layers: [l.index] });
  var v = { useGlobalLight: false, angle: 120, distance: dist || 12, size: size || 26, opacity: op || 40 }; for (var q in v) app.run("prop.set", { layer: l.id, path: "layerStyles/dropShadow/" + q, value: v[q] }); }
// a photo print laid on paper: scale (%), centre, rotation
function photo(c, file, name, sc, ctr, rot) { var l = img(c, file, name); S(l).setValue([sc, sc]); P(l).setValue(ctr); R(l).setValue(rot || 0); shadowLayer(c, l, 14, 30, 45); return l; }
var HUB = sp(724, 1000);   // clock hub in the 1A plate, comp px
// Complaint slips with a hand-written complaint, rotated and moving with the slip (the note is parented to it)
var SLIPS = [[250, 960, -12, "8 min at the\rbelt. AGAIN!"], [520, 900, 8, "Just standing\rthere. Useless."], [800, 980, -4, "WHERE ARE\rMY BAGS??"],
  [380, 1110, 14, "Waited forever.\rNever again."], [670, 1130, -10, "Bored stiff at\rbaggage claim"], [230, 1260, 6, "Why so\rslow?!"],
  [520, 1290, -16, "Nothing to do\rbut wait."], [810, 1250, 10, "Worst arrival\rever."]];
function slipNote(c, i) {
  var d = SLIPS[i], s = img(c, "CO_complaint_slip.png", "slip " + (i + 1));
  A(s).setValue([655, 999]); S(s).setValue([21, 21]); P(s).setValue([d[0], d[1]]); R(s).setValue(d[2]); shadowLayer(c, s, 6, 12, 35);
  var t = text(c, "complaint " + (i + 1), d[3], "Bradley Hand", "Bold", 28, INK, [d[0] - 95, d[1] - 55, 190, 110], "center", 0);
  t.blendingMode = BlendingMode.MULTIPLY;
  var r = t.sourceRectAtTime(0, false), a = [r.left + r.width / 2, r.top + r.height / 2], p = P(t).value;
  A(t).setValue(a); P(t).setValue([d[0], d[1] - 6]); R(t).setValue(d[2]);
  t.parent = c.layer("slip " + (i + 1));                 // compensating parent: the note keeps its place, then rides the slip
  return [c.layer("slip " + (i + 1)), c.layer("complaint " + (i + 1))];
}
// rotate a laid-out text layer about a comp point (e.g. a tilted card's centre)
function tiltAbout(l, ctr, deg) { var a = A(l).value, p = P(l).value; A(l).setValue([a[0] + ctr[0] - p[0], a[1] + ctr[1] - p[1]]); P(l).setValue(ctr); R(l).setValue(deg); return l; }

// ---- EX06 additions -----------------------------------------------------------------
var CREAM = [0.98, 0.96, 0.92], NOTEPAPER = [0.91, 0.87, 0.78], DEEP = [0.62, 0.42, 0.13];
// A1 stop-motion: stepped curve on 12fps plus a per-step random jitter (the boil); works with or without keys
function boilStep(p, mode, seed, amp) {
  var q = mode == "in" ? "t * t * t" : mode == "lin" ? "t" : "1 - Math.pow(2, -10 * t)";
  var d = p.value instanceof Array ? p.value.length : 1;
  var j = d == 1 ? "random(-A, A)" : d == 2 ? "[random(-A, A), random(-A, A)]" : "[random(-A, A), random(-A, A), 0]";
  p.expression = "posterizeTime(12);\nvar n = numKeys, v = value;\nif (n >= 2 && time > key(1).time) {\n  if (time >= key(n).time) v = key(n).value; else {\n" +
    "    var i = 1; while (i < n - 1 && key(i + 1).time <= time) i++;\n    var a = key(i), b = key(i + 1), t = (time - a.time) / (b.time - a.time), q = " + q + ";\n" +
    "    v = add(a.value, mul(sub(b.value, a.value), q));\n  }\n}\nseedRandom(" + seed + " + Math.floor(time * 12), true);\nvar A = " + amp + ";\nadd(v, " + j + ");";
  return p;
}
function boil(l, seed, px, deg, mode) { boilStep(P(l), mode || "out", seed, px); if (deg) boilStep(R(l), mode || "out", seed + 101, deg); return l; }
function grp(l) { return l.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group").property("ADBE Vectors Group"); }
function rectIn(g, size, pos, fill, stroke, sw, round) {
  var r = g.addProperty("ADBE Vector Shape - Rect"); r.property("ADBE Vector Rect Size").setValue(size);
  if (pos) r.property("ADBE Vector Rect Position").setValue(pos); if (round) r.property("ADBE Vector Rect Roundness").setValue(round);
  if (stroke) { var st = g.addProperty("ADBE Vector Graphic - Stroke"); st.property("ADBE Vector Stroke Color").setValue(stroke); st.property("ADBE Vector Stroke Width").setValue(sw || 3); }
  if (fill) g.addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(fill);
}
function ellIn(g, size, pos, fill, stroke, sw) {
  var e = g.addProperty("ADBE Vector Shape - Ellipse"); e.property("ADBE Vector Ellipse Size").setValue(size);
  if (pos) e.property("ADBE Vector Ellipse Position").setValue(pos);
  if (stroke) { var st = g.addProperty("ADBE Vector Graphic - Stroke"); st.property("ADBE Vector Stroke Color").setValue(stroke); st.property("ADBE Vector Stroke Width").setValue(sw || 3); }
  if (fill) g.addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(fill);
}
function shapeAt(c, name, ctr) { var s = c.layers.addShape(); s.name = name; A(s).setValue([0, 0]); P(s).setValue(ctr); return s; }
// paper coins: top view (two rings) and side view (for stacks); later groups render behind earlier ones
function coinTop(c, name, ctr, r) { var s = shapeAt(c, name, ctr); ellIn(grp(s), [1.5 * r, 1.5 * r], null, null, INK, 2.5); ellIn(grp(s), [2 * r, 2 * r], null, OCHRE, INK, 4); return s; }
function coinSide(c, name, ctr, w, h) { var s = shapeAt(c, name, ctr);
  rectIn(grp(s), [w - 8, h * 0.38], [0, h * 0.22], DEEP, null, 0, 2); rectIn(grp(s), [w, h], null, OCHRE, INK, 3, h / 2); return s; }
// a banded bundle of notes, side view (the tower bricks)
function brick(c, name, ctr, w, h) { var s = shapeAt(c, name, ctr);
  rectIn(grp(s), [74, h], null, OCHRE, INK, 2); rectIn(grp(s), [w - 16, 2], [0, -h * 0.22], INK); rectIn(grp(s), [w - 16, 2], [0, h * 0.2], INK);
  rectIn(grp(s), [w, h], null, NOTEPAPER, INK, 3, 3); return s; }
// a paper strip with mono type on it (labels); returns [strip, text]
function chip(c, name, str, ctr, w, size, f, fill, rot) {
  var n = str.split("\r").length, h = Math.round(size * 1.15 * n + size * 0.9);
  var s = shapeAt(c, name + " strip", ctr); rectIn(grp(s), [w, h], null, fill || CREAM, INK, 2); R(s).setValue(rot || 0); shadowLayer(c, s, 6, 12, 35);
  var th = Math.round(size * 1.05 * n);
  var t = text(c, name, str, "IBM Plex Mono", "Bold", size, INK, [ctr[0] - w / 2 + 12, ctr[1] - th / 2 - size * 0.18, w - 24, th + size], "center", 30);
  if (rot) tiltAbout(t, ctr, rot);
  if (f > 0) { onFrom(c.layer(name + " strip"), f); onFrom(t, f); }
  return [c.layer(name + " strip"), t];
}
// rect mask from the layer's own origin, grown downward in hold steps: steps = [[frame, fraction], …]
function revealDown(c, l, w, h, steps) {
  app.run("comp.open", { comp: c.name });
  app.run("layer.addMask", { layer: l.id, shape: "rect", rect: [0, 0, w, h] });
  var mp = l.property("ADBE Mask Parade").property(1).property("ADBE Mask Shape");
  for (var i = 0; i < steps.length; i++) { var sh = new Shape(), y = Math.max(1, h * steps[i][1]);
    sh.vertices = [[-20, 0], [w + 20, 0], [w + 20, y], [-20, y]]; sh.closed = true; mp.setValueAtTime(steps[i][0] * F, sh); }
  for (var j = 1; j <= mp.numKeys; j++) mp.setInterpolationTypeAtKey(j, KeyframeInterpolationType.HOLD);
  return l;
}
function rectMask(c, l, r) { app.run("comp.open", { comp: c.name }); app.run("layer.addMask", { layer: l.id, shape: "rect", rect: r }); return l; }
// a control null whose space matches the comp (anchor = position, effectcraft-notes #11)
function ctrl(c, name, at) { var n = c.layers.addNull(); n.name = name; A(n).setValue(at); P(n).setValue(at); return n; }
// an ochre ink ring drawn around a point (call-outs)
function inkRing(c, name, ctr, size, f0, f1, rot) { var s = shapeAt(c, name, ctr), g = grp(s);
  ellIn(g, size, null, null, OCHRE, 9); R(s).setValue(rot || 0);
  stepped(keys(g.addProperty("ADBE Vector Filter - Trim").property("ADBE Vector Trim End"), [[f0, 0], [f1, 100]]), "out"); return s; }
// the banknote precomp (built by kit.jsx), as a layer
function note(c, name, ctr, sc, rot) { var l = c.layers.add(item("NOTE")); l.name = name; P(l).setValue(ctr); S(l).setValue([sc, sc]); R(l).setValue(rot || 0); shadowLayer(c, l, 8, 18, 40); return l; }
var NW = 760, NH = 340, SLIVER = 18;   // note size; 2.4% of its width is the swipe fee
// the hand and the card reader, split out of CO_card_tap.png (gap between them at source y 1180–1280)
var TAP_A = [725, 1302];
function tapPart(c, part, name) { var l = img(c, "CO_card_tap.png", name); A(l).setValue(TAP_A);
  rectMask(c, c.layer(name), part == "hand" ? [0, 0, 1440, 1230] : [0, 1230, 1440, 1330]); return c.layer(name); }
function camDrift(c, k) {   // k = [[frame, [x, y], scale], …] smooth camera; poi follows
  var cam = camera(c), poi = tf(cam).property("ADBE Anchor Point"), a = [], b = [];
  for (var i = 0; i < k.length; i++) { a.push([k[i][0], [k[i][1][0], k[i][1][1], camZ(k[i][2])]]); b.push([k[i][0], [k[i][1][0], k[i][1][1], 0]]); }
  smooth(keys(P(cam), a), 55); smooth(keys(poi, b), 55); return cam;
}
// opacity to 0 from frame f (hold), keeping what came before
function offAt(l, f) { var o = O(l); if (o.numKeys == 0) o.setValueAtTime(0, o.value); o.setValueAtTime(f * F, 0);
  for (var i = 1; i <= o.numKeys; i++) o.setInterpolationTypeAtKey(i, KeyframeInterpolationType.HOLD); return l; }
// a headline and its misregistered copy, as layers
function hl(c, name) { return [c.layer(name), c.layer(name + " misreg")]; }
// a coin that pops (2 frames) at f from `from` and flies along `path` = [[frame, [x, y]], …] (stop-motion, boiled)
function popCoin(c, name, r, f, from, path, seed) {
  var k = coinTop(c, name, from, r); hold(S(k), [[0, [0, 0]], [f, [100, 100]]]); onFrom(k, f);
  keys(P(k), [[f, from]].concat(path)); boil(k, seed, 1.5, 4, "in"); return k;
}

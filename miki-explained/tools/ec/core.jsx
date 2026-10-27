// miki-explained shared EffectCraft library: core helpers.
// An episode's build/config.jsx must define first: DIR (episode folder, trailing /), COMPNAME, T (line offsets), DUR.
// Never edit per episode. Add new reusable pieces to blocks.jsx. Traps behind each rule: 00_bible/effectcraft-notes.md
var W = 1080, H = 1920, FPS = 24, F = 1 / 24;
// Palette. Colour has ONE meaning each (00_bible/visual-system.md):
//   ANSWER (green) = the fix / the good outcome / Meikigo.  PROBLEM (coral) = the problem, the waiting, the loss.
var CREAM = [0.957, 0.945, 0.918], INK = [0.078, 0.078, 0.078], CARD = [1, 1, 1], MUTED = [0.54, 0.525, 0.494];
var TRACK = [0.91, 0.9, 0.88], BLUE = [0.31, 0.42, 0.96], BROWN = [0.165, 0.133, 0.11], CHIPDARK = [0.235, 0.2, 0.17];
var ANSWER = [0.13, 0.64, 0.37], PROBLEM = [0.9, 0.36, 0.26];
var RED = [0.86, 0.26, 0.24], YELLOW = [0.96, 0.74, 0.2];   // literal colours only (e.g. a real traffic signal)
var MIN_TEXT = 32;                                           // phone-readable floor for every text layer

function getComp(name) { for (var i = 1; i <= app.project.numItems; i++) if (app.project.item(i).name == name) return app.project.item(i); }
var comp = getComp(COMPNAME);
if (!comp) { comp = app.project.items.addComp(COMPNAME, W, H, 1, DUR, FPS); comp.bgColor = CREAM; }
app.run("comp.open", { comp: COMPNAME });
function w(L, i) { return WT[L][i]; }
// soft(): decelerate into every key (fast start, long landing), like an expo-out. Use it instead of easeAll for moves.
function soft(p, land) {
  var n = p.value instanceof Array ? p.value.length : 1, i, j;
  for (i = 1; i <= p.numKeys; i++) {
    var inE = [], outE = [];
    for (j = 0; j < n; j++) { inE.push(new KeyframeEase(0, land || 88)); outE.push(new KeyframeEase(0, 18)); }
    p.setTemporalEaseAtKey(i, inE, outE);
  }
}

function hex(c) { var s = "#"; for (var i = 0; i < 3; i++) { var h = Math.round(c[i] * 255).toString(16); s += (h.length < 2 ? "0" : "") + h; } return s; }
function tf(l) { return l.property("ADBE Transform Group"); }
function P(l) { return tf(l).property("ADBE Position"); }
function easeAll(p, inf) {
  var n = p.value instanceof Array ? p.value.length : 1, e = [], i;
  for (i = 0; i < n; i++) e.push(new KeyframeEase(0, inf || 80));
  for (i = 1; i <= p.numKeys; i++) p.setTemporalEaseAtKey(i, e, e);
}
// keys + ease in one call: keys = [[t, v], ...]
function anim(p, keys, inf) { for (var i = 0; i < keys.length; i++) p.setValueAtTime(keys[i][0], keys[i][1]); easeAll(p, inf); }
function opac(l, keys) { var o = tf(l).property("ADBE Opacity"); for (var i = 0; i < keys.length; i++) o.setValueAtTime(keys[i][0], keys[i][1]); }
// visible only inside [a, b] with short fades
function life(l, a, b, fi, fo) { var o = tf(l).property("ADBE Opacity"); o.setValueAtTime(0, 0); o.setValueAtTime(a, 0); o.setValueAtTime(a + (fi || F), 100); if (b) { o.setValueAtTime(b, 100); o.setValueAtTime(b + (fo || F), 0); } }
function nul(name, pos) { pos = pos || [540, 960]; var n = comp.layers.addNull(); n.name = name; tf(n).property("ADBE Anchor Point").setValue(pos); P(n).setValue(pos); return comp.layer(name); } // anchor = position: local space = comp space (parenting does not compensate)

function text(name, str, font, style, size, color, box, justify, tracking, leading) {
  if (size < MIN_TEXT) size = MIN_TEXT;
  app.run("layer.newText", { text: str, name: name, font: font, style: style, size: size, fill: hex(color),
    box: box, justify: justify || "left", tracking: tracking || 0, leading: leading || Math.round(size * 1.12) });
  return comp.layer(1);
}
function ws(name, str, style, size, color, box, justify) { return text(name, str, "Work Sans", style, size, color, box, justify, -20); }
function inc(name, str, style, size, color, box, justify) { return text(name, str, "Inclusive Sans", style, size, color, box, justify, 0); }

function wordReveal(l, times, rise) {
  var a = l.property("ADBE Text Properties").property("ADBE Text Animators").addProperty("ADBE Text Animator");
  var ap = a.property("ADBE Text Animator Properties");
  ap.addProperty("ADBE Text Opacity").setValue(0);
  ap.addProperty("ADBE Text Position 3D").setValue([0, rise === undefined ? 10 : rise, 0]);   // V2: small rise
  var sel = a.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
  sel.property("advanced").property("basedOn").setValue(3);
  sel.property("advanced").property("smoothness").setValue(100);
  var st = sel.property("start"), n = times.length;
  st.setValueAtTime(0, 0);
  for (var i = 0; i < n; i++) {
    var next = i + 1 < n ? times[i + 1] : times[i] + 1;
    var d = Math.max(F, Math.min(0.14, next - times[i] - 2 * F));
    if (times[i] - F > 0) st.setValueAtTime(times[i] - F, i / n * 100);
    st.setValueAtTime(times[i] + d, (i + 1) / n * 100);
  }
}
function typeOn(l, t0, t1) {
  var a = l.property("ADBE Text Properties").property("ADBE Text Animators").addProperty("ADBE Text Animator");
  a.property("ADBE Text Animator Properties").addProperty("ADBE Text Opacity").setValue(0);
  var sel = a.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
  sel.property("advanced").property("basedOn").setValue(1);
  sel.property("advanced").property("smoothness").setValue(0);
  sel.property("start").setValueAtTime(t0, 0); sel.property("start").setValueAtTime(t1, 100);
}

function shapeLayer(name) { var s = comp.layers.addShape(); s.name = name; P(s).setValue([0, 0]); tf(s).property("ADBE Anchor Point").setValue([0, 0]); return s; }
function grp(s) { return s.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group").property("ADBE Vectors Group"); }
function fill(g, c) { g.addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(c); }
function stroke(g, c, w, cap) { var st = g.addProperty("ADBE Vector Graphic - Stroke"); st.property("ADBE Vector Stroke Color").setValue(c); st.property("ADBE Vector Stroke Width").setValue(w); st.property("ADBE Vector Stroke Line Cap").setValue(cap || 2); return st; }
function rectIn(g, size, round, center) { var r = g.addProperty("ADBE Vector Shape - Rect"); r.property("ADBE Vector Rect Size").setValue(size); r.property("ADBE Vector Rect Roundness").setValue(round || 0); if (center) r.property("ADBE Vector Rect Position").setValue(center); return r; }
function pathIn(g, pts, closed, inT, outT) { var sh = new Shape(); sh.vertices = pts; sh.closed = !!closed; if (inT) sh.inTangents = inT; if (outT) sh.outTangents = outT; g.addProperty("ADBE Vector Shape - Group").property("ADBE Vector Shape").setValue(sh); }
function trimIn(g, t0, t1, inf) { var e = g.addProperty("ADBE Vector Filter - Trim").property("ADBE Vector Trim End"); e.setValueAtTime(t0, 0); e.setValueAtTime(t1, 100); easeAll(e, inf || 60); return e; }

// A layer centred at pos whose contents are drawn around [0,0].
function centred(name, pos) { var s = comp.layers.addShape(); s.name = name; P(s).setValue(pos); tf(s).property("ADBE Anchor Point").setValue([0, 0]); return s; }
function card(name, pos, size, round, color) { var s = centred(name, pos); var g = grp(s); rectIn(g, size, round === undefined ? 36 : round); fill(g, color || CARD); shadow(s); return s; }
// soft drop shadow through the layer style command
function shadow(l, dist, size, opac) {
  app.run("layer.style.dropShadow", { layers: [l.index] });
  var v = { "useGlobalLight": false, "angle": 90, "distance": dist || 16, "size": size || 50, "opacity": opac || 12 };
  for (var k in v) app.run("prop.set", { layer: l.index, path: "layerStyles/dropShadow/" + k, value: v[k] });
  return l;
}
// Pop-in: scale from 0 with a little overshoot.
// pop(): V2 default = soft arrival (scale 92→100 + fade, long deceleration, NO overshoot). Bounce is retired:
// it reads as AI-made (user, 2026-10-28). popBounce() keeps the old behaviour for the rare playful beat.
function pop(l, t, dur) { var d = dur || 0.5, s = tf(l).property("ADBE Scale"), v = s.value; s.setValueAtTime(t, [v[0] * 0.92, v[1] * 0.92]); s.setValueAtTime(t + d, [v[0], v[1]]); soft(s); var o = tf(l).property("ADBE Opacity"); o.setValueAtTime(0, 0); o.setValueAtTime(t, 0); o.setValueAtTime(t + d * 0.6, 100); }
function popBounce(l, t, dur) { var d = dur || 0.18, s = tf(l).property("ADBE Scale"); s.setValueAtTime(t, [0, 0]); s.setValueAtTime(t + d, [116, 116]); s.setValueAtTime(t + d + 0.1, [96, 96]); s.setValueAtTime(t + d + 0.2, [100, 100]); easeAll(s, 75); }
// pulse(): a gentle swell for emphasis (100 → 106 → 100, slow), no squash.
function pulse(l, t) { var s = tf(l).property("ADBE Scale"); s.setValueAtTime(t, [100, 100]); s.setValueAtTime(t + 0.35, [106, 106]); s.setValueAtTime(t + 0.9, [100, 100]); soft(s); }

// Flat colour tile with a black pictogram drawn by fn(group).
function tile(name, pos, size, color, pict) {
  var s = centred(name, pos);
  if (pict) pict(s, size);               // later groups render behind, so the icon goes first
  var g = grp(s); rectIn(g, [size, size], size * 0.18); fill(g, color);
  return s;
}
function pictArrowRight(s, sz) { var k = sz / 100, g = grp(s); pathIn(g, [[-26 * k, 0], [24 * k, 0]]); pathIn(g, [[4 * k, -20 * k], [26 * k, 0], [4 * k, 20 * k]]); stroke(g, INK, 11 * k, 1); }
function pictPause(s, sz) { var k = sz / 100, g = grp(s); rectIn(g, [12 * k, 44 * k], 2, [-12 * k, 0]); rectIn(g, [12 * k, 44 * k], 2, [12 * k, 0]); fill(g, INK); }
function pictCase(s, sz) { var k = sz / 100, h = grp(s); rectIn(h, [24 * k, 20 * k], 5 * k, [0, -20 * k]); stroke(h, INK, 7 * k, 1);
  var b = grp(s); rectIn(b, [60 * k, 42 * k], 7 * k, [0, 6 * k]); fill(b, INK); }
function pictPerson(s, sz) { var k = sz / 100, g = grp(s); g.addProperty("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([22 * k, 22 * k]);
  var e = g.property(1); e.property("ADBE Vector Ellipse Position").setValue([0, -16 * k]); rectIn(g, [36 * k, 26 * k], 12 * k, [0, 16 * k]); fill(g, INK); }
function circle(name, size, color, pos, filled, width) {
  var s = centred(name, pos), g = grp(s);
  g.addProperty("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([size, size]);
  if (filled) fill(g, color); else stroke(g, color, width || 3);
  return s;
}
function ripple(name, pos, t, color) {
  for (var i = 0; i < 2; i++) {
    var r = circle(name + " " + (i + 1), 30, color, pos, false, 3), t0 = t + i * 0.14;
    var sc = tf(r).property("ADBE Scale"); sc.setValueAtTime(t0, [100, 100]); sc.setValueAtTime(t0 + 0.55, [420, 420]);
    opac(r, [[0, 0], [t0 - F, 0], [t0, 90], [t0 + 0.55, 0]]);
  }
}
// dashed underline under a slot word
function dashLine(name, p0, p1, color, t0, t1) {
  var s = shapeLayer(name), g = grp(s); pathIn(g, [p0, p1]); var st = stroke(g, color, 3, 1);
  var d = st.property("ADBE Vector Stroke Dashes"); d.addProperty("ADBE Vector Stroke Dash 1").setValue(8); d.addProperty("ADBE Vector Stroke Gap 1").setValue(8);
  trimIn(g, t0, t1); return s;
}
function bar(name, p0, p1, color, width, t0, t1) { var s = shapeLayer(name), g = grp(s); pathIn(g, [p0, p1]); stroke(g, color, width, 2); if (t0 !== undefined) trimIn(g, t0, t1, 70); return s; }
// keyed offsets from a layer's current position: keys = [[t, [dx, dy]], ...]
function nudge(l, keys, inf) { var p = P(l), v = p.value; for (var i = 0; i < keys.length; i++) p.setValueAtTime(keys[i][0], [v[0] + keys[i][1][0], v[1] + keys[i][1][1]]); easeAll(p, inf || 60); }
function parentAll(list, p) { for (var i = 0; i < list.length; i++) list[i].parent = p; }
function fadeAt(names, t, d) { for (var i = 0; i < names.length; i++) { var o = tf(comp.layer(names[i])).property("ADBE Opacity"); o.setValueAtTime(t, o.valueAtTime(t, false)); o.setValueAtTime(t + (d || 0.2), 0); } }
function fadeTo(names, t, v, d) { for (var i = 0; i < names.length; i++) { var o = tf(comp.layer(names[i])).property("ADBE Opacity"); o.setValueAtTime(t, o.valueAtTime(t, false)); o.setValueAtTime(t + (d || 0.3), v); } }
function still(file, name) { app.run("file.import", { paths: [DIR + "media/" + file], sequence: false, addToComp: true, time: 0 }); var l = comp.layer(1); l.name = name; l.outPoint = comp.duration; return comp.layer(name); }
function tint(name, amt) { comp.layer(name).property("ADBE Effect Parade").addProperty("ADBE Tint"); comp.layer(name).property("ADBE Effect Parade").property(1).property(3).setValue(amt); }

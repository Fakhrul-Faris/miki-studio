// miki-explained shared EffectCraft library: reusable blocks (needs core.jsx first).
// Proven in EX01/EX02. Beat scripts call these; only the story-specific diagram is written per episode.

// --- setup --------------------------------------------------------------------------------------------
function clearComp() { for (var k = comp.numLayers; k >= 1; k--) comp.layer(k).remove(); }
function importLines(names) { for (var a = 0; a < names.length; a++) app.run("file.import", { paths: [DIR + "audio/" + names[a] + ".mp3"], addToComp: true, time: T[names[a]] }); }
function group(name, parent) { nul(name, [540, 960]); if (parent) comp.layer(name).parent = comp.layer(parent); return comp.layer(name); }
function into(names, parent) { for (var i = 0; i < names.length; i++) comp.layer(names[i]).parent = comp.layer(parent); }

// --- mixed media ----------------------------------------------------------------------------------------
// Full-bleed still with an optional slow push. anchor = source-pixel point that stays put on screen.
function bleed(file, name, t0, t1, opts) {
  opts = opts || {};
  still(file, name); var l = comp.layer(name);
  if (opts.anchor) { tf(l).property("ADBE Anchor Point").setValue(opts.anchor); P(l).setValue(opts.at || [540, 960]); } else P(l).setValue([540, 960]);
  if (opts.tint) tint(name, opts.tint);
  anim(tf(comp.layer(name)).property("ADBE Scale"), [[t0, [opts.s0 || 75, opts.s0 || 75]], [t1, [opts.s1 || 82, opts.s1 || 82]]], opts.inf || 10);
  opac(comp.layer(name), [[0, 0], [t0 - F, 0], [t0, opts.op || 100], [t1, opts.op || 100], [t1 + (opts.fo || F), 0]]);
  return comp.layer(name);
}
// A still as a white-framed print. mask = [x, y, w, h] in source pixels (default: centre crop for a 720×640 frame at scale 0.5).
function print(file, name, pos, frame, t0, t1, opts) {
  opts = opts || {};
  card(name + " frame", pos, frame || [720, 640], 24); pop(comp.layer(name + " frame"), t0, 0.22);
  still(file, name); var m = comp.layer(name);
  app.run("layer.addMask", { layer: m.index, shape: "rect", rect: opts.mask || [70, 680, 1300, 1200] });
  m = comp.layer(name); P(m).setValue(pos); m.parent = comp.layer(name + " frame"); m = comp.layer(name); P(m).setValue([0, 0]);
  anim(tf(m).property("ADBE Scale"), [[t0, [opts.s || 50, opts.s || 50]], [t1, [(opts.s || 50) + 4, (opts.s || 50) + 4]]], 10);
  anim(tf(comp.layer(name + " frame")).property("ADBE Rotate Z"), [[t0, 0], [t0 + 0.4, opts.rot === undefined ? 2 : opts.rot]], 70);
  fadeAt([name + " frame", name], t1, 0.3);
}
// Small dark chip with one line of text (labels, years, credits).
function chip(name, text, center, wpx, t, opts) {
  opts = opts || {};
  card(name, center, [wpx, 56], 28, opts.bg || INK); pop(comp.layer(name), t);
  inc(name + " text", text, "SemiBold", opts.size || 32, opts.fg || CREAM, [center[0] - wpx / 2 + 10, center[1] - 22, wpx - 20, 44], "center");
  life(comp.layer(name + " text"), t + 0.1, null, 0.1);
  return [name, name + " text"];
}

// --- transitions --------------------------------------------------------------------------------------
// Zoom-through: a bar at screen y swells to fill the frame and darkens from `from` to BROWN; returns the cut time.
function zoomThrough(y, t0, from) {
  var fl = centred("Fill through", [540, y]), fg = grp(fl), fr = rectIn(fg, [1200, 20], 0);
  var fc = fg.addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color");
  fc.setValueAtTime(t0 + 0.3, (from || ANSWER).concat([1])); fc.setValueAtTime(t0 + 0.55, BROWN.concat([1]));
  anim(fr.property("ADBE Vector Rect Size"), [[t0, [1200, 20]], [t0 + 0.35, [1200, 2600]]], 90);
  opac(comp.layer("Fill through"), [[0, 0], [t0 - F, 0], [t0, 100]]);
  comp.layer("Fill through").motionBlur = true;
  comp.layers.addSolid(BROWN, "Brown", W, H, 1); life(comp.layer("Brown"), t0 + 0.55);
  return t0 + 0.55;
}
// A cream dimmer over everything so far (for the guess beat).
function dimmer(t0, t1) { comp.layers.addSolid(CREAM, "Dimmer", W, H, 1); opac(comp.layer("Dimmer"), [[0, 0], [t0, 0], [t0 + 0.35, 93], [t1, 93], [t1 + 0.3, 0]]); }

// --- the takeaway ---------------------------------------------------------------------------------------
// Two-line named concept with a highlighter behind line 2, then the question. times: [line1 words], [line2 words], [question words]
function concept(line1, line2, hlEnd, t1, t2, tq, question, color, size) {
  var DIMC = CREAM, z = size || 130, k = z / 130;                     // size: smaller for long words (must fit 960 px)
  ws("Concept 1", line1, "Black", z, DIMC, [80, 860 - Math.round(160 * k), 960, Math.round(160 * k)]); wordReveal(comp.layer("Concept 1"), t1);
  bar("Highlighter", [70, 860 + Math.round(85 * k)], [hlEnd, 860 + Math.round(85 * k)], color || ANSWER, Math.round(150 * k), t2[0] - 0.05, t2[t2.length - 1] + 0.3);
  ws("Concept 2", line2, "Black", z, DIMC, [80, 860, 960, Math.round(160 * k)]); wordReveal(comp.layer("Concept 2"), t2);
  inc("Question", question, "Medium", 46, DIMC, [80, 1100, 920, 70]); wordReveal(comp.layer("Question"), tq, 12);
}

// --- captions, credit, sound, outro, finish -------------------------------------------------------------
// CAPS comes from captions.jsx (tools/captions.py). Muted phrases are already dropped there.
function captions() {
  for (var i = 0; i < CAPS.length; i++) {
    var c = CAPS[i], n = "Cap " + (i + 1), wpx = Math.min(980, c.t.length * 21 + 70);
    card(n + " pill", [540, 1515], [wpx, 76], 38, INK);
    opac(comp.layer(n + " pill"), [[0, 0], [c.s - F, 0], [c.s, 88], [c.e, 88], [c.e + F, 0]]);
    inc(n, c.t, "SemiBold", 40, CREAM, [60, 1488, 960, 56], "center");
    opac(comp.layer(n), [[0, 0], [c.s - F, 0], [c.s, 100], [c.e, 100], [c.e + F, 0]]);
    wordReveal(comp.layer(n), c.w, 0);
  }
}
function credit(text, tOut, wpx, tIn) {
  wpx = wpx || Math.min(980, text.length * 17 + 60);          // sized to the 32 px text
  var t0 = tIn || 0.3;                                         // show it when the sourced numbers are on screen
  card("Credit chip", [60 + wpx / 2, 250], [wpx, 54], 27, INK);
  inc("Credit text", text, "SemiBold", 32, CREAM, [70, 230, wpx - 20, 44], "center");
  opac(comp.layer("Credit chip"), [[0, 0], [t0 - F, 0], [t0, 92], [tOut, 92], [tOut + 0.2, 0]]);
  opac(comp.layer("Credit text"), [[0, 0], [t0 - F, 0], [t0, 100], [tOut, 100], [tOut + 0.2, 0]]);
}
function soundTrack() { app.run("file.import", { paths: [DIR + "sfx/sfx_mix.wav"], addToComp: true, time: 0 }); }
// Silent outro: blur + dim everything, then the logo (no sound effect on the logo, ever).
function outro(ob) {
  comp.layers.addSolid([0.5, 0.5, 0.5], "Outro blur", W, H, 1);
  comp.layer("Outro blur").adjustmentLayer = true;
  comp.layer("Outro blur").property("ADBE Effect Parade").addProperty("ADBE Gaussian Blur 2");
  var bl = comp.layer("Outro blur").property("ADBE Effect Parade").property(1).property(1);
  bl.setValueAtTime(ob, 0); bl.setValueAtTime(ob + 0.55, 46); easeAll(bl, 70);
  comp.layers.addSolid(BROWN, "Outro dim", W, H, 1); opac(comp.layer("Outro dim"), [[0, 0], [ob, 0], [ob + 0.55, 40]]);
  app.run("file.import", { paths: [DIR + "media/logo.png"], sequence: false, addToComp: true, time: 0 }); comp.layer(1).name = "Logo";
  var lg = comp.layer("Logo"); lg.outPoint = comp.duration; lg = comp.layer("Logo"); P(lg).setValue([540, 900]);
  var t = ob + 0.4, ls = tf(lg).property("ADBE Scale");
  ls.setValueAtTime(t, [0, 0]); ls.setValueAtTime(t + 0.22, [78, 78]); ls.setValueAtTime(t + 0.34, [68, 68]); ls.setValueAtTime(t + 0.46, [70, 70]); ls.setValueAtTime(DUR, [73, 73]); easeAll(ls, 75);
  anim(tf(lg).property("ADBE Rotate Z"), [[t, -12], [t + 0.4, 0]], 80);
  comp.layer("Logo").motionBlur = true;
}
// Full-length layers, grain on top, motion blur, constant drift.
function finish(onTop) {
  for (var j = 0; onTop && j < onTop.length; j++) comp.layer(onTop[j]).moveToBeginning();
  for (var i = 1; i <= comp.numLayers; i++) { var l = comp.layer(i); if (!l.hasAudio || l.hasVideo) { l.inPoint = 0; l.outPoint = comp.duration; } }
  comp.layers.addSolid([0.5, 0.5, 0.5], "Grain", W, H, 1);
  comp.layer("Grain").adjustmentLayer = true;
  comp.layer("Grain").property("ADBE Effect Parade").addProperty("ADBE Noise");
  comp.layer("Grain").property("ADBE Effect Parade").property(1).property(1).setValue(4);
  comp.layer("Grain").outPoint = comp.duration;
  comp.motionBlur = true;
  if (comp.layer("DRIFT")) anim(tf(comp.layer("DRIFT")).property("ADBE Scale"), [[0, [100, 100]], [DUR, [104, 104]]], 0.1);
}

// QR-code pictogram for tile(): three finder squares + a few data blocks, in ink.
function pictQR(s, sz) {
  var k = sz / 100, g = grp(s), f = [[-22, -22], [22, -22], [-22, 22]];
  for (var i = 0; i < 3; i++) { rectIn(g, [26 * k, 26 * k], 3 * k, [f[i][0] * k, f[i][1] * k]); }
  stroke(g, INK, 5 * k, 1);
  var d = grp(s), pts = [[14, 14], [26, 14], [14, 28], [28, 30], [-22, -22], [22, -22], [-22, 22]];
  for (i = 0; i < pts.length; i++) rectIn(d, [9 * k, 9 * k], 1, [pts[i][0] * k, pts[i][1] * k]);
  fill(d, INK);
}

// --- flow motion (V2, 2026-10-28): human-feeling motion. No bounce, no overshoot. --------------------------------
// enter(): fade in + scale 94→100 + blur 14→0 over `dur` (default 0.7s). leave(): the reverse, drifting `dy` px.
function blurFx(l) { var e = l.property("ADBE Effect Parade"); for (var i = 1; i <= e.numProperties; i++) if (e.property(i).name == "Gaussian Blur") return e.property(i).property(1); e.addProperty("ADBE Gaussian Blur 2"); return l.property("ADBE Effect Parade").property(e.numProperties).property(1); }
function enter(l, t, dur) {
  var d = dur || 0.7, nm = l.name;
  opac(comp.layer(nm), [[0, 0], [t, 0], [t + d * 0.6, 100]]);
  var s = tf(comp.layer(nm)).property("ADBE Scale"), v = s.value; s.setValueAtTime(t, [v[0] * 0.94, v[1] * 0.94]); s.setValueAtTime(t + d, [v[0], v[1]]); soft(s);
  var b = blurFx(comp.layer(nm)); b.setValueAtTime(t, 14); b.setValueAtTime(t + d, 0); soft(b);
}
function leave(l, t, dur, dy) {
  var d = dur || 0.5, nm = l.name;
  var o = tf(comp.layer(nm)).property("ADBE Opacity"); o.setValueAtTime(t, o.valueAtTime(t, false)); o.setValueAtTime(t + d, 0);
  var b = blurFx(comp.layer(nm)); b.setValueAtTime(t, 0); b.setValueAtTime(t + d, 12);
  if (dy) nudge(comp.layer(nm), [[t, [0, 0]], [t + d, [0, dy]]], 40);
}
// glide(): travel along a curved path. keys = [[t, [x, y]], ...]; bend = perpendicular pull of the curve (px).
function glide(l, keys, bend) {
  var p = P(comp.layer(l.name)), i;
  for (i = 0; i < keys.length; i++) p.setValueAtTime(keys[i][0], keys[i][1]);
  for (i = 1; i < keys.length; i++) {
    var a = keys[i - 1][1], b = keys[i][1], dx = b[0] - a[0], dy = b[1] - a[1], k = (bend || 0) / Math.max(1, Math.sqrt(dx * dx + dy * dy));
    p.setSpatialTangentsAtKey(i, p.keyInSpatialTangent(i), [dx / 3 - dy * k, dy / 3 + dx * k]);
    p.setSpatialTangentsAtKey(i + 1, [-dx / 3 - dy * k, -dy / 3 + dx * k], p.keyOutSpatialTangent(i + 1));
  }
  soft(p);
}
// calmReveal(): words arrive with a blur-in and a small rise (vs wordReveal's bigger rise).
function calmReveal(l, times) {
  wordReveal(l, times, 10);
  try { comp.layer(l.name).property("ADBE Text Properties").property("ADBE Text Animators").property(1).property("ADBE Text Animator Properties").addProperty("ADBE Text Blur").setValue([10, 10]); } catch (x) {}
}
// camera(): one null that everything in the scene hangs from; animate its scale/position for push, pull, pan.
function camera(name) { nul(name || "CAM", [540, 960]); return comp.layer(name || "CAM"); }

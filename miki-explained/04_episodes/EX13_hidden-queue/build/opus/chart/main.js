// EX13 3A: the evidence chart in the Data Storytelling style (Lemo-Opuscar engine, MIT), laid out for 1080×1920 and the
// house palette. Real data only: actual wait as % of posted, the four Walt Disney World parks, Touring Plans, the 60 days
// to 7 Oct 2021 (35 M posted / 2 M actual readings). Times are seconds from the shot start, from audio/vo_timeline.json.
import * as E from './engine.js';
const { P } = E;
const cv = document.getElementById('c'); cv.width = E.W; cv.height = E.H; const g = cv.getContext('2d');
window.DUR = 163 / 24;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), ease = u => 1 - Math.pow(1 - clamp(u), 3);
const span = (t, a, b) => clamp((t - a) / (b - a));
// chart geometry (world = screen px when cam = centre, zoom 1)
const X0 = 170, X1 = 990, Y0 = 1240, Y100 = 620, yv = v => Y0 + (Y100 - Y0) * v / 100;
const PARKS = [['EPCOT', 55, 3.30, 3.63], ['MAGIC KINGDOM', 62, 3.60, 3.95], ['ANIMAL KINGDOM', 65, 3.90, 4.25], ['HOLLYWOOD STUDIOS', 71, 4.20, 4.54]];
const BW = 150, BG = 44, BX = i => 230 + i * (BW + BG);

window.render = t => {
  const z = 1 + 0.035 * ease(t / window.DUR), cam = { x: 540, y: 960 + 20 * ease(t / window.DUR), zoom: z, roll: 0 };
  E.drawPaper(g, cam, { dots: .7 }); E.applyCam(g, cam);
  let tip = null, lift = 1;
  // printed header: kicker + title + source
  E.setType(g, 'WALT DISNEY WORLD · 60 DAYS TO OCT 2021', 90, 250, { size: 30, weight: 500, color: P.inkSoft, progress: span(t, 0, .8) });
  E.setType(g, 'HOW LONG YOU', 90, 350, { size: 84, font: 'Anton', color: P.ink, progress: span(t, .1, .7) });
  E.setType(g, 'REALLY WAITED', 90, 445, { size: 84, font: 'Anton', color: P.ink, progress: span(t, .3, .9) });
  // "two million real waits": handwritten, pinned under the title (0.92 → 1.9)
  if (t > .9) { const r = E.handText(g, '2,000,000 real waits logged', 92, 535, { size: 58, color: P.blue, progress: span(t, .92, 1.95) }); if (t < 1.95) { tip = r.tip; lift = 0; } }
  // axes grow when the unit is named (0.3 → 1.0); ticks typeset
  const ax = span(t, .3, 1.0);
  if (ax > 0) {
    E.pencilStroke(g, [[X0, Y0 + 8], [X0, Y100 - 40]], { color: P.ink, width: 2.6, progress: ax, seed: 2 });
    E.pencilStroke(g, [[X0 - 8, Y0], [X1, Y0]], { color: P.ink, width: 2.6, progress: ax, seed: 3 });
    for (const v of [0, 25, 50, 75, 100]) E.setType(g, v + '%', X0 - 16, yv(v) + 9, { size: 24, align: 'right', color: P.inkSoft, progress: span(t, .5 + v / 400, .8 + v / 400) });
    if (!tip && t < 1.0) { tip = [X0, Y0 + (Y100 - 40 - Y0) * ax]; lift = 0; }
  }
  // the sign = 100 % (a record line, ochre, dashed) on "Disney World" (2.3 → 2.9)
  const pl = span(t, 2.3, 2.9);
  if (pl > 0) {
    const n = 16; for (let i = 0; i < n; i++) { const a = X0 + (X1 - X0) * i / n, b = a + (X1 - X0) / n * .6; const u = clamp(pl * n - i); if (u > 0) E.pencilStroke(g, [[a, Y100], [a + (b - a) * u, Y100]], { color: P.red, width: 4, seed: 9 + i, taper: false }); }
    E.handText(g, 'the sign', X1, Y100 - 22, { size: 54, color: P.red, align: 'right', progress: span(t, 2.6, 3.1) });
    if (t < 2.9) { tip = [X0 + (X1 - X0) * pl, Y100]; lift = 0; }
  }
  // the bars: actual wait as % of posted, drawn on "fifty-five to seventy-one"
  PARKS.forEach(([name, v, a, b], i) => {
    const u = ease(span(t, a, b)), x = BX(i);
    E.setType(g, name.split(' ')[0], x + BW / 2, Y0 + 44, { size: 24, weight: 500, align: 'center', color: P.ink, progress: span(t, a - .2, a + .2) });
    if (name.includes(' ')) E.setType(g, name.split(' ')[1], x + BW / 2, Y0 + 74, { size: 24, weight: 500, align: 'center', color: P.ink, progress: span(t, a - .1, a + .3) });
    if (u <= 0) return;
    const top = Y0 + (yv(v) - Y0) * u;
    E.inkShape(g, [[x, Y0], [x, top], [x + BW, top], [x + BW, Y0]], { fill: '#3A3733', hatch: .6, progress: 1, seed: 5 + i });
    if (t >= b) { E.dataDot(g, x + BW / 2, yv(v), 9, P.paper, { fresh: t - b, ring: P.ink, ringW: 2.5 }); E.setType(g, v + '%', x + BW / 2, yv(v) - 26, { size: 40, weight: 700, align: 'center', color: P.ink, progress: span(t, b, b + .25) }); }
    if (t > a && t < b + .1) { tip = [x + BW / 2, top]; lift = 0; }
  });
  // the padding: the gap between what you waited and the sign, hatched ochre on "percent" (5.17), noted on "posted time" (5.79)
  const pd = span(t, 5.17, 5.6);
  if (pd > 0) PARKS.forEach(([, v], i) => { const x = BX(i) + 10; g.save(); g.globalAlpha = .55 * pd; E.inkShape(g, [[x, yv(v) - 70], [x, Y100 + 6], [x + BW - 20, Y100 + 6], [x + BW - 20, yv(v) - 70]], { fill: 'rgba(201,138,43,.35)', stroke: P.red, hatch: .9, progress: pd, seed: 20 + i }); g.restore(); });
  if (t > 5.5) { const r = E.handText(g, 'the padding', 600, 575, { size: 56, color: P.red, align: 'center', progress: span(t, 5.5, 6.0) }); if (t < 6.0) { tip = r.tip; lift = 0; } }
  if (t > 5.8) E.leader(g, [600, 585], [BX(1) + BW / 2, Y100 + 30], { color: P.red });
  E.setType(g, 'SOURCE: TOURING PLANS · 35M POSTED / 2M ACTUAL', 90, 1345, { size: 22, color: P.inkSoft, progress: span(t, .6, 1.4) });
  // the performer: the pencil rides the mark being drawn, lifts between marks
  g.setTransform(1, 0, 0, 1, 0, 0);
  if (!window._last) window._last = [900, 1500];
  if (tip) window._last = E.w2s(cam, tip[0], tip[1]);
  E.drawPencil(g, { tip: window._last, s: 1.1, lift: tip ? 0.05 : 0.6, flip: t > 2.25 && t < 3.1 || t > 5.1 ? 1 : 0, ang: 0.62 });
};
window.TEXTS = () => [];
document.fonts.load('500 60px Caveat').then(() => document.fonts.load('80px Anton')).then(() => document.fonts.load('30px "IBM Plex Mono"')).then(() => document.fonts.ready).then(() => { window.render(0); window.READY = true; });

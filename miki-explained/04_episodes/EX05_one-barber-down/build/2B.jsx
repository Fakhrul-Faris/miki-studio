// 2B. "Mathematicians have a name for what happens next: the queueing curve. Near full, every extra customer adds more
// wait than the last." 165 f + 8 (slide). A4 live data build: both curves are plotted from Erlang C (5 walk-ins/h, 20-min
// cuts). The dot sits on the 3-barber curve (56 %, 4.6 min), then climbs the 2-barber curve to 83 %, 45 min.
var c = freshComp("2B", 173);
paperBg(c);
var X0 = 150, XW = 780, Y0 = 1230, PX = 13;                                                  // 13 px per minute, 60 min at y 450
function pt(r, m) { return [X0 + r * XW, Y0 - Math.min(m, 60) * PX]; }
function curve(cc) { var p = [], r; for (r = 0; r < 0.99; r += 0.01) { var m = wq(r, cc, 3); p.push(pt(r, m)); if (m > 60) break; } return p; }
inkLine(c, "x axis", [X0, Y0], [X0 + XW + 30, Y0], 6, 0, 6, INK); inkLine(c, "y axis", [X0, Y0], [X0, 420], 6, 0, 6, INK);
mono(c, "x label", "HOW BUSY  →", 38, [270, 1262, 540, 54]); mono(c, "y label", "WAIT", 38, [50, 360, 200, 54]);
mono(c, "t0", "0%", 30, [100, 1242, 100, 40]); mono(c, "t100", "100%", 30, [X0 + XW - 70, 1242, 140, 40]);
mono(c, "m60", "60 MIN", 30, [172, 432, 180, 40], "left"); mono(c, "m30", "30 MIN", 30, [172, 822, 180, 40], "left");
polyline(c, "3 barbers", curve(3), INK, 7, 8, 40);
var d1 = coinTop(c, "dot 3", pt(0.56, 4.6), 18); onFrom(d1, 40);
var c1 = chip(c, "c3", "3 BARBERS · 4 MIN", [420, 1140], 500, 32, 42);
headline(c, "title", "THE QUEUEING CURVE", 110, [60, 205, 960, 150], 58);                   // "queueing"
polyline(c, "2 barbers", curve(2), OCHRE, 10, 79, 100);                                       // "near full"
var k = [], f = 100; for (var r = 0.56; r <= 0.834; r += 0.01) { k.push([f, pt(r, wq(r, 2, 3))]); f += 1.35; }
var d2 = coinTop(c, "dot 2", pt(0.56, wq(0.56, 2, 3)), 22); keys(P(d2), k); boil(d2, 9, 1, 0, "lin"); onFrom(d2, 100);
var c2 = chip(c, "c2", "2 BARBERS · 45 MIN", [520, 630], 540, 32, 138);
var ls = []; for (var i = 1; i <= c.numLayers; i++) ls.push(c.layer(i));
var z = zoomRig(c, ls); crash(z, [[29, null, 1], [31, [540, 900], 1.07], [36, null, 1], [125, null, 1], [129, [770, 780], 1.3], [150, [770, 780], 1.32], [160, null, 1]]);
overlay(c); finishComp(c); "2B built";

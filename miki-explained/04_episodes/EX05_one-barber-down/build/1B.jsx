// 1B. "Your shop is humming. Three barbers, fifty-six percent busy. About a four-minute wait. Nobody complains." 135 f.
// Same set, calm (CALM). The panel: busy ring fills to 56 %, 4 MIN crash-zooms. E4 on the grid: punch at 16 (MASTER 96),
// NOBODY COMPLAINS at 111 (MASTER 191).
var c = freshComp("1B", 135);
paperBg(c);
var pl = seq(c, "CALM", "shop", 1);
var tr = panel(c, 10); stepped(keys(tr, [[45, 0], [53, 56]]), "out");
pct(c, "p56", "56%", 45); waitTxt(c, "w4", "4 MIN", 80);
var nc = bigChip(c, "nobody", "NOBODY COMPLAINS", [540, 1060], 900, 92, 111, -1.5);
var ls = [pl]; for (var i = 1; i <= c.numLayers; i++) if (c.layer(i) != pl && c.layer(i).name != "zoom") ls.push(c.layer(i));
var z = zoomRig(c, ls); crash(z, [[14, null, 1], [16, [540, 900], 1.07], [21, null, 1], [80, null, 1], [84, [700, 370], 1.4], [100, [700, 370], 1.42], [108, null, 1]]);
overlay(c); finishComp(c); "1B built";

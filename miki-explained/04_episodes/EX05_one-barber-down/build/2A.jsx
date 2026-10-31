// 2A. "Then one barber calls in sick. Two barbers now. Same customers walking in. That's only one and a half times
// busier." 138 f + 10 (tear). QUEUE: the middle barber is lifted out (f4–16), customers drop in on twos (f62–84).
// The ring climbs 56 → 83 and ×1.5 crash-zooms. E4: punch at 73 (MASTER 288).
var c = freshComp("2A", 148);
paperBg(c);
var pl = seq(c, "QUEUE", "shop", 1);
var tr = panel(c, 0); stepped(keys(tr, [[112, 56], [121, 83]]), "out"); tr.setValueAtTime(0, 56);
pct(c, "p56", "56%", 0, 121); pct(c, "p83", "83%", 121);
waitTxt(c, "w4", "4 MIN", 0, 40); waitTxt(c, "wq", "?", 40);                                 // "two barbers now": the wait is the question
var out = bigChip(c, "out", "ONE BARBER OUT", [540, 620], 640, 84, 27, -2); offAll(out, 62);   // "sick"
var same = bigChip(c, "same", "SAME CUSTOMERS", [540, 1060], 760, 88, 65, 1.5); offAll(same, 110);   // "customers"
var x15 = bigChip(c, "x15", "×1.5", [215, 600], 260, 110, 112, -3);                          // "one and a half"
var ls = [pl]; for (var i = 1; i <= c.numLayers; i++) if (c.layer(i) != pl) ls.push(c.layer(i));
var z = zoomRig(c, ls); crash(z, [[71, null, 1], [73, [540, 1000], 1.07], [78, null, 1], [112, null, 1], [116, [215, 520], 1.35], [128, [215, 520], 1.37], [136, null, 1]]);
overlay(c); finishComp(c); "2A built";

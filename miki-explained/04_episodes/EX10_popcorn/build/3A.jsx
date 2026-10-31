// 3A. "So the cinema needs one thing from you: a walk past the counter. That's why the lobby smells of butter, and why the
// line for snacks sits between you and your seat." 200 f. CON: from inside the menu board out to the counter, along to the
// machine, into the bucket (C1). A paper mini-map: DOOR → COUNTER → SEAT.
var c = freshComp("3A", 200);
paperBg(c); seq(c, "COUNTER", "concession", 1);
var mp = shapeAt(c, "map", [540, 260]); rectIn(grp(mp), [800, 130], null, CREAM, INK, 3); shadowLayer(c, mp, 8, 18, 40); onFrom(c.layer("map"), 50);
var MX = [[230, "DOOR"], [540, "COUNTER"], [850, "SEAT"]];
for (var i = 0; i < 3; i++) { var t = mono(c, "map " + i, MX[i][1], 28, [MX[i][0] - 120, 285, 240, 40]); onFrom(t, 50); }
var tr = track(c, "map track", [[230, 250], [850, 250]], 52, 58); onFrom(tr, 52);
var d = dot(c, "map dot", [230, 250], OCHRE, 18); onFrom(d, 56);
stepped(keys(P(d), [[56, [230, 250]], [64, [540, 250]], [76, [540, 250]], [84, [850, 250]]]), "out");          // "a walk past the counter"
inkRing(c, "counter ring", [540, 285], [230, 90], 153, 160);                                                     // "sits between you and your seat"
var all = ["map", "map 0", "map 1", "map 2", "map track", "map dot", "counter ring"]; for (var i = 0; i < all.length; i++) offAt(c.layer(all[i]), 186);
overlay(c); finishComp(c); "3A built";

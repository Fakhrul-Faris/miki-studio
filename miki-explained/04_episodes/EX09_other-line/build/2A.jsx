// 2A. "Pick one of three checkout lines. Only one can be the fastest. So two times out of three, another line beats yours.
// It's not bad luck, it's math." 178 f. SEP f104–143 cranes to top-down; at 40 the lanes become a paper diagram (A3: the
// 3D lanes → three strips); three races: lost, lost, won; 2 OF 3; IT'S MATH.
var c = freshComp("2A", 178);
paperBg(c);
var pl = seq(c, "SEP", "market crane", 104); offAt(pl, 40);
lanes(c, 40, true);
var RACES = [[46, [20, 14, 18]], [70, [16, 15, 12]], [88, [12, 15, 16]]], TX = [400, 540, 680];
for (var r = 0; r < 3; r++) {
  var f0 = RACES[r][0], d = RACES[r][1], end = f0 + Math.max(d[0], d[1], d[2]), first = Math.min(d[0], d[1], d[2]);
  for (var i = 0; i < 3; i++) { var k = dot(c, "race " + r + " dot " + i, [LANE_X[i], LANE_BOT - 40], i ? INK : OCHRE);
    stepped(keys(P(k), [[f0, [LANE_X[i], LANE_BOT - 40]], [f0 + d[i], [LANE_X[i], LANE_TOP + 20]]]), "lin"); onBetween(k, f0, end + 2); }
  tally(c, "tally " + r, [TX[r], 300], d[0] == first, f0 + first);
}
bigChip(c, "twoof3", "2 OF 3", [540, 900], 460, 130, 104, -2);          // "two times out of three", over the empty lanes
for (var r = 0; r < 3; r++) { var nm = "tally " + r, ls = [c.layer(nm + " box")]; if (c.layer(nm)) ls.push(c.layer(nm)); if (c.layer(nm + " a")) ls.push(c.layer(nm + " a"), c.layer(nm + " b")); offAll(ls, 158); }
bigChip(c, "math", "IT'S MATH.", [540, 300], 560, 100, 161, 2);         // "math" replaces the tally
overlay(c); finishComp(c); "2A built";

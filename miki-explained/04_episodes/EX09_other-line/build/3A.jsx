// 3A. "Every line hides a jam: a price check, a coupon, a card that won't tap. One slow customer and everyone behind them
// freezes, while the next counter sits empty. You can't see it coming, so you can't pick around it." 285 f.
// Lanes 2 and 3 keep flowing on twos; lane 1 jams. On "freezes" everything ramps to a dead stop (E8). TILL 2 sits EMPTY.
var c = freshComp("3A", 285);
paperBg(c); lanes(c, 0, true);
var Q = [LANE_TOP + 70, LANE_TOP + 200, LANE_TOP + 330, LANE_TOP + 460, LANE_TOP + 590];
// lane 1: the front customer stuck at the till, the rest bunch up behind and stop
for (var j = 0; j < 5; j++) { var k = dot(c, "jam " + j, [LANE_X[0], Q[j] + 120], j == 4 ? OCHRE : INK);
  stepped(keys(P(k), [[0, [LANE_X[0], Q[j] + 120]], [40 + 8 * j, [LANE_X[0], Q[j]]]]), "out"); }
// lanes 2 and 3: a steady flow, slowing to a stop on "freezes" (163); lane 2 is empty after its last one leaves
for (var i = 1; i < 3; i++) for (var j = 0; j < 8; j++) {
  var s0 = 4 + j * 22 + (i - 1) * 9;
  if (s0 >= 163 || (i == 1 && j > 4)) continue;                // lane 2 is served and empties out; lane 3 freezes mid-flow
  var k = dot(c, "flow " + i + " " + j, [LANE_X[i], LANE_BOT - 40], INK);
  var e = Math.min(163, s0 + 40); var y1 = e < s0 + 40 ? LANE_BOT - 40 - (LANE_BOT - LANE_TOP - 60) * (e - s0) / 40 : LANE_TOP + 20;
  stepped(keys(P(k), [[s0, [LANE_X[i], LANE_BOT - 40]], [e, [LANE_X[i], y1]]]), "lin"); onBetween(k, s0, e < s0 + 40 ? 285 : s0 + 42);
}
// the jams, one per word
var J = [["PRICE CHECK", 42], ["COUPON", 62], ["CARD WON'T TAP", 77]];
for (var j = 0; j < 3; j++) chip(c, "jam label " + j, J[j][0], [300, 236 + 66 * j], 380, 30, J[j][1], CREAM, (j - 1) * 2);
inkRing(c, "slow ring", [LANE_X[0], Q[0]], [110, 110], 108, 116);                                     // "one slow customer"
inkRing(c, "empty ring", [LANE_X[1], TILL_Y], [260, 140], 195, 203);                                  // "sits empty"
bigChip(c, "empty", "EMPTY", [LANE_X[1], TILL_Y + 140], 260, 70, 207, 3);
var QX = [[260, 222], [540, 230], [820, 238]];                                                          // "you can't see it coming"
for (var i = 0; i < 3; i++) { var t = text(c, "q" + i, "?", "Anton", "Regular", 150, OCHRE, [QX[i][0] - 80, LANE_BOT - 150, 160, 200], "center", 0); stamp(t, QX[i][1]); }
overlay(c); finishComp(c); "3A built";

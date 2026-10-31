// 5A. "Three counters, one standard queue model. Separate lines: seven minutes on average. One snaking line: under two."
// 148 f. Blender ONE f1–148: the snaking line, a slow orbit (C2). Number wheels for the two setups.
var c = freshComp("5A", 148);
paperBg(c); seq(c, "ONE", "market one", 1);
chip(c, "model", "STANDARD QUEUE MODEL · 3 TILLS", [540, 230], 760, 30, 39);
mono(c, "sep label", "SEPARATE LINES", 34, [60, 300, 960, 50]); onFrom(c.layer("sep label"), 66);
odo(c, "sep", "7.0 MIN", [540, 420], 110, 74, 86);                                                       // "seven minutes"
mono(c, "one label", "ONE LINE", 34, [60, 560, 960, 50]); onFrom(c.layer("one label"), 118);
odo(c, "one", "1.6 MIN", [540, 680], 110, 127, 139);                                                     // "under two"
overlay(c); finishComp(c); "5A built";

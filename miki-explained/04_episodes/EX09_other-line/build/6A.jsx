// 6A. "So next time you see one long snaking line, don't groan, it's the fast one. Follow Meikigo for more." 159 f.
// Blender ONE f149–307: the orbit carries on; from f262 the shoppers peel back into three lanes as the camera returns to
// 1A's first pose (S1 loop). IT'S THE FAST ONE stamps; then FOLLOW MEIKIGO and the logo (silent).
var c = freshComp("6A", 159);
paperBg(c); seq(c, "ONE", "market one", 149);
var fo = bigChip(c, "fast", "IT'S THE FAST ONE.", [540, 330], 760, 100, 84, -2); offAll(fo, 104);       // "fast one"
var cp = shapeAt(c, "cta", [540, 360]); rectIn(grp(cp), [700, 300], null, CREAM, INK, 4); shadowLayer(c, cp, 10, 22, 40); onFrom(c.layer("cta"), 106);
var lg = img(c, "logo.png", "logo"); S(lg).setValue([38, 38]); P(lg).setValue([310, 360]); onFrom(lg, 108);
var t1 = text(c, "cta follow", "FOLLOW", "IBM Plex Mono", "Bold", 40, INK, [420, 262, 360, 60], "left", 40); onFrom(t1, 106);
var t2 = text(c, "cta name", "MEIKIGO", "Anton", "Regular", 120, INK, [420, 300, 400, 150], "left", 10); stamp(t2, 108);
var t3 = text(c, "cta more", "FOR MORE", "IBM Plex Mono", "Bold", 34, INK, [420, 462, 360, 50], "left", 40); onFrom(t3, 112);
var cl = [c.layer("cta"), lg, t1, t2, t3]; for (var i = 0; i < cl.length; i++) offAt(cl[i], 150);       // gone before the loop frame
overlay(c); finishComp(c); "6A built";

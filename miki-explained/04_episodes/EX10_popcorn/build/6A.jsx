// 6A. "So a cinema isn't a movie business with a snack bar. It's a snack bar with a very big screen. Follow Meikigo for more."
// 174 f. AUDOUT: out of the screen, back to the whole auditorium. The reframe stamps; then FOLLOW MEIKIGO + logo (silent).
var c = freshComp("6A", 174);
paperBg(c); seq(c, "AUDOUT", "auditorium out", 1);
var rf = bigChip(c, "reframe", "A SNACK BAR WITH\rA VERY BIG SCREEN.", [540, 340], 820, 90, 93, -2); offAll(rf, 112);   // "very big screen"
var cp = shapeAt(c, "cta", [540, 360]); rectIn(grp(cp), [700, 300], null, CREAM, INK, 4); shadowLayer(c, cp, 10, 22, 40); onFrom(c.layer("cta"), 115);
var lg = img(c, "logo.png", "logo"); S(lg).setValue([38, 38]); P(lg).setValue([310, 360]); onFrom(lg, 117);
var t1 = text(c, "cta follow", "FOLLOW", "IBM Plex Mono", "Bold", 40, INK, [420, 262, 360, 60], "left", 40); onFrom(t1, 115);
var t2 = text(c, "cta name", "MEIKIGO", "Anton", "Regular", 120, INK, [420, 300, 400, 150], "left", 10); stamp(t2, 117);
var t3 = text(c, "cta more", "FOR MORE", "IBM Plex Mono", "Bold", 34, INK, [420, 462, 360, 50], "left", 40); onFrom(t3, 121);
overlay(c); finishComp(c); "6A built";

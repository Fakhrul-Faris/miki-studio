// 1A. "Cinemas barely make money on the movie. They make it on your popcorn." 88 f. AUD: from the back row, past the viewer,
// into the blank screen (C1: the screen fills the frame for 2A). H1: the data on frame 2.
var c = freshComp("1A", 88);
paperBg(c); seq(c, "AUD", "auditorium", 1);
var a = bigChip(c, "ticket12", "$12 TICKET", [540, 250], 520, 100, 2, -2);
var b = bigChip(c, "studio6", "$6 TO THE STUDIO", [540, 395], 720, 90, 6, 2);
offAll(a.concat(b), 74);
overlay(c); finishComp(c); "1A built";

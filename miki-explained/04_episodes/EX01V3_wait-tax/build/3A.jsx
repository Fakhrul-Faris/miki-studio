// 3A. "Business professor David Maister put it in one line: occupied time feels shorter." 105 frames (+10 under the tear).
var c = freshComp("3A", 115);
var pl = img(c, "3A.png", "3A card"); S(pl).setValue([75, 75]); P(pl).setValue([W / 2, H / 2]);
var bl = pl.property("ADBE Effect Parade").addProperty("ADBE Gaussian Blur 2");
keys(bl.property(1), [[0, 40], [14, 0]]); smooth(bl.property(1), 60);                      // focus pull: smooth, like a lens
var q = text(c, "quote", "OCCUPIED\rTIME FEELS\rSHORTER", "Anton", "Regular", 118, INK, [170, 560, 740, 500], "center", 10);
q.blendingMode = BlendingMode.MULTIPLY; cutWords(q, [64, 75, 80, 87]);
var CARD = sp(720, 1232), TILT = 12;                                                      // the card's centre and tilt (measured)
tiltAbout(q, CARD, TILT);
var a = mono(c, "attribution", "D. MAISTER, 1985", 40, [170, 1120, 740, 56]); cutOn(a, 24, 1, 16); tiltAbout(a, CARD, TILT);
overlay(c); finishComp(c); "3A built";

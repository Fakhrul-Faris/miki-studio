// MASTER. Cut to the voice. C1 infinite zoom: every shot ends by diving into a cream surface (the screen, the torn ticket,
// the menu board, the bucket, a kernel, the ≈ chip) and the next opens on one — the cuts are hidden in the zoom.
var SHOTS = [["1A", 88], ["2A", 211], ["3A", 200], ["4A", 126], ["5A", 172], ["6A", 174]];
var total = 0; for (var i = 0; i < SHOTS.length; i++) total += SHOTS[i][1];
var c = freshComp("MASTER", total); c.bgColor = [0, 0, 0];
var at = 0, START = {};
for (var i = 0; i < SHOTS.length; i++) { var s = SHOTS[i], l = c.layers.add(item(s[0])); l.name = s[0];
  l.startTime = at * F; l.inPoint = at * F; l.outPoint = (at + s[1]) * F; START[s[0]] = at; at += s[1]; }
// T1: big word-by-word captions in the middle band, hidden where the same words are stamped
var CAP = [[5, 33, "CINEMAS BARELY MAKE MONEY", [5, 14, 21, 27]], [34, 52, "ON THE MOVIE.", [34, 37, 39]], [54, 87, "THEY MAKE IT ON YOUR POPCORN.", [54, 56, 61, 63, 66, 68]],
  [88, 117, "IMAGINE A $12 TICKET", [88, 95, 100, 107]], [118, 180, "AT AMC, AMERICA'S BIGGEST CHAIN.", [118, 123, 147, 159, 164]],
  [181, 206, "ABOUT HALF GOES STRAIGHT", [181, 185, 193, 199]], [207, 238, "BACK TO THE STUDIO.", [207, 213, 217, 220]],
  [239, 267, "IN A BIG FILM'S FIRST WEEKS,", [239, 243, 248, 256, 263]], [268, 298, "EVEN MORE.", [271, 282]],
  [299, 322, "SO THE CINEMA NEEDS", [299, 304, 308, 315]], [323, 352, "ONE THING FROM YOU:", [323, 328, 335, 340]], [353, 381, "A WALK PAST THE COUNTER.", [353, 355, 359, 365, 369]],
  [382, 397, "THAT'S WHY THE LOBBY", [382, 386, 389, 391]], [398, 416, "SMELLS OF BUTTER,", [398, 404, 410]],
  [417, 451, "AND WHY THE LINE FOR SNACKS", [417, 427, 431, 433, 440, 444]], [452, 498, "SITS BETWEEN YOU AND YOUR SEAT.", [452, 462, 471, 477, 481, 483]],
  [499, 525, "HERE'S THE FLIP.", [499, 505, 508]], [534, 565, "AMC'S SNACKS COST IT", [534, 547, 553]], [580, 624, "FOR EVERY DOLLAR IT CHARGES.", [580, 589, 595, 602, 606]],
  [625, 651, "THE AVERAGE GUEST SPENDS", [625, 629, 634, 642]], [672, 703, "ON FOOD AND DRINK.", [672, 683, 689, 691]],
  [704, 745, "AMC KEEPS ABOUT SIX OF IT.", [704, 716, 721, 727, 733, 736]], [746, 765, "FROM THE TICKET,", [746, 750, 753]], [766, 796, "IT KEEPS ABOUT THE SAME.", [766, 768, 772, 777, 781]],
  [797, 819, "SO A CINEMA ISN'T", [797, 802, 806, 811]], [820, 861, "A MOVIE BUSINESS WITH A SNACK BAR.", [820, 821, 825, 834, 839, 842, 846]], [862, 889, "IT'S A SNACK BAR", [862, 866, 867, 871]]];
var CY = 1384;
for (var ci = 0; ci < CAP.length; ci++) {
  var cp = CAP[ci], sz = cp[2].length > 18 ? 64 : 78, wpx = Math.min(1000, cp[2].length * sz * 0.43 + 70);
  var st = c.layers.addShape(); st.name = "cap strip " + (ci + 1); A(st).setValue([0, 0]); P(st).setValue([W / 2, CY]);
  rectIn(grp(st), [wpx, sz * 1.25], null, CREAM, INK, 3); R(st).setValue(ci % 2 ? 0.8 : -0.8);
  var tl = text(c, "cap " + (ci + 1), cp[2], "Anton", "Regular", sz, INK, [40, CY - sz * 0.68, W - 80, sz * 1.4], "center", 10);
  tiltAbout(tl, [W / 2, CY], ci % 2 ? 0.8 : -0.8); cutWords(tl, cp[3]);
}
app.run("comp.open", { comp: "MASTER" });
app.run("file.import", { paths: [DIR + "sfx/mix.wav"], addToComp: true, time: 0 });
c.layer(1).name = "VO + paper foley mix.wav";
for (var ci = 0; ci < CAP.length; ci++) { var cp = CAP[ci], ls = [c.layer("cap strip " + (ci + 1)), c.layer("cap " + (ci + 1))];
  for (var q = 0; q < 2; q++) { ls[q].inPoint = cp[0] * F; ls[q].outPoint = (cp[1] + 1) * F; } }
var log = []; for (var n in START) log.push(n + "@" + START[n]);
"MASTER built, " + total + " frames: " + log.join(" ");

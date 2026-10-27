// F — Takeaway (L06 36.7–44.9): a known wait stays; the unknown one walks away; The Doorway Decision; bookend: a green light above the door.
leave(comp.layer("Your door"), 36.45, 0.4, -12); leave(comp.layer("Saturday"), 36.45, 0.4, -12);
ws("Plan", "A long wait,\rpeople can plan around.", "Medium", 60, CREAM, [110, 180, 880, 170]); calmReveal(comp.layer("Plan"), WT.L06.slice(0, 7));
ws("Away", "An unknown wait,\rthey walk away from.", "SemiBold", 60, PROBLEM, [110, 1460 - 175, 880, 170]); calmReveal(comp.layer("Away"), WT.L06.slice(7, 14));
// the guest gives up: the "?" fades, they drift out of frame
leave(comp.layer("Guess"), w("L06", 10), 0.4);
glide(comp.layer("Guest"), [[w("L06", 11), [780, 1350]], [w("L06", 13) + 0.6, [1260, 1300]]], -40);
comp.layer("Guest").motionBlur = true;
// The Doorway Decision (the photo and bench recede first)
var REC = ["M3", "Door frame", "Plan", "Away", "Bench 1", "Bench 2", "Bench 3", "Bench 4", "Bench 5"];
fadeTo(REC, w("L06", 14) - 0.2, 18, 0.6);
concept("The Doorway", "Decision.", 800, [w("L06", 15), w("L06", 16)], [w("L06", 17)], WT.L06.slice(18), "What does your door tell them?", ANSWER);
// bookend: one green light glows above the door, the opening shape, changed by the story
circle("Bookend glow", 200, ANSWER, [540, 330], true); blurFx(comp.layer("Bookend glow")).setValue(45);
circle("Bookend", 90, ANSWER, [540, 330], true);
enter(comp.layer("Bookend"), w("L06", 18), 0.9); opac(comp.layer("Bookend glow"), [[0, 0], [w("L06", 18) + 0.2, 0], [w("L06", 18) + 1.0, 50]]);
"F: " + comp.numLayers;

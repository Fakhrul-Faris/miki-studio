// 5B. "So what's a 'free' checkout actually costing you?" 80 f. Bookend: back to the opening sign, now titled; the camera
// pulls out of it (the reverse of 1A) and the question cuts on word by word. Ends on the sign, so the loop meets 1A.
var c = freshComp("5B", 80);
plate(c, "1A.png", "5B sign", 0);
headline(c, "title", "THE\rSWIPE TAX", 150, [144, 712, 792, 380], 4, -2);
var q = text(c, "question", "SO WHAT'S A \"FREE\"\rCHECKOUT ACTUALLY\rCOSTING YOU?", "IBM Plex Mono", "Bold", 46, INK, [90, 1236, 900, 170], "center", 20);
threeD(q, -1); cutWords(q, [0, 3, 8, 11, 17, 27, 38, 49]);
camDrift(c, [[0, [540, 912], 1.8], [40, [540, 955], 1.01], [79, [540, 958], 1]]);
overlay(c); marker(c, 4, "SFX: stamp"); finishComp(c); "5B built";

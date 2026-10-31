// 5A. "Most queues are closer to that edge than they look." 64 f. LOOP f1–64: the calm shop, the middle barber about to go;
// its last frame flows into 1A's first (S1). E4: an ochre ring finds the middle barber at 30 (MASTER 768).
var c = freshComp("5A", 64);
paperBg(c);
seq(c, "LOOP", "shop", 1);
offAt(inkRing(c, "edge ring", [560, 760], [300, 620], 30, 38), 50);   // off before he moves: 1A f0 has no ring
overlay(c); finishComp(c); "5A built";

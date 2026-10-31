// 4A. "Here's the flip. [E6: silence] AMC's snacks cost it about twenty cents for every dollar it charges." 126 f.
// The bucket (from 3A's push) pulls back, everything holds still through the silence, then 20¢ stamps; then a dive into a kernel.
var c = freshComp("4A", 126);
paperBg(c);
var zr = ctrl(c, "zoom", [540, 760]);
var pc = img(c, "CO_popcorn.png", "bucket"); A(pc).setValue([651, 981]); P(pc).setValue([540, 1000]); shadowLayer(c, pc, 10, 22, 40);
smooth(keys(S(pc), [[0, [230, 230]], [20, [62, 62]]]), 40);                                                     // out of the bucket
var c20 = text(c, "c20", "20¢", "Anton", "Regular", 300, OCHRE, [60, 140, 960, 400], "center", 10); stamp(c20, 70);   // "twenty cents"
var per = text(c, "per", "PER $1 THEY CHARGE", "IBM Plex Mono", "Bold", 44, INK, [60, 520, 960, 60], "center", 30); onFrom(per, 96);   // "every dollar"
var dv = [pc, c20, per]; for (var i = 0; i < dv.length; i++) dv[i].parent = zr;
smooth(keys(S(zr), [[112, [100, 100]], [125, [520, 520]]]), 20);                                              // into a kernel (cream)
overlay(c, 20); c.layer("OVERLAY").property("ADBE Time Remapping").expression = "var t = time < " + 20 * F + " ? time : (time < " + 35 * F + " ? " + 20 * F + " : time - " + 15 * F + "); Math.floor(t * 12) / 12";
finishComp(c); "4A built";

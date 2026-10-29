// 2B. "The wait fell to eight minutes. The complaints didn't." 70 frames. Diagram: counter 12 → 8; complaint slips pile up.
var c = freshComp("2B", 70);
paperBg(c);
var n = text(c, "counter", "12 MIN", "Anton", "Regular", 260, INK, [60, 430, 960, 300], "center", 10); n.blendingMode = BlendingMode.MULTIPLY;
n.property("ADBE Text Properties").property("ADBE Text Document").expression = 'posterizeTime(12); Math.round(linear(time, 8 / 24, 19 / 24, 12, 8)) + " MIN"';
mono(c, "label", "AVERAGE WAIT", 40, [60, 370, 960, 60]);
for (var i = 0; i < SLIPS.length; i++) {                                                   // slips pile up from "complaints didn't"
  var sn = slipNote(c, i); hold(O(sn[0]), [[0, 0], [41 + i * 3, 100]]); hold(O(sn[1]), [[0, 0], [41 + i * 3, 100]]);
}
var cam = camera(c); smooth(keys(P(cam), [[0, [W / 2, H / 2, camZ(1)]], [69, [W / 2, H / 2, camZ(1.04)]]]), 40);
overlay(c); marker(c, 19, "SFX: counter clunk"); finishComp(c); "2B built";

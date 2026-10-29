// 2E. "Complaints dropped to near zero." 43 frames. The slips fall away; NEAR ZERO stamps on "zero".
var c = freshComp("2E", 43);
paperBg(c);
for (var i = 0; i < SLIPS.length; i++) {                                                   // the notes fall with their slips
  var s = slipNote(c, i)[0], d = SLIPS[i];
  stepped(keys(P(s), [[i, [d[0], d[1]]], [i + 12, [d[0] + (i % 2 ? 60 : -60), d[1] + 1300]]]), "in");
  stepped(keys(R(s), [[i, d[2]], [i + 12, d[2] * 4]]), "in");
}
headline(c, "NEAR ZERO", "NEAR\rZERO", 230, [60, 520, 960, 520], 24);                     // on "zero"
mono(c, "complaints", "COMPLAINTS", 40, [60, 460, 960, 56]);
overlay(c); marker(c, 24, "SFX: stamp"); finishComp(c); "2E built";

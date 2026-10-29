// 4B. "Five people on the bench, nothing to do but watch the chairs." 75 frames. The clock appears on the wall on "watch".
var c = freshComp("4B", 75);
plate(c, "4B.png", "4B paper bench", 0);
var CK = [420, 420], k = 0.3;
var ck = threeD(img(c, "clock.png", "wall clock"), -1); A(ck).setValue([724, 1000, 0]); P(ck).setValue([CK[0], CK[1], -1]); S(ck).setValue([k * 100, k * 100, k * 100]);
stepped(keys(S(ck), [[47, [118 * k, 118 * k, 118 * k]], [49, [100 * k, 100 * k, 100 * k]]]), "out"); onFrom(ck, 47);   // stamps on, on "watch"
var hs = hands(c, CK, 0.3, -2); for (var j = 0; j < hs.length; j++) onFrom(hs[j], 47);
var cam = camera(c), poi = tf(cam).property("ADBE Anchor Point");
keys(P(cam), [[0, [W / 2, H / 2, camZ(1)]], [58, [W / 2, H / 2, camZ(1.03)]], [74, [CK[0], CK[1], camZ(2.6)]]]);
keys(poi, [[0, [W / 2, H / 2, 0]], [58, [W / 2, H / 2, 0]], [74, [CK[0], CK[1], 0]]]); smooth(P(cam), 50); smooth(poi, 50);
overlay(c); marker(c, 47, "SFX: tick"); finishComp(c); "4B built";

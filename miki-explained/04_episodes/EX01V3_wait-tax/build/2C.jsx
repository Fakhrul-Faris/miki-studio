// 2C. "One minute was walking. Seven were standing at the belt, doing nothing." 81 frames.
// The 8-minute ring splits 1 / 7; dolly zoom on "doing nothing": the hall recedes, the man stays the same size.
var c = freshComp("2C", 81);
var MC = [623, 1411], AT = [540, 1080];
var bg = img(c, "2C_plate.png", "2C hall"); A(bg).setValue(MC); P(bg).setValue(AT); S(bg).setValue([100, 100]);
var man = img(c, "2C_man.png", "2C man"); A(man).setValue(MC); P(man).setValue(AT); S(man).setValue([100, 100]);
keys(S(bg), [[0, [100, 100]], [55, [100, 100]], [80, [88, 88]]]); smooth(S(bg), 70);       // dolly zoom: smooth, like the camera
var RC = [540, 330];
disc(c, "ring disc", RC, 150, PAPER); shadowLayer(c, c.layer("ring disc"), 8, 16, 35);
var arcs = ring(c, "ring", RC, 105, [["walk", INK, 30, 0, 12.5], ["stand", OCHRE, 30, 12.5, 100]]);
hold(arcs.stand.property("ADBE Vector Trim End"), [[0, 12.5], [28, 100]]);                // on "seven"
var t1 = mono(c, "walking", "1 MIN WALKING", 36, [70, 500, 940, 50]); cutOn(t1, 0, 1, 13);
var t2 = mono(c, "standing", "7 MIN STANDING", 36, [70, 550, 940, 50]); cutOn(t2, 28, 1, 14);
overlay(c); marker(c, 57, "SFX: low swell under the dolly zoom"); finishComp(c); "2C built";

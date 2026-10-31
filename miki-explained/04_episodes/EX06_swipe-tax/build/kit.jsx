// Precomps built once: NOTE (a paper $10 note, 760×340) and RECEIPT (a household's year of card fees, 520×1500).
var c = freshComp("NOTE", 300, NW, NH);
c.layers.addSolid(NOTEPAPER, "note paper", NW, NH, 1);
var tx = img(c, "paper.png", "texture"); S(tx).setValue([60, 60]); P(tx).setValue([NW / 2, NH / 2]); tx.blendingMode = BlendingMode.MULTIPLY; O(tx).setValue(80);
var fr = shapeAt(c, "frame", [NW / 2, NH / 2]); rectIn(grp(fr), [NW - 64, NH - 64], null, null, INK, 2); rectIn(grp(fr), [NW - 36, NH - 36], null, null, INK, 5);
var ov = shapeAt(c, "oval", [NW / 2, NH / 2]); ellIn(grp(ov), [300, 214], null, OCHRE, INK, 3);
text(c, "ten", "$10", "Anton", "Regular", 130, INK, [NW / 2 - 150, NH / 2 - 84, 300, 170], "center", 0);
text(c, "c1", "10", "Anton", "Regular", 56, INK, [44, 30, 120, 70], "left", 0);
text(c, "c2", "10", "Anton", "Regular", 56, INK, [NW - 164, NH - 104, 120, 70], "right", 0);
finishComp(c);

var r = freshComp("RECEIPT", 300, 520, 1130);
r.layers.addSolid(CREAM, "receipt paper", 520, 1130, 1);
var rt = img(r, "paper.png", "texture"); S(rt).setValue([60, 60]); P(rt).setValue([260, 565]); rt.blendingMode = BlendingMode.MULTIPLY; O(rt).setValue(60);
text(r, "head", "MERCHANT GROUPS SAY", "IBM Plex Mono", "Bold", 30, INK, [20, 36, 480, 44], "center", 20);
text(r, "sub", "ONE HOUSEHOLD · ONE YEAR\r- - - - - - - - - - - - - - -", "IBM Plex Mono", "Medium", 22, INK, [20, 92, 480, 60], "center", 0);
var AM = ["0.24", "1.18", "0.07", "2.40", "0.61", "0.35", "1.92", "0.48", "0.12", "3.10", "0.77", "0.29"], L = [];
for (var i = 0; i < 26; i++) L.push("CARD FEE ............ $" + AM[(i * 5) % AM.length]);
text(r, "lines", L.join("\r"), "IBM Plex Mono", "Medium", 22, INK, [30, 168, 460, 620], "left", 0);
text(r, "rule", "- - - - - - - - - - - - - - -\rTOTAL", "IBM Plex Mono", "Bold", 26, INK, [20, 790, 480, 70], "center", 0);
text(r, "total", "$1,000+", "Anton", "Regular", 150, INK, [20, 836, 480, 175], "center", 0);
text(r, "year", "A YEAR", "IBM Plex Mono", "Bold", 28, INK, [20, 1068, 480, 44], "center", 30);
finishComp(r);
"kit built";

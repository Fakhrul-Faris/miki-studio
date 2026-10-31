// 1B. "Every time you tap your card, a fee fires off. You never see it. The shop pays it, instantly." 129 f + 10 (tear).
// S4 split: left, what you see (the hand taps, you pay $10). Right, what's real (a fee coin leaves the till on every tap).
var c = freshComp("1B", 139);
paperBg(c);
inkLine(c, "divider", [540, 268], [540, 1320], 6, 0, 6, INK);
chip(c, "see", "WHAT YOU SEE", [270, 312], 450, 40, 0);
chip(c, "real", "WHAT'S REAL", [810, 312], 450, 40, 0);
var rd = tapPart(c, "reader", "reader"); S(rd).setValue([46, 46]); P(rd).setValue([270, 880]); boil(rd, 12, 1.5, 0.4);
var hd = tapPart(c, "hand", "hand"); S(hd).setValue([46, 46]);
keys(P(hd), [[0, [270, 740]], [13, [270, 880]], [26, [270, 880]], [34, [270, 846]]]); boil(hd, 11, 2, 0.6);   // the tap on "tap"
var reg = img(c, "CO_register.png", "register"); A(reg).setValue([726, 1251]); S(reg).setValue([46, 46]); P(reg).setValue([810, 900]); boil(reg, 13, 1.5, 0.4);
var DRAWER = [614, 1080];
popCoin(c, "fee 1", 34, 40, DRAWER, [[42, [624, 1050]], [52, [1180, 160]]], 21);   // "fires off"
popCoin(c, "fee 2", 34, 70, DRAWER, [[72, [624, 1050]], [82, [1180, 160]]], 22);   // "you never see it"
popCoin(c, "fee 3", 34, 100, DRAWER, [[102, [624, 1050]], [112, [1180, 160]]], 23);
chip(c, "pay", "YOU PAY $10.00", [270, 1268], 450, 40, 65, CREAM, -1.5);           // what you see
chip(c, "gets", "SHOP GETS $9.76", [810, 1268], 450, 40, 89, CREAM, 1.5);          // "the shop pays it"
overlay(c); marker(c, 13, "SFX: card beep"); marker(c, 40, "SFX: pop"); marker(c, 89, "SFX: ding");
finishComp(c); "1B built";

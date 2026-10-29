// 2A. "An airport in Houston hired more baggage handlers to stop the complaints." 81 frames.
var c = freshComp("2A", 81);
paperBg(c);
var p = photo(c, "M1_print.png", "M1 baggage claim", 62, [540, 1120], 1.2);
P(p).expression = "posterizeTime(12); add(value, [0, -time * 18])";
var hl = mono(c, "HOUSTON", "HOUSTON · BAGGAGE CLAIM", 44, [70, 200, 940, 60]); cutOn(hl, 15, 1, 23);    // on "Houston"
var X = [250, 450, 650, 850];
for (var i = 0; i < 4; i++) {                                                               // handlers step on, on "handlers"
  var h = img(c, "CO_handler.png", "handler " + (i + 1)); S(h).setValue([i % 2 ? -24 : 24, 24]); A(h).setValue([670, 1800]); P(h).setValue([X[i], 1330]);
  hold(O(h), [[0, 0], [38 + i * 4, 100]]);
}
overlay(c); marker(c, 40, "SFX: (handlers)"); finishComp(c); "2A built";

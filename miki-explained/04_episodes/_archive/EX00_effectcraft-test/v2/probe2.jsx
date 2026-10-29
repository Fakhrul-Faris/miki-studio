for (var k = comp.numLayers; k >= 1; k--) if (comp.layer(k).name.indexOf("PROBE") == 0) comp.layer(k).remove();
var c = card("PROBE card", [540, 960], [600, 300], 36);
var t = tile("PROBE tile", [540, 960], 120, ORANGE, pictPause);
var a = tile("PROBE tile2", [740, 960], 120, BLUE, pictArrowRight);
"ok";

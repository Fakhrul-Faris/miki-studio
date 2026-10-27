// EX00V4 camera test: camera moves as expressions (test only; not in the kit until approved).
// Runs headless on a copy of EX02V2: effectcraft-cli script build/cam.jsx <in>.ecproj --save-as <out>.ecproj
// VARIANT = "B" (curve only), "C" (B + depth), "D" (C + longer push) is prepended by run.sh.

var c; for (var i = 1; i <= app.project.numItems; i++) if (app.project.item(i).name == "EX02V2") c = app.project.item(i);
function tfm(l) { return l.property("ADBE Transform Group"); }

// Cubic ease-in-out (a camera eases out of rest and into the hold) + log-space zoom (even perceived speed).
var EASE = "function e(x){x=Math.min(1,Math.max(0,x));return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;}";
// segs: [[t0, t1, s0, s1, [x0, y0], [x1, y1]], ...]; holds the last value between and after segments.
function camState(segs) {
  return EASE + "var S=" + JSON.stringify(segs) + ";var s=S[0][2],x=S[0][4][0],y=S[0][4][1];" +
    "for(var i=0;i<S.length;i++){var g=S[i];if(time>=g[0]){var p=e((time-g[0])/(g[1]-g[0]));" +
    "s=g[2]*Math.pow(g[3]/g[2],p);x=g[4][0]+(g[5][0]-g[4][0])*p;y=g[4][1]+(g[5][1]-g[4][1])*p;}}";
}

var PULL0 = 28.3, PULL1 = 30.1, PUSH0 = 30.5, PUSH1 = 31.45;
if (VARIANT == "D") { PUSH0 = 30.25; PUSH1 = 31.75; }
var SEGS = [[PULL0, PULL1, 100, 24, [540, 960], [540, 1060]], [PUSH0, PUSH1, 24, 2600, [540, 1060], [540, 960]]];

var cam = c.layer("CAM");
tfm(cam).property("ADBE Scale").expression = camState(SEGS) + "[s,s]";
tfm(cam).property("ADBE Position").expression = camState(SEGS) + "[x,y]";

// C, D: depth by distance. Each field signal hangs from a plane null at depth z = K * (its grid distance from the hero),
// in units of the camera distance at 100%. A plane at depth z shows at scale s/(1+s*z) when the hero shows at s, so the
// field curves away like a shallow bowl: far rings grow less (dolly parallax), and no ring can overtake the one inside it.
if (VARIANT == "C" || VARIANT == "D") {
  var K = 0.1, planes = {}, placed = [], k = 0;
  for (var gx = -5; gx <= 5; gx++) for (var gy = -6; gy <= 6; gy++) {
    if (gx == 0 && gy == 0) continue;
    var name = "Sig " + (++k), z = Math.round(K * Math.sqrt(gx * gx + gy * gy) * 1000) / 1000, pn = "PLANE " + z;
    if (!planes[pn]) {
      var n = c.layers.addNull(); n.name = pn; planes[pn] = true;
      tfm(n).property("ADBE Anchor Point").setValue([540, 960]);
      tfm(n).property("ADBE Scale").expression = 'var s=thisComp.layer("CAM").transform.scale[0]/100;var q=s/(1+s*' + z + ');[q*100,q*100]';
      tfm(n).property("ADBE Position").expression = 'thisComp.layer("CAM").transform.position';
    }
    // .parent = compensates in scripts (it rescales and moves the layer to cancel the new parent): restore its own transform
    var sl = c.layer(name), keep = [tfm(sl).property("ADBE Anchor Point").value, tfm(sl).property("ADBE Position").value, tfm(sl).property("ADBE Scale").value];
    sl.parent = c.layer(pn);
    tfm(sl).property("ADBE Anchor Point").setValue(keep[0]); tfm(sl).property("ADBE Position").setValue(keep[1]); tfm(sl).property("ADBE Scale").setValue(keep[2]);
    placed.push([z, name]);
  }
  // Stack the signals under the hero, farthest lowest: move the farthest first, each nearer one lands above it.
  placed.sort(function (a, b) { return b[0] - a[0]; });
  for (var q = 0; q < placed.length; q++) c.layer(placed[q][1]).moveAfter(c.layer("Dot glow"));
}

// D: the push now starts 0.25s earlier and lands 0.3s later; move the lamp relight and the brown fill with it.
if (VARIANT == "D") {
  tfm(c.layer("Lamp Green")).property("ADBE Opacity").expression = "time < 28.3 ? value : linear(time, 29.75, 30.15, 0, 100)";
  tfm(c.layer("Brown")).property("ADBE Opacity").expression = "linear(time, " + (PUSH1 - 0.15) + ", " + (PUSH1 + 0.35) + ", 0, 100)";
}
VARIANT + ": " + c.numLayers + " layers";

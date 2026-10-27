// A — Hook (L01 0.4–4.2): push into M1's real lamp; the lamp becomes our glowing green dot as the photo dissolves to cream.
clearComp(); importLines(["L01", "L02", "L03", "L04", "L05", "L06"]);
var DOT = [540, 760];
camera("CAM");
// M1 anchored on its bottom lamp (source px 1100,840) so the push lands exactly on it
bleed("M1.png", "M1", 0, 3.6, { anchor: [1100, 840], at: [825, 630], s0: 75, s1: 150, tint: 30, inf: 60, fo: 0.6 });
// start full-frame (lamp where it naturally sits), drift the lamp to the dot position as the camera pushes in
var mp = P(comp.layer("M1")); mp.setValueAtTime(0, [825, 630]); mp.setValueAtTime(3.6, DOT); soft(mp, 70);
var mb = blurFx(comp.layer("M1")); mb.setValueAtTime(3.0, 0); mb.setValueAtTime(3.9, 20); soft(mb);
// the dot (+ a soft glow) appears where the lamp is, same size, then settles to 90 px
function light(name, pos, size, color) {
  circle(name + " glow", size * 2.2, color, pos, true); var g = comp.layer(name + " glow"); var gb = blurFx(g); gb.setValue(40);
  tf(comp.layer(name + " glow")).property("ADBE Opacity").setValue(45);
  circle(name, size, color, pos, true);
  return comp.layer(name);
}
light("Dot", DOT, 90, ANSWER);
var ds = tf(comp.layer("Dot")).property("ADBE Scale"); ds.setValueAtTime(3.1, [60, 60]); ds.setValueAtTime(4.1, [100, 100]); soft(ds);
opac(comp.layer("Dot"), [[0, 0], [3.05, 0], [3.55, 100]]);
opac(comp.layer("Dot glow"), [[0, 0], [3.3, 0], [4.0, 45]]);
comp.layer("Dot").parent = comp.layer("CAM"); comp.layer("Dot glow").parent = comp.layer("CAM");
// the hook on a cream card: when the photo dissolves to cream, the card becomes the page (seamless)
card("Hook card", [540, 1250], [960, 380], 44, CREAM); enter(comp.layer("Hook card"), 0.2, 0.7);
ws("Hook 1", "This barbershop tells you how long you'll wait", "SemiBold", 66, INK, [100, 1110, 880, 170]); calmReveal(comp.layer("Hook 1"), WT.L01.slice(0, 8));
ws("Hook 2", "before you even walk in.", "SemiBold", 66, ANSWER, [100, 1290, 880, 90]); calmReveal(comp.layer("Hook 2"), WT.L01.slice(8));
leave(comp.layer("Hook 1"), 4.15, 0.45, -16); leave(comp.layer("Hook 2"), 4.15, 0.45, -16);
var sh = comp.layer("Hook card"); app.run("prop.set", { layer: sh.id, path: "layerStyles/dropShadow/opacity", value: 12, time: 3.0 }); app.run("prop.set", { layer: sh.id, path: "layerStyles/dropShadow/opacity", value: 0, time: 3.8 });
leave(comp.layer("Hook card"), 4.2, 0.3);
"A: " + comp.numLayers;

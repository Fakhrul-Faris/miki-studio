comp.layer("Hub").moveToBeginning(); comp.layer("Arrow tile").moveToBeginning();   // carried tiles fly above the card
for (var i = 1; i <= comp.numLayers; i++) { var l = comp.layer(i); if (!l.hasAudio || l.hasVideo) { l.inPoint = 0; l.outPoint = comp.duration; } }
comp.layers.addSolid([0.5, 0.5, 0.5], "Grain", W, H, 1);
comp.layer("Grain").adjustmentLayer = true;
comp.layer("Grain").property("ADBE Effect Parade").addProperty("ADBE Noise");
comp.layer("Grain").property("ADBE Effect Parade").property(1).property(1).setValue(4);
comp.layer("Grain").outPoint = comp.duration;
comp.motionBlur = true;
try { comp.shutterAngle = 180; } catch (e) { writeLn("shutter: " + e); }
"finish: " + comp.numLayers + " motionBlur=" + comp.motionBlur;

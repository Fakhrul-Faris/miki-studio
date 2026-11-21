---
title: Steadicam smoothing — bake a rough camera path to every frame, smooth it, then decimate to editable keys
bucket: 05_Camera_Raea_Pipeline
source: "Motion Feel, Easing & Camera Choreography/Cinematic Camera Movements Blender Tutorial.txt"
source_time: "04:34–05:20"
tool_target: raea
tier: full
use_when: "a camera path roughed in by hand (or exported from a .blend camera map) has bumps or jitter before it goes to raea"
style_fit: "Fits: turns a hand-blocked flight into a gimbal-smooth one (our camera is never handheld); don't over-smooth into a straight line."
---

## METADATA
05_Camera_Raea_Pipeline | Blender (source) → Blender bpy before blend2raea, or a smoothing pass on sampled raea camera keys | Blender bpy + raea

## CREATIVE_INTENT
"Steadicam / gimbal shot: just like the handheld shot but we're going to smooth out our animation." Bake a key on every
frame, smooth repeatedly, then reduce the key count so the path is editable again. "This will change how you animate
forever."

## STE_PROCEDURE
1. Before baking, make sure there is a key on the very first and very last frame, even if nothing moves there.
2. Select all camera keys in the Graph Editor (A).
3. Bake a key on every frame (Alt+Shift+O).
4. Smooth the keys (Alt+O); repeat (hold) until the bumps are gone.
5. Stop before the motion flattens ("eventually your animation will turn into just a straight line").
6. Decimate (Key → Density → Decimate, ratio) to fewer keys; slide right for fewer.
7. Edit the remaining keys individually.

## AGENT_EXECUTION
Blender 4.2+/5.x:
```python
import bpy
cam = bpy.context.scene.camera
bpy.ops.object.select_all(action='DESELECT'); cam.select_set(True); bpy.context.view_layer.objects.active = cam
area = next(a for a in bpy.context.screen.areas if a.type == 'GRAPH_EDITOR')   # needs an open Graph Editor
with bpy.context.temp_override(area=area, region=area.regions[-1]):
    bpy.ops.graph.select_all(action='SELECT')
    bpy.ops.graph.bake_keys()                       # Alt+Shift+O
    for _ in range(4): bpy.ops.graph.smooth()       # Alt+O, ~4 passes
    bpy.ops.graph.decimate(mode='RATIO', factor=0.7) # ~ keep 30 %
```
raea (camera already sampled per frame as `pts[i]`): a centred moving average (window ~7–9 frames, `~`) on position and
look-at target, endpoints held fixed — the same effect without Blender.

### Worked example
Topic: "Dari ladang ke gerai — perjalanan sebiji kelapa RM3" (illustrative).
- BEFORE: `| 6 | "Kelapa ni naik lori 300 km" | camera flight over a toy-scale road, hand-keyed in 6 keys; visible bumps at keys 3 and 5 |`
- AFTER: same row, path baked → 4 smooth passes → decimated to 3 keys; the flight glides like a gimbal, ending on the composed truck frame on "300 km".

### Check
- Are there keys on the first and last frame before baking?
- Are bumps gone but the path still curved (not a straight line)?
- Are endpoints (the composed A and B frames) unchanged?

## NOTES
- Source records the rough path with walk navigation (Shift+~) and auto-keying; we block by hand instead (no POV).
- Graph-editor keystroke sequence is spoken; the result curves are visual only.
- Operator names verified in Blender 5.3: `graph.bake_keys`, `graph.smooth`, `graph.decimate` exist (`graph.sample` no longer does).

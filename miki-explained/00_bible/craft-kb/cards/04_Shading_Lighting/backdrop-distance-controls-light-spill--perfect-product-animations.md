---
title: Push the backdrop away to kill light spill (and extend clip end)
bucket: 04_Shading_Lighting
source: "How to Make Perfect Product Animations in Blender.txt"
source_time: "13:25–14:28"
blender_version_source: 4.x (~4.4)
tool_target: Blender bpy
tier: full
style_fit: strong — keeps the room dark around a lit hero object
---

## METADATA
04_Shading_Lighting | Blender 4.4 (source), 4.2+/5.x code | Blender bpy + raea

## CREATIVE_INTENT
When you add key/side lights to the product, a nearby backdrop catches them and turns grey. Distance, not power, is the cure: push the backdrop far back so the product lights fall off before reaching it, then light the backdrop with its own lamp.

## STE_PROCEDURE
1. Snap the 3D cursor to the camera (Cursor to Selected).
2. Set Transform Pivot Point to 3D Cursor.
3. Select the backdrop plane; scale it up around the cursor until the product lights no longer show on it.
4. If the plane disappears from camera view, set camera Clip End from 1000 to 3000 (or more).
5. Raise the backdrop lamp's Power by "a couple of zeros" (×100) to restore the gradient at the new distance.

## AGENT_EXECUTION
```python
import bpy
cam = bpy.context.scene.camera
bg = bpy.data.objects["Backdrop"]; gl = bpy.data.objects["BackdropLight"]
k = 10.0                                     # ~ scale factor about the camera
for ob in (bg,):
    ob.location = cam.location + (ob.location - cam.location) * k   # scale about cursor = camera
    ob.scale *= k
cam.data.clip_end = 3000
gl.data.energy *= 100                        # "add a couple of zeros"
```
(If the light is parented to the backdrop it moves with it; scale its size by `k` as well to keep the gradient's shape.)

raea: same physics — Bevy lights fall off with distance squared and `range` (20 m default) cuts them entirely. Either set product lights' `range` short (e.g. `range={3}`) so they never reach the backdrop, or place the backdrop beyond it. With the CSS-gradient backdrop (see camera-locked-backdrop-gradient card) there is no spill at all. Far geometry: raea has no clip-end prop documented; keep backdrops within a sane distance.

## NOTES
- Deprecated: none.
- Visual gaps: the exact scale factor is not stated.
- Rule conflicts: none.

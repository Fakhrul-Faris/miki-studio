---
title: Layout with low-poly proxies to judge speed; add obstacles that give the motion something to avoid
bucket: 03_Modeling_Modifiers
source: "CG Cinematography 101 | Chapter 4 | Camera Analysis (The Chase).txt"
source_time: "08:21–09:52, 19:33–20:49, 25:03–25:48"
blender_version_source: n/a (Houdini)
tool_target: principle-only | Blender bpy
tier: principle
style_fit: Fits our grey-box board and camera map: judge motion on simple blocks, then swap in detailed assets.
---

## METADATA
03_Modeling_Modifiers | n/a (Houdini) → Blender 4.2+ | principle + translation

## CREATIVE_INTENT
Principle: for camera layout, replace detailed geometry (greebles, spikes) with simple low-poly blocks (in Houdini via a VDB conversion) so the viewport plays fast and you judge only movement and speed. Then add obstacles (bridges, blockers) for the subject to avoid; without them it just flies straight. Obstacles open up motion paths and camera opportunities; later blockers can also be destroyed by the action. Remove temporary blockers when the final animation no longer needs them.
Ideas: in a tabletop scene, props the camera threads between (a stack of coins, a cup) make a flight feel spatial.

## STE_PROCEDURE
Method:
1. Convert or replace detailed assets with low-poly proxies for layout.
2. Block the subject's and camera's motion against the proxies; judge speed and closeness.
3. Add obstacles the subject (or camera) must go around, over or under.
4. Re-time the motion around the obstacles.
5. Swap proxies back to detailed assets for the render; delete temporary blockers.

## AGENT_EXECUTION
### Source tool (Houdini)
`geo → VDB from Polygons → Convert VDB (to polygons, low adaptivity)` as the layout proxy; obstacles as simple boxes.
### Blender / raea translation
Blender proxy (Remesh is the VDB equivalent):
```python
import bpy
for o in [o for o in bpy.context.scene.objects if o.name.startswith("SET_")]:
    p = o.copy(); p.data = o.data.copy(); p.name = "PRX_" + o.name
    bpy.context.scene.collection.objects.link(p)
    r = p.modifiers.new("Remesh", 'REMESH'); r.mode = 'BLOCKS'; r.octree_depth = 4   # ~ coarse
    d = p.modifiers.new("Decimate", 'DECIMATE'); d.ratio = 0.1                          # ~
    o.hide_viewport = True
```
Camera-path collision check against obstacles before hand-off (see aim-target-follows-moving-subject--blender-camera-rig: paths.py).
raea: layout proxies are Cuboids in an animatic; final uses `<Model>`s.

## NOTES
- Deprecated: none.
- Visual gaps: the layout file is described as "a bit of a mess" and not walked through.
- Rule conflicts: destroying blockers (explosions) is outside our tone; obstacles are for path shape only. Their own file per shot is recommended over one shared file (see one-scene-per-shot--car-animation).

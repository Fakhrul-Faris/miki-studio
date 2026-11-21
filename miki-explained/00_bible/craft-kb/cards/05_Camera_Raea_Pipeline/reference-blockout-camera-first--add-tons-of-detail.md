---
title: Detail workflow order — loose references → cube blockout + camera + rough light → repeat-kit → unique breakers
bucket: 05_Camera_Raea_Pipeline
source: "How to Add Tons of Detail To Your Renders  Blender.txt"
source_time: "00:21–01:34, 01:45–02:36"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Matches our shot-first gates (study → shot list → grey-box board → world). The camera is fixed before any detail, so detail goes only where the lens sees it.
---

## METADATA
05_Camera_Raea_Pipeline | 4.x source → 4.2+ / raea | Blender bpy, raea

## CREATIVE_INTENT
A dense render feels impossible until it is split into an order of work. Gather loose references for shapes (ships,
docks, oil rigs for "industrial"). Block the space out with cubes, a basic light and a camera. Model or import the
pieces that will repeat many times. Finish with a few unique models so the repetition doesn't show.

## STE_PROCEDURE
1. Collect reference photos for the style and its shapes; they need not be specific (here: boats, ships, docks).
2. Add a Cube and extrude it up into the rough space (here: a tall shaft with an opening at the top).
3. Set the output resolution for the delivery format (source: 1920 × 1080 for a landscape thumbnail).
4. Add a Camera; set Focal Length 24 mm; aim it upward toward the opening.
5. Set the camera's Clip End to 1000 m so the whole block-out is visible.
6. Add a basic light; frame the shot until the space reads.
7. Before you model detail, list the pieces that will repeat (railings, pipes, structural brackets).
8. Model those repeat pieces, or bring them from the Asset Browser or a bought pack.
9. Before you finish, add a few unique models to break the pattern of repeated pieces.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy, math
sc = bpy.context.scene
sc.render.resolution_x, sc.render.resolution_y = 1080, 1920      # OUR delivery: 9:16 (source used 1920x1080)
bpy.ops.mesh.primitive_cube_add(size=10, location=(0, 0, 5))
shaft = bpy.context.object; shaft.name = "blockout_shaft"; shaft.scale.z = 4            # ~ "extrude straight up"
cam_data = bpy.data.cameras.new("Cam"); cam_data.lens = 24; cam_data.clip_end = 1000
cam = bpy.data.objects.new("Cam", cam_data); sc.collection.objects.link(cam); sc.camera = cam
cam.location = (3, -3, 2); cam.rotation_euler = (math.radians(120), 0, math.radians(35))   # ~ looking up
sun = bpy.data.objects.new("blockout_key", bpy.data.lights.new("blockout_key", 'AREA'))
sun.data.energy = 500; sun.data.size = 5; sun.location = (0, 0, 45); sc.collection.objects.link(sun)   # ~
```
### raea
- 24 mm on 9:16 (sensor 36 mm, AUTO fit = long side): vertical fov = `2 * Math.atan(18 / 24)` ≈ 1.287 rad.
  `blend2raea.py` computes it per frame. Clip End has no raea prop to set.
- Grey-box board in raea before detail: BlendShot plays the block-out `.glb` as clay. Judge the frame on stills
  (memory: stills for look tests).

## NOTES
- Visual gaps: block-out proportions, camera position and the opening are by eye (01:49–02:36).
- Rule conflicts: none. For Style D the "block-out" is the hero object + its surface + camera setups every 2–3 s. Fix all
  setups before dressing so detail goes only where a setup looks.
- Kit-piece cards from this source: pipe cluster, array railing, structural bracket, kit dressing.

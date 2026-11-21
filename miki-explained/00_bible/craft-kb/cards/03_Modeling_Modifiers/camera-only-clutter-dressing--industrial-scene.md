---
title: Foundation first, clutter last — dressing pre-made pieces by eye through the shot camera
bucket: 03_Modeling_Modifiers
source: "Making an Industrial Scene in Blender.txt"
source_time: "04:54–05:11, 09:16–15:18"
blender_version_source: 3.x
tool_target: Blender bpy
tier: principle
style_fit: Useful for the background around a Style D hero (racks, cables, shelf stock) — dressing only what the shot camera sees. conflict: the video's photo-scanned people as filler must not be used (no people in street scenes by default; figures pose only).
---

## METADATA
03_Modeling_Modifiers | 3.x → 4.2+ | Blender bpy

## CREATIVE_INTENT
Principle: build a solid foundation (big blockout, floor/walls, key light) before any intricate detail, because a set full of small pieces is hard to work in. Ideas: once the base looks cool, "slam" duplicates of one pre-made clutter chunk (antennas, wires, pipes) wherever they look good from the render camera — intersecting, rotated off-purpose, janky from the side — since only the camera's view matters.

## STE_PROCEDURE
Method:
1. Build the foundation first: main shapes lined up, a floor and two walls (thin extruded planes), and the key light.
2. Do not add small clutter until the foundation already looks good in render view.
3. Bring in medium background assets (stairs, walkways, pipes); keep their quality low if they sit far back.
4. Add foreground grunge (the video uses a photo-scanned sand patch).
5. Take one pre-made clutter chunk; duplicate it.
6. Rotate the copy (e.g. 90°) and move it while watching the camera's rendered view.
7. Keep it where it reads well; move it again where it looks bad.
8. Repeat until gaps are filled; ignore clipping that the camera cannot see.
How-to:
9. Lock the shot camera before dressing so placements are judged from the final view.

## AGENT_EXECUTION
### Source tool (Blender)
```python
import bpy, math, random
random.seed(11)
src = bpy.data.objects["KB_antennas"]            # one pre-made clutter chunk
cam = bpy.context.scene.camera
for i in range(12):                              # ~ count by eye in the video
    d = src.copy(); d.data = src.data            # linked duplicate (Alt+D)
    bpy.context.collection.objects.link(d)
    d.rotation_euler = (random.choice([0, math.pi/2]), random.choice([0, math.pi/2]), random.uniform(0, 2*math.pi))
    d.location = (random.uniform(-3, 3), random.uniform(1, 6), random.uniform(0, 3))   # ~ then adjust by eye
# keep only copies inside the camera frustum (unseen ones waste GLB size)
from bpy_extras.object_utils import world_to_camera_view
sc = bpy.context.scene
for o in [o for o in sc.objects if o.data == src.data and o is not src]:
    u, v, z = world_to_camera_view(sc, cam, o.matrix_world.translation)
    if z < 0 or not (-0.1 < u < 1.1 and -0.1 < v < 1.1):
        bpy.data.objects.remove(o)
```
### Blender / raea translation
raea renders the dressed set as the exported GLB. Because the camera flies every 2–3 s in Style D, check every camera setup in the animatic for exposed clipping before export; a placement that is fine for one still may break on a flight. raea: no equivalent for the placement itself.

## NOTES
- Viewport tip: Solid view with texture colour is faster than Material Preview for dressing.
- Background-quality rule from the video: "only the overall basic shape and colours matter" for far pieces.
- Visual gaps: nearly all placements are shown, not described; random placement above is a starting point only.
- Rule conflicts: drop the photo-scanned people (background filler in the video) — default no people; if a figure is ever approved it holds a pose. Camera-only dressing must survive Style D's camera flights, not just one frame.

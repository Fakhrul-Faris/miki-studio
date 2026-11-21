---
title: Deliberate overlap: let objects partly cover what's behind them
bucket: 05_Camera_Raea_Pipeline
source: "How to Add DEPTH to Your Renders.txt"
source_time: "08:49–09:55"
blender_version_source: 3.x?
tool_target: Blender bpy | principle-only
tier: full
style_fit: Cheap depth cue for macro tabletops: coins overlapping a receipt overlapping a phone.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x → 4.2+ | Blender bpy (principle)

## CREATIVE_INTENT
When one object covers part of another, the viewer instantly knows what is in front of what. It happens naturally in 3D, but doing it intentionally (a figure covering part of a creature, a bus covering a building covering another building) stacks layers and deepens the image. Don't be afraid of objects getting in the way of each other.

## STE_PROCEDURE
1. Through the camera, find pairs of objects at different depths that currently sit side by side.
2. Shift one (or the camera) until the nearer object covers a small part (~10–30%) of the farther one.
3. Chain it: near covers mid, mid covers far.
4. Never let an overlap hide the focal point's key feature.

## AGENT_EXECUTION
Blender check: projected 2D bounding boxes overlap and depth order.
```python
import bpy
from mathutils import Vector
from bpy_extras.object_utils import world_to_camera_view as w2c
scn = bpy.context.scene; cam = scn.camera
def box2d(o):
    pts = [w2c(scn, cam, o.matrix_world @ Vector(c)) for c in o.bound_box]
    return min(p.x for p in pts), min(p.y for p in pts), max(p.x for p in pts), max(p.y for p in pts), min(p.z for p in pts)
a, b = box2d(bpy.data.objects["Near"]), box2d(bpy.data.objects["Far"])
ox = max(0, min(a[2], b[2]) - max(a[0], b[0])); oy = max(0, min(a[3], b[3]) - max(a[1], b[1]))
print("overlap area (frame units²):", round(ox * oy, 4), "near in front:", a[4] < b[4])
```
raea: no special prop; placement only (overlap survives into the render as is).

## NOTES
- Deprecated: none.
- Visual gaps: example images only.
- Rule conflicts: the video's example uses people standing in a street; our default is no people in street scenes — use objects (vehicles, stalls, signage) for the stack.

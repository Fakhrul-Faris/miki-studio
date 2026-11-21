---
title: Curve modifier — deform an object along a curve (ribbons, arrows, text flowing along a path)
bucket: 01_Animation_Motion
source: "The Power of MODIFIERS in Blender!.txt"
source_time: "02:46–02:50"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Fits Style D connective motion (a ribbon of money flowing between two objects, a strip of receipt paper curving into the next setup) when the slide is slow and eased.
---

## METADATA
01_Animation_Motion | 3.x → 4.2+ | Blender bpy (bake) → raea

## CREATIVE_INTENT
Principle: the Curve modifier bends an object to follow a curve; moving the object along the deform axis makes it slide and flex along the path. Idea: a transition built from the scene's own object — a strip or arrow travelling from one setup to the next.

## STE_PROCEDURE
Method:
1. Before adding the modifier, give the object many segments along its length (Array or loop cuts).
2. Draw the path as a Bézier curve; put the object's origin at the curve's start.
3. Add a Curve modifier; set Curve Object = the path and Deformation Axis = the object's length axis.
4. Animate the object's location along that axis (eased in-out) to slide it along the path.
How-to (for raea):
5. A rigid object following a path: export the path points and compute its transform per frame in raea.
6. A bending object: bake the slide to shape keys / a glTF morph animation.

## AGENT_EXECUTION
```python
import bpy
strip = bpy.data.objects["Strip"]          # ~ long subdivided mesh along +X
path = bpy.data.objects["Path"]            # Bézier curve
cm = strip.modifiers.new("Curve", 'CURVE')
cm.object = path
cm.deform_axis = 'POS_X'
# slide along the path
strip.location.x = 0.0;  strip.keyframe_insert("location", index=0, frame=1)
strip.location.x = 0.25; strip.keyframe_insert("location", index=0, frame=30)    # ~
# export the path for raea (rigid followers)
import json
pts = [tuple(path.matrix_world @ p.co) for p in path.data.splines[0].bezier_points]
json.dump(pts, open(bpy.path.abspath("//path.json"), "w"))
```
raea: no curve deformer. Rigid follower: position from the exported points with an eased `interpolate` per segment and `Transform.fromXyz(...).lookingAt(next)`; (Blender Z-up → raea Y-up: swap axes on export). Bending strip: bake shape keys per few frames (as in wave-modifier-ripple--modifiers) and play with `<Model animation time>` or `morphs` (limits.md).

## NOTES
- The video only names the use ("great for lots of motion graphic purposes"); all steps beyond the modifier itself are standard practice (`~`).
- A long slide baked as morphs needs many keys; prefer short slides or a rigid follower.
- Deprecated: none.
- Rule conflicts: travel speed ≤ ~40 m/s scene-equivalent, eased start and stop; no whip.

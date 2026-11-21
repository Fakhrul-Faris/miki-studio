---
title: Focus distance locked to a movable target by measuring camera-to-target distance
bucket: 05_Camera_Raea_Pipeline
source: "CG Cinematography 101 | Chapter 2 | Basic Camera Breakdown.txt"
source_time: "04:21–08:30"
blender_version_source: n/a (Houdini)
tool_target: principle-only | Blender bpy | raea
tier: principle
style_fit: Rack focus on the word = moving one target; the focus distance follows automatically.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Houdini) → Blender 4.2+ / raea | principle + translation

## CREATIVE_INTENT
Principle: animating a focus-distance number by hand is fiddly. Put a small target (a sphere) where focus should be and compute the focus distance as the length of the line from the camera origin to that target; moving the target pulls focus and focus stays on a moving subject.
Ideas: parent the focus target to the hero for a locked focus, or slide it between objects for a rack.

## STE_PROCEDURE
Method:
1. Place a small sphere (focus target) on the subject.
2. Build a two-point line from the camera origin to the sphere.
3. Measure the line's length (perimeter).
4. Reference that length in the camera's Focus Distance.
5. Expose the sphere's transform at the top level so it can be moved and keyed easily.
6. Move or key the sphere to pull focus.

## AGENT_EXECUTION
### Source tool (Houdini)
Inside the camera-focus SOP net: `sphere` + `object_merge (cam origin)` → `add` (connect the two points into a polyline) → `measure` (perimeter). Camera Focus Distance expression: `prim("../focus_net/measure1", 0, "perimeter", 0)`. Promote the sphere's Transform to the top. (The video's Houdini needed a restart for the expression to update.)
### Blender / raea translation
Blender has this built in:
```python
import bpy
cam = bpy.context.scene.camera
tgt = bpy.data.objects.new("FOCUS", None); bpy.context.scene.collection.objects.link(tgt)
tgt.empty_display_type = 'SPHERE'; tgt.empty_display_size = 0.05
cam.data.dof.use_dof = True; cam.data.dof.focus_object = tgt
```
raea: compute the distance per frame (focus is animatable):
```tsx
const focus = Math.hypot(fp[0] - p[0], fp[1] - p[1], fp[2] - p[2]);
<Camera3d transform={Transform.fromXyz(...p).lookingAt(t)} projection={{ Perspective: { fov } }}>
  <DepthOfField focal_distance={focus} aperture_f_stops={2.8} />
</Camera3d>
```

## NOTES
- Deprecated: none.
- Visual gaps: node wiring partly shown on screen (~04:21–06:46); expression reconstructed from speech ("prim … second one … perimeter … zero").
- Rule conflicts: none. A rack moves the target over ~0.4–0.8 s eased, on the word. See also two-empty-aim-and-focus-rig--blender-camera-rig.

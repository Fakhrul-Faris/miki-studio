---
title: Occluder reveal — a sliding object hides the appearance of others
bucket: 01_Animation_Motion
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "2:29:11–2:41:36"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Strong fit — a transition built from the scene's own object; things appear without popping on camera.
---

## METADATA
01_Animation_Motion | Blender 4.3 | Blender bpy + raea `Sequence`/visibility

## CREATIVE_INTENT
The hero slides all the way across the frame; as it passes, a row of other products is suddenly standing behind it, as if
revealed by the wipe. Each one is "switched on" on a frame where the passing object fully covers it, so it is never seen to
appear ("nobody noticed"). Reveals — like a camera pulling back while someone enters frame — always look cool.

## STE_PROCEDURE
1. Re-use the slide animation; extend its Y Location so the hero crosses the whole screen (stretch/compress keys until the speed feels right).
2. Lay out the reveal objects on the rule-of-thirds lines (and the halves between them) along the hero's path.
3. Scrub to find, for each object, a frame where the hero fully covers it; nudge the object sideways ("game the system") until such a frame exists.
4. On that frame key the object's final Location/Rotation/Scale.
5. One frame before, move it under the floor plane and key it (it "comes into existence" while covered).
6. Optionally add one more object that starts hidden behind the hero and then moves forward toward camera on its own Free-handle ease (fast start, slow stop), with a slight forward lean on the bottom edge.
7. Recolour the revealed objects to a tetradic palette (see colour-variant card).

## AGENT_EXECUTION
- Blender:
```python
for ob, f_cover in [(c1, 6), (c2, 11), (c3, 16)]:
    ob.keyframe_insert("location", frame=f_cover)          # final pose
    z = ob.location.z; ob.location.z = -1.0
    ob.keyframe_insert("location", frame=f_cover - 1)      # hidden below the plane
    ob.location.z = z
    for fc in ob.animation_data.action.fcurves:
        for k in fc.keyframe_points: k.interpolation = 'CONSTANT'   # avoid a visible rise
```
  (Alternative: key `hide_render`/`hide_viewport`.)
- raea: mount each object only from its cover frame:
  `<Sequence from={coverFrame} layout="none"><Model name="can-green" src=… /></Sequence>` — `name` is required since it comes
  and goes. Check every cover frame with `raea render EDIT.tsx --frame N`.

## NOTES
- Deprecated: none.
- Visual gaps: cover frames (5/6, 11, 16, 8/9) are found by scrubbing; they depend on the layout.
- Rule conflicts: none — this is the house way to make things appear without a pop, provided the covering object is opaque on
  that frame (check DoF and motion blur don't reveal the edge).

---
title: Drop from above, hang, then slide into place (secondary products)
bucket: 01_Animation_Motion
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "59:18–1:08:50"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Supporting objects arrive by layered motion (Z fall, Y slide, X straighten) — usable for "multiply" beats; keep the fall soft-landed, not a bounce.
---

## METADATA
01_Animation_Motion | Blender 4.3 | Blender bpy + raea

## CREATIVE_INTENT
Side products fall in from above and behind, pause in the air for a beat, then drop and slide forward into their slot, timed to
land when the hero finishes its rock. Splitting the motion across Z location, Y location and X rotation, each with its own
curve, makes a simple two-key move feel choreographed.

## STE_PROCEDURE
1. Key all secondaries' final Location and Rotation at frame 40 (hero finishes ~frame 35–50; scene runs to 54/50).
2. At frame 0, move each secondary up and back and rotate it arbitrarily; key Location and Rotation.
3. Z Location: Free handles; steep drop at the start (fast fall), long shallow tail into the floor ("falls then aligns").
4. Y Location: add a Location key mid-move (~frame 20) to make the object hang; scale that key's handles along X (`G X`) so it lingers, then speeds into the slide and slows at the end.
5. Re-check Z Location: the object must already touch the floor at the moment Y speeds up; pull the Z key earlier (`G X`) if not.
6. X Rotation: move the rotation key earlier (`G X`) so the object is nearly upright when the slide starts; add a short hold then a small counter-rotation.
7. Stagger: the second secondary uses the same recipe with its own timing.

## AGENT_EXECUTION
- Blender: insert keys with `ob.keyframe_insert("location", frame=…)`; add the hang key with
  `fc.keyframe_points.insert(20, value)`; shift keys earlier with `k.co.x -= n; k.handle_left.x -= n; k.handle_right.x -= n`.
- raea: drive each axis from its own `interpolate` so curves are independent:
```tsx
const z = interpolate(f, [0, 0.55*fps], [1.2, 0], { easing: Easing.bezier(0.55, 0, 0.3, 1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
const y = interpolate(f, [0, 0.4*fps, 1.6*fps], [-0.8, -0.6, 0], { easing: Easing.bezier(0.65, 0, 0.35, 1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
const rx = interpolate(f, [0, 0.6*fps], [0.7, 0], { easing: Easing.out(Easing.cubic), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
<Entity transform={Transform.fromXyz(0, z, y).withRotation(Quat.fromEuler("XYZ", rx, 0, 0))}>…</Entity>
```
  (y is up in raea: Blender Z → raea y, Blender Y → raea −z.)

## NOTES
- Deprecated: none.
- Visual gaps: heights, angles and the exact hang frame are visual; all numbers above are `~`.
- Rule conflicts: a "fall from the sky" can read as a pop/drop gag; in Style D land it with a long eased tail and no rebound, and
  keep any falling object fading/growing in over ~0.4 s if it starts in view.

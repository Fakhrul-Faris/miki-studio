---
title: Linear keys so a move is already under way on the first frame; free tangents only where wanted
bucket: 01_Animation_Motion
source: "CG Cinematography 101 | Chapter 2 | Basic Camera Breakdown.txt"
source_time: "10:59–11:55, 15:14–17:05, 19:50–20:58"
blender_version_source: n/a (Houdini)
tool_target: principle-only | Blender bpy | raea
tier: principle
style_fit: "conflict: no linear starts/stops" — but it serves our odd-moving-first-frame rule when the curve begins with velocity at the cut and eases out.
---

## METADATA
01_Animation_Motion | n/a (Houdini) → Blender 4.2+ / raea | principle + translation

## CREATIVE_INTENT
Principle: the operator sets a push-in's keys to linear "because I want this to already start in the beginning" — the shot opens mid-move instead of accelerating from rest. Then, with free tangents (unlocked handles), individual channels get their own shape: a slow pan up added on a separate channel, a small offset on another, so the move feels operated.
Ideas: at a cut, enter a setup already moving (velocity > 0 on frame 1) and ease only the end.

## STE_PROCEDURE
Method:
1. Key the start and end of the push on the dolly layer.
2. Set the start key's tangent so the curve has velocity at the first frame (linear in, not ease in).
3. Ease out the end key so the move settles.
4. Unlock tangents (free) on channels that need their own shape; drag handles horizontally for timing, select keys to move them vertically.
5. Add secondary small rotations on separate channels (slow tilt up, a touch of pan/roll) offset in time from the push.

## AGENT_EXECUTION
### Source tool (Houdini)
Animation Editor: select keys → Linear; toggle free tangents (unlocked handles); `=` and Ctrl-drag on handles to expand; Alt-click on a channel to add an offset key.
### Blender / raea translation
Blender: start key VECTOR/linear-ish handle (velocity at frame 1), end key eased:
```python
for fc in cam_dolly.animation_data.action.fcurves:       # 4.4+: channelbag fcurves
    k0, k1 = fc.keyframe_points[0], fc.keyframe_points[-1]
    k0.interpolation = 'BEZIER'; k0.handle_right_type = 'VECTOR'   # leaves frame 1 already moving
    k1.handle_left_type = 'AUTO_CLAMPED'                            # settles at the end
```
raea: an ease-out curve starts at full speed and settles:
```tsx
const z = interpolate(f, [0, 60], [1.4, 1.1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const tilt = interpolate(f, [12, 60], [0, 0.06], { easing: Easing.inOut(Easing.sin), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
```

## NOTES
- Deprecated: none.
- Visual gaps: exact curve shapes and handle positions are dragged on screen, not spoken.
- Rule conflicts: never a linear start from rest or a linear stop mid-shot. Linear-in is acceptable only at a cut where the previous setup's motion (or the flight) carries in; the end must ease. Check speed ≤ ~40 m/s and turn ≤ ~130°/s at the entry velocity.

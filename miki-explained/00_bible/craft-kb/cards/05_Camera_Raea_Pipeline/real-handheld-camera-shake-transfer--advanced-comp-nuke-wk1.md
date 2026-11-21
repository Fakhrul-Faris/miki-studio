---
title: Camera shake taken from real handheld footage, scaled and filtered
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "3:32:16–3:32:53; 3:59:04–4:13:27; 4:42:48–4:43:30"
blender_version_source: n/a (Nuke)
tool_target: raea
tier: principle
style_fit: "conflict: Style D camera moves are smooth eased curves with no jitter; use only as a sub-pixel 'breathing' layer on a held setup if the user approves, never as visible shake."
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: layered procedural noise rarely has the weight of a real operator; motion tracked from real handheld footage does. Idea: track real footage, scale it down and smooth it, and apply it before the optical effects so the lens behaves correctly as the frame moves.

## STE_PROCEDURE
1. Download a handheld reference clip (a stock preview is enough; filter by "shaky" framing).
2. Before you track, offset its time so its frame range matches the comp (TimeOffset to 1001); trackers fail on a wrong range.
3. Track two points with translation and rotation; precision is not needed.
4. Bake the result into a standalone transform (match-move, baked).
5. Add a "shake multiplier" knob (range 0–2) and write each curve as `curve * multiplier`; set ~0.5.
6. Set the multiplier to 1, select the translate keys, and filter them 2 times (3 was too smooth); then set it back to 0.5.
7. Place the master shake transform before lens effects (defocus/cat-eye) so edge effects change as the frame moves.
8. Link (not copy) the same transform onto the foreground.
9. Feed the keyer a stabilized (inverted) copy so keys and rotos stay valid.
10. Enable motion blur on the shake transforms; avoid double blur on pre-rendered branches.
11. Remove black borders: preserve bounding box on the defocus, then crop slightly larger than frame.

## AGENT_EXECUTION
### Source tool (Nuke)
`Read(handheld)` → `TimeOffset(1000)` → `Tracker` (2 tracks, T+R) → `Transform (match-move, baked)`; User knob `shake_multiplier` (0–2); expression `curve*shake_multiplier`; Curve editor → Edit → Filter (2).
### Blender / raea translation
- raea: add the offset to the camera transform from data: `Transform.fromXyz(...).lookingAt(target)` then apply a small rotation `Quat.fromEuler("XYZ", sx*k, sy*k, 0)` where `sx, sy` come from a JSON of tracked real motion (filtered), `k` ≤ ~0.002 rad (~). Rotation in radians.
- `<MotionBlur shutterAngle={0.5} samples={4} />` matches a 180° shutter; it reads only on fast motion.
- Blender: import the tracked curve; `fc.modifiers.new('NOISE')` is the procedural option the video argues against; prefer the real curve with `bpy.ops.graph.smooth()` (~) for filtering.

## NOTES
- Rule conflicts: Style D/WORKING-RULES require smooth eased camera curves (no move above ~130°/s; no rushed motion). Visible handheld jitter is not in the house look; flag to the user before using any shake.
- STT fix: "bm camera shake" → bm_CameraShake gizmo (Ben McEwan).

---
title: Alternating pop / tip / slide choreography with camera pull-back ("Ender animation")
bucket: 01_Animation_Motion
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "1:42:32–2:00:03"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Good "multiply" beat — objects arrive in a rhythmic chain while the camera pulls back to reveal the row; tone down pops and the opening whip.
---

## METADATA
01_Animation_Motion | Blender 4.3 | Blender bpy + raea

## CREATIVE_INTENT
A row of products builds up in alternation: one pops in and tips to the side, the next slides in from the opposite side while the
first is still wobbling (so the imperfect end of the wobble is hidden by new action), then another pops, another slides, and a
final one drops in from the top. The camera dollies back over the whole 2 s so the row is revealed, ending on a frame that
becomes the first frame of the next shot.

## STE_PROCEDURE
1. Camera: frames 0–7, tilt up into the start framing (pan-whip on the beat); then frames 7–48 dolly backward along X to the final wide frame.
2. Can 1 (pop + tip): end pose keyed at frame 17; at frame 7 move it up/back, rotate, `S 0`, key LocRotScale (10-frame pop).
3. At frame 22 set the cursor on its bottom edge, Pivot = 3D Cursor, `R X` to tip; key LocRotScale; copy the frame-17 key to frame 27 so it rocks back.
4. Graph Editor: Scale fast start; Y Rotation Free handles for the tip; Individual Origins `S X` to slow the X-location wobble.
5. Can 2 (slide): end pose when can 1 lands, keyed at frame 24; start at frame 10 off to the side, rotated on its own axis (Pivot Median); Y Location fast-start/friction curve; Z Rotation fast-then-slow.
6. Retime: drag can 2's keys so it lands at frame 30 and the wobble shows first.
7. Can 3 (pop from the other side) keyed so it stands at frame 30; can 4 (slide from the other side) 12 frames, Z rotation spin.
8. Final can: end at frame 45 (later moved to 41), start at frame 35 above the frame, slight angle, `S 0`; fast Scale curve.
9. Camera X Location: Free handles, smooth ease into the end frame at 48.
10. If the whole thing is too fast, select all keys and `S 2` in the Dope Sheet to double its length.

## AGENT_EXECUTION
- Blender: per object `keyframe_insert(..., frame=…)` with the frame list above; retime all keys:
  `bpy.ops.transform.transform(mode='TIME_SCALE', value=(2,0,0,0))` in a Dope Sheet override, or scale `k.co.x` about the first key.
- raea: one `<Sequence from durationInFrames layout="none">` per object with its own interpolates; camera dolly
  `Transform.fromXyz(interpolate(f, [7, 48], [x0, x1], { easing: Easing.bezier(0.65, 0, 0.35, 1) }), h, d).lookingAt(target)`.

## NOTES
- Deprecated: none.
- Visual gaps: all placements and rotation amounts are visual; frame numbers are stated (24 fps).
- Rule conflicts: the 7-frame "pan whip" opening and 10-frame pops conflict with the no-whip / no-pop rules. In Style D: open on a
  smooth camera flight (≥0.6 s, under 130°/s), grow-ins ≥0.4 s with fades, tips as single damped rocks.

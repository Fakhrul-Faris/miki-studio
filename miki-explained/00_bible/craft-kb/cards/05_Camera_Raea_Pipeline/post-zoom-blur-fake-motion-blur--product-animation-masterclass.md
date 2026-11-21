---
title: Fake motion blur in post — keyed Zoom Blur on an adjustment clip over the moving frames only
bucket: 05_Camera_Raea_Pipeline
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "2:56:03–2:58:26, 3:22:04–3:23:03"
blender_version_source: 4.3
tool_target: raea
tier: full
style_fit: Smears only fast camera moves; in our pipeline real motion blur in raea replaces it.
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.3 | DaVinci Resolve (Open FX Zoom Blur) → raea MotionBlur

## CREATIVE_INTENT
A camera move rendered without motion blur looks strobed. A Zoom Blur that is 0 at rest, strong one frame into the move, held,
then 0 again on the landing frame gives the move energy without touching the render.

## STE_PROCEDURE
### Source tool (DaVinci Resolve)
1. Add an Adjustment Clip over the move; cut it to the move's length (`B`, then Backspace the excess).
2. Open FX › Zoom Blur (not in the Toolbox; search the Open FX library); drag onto the clip.
3. Key Strength 0 at the first frame; at one frame into the move key the peak; key the same value one frame before it stops; key 0 on the landing frame.
4. Keep it subtle: author lowered 560 → 260 (0.26 on the normalised slider).
5. On the end-of-ad letter zoom, start at 0.4 one frame after the zoom begins and increase toward the end.

## AGENT_EXECUTION
### Blender / raea translation
- Blender: prefer real motion blur (`scn.render.use_motion_blur = True`, shutter 0.5).
- raea: `{moving ? <MotionBlur shutterAngle={0.5} samples={4} /> : null}` — it animates per frame and a frame without it has none
  (post.md). There is no radial Zoom Blur effect; a camera dolly with MotionBlur produces the radial smear naturally.

## NOTES
- Deprecated: none.
- Visual gaps: exact key frames are by eye.
- Rule conflicts: if a move needs heavy blur to hide it, it is too fast for house rules (≤130°/s, ≤40 m/s).

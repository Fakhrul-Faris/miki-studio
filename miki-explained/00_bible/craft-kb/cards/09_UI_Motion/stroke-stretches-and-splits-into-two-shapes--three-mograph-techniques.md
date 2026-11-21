---
title: Stroke stretches and splits into two shapes, gradient locked to its ends
bucket: 09_UI_Motion
source: "Procedural Mograph & 3D-to-AI Render Passes/Three motion graphics techniques for your After Effects projects.txt"
source_time: "08:48–11:37"
tool_target: HyperFrames
tier: principle
use_when: "one line must become two things (one payment becomes two instalments, one counter splits into two queues) in a flat diagram beat"
style_fit: "Flat 2D; the gradient should run from neutral to the one brand accent, not a rainbow; growth eased, no pop."
---

## METADATA
09_UI_Motion | After Effects (gradient stroke, two nulls, position expression) → HyperFrames SVG | HyperFrames scene

## CREATIVE_INTENT
"It's literally just a stroke controlled by two nulls that get further away from each other" — then, with a match
cut at full velocity, the stroke becomes two circles whose paths go from flat to full. A gradient stroke splits
colour between the two ends, and its endpoints must follow the stroke ends even when everything rotates.

## STE_PROCEDURE
1. Draw one stroke between two control points.
2. Put the gradient's start and end exactly at the stroke's two ends.
3. Drive both the stroke ends and the gradient ends from the same two control points.
4. Before adding rotation, confirm the gradient stays on the ends when the stroke rotates or thickens.
5. Move the control points apart (ease in-out), then together; cut to two circles at full velocity.
6. Animate each circle's path from flat to full after the cut.

## AGENT_EXECUTION
HyperFrames/SVG: `<line>` with a `linearGradient gradientUnits="userSpaceOnUse"` whose x1/y1/x2/y2 are set from the
same JS variables as the line ends (this removes the AE "parenting only position doesn't match" problem). Circles:
`ry` from 0 → r. raea 2D: the same logic with two computed points.
### Worked example
Topic: "Bayar RM1,200 sekali atau 3 × RM400?" (plain arithmetic).
- BEFORE: a static bar labelled RM1,200, then a cut to three bars.
- AFTER: one grey line "RM1,200" stretches on "sekali"; its accent-green end pulls away; at full speed it splits into rings that open from flat to full, each tagged RM400, on "tiga kali".
### Check
- Do the gradient ends stay on the stroke ends during rotation?
- Is the split at the motion's speed peak?
- Is the arithmetic on screen exact (3 × 400 = 1,200)?

## NOTES
- AE expression text is not in the transcript (visual only); the principle is "same source drives both".

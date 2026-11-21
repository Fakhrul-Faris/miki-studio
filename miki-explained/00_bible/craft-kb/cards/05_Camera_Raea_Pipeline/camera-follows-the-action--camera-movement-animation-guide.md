---
title: Camera follows the action to make it punchier
bucket: 05_Camera_Raea_Pipeline
source: "Motion Feel, Easing & Camera Choreography/Camera Movement Animation Guide.txt"
source_time: "04:43–05:10"
tool_target: shot-list
tier: principle
use_when: "an object's state change that should feel big: a coin dropping, a receipt shooting out, a bar of a chart rising, a phone notification sliding up"
style_fit: Fits with ⚠ adaptation — source follows a character's step and kick; no people in Style D → the camera follows the hero object's move; eased, ≤ ~40 m/s, ≤ ~130°/s.
---

## METADATA
05_Camera_Raea_Pipeline | 2D animation camera (source) | shot-list "Setup and camera" + raea camera look-at

## CREATIVE_INTENT
Principle: when an action should feel "more punchy or lively", follow its movement with the camera. The source pans
right as the character steps right, follows the kick upward, then returns as they go back — "compared to the version
without camera movement, the kick feels much more dramatic". Slow-in/slow-out applies to the camera like any object.

## STE_PROCEDURE
1. Identify the setup's main object move and its direction.
2. Pan/tilt the camera's look-at in the same direction, starting with the move.
3. Let the camera travel less than the object (~30–60 %, inferred) so the object still moves in frame.
4. Ease the camera in and out.
5. Return or settle the camera as the object settles.

## AGENT_EXECUTION
In the setup data, give `b.l` (end look-at) a share of the object's displacement: `b.l = a.l + 0.5 * (objEnd - objStart)`.
Land the object's end and the camera settle on the named word.

### Worked example
Line "Untung bulan ni RM1,200" at a car wash in Seremban, chart bar rising (illustrative):
- BEFORE: `| 8 | "RM1,200" | locked low angle on the bar chart | bar grows to RM1,200 |`
- AFTER: `| 8 | "RM1,200" | low angle; look-at tilts up with the bar's top (~50 % of its rise), eased, settles on "RM1,200" | bar grows, accent on the top, counter RM0 → RM1,200 | camera-follows-the-action |`

### Check
- Does the camera move in the same direction as the hero's move?
- Does it travel less than the object, so the move still reads?
- Is the follow eased and within the speed caps?

## NOTES
- Camera shake for impact (05:10–05:28) is covered by `masters/01_Animation_Motion/handheld-camera-shake.md` (house default off).
- Visual gaps: exact pan amounts are visual only.

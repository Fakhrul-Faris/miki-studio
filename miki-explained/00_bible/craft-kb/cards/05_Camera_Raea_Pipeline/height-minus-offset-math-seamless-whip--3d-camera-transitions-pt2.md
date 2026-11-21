---
title: Height-minus-offset math — calculate the next setup's start position from the previous setup's end value
bucket: 05_Camera_Raea_Pipeline
source: "Motion Feel, Easing & Camera Choreography/3D Camera Transitions Tutorial Part 2.txt"
source_time: "21:37–22:41"
tool_target: raea
tier: principle
use_when: "two adjacent setups each move the camera/object along the same axis across a hard cut, and the join currently shows a visible jump or double-travel"
style_fit: "⚠ conflict: the source uses this to build a fast vertical whip-pan (banned). → adapted: keep only the MATH (deriving setup B's start offset from setup A's end offset so the combined travel reads as one continuous move, not two separate ones) applied at house-legal eased speeds."
---

## METADATA
05_Camera_Raea_Pipeline | After Effects (prohibited) → raea transform math | raea

## CREATIVE_INTENT
"The composition's height is 1920 pixels. Subtract 1200 pixels from it, which was the final key frame value in the previous scene. The remaining number is your new key frame value... We apply this math to every transition to make it smoother and more professional." Scene A's object/camera moves to Y=1200 (of a possible 1920); scene B must then start at Y = 1920 − 1200 = 720, so the two legs sum to exactly one frame-height of travel and the cut reads as one continuous whip rather than a reset-then-repeat.

## STE_PROCEDURE
1. Note the previous setup's final transform offset on the shared axis (position, or any property the two setups both animate).
2. Define the "full span" for that axis (frame height/width, or the raea scene's equivalent travel unit).
3. Calculate the next setup's starting offset as: full span − previous setup's final offset.
4. Key the next setup to start at that calculated value, not an eyeballed one.
5. Reuse this math for every setup-to-setup join on that axis in the episode.

## AGENT_EXECUTION
raea: a small helper, e.g. `const nextStart = FULL_SPAN - prevEnd;`, applied wherever two adjacent setups share a travel axis across a cut.

### Worked example
Topic: a vending machine's coin drop, camera tracking down through two setups (illustrative).
BEFORE: setup A's coin travels to y = −0.6 (of a −1.0 full drop); setup B starts the next coin at y = 0 — visible re-pop/jump at the cut.
AFTER: setup B's coin starts at y = −1.0 − (−0.6) = −0.4, so the combined travel across both setups reads as one continuous fall → height-minus-offset-math-seamless-whip.

### Check
- Is the next setup's start value calculated from the previous setup's end value (not eyeballed)?
- Do the two setups' travels sum to exactly one span of the shared axis?
- Does the resulting move stay within house eased-speed limits?

## NOTES
- Rule conflict flagged above: the source's use case is a fast whip-pan; kept here only as a continuity-math technique for calm, eased joins.
- AE step dropped: on-screen calculator + grid-line sizing by eye → explicit formula in raea code.

---
title: Go back 14 frames — key the deceleration a fixed interval before the cut, not on arbitrary timing
bucket: 05_Camera_Raea_Pipeline
source: "Motion Feel, Easing & Camera Choreography/3D Camera Transitions Tutorial Part 2.txt"
source_time: "00:43–01:30; 15:30–16:24"
tool_target: raea
tier: principle
use_when: "building the last leg of a camera/object move before a hard cut, so it feels like it's decelerating INTO the cut rather than stopping arbitrarily"
style_fit: "⚠ conflict: house caps camera speed at ~130°/s / ~40 m/s and bans whip-pan energy; the source uses this timing trick to build FAST whips. → adapted: keep the fixed-interval method (place the deceleration's start key a set number of frames before the cut, not wherever feels convenient) but keep both keys' speed within house limits — the result is a calm ease-in to the cut, not a whip."
---

## METADATA
05_Camera_Raea_Pipeline | After Effects (prohibited) → raea keyframe timing | raea

## CREATIVE_INTENT
Before a hard cut, set a position key at the very last frame, then "go back 14 frames" and set a second key there — that second key (not an arbitrary earlier frame) becomes the start of the deceleration into the cut. The fixed, repeatable interval (the source reuses "14 frames" every time) means every transition decelerates over the same window, giving the edit a consistent rhythm.

## STE_PROCEDURE
1. Before keying a move into a cut, place a key at the cut's last frame (the move's end value).
2. Count back a FIXED number of frames (source uses 14; pick one constant and reuse it every transition, e.g. ~0.3–0.5 s depending on fps).
3. Place a second key at that fixed earlier frame, holding the pre-deceleration value.
4. Ease both keys (fast-on-entry into the deceleration key, easing out to the cut) within house speed limits.
5. Reuse the same frame-count constant for every transition in the episode so the rhythm is consistent.

## AGENT_EXECUTION
raea: define one constant (e.g. `const DECEL_FRAMES = 12` at 30fps ≈ 0.4s) and key every pre-cut deceleration starting exactly that many frames before the cut frame, eased, capped under ~40 m/s / ~130°/s.

### Worked example
Topic: a warung's gas-tank swap, camera push ending on the new tank (illustrative).
BEFORE: camera push decelerates "whenever it looks right" — inconsistent timing across the episode's cuts.
AFTER: every push-to-cut in the episode starts its deceleration key exactly 12 frames (0.4 s at 30fps) before the cut, eased within speed limits → 14-frames-back-deceleration-into-cut.

### Check
- Is there one fixed frame-count constant used for every deceleration-into-a-cut in the episode?
- Does the deceleration key sit exactly that many frames before the cut, not an eyeballed position?
- Does the move still stay under ~40 m/s / ~130°/s throughout?

## NOTES
- Rule conflict flagged above: adapted to a calm, consistent ease rather than the source's fast whip.
- AE step dropped: manual "go back 14 frames" scrubbing → a named constant in raea code.

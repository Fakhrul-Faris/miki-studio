---
title: Progress/scrub indicator made by moving a mask path along a duplicated timeline track
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/Animate Like Apple After Effects.txt"
source_time: "48:39–49:16"
tool_target: raea
tier: principle
use_when: "a progress bar, scrub bar or filling meter needs to visibly advance (a music player timeline, a loading bar, a step tracker)"
style_fit: "Fits UI-heavy scenes; keep the fill moving on the word it illustrates, eased, never a sudden snap to full."
---

## METADATA
09_UI_Motion | After Effects (duplicated shape + animated mask path) → raea width/clip-path track | raea

## CREATIVE_INTENT
A faint full-length track (opacity 50%) sits underneath; a duplicate copy on top is masked, and the mask's path is keyed
to move along the track over time — "now we've got this timeline moving along." The moving mask reveals progressively
more of the top (brighter/filled) copy, reading as a scrub position or fill level advancing.

## STE_PROCEDURE
1. Draw the full track once at low opacity as the base.
2. Duplicate it for the "filled" state.
3. Mask the filled copy; key the mask path from empty to the current progress point.
4. Ease the key to the word/value it represents (don't just animate linearly to 100%).

## AGENT_EXECUTION
raea: a `width`/`clipPath` track on the filled copy, same geometry as the base:
```tsx
const fill = interpolate(f, [a, a + 20], [0, pct], { ...CL, easing: out });  // pct = e.g. value shown on screen
<div style={{ width: trackW, height: 4, background: "#ffffff40" }} />
<div style={{ width: trackW * fill, height: 4, background: C.accent, position: "absolute" }} />
```

### Worked example
Topic: a savings goal bar filling as "RM300 daripada RM500" is said (illustrative numbers).
- BEFORE: the bar just appears already 60% full.
- AFTER: on "RM300", the accent fill eases from 0 to 60% of the track, landing exactly as the number is said.

### Check
- Does the fill land on the word/number it represents, not drift before or after?
- Is the base track visible underneath at low opacity (so "how much is left" also reads)?
- Is the fill eased, not linear or an instant snap?

## NOTES
- Visual gaps: none.
- AE dropped: animated mask path on a duplicated layer — translated to a plain width/clip interpolation, which is the
  direct equivalent in code.

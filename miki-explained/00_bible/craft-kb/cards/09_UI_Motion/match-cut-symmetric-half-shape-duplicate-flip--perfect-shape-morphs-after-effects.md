---
title: Animate one symmetric half, mirror it cheaply, match-cut at the identical mid-frame
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/Perfect Shape Morphs After Effects Transcript.txt"
source_time: "00:51–01:45, 10:27–11:55, 19:06–19:38"
tool_target: raea
tier: full
use_when: "morphing between two shapes that are each left/right (or top/bottom) symmetric — animate half the work and cut cleanly between two states at the point they're visually identical"
style_fit: "Halves the authoring work for any symmetric icon/logo morph without adding a flashy transition — the 'cut' only works because both layers are pixel-identical at that frame, so it reads as one continuous shape, matching the house 'no visible seams' expectation."
---

## METADATA
09_UI_Motion | After Effects (duplicate+flip layer, or linked expression) → raea (mirrored geometry/path, single swap frame) | symmetric icon/shape morphs

## CREATIVE_INTENT
Spade and heart are both left-right symmetric, "so why animate it twice when we can animate it once and then flip it
over" — animate only the left half's path, then build the right half as a flipped duplicate (scale X = −100%) so
editing the left half updates the right half for free if linked by expression, or stays manually in sync if just
duplicated. The two shapes (half-spade, half-heart) are swapped mid-animation "kind of like a match cut," at the one
frame where both halves are drawn to be "as identical as possible" — so the viewer never sees the swap, only a
continuous unfurl into a new shape.

## STE_PROCEDURE
1. Confirm the start and end shapes are each symmetric on the same axis.
2. Keep only one half of each reference shape; animate just that half's path (see point-correspondence and
   designed-in-between cards for the path itself).
3. Build the mirrored other half by duplicating the animated half and flipping it (scale on the mirror axis = −100%),
   positioned so the two halves meet exactly on the axis.
4. To keep the mirror in sync automatically: link the duplicate's path property to the original via an expression/
   pick-whip (relative, not absolute, if this rig will itself be duplicated into other comps) rather than copy-pasting
   keyframes by hand.
5. At the handover frame between shape A's half and shape B's half, make both halves' paths as close to pixel-
   identical as possible (same point positions) so the cut is invisible.
6. Cut from shape A's layer to shape B's layer at that matched frame; continue animating shape B's half onward.

## AGENT_EXECUTION
**Shot-list "State change" cell:** "half-shape swap on <word>, cut at the matched mid-frame" — flag which setup is a
match-cut handover, not a continuous single-layer animation.

raea: build the mirror from the same source path (so it can never drift out of sync), and perform the "cut" as a
single-frame layer swap only where both paths are numerically equal:
```tsx
const leftHalf = animatedHalfPath(progress);           // the one path actually authored
const rightHalf = mirrorPathX(leftHalf);               // pure function of leftHalf — always in sync, no duplicate keys
// At the handover frame, shapeB's half path must equal shapeA's half path (or be visually indistinguishable);
// verify this in a still before shipping the cut, exactly like checking a camera match cut lands on matched silhouettes.
```
For a logo/icon that itself gets duplicated into other scenes, prefer deriving the mirror from a prop/relative
reference (not a hard-coded absolute path) so duplicated instances don't silently point back at one master copy.

### Worked example
Topic: "Logo kedai bertukar bentuk ikut waktu operasi" (illustrative — a symmetric storefront icon folds into a
clock icon on "buka 24 jam").
BEFORE: both halves of the storefront-to-clock morph are keyed by hand twice (left and right), doubling the work and
risking the two sides drifting apart by a frame.
AFTER: only the left half is animated; the right half is `mirrorPathX(left)`, always in sync; the handover from
"storefront-half" to "clock-half" layers happens at the one frame both halves are built to match exactly, so the cut
is invisible.

### Check
- Is only one half actually hand-animated, with the other half derived (mirror function or linked expression), not
  separately keyframed?
- At the handover frame, are the two layers' half-shapes close enough to identical that the cut is invisible on a still?
- If this rig gets duplicated elsewhere, does the mirror still derive from its own local half (not one shared master copy)?

## NOTES
- Visual gaps: "as identical as possible" is judged by eye on a still frame, not a numeric tolerance.
- AE steps dropped: "copy with relative property links" (AE's pick-whip expression with relative addressing) is
  AE-specific; the underlying principle — derive the mirror from the original so duplicated instances don't cross-
  link to the wrong copy — is what raea's component design should satisfy directly (a pure mirror function, not a
  cross-component reference).

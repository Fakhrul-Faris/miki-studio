---
title: Hand-design the in-between shape — never trust the morph engine's default blend
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/Perfect Shape Morphs After Effects Transcript.txt"
source_time: "00:39–01:00, 05:30–06:54, 16:49–17:48"
tool_target: raea
tier: full
use_when: "briefing a morph between two named shapes (spade→heart, wallet→receipt) where a plain crossfade/least-distance blend would look generic or just wrong"
style_fit: "Directly supports 'transitions built from the scene's own objects': the in-between shape is itself an authored asset, not a generated blend. Keep it simple enough to read in ~2–3 frames at phone size and finish within the house's ~0.4 s object-change window."
---

## METADATA
09_UI_Motion | After Effects (shape-path keyframe) → raea (authored intermediate path) | icon/object morph setups

## CREATIVE_INTENT
Left to its own device, a path-morph engine picks the least-distance in-between shape, which is rarely the shape you
want on screen for even a few frames. The source designs a specific in-between ("a sort of more rounded blobby heart
shape," later refined into a thin crescent instead of an ugly pinched negative-space shape) by hand, point by point,
treating that middle shape as its own small design decision — "deciding what this middle shape should be is pretty
important because that's going to be the majority of the animation," and it should repeat the *visual language* of
the two end shapes (here: curves only, no straight lines/right angles, because the source shapes have none) so the
morph never breaks character even mid-transition, even though the viewer barely consciously sees that frame.

## STE_PROCEDURE
1. Before animating, sketch (on paper or as a rough reference shape) what the midpoint of the morph should look
   like — not "whatever the software picks."
2. Build the real in-between shape by moving points to that rough target, keeping point count matched to both ends
   (see point-correspondence-vertex-count-and-first-vertex).
3. Check the in-between shape against the two end shapes' own visual language (e.g. "curves only, no right angles")
   and correct any point that breaks it (round off an accidental sharp corner, etc.).
4. If the in-between shape creates an ugly negative-space leftover near the transition (e.g. a pinched sliver), redraw
   that local area as its own clean small shape (here: a thin crescent) rather than letting it be crushed flat.
5. Treat the in-between shape as a real asset worth a second refinement pass, even though it's only on screen for a
   few frames — "you barely see that frame... but you can definitely feel it," especially with few keyframes.

## AGENT_EXECUTION
**Frame brief → Decision field:** name the in-between shape explicitly, e.g. "mid-morph = a rounded blob, not a
circle; keeps the two shapes' curve-only language."

raea: author the midpoint path as its own named keyframe/state in the path-morph data, not as an emergent blend:
```tsx
// Three explicit path states, not two + an engine-guessed blend:
const pStart = WALLET_PATH;         // end state A
const pMid   = WALLET_BLOB_PATH;    // hand-authored in-between — a real, separately designed path
const pEnd   = RECEIPT_PATH;        // end state B
const d = progress < 0.5
  ? interpolatePath(pStart, pMid, progress * 2)
  : interpolatePath(pMid,   pEnd,  (progress - 0.5) * 2);
```
Design `pMid` with the same point count as both ends (see point-correspondence card) and the same stroke/line
language as the real end shapes (flat-geometry house style: no gradients, no stray straight edges against two curved
icons).

### Worked example
Topic: "Ikon kedai runcit bertukar jadi grafik carta" (illustrative — a shop-icon morphs into a bar-chart icon on
"lihat jualan").
BEFORE: shop icon (roof + door, all straight lines) morphs directly into chart bars (all straight lines) using the
engine's default blend — looks fine by luck, since both ends are rectilinear, so no hand-design needed.
AFTER (contrast case): a coin icon (all curves) morphing into the same chart bars would need a hand-authored
in-between that bridges "round" to "rectilinear" deliberately (e.g. a rounded-rectangle midpoint) rather than letting
the engine crush the circle into jagged rectangles mid-morph.

### Check
- Was the in-between shape designed on purpose (sketched/decided), not left to the engine's default blend?
- Does the in-between shape keep the same visual language (curves vs. straight lines) as both end shapes?
- Is any ugly leftover negative space at the transition point redrawn as its own clean shape, not left pinched/crushed?
- Does the whole transition (start→mid→end) still land inside the house's ~0.4 s object-change window?

## NOTES
- Visual gaps: the exact point placements for "rounder," "skinnier," "more pointy" are eyeballed, not numeric — stated
  here as the decision to make, not a formula.
- Rule conflicts: none; an authored in-between shape is more in line with the house rule ("transitions built from the
  scene's own objects") than an engine-guessed blend would be.

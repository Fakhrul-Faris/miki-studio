---
title: Round-trip reveal — the object goes into a loader and comes back wearing the product's UI
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/Animated SaaS Videos Transcript.md"
source_time: "3:08–3:32"
tool_target: raea
tier: full
use_when: "the beat where an app/tool processes the hero object (scan, check, calculate) in a how-to step"
style_fit: Objects change state on the word; the loader is built from the scene's own object, not a generic spinner.
---

## METADATA
09_UI_Motion | general | shot-list row + raea UI layer

## CREATIVE_INTENT
On "your instant drawing review assistant", the director "brought the drawing in, transitioned into a loader screen…
checking the drawing, and then the drawing comes back not just by itself but… with the UI" — errors and suggested
corrections overlaid. The viewer sees the same object before and after the product touches it.

## STE_PROCEDURE
1. Before you plan the step, pick the hero object the tool processes.
2. Show the object plain for ~1 s.
3. Shrink or tuck the object into a loader made from its own shape (outline scan, progress fill), ~1 s.
4. Return the same object at the same framing with the UI layer attached: labels, marks, numbers.
5. Land the UI layer's key number in the accent on the spoken word.

## AGENT_EXECUTION
Three shot-list sub-rows, same camera: plain → loader → annotated. raea: the object as a `<Mesh3d>`/image plane; loader
= a scan line or fill driven by `interpolate(f, [a, a + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })`;
UI labels as 2D layers that grow in over 12 f each, staggered ~4 f by index. No spinner icon.

### Worked example
Step: "Snap resit, app rekod belanja sendiri" (receipt-scanning expense tracker; amounts illustrative).
- BEFORE: receipt → cut to a generic spinning circle → cut to a table of numbers.
- AFTER: macro receipt on a counter → a thin accent scan line runs top to bottom of the receipt (loader) → the same
  receipt returns with leader-line labels on three items and "Jumlah: RM18.50" in accent, on the word "belanja" (the three item prices add up to RM18.50).

### Check
- Is the processed object the same object before and after?
- Is the loader built from the object (no generic spinner)?
- Does the returning UI land its key number on the word?

## NOTES
- Visual gaps: the source loader's design is visual only.

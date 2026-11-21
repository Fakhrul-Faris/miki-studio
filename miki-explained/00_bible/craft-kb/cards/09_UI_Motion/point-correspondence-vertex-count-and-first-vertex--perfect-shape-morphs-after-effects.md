---
title: Fix a bad shape-path morph — match vertex count, then set the first vertex
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/Perfect Shape Morphs After Effects Transcript.txt"
source_time: "02:16–04:16, 05:49–06:27, 07:09–07:46"
tool_target: raea
tier: full
use_when: "briefing or debugging any icon/shape-to-shape morph setup (e.g. a coin becomes a receipt, a phone icon becomes a chart) that looks like it's sliding/shrinking wrong instead of unfolding"
style_fit: "Core mechanic for UI-heavy episodes' shape-morph transitions (icons, chart states). No house-rule conflict: this is point-correspondence math, not a flashy transition — the resulting morph must still obey 'transitions built from the scene's own objects' and ~0.4 s fade/grow, not a whip."
---

## METADATA
09_UI_Motion | After Effects (shape-path morph) → raea SVG path morph | icon/chart state-change setups

## CREATIVE_INTENT
A path-morph engine (AE's shape-path interpolation, or any point-to-point SVG/path tween) "does not care about our
ideas or our plans unless we put it in the data" — left alone, it moves each point to whichever target point is
*nearest*, not whichever point makes creative sense, which produces an ugly, unpredictable in-between. Two concrete,
checkable causes: (1) the two shapes have a **different vertex count**, so corresponding points don't line up at all;
(2) even with matching counts, each shape has its own **first vertex** (marked by a double-square icon on that
point), and the first vertex decides which point maps to which — change which point is "first" and the whole morph's
direction/behaviour changes (demoed: a square that should rotate 90° instead shrinks and flips, because moving the
first vertex to a different corner changed which corner maps to which).

## STE_PROCEDURE
1. Before keying a path morph, count vertices on both shapes; if they differ, add or delete points on the simpler
   shape (Pen tool: add anchor point / delete-vertex tool) until the counts match.
2. If a morph behaves unexpectedly (wrong rotation direction, shrink-then-flip instead of the expected move), check
   each shape's **first vertex** (an extra square icon marks it) before changing anything else.
3. To change the first vertex: select the intended point, right-click › Mask and Shape Path › Set First Vertex.
4. Re-check the morph with both shapes' first vertices placed at corresponding locations (e.g. both at the
   "top-left-equivalent" corner of their respective shapes).
5. For many-vertex shapes (traced/imported paths often carry redundant points, e.g. from an Illustrator join), delete
   the redundant vertices first — fewer points means fewer correspondence decisions to get wrong.

## AGENT_EXECUTION
**Frame brief / shot-list `cards` field:** name the morph pair and flag "point-correspondence checked" so the builder
knows this was deliberately matched, not left to the morph engine.

raea has no shape-path keyframe system; SVG path morphing (e.g. via `d` attribute interpolation, or a morph library)
has the identical failure mode — it also maps points nearest-first unless point order and count are controlled:
```tsx
// Both paths must have the SAME point count, in the SAME semantic order, before interpolating.
// If pathA has 6 points and pathB has 4, resample the simpler path up to 6 evenly-spaced points FIRST.
const pathA = resampleToCount(rawPathA, 6);   // "first vertex" = index 0 of the resampled array
const pathB = resampleToCount(rawPathB, 6);   // reorder pathB's array so index 0 corresponds to the same
                                               // physical feature as pathA's index 0 (its "first vertex")
const d = interpolatePath(pathA, pathB, progress);  // now a predictable, not nearest-neighbour, morph
```
If the shapes come from different source tools, normalize point order by hand once and store the corrected paths as
the component's data — never re-derive the correspondence per render.

### Worked example
Topic: "Ikon dompet digital bertukar jadi resit" (illustrative — wallet icon morphs into a receipt icon on "lepas
scan").
BEFORE: wallet path (5 points) and receipt path (9 points) interpolated directly; on "lepas scan" the wallet
corners fly to the nearest receipt points and the shape briefly looks like a crushed triangle.
AFTER: resample the wallet path to 9 points, set both paths' first vertex at the icon's top-left corner, then morph —
the wallet's top edge opens cleanly into the receipt's top edge on "lepas scan."

### Check
- Do both shapes in the morph have the same vertex count before any interpolation runs?
- Is each shape's first vertex (index 0) at the same physical feature (e.g. both "top-left corner"), not just
  whichever point happened to be drawn first?
- If the morph's direction/behaviour looks wrong, was first-vertex placement checked before anything else was changed?

## NOTES
- Visual gaps: the exact on-screen moment a point gets the double-square "first vertex" icon is a UI detail, not
  reconstructable from narration alone — described here as the method, not the pixel-level UI.
- AE steps dropped: the Pen tool's add/delete-vertex tool and "right-click › Mask and Shape Path › Set First Vertex"
  menu are AE-specific UI; the underlying principle (equal point count, matched first-point index) is tool-agnostic
  and is what raea's path-morph code must satisfy.

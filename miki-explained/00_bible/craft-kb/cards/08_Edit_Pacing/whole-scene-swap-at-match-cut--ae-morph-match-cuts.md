---
title: Whole-scene swap at a match cut — background, grid and set dressing change on the same peak frame
bucket: 08_Edit_Pacing
source: "Motion Feel, Easing & Camera Choreography/After Effects Morph Transition with Match Cuts.txt"
source_time: "09:36–11:17"
tool_target: shot-list
tier: full
use_when: "moving between two places (the shop counter → the supplier's warehouse) inside one continuous gesture"
style_fit: "Fits the 'transitions built from the scene's own objects' rule: the hero's matched move carries the eye while the world behind it changes; ⚠ the new scene's extras must still fade/grow in over ~0.4 s after the cut, never pop as a set."
---

## METADATA
08_Edit_Pacing | After Effects (source) → shot-list join + raea conditional sets at `CUT` | shot-list, raea

## CREATIVE_INTENT
"It's often about using the direction and speed of an animation and simply matching that after a cut… applied to
backgrounds, objects, even full scenes." After the sphere→cube cut, an inner square of the cube also slides to the other
side (linear in, strong ease out "to match the ease above"); then a grid, a new background and embellishments are added to
scene 2 — "we basically transitioned between two completely different environments using match cuts."

## STE_PROCEDURE
1. Build the hero match cut first (shared eased move, cut at the fastest frame).
2. Add one secondary element in scene B that keeps moving in the same direction after the cut (source: the cube's back square, linear start + strong ease out).
3. Swap the background on the cut frame.
4. Add scene B's structure (source: a grid) on the cut frame.
5. Add 1–3 embellishments in scene B for visual interest, timed to settle after the cut.
6. Play: the eye follows the hero, so the environment change is accepted.

## AGENT_EXECUTION
Shot-list: one row per side; the join cell names the hero move, the secondary follow-through and the set swap.
raea: render set A for `f < CUT`, set B for `f >= CUT`; the hero's transform is continuous; the secondary element's
position eases out after `CUT` in the hero's direction. ⚠ House: background colour/light may change on the cut (it is
hidden by the move), but embellishments fade/grow in over ≥ 0.4 s starting at `CUT`.

### Worked example
Topic: "Dari mana datangnya stok kedai runcit" (illustrative).
- BEFORE: `| 8 | "Barang ni sampai dari gudang" | cut to a warehouse wide shot | crates appear |`
- AFTER: `| 7 | "Satu kotak susu atas rak…" | macro carton on a kedai runcit shelf, slides right, accelerating | — | whole-scene-swap-at-match-cut |`
  `| 8 | "…asalnya dari gudang pemborong" | at the peak (on "gudang") the carton continues right onto a pallet; dark concrete floor replaces the shelf; pallet slats slide right and ease out | 2 more cartons grow in 0.4 s behind; "gudang" label fades in | whole-scene-swap-at-match-cut |`

### Check
- Does the hero's move continue unbroken across the cut?
- Does at least one scene-B element keep the same direction after the cut?
- Do the scene-B extras fade/grow in (≥ 0.4 s), not pop?
- Is the location change something the line literally says?

## NOTES
- Visual gaps: the grid, background and embellishment designs (and the closing showreel 11:20–11:51) are visual only.
- AE steps dropped: inner group position keys → raea child transform in scene B.

---
title: Peak-velocity pass-through — make the middle of a move its fastest point to hide a jump
bucket: 08_Edit_Pacing
source: "Procedural Mograph & 3D-to-AI Render Passes/Three motion graphics techniques for your After Effects projects.txt"
source_time: "00:18–01:29, 08:48–11:37"
tool_target: raea
tier: principle
use_when: "an object morph or swap that can't physically happen (one coin becomes two, a stroke becomes two circles, a tag becomes a receipt line) and must read as continuous"
style_fit: "Fits joins built from the scene's own objects; both ends of the move stay eased, only the middle is fast — no whip; camera stays under ~130°/s."
---

## METADATA
08_Edit_Pacing | After Effects graph editor → raea `interpolate` + `Easing` | raea props + shot-list events

## CREATIVE_INTENT
"You cut between two different states at the moment of highest velocity." Pull the velocity handles of the two
extreme keys so the centre of the action is the fastest moment; the impossible change (two closed circles
intertwining; a flat stroke becoming two full circles) happens there, "solved by a very smooth and fast movement".
The stroke-split move ends the same way: "put full velocity on the end".

## STE_PROCEDURE
1. Key the two extreme states (start and end).
2. Ease out of the start key and ease into the end key strongly (long handles).
3. Check that the speed graph peaks exactly where the impossible change happens.
4. Swap the shape/state on that peak frame (within 1–2 frames).
5. Before adding polish, play it at speed and confirm the swap is invisible.

## AGENT_EXECUTION
raea: `interpolate(f, [a, b], [p0, p1], {easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp"})`
— a symmetric in-out puts peak speed at the midpoint; place the mesh swap (`{f < mid ? <A name="a"/> : <B name="b"/>}`)
at `mid`. Shot-list: name the peak word in the events cell.

### Worked example
Topic: "Satu modal, dua gerai" (illustrative).
- BEFORE: `| 7 | "Satu modal, dua gerai" | coin on a table; cut to two coins | — |` (two unrelated frames).
- AFTER: `| 7 | "Satu modal, **dua** gerai" | macro top-down on one 50 sen coin on a wooden counter | coin slides right, eased in-out over 0.6 s; at the speed peak (on "dua") the mesh swaps to two coins drifting apart; they settle eased under two small stall-roof models | peak-velocity-pass-through |`

### Check
- Does the swap frame sit on the speed peak (±2 frames)?
- Are both ends eased (no linear start/stop)?
- Does the swap land on a spoken word?

## NOTES
- AE: velocity handles in the graph editor. The source also drives gradient-stroke ends with two nulls via expression
  (parenting position only mixes comp space and layer space) — in raea/HyperFrames, compute both ends from the same
  values; see `09_UI_Motion/stroke-stretches-and-splits-into-two-shapes--three-mograph-techniques.md`.

---
title: Spline pass — restore the contrast interpolation flattens
bucket: 01_Animation_Motion
source: "Minimalist Tech & SaaS 3D Staging/The 5 steps to great 3D animation in Blender.txt"
source_time: "06:03–06:59"
tool_target: raea
tier: principle
use_when: "switching the blocked animatic from held states to eased curves, when the preview suddenly feels mushy"
style_fit: Fits with ⚠ cap — "exaggerate your overshoot" is limited by the house cap (3–5 %, ≥ 0.4 s, no bounce); contrast comes from timing and ease strength instead.
---

## METADATA
01_Animation_Motion | Blender Graph Editor (source) | raea `Easing` strength / key timing

## CREATIVE_INTENT
Principle (step 4, "the cursed step"): blocking looks snappy in stepped mode, but once the computer interpolates the
missing frames everything goes "busy", you "lose a lot of impact" and it looks floaty. Go into the curves and push
them to **bring back contrast**: exaggerate easings, exaggerate overshoot, fix smears — get back the feeling you had
when blocking was finished. Start with the centre of gravity, then contacts, then the hierarchy outward.

## STE_PROCEDURE
1. Before switching to curves, save the stepped animatic as the reference feel.
2. Switch each move to its eased curve.
3. Compare with the stepped reference; mark moves that feel floaty or late.
4. Strengthen eases on those moves (e.g. `Easing.cubic` → `Easing.poly(4)`), keeping arrivals on the word.
5. Shorten the travel time where a move drags, not the hold.
6. Keep overshoot within 3–5 % over ≥ 0.4 s.
7. Fix the hero object first, then the camera, then secondary items.

## AGENT_EXECUTION
raea: ease strength = the `Easing` function in `interpolate(..., { easing })`; contrast = fast middle, firm settle on the word.

### Worked example
Line "Step 3: kira kos bahan" at a cendol stall, a cost tag RM1.80 slides on (illustrative):
- BEFORE: tag eases in over 0.9 s with `Easing.inOut(Easing.sin)`; arrives after the word, feels floaty.
- AFTER: `| 6 | "kira kos bahan" | push in 4 % | tag travel 0.45 s with `Easing.out(Easing.poly(4))`, lands on "kos"; 3 % overshoot over 0.4 s | spline-pass-restore-contrast |`

### Check
- Does each eased move still land on its word as in the stepped animatic?
- Does any move feel slower or softer than its blocked version? Strengthen it.
- Is any overshoot above 5 % or bouncy?

## NOTES
- Hierarchy order covered by `cards/01_Animation_Motion/layered-animation-root-first--dinosaur-run-cycle.md`.

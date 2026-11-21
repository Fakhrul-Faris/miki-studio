---
title: Secondary reaction to the cut — objects in shot B react as if the cut hit them
bucket: 01_Animation_Motion
source: "Motion Feel, Easing & Camera Choreography/Animation Technique Guide.txt"
source_time: "04:06–04:25"
tool_target: raea
tier: full
use_when: "a hard cut with matched composition but no matched motion, where shot B is a contrast to shot A (before/after, rich/poor, cost/profit)"
style_fit: "⚠ source has coins bouncing → adapted: a single eased settle ≤ 3–5 % over ≥ 0.4 s, no repeat bounces, no spring."
---

## METADATA
01_Animation_Motion | After Effects → raea | shot-list events + raea props

## CREATIVE_INTENT
When matching composition only ("no real motion matching here"), add secondary animation: the coins bounce "as if
they're reacting to the transition, as if the cut happening somehow affected the physics of this world" — saying
"hey look at this, things are being contrasted in this scene".

## STE_PROCEDURE
1. Match the composition of A and B first (same layout or subject position).
2. Pick 1–3 small objects in B that can react.
3. On B's first frames, offset them slightly (~2–3 % lift or tilt) as if jolted.
4. Ease them back to rest over ≥ 0.4 s, once — no second bounce.
5. Stagger the objects by ~2 frames each.

## AGENT_EXECUTION
raea: per object `const t = interpolate(f, [0, 14], [1, 0], {easing: Easing.out(Easing.cubic), extrapolateRight: "clamp"})`
→ y offset `t * 0.02 * size`, staggered `f - i * 2`. No `spring`.

### Worked example
Topic: "Jual 100 cawan sehari vs 10 cawan sehari" (plain arithmetic at RM2 = RM200 vs RM20).
- BEFORE: cut from a busy counter to a quiet counter, nothing moves.
- AFTER: `| 8 | "Seratus cawan, **RM200**" | macro on a cash tray full of notes | count up in accent |` → hard cut → `| 9 | "Sepuluh cawan, RM20" | same framing, nearly empty tray | the two lone notes lift 2 % and settle over 0.5 s, staggered 2 frames; the RM20 label grows in | secondary-reaction-to-cut |`

### Check
- Is the composition matched across the cut?
- Do the reactions settle once, ≤ 5 %, over ≥ 0.4 s?
- Is B a contrast to A (the reason for the reaction)?

## NOTES
- Visual gap: bounce height/timing in the source is visual only.

---
title: Detailed blocking — breakdowns of breakdowns until nothing is ambiguous
bucket: 01_Animation_Motion
source: "Minimalist Tech & SaaS 3D Staging/The 5 steps to great 3D animation in Blender.txt"
source_time: "04:32–05:37"
tool_target: raea
tier: principle
use_when: "after the stepped animatic: defining how each object gets from one key state to the next (a morph, a slide, a split) before smoothing"
style_fit: Fits — applied to object state changes and camera, not characters; smears not used (⚠ not our style); overshoot capped at 3–5 % over ≥ 0.4 s.
---

## METADATA
01_Animation_Motion | Blender (source) | raea key lists / state-change props

## CREATIVE_INTENT
Principle (step 3, "blocking plus"): where the animation "starts to shine" and where most time should go. Add
**breakdowns** — poses telling how you get from one key pose to the next — then **breakdowns of these breakdowns**.
Refine timing by chunks, moving keys to change pace and rhythm. Refine **arcs** with the motion path; add supporting
poses to define easing; smears for fast poses if the style allows; **overshoots to communicate weight**. Done when
everything happening is defined. "If you have a doubt between two frames, build a new pose. Whenever you ask if you have
enough poses, the answer is no."

## STE_PROCEDURE
1. For each state change, add one breakdown state between the two key states.
2. Add breakdowns between those where the path or shape is still unclear.
3. Work in chunks of 2–3 setups; move keys to set pace on the words.
4. Plot the path of moving objects; bend straight paths into arcs where travel is physical (lift, drop, throw).
5. Add a supporting key near each end to define the ease (see the thirds cards).
6. Add overshoot only for weight, ≤ 3–5 % over ≥ 0.4 s.
7. Before smoothing, confirm every frame's state is defined; if unsure between two frames, add a state.

## AGENT_EXECUTION
In raea, a breakdown = an extra entry in the `interpolate` input/output arrays (position, scale, morph weight, opacity).
A morph (coin stack → bar chart) gets at least one breakdown state at ~50 % where the shapes visibly hand over.

### Worked example
Line "RM100 jadi RM150" for a stall's weekly takings (illustrative):
- BEFORE: `| 5 | "jadi RM150" | push in 5 % | coin stack keys: 10 coins → 15 coins |` — coins pop in between.
- AFTER: `| 5 | "jadi RM150" | push in 5 % | breakdowns: coin 11 grows in at 20 %, 12–15 staggered every ~0.1 s on small arcs onto the stack, counter RM100 → RM150 lands on "RM150" | detailed-blocking |`

### Check
- Does every state change have at least one breakdown state?
- Is there any frame where the agent can't say what the object looks like? Add a state there.
- Do physical travels follow arcs, and is overshoot ≤ 3–5 %?

## NOTES
- Smears dropped (cartoon character technique; not house style).

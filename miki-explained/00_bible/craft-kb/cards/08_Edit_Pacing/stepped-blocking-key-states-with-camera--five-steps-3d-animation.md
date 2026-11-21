---
title: Plan in a few words, then block key states and camera together in stepped holds
bucket: 08_Edit_Pacing
source: "Minimalist Tech & SaaS 3D Staging/The 5 steps to great 3D animation in Blender.txt"
source_time: "00:42–03:47"
tool_target: shot-list
tier: principle
use_when: "between the locked script and the first animatic: building the film file's setups before any easing or polish"
style_fit: Fits with ⚠ adaptation — source blocks character poses (kicks, jumps); no people in Style D → block the hero object's key states and the camera per setup. Stepped holds are a working stage only; RECIPE-D says the final camera never holds.
---

## METADATA
08_Edit_Pacing | Blender character animation (source) | shot list → film setups → animatic (RECIPE-D §8)

## CREATIVE_INTENT
Principle, steps 1–2 of the source's 5-step process (plan → blocking → detailed blocking → splining → polish), which
also apply to 2D and game animation. **Plan:** write the idea in a few words (no full script needed), gather references,
and **stick to the written idea** so you don't overextend and never finish. **Blocking:** create only the key poses —
the ones "you could describe in a few words" — plus contact poses; ignore timing at first, make each pose appealing and
the flow readable "a bit like a storyboard". Block the **camera at the same time**, in **stepped/constant
interpolation**. Industry order before blocking: storyboard → animatic → previs (rhythm and framing with primitives —
the source used rows of cubes) → blocking. Ideas are cheap now and expensive later. Then a rough timing pass.

## STE_PROCEDURE
1. Write the episode idea in ≤ 10 words and keep it visible; reject additions that don't serve it.
2. For each setup, describe the hero's key state in ≤ 6 words ("receipt torn in half").
3. Block each key state and its camera end pose together, held (stepped), no easing.
4. Use grey boxes/primitives where the asset isn't built yet; check framing and composition only.
5. Do a rough timing pass: place each held state on its named word.
6. Add new ideas only now; after this stage they cost more labour.

## AGENT_EXECUTION
In raea, a stepped animatic = each setup shows its `b` camera and end state for its full duration (no `u` easing). Render
the animatic, review framing and word timing, then switch on the RECIPE-D §6.3 move curve. This matches the house order:
board → camera map + animatic → preview → final.

### Worked example
How-to: setting a price at a burger stall (cost RM3.20 + profit RM2.30 = price RM5.50, plain arithmetic, illustrative):
- BEFORE: first pass fully animated setup 1 (flight, easing, bloom) before setups 2–12 existed; setup 6 then needed a new idea and the flight was redone.
- AFTER: `| 1–12 | all lines | each setup blocked as a held end pose: S3 "patty + bun = RM3.20" grey box, S6 "tambah RM2.30" stacked coin boxes, S9 "RM5.50" tag | held states on their words; no easing yet | stepped-blocking |` → animatic review → curves on.

### Check
- Is the idea written in ≤ 10 words, and does every setup serve it?
- Does every setup have a key state describable in ≤ 6 words?
- Were camera and state blocked together before any easing or polish?

## NOTES
- Sponsor (CG Boost course) and the author's course plug stripped. 00:42–01:26 references emailed notes and a reference-editing video not visible — visual gap.
- Hierarchy order when splining (centre of gravity → contacts → spine → head → arms) is covered by `cards/01_Animation_Motion/layered-animation-root-first--dinosaur-run-cycle.md`.

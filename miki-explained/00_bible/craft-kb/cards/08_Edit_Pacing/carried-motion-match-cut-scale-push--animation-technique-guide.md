---
title: Carried-motion match cut — one property keeps moving across the cut (100→105 % scale push)
bucket: 08_Edit_Pacing
source: "Motion Feel, Easing & Camera Choreography/Animation Technique Guide.txt"
source_time: "01:07–02:46"
tool_target: raea
tier: full
use_when: "joining two setups that share nothing (L05→L06 a new object/place) on a hard cut on the word, and the cut alone feels dead"
style_fit: "Fits 'transitions built from the scene's own motion'; ⚠ source warns the punch becomes TikTok-style 'attention-span-corroding' if overused → capped at ≤ 5 % (prefer 2–3 %), eased, max ~1 in 3 joins."
---

## METADATA
08_Edit_Pacing | After Effects (comp scale keys, graph editor) → raea camera/transform props | shot-list join + raea

## CREATIVE_INTENT
A match cut makes something match between two cut scenes — the subject or the motion. When two scenes "aren't
connected by anything", connect their motion: scale both comps 100 → 105 %, accelerating into the cut and out of
it. "This holds your attention much better… keeps the pace up". It's the fix "when you don't have enough time or
budget to make a big crazy transition". Scale is one property; position (perhaps more common), rotation or "any
other property" work the same way; in and out speeds needn't be equal.

## STE_PROCEDURE
1. Before adding motion, ask if a plain cut tells the story better ("sometimes a cut is the best tool"); if yes, stop.
2. On the last ~8–12 frames of shot A, key scale 100 → 105 % (ours: 100 → 102–103 %).
3. Ease out of the first key and accelerate hard into the cut key (speed peaks at the cut).
4. On the first ~8–12 frames of shot B, key 100 → 105 % again, accelerating out of the cut and easing into the end.
5. For position or rotation, keep the same direction and similar speed on both sides of the cut.
6. Be subtle: "the 5 % I used here maybe is even overkill".
7. Before locking, count carried-motion cuts; keep them to about one in three joins.

## AGENT_EXECUTION
Shot-list join cell: "carry: push-in 3 %" or "carry: drift left". raea: drive the camera's distance (or FOV) with a
clamped `interpolate` over the last 10 frames of A with `Easing.in(Easing.cubic)`, and over the first 10 of B with
`Easing.out(Easing.cubic)`, same direction; the hard cut sits on the word frame from `vo_timeline.json`. Moving the
camera (dolly) keeps the 3D parallax; FOV change is the literal "comp scale" equivalent.

### Worked example
Topic: "Kenapa restoran letak harga RM9.90, bukan RM10" (plain pricing, no real-company claim).
- BEFORE: `| 4 | "Nampak murah sikit kan?" | macro on a menu card | price fades in |` hard cut to `| 5 | "Tapi beza dia 10 sen je" | macro on a 10 sen coin | — |` (dead join).
- AFTER: `| 4 | "Nampak murah sikit kan?" | macro low angle on menu card "RM9.90" | camera pushes 3 % accelerating into the cut | carried-motion-match-cut |`
  `| 5 | "Tapi beza dia **10 sen** je" | macro on a 10 sen coin, same screen centre | push continues 3 % out of the cut, easing to rest; accent on the coin on "10 sen" | carried-motion-match-cut |`

### Check
- Does the same property move in the same direction on both sides of the cut?
- Is speed highest at the cut frame?
- Is the scale/distance change ≤ 5 % (target 2–3 %)?
- Are carried-motion cuts ≤ ~1 in 3 joins?

## NOTES
- Visual gaps: the before/after comparison clips and the "project that looks like this" overuse montage are visual only.
- AE comp-scale keys → raea camera dolly/FOV; graph-editor ease → `Easing` curves.

---
title: Simplicity first — one main light and one colour until the balance works
bucket: 04_Shading_Lighting
source: "Making a SERENE render in blender.txt"
source_time: "17:42–19:25"
blender_version_source: 4.x
tool_target: principle-only
tier: full
style_fit: Mirrors Style D (one key, one accent); a guardrail against adding lights/colours to fix a weak frame.
---

## METADATA
04_Shading_Lighting | any | principle-only

## CREATIVE_INTENT
You can only balance what you can control individually; ten lights or ten colours at once can't be managed. Keep one main light (plus a barely-there fill) and one colour family as long as possible; add the second colour only after the balance is right (the speaker added it two hours in).

## STE_PROCEDURE
1. Start with one key Spot Light and one very subtle Area Light directly above everything that only lifts shadows.
2. Keep all materials in one colour family.
3. Balance contrast, light amount and colour until the frame feels calm and right.
4. Only then add a second colour (video: a blue water tint), checking it complements rather than conflicts.
5. Add each further element one at a time, re-balancing after each.

## AGENT_EXECUTION
raea: a frame with exactly `<SpotLight>` key + low `<AmbientLight>`/`<RectLight>` fill, neutral materials, then a single accent via `emissive` or `base_color` on the line's subject. ProStage in `/Users/user/Private/miki-studio/miki-explained/tools/raea/kit/pro.tsx` already follows this (one soft key, dim cool fill).
Blender: n/a (process).

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none.

## ADDENDUM — Blender Finally Did It!!
A fully concrete, worked instance of this card's principle, scaled down to exactly two lights total: world
background strength set to black before placing any light; light 1 (key) is a large plain white Emission-material
plane behind the field, brightness raised "a little bit," lighting the flat sections cleanly; light 2 (accent) is
one Area light, Disc shape, aimed at one corner, coloured orange, Spread brought down until the disc's edge is
visible, exposure tuned by eye. Exactly one neutral key + exactly one coloured accent, no third light added —
confirms the "one main light, one colour" principle holds even in a scene that's otherwise simple, not just as a
starting point to build from. (Render settings: Cycles, 300 samples, denoiser on, ~3 s/frame at 1080p — a
render-correctness detail, not a lighting value.)

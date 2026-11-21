---
title: Get colour from real props and sets, not from a grade
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/The SECRET to Great Movies The 60-30-10 Color Rule in Filmmaking (2025).txt"
source_time: "00:00–00:43, 02:06–02:44, 04:04–04:42"
tool_target: frame-brief
tier: full
use_when: "choosing the hero object and set dressing; tempted to fix a palette with <Grade> or hue shifts"
style_fit: "Fits Style D and raea (real materials, real-time light): choose the coloured object/material itself; <Grade> only for a whole-film lean. Fits 'fresh 2k assets per episode' — pick assets by their real colour."
---

## METADATA
06_Art_Direction | general (production design) | frame brief (Decision), asset choice in ASSET-SOURCES.md, raea materials

## CREATIVE_INTENT
In visually distinct films colour is never random: a piece of furniture, a non-white wall, clothes, umbrellas, a car
are coloured by design. Many think colour can be done in post-production grading; it is possible but impractical —
"you never get the same feel as with real objects of that colour" and "it's cheaper to buy a blue sweater than to colour
grade a white one into blue in every shot". The art department sets colours of set, costumes and props, guided by
60-30-10. Low-budget recipe: start with the furniture you have as the complementary (30 %) colour, paint the walls the
dominant colour (cheap), and add a highlight colour on purpose — "professional and intentional for the cost of a
bucket of paint".

## STE_PROCEDURE
1. Before building, decide each frame's colours in the brief, not after the render.
2. Choose the hero object whose real colour already is the role you need (secondary or highlight).
3. Set the room/wall/floor material to the dominant colour (the "bucket of paint").
4. Keep existing neutral props as the secondary; recolour them only if they clash.
5. Add one highlight prop or material deliberately, where the line points.
6. If a colour is wrong on the render, change the material or asset, not the grade.
7. Use `<Grade>` only for an even, whole-film warm/cool lean.

## AGENT_EXECUTION
- **Frame brief "Decision":** name the coloured object, e.g. "the orange price sticker is the 10 % — real sticker
  material, not a tint".
- **Asset choice:** when sourcing 2k models/textures, filter by real colour first; log the reason in ASSET-SOURCES.md.
- **raea:** colour lives in `StandardMaterial base_color` / glTF textures and light `color`; avoid per-object hue
  hacks in post. `<Grade>` takes its first frame's values for the whole piece (post.md), so it cannot colour one object
  anyway.
### Worked example
Topic: "Gerai nasi lemak: kenapa bungkus guna daun pisang lagi untung" (illustrative numbers).
- BEFORE: generic grey packet model; plan "grade the packet greener in post so it reads as banana leaf".
- AFTER: source a real banana-leaf texture (secondary, 30 %), dark charcoal stall counter (dominant, 60 %), and one
  real red sambal-chilli accent on the line "RM 0.30 je kos daun" — the coin counter appears in the same red (10 %).
  No grade touches the leaf.
### Check
- Is every colour in the brief attached to a real object or material?
- Is `<Grade>` used only for a whole-film lean, never to recolour one object?
- Is the highlight a deliberate prop/material, placed where the line points?

## NOTES
- Visual gaps: none needed; examples are verbal.
- Live-action costume/skin tone advice (consider the actor's skin tone) does not apply to Style D (no people); see the
  colour-wheel addendum for orange-teal.

## ADDENDUM — Color Theory in Film — Color Psychology for Directors Ep5
Source: "Studio Lighting, Silhouettes & Color Theory/Color Theory in Film — Color Psychology for Directors Ep5.txt" (04:10–04:30).
- Grading in post gives "a wealth of options", but it is expensive and lengthy and "rarely can make up for a project
  that lacked a thoughtful color design strategy in pre-production" — confirms this card's rule that colour belongs
  in the objects/materials chosen at build time, not fixed later in the grade. Write the palette (HSB per role) in
  the frame brief before any build.
| parameter | Color Theory Ep5 | recommended for Style D |
|---|---|---|
| grading vs design | post-grading rarely fixes a project that lacked a pre-production colour strategy | palette (HSB per role) written in the frame brief before any build |

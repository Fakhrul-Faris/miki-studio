---
title: Attention-pull ladder — focus < light/contrast < a single colour
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/Why Your Videos Don't Look Like Movies Yet.txt"
source_time: "05:54–06:38"
tool_target: frame-brief
tier: full
use_when: "deciding how to make the line's subject win the frame when focus alone is not enough (busy shelf, UI with many items)"
style_fit: "Validates the house 'one brand accent' rule: a single saturated colour in a muted field is the strongest pull; use it only on the line's subject."
---

## METADATA
06_Art_Direction | general (*La La Land*, *Jesse James*, *Schindler's List*) | frame brief Eye + palette

## CREATIVE_INTENT
"Focus decides what matters, but a magnet stronger than focus: light. The eye is drawn to the brightest thing, or rather
to contrast" — Mia steps into a projector beam and "in the dark only one person remains"; "a warm face on a cool
background lifts right off it"; it works reversed, "a dark silhouette on light". "And sometimes the strongest pull is
colour": a red space suit in a white room, the single red coat in black-and-white *Schindler's List*.

## STE_PROCEDURE
1. Before you brief the Eye field, rank the pulls: focus (weakest), light/contrast, single colour (strongest).
2. Use shallow focus first to separate the subject from its layer.
3. If others still compete, give the subject the highest contrast: lit on dark, or dark on lit.
4. Add warm-on-cool when the subject is lit: warm subject light, cool background.
5. Reserve the single saturated colour (brand accent) for the subject only; keep the field muted.
6. Never give a second element a higher rung than the subject.

## AGENT_EXECUTION
Frame brief Eye: "<subject> — pulls: focus ✓ / contrast ✓ / accent ✓". raea: DoF on the camera for focus; a narrow
`SpotLight` with `range` on the subject and dark surroundings for contrast; warm key `#ffe2c0` vs cool ambient
`#9fc4ff`; the accent as the only saturated `base_color`/emissive. For silhouettes: a lit `RectLight` backdrop (with
`range`) behind a dark object.

### Worked example
Topic: "Satu barang je yang buat untung kedai serbaneka" (illustrative: 1 item × RM1.20 margin × 300 sold = RM360/day).
- BEFORE: a sharp shelf of 40 snacks, evenly lit, all colourful; the hero item is just sharper.
- AFTER Eye field: "the ice-cream freezer lid — focus ✓ (shelf blurred), contrast ✓ (narrow top spot on the freezer, aisle dark), accent ✓ (only the price sticker 'RM1.20 untung' in brand colour; other packs desaturated)".

### Check
- Is the subject on the highest rung used in the frame?
- Is the saturated accent on the subject only, with a muted field?
- Does a squint (blur) still show the subject first?

## NOTES
- Set-1 related: `masters/04_Shading_Lighting/darkness-guides-the-eye.md`, `masters/05_Camera_Raea_Pipeline/dof-focus-fstop.md`.
- Visual gaps: film frames are named, not described beyond the quoted lines.

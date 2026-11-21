---
title: Film palette references — Her (warm + red), Blade Runner 2049 (neutral + neon), Sin City (B/W + one colour)
bucket: 04_Shading_Lighting
source: "The Key to Realistic Renders in Blender.txt"
source_time: "06:44–07:44"
blender_version_source: 4.x
tool_target: principle-only | raea
tier: full
style_fit: Sin City’s neutral world + one popping colour is literally the Style D accent rule.
---

## METADATA
04_Shading_Lighting | any | Principle → raea materials + Bloom

## CREATIVE_INTENT
Whole films hold one colour idea: Her stays warm and soft with recurring red for love; Blade Runner 2049 sets bland neutrals against vibrant, strange neons to say "artificial"; Sin City is black-and-white with strong highlights and an occasional colour that grabs attention.

## STE_PROCEDURE
1. Pick one reference palette for the whole video.
2. For "Sin City": keep the set neutral (greys, desaturated materials) and give one story object the only saturated colour.
3. For "2049": neutral world + one or two vivid emissive accents.
4. For "Her": warm soft light everywhere, red as the recurring motif colour.
5. Keep the palette constant across every shot.

## AGENT_EXECUTION
- raea Sin City variant: set dressing `base_color` in greys, `<Grade saturation={0.3} />` would also kill the accent, so instead desaturate materials at source and keep the accent `emissive`/`base_color` saturated; `<Bloom threshold={0.9}>` so only the accent glows.
- Blender: same at material level; check with a Hue/Saturation comp preview only.

## NOTES
- Deprecated: none.
- Visual gaps: film examples are illustrative, not steps.
- Rule conflicts: none.


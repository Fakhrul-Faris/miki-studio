---
title: Steal lighting from the pros — recreate real portrait / car / product photography setups
bucket: 04_Shading_Lighting
source: "The Power of LIGHTING in Blender!.txt"
source_time: "07:38–08:39"
blender_version_source: 3.2+
tool_target: principle-only | raea
tier: full
style_fit: Use product-photography diagrams for every macro hero beat; the brain trusts lighting it recognises.
---

## METADATA
04_Shading_Lighting | any | Principle → raea rigs

## CREATIVE_INTENT
Don’t reinvent the wheel: lighting has centuries of practice (Rembrandt lighting from the 17th century). Copy known setups — portrait for people, car photography for cars, product photography for products. Viewers recognise them, so the render reads as real.

## STE_PROCEDURE
1. Identify the subject category (portrait, car, product, food).
2. Find a real lighting diagram or behind-the-scenes setup for it.
3. Place lights to match the diagram (positions, sizes, ratios).
4. Compare with the reference photo; adjust until the highlights and shadows match.

## AGENT_EXECUTION
- Save the reference + diagram as `ref_<shot>.md` (craft-fundamentals).
- raea: translate each diagram light (softbox → RectLight + soft Spot; strip box → narrow RectLight; hair/rim → Spot behind) with `.lookingAt(hero)`.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: portrait setups apply to posed figures only (no gesture/walk).


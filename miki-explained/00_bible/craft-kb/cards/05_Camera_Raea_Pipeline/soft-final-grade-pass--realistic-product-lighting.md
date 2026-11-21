---
title: Final soft grade pass turns sharp CG renders into soft photographic ones
bucket: 05_Camera_Raea_Pipeline
source: "Realistic Product Lighting In Blender.txt"
source_time: "07:13–07:27"
blender_version_source: 4.x
tool_target: principle-only | raea
tier: full
style_fit: Our grade lives in raea (Grade + Bloom + AgX), not in a Blender compositor.
---

## METADATA
05_Camera_Raea_Pipeline | any | Compositor (paid preset) → raea Grade / Bloom

## CREATIVE_INTENT
Raw renders look sharp and boring; a final grade (the author’s paid "cinematic compositor") softens contrast, adds glow and colour — making them read as photographed.

## STE_PROCEDURE
1. Render the lit product.
2. Apply a consistent grade: slight highlight glow, gentle contrast curve, light vignette, mild colour temperature.
3. Compare before/after; keep it subtle.

## AGENT_EXECUTION
raea: `<ToneMapping mode="agx" />`, `<Bloom intensity={0.45} threshold={0.85} />`, `<Grade midtones={{ contrast: 1.12 }} vignette={0.2} aberration={0.002} />` (first frame’s values hold for the piece; kit BlendShot LOOK).

## NOTES
- Deprecated: none.
- Visual gaps: the compositor preset’s contents are not shown.
- Rule conflicts: paid preset not used; grade is ours.


---
title: Colour management — sRGB display, view transform (tone mapping) and Look
bucket: 05_Camera_Raea_Pipeline
source: "The Power of Color in Blender 3D!.txt"
source_time: "00:27–04:13"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Keep Blender look-test stills and raea finals on the same transform (AgX + contrast) so colours stay consistent across tools and phones.
---

## METADATA
05_Camera_Raea_Pipeline | 4.x | Color Management → raea ToneMapping / Grade

## CREATIVE_INTENT
The same red looks different on every screen; colour management keeps the image consistent across software, screens and people. The view transform is the "filter" (tone mapping) that turns scene light into display colour; the Look adds contrast.

## STE_PROCEDURE
1. Render Properties › Color Management: leave Display Device = sRGB (the screen standard).
2. Choose View Transform:
   - Standard — no conversion.
   - Khronos PBR Neutral — PBR colour accuracy; product photography/rendering.
   - AgX — improved Filmic, 16.5 stops of dynamic range; the default choice.
   - Filmic — older, worse than AgX; don’t use.
   - Filmic Log — flat log images for external grading.
   - False Color — exposure check (white over, black under).
   - Raw — no conversion, skips the display transform.
3. Choose a Look (author’s pick: Medium High Contrast or Punchy with AgX).
4. Remember these are view filters: changeable after rendering.

## AGENT_EXECUTION
```python
import bpy
sc = bpy.context.scene
sc.display_settings.display_device = "sRGB"
sc.view_settings.view_transform = "AgX"            # or "Khronos PBR Neutral" for product accuracy
sc.view_settings.look = "AgX - Medium High Contrast"
```
raea: `<ToneMapping mode="agx" />` (house), `"neutral"` (~ likely Khronos PBR Neutral — verify), `"none"` ≈ Standard/Raw, `"tony"` default; contrast via `<Grade midtones={{ contrast: 1.12 }} />`. No False Color mode — use `tools/x1/exposure_check.py` on stills.

## NOTES
- Deprecated: Filmic (pre-4.0 default) → AgX.
- Visual gaps: none.
- Rule conflicts: none.


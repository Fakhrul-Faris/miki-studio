---
title: Hide a fill light's shape in reflections (Multiple Importance off, Glossy ray visibility off)
bucket: 04_Shading_Lighting
source: "Get Better Lighting in Blender With This Easy Trick.txt"
source_time: "11:00–12:42"
blender_version_source: 3.x/4.x (Cycles)
tool_target: Blender bpy
tier: full
style_fit: Glossy macro surfaces (coins, phones, packaging) would show a fake fill as a white disc; in raea the fix is placement/radius/roughness since per-light toggles don't exist.
---

## METADATA
04_Shading_Lighting | Blender 3.x/4.x (Cycles) | Blender bpy (raea: no direct equivalent)

## CREATIVE_INTENT
Invisible fills still appear as a white circle or square in water, glass or other glossy surfaces, which exposes the trick. Remove
the light from reflections, or drop its glossy contribution entirely for a rougher, more fitting look.

## STE_PROCEDURE
1. Look for the fill's shape reflected in glossy surfaces (water, glass, metal).
2. First, in Light Properties (below Power), uncheck Multiple Importance.
3. If highlights are still too strong, open Object Properties → Visibility → Ray Visibility.
4. Uncheck Glossy on that light.
5. Compare with simply lowering Power: it keeps a different look; author chose Glossy off for all fills in this scene.
6. Use this only when needed; usually leave it on.

## AGENT_EXECUTION
### Blender (Cycles)
```python
L = bpy.data.objects["Fill.001"]
L.data.cycles.use_multiple_importance_sampling = False   # 3.x path; in 4.x verify (may be Light.use_multiple_importance... ~)
L.visible_glossy = False
```
### raea
- raea: no equivalent (no per-light MIS or glossy-visibility toggle; lights in Bevy have no visible emitter shape, but their
  specular highlight still shows on glossy materials).
- Nearest controls with real props: smaller `radius` on a PointLight (smaller highlight); raise the glossy surface's
  `perceptual_roughness`; move the fill out of the mirror angle from camera; or use a `<RectLight>` placed where its highlight
  falls off-frame.

## NOTES
- Deprecated: Cycles light MIS moved from `light.cycles.use_multiple_importance_sampling` in older versions; check the 4.x/5.x API
  (not stated in the video).
- Visual gaps: none — narrated step by step.
- Rule conflicts: none.

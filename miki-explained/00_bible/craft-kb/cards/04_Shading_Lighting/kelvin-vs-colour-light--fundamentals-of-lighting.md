---
title: Kelvin for natural light, free colour for non-natural light and separation
bucket: 04_Shading_Lighting
source: "Fundamentals of Lighting in Blender.txt"
source_time: "23:55–26:58"
blender_version_source: 4.x (5.x for the Temperature field)
tool_target: Blender bpy | raea
tier: full
style_fit: Fits — neutral/warm Kelvin key for the real room; a non-natural colour only where it carries meaning, which matches "one saturated brand accent only on what the line is about".
---

## METADATA
04_Shading_Lighting | 4.x / 5.x | Blender bpy, raea

## CREATIVE_INTENT
Use the Kelvin (blackbody) scale when the light should feel natural — candle ~1,500 K, incandescent 2,000–2,500 K, daylight ~5,500–6,500 K, sky bluer. Use a free RGB colour when the light should feel man-made or unreal (club, street neon, sci-fi), because hues such as purple never come from nature. A slight colour difference between two lights also helps the brain separate two faces of an object.

## STE_PROCEDURE
1. Decide whether the light should read as natural or artificial.
2. If natural, set the lamp Temperature on the Kelvin scale.
3. If artificial, set the lamp Color to a hue not found on the Kelvin scale.
4. If two faces blend together, tint the second light slightly differently from the key.
5. If the tint spills onto unimportant surfaces, move the light back or make it a Spot.

## AGENT_EXECUTION
Blender:
```python
import bpy
L = bpy.data.lights["Fill"]
# Blender 5.x: Temperature field on lights (~ API name per UI; verify in your build)
L.use_temperature = True; L.temperature = 2700        # ~ incandescent
# any version: explicit colour
L.color = (0.65, 0.75, 1.0)                           # ~ "a little bluer" sci-fi fill
```
Pre-5.x Kelvin: Cycles light node tree `Blackbody [Color] -> Emission [Color]` (Temperature 2700), or pick the RGB by hand.
raea (hex only; no Kelvin prop):
```tsx
<SpotLight color="#ffd2a1" ... />   {/* ~2,700 K incandescent */}
<SpotLight color="#fff4e8" ... />   {/* ~5,500 K warm-neutral (house ProStage key) */}
<AmbientLight brightness={60} color="#9FB2D9" />  {/* cool fill */}
```
Whole-film warm/cool shift: `<Grade temperature={...} />` (one grade for the piece).

## NOTES
- Deprecated: Kelvin values approximate; hex conversions above are `~`.
- Visual gaps: the exact blue picked is visual only.
- Rule conflicts: Style D allows one saturated accent only on the subject of the line — a coloured light that tints the whole frame counts as that accent. Keep other lights neutral or near-Kelvin.

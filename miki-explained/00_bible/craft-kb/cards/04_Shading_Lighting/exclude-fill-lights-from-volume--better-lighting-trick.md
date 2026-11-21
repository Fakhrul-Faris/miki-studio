---
title: Keep fake fills out of the volumetric fog (Volume Scatter ray visibility off)
bucket: 04_Shading_Lighting
source: "Get Better Lighting in Blender With This Easy Trick.txt"
source_time: "09:54–10:58"
blender_version_source: 3.x/4.x (Cycles)
tool_target: raea
tier: full
style_fit: Style D uses haze with one top light; fills must lift the object without adding glowing blobs in the air.
---

## METADATA
04_Shading_Lighting | Blender 3.x/4.x (Cycles) | Blender bpy + raea

## CREATIVE_INTENT
With a scene-wide volume scatter cube, a bright invisible fill shows as a big glow in the fog and gives itself away. Excluding the
fill from the volume lets it be as bright as needed while the haze shows only the real key.

## STE_PROCEDURE
1. Before you raise a fill's power in a volumetric scene, select the light.
2. Open Object Properties → Visibility → Ray Visibility.
3. Uncheck Volume Scatter.
4. Repeat for every fake fill light.
5. Leave the key light's Volume Scatter on so its beams stay.

## AGENT_EXECUTION
### Blender (Cycles)
```python
for name in ("Fill.001", "Fill.002", "BigPoint"):
    bpy.data.objects[name].visible_volume_scatter = False
```
### raea
- Equivalent by default: only lights marked `volumetric` scatter in `<VolumetricFog>` / `<FogVolume>` (post.md). Leave
  `volumetric` off on every fill; put it on the key only:
```tsx
<SpotLight volumetric transform={key} intensity={900000} outer_angle={0.4} inner_angle={0.2} shadow_maps_enabled />
<RectLight transform={fill} width={1} height={1} intensity={40000} color="#ffe2c0" />   {/* no volumetric */}
```
- Note `<VolumetricFog ambient>` scatters ambient light everywhere regardless; keep it low if fills are many.

## NOTES
- Deprecated: in 2.9x this was Object → Cycles Settings → Ray Visibility; since 3.0 it is Object → Visibility → Ray Visibility
  (`Object.visible_volume_scatter`).
- Visual gaps: none.
- Rule conflicts: none.

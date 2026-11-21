---
title: Low-key build that starts from the back light — strong top-back hair/halo light, raised specular, cone in the fog
bucket: 04_Shading_Lighting
source: "Lighting 3D Characters for Storytelling.txt"
source_time: "05:33–05:54, 13:19–13:51, 17:17–18:44, 20:21–20:28, 23:02–23:60, 26:34–26:45"
blender_version_source: 2.8–3.x? (EEVEE legacy)
tool_target: Blender bpy | raea
tier: full
style_fit: For a dark macro object, a top-back light drawing a bright edge is often the first thing that makes it read; matches "one soft top light" when the top light sits slightly behind.
---

## METADATA
04_Shading_Lighting | 2.8–3.x? → 4.2+ / raea | Blender bpy + raea

## CREATIVE_INTENT
For low-key mystery, start with the back light, not the key: a strong light behind and above draws a bright rim/halo on the top edges and, through fog, a visible cone. Make it much stronger than key and fill for drama. A small radius gives a hard, glinting rim (bluish, behind the subject, video scenario 2); a larger one a softer halo. Keep it behind — not straight overhead — or recesses go black.

## STE_PROCEDURE
1. Before adding a key, place a Spot behind and above the subject aimed at its top edge.
2. Raise its Power well above where the key will sit (back ≫ key > fill for drama).
3. Set Radius small for a hard rim, larger for a soft halo.
4. Raise the light's Specular multiplier to make the outline glint (video: "cranked up the specular").
5. Tint it to its motivation (cool blue = moonlight through a ceiling hole).
6. Check it is behind, not directly above; move it back if the subject's recesses go black.
7. With fog present, confirm the light's cone shows in the air.

## AGENT_EXECUTION
Blender:
```python
d = bpy.data.lights.new("Back", 'SPOT'); d.energy = 3000; d.color = (.75, .85, 1)   # ~
d.shadow_soft_size = 0.1      # small = hard rim
d.specular_factor = 2.0       # ~ "cranked up"; breaks physical correctness on purpose
d.volume_factor = 1.0
```
raea:
```tsx
<SpotLight name="back" color="#bcd2ff" volumetric shadow_maps_enabled
  transform={Transform.fromXyz(0, 2.6, -1.4).lookingAt([0, 0.5, 0])} intensity={3_000_000}
  outer_angle={0.3} inner_angle={0.15} radius={0.08} />
<VolumetricFog />
<FogVolume name="air" position={[0, 1.2, 0]} scale={[4, 3, 4]} density={0.04} scattering={0.5} anisotropy={0.7} />
```
Specular boost: raea: no equivalent (Bevy lights have no per-light specular multiplier) — get the glint from the material instead: lower `perceptual_roughness`, add `clearcoat`, or raise `reflectance`.

## NOTES
- Deprecated: legacy EEVEE "Specular" light multiplier is `Light.specular_factor` (still in 4.x).
- Visual gaps: back-light power and size are shown only.
- Rule conflicts: none.

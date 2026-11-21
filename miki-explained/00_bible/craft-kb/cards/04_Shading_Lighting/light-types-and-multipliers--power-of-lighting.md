---
title: Blender light types (Point, Sun, Spot, Area) and their power / diffuse / specular / volume multipliers
bucket: 04_Shading_Lighting
source: "The Power of LIGHTING in Blender!.txt"
source_time: "00:00–01:35"
blender_version_source: 3.2+
tool_target: Blender bpy | raea
tier: full
style_fit: Mapping table for blend2raea / BlendShot: which raea light replaces which Blender light.
---

## METADATA
04_Shading_Lighting | 3.2 → 4.2+ | Blender bpy → raea light components

## CREATIVE_INTENT
Point = bulb (all directions); Sun = directed, high intensity across the whole world; Spot = aimable cone; Area = studio panel (rectangle/disk). Each has Power (W), Diffuse / Specular / Volume multipliers and a Shadow toggle. Outdoors an HDRI or Nishita Sky can replace the Sun.

## STE_PROCEDURE
1. Add the light type that matches the real source (Shift+A › Light).
2. Set Power (W for point/spot/area; strength in W/m² for sun).
3. Use Diffuse / Specular / Volume multipliers to tune what the light affects (e.g. Specular 0 = no highlight; Volume 0 = no beam).
4. Toggle Cast Shadow as needed.
5. Outdoors, prefer an HDRI or Nishita Sky Texture over a bare Sun.

## AGENT_EXECUTION
```python
import bpy
bpy.ops.object.light_add(type="AREA", location=(0, -2, 3)); L = bpy.context.object.data
L.energy = 200; L.shape = "RECTANGLE"; L.size, L.size_y = 1.0, 0.5
L.diffuse_factor, L.specular_factor, L.volume_factor = 1.0, 0.5, 1.0
L.use_shadow = True
```
raea mapping (lights.md): Point → `<PointLight intensity(lm) range>`; Sun → `<DirectionalLight illuminance(lux) shadow_maps_enabled>`; Spot → `<SpotLight outer_angle inner_angle (radians, half-angle)>`; Area → `<RectLight width height>` (no shadows) or Spot + RectLight pair as BlendShot does; HDRI → `<Environment>`; sky → `<Atmosphere light />`. No per-light diffuse/specular multipliers; `volumetric` flag = volume on/off.

## NOTES
- Deprecated: none; `specular_factor`/`volume_factor` exist in 4.x.
- Visual gaps: none.
- Rule conflicts: none.


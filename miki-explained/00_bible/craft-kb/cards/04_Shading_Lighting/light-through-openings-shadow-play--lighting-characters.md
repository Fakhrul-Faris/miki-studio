---
title: Shine lights through windows, vegetation or objects for shadow play and light streaks (sun for straight parallel shadows)
bucket: 04_Shading_Lighting
source: "Lighting 3D Characters for Storytelling.txt"
source_time: "08:08–08:25, 11:00–11:54, 13:12–13:18, 31:26–31:41"
blender_version_source: 2.8–3.x? (EEVEE legacy)
tool_target: Blender bpy | raea
tier: full
style_fit: Shadow shapes on the back wall give the dark room texture without lighting it; "shadow as character" in our anti-slop rules.
---

## METADATA
04_Shading_Lighting | 2.8–3.x? → 4.2+ / raea | Blender bpy + raea

## CREATIVE_INTENT
Shining a light through a window, foliage or a row of objects always makes the shot more dramatic: shadows add contrast and texture, so a plain back wall stops being boring. With fog in the air, the openings turn into visible light streaks. Use a sun for long, straight, parallel window shadows; a big spot otherwise. Extra objects (cubes) placed in front of a light add variety to the shafts — unevenness looks natural.

## STE_PROCEDURE
1. Place the light outside the window/opening, aimed through it at the wall or subject.
2. For straight parallel shadows across a wall, use a Sun lamp; otherwise use an intense Spot (speaker finds EEVEE suns harsh).
3. Add a low-density fog volume so the beams through the openings show (see silhouette card for values).
4. To light a dull background wall, add a large spot through the window at low power.
5. Add a few blockers (cubes, branches) in front of the light to break the shafts unevenly.

## AGENT_EXECUTION
Blender: `bpy.data.lights.new("WinSun", 'SUN')`, `angle` small (~0.5°) for crisp shadows; Spot alternative with `spot_size` ~60°.
raea:
```tsx
<VolumetricFog />
<FogVolume name="air" position={[0, 1.5, 0]} scale={[6, 4, 6]} density={0.03} scattering={0.5} anisotropy={0.6} />
<DirectionalLight name="sun" color="#ffd9a8" volumetric shadow_maps_enabled soft_shadow_size={0.5}
  transform={Transform.fromXyz(-4, 5, -3).lookingAt([0, 0, 0])} illuminance={9000} />
{/* window frame / blind / leaves as real meshes, or invisible blockers: */}
<Mesh3d name="blind" shadow="only" transform={Transform.fromXyz(-2, 2.5, -1.5)}><Cuboid half_size={[0.6, 0.02, 0.8]} /><StandardMaterial /></Mesh3d>
```
Only the first two volumetric spots and two volumetric directional lights get exact hard-edged shafts; put the important one first.

## NOTES
- Deprecated: none.
- Visual gaps: window geometry and sun angle are shown only.
- Rule conflicts: none; if the shadow pattern moves, move it slowly and eased (no flicker).

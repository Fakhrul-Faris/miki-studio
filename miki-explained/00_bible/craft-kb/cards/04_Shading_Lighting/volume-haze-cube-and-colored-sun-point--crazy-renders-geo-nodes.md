---
title: Volume Scatter haze cube + high warm point light as a "sun"
bucket: 04_Shading_Lighting
source: "How To Make Crazy Renders With Easy Geometry Nodes.txt"
source_time: "12:42–13:21"
blender_version_source: 3.x+
tool_target: raea
tier: full
style_fit: Matches Style D's dark room + one soft top light + atmosphere; keep haze faint so the hero stays crisp.
---

## METADATA
04_Shading_Lighting | 3.x+ → 4.2+ (Cycles in video) | raea at render time

## CREATIVE_INTENT
A thin haze box plus one warm light high above gives depth, separates layers and makes the light itself visible — the cheapest way to make a busy scatter set feel atmospheric and cinematic.

## STE_PROCEDURE
1. Add a Cube enclosing the whole set; set Viewport Display → Display As = Bounds.
2. Give it a material with **Volume Scatter** → Material Output [Volume]; Density = 0.01, Anisotropy = 0.8.
3. Add a Point Light far above the set ("way up"); set Color = yellow, then pull saturation back (value by eye).
4. Raise Power until it reads as a sun through the haze (value unknown, visual only).

## AGENT_EXECUTION
Blender (look-dev only; Cycles volume does not export to GLB):
```python
bpy.ops.mesh.primitive_cube_add(size=40); cube = bpy.context.active_object; cube.display_type = 'BOUNDS'
m = bpy.data.materials.new("Haze"); m.use_nodes = True; N = m.node_tree.nodes; N.remove(N["Principled BSDF"])
vs = N.new('ShaderNodeVolumeScatter'); vs.inputs['Density'].default_value = 0.01; vs.inputs['Anisotropy'].default_value = 0.8
m.node_tree.links.new(vs.outputs['Volume'], N['Material Output'].inputs['Volume']); cube.data.materials.append(m)
bpy.ops.object.light_add(type='POINT', location=(0, 0, 30)); L = bpy.context.active_object.data
L.color = (1.0, 0.85, 0.55)   # ~ "yellow, a bit less"
```
raea (the real implementation):
```tsx
<VolumetricFog />
<FogVolume name="haze" position={[0, 3, 0]} scale={[40, 12, 40]} density={0.02} scattering={0.5} anisotropy={0.8} color="#fff4e0" />
<SpotLight name="sun" volumetric shadow_maps_enabled color="#ffd98c" intensity={3600000} outer_angle={0.5} inner_angle={0.25}
  transform={Transform.fromXyz(0, 12, 0).lookingAt([0, 0, 0])} />
```
- Density: Blender 0.01 → raea ~0.02 ("faint haze" in post.md); units differ, tune by still.
- Prefer a volumetric `SpotLight` (one shadow map) or `DirectionalLight` over a PointLight (six maps) for the shaft, per raea post.md. Intensity ~ by distance² (900,000 lm ≈ 3 m; 12 m ≈ ~14,000,000 — tune).
- Pair with `<Bloom intensity={~1} threshold={0.9} />` and `<DepthOfField>` for Style D.

## NOTES
- Cycles volume scatter is path-traced; raea's froxel `<VolumetricFog>` gives the same look in real time. "Volume bounces" etc. don't exist in raea.
- Fog volume values may animate per frame (exception to first-frame-only effects) — fade haze in ≥0.4 s, never pop.
- Visual gaps: light power/height and the exact colour are by eye.
- Rule conflicts: none.

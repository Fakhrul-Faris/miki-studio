---
title: Volume-scatter haze cube for scale and light shafts
bucket: 04_Shading_Lighting
source: "Detail Isn't Hard  Blender Tutorial.txt"
source_time: "33:58–34:48"
blender_version_source: 3.x
tool_target: raea
tier: full
style_fit: Fits Style D dark room + soft top light — a faint haze makes the top light visible and separates the hero from the dark.
---

## METADATA
04_Shading_Lighting | 3.x source (Cycles) → raea | raea (Blender reference)

## CREATIVE_INTENT
A thin, forward-scattering haze over the whole set gives depth and scale and makes beams visible. The source calls it the
step that "always looks good". Keep density in the low hundredths and adjust per scene.

## STE_PROCEDURE
1. Add one cube that encloses the whole set and the camera's view of it.
2. Set the cube's Viewport Display → Display As = Bounds so it stays out of the way.
3. Give the cube a material whose Volume input is a Volume Scatter node (no surface shader).
4. Set Density ≈ 0.02 (keep the "0.0x" range; tune per scene).
5. Set Anisotropy ≈ 0.8 (forward scattering: beams glow when the camera looks toward the light).
6. Toggle the cube off/on to confirm it adds scale, not mud.

## AGENT_EXECUTION
### Blender (reference look)
```python
import bpy
bpy.ops.mesh.primitive_cube_add(size=1); v = bpy.context.object; v.name = "haze"; v.scale = (60, 60, 40)   # ~ encloses set
v.display_type = 'BOUNDS'
m = bpy.data.materials.new("haze"); m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
out = nt.nodes.new('ShaderNodeOutputMaterial'); vs = nt.nodes.new('ShaderNodeVolumeScatter')
vs.inputs['Density'].default_value = 0.02; vs.inputs['Anisotropy'].default_value = 0.8
nt.links.new(vs.outputs['Volume'], out.inputs['Volume'])     # Volume Scatter [Volume] -> Material Output [Volume]
v.data.materials.append(m)
```
- Exclude this cube from the GLB export (raea will not read a Blender volume material).

### raea
```tsx
<VolumetricFog />
<FogVolume name="haze" position={[0, 3, 0]} scale={[20, 8, 20]} density={0.02} scattering={0.5} absorption={0.1} anisotropy={0.8} />
<SpotLight volumetric shadow_maps_enabled transform={Transform.fromXyz(0, 6, 0).lookingAt([0, 0, 0])} intensity={2700000} outer_angle={0.35} inner_angle={0.17} />
```
- `density` 0.02 = faint haze, 0.1 dust, 0.5 smoke (post.md). Mark lights `volumetric` or no shafts appear.
- The volume must contain the air the light crosses AND the camera's view of it. `anisotropy` near 1 = shaft glows toward the light.
- Distance-only fade (no shafts): `<Fog color={bg} near={n} far={f} />`.

## NOTES
- Other sources in this batch: "Cyber Japan Art Breakdown  Blender.txt" (37:01–37:34) uses the same cube (Display As Bounds, Volume Scatter; values shown not spoken). "How to Add Tons of Detail To Your Renders  Blender.txt" (20:59–21:24) starts at density 0.001 → 0.005, anisotropy raised, and raises Cycles Light Paths → Volume bounces.
- Cycles "volume bounces" has no raea equivalent (no path tracing); raea's froxel grid scatters single-bounce. Raise `scattering` or add `<VolumetricFog ambient ambientColor />` for a fuller fill.
- Blender density units ≠ raea density; match by eye on a still.

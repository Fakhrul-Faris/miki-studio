---
title: Atmosphere from one Volume Scatter cube (display as bounds; density 0.001–0.01, anisotropy 0.5)
bucket: 04_Shading_Lighting
source: "Making an Industrial Scene in Blender.txt"
source_time: "15:18–16:19"
blender_version_source: 3.x
tool_target: raea
tier: principle
style_fit: Faint haze in the dark room makes the single top light visible as a soft shaft and adds depth behind the hero; raea's FogVolume + volumetric SpotLight is the render-time equivalent.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Shader nodes (source) → raea VolumetricFog / FogVolume

## CREATIVE_INTENT
Principle: a single cube of thin scattering volume over the whole set turns the key light into visible air and pushes the background back. Idea: anisotropy pulls the bright part of the fog toward the light source, so the glow sits where the light comes from.

## STE_PROCEDURE
Method:
1. Add a cube that encloses the whole scene.
2. Set its viewport display to Bounds so it does not block the view.
3. Give it a material with Volume Scatter linked into Material Output [Volume].
4. Darken the Volume Scatter colour a little to thin the fog (similar to lowering density).
5. Set Anisotropy to 0.5.
6. Set Density to 0.0025; start between 0.01 and 0.001 and pick by eye.
How-to (raea):
7. Add `<VolumetricFog />` beside the camera and one `<FogVolume>` box around the set.
8. Mark the key `SpotLight` `volumetric` so it shafts through the fog.

## AGENT_EXECUTION
### Source tool (Blender)
```python
import bpy
bpy.ops.mesh.primitive_cube_add(size=1); vol = bpy.context.active_object; vol.name = "Atmos"
vol.dimensions = (20, 20, 10)                       # ~ enclose the set
vol.display_type = 'BOUNDS'                         # Object → Viewport Display → Display As: Bounds
mat = bpy.data.materials.new("Atmos"); mat.use_nodes = True
N, L = mat.node_tree.nodes, mat.node_tree.links
N.remove(N["Principled BSDF"])
vs = N.new('ShaderNodeVolumeScatter')
vs.inputs['Color'].default_value = (0.6, 0.6, 0.6, 1)   # ~ "a bit darker"
vs.inputs['Density'].default_value = 0.0025             # video value
vs.inputs['Anisotropy'].default_value = 0.5             # video value
L.new(vs.outputs['Volume'], N['Material Output'].inputs['Volume'])
vol.data.materials.append(mat)
```
Links: `Volume Scatter [Volume] -> Material Output [Volume]`.

### Blender / raea translation
```tsx
<VolumetricFog />
<FogVolume name="atmos" position={[0, 0.5, 0]} scale={[3, 2, 3]} density={0.02}
  color="#d8d4cc" scattering={0.4} absorption={0.1} anisotropy={0.5} />
<SpotLight volumetric transform={Transform.fromXyz(0, 1.4, 0.2).lookingAt([0, 0, 0])}
  intensity={900000} outer_angle={0.4} inner_angle={0.2} shadow_maps_enabled />
```
post.md: `density` 0.02 faint haze, 0.1 dust; `anisotropy` near 1 makes a shaft glow when the camera looks toward the light. Blender density does not map 1:1 to raea density (`~`); judge on a still. A volumetric light with no FogVolume around it shows no shaft.

## NOTES
- Display-as-bounds tip: the author binds it to a Quick Favourites shortcut (right-click → Add to Quick Favorites).
- Values given: density 0.0025, anisotropy 0.5, starting range 0.01–0.001.
- Use `hero={false}` on VolumetricFog when no hard-edged shaft is in shot (cheaper).
- Visual gaps: none for settings.
- Rule conflicts: none; keep haze faint so the macro object stays crisp.

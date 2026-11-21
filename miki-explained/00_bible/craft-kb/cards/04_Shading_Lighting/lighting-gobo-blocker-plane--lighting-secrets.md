---
title: Lighting gobo (alpha-masked blocker plane)
bucket: 04_Shading_Lighting
source: "5 Lighting SECRETS in Blender.txt"
source_time: "07:35–14:28"
blender_version_source: 3.x/4.x
tool_target: Shader nodes
tier: full
style_fit: Breaks up the single soft top light into dappled patches on the real surface — richer macro frames without adding a second light; keep soft and unreadable.
---

## METADATA
04_Shading_Lighting | Blender 3.x/4.x (Cycles or EEVEE) | Shader nodes + Blender bpy

## CREATIVE_INTENT
Use when the light direction is right but the frame feels flat or unfinished: a hidden plane with a noisy alpha mask between the
light and the scene casts soft patches of light and shade, making the lighting feel finished. The viewer should not be able to tell
what the blocker is.

## STE_PROCEDURE
1. Add a Spot light (Sun, Area also work); raise Power a lot so it covers the area.
2. Set the light Radius above 0 m and raise Spot Blend.
3. Add a Plane (Shift+A → Mesh → Plane) between light and scene, covering the full lit area.
4. Add a new material to the plane.
5. Link a Noise Texture (or Image Texture) through a Color Ramp into Principled BSDF [Alpha].
6. Raise Color Ramp contrast (move handles together) until patches of light appear.
7. Lower overall alpha until the plane casts shadow; keep it high enough that the scene isn't fully dark.
8. Raise Noise Detail and Roughness slightly.
9. Before you judge sharpness, note that light distance and light Radius control shadow softness, not the mask.
10. Keep Radius large enough that the blocker's shape is unreadable; use sharp (Radius ~0) only for deliberate leaf/tree shadows.
11. For an image blocker, UV-unwrap the plane (U → Cube Projection) and scale the UVs.
12. Parent the plane to the light (select plane, Shift-select light, Ctrl+P → Object (Keep Transform)).
13. Optional: combine with an image-textured light.

## AGENT_EXECUTION
### Blender
```python
import bpy
bpy.ops.object.light_add(type='SPOT', location=(0, 0, 4))
light = bpy.context.object
light.data.energy = 3000; light.data.shadow_soft_size = 0.3; light.data.spot_blend = 0.6  # ~
bpy.ops.mesh.primitive_plane_add(size=4, location=(0, 0, 2.5))
plane = bpy.context.object
mat = bpy.data.materials.new("Gobo"); mat.use_nodes = True; plane.data.materials.append(mat)
nt = mat.node_tree; N = nt.nodes
noise = N.new("ShaderNodeTexNoise"); noise.inputs["Detail"].default_value = 6; noise.inputs["Roughness"].default_value = 0.6  # ~
ramp = N.new("ShaderNodeValToRGB")
ramp.color_ramp.elements[0].position = 0.45; ramp.color_ramp.elements[1].position = 0.55  # ~ high contrast
nt.links.new(noise.outputs["Fac"], ramp.inputs["Fac"])
nt.links.new(ramp.outputs["Color"], N["Principled BSDF"].inputs["Alpha"])
mat.blend_method = 'HASHED'   # EEVEE Legacy only; EEVEE Next/Cycles read Alpha directly
plane.parent = light; plane.matrix_parent_inverse = light.matrix_world.inverted()  # = Ctrl+P Keep Transform
```
Nodes: `Noise Texture [Fac] -> Color Ramp [Fac]`; `Color Ramp [Color] -> Principled BSDF [Alpha]`. Image variant: `Image Texture [Color] -> Color Ramp`.

### raea
- Blocker: `<Mesh3d shadow="only">` — casts shadow without being drawn (lights.md). Give it real holes (Manifold solid with cut-outs, or several slats/scattered small Cuboids) rather than relying on alpha; whether an `alpha_mode={{ Mask: 0.5 }}` texture is respected in the shadow pass is not documented — test with a still.
- Softness: on `<SpotLight shadow_maps_enabled soft_shadows_enabled radius={0.3}>` (PCSS); larger `radius` = softer patches. A sun: `<DirectionalLight soft_shadow_size={5}>`.
- Sharper map where it matters: `<Shadows distance={20} firstCascade={3} />`.

## NOTES
- Deprecated: Material Blend Mode/Shadow Mode (Alpha Hashed) are EEVEE Legacy; EEVEE Next (4.2+) uses Render Method Dithered/Blended.
- Visual gaps: exact ramp handle positions and noise scale visual only.
- Rule conflicts: none; animate the blocker only slowly (drift), never flicker.

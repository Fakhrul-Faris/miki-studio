---
title: Exterior light from the Sky Texture (or a Sun) at a side angle for shape-making shadows
bucket: 04_Shading_Lighting
source: "How To Use Lighting In Your Renders  Blender Tutorial.txt"
source_time: "04:15–05:41"
blender_version_source: 3.x
tool_target: Shader nodes | raea
tier: full
style_fit: For the rare exterior/street establishing shot; side sun = readable form, matches raking-key principle of Style D.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | World shader nodes → raea DirectionalLight / Atmosphere

## CREATIVE_INTENT
Outdoors, one sky is the whole rig. Sun from the side gives interesting shadows on everything; sun from behind the camera flattens, sun in front silhouettes.

## STE_PROCEDURE
1. In World nodes, replace Background color input with a Sky Texture (Nishita) → Background [Color].
2. Alternatively add a Sun light if the renderer has no Sky Texture.
3. Adjust Sun Elevation and Sun Rotation; try several angles in camera view.
4. Choose a side angle (sun ~90° from the camera axis) so forms cast clear shadows.

## AGENT_EXECUTION
```python
import bpy, math
w = bpy.context.scene.world; w.use_nodes = True; N, L = w.node_tree.nodes, w.node_tree.links
sky = N.new("ShaderNodeTexSky"); sky.sky_type = "MULTIPLE_SCATTERING"   # 5.x name for the old Nishita model
sky.sun_elevation = math.radians(25); sky.sun_rotation = math.radians(90)   # ~ side light
L.new(sky.outputs["Color"], N["Background"].inputs["Color"])
```
raea:
```tsx
<Atmosphere light />   {/* sky drawn and lit by the sun; low sun = sunset */}
<DirectionalLight transform={Transform.fromXyz(6, 3, 0).lookingAt([0, 0, 0])} illuminance={10000} shadow_maps_enabled soft_shadow_size={0.5} />
```
Place the sun perpendicular to the camera’s view direction.

## NOTES
- Deprecated: Sky Texture "Nishita" works in Cycles; EEVEE support for Sky Texture arrived in 4.x (EEVEE Next). 5.0 renames Nishita → "Single Scattering"/multiple-scattering model — check enum names.
- Visual gaps: final elevation/rotation visual only.
- Rule conflicts: street scenes default to no people.
- bpy fixed for 5.3: Sky type 'NISHITA' → 'MULTIPLE_SCATTERING'.

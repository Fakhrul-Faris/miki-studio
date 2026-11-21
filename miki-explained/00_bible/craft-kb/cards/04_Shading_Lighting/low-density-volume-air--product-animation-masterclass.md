---
title: Low-density volume cube to give the studio "air"
bucket: 04_Shading_Lighting
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "1:10:57–1:11:31, 2:41:36–2:42:21"
blender_version_source: 4.3
tool_target: Blender bpy | Shader nodes | raea
tier: full
style_fit: Matches Style D's dark room with soft atmosphere; keep density very low so it reads as air, not fog.
---

## METADATA
04_Shading_Lighting | Blender 4.3 | Shader nodes + raea VolumetricFog

## CREATIVE_INTENT
Without any medium the render "takes place in a vacuum". A barely-there volume softens light falloff and adds depth behind the
product.

## STE_PROCEDURE
1. Add a Cube; scale it on X, Y, Z (`S X`, `S Y`, `S Z`) to enclose products, backdrop and camera view.
2. New material; delete the Principled BSDF.
3. Add Principled Volume; connect Volume → Material Output Volume.
4. Set Density very low (default 1 is far too much; ~0.01–0.05); increase only until the air is just visible.
5. Hide the cube in the viewport while working so the scene stays visible.

## AGENT_EXECUTION
- Blender:
```python
bpy.ops.mesh.primitive_cube_add(size=1); v = bpy.context.object; v.scale = (3, 3, 2)
m = bpy.data.materials.new("Air"); m.use_nodes = True; nt = m.node_tree
nt.nodes.remove(nt.nodes["Principled BSDF"])
pv = nt.nodes.new("ShaderNodeVolumePrincipled"); pv.inputs["Density"].default_value = 0.02   # ~
nt.links.new(pv.outputs["Volume"], nt.nodes["Material Output"].inputs["Volume"])
v.data.materials.append(m)
```
- raea:
```tsx
<VolumetricFog />
<FogVolume name="air" position={[0, 0.2, 0]} scale={[2, 1, 2]} density={0.02} color="#ffffff" scattering={0.4} absorption={0.1} anisotropy={0.5} />
<SpotLight volumetric transform={...} intensity={...} outer_angle={0.5} inner_angle={0.25} shadow_maps_enabled />
```
  Do not export the volume cube to the GLB.

## NOTES
- Deprecated: video "wall metric/f metric" = volumetric.
- Visual gaps: the final density is not stated ("I don't want this to be too much").
- Rule conflicts: none.

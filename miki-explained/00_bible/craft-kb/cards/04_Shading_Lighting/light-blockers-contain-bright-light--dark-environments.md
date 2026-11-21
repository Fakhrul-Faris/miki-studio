---
title: Physical blockers and gobo planes to contain a bright light
bucket: 04_Shading_Lighting
source: "How to Make DARK Environments in Blender.txt"
source_time: "19:36–21:15"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Keeps the single top light on the hero only; raea's `shadow="only"` mesh is a direct equivalent.
---

## METADATA
04_Shading_Lighting | 4.x → 4.2+ / raea | Blender bpy + raea

## CREATIVE_INTENT
Very bright light stays dramatic only if it lands just where you want it. Narrow cones plus objects in the path (pillars, duplicated scene props, a noise-alpha plane) cut the spill so the rest of the frame stays dark; remove them and the render stops being dark.

## STE_PROCEDURE
1. Before raising the key, narrow its cone so it does not spread far.
2. Duplicate existing scene objects (pillars, props) off-camera into the light path to block spill.
3. Add a plane in front of the light with a Noise Texture into the material Alpha to break the beam into patches.
4. Toggle the blockers off to confirm how much they are holding back; keep them on.

## AGENT_EXECUTION
Blender:
```python
import bpy
p = bpy.data.objects["Pillar"]
blk = p.copy(); blk.data = p.data; blk.name = "Blocker_L"; bpy.context.collection.objects.link(blk)
blk.visible_camera = False                       # blocks light, unseen
bpy.ops.mesh.primitive_plane_add(size=6, location=(0, 0, 5))
g = bpy.context.object; mat = bpy.data.materials.new("GoboNoise"); mat.use_nodes = True
N, L = mat.node_tree.nodes, mat.node_tree.links; bsdf = N["Principled BSDF"]
nz = N.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 3.0   # ~
cr = N.new('ShaderNodeValToRGB')                                            # ~ contrast the mask
L.new(nz.outputs['Fac'], cr.inputs['Fac']); L.new(cr.outputs['Color'], bsdf.inputs['Alpha'])
g.data.materials.append(mat); g.visible_camera = False
```
Node links: `Noise Texture [Fac] -> Color Ramp [Fac]; Color Ramp [Color] -> Principled BSDF [Alpha]`.

raea:
```tsx
<Mesh3d name="blocker" shadow="only" transform={Transform.fromXyz(1.2, 2, 0)}>
  <Cuboid half_size={[0.3, 2, 0.3]} />
  <StandardMaterial base_color="#000000" />
</Mesh3d>
<SpotLight transform={Transform.fromXyz(0, 4, 1).lookingAt([0, 0, 0])} intensity={3_000_000}
  outer_angle={0.3} inner_angle={0.15} shadow_maps_enabled />
```
`shadow="only"` casts the shadow without drawing the mesh. For a noise-patterned gobo, see the gobo card (serene-render); alpha-mask shadow casting in raea is unverified — prefer Manifold geometry with holes.

## NOTES
- Deprecated: `Object.cycles_visibility` (pre-3.0) → `Object.visible_camera` etc.
- Visual gaps: the noise plane's material values are not narrated.
- Rule conflicts: none.

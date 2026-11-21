---
title: One photo texture driving base color and (via Color Ramp) roughness
bucket: 04_Shading_Lighting
source: "How To Make Crazy Renders With Easy Geometry Nodes.txt"
source_time: "02:43–04:22"
blender_version_source: 3.x+
tool_target: Shader nodes
tier: full
style_fit: Cheap worn surface for background kit pieces; for the Style D hero object use a full PBR set (RECIPE-D material pass) instead.
---

## METADATA
04_Shading_Lighting | 3.x+ → 4.2+ | Shader nodes

## CREATIVE_INTENT
A single non-PBR photo (concrete, grunge) gives scattered pieces enough surface story to stop reading as clean CG, and reusing it as a roughness mask adds sheen variation for free. Good for secondary set dressing where speed beats fidelity.

## STE_PROCEDURE
1. Before you unwrap, apply scale (Ctrl+A → Scale).
2. Add a material; add an **Image Texture** with a grungy photo (e.g. textures.com concrete, regular photo, not PBR).
3. Link Image Texture [Color] → Principled BSDF [Base Color].
4. In Edit Mode select all and run UV → **Cube Projection**; move/scale UV islands roughly in the UV Editor.
5. Add a **Color Ramp**; link Image Texture [Color] → Color Ramp [Fac] → Principled BSDF [Roughness].
6. Tweak the Color Ramp stops until roughness varies visibly (values unknown, visual only).
7. Add a quick bevel to the piece (Ctrl+B; values unknown, visual only).

## AGENT_EXECUTION
```python
import bpy
ob = bpy.context.active_object
bpy.ops.object.transform_apply(scale=True)
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.uv.cube_project(cube_size=1.0)          # ~
bpy.ops.object.mode_set(mode='OBJECT')
m = bpy.data.materials.new("Grunge"); m.use_nodes = True; ob.data.materials.append(m)
N, L = m.node_tree.nodes, m.node_tree.links
bsdf = N["Principled BSDF"]
img = N.new('ShaderNodeTexImage'); img.image = bpy.data.images.load("//tex/concrete.jpg")
ramp = N.new('ShaderNodeValToRGB')
L.new(img.outputs['Color'], bsdf.inputs['Base Color'])
L.new(img.outputs['Color'], ramp.inputs['Fac'])
L.new(ramp.outputs['Color'], bsdf.inputs['Roughness'])
```
Before GLB export, bake the ramp result to a greyscale roughness image (Cycles bake type ROUGHNESS, or Emit-bake the ramp output) — glTF does not carry a Color Ramp.

raea: `<StandardMaterial base_color_texture={staticFile("concrete.jpg")} metallic_roughness_texture={staticFile("concrete_rough.png")} perceptual_roughness={1} metallic={0} />` (Bevy reads roughness from the green channel; `perceptual_roughness={1}` so the map isn't halved). On a GLB, the exported material carries these maps.

## NOTES
- Visual gaps: Color Ramp stop positions and bevel width are not spoken.
- Not PBR: a photo's baked lighting can fight our one soft top light; use only on out-of-focus background pieces.
- Rule conflicts: none.

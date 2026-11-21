---
title: Convex-edge scratch mask — Edge Angle stored as a named attribute, read by the shader
bucket: 02_Geometry_Nodes
source: "How to Create PRO Materials in Blender.txt"
source_time: "09:32–12:42"
blender_version_source: 4.x
tool_target: Geometry Nodes
tier: full
style_fit: Wear only on edges that stick out is the "real object" tell in a macro close-up; bake for raea, or WearExtension chips (edges by curvature) at render.
---

## METADATA
02_Geometry_Nodes | 4.2+ | Geometry Nodes + Shader nodes (baked) → raea WearExtension

## CREATIVE_INTENT
A "dumb" material puts scratches everywhere; real damage lands on convex parts that stick out. Storing the mesh's signed edge angle as an attribute gives the shader a convex/concave mask that adapts to any model and also works in EEVEE (unlike Pointiness).

## STE_PROCEDURE
1. Add a Geometry Nodes modifier to the object.
2. Add Store Named Attribute between Group Input [Geometry] and Group Output [Geometry].
3. Add an Edge Angle node; link [Signed Angle] → Store Named Attribute [Value].
4. Set the attribute Name (e.g. "edge_angle"); data type Float.
5. In the Shader Editor add an Attribute node; type the exact same name.
6. Before you use it as a mask, check: concave = black, convex = white; invert with Map Range/Color Ramp if needed.
7. Add a Mix node (Color): A = black, B = scratch texture, Factor = Attribute [Fac].
8. Link Mix [Result] into the coat-roughness / roughness chain.

## AGENT_EXECUTION
```python
import bpy
ob = bpy.context.active_object
mod = ob.modifiers.new("SmartMat", 'NODES')
ng = bpy.data.node_groups.new("SmartMat", 'GeometryNodeTree'); mod.node_group = ng
ng.interface.new_socket("Geometry", in_out='INPUT', socket_type='NodeSocketGeometry')
ng.interface.new_socket("Geometry", in_out='OUTPUT', socket_type='NodeSocketGeometry')
N, L = ng.nodes, ng.links
gi = N.new("NodeGroupInput"); go = N.new("NodeGroupOutput")
st = N.new("GeometryNodeStoreNamedAttribute"); st.data_type = 'FLOAT'; st.domain = 'POINT'  # ~ domain not stated
st.inputs["Name"].default_value = "edge_angle"
ea = N.new("GeometryNodeInputMeshEdgeAngle")
L.new(gi.outputs[0], st.inputs["Geometry"]); L.new(ea.outputs["Signed Angle"], st.inputs["Value"])
L.new(st.outputs["Geometry"], go.inputs[0])

m = ob.active_material; SN, SL = m.node_tree.nodes, m.node_tree.links
at = SN.new("ShaderNodeAttribute"); at.attribute_name = "edge_angle"
scr = SN.new("ShaderNodeTexImage"); scr.image = bpy.data.images.load("//tex/scratches_seamless.jpg")
mix = SN.new("ShaderNodeMix"); mix.data_type = 'RGBA'
mix.inputs[6].default_value = (0, 0, 0, 1)                 # A colour = black (no scratch)
SL.new(at.outputs["Fac"], mix.inputs[0])                   # Factor = mask
SL.new(scr.outputs["Color"], mix.inputs[7])                # B colour = scratches
SL.new(mix.outputs[2], SN["Principled BSDF"].inputs["Coat Roughness"])
```
Links: `Edge Angle [Signed Angle] -> Store Named Attribute("edge_angle") [Value]`; `Attribute("edge_angle") [Fac] -> Mix(Color) [Factor]`; `Image(scratches) [Color] -> Mix [B]`; `Mix [Result] -> Principled BSDF [Coat Roughness]`.

raea: the attribute only exists inside Blender. Apply the modifier and bake the masked roughness (`bpy.ops.object.bake(type='ROUGHNESS')`) to a map before GLB export. Render-time alternative: `<ExtendedMaterial base={<StandardMaterial … />} extension={<WearExtension amount={0.4} chips={0.6} />} />` — chips land on sharply curved edges, broad faces stay painted (materials.md).

## NOTES
- Geometry node (shader) ≠ Geometry Nodes. Pointiness from the Geometry shader node is Cycles-only; the stored attribute works in EEVEE too.
- Signed Edge Angle is in radians and can exceed 0–1; remap with Map Range (From −π…π ~) before using as a factor.
- Visual gaps: storage domain and any remap values are not narrated.
- Rule conflicts: none.

---
title: Expose material controls (colour, normal strength, AO, texture scale) as Geometry Nodes modifier inputs
bucket: 02_Geometry_Nodes
source: "How to Create PRO Materials in Blender.txt"
source_time: "13:45–16:59"
blender_version_source: 4.x
tool_target: Geometry Nodes
tier: full
style_fit: Speeds per-episode re-skinning of a reusable hero material in the BUILD stage; no render-time role in raea.
---

## METADATA
02_Geometry_Nodes | 4.2+ | Geometry Nodes + Shader Attribute nodes (build-time only)

## CREATIVE_INTENT
A "pro" material is reusable: its key knobs sit on the modifier panel, not buried in a node heap. Useful when the same hero material is re-coloured or re-scaled every episode.

## STE_PROCEDURE
1. Decide the controls (video: base color, normal strength, AO control, voro scale).
2. In the shader add one Attribute node per control, named exactly: "base_color", "normal_strength", "ao_control", "voro_scale".
3. Link base_color [Color] → Principled [Base Color]; the others via [Fac] → Normal Map [Strength], AO-noise Map Range input, Voronoi [Scale].
4. Expect the material to look broken until the attributes exist.
5. In Geometry Nodes add one Store Named Attribute per control with the same names (copy names with Ctrl+C / Ctrl+V over the field).
6. Before you connect base_color, set that node's data type to Color (not Float).
7. Link each Store Named Attribute [Value] to the Group Input; rename the new sockets in the N panel.
8. Tweak the values on the modifier tab.

## AGENT_EXECUTION
```python
import bpy
ob = bpy.context.active_object
ng = ob.modifiers["SmartMat"].node_group; N, L = ng.nodes, ng.links
gi = next(n for n in N if n.bl_idname == "NodeGroupInput")
go = next(n for n in N if n.bl_idname == "NodeGroupOutput")
specs = [("base_color", 'FLOAT_COLOR', 'NodeSocketColor'), ("normal_strength", 'FLOAT', 'NodeSocketFloat'),
         ("ao_control", 'FLOAT', 'NodeSocketFloat'), ("voro_scale", 'FLOAT', 'NodeSocketFloat')]
prev = go.inputs[0].links[0].from_socket if go.inputs[0].links else gi.outputs[0]
for name, dt, st in specs:
    ng.interface.new_socket(name, in_out='INPUT', socket_type=st)
    s = N.new("GeometryNodeStoreNamedAttribute"); s.data_type = dt; s.domain = 'POINT'
    s.inputs["Name"].default_value = name
    L.new(prev, s.inputs["Geometry"]); L.new(gi.outputs[name], s.inputs["Value"]); prev = s.outputs["Geometry"]
L.new(prev, go.inputs[0])
ob.modifiers["SmartMat"][ng.interface.items_tree["voro_scale"].identifier] = 1000.0
```
Shader side: `Attribute("base_color") [Color] -> Principled [Base Color]`; `Attribute("normal_strength") [Fac] -> Normal Map [Strength]`; `Attribute("ao_control") [Fac] -> Map Range (AO noise) [To Max]` (~ target socket not shown); `Attribute("voro_scale") [Fac] -> Voronoi [Scale]`.

raea: no equivalent (raea reads baked maps and StandardMaterial props). The raea-side "exposed controls" are simply StandardMaterial props in TSX (`base_color`, `perceptual_roughness`, `metallic`, `emissive`) — keep per-episode tweaks there, and bake only what can't be a prop.

## NOTES
- Attributes stored on the POINT domain interpolate across faces; constant values are fine.
- Visual gaps: exactly which Map Range socket "AO control" drives is shown, not said.
- Rule conflicts: none.

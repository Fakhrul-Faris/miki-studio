---
title: Condensation droplets — Join Geometry + Distribute Points on Faces + Instance on Points (icosphere) with Random Value → Map Range scale
bucket: 02_Geometry_Nodes
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "45:26–50:34, 1:35:36–1:36:43, 2:42:21–2:44:06"
blender_version_source: 4.3
tool_target: Geometry Nodes | raea
tier: full
style_fit: Macro realism on the hero (cold drink, "fresh" state); droplets can appear on a word as a state change.
---

## METADATA
02_Geometry_Nodes | Blender 4.3 | Geometry Nodes + raea

## CREATIVE_INTENT
A cold can covered in water drops of varied size, controllable from the modifier panel (density exposed). Replaces the old
particle-system method: faster and non-destructive.

## STE_PROCEDURE
1. Make the droplet: add an Icosphere; new material with Transmission Weight 1 and Roughness 0.15.
2. On the can, add a Geometry Nodes modifier › New.
3. Add Join Geometry; connect Group Input Geometry to it so the can itself is kept.
4. Add Distribute Points on Faces fed by Group Input Geometry.
5. Add Instance on Points: Points from the distribution; Instance = Object Info (the icosphere) Geometry.
6. Add Random Value (Float) → Map Range (From Min 0, From Max 1, To Min ~0, To Max 0.03 at first) → Instance on Points Scale.
7. Connect Instance on Points → Join Geometry → Group Output.
8. Expose Density: drag Distribute Points on Faces Density to the Group Input; set it on the modifier (author: 20; 50 is dense; 13 for the final closer shot).
9. Before you judge size, render the close-up: final To Max 0.034–0.036 at mid shot, 0.05 in the reveal shot (droplets must be visible).
10. Copy to the other products: select targets, then the source (active) › Object › Link/Transfer Data › Copy Modifiers.

## AGENT_EXECUTION
- Nodes:
  - `Group Input [Geometry] -> Distribute Points on Faces [Mesh]`; `Group Input [Density] -> Distribute Points on Faces [Density]`
  - `Distribute Points on Faces [Points] -> Instance on Points [Points]`
  - `Object Info(Droplet) [Geometry] -> Instance on Points [Instance]`
  - `Random Value(Float) [Value] -> Map Range [Value]` (0..1 → 0..0.035) `-> Instance on Points [Scale]`
  - `Group Input [Geometry] -> Join Geometry`; `Instance on Points [Instances] -> Join Geometry`; `Join Geometry -> Group Output [Geometry]`
```python
import bpy
can = bpy.context.active_object                 # the can (active = Copy Modifiers source)
ng = bpy.data.node_groups.new("Droplets", 'GeometryNodeTree')
ng.interface.new_socket("Geometry", in_out='INPUT', socket_type='NodeSocketGeometry')
ng.interface.new_socket("Geometry", in_out='OUTPUT', socket_type='NodeSocketGeometry')
ds = ng.interface.new_socket("Density", in_out='INPUT', socket_type='NodeSocketFloat'); ds.default_value = 20
N, L = ng.nodes, ng.links
gi, go = N.new("NodeGroupInput"), N.new("NodeGroupOutput")
dist = N.new("GeometryNodeDistributePointsOnFaces"); inst = N.new("GeometryNodeInstanceOnPoints")
oi = N.new("GeometryNodeObjectInfo"); oi.inputs["Object"].default_value = bpy.data.objects["Droplet"]
rv = N.new("FunctionNodeRandomValue"); mr = N.new("ShaderNodeMapRange"); mr.inputs["To Max"].default_value = 0.035
join = N.new("GeometryNodeJoinGeometry")
L.new(gi.outputs["Geometry"], dist.inputs["Mesh"]); L.new(gi.outputs["Density"], dist.inputs["Density"])
L.new(dist.outputs["Points"], inst.inputs["Points"]); L.new(oi.outputs["Geometry"], inst.inputs["Instance"])
L.new(rv.outputs["Value"], mr.inputs["Value"]); L.new(mr.outputs["Result"], inst.inputs["Scale"])
L.new(gi.outputs["Geometry"], join.inputs[0]); L.new(inst.outputs["Instances"], join.inputs[0]); L.new(join.outputs[0], go.inputs[0])
can.modifiers.new("Droplets", 'NODES').node_group = ng
bpy.ops.object.make_links_data(type='MODIFIERS')   # copy to selected (active = source)
```
  For GLB export add Realize Instances before Join Geometry (or apply the modifier) and assign the droplet material; the
  can scale is real (15 cm), so droplet radii are in metres.
- raea: export realized droplets inside the can GLB (one mesh, cheap). Material in raea:
  `<StandardMaterial material="Droplet" base_color="#ffffff" specular_transmission={1} ior={1.33} thickness={0.002} perceptual_roughness={0.05} />`.
  Don't make each drop a separate `<Mesh3d>` (meshes draw one by one, ~300 budget, limits.md). To make drops appear on a word,
  fade the droplet material's alpha (`alpha_mode="Blend"`, animate alpha) over ~0.4 s.

## NOTES
- Deprecated: the "Copy Attributes Menu" add-on the author enables is not needed — Copy Modifiers is built in (`Ctrl+L`).
- Visual gaps: Map Range To Min not stated (inferred 0 `~`); "03" in speech = To Max ~0.03.
- Rule conflicts: none.
- bpy fixed for 5.3: Random Value has one output per data type now (rv.outputs[1] → rv.outputs["Value"]); added `import bpy` and `can = bpy.context.active_object`.

---
title: Collection scatter with Distribute Points on Faces → Instance on Points → Collection Info
bucket: 02_Geometry_Nodes
source: "How To Make Crazy Renders With Easy Geometry Nodes.txt"
source_time: "05:04–07:22"
blender_version_source: 3.x+ (nodes unchanged through 4.x)
tool_target: Geometry Nodes
tier: full
style_fit: Builds dense kitbash clusters (crystal beds, coin piles, pill heaps, cable nests) around a Style D hero object in the Blender build stage; realized and exported as GLB, raea only renders it.
---

## METADATA
02_Geometry_Nodes | 3.x+ → 4.2+ | Geometry Nodes

## CREATIVE_INTENT
Use when one shot needs far more detail than you can hand-model: scatter a handful of small kit pieces from a collection over a surface to get instant complexity. In an explainer this fills a macro set (the "many" in "thousands of transactions") without modeling each item.

## STE_PROCEDURE
1. Put all kit-piece objects in one collection (Select → M → New Collection, e.g. `stuff`).
2. Add a plane (or any emitter mesh) and a new Geometry Nodes modifier on it.
3. Add **Distribute Points on Faces** and link Group Input [Geometry] into it.
4. Add **Instance on Points**; link Distribute Points on Faces [Points] → Instance on Points [Points].
5. Add **Collection Info**; set Collection = `stuff`.
6. Link Collection Info [Instances] → Instance on Points [Instance].
7. Enable **Separate Children** and **Reset Children** on Collection Info.
8. Enable **Pick Instance** on Instance on Points; without all three boxes every point gets the whole collection.
9. Link Instance on Points [Instances] → Group Output [Geometry].
10. Before you scale the emitter for more points, scale it in Edit Mode or apply scale (Ctrl+A → Scale); object-mode scale alone does not add points.
11. Before you export to GLB for raea, add **Realize Instances** before Group Output, then apply the modifier.

## AGENT_EXECUTION
```python
import bpy
emit = bpy.context.active_object                      # the plane / emitter
bpy.ops.object.transform_apply(scale=True)            # Ctrl+A → Scale
mod = emit.modifiers.new("Scatter", 'NODES')
ng = bpy.data.node_groups.new("ScatterKit", 'GeometryNodeTree')
ng.interface.new_socket("Geometry", in_out='INPUT',  socket_type='NodeSocketGeometry')
ng.interface.new_socket("Geometry", in_out='OUTPUT', socket_type='NodeSocketGeometry')
mod.node_group = ng
N, L = ng.nodes, ng.links
gi, go = N.new('NodeGroupInput'), N.new('NodeGroupOutput')
dist = N.new('GeometryNodeDistributePointsOnFaces')    # distribute_method 'RANDOM'; Density default 10 (video: default)
iop  = N.new('GeometryNodeInstanceOnPoints')
col  = N.new('GeometryNodeCollectionInfo')
col.inputs['Collection'].default_value = bpy.data.collections['stuff']
col.inputs['Separate Children'].default_value = True
col.inputs['Reset Children'].default_value = True
iop.inputs['Pick Instance'].default_value = True
real = N.new('GeometryNodeRealizeInstances')           # for GLB export only
L.new(gi.outputs['Geometry'], dist.inputs['Mesh'])
L.new(dist.outputs['Points'], iop.inputs['Points'])
L.new(col.outputs['Instances'], iop.inputs['Instance'])
L.new(iop.outputs['Instances'], real.inputs['Geometry'])
L.new(real.outputs['Geometry'], go.inputs['Geometry'])
# export: bpy.ops.object.modifier_apply(modifier="Scatter"); bpy.ops.export_scene.gltf(filepath=..., use_selection=True)
```
Node links: `Group Input [Geometry] -> Distribute Points on Faces [Mesh]`; `[Points] -> Instance on Points [Points]`; `Collection Info [Instances] -> Instance on Points [Instance]`; `Instance on Points [Instances] -> Realize Instances [Geometry] -> Group Output [Geometry]`.

raea: no equivalent (raea does not scatter procedurally; it renders the baked GLB via `<Model src={staticFile("cluster.glb")} position scale />`). For a handful of loose pieces placed in TSX, place `<Model>`s by a seeded list (never `Math.random()` per frame). Keep the cluster as one GLB (meshes draw without batching; keep total piece count modest, limits.md ~300 animated meshes).

## NOTES
- Alternative named in the video: a Hair particle system with Render As = Collection (legacy particles; GN preferred).
- The checkbox trio (Separate Children, Reset Children, Pick Instance) is the step people miss.
- Realize Instances is an addition for our pipeline (glTF exporter can also write instancing via EXT_mesh_gpu_instancing, untested in raea → realize to be safe).
- Visual gaps: none for the node graph; kit pieces themselves are modeled by eye.
- Rule conflicts: none. If the cluster should "multiply" on a word, grow pieces in by scale over ~0.4 s (no pop).

## ADDENDUM — The ONLY Geometry Nodes Tutorial You'll Ever Need!
Additive to Pick Instance (which only picks *a* random instance per point): wire a `Random Value` node (Integer,
Min 0, Max ~1000) into **Instance on Points → Instance Index**, then drag that Random Value's own **Seed** input
back out to a Group Input (e.g. `layout_seed`). One exposed seed slider then reshuffles *which* instance lands on
every point at once, across the whole layout, without touching density or position — useful for generating several
distinct-looking clusters from the same node setup by changing one number. raea still has no equivalent; bake the
chosen seed's result to GLB as usual.

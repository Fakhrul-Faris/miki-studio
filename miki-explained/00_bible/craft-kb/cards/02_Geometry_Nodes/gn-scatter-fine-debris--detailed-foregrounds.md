---
title: Fine-debris scatter (pebble from subdivided cube; Distribute Points on Faces → Instance on Points with random scale/rotation, two size layers)
bucket: 02_Geometry_Nodes
source: "How to get Detailed Foregrounds  Blender Tutorial.txt"
source_time: "04:01–04:17, 15:23–17:00"
blender_version_source: 3.x
tool_target: Geometry Nodes
tier: full
style_fit: Layer 3 of a macro set — crumbs, grit, dust specks around the hero object; the last, finest detail that catches the top light. Realized and exported as GLB; raea renders.
---

## METADATA
02_Geometry_Nodes | 3.x → 4.2+ | Geometry Nodes

## CREATIVE_INTENT
Tiny scattered bits are the finest level of detail and lift a foreground "to the next level". The method does not matter (geometry nodes, particles or a hand-placed cluster duplicated) — what matters is many small things everywhere, in two sizes.

## STE_PROCEDURE
1. Model one pebble: add a cube, subdivide it, morph it into a rough lump, and shrink it.
2. Add a Geometry Nodes modifier to the ground plane.
3. Link Group Input [Geometry] → Distribute Points on Faces [Mesh].
4. Link Distribute Points on Faces [Points] → Instance on Points [Points].
5. Link an Object Info of the pebble [Geometry] → Instance on Points [Instance].
6. Link a Random Value (Float) → Instance on Points [Scale].
7. Link a Random Value (Vector) → Instance on Points [Rotation].
8. Duplicate the branch once with a bigger or smaller pebble size; join both branches.
9. Before you export to GLB, add Realize Instances, then apply the modifier.

## AGENT_EXECUTION
```python
import bpy, math
# 1. pebble
bpy.ops.mesh.primitive_cube_add(size=0.01)                     # ~ 1 cm at macro scale
peb = bpy.context.active_object; peb.name = "Pebble"
sub = peb.modifiers.new("Sub", 'SUBSURF'); sub.levels = 2
bpy.ops.object.modifier_apply(modifier="Sub")
bpy.ops.object.mode_set(mode='EDIT')
bpy.ops.transform.vertex_random(offset=0.0015, seed=3)         # ~ "morph it into a little pebble"
bpy.ops.object.mode_set(mode='OBJECT'); bpy.ops.object.shade_smooth()
peb.hide_render = True; peb.hide_viewport = True

# 2. scatter on the ground
ground = bpy.data.objects["FG_ground"]
mod = ground.modifiers.new("Debris", 'NODES')
ng = bpy.data.node_groups.new("DebrisScatter", 'GeometryNodeTree')
ng.interface.new_socket("Geometry", in_out='INPUT',  socket_type='NodeSocketGeometry')
ng.interface.new_socket("Geometry", in_out='OUTPUT', socket_type='NodeSocketGeometry')
mod.node_group = ng
N, L = ng.nodes, ng.links
gi, go = N.new('NodeGroupInput'), N.new('NodeGroupOutput')
oi = N.new('GeometryNodeObjectInfo'); oi.inputs['Object'].default_value = peb
join = N.new('GeometryNodeJoinGeometry')
def layer(density, smin, smax, seed):
    dist = N.new('GeometryNodeDistributePointsOnFaces'); dist.inputs['Density'].default_value = density
    dist.inputs['Seed'].default_value = seed
    iop = N.new('GeometryNodeInstanceOnPoints')
    rs = N.new('FunctionNodeRandomValue'); rs.data_type = 'FLOAT'
    rs.inputs['Min'].default_value = smin; rs.inputs['Max'].default_value = smax   # 5.x: one socket set per type (inputs[2]/[3] are ID/Seed ints)
    rr = N.new('FunctionNodeRandomValue'); rr.data_type = 'FLOAT_VECTOR'
    rr.inputs['Max'].default_value = (2*math.pi, 2*math.pi, 2*math.pi)
    L.new(gi.outputs['Geometry'], dist.inputs['Mesh'])
    L.new(dist.outputs['Points'], iop.inputs['Points'])
    L.new(oi.outputs['Geometry'], iop.inputs['Instance'])
    L.new(rs.outputs['Value'], iop.inputs['Scale'])                            # Value (float)
    L.new(rr.outputs['Value'], iop.inputs['Rotation'])
    L.new(iop.outputs['Instances'], join.inputs['Geometry'])
layer(density=400, smin=0.4, smax=1.0, seed=0)   # ~ fine layer
layer(density=60,  smin=1.2, smax=2.0, seed=1)   # ~ "one more layer … bigger or smaller version"
L.new(gi.outputs['Geometry'], join.inputs['Geometry'])    # keep the ground itself
real = N.new('GeometryNodeRealizeInstances')
L.new(join.outputs['Geometry'], real.inputs['Geometry']); L.new(real.outputs['Geometry'], go.inputs['Geometry'])
# export: bpy.ops.object.modifier_apply(modifier="Debris") then glTF export
```
Links: `Group Input [Geometry] -> Distribute Points on Faces [Mesh]`; `[Points] -> Instance on Points [Points]`; `Object Info [Geometry] -> Instance on Points [Instance]`; `Random Value(Float) [Value] -> Instance on Points [Scale]`; `Random Value(Vector) [Value] -> Instance on Points [Rotation]`; both `Instance on Points [Instances]` + `Group Input [Geometry] -> Join Geometry -> Realize Instances -> Group Output`.

raea: no equivalent (no procedural scatter at render time). The realized debris arrives inside the set GLB as one mesh — not hundreds of `<Mesh3d>` (limits.md: keep animated meshes under ~300). Depth of field (`<DepthOfField focal_distance aperture_f_stops />`) softens the nearest debris layer.

## NOTES
- Alternatives named in the video: a particle system, or hand-placing ~100 in a circle and duplicating the cluster.
- Socket indices on Random Value differ by data type (shared node); index-based access above is the safe form in 4.x.
- Realize Instances is our addition for GLB safety.
- Video gives no densities or scale ranges; all `~`.
- Visual gaps: pebble sculpt is by eye.
- Rule conflicts: none; never bright-accent the debris.
- bpy fixed for 5.3: Random Value sockets are no longer per-type duplicates: inputs[2]/[3] (now ID/Seed ints) → inputs['Min']/['Max'], outputs[1] → outputs['Value'].

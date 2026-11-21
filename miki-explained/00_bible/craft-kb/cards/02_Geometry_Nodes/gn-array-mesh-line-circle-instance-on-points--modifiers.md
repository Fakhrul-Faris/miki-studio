---
title: Geometry Nodes array — Mesh Line (or Mesh Circle) → Instance on Points, replacing the Array modifier
bucket: 02_Geometry_Nodes
source: "The Power of MODIFIERS in Blender!.txt"
source_time: "06:35–07:59"
blender_version_source: 3.x
tool_target: Geometry Nodes
tier: full
style_fit: Fits Style D "multiply" beats (one coin becomes a row, a ring of plates around a till) and repeated set dressing; growth of the count must fade/grow each copy in over ~0.4 s.
---

## METADATA
02_Geometry_Nodes | 3.x → 4.2+ | Geometry Nodes → raea

## CREATIVE_INTENT
A three-node Geometry Nodes tree is a more flexible array than the Array modifier: line or circle arrays, count, direction, per-copy scale and rotation all on one node group. Use it for rows and rings of repeated objects.

## STE_PROCEDURE
1. Add a Geometry Nodes modifier with a new node tree on an empty mesh object.
2. Remove the Group Input node.
3. Add a Mesh Line node.
4. Add an Instance on Points node.
5. Add the object to repeat (the video uses a Cube node).
6. Link Mesh Line [Mesh] → Instance on Points [Points].
7. Link Cube [Mesh] → Instance on Points [Instance].
8. Link Instance on Points [Instances] → Group Output [Geometry].
9. Set the array direction with Mesh Line Start Location and Offset (X, Y, Z).
10. Set the number of copies with Mesh Line Count.
11. Scale copies with Instance on Points Scale; rotate with Rotation.
12. For a circular array, replace Mesh Line with Mesh Circle.

## AGENT_EXECUTION
```python
import bpy
obj = bpy.data.objects.new("GN_Array", bpy.data.meshes.new("GN_Array")); bpy.context.collection.objects.link(obj)
mod = obj.modifiers.new("GeometryNodes", 'NODES')
tree = bpy.data.node_groups.new("GN_Array", 'GeometryNodeTree')
tree.interface.new_socket("Geometry", in_out='OUTPUT', socket_type='NodeSocketGeometry')   # 4.0+
mod.node_group = tree
N, L = tree.nodes, tree.links
out  = N.new('NodeGroupOutput')
line = N.new('GeometryNodeMeshLine')
line.mode = 'OFFSET'
line.inputs['Count'].default_value = 8                        # ~
line.inputs['Start Location'].default_value = (0, 0, 0)
line.inputs['Offset'].default_value = (0.03, 0, 0)            # ~ spacing (macro)
inst = N.new('GeometryNodeInstanceOnPoints')
inst.inputs['Scale'].default_value = (1, 1, 1)
inst.inputs['Rotation'].default_value = (0, 0, 0)
cube = N.new('GeometryNodeMeshCube')
cube.inputs['Size'].default_value = (0.02, 0.02, 0.02)        # ~
L.new(line.outputs['Mesh'], inst.inputs['Points'])
L.new(cube.outputs['Mesh'], inst.inputs['Instance'])
L.new(inst.outputs['Instances'], out.inputs['Geometry'])

# circular array: swap the source
circ = N.new('GeometryNodeMeshCircle'); circ.inputs['Vertices'].default_value = 12; circ.inputs['Radius'].default_value = 0.1
# L.new(circ.outputs['Mesh'], inst.inputs['Points'])
# instance a real model instead of the cube: Object Info [Geometry] -> Instance on Points [Instance]
```
- Before GLB export add Realize Instances (Instance on Points [Instances] → Realize Instances [Geometry] → Group Output) or rely on the exporter's GN-instance option (`export_gn_mesh=True`, 3.6+ `~`).

raea: the array is plain TSX — map over an index and place `Mesh3d`/`Model` copies:
```tsx
{Array.from({ length: 8 }, (_, i) => {
  const s = interpolate(f - i * 3, [0, 12], [0.01, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return <Mesh3d key={i} name={`coin-${i}`} transform={Transform.fromXyz(i * 0.03, 0, 0).withScale(s)}>...</Mesh3d>;
})}
```
Circle: `Transform.fromXyz(r * Math.cos(a), 0, r * Math.sin(a))` with `a = (i / n) * 2 * Math.PI`. Keep counts under ~300 meshes (limits.md).

## NOTES
- Deprecated: the video calls the Array modifier "obsolete" (opinion); it still exists in 4.x and 5.x. 4.0+ node-tree sockets use `tree.interface.new_socket` (pre-4.0 `tree.outputs.new`). Instance on Points Rotation is a Rotation socket in 4.2+ (Euler values still accepted).
- Visual gaps: none.
- Rule conflicts: no popping copies in; stagger and grow each over ~0.4 s, no spring overshoot.

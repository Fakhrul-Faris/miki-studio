---
title: Scatter with Distribute Points on Faces -> Instance on Points
bucket: 02_Geometry_Nodes
type: master
members:
  - cards/02_Geometry_Nodes/collection-scatter-instance-on-points--crazy-renders-geo-nodes.md
  - cards/02_Geometry_Nodes/gn-scatter-fine-debris--detailed-foregrounds.md
sources: ["How To Make Crazy Renders With Easy Geometry Nodes.txt", "How to get Detailed Foregrounds  Blender Tutorial.txt"]
use_when: "dressing a surface with props, pebbles or debris around the hero"
style_fit: Build-stage set dressing around one Style D hero (coin piles, grit, crumbs, kit clusters); realize + apply + export GLB, raea only renders it; debris never gets the accent colour; a "multiply" beat grows pieces in over ~0.4 s, never pops.
---

## METADATA
02_Geometry_Nodes | Blender 3.x+ (sources) → Blender 5.3 | Geometry Nodes (raea: no procedural scatter — renders the baked GLB)

## CREATIVE_INTENT
Shared why: one shot needs far more small detail than can be hand-placed; Distribute Points on Faces → Instance on Points
puts many small things over a surface in seconds, and the finest layer is what catches the top light.
- Crazy Renders: instance a whole collection of kit pieces with the three checkboxes (Separate Children, Reset Children,
  Pick Instance) so each point gets one random piece — instant complexity ("thousands of transactions" without modeling each).
- Detailed Foregrounds: one hand-made pebble (subdivided, roughened cube), random scale + random rotation, and a second
  scatter layer at a different size — "many small things everywhere, in two sizes" lifts a foreground.

## STE_PROCEDURE
1. Make the pieces: put kit objects in one collection (M › New Collection, e.g. `stuff`), or model one pebble (cube → subdivide → roughen → shrink).
2. Hide the source pieces from render/viewport (or exclude the collection).
3. Before scattering, apply the emitter's scale (Ctrl+A › Scale) or scale it in Edit Mode — object scale alone does not add points.
4. Add a Geometry Nodes modifier on the emitter (plane, ground, or any mesh — even the hero for an object-as-landscape shot).
5. Link Group Input [Geometry] → Distribute Points on Faces [Mesh]; set Density and Seed.
6. Link Distribute Points on Faces [Points] → Instance on Points [Points].
7. Collection route: add Collection Info (Collection = `stuff`), enable Separate Children and Reset Children, link [Instances] → Instance on Points [Instance], enable Pick Instance — without all three every point gets the whole collection.
8. Single-object route: link Object Info (pebble) [Geometry] → Instance on Points [Instance].
9. Link Random Value (Float) → Instance on Points [Scale] and Random Value (Vector) → [Rotation] (see instance-random-scale-rotation master).
10. Duplicate the branch for a second size layer (different Density, scale range and Seed); join both with Join Geometry.
11. Join the emitter's own geometry back in (Group Input [Geometry] → Join) when the ground itself must render.
12. Before you export to GLB for raea, add Realize Instances before Group Output, then apply the modifier.
13. Give copies of the same scatter different Distribute Seeds so layouts don't repeat.

## VALUES BY SOURCE
| parameter | Crazy Renders | Detailed Foregrounds | recommended for Style D (+ why) |
|---|---|---|---|
| instance source | Collection Info (`stuff`), Separate + Reset Children, Pick Instance | Object Info (one pebble) | collection for props/kit; object for debris |
| density | default 10 | not given (~400 fine / ~60 coarse) | macro ground ~400 + ~60 per m² (~), tuned through the lens |
| layers | 1 | 2 sizes ("bigger or smaller version") | 2 (fine + coarse) |
| scale / rotation | (next step in video, see instance master) | Random Float scale, Random Vector rotation | random scale 0.4–1.0 / 1.2–2.0 (~); rotation per instance master |
| piece size | kit pieces | ~1 cm pebble (~) | to scale with the hero |
| emitter | plane (or any mesh) | ground plane | ground; hero mesh for object-as-landscape metaphor |
| export | (Realize added for pipeline) | (Realize added for pipeline) | Realize Instances → apply → one GLB |
| alternatives | Hair particles, Render As Collection (legacy) | particle system, or ~100 hand-placed in a circle duplicated | GN |

## AGENT_EXECUTION
Blender 5.3:
```python
import bpy, math

def sock(socks, name, typ=None):                     # Random Value has same-named sockets per data type
    return next(s for s in socks if s.name == name and (typ is None or s.type == typ))

# pebble (Detailed Foregrounds)
bpy.ops.mesh.primitive_cube_add(size=0.01)                                  # ~ 1 cm
peb = bpy.context.active_object; peb.name = "Pebble"
sub = peb.modifiers.new("Sub", 'SUBSURF'); sub.levels = 2
bpy.ops.object.modifier_apply(modifier="Sub")
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.transform.vertex_random(offset=0.0015, seed=3)   # ~ roughen
bpy.ops.object.mode_set(mode='OBJECT'); bpy.ops.object.shade_smooth()
peb.hide_render = peb.hide_viewport = True

emit = bpy.data.objects["FG_ground"]
bpy.context.view_layer.objects.active = emit
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
mod = emit.modifiers.new("Scatter", 'NODES')
ng = bpy.data.node_groups.new("ScatterKit", 'GeometryNodeTree'); mod.node_group = ng
ng.interface.new_socket("Geometry", in_out='INPUT',  socket_type='NodeSocketGeometry')
ng.interface.new_socket("Geometry", in_out='OUTPUT', socket_type='NodeSocketGeometry')
N, L = ng.nodes, ng.links
gi, go = N.new('NodeGroupInput'), N.new('NodeGroupOutput')
join = N.new('GeometryNodeJoinGeometry')

def instancer(use_collection):
    if use_collection:                                                      # Crazy Renders route
        col = N.new('GeometryNodeCollectionInfo')
        col.inputs['Collection'].default_value = bpy.data.collections['stuff']
        col.inputs['Separate Children'].default_value = True
        col.inputs['Reset Children'].default_value = True
        return col.outputs['Instances'], True
    oi = N.new('GeometryNodeObjectInfo'); oi.inputs['Object'].default_value = peb
    return oi.outputs['Geometry'], False

def layer(density, smin, smax, seed, use_collection=False):
    dist = N.new('GeometryNodeDistributePointsOnFaces')
    dist.inputs['Density'].default_value = density; dist.inputs['Seed'].default_value = seed
    iop = N.new('GeometryNodeInstanceOnPoints')
    src, pick = instancer(use_collection)
    iop.inputs['Pick Instance'].default_value = pick
    rs = N.new('FunctionNodeRandomValue'); rs.data_type = 'FLOAT'
    sock(rs.inputs, 'Min', 'VALUE').default_value = smin; sock(rs.inputs, 'Max', 'VALUE').default_value = smax
    sock(rs.inputs, 'Seed', 'INT').default_value = seed
    rr = N.new('FunctionNodeRandomValue'); rr.data_type = 'FLOAT_VECTOR'
    sock(rr.inputs, 'Max', 'VECTOR').default_value = (2 * math.pi,) * 3
    L.new(gi.outputs['Geometry'], dist.inputs['Mesh'])
    L.new(dist.outputs['Points'], iop.inputs['Points'])
    L.new(src, iop.inputs['Instance'])
    L.new(sock(rs.outputs, 'Value', 'VALUE'), iop.inputs['Scale'])
    L.new(sock(rr.outputs, 'Value', 'VECTOR'), iop.inputs['Rotation'])
    L.new(iop.outputs['Instances'], join.inputs['Geometry'])

layer(400, 0.4, 1.0, seed=0)                    # ~ fine layer
layer(60, 1.2, 2.0, seed=1)                     # ~ second size layer
# layer(10, 0.2, 1.0, seed=2, use_collection=True)   # kit-piece layer (Crazy Renders, density default 10)
L.new(gi.outputs['Geometry'], join.inputs['Geometry'])                      # keep the ground itself
real = N.new('GeometryNodeRealizeInstances')
L.new(join.outputs['Geometry'], real.inputs['Geometry']); L.new(real.outputs['Geometry'], go.inputs['Geometry'])
# export: bpy.ops.object.modifier_apply(modifier="Scatter"); bpy.ops.export_scene.gltf(filepath=..., use_selection=True)
```
Links: `Group Input [Geometry] -> Distribute Points on Faces [Mesh]`; `[Points] -> Instance on Points [Points]`;
`Collection Info [Instances]` (Separate Children, Reset Children on) or `Object Info [Geometry] -> Instance on Points [Instance]` (Pick Instance on for collections);
`Random Value(Float) [Value] -> [Scale]`; `Random Value(Vector) [Value] -> [Rotation]`;
`Instance on Points [Instances]` (each layer) + `Group Input [Geometry] -> Join Geometry -> Realize Instances -> Group Output`.

raea: no equivalent (no procedural scatter at render time). The realized scatter arrives inside the set GLB as one mesh
(`<Model src={staticFile("set.glb")} />` / BlendShot) — not hundreds of `<Mesh3d>` (limits.md: keep animated meshes under
~300). For a handful of loose pieces placed in TSX, map a seeded module-level list to `<Model position rotation scale>`
(never `Math.random()` per frame). `<DepthOfField focal_distance aperture_f_stops />` softens the nearest debris layer.

## NOTES
- Deprecated: legacy Hair particles with Render As Collection (named in Crazy Renders) → GN. Random Value sockets are
  shared across data types — pick by name + type (indices differ: vector 0/1, float 2/3 in 4.x).
- Realize Instances is our pipeline addition (glTF can write EXT_mesh_gpu_instancing, untested in raea → realize to be safe).
- Visual gaps: kit pieces and the pebble sculpt are by eye; Detailed Foregrounds gives no densities or scale ranges (all `~`).
- Rule conflicts: none for building. Never bright-accent the debris; a scatter that "multiplies" on a word grows pieces in
  by scale over ~0.4 s, staggered, no pop.

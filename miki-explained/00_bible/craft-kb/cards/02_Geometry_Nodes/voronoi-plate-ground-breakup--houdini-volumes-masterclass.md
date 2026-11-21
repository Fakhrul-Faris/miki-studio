---
title: Voronoi plate ground (low-poly fracture, jittered + replicated seeds, then divide)
bucket: 02_Geometry_Nodes
source: "Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt"
source_time: "31:01–36:53, 40:11–41:55"
blender_version_source: n/a (Houdini, Voronoi Fracture + Point VOP + Point Replicate)
tool_target: Blender bpy
tier: principle
style_fit: Builds a cracked stone/slate/tile surface for the "real surface" under a macro object, or a cracked-ground metaphor (a business "breaking"). Build-time only. No conflict.
---

## METADATA
02_Geometry_Nodes | Houdini Voronoi Fracture/Point VOP/Point Replicate/Divide (source) → Blender Cell Fracture + GN | Blender bpy

## CREATIVE_INTENT
Principle: non-uniform cell sizes (small next to big) read as natural; uniform Voronoi reads as CG. Fracture the lowest-poly
input you can, then subdivide, because fracturing dense geometry is slow. Idea: a ground of overlapping slabs that the volume
pass later fuses into one rocky floor.

## STE_PROCEDURE
1. Start with a single-polygon grid; do not subdivide before fracturing.
2. Scatter 100 points on it; uncheck Relax Iterations so spacing is irregular.
3. Jitter the points: Point VOP, 3D Noise of P added to P, frequency ~1.
4. Before flattening, add Point Replicate (shape Sphere, Point Count 3) so each seed spawns a tight cluster → small cells next to big ones.
5. Flatten the points back onto the plane with a Transform that scales the normal axis to 0.
6. Voronoi Fracture the single polygon with these points; turn on Visualize Pieces to check size variety.
7. After fracturing, add Divide (or Subdivide) for resolution; reference-copy the divide size (course: 0.05).
8. Jitter the fractured points in the two in-plane axes only (Vector to Float, noise on Z and Y, keep X), noise 3D.
9. Before the volume pass, extrude each piece (Poly Extrude, Distance ~0.1 → reduced, Local transform) so slabs have depth.
10. Keep overlaps modest; heavy overlaps cause artefacts even though the volume pass forgives most of them.

## AGENT_EXECUTION
### Source tool (Houdini)
`Grid (1 poly)` → `Scatter 100 (Relax Iterations off)` → `Point VOP (P += noise3D(P))` → `Point Replicate (Sphere, 3)` →
`Transform (scale normal axis 0)` → `Voronoi Fracture` → `Divide (0.05)` → `Point VOP (P.yz += noise3D(P), x kept)` →
`Poly Extrude (Distance ~0.1, Local)`.

### Blender / raea translation
Blender has no stable GN Voronoi fracture node. Use the bundled Cell Fracture extension, seeded from a point object:
```python
import bpy, random
bpy.ops.mesh.primitive_plane_add(size=2)
plate = bpy.context.object
bpy.ops.object.modifier_add(type='SOLIDIFY'); plate.modifiers[-1].thickness = 0.02   # Cell Fracture needs a volume
bpy.ops.object.modifier_apply(modifier=plate.modifiers[-1].name)
# seeds: clustered = big + small cells (Point Replicate analogue)
bpy.ops.mesh.primitive_plane_add(size=2); seeds = bpy.context.object
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.delete(type='VERT'); bpy.ops.object.mode_set(mode='OBJECT')
import bmesh; bm = bmesh.new()
for _ in range(100):
    c = (random.uniform(-1,1), random.uniform(-1,1), 0)
    for _ in range(3):                                   # Point Count 3 per seed
        bm.verts.new((c[0]+random.gauss(0,0.03), c[1]+random.gauss(0,0.03), 0))
bm.to_mesh(seeds.data); bm.free()
bpy.context.view_layer.objects.active = plate; plate.select_set(True); seeds.select_set(True)
if 'add_fracture_cell_objects' in dir(bpy.ops.object):   # needs extension: Cell Fracture (extensions.blender.org)
    bpy.ops.object.add_fracture_cell_objects(source={'VERT_CHILD'}, source_limit=300, source_noise=0.0,
                                             use_smooth_faces=False, margin=0.0)   # ~ operator/prop names per extension version
else:  # core fallback (no true fracture): Voronoi distance-to-edge cracks on a dense grid, extruded (GN)
    ng = bpy.data.node_groups.new("VoronoiPlates", 'GeometryNodeTree')
    ng.interface.new_socket("Geometry", in_out='INPUT', socket_type='NodeSocketGeometry')
    ng.interface.new_socket("Geometry", in_out='OUTPUT', socket_type='NodeSocketGeometry')
    N, L = ng.nodes, ng.links
    go = N.new('NodeGroupOutput'); grid = N.new('GeometryNodeMeshGrid')
    grid.inputs['Size X'].default_value = grid.inputs['Size Y'].default_value = 2
    grid.inputs['Vertices X'].default_value = grid.inputs['Vertices Y'].default_value = 400   # ~ dense enough for clean cracks
    vor = N.new('ShaderNodeTexVoronoi'); vor.feature = 'DISTANCE_TO_EDGE'; vor.inputs['Scale'].default_value = 5   # ~ 100 cells on 2 m
    cmp = N.new('FunctionNodeCompare'); cmp.operation = 'LESS_THAN'; cmp.inputs[1].default_value = 0.02   # ~ crack width
    dele = N.new('GeometryNodeDeleteGeometry'); dele.domain = 'FACE'
    ext = N.new('GeometryNodeExtrudeMesh'); ext.inputs['Offset Scale'].default_value = 0.02; ext.inputs['Individual'].default_value = False
    L.new(grid.outputs['Mesh'], dele.inputs['Geometry']); L.new(vor.outputs['Distance'], cmp.inputs[0])
    L.new(cmp.outputs['Result'], dele.inputs['Selection']); L.new(dele.outputs['Geometry'], ext.inputs['Mesh'])
    L.new(ext.outputs['Mesh'], go.inputs['Geometry'])
    plate.modifiers.new("VoronoiPlates", 'NODES').node_group = ng
```
Then per piece: Solidify modifier (Thickness ~0.1) instead of Poly Extrude; Subdivide via `bpy.ops.mesh.subdivide(number_cuts=~4)`.
GN alternative (no true fracture): `Voronoi Texture (Distance to Edge)` on a dense grid → `Delete Geometry` where distance < crack width → `Extrude Mesh`.
raea: no runtime equivalent; flat cracks only via a texture (`base_color_texture` + `normal_map_texture`) or Manifold build-time
`crossSection.polygon(cell).extrude(h)` per cell (compute cells in TS at module level).

## NOTES
- Cell Fracture is an extension in 4.2+ (install from extensions.blender.org); its operator name/props are ~.
- Visual gap: final jitter amplitudes and the exact grid orientation were shown, not spoken.
- bpy fixed for 5.3: Cell Fracture is not in 5.3 core → step kept behind a `dir(bpy.ops.object)` check and marked `# needs extension: Cell Fracture`; core fallback = the GN Voronoi distance-to-edge crack setup (no true per-cell pieces).

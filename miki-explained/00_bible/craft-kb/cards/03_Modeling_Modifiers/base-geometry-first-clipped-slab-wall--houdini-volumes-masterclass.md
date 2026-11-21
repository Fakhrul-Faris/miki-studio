---
title: Input geometry carries 60% — build a layered slab wall with per-piece clip planes before any volume pass
bucket: 03_Modeling_Modifiers
source: "Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt"
source_time: "3:25:00–3:35:44"
blender_version_source: n/a (Houdini, line/extrude/voronoi/boolean loop)
tool_target: Blender bpy
tier: principle
style_fit: Supports "one real hero object" — design the readable structure (layers, cracks) by hand; noise only adds texture. No conflict.
---

## METADATA
03_Modeling_Modifiers | Houdini SOP build + volume chain (source) → Blender bmesh/Cell Fracture/Bisect, raea Manifold trim | Blender bpy

## CREATIVE_INTENT
Principle: "about 60% of this is the input geometry". Volumes can make anything look like rock but cannot invent
structure; the readable layers and the crack lines must already be in the mesh, and the volume chain stays simple. The
course's grading asks for small, mid and high detail and visible cracks. Idea: for a macro hero, decide the big story
shapes (layers, breaks, where the light catches) as hard geometry first, then let one light noise pass unify them.

## STE_PROCEDURE
1. Create a line with a few points; shift points up/down in Y with a random value.
2. Sort points by height, reconnect them, and extrude into a stepped strip of faces.
3. Separate each face so every slab is unique.
4. For each slab: extrude it, make a volume, scatter points in it, Voronoi-fracture it, and give each piece a unique name.
5. Keep places where two pieces sit in front of each other; they become depth layers.
6. Loop over the pieces: apply a small random transform to each.
7. In the same loop, copy a grid to the piece centroid with a random orientation and Boolean-cut the piece with it.
8. Group the cut edges and fill the hole so every piece stays closed.
9. Subdivide, then add edge noise that moves only the face points up/down (edge-displacement card).
10. Convert to an SDF, compute the gradient, displace once; compute the gradient again; add the unified-noise layer; add one simple noise; add a tiny global distortion.
11. Check that the cracks in the final come from the mesh, not the volume; raise only the voxel resolution for the high-res version.

## AGENT_EXECUTION
### Source tool (Houdini)
`Line → Point VOP (random Y) → Sort (by Y) → Add/connect → PolyExtrude → per-face For-Each: Extrude → VDB from Polygons → Scatter → Voronoi Fracture → Name`
→ `For-Each piece: Transform (random) + Copy to Points (grid, random orient at centroid) → Boolean (cut) → Group edges → PolyFill`
→ `Divide → Point VOP edge noise → VDB from Polygons (Distance) → VDB Analysis (Gradient) → VOP → VDB Analysis → VOP (Unified) → VOP (noise) → Convert`.

### Blender / raea translation
```python
import bpy, bmesh, random
from mathutils import Vector
for ob in [o for o in bpy.context.selected_objects if o.type == 'MESH']:   # Cell Fracture pieces
    ob.location += Vector([random.uniform(-0.01, 0.01) for _ in range(3)])   # small random transform ~
    bm = bmesh.new(); bm.from_mesh(ob.data)
    c = sum((v.co for v in bm.verts), Vector()) / len(bm.verts)
    n = Vector([random.uniform(-1, 1) for _ in range(3)]).normalized()
    geom = bm.verts[:] + bm.edges[:] + bm.faces[:]
    res = bmesh.ops.bisect_plane(bm, geom=geom, plane_co=c + n * random.uniform(0, 0.2), plane_no=n, clear_outer=True)
    edges = [e for e in res['geom_cut'] if isinstance(e, bmesh.types.BMEdge)]
    bmesh.ops.edgeloop_fill(bm, edges=edges)                                  # group cut edges + fill
    bm.to_mesh(ob.data); bm.free()
```
Slabs: `bpy.ops.mesh.primitive_plane_add` per step or extrude a vertex strip; fracture with the Cell Fracture extension.
raea (build time, real API): `piece.trim(nx, ny, nz, offset)` is the clip plane (keeps the normal's side, already closed);
`manifold.compose(...pieces)` holds them as one; `.splitByPlane(...)` gives both halves.

## NOTES
- Visual gap: the slab count, Y randomness and clip-plane offsets were in a prebuilt graph shown, not rebuilt; values unknown (visual only).
- The course's assignment wants: interesting input geometry, cracks, small/mid/high detail, one non-SDF and one SDF asset, and the edge technique.
- Do the gradient recompute between passes (gradient card); a single strong pass is "not very accurate".

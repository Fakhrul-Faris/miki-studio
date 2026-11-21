---
title: Beveled flat-cube tile clusters as foreground set dressing
bucket: 03_Modeling_Modifiers
source: "Creating an Animation in Eevee (Blender 5.0).txt"
source_time: "09:25–10:44, 17:04–17:49"
blender_version_source: 5.0
tool_target: Blender bpy
tier: full
style_fit: good — cheap near-camera detail on the surface the hero sits on; keep it sparse in macro so it doesn't crowd the one object
---

## METADATA
03_Modeling_Modifiers | Blender 5.0 | Blender bpy + raea

## CREATIVE_INTENT
The fastest big jump in scene detail is the immediate foreground: flattened beveled cubes with the same material as everything else, grouped into small clusters and scattered on the floor ("spam as much as possible"), a few leaning on things. Reuse the clusters on later set pieces (the bridge) by duplicating.

## STE_PROCEDURE
1. Add a Cube; scale it flat (thin Z) and small.
2. Add a Bevel modifier for soft edges.
3. Give it the scene's shared material.
4. Duplicate it into a small cluster of 3–6 tiles with varied size and angle.
5. Join or parent the cluster; duplicate clusters across the floor.
6. Lean a few tiles against walls or objects at an angle.
7. Before you edit one cluster in Edit Mode, check if it is a linked duplicate (Alt+D); make it single-user if only that one should change.
8. When reusing clusters elsewhere, clear their parent (unparent from the moving platform) first.

## AGENT_EXECUTION
```python
import bpy, random, math
random.seed(7)
mat = bpy.data.materials["Rock"]
def tile(loc, s):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    o = bpy.context.object; o.scale = (s, s * random.uniform(0.6, 1.0), 0.06)   # ~ flat
    bev = o.modifiers.new("Bevel", 'BEVEL'); bev.width = 0.02; bev.segments = 2  # ~
    o.rotation_euler.z = random.uniform(0, math.tau)
    o.data.materials.append(mat); return o
cluster = [tile((random.uniform(-.4, .4), random.uniform(-.4, .4), 0.03), random.uniform(.15, .35)) for _ in range(5)]
# linked-duplicate gotcha: ob.data = ob.data.copy()  -> single user before editing
# unparent keeping position: bpy.ops.object.parent_clear(type='CLEAR_KEEP_TRANSFORM')
```
Apply the Bevel (`bpy.ops.object.modifier_apply(modifier="Bevel")`) or export with modifiers applied before GLB.

raea: the GLB brings the tiles in as one `<Model>`. Or draw them directly: `<Mesh3d transform=...><Cuboid half_size={[s, s*0.8, 0.03]} /><StandardMaterial base_color_texture={...} /></Mesh3d>` (no bevel in a raw Cuboid; a Manifold solid can be rounded — see meshes.md). Keep under a few hundred parts.

## NOTES
- Deprecated: none.
- Visual gaps: tile sizes, bevel width and cluster layout are visual only (`~`).
- Rule conflicts: none; in macro shots one cluster near the lens with DoF blur is enough.

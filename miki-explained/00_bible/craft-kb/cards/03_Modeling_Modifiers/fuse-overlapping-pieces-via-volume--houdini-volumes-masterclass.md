---
title: Fuse overlapping pieces into one seamless skin via a volume pass
bucket: 03_Modeling_Modifiers
source: "Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt"
source_time: "25:58–31:01, 48:48–52:32, 1:41:53–1:47:29"
blender_version_source: n/a (Houdini)
tool_target: Blender bpy
tier: principle
style_fit: Useful for hero props built from many primitives (a stack of coins, a lump of dough, a pile of grain) so they read as one cast material in macro close-ups. No conflict.
---

## METADATA
03_Modeling_Modifiers | Houdini VDB from Polygons + VDB Convert (source) → Blender Voxel Remesh / Mesh to Volume | Blender bpy

## CREATIVE_INTENT
Principle: interpenetrating polygons leave hard intersection lines and hidden interior faces; a volume round trip keeps
only the outer shell and rounds the joints, so separate parts feel like "one material put together". Idea: copy one
rock many times (scaled, rotated) along a curve, overlap freely, then fuse — overlaps become new detail, not errors.

## STE_PROCEDURE
1. Overlap the parts freely (merge two boxes, a mirrored copy 180° below, or 61 rotated/scaled copies along a curve).
2. Before converting, cache the heavy copied mesh to disk (File Cache) so the chain doesn't recook.
3. Convert everything with VDB from Polygons (Fog VDB, Voxel Size ~0.04, Fill Interior on).
4. Convert straight back with VDB Convert → Polygons, Iso Value ~0.1, no processing in between.
5. Lower the Iso Value toward 0.01 for a softer blend at the joints; raise it to pull the blend tighter.
6. Rotate a part to a sharp angle and re-check: the joint must stay a smooth fillet, not a crease.
7. Keep the result only if no floating fragments remain; otherwise keep the largest connected piece.

## AGENT_EXECUTION
### Source tool (Houdini)
`Merge (overlapping pieces / Copy to Points output)` → `File Cache (temp)` → `VDB from Polygons (Fog, voxel 0.04)` →
`VDB Convert (Polygons, Iso 0.1 → 0.01 for blend)`. Result: "perfectly quad mesh, no floating details, production-ready".

### Blender / raea translation
```python
import bpy
parts = [o for o in bpy.context.selected_objects if o.type == 'MESH']
bpy.context.view_layer.objects.active = parts[0]
bpy.ops.object.join()
obj = bpy.context.object
rm = obj.modifiers.new("Fuse", 'REMESH')
rm.mode = 'VOXEL'
rm.voxel_size = 0.004          # scene-scale: ~1/100 of the part size
rm.adaptivity = 0.0
rm.use_smooth_shade = True
sm = obj.modifiers.new("Fillet", 'CORRECTIVE_SMOOTH')   # optional: soften joints like a low iso value
sm.iterations = 5
bpy.ops.object.modifier_apply(modifier="Fuse")
```
Or the Mesh to Volume → Volume to Mesh pair (round-trip card) when you want the iso threshold as a fillet control.
raea: Manifold `manifold.union(...parts)` gives a clean outer shell at build time but keeps sharp joints; add `.smooth({angle, refine})`
or `.minkowski(manifold.sphere(r))` for a fillet. Render the result with `<Mesh3d shape={solid}>` or a GLB `<Model>`.

## NOTES
- Voxel Remesh is Blender's direct analogue of a fog-volume round trip (OpenVDB under the hood).
- Fill Interior was later found to cause issues in one asset (2:22:18) and was turned off there — test both.
- Visual gap: the "nice blend" iso values were picked by eye.

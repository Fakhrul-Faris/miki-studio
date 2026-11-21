---
title: High-res / low-res pair via Poly Reduce, cached and exported per asset version
bucket: 05_Camera_Raea_Pipeline
source: "Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt"
source_time: "1:55:37–2:01:40"
blender_version_source: n/a (Houdini, PolyReduce + File Cache + studio export tool)
tool_target: Blender bpy
tier: principle
style_fit: Directly serves the Blender → GLB → raea hand-off: multi-million-point volume meshes must be decimated under raea's ~20 MB GLB limit. No conflict.
---

## METADATA
05_Camera_Raea_Pipeline | Houdini PolyReduce + File Cache + Arnold .ass export (source) → Blender Decimate + glTF export → raea Model | Blender bpy

## CREATIVE_INTENT
Principle: keep the multi-million high-res mesh as the master, derive a low-res one by percentage reduction for preview and
real-time, cache both to disk, and version exports so the shot scene just bumps a number. Idea: a 4 M-point rock becomes a
~40 k-poly GLB that raea can load.

## STE_PROCEDURE
1. Before reducing, cache the high-res mesh (File Cache) — course mesh: 4 M points.
2. Add PolyReduce with Percent to Keep = 5 (→ ~200 k; ~40 s on 4 M points).
3. Chain a second PolyReduce on the reduced mesh instead of re-reducing the master (→ ~40 k, much faster).
4. Cache the low-res result (File Cache, temp).
5. Export high and low with the asset tool (variant "base", version 1); check the shader by setting a test colour first.
6. In the shot scene, load the asset by name + version; switch display between low and high.
7. To update, re-export from the asset scene and bump only the version number in the shot scene.

## AGENT_EXECUTION
### Source tool (Houdini)
`File Cache (high)` → `PolyReduce (Keep 5%)` → `PolyReduce (Keep ~20%)` → `File Cache (low, temp)` → studio ROP (Arnold .ass high + low, "render to disk").
Caveat: PolyReduce doesn't carry all attributes properly.

### Blender / raea translation
```python
import bpy, os
hi = bpy.data.objects["Rock_hi"]
lo = hi.copy(); lo.data = hi.data.copy(); lo.name = "Rock_lo"
bpy.context.collection.objects.link(lo)
d1 = lo.modifiers.new("Dec5", 'DECIMATE');  d1.decimate_type = 'COLLAPSE'; d1.ratio = 0.05
d2 = lo.modifiers.new("Dec20", 'DECIMATE'); d2.decimate_type = 'COLLAPSE'; d2.ratio = 0.2
bpy.context.view_layer.objects.active = lo
for m in ("Dec5", "Dec20"): bpy.ops.object.modifier_apply(modifier=m)
# optional: bake hi → lo normal map (Cycles bake, selected_to_active) for detail on the light mesh
bpy.ops.object.select_all(action='DESELECT'); lo.select_set(True)
bpy.ops.export_scene.gltf(filepath=os.path.join("media", "rock_v001.glb"), export_format='GLB',
                          use_selection=True, export_apply=True)
```
raea: `<Model src={staticFile("rock_v001.glb")} position={[0, 0, 0]} scale={1} />`; keep the .glb under ~20 MB; for macro shots
put the high-res detail in a baked `normal_map_texture` rather than raw triangles. Versioned filenames (`_v001`) = the course's version bump.

## NOTES
- Houdini PolyReduce ≈ Blender Decimate (Collapse); both lose some attributes — re-bake colours/normals after reducing.
- Arnold .ass / "rebel way tool" pipeline is studio-specific; skipped beyond the versioning idea.

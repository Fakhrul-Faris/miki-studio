---
title: Modular kitbash chunks and a personal reusable asset library ("Lego pieces")
bucket: 03_Modeling_Modifiers
source: "Making an Industrial Scene in Blender.txt"
source_time: "00:58–04:54, 07:34–09:16, 17:26–17:59"
blender_version_source: 3.x
tool_target: Blender bpy
tier: principle
style_fit: Speeds up building supporting set pieces (shelves, racks, counters, machines behind the hero) for Style D; the hero itself still gets bespoke, macro-quality modeling.
---

## METADATA
03_Modeling_Modifiers | 3.x → 4.2+ | Blender bpy

## CREATIVE_INTENT
Principle: complex-looking structures are just cubes and (half-)cylinders combined; join small pieces into chunks, chunks into bigger chunks, like building bigger Lego pieces from smaller ones. Ideas: save every finished chunk to a library so later projects are drag-and-drop; background pieces only need the right overall shape and colour, not quality. A rough line-up of chunks plus a light gives early "this looks cool" momentum.

## STE_PROCEDURE
Method:
1. Collect a reference image for the piece (any picture; the author used a generated one).
2. Block the piece from cubes, slanted cubes and stretched half-cylinders.
3. Apply one free texture (textures.com) to all of its parts.
4. Join the parts into one chunk.
5. Repeat with a different shape to get 2–3 chunk variants.
6. Combine chunk variants into a bigger assembly and join again.
7. Line assemblies up roughly to outline the set; precision is not required.
How-to (library):
8. Mark each finished chunk as an asset and save the file into your asset library folder.
9. In later projects, drag chunks in from the Asset Browser instead of modeling.
10. Spend little time on background chunks: only silhouette and colour read there.

## AGENT_EXECUTION
### Source tool (Blender)
```python
import bpy
parts = [o for o in bpy.context.selected_objects if o.type == 'MESH']
bpy.context.view_layer.objects.active = parts[0]
bpy.ops.object.join()                                   # Ctrl+J: parts → chunk
chunk = bpy.context.active_object; chunk.name = "KB_pillar_A"
bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
chunk.asset_mark()                                      # mark as asset (4.x)
chunk.asset_generate_preview()
# library: save this .blend under the folder registered in Preferences → File Paths → Asset Libraries
# bpy.context.preferences.filepaths.asset_libraries.new(name="Meikigo Kit", directory="/path/to/kit")
bpy.ops.wm.save_as_mainfile(filepath="//../kit/KB_pillar_A.blend", copy=True)

# reuse in a new project (append from library file)
with bpy.data.libraries.load("/path/to/kit/KB_pillar_A.blend", link=False) as (src, dst):
    dst.objects = [n for n in src.objects if n.startswith("KB_")]
for o in dst.objects: bpy.context.collection.objects.link(o)
```
### Blender / raea translation
raea: renders whatever chunks end up in the exported set GLB (`<Model src={staticFile("set.glb")} />`). For a supporting piece that only needs a silhouette, raea's own Manifold solids also work at render time: `manifold.box(w,h,d).union(manifold.cylinder(r,h).move(...))` built at module level, passed as `<Mesh3d shape={solid}>` (meshes.md). Repeated chunks: reuse one Model/solid many times (shapes are built once, limits.md).

## NOTES
- Project's real habit: library pulls from prior projects and CC0 packs (pipes pack). For us, log every downloaded piece in `ASSET-SOURCES.md` (studio rule) and prefer CC0/CC-BY library models.
- Viewport tip from the video: Solid view with Color = Texture runs smoother than Material Preview (`bpy.context.space_data.shading.color_type = 'TEXTURE'`).
- Visual gaps: the actual chunk shapes are shown, not described ("this shape").
- Rule conflicts: none for objects. The library must never be used for figures in street scenes (default no people).

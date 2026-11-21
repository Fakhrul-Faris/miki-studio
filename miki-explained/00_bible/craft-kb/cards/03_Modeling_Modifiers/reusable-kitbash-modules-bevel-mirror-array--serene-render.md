---
title: Reusable kitbash modules — pillar/platform/arch built once with Bevel, Mirror, Array, then duplicated
bucket: 03_Modeling_Modifiers
source: "Making a SERENE render in blender.txt"
source_time: "01:53–04:07, 09:05–10:27"
blender_version_source: 4.x
tool_target: Blender bpy
tier: full
style_fit: Useful for set dressing behind the macro hero (shelves, counters, railings) quickly; repetition reads as "designed" not cheap.
---

## METADATA
03_Modeling_Modifiers | 4.x → 4.2+ | Blender bpy

## CREATIVE_INTENT
Make a few simple pieces early (a pillar, a platform with railing posts, an arch) and duplicate them everywhere; good repetition looks intentional and saves hours. Keep repeated small parts low-poly since you'll never see their facets.

## STE_PROCEDURE
1. Model a pillar with repeated Inset (I) and Extrude (E) steps.
2. Bevel the profile edges with Profile Type = Custom and the "Cornice Molding" preset for a quick moulding.
3. Add a Bevel modifier with a small Amount to round corners slightly.
4. Add a Mirror modifier on Z so only the bottom half is modelled.
5. For railing posts: add a Cylinder with Vertices = 16 (low-poly), bevel it, then add an Array modifier along the railing.
6. For an arch: add a Cylinder, delete half, extrude it down, bevel; duplicate the arch downwards and Array it (~5 copies), apply, nudge into place.
7. Join loose pieces into one object (Ctrl+J) so the module is easy to duplicate.
8. Duplicate modules (Shift+D, or Alt+D linked) around the scene.

## AGENT_EXECUTION
```python
import bpy
p = bpy.data.objects["Pillar"]
bv = p.modifiers.new("Bevel", 'BEVEL'); bv.width = 0.01; bv.segments = 2     # ~ "not too much"
mi = p.modifiers.new("Mirror", 'MIRROR'); mi.use_axis = (False, False, True)  # Z
bpy.ops.mesh.primitive_cylinder_add(vertices=16, radius=0.04, depth=0.8)       # railing post
post = bpy.context.object
ar = post.modifiers.new("Array", 'ARRAY'); ar.count = 12; ar.relative_offset_displace = (4, 0, 0)  # ~
# Edit-mode profile bevel with custom profile (preset applied via the Bevel operator's preset menu ~):
# bpy.ops.mesh.bevel(offset=0.05, segments=8, profile_type='CUSTOM')
bpy.ops.object.select_all(action='DESELECT')
for o in (p, post): o.select_set(True)
bpy.context.view_layer.objects.active = p; bpy.ops.object.join()
dup = p.copy(); dup.data = p.data; bpy.context.collection.objects.link(dup)    # linked duplicate (Alt+D)
```
Before GLB export: apply modifiers (`bpy.ops.object.modifier_apply(modifier="Bevel")` …) or export with "Apply Modifiers".
raea: load the module once as a `.glb` and place copies with several `<Model src=... position=...>`; shapes reused are cheap (limits.md).

## NOTES
- Deprecated: none. Cylinder default 32 verts; the speaker used 128 for the hero wall and 16 for posts.
- Visual gaps: exact inset/extrude depths and the arch trim pieces are viewport-only. The Cornice Molding preset is applied from the bevel operator panel's preset dropdown; its Python preset path is not shown.
- Rule conflicts: none.

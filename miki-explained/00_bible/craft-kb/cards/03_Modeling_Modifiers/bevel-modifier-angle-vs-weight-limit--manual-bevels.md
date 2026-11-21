---
title: Bevel modifier limit methods — Angle (30° default) vs Weight (per-edge Bevel Weight); Select Sharp Edges preview
bucket: 03_Modeling_Modifiers
source: "The Trick that will Make Your 3D Models 10X Better!.txt"
source_time: "01:32–03:31, 04:52–05:22"
blender_version_source: 4.x
tool_target: Blender bpy
tier: full
style_fit: Fine for background props and simple hero parts in Style D; for a close hero object prefer manual per-edge bevels (see per-edge-manual-bevel-hierarchy--manual-bevels).
---

## METADATA
03_Modeling_Modifiers | 4.x → 4.2+ | Blender bpy

## CREATIVE_INTENT
The Bevel modifier is the fast, non-destructive way to round edges: Angle mode rounds every edge sharper than a threshold, Weight mode lets you pick which edges bevel and how much. Use it for quick props, simple hard-surface objects and parts that are physically separate (a glass pane must not be bevelled into its frame).

## STE_PROCEDURE
1. Preview what Angle mode will bevel: in Edit Mode use Select → Select Sharp Edges (same threshold).
2. Add a Bevel modifier; keep Limit Method = Angle; Angle defaults to 30°.
3. Raise Angle to exclude more edges; lower it to include more (an icosphere is untouched at 30°, fully bevelled at 15°).
4. For different bevel amounts per edge, set Limit Method = Weight.
5. Select an edge, open the Sidebar (N) → Item → Edge Data, and set Mean Bevel Weight (0–1).
6. Leave Bevel Weight at 0 on edges between parts that are separate objects in reality (glass to frame).
7. Pair Weight mode with a Subdivision Surface modifier for simple hard-surface objects.
8. Before relying on the modifier, check the topology has room for the bevel: it breaks on bad topology and when the width cannot fit.
9. Do not use the modifier when an object needs many different bevel sizes or exact control after export — bevel manually instead.

## AGENT_EXECUTION
```python
import bpy, math
obj = bpy.context.active_object
me = obj.data

# preview: which edges Angle mode will catch
bpy.ops.object.mode_set(mode='EDIT')
bpy.ops.mesh.select_all(action='DESELECT')
bpy.ops.mesh.select_mode(type='EDGE')
bpy.ops.mesh.edges_select_sharp(sharpness=math.radians(30))
bpy.ops.object.mode_set(mode='OBJECT')

# Angle mode
bev = obj.modifiers.new("Bevel", 'BEVEL')
bev.limit_method = 'ANGLE'
bev.angle_limit = math.radians(30)      # video default; 15° bevels an icosphere's edges
bev.width = 0.002                       # ~ macro scale
bev.segments = 2
bev.use_clamp_overlap = True

# Weight mode (4.0+: bevel weight is the edge attribute "bevel_weight_edge")
bev.limit_method = 'WEIGHT'
bev.edge_weight = "bevel_weight_edge"   # 4.0+ property naming the attribute
attr = me.attributes.get("bevel_weight_edge") or me.attributes.new("bevel_weight_edge", 'FLOAT', 'EDGE')
for i in (0, 1, 2):                     # ~ the chosen edges
    attr.data[i].value = 1.0            # full bevel
attr.data[3].value = 0.3                # ~ smaller bevel on a secondary edge

obj.modifiers.new("Subdivision", 'SUBSURF').levels = 2
```
- Modifier order: Bevel above Subdivision Surface (top-down stack).
- Export applies it: `bpy.ops.export_scene.gltf(..., export_apply=True)`.

raea: no per-edge equivalent. A uniform rounding of every edge is Manifold `roundedBox(w, h, d, r)` or `solid.minkowski(manifold.sphere(r))` (meshes.md) — the Angle-mode-everywhere look for simple background blocks built in TSX.

## NOTES
- Deprecated: pre-4.0 `mesh.edges[i].bevel_weight` and `use_edge_bevel_weight` are gone; 4.0+ stores it as the `bevel_weight_edge` attribute. The N-panel field is still "Mean Bevel Weight".
- Video caveat: the modifier is applied on export to a game engine with no precise per-edge control — the reason the author bevels by hand for complex models.
- Visual gaps: none for settings.
- Rule conflicts: none.

## ADDENDUM — 8 Lighting Tricks I Wish I Knew Earlier (Blender Product Lighting Tutorial)
Source: "Studio Lighting, Silhouettes & Color Theory/8 Lighting Tricks I Wish I Knew Earlier (Blender Product Lighting Tutorial).txt" — 02:54–03:47.

| parameter | 8-lighting-tricks |
|---|---|
| Fast/fake option | a Bevel shader node (Normal input), connected into the Normal socket of the Principled BSDF — rounds the apparent edge in shading only, no mesh change |
| Shader bevel value | Radius 0.02 (at the source's cube scale) — the default looked "too strong" |
| Limitation shown on screen | zooming in on the cube's silhouette still shows the original hard mesh edge — the shader bevel only fakes the shading, the actual geometric edge is still sharp |
| Real option (preferred) | Bevel modifier, Amount 0.03, Segments 5 — "much higher quality... looks more realistic" because the edge is real geometry, holds up on silhouette and at any angle |
| When the source reaches for the shader version at all | quick look-dev / comparison only — the video's own conclusion is to remove the shader bevel and use the modifier for the final look |

Extra step: before committing to the modifier, optionally preview a Bevel shader node (Geometry → Bevel → Normal,
Radius ~0.02) wired into the material's Normal input, to cheaply check how a rounded edge will read — then discard it
and build the real bevel with the modifier (Angle or Weight, above), since the shader-only version fails on
silhouette and under close inspection, both of which a macro Style D shot relies on. No new raea step: real
modifier-built geometry already routes correctly to export; this addendum only documents why the shader-node
shortcut should never be the final choice for a macro hero.

---
title: Boolean grid cutter to carve a model into a square-cell relief (plus linked-data backup)
bucket: 03_Modeling_Modifiers
source: "Making a SERENE render in blender.txt"
source_time: "24:34–29:59"
blender_version_source: 4.x
tool_target: Blender bpy
tier: full
style_fit: An "x-ray / made of cells" state change on a hero object (e.g. a product turning into a grid of tiles before becoming a chart) — check the morph is a smooth state change, not a pop.
---

## METADATA
03_Modeling_Modifiers | 4.x → 4.2+ (5.x solver rename) | Blender bpy

## CREATIVE_INTENT
Carving a free model with a subdivided grid cutter turns it into a sculptural, abandoned-looking relief of squares; deleting a few cells adds story ("something happened here"). Working on a duplicate keeps the original's approved rotation safe.

## STE_PROCEDURE
1. Before cutting, duplicate the model (Shift+D) and keep the original as backup.
2. Add a Plane, Subdivide it, Inset Individual faces, then delete the inset faces to leave a grid of bars.
3. Extrude the grid to give the cutter thickness (~).
4. Select the model, then the cutter; apply a Boolean Difference (Bool Tool shortcut in video: "Shift + Numpad −" as spoken).
5. Set Boolean Solver = Fast.
6. Position the cutter until the carve looks right, apply the modifier, delete the cutter.
7. Clean up: delete back faces and stray interior geometry until one surface remains; fill missing pieces.
8. Select all and extrude straight back to give the relief depth.
9. Link the cleaned mesh back onto the original object: select original, Shift-select edited, Ctrl+L > Link Object Data.
10. Keep Shade Smooth even if the viewport shows glitchy shading; judge in the render, add loop cuts/insets only where the render shows problems.
11. Delete a few cells for a weathered look.

## AGENT_EXECUTION
```python
import bpy
face = bpy.data.objects["Face"]
work = face.copy(); work.data = face.data.copy(); bpy.context.collection.objects.link(work)
bpy.ops.mesh.primitive_plane_add(size=2); cut = bpy.context.object
bpy.ops.object.mode_set(mode='EDIT')
bpy.ops.mesh.subdivide(number_cuts=10)                        # ~ grid density
bpy.ops.mesh.inset(thickness=0.01, use_individual=True)       # ~
bpy.ops.mesh.delete(type='FACE')                              # with inset faces selected
bpy.ops.mesh.select_all(action='SELECT'); bpy.ops.mesh.extrude_region_move(TRANSFORM_OT_translate={"value": (0, 0, 1)})
bpy.ops.object.mode_set(mode='OBJECT')
b = work.modifiers.new("Grid", 'BOOLEAN'); b.operation = 'DIFFERENCE'; b.object = cut
b.solver = 'FLOAT'                                            # 5.x name of the old 'FAST' solver
bpy.context.view_layer.objects.active = work; bpy.ops.object.modifier_apply(modifier="Grid")
bpy.data.objects.remove(cut)
face.data = work.data                                         # = Ctrl+L Link Object Data
bpy.ops.object.shade_smooth()
```
raea: no equivalent at build level; ship as GLB. For an on-screen "becomes cells" morph, crossfade two named models (opacity 0→1 over ~0.4 s) or reveal via Manifold `minus` at module level (shapes are fixed per part; animate transform/opacity only).

## NOTES
- Deprecated: Bool Tool add-on became an Extension in 4.2 (install from extensions.blender.org); its default auto-difference is Ctrl+Numpad − (the spoken "Shift minus" may be an STT/recall slip).
- Visual gaps: cutter placement and cleanup (~26:00–29:00) are hard to follow without the mesh; the triage flags this.
- Rule conflicts: none for the static model; any reveal must fade/grow, never pop.
- bpy fixed for 5.3: Boolean solver 'FAST' → 'FLOAT'.

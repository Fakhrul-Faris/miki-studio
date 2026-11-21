---
title: Two material slots on one mesh + seam-cut unwrap for a flat cylindrical label
bucket: 04_Shading_Lighting
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "19:31–24:28"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Puts the brand/label artwork undistorted on the hero object — needed for "real business logo on screen from frame 1".
---

## METADATA
04_Shading_Lighting | Blender 4.3 | Blender bpy (UV) + raea

## CREATIVE_INTENT
Split one product mesh into "metal" and "printed body" by face selection, then cut a seam down the back so the body unrolls
into a clean rectangle and a flat label image wraps without stretching. The seam hides at the back, away from camera.

## STE_PROCEDURE
1. Before you texture, join attached parts (tab, rivet) into the can (`Ctrl+J`) if they never animate separately.
2. In Edit Mode select the base and lid region (`Ctrl+Numpad +` repeatedly to grow); Material Properties › new slot "aluminium" › Assign.
3. In side view (Numpad 1) with X-ray (`Alt+Z`) box-select (`B`) the printed body faces; check from top (Numpad 7) and add any missed; new slot "text body" › Assign.
4. Use the slot's Select / Deselect buttons (Edit Mode only) to reselect a region later instead of picking faces by hand.
5. In "text body", add an Image Texture with the label artwork.
6. Before you unwrap, mark a seam: select one vertical edge column down the back, `U` › Mark Seam; also mark the top and bottom boundary loops of the label region.
7. Select the label region (slot › Select) and `U` › Unwrap; open a UV Editor to check it is a rectangle, not a circle.
8. In the UV Editor rotate 180° (`R 180`) if the art is upside down; scale on X and Y (`S X`, `S Y`) until letter proportions are right.

## AGENT_EXECUTION
- Blender:
```python
ob = bpy.context.object
for name in ("aluminium", "text body"):
    ob.data.materials.append(bpy.data.materials.get(name) or bpy.data.materials.new(name))
bpy.ops.object.mode_set(mode='EDIT')
ob.active_material_index = 0; bpy.ops.object.material_slot_assign()      # with metal faces selected
ob.active_material_index = 1; bpy.ops.object.material_slot_assign()      # with body faces selected
bpy.ops.mesh.select_all(action='DESELECT')
# select the back vertical edge column + label boundary loops, then:
bpy.ops.mesh.mark_seam(clear=False)
bpy.ops.mesh.select_all(action='DESELECT'); ob.active_material_index = 1; bpy.ops.object.material_slot_select()
bpy.ops.uv.unwrap(method='ANGLE_BASED', margin=0.001)
# rotate/scale UVs (UV editor context): bpy.ops.transform.rotate(value=3.14159) ; bpy.ops.transform.resize(value=(sx, sy, 1))
bpy.ops.object.mode_set(mode='OBJECT')
```
- raea: the GLB carries UVs and the image; it renders as `<Model src={staticFile("can.glb")} />`. To swap artwork at render time:
  `<Model src={...}><StandardMaterial material="text body" base_color_texture={staticFile("label_v2.png")} /></Model>`.
  Do not texture raea primitives (`Sphere`/cylinders smear box-projected maps, `materials.md`); use the unwrapped GLB.

## NOTES
- Deprecated: none.
- Visual gaps: which edges were seamed beyond the back column is shown, not said; UV scale values are by eye.
- Rule conflicts: none. Keep the seam opposite the camera's main side; a camera orbit past it reveals the join.

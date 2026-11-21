---
title: Arrayed cylinder roof tiles, Boolean-trimmed and copied radially around the 3D cursor
bucket: 03_Modeling_Modifiers
source: "Cyber Japan Art Breakdown  Blender.txt"
source_time: "09:27–14:12, 16:17–16:35"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Any repeated ribbed surface on a hero (corrugated roof, tiled awning, grille); radial copies give four matched sides fast.
---

## METADATA
03_Modeling_Modifiers | 3.x source → 4.2+ code | Blender bpy

## CREATIVE_INTENT
Build one long ribbed strip (a cylinder repeated by an Array), trim the overlap with a Boolean cutter, then copy it 90°
around the centre for the other sides. Straight arrays first, warping later (see the proportional-editing card).

## STE_PROCEDURE
1. Add a Cylinder; set Vertices 16 (down from 32 — small parts stay low-poly).
2. Scale it very long; isolate it (`/` numpad); go to side view and line it up with the roof slope roughly.
3. Add an Array modifier; set Relative Offset ≈ 2 and Count ≈ 32.
4. Scale the strip down on local Z so it overhangs the roof edge a little.
5. Before you apply the Array, add a few loop cuts along the cylinder length (proportional editing needs geometry to bend).
6. Apply the Array.
7. Duplicate faces of the roof that define the cut edge, separate them (`P` → Selection), extrude them straight up → cutter object.
8. Select the cutter, then Shift-select the roof strip (strip active).
9. Run Bool Tool Auto Difference (`Ctrl+Numpad -`); enable the built-in Bool Tool add-on/extension if missing.
10. Apply the Boolean; delete the cutter.
11. Snap the 3D cursor to the roof centre (`Shift+S` → Cursor to Selected); set Pivot Point = 3D Cursor.
12. Linked-duplicate the strip and rotate it 90° on Z (`Alt+D`, `R Z 90`).
13. Repeat the last action (`Shift+R`) for the remaining sides.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy, math
from mathutils import Matrix
bpy.ops.mesh.primitive_cylinder_add(vertices=16, radius=0.04, depth=3.0)   # ~ radius/length
c = bpy.context.object
arr = c.modifiers.new("Array", 'ARRAY'); arr.use_relative_offset = True
arr.relative_offset_displace = (2.0, 0, 0); arr.count = 32
c.scale.z *= 0.9                                                             # ~ overhang trim
bpy.ops.object.mode_set(mode='EDIT')
bpy.ops.mesh.loopcut_slide(MESH_OT_loopcut={"number_cuts": 6, "edge_index": 0})   # ~ cuts along length
bpy.ops.object.mode_set(mode='OBJECT')
bpy.ops.object.modifier_apply(modifier="Array")
# Boolean without the add-on (same result as Bool Tool Auto Difference):
cut = bpy.data.objects["cutter"]
b = c.modifiers.new("Cut", 'BOOLEAN'); b.operation = 'DIFFERENCE'; b.object = cut; b.solver = 'EXACT'
bpy.ops.object.modifier_apply(modifier="Cut"); bpy.data.objects.remove(cut)
# radial linked copies about the roof centre
centre = bpy.context.scene.cursor.location.copy()
for k in (1, 2, 3):
    d = c.copy(); bpy.context.scene.collection.objects.link(d)             # linked data (Alt+D)
    R = Matrix.Rotation(math.radians(90 * k), 4, 'Z')
    d.matrix_world = Matrix.Translation(centre) @ R @ Matrix.Translation(-centre) @ c.matrix_world
```
- Operator form: `bpy.context.scene.tool_settings.transform_pivot_point = 'CURSOR'`; `bpy.ops.view3d.snap_cursor_to_selected()`; `bpy.ops.object.duplicate_move_linked()`; `bpy.ops.transform.rotate(value=math.radians(90), orient_axis='Z')`; `bpy.ops.screen.repeat_last()`.
- Bool Tool op (if enabled): `bpy.ops.object.booltool_auto_difference()`.

### raea
- raea: no equivalent (bake in Blender, play the `.glb`). TSX-only alternative for simple ribs: Manifold solids (`meshes.md`).

## NOTES
- Deprecated/moved: Bool Tool ships as a bundled extension in 4.2+ (Edit → Preferences → Get Extensions → "Bool Tool"); in 3.x it was the add-on "Object: Bool Tool".
- Visual gaps: cutter shape and roof alignment (11:53–12:34) are on screen only.
- 16-vertex cylinders × 32 × 4 sides is real-time friendly; keep it that way for raea.

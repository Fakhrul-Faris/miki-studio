---
title: Structural bracket from one cube (3-segment loop bevels, coplanar inset) + new pieces snapped together with Snap Base (G → B)
bucket: 03_Modeling_Modifiers
source: "How to Add Tons of Detail To Your Renders  Blender.txt"
source_time: "08:37–12:20"
blender_version_source: 4.x
tool_target: Blender bpy
tier: full
style_fit: Makes many different-looking kit pieces from 2–3 base pieces in minutes; good for background structure and shelving behind a hero.
---

## METADATA
03_Modeling_Modifiers | 4.x source → 4.2+ code | Blender bpy

## CREATIVE_INTENT
One "structural holder" piece is enough: loop cuts bevelled into rounded steps, a flattened band, recessed panels on
every coplanar face. New pieces then come from snapping copies onto each other, vertex to vertex, joining them and
cleaning the overlaps. Each combination (bracket + bracket, bracket + bridge, bracket + pipes) is a new kit piece "that
feels unique even though it's not".

## STE_PROCEDURE
1. Add a Cube; scale it long on one axis.
2. Add 2 loop cuts (`Ctrl+R`); bevel them (`Ctrl+B`) and scroll to Segments = 3.
3. Select the bottom faces; extrude them down.
4. Shape the top faces to fit (scale or move by eye).
5. Add one loop cut and scale it to 0 on Z (`S Z 0`) to make a flat band.
6. Select one side face, then Select Similar → Coplanar (`Shift+G`) to get every face in that plane; repeat for the other side.
7. Before you inset, Apply Scale (`Ctrl+A` → Scale) so the inset is even.
8. Inset (`I`); press `I` again for individual faces.
9. Extrude (`E`), right-click to cancel the move, then scale in on Y (`S Y`) to recess the panels.
10. Variant: duplicate the bracket; move it with `G`, press `B` to pick a Snap Base vertex, then snap it onto a vertex of the original.
11. Join (`Ctrl+J`); Merge by Distance to remove overlapping vertices; delete hidden inner faces.
12. Combine the bracket with other kit pieces (the bridge, a pipe group) the same way; Shade Auto Smooth each new piece.
13. Split out sub-assemblies (a few pipes + a holder) as their own pieces: duplicate the faces, Separate, Join.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy
bpy.ops.mesh.primitive_cube_add(size=1); b = bpy.context.object; b.name = "bracket"; b.scale = (0.4, 0.4, 2.0)   # ~
bpy.ops.object.transform_apply(scale=True)
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='DESELECT')
bpy.ops.mesh.loopcut_slide(MESH_OT_loopcut={"number_cuts": 2, "edge_index": 1})          # edge_index ~
bpy.ops.mesh.bevel(offset=0.05, segments=3, affect='EDGES')                               # Segments 3 (spoken)
# flat band: after a new loop cut is selected
bpy.ops.transform.resize(value=(1, 1, 0))                                                  # S Z 0
# coplanar faces → individual inset → recess
bpy.ops.mesh.select_mode(type='FACE')
# (select one side face first)
bpy.ops.mesh.select_similar(type='FACE_COPLANAR', threshold=0.01)
bpy.ops.mesh.inset(thickness=0.03, use_individual=True)                                   # ~
bpy.ops.mesh.extrude_region_move(TRANSFORM_OT_translate={"value": (0, 0, 0)})
bpy.ops.transform.resize(value=(1, 0.85, 1))                                               # S Y, ~
bpy.ops.object.mode_set(mode='OBJECT')
```
Snap-combine without the interactive G→B (vertex-to-vertex, scripted):
```python
import bpy
def snap_vertex_to_vertex(mover, v_mover_idx, target, v_target_idx):
    a = mover.matrix_world @ mover.data.vertices[v_mover_idx].co
    t = target.matrix_world @ target.data.vertices[v_target_idx].co
    mover.location += (t - a)
dup = bpy.data.objects["bracket"].copy(); dup.data = bpy.data.objects["bracket"].data.copy()
bpy.context.scene.collection.objects.link(dup)
snap_vertex_to_vertex(dup, 0, bpy.data.objects["bracket"], 5)                              # ~ vertex indices
# join + clean
bpy.ops.object.select_all(action='DESELECT'); dup.select_set(True)
bpy.data.objects["bracket"].select_set(True); bpy.context.view_layer.objects.active = bpy.data.objects["bracket"]
bpy.ops.object.join(); bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.mesh.remove_doubles(threshold=0.0001)                                              # Merge by Distance
bpy.ops.object.mode_set(mode='OBJECT'); bpy.ops.object.shade_auto_smooth()
```
- Interactive operator: `bpy.ops.transform.translate(snap=True, snap_elements={'VERTEX'}, snap_target='ACTIVE')`; the `B` Snap Base pick is UI-only.

### raea
- raea: no equivalent (Blender modelling; plays inside the set `.glb`).

## NOTES
- New in 4.0: "Snap Base". During a move (`G`) press `B` to choose the point that snaps. The source calls it "the new snap controls".
- Deprecated/renamed: Merge by Distance = `bpy.ops.mesh.remove_doubles`. Select Similar Coplanar = `select_similar(type='COPLANAR')`.
- Visual gaps: 08:50–10:20 sizes, which faces are extruded and how the top is fitted are narrated by keypress only. The
  resulting shape isn't reproducible from speech, so values are `~`. Inner faces deleted at 10:51 are picked by eye.
- Rule conflicts: none.
- bpy fixed for 5.3: select_similar type 'COPLANAR' → 'FACE_COPLANAR'.

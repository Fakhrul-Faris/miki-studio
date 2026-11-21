---
title: Reference mood board → repeating trim piece from cubes with Mirror + Clipping
bucket: 03_Modeling_Modifiers
source: "Cyber Japan Art Breakdown  Blender.txt"
source_time: "01:59–07:41"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Way to build believable detail on a real-world hero (a stall front, a pump housing) by copying repeating shapes from photos.
---

## METADATA
03_Modeling_Modifiers | 3.x source → 4.2+ code | Blender bpy

## CREATIVE_INTENT
Zoom into reference photos and ask "what shapes repeat, and what is the easiest way to rebuild them?". Build one small
trim piece from cubes, mirror it, and repeat it all over the model — detail at smaller and smaller scales adds up to
complexity. Keep the reference open the whole time.

## STE_PROCEDURE
1. Collect a mood board (own photos + Unsplash) and keep it visible while modelling.
2. Zoom into the references; list the shapes that repeat.
3. Add a cube; extrude it out on one axis, extrude a small step, extrude up twice (`E`; right-click cancels the move, then `S` to scale).
4. Bevel the two outer edges (`Ctrl+B`).
5. Rotate the piece to its final orientation.
6. Add a Mirror modifier and enable Clipping.
7. Delete the face on the mirror plane so the halves do not overlap.
8. Slide the halves together; delete any unneeded faces → one trim piece.
9. Repeat the trim along the model; layer it on other simple cubes with bevels and extrusions.
10. Go down in scale: add smaller simple shapes to fill gaps until it reads complex.
11. Keep every piece a separate object until the end (easy to re-edit).

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy
bpy.ops.mesh.primitive_cube_add(size=0.2)
t = bpy.context.object; t.name = "trim"
# … extrusions in edit mode: bpy.ops.mesh.extrude_region_move(TRANSFORM_OT_translate={"value": (0.1, 0, 0)})   # ~
# bevel two edges: bpy.ops.mesh.bevel(offset=0.01, segments=2, affect='EDGES')                               # ~
mir = t.modifiers.new("Mirror", 'MIRROR')
mir.use_axis = (True, False, False); mir.use_clip = True; mir.use_mirror_merge = True
```
- Delete the face on the mirror plane: in edit mode select faces whose centre x ≈ 0 and `bpy.ops.mesh.delete(type='FACE')`.

### raea
- raea: no equivalent (Blender modelling; plays via the set `.glb`).

## NOTES
- Visual gaps: 03:47–05:13 the exact extrusion directions and lengths are only visible; the shape is not reproducible from speech — values are `~`.
- Mirror modifier with clipping is unchanged in 4.x.
- Rule conflicts: none.

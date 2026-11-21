---
title: Dressing a set from kit pieces — Array stacks, 90° turns, scale variants, deliberately uneven offsets, then duplicate the whole set upward
bucket: 03_Modeling_Modifiers
source: "How to Add Tons of Detail To Your Renders  Blender.txt"
source_time: "12:31–17:28, 22:10–22:48"
blender_version_source: 4.x
tool_target: Blender bpy
tier: full
style_fit: Builds a dense, believable back-of-house world fast. For Style D it belongs behind and around the hero, blurred by DoF, and should be checked through each camera setup.
---

## METADATA
03_Modeling_Modifiers | 4.x source → 4.2+ code | Blender bpy

## CREATIVE_INTENT
With a handful of kit pieces, the set fills itself. Array each piece into a stack or run, turn copies 90° against a
wall, stretch one long and thin, stack runs over each other. Keep the offsets uneven on purpose: equal spacing looks
"rendery", uneven looks industrial and real. Nothing has to connect properly as long as it looks like it works. When the
space needs height, duplicate the whole set straight up.

## STE_PROCEDURE
1. Keep the reference to the side and a Rendered viewport open while dressing.
2. Duplicate a kit piece (the pipe group) against a wall; rotate it to orient it.
3. Before you add an Array, Apply Rotation & Scale (`Ctrl+A`) so the array goes along the expected axis.
4. Add an Array modifier and stack it upward; it may pass through the ceiling.
5. Repeat at a few spots; duplicate two of them, rotate 90°, and put them on the next wall.
6. Leave the offsets between copies unequal on purpose.
7. Place the bridge piece as a platform; Array it; duplicate the array over itself; rotate one copy 90° and offset it.
8. Mix in other pieces (pipes on some platforms) so platforms differ from each other.
9. Make a variant by scaling a copy much thinner and longer along one axis.
10. Array the bracket piece ×3 and stack it; let it hold up a platform.
11. Fill empty zones overhead with any piece "coming through the wall"; it only has to be something.
12. Make a pair of beams: Array, reduce scale, increase Count; place them parallel to hold a platform.
13. Use `S Shift+Z` to scale X and Y only when widening a piece.
14. If the space should be taller: select everything except the camera and lights, Duplicate Linked (`Alt+D`), and move it straight up.
15. Optionally rotate the stacked copy 90° on Z to hide the repeat (the source kept it unrotated because it looked better).
16. Remove duplicated lights after stacking (the area light was copied too).

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy, math, random
rng = random.Random(11)                                                   # seeded → same "messy" offsets on rebuild
def stack(piece, loc, rot_z, count, axis=(0, 0, 1.05), extra_scale=(1, 1, 1)):
    o = piece.copy(); o.data = piece.data; bpy.context.scene.collection.objects.link(o)   # linked data
    o.location = loc; o.rotation_euler = (0, 0, rot_z); o.scale = extra_scale
    a = o.modifiers.new("Array", 'ARRAY'); a.count = count
    a.use_relative_offset = True; a.relative_offset_displace = axis
    return o
pipes = bpy.data.objects["pipe_group"]
for i, x in enumerate((-3, 0, 3)):
    stack(pipes, (x + rng.uniform(-0.4, 0.4), 4.8, rng.uniform(0, 0.6)), 0, rng.randint(4, 7))      # uneven on purpose
for i, y in enumerate((-2, 1.5)):
    stack(pipes, (4.8, y + rng.uniform(-0.3, 0.3), 0), math.pi / 2, rng.randint(4, 6))
stack(bpy.data.objects["bridge"], (0, 0, 3), 0, 6, axis=(1.0, 0, 0))
stack(bpy.data.objects["bridge"], (0.3, 0, 3.6), math.pi / 2, 5, axis=(1.0, 0, 0), extra_scale=(1, 0.3, 1))   # thin variant
# whole-set stack upward (Alt+D, move Z)
H = 12.0                                                                  # ~ set height
for o in [o for o in bpy.context.scene.objects if o.type in {'MESH', 'EMPTY'} and o.location.z < H]:
    c = o.copy(); c.data = o.data; c.location.z += H; bpy.context.scene.collection.objects.link(c)
```
- Arrays stay live until export. glTF export applies them (`export_apply=True` in `blend2raea.py`).

### raea
- raea: no equivalent at build time. The dressed set plays as one `.glb` via `<Model>` / BlendShot.
- Seeded randomness is required in both Blender and TSX: an unseeded layout changes on every rebuild and breaks
  `user_edits.json` (memory: respect .blend edits).

## NOTES
- Visual gaps: 12:38–17:09 every placement, count and rotation is by eye. Counts above are `~` except "×3" (15:00–15:03).
- STT fix: "s shift Zed" = `S`, `Shift+Z` (scale excluding Z).
- Rule conflicts: none for modelling. Style D: the hero is never a kit pile, and dense kit stays out of the focus plane.
  Watch the part budget (limits.md: ~300 parts for crowds/debris; arrays export as one mesh per object, so a few large
  arrayed objects are cheap).
- Increasing the viewport exposure (15:26) is only for seeing while dressing; it doesn't belong to the final look.

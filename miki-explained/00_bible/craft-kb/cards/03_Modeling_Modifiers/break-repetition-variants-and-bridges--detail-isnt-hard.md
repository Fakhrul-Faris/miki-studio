---
title: Breaking repetition — top-piece variants, rotated bridges and one-off fillers
bucket: 03_Modeling_Modifiers
source: "Detail Isn't Hard  Blender Tutorial.txt"
source_time: "01:57–02:43, 14:26–15:30, 25:49–27:14"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Keeps a multiplied set (the "multiply" state change — shelves of stock, rows of stalls) from looking copy-pasted.
---

## METADATA
03_Modeling_Modifiers | 3.x source → 4.2+ code | Blender bpy

## CREATIVE_INTENT
Once one cluster is instanced many times, the eye starts to spot the copy. Small, cheap differences — an extra piece on
top, a different angle, a sideways copy used as a walkway, a few unrelated models filling gaps — hide the pattern while
keeping the family look.

## STE_PROCEDURE
1. Rotate every instance to a different Z angle; never repeat the same angle side by side.
2. On some instances, place one extra model on top (same tower + one cap piece = a "new" tower).
3. Stack two instances for a taller variant where height is needed.
4. Bridge gaps between instances with a separate object (source: the same model rotated sideways as a walkway; better: a different piece).
5. Fill spaces that "need something different" with unique models that are not part of any instance.
6. Throw in a completely different model every so often to break the pattern.
7. Before you finish, check the frame for two identical silhouettes side by side; rotate or swap one.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy, random, math
from mathutils import Vector
rng = random.Random(7)                                  # seeded: same layout every rebuild
def scatter(coll, spots, cap_objs=(), cap_chance=0.35):
    out = []
    for i, (x, y) in enumerate(spots):
        inst = bpy.data.objects.new(f"{coll.name}_{i:02d}", None)
        inst.instance_type = 'COLLECTION'; inst.instance_collection = coll
        inst.location = (x, y, 0)
        inst.rotation_euler = (0, 0, rng.choice([0, 0.5, 1, 1.5, 2, 2.5]) * math.pi / 2 * rng.uniform(0.9, 1.1))
        bpy.context.scene.collection.objects.link(inst)
        if cap_objs and rng.random() < cap_chance:      # top-piece variant
            cap = rng.choice(cap_objs).copy(); cap.data = cap.data   # linked data
            cap.location = (x, y, coll_height(coll)); bpy.context.scene.collection.objects.link(cap)
        out.append(inst)
    return out

def coll_height(coll):
    return max((o.matrix_world @ Vector(c)).z for o in coll.all_objects for c in o.bound_box)
```
- Bridge: duplicate any module, `rotation_euler.x = math.pi/2`, place between two instance tops.

### raea
- If scattering in TSX: seed every random choice (render-equals-play rule: `Math.random()` is per frame; derive angles from the index, e.g. `ry = ((i * 2654435761) % 360) * Math.PI / 180`).
- `<Model ... rotation={[0, ry, 0]} scale={k} />` per spot; unique fillers are their own `<Model>`s.

## NOTES
- Visual gaps: placement of fillers/bridges is by eye (26:21–27:14); no rule beyond "where it feels like it needs something different".
- Rule conflicts: none. For a Style D "multiply" beat, the copies should grow/fade in over ~0.4 s each (never pop), staggered.

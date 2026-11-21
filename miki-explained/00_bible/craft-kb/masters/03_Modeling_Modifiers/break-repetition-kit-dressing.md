---
title: "Break repetition: variants, messy offsets, bridges"
bucket: 03_Modeling_Modifiers
type: master
members:
  - cards/03_Modeling_Modifiers/break-repetition-variants-and-bridges--detail-isnt-hard.md
  - cards/03_Modeling_Modifiers/kit-dressing-arrays-messy-offsets-stack-set--add-tons-of-detail.md
sources: ["Detail Isn't Hard  Blender Tutorial.txt", "How to Add Tons of Detail To Your Renders  Blender.txt"]
use_when: "dressing shelves/stacks so kit pieces don't read as copies"
style_fit: No modelling conflict — keeps a multiplied set (shelves of stock, rows of stalls) from looking copy-pasted; dense kit stays behind/around the hero, out of the focus plane, softened by DoF; the hero is never a kit pile; all randomness seeded (respect .blend edits); "multiply" copies grow/fade in ~0.4 s staggered.
---

## METADATA
03_Modeling_Modifiers | Blender 3.x / 4.x (sources) → Blender 5.3 | Blender bpy (collection instances, Array modifier, linked duplicates)

## CREATIVE_INTENT
Shared why: once one piece or cluster is repeated, the eye spots the copy; cheap differences — another angle, an extra
piece on top, uneven spacing, a different piece every so often — hide the pattern while keeping the family look.
- Detail Isn't Hard: rotate every instance differently, cap some with one extra model, stack two for height, bridge gaps
  with a separate (ideally different) piece, fill "needs something different" spots with unique models, check for twin silhouettes.
- Add Tons of Detail: dress fast with Array stacks, 90° turns against the next wall, thin/long scale variants, mixed
  pieces on platforms, offsets deliberately uneven ("equal spacing looks rendery, uneven looks real"); nothing has to
  connect properly; duplicate the whole set upward for height.

## STE_PROCEDURE
1. Keep the reference to the side and a Rendered viewport (or raea still) open while dressing.
2. Before you add an Array, apply Rotation & Scale (Ctrl+A) so it runs along the expected axis.
3. Place a kit piece against a wall; Array it into a stack or run (it may pass through the ceiling).
4. Repeat at a few spots; duplicate two of them, rotate 90°, put them on the next wall.
5. Leave the offsets between copies unequal on purpose.
6. Rotate every instance to a different Z angle; never the same angle side by side.
7. On some instances (~35 %) place one extra model on top — same tower + one cap = a "new" tower.
8. Stack two instances (or Array runs over each other) for a taller variant where height is needed.
9. Make a variant by scaling a copy much thinner and longer along one axis (S, Shift+Z to scale X/Y only when widening).
10. Bridge gaps with a separate object — a platform Array, duplicated over itself, one copy rotated 90° and offset (better: a different piece than the instance).
11. Mix other pieces onto some platforms (pipes, brackets ×3 stacked holding a platform, a pair of thin beams with higher Count).
12. Fill empty zones with unique models not part of any instance (anything "coming through the wall").
13. Throw in a completely different model every so often.
14. If the space must be taller: select everything except camera and lights, Duplicate Linked (Alt+D), move straight up; optionally rotate the copy 90° on Z (source kept it unrotated because it looked better).
15. Remove lights duplicated by the stack.
16. Before you finish, look through each camera setup for two identical silhouettes side by side; rotate or swap one.

## VALUES BY SOURCE
| parameter | Detail Isn't Hard | Add Tons of Detail | recommended for Style D (+ why) |
|---|---|---|---|
| unit repeated | collection instance (tower cluster) | single kit piece + Array | collection instance for clusters, Array for runs |
| rotation | every instance a different Z (quarter-turn steps ±10 %) | 90° turns on the next wall | different Z per neighbour; 90° steps for wall-aligned stock |
| caps / extras | ~35 % (~) get one top piece | mixed pieces on platforms | ~1 in 3 |
| spacing | — | deliberately uneven (±0.3–0.4 m ~, seeded) | uneven, seeded (scale to shelf size) |
| array counts | — | 4–7 (~), bracket ×3 (stated) | per shelf |
| scale variants | stack two for height | thin/long copy (y 0.3 ~) | yes, one per run |
| bridges | same model rotated sideways (better: different piece) | platform array duplicated, one rotated 90° | a different piece |
| height | stacked instance | whole set Alt+D upward (H ~12 m), maybe rotate 90° | only if a setup sees it |
| randomness | seeded `random.Random(7)` | seeded `random.Random(11)` | always seeded |

## AGENT_EXECUTION
Blender 5.3:
```python
import bpy, random, math
from mathutils import Vector
rng = random.Random(7)                                   # seeded: same layout on every rebuild (user_edits.json stays valid)
scn = bpy.context.scene

def coll_height(coll):
    return max((o.matrix_world @ Vector(c)).z for o in coll.all_objects for c in o.bound_box)

def scatter_instances(coll, spots, cap_objs=(), cap_chance=0.35):
    out, last = [], None
    for i, (x, y) in enumerate(spots):
        inst = bpy.data.objects.new(f"{coll.name}_{i:02d}", None)
        inst.instance_type = 'COLLECTION'; inst.instance_collection = coll
        inst.location = (x, y, 0)
        a = rng.choice([0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5])
        while a == last: a = rng.choice([0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5])   # never the same angle side by side
        last = a
        inst.rotation_euler = (0, 0, a * math.pi / 2 * rng.uniform(0.9, 1.1))
        scn.collection.objects.link(inst)
        if cap_objs and rng.random() < cap_chance:                          # top-piece variant
            cap = rng.choice(cap_objs).copy()                               # .copy() keeps linked mesh data
            cap.location = (x, y, coll_height(coll)); scn.collection.objects.link(cap)
        out.append(inst)
    return out

def stack(piece, loc, rot_z, count, axis=(0, 0, 1.05), extra_scale=(1, 1, 1)):
    o = piece.copy(); scn.collection.objects.link(o)                        # linked data (Alt+D)
    o.location = loc; o.rotation_euler = (0, 0, rot_z); o.scale = extra_scale
    a = o.modifiers.new("Array", 'ARRAY'); a.count = count
    a.use_relative_offset = True; a.relative_offset_displace = axis
    return o

pipes = bpy.data.objects["pipe_group"]
for x in (-3, 0, 3):
    stack(pipes, (x + rng.uniform(-0.4, 0.4), 4.8, rng.uniform(0, 0.6)), 0, rng.randint(4, 7))   # uneven on purpose
for y in (-2, 1.5):
    stack(pipes, (4.8, y + rng.uniform(-0.3, 0.3), 0), math.pi / 2, rng.randint(4, 6))         # next wall, 90°
bridge = bpy.data.objects["bridge"]
stack(bridge, (0, 0, 3), 0, 6, axis=(1.0, 0, 0))
stack(bridge, (0.3, 0, 3.6), math.pi / 2, 5, axis=(1.0, 0, 0), extra_scale=(1, 0.3, 1))       # thin variant, rotated
stack(bpy.data.objects["bracket"], (1.2, 0, 0), 0, 3)                                          # bracket ×3 (stated)

# whole-set stack upward (Alt+D, move Z), skipping lights/cameras
H = 12.0                                                                     # ~ set height
for o in [o for o in scn.objects if o.type in {'MESH', 'EMPTY'} and o.location.z < H]:
    c = o.copy(); c.location.z += H; scn.collection.objects.link(c)
```
Bridge from the same model: duplicate a module, `rotation_euler.x = math.pi / 2`, place between two instance tops.
Arrays stay live until export; `blend2raea.py` exports with `export_apply=True`.

raea: no build-time equivalent — the dressed set plays as one `.glb` via `<Model>` / BlendShot. If scattering in TSX,
seed every choice from the index (e.g. `ry = ((i * 2654435761) % 360) * Math.PI / 180`) and use real Model props:
`<Model src={staticFile("tower.glb")} position={p} rotation={[0, ry, 0]} scale={k} />`; unique fillers are their own `<Model>`s.

## NOTES
- Deprecated: none (3.x/4.x → 5.3 unchanged for instances and Array).
- STT fix: "s shift Zed" = `S`, `Shift+Z` (scale excluding Z).
- Visual gaps: placement of fillers/bridges (Detail Isn't Hard 26:21–27:14) and every placement/count/rotation in Add Tons
  of Detail (12:38–17:09) is by eye — counts are `~` except "×3" (15:00–15:03). The viewport exposure boost (15:26) is only for seeing while dressing.
- Budget: limits.md ~300 parts for crowds/debris; arrays export as one mesh per object, so a few large arrayed objects are cheap.
- Rule conflicts: none for modelling. Style D: the hero is never a kit pile; dense kit stays out of the focus plane; unseeded
  layouts break `user_edits.json` (respect .blend edits); a "multiply" beat grows/fades copies in over ~0.4 s each, staggered, never pops.

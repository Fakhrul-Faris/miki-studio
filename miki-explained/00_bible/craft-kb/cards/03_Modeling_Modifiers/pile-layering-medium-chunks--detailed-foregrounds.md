---
title: Medium-chunk piles from one or two duplicated models (intersecting layering, rigid-body pile, far-and-dark low-poly cheat)
bucket: 03_Modeling_Modifiers
source: "How to get Detailed Foregrounds  Blender Tutorial.txt"
source_time: "03:22–05:18, 08:25–09:31, 13:46–15:23"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Layer 2 of a macro set — a pile of coins, receipts, bottle caps or beveled blocks around the hero; built and frozen in Blender, exported as one GLB.
---

## METADATA
03_Modeling_Modifiers | 3.x → 4.2+ | Blender bpy

## CREATIVE_INTENT
Medium pieces interacting with the floor give "a big bang for your buck": one or two decent models, duplicated, rotated and pushed into each other, read as a rich pile. Pieces far from camera or in darkness can be crude, so effort goes only where the lens looks.

## STE_PROCEDURE
1. Pick or model one medium asset; make it "not terrible" from a medium distance (a beveled cube with a texture is enough for debris).
2. Try a few different models in place; keep the one that works.
3. Duplicate it 5–6 times; give each copy a different rotation and some a smaller scale.
4. Place copies so they intersect the floor and each other into a pile; intersection is fine.
5. Cover as much ground as possible with these medium-to-large pieces.
6. Optional: drop the pieces with a rigid-body simulation onto a passive floor for a natural pile.
7. After the simulation settles, apply the visual transform on the frame you like and remove the rigid bodies.
8. Push extra duplicates into the background; there, low-poly or low-quality pieces are fine, especially in darkness.

## AGENT_EXECUTION
```python
import bpy, math, random
random.seed(7)                                       # seeded: rebuilds give the same pile
src = bpy.data.objects["Chunk"]                      # the one good medium asset
pile = []
for i in range(6):                                   # video: "duplicate that like five six times"
    d = src.copy(); d.data = src.data                # linked duplicate (Alt+D) keeps the GLB small
    bpy.context.collection.objects.link(d)
    d.location = (src.location.x + random.uniform(-0.08, 0.08), src.location.y + random.uniform(-0.08, 0.08), src.location.z + random.uniform(0, 0.03))  # ~ macro scale
    d.rotation_euler = (random.uniform(0, math.pi), random.uniform(0, math.pi), random.uniform(0, 2*math.pi))
    s = random.choice([1.0, 1.0, 0.7, 0.5]); d.scale = (s, s, s)
    pile.append(d)

# optional rigid-body pile (Blender build only; raea never simulates)
floor = bpy.data.objects["FG_ground"]
bpy.context.view_layer.objects.active = floor; floor.select_set(True)
bpy.ops.rigidbody.object_add(type='PASSIVE'); floor.rigid_body.collision_shape = 'MESH'
for d in pile:
    bpy.context.view_layer.objects.active = d
    bpy.ops.rigidbody.object_add(type='ACTIVE'); d.rigid_body.collision_shape = 'CONVEX_HULL'
    d.location.z += 0.1
sc = bpy.context.scene; sc.rigidbody_world.point_cache.frame_end = 120
bpy.ops.ptcache.bake_all(bake=True)
sc.frame_set(120)                                    # the settled frame
bpy.ops.object.select_all(action='DESELECT')
for d in pile: d.select_set(True)
bpy.ops.object.visual_transform_apply()              # freeze the pose
bpy.ops.ptcache.free_bake_all()
for d in pile:
    bpy.context.view_layer.objects.active = d; bpy.ops.rigidbody.object_remove()
```
raea: no equivalent for the simulation (raea does not run physics in renders; limits.md). The frozen pile goes in the set GLB (`<Model src={staticFile("set.glb")} />`). If the pile must form on a word, bake the drop as keyframes and export the animation clip, then play it with `<Model src animation="..." time={...} loop={false} />`, or grow pieces in by `transform` scale over ~0.4 s.

## NOTES
- Mesh budget: each piece is a mesh draw in raea (no batching); keep piles to tens of pieces, join static pieces (`bpy.ops.object.join()`) after placing.
- Video values: duplicate count 5–6; "one or two logs duplicated"; everything else by eye.
- Visual gaps: which rotations "look nice" is judged in render view only.
- Rule conflicts: a rigid-body drop shown on screen must not bounce — if animated, use a soft settle (high damping, ~0.4 s) and never a bouncy landing.

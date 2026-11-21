---
title: Collection-instance kitbashing (cluster → collection → instance, repeat at every scale)
bucket: 03_Modeling_Modifiers
source: "Detail Isn't Hard  Blender Tutorial.txt"
source_time: "00:57–08:31, 21:01–26:06"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Builds dense hero-object detail (a shelf of stock, a counter of machines, a rack of parts) fast in Blender before GLB export; one cluster edited once updates everywhere.
---

## METADATA
03_Modeling_Modifiers | 3.x source → 4.2+/5.x code | Blender bpy

## CREATIVE_INTENT
When a set needs to look far more complex than the build time allows, stack simple parts into one vertical cluster, turn that
cluster into a collection, and scatter instances of it at different angles. Everything reads as one family because it is
the same thing, so the world feels cohesive while the eye reads "complexity".

## STE_PROCEDURE
1. Stack simple and library parts into one cluster that reads as one idea (the source: a tower — pillars, slabs, a temple piece in the middle).
2. Build bigger parts by duplicating one small part over itself (pillar → bigger pillar → tower).
3. Select every part of the cluster.
4. Move the parts to a new collection (`M` → New Collection, e.g. "Tower").
5. Add a Collection Instance of that collection (`Shift+A` → Collection Instance → "Tower").
6. If the instance appears far from where you add it, set the collection's instance offset so the origin sits at the cluster's base (source: "origin to geometry" on the instance, ~).
7. Exclude the source collection from the view layer (uncheck it) so editing an instance never moves the originals by accident.
8. Before you edit the cluster, re-enable the source collection, select its objects (outliner → Select Objects) and isolate them in Local View (`/` numpad).
9. Edit the parts; every instance updates at once.
10. Duplicate the instance around the set (~18 copies in the source) at different rotations and heights.
11. Stack one instance on top of another for a taller variant.
12. Add one extra model on top of some instances for variation (see repetition-break card).

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy
from mathutils import Vector

def make_cluster_collection(objs, name):
    coll = bpy.data.collections.new(name)
    bpy.context.scene.collection.children.link(coll)
    for o in objs:
        for c in list(o.users_collection):
            c.objects.unlink(o)
        coll.objects.link(o)
    # put the instance origin at the cluster's base centre (replaces the "origin to geometry" fix)
    pts = [o.matrix_world @ Vector(c) for o in objs for c in o.bound_box]
    coll.instance_offset = (sum(p.x for p in pts)/len(pts), sum(p.y for p in pts)/len(pts), min(p.z for p in pts))
    # exclude the source from the view layer (the "uncheck it" step)
    bpy.context.view_layer.layer_collection.children[name].exclude = True
    return coll

def add_instance(coll, loc, rot_z=0.0, scale=1.0, name=None):
    inst = bpy.data.objects.new(name or f"{coll.name}_inst", None)
    inst.instance_type = 'COLLECTION'
    inst.instance_collection = coll
    inst.location = loc
    inst.rotation_euler = (0, 0, rot_z)
    inst.scale = (scale, scale, scale)
    bpy.context.scene.collection.objects.link(inst)
    return inst
```
- Stacked variant: `add_instance(coll, (x, y, h_cluster))` on top of another at `(x, y, 0)`.
- Export to GLB: the glTF exporter writes collection instances as realised copies of the meshes (mesh data is shared,
  so the .glb stays small). `blend2raea.py` exports the set this way.

### raea
- No instancing component needed: each instance arrives in the `.glb` as its own node; play it with `<Model src={staticFile("NAME.glb")} />` (BlendShot).
- To scatter a cluster at render time instead, export the cluster alone as `cluster.glb` and map positions:
  `{SPOTS.map((s, i) => <Model key={i} src={staticFile("cluster.glb")} position={s.p} rotation={[0, s.ry, 0]} scale={s.k} />)}`
  (real `Model` props: `src position rotation scale`). Keep the count under ~300 parts (limits.md).

## NOTES
- Source claims instancing renders "much faster" than `Shift+D` copies; true for Blender memory, irrelevant to raea (meshes are realised in the GLB either way).
- Visual gaps: which library pieces go where in the tower is shown, not said (07:30–08:31) — composition is by eye.
- Rule conflicts: none for modelling. For Style D keep the cluster behind/around one hero object; the hero itself should be a real library model, not a kitbash pile.
- STT fix: "OD" (24:56) = `Alt+D` (linked duplicate).

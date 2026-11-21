---
title: Build kit modules/clusters once, reuse as instances
bucket: 03_Modeling_Modifiers
type: master
members:
  - cards/03_Modeling_Modifiers/cluster-reuse-set-building--crazy-renders-geo-nodes.md
  - cards/03_Modeling_Modifiers/collection-instance-kitbash--detail-isnt-hard.md
  - cards/03_Modeling_Modifiers/modular-kitbash-chunks-asset-library--industrial-scene.md
  - cards/03_Modeling_Modifiers/reusable-kitbash-modules-bevel-mirror-array--serene-render.md
sources: ["How To Make Crazy Renders With Easy Geometry Nodes.txt", "Detail Isn't Hard  Blender Tutorial.txt", "Making an Industrial Scene in Blender.txt", "Making a SERENE render in blender.txt"]
use_when: "building a set fast from reusable pieces"
style_fit: Supporting set pieces only (shelves, racks, counters, railings, machines behind the hero); the hero stays a real library model at macro quality; conflict: Crazy Renders' 16 mm wide vista is one establishing setup at most — Style D is tight shallow-DoF macro; library never used for figures in street scenes.
---

## METADATA
03_Modeling_Modifiers | Blender 3.x / 4.x (sources) → Blender 5.3 | Blender bpy (join, collection instances, Bevel/Mirror/Array, asset library) → GLB → raea `<Model>`

## CREATIVE_INTENT
Shared why: a set that looks far more complex than the build time allows is made of a few pieces built once and reused —
small parts joined into chunks, chunks into clusters, clusters instanced or duplicated everywhere; repetition of one
family reads cohesive and designed, and editing the source updates every copy.
- Crazy Renders: duplicate one scattered cluster at different scales/heights for layered depth; scatter the kit onto a
  non-flat emitter (a product shell, a coin) so the object itself becomes the landscape — a strong metaphor shot.
- Detail Isn't Hard: cluster → collection → Collection Instance; fix the instance offset, exclude the source collection,
  edit in Local View, ~18 instances at different rotations/heights, stacked variants.
- Industrial Scene: "Lego pieces" — cubes, slanted cubes, half-cylinders joined into chunks, one free texture per chunk,
  2–3 variants, save each to a personal asset library for drag-and-drop reuse; background chunks need only silhouette and colour.
- SERENE render: model pillar/platform/arch modules early with Inset/Extrude, custom-profile Bevel (Cornice Molding),
  Bevel + Mirror Z + Array modifiers, low-poly repeated parts (16-vert posts), join, then duplicate (Alt+D linked).

## STE_PROCEDURE
1. Collect a reference image for each piece (any picture).
2. Block each piece from cubes, slanted cubes and stretched half-cylinders; model pillars with repeated Inset (I) / Extrude (E).
3. Bevel profile edges with Profile Type = Custom (preset Cornice Molding) for a quick moulding.
4. Add a Bevel modifier with a small Amount (~0.01, 2 segments) to round corners.
5. Add a Mirror modifier on Z so only the bottom half is modelled.
6. Keep repeated small parts low-poly (posts: Cylinder Vertices = 16; hero surfaces can use 128); Array them along their run (~12 posts).
7. For an arch: Cylinder, delete half, extrude down, bevel; duplicate downward and Array it (~5), apply, nudge into place.
8. Apply one texture/material to all parts of a chunk; join the parts (Ctrl+J) and set the origin to the base.
9. Make 2–3 chunk variants; combine variants into bigger assemblies and join again.
10. For clusters you will edit later: move the parts to a new collection (M › New Collection), set its instance offset to the cluster's base centre, and exclude the source collection from the view layer.
11. Add Collection Instances (Shift+A › Collection Instance) or linked duplicates (Alt+D) around the set at different rotations, heights and scales (~18 in the source); stack one on another for taller variants.
12. To edit a cluster: re-enable the source collection, select its objects, isolate in Local View (Numpad /), edit — every instance updates.
13. If copies share one GN scatter modifier, change Distribute Points on Faces [Seed] per copy so layouts don't repeat.
14. Object-as-landscape: put the same scatter modifier on the hero/product mesh instead of a plane.
15. Line assemblies up roughly to outline the set; precision is not required in the background.
16. Mark each finished chunk as an asset and save it into the asset library folder; in later projects drag it in from the Asset Browser.
17. Log every downloaded piece in `00_bible/ASSET-SOURCES.md` (prefer CC0/CC-BY; credit CC-BY).
18. Before GLB export, apply modifiers (or export with Apply Modifiers); collection instances export as realised copies sharing mesh data.

## VALUES BY SOURCE
| parameter | Crazy Renders | Detail Isn't Hard | Industrial Scene | SERENE | recommended for Style D (+ why) |
|---|---|---|---|---|---|
| reuse unit | GN cluster object | collection instance | joined chunk + asset | joined module | collection instance for editable clusters; library asset for cross-episode pieces |
| copies | ~3 scales/heights (by eye) | ~18 | lined up roughly | duplicated everywhere | as few as each setup needs |
| variation | scale 0.6/0.8/1.4 (~), seed per copy | rotation/height, stacked, caps | 2–3 chunk variants | — | rotation + caps + seeds (see break-repetition master) |
| modifiers | GN scatter | — | — | Bevel ~0.01 ×2 seg, Mirror Z, Array ~12 (rel. offset 4 ~) | Bevel small (catches the top light in macro), apply on export |
| poly budget | — | — | low effort in background | posts 16 verts, hero wall 128 | low-poly repeats, detail where the lens is close |
| lens | 16 mm wide vista | — | — | — | macro lens; 16 mm (~1.69 rad vfov on 9:16) only for one establishing setup |
| library | — | — | personal asset library, CC0 packs, textures.com | — | CC0/CC-BY libraries, logged in ASSET-SOURCES.md |

## AGENT_EXECUTION
Blender 5.3:
```python
import bpy
from mathutils import Vector
scn = bpy.context.scene

# --- module build (SERENE) ---
p = bpy.data.objects["Pillar"]
bv = p.modifiers.new("Bevel", 'BEVEL'); bv.width = 0.01; bv.segments = 2                 # ~ "not too much"
mi = p.modifiers.new("Mirror", 'MIRROR'); mi.use_axis = (False, False, True)               # Z
bpy.ops.mesh.primitive_cylinder_add(vertices=16, radius=0.04, depth=0.8)                   # low-poly railing post
post = bpy.context.object
ar = post.modifiers.new("Array", 'ARRAY'); ar.count = 12; ar.relative_offset_displace = (4, 0, 0)   # ~
# Edit-mode custom-profile bevel: bpy.ops.mesh.bevel(offset=0.05, segments=8, profile_type='CUSTOM')  (preset from the operator panel ~)

# --- chunk join + asset library (Industrial Scene) ---
bpy.ops.object.select_all(action='DESELECT')
for o in (p, post): o.select_set(True)
bpy.context.view_layer.objects.active = p; bpy.ops.object.join()                            # Ctrl+J
chunk = bpy.context.active_object; chunk.name = "KB_pillar_A"
bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
chunk.asset_mark(); chunk.asset_generate_preview()
# library: bpy.context.preferences.filepaths.asset_libraries.new(name="Meikigo Kit", directory="/path/to/kit")
# reuse later: with bpy.data.libraries.load("/path/to/kit/KB_pillar_A.blend", link=False) as (src, dst):
#                  dst.objects = [n for n in src.objects if n.startswith("KB_")]

# --- cluster -> collection -> instances (Detail Isn't Hard) ---
def make_cluster_collection(objs, name):
    coll = bpy.data.collections.new(name); scn.collection.children.link(coll)
    for o in objs:
        for c in list(o.users_collection): c.objects.unlink(o)
        coll.objects.link(o)
    pts = [o.matrix_world @ Vector(c) for o in objs for c in o.bound_box]
    coll.instance_offset = (sum(q.x for q in pts) / len(pts), sum(q.y for q in pts) / len(pts), min(q.z for q in pts))
    bpy.context.view_layer.layer_collection.children[name].exclude = True    # the "uncheck it" step
    return coll

def add_instance(coll, loc, rot_z=0.0, scale=1.0, name=None):
    inst = bpy.data.objects.new(name or f"{coll.name}_inst", None)
    inst.instance_type = 'COLLECTION'; inst.instance_collection = coll
    inst.location = loc; inst.rotation_euler = (0, 0, rot_z); inst.scale = (scale,) * 3
    scn.collection.objects.link(inst)
    return inst

# --- cluster copies at scales/heights (Crazy Renders) ---
src = bpy.data.objects["Cluster"]
for loc, s in [((3, 0, 0), 0.6), ((-2, 4, 0), 1.4), ((1, -3, 2.5), 0.8)]:                 # ~ by eye
    c = src.copy(); scn.collection.objects.link(c); c.location = loc; c.scale = (s,) * 3
    # per-copy scatter seed so layouts differ (copy the modifier's node group if the seed lives inside it)
# object-as-landscape: bpy.data.objects["Product"].modifiers.new("Scatter", 'NODES').node_group = bpy.data.node_groups["ScatterKit"]
```
Before GLB export: `bpy.ops.object.modifier_apply(modifier="Bevel")` … or export with Apply Modifiers (`blend2raea.py`
uses `export_apply=True`).

raea:
- The dressed set plays as one GLB: `<Model src={staticFile("set.glb")} />` (BlendShot).
- Reuse a module/cluster at render time: export it alone and place copies with real Model props —
  `{SPOTS.map((s, i) => <Model key={i} src={staticFile("cluster.glb")} position={s.p} rotation={[0, s.ry, 0]} scale={s.k} />)}`;
  the same GLB loads once (cheap); keep the count under ~300 parts (limits.md); seed positions/rotations.
- A silhouette-only background chunk can be a Manifold solid built at module level:
  `manifold.box(w, h, d)` unioned with `manifold.cylinder(...)`, passed as `<Mesh3d shape={solid}>` (meshes.md); reused shapes are built once.
- Wide establishing lens: `<Camera3d projection={{ Perspective: { fov: 2 * Math.atan(18 / 16) } }} />` ≈ 1.69 rad (16 mm on 9:16, inferred).

## NOTES
- Deprecated: none (4.x asset API `asset_mark()` / `asset_generate_preview()` unchanged in 5.x). Legacy Hair-particle
  scatter → GN.
- Instancing is "much faster" in Blender memory (Detail Isn't Hard); irrelevant to raea — meshes are realised in the GLB either way.
- Viewport tip (Industrial Scene): Solid view with Color = Texture runs smoother than Material Preview.
- STT fix: "OD" (Detail Isn't Hard 24:56) = `Alt+D` (linked duplicate).
- Visual gaps: all cluster placements, tower composition (07:30–08:31), chunk shapes ("this shape"), inset/extrude depths,
  arch trims and the Cornice Molding preset path are viewport-only.
- Rule conflicts (strictest wins): Style D wants shallow-DoF macro — a 16 mm vista is one setup at most, any move across the
  set stays eased under ~130°/s; keep clusters behind/around one hero, which is a real library model, not a kitbash pile;
  never use the library for figures in street scenes (default no people).

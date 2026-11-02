# NVIDIA SimReady props for the house look (CC-BY-4.0: credit "3D assets: NVIDIA SimReady" in the pinned comment).
# The dataset is 490 GB because of photo textures (each stored twice); our look is flat colour, so only the shape is fetched.
#   python3 simready.py fetch <asset> [<asset>…]      # shape-only download (no Textures/, source_assets/) into the cache
#   blender -b --python simready.py -- kit <asset> [faces]   # import, join, decimate, flat material, save the kit .blend
#   python3 simready.py clean <asset>                 # drop the cache once the kit file exists
# Kit files: miki-explained/02_kit/simready/<asset>.blend, one object named <asset>, origin at the bottom centre, metres.
import os, sys, json, math, shutil, urllib.request
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))          # miki-explained/
CACHE = os.path.join(os.path.dirname(ROOT), "archive-ignore", "simready_cache")
KIT = os.path.join(ROOT, "02_kit", "simready")
API = "https://huggingface.co/api/datasets/nvidia/simready-assets/tree/main/"
RAW = "https://huggingface.co/datasets/nvidia/simready-assets/resolve/main/"
SKIP = ("/Textures/", "/source_assets/", "/.thumbs/256x256/")


def fetch(name):
    files = json.load(urllib.request.urlopen(API + name + "?recursive=true"))
    keep = [f for f in files if f["type"] == "file" and not any(s in f["path"] for s in SKIP)
            and f["path"].endswith((".usd", ".usda", ".usdc", ".json", ".txt", "_thumbnail.png"))]
    total = 0
    for f in keep:
        dst = os.path.join(CACHE, f["path"]); os.makedirs(os.path.dirname(dst), exist_ok=True)
        if not os.path.exists(dst): urllib.request.urlretrieve(RAW + f["path"], dst)
        total += f.get("size", 0)
    print(f"{name}: {len(keep)} files, {total / 1e6:.1f} MB (of {sum(f.get('size', 0) for f in files if f['type'] == 'file') / 1e6:.0f} MB)")


def kit(name, faces=6000):
    import bpy
    from mathutils import Vector
    bpy.ops.wm.read_factory_settings(use_empty=True)
    d = os.path.join(CACHE, name, "simready_usd")
    root = [f for f in os.listdir(d) if f.endswith((".usd", ".usda")) and f.startswith("sm_")][0]
    bpy.ops.wm.usd_import(filepath=os.path.join(d, root), import_materials=False, import_lights=False, import_cameras=False)
    meshes = [o for o in bpy.data.objects if o.type == "MESH"]
    for o in bpy.data.objects: o.select_set(o in meshes)
    bpy.context.view_layer.objects.active = meshes[0]
    if len(meshes) > 1: bpy.ops.object.join()
    o = bpy.context.view_layer.objects.active; o.name = name
    o.parent = None; bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    for x in [x for x in bpy.data.objects if x is not o]: bpy.data.objects.remove(x)
    n0 = len(o.data.polygons)
    bpy.ops.object.mode_set(mode="EDIT"); bpy.ops.mesh.select_all(action="SELECT")
    bpy.ops.mesh.remove_doubles(threshold=0.0005); bpy.ops.object.mode_set(mode="OBJECT")
    # planar first: flat panels collapse to a few faces without tearing (a plain collapse at 4% broke the counter)
    dm = o.modifiers.new("planar", "DECIMATE"); dm.decimate_type = "DISSOLVE"; dm.angle_limit = math.radians(3)
    bpy.ops.object.modifier_apply(modifier=dm.name)
    if len(o.data.polygons) > faces:
        dm = o.modifiers.new("decimate", "DECIMATE"); dm.ratio = faces / len(o.data.polygons); bpy.ops.object.modifier_apply(modifier=dm.name)
    o.data.materials.clear()
    bb = [o.matrix_world @ Vector(c) for c in o.bound_box]; lo = Vector((sum(v.x for v in bb) / 8, sum(v.y for v in bb) / 8, min(v.z for v in bb)))
    o.data.transform(__import__("mathutils").Matrix.Translation(-lo)); o.location = (0, 0, 0)
    for poly in o.data.polygons: poly.use_smooth = False
    os.makedirs(KIT, exist_ok=True); out = os.path.join(KIT, name + ".blend")
    bpy.ops.wm.save_as_mainfile(filepath=out, compress=True)
    size = [round(v, 2) for v in (max(v.x for v in bb) - min(v.x for v in bb), max(v.y for v in bb) - min(v.y for v in bb), max(v.z for v in bb) - min(v.z for v in bb))]
    print(f"KIT {name}: {n0} -> {len(o.data.polygons)} faces, size {size} m, {os.path.getsize(out) / 1e6:.2f} MB -> {out}")


def load(name, m=None):
    """In an episode scene: link the kit object in (one copy; duplicate with .copy() for more)."""
    import bpy
    with bpy.data.libraries.load(os.path.join(KIT, name + ".blend"), link=False) as (src, dst): dst.objects = [name]
    o = dst.objects[0]; bpy.context.scene.collection.objects.link(o)
    if m: o.data.materials.append(m)
    return o


if __name__ == "__main__":
    a = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else sys.argv[1:]
    if a[0] == "fetch":
        for n in a[1:]: fetch(n)
    elif a[0] == "kit": kit(a[1], int(a[2]) if len(a) > 2 else 6000)
    elif a[0] == "clean":
        for n in a[1:]: shutil.rmtree(os.path.join(CACHE, n), ignore_errors=True); print("cleaned", n)

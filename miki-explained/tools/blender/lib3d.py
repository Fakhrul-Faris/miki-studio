# lib3d — real library models for v4 (user, 2026-11-04: "use any 3d model in the library … real physical 3D animation").
# Models live in 02_kit/models/<name>.glb (Poly Pizza CC0 / CC-BY 3.0, Quaternius, Kenney, NVIDIA SimReady); credits in
# 02_kit/models/credits.json — every CC-BY model used goes in the episode's pinned comment.
#   from lib3d import model, part, credits_for
#   car = model("car_b", length=4.3, at=(x, y, 0), face=90)      # face: degrees about z; 0 = as authored
#   wheel = part(car, "FrontLeftWheel")                           # a child mesh by name fragment
import os, json, math, bpy
from mathutils import Vector, Matrix
KIT = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "02_kit", "models")
USED = set()


def model(name, height=None, length=None, width=None, at=(0, 0, 0), face=0.0, rough=None):
    """Import <name>.glb under one root empty, scaled to a target height/length (longest ground side)/width, its bottom
    centre at `at`, turned by `face` degrees. Returns the root (children = the model's meshes, re-parented)."""
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=os.path.join(KIT, name + ".glb"))
    new = [o for o in bpy.data.objects if o not in before]
    bpy.context.view_layer.update()
    meshes = [o for o in new if o.type == "MESH"]
    pts = [o.matrix_world @ Vector(c) for o in meshes for c in o.bound_box]
    lo = Vector([min(p[i] for p in pts) for i in range(3)]); hi = Vector([max(p[i] for p in pts) for i in range(3)]); dim = hi - lo
    s = 1.0
    if height: s = height / max(dim.z, 1e-6)
    elif length: s = length / max(dim.x, dim.y, 1e-6)
    elif width: s = width / max(min(dim.x, dim.y), 1e-6)
    root = bpy.data.objects.new(name, None); bpy.context.scene.collection.objects.link(root)
    base = Vector(((lo.x + hi.x) / 2, (lo.y + hi.y) / 2, lo.z))
    for o in meshes:
        mw = o.matrix_world.copy(); o.parent = root; o.matrix_parent_inverse = Matrix.Identity(4)
        o.matrix_world = Matrix.Translation(-base) @ mw
        if rough is not None:
            for m in o.data.materials:
                if m and m.use_nodes and "Principled BSDF" in m.node_tree.nodes: m.node_tree.nodes["Principled BSDF"].inputs["Roughness"].default_value = rough
    for o in new:
        if o.type != "MESH": bpy.data.objects.remove(o)
    root.scale = (s, s, s); root.location = at; root.rotation_euler.z = math.radians(face)
    bpy.context.view_layer.update(); USED.add(name); root["dims"] = list(dim * s)
    return root


def part(root, frag):
    return next(o for o in root.children if frag.lower() in o.name.lower())


def recolor(root, mat, frag=None):
    for o in root.children_recursive:
        if o.type == "MESH" and (frag is None or frag.lower() in o.name.lower()):
            o.data.materials.clear(); o.data.materials.append(mat)


def credits_for(names=None):
    """the CC-BY credit lines for the models used (or the given names)."""
    cr = json.load(open(os.path.join(KIT, "credits.json")))
    names = set(names or USED)
    return sorted({f"{t} by {a} ({l})" for role, t, a, l, _ in cr if role in names and l.startswith("CC-BY")})


# ---------- Google Scanned Objects (1,033 photo-scanned household items, CC BY 4.0; user approved 2026-11-05) ----------
# The web-ready copies at huggingface.co/datasets/codepawl/scanned-objects-glb (real size in metres; meshopt geometry,
# which Blender 5.2 imports). Downloaded on first use into 02_kit/models/gso_<Name>.glb and credited in credits.json.
#   from lib3d import scanned, scanned_names
#   box = scanned("Clue_Board_Game_Classic_Edition", length=0.5, at=(x, y, 0))   # then clay_all(box, CLAY)
# The scans come from Gazebo (Z up): some import standing on a side (the Clue box: 0.26 m tall). Check dims; rotate if so.
GSO = "https://huggingface.co/datasets/codepawl/scanned-objects-glb/resolve/main/objects/{0}/{0}.glb"


def scanned_names():
    """every object name in the pack (needs the network once)."""
    import urllib.request
    d = json.load(urllib.request.urlopen("https://huggingface.co/api/datasets/codepawl/scanned-objects-glb"))
    return sorted({s["rfilename"].split("/")[1] for s in d["siblings"] if s["rfilename"].startswith("objects/")})


def scanned(name, **kw):
    """a scanned object as a library model (see model()); downloads it and adds its credit the first time."""
    import urllib.request
    key = "gso_" + name; path = os.path.join(KIT, key + ".glb")
    if not os.path.exists(path):
        urllib.request.urlretrieve(GSO.format(name), path)
        cp = os.path.join(KIT, "credits.json"); cr = json.load(open(cp))
        if not any(r[0] == key for r in cr):
            cr.append([key, name.replace("_", " "), "Google Research (Google Scanned Objects)", "CC-BY 4.0", GSO.format(name)])
            json.dump(cr, open(cp, "w"), indent=1)
    return model(key, **kw)

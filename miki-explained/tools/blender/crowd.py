"""Miki Explained 3D crowd: seated MPFB people (free MakeHuman bodies, CC0 clothes/hair), built once into the local kit and
instanced per seat. Pair with paperkit.halftone() + paperkit.ink_outline() for the printed look (EX00V6).

Build the people (needs the MPFB extension + makehuman_system_assets pack, see README in the episode skill):
    blender -b --python crowd.py -- build [sit|stand] [check]  → 02_kit/people/<name>.blend  (check: preview PNGs instead)
Use them in a shot:
    from crowd import load_person, seat, move
"""
import sys, math, bpy
from mathutils import Vector

KIT = "/Users/user/Private/miki-studio/miki-explained/02_kit/people/"
DATA = "/Users/user/Library/Application Support/Blender/5.2/extensions/.user/blender_org/mpfb/data/"

# nine seated people: macros, clothes, hair, pose, clay greys (skin, clothes, hair; linear)
PEOPLE = [
    dict(name="m30", gender=1.0, age=0.5, weight=0.5, race=(0.5, 0.3, 0.2), clothes="male_casualsuit02", hair="short02", pose="ahead", clay=(0.30, 0.16, 0.07)),
    dict(name="f40", gender=0.0, age=0.62, weight=0.6, race=(0.7, 0.2, 0.1), clothes="female_casualsuit01", hair="bob02", pose="side_glance", clay=(0.30, 0.42, 0.06)),
    dict(name="m20", gender=1.0, age=0.4, weight=0.45, race=(0.6, 0.1, 0.3), clothes="male_casualsuit04", hair="short04", pose="phone", clay=(0.28, 0.09, 0.05)),
    dict(name="f25", gender=0.0, age=0.42, weight=0.45, race=(0.4, 0.4, 0.2), clothes="female_casualsuit02", hair="ponytail01", pose="arms_crossed", clay=(0.30, 0.20, 0.08)),
    dict(name="m60", gender=1.0, age=0.85, weight=0.65, race=(0.6, 0.3, 0.1), clothes="male_worksuit01", hair="short01", pose="lean_back", clay=(0.27, 0.34, 0.10)),
    dict(name="m45", gender=1.0, age=0.7, weight=0.72, race=(0.7, 0.1, 0.2), clothes="male_casualsuit05", hair="short03", pose="head_in_hand", clay=(0.29, 0.24, 0.06)),
    dict(name="f60", gender=0.0, age=0.85, weight=0.6, race=(0.5, 0.4, 0.1), clothes="female_elegantsuit01", hair="bob01", pose="watch", clay=(0.29, 0.12, 0.22)),
    dict(name="m35", gender=1.0, age=0.55, weight=0.55, race=(0.3, 0.3, 0.4), clothes="male_casualsuit06", hair="short02", pose="knees_bow", clay=(0.26, 0.38, 0.05)),
    dict(name="f30", gender=0.0, age=0.5, weight=0.5, race=(0.6, 0.2, 0.2), clothes="female_sportsuit01", hair="long01", pose="phone", clay=(0.31, 0.14, 0.05)),
]

# eight standing people for queues (stand=True: no sitting bend)
STANDING = [
    dict(name="s_m30", stand=True, gender=1.0, age=0.5, weight=0.5, race=(0.6, 0.2, 0.2), clothes="male_casualsuit03", hair="short02", pose="s_pockets", clay=(0.30, 0.18, 0.07)),
    dict(name="s_f35", stand=True, gender=0.0, age=0.55, weight=0.55, race=(0.7, 0.2, 0.1), clothes="female_casualsuit01", hair="ponytail01", pose="s_phone", clay=(0.30, 0.38, 0.06)),
    dict(name="s_m50", stand=True, gender=1.0, age=0.75, weight=0.7, race=(0.4, 0.4, 0.2), clothes="male_worksuit01", hair="short01", pose="s_crossed", clay=(0.28, 0.12, 0.08)),
    dict(name="s_f25", stand=True, gender=0.0, age=0.42, weight=0.45, race=(0.5, 0.3, 0.2), clothes="female_sportsuit01", hair="long01", pose="s_lookup", clay=(0.31, 0.24, 0.05)),
    dict(name="s_m20", stand=True, gender=1.0, age=0.38, weight=0.45, race=(0.6, 0.1, 0.3), clothes="male_casualsuit04", hair="short04", pose="s_phone", clay=(0.29, 0.30, 0.05)),
    dict(name="s_f50", stand=True, gender=0.0, age=0.75, weight=0.62, race=(0.6, 0.3, 0.1), clothes="female_elegantsuit01", hair="bob02", pose="s_bag", clay=(0.29, 0.14, 0.20)),
    dict(name="s_m40", stand=True, gender=1.0, age=0.65, weight=0.6, race=(0.3, 0.5, 0.2), clothes="male_casualsuit06", hair="short03", pose="s_hip", clay=(0.27, 0.40, 0.06)),
    dict(name="s_f20", stand=True, gender=0.0, age=0.36, weight=0.42, race=(0.5, 0.2, 0.3), clothes="female_casualsuit02", hair="bob01", pose="s_side", clay=(0.30, 0.22, 0.07)),
]

# sitting: legs and spine as local rotations (X = the bone's bend, Y = its twist, i.e. a head turn) …
SIT = {"upperleg01.L": (-90, 0, 0), "upperleg01.R": (-90, 0, 0), "lowerleg01.L": (90, 0, 0), "lowerleg01.R": (90, 0, 0),
       "spine03": (8, 0, 0), "spine02": (6, 0, 0), "neck01": (8, 0, 0), "head": (6, 0, 0)}
# Ronald Read (EX20 rebuild): one older man, standing, in four candidate outfits (pick the work jacket)
RONALD = [dict(name="ron_%s" % c[-2:], stand=True, gender=1.0, age=0.88, weight=0.6, race=(0.15, 0.8, 0.05), clothes=c, hair="short01",
               pose="s_pockets", clay=(0.30, 0.18, 0.07)) for c in ("male_casualsuit03", "male_casualsuit04", "male_casualsuit05", "male_casualsuit06")]
# … per pose: extra rotations, and per side (upper arm, forearm) aimed at a rig-space direction (x = the figure's left, −y = forward, z = up)
def _both(up, low): return {"L": (up, low), "R": ((-up[0], up[1], up[2]), (-low[0], low[1], low[2]))}
_KNEES, _LAP = ((0.12, -0.3, -1), (-0.05, -1, -0.5)), ((0.08, -0.35, -1), (-0.45, -0.85, -0.3))
POSES = {
    "knees_bow": dict(rot={}, **_both(*_KNEES)),
    "ahead": dict(rot={"neck01": (-4, 0, 0), "head": (-4, 0, 0)}, **_both(*_KNEES)),
    "side_glance": dict(rot={"neck01": (0, 20, 0), "head": (-2, 18, 0)}, **_both(*_LAP)),
    "phone": dict(rot={"neck01": (22, 0, 0), "head": (18, 0, 0)}, **_both((0.1, -0.45, -1), (-0.4, -0.85, 0.35))),
    "arms_crossed": dict(rot={"neck01": (-2, 0, 0), "head": (-3, -6, 0)}, L=((0.2, -0.3, -1), (-1, -0.25, 0.2)), R=((-0.2, -0.3, -1), (1, -0.25, 0.3))),
    "lean_back": dict(rot={"spine03": (-6, 0, 0), "spine02": (-4, 0, 0), "neck01": (-2, 0, 0), "head": (-6, 8, 0)}, **_both((0.1, -0.15, -1), (0.0, -1, -0.6))),
    "head_in_hand": dict(rot={"spine03": (18, 0, 0), "neck01": (14, -8, 0), "head": (10, 0, 0)}, L=((0.15, -0.6, -0.8), (-0.05, -0.2, 1)), R=((-0.12, -0.3, -1), (0.05, -1, -0.5))),
    "watch": dict(rot={"neck01": (18, 10, 0), "head": (12, 6, 0)}, L=((0.15, -0.4, -1), (-0.7, -0.7, 0.25)), R=((-0.08, -0.35, -1), (0.45, -0.85, -0.3))),
}
# standing poses (no SIT): arms hang, fold, hold
_DOWN = ((0.08, 0.02, -1), (0.06, -0.12, -1))
POSES.update({
    "s_pockets": dict(rot={"neck01": (-2, 0, 0)}, **_both((0.12, 0.08, -1), (-0.15, -0.25, -1))),
    "s_phone": dict(rot={"neck01": (24, 0, 0), "head": (16, 0, 0)}, **_both((0.08, -0.2, -1), (-0.4, -0.85, 0.35))),
    "s_crossed": dict(rot={"neck01": (-3, 0, 0), "head": (-2, 8, 0)}, L=((0.2, -0.2, -1), (-1, -0.25, 0.25)), R=((-0.2, -0.2, -1), (1, -0.25, 0.32))),
    "s_lookup": dict(rot={"neck01": (-14, 0, 0), "head": (-10, -6, 0)}, **_both(*_DOWN)),
    "s_bag": dict(rot={"neck01": (2, 0, 0)}, L=((0.05, 0.0, -1), (0.0, -0.1, -1)), R=((-0.1, -0.35, -1), (0.6, -0.75, -0.15))),
    "s_hip": dict(rot={"neck01": (-2, 10, 0), "head": (0, 6, 0)}, L=((0.6, 0.1, -0.8), (-0.6, 0.0, -0.8)), R=((-0.08, 0.02, -1), (-0.06, -0.12, -1))),
    "s_side": dict(rot={"neck01": (0, -22, 0), "head": (-2, -14, 0)}, **_both(*_DOWN)),
})
CURL = {"phone": 25, "arms_crossed": 40, "s_phone": 25, "s_crossed": 40, "s_pockets": 70}                      # finger curl (deg per joint); default 35, a relaxed hand
HAIR = ("short", "bob", "ponytail", "braid", "afro", "long")


def aim(rig, name, d):
    """turn a pose bone (after its parents are posed) so its axis points along rig-space direction d."""
    bpy.context.view_layer.update(); pb = rig.pose.bones[name]; pb.rotation_mode = "QUATERNION"
    cur = pb.matrix.to_3x3().normalized(); q = cur.col[1].rotation_difference(Vector(d).normalized()).to_matrix()
    pb.rotation_quaternion = (pb.matrix_basis.to_3x3() @ (cur.inverted() @ q @ cur)).to_quaternion()


def build(p):
    """one person, seated, in a fresh scene; returns the rig."""
    from bl_ext.blender_org.mpfb.services.humanservice import HumanService
    bpy.ops.wm.read_factory_settings(use_empty=True)
    macro = dict(gender=p["gender"], age=p["age"], muscle=0.5, weight=p["weight"], proportions=0.5, height=0.5,
                 cupsize=0.5, firmness=0.5, race=dict(zip(("asian", "caucasian", "african"), p["race"])))
    body = HumanService.create_human(macro_detail_dict=macro)
    HumanService.add_builtin_rig(body, "default")
    for kind, asset in (("Clothes", "clothes/%s/%s.mhclo" % (p["clothes"], p["clothes"])), ("Clothes", "clothes/shoes02/shoes02.mhclo"),
                        ("Hair", "hair/%s/%s.mhclo" % (p["hair"], p["hair"]))):
        HumanService.add_mhclo_asset(DATA + asset, body, asset_type=kind, subdiv_levels=0)
    rig = body.parent
    P = POSES[p["pose"]]; rot = {} if p.get("stand") else dict(SIT)
    for b, r in P["rot"].items(): rot[b] = tuple(x + y for x, y in zip(rot.get(b, (0, 0, 0)), r))
    for b, r in rot.items():
        pb = rig.pose.bones[b]; pb.rotation_mode = "XYZ"; pb.rotation_euler = tuple(math.radians(v) for v in r)
    for side in ("L", "R"):
        up, low = P[side]; aim(rig, "upperarm01." + side, up); aim(rig, "lowerarm01." + side, low)
        for f in (2, 3, 4, 5):                                 # fingers curl in; the thumb stays
            for j in (1, 2, 3):
                pb = rig.pose.bones.get("finger%d-%d.%s" % (f, j, side))
                if pb: pb.rotation_mode = "XYZ"; pb.rotation_euler = (math.radians(CURL.get(p["pose"], 35) * (0.7 if j == 1 else 1)), 0, 0)
    rig.name = "rig " + p["name"]; body.name = "body " + p["name"]
    if p["pose"] in ("phone", "s_phone"): _phone(rig)
    _clay(rig, p["clay"])
    return rig


def _phone(rig):
    """a phone between the hands, its screen a faint cool glow."""
    bpy.context.view_layer.update()
    mid = (rig.matrix_world @ rig.pose.bones["wrist.L"].tail + rig.matrix_world @ rig.pose.bones["wrist.R"].tail) / 2
    bpy.ops.mesh.primitive_cube_add(size=1, location=mid + Vector((0, -0.02, 0.01))); ph = bpy.context.object; ph.name = "phone"
    ph.scale = (0.075, 0.009, 0.15); ph.rotation_euler = (math.radians(-55), 0, 0)
    m = bpy.data.materials.new("phone screen"); m.use_nodes = True; b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (0.02, 0.02, 0.02, 1); b.inputs["Emission Color"].default_value = (0.75, 0.85, 1, 1)
    b.inputs["Emission Strength"].default_value = 0.3; ph.data.materials.append(m)
    bpy.context.view_layer.update(); mw = ph.matrix_world.copy()
    ph.parent = rig; ph.parent_type = "BONE"; ph.parent_bone = "wrist.L"; ph.matrix_world = mw     # rides the hand when it moves


def _clay(rig, values):
    """flat grey clay per asset kind (skin, clothes, hair): the tone the halftone reads."""
    skin, cloth, hair = values
    for o in rig.children_recursive:
        if o.type != "MESH" or o.name == "phone": continue
        n = o.name.lower()
        v = hair if any(h in n for h in HAIR) else cloth * 0.55 if "shoe" in n else cloth if "suit" in n else skin
        m = bpy.data.materials.new("clay " + o.name); m.use_nodes = True; b = m.node_tree.nodes["Principled BSDF"]
        b.inputs["Base Color"].default_value = (v, v * 0.97, v * 0.92, 1); b.inputs["Roughness"].default_value = 0.85
        o.data.materials.clear(); o.data.materials.append(m)


# ---------- in a shot ----------
def load_person(name, scene=None, link=True):
    """append 02_kit/people/<name>.blend into a new collection; returns (collection, rig, hip point).
    Standing people (s_*) stand with their feet at z=0: use their collection with instance_offset = (hip.x, hip.y, 0).
    link=False keeps the collection out of the scene (use it as a prototype for seat(... instance=True))."""
    sc = scene or bpy.context.scene
    with bpy.data.libraries.load(KIT + name + ".blend") as (src, dst): dst.objects = list(src.objects)
    col = bpy.data.collections.new("person " + name)
    for o in dst.objects:
        if o.type not in ("CAMERA", "LIGHT"): col.objects.link(o)
    sc.collection.children.link(col); bpy.context.view_layer.update()
    rig = next(o for o in col.objects if o.type == "ARMATURE")
    hip = (rig.matrix_world @ rig.pose.bones["upperleg01.L"].head + rig.matrix_world @ rig.pose.bones["upperleg01.R"].head) / 2
    if not link: sc.collection.children.unlink(col)
    return col, rig, hip


def seat(proto, hip_at, turn=0.0, mirror=False, scene=None, name="seat"):
    """an instance of a prototype collection (load_person(link=False), with col.instance_offset = hip) sat with its hip at hip_at."""
    sc = scene or bpy.context.scene
    e = bpy.data.objects.new(name, None); e.instance_type = "COLLECTION"; e.instance_collection = proto
    sc.collection.objects.link(e); e.location = hip_at; e.rotation_euler = (0, 0, math.radians(turn))
    if mirror: e.scale.x = -1
    return e


def move(rig, bone, keys, axis=1):
    """key one bone's rotation: keys = [(frame, degrees), …] added on top of its pose; axis 0 = nod, 1 = turn (twist)."""
    pb = rig.pose.bones[bone]; pb.rotation_mode = "XYZ"; base = pb.rotation_euler.copy()
    for f, deg in keys:
        e = base.copy(); e[axis] += math.radians(deg); pb.rotation_euler = e; pb.keyframe_insert("rotation_euler", frame=f)
    pb.rotation_euler = base


def _check(p):
    sc = bpy.context.scene; sc.render.engine = "BLENDER_EEVEE"; sc.render.resolution_x, sc.render.resolution_y = 400, 400
    w = bpy.data.worlds.new("w"); sc.world = w; w.use_nodes = True; w.node_tree.nodes["Background"].inputs[0].default_value = (0.5, 0.5, 0.5, 1)
    bpy.ops.object.light_add(type="SUN"); bpy.context.object.rotation_euler = (0.8, 0.2, 0.5); bpy.context.object.data.energy = 3
    bpy.ops.object.camera_add(); cam = bpy.context.object; sc.camera = cam
    for i, az in enumerate((0, 90)):
        r = math.radians(az); cam.location = (2.4 * math.sin(r), -2.4 * math.cos(r), 1.0)
        cam.rotation_euler = (Vector((0, 0, 0.6)) - cam.location).to_track_quat("-Z", "Y").to_euler()
        sc.render.filepath = KIT + "check_%s_%d.png" % (p["name"], i); bpy.ops.render.render(write_still=True)


if __name__ == "__main__" and "--" in sys.argv and "build" in sys.argv[sys.argv.index("--") + 1:]:
    import os; os.makedirs(KIT, exist_ok=True)
    which = sys.argv[sys.argv.index("--") + 1:]
    for p in (RONALD if "ronald" in which else STANDING if "stand" in which else PEOPLE if "sit" in which else PEOPLE + STANDING):
        build(p)
        if "check" in sys.argv: _check(p)
        else: bpy.ops.wm.save_as_mainfile(filepath=KIT + p["name"] + ".blend")
        print("done", p["name"])

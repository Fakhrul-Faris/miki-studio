# EX20 "The Janitor Who Owned Everything" — v2 rebuild, round 2 (user review 2026-11-04): a still janitor with a slow
# push; no drive (the car is parked at home); he faces the camera and it orbits to the jacket pin; a real-speed walk with
# turns, a planted crouch and branches that stay on the ground until picked up; a doorway into the bank; a neat stack
# in an open drawer; complete buildings only; a nozzle and hose at the pump, a relaxed stand at night; Poly Haven
# textures + dusk HDRI. Real library models (02_kit/models, credits via lib3d), MPFB Ronald in a field jacket.
#   blender -b --python build/episode.py -- <out_dir> check | still f,f,… [half] | preview | (full render)
#   check = bake and save EX20_check.blend (open it, camera view, press play — no render)
# Earlier versions: build/episode_v1_primitive.py, build/episode_v2a.py.
import sys, os, math, json, random, bpy
from mathutils import Vector, Matrix
EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/"
sys.path.insert(0, EP + "../../tools/blender")
from isokit import setup, box, cyl, hexc, ease, span, back_out
from camkit import *
from lib3d import model, part, credits_for
from mpfbkit import Person
A = sys.argv[sys.argv.index("--") + 1:]; OUT = A[0]; CHECK = "check" in A
sc = setup(half="half" in A); FPS = 30; sc.render.fps = FPS
for o in [o for o in bpy.data.objects if o.type == "LIGHT"]: bpy.data.objects.remove(o)
engine("eevee", 32, fast=True)
VT = json.load(open(EP + "audio/vo_timeline.json")); VW = VT["words"]
def w(L, i): return VW[L][i][1]
def F(t): return int(round(t * FPS))
N = int(math.ceil(VT["end"] * FPS)); sc.frame_start, sc.frame_end = 0, N - 1
rnd = random.Random(20)
V = Vector

# ---------- materials (Poly Haven textures on the big surfaces) ----------
G = hexc("#57D100")
M = dict(ground=pbr("ground", "grass", 0.05, tint=(0.35, 0.38, 0.33, 1)), road=pbr("road", "asphalt", 0.25, tint=(0.55, 0.55, 0.58, 1)),
         line=paint("road line", hexc("#B8B2A2"), 0.6, 0.0), lino=pbr("lino", "lino", 0.6, tint=(0.85, 0.84, 0.8, 1)),
         wall=pbr("corridor wall", "plaster", 0.5, tint=(0.72, 0.7, 0.66, 1)), shelf=pbr("shelf", "wood", 1.0, tint=(0.6, 0.5, 0.42, 1)),
         box=paint("stock box", hexc("#9A7A52"), 0.8, 0.0), jacket=paint("field jacket", hexc("#4E5E6E"), 0.85, 0.0),
         skin=paint("skin", hexc("#C29A80"), 0.55, 0.0), hair=paint("grey hair", hexc("#A8A39A"), 0.8, 0.0),
         boots=paint("boots", hexc("#2A2420"), 0.6, 0.1), steel=metal("steel", hexc("#B4B8BE"), 0.2),
         brass=metal("brass", hexc("#C9A24A"), 0.3), paper=paint("certificate", hexc("#EFE7D2"), 0.65, 0.0),
         ink=paint("ink", hexc("#2E5E2A"), 0.6, 0.0), drawer=pbr("drawer metal", "metal", 1.5, tint=(0.62, 0.52, 0.36, 1)),
         vault=pbr("vault wall", "concrete", 0.4, tint=(0.6, 0.58, 0.54, 1)), tape=paint("tape", hexc("#E2B23A"), 0.5, 0.2),
         coin=metal("gold coin", hexc("#D9A93A"), 0.25), white=glow("label", hexc("#F4F1EA"), 1.4),
         plate=paint("label plate", hexc("#121418"), 0.6, 0.0), green=glow("own mark", G, 2.6), lines=glow("light line", G, 2.2),
         pulse=glow("pulse", hexc("#E9FFC8"), 9.0), smoke=paint("smoke", hexc("#8A8680"), 0.9, 0.0),
         black=paint("doorway dark", hexc("#050506"), 1.0, 0.0), hose=paint("hose", hexc("#1C1C1E"), 0.6, 0.2),
         nozzle=paint("nozzle", hexc("#2E8A3A"), 0.4, 0.3))

def gbox(name, x0, y0, x1, y1, h, m, z0=0.0, bevel=0.02): return box(name, x0, y0, x1, y1, h, m, z0=z0, bevel=bevel)
FONT = bpy.data.fonts.load(os.path.expanduser("~/Library/Fonts/InterDisplay-Black.ttf"))
def text(name, s, size, loc, m, rot=(math.pi / 2, 0, 0), extrude=0.0, align="CENTER"):
    bpy.ops.object.text_add(location=loc); o = bpy.context.object; o.name = name; o.data.body = s; o.data.size = size
    o.data.align_x = align; o.data.align_y = "CENTER"; o.data.extrude = extrude; o.rotation_euler = rot; o.data.font = FONT
    o.data.materials.append(m); return o
def _vis(o, f, hidden):
    for x in [o] + list(o.children_recursive):
        x.hide_render = hidden; x.keyframe_insert("hide_render", frame=f)
        x.hide_viewport = hidden; x.keyframe_insert("hide_viewport", frame=f)     # the check file plays in the viewport
def show(objs, f, on, d=12):
    """grow in / shrink out over d frames (user: no harsh cuts). f=0 sets the start state."""
    for o in objs:
        s0 = V(o.get("s0", list(o.scale) if o.scale.length > 1e-6 else [1, 1, 1])); o["s0"] = list(s0)
        if f == 0:
            o.scale = s0 if on else (0, 0, 0); o.keyframe_insert("scale", frame=0); _vis(o, 0, not on); continue
        if on:
            _vis(o, max(1, f - d), False)
            o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=max(1, f - d)); o.scale = s0 * 1.03; o.keyframe_insert("scale", frame=f); o.scale = s0; o.keyframe_insert("scale", frame=f + 4)
        else:
            o.scale = s0; o.keyframe_insert("scale", frame=max(1, f - d)); o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=f); _vis(o, f + 1, True)
def offcam(objs, f, on):
    """visibility switch for objects that are off camera at frame f."""
    for o in objs: _vis(o, f, not on)
def tube(name, a, b, r, m):
    a, b = V(a), V(b); d = b - a
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=d.length, location=(a + b) / 2, vertices=16)
    o = bpy.context.object; o.name = name; o.rotation_euler = d.to_track_quat("Z", "Y").to_euler(); o.data.materials.append(m); return o
def wbox(objs):
    bpy.context.view_layer.update(); pts = []
    for o in objs:
        for x in [o] + list(o.children_recursive):
            if x.type == "MESH": pts += [x.matrix_world @ V(c) for c in x.bound_box]
    return V([min(p[i] for p in pts) for i in range(3)]), V([max(p[i] for p in pts) for i in range(3)])
def face_to(a, b): return math.degrees(math.atan2(b.x - a.x, -(b.y - a.y)))     # MPFB facing: 0 = looking toward -y
def lerp_ang(a, b, k): d = (b - a + 180) % 360 - 180; return a + d * k

# ---------- word times ----------
T_DIED = w("L01", 10); T_L02 = w("L02", 0); T_PUMPED = w("L02", 6); T_LIFE = w("L02", 13); T_DROVE = w("L02", 15); T_TOYOTA = w("L02", 18)
T_HELD = w("L02", 19); T_PIN = w("L02", 26); T_GATHER = w("L02", 28); T_BRANCH = w("L02", 31); T_HOUSE = w("L02", 35)
T_L03 = w("L03", 0); T_RAIL = w("L03", 8); T_BANK = w("L03", 9); T_DRUG = w("L03", 10); T_PHONE = w("L03", 11); T_CASH = w("L03", 19)
T_L04 = w("L04", 0); T_95 = w("L04", 16); T_PAPER = w("L04", 19); T_5 = w("L04", 27)
T_L05 = w("L05", 0); T_OWNED = w("L05", 6); T_PIECE = w("L05", 10)
T_L06 = w("L06", 0); T_HOSP = w("L06", 8); T_LIB = w("L06", 15); T_BIGGEST = w("L06", 17)
T_L07 = w("L07", 0); T_QUIETLY = w("L07", 10); T_L08 = w("L08", 0)
# his moves at home (real speed: ~1.3 m/s; turns animated over 0.4 s)
T_TURN1 = T_PIN + 0.55; T_WALK1 = T_TURN1 + 0.4; T_AT_TREE = T_WALK1 + 1.9
T_BEND = T_AT_TREE + 0.05; T_PICK = T_BEND + 0.65; T_UP = T_PICK + 0.25; T_STOOD = T_UP + 0.55
T_TURN2 = T_STOOD; T_WALK2 = T_TURN2 + 0.4; T_AT_PILE = T_WALK2 + 1.6

# ---------- the town: ground, main road (along x), lamps, trees ----------
gbox("ground", -120, -120, 160, 120, 0.1, M["ground"], z0=-0.1, bevel=0.0)
gbox("main road", -120, -4, 160, 4, 0.02, M["road"], z0=0.0, bevel=0.0)
for x in range(-110, 160, 6): gbox("road line", x, -0.08, x + 3, 0.08, 0.005, M["line"], z0=0.02, bevel=0.0)
LAMPS = [model("street_light", height=6.5, at=(x, 5.2, 0)) for x in (-40, -8, 12, 52, 72)]
for x, y in ((-45, 16), (-6, 22), (60, 20), (75, -20), (-48, -22), (24, -32), (66, 34), (-30, 34), (84, 8), (-60, 6)):
    model("tree", height=rnd.uniform(5, 7.5), at=(x, y, 0), face=rnd.uniform(0, 360))

# ---------- 1. the department store: a back corridor (interior set) inside a real storefront ----------
STORE = model("pharmacy", height=9.0, at=(-22, 9.8, 0), face=90)          # "The Corner Store" (CC-BY)
C0, C1 = V((-30, 6.6, 0)), V((-14, 10.2, 0))
gbox("corridor floor", C0.x, C0.y, C1.x, C1.y, 0.02, M["lino"], z0=0.0, bevel=0.0)
for args in ((C0.x, C1.y, C1.x, C1.y + 0.2, 3.2), (C0.x - 0.2, C0.y, C0.x, C1.y, 3.2), (C1.x, C0.y, C1.x + 0.2, C1.y, 3.2),
             (C0.x, C0.y - 0.2, -23.0, C0.y, 3.2), (-21.0, C0.y - 0.2, C1.x, C0.y, 3.2)):
    gbox("corridor wall", *args, M["wall"])
gbox("corridor lintel", -23.0, C0.y - 0.2, -21.0, C0.y, 0.8, M["wall"], z0=2.4); gbox("corridor ceiling", C0.x, C0.y, C1.x, C1.y, 0.1, M["wall"], z0=3.2)
for x in (-29.4, -27.0, -18.6, -16.2):
    gbox("shelf", x, C1.y - 0.7, x + 2.0, C1.y - 0.05, 2.2, M["shelf"], bevel=0.01)
    for k in range(6): gbox("stock box", x + 0.1 + (k % 3) * 0.62, C1.y - 0.6, x + 0.6 + (k % 3) * 0.62, C1.y - 0.15, 0.4, M["box"], z0=0.45 + (k // 3) * 0.85)
gbox("corridor tube", -27, 8.2, -17, 8.5, 0.05, glow("tube", hexc("#E8F0F2"), 2.0), z0=3.12, bevel=0.0)
MOPKIT = model("mop_bucket", height=1.4, at=(-24.4, 8.8, 0), face=120)      # "Mop & Bucket" (CC-BY): bucket stays, the mop goes to his hands
MOP = part(MOPKIT, "Broom"); bpy.context.view_layer.update()
mw = MOP.matrix_world.copy(); MOP.parent = None; MOP.matrix_world = Matrix.Identity(4); MOP.data.transform(mw)
vz = [v.co.z for v in MOP.data.vertices]; z0_, z1_ = min(vz), max(vz)
low = [v.co for v in MOP.data.vertices if v.co.z < z0_ + 0.1]; foot = sum(low, V()) / len(low)
MOP.data.transform(Matrix.Translation(-V((foot.x, foot.y, z0_)))); MOP_LEN = z1_ - z0_      # origin at the mop head, axis = +z

# ---------- 2. the gas station across the road (one real model), the car at the pump ----------
GS = model("gas_station", height=8.2, at=(-20, -17, 0), face=0)            # "Gas Station" (CC-BY)
grass = [o for o in GS.children if o.name.startswith("Cube.001")][0]; GLO, GHI = wbox([grass]); GS.location.z -= GHI.z
PUMP = [o for o in GS.children if o.name.startswith("Cube.009")][0]; PLO, PHI = wbox([PUMP]); PUMP_P = (PLO + PHI) / 2; PUMP_P.z = 0
CAR = model("car_b", length=4.3, at=(PUMP_P.x + 2.6, PUMP_P.y + 0.6, 0), face=0)   # "Car" (Quaternius, CC0)
FILLER = V((CAR.location.x - 0.92, CAR.location.y + 1.25, 0.82))
ATT_P = V((PUMP_P.x + 1.1, PUMP_P.y - 0.2, 0))
NOZ = gbox("nozzle", -0.04, -0.12, 0.04, 0.12, 0.06, M["nozzle"], z0=-0.03, bevel=0.015)                     # a real-looking nozzle
SPOUT = tube("spout", (0, -0.12, 0), (0, -0.26, -0.04), 0.012, M["steel"]); SPOUT.parent = NOZ
GRIP = tube("grip", (0, 0.1, -0.02), (0, 0.04, -0.11), 0.016, M["hose"]); GRIP.parent = NOZ
bpy.ops.object.light_add(type="AREA", location=(PUMP_P.x + 1.5, PUMP_P.y, 5.8)); CANLIGHT = bpy.context.object
CANLIGHT.data.energy = 1500; CANLIGHT.data.size = 9; CANLIGHT.data.color = (0.95, 1.0, 1.0)
GASSIGN = text("gas sign", "GAS", 1.4, (PUMP_P.x - 1.0, PUMP_P.y - 6.5, 6.0), M["white"], extrude=0.05)

# ---------- 3–4. his house, the car parked in the drive, the tree with fallen branches, the wood pile ----------
HX, HY = 14.0, -18.0
HOUSE = model("farm_house", height=9.0, at=(HX, HY, 0), face=180)           # "Farm house" (CC-BY)
HLO, HHI = wbox([HOUSE])
DRIVE = V((HLO.x - 3.2, HHI.y + 2.0, 0))
CARH = model("car_b", length=4.3, at=(DRIVE.x, DRIVE.y, 0), face=0)
P0 = DRIVE + V((1.7, -0.6, 0))                                                 # he stands beside the parked car, facing the camera
PT = P0 + V((-2.2, -1.3, 0))                                                   # the fallen branches (2.5 m away)
PP = V((HLO.x - 0.9, HLO.y + 3.0, 0))                                          # the wood pile against the house side
TREE = model("tree", height=7.5, at=(PT.x - 1.4, PT.y - 1.6, 0), face=40)
BR = model("branches", length=1.6, at=(PT.x - 0.3, PT.y - 0.2, 0), face=15)  # "Tree branches" (CC-BY)
BRANCHES = list(BR.children); BLO, _ = wbox([BR]); BR.location.z -= BLO.z     # lying on the ground
PILE = model("wood_pile", height=1.1, at=(PP.x - 0.8, PP.y, 0), face=90)     # "Wood Pile" (CC-BY)

# ---------- 5. the companies: real buildings in a row across the road, labels facing the camera ----------
ROWY = 10.0
COMP = [("RAILROAD", model("train_station", height=6.5, at=(22, ROWY + 2, 0), face=180), 4.0),
        ("BANK", model("bank", height=10.0, at=(33, ROWY + 4, 0), face=180), 7.5),
        ("DRUGSTORE", model("store_bldg", height=8.0, at=(45, ROWY + 3, 0), face=180), 4.5),
        ("PHONE CO.", model("radio_tower", height=20.0, at=(55, ROWY + 4, 0), face=0), 14.0)]
model("rails", length=24, at=(22, ROWY - 1.8, 0.01), face=90)
def facing_label(name, s, loc, size=1.3):
    t = text(name, s, size, loc, M["white"], extrude=0.02)
    bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, 0)); pl = bpy.context.object; pl.name = name + " plate"
    pl.data.materials.append(M["plate"]); pl.parent = t; pl.matrix_parent_inverse = Matrix.Identity(4)
    pl.location = (0, 0, -0.03); pl.scale = (len(s) * size * 0.66 + size * 0.8, size * 1.6, 1)
    return t
LABELS = [facing_label(name + " label", name, (mdl.location.x, mdl.location.y - 1.0, h + 2.4)) for name, mdl, h in COMP]
def arc(name, a, b, h, depth, m):
    cu = bpy.data.curves.new(name, "CURVE"); cu.dimensions = "3D"; sp = cu.splines.new("POLY"); n = 32; sp.points.add(n - 1)
    for i, pt in enumerate(sp.points):
        t = i / (n - 1); q = a.lerp(b, t); q.z += h * math.sin(math.pi * t); pt.co = (q.x, q.y, q.z, 1)
    cu.bevel_depth = depth; cu.bevel_factor_mapping_start = "SPLINE"; cu.bevel_factor_mapping_end = "SPLINE"; cu.bevel_factor_end = 0.0
    o = bpy.data.objects.new(name, cu); sc.collection.objects.link(o); o.data.materials.append(m); return o
HOUSE_TOP = V((HX, HY, HHI.z + 0.6))
ARCS, COINS = [], []
for name, mdl, h in COMP:
    a = V((mdl.location.x, mdl.location.y - 1.5, h * 0.6)); ARCS.append(arc(name + " line", a, HOUSE_TOP, 5.0, 0.09, M["lines"]))
    cs = []
    for k in range(3):
        c = cyl("coin", 0, 0, 0.5, 0.12, M["coin"], z0=-0.06, verts=32, bevel=0.03); c.rotation_euler.x = math.pi / 2; cs.append(c)
    COINS.append((a, cs))

# ---------- 6. into the bank through its doorway; the vault: numbered boxes, an open drawer, a neat stack ----------
BANK = COMP[1][1]; BLO_, BHI_ = wbox([BANK]); BX = BANK.location.x; BFRONT = BLO_.y
VX, VY = BX, BFRONT + 5.8
TUN = [gbox("doorway L", BX - 1.3, BFRONT - 0.15, BX - 1.1, VY - 2.5, 3.0, M["black"], bevel=0.0),
       gbox("doorway R", BX + 1.1, BFRONT - 0.15, BX + 1.3, VY - 2.5, 3.0, M["black"], bevel=0.0),
       gbox("doorway top", BX - 1.3, BFRONT - 0.15, BX + 1.3, VY - 2.5, 0.2, M["black"], z0=3.0, bevel=0.0),
       gbox("doorway floor", BX - 1.3, BFRONT - 0.15, BX + 1.3, VY - 2.5, 0.02, M["black"], z0=0.0, bevel=0.0)]
VR = [gbox("vault floor", VX - 3, VY - 2.5, VX + 3, VY + 2.5, 0.02, M["vault"], z0=0.0, bevel=0.0),
      gbox("vault back", VX - 3, VY + 2.5, VX + 3, VY + 2.7, 3.2, M["vault"]),
      gbox("vault L", VX - 3.2, VY - 2.5, VX - 3, VY + 2.7, 3.2, M["vault"]), gbox("vault R", VX + 3, VY - 2.5, VX + 3.2, VY + 2.7, 3.2, M["vault"]),
      gbox("vault ceiling", VX - 3.2, VY - 2.7, VX + 3.2, VY + 2.7, 0.1, M["vault"], z0=3.2),
      gbox("vault front L", VX - 3.2, VY - 2.7, VX - 1.1, VY - 2.5, 3.2, M["vault"]), gbox("vault front R", VX + 1.1, VY - 2.7, VX + 3.2, VY - 2.5, 3.2, M["vault"]),
      gbox("vault lintel", VX - 1.1, VY - 2.7, VX + 1.1, VY - 2.5, 0.2, M["vault"], z0=3.0)]
DOORS = []
for r in range(6):
    for c in range(8):
        if (r, c) == (2, 3): continue                                         # this one is the drawer that slides out
        x = VX - 2.4 + c * 0.6; z = 0.55 + r * 0.42
        DOORS.append(gbox("box door", x, VY + 2.38, x + 0.56, VY + 2.5, 0.38, M["drawer"], z0=z, bevel=0.01))
        kn = cyl("keyhole", x + 0.28, VY + 2.37, 0.02, 0.02, M["brass"], z0=z + 0.17, verts=12, bevel=0.0); kn.rotation_euler.x = math.pi / 2; DOORS.append(kn)
        DOORS.append(text("box no", str(100 + r * 8 + c), 0.06, (x + 0.28, VY + 2.369, z + 0.3), M["brass"]))
DX, DZ = VX - 2.4 + 3 * 0.6 + 0.28, 0.55 + 2 * 0.42
DRAWER = bpy.data.objects.new("drawer", None); sc.collection.objects.link(DRAWER)    # an open tray: floor, sides, front face
TRAYP = [gbox("tray floor", DX - 0.26, VY + 0.9, DX + 0.26, VY + 2.4, 0.012, M["drawer"], z0=DZ, bevel=0.0),
         gbox("tray side", DX - 0.27, VY + 0.9, DX - 0.25, VY + 2.4, 0.16, M["drawer"], z0=DZ, bevel=0.0),
         gbox("tray side", DX + 0.25, VY + 0.9, DX + 0.27, VY + 2.4, 0.16, M["drawer"], z0=DZ, bevel=0.0),
         gbox("tray back", DX - 0.27, VY + 2.38, DX + 0.27, VY + 2.4, 0.16, M["drawer"], z0=DZ, bevel=0.0),
         gbox("tray front", DX - 0.28, VY + 0.88, DX + 0.28, VY + 0.92, 0.38, M["drawer"], z0=DZ - 0.1, bevel=0.01)]
kn = cyl("tray handle", DX, VY + 0.86, 0.03, 0.03, M["brass"], z0=DZ + 0.1, verts=16, bevel=0.005); kn.rotation_euler.x = math.pi / 2; TRAYP.append(kn)
TRAYP.append(text("tray no", "119", 0.06, (DX, VY + 0.875, DZ + 0.2), M["brass"]))
for o in TRAYP: o.parent = DRAWER
TABLE = gbox("vault table", DX - 0.7, VY - 1.1, DX + 0.7, VY + 0.3, DZ - 0.02, M["shelf"], z0=0.0, bevel=0.02)
LIDP = bpy.data.objects.new("lid hinge", None); sc.collection.objects.link(LIDP); LIDP.location = (DX, VY + 2.4, DZ + 0.16); LIDP.parent = DRAWER
LID = gbox("box lid", DX - 0.27, VY + 0.88, DX + 0.27, VY + 2.4, 0.012, M["drawer"], z0=DZ + 0.16, bevel=0.005)
bpy.context.view_layer.update(); LID.parent = LIDP; LID.matrix_parent_inverse = LIDP.matrix_world.inverted()
SY = VY - 0.15                                                                  # the stack's centre once the drawer is out
STACK0 = DZ + 0.012
CERTS = [gbox("certificate", DX - 0.22, SY - 0.15, DX + 0.22, SY + 0.15, 0.0033, M["paper"], z0=0.0, bevel=0.0) for k in range(38)]   # 38 × 3.35 mm ≈ 5 in
for k, c in enumerate(CERTS): c["z"] = STACK0 + k * 0.00335; c["rz"] = rnd.uniform(-0.025, 0.025)
CNAMES = ("RAILROAD CO.", "FIRST BANK", "DRUGSTORE INC.", "TELEPHONE CO.")
TOPCERTS = []
for k, nm in enumerate(CNAMES):
    sheet = gbox("cert top", -0.22, -0.15, 0.22, 0.15, 0.003, M["paper"], z0=0.0, bevel=0.0)
    for (bx0, by0, bx1, by1) in ((-0.2, -0.135, 0.2, -0.125), (-0.2, 0.125, 0.2, 0.135), (-0.205, -0.135, -0.195, 0.135), (0.195, -0.135, 0.205, 0.135)):
        b = gbox("cert border", bx0, by0, bx1, by1, 0.001, M["ink"], z0=0.003, bevel=0.0); b.parent = sheet
    t1 = text("cert title", "SHARE CERTIFICATE", 0.028, (0, 0.06, 0.0045), M["ink"], rot=(0, 0, 0)); t1.parent = sheet
    t2 = text("cert name", nm, 0.042, (0, -0.005, 0.0045), M["ink"], rot=(0, 0, 0)); t2.parent = sheet
    TOPCERTS.append(sheet)
TAPE = gbox("measuring tape", DX + 0.235, SY - 0.02, DX + 0.245, SY + 0.02, 0.127, M["tape"], z0=STACK0, bevel=0.0)
for k in range(6): gbox("tape tick", DX + 0.226, SY - 0.021, DX + 0.235, SY - 0.019, 0.0015, M["ink"], z0=STACK0 + k * 0.0254, bevel=0.0)
LAB95 = facing_label("95 label", "95 COMPANIES", (DX, SY, DZ + 0.62), size=0.085)
LAB5 = facing_label("5in label", "5 INCHES", (DX + 0.42, SY, DZ + 0.08), size=0.035)
VAULTSET = VR + DOORS + [DRAWER, TABLE, LID, TAPE] + CERTS

# ---------- 7. the town he owns: complete buildings only (instanced), a green mark on each roof ----------
KINDS = ("store_bldg", "kenney_big", "kenney_big2", "brown_bldg", "apartment")          # (the roofless cutaway "Shop"/"Store" are out)
PROTO = {}
for k in KINDS:
    col = bpy.data.collections.new("proto " + k)
    r = model(k, height={"apartment": 14}.get(k, 9), at=(0, 0, 0))
    for o in [r] + list(r.children):
        for uc in list(o.users_collection): uc.objects.unlink(o)
        col.objects.link(o)
    PROTO[k] = (col, r["dims"])
OWN, MARKS = [], []
while len(OWN) < 95:
    x, y = rnd.uniform(-90, 120), rnd.uniform(-80, 80)
    if abs(y) < 8: continue
    if (-36 < x < -6 and 3 < y < 18) or (-38 < x < -2 and -34 < y < -2) or (HLO.x - 8 < x < HHI.x + 4 and HLO.y - 4 < y < HHI.y + 6) or (14 < x < 62 and 4 < y < 22): continue
    if (-17 < x < 7 and 24 < y < 42) or (49 < x < 74 and 24 < y < 42): continue
    if any((x - o.location.x) ** 2 + (y - o.location.y) ** 2 < 80 for o in OWN): continue
    k = rnd.choice(KINDS); col, dims = PROTO[k]
    e = bpy.data.objects.new("owned " + k, None); e.instance_type = "COLLECTION"; e.instance_collection = col
    sc.collection.objects.link(e); e.location = (x, y, 0); e.rotation_euler.z = math.atan2(-y, -x) + math.pi / 2; OWN.append(e)
    MARKS.append(cyl("own mark", x, y, 1.3, 0.12, M["green"], z0=dims[2] + 0.8, verts=32, bevel=0.04))
HOSP = model("hospital", height=12, at=(-6, 32, 0), face=180)                 # "Hospital" (CC-BY)
LIBR = model("library", height=8, at=(61, 31, 0), face=180)                    # "Hall" (CC-BY) as the town library
HLAB = facing_label("hosp label", "HOSPITAL  $4.8M", (-6, 26, 16), size=1.6)
LLAB = facing_label("lib label", "LIBRARY  $1.2M", (61, 25, 12), size=1.6)
GIFT = []
for k in range(36):
    s = OWN[(k * 7) % 95].location.copy(); s.z = 6.0
    dst = V((-6, 30, 10)) if k % 2 == 0 else V((61, 29, 7)); h = 6 + (s - dst).length * 0.12
    GIFT.append((arc("gift line", s, dst, h, 0.08, M["lines"]), arc("gift pulse", s, dst, h, 0.18, M["pulse"]), k))
HLIGHT = []
for p_ in ((-6, 24, 6), (61, 24, 5)):
    bpy.ops.object.light_add(type="AREA", location=p_); L = bpy.context.object; L.data.size = 12; L.data.energy = 0.0
    L.data.color = (1.0, 0.85, 0.6); L.rotation_euler = (math.radians(-70), 0, 0); HLIGHT.append(L)

# ---------- people: Ronald (MPFB, field jacket), the same man in four places ----------
def ron(name): return Person("ron_05", M["skin"], M["jacket"], M["boots"], M["hair"], name=name)
JAN, ATT, HOME, END = ron("Ron in the corridor"), ron("Ron at the pump"), ron("Ron at home"), ron("Ron at the pump, night")
JAN_P = V((-25.5, 8.3, 0)); JAN_FACE = face_to(JAN_P, V((-23.2, 7.0, 0))) + 35      # three-quarter to the camera
JAN.place(0, (JAN_P.x, JAN_P.y), JAN_FACE); JAN.act(0, "mop", 0.0)               # a still pose (user: no mopping motion)
ATT.place(0, (ATT_P.x, ATT_P.y), face_to(ATT_P, FILLER)); ATT.act(0, "pump")
END_P = ATT_P + V((0.2, 0.5, 0)); END.place(0, (END_P.x, END_P.y), face_to(END_P, PUMP_P)); END.stand(0); END.arms("DOWN", 0)
PINSET = bpy.data.objects.new("pin", None); sc.collection.objects.link(PINSET)
for o in (tube("safety pin", (-0.06, 0, 0.05), (0.06, 0, -0.03), 0.006, M["steel"]), tube("pin bar", (-0.055, 0.004, 0.04), (0.05, 0.004, -0.032), 0.004, M["steel"]),
          cyl("pin head", 0.06, 0.004, 0.013, 0.012, M["steel"], z0=-0.04, verts=16, bevel=0.003)):
    o.parent = PINSET
bpy.context.view_layer.update()
# the still janitor's mop: from the floor ahead of him up through both hands
hm = (JAN.hand("L") + JAN.hand("R")) / 2; fwd = (JAN.rig.matrix_world.to_3x3() @ V((0, -1, 0))).normalized()
head = V((hm.x, hm.y, 0)) + V((fwd.x, fwd.y, 0)) * 0.45; dv = (hm - head).normalized() * 1.45
MOP.matrix_world = Matrix.Translation(head) @ dv.to_track_quat("Z", "Y").to_matrix().to_4x4() @ Matrix.Scale(1.45 / MOP_LEN, 4)
# the nozzle: in his right hand, spout into the car's filler; the hose sags from the pump
hr = ATT.hand("R"); NOZ.location = hr; NOZ.rotation_euler = (FILLER - hr).to_track_quat("-Y", "Z").to_euler()
cu = bpy.data.curves.new("hose", "CURVE"); cu.dimensions = "3D"; sp = cu.splines.new("BEZIER"); sp.bezier_points.add(2)
for bp, p_ in zip(sp.bezier_points, (V((PUMP_P.x + 0.35, PUMP_P.y, 1.2)), (V((PUMP_P.x + 0.7, PUMP_P.y - 0.1, 0.45))), hr + V((0, 0, -0.08)))):
    bp.co = p_; bp.handle_left_type = bp.handle_right_type = "AUTO"
cu.bevel_depth = 0.018; HOSE = bpy.data.objects.new("hose", cu); sc.collection.objects.link(HOSE); HOSE.data.materials.append(M["hose"])

# ---------- smoke from the chimney ----------
SMOKE = []
for k in range(8):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.4, location=(HX, HY, HHI.z)); s_ = bpy.context.object; s_.data.materials.append(M["smoke"]); SMOKE.append(s_)

# ---------- light: Poly Haven dusk HDRI for light, our gradient for the sky the camera sees; dusk → night ----------
HDRI, SKY = world_hdri(0.6)
bpy.ops.object.light_add(type="SUN"); SUN = bpy.context.object; SUN.data.color = (1.0, 0.85, 0.7); SUN.rotation_euler = (math.radians(74), 0, math.radians(-55)); SUN.data.angle = math.radians(6)
bpy.ops.object.light_add(type="AREA", location=(-22, 8.4, 3.0)); CT = bpy.context.object; CT.data.energy = 260; CT.data.size = 8; CT.data.color = (0.92, 0.98, 1.0)
for lp in LAMPS:
    bpy.ops.object.light_add(type="SPOT", location=lp.location + V((0, -0.6, 6.0))); L = bpy.context.object; L.data.energy = 900; L.data.spot_size = math.radians(80)
    L.data.color = (1.0, 0.75, 0.45); L.data.use_shadow = False
bpy.ops.object.light_add(type="POINT", location=(DRIVE.x + 2, DRIVE.y + 1, 2.4)); PORCH = bpy.context.object; PORCH.data.energy = 220; PORCH.data.color = (1.0, 0.8, 0.5); PORCH.data.use_shadow = False
bpy.ops.object.light_add(type="SPOT", location=(DX, SY - 0.3, DZ + 1.6)); VL = bpy.context.object; VL.data.energy = 180; VL.data.spot_size = math.radians(55); VL.data.color = (1.0, 0.86, 0.66)
sc.view_settings.exposure = 0.4
for fr_, e_, sk_, hd_ in ((0, 2.4, 0.7, 0.6), (F(T_L05), 1.6, 0.55, 0.45), (F(T_L06), 0.5, 0.3, 0.25), (F(T_L07), 0.12, 0.16, 0.12), (N - 1, 0.12, 0.16, 0.12)):
    SUN.data.energy = e_; SUN.data.keyframe_insert("energy", frame=fr_); SKY.default_value = sk_; SKY.keyframe_insert("default_value", frame=fr_)
    HDRI.default_value = hd_; HDRI.keyframe_insert("default_value", frame=fr_)

# ---------- motion ----------
WSPD = 1.3
FACE0 = face_to(P0, P0 + V((0, -1, 0)))                                         # facing the camera side (−y)
for fr in range(N):
    t = fr / FPS
    # 4. home: stands facing us (the orbit + pin), turns, walks at real speed, crouches with planted feet, picks up, turns, walks
    if T_HELD - 0.8 <= t <= T_AT_PILE + 0.6 or fr == 0:
        h1, h2 = face_to(P0, PT), face_to(PT, PP)
        if t < T_TURN1: pos, face, walk = P0, FACE0, 0.0
        elif t < T_WALK1: pos, face, walk = P0, lerp_ang(FACE0, h1, ease(span(t, T_TURN1, T_WALK1))), 0.0
        elif t < T_AT_TREE: pos, face, walk = P0.lerp(PT, span(t, T_WALK1, T_AT_TREE)), h1, 1.0
        elif t < T_TURN2: pos, face, walk = PT, h1, 0.0
        elif t < T_WALK2: pos, face, walk = PT, lerp_ang(h1, h2, ease(span(t, T_TURN2, T_WALK2))), 0.0
        elif t < T_AT_PILE: pos, face, walk = PT.lerp(PP, span(t, T_WALK2, T_AT_PILE)), h2, 1.0
        else: pos, face, walk = PP, h2, 0.0
        amp = walk * min(1.0, span(t, T_WALK1, T_WALK1 + 0.25) + span(t, T_WALK2, T_WALK2 + 0.25)) * (1 - span(t, T_AT_TREE - 0.2, T_AT_TREE)) if walk else 0.0
        bend = ease(span(t, T_BEND, T_PICK)) * (1 - ease(span(t, T_UP, T_STOOD)))
        HOME.place(fr, (pos.x, pos.y), face, z=-0.32 * bend)                       # hips lower; feet stay on the ground (knees bend below)
        if walk and amp > 0.01: HOME.walk(fr, t * WSPD / 0.65 * math.pi, amp, arms=t < T_PICK)
        else: HOME.stand(fr)
        P = HOME.rig.pose.bones
        for side in ("L", "R"):                                                  # a crouch: thighs forward, shins back, so the feet stay put
            bu = HOME.base["upperleg01." + side]; P["upperleg01." + side].rotation_euler = (P["upperleg01." + side].rotation_euler.x - math.radians(70) * bend, bu.y, bu.z)
            bl = HOME.base["lowerleg01." + side]; P["lowerleg01." + side].rotation_euler = (P["lowerleg01." + side].rotation_euler.x + math.radians(100) * bend, bl.y, bl.z)
            for bn in ("upperleg01." + side, "lowerleg01." + side): P[bn].keyframe_insert("rotation_euler", frame=fr)
        b = HOME.base["spine03"]; P["spine03"].rotation_euler = (b.x + math.radians(30) * bend, b.y, b.z); P["spine03"].keyframe_insert("rotation_euler", frame=fr)
        if t >= T_PICK: HOME.act(fr, "carry")
        elif bend > 0.01:
            HOME.arms("DOWN", fr)
        else: HOME.arms("DOWN", fr)
        bpy.context.view_layer.update()
        hmid = (HOME.hand("L") + HOME.hand("R")) / 2
        for k_, br in enumerate(BRANCHES):                                       # on the ground until his hands reach them
            if fr == 0 or t < T_PICK:
                br.keyframe_insert("location", frame=fr); br.keyframe_insert("rotation_euler", frame=fr)
            else:
                if br.parent: mw_ = br.matrix_world.copy(); br.parent = None; br.matrix_world = mw_
                br.location = hmid + V((0, 0, 0.04 + k_ * 0.025)); br.rotation_euler = (0, 0, math.radians(face + 90))
                br.keyframe_insert("location", frame=fr); br.keyframe_insert("rotation_euler", frame=fr)
        chest = HOME.rig.matrix_world @ HOME.rig.pose.bones["spine02"].tail                     # (MPFB numbers the spine top-down)
        fwd_ = (HOME.rig.matrix_world.to_3x3() @ V((0, -1, 0))).normalized()
        side_ = (HOME.rig.matrix_world.to_3x3() @ V((1, 0, 0))).normalized()
        PINSET.location = chest + fwd_ * 0.2 + side_ * 0.07 + V((0, 0, 0.05)); PINSET.rotation_euler.z = HOME.rig.rotation_euler.z
        PINSET.keyframe_insert("location", frame=fr); PINSET.keyframe_insert("rotation_euler", frame=fr)
    # smoke from the chimney
    for k_, s_ in enumerate(SMOKE):
        ph = ((t * 0.18 + k_ / len(SMOKE)) % 1.0)
        s_.location = (HX + 2.5 + 1.6 * ph, HY + 0.4 * ph, HHI.z + 4.0 * ph); s_.scale = ((0.5 + 1.6 * ph) * (1 - ph),) * 3
        s_.keyframe_insert("location", frame=fr); s_.keyframe_insert("scale", frame=fr)
    # 5. company lines draw on each word; coins travel each line once a "year"
    for i, ((name, mdl, h), ln, (a, cs)) in enumerate(zip(COMP, ARCS, COINS)):
        t0 = (T_RAIL, T_BANK, T_DRUG, T_PHONE)[i]
        ln.data.bevel_factor_end = ease(span(t, t0 + 0.2, t0 + 0.9)) * (1 - span(t, T_L04 + 2.0, T_L04 + 2.6)); ln.data.keyframe_insert("bevel_factor_end", frame=fr)
        for k_, c in enumerate(cs):
            on = T_CASH <= t < T_L04 + 2.0; ph = ((t - T_CASH + k_ * 0.6 + i * 0.25) % 1.8) / 1.8 if on else 0.0
            p_ = a.lerp(HOUSE_TOP, ph); p_.z += 5.0 * math.sin(math.pi * ph); c.location = p_
            c.rotation_euler.z = t * 3.0; c.scale = ((1.0 if 0.04 < ph < 0.96 else 0.0) if on else 0.0,) * 3
            c.keyframe_insert("location", frame=fr); c.keyframe_insert("scale", frame=fr); c.keyframe_insert("rotation_euler", frame=fr)
    # 6. the drawer slides out toward us, its lid swings open; the sheets land one by one, flat, into a neat 5-inch stack
    k = ease(span(t, T_95 - 0.8, T_95 + 0.2)); DRAWER.location.y = -1.5 * k; DRAWER.keyframe_insert("location", frame=fr)
    LIDP.rotation_euler.x = math.radians(105) * ease(span(t, T_95 + 0.3, T_95 + 1.0)); LIDP.keyframe_insert("rotation_euler", frame=fr)
    t_s0, t_s1 = T_PAPER - 0.4, T_5 + 0.3
    for i, c in enumerate(CERTS):
        tl = t_s0 + (t_s1 - t_s0) * i / len(CERTS)                               # the landing time of sheet i
        drop = 1 - ease(span(t, tl - 0.15, tl)); vis = 1.0 if t >= tl - 0.15 else 0.0
        c.location = (DX, SY, c["z"] + 0.0017 + 0.06 * drop); c.rotation_euler.z = c["rz"]; c.scale = (vis, vis, vis)
        c.keyframe_insert("location", frame=fr); c.keyframe_insert("scale", frame=fr)
    top_z = STACK0 + 0.00335 * len(CERTS)
    for i, sh_ in enumerate(TOPCERTS):
        tl = t_s1 + 0.05 + i * 0.12; fan = ease(span(t, tl, tl + 0.5)); fly = ease(span(t, T_OWNED - 0.2 + i * 0.1, T_OWNED + 1.0 + i * 0.1))
        vis = 1.0 if t >= tl - 0.1 else 0.0
        sh_.location = V((DX + (i - 1.5) * 0.04 * fan, SY - 0.03 * i * fan, top_z + 0.004 * i + 0.03 * fan)).lerp(V((DX + (i - 1.5) * 2, VY - 9, 6 + i)), fly)
        sh_.rotation_euler = (math.radians(-28) * fan, 0, math.radians(7 * (i - 1.5)) * fan); sh_.scale = (vis, vis, vis)
        sh_.keyframe_insert("location", frame=fr); sh_.keyframe_insert("rotation_euler", frame=fr); sh_.keyframe_insert("scale", frame=fr)
    # 7. the town he owns: green marks pop on
    for i, m_ in enumerate(MARKS):
        g = back_out(span(t, T_OWNED + 0.7 + i * 0.02, T_OWNED + 1.1 + i * 0.02)); m_.scale = (g, g, g); m_.keyframe_insert("scale", frame=fr)
    # 8. gifts: throbbing light lines to the hospital and the library
    for line, pulse, k_ in GIFT:
        t0 = (T_HOSP if k_ % 2 == 0 else T_LIB) - 0.9 + (k_ // 2) * 0.04; on = 1 - span(t, T_L07 - 1.2, T_L07 - 0.5)
        line.data.bevel_factor_end = ease(span(t, t0, t0 + 0.7)) * on; line.data.keyframe_insert("bevel_factor_end", frame=fr)
        ph = ((t - t0 - 0.7 + (k_ % 5) * 0.23) % 1.1) / 1.1 if t > t0 + 0.7 and on > 0.01 else -1.0
        streak(pulse, fr, ph * 1.25 if ph >= 0 else 0.0, 0.16)
for L, t0 in zip(HLIGHT, (T_HOSP, T_LIB)):
    L.data.energy = 0; L.data.keyframe_insert("energy", frame=0); L.data.keyframe_insert("energy", frame=F(t0) - 3)
    L.data.energy = 9000; L.data.keyframe_insert("energy", frame=F(t0) + 6)
CANLIGHT.data.keyframe_insert("energy", frame=F(T_QUIETLY) - 2); CANLIGHT.data.energy = 0; CANLIGHT.data.keyframe_insert("energy", frame=F(T_QUIETLY) + 4)
CT.data.keyframe_insert("energy", frame=F(T_DIED) - 6); CT.data.energy = 90; CT.data.keyframe_insert("energy", frame=F(T_DIED) + 10)

# ---------- visibility (offcam = only while off camera; show = animated in/out) ----------
offcam([STORE], 0, False); offcam([STORE], F(T_L02 + 0.9), True)
offcam([JAN.rig] + JAN.objects() + [MOP], 0, True); offcam([JAN.rig] + JAN.objects() + [MOP], F(T_L02 + 1.6), False)
offcam([ATT.rig] + ATT.objects() + [NOZ, HOSE, CAR], 0, True); offcam([ATT.rig] + ATT.objects() + [NOZ, HOSE, CAR], F(T_HELD + 0.5), False)
offcam([CARH], 0, False); offcam([CARH], F(T_DROVE), True)                       # (the camera is still at the pump, looking away)
offcam([END.rig] + END.objects(), 0, False); offcam([END.rig] + END.objects(), F(T_L07 - 1.0), True)
offcam([HOME.rig] + HOME.objects() + [PINSET], 0, False); offcam([HOME.rig] + HOME.objects() + [PINSET], F(T_DROVE), True)
offcam([HOME.rig] + HOME.objects() + [PINSET] + BRANCHES, F(T_L03 + 3.0), False)
for ln in ARCS: offcam([ln], 0, False); offcam([ln], F(T_RAIL) + 4, True); offcam([ln], F(T_L04 + 2.7), False)
for line, pulse, k_ in GIFT: offcam([line, pulse], 0, False); offcam([line, pulse], F(T_HOSP - 1.0), True); offcam([line, pulse], F(T_L07 - 0.4), False)
for i, e in enumerate(OWN): show([e], 0, False); show([e], F(T_OWNED + 0.3 + i * 0.02) + 10, True, d=10)
show(LABELS + [c for _, cs in COINS for c in cs], 0, False)
for i in range(4): show([LABELS[i]], F((T_RAIL, T_BANK, T_DRUG, T_PHONE)[i]) + 2, True); show([LABELS[i]], F(T_L04 + 2.0), False)
T_IN = T_L04 + 2.9                                                               # the camera is in the dark doorway
offcam(TUN, 0, True); offcam([BANK], 0, True); offcam([BANK], F(T_IN), False); offcam([BANK], F(T_OWNED + 1.3), True)
offcam(VAULTSET, 0, False); offcam(VAULTSET, F(T_IN - 1.0), True); offcam(VAULTSET + TUN, F(T_OWNED + 1.4), False)
show([LAB95, LAB5, HLAB, LLAB], 0, False)
show([LAB95], F(T_95) + 4, True); show([LAB95], F(T_L05), False); show([LAB5], F(T_5) + 6, True); show([LAB5], F(T_L05), False)
show([HLAB], F(T_HOSP) + 4, True); show([LLAB], F(T_LIB) + 4, True); show([HLAB, LLAB], F(T_L07), False)

# ---------- camera ----------
rig = PerspRig()
jan = JAN_P + V((0, 0, 1.15)); pump = ATT_P + V((0, 0, 1.3)); chest = P0 + V((0, 0, 1.38))
def orbit(a_deg, r, z=1.5):
    a = math.radians(a_deg); return P0 + V((math.sin(a) * r, -math.cos(a) * r, z))
ck = [(F(-1), V((-23.2, 7.0, 1.25)), jan, 35, 2.8), (0, V((-23.2, 7.0, 1.25)), jan, 35, 2.8),
      (F(T_DIED), V((-23.9, 7.4, 1.25)), jan, 42, 2.4),                                                  # 1 a slow push on the still janitor
      (F(T_L02 + 0.3), V((-22.0, 7.6, 1.5)), V((-22.0, 4.0, 1.3)), 32, 4.0),                             # 2 out through the door
      (F(T_L02 + 1.2), V((-22.0, 4.2, 1.6)), pump, 32, 4.0),
      (F(T_PUMPED + 0.4), V((ATT_P.x + 2.4, ATT_P.y - 4.4, 1.6)), pump + V((0.6, 0, 0)), 35, 4.0),       #   him at the pump in profile, nozzle in the car
      (F(T_LIFE + 0.2), V((ATT_P.x + 2.2, ATT_P.y - 4.0, 1.55)), pump + V((0.6, 0, 0)), 38, 4.0),
      (F(T_TOYOTA - 0.1), orbit(80, 4.5, 1.9), chest, 32, 4.0),                                         # 3 glide to the house: the car in the drive, him beside it
      (F(T_HELD), orbit(62, 3.0, 1.6), chest, 35, 3.2),                                                 #   orbit him to the front: the jacket
      (F(T_PIN - 0.4), orbit(18, 1.6, 1.5), chest, 42, 2.4),
      (F(T_PIN + 0.2), P0 + V((0.09, -0.8, 1.34)), P0 + V((0.07, -0.2, 1.32)), 55, 2.0),               #   ECU: the safety pin on his chest
      (F(T_TURN1 + 0.1), P0 + V((0.09, -0.84, 1.34)), P0 + V((0.07, -0.2, 1.32)), 55, 2.0),
      (F(T_WALK1 + 0.6), (P0 + PT) / 2 + V((1.6, -4.6, 1.8)), (P0 + PT) / 2 + V((0, 0, 1.0)), 35, 4.0),  # 4 follow him to the branches
      (F(T_BEND + 0.2), PT + V((1.4, -3.4, 1.5)), PT + V((0, 0, 0.7)), 38, 3.2),
      (F(T_STOOD + 0.2), PT + V((1.6, -3.6, 1.6)), PT + V((0, 0, 0.9)), 38, 3.2),
      (F(T_AT_PILE - 0.2), (PT + PP) / 2 + V((1.8, -4.2, 1.8)), (PT + PP) / 2 + V((0, 0, 1.0)), 35, 4.0),
      (F(T_CASH - 1.5), V((HX + 10, HY - 34, 26)), V((HX + 20, ROWY - 2, 4)), 26, 8.0),                 # 5 crane up: house + the companies
      (F(T_L04 + 1.0), V((HX + 11, HY - 36, 27)), V((HX + 20, ROWY - 2, 4)), 26, 8.0),
      (F(T_L04 + 2.2), V((BX, BFRONT - 7, 2.2)), V((BX, BFRONT, 1.9)), 28, 5.6),                        # 6 to the bank's doorway
      (F(T_IN), V((BX, BFRONT + 0.6, 1.8)), V((BX, VY, 1.6)), 28, 4.0),                                  #   through it (dark)
      (F(T_95 - 0.4), V((DX + 0.3, VY - 2.0, DZ + 0.5)), V((DX, VY + 0.6, DZ + 0.3)), 32, 2.8),          #   the drawer slides out
      (F(T_PAPER - 0.4), V((DX + 0.42, SY - 1.05, DZ + 0.55)), V((DX, SY, DZ + 0.08)), 45, 2.4),          #   the stack
      (F(T_5 + 0.6), V((DX + 0.46, SY - 0.9, DZ + 0.42)), V((DX, SY, DZ + 0.09)), 50, 2.2),
      (F(T_OWNED), V((DX + 0.42, SY - 1.05, DZ + 0.5)), V((DX, SY, DZ + 0.12)), 45, 2.4),
      (F(T_PIECE + 0.6), V((BX - 10, BFRONT - 60, 70)), V((20, 0, 0)), 24, 11.0),                        # 7 out and up: the town he owns
      (F(T_BIGGEST), V((27, -70, 62)), V((27, 22, 2)), 24, 11.0),                                         # 8 hospital + library
      (F(T_L07 + 0.9), V((END_P.x + 4.6, END_P.y + 5.6, 1.8)), END_P + V((0, 0, 1.3)), 35, 4.0),         # 9 back to the pumps, night
      (F(T_QUIETLY + 0.5), V((END_P.x + 4.1, END_P.y + 5.0, 1.7)), END_P + V((0, 0, 1.3)), 38, 4.0),
      (F(T_L08 + 2), V((END_P.x + 4.0, END_P.y + 4.9, 1.7)), END_P + V((0, 0, 1.3)), 38, 4.0)]
ck.sort(key=lambda k_: k_[0])
rig.keys(ck, drift=0.02)
for label in LABELS + [LAB95, LAB5, HLAB, LLAB, GASSIGN]:
    cns = label.constraints.new("TRACK_TO"); cns.target = rig.cam; cns.track_axis = "TRACK_Z"; cns.up_axis = "UP_Y"
for fr in range(N): rig.set(fr)
open(EP + "build/model_credits.txt", "w").write("3D models: " + "; ".join(credits_for()) + " — via Poly Pizza (CC BY 3.0); others CC0. Textures and sky: Poly Haven (CC0).\n")

# ---------- outputs ----------
if "debug" in A: exec(open("/private/tmp/claude-501/-Users-user-Private-miki-studio/e9841400-eb08-490d-93d9-b93fa86e76d7/scratchpad/dbg2.py").read()); raise SystemExit
if CHECK:                                                                         # the user scrubs this in Blender (no render)
    for scr in bpy.data.screens:
        for area in scr.areas:
            if area.type == "VIEW_3D":
                for sp_ in area.spaces:
                    if sp_.type == "VIEW_3D":
                        sp_.shading.type = "SOLID"; sp_.shading.color_type = "MATERIAL"; sp_.region_3d.view_perspective = "CAMERA"
                        sp_.overlay.show_overlays = False
    sc.frame_set(0); bpy.ops.wm.save_as_mainfile(filepath=EP + "EX20_check.blend", compress=True)
    print("check file:", EP + "EX20_check.blend"); raise SystemExit
if "preview" in A:
    from preview import preview; preview(EP + "out/preview.mp4", range(N), audio=EP + "audio/voice.wav"); raise SystemExit
if "still" in A:
    for fr in [int(x) for x in A[A.index("still") + 1].split(",")]:
        sc.frame_set(fr); sc.render.filepath = f"{OUT}/f_{fr:04d}.png"; bpy.ops.render.render(write_still=True)
    raise SystemExit
render_range(f"{OUT}/f_", 0, N - 1)

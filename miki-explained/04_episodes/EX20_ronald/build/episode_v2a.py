# EX20 "The Janitor Who Owned Everything" — v2 rebuild (user review 2026-11-04, nine fixes; "use any 3d model in the
# library … real physical 3D animation … go beyond me"). Real library models (02_kit/models, credits via lib3d),
# MPFB Ronald in a field jacket (02_kit/people/ron_05), one continuous camera, 30 fps, dusk → night.
#   blender -b --python build/episode.py -- <out_dir> animatic | preview | still f,f,… [half] | (full render)
# v1 (primitive town) is kept as build/episode_v1_primitive.py.
import sys, os, math, json, random, bpy
from mathutils import Vector, Matrix
EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/"
sys.path.insert(0, EP + "../../tools/blender")
from isokit import setup, box, cyl, hexc, ease, span, back_out, Path
from camkit import *
from lib3d import model, part, recolor, credits_for
from mpfbkit import Person
A = sys.argv[sys.argv.index("--") + 1:]; OUT = A[0]; ANIM = "animatic" in A
sc = setup(half=ANIM or "half" in A); FPS = 30; sc.render.fps = FPS
for o in [o for o in bpy.data.objects if o.type == "LIGHT"]: bpy.data.objects.remove(o)
VT = json.load(open(EP + "audio/vo_timeline.json")); VW = VT["words"]
def w(L, i): return VW[L][i][1]
def F(t): return int(round(t * FPS))
N = int(math.ceil(VT["end"] * FPS)); sc.frame_start, sc.frame_end = 0, N - 1
rnd = random.Random(20)
if ANIM:
    sc.render.engine = "BLENDER_WORKBENCH"; sh = sc.display.shading
    sh.light = "STUDIO"; sh.color_type = "MATERIAL"; sh.show_shadows = True; sh.show_cavity = True; sc.render.use_motion_blur = False
else:
    engine("eevee", 32, fast=True)
V = Vector

# ---------- materials ----------
G = hexc("#57D100")
M = dict(ground=paint("ground", hexc("#2C302A"), 0.9, 0.0), road=paint("road", hexc("#232428"), 0.85, 0.0),
         line=paint("road line", hexc("#B8B2A2"), 0.6, 0.0), lino=paint("lino", hexc("#9A958A"), 0.3, 0.5),
         wall=paint("corridor wall", hexc("#6E6A62"), 0.7, 0.0), shelf=paint("shelf", hexc("#3E3A36"), 0.6, 0.2),
         box=paint("stock box", hexc("#9A7A52"), 0.8, 0.0), jacket=paint("field jacket", hexc("#4E5E6E"), 0.85, 0.0),
         skin=paint("skin", hexc("#C29A80"), 0.55, 0.0), hair=paint("grey hair", hexc("#A8A39A"), 0.8, 0.0),
         boots=paint("boots", hexc("#2A2420"), 0.6, 0.1), steel=metal("steel", hexc("#B4B8BE"), 0.2),
         brass=metal("brass", hexc("#C9A24A"), 0.3), paper=paint("certificate", hexc("#EFE7D2"), 0.65, 0.0),
         ink=paint("ink", hexc("#2E5E2A"), 0.6, 0.0), drawer=metal("drawer metal", hexc("#8E7A5A"), 0.35),
         vault=paint("vault wall", hexc("#4A4640"), 0.7, 0.0), tape=paint("tape", hexc("#E2B23A"), 0.5, 0.2),
         coin=metal("gold coin", hexc("#D9A93A"), 0.25), white=glow("label", hexc("#F4F1EA"), 1.4),
         plate=paint("label plate", hexc("#121418"), 0.6, 0.0), green=glow("own mark", G, 2.6), lines=glow("light line", G, 2.2),
         pulse=glow("pulse", hexc("#E9FFC8"), 9.0), smoke=paint("smoke", hexc("#8A8680"), 0.9, 0.0))

def gbox(name, x0, y0, x1, y1, h, m, z0=0.0, bevel=0.02): return box(name, x0, y0, x1, y1, h, m, z0=z0, bevel=bevel)
FONT = bpy.data.fonts.load(os.path.expanduser("~/Library/Fonts/InterDisplay-Black.ttf"))
def text(name, s, size, loc, m, rot=(math.pi / 2, 0, 0), extrude=0.0, align="CENTER"):
    bpy.ops.object.text_add(location=loc); o = bpy.context.object; o.name = name; o.data.body = s; o.data.size = size
    o.data.align_x = align; o.data.align_y = "CENTER"; o.data.extrude = extrude; o.rotation_euler = rot; o.data.font = FONT
    o.data.materials.append(m); return o

def show(objs, f, on, d=12):
    """grow in / shrink out over d frames (user: no harsh cuts). f=0 sets the start state."""
    for o in objs:
        s0 = V(o.get("s0", list(o.scale) if o.scale.length > 1e-6 else [1, 1, 1])); o["s0"] = list(s0)
        if f == 0:
            o.scale = s0 if on else (0, 0, 0); o.keyframe_insert("scale", frame=0)
            for x in [o] + list(o.children_recursive): x.hide_render = not on; x.keyframe_insert("hide_render", frame=0)
            continue
        if on:
            for x in [o] + list(o.children_recursive): x.hide_render = False; x.keyframe_insert("hide_render", frame=max(1, f - d))
            o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=max(1, f - d)); o.scale = s0 * 1.03; o.keyframe_insert("scale", frame=f); o.scale = s0; o.keyframe_insert("scale", frame=f + 4)
        else:
            o.scale = s0; o.keyframe_insert("scale", frame=max(1, f - d)); o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=f)
            for x in [o] + list(o.children_recursive): x.hide_render = True; x.keyframe_insert("hide_render", frame=f + 1)
def offcam(objs, f, on):
    """visibility switch for objects that are off camera at frame f."""
    for o in objs:
        for x in [o] + list(o.children_recursive): x.hide_render = not on; x.keyframe_insert("hide_render", frame=f)
def tube(name, a, b, r, m):
    a, b = V(a), V(b); d = b - a
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=d.length, location=(a + b) / 2, vertices=16)
    o = bpy.context.object; o.name = name; o.rotation_euler = d.to_track_quat("Z", "Y").to_euler(); o.data.materials.append(m); return o
def wbox(o):
    bpy.context.view_layer.update(); pts = [o.matrix_world @ V(c) for c in o.bound_box]
    return V([min(p[i] for p in pts) for i in range(3)]), V([max(p[i] for p in pts) for i in range(3)])

# ---------- word times ----------
T_DIED = w("L01", 10); T_L02 = w("L02", 0); T_PUMPED = w("L02", 6); T_DROVE = w("L02", 15); T_TOYOTA = w("L02", 18)
T_HELD = w("L02", 19); T_PIN = w("L02", 26); T_GATHER = w("L02", 28); T_BRANCH = w("L02", 31); T_HOUSE = w("L02", 35)
T_L03 = w("L03", 0); T_RAIL = w("L03", 8); T_BANK = w("L03", 9); T_DRUG = w("L03", 10); T_PHONE = w("L03", 11); T_CASH = w("L03", 19)
T_L04 = w("L04", 0); T_KEPT = w("L04", 7); T_95 = w("L04", 16); T_PAPER = w("L04", 19); T_BOX = w("L04", 25); T_5 = w("L04", 27)
T_L05 = w("L05", 0); T_OWNED = w("L05", 6); T_PIECE = w("L05", 10)
T_L06 = w("L06", 0); T_HOSP = w("L06", 8); T_LIB = w("L06", 15); T_BIGGEST = w("L06", 17)
T_L07 = w("L07", 0); T_QUIETLY = w("L07", 10); T_L08 = w("L08", 0)

# ---------- the town: ground, main road (along x), lamps, trees ----------
gbox("ground", -120, -120, 160, 120, 0.1, M["ground"], z0=-0.1, bevel=0.0)
gbox("main road", -120, -4, 160, 4, 0.02, M["road"], z0=0.0, bevel=0.0)
for x in range(-110, 160, 6): gbox("road line", x, -0.08, x + 3, 0.08, 0.005, M["line"], z0=0.02, bevel=0.0)
LAMPS = [model("street_light", height=6.5, at=(x, 5.2, 0)) for x in (-40, -8, 12, 52, 72)]
TREES = [model("tree", height=rnd.uniform(5, 7.5), at=(x, y, 0), face=rnd.uniform(0, 360)) for x, y in
         ((-45, 16), (-6, 22), (60, 20), (75, -20), (-48, -22), (12, -30), (66, 34), (-30, 34), (84, 8), (-60, 6))]

# ---------- 1. the department store: a back corridor (interior set) inside a real storefront ----------
STORE = model("pharmacy", height=9.0, at=(-22, 9.8, 0), face=90)          # "The Corner Store" (CC-BY)
C0, C1 = V((-30, 6.6, 0)), V((-14, 10.2, 0))
gbox("corridor floor", C0.x, C0.y, C1.x, C1.y, 0.02, M["lino"], z0=0.0, bevel=0.0)
CORR = [gbox("corridor back", C0.x, C1.y, C1.x, C1.y + 0.2, 3.2, M["wall"]),
        gbox("corridor L", C0.x - 0.2, C0.y, C0.x, C1.y, 3.2, M["wall"]), gbox("corridor R", C1.x, C0.y, C1.x + 0.2, C1.y, 3.2, M["wall"]),
        gbox("corridor front L", C0.x, C0.y - 0.2, -23.0, C0.y, 3.2, M["wall"]), gbox("corridor front R", -21.0, C0.y - 0.2, C1.x, C0.y, 3.2, M["wall"]),
        gbox("corridor lintel", -23.0, C0.y - 0.2, -21.0, C0.y, 0.8, M["wall"], z0=2.4), gbox("corridor ceiling", C0.x, C0.y, C1.x, C1.y, 0.1, M["wall"], z0=3.2)]
for x in (-29.4, -27.0, -18.6, -16.2):                                       # stock shelves with boxes: a store's back room
    gbox("shelf", x, C1.y - 0.7, x + 2.0, C1.y - 0.05, 2.2, M["shelf"], bevel=0.01)
    for k in range(6): gbox("stock box", x + 0.1 + (k % 3) * 0.62, C1.y - 0.6, x + 0.6 + (k % 3) * 0.62, C1.y - 0.15, 0.4, M["box"], z0=0.45 + (k // 3) * 0.85)
gbox("corridor tube", -27, 8.2, -17, 8.5, 0.05, glow("tube", hexc("#E8F0F2"), 2.0), z0=3.12, bevel=0.0)
MOPKIT = model("mop_bucket", height=1.4, at=(-24.3, 8.9, 0), face=120)      # "Mop & Bucket" (CC-BY): the bucket stays, the mop goes to his hands
MOP = part(MOPKIT, "Broom"); bpy.context.view_layer.update()
mw = MOP.matrix_world.copy(); MOP.parent = None; MOP.matrix_world = Matrix.Identity(4); MOP.data.transform(mw)   # bake into world space
vz = [v.co.z for v in MOP.data.vertices]; z0_, z1_ = min(vz), max(vz)
low = [v.co for v in MOP.data.vertices if v.co.z < z0_ + 0.1]; foot = sum(low, V()) / len(low)
MOP.data.transform(Matrix.Translation(-V((foot.x, foot.y, z0_)))); MOP_LEN = z1_ - z0_      # origin at the mop head, axis = +z

# ---------- 2. the gas station across the road (one real model) ----------
GS = model("gas_station", height=8.2, at=(-20, -17, 0), face=0)            # "Gas Station" (CC-BY)
grass = [o for o in GS.children if o.name.startswith("Cube.001")][0]; GLO, GHI = wbox(grass)
GS.location.z -= GHI.z                                                         # its forecourt level = our ground level
PUMP = [o for o in GS.children if o.name.startswith("Cube.009")][0]; PLO, PHI = wbox(PUMP); PUMP_P = (PLO + PHI) / 2
CAR = model("car_b", length=4.3, at=(PUMP_P.x + 2.4, PUMP_P.y, 0), face=0)  # "Car" (Quaternius, CC0)
WHEELS = [o for o in CAR.children if "Wheel" in o.name]
bpy.ops.object.light_add(type="AREA", location=(PUMP_P.x + 1.5, PUMP_P.y, 5.8)); CANLIGHT = bpy.context.object
CANLIGHT.data.energy = 1500; CANLIGHT.data.size = 9; CANLIGHT.data.color = (0.95, 1.0, 1.0)
GASSIGN = text("gas sign", "GAS", 1.4, (PUMP_P.x - 1.0, PUMP_P.y - 6.5, 6.0), M["white"], extrude=0.05)

# ---------- 3–4. his house, the tree with fallen branches, the wood pile ----------
HX, HY = 34.0, -16.0
HOUSE = model("farm_house", height=9.0, at=(HX, HY, 0), face=180)           # "Farm house" (CC-BY)
DRIVE = V((HX - 9.5, HY + 7.0, 0))
TREE = model("tree", height=7.5, at=(HX + 11, HY + 3, 0), face=40)
BR = model("branches", length=1.7, at=(HX + 10.2, HY + 4.4, 0.02), face=15)  # "Tree branches" (CC-BY): four separate branches
BRANCHES = list(BR.children)
PILE = model("wood_pile", height=1.1, at=(HX + 6.5, HY - 2.5, 0), face=90)   # "Wood Pile" (CC-BY)

# ---------- 5. the companies: real buildings in a row behind the road, labels facing the camera ----------
ROWY = 10.0
COMP = [("RAILROAD", model("train_station", height=6.5, at=(20, ROWY + 2, 0), face=180), 4.0),
        ("BANK", model("bank", height=10.0, at=(31, ROWY + 4, 0), face=180), 7.5),
        ("DRUGSTORE", model("store_bldg", height=8.0, at=(43, ROWY + 3, 0), face=180), 4.5),
        ("PHONE CO.", model("radio_tower", height=20.0, at=(53, ROWY + 4, 0), face=0), 14.0)]
RAILS = model("rails", length=24, at=(20, ROWY - 1.8, 0.01), face=90)
def facing_label(name, s, loc, size=1.3):
    t = text(name, s, size, loc, M["white"], extrude=0.02)
    bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, 0)); pl = bpy.context.object; pl.name = name + " plate"
    pl.data.materials.append(M["plate"]); pl.parent = t; pl.matrix_parent_inverse = Matrix.Identity(4)
    pl.location = (0, 0, -0.03); pl.rotation_euler = (0, 0, 0); pl.scale = (len(s) * size * 0.66 + size * 0.8, size * 1.6, 1)
    return t
LABELS = [facing_label(name + " label", name, (mdl.location.x, mdl.location.y - 1.0, h + 2.4)) for name, mdl, h in COMP]
def arc(name, a, b, h, depth, m):
    cu = bpy.data.curves.new(name, "CURVE"); cu.dimensions = "3D"; sp = cu.splines.new("POLY"); n = 32; sp.points.add(n - 1)
    for i, pt in enumerate(sp.points):
        t = i / (n - 1); q = a.lerp(b, t); q.z += h * math.sin(math.pi * t); pt.co = (q.x, q.y, q.z, 1)
    cu.bevel_depth = depth; cu.bevel_factor_mapping_start = "SPLINE"; cu.bevel_factor_mapping_end = "SPLINE"; cu.bevel_factor_end = 0.0
    o = bpy.data.objects.new(name, cu); sc.collection.objects.link(o); o.data.materials.append(m); return o
HOUSE_TOP = V((HX, HY, 9.5))
ARCS, COINS = [], []
for name, mdl, h in COMP:
    a = V((mdl.location.x, mdl.location.y - 1.5, h * 0.6)); ARCS.append(arc(name + " line", a, HOUSE_TOP, 4.0, 0.09, M["lines"]))
    cs = []
    for k in range(3):
        c = cyl("coin", 0, 0, 0.5, 0.12, M["coin"], z0=-0.06, verts=32, bevel=0.03); c.rotation_euler.x = math.pi / 2; cs.append(c)
    COINS.append((a, cs))

# ---------- 6. the vault inside the bank: a wall of numbered boxes, one drawer slides out, the stack grows ----------
BANK = COMP[1][1]; BX = BANK.location.x; BYF = BANK.location.y - 3.4
VX, VY = BX, BANK.location.y + 1.0
VR = [gbox("vault floor", VX - 3, VY - 2.5, VX + 3, VY + 2.5, 0.02, M["vault"], z0=0.0, bevel=0.0),
      gbox("vault back", VX - 3, VY + 2.5, VX + 3, VY + 2.7, 3.2, M["vault"]),
      gbox("vault L", VX - 3.2, VY - 2.5, VX - 3, VY + 2.7, 3.2, M["vault"]), gbox("vault R", VX + 3, VY - 2.5, VX + 3.2, VY + 2.7, 3.2, M["vault"]),
      gbox("vault ceiling", VX - 3.2, VY - 2.7, VX + 3.2, VY + 2.7, 0.1, M["vault"], z0=3.2),
      gbox("vault front L", VX - 3.2, VY - 2.7, VX - 0.8, VY - 2.5, 3.2, M["vault"]), gbox("vault front R", VX + 0.8, VY - 2.7, VX + 3.2, VY - 2.5, 3.2, M["vault"]),
      gbox("vault lintel", VX - 0.8, VY - 2.7, VX + 0.8, VY - 2.5, 0.9, M["vault"], z0=2.3)]
DOORS = []
for r in range(6):
    for c in range(8):
        x = VX - 2.4 + c * 0.6; z = 0.55 + r * 0.42
        DOORS.append(gbox("box door", x, VY + 2.38, x + 0.56, VY + 2.5, 0.38, M["drawer"], z0=z, bevel=0.01))
        kn = cyl("keyhole", x + 0.28, VY + 2.37, 0.02, 0.02, M["brass"], z0=z + 0.17, verts=12, bevel=0.0); kn.rotation_euler.x = math.pi / 2; DOORS.append(kn)
        DOORS.append(text("box no", str(100 + r * 8 + c), 0.06, (x + 0.28, VY + 2.369, z + 0.3), M["brass"]))
DX, DZ = VX - 2.4 + 3 * 0.6 + 0.28, 0.55 + 2 * 0.42
DRAWER = gbox("drawer", DX - 0.26, VY + 0.9, DX + 0.26, VY + 2.4, 0.3, M["drawer"], z0=DZ, bevel=0.01)       # pulls out toward the camera
TABLE = gbox("vault table", DX - 0.7, VY - 0.95, DX + 0.7, VY + 0.25, DZ - 0.02, M["shelf"], z0=0.0, bevel=0.02)   # the drawer slides out onto it
BX0, BY0, BZ0 = DX, VY + 0.15 - 1.5 + 0.75 - 0.75, DZ + 0.3                                       # where the open drawer's top ends up
LIDP = bpy.data.objects.new("lid hinge", None); sc.collection.objects.link(LIDP); LIDP.location = (DX, VY + 0.88, DZ + 0.3); LIDP.parent = DRAWER
LIDP.matrix_parent_inverse = DRAWER.matrix_world.inverted()
LID = gbox("box lid", DX - 0.26, VY - 0.6, DX + 0.26, VY + 0.9, 0.02, M["drawer"], z0=DZ + 0.3, bevel=0.01)
bpy.context.view_layer.update(); LID.parent = LIDP; LID.matrix_parent_inverse = LIDP.matrix_world.inverted()
TRAY = LIDP
CERTS = []
for k in range(36):                                                          # 36 sheets × 3.5 mm ≈ 5 inches (12.7 cm)
    c = gbox("certificate", DX - 0.22, VY - 0.45, DX + 0.22, VY - 0.15, 0.003, M["paper"], z0=DZ + 0.04 + k * 0.0035, bevel=0.0)
    c.rotation_euler.z = rnd.uniform(-0.05, 0.05); CERTS.append(c)
CNAMES = ("RAILROAD CO.", "FIRST BANK", "DRUGSTORE INC.", "TELEPHONE CO.")
TOPCERTS = []
for k, nm in enumerate(CNAMES):                                              # the top four fan up with readable titles
    sheet = gbox("cert top", -0.27, -0.17, 0.27, 0.17, 0.003, M["paper"], z0=0.0, bevel=0.0)
    for (bx0, by0, bx1, by1) in ((-0.25, -0.155, 0.25, -0.145), (-0.25, 0.145, 0.25, 0.155), (-0.255, -0.155, -0.245, 0.155), (0.245, -0.155, 0.255, 0.155)):
        b = gbox("cert border", bx0, by0, bx1, by1, 0.001, M["ink"], z0=0.003, bevel=0.0); b.parent = sheet
    t1 = text("cert title", "SHARE CERTIFICATE", 0.034, (0, 0.07, 0.0045), M["ink"], rot=(0, 0, 0)); t1.parent = sheet
    t2 = text("cert name", nm, 0.05, (0, 0.0, 0.0045), M["ink"], rot=(0, 0, 0)); t2.parent = sheet
    sheet.location = (DX, VY - 0.3, DZ + 0.17 + k * 0.004); TOPCERTS.append(sheet)
TAPE = gbox("measuring tape", DX + 0.3, VY - 0.32, DX + 0.34, VY - 0.28, 0.127, M["tape"], z0=DZ + 0.04, bevel=0.0)
for k in range(6): gbox("tape tick", DX + 0.275, VY - 0.321, DX + 0.3, VY - 0.319, 0.002, M["ink"], z0=DZ + 0.04 + k * 0.0254, bevel=0.0)
LAB95 = facing_label("95 label", "95 COMPANIES", (DX, VY - 0.3, DZ + 0.62), size=0.09)
LAB5 = facing_label("5in label", "5 INCHES", (DX + 0.55, VY - 0.3, DZ + 0.12), size=0.04)
VAULTSET = VR + DOORS + [DRAWER, TABLE, LID, TAPE] + CERTS

# ---------- 7. the town he owns: real buildings (instanced), a green mark on each roof ----------
KINDS = ("store_bldg", "kenney_big", "kenney_big2", "brown_bldg", "apartment", "shop", "store_dept")
PROTO = {}
for k in KINDS:
    col = bpy.data.collections.new("proto " + k)
    r = model(k, height={"apartment": 14, "store_dept": 5, "shop": 6}.get(k, 9), at=(0, 0, 0))
    for o in [r] + list(r.children):
        for uc in list(o.users_collection): uc.objects.unlink(o)
        col.objects.link(o)
    PROTO[k] = (col, r["dims"])
OWN, MARKS = [], []
while len(OWN) < 95:
    x, y = rnd.uniform(-90, 120), rnd.uniform(-80, 80)
    if abs(y) < 8: continue
    if (-36 < x < -6 and 3 < y < 18) or (-38 < x < -2 and -34 < y < -2) or (18 < x < 50 and -28 < y < -3) or (12 < x < 60 and 4 < y < 22): continue
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
JAN, ATT, HOME, END = ron("Ron mopping"), ron("Ron at the pump"), ron("Ron at home"), ron("Ron at the pump, night")
JAN.place(0, (-25.5, 8.3), 75)
ATT.place(0, (PUMP_P.x + 0.9, PUMP_P.y - 0.4), 90)
END.place(0, (PUMP_P.x + 0.9, PUMP_P.y - 0.4), 90)
PINSET = bpy.data.objects.new("pin", None); sc.collection.objects.link(PINSET)
for o in (tube("safety pin", (-0.06, 0, 0.05), (0.06, 0, -0.03), 0.006, M["steel"]), tube("pin bar", (-0.055, 0.004, 0.04), (0.05, 0.004, -0.032), 0.004, M["steel"]),
          cyl("pin head", 0.06, 0.004, 0.013, 0.012, M["steel"], z0=-0.04, verts=16, bevel=0.003)):
    o.parent = PINSET

# ---------- smoke from the chimney (the wood stove is on) ----------
SMOKE = []
for k in range(8):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.4, location=(HX + 2.5, HY - 1.0, 10)); s_ = bpy.context.object
    s_.data.materials.append(M["smoke"]); SMOKE.append(s_)

# ---------- light: dusk → night ----------
wd = sc.world; wd.use_nodes = True; wn = wd.node_tree; wn.nodes.clear()
out = wn.nodes.new("ShaderNodeOutputWorld"); bg = wn.nodes.new("ShaderNodeBackground"); grad = wn.nodes.new("ShaderNodeValToRGB")
tc = wn.nodes.new("ShaderNodeTexCoord"); sep = wn.nodes.new("ShaderNodeSeparateXYZ"); mr = wn.nodes.new("ShaderNodeMapRange")
mr.inputs["From Min"].default_value = -0.05; mr.inputs["From Max"].default_value = 0.5
wn.links.new(tc.outputs["Normal"], sep.inputs[0]); wn.links.new(sep.outputs["Z"], mr.inputs["Value"]); wn.links.new(mr.outputs[0], grad.inputs[0])
grad.color_ramp.elements[0].color = hexc("#C89A82"); grad.color_ramp.elements[1].color = hexc("#2A3A60"); grad.color_ramp.elements[1].position = 0.45
wn.links.new(grad.outputs[0], bg.inputs[0]); wn.links.new(bg.outputs[0], out.inputs[0]); SKY = bg.inputs[1]
bpy.ops.object.light_add(type="SUN"); SUN = bpy.context.object; SUN.data.color = (1.0, 0.85, 0.7); SUN.rotation_euler = (math.radians(74), 0, math.radians(-55)); SUN.data.angle = math.radians(6)
bpy.ops.object.light_add(type="AREA", location=(-22, 8.4, 3.0)); CT = bpy.context.object; CT.data.energy = 260; CT.data.size = 8; CT.data.color = (0.92, 0.98, 1.0)
for lp in LAMPS:
    bpy.ops.object.light_add(type="SPOT", location=lp.location + V((0, -0.6, 6.0))); L = bpy.context.object; L.data.energy = 900; L.data.spot_size = math.radians(80)
    L.data.color = (1.0, 0.75, 0.45); L.data.use_shadow = False
bpy.ops.object.light_add(type="POINT", location=(HX - 3, HY + 6, 2.2)); PORCH = bpy.context.object; PORCH.data.energy = 200; PORCH.data.color = (1.0, 0.8, 0.5); PORCH.data.use_shadow = False
bpy.ops.object.light_add(type="SPOT", location=(VX, VY - 0.4, 3.0)); VL = bpy.context.object; VL.data.energy = 220; VL.data.spot_size = math.radians(60); VL.data.color = (1.0, 0.86, 0.66)
if not ANIM: sc.view_settings.exposure = 0.4
for fr_, e_, sk_ in ((0, 2.4, 0.7), (F(T_L05), 1.6, 0.55), (F(T_L06), 0.5, 0.3), (F(T_L07), 0.12, 0.16), (N - 1, 0.12, 0.16)):
    SUN.data.energy = e_; SUN.data.keyframe_insert("energy", frame=fr_); SKY.default_value = sk_; SKY.keyframe_insert("default_value", frame=fr_)

# ---------- motion ----------
CAR0 = CAR.location.copy()
DRIVE_PATH = Path([(CAR0.x, CAR0.y), (CAR0.x + 2, -6.0), (CAR0.x + 9, -2.0), (DRIVE.x - 8, -2.0), (DRIVE.x - 1.5, -2.5), (DRIVE.x, DRIVE.y)], r=3.0)
T_GO, T_PARK = T_DROVE - 0.3, T_HELD - 0.2
def car_at(t):
    s = DRIVE_PATH.LEN * ease(span(t, T_GO, T_PARK)); q, d = DRIVE_PATH.at(s); return q, d, s
P0 = DRIVE + V((1.6, -1.4, 0)); PT = V((HX + 10.4, HY + 4.9, 0)); PP = V((HX + 6.6, HY - 1.4, 0))
def hdg(a, b): d = b - a; return math.degrees(math.atan2(d.y, d.x)) + 90
for fr in range(N):
    t = fr / FPS
    # 1. mopping, side-on to the camera, both hands on the handle, the head sweeping a short arc
    if t <= T_L02 + 1.5 or fr == 0:
        ph = t * 2.6; JAN.act(fr, "mop", ph)
        hand = (JAN.hand("L") + JAN.hand("R")) / 2
        sweep = V((math.cos(math.radians(-15)), math.sin(math.radians(-15)), 0))
        head = V((-25.5, 8.3, 0)) + V((0.55, -0.35, 0)) + sweep * 0.32 * math.sin(ph); head.z = 0.0
        dv = hand - head; MOP.matrix_world = Matrix.Translation(head) @ dv.to_track_quat("Z", "Y").to_matrix().to_4x4() @ Matrix.Scale(dv.length / MOP_LEN, 4)
        MOP.keyframe_insert("location", frame=fr); MOP.keyframe_insert("rotation_euler", frame=fr); MOP.keyframe_insert("scale", frame=fr)
    # 2. at the pump
    if t <= T_DROVE + 1.0 or fr == 0: ATT.act(fr, "pump")
    if t >= T_L07 - 1.0 or fr == 0: END.act(fr, "pump")
    # 3. the car drives from the pump to his drive; wheels turn
    q, d, s = car_at(t)
    CAR.location = (q.x, q.y, 0)
    if T_GO < t < T_PARK + 0.1: CAR.rotation_euler.z = math.atan2(d.y, d.x) - math.pi / 2
    CAR.keyframe_insert("location", frame=fr); CAR.keyframe_insert("rotation_euler", frame=fr)
    for wh in WHEELS: wh.rotation_euler.x = -s / 0.27; wh.keyframe_insert("rotation_euler", frame=fr)
    # 4. home: by the car (the pin close-up), walks to the tree, bends and gathers the fallen branches, carries them to the pile
    if T_HELD - 0.6 <= t <= T_L03 + 1.0 or fr == 0:
        if t < T_GATHER: pos, face, walk = P0, 15, 0.0
        elif t < T_BRANCH - 0.2: pos, face, walk = P0.lerp(PT, ease(span(t, T_GATHER, T_BRANCH - 0.2))), hdg(P0, PT), 1.0
        elif t < T_HOUSE + 0.3: pos, face, walk = PT, 160, 0.0
        else: pos, face, walk = PT.lerp(PP, ease(span(t, T_HOUSE + 0.3, T_L03 + 0.9))), hdg(PT, PP), 1.0
        HOME.place(fr, (pos.x, pos.y), face); HOME.walk(fr, t * 6.5, walk, arms=walk > 0 and t < T_BRANCH)
        P = HOME.rig.pose.bones; bend = math.sin(math.pi * span(t, T_BRANCH - 0.1, T_HOUSE + 0.3))
        b = HOME.base["spine03"]; P["spine03"].rotation_euler = (b.x + math.radians(55) * bend, b.y, b.z); P["spine03"].keyframe_insert("rotation_euler", frame=fr)
        for side in ("L", "R"):
            bl = HOME.base["lowerleg01." + side]; P["lowerleg01." + side].rotation_euler = (bl.x + math.radians(35) * bend, bl.y, bl.z)
            P["lowerleg01." + side].keyframe_insert("rotation_euler", frame=fr)
        if t >= T_BRANCH: HOME.act(fr, "carry")
        hm = (HOME.hand("L") + HOME.hand("R")) / 2
        for k_, br in enumerate(BRANCHES):
            if t >= T_BRANCH + 0.35:
                if br.parent: mw_ = br.matrix_world.copy(); br.parent = None; br.matrix_world = mw_
                br.location = hm + V((0, 0, 0.05 + k_ * 0.03)); br.keyframe_insert("location", frame=fr)
        chest = HOME.rig.matrix_world @ HOME.rig.pose.bones["spine03"].tail
        fwd = (HOME.rig.matrix_world.to_3x3() @ V((0, -1, 0))).normalized()
        PINSET.location = chest + fwd * 0.16 + V((0, 0, -0.06)); PINSET.rotation_euler.z = HOME.rig.rotation_euler.z
        PINSET.keyframe_insert("location", frame=fr); PINSET.keyframe_insert("rotation_euler", frame=fr)
    # smoke from the chimney
    for k_, s_ in enumerate(SMOKE):
        ph = ((t * 0.18 + k_ / len(SMOKE)) % 1.0)
        s_.location = (HX + 2.5 + 1.6 * ph, HY - 1.0 + 0.4 * ph, 10.0 + 4.0 * ph); s_.scale = ((0.5 + 1.6 * ph) * (1 - ph),) * 3
        s_.keyframe_insert("location", frame=fr); s_.keyframe_insert("scale", frame=fr)
    # 5. company lines draw on each word; coins travel each line once a "year"
    for i, ((name, mdl, h), ln, (a, cs)) in enumerate(zip(COMP, ARCS, COINS)):
        t0 = (T_RAIL, T_BANK, T_DRUG, T_PHONE)[i]
        ln.data.bevel_factor_end = ease(span(t, t0 + 0.2, t0 + 0.9)) * (1 - span(t, T_L04 + 2.0, T_L04 + 2.6)); ln.data.keyframe_insert("bevel_factor_end", frame=fr)
        for k_, c in enumerate(cs):
            on = T_CASH <= t < T_L04 + 2.0; ph = ((t - T_CASH + k_ * 0.6 + i * 0.25) % 1.8) / 1.8 if on else 0.0
            p_ = a.lerp(HOUSE_TOP, ph); p_.z += 4.0 * math.sin(math.pi * ph); c.location = p_
            c.rotation_euler.z = t * 3.0; c.scale = ((1.0 if 0.04 < ph < 0.96 else 0.0) if on else 0.0,) * 3
            c.keyframe_insert("location", frame=fr); c.keyframe_insert("scale", frame=fr); c.keyframe_insert("rotation_euler", frame=fr)
    # 6. the vault: the drawer slides out toward us, the lid opens, the stack grows, the top certificates fan up, then fly out
    k = ease(span(t, T_95 - 0.8, T_95 + 0.2)); DRAWER.location.y = -1.5 * k; DRAWER.keyframe_insert("location", frame=fr)
    LIDP.rotation_euler.x = -1.9 * ease(span(t, T_95 + 0.3, T_95 + 1.0)); LIDP.keyframe_insert("rotation_euler", frame=fr)   # opens up and back
    grow = ease(span(t, T_PAPER - 0.3, T_5 + 0.4))
    for i, c in enumerate(CERTS):
        on = 1.0 if i < 2 or i / len(CERTS) <= grow else 0.0; c.scale = (on, on, on); c.keyframe_insert("scale", frame=fr)
    top_z = DZ + 0.04 + 0.127 * max(grow, 0.06)
    for i, sh_ in enumerate(TOPCERTS):
        fan = ease(span(t, T_PAPER + 0.2 + i * 0.15, T_PAPER + 0.9 + i * 0.15)); fly = ease(span(t, T_OWNED - 0.2 + i * 0.1, T_OWNED + 1.0 + i * 0.1))
        sh_.location = V((DX + (i - 1.5) * 0.05 * fan, VY - 0.3 - 0.02 * i, top_z + 0.01 + i * 0.006 + 0.05 * fan)).lerp(V((DX + (i - 1.5) * 2, VY - 9, 6 + i)), fly)
        sh_.rotation_euler = (math.radians(-35) * fan, math.radians(6 * (i - 1.5)) * fan, math.radians(8 * (i - 1.5)) * fan)
        sh_.keyframe_insert("location", frame=fr); sh_.keyframe_insert("rotation_euler", frame=fr)
    # 7. the town he owns: green marks pop on
    for i, m_ in enumerate(MARKS):
        g = back_out(span(t, T_OWNED + 0.7 + i * 0.02, T_OWNED + 1.1 + i * 0.02)); m_.scale = (g, g, g); m_.keyframe_insert("scale", frame=fr)
        if fr == F(T_OWNED + 0.6 + i * 0.02): m_.hide_render = False; m_.keyframe_insert("hide_render", frame=fr)
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
offcam([ATT.rig] + ATT.objects(), 0, True); offcam([ATT.rig] + ATT.objects(), F(T_TOYOTA + 0.6), False)
offcam([END.rig] + END.objects(), 0, False); offcam([END.rig] + END.objects(), F(T_L07 - 1.0), True)
offcam([HOME.rig] + HOME.objects() + [PINSET], 0, False); offcam([HOME.rig] + HOME.objects() + [PINSET], F(T_HELD - 0.6), True)
offcam([HOME.rig] + HOME.objects() + [PINSET], F(T_L03 + 1.2), False)
offcam([JAN.rig] + JAN.objects() + [MOP], 0, True); offcam([JAN.rig] + JAN.objects() + [MOP], F(T_L02 + 1.6), False)
show(LABELS + [c for _, cs in COINS for c in cs], 0, False)
for i in range(4): show([LABELS[i]], F((T_RAIL, T_BANK, T_DRUG, T_PHONE)[i]) + 2, True); show([LABELS[i]], F(T_L04 + 2.4), False)
offcam([BANK], 0, True); offcam([BANK], F(T_L04 + 3.4), False); offcam([BANK], F(T_OWNED + 1.3), True)
offcam(VAULTSET + TOPCERTS, 0, False); offcam(VAULTSET + TOPCERTS, F(T_L04 + 2.8), True); offcam(VAULTSET, F(T_OWNED + 1.4), False)
offcam(TOPCERTS, F(T_PIECE + 0.6), False)
show([LAB95, LAB5, HLAB, LLAB], 0, False)
show([LAB95], F(T_95) + 4, True); show([LAB95], F(T_L05), False); show([LAB5], F(T_5) + 2, True); show([LAB5], F(T_L05), False)
show([HLAB], F(T_HOSP) + 4, True); show([LLAB], F(T_LIB) + 4, True); show([HLAB, LLAB], F(T_L07), False)

for ln in ARCS: offcam([ln], 0, False); offcam([ln], F(T_RAIL) + 4, True); offcam([ln], F(T_L04 + 2.7), False)
for line, pulse, k_ in GIFT: offcam([line, pulse], 0, False); offcam([line, pulse], F(T_HOSP - 1.0), True); offcam([line, pulse], F(T_L07 - 0.4), False)
# 3) the town he owns appears on "He owned one" (it cluttered every earlier wide shot)
for i, e in enumerate(OWN): show([e], 0, False); show([e], F(T_OWNED + 0.3 + i * 0.02) + 10, True, d=10)
show(MARKS, 0, False)

# ---------- camera ----------
rig = PerspRig()
jan = V((-25.5, 8.3, 1.15)); pumpman = V((PUMP_P.x + 0.9, PUMP_P.y - 0.4, 1.3))
ck = [(F(-1), V((-23.2, 7.0, 1.2)), jan, 35, 2.8), (0, V((-23.2, 7.0, 1.2)), jan, 35, 2.8),
      (F(T_DIED), V((-23.9, 7.4, 1.25)), jan + V((0, 0, -0.1)), 40, 2.4),
      (F(T_L02 + 0.3), V((-22.0, 7.6, 1.5)), V((-22.0, 4.0, 1.3)), 32, 4.0),
      (F(T_L02 + 1.2), V((-22.0, 4.2, 1.6)), pumpman, 32, 4.0),
      (F(T_PUMPED + 0.4), V((PUMP_P.x + 6.5, PUMP_P.y + 6.5, 1.8)), pumpman, 35, 4.0),
      (F(T_DROVE - 0.2), V((PUMP_P.x + 6.2, PUMP_P.y + 5.4, 1.7)), pumpman, 38, 4.0)]
for k in range(1, 9):
    t = T_GO + (T_PARK - T_GO) * k / 8; q, d, _ = car_at(t)
    ck.append((F(t), V((q.x - d.x * 7 - d.y * 4, q.y - d.y * 7 + d.x * 4, 2.6)), V((q.x, q.y, 0.9)), 32, 5.6))
ck += [(F(T_PIN - 0.5), P0 + V((0.3, -1.4, 1.45)), P0 + V((0.0, 0, 1.35)), 50, 2.0),
       (F(T_PIN + 0.5), P0 + V((0.32, -1.36, 1.45)), P0 + V((0.0, 0, 1.35)), 50, 2.0),
       (F(T_GATHER + 0.4), V((HX + 6, HY + 11.5, 2.2)), V((HX + 8.5, HY + 5.2, 1.0)), 32, 4.0),
       (F(T_BRANCH + 0.2), V((HX + 7.5, HY + 10.2, 1.9)), V((HX + 10.2, HY + 4.9, 0.8)), 35, 4.0),
       (F(T_HOUSE + 0.4), V((HX + 7.8, HY + 9.8, 1.8)), V((HX + 10.0, HY + 4.6, 0.7)), 35, 4.0),
       (F(T_L03 + 1.4), V((HX - 2, HY - 34, 24)), V((HX + 2, ROWY, 4)), 26, 8.0),
       (F(T_CASH + 0.5), V((HX - 1, HY - 36, 26)), V((HX + 2, ROWY - 2, 4)), 26, 8.0),
       (F(T_L04 + 2.0), V((BX, BYF - 12, 4)), V((BX, BYF, 3)), 28, 5.6),
       (F(T_L04 + 3.0), V((BX, BYF + 0.5, 1.8)), V((VX, VY + 2.4, 1.3)), 28, 4.0),
       (F(T_95 - 0.4), V((DX + 0.3, VY - 2.0, DZ + 0.5)), V((DX, VY + 0.6, DZ + 0.3)), 32, 2.8),
       (F(T_PAPER - 0.4), V((DX + 0.45, VY - 1.35, DZ + 0.6)), V((DX, VY - 0.3, DZ + 0.15)), 45, 2.4),
       (F(T_5 + 0.6), V((DX + 0.5, VY - 1.15, DZ + 0.45)), V((DX, VY - 0.3, DZ + 0.16)), 50, 2.2),
       (F(T_OWNED), V((DX + 0.45, VY - 1.35, DZ + 0.55)), V((DX, VY - 0.3, DZ + 0.2)), 45, 2.4),
       (F(T_PIECE + 0.6), V((BX - 10, BYF - 60, 70)), V((20, 0, 0)), 24, 11.0),
       (F(T_BIGGEST), V((27, -70, 62)), V((27, 22, 2)), 24, 11.0),
       (F(T_L07 + 0.9), V((PUMP_P.x + 7, PUMP_P.y + 7, 2.0)), pumpman, 35, 4.0),
       (F(T_QUIETLY + 0.5), V((PUMP_P.x + 6, PUMP_P.y + 6.2, 1.8)), pumpman, 38, 4.0),
       (F(T_L08 + 2), V((PUMP_P.x + 5.8, PUMP_P.y + 6.0, 1.8)), pumpman, 38, 4.0)]
ck.sort(key=lambda k_: k_[0])
rig.keys(ck, drift=0.025)
for label in LABELS + [LAB95, LAB5, HLAB, LLAB, GASSIGN]:
    cns = label.constraints.new("TRACK_TO"); cns.target = rig.cam; cns.track_axis = "TRACK_Z"; cns.up_axis = "UP_Y"
for fr in range(N): rig.set(fr)

open(EP + "build/model_credits.txt", "w").write("3D models: " + "; ".join(credits_for()) + " — via Poly Pizza (CC BY 3.0); others CC0.\n")

# ---------- render ----------
if "debug" in A: exec(open("/private/tmp/claude-501/-Users-user-Private-miki-studio/e9841400-eb08-490d-93d9-b93fa86e76d7/scratchpad/dbg.py").read()); raise SystemExit
if ANIM and "still" in A:
    for fr in [int(x) for x in A[A.index("still") + 1].split(",")]:
        sc.frame_set(fr); sc.render.filepath = f"{OUT}/s_{fr:04d}.png"; bpy.ops.render.render(write_still=True)
    raise SystemExit
if ANIM:
    sh.use_dof = True; render_range(f"{OUT}/a_", 0, N - 1)
    import subprocess
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", str(FPS), "-i", f"{OUT}/a_%04d.png", "-i", EP + "audio/voice.wav",
                    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "24", "-c:a", "aac", "-shortest", EP + "out/animatic.mp4"], check=True)
    print("animatic:", EP + "out/animatic.mp4"); raise SystemExit
if "preview" in A:
    from preview import preview; preview(EP + "out/preview.mp4", range(N), audio=EP + "audio/voice.wav"); raise SystemExit
if "still" in A:
    for fr in [int(x) for x in A[A.index("still") + 1].split(",")]:
        sc.frame_set(fr); sc.render.filepath = f"{OUT}/f_{fr:04d}.png"; bpy.ops.render.render(write_still=True)
    raise SystemExit
render_range(f"{OUT}/f_", 0, N - 1)

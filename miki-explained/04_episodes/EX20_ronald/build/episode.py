# EX20 "The Janitor Who Owned Everything" — v4: world and camera rebuilt from scratch to shot list v3 (episode.md;
# user 2026-11-04: "redo from scratch the world building, camera composition"). The clay look is the approved EX00V11 one.
# Gate 2 blocking approved (review/gate2_board.png, build/episode_v4_blocking.py); gate 3 = the real world: library models
# in one clay, Ronald moving, the ghost fade, the flying certificates, the glowing gifts, ghost commuters, street dressing.
#   blender -b --python build/episode.py -- <out_dir> check            bake and save EX20_check.blend (scrub it; no render)
#   blender -b --python build/episode.py -- <out_dir> board [half]     one still per shot
#   blender -b --python build/episode.py -- <out_dir> still f,f,… [half]
# One town at real scale (metres; x east, y north), laid out north-south so map shots fill the 9:16 frame.
# Earlier versions: episode_v1_primitive.py, episode_v2a.py, episode_v2b_real.py, episode_v3_clay_first.py, episode_v4_blocking.py.
import sys, os, math, json, random, bpy
from mathutils import Vector as V
EP = os.path.dirname(os.path.abspath(__file__)) + "/../"; sys.path.insert(0, EP + "../../tools/blender")
from isokit import setup, box, cyl, hexc, ease, span
from camkit import *
from lib3d import model as _model, part, credits_for
from mpfbkit import Person
import crowd
A = sys.argv[sys.argv.index("--") + 1:]; OUT = A[0]; CHECK = "check" in A
sc = setup(half="half" in A); FPS = 30; sc.render.fps = FPS
for o in [o for o in bpy.data.objects if o.type == "LIGHT"]: bpy.data.objects.remove(o)
engine("eevee", 32, fast=True)
VT = json.load(open(EP + "audio/vo_timeline.json")); VW = VT["words"]
def w(L, i): return VW[L][i][1]
def F(t): return int(round(t * FPS))
N = int(math.ceil(VT["end"] * FPS)); sc.frame_start, sc.frame_end = 0, N - 1
rnd = random.Random(20)

# ---------- the look (approved EX00V11: cool clay, the EX00V9 dark floor, one green) ----------
G = hexc("#57D100")
CLAY = clay("clay", (0.30, 0.32, 0.36, 1), 0.66)
GREENC = clay("green mannequin", G, 0.5); _b = GREENC.node_tree.nodes["Principled BSDF"]
_b.inputs["Emission Color"].default_value = G; _b.inputs["Emission Strength"].default_value = 0.35
FLOOR = paint("dark floor", hexc("#1C1F26"), 0.45, 0.0)
ROAD = paint("map road", hexc("#2A2E36"), 0.6, 0.0)
XRAY = xray_shell(col=(0.5, 0.53, 0.58, 1), alpha=0.34, edge=0.85)
DASH = glow("dash", G, 2.5)
LABEL = glow("label", hexc("#C9CED6"), 0.8)
PAPER = clay("paper", (0.44, 0.45, 0.46, 1), 0.7)
GHOST = ghost("ghost", (0.85, 0.88, 0.92, 1), alpha=0.35, glow=0.6)
FONT = bpy.data.fonts.load(os.path.expanduser("~/Library/Fonts/BebasNeue-Regular.ttf"))

def B(name, x0, y0, x1, y1, h, m=CLAY, z0=0.0, bevel=0.02): return box(name, x0, y0, x1, y1, h, m, z0=z0, bevel=bevel)
def model(name, m=CLAY, **kw):
    """a library model in one clay; flat ground plates baked into the model are dropped (our floor is the ground)."""
    r = _model(name, **kw); clay_all(r, m); bpy.context.view_layer.update()
    for c in list(r.children):
        d = c.dimensions * r.scale.x
        if c.type == "MESH" and d.z < 0.06 and d.x * d.y > 0.5 * r["dims"][0] * r["dims"][1]: bpy.data.objects.remove(c)
    return r
TPL = {}
def inst(name, at, face=0.0, length=None, height=None):
    """a light copy of a library model (shared meshes) — the town's 91 lots, the street lamps, the trees."""
    if name not in TPL:
        t = model(name, height=1.0, at=(0, 0, -400)); TPL[name] = t
        for c in t.children: c.hide_render = True; c.hide_viewport = True
    t = TPL[name]; d = V(t["dims"])
    k = height / d.z if height else length / max(d.x, d.y)
    r = bpy.data.objects.new(name, None); sc.collection.objects.link(r)
    for c in t.children:
        n = c.copy(); sc.collection.objects.link(n); n.parent = r; n.hide_render = False; n.hide_viewport = False
    r.scale = t.scale * k; r.location = at; r.rotation_euler.z = math.radians(face)
    dd = d * k; r["dims"] = [dd.y, dd.x, dd.z] if face % 180 else list(dd); return r
def label(s, at, size, rot=(0, 0, 0)):
    bpy.ops.object.text_add(location=at); o = bpy.context.object; o.name = "label " + s; o.data.body = s; o.data.size = size
    o.data.align_x = "CENTER"; o.data.align_y = "CENTER"; o.data.font = FONT; o.rotation_euler = rot; o.data.materials.append(LABEL)
    o.visible_shadow = False; return o
def piece(name, lo, hi):
    """his piece of a company: one green corner block on the roof."""
    sx, sy = (hi[0] - lo[0]) * 0.32, (hi[1] - lo[1]) * 0.32
    return B(name + " piece", hi[0] - sx, lo[1], hi[0], lo[1] + sy, 1.2, GREENC, z0=hi[2], bevel=0.05)
def piece_on(r):
    d = V(r["dims"]); c = r.location
    if abs(math.degrees(r.rotation_euler.z)) % 180 > 1 and r.name not in TPL and not any(r.name.startswith(t) for t in TPL): d = V((d.y, d.x, d.z))
    return piece(r.name, (c.x - d.x / 2, c.y - d.y / 2), (c.x + d.x / 2, c.y + d.y / 2, d.z))
def rise(objs, f, d=12):
    for o in objs:                                                                # scale about the ground: z → 0.04 z
        s = o.scale.z; z = o.location.z; o.scale.z = s * 0.04; o.location.z = z * 0.04
        o.keyframe_insert("scale", frame=0); o.keyframe_insert("location", frame=0); o.keyframe_insert("scale", frame=f - d); o.keyframe_insert("location", frame=f - d)
        o.scale.z = s; o.location.z = z; o.keyframe_insert("scale", frame=f); o.keyframe_insert("location", frame=f)
def grow(objs, f, d=12):
    for o in objs:
        s = o.scale.copy(); o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=0); o.keyframe_insert("scale", frame=f - d)
        o.scale = s; o.keyframe_insert("scale", frame=f)
def shrink(objs, f, d=12):
    for o in objs:
        o.keyframe_insert("scale", frame=f - d); s = o.scale.copy(); o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=f); o.scale = s
def draw(dashes, f0, f1, out=None):
    for i, d in enumerate(dashes):
        t = f0 + (f1 - f0) * i / max(1, len(dashes) - 1); d.scale = (0, 0, 0)
        d.keyframe_insert("scale", frame=0); d.keyframe_insert("scale", frame=int(t)); d.scale = (1, 1, 1); d.keyframe_insert("scale", frame=int(t) + 4)
        if out: d.keyframe_insert("scale", frame=out - 8); d.scale = (0, 0, 0); d.keyframe_insert("scale", frame=out)
def key(sock, f, v): sock.default_value = v; sock.keyframe_insert("default_value", frame=f)
def heading(a, b): d = V(b) - V(a); return math.degrees(math.atan2(d.x, -d.y))     # mpfbkit facing: 0 = toward -y

# ---------- ground + roads (the map) ----------
B("floor", -300, -300, 300, 300, 0.1, FLOOR, z0=-0.1, bevel=0.0)
ROADS = [(-3, -80, 3, 90), (-39, -80, -33, 90), (33, -80, 39, 90),               # N-S: main street x=0, side streets x=±36
         (-60, -23, 60, -17), (-60, 9, 60, 15), (-60, 37, 60, 43)]               # E-W: y=-20, 12, 40
for r in ROADS: B("road", *r, 0.03, ROAD, bevel=0.0)
for y in range(-74, 88, 16):                                                       # street lamps along the main street
    if not any(abs(y - c) < 6 for c in (-20, 12, 40)): inst("street_light", (4.2, y, 0), 90, height=5.5)
    if not any(abs(y + 8 - c) < 6 for c in (-20, 12, 40)): inst("street_light", (-4.2, y + 8, 0), -90, height=5.5)
for x in range(-52, 56, 14):
    if abs(x) > 6: inst("tele_pole", (x, -24.2, 0), 90, height=7.0)

# ---------- the sets (shot list v3) ----------
# 1, 11: the corner store (north-east), roof off, front wall cut; shelves run north-south so the aisles open to the camera
B("store floor", 4, 20, 20, 32, 0.12, CLAY, bevel=0.0)
for a in ((4, 31.7, 20, 32, 4.5), (4, 20, 4.3, 32, 4.5), (19.7, 20, 20, 32, 4.5), (4, 20, 20, 20.3, 0.9)):
    B("store wall", *a)
for x in (6.5, 10.5, 14.5, 18.0):
    B("store shelf", x - 0.45, 23.5, x + 0.45, 30.5, 0.08, z0=0.12)
    for k in range(3):
        z = 0.12 + 0.45 + k * 0.62; B("shelf board", x - 0.45, 23.5, x + 0.45, 30.5, 0.04, z0=z)
        for j in range(9): B("stock", x - 0.35, 23.7 + j * 0.75, x + 0.35, 24.25 + j * 0.75, rnd.uniform(0.25, 0.45), z0=z + 0.04, bevel=0.01)
    B("shelf back", x - 0.05, 23.5, x + 0.05, 30.5, 1.9, z0=0.12)
B("counter", 15.5, 21.0, 19.4, 22.0, 1.0, z0=0.12)
BUCKET = model("mop_bucket", height=0.9, at=(13.6, 24.2, 0.12), face=120)
for c in list(BUCKET.children):
    if "broom" in c.name.lower(): bpy.data.objects.remove(c)
bpy.ops.object.light_add(type="AREA", location=(12, 26, 6.0)); STL = bpy.context.object; STL.data.energy = 450; STL.data.size = 10; STL.data.color = (0.92, 0.96, 1.0)
# 2: the gas station (west of the main street)
GS = model("gas_station", length=12, at=(-12, -6, 0), face=90)
# 3–5: his house (south), roof off, a side door; the driveway; the yard tree; the wood stove
HOME_C = V((12, -31, 0))
B("house floor", 7.5, -34.5, 16.5, -27.5, 0.12, CLAY, bevel=0.0)
for a in ((7.5, -27.8, 16.5, -27.5, 3.0), (7.5, -34.5, 7.8, -33.6, 3.0), (7.5, -32.4, 7.8, -27.5, 3.0), (16.2, -34.5, 16.5, -27.5, 3.0),
          (7.5, -34.5, 16.5, -34.2, 1.0), (11.8, -34.2, 12.1, -30.0, 3.0)):
    B("house wall", *a)
B("door lintel", 7.5, -33.6, 7.8, -32.4, 0.6, z0=2.4)
STOVE_P = V((9.4, -30.4, 0.12))
cyl("stove", STOVE_P.x, STOVE_P.y, 0.42, 0.9, CLAY, z0=0.12); cyl("flue", STOVE_P.x, STOVE_P.y, 0.1, 3.6, CLAY, z0=1.0)
model("wood_pile", length=1.4, at=(10.6, -28.6, 0.12), face=0)
B("bed", 13.0, -33.8, 15.8, -32.2, 0.5, z0=0.12); B("table", 13.4, -29.6, 15.2, -28.4, 0.75, z0=0.12)
B("chair", 12.6, -29.3, 13.1, -28.8, 0.45, z0=0.12)
B("driveway", 8.5, -27.4, 12.0, -23, 0.035, ROAD, bevel=0.0)
TREE_C = V((3.8, -37.5, 0)); model("tree", height=7.0, at=tuple(TREE_C), face=30)
model("branches", length=1.8, at=(4.6, -35.9, 0), face=20)                        # the fallen branches under the tree
CAR = bpy.data.objects.new("car", None); sc.collection.objects.link(CAR)
_car = model("car_b", length=4.3, at=(0, 0, 0), face=-90); _car.parent = CAR       # authored nose +y → +x in the car's frame
MAPLBL = [label("STORE", (12, 35.5, 0.05), 2.6), label("GAS STATION", (-12, -15.5, 0.05), 2.6), label("HOME", (12, -38.5, 0.05), 2.6)]

# 6: the four companies he understood, around his house — each rises on its word with his green piece
COMPANIES = {}
RR = model("train_station", length=12, at=(27.5, -32, 0), face=90)
TRACK = [B("rail", 31.2, -70, 31.35, 5, 0.12, CLAY, z0=0.15, bevel=0.0), B("rail", 32.65, -70, 32.8, 5, 0.12, CLAY, z0=0.15, bevel=0.0)]   # the line (the library rails model scales too wide)
TRACK += [B("sleeper", 30.6, y, 33.4, y + 0.3, 0.12, CLAY, z0=0.03, bevel=0.0) for y in [-70 + k * 1.2 for k in range(63)]]
COMPANIES["railroad"] = [RR, piece(RR.name, (24, -38), (31, -26, RR["dims"][2]))] + TRACK
DS = model("pharmacy", length=10, at=(-12.5, -31.5, 0), face=0); COMPANIES["drugstore"] = [DS, piece_on(DS)]
PH = model("radio_tower", height=20, at=(14, -52, 0)); COMPANIES["phone"] = [PH, B("phone hut", 11, -55, 15, -53, 2.6), cyl("phone dish", 14, -52, 1.4, 0.3, GREENC, z0=16)]
# 8: the bank tower (x-ray) north-east of his house, with a shaft down to the vault
BC_ = V((24, -3, 0)); BX0, BY0, BX1, BY1, BH = 19, -8, 29, 2, 28
BANKW = [B("bank wall", BX0, BY0, BX1, BY0 + 0.3, BH, XRAY, bevel=0.0), B("bank wall", BX0, BY1 - 0.3, BX1, BY1, BH, XRAY, bevel=0.0),
         B("bank wall", BX0, BY0, BX0 + 0.3, BY1, BH, XRAY, bevel=0.0), B("bank wall", BX1 - 0.3, BY0, BX1, BY1, BH, XRAY, bevel=0.0)]
for o in BANKW: o.visible_shadow = False
SH0, SH1 = (BC_.x - 1.5, BC_.y - 1.5), (BC_.x + 1.5, BC_.y + 1.5)               # the shaft opening in every slab
SLABS = []
for k in range(1, 8):
    z = k * 3.5
    for a in ((BX0 + 0.3, BY0 + 0.3, BX1 - 0.3, SH0[1]), (BX0 + 0.3, SH1[1], BX1 - 0.3, BY1 - 0.3), (BX0 + 0.3, SH0[1], SH0[0], SH1[1]), (SH1[0], SH0[1], BX1 - 0.3, SH1[1])):
        SLABS.append(B("bank slab", *a, 0.25, CLAY, z0=z - 0.25, bevel=0.0))
for k in range(4): SLABS.append(B("bank column", BX0 + 0.6 + (k % 2) * 8.2, BY0 + 0.6 + (k // 2) * 8.2, BX0 + 1.2 + (k % 2) * 8.2, BY0 + 1.2 + (k // 2) * 8.2, BH, CLAY, bevel=0.0))
ROOF = [B("bank roof", *a, 0.3, XRAY, z0=BH, bevel=0.0) for a in ((BX0 + 0.3, BY0 + 0.3, BX1 - 0.3, SH0[1]), (BX0 + 0.3, SH1[1], BX1 - 0.3, BY1 - 0.3),
        (BX0 + 0.3, SH0[1], SH0[0], SH1[1]), (SH1[0], SH0[1], BX1 - 0.3, SH1[1]))]                  # open over the shaft: the camera dives and rises through it
for o in ROOF: o.visible_shadow = False
BANKP = piece("bank", (BX0, BY0), (BX1, BY1, BH + 0.3))
COMPANIES["bank"] = BANKW + SLABS + ROOF + [BANKP, label("BANK", (BC_.x, BY0 - 2.2, 0.05), 2.0)]
# the vault at the shaft's foot: deposit boxes on the north side, an open drawer, the stack (38 × 3.35 mm ≈ 5 in)
VX, VY = BC_.x, BC_.y
B("deposit wall", VX - 1.5, VY + 1.2, VX + 1.5, VY + 1.5, 2.4, CLAY, bevel=0.0)
for r in range(4):
    for c in range(5):
        B("box door", VX - 1.38 + c * 0.56, VY + 1.12, VX - 0.88 + c * 0.56, VY + 1.2, 0.48, CLAY, z0=0.2 + r * 0.54, bevel=0.01)
        cyl("keyhole", VX - 1.13 + c * 0.56, VY + 1.11, 0.02, 0.02, CLAY, z0=0.42 + r * 0.54, verts=12, bevel=0.0).rotation_euler.x = math.pi / 2
DRAWER = B("drawer", VX - 0.3, VY, VX + 0.3, VY + 1.12, 0.18, CLAY, z0=0.9, bevel=0.01)
B("vault table", VX - 0.7, VY - 0.4, VX + 0.7, VY + 1.1, 0.88, CLAY, z0=0.0)
STACK = [B("certificate", VX - 0.18, VY + 0.3, VX + 0.18, VY + 0.8, 0.0033, PAPER, z0=1.08 + k * 0.0034, bevel=0.0) for k in range(38)]
EDGES = [B("cert edge", VX - 0.19, VY + 0.29, VX + 0.19, VY + 0.81, 0.0008, GREENC, z0=1.08 + k * 0.0034 + 0.0033, bevel=0.0) for k in range(0, 38, 6)]
RULER = B("ruler", VX + 0.22, VY + 0.5, VX + 0.25, VY + 0.53, 0.127, CLAY, z0=1.08, bevel=0.0)
LAB5 = label("5 IN", (VX + 0.3, VY + 0.515, 1.08 + 0.127), 0.05, rot=(math.pi / 2, 0, 0))
for k, c in enumerate(STACK): grow([c], F(w("L04", 19)) + int(k * 1.2) + 2, d=4)       # stacked one by one, "paper certificates" → "high"
for k, c in enumerate(EDGES): grow([c], F(w("L04", 19)) + int(k * 6 * 1.2) + 2, d=4)
grow([RULER], F(w("L04", 24))); grow([LAB5], F(w("L04", 27)) + 6)

# 10: the library and the hospital (public; not his), north, stacked in depth for a 3/4 view from the south
def glowclay(name):
    m = clay(name, (0.30, 0.32, 0.36, 1), 0.66); b = m.node_tree.nodes["Principled BSDF"]; b.inputs["Emission Color"].default_value = G
    b.inputs["Emission Strength"].default_value = 0.0; return m, b.inputs["Emission Strength"]
LIBM, LIBE = glowclay("library clay"); HOSM, HOSE = glowclay("hospital clay")
LIB = model("library", LIBM, length=14, at=(-12, 50, 0), face=0); HOSP = model("hospital", HOSM, length=20, at=(-14, 67, 0), face=90)
LBL_L, LBL_H = label("$1.2M", (-12, 44.0, 0.06), 3.0), label("$4.8M", (-14, 67, HOSP["dims"][2] + 0.2), 3.4)

# 7: the town — every lot starts as a footprint; 91 more rise with his pieces over L04 (4 + 91 = 95)
SETS = [(3, 19, 21, 33), (-19, -13, -5, 1), (5, -40, 18, -22), (1, -40, 7, -34), (20, -39, 35, -25), (-18, -37, -7, -26), (10, -56, 16, -50),
        (18, -9, 30, 3), (-25, 43, 1, 78)]
def free(x, y, r=4.0):
    if any(a[0] - 3 - r < x < a[2] + 3 + r and a[1] - 3 - r < y < a[3] + 3 + r for a in ROADS): return False
    return not any(a[0] - r < x < a[2] + r and a[1] - r < y < a[3] + r for a in SETS)
LOTS = [(x + rnd.uniform(-0.6, 0.6), y + rnd.uniform(-0.6, 0.6)) for x in range(-64, 68, 8) for y in range(-76, 86, 8) if free(x, y, 3.6)]
rnd.shuffle(LOTS); assert len(LOTS) >= 91, len(LOTS); LOTS = LOTS[:91]; LOTS.sort(key=lambda p: (V(p) - HOME_C.xy).length)
KINDS = ["house"] * 6 + ["brown_bldg"] * 3 + ["apartment"] * 3 + ["kenney_big"] * 2 + ["kenney_big2"] * 2 + ["store_bldg"] * 2 + ["tower"]
TOWN = []
for x, y in LOTS:
    r = inst(rnd.choice(KINDS), (x, y, 0), rnd.choice((0, 90, 180, 270)), length=rnd.uniform(4.8, 5.8)); TOWN.append((r, piece_on(r)))
for k in range(26):                                                                # street trees
    x, y = rnd.choice((-5.5, 5.5, -30.5, 30.5)), rnd.uniform(-72, 82)
    if not any(abs(y - c) < 6 for c in (-20, 12, 40)) and free(x + (3 if x > 0 else -3), y, 0.5): inst("tree", (x, y, 0), rnd.uniform(0, 360), height=rnd.uniform(4.5, 6.0))
LBL95 = label("95 COMPANIES", (0, 50, 14.0), 7.0)                                # floats over the roofs, upper frame

# ---------- Ronald: two copies (the store; home), each with a fade material (green ↔ ghost ↔ gone) ----------
def ronmat(name):
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial"); pb = nt.nodes.new("ShaderNodeBsdfPrincipled")
    pb.inputs["Base Color"].default_value = G; pb.inputs["Roughness"].default_value = 0.5
    pb.inputs["Emission Color"].default_value = G; pb.inputs["Emission Strength"].default_value = 0.35
    em = nt.nodes.new("ShaderNodeEmission"); em.inputs[0].default_value = (0.85, 0.88, 0.92, 1); em.inputs[1].default_value = 0.6
    tr = nt.nodes.new("ShaderNodeBsdfTransparent")
    gh = nt.nodes.new("ShaderNodeMixShader"); gh.inputs[0].default_value = 0.35; nt.links.new(tr.outputs[0], gh.inputs[1]); nt.links.new(em.outputs[0], gh.inputs[2])
    mg = nt.nodes.new("ShaderNodeMixShader"); nt.links.new(gh.outputs[0], mg.inputs[1]); nt.links.new(pb.outputs[0], mg.inputs[2])
    ma = nt.nodes.new("ShaderNodeMixShader"); nt.links.new(tr.outputs[0], ma.inputs[1]); nt.links.new(mg.outputs[0], ma.inputs[2])
    nt.links.new(ma.outputs[0], out.inputs[0]); m.diffuse_color = G
    try: m.surface_render_method = "DITHERED"
    except Exception: pass
    return m, mg.inputs[0], ma.inputs[0]                                          # (material, green-vs-ghost, there-vs-gone)
# hard cuts (user 2026-11-04: allowed where a continuous move broke — the camera clipped walls/slabs or swooped too fast); each on a spoken word
CUT1, CUT2, CUT3, CUT4, CUT5, CUT6 = F(w("L02", 15)) - 3, F(w("L02", 19)) - 2, F(w("L02", 28)) - 2, F(w("L04", 18)), F(w("L07", 0)), F(56.25)
RM1, G1, A1 = ronmat("Ronald store"); RM2, G2, A2 = ronmat("Ronald home")
RON = Person("ron_05", RM1, RM1, RM1, RM1, name="Ronald store"); RON2 = Person("ron_05", RM2, RM2, RM2, RM2, name="Ronald home")
for sock, keys in ((G1, ((0, 1), (F(w("L01", 10)) - 2, 1), (F(w("L01", 10)) + 14, 0), (F(50), 0), (F(53), 1))),       # "died": he turns to a ghost
                   (A1, ((0, 1), (F(6.0), 1), (F(6.6), 0), (F(54.0), 0), (F(55.0), 1))),                                 # gone in the map; back at the end
                   (G2, ((0, 1),)), (A2, ((0, 0), (CUT2 - 1, 0), (CUT2, 1), (F(19.4), 1), (F(20.0), 0)))):            # steps out of the car; gone in the map
    for f, v in keys: key(sock, f, v)

MOP_AT = V((12.5, 25.5, 0.12))                                                     # the aisle between the middle shelves
MOP = cyl("mop", 0, 0, 0.022, 1.45, CLAY); MOPH = B("mop head", -0.25, -0.08, 0.25, 0.08, 0.07, CLAY); MOPH.parent = MOP; MOPH.location = (0, 0, -0.74)
def mop_frame(f):
    RON.act(f, "mop", f * 0.22); sc.frame_set(f); hl, hr = RON.hand("L"), RON.hand("R")
    d = (hr - hl).normalized()
    if d.z > -0.2: d = (d + V((0, 0, -1.2))).normalized()
    t = (MOP_AT.z + 0.1 - hl.z) / d.z; bot = hl + d * t; top = bot - d * 1.45
    MOP.location = (top + bot) / 2; MOP.rotation_euler = (top - bot).to_track_quat("Z", "Y").to_euler()
    MOP.keyframe_insert("location", frame=f); MOP.keyframe_insert("rotation_euler", frame=f)
RON.place(0, MOP_AT.xy, 15, z=MOP_AT.z); RON.stand(0)
for f in list(range(0, F(6.8), 3)) + list(range(F(53.8), N + 3, 3)): mop_frame(f)
ZIG = dashed("mop zigzag", [tuple(MOP_AT + V((dx, -1.0 - k * 0.5, 0.02))) for k, dx in enumerate((0.5, -0.5, 0.5, -0.5, 0.5))], DASH, 0.22, 0.14, 0.03)
draw(ZIG, 6, F(4.0), out=F(6.6))
ZIG2 = dashed("mop zigzag", [tuple(MOP_AT + V((dx, -1.0 - k * 0.5, 0.02))) for k, dx in enumerate((0.5, -0.5, 0.5, -0.5, 0.5))], DASH, 0.22, 0.14, 0.03)
draw(ZIG2, F(55.2), F(57.6))
STL.data.keyframe_insert("energy", frame=F(w("L01", 10)) - 2); STL.data.energy = 140; STL.data.keyframe_insert("energy", frame=F(w("L01", 10)) + 14)   # the store dims
STL.data.keyframe_insert("energy", frame=F(54.0)); STL.data.energy = 450; STL.data.keyframe_insert("energy", frame=F(55.0))

# home: beside the parked car (the pin), then the branches from the tree, through the side door, to the stove
PIN_AT = V((13.4, -25.0, 0)); FACE_PIN = 200                                    # faces the street, so the camera stays out of the house
RON2.place(0, PIN_AT.xy, FACE_PIN); RON2.stand(0); RON2.arms("DOWN", 0); RON2.place(CUT3 - 1, PIN_AT.xy, FACE_PIN); RON2.arms("DOWN", CUT3 - 1); RON2.stand(CUT3 - 1)   # holds until the cut to the tree
fw = V((math.sin(math.radians(FACE_PIN)), -math.cos(math.radians(FACE_PIN)), 0))
sc.frame_set(F(13.0)); bpy.context.view_layer.update()
sp = RON2.rig.matrix_world @ RON2.rig.pose.bones["spine02"].tail                 # MPFB spine bones run top-down: spine02's tail is the chest
CHEST = sp + fw * 0.2 + V((0, 0, 0.05))
PIN = cyl("safety pin", 0, 0, 0.006, 0.1, glow("pin", hexc("#DDE3EA"), 1.2), verts=12, bevel=0.0)
PIN.location = CHEST + V((-fw.y, fw.x, 0)) * 0.07; PIN.rotation_euler = (math.radians(90), math.radians(55), math.radians(FACE_PIN))
PIN.scale = (1, 1, 1); PIN.keyframe_insert("scale", frame=CUT3 - 1); PIN.scale = (0, 0, 0); PIN.keyframe_insert("scale", frame=CUT3)   # stays with him at the car
CARRY = model("branches", length=1.1, at=(0, 0, -50), face=0)
WALK = [V((5.0, -35.6, 0)), V((7.65, -33.0, 0.12)), V((8.9, -31.3, 0.12))]        # tree → side door → the stove (~5 m, a real walking pace)
T_W0, T_W1 = CUT3 / FPS, 18.2
L_ = [(WALK[i + 1] - WALK[i]).length for i in range(len(WALK) - 1)]; LT = sum(L_)
CARRY.keyframe_insert("location", frame=F(T_W0) - 2)
for f in range(F(T_W0), F(T_W1) + 1, 2):
    u = span(f / FPS, T_W0, T_W1) * LT; i = 0
    while i < len(L_) - 1 and u > L_[i]: u -= L_[i]; i += 1
    p = WALK[i].lerp(WALK[i + 1], min(1, u / L_[i])); hd = heading(WALK[i], WALK[i + 1])
    RON2.place(f, p.xy, hd, z=p.z); RON2.walk(f, span(f / FPS, T_W0, T_W1) * LT / 1.4 * 2 * math.pi, 0.9 if f < F(T_W1) - 6 else 0.0, arms=False); RON2.act(f, "carry")
    sc.frame_set(f); hc = (RON2.hand("L") + RON2.hand("R")) / 2
    CARRY.location = hc + V((0, 0, -0.05)); CARRY.rotation_euler.z = math.radians(hd + 90); CARRY.keyframe_insert("location", frame=f); CARRY.keyframe_insert("rotation_euler", frame=f)
RON2.stand(F(T_W1) + 2)
BDASH = dashed("branch path", [tuple(p.xy) for p in WALK], DASH, 0.4, 0.25, 0.05, z=0.15); draw(BDASH, F(T_W0), F(T_W1), out=F(19.4))

# the route of his life on the map (shot 2): home → gas → store → home
ROUTE = [(10.2, -24), (10.2, -20), (1.5, -20), (1.5, -4.5), (-7, -4.5), (1.5, -4.5), (1.5, 17), (12, 17), (12, 20), (12, 17), (1.5, 17), (1.5, -20), (10.2, -20), (10.2, -24)]
RDASH = dashed("route", ROUTE, DASH, 1.6, 1.0, 0.2, z=0.08); draw(RDASH, F(7.4), F(9.4), out=F(10.4))
DOT = cyl("route dot", 0, 0, 0.9, 0.3, GREENC, z0=0.1, verts=24)                  # him, as the map's marker, running the loop
pts = [V(p) for p in ROUTE]; Ls = [(pts[i + 1] - pts[i]).length for i in range(len(pts) - 1)]; TOT = sum(Ls)
for f in range(F(7.0), F(9.6) + 1, 2):
    u = (span(f / FPS, 7.0, 9.6) * 1.6 % 1.0) * TOT; i = 0                         # "whole life": a little more than once round
    while i < len(Ls) - 1 and u > Ls[i]: u -= Ls[i]; i += 1
    DOT.location = pts[i].lerp(pts[i + 1], u / Ls[i]).to_3d() + V((0, 0, 0.1)); DOT.keyframe_insert("location", frame=f)
grow([DOT], F(7.2)); shrink([DOT], F(10.2))
# the Toyota drives home down the main street (shot 3), turns in, parks
for f, p in ((CUT1 - 6, (1.5, 10)), (CUT2 - 1, (1.5, -14.5)), (CUT2, (10.2, -25.2))):  # parked across the cut to the pin
    CAR.location = (*p, 0); CAR.rotation_euler.z = math.radians(-90); CAR.keyframe_insert("location", frame=f); CAR.keyframe_insert("rotation_euler", frame=f)
for o in MAPLBL: grow([o], F(6.8)); shrink([o], F(10.6))
# companies rise on their words (shot 6); coins run dashed lines to his house, every year
CW = {"railroad": w("L03", 8), "bank": w("L03", 9), "drugstore": w("L03", 10), "phone": w("L03", 11)}
CENT = {"railroad": V((27.5, -32)), "bank": BC_.xy, "drugstore": V((-12.5, -31.5)), "phone": V((14, -52))}
COIN = glow("coin", G, 3.0)
for k, objs in COMPANIES.items():
    rise([o for o in objs if "piece" not in o.name and "dish" not in o.name and not o.name.startswith("label")], F(CW[k]) + 6)
    grow([o for o in objs if "piece" in o.name or "dish" in o.name or o.name.startswith("label")], F(CW[k]) + 14)
    a, b = CENT[k].to_3d() + V((0, 0, 0.6)), HOME_C.xy.to_3d() + V((0, 0, 0.6))
    d_ = dashed("coin line", [tuple(CENT[k]), tuple(HOME_C.xy)], DASH, 1.0, 0.7, 0.14, z=0.1); draw(d_, F(w("L03", 19)), F(w("L03", 19)) + 18, out=F(36.0))
    for n_, t0 in enumerate((w("L03", 19), w("L03", 21), w("L03", 22) + 0.4)):  # "cash … every year": three years of coins
        c = cyl("coin", 0, 0, 0.7, 0.18, COIN, z0=-0.09, verts=24); c.rotation_euler.x = math.pi / 2
        for f, u in ((F(t0) - 1, None), (F(t0), 0.0), (F(t0 + 0.9), 1.0), (F(t0 + 0.9) + 1, None)):
            c.location = (a.lerp(b, u) + V((0, 0, 2.5 * math.sin(math.pi * u)))) if u is not None else V((0, 0, -30)); c.keyframe_insert("location", frame=f)
# the town rises over L04 (nearest his house first), each lot with his piece
for k, (o, p) in enumerate(TOWN):
    f = F(w("L04", 3) + 3.6 * k / len(TOWN)) + 12; rise([o], f); grow([p], f + 8)
grow([LBL95], F(w("L04", 16)) + 6); shrink([LBL95], F(35.2))
# shot 9: the certificates lift off the stack, fly up the shaft and out, each landing on a building (its piece flashes)
TGT = [TOWN[k] for k in range(2, 91, 4)][:22]
for k, (o, p) in enumerate(TGT):
    s = B("flying certificate", -0.18, -0.25, 0.18, 0.25, 0.004, PAPER, bevel=0.0); e = B("edge", -0.19, -0.26, 0.19, 0.26, 0.001, GREENC, z0=-0.0012, bevel=0.0); e.parent = s
    t0 = w("L05", 6) + k * 0.04; t1 = t0 + 0.9 + k * 0.02; t2 = w("L05", 10) + 0.2 + k * 0.06
    top = V((VX + rnd.uniform(-0.8, 0.8), VY + rnd.uniform(0.6, 1.0), BH + 4 + k * 0.6)); land = p.location + V((0, 0, 0.8))   # north half of the shaft; the camera rises in the south half
    for f, loc, sc_ in ((F(t0) - 1, V((VX, VY + 0.55, 1.2)), 0), (F(t0), V((VX, VY + 0.55, 1.2)), 1), (F(t1), top, 2), (F(t2), land, 4), (F(t2) + 1, land, 0)):
        s.location = loc; s.scale = (sc_,) * 3; s.rotation_euler = (rnd.uniform(-0.5, 0.5), rnd.uniform(-0.5, 0.5), k * 0.7)
        for dp in ("location", "scale", "rotation_euler"): s.keyframe_insert(dp, frame=f)
    s.scale = (0, 0, 0); s.keyframe_insert("scale", frame=0)
    p.keyframe_insert("scale", frame=F(t2)); p.scale = (1.6, 1.6, 1.6); p.keyframe_insert("scale", frame=F(t2) + 4); p.scale = (1, 1, 1); p.keyframe_insert("scale", frame=F(t2) + 12)
# gifts (shot 10): from his house up the main street to the library, then the hospital; their walls fill green
GL = dashed("gift", [tuple(HOME_C.xy), (10.2, -20), (-1.5, -20), (-1.5, 40), (-12, 40), (-12, 44)], DASH, 1.6, 1.0, 0.2, z=0.12); draw(GL, F(w("L06", 1)), F(w("L06", 8)))
GH = dashed("gift", [(-1.5, 40), (-1.5, 58), (-14, 58), (-14, 59)], DASH, 1.6, 1.0, 0.2, z=0.12); draw(GH, F(w("L06", 10)), F(w("L06", 15)))
for sock, t in ((LIBE, w("L06", 8)), (HOSE, w("L06", 15))): key(sock, 0, 0.0); key(sock, F(t), 0.0); key(sock, F(t + 0.8), 0.55)
grow([LBL_L], F(w("L06", 8)) + 6); grow([LBL_H], F(w("L06", 15)) + 6)
PIECES = [p for _, p in TOWN] + [o for objs in COMPANIES.values() for o in objs if "piece" in o.name]
for p in PIECES:                                                                  # "quietly owned them": every piece in town glows once
    f = F(w("L07", 11)) + rnd.randint(0, 8); p.keyframe_insert("scale", frame=f); s0 = p.scale.copy(); p.scale = s0 * 1.5
    p.keyframe_insert("scale", frame=f + 5); p.scale = s0; p.keyframe_insert("scale", frame=f + 14)
# commuters (shot 11): white ghost people walking into town
pcol, prig, phip = crowd.load_person("s_m30", link=False)
for o in pcol.objects:
    if o.type == "MESH": o.data.materials.clear(); o.data.materials.append(GHOST)
pcol.instance_offset = (phip.x, phip.y, 0)
for k in range(44):
    if k % 2: x, y = rnd.choice((0, -36, 36)) + rnd.choice((-1.8, 1.8)), rnd.uniform(-70, 80); dv = V((0, rnd.choice((-1, 1)) * 1.3))
    else: x, y = rnd.uniform(-55, 55), rnd.choice((-20, 12, 40)) + rnd.choice((-1.8, 1.8)); dv = V((rnd.choice((-1, 1)) * 1.3, 0))
    e = bpy.data.objects.new("commuter", None); e.instance_type = "COLLECTION"; e.instance_collection = pcol; sc.collection.objects.link(e)
    e.rotation_euler.z = math.atan2(dv.x, -dv.y)
    for f in (CUT5, N - 1):
        e.location = (V((x, y)) + dv * ((f - CUT5) / FPS)).to_3d(); e.keyframe_insert("location", frame=f)
    grow([e], CUT5, d=1)

# ---------- light (EX00V11 values, as used in episode_v3_clay_first) ----------
wd = sc.world or bpy.data.worlds.new("w"); sc.world = wd; wd.use_nodes = True; wn = wd.node_tree; wn.nodes.clear()
bg = wn.nodes.new("ShaderNodeBackground"); bg.inputs[0].default_value = hexc("#14161B"); bg.inputs[1].default_value = 1.3
wn.links.new(bg.outputs[0], wn.nodes.new("ShaderNodeOutputWorld").inputs[0])
def sun(rot, e, col, ang, shadow=True):
    bpy.ops.object.light_add(type="SUN"); L = bpy.context.object; L.rotation_euler = [math.radians(a) for a in rot]
    L.data.energy = e; L.data.color = col; L.data.angle = math.radians(ang); L.data.use_shadow = shadow; return L
sun((48, 0, -38), 1.7, (0.93, 0.96, 1.0), 18); sun((62, 0, 150), 0.9, (0.8, 0.88, 1.0), 25); sun((70, 0, 20), 0.45, (0.85, 0.9, 1.0), 40, False)
bpy.ops.object.light_add(type="AREA", location=(VX, VY - 0.5, 3.2)); VL = bpy.context.object; VL.data.energy = 60; VL.data.size = 2.5   # the vault at the shaft's foot
sc.view_settings.view_transform = "AgX"; sc.view_settings.look = "AgX - Medium High Contrast"
tree = bpy.data.node_groups.new("comp", "CompositorNodeTree"); sc.compositing_node_group = tree
tree.interface.new_socket("Image", in_out="OUTPUT", socket_type="NodeSocketColor")
rl = tree.nodes.new("CompositorNodeRLayers"); go = tree.nodes.new("NodeGroupOutput")
gl = tree.nodes.new("CompositorNodeGlare"); gl.inputs["Type"].default_value = "Bloom"; gl.inputs["Threshold"].default_value = 0.9; gl.inputs["Strength"].default_value = 0.3
tree.links.new(rl.outputs["Image"], gl.inputs["Image"]); tree.links.new(gl.outputs["Image"], go.inputs["Image"]); sc.render.use_compositing = True

# ---------- camera: one continuous move, shot list v3 ----------
def orb(aim, d, el, az):
    """camera position at distance d from the aim, el degrees above the ground, az degrees east of due south."""
    aim = V(aim); e, a = math.radians(el), math.radians(az)
    return aim + V((math.sin(a) * math.cos(e), -math.cos(a) * math.cos(e), math.sin(e))) * d
def K(t, aim, d, el, az, lens, fs): return (F(t), orb(aim, d, el, az), V(aim), lens, fs)
S1 = MOP_AT + V((0, -0.6, 0.9))
def carat(t):
    sc.frame_set(F(t)); return CAR.matrix_world.translation + V((0, 0, 0.8))
def KP(f, aim, d, el, az, lens, fs): return (f, orb(aim, d, el, az), V(aim), lens, fs)
ck = [K(0.0, S1, 30, 55, 10, 40, 8.0),                                          # 1 the store cutaway, slow descend to him
      K(4.0, S1, 14, 48, 8, 45, 4.0),
      K(5.0, S1, 13, 48, 8, 45, 4.0),
      K(7.0, (2, -2, 0), 85, 86, 0, 35, 16.0),                                    # 2 rise straight up into the map
      KP(CUT1 - 1, (2, -4, 0), 72, 76, 2, 35, 16.0),
      KP(CUT1, carat(CUT1 / FPS), 11, 22, -12, 35, 4.0),                           # CUT 3 "drove": the car coming down the main street toward us
      KP(CUT2 - 1, carat((CUT2 - 1) / FPS), 10, 24, -14, 35, 4.0),
      KP(CUT2, CHEST, 3.2, 8, FACE_PIN, 40, 2.8),                                  # CUT 4 "held": him by the parked car, push in to the pin
      K(13.8, CHEST, 0.95, 4, FACE_PIN, 60, 2.0),
      KP(CUT3 - 1, CHEST, 0.92, 4, FACE_PIN, 60, 2.0),
      KP(CUT3, (6.6, -34.4, 0.8), 13, 38, 42, 40, 5.6),                            # CUT 5 "gathered": him at the tree, the house beside; crane up
      K(17.6, (9.5, -32, 0.8), 30, 60, 18, 40, 8.0),
      K(19.6, (12, -24, 8), 112, 55, 10, 35, 16.0),                                # 6 map mode around his house, slow orbit
      K(27.8, (12, -24, 8), 116, 58, -10, 35, 16.0),
      K(30.0, (0, -4, 0), 130, 72, 4, 30, 16.0),                                   # 7 rise and widen over the whole town
      KP(CUT4 - 1, (0, 0, 0), 152, 82, 2, 30, 16.0),
      (CUT4, V((VX, VY - 0.6, 25)), V((VX, VY + 0.2, 1.2)), 35, 11.0),            # CUT 8 "The paper certificates": inside the bank's shaft, descend to the vault
      (F(36.9), V((VX, VY - 0.8, 10)), V((VX, VY + 0.2, 1.2)), 40, 8.0),
      (F(37.9), V((VX + 0.55, VY - 0.85, 2.25)), V((VX, VY + 0.55, 1.12)), 45, 2.8),
      (F(39.1), V((VX + 0.55, VY - 0.8, 2.35)), V((VX, VY + 0.55, 1.15)), 45, 2.8),
      (F(40.4), V((VX, VY - 1.05, 9)), V((VX, VY + 0.2, 1.5)), 40, 8.0),           # 9 straight up the shaft with the certificates
      (F(41.5), V((VX, VY - 1.05, 36)), V((VX, VY + 0.2, 12)), 35, 11.0),          #   out through the open roof
      K(42.9, (0, -2, 0), 120, 70, 4, 30, 16.0),                                   #   over the town as they land
      K(45.6, (-2, 10, 0), 120, 66, 0, 30, 16.0),                                  # 10 drift north to the library and hospital
      K(48.4, (-8, 30, 0), 100, 60, -4, 30, 16.0),
      K(50.6, (-14, 59, 5), 72, 38, -8, 35, 11.0),                                 #    lower to 3/4 on both
      KP(CUT5 - 1, (-14, 59, 5), 68, 37, -10, 35, 11.0),
      KP(CUT5, (0, 2, 1.5), 42, 28, 18, 30, 8.0),                                  # CUT 11 "Most people": the main street, ghost commuters; rise
      K(55.1, (0, 0, 0), 100, 62, 6, 30, 16.0),                                    #   the whole town on "quietly owned them"
      KP(CUT6 - 1, (0, 0, 0), 104, 63, 6, 30, 16.0),
      KP(CUT6, S1, 20, 50, 10, 45, 5.6),                                           # CUT end: the store, him mopping again (loops to the hook)
      K(58.6, S1, 17, 50, 10, 45, 5.6)]
rig = PerspRig(); ck.sort(key=lambda k_: k_[0]); rig.keys(ck, drift=0.02)
for f in range(N): rig.set(f)
# hard cuts stay clean under motion blur: the shutter opens on the frame, and every key on the frame before a cut holds
sc.render.motion_blur_position = "START"
def fcurves(id_):
    ad = id_.animation_data
    if not ad or not ad.action: return []
    try: return list(ad.action.fcurves)
    except Exception: return [fc for L in ad.action.layers for st in L.strips for cb in st.channelbags for fc in cb.fcurves]
BEFORE = {c - 1 for c in (CUT1, CUT2, CUT3, CUT4, CUT5, CUT6)}
for id_ in [rig.cam, rig.aim, rig.cam.data, CAR, RM2.node_tree, RON2.rig, PIN] + [o for o in bpy.data.objects if o.name.startswith("commuter")]:
    for fc in fcurves(id_):
        for kp in fc.keyframe_points:
            if int(round(kp.co.x)) in BEFORE: kp.interpolation = "CONSTANT"
json.dump(credits_for(), open(EP + "build/model_credits.json", "w"), indent=1)

SHOTS = [3.0, 8.6, 11.0, 13.7, 16.0, 24.0, 33.2, 38.3, 41.9, 50.4, 57.2]           # one still per shot (board)
if CHECK:
    for a in bpy.data.screens:
        for ar in a.areas:
            if ar.type == "VIEW_3D":
                for sp_ in ar.spaces:
                    if sp_.type == "VIEW_3D": sp_.shading.type = "MATERIAL"; sp_.region_3d.view_perspective = "CAMERA"
    sc.frame_set(0); bpy.ops.wm.save_as_mainfile(filepath=EP + ("EX20_dbg.blend" if "dbg" in A else "EX20_check.blend"), compress=True)
elif "board" in A or "still" in A:
    fr = [F(t) for t in SHOTS] if "board" in A else [int(x) for x in A[A.index("still") + 1].split(",")]
    for f in fr:
        sc.frame_set(f); sc.render.filepath = f"{OUT}/b_{f:04d}.png"; bpy.ops.render.render(write_still=True)
else:                                                                             # the full render: out/frames/f_0000.png … (MASTER imports it)
    render_range(f"{OUT}/f_", 0, N - 1)

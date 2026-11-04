# EX20 "The Janitor Who Owned Everything" — v4: world and camera rebuilt from scratch to shot list v3 (episode.md;
# user 2026-11-04: "redo from scratch the world building, camera composition"). The clay look is the approved EX00V11 one.
# Stage: BLOCKING (gate 2) — grey boxes, a stand-in Ronald, the real cameras. Library models come in gate 3.
#   blender -b --python build/episode.py -- <out_dir> board [half]   one still per shot (+ board.png)
#   blender -b --python build/episode.py -- <out_dir> still f,f,… [half]
# One town at real scale (metres; x east, y north). Map shots are the same town seen from high above.
# Earlier versions: episode_v1_primitive.py, episode_v2a.py, episode_v2b_real.py, episode_v3_clay_first.py.
import sys, os, math, json, random, bpy
from mathutils import Vector as V
EP = os.path.dirname(os.path.abspath(__file__)) + "/../"; sys.path.insert(0, EP + "../../tools/blender")
from isokit import setup, box, cyl, hexc, ease, span
from camkit import *
from mpfbkit import Person
A = sys.argv[sys.argv.index("--") + 1:]; OUT = A[0]
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
FLOOR = paint("dark floor", hexc("#1C1F26"), 0.32, 0.0)
ROAD = paint("map road", hexc("#2A2E36"), 0.6, 0.0)
XRAY = xray_shell(col=(0.5, 0.53, 0.58, 1), alpha=0.34, edge=0.85)
DASH = glow("dash", G, 2.5)
LABEL = glow("label", hexc("#C9CED6"), 0.8)
GHOST = ghost("ghost", (0.85, 0.88, 0.92, 1), alpha=0.35, glow=0.6)
FONT = bpy.data.fonts.load(os.path.expanduser("~/Library/Fonts/BebasNeue-Regular.ttf"))

def B(name, x0, y0, x1, y1, h, m=CLAY, z0=0.0, bevel=0.02): return box(name, x0, y0, x1, y1, h, m, z0=z0, bevel=bevel)
def BC(name, c, sx, sy, h, m=CLAY, z0=0.0): return B(name, c[0] - sx / 2, c[1] - sy / 2, c[0] + sx / 2, c[1] + sy / 2, h, m, z0)
def label(s, at, size, rot=(0, 0, 0)):
    bpy.ops.object.text_add(location=at); o = bpy.context.object; o.name = "label " + s; o.data.body = s; o.data.size = size
    o.data.align_x = "CENTER"; o.data.align_y = "CENTER"; o.data.font = FONT; o.rotation_euler = rot; o.data.materials.append(LABEL); return o
def piece(name, lo, hi):
    """his piece of a company: one green corner block on the roof."""
    sx, sy = (hi[0] - lo[0]) * 0.32, (hi[1] - lo[1]) * 0.32
    return B(name + " piece", hi[0] - sx, lo[1], hi[0], lo[1] + sy, 1.2, GREENC, z0=hi[2], bevel=0.05)
def rise(objs, f, d=12):
    """grow up from the ground (z scale 0.04 → 1) ending at frame f; footprints until then."""
    for o in objs:                                                                # scale about the ground: z → 0.04 z
        s = o.scale.z; z = o.location.z; o.scale.z = s * 0.04; o.location.z = z * 0.04
        o.keyframe_insert("scale", frame=0); o.keyframe_insert("location", frame=0); o.keyframe_insert("scale", frame=f - d); o.keyframe_insert("location", frame=f - d)
        o.scale.z = s; o.location.z = z; o.keyframe_insert("scale", frame=f); o.keyframe_insert("location", frame=f)
def grow(objs, f, d=12):
    for o in objs:
        s = o.scale.copy(); o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=0); o.keyframe_insert("scale", frame=f - d)
        o.scale = s; o.keyframe_insert("scale", frame=f)
def draw(dashes, f0, f1, out=None):
    for i, d in enumerate(dashes):
        t = f0 + (f1 - f0) * i / max(1, len(dashes) - 1); d.scale = (0, 0, 0)
        d.keyframe_insert("scale", frame=0); d.keyframe_insert("scale", frame=int(t)); d.scale = (1, 1, 1); d.keyframe_insert("scale", frame=int(t) + 4)
        if out: d.keyframe_insert("scale", frame=out - 8); d.scale = (0, 0, 0); d.keyframe_insert("scale", frame=out)

# ---------- ground + roads (the map). The town runs north-south so map shots fill the tall 9:16 frame ----------
B("floor", -300, -300, 300, 300, 0.1, FLOOR, z0=-0.1, bevel=0.0)
ROADS = [(-3, -80, 3, 90), (-39, -80, -33, 90), (33, -80, 39, 90),               # N-S: main street x=0, side streets x=±36
         (-60, -23, 60, -17), (-60, 9, 60, 15), (-60, 37, 60, 43)]               # E-W: y=-20, 12, 40
for r in ROADS: B("road", *r, 0.03, ROAD, bevel=0.0)

# ---------- the sets (shot list v3) ----------
# 1, 11: the corner store (north-east), roof off, front wall cut; shelves run north-south so the aisles open to the camera
B("store floor", 4, 20, 20, 32, 0.12, CLAY, bevel=0.0)
for a in ((4, 31.7, 20, 32, 4.5), (4, 20, 4.3, 32, 4.5), (19.7, 20, 20, 32, 4.5), (4, 20, 20, 20.3, 0.9)):
    B("store wall", *a)
for x in (6.5, 10.5, 14.5, 18.0): B("store shelf", x - 0.45, 23.5, x + 0.45, 30.5, 1.9, z0=0.12)
# 2: the gas station (west of the main street)
B("canopy", -17, -8, -7, -1, 0.4, z0=4.6)
for x, y in ((-16.5, -7.5), (-7.5, -7.5), (-16.5, -1.5), (-7.5, -1.5)): cyl("canopy post", x, y, 0.2, 4.6, CLAY)
for x in (-14, -10): B("pump", x - 0.4, -4.8, x + 0.4, -4.2, 1.8)
B("kiosk", -19, -13, -13, -10, 3.2)
# 3–5: his house (south), roof off; the driveway to the y=-20 street; the yard tree; the stove
HOME_C = V((12, -31, 0))
B("house floor", 7.5, -34.5, 16.5, -27.5, 0.12, CLAY, bevel=0.0)
for a in ((7.5, -27.8, 16.5, -27.5, 3.0), (7.5, -34.5, 7.8, -33.6, 3.0), (7.5, -32.4, 7.8, -27.5, 3.0), (16.2, -34.5, 16.5, -27.5, 3.0), (7.5, -34.5, 16.5, -34.2, 1.0),
          (11.8, -34.2, 12.1, -30.0, 3.0)):
    B("house wall", *a)
B("door lintel", 7.5, -33.6, 7.8, -32.4, 0.6, z0=2.4)                          # the side door he carries the branches through
STOVE = cyl("stove", 14.5, -28.6, 0.45, 1.0, CLAY, z0=0.12); cyl("flue", 14.5, -28.6, 0.12, 3.6, CLAY, z0=1.1)
B("driveway", 8.5, -27.4, 12.0, -23, 0.035, ROAD, bevel=0.0)
TREE_C = V((3.8, -37.5, 0)); cyl("tree trunk", *TREE_C.xy, 0.25, 3.0, CLAY)
bpy.ops.mesh.primitive_ico_sphere_add(radius=2.2, subdivisions=2, location=(TREE_C.x, TREE_C.y, 4.2)); bpy.context.object.data.materials.append(CLAY)
for k in range(5): o = B("branch", -0.9, -0.06, 0.9, 0.06, 0.12); o.location = (5.6 + k * 0.15, -36 + k * 0.25, 0.06); o.rotation_euler.z = rnd.uniform(-0.6, 0.6)
CAR = bpy.data.objects.new("car", None); sc.collection.objects.link(CAR)
for o in (B("car body", -2.1, -0.9, 2.1, 0.9, 1.0, z0=0.2, bevel=0.15), B("car cab", -1.0, -0.8, 1.2, 0.8, 0.6, z0=1.2, bevel=0.15)): o.parent = CAR
MAPLBL = [label("STORE", (12, 35.5, 0.05), 2.6), label("GAS STATION", (-12, -15.5, 0.05), 2.6), label("HOME", (12, -38.5, 0.05), 2.6)]

# 6: the four companies he understood, around his house — each rises on its word with his green piece
COMPANIES = {}
def company(key, lo, hi, extra=()):
    o = B(key, lo[0], lo[1], hi[0], hi[1], hi[2]); COMPANIES[key] = [o, piece(key, lo, hi)] + list(extra); return o
company("railroad", (24, -38), (31, -26, 4.5), [B("rail", 32.2, -70, 32.6, 5, 0.15, CLAY, z0=0.03), B("rail", 31.2, -70, 31.6, 5, 0.15, CLAY, z0=0.03)])
company("drugstore", (-17, -36), (-8, -27, 5.0))
PH = cyl("phone tower", 14, -52, 0.5, 20, CLAY); COMPANIES["phone"] = [PH, B("phone hut", 11, -55, 15, -53, 2.6), cyl("phone dish", 14, -52, 1.4, 0.3, GREENC, z0=16)]
# 8: the bank tower (x-ray) north-east of his house, with a shaft down to the vault
BC_ = V((24, -3, 0)); BX0, BY0, BX1, BY1, BH = 19, -8, 29, 2, 28
BANKW = [B("bank wall", BX0, BY0, BX1, BY0 + 0.3, BH, XRAY, bevel=0.0), B("bank wall", BX0, BY1 - 0.3, BX1, BY1, BH, XRAY, bevel=0.0),
         B("bank wall", BX0, BY0, BX0 + 0.3, BY1, BH, XRAY, bevel=0.0), B("bank wall", BX1 - 0.3, BY0, BX1, BY1, BH, XRAY, bevel=0.0)]
SH0, SH1 = (BC_.x - 1.5, BC_.y - 1.5), (BC_.x + 1.5, BC_.y + 1.5)               # the shaft opening in every slab
SLABS = []
for k in range(1, 8):
    z = k * 3.5
    for a in ((BX0 + 0.3, BY0 + 0.3, BX1 - 0.3, SH0[1]), (BX0 + 0.3, SH1[1], BX1 - 0.3, BY1 - 0.3), (BX0 + 0.3, SH0[1], SH0[0], SH1[1]), (SH1[0], SH0[1], BX1 - 0.3, SH1[1])):
        SLABS.append(B("bank slab", *a, 0.25, CLAY, z0=z - 0.25, bevel=0.0))
ROOF = B("bank roof", BX0 + 0.3, BY0 + 0.3, BX1 - 0.3, BY1 - 0.3, 0.3, XRAY, z0=BH, bevel=0.0)
COMPANIES["bank"] = BANKW + SLABS + [ROOF, piece("bank", (BX0, BY0), (BX1, BY1, BH + 0.3))]
# the vault at the shaft's foot: deposit boxes on the north side, an open drawer, the stack (38 × 3.35 mm ≈ 5 in)
VX, VY = BC_.x, BC_.y
B("deposit wall", VX - 1.5, VY + 1.2, VX + 1.5, VY + 1.5, 2.4, CLAY, bevel=0.0)
for r in range(4):
    for c in range(5): B("box door", VX - 1.38 + c * 0.56, VY + 1.12, VX - 0.88 + c * 0.56, VY + 1.2, 0.48, CLAY, z0=0.2 + r * 0.54, bevel=0.01)
DRAWER = B("drawer", VX - 0.3, VY, VX + 0.3, VY + 1.12, 0.18, CLAY, z0=0.9, bevel=0.01)
STACK = [B("certificate", VX - 0.18, VY + 0.3, VX + 0.18, VY + 0.8, 0.0033, CLAY, z0=1.08 + k * 0.0034, bevel=0.0) for k in range(38)]
for k in range(0, 38, 6): B("cert edge", VX - 0.19, VY + 0.29, VX + 0.19, VY + 0.81, 0.0008, GREENC, z0=1.08 + k * 0.0034 + 0.0033, bevel=0.0)
RULER = B("ruler", VX + 0.22, VY + 0.5, VX + 0.25, VY + 0.53, 0.127, CLAY, z0=1.08, bevel=0.0)

# 10: the library and the hospital (public; not his), north, stacked in depth for a 3/4 view from the south
LIB = B("library", -19, 46, -5, 54, 7); HOSP = B("hospital", -24, 60, -4, 74, 12)
for x in range(-18, -5, 3): cyl("library column", x + 0.5, 45.6, 0.3, 6, CLAY)
LBL_L, LBL_H = label("$1.2M", (-12, 44.0, 0.06), 3.0), label("$4.8M", (-14, 67, 12.1), 3.4)

# 7: the town — every lot starts as a footprint; 91 more rise with his pieces over L04 (4 + 91 = 95)
SETS = [(3, 19, 21, 33), (-20, -14, -6, 0), (5, -40, 18, -22), (2, -40, 6, -35), (23, -39, 33, -25), (-18, -37, -7, -26), (10, -56, 16, -50),
        (18, -9, 30, 3), (-25, 45, -3, 75)]
def free(x, y, r=4.0):
    if any(a[0] - 3 - r < x < a[2] + 3 + r and a[1] - 3 - r < y < a[3] + 3 + r for a in ROADS): return False
    return not any(a[0] - r < x < a[2] + r and a[1] - r < y < a[3] + r for a in SETS)
LOTS = [(x + rnd.uniform(-0.6, 0.6), y + rnd.uniform(-0.6, 0.6)) for x in range(-62, 64, 9) for y in range(-74, 84, 9) if free(x, y)]
rnd.shuffle(LOTS); LOTS = LOTS[:91]; LOTS.sort(key=lambda p: (V(p) - HOME_C.xy).length)
TOWN = []
for x, y in LOTS:
    sx, sy, h = rnd.uniform(4.5, 6.5), rnd.uniform(4.5, 6.5), rnd.choice((4, 5, 6, 8, 10, 13))
    TOWN.append((BC("town", (x, y), sx, sy, h), piece("town", (x - sx / 2, y - sy / 2), (x + sx / 2, y + sy / 2, h))))
LBL95 = label("95 COMPANIES", (0, 50, 14.0), 7.0)                                # floats over the roofs, upper frame

# ---------- Ronald (stand-in: the MPFB field-jacket man in green) ----------
RON = Person("ron_05", GREENC, GREENC, GREENC, GREENC, name="Ronald")
MOP_AT = V((12.5, 25.5, 0.12))                                                     # the aisle between the middle shelves
PIN_AT = V((13.4, -25.0, 0))                                                       # beside the parked car, facing the camera
RONS = [(0.0, 9.6, MOP_AT, 15, "mop"), (11.9, 14.3, PIN_AT, 20, None), (14.3, 17.8, V((6.0, -34.2, 0.0)), 60, "carry"), (55.0, 58.6, MOP_AT, 15, "mop")]
for t0, t1, p, fc, act in RONS:
    for f in (F(t0), F(t1) - 1):
        RON.place(f, p.xy, fc, z=p.z); (RON.act(f, act, f * 0.25) if act else RON.arms("DOWN", f)); RON.stand(f)
    if act == "mop":
        for f in range(F(t0), F(t1), 6): RON.act(f, "mop", f * 0.25)
MOP = cyl("mop", 0, 0, 0.025, 1.4, CLAY); MOPH = B("mop head", -0.25, -0.1, 0.25, 0.1, 0.06, CLAY); MOPH.parent = MOP; MOPH.location = (0, 0, -0.7)
MOP.location = MOP_AT + V((0.0, -0.75, 0.75)); MOP.rotation_euler = (math.radians(-30), 0, 0)
ZIG = dashed("mop zigzag", [tuple(MOP_AT + V((dx, -1.0 - k * 0.5, 0.02))) for k, dx in enumerate((0.5, -0.5, 0.5, -0.5, 0.5))], DASH, 0.22, 0.14, 0.03)
draw(ZIG, 6, F(4.0), out=F(9.0))
fw = V((math.sin(math.radians(20)), -math.cos(math.radians(20)), 0))
CHEST = PIN_AT + V((0, 0, 1.36)) + fw * 0.12; PIN = cyl("safety pin", 0, 0, 0.007, 0.11, glow("pin", hexc("#DDE3EA"), 1.2))
PIN.location = CHEST + fw * 0.04 + V((0.06, 0.02, 0.02)); PIN.rotation_euler = (math.radians(90), math.radians(60), math.radians(20))

# the route of his life on the map (shot 2): home → gas → store → home
ROUTE = [(10.2, -24), (10.2, -20), (1.5, -20), (1.5, -4.5), (-7, -4.5), (1.5, -4.5), (1.5, 17), (12, 17), (12, 20), (12, 17), (1.5, 17), (1.5, -20), (10.2, -20), (10.2, -24)]
RDASH = dashed("route", ROUTE, DASH, 1.6, 1.0, 0.2, z=0.08); draw(RDASH, F(7.4), F(9.4), out=F(10.4))
# the Toyota drives home down the main street (shot 3), turns in, parks
for t, p, r in ((9.9, (1.5, 8), -90), (10.9, (1.5, -14), -90), (11.4, (6.0, -20.0), -30), (12.0, (10.2, -25.2), -90)):
    CAR.location = (*p, 0); CAR.rotation_euler.z = math.radians(r); CAR.keyframe_insert("location", frame=F(t)); CAR.keyframe_insert("rotation_euler", frame=F(t))
# branches: tree → stove (shot 5)
BDASH = dashed("branch path", [(5.0, -36.2), (6.6, -33.4), (8.6, -33.0), (14.0, -29.2)], DASH, 0.4, 0.25, 0.05, z=0.15); draw(BDASH, F(14.6), F(16.4), out=F(19.0))
for o in MAPLBL: grow([o], F(6.8)); o.keyframe_insert("scale", frame=F(10.2)); o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=F(10.6))
# companies rise on their words (shot 6); coin lines to his house
CW = {"railroad": w("L03", 8), "bank": w("L03", 9), "drugstore": w("L03", 10), "phone": w("L03", 11)}
CENT = {"railroad": V((27.5, -32)), "bank": BC_.xy, "drugstore": V((-12.5, -31.5)), "phone": V((14, -52))}
for k, objs in COMPANIES.items():
    rise([o for o in objs if "piece" not in o.name and "dish" not in o.name], F(CW[k]) + 6); grow([o for o in objs if "piece" in o.name or "dish" in o.name], F(CW[k]) + 14)
    d_ = dashed("coin line", [tuple(CENT[k]), tuple(HOME_C.xy)], DASH, 1.0, 0.7, 0.14, z=0.1); draw(d_, F(w("L03", 19)), F(w("L03", 19)) + 18)
# the town rises over L04 (nearest his house first), each lot with his piece
for k, (o, p) in enumerate(TOWN):
    f = F(w("L04", 3) + 3.6 * k / len(TOWN)) + 12; rise([o], f); grow([p], f + 8)
grow([LBL95], F(w("L04", 16)) + 6); LBL95.keyframe_insert("scale", frame=F(34.8)); LBL95.scale = (0, 0, 0); LBL95.keyframe_insert("scale", frame=F(35.2))
# gifts (shot 10): a dashed line from his house up the main street to the library, then the hospital
GL = dashed("gift", [tuple(HOME_C.xy), (10.2, -20), (-1.5, -20), (-1.5, 40), (-12, 40), (-12, 46)], DASH, 1.6, 1.0, 0.2, z=0.12); draw(GL, F(w("L06", 1)), F(w("L06", 8)))
GH = dashed("gift", [(-1.5, 40), (-1.5, 57), (-14, 57), (-14, 60)], DASH, 1.6, 1.0, 0.2, z=0.12); draw(GH, F(w("L06", 10)), F(w("L06", 15)))
grow([LBL_H], F(w("L06", 8)) + 6); grow([LBL_L], F(w("L06", 15)) + 6)
# commuters (shot 11): white ghost figures on the streets
for k in range(40):
    if k % 2: x, y = rnd.choice((0, -36, 36)) + rnd.uniform(-2, 2), rnd.uniform(-70, 80)
    else: x, y = rnd.uniform(-55, 55), rnd.choice((-20, 12, 40)) + rnd.uniform(-2, 2)
    grow([isotype("commuter", (x, y, 0), GHOST, h=1.8, face=rnd.uniform(0, 360))], F(w("L07", 4)) + 6)

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
ck = [K(0.0, S1, 30, 55, 10, 40, 8.0),                                          # 1 the store cutaway, slow descend to him
      K(4.0, S1, 14, 48, 8, 45, 4.0),
      K(5.4, S1, 13, 48, 8, 45, 4.0),
      K(7.0, (2, -2, 0), 85, 86, 0, 35, 16.0),                                    # 2 rise straight up into the map
      K(9.3, (2, -4, 0), 72, 76, 2, 35, 16.0),
      K(10.5, carat(10.5), 9, 12, 40, 35, 4.0),                                    # 3 down to the street, the car coming toward us
      K(11.1, carat(11.1), 9, 13, 36, 35, 4.0),
      K(11.7, carat(11.7), 9, 15, 30, 35, 4.0),
      K(12.6, CHEST, 4.0, 8, 20, 40, 2.8),                                         # 4 to him beside the car: push in to the pin
      K(13.8, CHEST, 0.95, 4, 20, 60, 2.0),
      K(14.3, CHEST, 1.0, 4, 20, 60, 2.0),
      K(15.3, (9.8, -32, 0.8), 25, 52, 14, 40, 8.0),                              # 5 pull back and up: the house cutaway
      K(17.6, (10, -31.5, 0.8), 31, 60, 18, 40, 8.0),
      K(19.6, (12, -24, 6), 100, 55, 10, 35, 16.0),                                 # 6 map mode around his house, slow orbit
      K(27.8, (12, -24, 6), 104, 58, -10, 35, 16.0),
      K(30.0, (0, -4, 0), 130, 72, 4, 30, 16.0),                                   # 7 rise and widen over the whole town
      K(34.4, (0, 0, 0), 150, 82, 2, 30, 16.0),
      (F(35.4), V((VX, VY - 1.0, 50)), V((VX, VY, 26)), 35, 11.0),                # 8 dive into the bank, down its shaft
      (F(36.7), V((VX, VY - 0.8, 12)), V((VX, VY + 0.2, 1.2)), 40, 8.0),
      (F(37.9), V((VX + 0.55, VY - 0.85, 2.25)), V((VX, VY + 0.55, 1.12)), 45, 2.8),
      (F(39.1), V((VX + 0.55, VY - 0.8, 2.35)), V((VX, VY + 0.55, 1.15)), 45, 2.8),
      (F(40.4), V((VX, VY - 0.7, 9)), V((VX, VY + 0.3, 1.5)), 40, 8.0),           # 9 rise up the shaft and out over the town
      K(42.9, (0, -2, 0), 120, 70, 4, 30, 16.0),
      K(45.6, (-2, 10, 0), 120, 66, 0, 30, 16.0),                                  # 10 drift north to the library and hospital
      K(48.4, (-8, 30, 0), 100, 60, -4, 30, 16.0),
      K(50.6, (-14, 59, 5), 72, 38, -8, 35, 11.0),                                 #    lower to 3/4 on both
      K(53.6, (0, 2, 0), 150, 72, 4, 30, 16.0),                                    # 11 pull up over the town
      K(56.4, S1, 20, 50, 10, 45, 5.6),                                            #    settle on the store: him mopping again
      K(58.6, S1, 18, 50, 10, 45, 5.6)]
rig = PerspRig(); ck.sort(key=lambda k_: k_[0]); rig.keys(ck, drift=0.02)
for label_ in [o for o in bpy.data.objects if o.name.startswith("label")]: label_.visible_shadow = False
for f in range(N): rig.set(f)

SHOTS = [3.0, 8.6, 11.0, 13.7, 15.6, 24.0, 33.2, 37.9, 41.6, 50.4, 57.2]           # one still per shot (board)
if "board" in A or "still" in A:
    fr = [F(t) for t in SHOTS] if "board" in A else [int(x) for x in A[A.index("still") + 1].split(",")]
    for f in fr:
        sc.frame_set(f); sc.render.filepath = f"{OUT}/b_{f:04d}.png"; bpy.ops.render.render(write_still=True)

# EX22 "The Freezer Password" — a short news explainer in the EX14 smooth-isometric look (user 2026-11-05/06): a dark
# isometric world, greys + one green (the hack), Isotype people posed only, one continuous orthographic camera, 60 fps.
# Gate 2 blocking approved with notes (review/gate2_board.png, build/episode_v1_blocking.py); gate 3 = real models
# (freezers, skip, laptop, padlock, calendar, fridge, till), recognisable stores and shop, the real date as the password.
#   blender -b --python build/episode.py -- <out_dir> board [half]   one still per shot
#   blender -b --python build/episode.py -- <out_dir> still f,f,… [half]
import sys, os, math, json, random, bpy
from mathutils import Vector as V
EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/"; sys.path.insert(0, EP + "../../tools/blender")
from isokit import *
from camkit import render_range
A = sys.argv[sys.argv.index("--") + 1:]; OUT = A[0]
sc = setup(half="half" in A)
VT = json.load(open(EP + "audio/vo_timeline.json")); VW = VT["words"]
def t(L, i): return VW[L][i][1]
def F(s): return int(round(s * FPS))
N = int(math.ceil(VT["end"] * FPS)); sc.frame_start, sc.frame_end = 0, N - 1
rnd = random.Random(22)

M_FLOOR, M_WALL, M_FURN, M_PEOPLE = mat("floor", FLOOR), mat("wall", WALL), mat("furniture", FURN), mat("people", PEOPLE)
M_WARM = mat("warm type", WARM, 0.6); M_G = mat("green", ACCENT, 0.5); M_GLOW = mat("green glow", ACCENT, 3.0)
M_HEAT = mat("heat", hexc("#B9B3AA"), 0.5); M_MAP = mat("map", hexc("#16161A")); M_LAND = mat("land", hexc("#202026"))
def label(s, at_, size, m=M_WARM, rot=(0, 0, 0), align="CENTER"):
    bpy.ops.object.text_add(location=at_); o = bpy.context.object; o.name = "label " + s; o.data.body = s; o.data.size = size
    o.data.align_x = align; o.data.align_y = "CENTER"; o.rotation_euler = rot; o.data.materials.append(m); return o
def grow(objs, f, d=24):
    for o in objs:
        s = o.scale.copy(); o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=0); o.keyframe_insert("scale", frame=max(1, f - d))
        o.scale = s; o.keyframe_insert("scale", frame=f)
def line(name, a, b, m=M_GLOW, r=0.08, arc=0.0):
    """a thin glowing line from a to b (an optional arch), drawn over time with draw()."""
    a, b = V(a), V(b); cu = bpy.data.curves.new(name, "CURVE"); cu.dimensions = "3D"; sp = cu.splines.new("POLY"); n = 24; sp.points.add(n - 1)
    for k, p in enumerate(sp.points):
        u = k / (n - 1); q = a.lerp(b, u) + V((0, 0, arc * 4 * u * (1 - u))); p.co = (q.x, q.y, q.z, 1)
    cu.bevel_depth = r; cu.bevel_resolution = 3; cu.bevel_factor_mapping_end = "SPLINE"; cu.bevel_factor_end = 0.0
    o = bpy.data.objects.new(name, cu); sc.collection.objects.link(o); o.data.materials.append(m); return o
def draw(o, f0, f1):
    o.data.bevel_factor_end = 0.0; o.data.keyframe_insert("bevel_factor_end", frame=0); o.data.keyframe_insert("bevel_factor_end", frame=f0)
    o.data.bevel_factor_end = 1.0; o.data.keyframe_insert("bevel_factor_end", frame=f1)

# ---------- library models in the EX14 palette (flat greys; the accent stays green) ----------
sys.path.insert(0, EP + "../../tools/blender"); from lib3d import model as _model, credits_for
def flat(name, m=M_FURN, **kw):
    """a library model in one flat grey (EX14: shapes read by value, not texture)."""
    r = _model(name, **kw)
    for c in [r] + list(r.children_recursive):
        if c.type == "MESH": c.data.materials.clear(); c.data.materials.append(m)
    return r
TPL = {}
def inst(name, at_, face=0.0, height=None, length=None, m=M_FURN):
    if name not in TPL:
        tp = flat(name, m, height=1.0, at=(0, 0, -500)); TPL[name] = tp
        for c in tp.children: c.hide_render = True; c.hide_viewport = True
    tp = TPL[name]; d = V(tp["dims"]); k = height / d.z if height else length / max(d.x, d.y)
    r = bpy.data.objects.new(name, None); sc.collection.objects.link(r)
    for c in tp.children:
        n_ = c.copy(); sc.collection.objects.link(n_); n_.parent = r; n_.hide_render = False; n_.hide_viewport = False
    r.scale = tp.scale * k; r.location = at_; r.rotation_euler.z = math.radians(face); return r

# ---------- the map: France as l'Hexagone (its nickname), hundreds of small supermarkets across it ----------
box("ground", -2000, -2000, 2000, 2000, 0.1, M_MAP, z0=-0.1, bevel=0)
HEX_R = 140; M_LAND = mat("land lit", hexc("#2A2A31"))
bpy.ops.mesh.primitive_cylinder_add(vertices=6, radius=HEX_R, depth=0.2, location=(0, 0, 0.0)); FR = bpy.context.object; FR.name = "France (l'Hexagone)"
FR.data.materials.append(M_LAND); FR.rotation_euler.z = math.radians(30)
label("FRANCE", (-70, -105, 0.3), 16, m=mat("map type", hexc("#6A6A74"), 0.4))
def in_hex(x, y, r=HEX_R * 0.86): return abs(x) < r and abs(y) < r * 0.98 and abs(x) * 0.5 + abs(y) * 0.866 < r * 0.92
SIGNM = colmat("store sign", emit=1.2)                                           # each store's sign: cool white, turns green when it is hit
STORES, SIGNS = [], []
for gx in range(-120, 121, 12):
    for gy in range(-120, 121, 12):
        x, y = gx + rnd.uniform(-3, 3), gy + rnd.uniform(-3, 3)
        if in_hex(x, y) and (abs(x) > 16 or abs(y) > 16):
            STORES.append(box("supermarket", x - 2.2, y - 1.6, x + 2.2, y + 1.6, 1.7, M_WALL, bevel=0.06))
            box("roof unit", x + 0.6, y - 0.2, x + 1.6, y + 0.8, 0.5, M_FURN, z0=1.7, bevel=0.04)
            sg = box("store sign", x - 1.8, y - 1.68, x + 1.8, y - 1.6, 0.4, SIGNM, z0=1.15, bevel=0); SIGNS.append(sg)
for sg in SIGNS:                                                                  # the hack spreads out from the centre, store by store
    d = (sg.location.xy).length; f_ = F(t("L01", 11)) + int(d / HEX_R * 50)
    sg.color = (0.75, 0.78, 0.82, 1); sg.keyframe_insert("color", frame=0); sg.keyframe_insert("color", frame=f_)
    sg.color = ACCENT; sg.keyframe_insert("color", frame=f_ + 8)
FIRES = [rnd.choice(STORES) for _ in range(9)]

# ---------- 1–3: the hero supermarket, roof off: a row of real display freezers, their lights going warm ----------
SUP = [box("store floor", -9, -6, 9, 6, 0.1, M_FLOOR, bevel=0)]
for a in ((-9, 5.7, 9, 6, 4), (-9, -6, -8.7, 6, 4), (8.7, -6, 9, 6, 4), (-9, -6, 9, -5.7, 1.2)): SUP.append(box("store wall", *a[:4], a[4], M_WALL))
ROOF = box("store roof", -9, -6, 9, 6, 0.4, M_WALL, z0=4.0)
ROOF.keyframe_insert("location", frame=F(t("L01", 9)) - 4); ROOF.location.y += 60; ROOF.location.z += 2; ROOF.keyframe_insert("location", frame=F(t("L01", 12)))
SIGN = label("SUPERMARKET", (0, -6.1, 3.0), 1.2, rot=(math.pi / 2, 0, 0))
FREEZERS, FLIGHT = [], []
INNER = colmat("freezer light", emit=1.4)                                        # the light inside each freezer: icy blue → warm
for k in range(6):
    fz = inst("freezer_super", (-6.6 + k * 2.4, 4.6, 0.1), 180, height=2.6, m=M_FURN); FREEZERS.append(fz)
    bpy.context.view_layer.update(); _fy = min((fz.matrix_world @ c.matrix_basis @ V(b)).y for c in fz.children for b in c.bound_box) if False else 4.6 - 0.43 * 2.6 / 2
    li = box("freezer glass", -7.1 + k * 2.4, 4.08, -6.1 + k * 2.4, 4.11, 1.8, INNER, z0=0.45, bevel=0); FLIGHT.append(li)   # the lit glass door, on the aisle side
    for r_ in range(3): box("freezer shelf", -7.1 + k * 2.4, 4.06, -6.1 + k * 2.4, 4.08, 0.04, M_FURN, z0=0.9 + r_ * 0.5, bevel=0)
    f_ = F(t("L01", 15)) + k * 7
    li.color = (0.55, 0.68, 0.85, 1); li.keyframe_insert("color", frame=0); li.keyframe_insert("color", frame=f_)
    li.color = (0.95, 0.62, 0.34, 1); li.keyframe_insert("color", frame=f_ + 30)     # (warm: the only off-palette note, the heat itself)
SIG = line("hack signal", (-60, -40, 12), (-6, 4.0, 2.6), arc=8.0); draw(SIG, F(t("L01", 9)), F(t("L01", 15)))
THERMO = [box("thermometer", 6.0, 3.9, 7.0, 4.1, 3.4, M_FURN, z0=0.6, bevel=0.12), box("mercury", 6.35, 3.88, 6.65, 3.9, 3.0, mat("mercury", hexc("#E06A3A"), 1.0), z0=0.8, bevel=0)]
THERMO[1].scale.z = 0.1; THERMO[1].keyframe_insert("scale", frame=F(t("L01", 15))); THERMO[1].scale.z = 1.0; THERMO[1].keyframe_insert("scale", frame=F(t("L02", 0)))
TRD = bpy.data.objects.new("temperature readout", None); sc.collection.objects.link(TRD); TRD.location = (5.6, 0.6, 2.6)
_plate = box("readout plate", -1.7, -0.06, 1.7, 0.06, 1.5, mat("readout", hexc("#121216")), z0=-0.75, bevel=0.12)
_ring = box("readout rim", -1.78, -0.04, 1.78, 0.04, 1.62, mat("mercury", hexc("#E06A3A"), 1.0), z0=-0.81, bevel=0.14)
T50 = label("50 °C", (0, -0.08, 0), 1.0, m=mat("readout type", hexc("#F2A36A"), 1.6), rot=(math.pi / 2, 0, 0))
for o in (_plate, _ring, T50): o.parent = TRD
TRD.rotation_euler.z = math.radians(45); grow([TRD], F(t("L02", 0)) + 6)                       # square to the camera; hot orange on black
TRD.keyframe_insert("scale", frame=F(t("L02", 9)) + 20); _s = TRD.scale.copy(); TRD.scale = (0, 0, 0); TRD.keyframe_insert("scale", frame=F(t("L02", 9)) + 40); TRD.scale = _s   # inside the frame, by the freezers
SKIP = inst("dumpster_q", (12.0, -1.0, 0.1), 45, length=4.2, m=M_FURN)
FOOD = [box("food", 11.0 + (k % 3) * 0.8, -1.7 + (k // 3) * 0.8, 11.6 + (k % 3) * 0.8, -1.1 + (k // 3) * 0.8, 0.45, M_PEOPLE, z0=1.9) for k in range(6)]
grow(FOOD, F(t("L02", 5)) + 10)
FLM = mat("flame", hexc("#E8823A"), 2.5); FL_ = []
for s_ in FIRES:
    bpy.ops.mesh.primitive_cone_add(vertices=8, radius1=0.9, radius2=0.0, depth=2.4, location=(s_.location.x, s_.location.y, 2.9)); c = bpy.context.object; c.data.materials.append(FLM); FL_.append(c)
grow(FL_, F(t("L02", 6)) + 12)

# ---------- 4–6: the controller on the back wall, a cable to the internet, the login panel, a real calendar ----------
CTRL = box("freezer controller", -2.0, 5.2, 0.0, 5.7, 1.4, M_FURN, z0=2.6); cyl("controller light", -0.4, 5.15, 0.08, 0.02, M_GLOW, z0=3.6, verts=12).rotation_euler.x = math.pi / 2
bpy.ops.mesh.primitive_uv_sphere_add(radius=1.5, location=(-3.2, 7.4, 11.4), segments=16, ring_count=8); GLOBE = bpy.context.object
GLOBE.data.materials.append(M_WARM); w_ = GLOBE.modifiers.new("w", "WIREFRAME"); w_.thickness = 0.09; grow([GLOBE], F(t("L03", 9)) + 6)
bpy.ops.mesh.primitive_uv_sphere_add(radius=1.42, location=(-3.2, 7.4, 11.4), segments=32, ring_count=16); _gc = bpy.context.object; _gc.data.materials.append(mat("globe core", hexc("#1E1E24"))); grow([_gc], F(t("L03", 9)) + 6)
GLL = label("INTERNET", (-3.2, 7.4, 9.4), 0.6, rot=(math.pi / 2, 0, math.radians(45))); grow([GLL], F(t("L03", 9)) + 10)
CABLE = line("cable to the internet", (-1, 5.5, 4.0), (-3.2, 7.4, 9.9), m=M_G, r=0.06, arc=1.5); draw(CABLE, F(t("L03", 9)) - 6, F(t("L03", 9)) + 18)
PANEL = [box("login panel", -5.5, 6.5, 3.5, 6.7, 5.2, mat("panel", hexc("#24242A")), z0=4.5, bevel=0.15)]
PANEL += [label("USERNAME", (-4.8, 6.45, 8.6), 0.55, align="LEFT", rot=(math.pi / 2, 0, 0)), label("admin", (-1.0, 6.45, 8.6), 0.7, m=M_G, align="LEFT", rot=(math.pi / 2, 0, 0)),
          label("PASSWORD", (-4.8, 6.45, 7.2), 0.55, align="LEFT", rot=(math.pi / 2, 0, 0))]
PWD = label("11·10·2026", (-1.0, 6.45, 7.2), 0.75, m=M_G, align="LEFT", rot=(math.pi / 2, 0, 0))   # the night of the attack (illustrative format)
PWD2 = label("12·10·2026", (-1.0, 6.45, 7.2), 0.75, m=M_G, align="LEFT", rot=(math.pi / 2, 0, 0))  # the next day: the password changes with it
grow(PANEL, F(t("L03", 12)) + 6); grow([PWD], F(t("L03", 19)) + 4)
PWD.keyframe_insert("scale", frame=F(t("L03", 22))); s0_ = PWD.scale.copy(); PWD.scale = (0, 0, 0); PWD.keyframe_insert("scale", frame=F(t("L03", 22)) + 8); PWD.scale = s0_
grow([PWD2], F(t("L03", 22)) + 16)
CALM = flat("calendar_tb", M_WARM, length=2.2, at=(2.3, 6.2, 4.55), face=0)
INK = mat("calendar ink", hexc("#2E2E34")); RED = mat("calendar red", hexc("#C8473A"))
DAYL = [label("11", (2.3, 5.72, 5.95), 0.75, m=INK, rot=(math.radians(75), 0, 0)), label("12", (2.3, 5.72, 5.95), 0.75, m=INK, rot=(math.radians(75), 0, 0))]
WKD = [label("SUNDAY", (2.3, 5.68, 5.45), 0.22, m=RED, rot=(math.radians(75), 0, 0)), label("MONDAY", (2.3, 5.68, 5.45), 0.22, m=INK, rot=(math.radians(75), 0, 0))]
MON = label("OCTOBER 2026", (2.3, 5.78, 6.45), 0.2, m=RED, rot=(math.radians(75), 0, 0))
GRID = []
for d_ in range(1, 32):                                                           # the month: Oct 2026 starts on a Thursday
    col, row = (d_ + 2) % 7, (d_ + 2) // 7
    GRID.append(label(str(d_), (1.62 + col * 0.23, 5.62 + row * 0.03, 5.22 - row * 0.12), 0.08, m=RED if d_ == 11 else INK, rot=(math.radians(75), 0, 0)))
grow([MON] + GRID + [WKD[0]], F(t("L03", 18)) + 6)
WKD[0].keyframe_insert("scale", frame=F(t("L03", 20))); _s = WKD[0].scale.copy(); WKD[0].scale = (0, 0, 0); WKD[0].keyframe_insert("scale", frame=F(t("L03", 20)) + 6); WKD[0].scale = _s
grow([WKD[1]], F(t("L03", 20)) + 14)
grow([CALM] + [DAYL[0]], F(t("L03", 18)) + 6)
DAYL[0].keyframe_insert("scale", frame=F(t("L03", 20))); s0_ = DAYL[0].scale.copy(); DAYL[0].scale = (0, 0, 0); DAYL[0].keyframe_insert("scale", frame=F(t("L03", 20)) + 6); DAYL[0].scale = s0_
grow([DAYL[1]], F(t("L03", 20)) + 14)                                             # "Change the day": the calendar turns to 12 …
PIV = V((0, 6.6, 7.0)); LG = bpy.data.objects.new("login group", None); sc.collection.objects.link(LG); LG.location = PIV; bpy.context.view_layer.update()
for o in PANEL + [PWD, PWD2, CALM] + DAYL + WKD + [MON] + GRID:
    o.parent = LG; o.matrix_parent_inverse = LG.matrix_world.inverted()
LG.rotation_euler.z = math.radians(45)                                            # square to the camera
PEOPLE_ = []
for k in range(6):                                                               # "anyone": a row of people at laptops, each wired to a store
    p = person("anyone", M_PEOPLE, h=2.0); p.location = (-30 + k * 5, -28, 0); p.rotation_euler.z = math.radians(180); PEOPLE_.append(p)
    inst("laptop_k", (-30 + k * 5, -26.8, 0.95), 180, length=0.9, m=M_FURN); box("desk", -31 + k * 5, -27.4, -29 + k * 5, -26.2, 0.9, M_WALL, bevel=0.05)
    s_ = rnd.choice(STORES); l_ = line("anyone's line", (-30 + k * 5, -26.6, 1.3), (s_.location.x, s_.location.y, 1.8), arc=10); draw(l_, F(t("L03", 27)) + k * 4, F(t("L03", 33)) + k * 4)

# ---------- 7: Europe, north-up: France among the other countries hit on 2 November, green lines out ----------
EU = {"BELGIUM": (30, 190), "LUXEMBOURG": (110, 150), "NETHERLANDS": (55, 270), "SWEDEN": (120, 520), "ESTONIA": (230, 470),
      "IRELAND": (-175, 300), "PORTUGAL": (-165, -215)}
for name, (x, y) in EU.items():
    bpy.ops.mesh.primitive_cylinder_add(vertices=7, radius=rnd.uniform(38, 55), depth=0.2, location=(x, y, 0)); c = bpy.context.object; c.data.materials.append(M_LAND)
    label(name, (x, y - 4, 0.3), 30)
    l_ = line("spread " + name, (0, 0, 2), (x, y, 2), arc=60, r=2.2); draw(l_, F(t("L04", 3)) + rnd.randint(0, 20), F(t("L04", 6)) + 30)

# ---------- 8: your shop: a little corner shop — sign, shelves of goods, a drinks fridge, the till; the door padlocked;
# in the back room, the router you plugged in years ago, its green light blinking, dust on it ----------
YS = V((70, -60, 0))
box("your shop floor", YS.x - 6, YS.y - 4.5, YS.x + 6, YS.y + 4.5, 0.1, M_FLOOR, bevel=0)
for a in ((-6, 4.2, 6, 4.5, 3.2), (-6, -4.5, -5.7, 4.5, 3.2), (5.7, -4.5, 6, 4.5, 3.2), (-6, -4.5, 6, -4.2, 1.0), (1.6, -4.2, 1.9, 4.2, 3.2)):
    box("your shop wall", YS.x + a[0], YS.y + a[1], YS.x + a[2], YS.y + a[3], a[4], M_WALL)
label("YOUR SHOP", (YS.x - 2.0, YS.y - 4.6, 2.3), 0.9, rot=(math.pi / 2, 0, 0))
DOOR = box("door", YS.x - 4.6, YS.y - 4.6, YS.x - 3.0, YS.y - 4.4, 2.3, M_FURN, z0=0.1)
LOCK = flat("padlock_q", M_G, height=0.5, at=(YS.x - 3.4, YS.y - 4.72, 1.0), face=0)
for x in (-5.0, -2.5):
    inst("shelf_tall", (YS.x + x, YS.y + 3.6, 0.1), 0, height=2.3, m=M_FURN)
    for r_ in range(3):
        for c_ in range(4): box("goods", YS.x + x - 0.55 + c_ * 0.3, YS.y + 3.45, YS.x + x - 0.35 + c_ * 0.3, YS.y + 3.75, 0.25, M_PEOPLE, z0=0.55 + r_ * 0.62, bevel=0.02)
inst("fridge_glass", (YS.x + 0.6, YS.y + 3.5, 0.1), 0, height=2.0, m=M_FURN)
box("counter", YS.x - 4.5, YS.y - 1.5, YS.x - 1.5, YS.y - 0.7, 1.0, M_WALL, z0=0.1); inst("cash_register", (YS.x - 3.0, YS.y - 1.1, 1.1), 180, length=0.7, m=M_FURN)
box("back shelf", YS.x + 2.6, YS.y + 3.4, YS.x + 5.4, YS.y + 4.1, 1.6, M_FURN, z0=0.1)
ROUTER = [box("router", YS.x + 3.4, YS.y + 3.5, YS.x + 4.6, YS.y + 3.95, 0.22, mat("router white", hexc("#D8D8DC")), z0=1.7, bevel=0.05)]
for x in (3.55, 4.45):
    a_ = cyl("antenna", YS.x + x, YS.y + 3.9, 0.035, 0.7, mat("router white", hexc("#D8D8DC")), z0=1.92, verts=12); a_.rotation_euler.x = math.radians(-10); ROUTER.append(a_)
LEDS = [cyl("router light", YS.x + 3.6 + k * 0.18, YS.y + 3.49, 0.035, 0.01, M_GLOW, z0=1.83, verts=12) for k in range(4)]
for l_ in LEDS: l_.rotation_euler.x = math.pi / 2
for k in range(0, N, 24):
    for j, l_ in enumerate(LEDS): l_.scale = (1, 1, 1) if ((k // 24) + j) % 2 else (0.3, 0.3, 0.3); l_.keyframe_insert("scale", frame=k)
DUST = mat("dust", hexc("#8E8E96"))
for k in range(40): box("dust", YS.x + rnd.uniform(3.45, 4.55), YS.y + rnd.uniform(3.52, 3.93), YS.x + 0.0001, YS.y + 0.0001, 0.004, DUST, z0=1.92, bevel=0).scale = (0.025, 0.025, 1)
line("its cable", (YS.x + 4.6, YS.y + 3.7, 1.8), (YS.x + 5.6, YS.y + 4.1, 0.3), m=M_G, r=0.03).data.bevel_factor_end = 1.0

# ---------- camera: one continuous isometric move (EX14 grammar) ----------
ISO_T, ISO_S = 54.7356, 45
CK = [(0, V((0, 0, 0)), 0.0, 0, 26),                                             # 1 frame 1 already moving: top-down on the store
      (F(t("L01", 8)), V((0, 0, 1)), ISO_T, ISO_S, 24),                          #   swoops into iso
      (F(t("L01", 15)), V((-0.5, 3.5, 1.5)), ISO_T, ISO_S, 17),                      # 2 push into the freezer aisle
      (F(t("L02", 3)), V((4.5, 2.5, 1.5)), ISO_T, ISO_S, 18),                        # 3 the thermometer, the skip
      (F(t("L02", 9)), V((0, 0, 0)), ISO_T, ISO_S, 330),                         #   long pull-out: hundreds of stores across France
      (F(t("L03", 5)), V((-1, 4, 3)), ISO_T, ISO_S, 30),                         # 4 glide to the controller, rise to the login
      (F(t("L03", 13)), V((-0.5, 6.6, 7.2)), ISO_T, ISO_S, 21),
      (F(t("L03", 19)), V((0.2, 6.6, 7.2)), ISO_T, ISO_S, 19),                         # 5 the password field, the calendar
      (F(t("L03", 24)), V((0.8, 6.6, 7.2)), ISO_T, ISO_S, 19),
      (F(t("L03", 28)), V((-20, -27, 1.5)), ISO_T, ISO_S, 24),                     # 6 along the row of "anyone"
      (F(t("L03", 34)), V((-14, -27, 1.5)), ISO_T, ISO_S, 26),
      (F(t("L04", 1)), V((5, 150, 0)), 18, 0, 1010),                              # 7 rise high, swing north-up: Europe
      (F(t("L04", 6)) + 20, V((5, 160, 0)), 16, 0, 1040),
      (F(t("L05", 4)), V((YS.x, YS.y, 1)), ISO_T, ISO_S, 20),                    # 8 swoop down to your shop
      (F(t("L05", 9)), V((YS.x - 2, YS.y - 1, 1)), ISO_T, ISO_S, 15),
      (F(t("L05", 12)), V((YS.x + 4, YS.y + 3.6, 1.9)), ISO_T, ISO_S, 5),          #   push into the back room: the box
      (N - 1, V((YS.x + 4, YS.y + 3.7, 1.95)), ISO_T, ISO_S, 4.2)]
rig = Rig(); rig.keys(CK); rig.cam.location = (0, 0, 1500); rig.cam.data.clip_end = 5000   # the tilted Europe view reached past the kit's 300 m clip
for f in range(N): rig.set(f)

json.dump(credits_for(), open(EP + "build/model_credits.json", "w"), indent=1)
BOARD = [F(1.5), F(t("L01", 17)), F(t("L02", 9)) + 20, F(t("L03", 13)) + 10, F(t("L03", 19)) + 20, F(t("L03", 33)), F(t("L04", 6)) + 20, F(t("L05", 7)), F(t("L05", 17)) + 20]
if "check" in A:
    for a_ in bpy.data.screens:
        for ar in a_.areas:
            if ar.type == "VIEW_3D":
                for sp_ in ar.spaces:
                    if sp_.type == "VIEW_3D": sp_.shading.type = "MATERIAL"; sp_.region_3d.view_perspective = "CAMERA"
    sc.frame_set(0); bpy.ops.wm.save_as_mainfile(filepath=EP + "EX22_check.blend", compress=True)
elif "board" in A or "still" in A:
    fr = BOARD if "board" in A else [int(x) for x in A[A.index("still") + 1].split(",")]
    for f in fr:
        sc.frame_set(f); sc.render.filepath = f"{OUT}/b_{f:04d}.png"; bpy.ops.render.render(write_still=True)
else:                                                                             # the full render: out/frames/f_0000.png …
    render_range(f"{OUT}/f_", 0, N - 1)

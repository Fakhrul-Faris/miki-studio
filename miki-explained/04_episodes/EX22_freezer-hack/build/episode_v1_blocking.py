# EX22 "The Freezer Password" — a short news explainer in the EX14 smooth-isometric look (user 2026-11-05/06): a dark
# isometric world, greys + one green (the hack), Isotype people posed only, one continuous orthographic camera, 60 fps.
# Stage: BLOCKING (gate 2) — grey boxes and the real camera path.
#   blender -b --python build/episode.py -- <out_dir> board [half]   one still per shot
#   blender -b --python build/episode.py -- <out_dir> still f,f,… [half]
import sys, os, math, json, random, bpy
from mathutils import Vector as V
EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/"; sys.path.insert(0, EP + "../../tools/blender")
from isokit import *
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

# ---------- the map: France as l'Hexagone, hundreds of small stores across it ----------
box("ground", -2000, -2000, 2000, 2000, 0.1, M_MAP, z0=-0.1, bevel=0)
HEX_R = 140
bpy.ops.mesh.primitive_cylinder_add(vertices=6, radius=HEX_R, depth=0.2, location=(0, 0, 0.0)); FR = bpy.context.object; FR.name = "France (l'Hexagone)"
FR.data.materials.append(M_LAND); FR.rotation_euler.z = math.radians(30)
def in_hex(x, y, r=HEX_R * 0.86): return abs(x) < r and abs(y) < r * 0.98 and abs(x) * 0.5 + abs(y) * 0.866 < r * 0.92
STORES = []
for gx in range(-120, 121, 12):
    for gy in range(-120, 121, 12):
        x, y = gx + rnd.uniform(-3, 3), gy + rnd.uniform(-3, 3)
        if in_hex(x, y) and (abs(x) > 14 or abs(y) > 14): STORES.append(box("store", x - 2, y - 1.5, x + 2, y + 1.5, 1.6, M_WALL, bevel=0.05))
FIRES = [rnd.choice(STORES) for _ in range(8)]

# ---------- 1–3: the hero supermarket at the centre, roof off, the freezer aisle, a thermometer, a skip ----------
SUP = [box("store floor", -9, -6, 9, 6, 0.1, M_FLOOR, bevel=0)]
for a in ((-9, 5.7, 9, 6, 4), (-9, -6, -8.7, 6, 4), (8.7, -6, 9, 6, 4), (-9, -6, 9, -5.7, 1.2)): SUP.append(box("store wall", *a[:4], a[4], M_WALL))
ROOF = box("store roof", -9, -6, 9, 6, 0.4, M_WALL, z0=4.0)
ROOF.location.z += 0; ROOF.keyframe_insert("location", frame=F(t("L01", 9)) - 4); ROOF.location.y += 60; ROOF.location.z += 2; ROOF.keyframe_insert("location", frame=F(t("L01", 12)))
SIGN = label("SUPERMARKET", (0, -6.1, 3.0), 1.2, rot=(math.pi / 2, 0, 0))
FREEZERS = [box("freezer", -7 + k * 2.4, 1.0, -5.2 + k * 2.4, 3.2, 1.1, M_FURN) for k in range(6)]
FROST = [box("frost", -6.9 + k * 2.4, 1.1, -5.3 + k * 2.4, 3.1, 0.06, mat("frost", hexc("#9AA6B4"), 0.4), z0=1.1, bevel=0) for k in range(6)]
SIG = line("hack signal", (-60, -40, 12), (-6, 2, 1.6), arc=8.0); draw(SIG, F(t("L01", 9)), F(t("L01", 15)))
for k, (fz, fr_) in enumerate(zip(FREEZERS, FROST)):                             # each freezer's frost turns to heat as the signal reaches it
    f_ = F(t("L01", 15)) + k * 6; fr_.data.materials[0] = M_HEAT if False else fr_.data.materials[0]
    h = box("heat haze", fz.location.x - 0.8, 1.2, fz.location.x + 0.8, 3.0, 0.9, M_HEAT, z0=1.2, bevel=0.2); grow([h], f_ + 18)
THERMO = [cyl("thermometer", 6.5, 3.5, 0.18, 3.2, M_FURN, z0=0.1), cyl("mercury", 6.5, 3.5, 0.12, 3.0, M_HEAT, z0=0.2)]
THERMO[1].scale.z = 0.1; THERMO[1].keyframe_insert("scale", frame=F(t("L01", 15))); THERMO[1].scale.z = 1.0; THERMO[1].keyframe_insert("scale", frame=F(t("L02", 0)))
grow([label("50 °C", (6.5, 3.5, 4.0), 0.9, rot=(math.pi / 2, 0, math.radians(45)))], F(t("L02", 0)) + 6)
SKIP = box("skip", 10.5, -2, 14, 1, 1.4, M_FURN); FOOD = [box("food", 11 + (k % 3) * 0.9, -1.5 + (k // 3) * 0.9, 11.7 + (k % 3) * 0.9, -0.8 + (k // 3) * 0.9, 0.5, M_PEOPLE, z0=1.4) for k in range(6)]
grow(FOOD, F(t("L02", 5)) + 10)
FL_ = []
for s_ in FIRES:
    c = cyl("fire", s_.location.x, s_.location.y, 0.6, 1.4, M_HEAT, z0=1.6, verts=12); FL_.append(c)
grow(FL_, F(t("L02", 6)) + 12)
LOSS = label("− €  TENS OF MILLIONS", (16, 2, 6), 1.3, rot=(math.radians(55), 0, math.radians(45)))       # the loss counter (EffectCraft rolls the digits)

# ---------- 4–6: the controller box on the back wall, a cable up to a globe, the login panel, the calendar ----------
CTRL = box("freezer controller", -2.0, 5.2, 0.0, 5.7, 1.4, M_FURN, z0=1.6)
bpy.ops.mesh.primitive_uv_sphere_add(radius=2.0, location=(-1, 6, 12), segments=24, ring_count=12); GLOBE = bpy.context.object
GLOBE.data.materials.append(M_WALL); w_ = GLOBE.modifiers.new("w", "WIREFRAME"); w_.thickness = 0.06; GLOBE.location = (5, 9, 13); grow([GLOBE], F(t("L03", 9)) + 6)
CABLE = line("cable to the internet", (-1, 5.5, 3.0), (5, 9, 11), m=M_G, r=0.05, arc=2); draw(CABLE, F(t("L03", 9)) - 6, F(t("L03", 9)) + 18)
PANEL = [box("login panel", -5.5, 6.5, 3.5, 6.7, 5.2, mat("panel", hexc("#24242A")), z0=4.5, bevel=0.15)]
PANEL += [label("USERNAME", (-4.8, 6.45, 8.6), 0.55, align="LEFT", rot=(math.pi / 2, 0, 0)), label("admin", (-1.0, 6.45, 8.6), 0.7, m=M_G, align="LEFT", rot=(math.pi / 2, 0, 0)),
          label("PASSWORD", (-4.8, 6.45, 7.2), 0.55, align="LEFT", rot=(math.pi / 2, 0, 0))]
PWD = label("DD · MM · YYYY", (-1.0, 6.45, 7.2), 0.7, m=M_G, align="LEFT", rot=(math.pi / 2, 0, 0))
grow(PANEL, F(t("L03", 12)) + 6); grow([PWD], F(t("L03", 19)) + 4)
CAL = [box("calendar", 4.5, 6.0, 7.5, 6.6, 3.2, M_WARM, z0=4.6, bevel=0.1), label("DATE", (6.0, 5.95, 6.6), 0.6, m=M_FURN, rot=(math.pi / 2, 0, 0))]
grow(CAL, F(t("L03", 18)) + 6)
PIV = V((0, 6.6, 7.0)); LG = bpy.data.objects.new("login group", None); sc.collection.objects.link(LG); LG.location = PIV; bpy.context.view_layer.update()
for o in PANEL + [PWD] + CAL:
    o.parent = LG; o.matrix_parent_inverse = LG.matrix_world.inverted()
LG.rotation_euler.z = math.radians(45)                                            # square to the camera
PAGE = box("calendar page", 4.6, 5.95, 7.4, 6.0, 2.0, M_WARM, z0=4.7, bevel=0)                 # flips on "Change the day"
PAGE.parent = LG; PAGE.matrix_parent_inverse = LG.matrix_world.inverted()
PAGE.keyframe_insert("rotation_euler", frame=F(t("L03", 20))); PAGE.rotation_euler.x = math.radians(-170); PAGE.keyframe_insert("rotation_euler", frame=F(t("L03", 22)) + 6)
PEOPLE_ = []
for k in range(6):                                                               # "anyone": a row of people at laptops, each wired to a store
    p = person("anyone", M_PEOPLE, h=1.6); p.location = (-30 + k * 6, -28, 0); p.rotation_euler.z = math.radians(180); PEOPLE_.append(p)
    box("laptop", -30.4 + k * 6, -27.4, -29.6 + k * 6, -26.9, 0.05, M_FURN, z0=0.9, bevel=0.01)
    s_ = rnd.choice(STORES); l_ = line("anyone's line", (-30 + k * 6, -27, 1.2), (s_.location.x, s_.location.y, 1.8), arc=10); draw(l_, F(t("L03", 27)) + k * 4, F(t("L03", 33)) + k * 4)

# ---------- 7: Europe: the hexagon among the other countries, green lines out ----------
EU = {"BELGIUM": (40, 200), "LUXEMBOURG": (120, 160), "NETHERLANDS": (70, 290), "SWEDEN": (170, 560), "ESTONIA": (300, 520),
      "IRELAND": (-220, 330), "PORTUGAL": (-250, -200)}
for name, (x, y) in EU.items():
    bpy.ops.mesh.primitive_cylinder_add(vertices=7, radius=rnd.uniform(45, 70), depth=0.2, location=(x, y, 0)); c = bpy.context.object; c.data.materials.append(M_LAND)
    label(name, (x, y - 4, 0.3), 26)
    l_ = line("spread " + name, (0, 0, 2), (x, y, 2), arc=60, r=1.6); draw(l_, F(t("L04", 3)) + rnd.randint(0, 20), F(t("L04", 6)) + 30)

# ---------- 8: your shop: a small corner shop, door padlocked, till untouched; the back room box blinking green ----------
YS = V((70, -60, 0))
box("your shop floor", YS.x - 5, YS.y - 4, YS.x + 5, YS.y + 4, 0.1, M_FLOOR, bevel=0)
for a in ((-5, 3.7, 5, 4), (-5, -4, -4.7, 4), (4.7, -4, 5, 4), (-5, -4, 5, -3.7), (0.8, -3.7, 1.1, 3.7)):
    box("your shop wall", YS.x + a[0], YS.y + a[1], YS.x + a[2], YS.y + a[3], 3.0 if a[1] > -3.9 else 1.0, M_WALL)
box("door", YS.x - 3, YS.y - 4.1, YS.x - 1.6, YS.y - 3.9, 2.2, M_FURN); cyl("padlock", YS.x - 2.3, YS.y - 4.2, 0.2, 0.3, M_G, z0=1.1)
box("till", YS.x - 2.5, YS.y + 0.5, YS.x - 1.5, YS.y + 1.2, 1.2, M_FURN, z0=0.1)
box("back shelf", YS.x + 2.0, YS.y + 2.6, YS.x + 4.4, YS.y + 3.4, 1.8, M_FURN); BOX = box("the box you forgot", YS.x + 2.8, YS.y + 2.8, YS.x + 3.6, YS.y + 3.2, 0.35, M_WALL, z0=1.8)
LED = cyl("green light", YS.x + 3.2, YS.y + 2.75, 0.06, 0.02, M_GLOW, z0=1.95, verts=12); LED.rotation_euler.x = math.pi / 2
for k in range(0, N, 30): LED.scale = (1, 1, 1) if (k // 30) % 2 else (0.4, 0.4, 0.4); LED.keyframe_insert("scale", frame=k)
line("its cable", (YS.x + 3.6, YS.y + 3.0, 2.0), (YS.x + 4.6, YS.y + 3.6, 0.3), m=M_G, r=0.03).data.bevel_factor_end = 1.0

# ---------- camera: one continuous isometric move (EX14 grammar) ----------
ISO_T, ISO_S = 54.7356, 45
CK = [(0, V((0, 0, 0)), 0.0, 0, 26),                                             # 1 frame 1 already moving: top-down on the store
      (F(t("L01", 8)), V((0, 0, 1)), ISO_T, ISO_S, 24),                          #   swoops into iso
      (F(t("L01", 15)), V((-1, 2, 1.5)), ISO_T, ISO_S, 16),                      # 2 push into the freezer aisle
      (F(t("L02", 3)), V((2, 1, 1.5)), ISO_T, ISO_S, 22),                        # 3 the thermometer, the skip
      (F(t("L02", 9)), V((0, 0, 0)), ISO_T, ISO_S, 330),                         #   long pull-out: hundreds of stores across France
      (F(t("L03", 5)), V((-1, 4, 3)), ISO_T, ISO_S, 30),                         # 4 glide to the controller, rise to the login
      (F(t("L03", 13)), V((-0.5, 6.6, 7.2)), ISO_T, ISO_S, 21),
      (F(t("L03", 19)), V((0.2, 6.6, 7.2)), ISO_T, ISO_S, 19),                         # 5 the password field, the calendar
      (F(t("L03", 24)), V((0.8, 6.6, 7.2)), ISO_T, ISO_S, 19),
      (F(t("L03", 28)), V((-15, -27, 1)), ISO_T, ISO_S, 40),                     # 6 along the row of "anyone"
      (F(t("L03", 34)), V((-10, -27, 1)), ISO_T, ISO_S, 44),
      (F(t("L04", 1)), V((0, 170, 0)), 18, 0, 980),                              # 7 rise high, swing north-up: Europe
      (F(t("L04", 6)) + 20, V((0, 180, 0)), 16, 0, 1020),
      (F(t("L05", 4)), V((YS.x, YS.y, 1)), ISO_T, ISO_S, 18),                    # 8 swoop down to your shop
      (F(t("L05", 9)), V((YS.x - 1, YS.y, 1)), ISO_T, ISO_S, 16),
      (F(t("L05", 12)), V((YS.x + 3, YS.y + 3, 1.8)), ISO_T, ISO_S, 6),          #   push into the back room: the box
      (N - 1, V((YS.x + 3.2, YS.y + 3, 1.9)), ISO_T, ISO_S, 5.5)]
rig = Rig(); rig.keys(CK)
for f in range(N): rig.set(f)

BOARD = [F(1.5), F(t("L01", 17)), F(t("L02", 9)) + 20, F(t("L03", 13)) + 10, F(t("L03", 19)) + 20, F(t("L03", 33)), F(t("L04", 6)) + 20, F(t("L05", 7)), F(t("L05", 17)) + 20]
if "board" in A or "still" in A:
    fr = BOARD if "board" in A else [int(x) for x in A[A.index("still") + 1].split(",")]
    for f in fr:
        sc.frame_set(f); sc.render.filepath = f"{OUT}/b_{f:04d}.png"; bpy.ops.render.render(write_still=True)

# EX19 "The Empty Gym" — first v4 episode (perspective + shot grammar, 30 fps) paired with diagram scenes on the gym's
# roof. This file builds the world and the camera; ANIM mode (now) renders a grey-box animatic with Workbench so the
# cinematography is approved before materials and detail (visual-system § Cinematography: camera-only animatic first).
#   blender -b --python build/episode.py -- <out_dir> animatic | preview | anchors | (full render)
# Units: metres (a person is 1.75 m). Worlds: the gym interior (v4), the street block (v4), the roof = diagram stage.
import sys, os, math, json, random, bpy, bmesh
from mathutils import Vector, Matrix
EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/"
sys.path.insert(0, EP + "../../tools/blender")
from isokit import setup, box, cyl, hexc, ease, span, back_out, Path
from camkit import *
A = sys.argv[sys.argv.index("--") + 1:]; OUT = A[0]; ANIM = "animatic" in A
sc = setup(half=ANIM); FPS = 30; sc.render.fps = FPS
for o in [o for o in bpy.data.objects if o.type == "LIGHT"]: bpy.data.objects.remove(o)
VT = json.load(open(EP + "audio/vo_timeline.json")); VW = VT["words"]
def w(L, i): return VW[L][i][1]                                      # seconds
def F(t): return int(round(t * FPS))
N = int(math.ceil(VT["end"] * FPS)); sc.frame_start, sc.frame_end = 0, N - 1
rnd = random.Random(19)
if ANIM:
    sc.render.engine = "BLENDER_WORKBENCH"; sh = sc.display.shading
    sh.light = "STUDIO"; sh.color_type = "OBJECT"; sh.show_shadows = True; sh.show_cavity = True
    sc.render.use_motion_blur = False
else:
    engine("eevee", 32, fast=True)
GREY, DARK, GREEN, WARMC, GHOST = (0.55, 0.56, 0.6, 1), (0.25, 0.26, 0.29, 1), (0.34, 0.82, 0.0, 1), (0.93, 0.9, 0.86, 1), (0.7, 0.8, 0.9, 1)
G = hexc("#57D100")
if ANIM:
    MAT = {}
else:                                                                  # v4: real surfaces, no glass (user, 2026-11-03)
    MAT = {GREY: paint("wall paint", hexc("#4A4E57"), 0.6, 0.0), DARK: paint("rubber", hexc("#1C1E22"), 0.75, 0.0),
           GREEN: glow("green glow", G, 3.0), WARMC: glow("warm type", hexc("#EDE7DC"), 2.2),
           "street": paint("asphalt", hexc("#15161A"), 0.85, 0.0), "walk": paint("concrete", hexc("#4A4C52"), 0.8, 0.0),
           "floor": paint("gym floor", hexc("#2C2F36"), 0.78, 0.0), "roof": paint("roof", hexc("#30333A"), 0.7, 0.0),
           "metal": metal("frame metal", hexc("#8E9299"), 0.3), "chrome": metal("chrome", (0.82, 0.83, 0.86, 1), 0.12),
           "outside": paint("facade", hexc("#2A2D33"), 0.45, 0.3), "card": paint("card", hexc("#EDE7DC"), 0.3, 0.5),
           "screen": glow("screen", hexc("#0E1A14"), 1.0), "tile": paint("tile", hexc("#5A5E68"), 0.45, 0.2),
           "dot": paint("member dot", hexc("#8C8C96"), 0.5, 0.1), "column": paint("column", hexc("#8C8C96"), 0.4, 0.3),
           "person": paint("clothes", hexc("#6E7380"), 0.6, 0.0), "skin": paint("skin", hexc("#B89A86"), 0.5, 0.0),
           "ghost": ghost("ghost"), "rubber": paint("belt", hexc("#101114"), 0.9, 0.0), "panel": glow("ceiling light", hexc("#DDE6EE"), 1.1), "coin": glow("coin", G, 4.0)}
def col(o, c):
    o.color = c if isinstance(c, tuple) else GREY
    if not ANIM and c in MAT: o.data.materials.clear(); o.data.materials.append(MAT[c])
    return o
def gbox(name, x0, y0, x1, y1, h, c=GREY, z0=0.0, bevel=0.02):
    return col(box(name, x0, y0, x1, y1, h, bpy.data.materials.get("g") or bpy.data.materials.new("g"), z0=z0, bevel=bevel), c)
def text(name, s, size, loc, rot=(math.pi / 2, 0, 0), c=WARMC):
    bpy.ops.object.text_add(location=loc); o = bpy.context.object; o.name = name; o.data.body = s; o.data.size = size
    o.data.align_x = "CENTER"; o.data.align_y = "CENTER"; o.data.extrude = 0.01; o.rotation_euler = rot
    o.data.font = bpy.data.fonts.get("Inter") or bpy.data.fonts.load(os.path.expanduser("~/Library/Fonts/InterDisplay-Black.ttf"))
    return col(o, c)
def show(objs, f, on):
    for o in objs:
        for x in [o] + list(o.children_recursive):                    # a person's head and limbs follow its body
            x.hide_render = not on; x.keyframe_insert("hide_render", frame=f)
def pop(o, f0, f1=None, d=8):
    """scale in at f0 (and out at f1)."""
    s = o.scale.copy() if o.scale.length > 1e-6 else Vector((1, 1, 1))     # objects parked at 0 pop to full size
    o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=f0)
    o.scale = s * 1.08; o.keyframe_insert("scale", frame=f0 + d); o.scale = s; o.keyframe_insert("scale", frame=f0 + d + 4)
    if f1 is not None:
        o.keyframe_insert("scale", frame=f1); o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=f1 + d)
def person(name, x, y, z=0.0, c=GREY, face=0.0):
    bpy.ops.mesh.primitive_cylinder_add(radius=0.22, depth=1.3, location=(x, y, z + 0.65), vertices=12); b = bpy.context.object
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.16, location=(x, y, z + 1.55), segments=12, ring_count=8); h = bpy.context.object
    for o in (b, h): col(o, c if not (c == GREY and not ANIM) else "person"); o.name = name
    h.parent = b; h.matrix_parent_inverse = b.matrix_world.inverted(); b.rotation_euler.z = face; return b

# ---------- word times ----------
T_PLAN = w("L01", 9); T_L02 = w("L02", 0); T_7000 = w("L02", 7); T_BUT = w("L02", 10); T_400 = w("L02", 16)
T_L03 = w("L03", 0); T_DOOR = w("L03", 16); T_THEY = w("L03", 17); T_COUNTS = w("L03", 24)
T_L04 = w("L04", 0); T_CHEAP = w("L04", 3); T_15 = w("L04", 5); T_AFTER = w("L04", 14)
T_L05 = w("L05", 0); T_43 = w("L05", 9); T_17 = w("L05", 16); T_10 = w("L05", 25); T_STUDY = w("L05", 27)
T_L06 = w("L06", 0); T_BIZ = w("L06", 9); T_PAY = w("L06", 12)
T_L07 = w("L07", 0); T_2M = w("L07", 8); T_43P = w("L07", 15)
T_L08 = w("L08", 0); T_EMPTY = w("L08", 5); T_PLANNED = w("L08", 12); T_L09 = w("L09", 0)

# ---------- the gym (interior 30 x 20 m, 5 m high), the roof stage, the street ----------
ROOF_Z = 5.4
gbox("street", -60, -60, 60, 60, 0.1, "street", z0=-0.1, bevel=0.0)
gbox("sidewalk", -24, -20, 24, 20, 0.12, "walk", z0=0.0, bevel=0.0)
gbox("gym floor", -15, -10, 15, 10, 0.05, "floor", z0=0.12, bevel=0.0)
WALLS = [gbox("back wall", -15.3, 10, 15.3, 10.3, 5.3, z0=0.12), gbox("left wall", -15.3, -10.3, -15, 10.3, 5.3, z0=0.12),
         gbox("right wall", 15, -10.3, 15.3, 10.3, 5.3, z0=0.12)]
FRONT = [gbox("front L", -15.3, -10.3, -1.6, -10, 5.3, "outside", z0=0.12), gbox("front R", 1.6, -10.3, 15.3, -10, 5.3, "outside", z0=0.12),
         gbox("front top", -1.6, -10.3, 1.6, -10, 2.2, "outside", z0=3.2)]
ROOF = gbox("roof", -15.5, -10.5, 15.5, 10.5, 0.3, "roof", z0=5.1, bevel=0.03)
PARAPET = [gbox("parapet", -15.5, -10.5, 15.5, -10.2, 0.5, z0=ROOF_Z), gbox("parapet", -15.5, 10.2, 15.5, 10.5, 0.5, z0=ROOF_Z),
           gbox("parapet", -15.5, -10.5, -15.2, 10.5, 0.5, z0=ROOF_Z), gbox("parapet", 15.2, -10.5, 15.5, 10.5, 0.5, z0=ROOF_Z)]
SIGN = text("gym sign", "GYM · OPEN 24/7", 1.0, (0, -10.45, 4.2), c=GREEN)
def tube(name, a, b, r, c):
    """a cylinder from point a to point b (frames, rails, handlebars)."""
    a, b = Vector(a), Vector(b); d = b - a
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=d.length, location=(a + b) / 2, vertices=16)
    o = bpy.context.object; o.name = name; o.rotation_euler = d.to_track_quat("Z", "Y").to_euler()
    return col(o, c)
def treadmill(x, y0=4.0):
    """deck + belt, side rails, two angled uprights, handlebars, a tilted console with a screen."""
    z = 0.17
    deck = gbox("treadmill", x - 0.45, y0, x + 0.45, y0 + 2.0, 0.18, DARK, z0=z, bevel=0.04)
    gbox("belt", x - 0.36, y0 + 0.05, x + 0.36, y0 + 1.9, 0.02, "rubber" if not ANIM else DARK, z0=z + 0.18, bevel=0.0)
    for sx in (-1, 1):
        gbox("rail", x + sx * 0.45 - 0.05, y0, x + sx * 0.45 + 0.05, y0 + 1.95, 0.06, "metal", z0=z + 0.12, bevel=0.01)
        tube("upright", (x + sx * 0.38, y0 + 1.95, z + 0.2), (x + sx * 0.36, y0 + 1.7, z + 1.25), 0.035, "metal")
        tube("handle", (x + sx * 0.36, y0 + 1.72, z + 1.05), (x + sx * 0.36, y0 + 1.2, z + 1.0), 0.025, "chrome")
    tube("crossbar", (x - 0.36, y0 + 1.7, z + 1.22), (x + 0.36, y0 + 1.7, z + 1.22), 0.03, "metal")
    con = gbox("console", x - 0.34, y0 + 1.62, x + 0.34, y0 + 1.72, 0.32, "screen", z0=z + 1.2, bevel=0.02); con.rotation_euler.x = -0.45
    return deck, con
def bike(x, y):
    z = 0.17
    gbox("bike base", x - 0.25, y - 0.55, x + 0.25, y + 0.55, 0.08, DARK, z0=z, bevel=0.02)
    cyl("flywheel", x, y + 0.45, 0.24, 0.07, bpy.data.materials["g"], z0=z + 0.1, verts=32, bevel=0.01).rotation_euler.y = math.pi / 2
    o = bpy.data.objects[-1] if False else None
    tube("bike frame", (x, y + 0.4, z + 0.1), (x, y - 0.2, z + 0.85), 0.04, "metal")
    tube("bike post", (x, y + 0.45, z + 0.3), (x, y + 0.5, z + 1.05), 0.035, "metal")
    gbox("seat", x - 0.12, y - 0.32, x + 0.12, y - 0.08, 0.05, DARK, z0=z + 0.86, bevel=0.03)
    tube("bars", (x - 0.22, y + 0.55, z + 1.05), (x + 0.22, y + 0.55, z + 1.05), 0.025, "chrome")
TREADS, CONSOLES = [], []
for i in range(8):                                                     # a treadmill row (the hook dolly runs along it)
    d_, c_ = treadmill(-10.5 + i * 3.0); TREADS.append(d_); CONSOLES.append(c_)
for i in range(6): bike(-9 + i * 3.6, 1.4)
for y in (-4, -1, 2, 5):
    gbox("rack", -13.6, y - 0.6, -12.4, y + 0.6, 0.12, "metal", z0=2.25); gbox("rack post", -13.6, y - 0.6, -13.45, y - 0.45, 2.1, "metal", z0=0.17)
    gbox("rack post", -13.6, y + 0.45, -13.45, y + 0.6, 2.1, "metal", z0=0.17); gbox("plates", -13.3, y - 0.5, -12.9, y + 0.5, 0.5, DARK, z0=0.17)
WK = text("console text", "WEEK 1 · DAY 1", 0.075, (-1.5, 5.6, 1.5), rot=(math.pi / 2 - 0.45, 0, 0), c=GREEN); WK.scale = (0, 0, 0)
TURN = gbox("turnstile", 0.15, -7.7, 0.65, -7.3, 1.0, "chrome", z0=0.17); gbox("arm", -0.9, -7.55, 0.15, -7.45, 0.06, "chrome", z0=0.95)
READER = gbox("reader", 0.25, -7.72, 0.55, -7.68, 0.22, "screen", z0=1.0)
PRICE = text("price", "$15 / MONTH", 0.045, (0.4, -7.735, 1.13), c=GREEN); PRICE.scale = (0, 0, 0)
CARD = gbox("member card", 1.25, -7.8, 1.27, -7.55, 0.16, "card", z0=1.05)          # taps in from the side, not across the lens
CAL = [text("calendar page", m, 0.35, (-3.0, -9.94, 2.2), c=WARMC) for m in ("JAN", "FEB", "MAR", "APR")]
CHARGE = text("charge", "−$15", 0.06, (0.4, -7.74, 1.06), c=WARMC); CHARGE.scale = (0, 0, 0)
RUNNERS = [person("member", -1.5, 5.0, 0.47, face=math.pi), person("member", 6.0, 1.4, 0.17)]

# roof stage: the card, 7,000 dots in chunks, the 400 box, the spill
BIGCARD = gbox("big card", -12, -3, -6, 1, 0.12, "card", z0=ROOF_Z + 0.02); BIGCARD.rotation_euler.x = 0.0
CAP = Path([(-3, -3), (3, -3), (3, 1.5), (-3, 1.5), (-3, -3)], r=0.01).curve("capacity box", bpy.data.materials.new("cap"), depth=0.06, z=ROOF_Z + 0.06)
col(CAP, GREEN); CAPLAB = text("cap label", "ROOM FOR ~400", 0.5, (0, -3.6, ROOF_Z + 0.4), c=GREEN)
def dot_chunk(name, n, x0, y0, x1, y1, z=ROOF_Z + 0.05, c=GREY, s=0.09):
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    for _ in range(n):
        x, y = rnd.uniform(x0, x1), rnd.uniform(y0, y1)
        bmesh.ops.create_cube(bm, size=s, matrix=Matrix.Translation((x, y, z + s / 2)))
    bm.to_mesh(me); bm.free(); o = bpy.data.objects.new(name, me); sc.collection.objects.link(o); return col(o, c)
INSIDE = dot_chunk("400 inside", 80, -2.8, -2.8, 2.8, 1.3, c=GREEN, s=0.16)        # user: "many" is enough, nobody counts
PILES = [dot_chunk("pile %d" % k, 55, -14 + (k % 6) * 4.6, -9.5 + (k // 6) * 4.6, -14 + (k % 6) * 4.6 + 4.2, -9.5 + (k // 6) * 4.6 + 4.2, c="dot", s=0.15) for k in range(22)]
# the queue around the block (representative: ~900 people on a loop around the sidewalk)
QUEUE = []
loop = Path([(1.0, -11.0), (22, -11.0), (22, 18.5), (-22, 18.5), (-22, -12.5), (-1.0, -12.5)], r=2.0)
NQ = 240                                                               # reads as a long line; rendering 900 tripled the frame time
for k in range(NQ):
    s_ = k / NQ * loop.LEN; q, d = loop.at(s_); lane = (k % 2) * 0.6
    QUEUE.append(person("queue", q.x + d.y * lane, q.y - d.x * lane, 0.12, face=math.atan2(d.y, d.x) + math.pi / 2))
# L05 diagrams on the roof: a 30-day calendar, the price tags, the study field
CALT = []
for k in range(30):
    x, y = -6 + (k % 7) * 1.8, 3 - (k // 7) * 1.8
    CALT.append(gbox("cal day", x - 0.75, y - 0.75, x + 0.75, y + 0.75, 0.1, "tile", z0=ROOF_Z + 0.02))
VISITS = [CALT[i] for i in (2, 9, 17, 25)]
TAG17 = text("tag 17", "$17 / VISIT", 0.9, (7.5, 0.5, ROOF_Z + 1.5), c=WARMC)
TAG10 = text("tag 10", "10-VISIT PASS · $10", 0.6, (7.5, -1.4, ROOF_Z + 1.0), c=GREEN)
STUDY = dot_chunk("7752 members", 1500, -13, -8, 13, 8, c="dot", s=0.2)
STUDYLAB = text("study label", "7,752 MEMBERS · 3 YEARS", 1.2, (0, -9.2, ROOF_Z + 0.8), c=WARMC)
# L06 ghosts at every machine, coins into the floor
GSPOTS = [(TREADS[i].location.x, 5.0, 0.47, math.pi) for i in range(8) if i not in (3, 5)] + [(-9 + i * 3.6, 1.6, 0.17, 0.0) for i in range(6) if i != 4] + \
         [(-12.0, y, 0.17, -math.pi / 2) for y in (-4, -1, 2)]
if ANIM:
    GHOSTS = [person("ghost", x, y, z, c=GHOST, face=fc) for x, y, z, fc in GSPOTS]
else:                                                                  # see-through figures in the same shape as the runners
    GHOSTS = []
    for k, (x, y, z, fc) in enumerate(GSPOTS):
        gf = Figure("ghost %d" % k, MAT["ghost"]); gf.root.location = (x, y, z); gf.root.rotation_euler.z = fc
        gf.pose(0, k * 0.9, 0.35); GHOSTS.append(gf.root)
COINS = [col(cyl("coin", g.location.x, g.location.y - 0.6, 0.15, 0.05, bpy.data.materials["g"], z0=1.4, verts=24, bevel=0.01), "coin" if not ANIM else GREEN) for g in GHOSTS]
# L07 the $2M column on the roof, top 43% green
COLB = gbox("column", 9, -8, 12, -5, 4.6, "column", z0=ROOF_Z)
COLG = gbox("column 43", 9, -8, 12, -5, 3.4, GREEN, z0=ROOF_Z + 4.6)
COLLAB = text("col label", "$2M A YEAR · 43% PROFIT", 0.7, (10.5, -8.6, ROOF_Z + 9.0), c=WARMC)

# ---------- v4: night light, the ring cuts, runners ----------
RUN = []
if not ANIM:
    w_ = sc.world; w_.use_nodes = True; wn = w_.node_tree; wn.nodes.clear()
    out = wn.nodes.new("ShaderNodeOutputWorld"); bg = wn.nodes.new("ShaderNodeBackground"); bg.inputs[0].default_value = hexc("#0C0E14")
    bg.inputs[1].default_value = 1.0; wn.links.new(bg.outputs[0], out.inputs[0])
    def light(kind, loc, energy, color, size=1.0, aim=None, name="light"):
        bpy.ops.object.light_add(type=kind, location=loc); L = bpy.context.object; L.name = name; L.data.energy = energy; L.data.color = color
        if kind == "AREA": L.data.size = size
        if kind == "SPOT": L.data.spot_size = math.radians(size); L.data.spot_blend = 0.6
        if aim is not None: L.rotation_euler = (Vector(aim) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
        return L
    light("SUN", (0, 0, 50), 0.35, (0.65, 0.75, 1.0), name="moon").rotation_euler = (math.radians(50), 0, math.radians(30))
    PANELS = []
    sc.view_settings.exposure = 0.7                                    # the night look stays dark, but readable
    for x in (-11, -4, 4, 11):                                         # cool gym ceiling panels (none on the camera's way up through x≈0)
        for y in (-4, 4):
            light("AREA", (x, y, 4.85), 650, (0.92, 0.97, 1.0), size=4.0, aim=(x, y, 0), name="gym panel")
            PANELS.append(gbox("ceiling panel", x - 1.8, y - 0.5, x + 1.8, y + 0.5, 0.04, "panel", z0=5.04, bevel=0.0))
    light("AREA", (0, 0, 1.0), 1400, (0.85, 0.95, 1.0), size=24, aim=(0, 0, 6), name="ceiling bounce").data.use_shadow = False   # lights the ceiling from below
    for y0 in (-9.95, 9.65):                                           # brand green strips along the long walls
        gbox("green strip", -14.8, y0, 14.8, y0 + 0.08, 0.08, GREEN, z0=3.6, bevel=0.0)
    for x, y in ((-22, -20), (0, -20), (22, -20), (-22, 20), (22, 20), (24, 0), (-24, 0)):     # warm street lamps
        lamp = light("SPOT", (x, y, 6.5), 1800, (1.0, 0.72, 0.42), size=80, aim=(x, y, 0), name="street lamp"); lamp.data.use_shadow = False
        gbox("lamp post", x - 0.08, y - 0.08, x + 0.08, y + 0.08, 6.4, "metal", z0=0.12, bevel=0.0)
    light("AREA", (0, -9.4, 2.6), 300, (0.85, 1.0, 0.85), size=3.0, aim=(0, -14, 0), name="door glow").data.use_shadow = False
    light("AREA", (0, -6, 26), 5000, (1.0, 0.97, 0.92), size=28, aim=(0, 0, ROOF_Z), name="roof key")
    light("AREA", (-24, 14, 12), 900, (0.7, 0.8, 1.0), size=10, aim=(0, 0, ROOF_Z), name="roof rim").data.use_shadow = False
    # the ceiling ring (camera rises through it) and the twist cutaway: world-space ring wipes on the roof, walls, sign
    CUT_ROOF = xray_material("roof cut", MAT["roof"], ring_w=0.12, world=True); xray_origin(CUT_ROOF, (-0.5, 0.6, 5.25))
    for o in [ROOF] + PARAPET: o.data.materials.clear(); o.data.materials.append(CUT_ROOF)
    CUT_FRONT = xray_material("front cut", MAT["outside"], ring_w=0.12, world=True); xray_origin(CUT_FRONT, (0.0, -10.2, 5.3))
    for o in FRONT: o.data.materials.clear(); o.data.materials.append(CUT_FRONT)
    CUT_SIGN = xray_material("sign cut", MAT[GREEN], ring_w=0.12, world=True); xray_origin(CUT_SIGN, (0.0, -10.2, 5.3))
    SIGN.data.materials.clear(); SIGN.data.materials.append(CUT_SIGN)
    t0, t1 = T_L02 + 0.2, T_L02 + 1.0                                  # opens as the camera reaches the ceiling, closes once it's through
    for fr in range(N):
        tt = fr / FPS
        if tt < T_L06:
            r = 3.2 * ease(span(tt, t0, t1)) * (1 - ease(span(tt, T_L02 + 1.9, T_L02 + 2.6))); st = span(tt, t0, t0 + 0.3) * (1 - span(tt, T_L02 + 2.2, T_L02 + 2.6))
        else:
            r = 45.0 * ease(span(tt, T_L06 + 0.2, T_L06 + 1.8)) ** 1.5; st = span(tt, T_L06 + 0.2, T_L06 + 0.5) * (1 - span(tt, T_L06 + 1.4, T_L06 + 2.0))
        xray_set(CUT_ROOF, fr, r, st)
        rf = 34.0 * ease(span(tt, T_L06 + 0.1, T_L06 + 1.6)) ** 1.5 if tt >= T_L06 else 0.0
        sf = span(tt, T_L06 + 0.1, T_L06 + 0.4) * (1 - span(tt, T_L06 + 1.2, T_L06 + 1.8))
        xray_set(CUT_FRONT, fr, rf, sf); xray_set(CUT_SIGN, fr, rf, sf)
    # runners: two members on the machines all along; one left at the end
    for b in RUNNERS:
        for x in [b] + list(b.children): x.hide_render = True; x.keyframe_insert("hide_render", frame=0)
    for k, (x, y, z, face) in enumerate(((-1.5, 5.0, 0.47, math.pi), (4.5, 5.0, 0.47, math.pi))):
        fg = Figure("runner %d" % k, MAT["person"], MAT["skin"]); fg.root.location = (x, y, z); fg.root.rotation_euler.z = face; RUN.append(fg)
    for fr in range(N):
        for k, fg in enumerate(RUN): fg.pose(fr, fr * 0.42 + k * 1.3, 1.0, run=True)

# ---------- visibility / timing ----------
for o in [CAPLAB, INSIDE] + PILES + QUEUE + CALT + [TAG17, TAG10, STUDY, STUDYLAB] + GHOSTS + COINS + [COLB, COLG, COLLAB, CAP]:
    for x in [o] + list(o.children_recursive): x.hide_render = True
show([CAPLAB, INSIDE, CAP, TAG17, TAG10, STUDY, STUDYLAB, COLB, COLG, COLLAB] + PILES + QUEUE + CALT + GHOSTS + COINS, 0, False)
f = F
show([BIGCARD], 0, False); show([BIGCARD], f(T_L02), True); show([BIGCARD], f(T_L03 + 1.5), False)
show([CAP, CAPLAB], f(T_BUT), True); show([CAP, CAPLAB], f(T_L03 + 1.5), False)
show([INSIDE], f(T_400 - 0.2), True); show([INSIDE], f(T_L03 + 1.5), False)
for k, p in enumerate(PILES):
    show([p], f(T_7000 + k * 0.06), True); show([p], f(T_L03 + 1.0 + k * 0.03), False)
for k, q in enumerate(QUEUE):
    t_on = T_L03 + 0.3 + (k / NQ) * 3.6; show([q], f(t_on), True); show([q], f(T_THEY + (k % 41) * 0.03), False)
show(CALT, f(T_L05 + 0.9), True); show(CALT, f(T_STUDY - 0.1), False)
show([TAG17], f(T_17 - 0.1), True); show([TAG10], f(T_10 - 0.1), True); show([TAG17, TAG10], f(T_STUDY - 0.1), False)
show([STUDY, STUDYLAB], f(T_STUDY), True); show([STUDY, STUDYLAB], f(T_L06), False)
show(GHOSTS, f(T_BIZ), True); show(GHOSTS + COINS, f(T_EMPTY), False); show(COINS, f(T_PAY), True)
show([COLB, COLLAB], f(T_2M - 0.2), True); show([COLG], f(T_43P - 0.1), True); show([COLB, COLG, COLLAB], f(T_L08), False)
# the ceiling hole on the way up (animatic: roof hidden while the camera passes; v4: a ring cut), the twist cutaway
if ANIM:
    show([ROOF] + PARAPET, f(T_L02 + 0.5), False); show([ROOF] + PARAPET, f(T_L02 + 1.6), True)
    show([ROOF] + PARAPET + FRONT + [SIGN], f(T_L06 + 0.4), False)                                 # the cutaway diorama stays open to the end
else:
    show(PANELS, 0, True); show(PANELS, f(T_L06 + 0.7), False)                                    # the ceiling lights go with the cut roof
    for k, fg in enumerate(RUN):                                                                   # the second runner leaves before the end
        if k == 1: show([fg.root] + fg.parts, f(T_EMPTY), False)
for k, c_ in enumerate(VISITS): c_.keyframe_insert("color", frame=f(T_43 - 0.3)); c_.color = GREEN; c_.keyframe_insert("color", frame=f(T_43 - 0.2 + k * 0.12))
pop(WK, f(T_PLAN)); pop(PRICE, f(T_15)); CARD.keyframe_insert("location", frame=f(T_CHEAP - 0.6)); CARD.location.x -= 0.68; CARD.keyframe_insert("location", frame=f(T_CHEAP))
pop(CHARGE, f(T_AFTER - 1.4), f(T_AFTER + 0.6), d=4)
for k, page in enumerate(CAL):
    page.hide_render = k != 0; page.keyframe_insert("hide_render", frame=0)
    if k: show([page], f(T_AFTER - 1.6 + k * 0.6), True); show([CAL[k - 1]], f(T_AFTER - 1.6 + k * 0.6), False)

# ---------- camera (shot list; positions in metres; lens mm; f-stop) ----------
rig = PerspRig()
V = Vector
rig.keys([
    (F(-1), V((-9, -3, 1.2)), V((-6, 5.5, 1.0)), 35, 2.8), (0, V((-9, -3, 1.2)), V((-6, 5.5, 1.0)), 35, 2.8),
    (F(T_PLAN), V((-3.6, 0.5, 1.4)), V((-1.5, 5.85, 1.5)), 40, 2.4),                                  # 1 dolly along the row to the console
    (F(T_L02 + 0.4), V((-1.6, 1.2, 2.6)), V((-1.0, 3.0, 6.0)), 35, 4.0),
    (F(T_L02 + 1.4), V((-0.5, 0.6, 7.0)), V((0, 0, ROOF_Z)), 35, 5.6),                                 # 2 up through the ceiling
    (F(T_7000 + 0.4), V((14, -22, 22)), V((-2, -1, ROOF_Z)), 50, 8.0),
    (F(T_400 + 1.0), V((18, -19, 20)), V((0, -1, ROOF_Z + 0.4)), 55, 8.0),                              # 3 arc over the roof
    (F(T_L03 + 0.6), V((6, -34, 28)), V((0, -14, 0)), 28, 8.0),                                         # 4 aerial over the queue
    (F(T_DOOR), V((6.5, -22, 2.2)), V((0, -10.6, 1.4)), 32, 4.0),
    (F(T_COUNTS), V((4.2, -19.5, 1.6)), V((0, -10.4, 3.9)), 35, 4.0),                                   # 5 push to the sign
    (F(T_L04 + 0.2), V((1.3, -11.4, 1.45)), V((0.4, -7.7, 1.1)), 40, 2.8),                              # 6 through the door
    (F(T_CHEAP), V((0.85, -9.0, 1.25)), V((0.4, -7.7, 1.1)), 50, 2.0), (F(T_L05 - 0.4), V((0.75, -8.8, 1.22)), V((0.4, -7.7, 1.1)), 52, 2.0),
    (F(T_L05 + 0.9), V((1.6, -13.0, 2.0)), V((0.4, -8.0, 1.6)), 40, 4.0),                               # 7 back out, up to the roof
    (F(T_43), V((8, -18, 15)), V((-0.6, -0.6, ROOF_Z)), 70, 8.0), (F(T_17), V((12.5, -14, 11)), V((7.5, -0.3, ROOF_Z + 1.1)), 60, 6.0),
    (F(T_STUDY - 0.4), V((12.0, -13.5, 10.6)), V((7.5, -0.5, ROOF_Z + 1.1)), 62, 6.0),
    (F(T_STUDY + 1.2), V((0.6, -8, 46)), V((0, -0.5, ROOF_Z)), 85, 11.0), (F(T_L06 - 0.3), V((0.6, -9, 54)), V((0, -0.5, ROOF_Z)), 85, 11.0),  # 8
    (F(T_L06 + 0.8), V((22, -26, 20)), V((0, 0, 2.5)), 35, 8.0), (F(T_PAY), V((8.5, -12.5, 6.5)), V((0, 2.5, 1.0)), 35, 5.6),       # 9 the cutaway
    (F(T_L07 - 0.3), V((7, -10, 5)), V((0, 3, 1.0)), 35, 5.6),
    (F(T_2M), V((17, -15, 3.2)), V((10.5, -6.5, ROOF_Z + 3)), 50, 5.6), (F(T_43P + 0.8), V((24, -22, 13)), V((10.5, -6.5, ROOF_Z + 7)), 45, 8.0),  # 10
    (F(T_EMPTY), V((6.5, -9, 6.2)), V((0, 4, 1.2)), 35, 5.6), (F(T_PLANNED), V((1.0, -3.6, 2.5)), V((-1.5, 5, 1.2)), 40, 4.0),        # 11
    (F(T_L09 + 3), V((0.8, -3.4, 2.5)), V((-1.5, 5, 1.2)), 40, 4.0)], drift=0.03)
for fr in range(N): rig.set(fr)

if not ANIM and "preview" in A:
    sys.path.insert(0, EP + "../../tools/blender"); from preview import preview
    preview(EP + "out/preview.mp4", range(N), audio=EP + "audio/voice.wav")
elif not ANIM and "still" in A:
    for fr in [int(x) for x in A[A.index("still") + 1].split(",")]:
        sc.frame_set(fr); sc.render.filepath = f"{OUT}/f_{fr:04d}.png"; bpy.ops.render.render(write_still=True)
elif not ANIM:
    render_range(f"{OUT}/f_", 0, N - 1)
if ANIM:
    sh.use_dof = True
    render_range(f"{OUT}/a_", 0, N - 1)
    import subprocess
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", str(FPS), "-i", f"{OUT}/a_%04d.png", "-i", EP + "audio/voice.wav",
                    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "24", "-c:a", "aac", "-shortest", EP + "out/animatic.mp4"], check=True)
    print("animatic:", EP + "out/animatic.mp4")

# EX23 "The Store That Couldn't Pay Its Rent" — clay maquette, light V4 (EX00V12, user 2026-11-06), shot list v1.
# Gate 2 blocking approved (review/gate2_board.png, build/episode_v1_blocking.py); gate 3 = the real photo, a store modelled
# on it, department props, the real iPhone as the giant, a proper map of Australia.
# One set per shot idea, 400 m apart; each set lit by its own V4 studio key / rim / fill (never suns); hard cut on the word.
#   blender -b --python build/episode.py -- <out_dir> board [half]   |   still f,f,… [half]   |   check
import sys, os, math, json, random, bpy
from mathutils import Vector as V
EP = os.path.dirname(os.path.abspath(__file__)) + "/../"; sys.path.insert(0, EP + "../../tools/blender")
from isokit import setup, box, cyl, hexc, ease, span
from camkit import *
import crowd
from lib3d import model as _model, credits_for
from mathutils import Matrix
A = sys.argv[sys.argv.index("--") + 1:]; OUT = A[0]; CHECK = "check" in A
sc = setup(half="half" in A); FPS = 30; sc.render.fps = FPS
for o in [o for o in bpy.data.objects if o.type == "LIGHT"]: bpy.data.objects.remove(o)
engine("eevee", 32, fast=True)
VT = json.load(open(EP + "audio/vo_timeline.json")); VW = VT["words"]
def w(L, i): return VW[L][i][1]
def F(t): return int(round(t * FPS))
N = int(math.ceil(VT["end"] * FPS)); sc.frame_start, sc.frame_end = 0, N - 1
rnd = random.Random(23)

# ---------- the look: V4 ----------
G = hexc("#57D100")
CLAY = clay("clay", (0.30, 0.32, 0.36, 1), 0.66); PALE = clay("pale clay", (0.52, 0.54, 0.57, 1), 0.7)
GREENC = clay("green", G, 0.5); _b = GREENC.node_tree.nodes["Principled BSDF"]; _b.inputs["Emission Color"].default_value = G; _b.inputs["Emission Strength"].default_value = 0.35
GROUND = paint("V4 ground", hexc("#3E424A"), 0.45, 0.0); ROAD = paint("road", hexc("#33363D"), 0.6, 0.0)
XRAY = xray_shell(col=(0.5, 0.53, 0.58, 1), alpha=0.34, edge=0.85)
DASH = glow("dash", G, 2.5); LABEL = glow("label", hexc("#E4E7EC"), 0.8); GTXT = glow("green type", G, 2.0)
DARK = paint("unlit glass", hexc("#0E1014"), 0.2, 0.6)
FONT = bpy.data.fonts.load(os.path.expanduser("~/Library/Fonts/BebasNeue-Regular.ttf"))
def B(name, x0, y0, x1, y1, h, m=CLAY, z0=0.0, bevel=0.02): return box(name, x0, y0, x1, y1, h, m, z0=z0, bevel=bevel)
def BC(name, c, sx, sy, h, m=CLAY, z0=0.0, bevel=0.02): return B(name, c[0] - sx / 2, c[1] - sy / 2, c[0] + sx / 2, c[1] + sy / 2, h, m, z0, bevel)
def label(s, at_, size, rot=(math.pi / 2, 0, 0), m=LABEL):
    bpy.ops.object.text_add(location=at_); o = bpy.context.object; o.name = "label " + s; o.data.body = s; o.data.size = size
    o.data.align_x = "CENTER"; o.data.align_y = "CENTER"; o.data.font = FONT; o.rotation_euler = rot; o.data.materials.append(m); o.visible_shadow = False; return o
def grow(objs, f, d=12):
    for o in objs:
        s = o.scale.copy(); o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=0); o.keyframe_insert("scale", frame=max(1, f - d)); o.scale = s; o.keyframe_insert("scale", frame=f)
def shrink(objs, f, d=12):
    for o in objs:
        o.keyframe_insert("scale", frame=f - d); s = o.scale.copy(); o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=f); o.scale = s
def draw(dashes, f0, f1):
    for i, d in enumerate(dashes):
        t = f0 + (f1 - f0) * i / max(1, len(dashes) - 1); d.scale = (0, 0, 0)
        d.keyframe_insert("scale", frame=0); d.keyframe_insert("scale", frame=int(t)); d.scale = (1, 1, 1); d.keyframe_insert("scale", frame=int(t) + 4)
def area(loc, aim, e, size, col):
    bpy.ops.object.light_add(type="AREA", location=loc); L = bpy.context.object; L.data.energy = e; L.data.size = size; L.data.color = col
    L.rotation_euler = (V(aim) - V(loc)).to_track_quat("-Z", "Y").to_euler(); return L
def lightset(c, s=17.0, h=0.0):
    """V4 studio light for one set (EX00V12 values at a 17 m set, scaled by the set size s)."""
    k = (s / 17.0) ** 2; c = V(c) + V((0, 0, h))
    area(c + V((-8, -7, 13)) * s / 17, c, 9000 * k, 10 * s / 17, (0.93, 0.96, 1.0)); area(c + V((10, 10, 6)) * s / 17, c, 2000 * k, 6 * s / 17, (0.8, 0.88, 1.0))
    area(c + V((9, -9, 4)) * s / 17, c, 1600 * k, 12 * s / 17, (0.85, 0.9, 1.0))
def model(name, m=CLAY, **kw):
    r = _model(name, **kw); clay_all(r, m); return r
TPL = {}
def inst(name, at_, face=0.0, height=None, length=None, m=CLAY):
    if name not in TPL:
        tp = model(name, m, height=1.0, at=(0, 0, -500)); TPL[name] = tp
        for c in tp.children: c.hide_render = True; c.hide_viewport = True
    tp = TPL[name]; d = V(tp["dims"]); k = height / d.z if height else length / max(d.x, d.y)
    r = bpy.data.objects.new(name, None); sc.collection.objects.link(r)
    for c in tp.children:
        n_ = c.copy(); sc.collection.objects.link(n_); n_.parent = r; n_.hide_render = False; n_.hide_viewport = False
    r.scale = tp.scale * k; r.location = at_; r.rotation_euler.z = math.radians(face); return r
TITAN = metal("natural titanium", (0.62, 0.61, 0.6, 1), 0.32); LENSG = glass("lens glass", (0.18, 0.22, 0.26, 1), 0.02)
def rbox(name, c, sx, sy, sz, m, r):
    """a rounded box (bevelled corners), centred at c."""
    bpy.ops.mesh.primitive_cube_add(size=1, location=c); o = bpy.context.object; o.name = name; o.scale = (sx, sy, sz)
    bpy.ops.object.transform_apply(scale=True); bv = o.modifiers.new("round", "BEVEL"); bv.width = r; bv.segments = 8; bv.limit_method = "NONE"
    o.data.materials.append(m); bpy.ops.object.shade_smooth(); return o
def rrect(name, c, w_, h_, r, thick, m, y_=0.0, uv=False, rim=0.0):
    """a rounded rectangle in the XZ plane (corner radius r), extruded `thick` along -y from y_; UVs 0..1 over it."""
    import bmesh
    me = bpy.data.meshes.new(name); bm = bmesh.new(); n_ = 12; pts = []
    for cx_, cz_, a0 in ((w_ / 2 - r, h_ / 2 - r, 0), (-w_ / 2 + r, h_ / 2 - r, 90), (-w_ / 2 + r, -h_ / 2 + r, 180), (w_ / 2 - r, -h_ / 2 + r, 270)):
        for k in range(n_ + 1):
            a = math.radians(a0 + 90 * k / n_); pts.append((cx_ + r * math.cos(a), cz_ + r * math.sin(a)))
    vs = [bm.verts.new((x, y_, z)) for x, z in pts]; f = bm.faces.new(vs)
    if uv:
        lay = bm.loops.layers.uv.new("UVMap")
        for lp in f.loops: lp[lay].uv = (lp.vert.co.x / w_ + 0.5, lp.vert.co.z / h_ + 0.5)
    if thick: bmesh.ops.extrude_face_region(bm, geom=[f]); bm.verts.ensure_lookup_table()
    if thick:
        for v in bm.verts[len(vs):]: v.co.y -= thick
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); sc.collection.objects.link(o); o.location = c; me.materials.append(m)
    if rim:
        bv = o.modifiers.new("rim", "BEVEL"); bv.width = rim; bv.segments = 4; bv.limit_method = "ANGLE"
    for poly in me.polygons: poly.use_smooth = False
    return o
SCREEN = bpy.data.materials.new("phone shop screen"); SCREEN.use_nodes = True; _n = SCREEN.node_tree; _n.nodes.clear()
_out = _n.nodes.new("ShaderNodeOutputMaterial"); _em = _n.nodes.new("ShaderNodeEmission"); _tx = _n.nodes.new("ShaderNodeTexImage")
_tx.image = bpy.data.images.load(EP + "media/phone_shops.png"); _n.links.new(_tx.outputs[0], _em.inputs[0]); _em.inputs[1].default_value = 0.75
_gl = _n.nodes.new("ShaderNodeBsdfGlossy"); _gl.inputs["Roughness"].default_value = 0.05; _mx = _n.nodes.new("ShaderNodeAddShader")
_n.links.new(_em.outputs[0], _out.inputs[0])                                       # emission only: a glossy layer threw a white glare at this size
SCREEN_E = _em.inputs[1]                                                           # keyed for the flash on the last click
def iphone(at_, upright=True):
    """an iPhone, real size (71.5 x 7.8 x 147 mm): a titanium frame with true rounded corners, black front glass inset
    inside it, the camera app on the screen (the user's screenshot), the rear camera bump."""
    e = bpy.data.objects.new("iphone", None); sc.collection.objects.link(e)
    body = rrect("iphone frame", (0, 0, 0), 0.0715, 0.147, 0.0105, 0.0078, TITAN, y_=0.0039, rim=0.0012)
    glassf = rrect("front glass", (0, 0, 0), 0.0700, 0.1455, 0.0098, 0.0004, paint("black glass", hexc("#050607"), 0.05, 1.0), y_=-0.0038)
    scr = rrect("screen", (0, 0, 0), 0.0690, 0.1445, 0.0094, 0.0, SCREEN, y_=-0.00425, uv=True)
    bump = rrect("camera bump", (-0.0175, 0, 0.0545), 0.031, 0.031, 0.0075, 0.0018, TITAN, y_=0.0057, rim=0.0006)
    lenses = [cyl("rear lens", x_, 0.0068, 0.0062, 0.002, LENSG, z0=0, verts=40, bevel=0.0004) for x_ in (-0.025, -0.011)]
    for l_ in lenses: l_.rotation_euler.x = math.pi / 2; l_.location.z = 0.055
    btns = [rbox("side button", (0.0362, 0, 0.03), 0.001, 0.003, 0.018, TITAN, 0.0005), rbox("volume", (-0.0362, 0, 0.035), 0.001, 0.003, 0.012, TITAN, 0.0005)]
    for p_ in [body, glassf, scr, bump] + lenses + btns: p_.parent = e
    e.location = at_
    if not upright: e.rotation_euler.x = -math.pi / 2                             # on its back, screen up
    return e
def store(c, floors=6, w_=30, d_=20, fh=4.0, name="store", m=CLAY, sign=True):
    """the Elizabeth Street store as clay (modelled on media/dj_exterior.jpg): a two-storey base with tall display
    windows, an awning wrapping the front with the name on it, a grid of upper windows on the front and the side, pilasters,
    a deep cornice. Returns its parts."""
    parts, c = [], V(c)
    parts.append(BC(name + " body", c, w_, d_, floors * fh - 0.3, m, bevel=0.08))
    nx, ny = max(4, int(w_ / 2.6)), max(3, int(d_ / 2.6))
    for k in range(2, floors):                                                  # upper windows: front (-y) and side (-x)
        z = k * fh + fh * 0.22
        for i in range(nx): parts.append(BC(name + " window", c + V((-w_ / 2 + (i + 0.5) * w_ / nx, -d_ / 2 - 0.03, 0)), w_ / nx * 0.55, 0.08, fh * 0.6, DARK, z0=z, bevel=0))
        for i in range(ny): parts.append(BC(name + " window", c + V((-w_ / 2 - 0.03, -d_ / 2 + (i + 0.5) * d_ / ny, 0)), 0.08, d_ / ny * 0.55, fh * 0.6, DARK, z0=z, bevel=0))
    for i in range(max(3, int(w_ / 6))):                                        # the base: tall display windows
        parts.append(BC(name + " display window", c + V((-w_ / 2 + (i + 0.5) * w_ / max(3, int(w_ / 6)), -d_ / 2 - 0.04, 0)), w_ / max(3, int(w_ / 6)) * 0.7, 0.08, fh * 1.4, DARK, z0=0.3, bevel=0))
    parts.append(BC(name + " base band", c + V((0, -d_ / 2 - 0.1, 0)), w_ + 0.3, 0.3, 0.5, m, z0=2 * fh - 0.3, bevel=0.04))
    for i in range(nx + 1): parts.append(BC(name + " pilaster", c + V((-w_ / 2 + i * w_ / nx, -d_ / 2 - 0.12, 0)), 0.35, 0.25, (floors - 2) * fh, m, z0=2 * fh, bevel=0.03))
    parts.append(BC(name + " awning", c + V((0, -d_ / 2 - 1.6, 0)), w_ + 0.6, 3.2, 0.7, paint("awning", hexc("#2A2D33"), 0.5, 0.0), z0=fh * 1.05, bevel=0.06))
    if sign: parts.append(label("DAVID JONES", c + V((0, -d_ / 2 - 3.25, fh * 1.05 + 0.35)), 0.55))
    parts.append(BC(name + " cornice", c, w_ + 1.2, d_ + 1.2, 1.0, m, z0=floors * fh - 0.3, bevel=0.1)); return parts

# ---------- cut frames: two frames before each word (shot list v1) ----------
CUTS = [0, F(w("L02", 0)) - 2, F(w("L02", 3)) - 2, F(w("L02", 7)) - 2, F(w("L02", 20)) - 2, F(w("L02", 29)) - 2,
        F(w("L03", 0)) - 2, F(w("L03", 10)) - 2, F(w("L03", 24)) - 2, F(w("L04", 0)) - 2, F(w("L04", 7)) - 2,
        F(w("L04", 16)) - 2, F(w("L04", 30)) - 2, F(w("L05", 0)) - 2, F(w("L05", 6)) - 2, F(w("L05", 10)) - 2,
        F(w("L06", 0)) - 2, F(w("L06", 10)) - 2]
def S(n): return CUTS[n - 1]
def E(n): return (CUTS[n] if n < len(CUTS) else N) - 1

# ---------- the ground and the world (V4 backdrop gradient, the camera sees it, the lights barely do) ----------
B("ground", -300, -300, 6000, 300, 0.1, GROUND, z0=-0.1, bevel=0.0)
FL_, _L = studio(floor_col="#3E424A", back_top="#4A4F58", back_bottom="#101216"); bpy.data.objects.remove(FL_)
for L_ in _L.values(): bpy.data.objects.remove(L_)
for n in sc.world.node_tree.nodes:
    if n.type == "BACKGROUND": n.inputs[1].default_value = 0.9
def at(k): return V((k * 400.0, 0, 0))

# 1 — the store sinks into the ground like a lift; a roof display rolls 2.1B → 100M; RENT DUE
T1 = at(0); S1 = store(T1); grp = bpy.data.objects.new("sinking store", None); sc.collection.objects.link(grp)
for o in S1: o.parent = grp
DISP = [BC("roof display", T1 + V((0, -6, 0)), 18, 0.6, 4.5, DARK, z0=24, bevel=0.1)]
D1, D2 = label("2,100,000,000", T1 + V((0, -6.4, 26.2)), 3.0, m=GTXT), label("100,000,000", T1 + V((0, -6.4, 26.2)), 3.0, m=GTXT)
for o in DISP + [D1, D2]: o.parent = grp
shrink([D1], F(w("L01", 4)) + 2, d=4); grow([D2], F(w("L01", 4)) + 6, d=4)
grp.location.z = 0; grp.keyframe_insert("location", frame=0); grp.location.z = -20; grp.keyframe_insert("location", frame=F(w("L01", 6)))   # floor by floor
TAG = BC("RENT DUE tag", T1 + V((14.5, -10.6, 0)), 3.2, 0.1, 1.8, GREENC, z0=1.4, bevel=0.2); grow([TAG], F(w("L01", 9)), d=8)
label("RENT DUE", T1 + V((14.5, -10.7, 2.3)), 0.8, m=paint("tag ink", hexc("#0E1014"), 0.6, 0.0))
lightset(T1, 34)

# 2 — the real photo (placeholder) · 3, 6, 12, 13, 16 — the flagship façade: doors, 1838, scaffolding, bills, the landlord
def photo_plane(path, center, w_, h_):
    bpy.ops.mesh.primitive_plane_add(size=1, location=center, rotation=(math.pi / 2, 0, 0)); o = bpy.context.object; o.scale = (w_, h_, 1)
    m = bpy.data.materials.new("photo"); m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial"); em = nt.nodes.new("ShaderNodeEmission"); tx = nt.nodes.new("ShaderNodeTexImage")
    tx.image = bpy.data.images.load(path); nt.links.new(tx.outputs[0], em.inputs[0]); em.inputs[1].default_value = 1.0
    nt.links.new(em.outputs[0], out.inputs[0]); o.data.materials.append(m); return o
T2 = at(1); PHOTO = photo_plane(EP + "media/dj_exterior.jpg", T2 + V((0, -40, 27)), 40.5, 54)   # "Exterior of David Jones, Elizabeth Street" (Nick-D, CC BY-SA 4.0)
T3 = at(2); FLAG = store(T3, floors=6, w_=34, d_=20); label("1838", T3 + V((0, -10.1, 3.4)), 1.2)
DOORS = [BC("door L", T3 + V((-1.2, -10.05, 0)), 2.2, 0.15, 3.0, DARK), BC("door R", T3 + V((1.2, -10.05, 0)), 2.2, 0.15, 3.0, DARK)]
NOTICE = BC("IN ADMINISTRATION notice", T3 + V((1.2, -10.15, 0)), 0.8, 0.02, 1.1, PALE, z0=1.2, bevel=0); grow([NOTICE], S(6) + 1, d=1)
SCAF = [BC("scaffold", T3 + V((x, -11, 0)), 0.15, 0.15, 25, CLAY) for x in range(-17, 18, 3)] + [BC("scaffold deck", T3 + V((0, -11, 0)), 35, 1.2, 0.15, CLAY, z0=z) for z in range(4, 25, 4)]
BANNER = BC("makeover banner", T3 + V((0, -11.7, 0)), 20, 0.1, 3.0, DARK, z0=15); BAN = label("$400,000,000", T3 + V((0, -11.8, 16.5)), 2.0, m=GTXT)
for o in SCAF + [BANNER, BAN]: grow([o], S(12) + 1, d=1); shrink([o], E(12) + 1, d=1)
DEC = label("DEC 2019", T3 + V((0, -11.8, 13.5)), 1.0); grow([DEC], S(12) + 1, d=1); shrink([DEC], E(12) + 1, d=1)
# 16 — three rent envelopes propped against the doors, one per unpaid month; UNPAID stamped on "hasn't been paid"
INKM = paint("envelope ink", hexc("#0E1014"), 0.6, 0.0); REDM = paint("unpaid red", hexc("#8E1410"), 0.6, 0.0)
ENV = []
for i_, m_ in enumerate(("SEP", "OCT", "NOV")):
    e_ = bpy.data.objects.new("rent envelope " + m_, None); sc.collection.objects.link(e_)
    body = BC("envelope", (0, 0, 0), 1.2, 0.03, 0.75, GREENC, bevel=0.02); body.location = (0, 0, 0)
    t1 = label("RENT · " + m_, (0, -0.03, 0.12), 0.18, m=INKM); st = label("UNPAID", (0, -0.035, -0.12), 0.24, m=REDM)
    st.rotation_euler = (math.pi / 2, math.radians(-12), 0)
    for o_ in (body, t1, st): o_.parent = e_
    e_.location = T3 + V((-1.4 + i_ * 1.4, -10.45, 0.36)); e_.rotation_euler = (math.radians(-14), 0, math.radians(rnd.uniform(-6, 6)))   # leaning on the glass
    grow([e_], F(w("L05", 12)) + 2 + i_ * 9, d=6)                                 # "since September": one month at a time
    grow([st], F(w("L05", 20)) + i_ * 3, d=4); ENV.append(e_)                    # "hasn't been paid": stamped

MALL = BC("the landlord's mall", T3 + V((0, 60, 0)), 140, 50, 36, CLAY); LLB = label("LANDLORD", T3 + V((0, 34.9, 30)), 6)
for o in (MALL, LLB): grow([o], S(16) + 1, d=1)                                     # only behind the doormat shot
lightset(T3, 40)

# 4 — the price tag hanging off a corner of the store (macro scale)
T4 = at(3); store(T4, floors=2, w_=10, d_=8, fh=3); TAG4 = BC("price tag", T4 + V((6.4, -5.2, 0)), 1.1, 0.02, 1.6, PALE, z0=1.2, bevel=0.05); cyl("tag string", T4.x + 5.2, T4.y - 4.6, 0.01, 1.5, PALE, z0=2.7, verts=6, bevel=0).rotation_euler.y = math.radians(-50)
P1, P2 = label("$2.1B · 2014", T4 + V((6.4, -5.23, 2.0)), 0.2, m=paint("ink", hexc("#14161B"), 0.6, 0.0)), label("$100M · 2024", T4 + V((6.4, -5.23, 2.0)), 0.2, m=paint("ink", hexc("#14161B"), 0.6, 0.0))
shrink([P1], F(w("L02", 15)) + 2, d=4); grow([P2], F(w("L02", 15)) + 6, d=4)
lightset(T4, 8)
area(T4 + V((4.0, -9.5, 4.5)), T4 + V((6.4, -5.2, 2.0)), 260, 3, (0.95, 0.97, 1.0))      # a soft key on the tag itself

# 5 — Australia in grey, 38 store markers, a crowd around the flagship
T5 = at(4)
AUll = [(113.5, -22), (114, -26), (115, -34), (117.5, -35), (123.5, -34), (129, -31.5), (131.5, -31.5), (135, -34.5), (137.8, -35.5), (138.5, -34.8),
        (140.5, -38), (144, -38.3), (146.5, -39), (150, -37.5), (151.5, -33), (153.5, -28), (153, -25), (150.8, -22.5), (149, -20.5), (146.5, -19),
        (145.3, -15), (143.5, -12.5), (142.5, -10.7), (141.5, -13.5), (141.6, -17), (140, -17.6), (137, -16), (136, -12), (132.5, -11.2), (131, -12.3),
        (129.5, -15), (126.5, -14), (125, -15.5), (122, -17.5), (121, -19.5), (117, -20.7)]
TASll = [(144.6, -40.7), (148.3, -40.9), (148, -43.2), (146, -43.6), (145, -42)]
def ll(lon, lat): return V((T5.x + (lon - 134) * 5.0, T5.y + (lat + 26) * 5.6, 0.05))
import bmesh
for nm, pts in (("Australia", AUll), ("Tasmania", TASll)):
    me = bpy.data.meshes.new(nm); bm = bmesh.new(); vs = [bm.verts.new(ll(*p)) for p in pts]; bm.faces.new(vs); bm.to_mesh(me); bm.free()
    o_ = bpy.data.objects.new(nm, me); sc.collection.objects.link(o_); me.materials.append(PALE)
CITIES = [(151.2, -33.9, 9), (145.0, -37.8, 8), (153.0, -27.5, 6), (115.9, -32.0, 5), (138.6, -34.9, 4), (149.1, -35.3, 2), (153.4, -28.0, 2), (147.3, -42.9, 1), (147.3, -19.3, 1)]
k = 0
for lon, lat, n_ in CITIES:                                                       # 38 stores, clustered on the cities
    for j in range(n_):
        c_ = BC("store marker", ll(lon, lat) + V((rnd.uniform(-3, 3), rnd.uniform(-3, 3), 0)), 2.0, 2.0, 2.0 + rnd.uniform(0, 1.5), CLAY, z0=0.05)
        grow([c_], F(w("L02", 23)) + k, d=6); k += 1
label("SYDNEY", ll(151.2, -33.9) + V((14, 0, 0.1)), 4.0, rot=(0, 0, 0)); label("MELBOURNE", ll(145, -37.8) + V((0, -9, 0.1)), 4.0, rot=(0, 0, 0))
lightset(T5, 120)

# 7 — the exploded view: the floors pulled apart, one department each
T7 = at(5); DEPTS = ["SHOES", "BEAUTY", "HOMEWARES", "MENSWEAR", "WOMENSWEAR", "TOYS"]
for k, dn in enumerate(DEPTS):
    z = k * 7.0; BC("exploded floor", T7, 24, 16, 0.6, CLAY, z0=z)
    PROP = {"SHOES": ("shoes_pair", 0.5), "BEAUTY": ("perfume_mb", 0.4), "HOMEWARES": ("table_round_k", 1.2), "MENSWEAR": ("coat_rack", 1.9),
            "WOMENSWEAR": ("mannequin_r", 1.8), "TOYS": ("tshirt_piles", 0.6)}[dn]
    for j in range(8):
        p_ = T7 + V((-9 + (j % 4) * 6, -4 + (j // 4) * 8, z + 0.6))
        if dn in ("SHOES", "BEAUTY", "TOYS"): inst("table_round_k", p_, 0, height=0.9, m=PALE); p_ = p_ + V((0, 0, 0.9))
        inst(PROP[0], p_, rnd.uniform(0, 360), height=PROP[1], m=PALE)
    label(dn, T7 + V((-13, -8.1, z + 1.2)), 1.2)
lightset(T7, 40, 18)

# 8 — the store as one block inside a mall; a green LEASE tape off into the distance
T8 = at(6); BC("mall hall", T8 + V((0, 10, 0)), 120, 40, 0.3, PALE)
for x in range(-55, 60, 14): BC("mall shop", T8 + V((x, 28, 0)), 12, 8, 6, CLAY)
BC("the department store, inside", T8, 34, 22, 12, CLAY); LEASE = BC("LEASE tape", T8 + V((0, -14, 0)), 2.0, 0.05, 0.02, GREENC, z0=0.32, bevel=0)
LT = dashed("lease tape", [tuple(T8 + V((0, -11, 0))), tuple(T8 + V((0, -140, 0)))], DASH, 3.0, 0.5, 0.5, z=0.35); draw(LT, S(8) + 15, E(8) - 10)
label("LEASE", T8 + V((3.5, -18, 0.4)), 1.6, rot=(0, 0, 0), m=GTXT)
lightset(T8, 60)

# 9–10 — the city top-down: every route ends at the store; then brand shops rise and the routes bend to them
T9 = at(7); BC("the store (city)", T9, 14, 10, 8, CLAY)
ENDS = [V((math.cos(a) * 60, math.sin(a) * 90, 0)) for a in [k * math.pi / 6 for k in range(12)]]
for e_ in ENDS:
    d_ = dashed("route to the store", [tuple(T9 + e_), tuple(T9 + e_ * 0.12)], DASH, 2.0, 1.2, 0.35, z=0.2); draw(d_, S(9) + 5, S(9) + 50)
for k, e_ in enumerate(ENDS[::2]):
    b_ = BC("brand shop", T9 + e_ * 0.55, 6, 5, 4, PALE); grow([b_], S(10) + 6 + k * 4)
lightset(T9, 100)

# 11 — the wow: a giant phone standing over the clay store like a skyscraper
T11 = at(8); store(T11, floors=6, w_=30, d_=20)
PHONE = iphone(V((0, 0, 0)), upright=True); PHONE.scale = (420, 420, 420); PHONE.location = T11 + V((24, 18, 0.147 * 420 / 2)); PHONE.rotation_euler.z = math.radians(-12)   # 62 m tall
SCR = PHONE
lightset(T11, 60, 20)

# 14 — the bar chart made of store floors, sinking below the ground line
T14 = at(9) + V((0, 0, 14)); BC("ground line", T14, 40, 6, 0.3, PALE, z0=-0.3)
B74 = BC("loss bar 74", T14 + V((-6, 0, 0)), 7, 5, 7.4, CLAY, z0=-0.35); B95 = BC("loss bar 95", T14 + V((6, 0, 0)), 7, 5, 9.55, CLAY, z0=-0.35)
for b_, t_ in ((B74, w("L05", 2)), (B95, w("L05", 5))):
    z_ = b_.location.z; h_ = b_.dimensions.z; b_.scale.z = 0.01; b_.location.z = T14.z - 0.35; b_.keyframe_insert("scale", frame=0); b_.keyframe_insert("location", frame=0)
    b_.keyframe_insert("scale", frame=F(t_) - 6); b_.keyframe_insert("location", frame=F(t_) - 6)
    b_.scale.z = 1; b_.location.z = T14.z - 0.35 - h_ / 2; b_.keyframe_insert("scale", frame=F(t_) + 12); b_.keyframe_insert("location", frame=F(t_) + 12)   # grows down below the line
label("−$74M", T14 + V((-6, -2.6, 1.4)), 1.4); label("−$95.5M", T14 + V((6, -2.6, 1.4)), 1.4); label("2023–24", T14 + V((-6, -2.6, -11.5)), 0.9); label("2024–25", T14 + V((6, -2.6, -11.5)), 0.9)
lightset(T14, 30)

# 15 — the roof: a green rent meter keeps ticking
T15 = at(10); store(T15, floors=2, w_=30, d_=20); METER = BC("rent meter", T15 + V((0, -4, 0)), 10, 1.0, 4, DARK, z0=8, bevel=0.2)
label("RENT", T15 + V((0, -4.6, 11.0)), 1.2, m=GTXT); label("+ $ + $", T15 + V((0, -4.6, 9.3)), 1.4, m=GTXT)
lightset(T15, 30, 8)

# 17–18 — inside an empty department store; the ceiling is the rent meter
T17 = at(11); BC("store floor (inside)", T17, 60, 40, 0.1, PALE); BC("ceiling", T17, 60, 40, 0.4, CLAY, z0=8)
for x in range(-24, 25, 8):
    for y in range(-14, 15, 7):
        inst("table_round_k", T17 + V((x, y, 0.1)), 0, height=0.8, m=CLAY)
        if (x + y) % 2: inst("mannequin_r", T17 + V((x + 2, y, 0.1)), rnd.uniform(0, 360), height=1.8, m=PALE)   # no shoppers: only mannequins
CEIL = BC("ceiling meter", T17 + V((0, 6, 0)), 26, 8, 0.1, DARK, z0=7.85, bevel=0); CL = label("RENT  + $ + $", T17 + V((0, 6, 7.8)), 1.5, rot=(math.pi, 0, 0), m=GTXT)
lightset(T17, 40, 4)
for x_ in (-15, 0, 15): area(T17 + V((x_, 0, 7.5)), T17 + V((x_, 0, 0)), 320, 8, (0.92, 0.95, 1.0))   # under the ceiling: the store's own lights

# ---------- camera ----------
def orb(aim, d, el, az):
    aim = V(aim); e, a = math.radians(el), math.radians(az)
    return aim + V((math.sin(a) * math.cos(e), -math.cos(a) * math.cos(e), math.sin(e))) * d
SHOT = {
 1: ((T1 + V((0, 0, 14)), 70, 8, 18, 40, 11), (T1 + V((0, 0, 4)), 62, 10, 18, 40, 11)),
 2: ((T2 + V((0, -40, 27)), 50, 4, 0, 35, 16), (T2 + V((0, -40, 27.5)), 46, 4, 0, 35, 16)),
 3: ((T3 + V((0, 0, 12)), 70, 4, 0, 35, 16), (T3 + V((0, 0, 12)), 66, 4, 0, 35, 16)),
 4: ((T4 + V((6.3, -5.2, 2.1)), 8.0, 4, 14, 85, 5.6), (T4 + V((6.3, -5.2, 2.1)), 7.4, 4, 18, 85, 5.6)),
 5: ((T5 + V((5, 0, 0)), 260, 80, 0, 30, 16), (T5 + V((5, 0, 0)), 245, 82, 0, 30, 16)),
 6: ((T3 + V((0, -10, 1.8)), 9, 4, 6, 50, 4), (T3 + V((0, -10, 1.8)), 7.5, 4, 6, 50, 4)),
 7: ((T7 + V((0, 0, 18)), 80, 16, 30, 35, 11), (T7 + V((0, 0, 19)), 76, 20, 34, 35, 11)),
 8: ((T8 + V((0, -20, 2)), 90, 42, 10, 35, 11), (T8 + V((0, -30, 2)), 90, 42, 6, 35, 11)),
 9: ((T9, 230, 86, 0, 30, 16), (T9, 215, 86, 0, 30, 16)),
 10: ((T9, 215, 86, 0, 30, 16), (T9, 205, 86, 0, 30, 16)),
 11: ((T11 + V((10, 8, 30)), 135, 6, -20, 24, 11), (T11 + V((10, 8, 33)), 128, 8, -24, 24, 11)),
 12: ((T3 + V((0, 0, 12)), 75, 10, 24, 35, 11), (T3 + V((0, 0, 12)), 70, 10, 26, 35, 11)),
 13: ((T3 + V((0, -10, 6)), 40, 4, 0, 40, 8), (T3 + V((0, -10, 6)), 36, 4, 0, 40, 8)),
 14: ((T14 + V((0, 0, -4)), 46, 4, 0, 50, 11), (T14 + V((0, 0, -5)), 44, 4, 0, 50, 11)),
 15: ((T15 + V((0, -4, 10)), 28, 24, 20, 40, 8), (T15 + V((0, -4, 10)), 25, 26, 20, 40, 8)),
 16: ((T3 + V((0, -11, 0.6)), 7, 18, 0, 35, 5.6), (T3 + V((0, -11, 0.8)), 6.5, 20, 0, 35, 5.6)),
 17: ((T17 + V((-10, -4, 1.4)), 14, 4, -90, 24, 8), (T17 + V((0, -2, 1.4)), 14, 4, -90, 24, 8)),
 18: ((T17 + V((0, 0, 3.0)), 6, 2, 0, 20, 8), (T17 + V((0, 6, 7.8)), 7.5, -70, 0, 20, 8))}
ck = []
for n in range(1, 19):
    for f, (aim, d, el, az, lens, fs) in ((S(n), SHOT[n][0]), (E(n), SHOT[n][1])): ck.append((f, orb(aim, d, el, az), V(aim), lens, fs))
rig = PerspRig(); ck.sort(key=lambda k_: k_[0]); rig.keys(ck, drift=0.0)
for f in range(N): rig.set(f)
for n in range(1, 19): rig.cam.data.clip_start = 0.05 if n == 4 else 0.3; rig.cam.data.keyframe_insert("clip_start", frame=S(n))
rig.cam.data.clip_end = 3000
hard_cuts([rig.cam, rig.aim, rig.cam.data], CUTS[1:])

json.dump(credits_for(), open(EP + "build/model_credits.json", "w"), indent=1)
BOARD = {n: (S(n) + E(n)) // 2 for n in range(1, 19)}
BOARD.update({1: F(w("L01", 9)), 4: F(w("L02", 16)) + 6, 5: F(w("L02", 26)), 10: E(10) - 10, 14: F(w("L05", 5)) + 15, 16: F(w("L05", 20)), 18: E(18) - 5})
if CHECK:
    for a_ in bpy.data.screens:
        for ar in a_.areas:
            if ar.type == "VIEW_3D":
                for sp_ in ar.spaces:
                    if sp_.type == "VIEW_3D": sp_.shading.type = "MATERIAL"; sp_.region_3d.view_perspective = "CAMERA"
    sc.frame_set(0); bpy.ops.wm.save_as_mainfile(filepath=EP + "EX23_check.blend", compress=True)
elif "board" in A or "still" in A:
    fr = [BOARD[n] for n in range(1, 19)] if "board" in A else [int(x) for x in A[A.index("still") + 1].split(",")]
    for f in fr:
        sc.frame_set(f); sc.render.filepath = f"{OUT}/b_{f:04d}.png"; bpy.ops.render.render(write_still=True)
else:
    render_range(f"{OUT}/f_", 0, N - 1)

# EX21 "The Click Kodak Couldn't Sell" — house look v5 clay maquette, shot list v1 (episode.md, approved 2026-11-05).
# Gate 2 blocking approved (review/gate2_board.png, build/episode_v1_blocking.py); gate 3 = library + scanned models in clay,
# the real Kodak Tower photo opener, posed clay hands, dressing.
# The reference grammar: one set per shot idea, a hard cut on the spoken word, one slow move per shot, figures pose only.
#   blender -b --python build/episode.py -- <out_dir> board [half]     one still per shot
#   blender -b --python build/episode.py -- <out_dir> still f,f,… [half]
#   blender -b --python build/episode.py -- <out_dir> check            save EX21_check.blend (scrub it; no render)
import sys, os, math, json, random, bpy
from mathutils import Vector as V
EP = os.path.dirname(os.path.abspath(__file__)) + "/../"; sys.path.insert(0, EP + "../../tools/blender")
from isokit import setup, box, cyl, hexc, ease, span
from camkit import *
import crowd
from lib3d import model as _model, credits_for
A = sys.argv[sys.argv.index("--") + 1:]; OUT = A[0]; CHECK = "check" in A
sc = setup(half="half" in A); FPS = 30; sc.render.fps = FPS
for o in [o for o in bpy.data.objects if o.type == "LIGHT"]: bpy.data.objects.remove(o)
engine("eevee", 32, fast=True)
VT = json.load(open(EP + "audio/vo_timeline.json")); VW = VT["words"]
def w(L, i): return VW[L][i][1]
def F(t): return int(round(t * FPS))
N = int(math.ceil(VT["end"] * FPS)); sc.frame_start, sc.frame_end = 0, N - 1
rnd = random.Random(21)

# ---------- the look (approved EX00V11 / EX20) ----------
G = hexc("#57D100")
CLAY = clay("clay", (0.30, 0.32, 0.36, 1), 0.66)
PALE = clay("pale clay", (0.52, 0.54, 0.57, 1), 0.7)                               # white figures, paper, the photo stand-in
GREENC = clay("green", G, 0.5); _b = GREENC.node_tree.nodes["Principled BSDF"]
_b.inputs["Emission Color"].default_value = G; _b.inputs["Emission Strength"].default_value = 0.35
FLOOR = paint("dark floor", hexc("#1C1F26"), 0.45, 0.0)
ROAD = paint("road", hexc("#2A2E36"), 0.6, 0.0)
XRAY = xray_shell(col=(0.5, 0.53, 0.58, 1), alpha=0.34, edge=0.85)
DASH = glow("dash", G, 2.5)
LABEL = glow("label", hexc("#C9CED6"), 0.8)
FLASH = glow("flash", hexc("#F4F6FA"), 0.0)                                       # the shutter flash (strength keyed)
GHOST = ghost("ghost", (0.85, 0.88, 0.92, 1), alpha=0.35, glow=0.6)
FONT = bpy.data.fonts.load(os.path.expanduser("~/Library/Fonts/BebasNeue-Regular.ttf"))

def model(name, m=CLAY, **kw):
    """a library model in one clay (flat ground plates baked into it dropped)."""
    r = _model(name, **kw); clay_all(r, m); bpy.context.view_layer.update()
    for c in list(r.children):
        d = c.dimensions * r.scale.x
        if c.type == "MESH" and d.z < 0.02 * max(r["dims"]) and d.x * d.y > 0.5 * r["dims"][0] * r["dims"][1]: bpy.data.objects.remove(c)
    return r
TPL = {}
def inst(name, at_, face=0.0, length=None, height=None, m=CLAY):
    """a light copy of a library model (shared meshes)."""
    if name not in TPL:
        t = model(name, m, height=1.0, at=(0, 0, -400)); TPL[name] = t
        for c in t.children: c.hide_render = True; c.hide_viewport = True
    t = TPL[name]; d = V(t["dims"]); k = height / d.z if height else length / max(d.x, d.y)
    r = bpy.data.objects.new(name, None); sc.collection.objects.link(r)
    for c in t.children:
        n = c.copy(); sc.collection.objects.link(n); n.parent = r; n.hide_render = False; n.hide_viewport = False
    r.scale = t.scale * k; r.location = at_; r.rotation_euler.z = math.radians(face); dd = d * k
    r["dims"] = [dd.y, dd.x, dd.z] if round(face) % 180 else list(dd); return r
def topz(r): return r.location.z + r["dims"][2]
def B(name, x0, y0, x1, y1, h, m=CLAY, z0=0.0, bevel=0.02): return box(name, x0, y0, x1, y1, h, m, z0=z0, bevel=bevel)
def BC(name, c, sx, sy, h, m=CLAY, z0=0.0, bevel=0.02): return B(name, c[0] - sx / 2, c[1] - sy / 2, c[0] + sx / 2, c[1] + sy / 2, h, m, z0, bevel)
def label(s, at, size, rot=(0, 0, 0), m=LABEL):
    bpy.ops.object.text_add(location=at); o = bpy.context.object; o.name = "label " + s; o.data.body = s; o.data.size = size
    o.data.align_x = "CENTER"; o.data.align_y = "CENTER"; o.data.font = FONT; o.rotation_euler = rot; o.data.materials.append(m)
    o.visible_shadow = False; return o
def grow(objs, f, d=12):
    for o in objs:
        s = o.scale.copy(); o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=0); o.keyframe_insert("scale", frame=f - d)
        o.scale = s; o.keyframe_insert("scale", frame=f)
def shrink(objs, f, d=12):
    for o in objs:
        o.keyframe_insert("scale", frame=f - d); s = o.scale.copy(); o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=f); o.scale = s
def draw(dashes, f0, f1):
    for i, d in enumerate(dashes):
        t = f0 + (f1 - f0) * i / max(1, len(dashes) - 1); d.scale = (0, 0, 0)
        d.keyframe_insert("scale", frame=0); d.keyframe_insert("scale", frame=int(t)); d.scale = (1, 1, 1); d.keyframe_insert("scale", frame=int(t) + 4)
def ES(m): return m.node_tree.nodes["Principled BSDF"].inputs["Emission Strength"]   # a glow material's strength
def key(sock, f, v): sock.default_value = v; sock.keyframe_insert("default_value", frame=f)
def spot(at, aim, e, size=1.0, col=(0.95, 0.97, 1.0)):
    bpy.ops.object.light_add(type="SPOT", location=at); L = bpy.context.object; L.data.energy = e; L.data.spot_size = math.radians(30)
    L.data.spot_blend = 0.4; L.data.shadow_soft_size = size; L.data.color = col
    L.rotation_euler = (V(aim) - V(at)).to_track_quat("-Z", "Y").to_euler(); return L

# ---------- cut frames: a hard cut two frames before each word (shot list v1) ----------
CUTS = [0, F(w("L01", 9)) - 2, F(w("L02", 0)) - 2, F(w("L03", 0)) - 2, F(w("L03", 8)) - 2, F(w("L03", 17)) - 2,
        F(18.10) - 1, F(18.81) - 1, F(19.60) - 1, F(20.42) - 1, F(21.17) - 1,                     # "Click, pay. Click, pay." (silence onsets)
        F(w("L04", 0)) - 2, F(w("L05", 0)) - 2, F(w("L05", 5)) - 2, F(w("L05", 17)) - 2, F(w("L05", 29)) - 2,
        F(w("L06", 0)) - 2, F(w("L06", 12)) - 2, F(w("L06", 20)) - 2, F(w("L07", 0)) - 2, F(w("L07", 13)) - 2,
        F(w("L08", 0)) - 2, F(w("L08", 9)) - 2, F(w("L08", 16)) - 2]
def S(n): return CUTS[n - 1]                                                         # shot n's first frame
def E(n): return (CUTS[n] if n < len(CUTS) else N) - 1                               # shot n's last frame

# ---------- the floor: one dark studio floor under every set (sets sit 400 m apart, never in each other's frame) ----------
B("floor", -300, -300, 9000, 300, 0.1, FLOOR, z0=-0.1, bevel=0.0)
def at(k): return V((k * 400.0, 0, 0))

# A — Kodak Tower (shots 1, 2, 13), modelled to match the opener photo (media/tower_b.jpg: "Kodak Tower at Noon",
# Lherb3, Wikimedia Commons, CC BY-SA 3.0): a shaft with a window grid, a cornice, an attic, a hipped roof with KODAK on it,
# a lantern and a spire
TA = at(0)
TOWER = [BC("tower shaft", TA, 18, 18, 58), BC("cornice", TA, 19.2, 19.2, 1.2, z0=58), BC("attic", TA, 17, 17, 4, z0=59.2),
         BC("lantern", TA, 3, 3, 4.5, z0=71.0), BC("plaza", TA + V((0, -16, 0)), 46, 30, 0.2, ROAD, bevel=0.0)]
bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=12.0, radius2=3.0, depth=8, location=TA + V((0, 0, 67.2)), rotation=(0, 0, math.pi / 4))
ROOF = bpy.context.object; ROOF.name = "hipped roof"; ROOF.data.materials.append(CLAY)
bpy.ops.mesh.primitive_cone_add(vertices=8, radius1=0.9, radius2=0.0, depth=7, location=TA + V((0, 0, 79.0))); bpy.context.object.data.materials.append(CLAY)
for k in range(15): BC("floor line", TA + V((0, -9.05, 0)), 18.1, 0.1, 0.12, PALE, z0=4.0 + k * 3.6, bevel=0.0)
for k in range(10): BC("mullion", TA + V((-8.1 + k * 1.8, -9.05, 0)), 0.14, 0.1, 54, PALE, z0=3.5, bevel=0.0)
SIGNM = glow("roof letters", hexc("#F4F1EA"), 4.0)
SIGN = label("KODAK", TA + V((0, -5.8, 67.0)), 2.3, rot=(math.radians(51.5), 0, 0), m=SIGNM)     # on the front roof slope
WINM = glow("one window", G, 0.0); WINM.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (0.05, 0.06, 0.07, 1)
WIN = BC("lit window", TA + V((2.7, -9.12, 0)), 1.5, 0.1, 2.6, WINM, z0=51.2, bevel=0.0)
def photo_plane(path, center, w_, h_):
    """the real photo as an unlit plane facing -y (it is a photo: no scene light on it)."""
    bpy.ops.mesh.primitive_plane_add(size=1, location=center, rotation=(math.pi / 2, 0, 0)); o = bpy.context.object; o.scale = (w_, h_, 1)
    m = bpy.data.materials.new("photo"); m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial"); em = nt.nodes.new("ShaderNodeEmission"); tx = nt.nodes.new("ShaderNodeTexImage")
    tx.image = bpy.data.images.load(path); nt.links.new(tx.outputs[0], em.inputs[0]); em.inputs[1].default_value = 1.0
    nt.links.new(em.outputs[0], out.inputs[0]); o.data.materials.append(m); return o
PHOTO = photo_plane(EP + "media/tower_b.jpg", TA + V((0, -34, 27)), 36, 54)

# B — the podium (shots 3, 23)
TB = at(1)
for x, h in ((-1.3, 0.6), (0, 0.9), (1.3, 0.45)): BC("podium step", TB + V((x, 0, 0)), 1.2, 1.0, h)
for x, n in ((-1.3, "2"), (0, "1"), (1.3, "3")): label(n, TB + V((x, -0.51, 0.25)), 0.3, rot=(math.pi / 2, 0, 0))
CAM05 = model("camera_digital", PALE, length=0.12, at=TB + V((0, 0, 0.9)), face=0)
RING = cyl("winner ring", TB.x, TB.y, 0.13, 0.008, GREENC, z0=0.9, verts=48, bevel=0.0); grow([RING], F(w("L02", 6)) + 4)
SPB = spot(TB + V((0.6, -2.5, 4.5)), TB + V((0, 0, 1.0)), 600, 0.4)
SPB.data.keyframe_insert("energy", frame=F(w("L02", 12)) - 1); SPB.data.energy = 0; SPB.data.keyframe_insert("energy", frame=F(w("L02", 12)) + 3)
SPB.data.energy = 600; SPB.data.keyframe_insert("energy", frame=S(23) - 1)          # back for the callback (shot 23)

# C — the camera on a counter (shots 4, 5, 7, 9, 12): macro scale
TC = at(2); BC("counter", TC, 1.4, 0.7, 0.9, CLAY)
CAM = model("camera_film", PALE, length=0.15, at=TC + V((0, 0, 0.9)), face=0); CT = topz(CAM)
BTN = cyl("shutter button", TC.x + 0.045, TC.y, 0.008, 0.006, CLAY, z0=CT, verts=24)
TAG = BC("price tag", TC + V((0.12, -0.07, 0)), 0.04, 0.002, 0.025, PALE, z0=0.91, bevel=0.0); label("$", TC + V((0.12, -0.0715, 0.923)), 0.014, rot=(math.pi / 2, 0, 0))
tip = V((TC.x + 0.045, TC.y, CT + 0.014)); fd = V((0, math.sin(math.radians(38)), math.cos(math.radians(38))))
FING = [cyl("finger", 0, 0, 0.0095, 0.13, PALE, z0=-0.065, verts=24, bevel=0.004)]
FING[0].location = tip + fd * 0.065; FING[0].rotation_euler = fd.to_track_quat("Z", "Y").to_euler()
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.0095, location=tip); FING.append(bpy.context.object); FING[-1].data.materials.append(PALE)   # a held pose: resting on the button
for o in FING: grow([o], S(5) + 1, d=1); shrink([o], E(5) + 1, d=1)
FL = BC("flash", TC + V((-0.045, -CAM["dims"][1] / 2 - 0.003, 0)), 0.028, 0.002, 0.014, FLASH, z0=CT - 0.022, bevel=0.0); FLE = ES(FLASH)
for t in (w("L03", 16), 18.10, 19.60, w("L04", 4), w("L08", 21)):                   # the flash fires on "button", each "click", the free click
    key(FLE, F(t) - 1, 0.0); key(FLE, F(t), 40.0); key(FLE, F(t) + 4, 0.0)
bpy.ops.object.light_add(type="POINT", location=TC + V((-0.04, -0.2, 0.96))); FLL = bpy.context.object; FLL.data.energy = 0
for t in (w("L03", 16), 18.10, 19.60, w("L04", 4), w("L08", 21)):
    FLL.data.energy = 0; FLL.data.keyframe_insert("energy", frame=F(t) - 1); FLL.data.energy = 60; FLL.data.keyframe_insert("energy", frame=F(t))
    FLL.data.energy = 0; FLL.data.keyframe_insert("energy", frame=F(t) + 5)

# D — the 1980s photo counter, roof off (shot 6): camera → film box → print envelope → till, a green path
TD = at(3); BC("shop floor", TD, 8, 6, 0.1, CLAY, bevel=0.0)
for a in ((-4, 2.9, 4, 3, 3.0), (-4, -3, -3.9, 3, 3.0), (3.9, -3, 4, 3, 3.0)): B("shop wall", TD.x + a[0], TD.y + a[1], TD.x + a[2], TD.y + a[3], a[4])
BC("shop counter", TD + V((0, 0.6, 0)), 6, 0.8, 1.0)
DP = [TD + V((-2.2, 0.6, 1.05)), TD + V((-0.7, 0.6, 1.05)), TD + V((0.8, 0.6, 1.05)), TD + V((2.3, 0.6, 1.05))]
DOBJ = [model("camera_film", PALE, length=0.3, at=DP[0] + V((0, 0, -0.05)), face=0), BC("film box", DP[1], 0.25, 0.2, 0.3, PALE, z0=1.0),
        BC("print envelope", DP[2], 0.35, 0.25, 0.04, PALE, z0=1.0), model("cash_register", CLAY, length=0.5, at=DP[3] + V((0, 0, -0.05)), face=0)]
for x in (-3.0, -1.6, -0.2, 1.2, 2.6): inst("shelf_tall", TD + V((x, 2.55, 0.1)), 0, height=2.4)
DD = dashed("money path", [tuple(p + V((0, -0.3, 0))) for p in DP], DASH, 0.12, 0.08, 0.02, z=1.02); draw(DD, F(w("L03", 18)), F(w("L03", 27)))
for o, t in zip(DOBJ[1:3], (w("L03", 20), w("L03", 24))):
    o2 = o.copy(); o2.data = o.data.copy(); o2.data.materials.clear(); o2.data.materials.append(GREENC); sc.collection.objects.link(o2)
    o2.scale *= 1.02; grow([o2], F(t) + 6)                                         # each lights green as the line passes
TILLG = BC("till glow", DP[3] + V((0, -0.21, 0)), 0.3, 0.01, 0.08, glow("till", G, 2.0), z0=1.2, bevel=0.0); grow([TILLG], F(w("L03", 26)) + 6)

# E — the money tower (shots 8, 10, 11): film boxes and prints stacked; a coin drops on each "pay"
TE = at(4); BC("tower base", TE, 3, 3, 0.2, CLAY)
LAYERS = []
for k in range(40):                                                               # film boxes (green) and print stacks (pale), alternating
    z = 0.2 + k * 0.58
    if k % 2: L_ = [BC("film box", TE + V((-0.82 + j * 0.82, rnd.uniform(-0.05, 0.05), 0)), 0.74, 2.3, 0.55, GREENC, z0=z, bevel=0.03) for j in range(3)]
    else: L_ = [BC("print stack", TE + V((rnd.uniform(-0.05, 0.05), rnd.uniform(-0.05, 0.05), 0)), 2.4, 2.4, 0.55, PALE, z0=z, bevel=0.01)]
    LAYERS.append(L_)
for k, L_ in enumerate(LAYERS):                                                   # 6 layers before "pay", +1 on each "pay", the rest climbs on "a hundred years"
    f = 0 if k < 6 else (F(18.81) + 3 if k == 6 else F(20.42) + 3 if k == 7 else F(21.17) + int((k - 8) * 1.1))
    if f: grow(L_, f, d=4)
YEARS = [label(str(y), TE + V((-2.3, -1.25, 0.5 + k * 0.58 * 40 / 12)), 0.8, rot=(math.pi / 2, 0, 0)) for k, y in enumerate(range(1888, 2001, 10))]
for k, o in enumerate(YEARS): grow([o], F(21.17) + int(k * 3.6), d=4)
COIN = cyl("coin", 0, 0, 0.35, 0.06, GREENC, z0=-0.03, verts=32); COIN.rotation_euler.x = math.pi / 2
for t, k in ((18.81, 6), (20.42, 7)):
    top = TE + V((0, 0, 0.2 + k * 0.58 + 2.5)); land = TE + V((0, 0, 0.2 + k * 0.58 + 0.6))
    for f, p in ((F(t) - 2, top), (F(t) + 3, land), (F(t) + 4, V((0, 0, -50)))): COIN.location = p; COIN.keyframe_insert("location", frame=f)
COIN.location = V((0, 0, -50)); COIN.keyframe_insert("location", frame=0)

# G — the 1975 lab, roof off (shot 14): the engineer posed at the bench, the prototype, a cassette deck, a TV
TG = at(5); BC("lab floor", TG, 7, 5, 0.1, CLAY, bevel=0.0)
for a in ((-3.5, 2.4, 3.5, 2.5, 3.0), (-3.5, -2.5, -3.4, 2.5, 3.0), (3.4, -2.5, 3.5, 2.5, 3.0)): B("lab wall", TG.x + a[0], TG.y + a[1], TG.x + a[2], TG.y + a[3], a[4])
BC("bench", TG + V((0, 1.2, 0)), 3.2, 0.9, 0.9)
PROTO = BC("prototype (8 lb)", TG + V((-0.5, 1.1, 0)), 0.35, 0.22, 0.25, PALE, z0=0.9); cyl("prototype lens", TG.x - 0.5, TG.y + 0.98, 0.04, 0.06, CLAY, z0=1.0).rotation_euler.x = math.pi / 2
DECK = model("tape_deck", PALE, length=0.42, at=TG + V((0.15, 1.2, 0.9)), face=0)
TV = model("tv_vintage", CLAY, height=0.5, at=TG + V((0.95, 1.35, 0.9)), face=0)
PIX = [glow("pixel %d" % k, (g_, g_, g_ * 1.04, 1), 1.2) for k, g_ in enumerate((0.25, 0.4, 0.55, 0.7, 0.85))]
for i_ in range(12):                                                              # a coarse grey image: the 100 x 100 pixels, read from 2 m
    for j_ in range(9):
        BC("tv pixel", TG + V((0.95 - 0.165 + i_ * 0.03, 1.35 - TV["dims"][1] / 2 - 0.004, 0)), 0.029, 0.002, 0.029, PIX[(i_ * 7 + j_ * 3 + (i_ * j_) % 5) % 5], z0=0.98 + j_ * 0.03, bevel=0.0)
label("1975", TG + V((0, -1.6, 0.11)), 0.6)
p_engineer = TG + V((-0.6, 0.35, 0.1))

# H — the boardroom (shot 15): five executives seated, the prototype mid-table under one light, a lid that lowers
TH = at(6); BC("board floor", TH, 9, 7, 0.1, CLAY, bevel=0.0); BC("table", TH, 4.4, 1.6, 0.75)
PROTO2 = BC("prototype", TH, 0.35, 0.22, 0.25, PALE, z0=0.75)
LID = BC("box lid", TH, 0.5, 0.36, 0.34, CLAY, z0=0.74)
LID.location.z += 1.2; LID.keyframe_insert("location", frame=F(w("L05", 26)) - 1); LID.location.z -= 1.2; LID.keyframe_insert("location", frame=F(w("L05", 28)) + 6)
SPH = spot(TH + V((0, -0.3, 4.0)), TH + V((0, 0, 0.8)), 500, 0.3)
SPH.data.keyframe_insert("spot_size", frame=F(w("L05", 26))); SPH.data.spot_size = math.radians(6); SPH.data.keyframe_insert("spot_size", frame=F(w("L05", 28)) + 8)

# I — the road of years (shot 16): ten posts, 1981 → 1991, a green line along them
TI = at(7); B("year road", TI.x - 2, TI.y - 1.5, TI.x + 58, TI.y + 1.5, 0.03, ROAD, bevel=0.0)
for k in range(11):
    BC("year post", TI + V((k * 5.5, 2.0, 0)), 0.25, 0.25, 1.6); label(str(1981 + k), TI + V((k * 5.5, 2.15, 1.9)), 0.7, rot=(math.pi / 2, 0, 0))
YD = dashed("ten years", [tuple(TI + V((0, 0, 0))), tuple(TI + V((55, 0, 0)))], DASH, 0.8, 0.5, 0.12, z=0.06); draw(YD, F(w("L05", 31)), F(w("L05", 39)))
grow([label("~10 YEARS", TI + V((55, -3.2, 0.05)), 1.6)], F(w("L05", 39)) + 4)

# J — the device (shots 17, 18): a store shelf above the money tower; each camera on the shelf takes a layer off
TJ = at(8); BC("back wall", TJ + V((0, 1.0, 0)), 6, 0.2, 7); BC("shelf", TJ + V((0, 0.6, 0)), 5, 0.6, 0.08, z0=4.4); BC("shelf", TJ + V((0, 0.6, 0)), 5, 0.6, 0.08, z0=5.6)
for k in range(12): BC("price strip", TJ + V((-2.2 + k * 0.4, 0.29, 0)), 0.22, 0.01, 0.07, PALE, z0=4.33, bevel=0.0)
JT = [BC("money layer", TJ + V((0, -0.5, 0)), 2.6, 2.0, 0.32, GREENC if k % 2 else PALE, z0=k * 0.34) for k in range(12)]
for k in range(12):
    f = F(w("L06", 2)) + int(k * (F(w("L06", 19)) - F(w("L06", 2))) / 12)
    c = inst("camera_digital", TJ + V((-2.2 + k * 0.4, 0.6, 4.48)), 0, length=0.32, m=PALE); grow([c], f, d=6)
    shrink([JT[11 - k]], f + 4, d=8)                                              # winning = losing, made physical

# K — Kodak Park (shots 19, 20): a campus of buildings; lights out block by block; then the empty floor, one desk, 13 ghosts
TK = at(9); KB = []; KINDS = ["factory_a", "factory_b", "factory_b", "kenney_big", "kenney_big2", "brown_bldg", "skyscraper_k"]
for gx in range(-3, 4):
    for gy in range(-2, 3):
        if gx == 0 and gy == 0: continue
        c_ = TK + V((gx * 16 + rnd.uniform(-1.5, 1.5), gy * 16 + rnd.uniform(-1.5, 1.5), 0)); kind = rnd.choice(KINDS)
        r = inst(kind, c_, rnd.choice((0, 90, 180, 270)), height=rnd.choice((7, 9, 12, 15)) if kind == "skyscraper_k" else None,
                 length=None if kind == "skyscraper_k" else rnd.uniform(9, 12))
        KB.append(r); d = r["dims"]; BC("footprint", c_, d[0] + 0.8, d[1] + 0.8, 0.04, ROAD, bevel=0.0)
KW = glow("campus windows", hexc("#E6EAF0"), 1.0)
for k, o in enumerate(KB):
    d = o["dims"]; wn = BC("windows", o.location.xy + V((0, -d[1] / 2 - 0.08)), d[0] * 0.7, 0.05, d[2] * 0.45, KW, z0=d[2] * 0.25, bevel=0.0)
    shrink([wn], F(w("L06", 21)) + int(k * 1.2) + 6, d=6)                          # the lights go out block by block
JL = label("JAN 2012 · CHAPTER 11", TK + V((0, -44, 0.06)), 5.0); grow([JL], F(w("L06", 22)) + 6)
for o in KB: o.keyframe_insert("scale", frame=E(19)); o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=E(19) + 1)   # gone across the cut (footprints stay)
DESK = model("desk", CLAY, length=2.4, at=TK, face=0); DT = topz(DESK); PHONE = model("phone", CLAY, length=0.15, at=TK + V((0.3, 0, DT)), face=0)
PHM = [glow("photo %d" % k, (g_, g_, g_ * 1.05, 1), 1.0) for k, g_ in enumerate((0.45, 0.6, 0.75, 0.9))]
for i_ in range(3):
    for j_ in range(6): BC("phone photo", TK + V((0.3 - 0.021 + i_ * 0.021, -0.055 + j_ * 0.021, 0)), 0.019, 0.019, 0.001, PHM[(i_ + j_ * 2) % 4], z0=topz(PHONE) + 0.0005, bevel=0.0)
grow([label("$1B", TK + V((0, -4.5, 0.06)), 2.2, m=glow("1b", G, 2.0))], F(w("L07", 11)) + 4)

# L — the viewer's phone (shots 22, 24): a held phone, the shutter button, thousands of photo tiles behind
TL = at(10)
PH2 = model("phone", CLAY, length=0.15, at=TL + V((0, -0.03, 1.3)), face=0); PH2.rotation_euler.x = math.pi / 2; PH2.location.z += 0.075   # upright, screen to the camera
BC("palm", TL + V((0, 0.0, 0)), 0.085, 0.03, 0.09, PALE, z0=1.27, bevel=0.012)
for k in range(4):                                                                # fingers wrapped round the right edge, the thumb on the left: a held pose
    f_ = cyl("finger", TL.x + 0.043, TL.y - 0.012, 0.008, 0.035, PALE, z0=1.31 + k * 0.022, verts=16, bevel=0.003); f_.rotation_euler.y = math.pi / 2
th = cyl("thumb", TL.x - 0.045, TL.y - 0.02, 0.009, 0.05, PALE, z0=1.31, verts=16, bevel=0.003); th.rotation_euler = (0, math.radians(-30), 0)
SHUT = cyl("shutter (screen)", TL.x, TL.y - 0.0415, 0.009, 0.002, GREENC, z0=1.315, verts=32); SHUT.rotation_euler.x = math.pi / 2
TILE = glow("tile", hexc("#AEB4BE"), 0.6)
for k in range(400): BC("photo tile", TL + V((rnd.uniform(-3, 3), rnd.uniform(2, 8), 0)), 0.12, 0.003, 0.09, TILE, z0=rnd.uniform(0.2, 3.2), bevel=0.0)

# ---------- people: posed only (white clay). Engineer standing; five executives seated; thirteen ghosts at the desk ----------
def person(kit, loc, turn, m, seat_=False):
    col, rig, hip = crowd.load_person(kit, link=False)
    for o in col.objects:
        if o.type == "MESH": o.data.materials.clear(); o.data.materials.append(m)
    col.instance_offset = (hip.x, hip.y, hip.z if seat_ else 0); return col
P_ST = person("s_m40", None, 0, PALE); crowd.seat(P_ST, p_engineer, 180, name="engineer")
P_SEAT = [person(k, None, 0, PALE, True) for k in ("m60", "m45", "f60", "m30", "f40")]
for k, (x, y, t) in enumerate(((-1.6, -1.15, 0), (0, -1.15, 0), (1.6, -1.15, 0), (-1.0, 1.15, 180), (1.0, 1.15, 180))):
    crowd.seat(P_SEAT[k], TH + V((x, y, 0.5)), t, name="executive"); inst("office_chair", TH + V((x, y + (-0.12 if y < 0 else 0.12), 0.1)), t + 180, height=1.0)
P_GH = [person(k, None, 0, GHOST) for k in ("s_m20", "s_f25", "s_m30", "s_f35", "s_m50")]
for k in range(13):
    a = 2 * math.pi * k / 13; crowd.seat(P_GH[k % 5], TK + V((math.cos(a) * 1.9, math.sin(a) * 1.4, 0)), math.degrees(a) + 90, name="thirteen")

# ---------- light (EX20 values) ----------
wd = sc.world or bpy.data.worlds.new("w"); sc.world = wd; wd.use_nodes = True; wn = wd.node_tree; wn.nodes.clear()
bg = wn.nodes.new("ShaderNodeBackground"); bg.inputs[0].default_value = hexc("#14161B"); bg.inputs[1].default_value = 1.3
wn.links.new(bg.outputs[0], wn.nodes.new("ShaderNodeOutputWorld").inputs[0])
def sun(rot, e, col, ang, shadow=True):
    bpy.ops.object.light_add(type="SUN"); L = bpy.context.object; L.rotation_euler = [math.radians(a) for a in rot]
    L.data.energy = e; L.data.color = col; L.data.angle = math.radians(ang); L.data.use_shadow = shadow; return L
SUN = sun((48, 0, -38), 1.7, (0.93, 0.96, 1.0), 18); sun((62, 0, 150), 0.9, (0.8, 0.88, 1.0), 25); sun((70, 0, 20), 0.45, (0.85, 0.9, 1.0), 40, False)
for f, e in ((S(13) - 1, 1.7), (S(13), 0.25), (E(13), 0.25), (E(13) + 1, 1.7)): SUN.data.energy = e; SUN.data.keyframe_insert("energy", frame=f)   # night for shot 13
WE = ES(WINM); key(WE, S(13) - 1, 0.0); key(WE, S(13), 3.0)
SM = ES(SIGNM); key(SM, F(w("L01", 12)) - 1, 4.0); key(SM, F(w("L01", 12)) + 3, 0.0)
sc.view_settings.view_transform = "AgX"; sc.view_settings.look = "AgX - Medium High Contrast"
tree = bpy.data.node_groups.new("comp", "CompositorNodeTree"); sc.compositing_node_group = tree
tree.interface.new_socket("Image", in_out="OUTPUT", socket_type="NodeSocketColor")
rl = tree.nodes.new("CompositorNodeRLayers"); go = tree.nodes.new("NodeGroupOutput")
gl = tree.nodes.new("CompositorNodeGlare"); gl.inputs["Type"].default_value = "Bloom"; gl.inputs["Threshold"].default_value = 0.9; gl.inputs["Strength"].default_value = 0.3
tree.links.new(rl.outputs["Image"], gl.inputs["Image"]); tree.links.new(gl.outputs["Image"], go.inputs["Image"]); sc.render.use_compositing = True

# ---------- camera: one slow move per shot, a hard cut between shots ----------
def orb(aim, d, el, az):
    aim = V(aim); e, a = math.radians(el), math.radians(az)
    return aim + V((math.sin(a) * math.cos(e), -math.cos(a) * math.cos(e), math.sin(e))) * d
SHOT = {}                                                                         # n: (start (aim, d, el, az, lens, f), end (…))
SHOT[1] = ((TA + V((0, -34, 27)), 46, 6, 0, 35, 16), (TA + V((0, -34, 28)), 42, 6, 0, 35, 16))
SHOT[2] = ((TA + V((0, 0, 54)), 86, 4, 0, 50, 16), (TA + V((0, 0, 54.5)), 84, 4, 0, 50, 16))   # the photo's view, matched
SHOT[3] = ((TB + V((0, 0, 0.9)), 1.6, 5, 14, 60, 4), (TB + V((0, 0, 0.92)), 1.35, 5, 14, 60, 4))
SHOT[4] = ((TC + V((0.02, 0, 0.94)), 0.55, 14, 24, 85, 2), (TC + V((0.03, 0, 0.94)), 0.52, 14, 30, 85, 2))
SHOT[5] = ((TC + V((0.045, 0, 0.99)), 0.32, 30, 40, 100, 2.8), (TC + V((0.045, 0, 0.99)), 0.26, 30, 40, 100, 2.8))
SHOT[6] = ((TD + V((0, 0.3, 0.8)), 12.5, 50, 8, 40, 8), (TD + V((0, 0.3, 0.8)), 13.5, 56, 12, 40, 8))
SHOT[7] = ((TC + V((0, -0.03, 0.95)), 0.42, 6, -18, 100, 2.8), (TC + V((0, -0.03, 0.95)), 0.41, 6, -18, 100, 2.8))
SHOT[8] = ((TE + V((0, 0, 4.0)), 9, 10, 0, 50, 8), (TE + V((0, 0, 4.2)), 9, 10, 0, 50, 8))
SHOT[9] = ((TC + V((0, -0.03, 0.95)), 0.42, 6, 18, 100, 2.8), (TC + V((0, -0.03, 0.95)), 0.41, 6, 18, 100, 2.8))
SHOT[10] = ((TE + V((0, 0, 4.6)), 9, 10, 0, 50, 8), (TE + V((0, 0, 4.8)), 9, 10, 0, 50, 8))
SHOT[11] = ((TE + V((0, 0, 4.0)), 18, 4, 0, 35, 11), (TE + V((0, 0, 15.0)), 22, 18, 0, 35, 11))
SHOT[12] = ((TC + V((0, -0.03, 0.95)), 0.42, 6, -18, 100, 2.8), (TC + V((0, -0.03, 0.95)), 0.42, 6, -18, 100, 2.8))
SHOT[13] = ((TA + V((0, 0, 50)), 260, 3, 0, 135, 16), (TA + V((0, 0, 52)), 240, 3, 0, 135, 16))
SHOT[14] = ((TG + V((0, 0.8, 0.9)), 7.0, 46, 12, 40, 8), (TG + V((0, 0.8, 0.9)), 6.2, 44, 12, 40, 8))
SHOT[15] = ((TH + V((0, 0, 0.8)), 7.0, 50, 18, 50, 8), (TH + V((0, 0, 0.8)), 6.8, 50, 24, 50, 8))
SHOT[16] = ((TI + V((14, 1.0, 0.5)), 26, 34, -90, 35, 11), (TI + V((34, 1.0, 0.5)), 26, 34, -90, 35, 11))   # down the road: it recedes up the tall frame
SHOT[17] = ((TJ + V((0, 0, 2.6)), 10.5, 6, 0, 50, 11), (TJ + V((0, 0, 2.6)), 11.5, 6, 0, 50, 11))
SHOT[18] = ((TJ + V((0, 0, 2.6)), 14, 6, 0, 35, 11), (TJ + V((0, 0, 2.6)), 14, 6, 0, 35, 11))
SHOT[19] = ((TK + V((0, 0, 0)), 120, 70, 0, 30, 16), (TK + V((0, 0, 0)), 135, 76, 0, 30, 16))
SHOT[20] = ((TK + V((0, 0, 0.5)), 60, 62, 0, 35, 11), (TK + V((0, 0, 0.8)), 12, 50, 0, 35, 8))
SHOT[21] = ((TK + V((0.3, 0, topz(PHONE))), 0.6, 40, 20, 85, 2), (TK + V((0.3, 0, topz(PHONE))), 0.55, 42, 26, 85, 2))
SHOT[22] = ((TL + V((0, -0.04, 1.37)), 0.75, 4, 0, 100, 1.8), (TL + V((0, -0.04, 1.37)), 0.62, 4, 0, 100, 1.8))
SHOT[23] = ((TB + V((0, 0, 0.93)), 0.9, 8, -10, 60, 2.8), (TB + V((0, 0, 0.93)), 0.85, 8, -10, 60, 2.8))
SHOT[24] = ((TL + V((0, -0.042, 1.315)), 0.3, 2, 0, 100, 2.8), (TL + V((0, -0.042, 1.315)), 0.24, 2, 0, 100, 2.8))
ck = []
for n in range(1, 25):
    for f, (aim, d, el, az, lens, fs) in ((S(n), SHOT[n][0]), (E(n), SHOT[n][1])): ck.append((f, orb(aim, d, el, az), V(aim), lens, fs))
rig = PerspRig(); ck.sort(key=lambda k_: k_[0]); rig.keys(ck, drift=0.0)
for f in range(N): rig.set(f)
for o in [o for o in bpy.data.objects if o.name.startswith("label") or "PHOTO" in o.name]: o.visible_shadow = False
for o in (PHOTO,): o.keyframe_insert("scale", frame=E(1)); s0 = o.scale.copy(); o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=E(1) + 1)
hard_cuts([rig.cam, rig.aim, rig.cam.data, PHOTO] + KB, CUTS[1:])            # the camera, and what swaps at a cut

json.dump(credits_for(), open(EP + "build/model_credits.json", "w"), indent=1)
BOARD = [(n, (S(n) + E(n)) // 2) for n in range(1, 25)]
BOARD = dict(BOARD); BOARD.update({3: F(w("L02", 7)), 5: F(w("L03", 16)) + 1, 7: F(18.10) + 1, 12: F(w("L04", 5)) + 10, 15: F(w("L05", 28)) + 8,
                                   16: E(16) - 4, 17: F(w("L06", 9)), 18: E(18) - 6, 19: F(w("L06", 25)), 20: F(w("L07", 12)), 24: F(w("L08", 21)) + 1})
if CHECK:
    for a in bpy.data.screens:
        for ar in a.areas:
            if ar.type == "VIEW_3D":
                for sp_ in ar.spaces:
                    if sp_.type == "VIEW_3D": sp_.shading.type = "MATERIAL"; sp_.region_3d.view_perspective = "CAMERA"
    sc.frame_set(0); bpy.ops.wm.save_as_mainfile(filepath=EP + "EX21_check.blend", compress=True)
elif "board" in A or "still" in A:
    fr = [BOARD[n] for n in range(1, 25)] if "board" in A else [int(x) for x in A[A.index("still") + 1].split(",")]
    for f in fr:
        sc.frame_set(f); sc.render.filepath = f"{OUT}/b_{f:04d}.png"; bpy.ops.render.render(write_still=True)

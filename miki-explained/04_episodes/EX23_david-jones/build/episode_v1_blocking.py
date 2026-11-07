# EX23 "The Store That Couldn't Pay Its Rent" — clay maquette, light V4 (EX00V12, user 2026-11-06), shot list v1.
# Stage: BLOCKING (gate 2) — grey boxes, posed stand-ins, the real cameras. Library models and the photo come in gate 3.
# One set per shot idea, 400 m apart; each set lit by its own V4 studio key / rim / fill (never suns); hard cut on the word.
#   blender -b --python build/episode.py -- <out_dir> board [half]   |   still f,f,… [half]   |   check
import sys, os, math, json, random, bpy
from mathutils import Vector as V
EP = os.path.dirname(os.path.abspath(__file__)) + "/../"; sys.path.insert(0, EP + "../../tools/blender")
from isokit import setup, box, cyl, hexc, ease, span
from camkit import *
import crowd
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
def store(c, floors=6, w_=30, d_=20, fh=4.0, name="store", m=CLAY):
    """a department store: storeys with window bands, a cornice; returns its parts."""
    parts = []
    for k in range(floors):
        parts.append(BC(name + " floor", c, w_, d_, fh - 0.3, m, z0=k * fh, bevel=0.05))
        parts.append(BC(name + " windows", c + V((0, -d_ / 2 - 0.02, 0)), w_ * 0.86, 0.06, fh * 0.45, DARK, z0=k * fh + fh * 0.3, bevel=0))
        parts.append(BC(name + " sill", c + V((0, -d_ / 2 - 0.05, 0)), w_ + 0.4, 0.3, 0.25, m, z0=(k + 1) * fh - 0.3, bevel=0.03))
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
T2 = at(1); PHOTO = BC("REAL PHOTO stand-in (David Jones, Elizabeth St)", T2 + V((0, -40, 0)), 30, 0.2, 54, PALE); label("REAL PHOTO", T2 + V((0, -40.2, 27)), 2.4)
T3 = at(2); FLAG = store(T3, floors=6, w_=34, d_=20); label("1838", T3 + V((0, -10.1, 3.4)), 1.2)
DOORS = [BC("door L", T3 + V((-1.2, -10.05, 0)), 2.2, 0.15, 3.0, DARK), BC("door R", T3 + V((1.2, -10.05, 0)), 2.2, 0.15, 3.0, DARK)]
NOTICE = BC("IN ADMINISTRATION notice", T3 + V((1.2, -10.15, 0)), 0.8, 0.02, 1.1, PALE, z0=1.2, bevel=0); grow([NOTICE], S(6) + 1, d=1)
SCAF = [BC("scaffold", T3 + V((x, -11, 0)), 0.15, 0.15, 25, CLAY) for x in range(-17, 18, 3)] + [BC("scaffold deck", T3 + V((0, -11, 0)), 35, 1.2, 0.15, CLAY, z0=z) for z in range(4, 25, 4)]
BANNER = BC("makeover banner", T3 + V((0, -11.7, 0)), 20, 0.1, 3.0, DARK, z0=15); BAN = label("$400,000,000", T3 + V((0, -11.8, 16.5)), 2.0, m=GTXT)
for o in SCAF + [BANNER, BAN]: grow([o], S(12) + 1, d=1); shrink([o], E(12) + 1, d=1)
DEC = label("DEC 2019", T3 + V((0, -11.8, 13.5)), 1.0); grow([DEC], S(12) + 1, d=1); shrink([DEC], E(12) + 1, d=1)
BILLS = [BC("rent bill", T3 + V((rnd.uniform(-1.5, 1.5), -11.2 + rnd.uniform(-0.3, 0.3), 0)), 0.5, 0.35, 0.01, GREENC, z0=0.02 + k * 0.012, bevel=0) for k in range(30)]
for k, b_ in enumerate(BILLS): grow([b_], F(w("L05", 12)) + k, d=3)
for i, m_ in enumerate(("SEP", "OCT", "NOV")): grow([label(m_, T3 + V((-1.2 + i * 1.2, -11.6, 0.4)), 0.35, rot=(math.radians(60), 0, 0), m=GTXT)], F(w("L05", 12)) + 10 + i * 6)
MALL = BC("the landlord's mall", T3 + V((0, 60, 0)), 140, 50, 36, CLAY); LLB = label("LANDLORD", T3 + V((0, 34.9, 30)), 6)
for o in (MALL, LLB): grow([o], S(16) + 1, d=1)                                     # only behind the doormat shot
lightset(T3, 40)

# 4 — the price tag hanging off a corner of the store (macro scale)
T4 = at(3); store(T4, floors=2, w_=10, d_=8, fh=3); TAG4 = BC("price tag", T4 + V((5.3, -4.3, 0)), 1.1, 0.02, 1.6, PALE, z0=3.0, bevel=0.05)
P1, P2 = label("$2.1B · 2014", T4 + V((5.3, -4.33, 3.8)), 0.2, m=paint("ink", hexc("#14161B"), 0.6, 0.0)), label("$100M · 2024", T4 + V((5.3, -4.33, 3.8)), 0.2, m=paint("ink", hexc("#14161B"), 0.6, 0.0))
shrink([P1], F(w("L02", 15)) + 2, d=4); grow([P2], F(w("L02", 15)) + 6, d=4)
lightset(T4, 8)

# 5 — Australia in grey, 38 store markers, a crowd around the flagship
T5 = at(4); AU = [(-60, 20), (-40, 50), (0, 62), (40, 55), (70, 30), (78, -5), (65, -40), (35, -55), (0, -48), (-30, -40), (-62, -20)]
import bmesh
me = bpy.data.meshes.new("Australia"); bm = bmesh.new(); vs = [bm.verts.new((T5.x + x, T5.y + y, 0.05)) for x, y in AU]; bm.faces.new(vs); bm.to_mesh(me); bm.free()
AUo = bpy.data.objects.new("Australia (outline)", me); sc.collection.objects.link(AUo); me.materials.append(PALE)
COAST = [(70, 30), (75, 10), (72, -20), (62, -38), (48, -50), (30, -54), (-20, -42), (-55, -22)]
for k in range(38):
    x, y = COAST[k % len(COAST)]; c_ = BC("store marker", T5 + V((x * 0.85 + rnd.uniform(-5, 5), y * 0.85 + rnd.uniform(-5, 5), 0)), 2.2, 2.2, 2.2, CLAY, z0=0.05)
    grow([c_], F(w("L02", 23)) + k, d=6)
lightset(T5, 120)

# 7 — the exploded view: the floors pulled apart, one department each
T7 = at(5); DEPTS = ["SHOES", "BEAUTY", "HOMEWARES", "MENSWEAR", "WOMENSWEAR", "TOYS"]
for k, dn in enumerate(DEPTS):
    z = k * 7.0; BC("exploded floor", T7, 24, 16, 0.6, CLAY, z0=z)
    for j in range(8): BC("rack", T7 + V((-9 + (j % 4) * 6, -4 + (j // 4) * 8, 0)), 3.5, 1.0, 1.6, PALE, z0=z + 0.6)
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
PHONE = BC("giant phone (EX21 iPhone in gate 3)", T11 + V((22, 18, 0)), 30, 4, 62, paint("phone body", hexc("#2A2C31"), 0.3, 0.5), bevel=4.0)
SCR = BC("phone screen: a grid of shops", T11 + V((22, 15.9, 0)), 27, 0.2, 58, glow("phone screen", hexc("#C9CED6"), 0.9), z0=2.0, bevel=2.0)
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
    for y in range(-14, 15, 7): BC("empty rack", T17 + V((x, y, 0)), 4, 1, 1.6, CLAY, z0=0.1)
CEIL = BC("ceiling meter", T17 + V((0, 6, 0)), 26, 8, 0.1, DARK, z0=7.85, bevel=0); CL = label("RENT  + $ + $ + $", T17 + V((0, 6, 7.8)), 2.4, rot=(math.pi, 0, 0), m=GTXT)
lightset(T17, 40, 4)

# ---------- camera ----------
def orb(aim, d, el, az):
    aim = V(aim); e, a = math.radians(el), math.radians(az)
    return aim + V((math.sin(a) * math.cos(e), -math.cos(a) * math.cos(e), math.sin(e))) * d
SHOT = {
 1: ((T1 + V((0, 0, 14)), 70, 8, 18, 40, 11), (T1 + V((0, 0, 4)), 62, 10, 18, 40, 11)),
 2: ((T2 + V((0, -40, 27)), 50, 4, 0, 35, 16), (T2 + V((0, -40, 27.5)), 46, 4, 0, 35, 16)),
 3: ((T3 + V((0, 0, 12)), 70, 4, 0, 35, 16), (T3 + V((0, 0, 12)), 66, 4, 0, 35, 16)),
 4: ((T4 + V((4.6, -4.3, 3.6)), 6.5, 6, 20, 85, 4), (T4 + V((4.7, -4.3, 3.6)), 6.0, 6, 24, 85, 4)),
 5: ((T5 + V((5, 0, 0)), 260, 80, 0, 30, 16), (T5 + V((5, 0, 0)), 245, 82, 0, 30, 16)),
 6: ((T3 + V((0, -10, 1.8)), 9, 4, 6, 50, 4), (T3 + V((0, -10, 1.8)), 7.5, 4, 6, 50, 4)),
 7: ((T7 + V((0, 0, 18)), 80, 16, 30, 35, 11), (T7 + V((0, 0, 19)), 76, 20, 34, 35, 11)),
 8: ((T8 + V((0, -20, 2)), 90, 42, 10, 35, 11), (T8 + V((0, -30, 2)), 90, 42, 6, 35, 11)),
 9: ((T9, 230, 86, 0, 30, 16), (T9, 215, 86, 0, 30, 16)),
 10: ((T9, 215, 86, 0, 30, 16), (T9, 205, 86, 0, 30, 16)),
 11: ((T11 + V((5, 5, 26)), 95, 4, -20, 24, 11), (T11 + V((5, 5, 30)), 90, 6, -24, 24, 11)),
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

# EX20 "The Janitor Who Owned Everything" — v4 + diagrams, 30 fps, one small town at dusk, one continuous camera.
# ANIM mode (now): a grey-box Workbench animatic for the cinematography; v4 detail after approval.
#   blender -b --python build/episode.py -- <out_dir> animatic | preview | still f,f,… [half] | (full render)
# Units: metres. Layout along one road (x): the store (back corridor) north of the road, the gas station south, his
# house further east; the diagram plays on the dark fields around the house.
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
def w(L, i): return VW[L][i][1]
def F(t): return int(round(t * FPS))
N = int(math.ceil(VT["end"] * FPS)); sc.frame_start, sc.frame_end = 0, N - 1
rnd = random.Random(20)
if ANIM:
    sc.render.engine = "BLENDER_WORKBENCH"; sh = sc.display.shading
    sh.light = "STUDIO"; sh.color_type = "OBJECT"; sh.show_shadows = True; sh.show_cavity = True; sc.render.use_motion_blur = False
else:
    engine("eevee", 32, fast=True)
GREY, DARK, GREEN, WARMC, YEL = (0.55, 0.56, 0.6, 1), (0.25, 0.26, 0.29, 1), (0.34, 0.82, 0.0, 1), (0.93, 0.9, 0.86, 1), (0.95, 0.75, 0.3, 1)
MAT = {}
def col(o, c):
    o.color = c if isinstance(c, tuple) else GREY
    if not ANIM and c in MAT: o.data.materials.clear(); o.data.materials.append(MAT[c])
    return o
def gbox(name, x0, y0, x1, y1, h, c=GREY, z0=0.0, bevel=0.02):
    return col(box(name, x0, y0, x1, y1, h, bpy.data.materials.get("g") or bpy.data.materials.new("g"), z0=z0, bevel=bevel), c)
def text(name, s, size, loc, rot=(math.pi / 2, 0, 0), c=WARMC):
    bpy.ops.object.text_add(location=loc); o = bpy.context.object; o.name = name; o.data.body = s; o.data.size = size
    o.data.align_x = "CENTER"; o.data.align_y = "CENTER"; o.data.extrude = 0.01; o.rotation_euler = rot
    o.data.font = bpy.data.fonts.get("InterDisplay-Black") or bpy.data.fonts.load(os.path.expanduser("~/Library/Fonts/InterDisplay-Black.ttf"))
    return col(o, c)
def show(objs, f, on):
    for o in objs:
        for x in [o] + list(o.children_recursive):
            x.hide_render = not on; x.keyframe_insert("hide_render", frame=f)
def pop(o, f0, f1=None, d=8):
    s = o.scale.copy() if o.scale.length > 1e-6 else Vector((1, 1, 1))
    o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=f0)
    o.scale = s * 1.08; o.keyframe_insert("scale", frame=f0 + d); o.scale = s; o.keyframe_insert("scale", frame=f0 + d + 4)
    if f1 is not None:
        o.keyframe_insert("scale", frame=f1); o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=f1 + d)
def tube(name, a, b, r, c):
    a, b = Vector(a), Vector(b); d = b - a
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=d.length, location=(a + b) / 2, vertices=16)
    o = bpy.context.object; o.name = name; o.rotation_euler = d.to_track_quat("Z", "Y").to_euler(); return col(o, c)

# ---------- word times ----------
T_8M = w("L01", 4); T_NOBODY = w("L01", 6); T_DIED = w("L01", 10)
T_L02 = w("L02", 0); T_PUMPED = w("L02", 6); T_FLOORS = w("L02", 10); T_TOYOTA = w("L02", 18); T_PIN = w("L02", 26); T_BRANCH = w("L02", 31)
T_L03 = w("L03", 0); T_RAIL = w("L03", 8); T_BANK = w("L03", 9); T_DRUG = w("L03", 10); T_PHONE = w("L03", 11); T_CASH = w("L03", 19)
T_L04 = w("L04", 0); T_KEPT = w("L04", 7); T_95 = w("L04", 16); T_PAPER = w("L04", 19); T_5 = w("L04", 27)
T_L05 = w("L05", 0); T_OWNED = w("L05", 6); T_PIECE = w("L05", 10)
T_L06 = w("L06", 0); T_HOSP = w("L06", 8); T_LIB = w("L06", 15); T_BIGGEST = w("L06", 17)
T_L07 = w("L07", 0); T_QUIETLY = w("L07", 10); T_L08 = w("L08", 0)

# ---------- the town ----------
gbox("ground", -80, -80, 120, 80, 0.1, DARK, z0=-0.1, bevel=0.0)
gbox("road", -60, -2, 100, 2, 0.02, (0.2, 0.2, 0.22, 1), z0=0.0, bevel=0.0)
# the store (north of the road) with its back corridor; the street door faces the road at x -22
STORE = [gbox("store back", -30, 15.8, -14, 16, 5, z0=0), gbox("store L", -30, 4, -29.8, 16, 5, z0=0), gbox("store R", -14.2, 4, -14, 16, 5, z0=0),
         gbox("store front L", -30, 4, -23, 4.2, 5, z0=0), gbox("store front R", -21, 4, -14, 4.2, 5, z0=0), gbox("store front top", -23, 4, -21, 4.2, 2.2, z0=2.8)]
STORE_ROOF = gbox("store roof", -30.2, 3.8, -13.8, 16.2, 0.3, z0=5.0)
gbox("corridor wall", -30, 8.2, -14, 8.4, 3.2, z0=0)                       # the back corridor between y 4.2 and 8.2
gbox("corridor floor", -29.8, 4.2, -14.2, 8.2, 0.02, (0.45, 0.46, 0.5, 1), z0=0.0, bevel=0.0)
text("store sign", "DEPARTMENT STORE", 0.6, (-22, 3.9, 4.0), c=WARMC)
BUCKET = col(cyl("mop bucket", -24.6, 6.2, 0.25, 0.4, bpy.data.materials["g"], z0=0.0, verts=24), YEL)
JAN = Figure("janitor", bpy.data.materials["g"]); JAN.root.location = (-25.4, 6.5, 0); JAN.root.rotation_euler.z = 0.6
for p_ in JAN.parts: col(p_, GREY)
MOP = tube("mop", (-25.0, 6.3, 0.05), (-25.6, 6.6, 1.4), 0.025, WARMC)
# the gas station (south of the road)
for x in (-24, -16):
    for y in (-11, -5): gbox("canopy post", x - 0.15, y - 0.15, x + 0.15, y + 0.15, 4.5, z0=0)
CANOPY = gbox("canopy", -25, -12, -15, -4, 0.5, WARMC, z0=4.5)
PUMPS = [gbox("pump", x - 0.4, -8.4, x + 0.4, -7.6, 1.6, z0=0) for x in (-22, -18)]
PUMPLIGHT = [gbox("pump light", x - 0.3, -8.42, x + 0.3, -8.4, 0.35, GREEN, z0=1.15) for x in (-22, -18)]
gbox("kiosk", -26, -16, -20, -12.5, 3.0, z0=0); text("price sign", "GAS", 1.0, (-14, -3.0, 5.2), c=GREEN)
gbox("price pole", -14.1, -3.1, -13.9, -2.9, 4.6, z0=0)
ATTEND = Figure("attendant", bpy.data.materials["g"]); ATTEND.root.location = (-21.0, -7.0, 0); ATTEND.root.rotation_euler.z = math.pi * 0.5
for p_ in ATTEND.parts: col(p_, GREY)
CAR = gbox("hatchback", -20.8, -7.0, -17.2, -5.4, 1.3, (0.5, 0.55, 0.6, 1), z0=0.25, bevel=0.25)
# his house (east), porch facing the road, jacket on the hook, woodpile, chimney
HX, HY = 8.0, -10.0                                    # close to the gas station: the drive is a calm follow, not a whip
gbox("house", HX - 4, HY - 4, HX + 4, HY + 4, 3.2, (0.6, 0.55, 0.5, 1), z0=0)
HROOF = gbox("house roof", HX - 4.4, HY - 4.4, HX + 4.4, HY + 4.4, 0.4, (0.4, 0.3, 0.28, 1), z0=3.2)
gbox("chimney", HX + 2, HY + 1, HX + 2.8, HY + 1.8, 2.0, z0=3.2)
gbox("porch", HX - 2, HY + 4, HX + 2, HY + 6, 0.2, z0=0)
JACKET = gbox("jacket", HX + 0.3, HY + 4.02, HX + 0.9, HY + 4.1, 0.8, (0.35, 0.4, 0.5, 1), z0=1.0)
PIN = tube("safety pin", (HX + 0.55, HY + 4.12, 1.55), (HX + 0.65, HY + 4.12, 1.48), 0.012, WARMC)
for k in range(6): gbox("log", HX + 5, HY - 3 + k * 0.35, HX + 6.5, HY - 2.7 + k * 0.35, 0.3, (0.45, 0.35, 0.25, 1), z0=0)
CARRY = Figure("ron", bpy.data.materials["g"]); CARRY.root.location = (HX + 4.2, HY + 3, 0)
for p_ in CARRY.parts: col(p_, GREY)
# the safe-deposit box and the stack (inside, on a table), the ruler
gbox("table", HX - 1, HY - 1, HX + 1, HY + 1, 0.85, (0.45, 0.35, 0.25, 1), z0=0)
SBOX = gbox("safe box", HX - 0.3, HY - 0.15, HX + 0.3, HY + 0.15, 0.12, (0.6, 0.62, 0.66, 1), z0=0.85)
LID = gbox("safe lid", HX - 0.3, HY - 0.15, HX + 0.3, HY + 0.15, 0.02, (0.6, 0.62, 0.66, 1), z0=0.97)
STACK = gbox("certificates", HX - 0.2, HY - 0.12, HX + 0.2, HY + 0.12, 0.127, WARMC, z0=0.98, bevel=0.003)   # 5 inches = 12.7 cm
STACK.scale.z = 0.0
RULER = gbox("ruler", HX + 0.26, HY - 0.02, HX + 0.3, HY + 0.02, 0.127, YEL, z0=0.98, bevel=0.0)
LAB95 = text("95 label", "95 COMPANIES", 0.06, (HX, HY + 0.2, 1.25), rot=(math.pi / 2, 0, math.pi), c=GREEN)        # faces the camera (+y)
LAB5 = text("5in label", "5 INCHES", 0.03, (HX + 0.42, HY + 0.05, 1.05), rot=(math.pi / 2, 0, math.pi), c=YEL)
# the diagram around the house: four company types, lines to the house, coins once a year
COMP = []
for name, (dx, dy), label in (("railroad", (-14, 8), "RAILROAD"), ("bank", (14, 10), "BANK"), ("drugstore", (-12, -12), "DRUGSTORE"), ("phone", (15, -12), "PHONE")):
    x, y = HX + dx, HY + dy
    b = gbox(name, x - 1.5, y - 1.5, x + 1.5, y + 1.5, 2.0 if name != "phone" else 0.4, GREEN, z0=0)
    if name == "phone": tube("tower", (x, y, 0.4), (x, y, 5), 0.15, GREEN)
    t = text(name + " label", label, 0.7, (x, y - 1.8, 2.6), c=WARMC)
    ln = Path([(x, y), (HX, HY)], r=0.1).curve(name + " line", bpy.data.materials["g"], depth=0.06, z=0.05, drawn=0.0); col(ln, GREEN)
    COMP.append((b, t, ln, Vector((x, y, 0.4))))
COINS = [col(cyl("coin", 0, 0, 0.35, 0.08, bpy.data.materials["g"], z0=0, verts=20), YEL) for _ in COMP]
# the fan-out: 95 small buildings across the town ("a town he owns")
OWN = []
while len(OWN) < 95:
    x, y = rnd.uniform(-50, 95), rnd.uniform(-45, 45)
    if abs(y) < 4 or (-31 < x < -13 and -17 < y < 17) or (HX - 7 < x < HX + 8 and HY - 6 < y < HY + 8) or (abs(x + 10) < 6 and abs(y - 22) < 6) or (abs(x - 26) < 6 and abs(y - 20) < 6):
        continue
    hgt = rnd.uniform(1.0, 3.5); OWN.append(gbox("owned", x - 1, y - 1, x + 1, y + 1, hgt, GREEN, z0=0))
HOSP = gbox("hospital", -15, 17, -5, 27, 6, WARMC, z0=0); text("hosp label", "HOSPITAL", 1.4, (-10, 27.4, 7.5), rot=(math.pi / 2, 0, math.pi), c=WARMC)
LIBR = gbox("library", 21, 15, 31, 25, 5, WARMC, z0=0); text("lib label", "LIBRARY", 1.4, (26, 25.4, 6.5), rot=(math.pi / 2, 0, math.pi), c=WARMC)
HWIN = [gbox("hosp window", -14 + (k % 4) * 2.3, 27.0, -12.8 + (k % 4) * 2.3, 27.05, 0.8, DARK, z0=1 + (k // 4) * 1.6) for k in range(12)]   # on the side the camera sees
LWIN = [gbox("lib window", 22 + (k % 4) * 2.3, 25.0, 23.2 + (k % 4) * 2.3, 25.05, 0.9, DARK, z0=1 + (k // 4) * 1.5) for k in range(8)]
STREAM = [col(cyl("stream coin", 0, 0, 0.3, 0.08, bpy.data.materials["g"], z0=0, verts=16), YEL) for _ in range(40)]

# ---------- motion / timing ----------
f = F
for fr in range(N):
    t = fr / FPS
    # the janitor mops (L01); the attendant pumps; Ron carries branches
    JAN.pose(fr, t * 3.0, 0.25); JAN.arms[0].rotation_euler.x += 0.5 * math.sin(t * 3); JAN.arms[0].keyframe_insert("rotation_euler", frame=fr)
    # the car leaves the pump on "Toyota" and drives to the house
    g = ease(span(t, T_TOYOTA - 0.8, T_PIN - 0.3)); CAR.location = Vector((-19.0, -6.2, 0.9)).lerp(Vector((HX - 7.5, -3.2, 0.9)), g)       # parks in the drive, clear of the camera
    CAR.keyframe_insert("location", frame=fr)
    walking = T_PIN < t < T_BRANCH + 1.2; s_ = span(t, T_PIN, T_BRANCH + 1.2)
    CARRY.root.location = Vector((HX + 7, HY + 3, 0)).lerp(Vector((HX + 5.2, HY - 1.8, 0)), s_); CARRY.root.rotation_euler.z = math.pi * 1.1
    CARRY.root.keyframe_insert("location", frame=fr); CARRY.pose(fr, t * 6, 1.0 if walking else 0.0)
    # L03: company lines draw; a coin travels each line once a "year" (every 1.2 s)
    for k, (b, tl, ln, p) in enumerate(COMP):
        ln.data.bevel_factor_end = span(t, (T_RAIL, T_BANK, T_DRUG, T_PHONE)[k] + 0.2, (T_RAIL, T_BANK, T_DRUG, T_PHONE)[k] + 0.9) * (1 - span(t, T_L05, T_L05 + 0.6))
        ln.data.keyframe_insert("bevel_factor_end", frame=fr)
        ph = ((t - T_CASH + k * 0.3) % 1.2) / 1.2 if T_CASH <= t < T_L04 + 1 else 0.0
        c_ = COINS[k]; c_.location = p.lerp(Vector((HX, HY, 0.4)), ph) + Vector((0, 0, 1.5 * math.sin(math.pi * ph)))
        c_.scale = (1.0 if 0.03 < ph < 0.97 else 0.0,) * 3; c_.keyframe_insert("location", frame=fr); c_.keyframe_insert("scale", frame=fr)
    # L04: the box opens, the stack rises (5 inches)
    LID.rotation_euler.x = -1.9 * ease(span(t, T_KEPT - 0.4, T_KEPT + 0.2)); LID.keyframe_insert("rotation_euler", frame=fr)
    STACK.scale.z = max(0.001, ease(span(t, T_KEPT, T_5))); STACK.keyframe_insert("scale", frame=fr)
    # L05: the stack fans out into the town
    for k, o in enumerate(OWN):
        on = span(t, T_OWNED + k * 0.022, T_OWNED + k * 0.022 + 0.4); o.scale = (on, on, on); o.keyframe_insert("scale", frame=fr)
    # L06: coins stream from the owned buildings to the hospital, then the library; windows light
    for k, c_ in enumerate(STREAM):
        src = OWN[(k * 7) % 95].location; dst = Vector((-10, 22, 3)) if k % 2 == 0 else Vector((26, 20, 3))
        ph = ((t - T_L06 + k * 0.17) % 1.6) / 1.6 if T_L06 <= t < T_L07 else 0.0
        c_.location = src.lerp(dst, ph) + Vector((0, 0, 4 * math.sin(math.pi * ph))); c_.scale = (1.0 if 0.03 < ph < 0.97 else 0.0,) * 3
        c_.keyframe_insert("location", frame=fr); c_.keyframe_insert("scale", frame=fr)
for k, wn in enumerate(HWIN): wn.keyframe_insert("color", frame=f(T_HOSP - 0.2)); wn.color = YEL; wn.keyframe_insert("color", frame=f(T_HOSP + k * 0.05))
for k, wn in enumerate(LWIN): wn.keyframe_insert("color", frame=f(T_LIB - 0.2)); wn.color = YEL; wn.keyframe_insert("color", frame=f(T_LIB + k * 0.05))
for pl in PUMPLIGHT: pl.keyframe_insert("color", frame=f(T_QUIETLY - 0.1)); pl.color = DARK; pl.keyframe_insert("color", frame=f(T_QUIETLY + 0.1))
for o in [b for b, _, _, _ in COMP] + [t_ for _, t_, _, _ in COMP] + [LAB95, LAB5, HOSP, LIBR] + COINS:
    o.hide_render = True
show([b for b, _, _, _ in COMP] + [t_ for _, t_, _, _ in COMP] + [LAB95, LAB5] + COINS, 0, False)
for k, (b, tl, _, _) in enumerate(COMP): show([b, tl], f((T_RAIL, T_BANK, T_DRUG, T_PHONE)[k] - 0.1), True)
show([b for b, _, _, _ in COMP] + [t_ for _, t_, _, _ in COMP], f(T_L05 + 0.3), False)
show([LAB95], f(T_95 - 0.1), True); show([LAB5], f(T_5 - 0.1), True); show([LAB95, LAB5], f(T_L05 + 0.2), False)
show([HROOF], f(T_L04 - 0.4), False); show([HROOF], f(T_L05 + 0.6), True)            # animatic: roof hidden (v4: a ring cut)
show([HOSP, LIBR], 0, False); show([HOSP, LIBR], f(T_L06 - 0.3), True)

# ---------- camera ----------
rig = PerspRig()
V = Vector
rig.keys([
    (F(-1), V((-23.0, 5.0, 0.6)), V((-25.2, 6.5, 0.8)), 35, 2.8), (0, V((-23.0, 5.0, 0.6)), V((-25.2, 6.5, 0.8)), 35, 2.8),
    (F(T_DIED), V((-23.8, 5.4, 0.75)), V((-25.3, 6.5, 0.9)), 40, 2.4),                                      # 1 slow push on the janitor
    (F(T_L02 + 0.2), V((-22.0, 3.0, 1.6)), V((-21.5, -6.0, 1.2)), 32, 4.0),                                  # 2 out the street door
    (F(T_PUMPED + 0.4), V((-15.5, -1.0, 1.4)), V((-20.5, -7.0, 1.1)), 35, 4.0),                              #   the gas station
    (F(T_TOYOTA - 0.4), V((-14.5, -1.4, 1.3)), V((-19.0, -6.2, 1.0)), 35, 4.0),
    (F(T_TOYOTA + 0.8), V((HX - 18, 3.5, 2.2)), V((HX - 9, -3.5, 1.0)), 35, 4.0),                              # 3 follow the car (from behind and aside)
    (F(T_PIN - 0.6), V((HX - 1.0, HY + 8.5, 1.6)), V((HX + 0.6, HY + 4.1, 1.4)), 40, 4.0),
    (F(T_PIN + 0.2), V((HX + 0.6, HY + 5.6, 1.45)), V((HX + 0.6, HY + 4.1, 1.4)), 45, 2.0),
    (F(T_PIN + 0.75), V((HX + 0.62, HY + 5.55, 1.46)), V((HX + 0.6, HY + 4.1, 1.4)), 45, 2.0),               #   hold on it (two keys, or the camera sweeps past)                     #   ECU the safety pin
    (F(T_BRANCH), V((HX + 8.5, HY + 6.5, 1.8)), V((HX + 5.2, HY + 0.5, 1.0)), 35, 4.0),                       # 4 branches to the woodpile
    (F(T_L03 + 0.9), V((HX + 10, HY + 22, 14)), V((HX, HY, 0.5)), 40, 8.0),                                  # 5 crane up into the diagram
    (F(T_CASH), V((HX + 8, HY + 30, 22)), V((HX, HY, 0.5)), 45, 11.0),
    (F(T_L04 + 0.6), V((HX + 1.2, HY + 1.8, 2.2)), V((HX, HY, 1.0)), 40, 4.0),                                 # 6 down into the house
    (F(T_KEPT + 0.3), V((HX + 0.55, HY + 0.75, 1.35)), V((HX, HY, 1.02)), 50, 2.0), (F(T_5 + 0.6), V((HX + 0.5, HY + 0.7, 1.4)), V((HX, HY, 1.08)), 52, 2.2),
    (F(T_PIECE + 0.4), V((HX + 30, HY + 60, 55)), V((HX - 10, 0, 0)), 30, 11.0),                               # 7 pull up over the town
    (F(T_BIGGEST), V((8, 70, 48)), V((8, 18, 2)), 30, 11.0),                                        # 8 hospital + library
    (F(T_L07 + 0.6), V((-12.0, 4.0, 2.2)), V((-20.0, -7.5, 1.3)), 35, 4.0), (F(T_QUIETLY + 0.4), V((-13.5, 1.5, 1.6)), V((-20.0, -7.8, 1.2)), 40, 4.0),  # 9 back to the pumps
    (F(T_L08 + 2), V((-13.8, 1.0, 1.55)), V((-20.0, -7.8, 1.2)), 40, 4.0)], drift=0.03)
for fr in range(N): rig.set(fr)

if ANIM and "still" in A:                                               # inspect single animatic frames
    sh.use_dof = True
    for fr in [int(x) for x in A[A.index("still") + 1].split(",")]:
        sc.frame_set(fr); print("CAM", fr, tuple(round(v, 2) for v in rig.cam.location), "JACKET", tuple(round(v, 2) for v in JACKET.location), JACKET.hide_render)
        sc.render.filepath = f"{OUT}/s_{fr:04d}.png"; bpy.ops.render.render(write_still=True)
    raise SystemExit
if ANIM:
    sh.use_dof = True
    render_range(f"{OUT}/a_", 0, N - 1)
    import subprocess
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", str(FPS), "-i", f"{OUT}/a_%04d.png", "-i", EP + "audio/voice.wav",
                    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "24", "-c:a", "aac", "-shortest", EP + "out/animatic.mp4"], check=True)
    print("animatic:", EP + "out/animatic.mp4")

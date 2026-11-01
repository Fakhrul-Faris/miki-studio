# EX14 "The Long Path" — the whole episode as one continuous isometric camera at 60 fps, cut to audio/vo_timeline.json.
#   blender -b --python build/episode.py -- <out_dir> [still f,f,…] [half]
#   blender -b --python build/episode.py -- <out_dir> preview     a cheap look first (quarter size, every 2nd frame, 1 sample,
#                                                                 voice under it) → out/preview.mp4; render only after it's OK
# Builds on build/world.py (the store, the path, arrows, people) and adds: the basket, the x-ray walls and shortcut doors,
# the exit sign and sight cone, the 60 % dot grid, the small city store, a city of stores, the Klang hardware shop.
import sys, os, math, json, bpy
from mathutils import Vector, Euler, Matrix
EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/"
_a = sys.argv[sys.argv.index("--") + 1:]
STILLS = [int(x) for x in _a[_a.index("still") + 1].split(",")] if "still" in _a else None
sys.argv = sys.argv[:sys.argv.index("--") + 1] + [_a[0], "build"] + (["half"] if "half" in _a else [])
exec(open(EP + "build/world.py").read())          # → sc, mat, box, walls, doors, path/cu, arrows, at(), LEN, person(), you, crowd, pivot, cam

VT = json.load(open(EP + "audio/vo_timeline.json")); VW = VT["words"]
def w(L, i): return int(VW[L][i][1] * FPS)
N = int(math.ceil(VT["end"] * FPS)); sc.frame_start, sc.frame_end = 0, N - 1

def pchip(ts, vs):
    """Monotone cubic through (t, v): speed is continuous, no overshoot; flat at both ends."""
    n = len(ts); h = [ts[i + 1] - ts[i] for i in range(n - 1)]; d = [(vs[i + 1] - vs[i]) / h[i] for i in range(n - 1)]
    m = [0.0] + [0 if d[i - 1] * d[i] <= 0 else (3 * (h[i - 1] + h[i])) / ((2 * h[i] + h[i - 1]) / d[i - 1] + (h[i] + 2 * h[i - 1]) / d[i]) for i in range(1, n - 1)] + [0.0]
    def f(t):
        if t <= ts[0]: return vs[0]
        if t >= ts[-1]: return vs[-1]
        i = next(j for j in range(n - 1) if t <= ts[j + 1]); u = (t - ts[i]) / h[i]
        return (2 * u ** 3 - 3 * u ** 2 + 1) * vs[i] + (u ** 3 - 2 * u ** 2 + u) * h[i] * m[i] + (-2 * u ** 3 + 3 * u ** 2) * vs[i + 1] + (u ** 3 - u ** 2) * h[i] * m[i + 1]
    return f
def vcurve(keys):
    fs = [k[0] for k in keys]; ch = [pchip(fs, [Vector(k[1])[j] for k in keys]) for j in range(3)]
    return lambda t: Vector([c(t) for c in ch])
def back_out(u, s=1.6): u = max(0.0, min(1.0, u)) - 1; return 1 + u * u * ((s + 1) * u + s)     # a small overshoot on arrivals
def lerp(a_, b_, t): return a_ + (b_ - a_) * t
def mix_col(c0, c1, k): return tuple(c0[i] + (c1[i] - c0[i]) * k for i in range(3)) + (1,)
def key_vis(o, f_on, f_off=None):                   # hidden outside [f_on, f_off)
    for prop in ("hide_render", "hide_viewport"):
        setattr(o, prop, f_on > 0); o.keyframe_insert(prop, frame=0)
        setattr(o, prop, False); o.keyframe_insert(prop, frame=max(0, f_on))
        if f_off is not None: setattr(o, prop, True); o.keyframe_insert(prop, frame=f_off)

def colmat(name, emit=0.4, alpha=None):              # colour from the object (keyable), like the arrows
    m = bpy.data.materials.new(name); m.use_nodes = True; n_ = m.node_tree; b = n_.nodes["Principled BSDF"]
    oi_ = n_.nodes.new("ShaderNodeObjectInfo"); n_.links.new(oi_.outputs["Color"], b.inputs["Base Color"]); n_.links.new(oi_.outputs["Color"], b.inputs["Emission Color"])
    b.inputs["Emission Strength"].default_value = emit; b.inputs["Roughness"].default_value = 1.0; b.inputs["Specular IOR Level"].default_value = 0.0
    if alpha is not None:
        b.inputs["Alpha"].default_value = alpha; m.surface_render_method = "BLENDED"
    return m

# ---------- word frames (the story beats) ----------
L01_MAZE, L01_BUS = w("L01", 1), w("L01", 8)
L02, L02_FLOOR, L02_LEAVE, L02_CANDLES, L02_BULBS = w("L02", 0), w("L02", 5), w("L02", 12), w("L02", 15), w("L02", 17)
L03, L03_PENN, L03_ONE, L03_HIDDEN, L03_ROOMS, L03_GONE, L03_AS, L03_ALWAYS, L03_BEHIND, L03_GRAB = (w("L03", i) for i in (0, 3, 8, 10, 12, 19, 20, 28, 29, 33))
L04, L04_60, L04_NEVER, L04_LIST, L04_AND, L04_SMALL, L04_WITHOUT, L04_SHOP_, L04_NO1, L04_NO2, L04_NO3, L04_SHOP = (w("L04", i) for i in (0, 2, 9, 12, 13, 17, 20, 24, 27, 28, 29, 34))
L05, L05_729, L05_MILLION, L05_NOW, L05_60 = w("L05", 0), w("L05", 4), w("L05", 5), w("L05", 11), w("L05", 16)
L06, L06_KLANG, L06_PAINT, L06_BACK, L06_LET, L06_PASS, L06_TORCH = (w("L06", i) for i in (0, 6, 9, 15, 16, 19, 24))
L07, L08 = w("L07", 0), w("L08", 0)

# ---------- the static store goes in a collection, so the city can instance it ----------
store = bpy.data.collections.new("store"); sc.collection.children.link(store)
STATIC = [o for o in sc.objects if o.type == "MESH" and o.name.split(".")[0] in
          ("floor", "wall", "shortcut door", "sofa", "sofa back", "shelf", "Cylinder", "bed", "pillow", "bin", "item")]
for o in STATIC:
    for c_ in list(o.users_collection): c_.objects.unlink(o)
    store.objects.link(o)
# the city tile = the store (instanced as is) + a finished path (its own collection, only ever instanced)
tile = bpy.data.collections.new("city path")
cityp = bpy.data.objects.new("city path", path.data.copy()); cityp.data.bevel_factor_end = 1.0; cityp.scale = (1, 1, 0.25); tile.objects.link(cityp)
bpy.context.scene.collection.children.link(tile); bpy.context.view_layer.layer_collection.children["city path"].exclude = True

CELL = (18.0, 22.0)
SMALL_C, KLANG_C = Vector((6 + CELL[0], 8, 0)), Vector((6 - CELL[0], 8 + CELL[1], 0))
for i in range(-3, 4):
    for j in range(-3, 4):
        if (i, j) in ((0, 0), (1, 0), (-1, 1)): continue
        for col in (store, tile):
            e = bpy.data.objects.new("tile %d %d %s" % (i, j, col.name), None); e.instance_type = "COLLECTION"; e.instance_collection = col
            e.location = (i * CELL[0], j * CELL[1], 0); sc.collection.objects.link(e)

# ---------- x-ray: walls lower to lines, the hidden doors light up ----------
dm = colmat("door col", emit=0.6)
for d in doors: d.data.materials[0] = dm; d.color = WALL
def xray(f):
    k = 1.0 - 0.88 * (span(f, L03_HIDDEN - 20, L03_HIDDEN + 10) - span(f, L03_ROOMS + 10, L03_GONE - 10))
    return k, span(f, L03_HIDDEN, L03_HIDDEN + 18) - span(f, L03_GONE, L03_GONE + 30)

# ---------- you: walk, basket, items ----------
S_YOU = pchip([40, L02, L02_LEAVE, L03_PENN, L03_AS, L03_GRAB + 40, L04 + 20], [-1.6, 2.6, 13.5, 16.0, 23.5, 30.0, 30.6])
basket = box("basket", -0.17, -0.12, 0.17, 0.12, 0.16, mat("basket", OCHRE), bevel=0.02)
basket.parent = you; basket.location = (0.3, 0.05, 0.42)
ITEMS = []                                         # (frame it drops, mesh, slot offset in the basket)
def candle():
    bpy.ops.mesh.primitive_cylinder_add(radius=0.04, depth=0.22, vertices=24); o = bpy.context.object; o.data.materials.append(mat("candle", CREAM, emit=0.2)); return o
def bulb():
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.065, segments=24, ring_count=12); o = bpy.context.object; o.data.materials.append(mat("bulb", CREAM, emit=0.5)); return o
for f0, mk, slot in ((L02_CANDLES, candle, (-0.08, -0.03, 0.2)), (L02_CANDLES + 7, candle, (-0.02, 0.04, 0.2)),
                     (L02_BULBS, bulb, (0.07, -0.03, 0.2)), (L02_BULBS + 8, bulb, (0.08, 0.05, 0.22)), (L03_GRAB + 8, bulb, (0.0, 0.0, 0.27))):
    o = mk(); o.parent = basket; ITEMS.append((f0, o, Vector(slot)))

# the exit sign (at the entrance; later it follows you, always behind) and the sight cone
exit_s = box("exit sign", -0.32, -0.04, 0.32, 0.04, 0.34, mat("exit", CREAM, emit=0.5), z0=0.55)
bar = box("exit arrow", -0.18, -0.05, 0.18, 0.05, 0.07, mat("exit bar", OCHRE, emit=0.4), z0=0.68); bar.parent = exit_s; bar.location = (0, -0.01, 0)
post = box("exit post", -0.03, -0.03, 0.03, 0.03, 0.55, mat("wall", WALL)); post.parent = exit_s; post.location = (0, 0, -0.55 + 0.275)
fan = bpy.data.meshes.new("cone"); vs_ = [(0, 0, 0)] + [(3.2 * math.sin(math.radians(a_)), 3.2 * math.cos(math.radians(a_)), 0) for a_ in range(-32, 33, 4)]
fan.from_pydata(vs_, [], [(0, i, i + 1) for i in range(1, len(vs_) - 1)]); cone = bpy.data.objects.new("sight cone", fan); sc.collection.objects.link(cone)
cone.data.materials.append(colmat("cone", emit=0.8, alpha=0.22)); cone.color = OCHRE

# ---------- the 60 % grid: 100 dots that fly out of the basket ----------
G_ROT = Euler((ISO, 0, math.radians(45))).to_matrix()
dmat = colmat("dot", emit=0.5); DOTS = []
for i in range(100):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.16, segments=24, ring_count=12); o = bpy.context.object; o.data.materials.append(dmat)
    r_, c_ = divmod(i, 10); DOTS.append((o, Vector(((c_ - 4.5) * 0.46, (4.5 - r_) * 0.46, 0))))

# ---------- the small city store: no path, people wander ----------
def ring_walls(x0, y0, x1, y1, door_x=None, front=True):
    m = mat("wall", WALL); out = [box("small floor", x0 - 0.4, y0 - 0.4, x1 + 0.4, y1 + 0.4, 0.12, mat("floor", FLOOR), z0=-0.12, bevel=0.05)]
    if door_x is None: out.append(box("w", x0, y0 - WT / 2, x1, y0 + WT / 2, WH, m))
    else:
        out.append(box("w", x0, y0 - WT / 2, door_x - 0.7, y0 + WT / 2, WH, m)); out.append(box("w", door_x + 0.7, y0 - WT / 2, x1, y0 + WT / 2, WH, m))
    out += [box("w", x0, y1 - WT / 2, x1, y1 + WT / 2, WH, m), box("w", x0 - WT / 2, y0, x0 + WT / 2, y1, WH, m), box("w", x1 - WT / 2, y0, x1 + WT / 2, y1, WH, m)]
    return out
SX0, SY0, SX1, SY1 = SMALL_C.x - 3.5, SMALL_C.y - 3.5, SMALL_C.x + 3.5, SMALL_C.y + 3.5
ring_walls(SX0, SY0, SX1, SY1, door_x=SMALL_C.x)
for dx, dy in ((-2.0, 1.6), (1.8, 1.8), (-1.6, -1.8), (2.1, -1.4)):
    o = box("small shelf", -0.55, -0.18, 0.55, 0.18, 0.9, mat("furniture", FURN)); o.location = (SMALL_C.x + dx, SMALL_C.y + dy, o.location.z)
WANDER = [person("wanderer %d" % i, PEOPLE, 0.95) for i in range(7)] + [person("you small", OCHRE)]
def wander_xy(i, f):
    t = f / FPS; a1, a2, p1, p2 = 0.31 + 0.07 * i, 0.23 + 0.05 * ((i * 3) % 7), i * 1.7, i * 2.9
    return Vector((SMALL_C.x + 2.6 * math.sin(a1 * t * 2.2 + p1), SMALL_C.y + 2.6 * math.sin(a2 * t * 2.2 + p2), 0))
SPTS = [(SMALL_C.x, SY0 - 1.0), (SMALL_C.x, SY0 + 1.0), (SX0 + 1.0, SY0 + 1.0), (SX0 + 1.0, SY1 - 1.0), (SX1 - 1.0, SY1 - 1.0), (SX1 - 1.0, SY0 + 2.2), (SMALL_C.x + 0.6, SY0 + 2.2)]
scu = bpy.data.curves.new("small path", "CURVE"); scu.dimensions = "3D"; ssp = scu.splines.new("POLY"); sP = fillet(SPTS, 0.6); ssp.points.add(len(sP) - 1)
for p_, q_ in zip(ssp.points, sP): p_.co = (q_.x, q_.y, 0.03, 1)
scu.bevel_depth = 0.11; scu.bevel_resolution = 4; scu.bevel_factor_mapping_end = "SPLINE"; scu.bevel_factor_end = 0.0
spath = bpy.data.objects.new("small path", scu); sc.collection.objects.link(spath); spath.scale = (1, 1, 0.25); spath.data.materials.append(mat("path", OCHRE))

# ---------- the Klang hardware shop ----------
KX0, KY0, KX1, KY1 = KLANG_C.x - 3.0, KLANG_C.y - 4.0, KLANG_C.x + 3.0, KLANG_C.y + 4.0
ring_walls(KX0, KY0, KX1, KY1, door_x=KLANG_C.x)
fmK = mat("furniture", FURN)
for side, xs in (("tape", KX0 + 0.45), ("torch", KX1 - 0.45)):
    for j in range(3):
        y = KY0 + 1.6 + j * 1.9; s_ = box("k shelf", xs - 0.3, y - 0.7, xs + 0.3, y + 0.7, 0.85, fmK)
        for k in range(4):
            if side == "tape":
                bpy.ops.mesh.primitive_torus_add(major_radius=0.11, minor_radius=0.045, location=(xs, y - 0.5 + k * 0.33, 0.93)); o = bpy.context.object
                o.rotation_euler = (math.radians(90), 0, 0); o.data.materials.append(mat("tape", PEOPLE))
            else:
                bpy.ops.mesh.primitive_cylinder_add(radius=0.05, depth=0.3, location=(xs, y - 0.5 + k * 0.33, 0.9), vertices=20); o = bpy.context.object
                o.rotation_euler = (0, math.radians(90), 0); o.data.materials.append(mat("torch", PEOPLE))
box("k back shelf", KX0 + 1.2, KY1 - 0.75, KX1 - 1.2, KY1 - 0.25, 0.7, fmK)
box("k table", KLANG_C.x - 0.8, KY0 + 1.0, KLANG_C.x + 0.8, KY0 + 1.8, 0.45, fmK)
CANS = []
for k in range(8):
    bpy.ops.mesh.primitive_cylinder_add(radius=0.13, depth=0.26, vertices=32); o = bpy.context.object; o.data.materials.append(mat("can", CREAM, emit=0.15))
    lid = box("lid", -0.13, -0.13, 0.13, 0.13, 0.04, mat("lid", OCHRE), z0=0.13, bevel=0.0); lid.parent = o; lid.location = (0, 0, 0.13)
    a_ = Vector((KLANG_C.x - 0.55 + (k % 4) * 0.37, KY0 + 1.2 + (k // 4) * 0.38, 0.45 + 0.13))
    b_ = Vector((KLANG_C.x - 0.55 + (k % 4) * 0.37, KY1 - 0.62 + (k // 4) * 0.2, 0.7 + 0.13 + (k // 4) * 0.27))
    CANS.append((o, a_, b_))
KPTS = [(KLANG_C.x, KY0 - 1.0), (KLANG_C.x, KY0 + 0.4), (KX0 + 1.25, KY0 + 2.2), (KX0 + 1.25, KY0 + 4.2), (KX1 - 1.25, KY0 + 5.0), (KX1 - 1.25, KY1 - 1.9), (KLANG_C.x, KY1 - 1.15)]
kcu = bpy.data.curves.new("klang path", "CURVE"); kcu.dimensions = "3D"; ksp = kcu.splines.new("POLY"); kP = fillet(KPTS, 0.7); ksp.points.add(len(kP) - 1)
for p_, q_ in zip(ksp.points, kP): p_.co = (q_.x, q_.y, 0.03, 1)
kcu.bevel_depth = 0.1; kcu.bevel_resolution = 4; kcu.bevel_factor_mapping_end = "SPLINE"; kcu.bevel_factor_end = 0.0
kpath = bpy.data.objects.new("klang path", kcu); sc.collection.objects.link(kpath); kpath.scale = (1, 1, 0.25); kpath.data.materials.append(mat("path", OCHRE))
KCUM = [0.0]
for i in range(1, len(kP)): KCUM.append(KCUM[-1] + (kP[i] - kP[i - 1]).length)
def kat(s):
    s = max(0.0, min(KCUM[-1], s)); i = next((j for j in range(1, len(KCUM)) if KCUM[j] >= s), len(KCUM) - 1)
    t = (s - KCUM[i - 1]) / max(1e-6, KCUM[i] - KCUM[i - 1]); return kP[i - 1].lerp(kP[i], t), (kP[i] - kP[i - 1]).normalized()
shopper = person("you klang", OCHRE)

# ---------- the camera: one pchip path through the beats; follow-you blended in where you walk ----------
def yaw_of(d): return math.atan2(d.y, d.x) - math.pi / 2
def you_at(f):
    s = S_YOU(f); p, d = at(s); return p + Vector((d.y * -0.15, -d.x * -0.15, 0)), d, s
G_C = at(30.4)[0] + Vector((0, 0, 3.2))                       # the grid floats over you
G_LOOK = G_C - G_ROT @ Vector((0, 2.6, 0))                    # aim below it: the grid sits in the upper half, clear of the words
CITY_C = Vector((6, 8 + CELL[1] * 0.35, 0))
D = math.degrees
CK = [  # (frame, pivot, tilt°, spin°, ortho scale)
    (-60, CENTER, 0, 0, 22.5), (0, CENTER, 2, 2, 22.2), (110, CENTER, 54.7, 45, 15),
    (L02, you_at(L02)[0], 54.7, 45, 9.0), (L02_LEAVE, you_at(L02_LEAVE)[0], 54.7, 45, 7.6),
    (L03_PENN, CENTER + Vector((0, 0.6, 0)), 38, 45, 21.5), (L03_GONE, CENTER + Vector((0, 0.2, 0)), 40, 42, 20.5),
    (L03_ALWAYS, you_at(L03_ALWAYS)[0], 54.7, 45, 9.0), (L03_GRAB + 20, you_at(L03_GRAB + 20)[0], 54.7, 45, 8.4),
    (L04_60, G_LOOK, 54.7, 45, 10.0), (L04_LIST, G_LOOK, 54.7, 47, 10.4),
    (L04_SMALL, SMALL_C, 50, 45, 11.5), (L04_SHOP + 30, SMALL_C + Vector((0.3, 0.3, 0)), 52, 40, 10.5),
    (L05_729, CITY_C, 47, 45, 70), (L05_NOW, CITY_C, 45, 45, 96), (L06 - 10, CITY_C, 45, 45, 100),
    (L06_KLANG + 20, KLANG_C, 54.7, 45, 12.0), (L06_TORCH + 40, KLANG_C + Vector((0, 0.5, 0)), 54.7, 50, 10.5),
    (L07 + 10, (KLANG_C + CENTER) * 0.5, 30, 22, 40), (L08, CENTER, 0, 0, 22.5), (N + 60, CENTER, 0, 0, 22.5)]
CAM_LOC = vcurve([(k[0], k[1]) for k in CK]); fs_ = [k[0] for k in CK]
CAM_TILT, CAM_SPIN, CAM_SCALE = (pchip(fs_, [k[i] for k in CK]) for i in (2, 3, 4))
def follow_w(f): return span(f, 150, 215) * (1 - span(f, L02_LEAVE + 70, L03_PENN)) + span(f, L03_AS - 40, L03_AS + 20) * (1 - span(f, L03_GRAB + 30, L04 + 30))

# ---------- bake every frame ----------
for f in range(N):
    # camera
    tilt, spin, scale = math.radians(CAM_TILT(f)), math.radians(CAM_SPIN(f)), CAM_SCALE(f)
    yp, yd, s_you = you_at(f); up = Vector((-math.sin(spin), math.cos(spin), 0))
    loc = CAM_LOC(f).lerp(yp + up * 2.0, follow_w(f))
    set_cam(f, loc, tilt, spin, scale)
    # the main path draws in (L01), pulses on "One path", erases from its start over the follow card (loops to frame 0)
    cu.bevel_factor_end = 0.02 + 0.98 * span(f, -10, 120); cu.bevel_factor_start = 0.98 * span(f, L08, N - 4)
    cu.keyframe_insert("bevel_factor_end", frame=f); cu.keyframe_insert("bevel_factor_start", frame=f)
    pe = 0.15 + 1.2 * (span(f, L03_ONE, L03_ONE + 10) - span(f, L03_ONE + 25, L03_ONE + 60))
    MATS["path"].node_tree.nodes["Principled BSDF"].inputs["Emission Strength"].default_value = pe
    MATS["path"].node_tree.nodes["Principled BSDF"].inputs["Emission Strength"].keyframe_insert("default_value", frame=f)
    # you
    moving = abs(S_YOU(f + 1) - S_YOU(f)) > 0.004
    you.location = (yp.x, yp.y, 0.035 * abs(math.sin(s_you * math.pi / 0.55)) if moving else 0); you.rotation_euler[2] = yaw_of(yd)
    gone = span(f, L04_LIST + 30, L04_LIST + 50); you.scale = (1 - gone,) * 3
    for p_ in ("location", "rotation_euler", "scale"): you.keyframe_insert(p_, frame=f)
    light_arrows(f, s_you)
    # basket items: drop in with a small overshoot, then leave for the grid when the dots fly out
    for f0, o, slot in ITEMS:
        u = (f - f0) / 14; z = 1.4 * (1 - back_out(u)) if u < 1 else 0
        o.location = slot + Vector((0, 0, max(-0.02, z))); k = (1.0 if f >= f0 else 0.0) * (1 - span(f, L04 - 4, L04 + 6))
        o.scale = (k,) * 3; o.keyframe_insert("location", frame=f); o.keyframe_insert("scale", frame=f)
    bk = span(f, L02_LEAVE - 20, L02_LEAVE) * (1 - span(f, L04 - 4, L04 + 10)); basket.scale = (bk,) * 3; basket.keyframe_insert("scale", frame=f)
    # x-ray
    kz, glow = xray(f)
    for o in (walls if (f in (0, N - 1) or L03_HIDDEN - 25 <= f <= L03_GONE + 45) else []): o.scale.z = kz; o.location.z = WH / 2 * kz; o.keyframe_insert("scale", index=2, frame=f); o.keyframe_insert("location", index=2, frame=f)
    for d in (doors if (f in (0, N - 1) or L03_HIDDEN - 5 <= f <= L03_GONE + 35) else []): d.color = mix_col(WALL, OCHRE, glow); d.keyframe_insert("color", frame=f)
    # exit sign: at the entrance until "gone" (sinks), then always behind you (and behind on every turn)
    if f < L03_AS:
        exit_s.location = (1.0, -0.9, -1.2 * span(f, L03_GONE - 8, L03_GONE + 14)); exit_s.rotation_euler[2] = 0
        ev = 1.0 - span(f, L03_GONE + 10, L03_GONE + 16)
    else:
        bp, bd = at(max(0.0, s_you - 2.6)); exit_s.location = (bp.x, bp.y, -1.2 * (1 - span(f, L03_AS + 10, L03_AS + 40)))
        exit_s.rotation_euler[2] = yaw_of(bd) + math.pi; ev = 1.0 - span(f, L04 + 10, L04 + 30)
    exit_s.scale = (ev,) * 3
    for p_ in ("location", "rotation_euler", "scale"): exit_s.keyframe_insert(p_, frame=f)
    cone.location = (yp.x, yp.y, 0.025); cone.rotation_euler[2] = yaw_of(yd) + math.pi
    ck = span(f, L03_AS, L03_AS + 25) * (1 - span(f, L03_GRAB, L03_GRAB + 30)); cone.scale = (ck, ck, 1)
    cone.keyframe_insert("location", frame=f); cone.keyframe_insert("rotation_euler", frame=f); cone.keyframe_insert("scale", frame=f)
    # the dots: out of the basket into a grid facing the camera; 60 turn ochre; they drain away as we leave
    bpos = basket.parent.location + Vector((0, 0, 0.6))
    for i, (o, gp) in (enumerate(DOTS) if (f in (0, N - 1) or L04 - 5 <= f <= L04_LIST + 100) else []):
        f0 = L04 + 2 + i * 0.28; u = span(f, f0, f0 + 36)
        tgt = G_C + G_ROT @ gp; mid = bpos.lerp(tgt, 0.5) + Vector((0, 0, 1.2))
        o.location = bpos.lerp(mid, u).lerp(mid.lerp(tgt, u), u)
        f1 = L04_LIST + 30 + i * 0.35; sz = (1.0 if f >= f0 else 0.0) * back_out((f - f0) / 20) * (1 - span(f, f1, f1 + 22))
        o.scale = (max(0.0, sz),) * 3
        oc = span(f, L04_60 + i * 0.5, L04_60 + i * 0.5 + 10) if i < 60 else 0.0
        o.color = mix_col(PEOPLE, OCHRE, oc)
        for p_ in ("location", "scale", "color"): o.keyframe_insert(p_, frame=f)
    # the small store: people wander; three head-shakes on "no, no, no"; then the path draws back in
    for i, o in (enumerate(WANDER) if (f in (0, N - 1) or L04_LIST <= f <= L05_NOW) else []):
        p0, p1 = wander_xy(i, f), wander_xy(i, f + 1); d_ = (p1 - p0)
        shake = sum(math.sin((f - nf) / 3.0 * math.pi) * (1 - span(f, nf, nf + 12)) * (1 if f >= nf else 0) for nf in (L04_NO1, L04_NO2, L04_NO3))
        o.location = (p0.x, p0.y, 0.03 * abs(math.sin(f * 0.35 + i))); o.rotation_euler[2] = yaw_of(d_) + math.radians(18) * shake
        o.keyframe_insert("location", frame=f); o.keyframe_insert("rotation_euler", frame=f)
    scu.bevel_factor_end = span(f, L04_SHOP, L04_SHOP + 45); scu.keyframe_insert("bevel_factor_end", frame=f)
    # Klang: the paint walks to the back wall; the path draws past the tape and the torchlights; a shopper follows it
    for k, (o, a_, b_) in (enumerate(CANS) if (f in (0, N - 1) or L06_PAINT <= f <= L06_BACK + 40) else []):
        u = span(f, L06_PAINT + 10 + k * 3, L06_BACK + 10 + k * 3); o.location = a_.lerp(b_, u) + Vector((0, 0, 0.9 * math.sin(math.pi * u)))
        o.keyframe_insert("location", frame=f)
    kcu.bevel_factor_end = span(f, L06_LET, L06_TORCH + 20); kcu.keyframe_insert("bevel_factor_end", frame=f)
    ks = KCUM[-1] * span(f, L06_PASS - 10, L07 + 30) - 0.6; kp_, kd_ = kat(ks)
    shopper.location = (kp_.x, kp_.y, 0.035 * abs(math.sin(ks * math.pi / 0.55))); shopper.rotation_euler[2] = yaw_of(kd_)
    shopper.keyframe_insert("location", frame=f); shopper.keyframe_insert("rotation_euler", frame=f)

for o in [pivot, cam.data, you, path.data, spath.data, kpath.data, exit_s, cone, basket, shopper] + walls + doors + [x for _, x in arrows] + \
         [x for _, x, _ in ITEMS] + [x for x, _ in DOTS] + WANDER + [x for x, _, _ in CANS] + [MATS["path"].node_tree]:
    ad = getattr(o, "animation_data", None)
    if ad and ad.action and hasattr(ad.action, "fcurves"):
        for fc in ad.action.fcurves:
            if not fc.data_path.startswith("hide"):
                for kp in fc.keyframe_points: kp.interpolation = "LINEAR"
if "preview" in _a:
    sys.path.insert(0, os.path.dirname(os.path.abspath(EP + "../../tools/blender/preview.py")))
    from preview import preview
    preview(EP + "out/preview.mp4", range(N), audio=EP + "audio/voice.wav")
else:
    for f in (STILLS or range(N)):
        sc.frame_set(f); sc.render.filepath = f"{OUT}/f_{f:04d}.png"; bpy.ops.render.render(write_still=True)

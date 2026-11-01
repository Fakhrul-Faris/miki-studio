# EX14 "The Long Path" — the isometric store (V3 smooth isometric: dark, flat, ochre accent, 60 fps).
#   blender -b --python build/world.py -- <out_dir> test            the 3 s motion test (frames 0–179)
#   blender -b --python build/world.py -- <out_dir> frames sf1,sf2   style frames (stills)
#   add "half" for 540×960
#   build/episode.py execs this file with MODE "build" (the store only) and animates the whole episode
# One store plan (12 × 16 units, four lanes), the ochre path that snakes through every room, floor arrows, Isotype people,
# hidden shortcut doors in the lane walls. The camera is an orthographic rig: a pivot (location, tilt, spin) and a scale.
import sys, math, bpy
from mathutils import Vector

a = sys.argv[sys.argv.index("--") + 1:]; OUT = a[0]; MODE = a[1] if len(a) > 1 else "test"
HALF = "half" in a; FPS = 60

# ---------- scene ----------
sc = bpy.context.scene
for o in list(bpy.data.objects): bpy.data.objects.remove(o)
sc.render.engine = "BLENDER_EEVEE"; sc.render.fps = FPS
sc.render.resolution_x, sc.render.resolution_y = (540, 960) if HALF else (1080, 1920)
sc.render.image_settings.file_format = "PNG"; sc.render.film_transparent = False
sc.view_settings.view_transform = "Standard"; sc.view_settings.look = "None"
sc.eevee.taa_render_samples = 32
sc.render.use_motion_blur = True; sc.render.motion_blur_shutter = 0.5

def hexc(h, a_=1.0):
    v = [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    return tuple((c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4) for c in v) + (a_,)
BG, FLOOR, WALL, FURN, PEOPLE, OCHRE, CREAM, ARROW = (hexc(x) for x in
    ("#0E0E10", "#1B1B1F", "#3A3A42", "#4C4C55", "#8C8C96", "#C98A2B", "#EDE7DC", "#2C2C33"))

# world: the camera sees the near-black ground colour, the lighting sees a soft grey ambient
w = bpy.data.worlds.new("w"); sc.world = w; w.use_nodes = True; nt = w.node_tree; nt.nodes.clear()
outn = nt.nodes.new("ShaderNodeOutputWorld"); mix = nt.nodes.new("ShaderNodeMixShader"); lp = nt.nodes.new("ShaderNodeLightPath")
b1 = nt.nodes.new("ShaderNodeBackground"); b1.inputs[0].default_value = (0.32, 0.32, 0.36, 1); b1.inputs[1].default_value = 1.0
b2 = nt.nodes.new("ShaderNodeBackground"); b2.inputs[0].default_value = BG; b2.inputs[1].default_value = 1.0
nt.links.new(lp.outputs["Is Camera Ray"], mix.inputs[0]); nt.links.new(b1.outputs[0], mix.inputs[1]); nt.links.new(b2.outputs[0], mix.inputs[2])
nt.links.new(mix.outputs[0], outn.inputs[0])

bpy.ops.object.light_add(type="SUN", rotation=(math.radians(38), math.radians(-18), math.radians(-30)))
sun = bpy.context.object; sun.data.energy = 3.2; sun.data.angle = math.radians(14)

MATS = {}
def mat(name, col, emit=0.0):
    if name in MATS: return MATS[name]
    m = bpy.data.materials.new(name); m.use_nodes = True; b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = col; b.inputs["Roughness"].default_value = 1.0
    b.inputs["Specular IOR Level"].default_value = 0.0
    if emit: b.inputs["Emission Color"].default_value = col; b.inputs["Emission Strength"].default_value = emit
    MATS[name] = m; return m

def box(name, x0, y0, x1, y1, h, m, z0=0.0, bevel=0.03):
    bpy.ops.mesh.primitive_cube_add(size=1, location=((x0 + x1) / 2, (y0 + y1) / 2, z0 + h / 2))
    o = bpy.context.object; o.name = name; o.scale = (abs(x1 - x0), abs(y1 - y0), h); bpy.ops.object.transform_apply(scale=True)
    if bevel:
        bv = o.modifiers.new("b", "BEVEL"); bv.width = bevel; bv.segments = 3; bv.limit_method = "ANGLE"
    o.data.materials.append(m); return o

# ---------- the store ----------
W_, D_, WH, WT = 12.0, 16.0, 0.75, 0.16          # plan width, depth, wall height, wall thickness
LANES = [2.0, 6.0, 10.0, 14.0]
box("floor", -0.6, -0.6, W_ + 0.6, D_ + 0.6, 0.12, mat("floor", FLOOR), z0=-0.12, bevel=0.05)
walls = []
def wall_x(y, x0, x1, gaps):                     # a wall along x at depth y, with door gaps [(cx, half width)]
    cuts = sorted(gaps); xs = x0
    for cx, hw in cuts:
        if cx - hw > xs: walls.append(box("wall", xs, y - WT / 2, cx - hw, y + WT / 2, WH, mat("wall", WALL)))
        xs = cx + hw
    if x1 > xs: walls.append(box("wall", xs, y - WT / 2, x1, y + WT / 2, WH, mat("wall", WALL)))
def wall_y(x, y0, y1, gaps):
    ys = y0
    for cy, hw in sorted(gaps):
        if cy - hw > ys: walls.append(box("wall", x - WT / 2, ys, x + WT / 2, cy - hw, WH, mat("wall", WALL)))
        ys = cy + hw
    if y1 > ys: walls.append(box("wall", x - WT / 2, ys, x + WT / 2, y1, WH, mat("wall", WALL)))
wall_x(0.0, 0, W_, [(1.0, 0.75)])                # entrance bottom-left
wall_x(D_, 0, W_, [(6.0, 0.75)])                 # checkout top-middle
wall_y(0.0, 0, D_, []); wall_y(W_, 0, D_, [])
SHORTCUTS = [(6.0, 4.0), (6.0, 8.0), (3.0, 12.0)]      # hidden doors in the lane walls (x, y)
wall_x(4.0, 0, W_, [(11.0, 0.75), (6.0, 0.45)]); wall_x(8.0, 0, W_, [(1.0, 0.75), (6.0, 0.45)]); wall_x(12.0, 0, W_, [(11.0, 0.75), (3.0, 0.45)])
doors = [box("shortcut door", x - 0.45, y - WT / 2 + 0.01, x + 0.45, y + WT / 2 - 0.01, WH - 0.02, mat("door", WALL), bevel=0.01) for x, y in SHORTCUTS]
for ly in LANES:                                 # room dividers across each lane, open where the path runs
    for x in (4.0, 8.0): wall_y(x, ly - 2, ly + 2, [(ly, 0.85)])

# furniture: a few clean pieces per room, kept off the path line
import random
rnd = random.Random(14); fm = mat("furniture", FURN)
def sofa(cx, cy, rot):
    o = box("sofa", -0.8, -0.35, 0.8, 0.35, 0.32, fm); b = box("sofa back", -0.8, 0.2, 0.8, 0.35, 0.62, fm)
    for p in (o, b): p.location = (p.location.x + cx, p.location.y + cy, p.location.z); p.rotation_euler[2] = rot
def shelf(cx, cy, rot):
    o = box("shelf", -0.6, -0.18, 0.6, 0.18, 1.1, fm); o.location = (cx, cy, o.location.z); o.rotation_euler[2] = rot
def table(cx, cy, rot):
    bpy.ops.mesh.primitive_cylinder_add(radius=0.45, depth=0.42, location=(cx, cy, 0.21), vertices=48); o = bpy.context.object
    bv = o.modifiers.new("b", "BEVEL"); bv.width = 0.03; bv.segments = 3; o.data.materials.append(fm)
def bed(cx, cy, rot):
    o = box("bed", -0.75, -0.55, 0.75, 0.85, 0.3, fm); p = box("pillow", -0.6, 0.5, 0.6, 0.78, 0.42, mat("pillow", PEOPLE))
    for q in (o, p): q.location = (q.location.x + cx, q.location.y + cy, q.location.z); q.rotation_euler[2] = rot
KIT = [sofa, shelf, table, bed]
for li, ly in enumerate(LANES[:3]):
    for xi, (x0, x1) in enumerate(((0, 4), (4, 8), (8, 12))):
        cx = (x0 + x1) / 2
        KIT[(li * 3 + xi) % 4](cx + rnd.uniform(-0.4, 0.4), ly + 1.25, 0)
        if (li + xi) % 2: shelf(cx + rnd.uniform(-0.6, 0.6), ly - 1.55, 0)
# the marketplace lane: bins of small things (where the impulse buys live)
for i in range(9):
    x = 1.0 + i * 1.25
    if abs(x - 6.0) < 0.9: continue
    box("bin", x - 0.4, 15.0, x + 0.4, 15.6, 0.45, fm)
    for k in range(3): box("item", x - 0.3 + k * 0.22, 15.15, x - 0.14 + k * 0.22, 15.3, 0.62, mat("item", PEOPLE), bevel=0.02)

# ---------- the path: polyline with rounded corners, sampled by arc length ----------
PTS = [(1, -1.6), (1, 2), (11, 2), (11, 6), (1, 6), (1, 10), (11, 10), (11, 14), (6, 14), (6, 17.6)]
def fillet(pts, r=0.9, n=10):
    P = [Vector((x, y, 0)) for x, y in pts]; out = [P[0]]
    for i in range(1, len(P) - 1):
        a_, b_, c_ = P[i - 1], P[i], P[i + 1]; d1 = (b_ - a_).normalized(); d2 = (c_ - b_).normalized()
        p0, p1 = b_ - d1 * r, b_ + d2 * r
        for k in range(n + 1):                   # quadratic Bézier corner (smooth, tangent-continuous)
            t = k / n; out.append(p0 * (1 - t) ** 2 + b_ * 2 * t * (1 - t) + p1 * t * t)
    out.append(P[-1]); return out
PATH = fillet(PTS)
CUM = [0.0]
for i in range(1, len(PATH)): CUM.append(CUM[-1] + (PATH[i] - PATH[i - 1]).length)
LEN = CUM[-1]
def at(s):
    s = max(0.0, min(LEN, s)); i = next((j for j in range(1, len(CUM)) if CUM[j] >= s), len(CUM) - 1)
    t = (s - CUM[i - 1]) / max(1e-6, CUM[i] - CUM[i - 1]); return PATH[i - 1].lerp(PATH[i], t), (PATH[i] - PATH[i - 1]).normalized()

cu = bpy.data.curves.new("path", "CURVE"); cu.dimensions = "3D"; sp = cu.splines.new("POLY"); sp.points.add(len(PATH) - 1)
for p, q in zip(sp.points, PATH): p.co = (q.x, q.y, 0.03, 1)
cu.bevel_depth = 0.11; cu.bevel_resolution = 4; cu.use_fill_caps = True
cu.bevel_factor_mapping_end = "SPLINE"; cu.bevel_factor_end = 1.0
path = bpy.data.objects.new("path", cu); sc.collection.objects.link(path); path.scale = (1, 1, 0.25)
path.data.materials.append(mat("path", OCHRE, emit=0.15))

# floor arrows: chevrons every 1.1 units; colour driven per arrow (object colour → material)
am = bpy.data.materials.new("arrow"); am.use_nodes = True; an = am.node_tree; ab = an.nodes["Principled BSDF"]
oi = an.nodes.new("ShaderNodeObjectInfo"); an.links.new(oi.outputs["Color"], ab.inputs["Base Color"]); an.links.new(oi.outputs["Color"], ab.inputs["Emission Color"])
ab.inputs["Emission Strength"].default_value = 0.5; ab.inputs["Roughness"].default_value = 1.0
arrows = []
for k in range(int(LEN / 1.1)):
    s = 0.6 + k * 1.1; p, d = at(s)
    me = bpy.data.meshes.new("chev"); me.from_pydata([(-0.16, -0.18, 0), (0.0, 0.0, 0), (0.16, -0.18, 0), (0.16, -0.06, 0), (0.0, 0.12, 0), (-0.16, -0.06, 0)], [],
                                                     [(0, 1, 4, 5), (1, 2, 3, 4)])
    me.materials.append(am); o = bpy.data.objects.new("arrow", me); sc.collection.objects.link(o)
    o.location = (p.x + d.y * 0.42, p.y - d.x * 0.42, 0.012); o.rotation_euler[2] = math.atan2(d.y, d.x) - math.pi / 2
    o.color = ARROW; arrows.append((s, o))

# ---------- Isotype people ----------
def person(name, col, h=1.0):
    pm = mat(name, col)
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.15 * h, location=(0, 0, 0.86 * h), segments=32, ring_count=16); head = bpy.context.object
    bpy.ops.mesh.primitive_cylinder_add(radius=0.19 * h, depth=0.56 * h, location=(0, 0, 0.36 * h), vertices=32); body = bpy.context.object
    bv = body.modifiers.new("b", "BEVEL"); bv.width = 0.09 * h; bv.segments = 6
    sw = body.modifiers.new("s", "SIMPLE_DEFORM"); sw.deform_method = "TAPER"; sw.factor = 0.35; sw.deform_axis = "Z"
    for p in (head, body): p.data.materials.append(pm)
    root = bpy.data.objects.new(name, None); sc.collection.objects.link(root)
    for p in (head, body): p.parent = root
    return root
you = person("you", OCHRE)
crowd = []
for i, s in enumerate((9.0, 15.5, 23.0, 31.0, 38.5, 46.0)):
    c = person("shopper %d" % i, PEOPLE, 0.95); p, d = at(s); c.location = (p.x + d.y * -0.15, p.y - d.x * -0.15, 0)
    c.rotation_euler[2] = math.atan2(d.y, d.x) - math.pi / 2; crowd.append((s, c))

# ---------- camera rig ----------
pivot = bpy.data.objects.new("pivot", None); sc.collection.objects.link(pivot)
bpy.ops.object.camera_add(); cam = bpy.context.object; sc.camera = cam
cam.data.type = "ORTHO"; cam.data.clip_end = 200; cam.parent = pivot; cam.location = (0, 0, 60); cam.rotation_euler = (0, 0, 0)
ISO = math.radians(54.7356)
def ease(u): u = max(0.0, min(1.0, u)); return u * u * u * (u * (u * 6 - 15) + 10)       # smootherstep: speed and acceleration start/stop at 0
def span(f, a_, b_): return ease((f - a_) / (b_ - a_))

def set_cam(f, loc, tilt, spin, scale):
    pivot.location = loc; pivot.rotation_euler = (tilt, 0, spin); cam.data.ortho_scale = scale
    pivot.keyframe_insert("location", frame=f); pivot.keyframe_insert("rotation_euler", frame=f); cam.data.keyframe_insert("ortho_scale", frame=f)

def set_you(f, s, walking=True):
    p, d = at(s); bob = 0.035 * abs(math.sin(s * math.pi / 0.55)) if walking else 0
    you.location = (p.x + d.y * -0.15, p.y - d.x * -0.15, bob); you.rotation_euler[2] = math.atan2(d.y, d.x) - math.pi / 2
    you.keyframe_insert("location", frame=f); you.keyframe_insert("rotation_euler", frame=f)

def light_arrows(f, s_you, lead=3.2):
    for s, o in arrows:
        k = max(0.0, 1 - abs((s - s_you) - lead * 0.5) / (lead * 0.5)) if s > s_you - 0.2 else 0.0   # a soft band just ahead of you
        k = k * k * (3 - 2 * k)
        o.color = tuple(ARROW[i] + (OCHRE[i] - ARROW[i]) * k for i in range(3)) + (1,)
        o.keyframe_insert("color", frame=f)

CENTER = Vector((W_ / 2, D_ / 2 - 0.4, 0))
def flat_interp():
    for o in [pivot, cam.data, you, path.data] + [x for _, x in arrows]:
        ad = getattr(o, "animation_data", None)
        if ad and ad.action and hasattr(ad.action, "fcurves"):
            for fc in ad.action.fcurves:
                for kp in fc.keyframe_points: kp.interpolation = "LINEAR"

if MODE == "test":
    # 3 s: frame 0 already moving. Top-down plan → the camera swoops into isometric while the path draws itself;
    # "you" walks in at the entrance; the camera settles over your shoulder; the arrows light just ahead of you.
    N = 180; sc.frame_start, sc.frame_end = 0, N - 1
    for f in range(N):
        sw = span(f, -20, 110)                              # already in motion at frame 0
        s_you = 7.5 * span(f, 70, 230)                      # you keep walking past the end of the test
        follow = span(f, 60, 200)
        you_p, you_d = at(max(0.0, s_you))
        up = Vector((-math.sin(math.radians(45) * sw), math.cos(math.radians(45) * sw), 0))      # screen-up on the floor
        loc = CENTER.lerp(you_p + up * 2.0, follow)             # you sit below frame centre, under the words
        set_cam(f, loc, ISO * sw, math.radians(45) * sw, 21.5 - 13.0 * follow)
        cu.bevel_factor_end = 0.02 + 0.98 * span(f, -10, 120); cu.keyframe_insert("bevel_factor_end", frame=f)
        set_you(f, s_you - 0.8 * (1 - span(f, 60, 80)))
        light_arrows(f, s_you)
    flat_interp()
    for f in range(N):
        sc.frame_set(f); sc.render.filepath = f"{OUT}/t_{f:04d}.png"; bpy.ops.render.render(write_still=True)
elif MODE == "frames":
    # style frames: one state each
    names = a[2].split(",") if len(a) > 2 else ["sf1"]
    for nm in names:
        if nm == "sf1":    # L01: the whole store, iso, the path complete, you at the entrance
            set_cam(0, CENTER, ISO, math.radians(45), 20.5); set_you(0, 0.4, False); light_arrows(0, 0.0)
        if nm == "sf2":    # L02: over your shoulder, arrows lit ahead
            set_you(0, 12.0, True); p, _ = at(12.0); set_cam(0, Vector((p.x + 0.8, p.y + 1.6, 0)), ISO, math.radians(45), 8.0); light_arrows(0, 12.0)
        if nm == "sf3":    # L03: x-ray: walls glass-thin, the hidden doors glow ochre
            for o in walls: o.scale.z = 0.12
            for d in doors: d.data.materials[0] = mat("door lit", OCHRE, emit=1.2); d.scale.z = 1.0
            set_you(0, 20.0, False); set_cam(0, CENTER, ISO, math.radians(45), 20.5); light_arrows(0, 20.0)
        sc.frame_set(0); sc.render.filepath = f"{OUT}/{nm}.png"; bpy.ops.render.render(write_still=True)

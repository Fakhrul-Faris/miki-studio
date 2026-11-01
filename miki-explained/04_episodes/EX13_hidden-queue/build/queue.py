# EX13 5A "And the line itself is hidden": the printed 3D queue (look B: dark set, light pools, haze; people halftone + ink).
#   blender -b --python build/queue.py -- <out_dir> [still f,f,…] [half]
# A switchback queue between tall walls. The camera starts behind "you" (the only solid ochre figure) at the entrance:
# a few backs, then walls. It rises and swings round as the voice says "walls fold it back and forth", the walls sink to
# their ink outlines on "you never see how many are ahead" and the packed switchbacks appear; it keeps rising into the
# 2 s breath. Frame 1 = MASTER f540 ("and the line itself"), 227 frames to f767 ("Now picture").
import sys, math, random, bpy
from mathutils import Vector, Matrix
sys.path.insert(0, "/Users/user/Private/miki-studio/miki-explained/tools/blender")
from paperkit import setup, render, bloom, halftone, ink_outline
from crowd import load_person, move
a = sys.argv[sys.argv.index("--") + 1:]; OUT = a[0]
STILLS = [int(x) for x in a[a.index("still") + 1].split(",")] if "still" in a else None
N, FPS = 227, 24
sc = setup(N, 540 if "half" in a else 1080, 960 if "half" in a else 1920); sc.render.film_transparent = False
sc.eevee.taa_render_samples = 64; rnd = random.Random(13)
def lin(c): return tuple(((v / 255) / 12.92 if v / 255 <= 0.04045 else ((v / 255 + 0.055) / 1.055) ** 2.4) for v in c) + (1,)
OCHRE, DARK = lin((201, 138, 43)), lin((24, 22, 20))
def s2f(t): return 1 + round(t * FPS)                        # shot seconds → frame

def mat(name, col, rough=0.9):
    m = bpy.data.materials.new(name); m.use_nodes = True; b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = col; b.inputs["Roughness"].default_value = rough; return m
def box(size, loc, m, name):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc); o = bpy.context.object; o.name = name; o.scale = size
    bpy.ops.object.transform_apply(scale=True); o.data.materials.append(m); return o

# ---------- the queue: 6 lanes, 9 m long, walled ----------
LANES, LW, LEN, WALL_H = 6, 1.15, 9.0, 2.7
X = [-(LANES - 1) * LW / 2 + i * LW for i in range(LANES)]   # lane centres; lane 0 (the entrance lane) on the left
box((30, 30, 0.1), (0, 4, -0.05), mat("floor", DARK), "floor")
wall_m = mat("clay wall", (0.12, 0.115, 0.11, 1))             # printed like everything else
walls = []
for i in range(LANES + 1):                                    # dividers between lanes; the turn gaps alternate ends
    x = X[0] - LW / 2 + i * LW
    if i in (0, LANES): walls.append(box((0.12, LEN + 1.2, WALL_H), (x, LEN / 2, WALL_H / 2), wall_m, "wall side"))
    else:
        gap_back = (i % 2 == 1)                               # lane i-1 → i turns at the back for odd dividers
        y0, y1 = (0.0, LEN - 1.1) if gap_back else (1.1, LEN + 0.6)
        walls.append(box((0.12, y1 - y0, WALL_H), (x, (y0 + y1) / 2, WALL_H / 2), wall_m, "wall %d" % i))
walls.append(box((LANES * LW + 0.12, 0.12, WALL_H), (0, LEN + 0.6, WALL_H / 2), wall_m, "wall back"))
front = box(((LANES - 1) * LW, 0.12, WALL_H), (X[0] + LW / 2 + (LANES - 1) * LW / 2, -0.6, WALL_H / 2), wall_m, "wall front")
walls.append(front)                                           # the front is closed except lane 0's mouth
# the walls sink to their footprints (ink outlines stay) on "you never see how many are ahead" (4.6 → 5.5 s)
for w in walls:
    w.keyframe_insert("scale", frame=s2f(4.6)); w.scale.z = 0.03; w.location.z = 0.04; w.keyframe_insert("scale", frame=s2f(5.5))
    w.keyframe_insert("location", frame=s2f(5.5)); w.location.z = WALL_H / 2; w.keyframe_insert("location", frame=s2f(4.6))
    for fc in (w.animation_data.action.fcurves if hasattr(w.animation_data.action, "fcurves") else []):
        for k in fc.keyframe_points: k.interpolation = "EXPO"; k.easing = "EASE_IN_OUT"

# ---------- people: prototypes instanced along the lanes (feet on the floor), facing the way the line moves ----------
NAMES = ["s_m30", "s_f35", "s_m50", "s_f25", "s_m20", "s_f50", "s_m40", "s_f20"]
protos = {}
for n in NAMES:
    col, rig, hip = load_person(n, link=False); col.instance_offset = (hip.x, hip.y, 0); protos[n] = col
def place(n, p, heading, mirror=False, name="q"):
    e = bpy.data.objects.new(name, None); e.instance_type = "COLLECTION"; e.instance_collection = protos[n]
    sc.collection.objects.link(e); e.location = p; e.rotation_euler = (0, 0, heading)
    if mirror: e.scale.x = -1
    return e
k = 0
for i, x in enumerate(X):
    fwd = (i % 2 == 0)                                        # even lanes walk away (+y), odd lanes walk back (−y)
    for j in range(11):
        y = 0.6 + j * 0.78 + rnd.uniform(-0.12, 0.12)
        if i == 0 and y < 1.4: continue                       # room at the mouth for the two people in front of you
        head = (math.pi if fwd else 0) + math.radians(rnd.uniform(-14, 14))   # people face −y by default
        place(NAMES[(k * 5 + i) % len(NAMES)], (x + rnd.uniform(-0.12, 0.12), y, 0), head, rnd.random() < 0.5, "q %d,%d" % (i, j)); k += 1
# the two just inside the mouth are real copies: the nearer one glances back at you
c1, r1, h1 = load_person("s_m50"); r1.location += Vector((X[0], 0.9, 0)) - Vector((h1.x, h1.y, 0)); r1.rotation_euler[2] = math.pi
move(r1, "neck02", [(s2f(0.3), 0), (s2f(0.8), 40), (s2f(2.2), 40), (s2f(2.8), 0)])
c2, r2, h2 = load_person("s_f35"); r2.location += Vector((X[0] + 0.08, 0.1, 0)) - Vector((h2.x, h2.y, 0)); r2.rotation_euler[2] = math.pi + 0.15
# you: the last in line, outside the mouth, solid ochre (the only unprinted figure)
cy, ry, hy = load_person("s_m30"); ry.location += Vector((X[0], -1.1, 0)) - Vector((hy.x, hy.y, 0)); ry.rotation_euler[2] = math.pi
och = mat("ochre you", OCHRE, 0.6); _b = och.node_tree.nodes["Principled BSDF"]
_b.inputs["Emission Color"].default_value = OCHRE; _b.inputs["Emission Strength"].default_value = 0.55   # reads in the dark: the one solid colour
for o in cy.objects:
    if o.type == "MESH": o.data.materials.clear(); o.data.materials.append(och)
YOU = Vector((X[0], -1.1, 1.0))

# ---------- light: a pool on you, lamps along the walls, a dim fill, haze ----------
def light(kind, loc, energy, rot=None, size=None, colour=(1, 0.86, 0.66)):
    bpy.ops.object.light_add(type=kind, location=loc); l = bpy.context.object; l.data.energy = energy; l.data.color = colour
    if rot: l.rotation_euler = tuple(math.radians(v) for v in rot)
    if kind == "SPOT": l.data.spot_size = math.radians(size); l.data.spot_blend = 0.4; l.data.shadow_soft_size = 0.05
    if kind == "AREA": l.data.size = size
    return l
light("SPOT", YOU + Vector((0.3, -0.6, 3.6)), 500, rot=(10, 4, 0), size=30)
light("AREA", (X[0] + 1.2, -3.0, 2.6), 90, rot=(70, 0, 25), size=2.5)                     # a soft key on the backs at the mouth
for i, x in enumerate(X):                                     # one warm pool per lane, staggered, so the lanes read
    light("SPOT", (x, 2.0 + (i % 3) * 2.6, 4.2), 160, rot=(0, 0, 0), size=40)
light("AREA", (6, -8, 9), 260, rot=(50, 0, 35), size=10, colour=(0.9, 0.9, 0.95))
world = bpy.data.worlds.new("w"); sc.world = world; world.use_nodes = True
world.node_tree.nodes["Background"].inputs[0].default_value = DARK; world.node_tree.nodes["Background"].inputs[1].default_value = 0.0
hz = box((30, 30, 9), (0, 4, 4.5), bpy.data.materials.new("haze"), "haze"); hm = hz.data.materials[0]; hm.use_nodes = True
nt = hm.node_tree; nt.nodes.clear(); pv = nt.nodes.new("ShaderNodeVolumePrincipled"); pv.inputs["Density"].default_value = 0.025
o2 = nt.nodes.new("ShaderNodeOutputMaterial"); nt.links.new(pv.outputs[0], o2.inputs["Volume"])
sc.eevee.volumetric_tile_size = "4"; sc.eevee.volumetric_samples = 96
bloom(0.25, 0.8, 0.6); sc.view_settings.view_transform = "AgX"; sc.view_settings.look = "AgX - Medium High Contrast"

# ---------- print: halftone (screen) on people and walls, ink outline on both ----------
for m in list(bpy.data.materials):
    if m.name.startswith("clay ") and m.use_nodes: halftone(m, 3.0)
ink_outline([o for o in bpy.data.objects if o.type == "MESH" and o.data.materials and o.data.materials[0]
             and o.data.materials[0].name.startswith(("clay ", "ochre you"))])

# ---------- camera: behind you → rise and swing → high wide (keyed every frame) ----------
bpy.ops.object.camera_add(); cam = bpy.context.object; sc.camera = cam; cam.data.lens = 30
cam.data.dof.use_dof = True; cam.data.dof.aperture_fstop = 2.8
MID = Vector((0, LEN / 2, 0.6))
def ease(u): u = max(0, min(1, u)); return u * u * (3 - 2 * u)
def ease_out(u): u = max(0, min(1, u)); return 1 - (1 - u) ** 3
def pose(t):
    if t < 1.6:                                               # behind you at eye level, a slow push: backs, then walls
        u = t / 1.6; eye = YOU + Vector((0.35, -1.9 + 0.5 * u, 0.65)); tgt = Vector((X[0], 4.5, 1.3)); return eye, tgt
    u = ease_out((t - 1.6) / 7.85)                            # rise and swing to a high three-quarter wide, still settling in the breath
    e0, t0 = YOU + Vector((0.35, -1.4, 0.65)), Vector((X[0], 4.5, 1.3))
    e1, t1 = Vector((1.6, -6.2, 10.8)), Vector((-1.0, 2.4, 0.6))   # the end frame keeps you (ochre) in view
    mid = (e0 + e1) / 2 + Vector((3.5, -2.0, 1.0))           # a curved path: out to the side, then up
    eye = (1 - u) ** 2 * e0 + 2 * (1 - u) * u * mid + u ** 2 * e1
    return eye, t0.lerp(t1, ease(min(1, u * 1.3)))
for f in range(1, N + 1):
    eye, tgt = pose((f - 1) / FPS)
    fwd = (tgt - eye).normalized(); right = fwd.cross(Vector((0, 0, 1))).normalized(); up = right.cross(fwd)
    cam.matrix_world = Matrix.Translation(eye) @ Matrix((right, up, -fwd)).transposed().to_4x4()
    cam.data.dof.focus_distance = (YOU - eye).length if f < s2f(2.0) else (MID - eye).length
    cam.keyframe_insert("location", frame=f); cam.keyframe_insert("rotation_euler", frame=f); cam.data.dof.keyframe_insert("focus_distance", frame=f)
render(OUT, frames=STILLS or list(range(1, N + 1)), prefix="f")

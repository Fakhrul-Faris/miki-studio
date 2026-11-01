# EX00V6 C: look B (dark lit room) with a 3D audience and an orbiting camera.
#   blender -b --python shot3d.py -- <out_dir> [still f,f,…] [half] [mpfb]
# mpfb: the audience is MPFB people (mpfb_people.py) instead of the Hunyuan3D shapes; two of them move.
# halftone: people printed as paper dots on a flat screen ([body]: dots fixed to the body instead). ink: an outline round every person.
# People: Hunyuan3D shapes with the user's stills projected from the front (person.py). Chairs are 3D for every seat;
# the 4 empty ones (1 in 9) are ochre, the only accent. Camera: over the shoulders of the empty seat's neighbours, from the aisle →
# orbits ~70° to the front while rising to a high wide of the whole room (expo ease-out) → holds → dives straight down
# into that seat until its ochre fills the frame.
import sys, math, random, bpy
from mathutils import Vector, Matrix
HERE = "/Users/user/Private/miki-studio/miki-explained/04_episodes/_tests/EX00V6_polish"
sys.path.insert(0, "/Users/user/Private/miki-studio/miki-explained/tools/blender"); sys.path.insert(0, HERE)
from paperkit import setup, frame_dist, render, bloom
import person
a = sys.argv[sys.argv.index("--") + 1:]; OUT = a[0]
STILLS = [int(x) for x in a[a.index("still") + 1].split(",")] if "still" in a else None
N = 144
sc = setup(N, 540 if "half" in a else 1080, 960 if "half" in a else 1920); sc.render.film_transparent = False
sc.eevee.taa_render_samples = 64; rnd = random.Random(6)
def lin(c): return tuple(((v / 255) / 12.92 if v / 255 <= 0.04045 else ((v / 255 + 0.055) / 1.055) ** 2.4) for v in c) + (1,)
OCHRE, DARK = lin((201, 138, 43)), lin((24, 22, 20))

def mat(name, col, rough=0.9):
    m = bpy.data.materials.new(name); m.use_nodes = True; b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = col; b.inputs["Roughness"].default_value = rough; return m
def box(size, loc, m, name, bevel=0.012):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc); o = bpy.context.object; o.name = name; o.scale = size
    bpy.ops.object.transform_apply(scale=True)
    if bevel: bv = o.modifiers.new("bevel", "BEVEL"); bv.width = bevel; bv.segments = 2
    o.data.materials.append(m); return o

# ---------- the room ----------
COLS = [-1.75, -1.17, -0.59, 0.59, 1.17, 1.75]
ROWS = [2.6 - 1.3 * r for r in range(6)]                      # row 0 at the back (+Y); everyone faces −Y
EMPTY = [(0, 4), (2, 1), (3, 5), (4, 2)]; HERO = (2, 1)
SEAT_Z = 0.46
m_floor, m_wall = mat("floor", DARK), mat("wall", lin((32, 30, 28)))
m_ink, m_seat, m_och = mat("ink", lin((40, 38, 36)), 0.6), mat("seat", lin((62, 58, 54))), mat("ochre", OCHRE)
box((8, 10, 0.1), (0, -0.3, -0.05), m_floor, "floor", 0)
box((8, 0.2, 3.2), (0, 4.4, 1.6), m_wall, "back wall", 0)
box((0.2, 10, 3.2), (-4.0, -0.3, 1.6), m_wall, "left wall", 0)
def chair(x, y, m, name):
    box((0.5, 0.48, 0.07), (x, y - 0.02, SEAT_Z), m, name + " seat", 0.02)
    box((0.5, 0.07, 0.48), (x, y + 0.24, SEAT_Z + 0.27), m, name + " back", 0.02)
for r, y in enumerate(ROWS):
    for side in (COLS[:3], COLS[3:]):
        x0, x1 = side[0] - 0.29, side[-1] + 0.29
        box((x1 - x0, 0.08, 0.06), ((x0 + x1) / 2, y + 0.05, 0.36), m_ink, "beam %d" % r)
        for x in (x0 + 0.06, x1 - 0.06): box((0.05, 0.4, 0.36), (x, y + 0.05, 0.18), m_ink, "leg")
    for c, x in enumerate(COLS): chair(x, y, m_och if (r, c) in EMPTY else m_seat, "chair %d,%d" % (r, c))

# ---------- the audience ----------
if "mpfb" not in a:
    models = {n: person.load(n) for n in ("P1_hands", "P2_bag")}
    for o in models.values(): o.hide_render = True; o.hide_viewport = True
    HIP = 0.50                     # the models' seat height (feet at 0): lift so the thighs rest on the seat
    for r, y in enumerate(ROWS):
        for c, x in enumerate(COLS):
            if (r, c) in EMPTY: continue
            src = models["P1_hands" if (r * 5 + c * 3) % 7 < 4 else "P2_bag"]
            o = bpy.data.objects.new("person %d,%d" % (r, c), src.data); sc.collection.objects.link(o)
            s = rnd.uniform(0.94, 1.05)
            o.scale = (s * (-1 if rnd.random() < 0.5 else 1), s, s)
            o.location = (x + rnd.uniform(-0.03, 0.03), y - 0.08, SEAT_Z + 0.035 - HIP * s + 0.47)
            o.rotation_euler = (0, 0, math.radians(rnd.uniform(-9, 9)))

else:
    # MPFB people from the kit (tools/blender/crowd.py): prototypes instanced per seat (origin at the hip); three are real
    # copies that move: the neighbour turns to the empty seat, one looks up from a phone, one checks a watch then looks up
    from crowd import load_person, seat, move
    NAMES = ["m30", "f40", "m20", "f25", "m60", "m45", "f60", "m35", "f30"]
    SEAT_TOP = SEAT_Z + 0.035
    def seat_hip(x, y): return Vector((x, y + 0.06, SEAT_TOP + 0.075))
    protos = {}
    for n in NAMES:
        col, rig, hip = load_person(n, link=False); col.instance_offset = hip; protos[n] = col
    ACTORS = {(2, 2): "m30", (1, 1): "m20", (3, 0): "f60"}
    for r, y in enumerate(ROWS):
        for c, x in enumerate(COLS):
            if (r, c) in EMPTY: continue
            if (r, c) in ACTORS:
                col, rig, hip = load_person(ACTORS[(r, c)]); rig.location += seat_hip(x, y) - hip
                if (r, c) == (2, 2):     # turns head and shoulders to the empty seat beside him, holds, turns back
                    move(rig, "neck02", [(14, 0), (34, -42), (86, -42), (106, 0)]); move(rig, "spine03", [(14, 0), (36, -12), (86, -12), (108, 0)])
                elif (r, c) == (1, 1):   # looks up from the phone, around, back down
                    move(rig, "neck01", [(40, 0), (54, -30), (90, -30), (104, 0)], axis=0); move(rig, "head", [(54, 0), (66, 18), (88, 18), (100, 0)])
                else:                    # glances from the watch up to the room
                    move(rig, "neck01", [(60, 0), (72, -26), (120, -26)], axis=0)
                continue
            n = NAMES[(r * 3 + c * 2 + r // 2) % len(NAMES)]
            seat(protos[n], seat_hip(x + rnd.uniform(-0.02, 0.02), y), turn=rnd.uniform(-7, 7), mirror=rnd.random() < 0.5, name="seat %d,%d" % (r, c))

# ---------- light: the pools, a dim fill, haze ----------
def light(kind, loc, energy, rot=None, size=None, colour=(1, 1, 1)):
    bpy.ops.object.light_add(type=kind, location=loc); l = bpy.context.object; l.data.energy = energy; l.data.color = colour
    if rot: l.rotation_euler = tuple(math.radians(v) for v in rot)
    if kind == "SPOT": l.data.spot_size = math.radians(size); l.data.spot_blend = 0.35; l.data.shadow_soft_size = 0.05
    if kind == "AREA": l.data.size = size
    return l
hero = Vector((COLS[HERO[1]], ROWS[HERO[0]] - 0.02, SEAT_Z + 0.04))
world = bpy.data.worlds.new("w"); sc.world = world; world.use_nodes = True
bg = world.node_tree.nodes["Background"]; bg.inputs[0].default_value = DARK; bg.inputs[1].default_value = 0.0
for r, c in EMPTY:
    p = Vector((COLS[c], ROWS[r] - 0.02, SEAT_Z))
    light("SPOT", p + Vector((0.25, 0.4, 3.4)), 600 if (r, c) == HERO else 230, rot=(-6.5, 4, 0), size=34, colour=(1, 0.86, 0.66))
light("AREA", (2.5, -6, 5), 230, rot=(50, 0, 20), size=8, colour=(0.9, 0.9, 0.95))
light("AREA", (-3.5, 3.5, 2.6), 60, rot=(70, 0, -135), size=3, colour=(1, 0.9, 0.78))      # a warm rim from behind-left
vol = box((8, 10, 3.6), (0, -0.3, 1.8), bpy.data.materials.new("haze"), "haze", 0)
hm = vol.data.materials[0]; hm.use_nodes = True; nt = hm.node_tree; nt.nodes.clear()
pv = nt.nodes.new("ShaderNodeVolumePrincipled"); pv.inputs["Density"].default_value = 0.035
o2 = nt.nodes.new("ShaderNodeOutputMaterial"); nt.links.new(pv.outputs[0], o2.inputs["Volume"])
sc.eevee.volumetric_tile_size = "4"; sc.eevee.volumetric_samples = 96
bloom(strength=0.25, threshold=0.8, size=0.6)
sc.view_settings.view_transform = "AgX"; sc.view_settings.look = "AgX - Medium High Contrast"

# ---------- printed: halftone dots (screen) + an ink outline (paperkit) ----------
from paperkit import halftone, ink_outline
if "halftone" in a:
    for m in list(bpy.data.materials):
        if m.name.startswith("clay ") and m.use_nodes: halftone(m, 3.0, space="object" if "body" in a else "screen")
if "ink" in a:
    ink_outline([o for o in bpy.data.objects if o.type == "MESH" and o.data.materials and o.data.materials[0]
                 and o.data.materials[0].name.startswith("clay ")])

# ---------- camera: target, distance, elevation (deg above horizontal), azimuth (deg; 0 = in front, −Y) ----------
bpy.ops.object.camera_add(); cam = bpy.context.object; sc.camera = cam; cam.data.lens = 35
cam.data.dof.use_dof = True; cam.data.dof.aperture_fstop = 2.8
centre = Vector((0, -0.2, SEAT_Z)); WIDE = frame_dist(9.0) * 1.05
def ease_out(t): return 1 - 2 ** (-10 * t) if t < 1 else 1.0
def ease_io(t): return t * t * (3 - 2 * t)
def pose(f):
    if f <= 100:                                  # orbit + rise: the row in profile → the whole room from the front
        t = (f - 1) / 99; u = ease_out(t); w = ease_io(t)          # distance: expo out; orbit and rise: smooth in-out
        tgt = hero + Vector((0, 0, 0.25)) * (1 - w)
        return tgt.lerp(centre, u), 2.7 + (WIDE - 2.7) * u, 36 + (44 - 36) * w, 70 * (1 - w)
    if f <= 122:                                  # hold, a slow drift
        u = (f - 100) / 22
        return centre, WIDE * (1 - 0.03 * u), 44 + u, 3 * u
    u = (f - 122) / 22                            # the dive: straight down into the seat
    k = u ** 3
    return centre.lerp(hero, min(1, ease_io(u) * 1.3)), WIDE * 0.97 * (1 - k) + 0.1 * k, 45 + (90 - 45) * ease_io(u), 3 * (1 - u)
def place(f):
    tgt, d, el, az = pose(f)
    e, z = math.radians(el), math.radians(az)
    eye = tgt + Vector((d * math.cos(e) * math.sin(z), -d * math.cos(e) * math.cos(z), d * math.sin(e)))
    fwd = (tgt - eye).normalized()
    up0 = Vector((0, 0, 1)) if el < 80 else Vector((-math.sin(z), math.cos(z), 0))      # near top-down: screen-up = room depth
    right = fwd.cross(up0).normalized(); up = right.cross(fwd).normalized()
    cam.matrix_world = Matrix.Translation(eye) @ Matrix((right, up, -fwd)).transposed().to_4x4()
    cam.data.dof.focus_distance = d
for f in range(1, N + 1):
    place(f); cam.keyframe_insert("location", frame=f); cam.keyframe_insert("rotation_euler", frame=f)
    cam.data.dof.keyframe_insert("focus_distance", frame=f)
render(OUT, frames=STILLS or list(range(1, N + 1)), prefix="f")

# EX00V6 polish test: one 6 s shot, two looks, same camera. Material: EX11's waiting room ("1 in 9 never came").
#   blender -b --python shot.py -- <A|B> <out_dir> [still f,f,…] [half]
# A = flat 3D (r35 Cruel Intern / r40 car city): cream paper world, toon shading, hard sun shadows, strict palette.
# B = lit paper (r42 lighthouse / Fern Room 1046): dark room, one light pool on the empty seat, haze, the rest in shadow.
# Both: 6×6 seats, 4 empty (1 in 9). Occupied seats are EX11's top-down cut-outs graded to warm grey; the empty seats are
# solid ochre 3D chairs: the only accent. Camera: close top-down on one empty seat → rolls and pulls back to the whole
# room (expo ease-out) → holds → dives back into that seat until its ochre fills the frame (the shape transition).
import sys, math, random, bpy
from mathutils import Vector, Matrix
sys.path.insert(0, "/Users/user/Private/miki-studio/miki-explained/tools/blender")
from paperkit import setup, frame_dist, render, bloom
a = sys.argv[sys.argv.index("--") + 1:]; LOOK, OUT = a[0], a[1]
STILLS = [int(x) for x in a[a.index("still") + 1].split(",")] if "still" in a else None
L = "/Users/user/Private/miki-studio/miki-explained/04_episodes/EX11_no-show/layers/"
N = 144
sc = setup(N, 540 if "half" in a else 1080, 960 if "half" in a else 1920); sc.render.film_transparent = False
sc.eevee.taa_render_samples = 64; random.seed(6)
def lin(c): return tuple(((v / 255) / 12.92 if v / 255 <= 0.04045 else ((v / 255 + 0.055) / 1.055) ** 2.4) for v in c) + (1,)
INK, OCHRE, CREAM = lin((17, 17, 17)), lin((201, 138, 43)), lin((239, 232, 220))
DARK = lin((24, 22, 20))

# ---------- materials ----------
def node_mat(name):
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial"); return m, nt, out
def toon(name, col, lo=0.62):
    """A: diffuse → Shader to RGB → 2-step ramp (lit / shadow), times the base colour. Flat, graphic, hard shadows."""
    m, nt, out = node_mat(name)
    d = nt.nodes.new("ShaderNodeBsdfDiffuse"); s2r = nt.nodes.new("ShaderNodeShaderToRGB"); r = nt.nodes.new("ShaderNodeValToRGB")
    r.color_ramp.interpolation = "CONSTANT"; r.color_ramp.elements[0].color = (lo, lo * 0.97, lo * 0.93, 1)
    r.color_ramp.elements[1].position = 0.08; r.color_ramp.elements[1].color = (1, 1, 1, 1)
    mul = nt.nodes.new("ShaderNodeMix"); mul.data_type = "RGBA"; mul.blend_type = "MULTIPLY"; mul.inputs["Factor"].default_value = 1
    em = nt.nodes.new("ShaderNodeEmission")
    nt.links.new(d.outputs[0], s2r.inputs[0]); nt.links.new(s2r.outputs["Color"], r.inputs["Fac"]); nt.links.new(r.outputs["Color"], mul.inputs[6])
    rgb = nt.nodes.new("ShaderNodeRGB"); rgb.outputs[0].default_value = col
    nt.links.new(rgb.outputs[0], mul.inputs[7]); nt.links.new(mul.outputs[2], em.inputs["Color"]); nt.links.new(em.outputs[0], out.inputs[0])
    return m
def lit(name, col, rough=0.9):
    """B: plain principled paper, lit by real light."""
    m, nt, out = node_mat(name); b = nt.nodes.new("ShaderNodeBsdfPrincipled"); b.inputs["Roughness"].default_value = rough
    b.inputs["Base Color"].default_value = col; nt.links.new(b.outputs[0], out.inputs[0]); return m
_imgs = {}
def image_tex(nt, path, grey=0.12):
    """the cut-out, graded to warm grey: saturation down so its baked-in ochre chair stops competing with the accent."""
    img = _imgs.get(path) or bpy.data.images.load(path); _imgs[path] = img
    t = nt.nodes.new("ShaderNodeTexImage"); t.image = img
    hs = nt.nodes.new("ShaderNodeHueSaturation"); hs.inputs["Saturation"].default_value = grey
    nt.links.new(t.outputs["Color"], hs.inputs["Color"]); return hs.outputs[0], t.outputs["Alpha"]
def mat(name, col): return (toon if LOOK == "A" else lit)(name, col)
def card_mat(name, path):
    m, nt, out = node_mat(name); return splice(m, nt, out, image_tex(nt, path))
def splice(m, nt, out, tex):
    if LOOK == "A":
        d = nt.nodes.new("ShaderNodeBsdfDiffuse"); s2r = nt.nodes.new("ShaderNodeShaderToRGB"); r = nt.nodes.new("ShaderNodeValToRGB")
        r.color_ramp.interpolation = "CONSTANT"; r.color_ramp.elements[0].color = (0.62, 0.6, 0.58, 1)
        r.color_ramp.elements[1].position = 0.08; r.color_ramp.elements[1].color = (1, 1, 1, 1)
        mul = nt.nodes.new("ShaderNodeMix"); mul.data_type = "RGBA"; mul.blend_type = "MULTIPLY"; mul.inputs["Factor"].default_value = 1
        em = nt.nodes.new("ShaderNodeEmission"); mix = nt.nodes.new("ShaderNodeMixShader"); tr = nt.nodes.new("ShaderNodeBsdfTransparent")
        nt.links.new(d.outputs[0], s2r.inputs[0]); nt.links.new(s2r.outputs["Color"], r.inputs["Fac"])
        nt.links.new(r.outputs["Color"], mul.inputs[6]); nt.links.new(tex[0], mul.inputs[7]); nt.links.new(mul.outputs[2], em.inputs["Color"])
        nt.links.new(tex[1], mix.inputs[0]); nt.links.new(tr.outputs[0], mix.inputs[1]); nt.links.new(em.outputs[0], mix.inputs[2])
        nt.links.new(mix.outputs[0], out.inputs[0])
    else:
        b = nt.nodes.new("ShaderNodeBsdfPrincipled"); b.inputs["Roughness"].default_value = 0.9
        nt.links.new(tex[0], b.inputs["Base Color"]); nt.links.new(tex[1], b.inputs["Alpha"]); nt.links.new(b.outputs[0], out.inputs[0])
    return m

# ---------- the room ----------
def box(size, loc, m, name, bevel=0.012):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc); o = bpy.context.object; o.name = name; o.scale = size
    bpy.ops.object.transform_apply(scale=True)
    bv = o.modifiers.new("bevel", "BEVEL"); bv.width = bevel; bv.segments = 2
    o.data.materials.append(m); return o
COLS = [-1.75, -1.17, -0.59, 0.59, 1.17, 1.75]                # 3 + aisle + 3
ROWS = [2.6 - 1.3 * r for r in range(6)]                      # row 0 at the back (+Y); the chairs face −Y
EMPTY = [(0, 4), (2, 1), (3, 5), (4, 2)]; HERO = (2, 1)       # 4 of 36 = 1 in 9; HERO is the seat the camera lives on
SEAT_Z = 0.46
m_floor = mat("floor", CREAM if LOOK == "A" else DARK)
m_wall = mat("wall", lin((226, 218, 204)) if LOOK == "A" else lin((32, 30, 28)))
m_ink = mat("ink", INK if LOOK == "A" else lin((40, 38, 36)))
m_och = mat("ochre", OCHRE)
box((8, 10, 0.1), (0, -0.3, -0.05), m_floor, "floor", 0)
box((8, 0.2, 3.2), (0, 4.4, 1.6), m_wall, "back wall", 0)
box((0.2, 10, 3.2), (-4.0, -0.3, 1.6), m_wall, "left wall", 0)
for r, y in enumerate(ROWS):
    for side in (COLS[:3], COLS[3:]):
        x0, x1 = side[0] - 0.29, side[-1] + 0.29
        box((x1 - x0, 0.08, 0.06), ((x0 + x1) / 2, y + 0.05, 0.36), m_ink, "beam %d" % r)          # the row's steel beam
        for x in (x0 + 0.06, x1 - 0.06):
            box((0.05, 0.4, 0.36), (x, y + 0.05, 0.18), m_ink, "leg")
people = []
looks = ["CO_patient1", "CO_patient2", "CO_patient1_ink", "CO_patient2_ochre", "CO_patient1_ochre", "CO_patient2_ink"]
for r, y in enumerate(ROWS):
    for c, x in enumerate(COLS):
        if (r, c) in EMPTY:
            box((0.5, 0.48, 0.07), (x, y - 0.02, SEAT_Z), m_och, "empty seat %d,%d" % (r, c), 0.02)
            box((0.5, 0.07, 0.48), (x, y + 0.24, SEAT_Z + 0.27), m_och, "empty back %d,%d" % (r, c), 0.02)
            continue
        look = looks[(r * 4 + c * 3 + r // 2) % len(looks)]
        H = 1.25 if "patient1" in look else 1.25 * 2313 / 2072
        W = H * 1178 / (2072 if "patient1" in look else 2313)
        bpy.ops.mesh.primitive_plane_add(size=1, location=(x, y - H / 2 + 0.55, SEAT_Z + 0.06 + 0.002 * c)); o = bpy.context.object
        o.scale = (W * (-1 if random.random() < 0.5 else 1), H, 1); o.rotation_euler = (0, 0, math.radians(random.uniform(-3, 3)))
        o.name = "patient %d,%d" % (r, c); o.data.materials.append(card_mat(o.name, L + look + ".png")); people.append(o)

# ---------- light ----------
def light(kind, loc, energy, rot=None, size=None, colour=(1, 1, 1)):
    bpy.ops.object.light_add(type=kind, location=loc); l = bpy.context.object; l.data.energy = energy; l.data.color = colour
    if rot: l.rotation_euler = tuple(math.radians(v) for v in rot)
    if size is not None:
        if kind == "SUN": l.data.angle = math.radians(size)
        elif kind == "SPOT": l.data.spot_size = math.radians(size); l.data.spot_blend = 0.35; l.data.shadow_soft_size = 0.05
    return l
hero = Vector((COLS[HERO[1]], ROWS[HERO[0]] - 0.02, SEAT_Z + 0.04))
world = bpy.data.worlds.new("w"); sc.world = world; world.use_nodes = True
bg = world.node_tree.nodes["Background"]
if LOOK == "A":
    bg.inputs[0].default_value = CREAM; bg.inputs[1].default_value = 1.0
    light("SUN", (0, 0, 5), 3.0, rot=(38, 0, -32), size=1.5)                # one low hard sun: long graphic shadows
else:
    bg.inputs[0].default_value = DARK; bg.inputs[1].default_value = 0.0
    for r, c in EMPTY:                                                       # a pool on every empty seat; the hero's brightest
        p = Vector((COLS[c], ROWS[r] - 0.02, SEAT_Z))
        light("SPOT", p + Vector((0.25, 0.4, 3.4)), 520 if (r, c) == HERO else 200, rot=(-6.5, 4, 0), size=34, colour=(1, 0.86, 0.66))
    light("AREA", (2.5, -6, 5), 120, rot=(50, 0, 20), size=8, colour=(0.9, 0.9, 0.95)).data.shape = "RECTANGLE"   # cool dim fill: the room in silhouette
    vol = box((8, 10, 3.6), (0, -0.3, 1.8), bpy.data.materials.new("haze"), "haze", 0)
    hm = vol.data.materials[0]; hm.use_nodes = True; nt = hm.node_tree; nt.nodes.clear()
    pv = nt.nodes.new("ShaderNodeVolumePrincipled"); pv.inputs["Density"].default_value = 0.035
    o2 = nt.nodes.new("ShaderNodeOutputMaterial"); nt.links.new(pv.outputs[0], o2.inputs["Volume"])
    sc.eevee.volumetric_tile_size = "4"; sc.eevee.volumetric_samples = 96
    bloom(strength=0.25, threshold=0.8, size=0.6)
sc.view_settings.view_transform = "AgX"; sc.view_settings.look = "AgX - Medium High Contrast" if LOOK == "B" else "None"
if LOOK == "A": sc.view_settings.view_transform = "Standard"     # toon colours are emission: show them exactly

# ---------- camera (keyed every frame from one function) ----------
bpy.ops.object.camera_add(); cam = bpy.context.object; sc.camera = cam; cam.data.lens = 35
cam.data.dof.use_dof = True; cam.data.dof.aperture_fstop = 2.8 if LOOK == "B" else 5.6
centre = Vector((0, -0.3, SEAT_Z))
WIDE, TILT = frame_dist(9.0) * 1.05, 48
def ease_out(t): return 1 - 2 ** (-10 * t) if t < 1 else 1.0
def ease_in(t): return t ** 3
def pose(f):
    """target, distance, tilt from vertical (deg), roll (deg) for frame f."""
    if f <= 96:                                   # reveal: the one empty seat → the whole room
        u = ease_out((f - 1) / 95)
        return hero.lerp(centre, u), 1.5 + (WIDE - 1.5) * u, TILT * u, -75 * (1 - u)
    if f <= 122:                                  # hold, a slow drift
        u = (f - 96) / 26
        return centre + Vector((0, 0.08 * u, 0)), WIDE * (1 - 0.03 * u), TILT + u, 0
    u = ease_in((f - 122) / 22)                   # the dive back into that seat until its ochre fills the frame
    return (centre + Vector((0, 0.08, 0))).lerp(hero, min(1, u * 1.6)), WIDE * 0.97 * (1 - u) + 0.12 * u, (TILT + 1) * (1 - u), 0
def place(f):
    tgt, d, tilt, roll = pose(f)
    t = math.radians(tilt)
    eye = tgt + Vector((0, -d * math.sin(t), d * math.cos(t)))
    fwd = (tgt - eye).normalized()
    up0 = Vector((math.sin(math.radians(roll)), math.cos(math.radians(roll)), 0))   # screen-up = room +Y, rolled
    right = fwd.cross(up0).normalized(); up = right.cross(fwd).normalized()
    rot = Matrix((right, up, -fwd)).transposed().to_4x4()
    cam.matrix_world = Matrix.Translation(eye) @ rot
    cam.data.dof.focus_distance = d
for f in range(1, N + 1):
    place(f); cam.keyframe_insert("location", frame=f); cam.keyframe_insert("rotation_euler", frame=f)
    cam.data.dof.keyframe_insert("focus_distance", frame=f)
frames = STILLS or list(range(1, N + 1))
render(OUT, frames=frames, prefix="f")

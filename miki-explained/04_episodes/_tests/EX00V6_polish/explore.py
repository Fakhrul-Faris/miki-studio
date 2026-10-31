# EX00V6 explore: the printed-3D look (halftone fixed to the surface + ink outline) beyond the crowd, on environments and props.
#   blender -b --python explore.py -- <cafe|street|data|data_cream> <out.png> [half]
# Props: Poly Haven CC0 models in 02_kit/props/ (glTF 1k), their textures dropped for flat greys so light alone draws the form;
# the ochre accent is always one solid, unprinted story object.
import sys, math, random, bpy
from mathutils import Vector
sys.path.insert(0, "/Users/user/Private/miki-studio/miki-explained/tools/blender")
from paperkit import setup, halftone, ink_outline, bloom
from crowd import load_person
a = sys.argv[sys.argv.index("--") + 1:]; SCENE, OUT = a[0], a[1]
PROPS = "/Users/user/Private/miki-studio/miki-explained/02_kit/props/"
sc = setup(1, 540 if "half" in a else 1080, 960 if "half" in a else 1920); sc.render.film_transparent = False
sc.eevee.taa_render_samples = 64; rnd = random.Random(3)
def lin(c): return tuple(((v / 255) / 12.92 if v / 255 <= 0.04045 else ((v / 255 + 0.055) / 1.055) ** 2.4) for v in c) + (1,)
OCHRE, DARK, CREAM, INK = lin((201, 138, 43)), lin((24, 22, 20)), lin((239, 232, 220)), lin((17, 17, 17))
CREAMSET = SCENE.endswith("cream")

def mat(name, col, rough=0.85):
    m = bpy.data.materials.new(name); m.use_nodes = True; b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = col; b.inputs["Roughness"].default_value = rough; return m
def box(size, loc, m, name, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc); o = bpy.context.object; o.name = name; o.scale = size
    o.rotation_euler = tuple(math.radians(v) for v in rot); bpy.ops.object.transform_apply(scale=True)
    o.data.materials.append(m); return o
def prop(name, loc=(0, 0, 0), turn=0.0, scale=1.0, grey=None):
    """import a Poly Haven glTF; every material becomes a flat grey (alternating, so parts read apart) to be printed."""
    before = set(bpy.data.objects); bpy.ops.import_scene.gltf(filepath=PROPS + "%s/%s.gltf" % (name, name))
    new = [o for o in bpy.data.objects if o not in before]
    root = bpy.data.objects.new(name, None); sc.collection.objects.link(root)
    for o in new:
        if o.parent is None: o.parent = root
    root.location = loc; root.rotation_euler = (0, 0, math.radians(turn)); root.scale = (scale,) * 3
    meshes = [o for o in new if o.type == "MESH"]
    for i, o in enumerate(meshes):
        for j, s in enumerate(o.material_slots):
            v = grey if grey is not None else (0.34, 0.2, 0.27)[(i + j) % 3]
            s.material = mat("clay %s %d %d" % (name, i, j), (v, v * 0.97, v * 0.92, 1))
    return root, meshes
def light(kind, loc, energy, rot=None, size=None, colour=(1, 0.86, 0.66)):
    bpy.ops.object.light_add(type=kind, location=loc); l = bpy.context.object; l.data.energy = energy; l.data.color = colour
    if rot: l.rotation_euler = tuple(math.radians(v) for v in rot)
    if kind == "SPOT": l.data.spot_size = math.radians(size or 40); l.data.spot_blend = 0.4; l.data.shadow_soft_size = 0.05
    if kind == "AREA": l.data.size = size or 2
    if kind == "SUN": l.data.angle = math.radians(size or 3)
    return l
def haze(size, loc, density=0.03):
    v = box(size, loc, bpy.data.materials.new("haze"), "haze"); nt = v.data.materials[0].node_tree if v.data.materials[0].use_nodes else None
    m = v.data.materials[0]; m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
    pv = nt.nodes.new("ShaderNodeVolumePrincipled"); pv.inputs["Density"].default_value = density
    o2 = nt.nodes.new("ShaderNodeOutputMaterial"); nt.links.new(pv.outputs[0], o2.inputs["Volume"]); return v
def camera(eye, target, lens=35, fstop=4.0):
    bpy.ops.object.camera_add(location=eye); c = bpy.context.object; sc.camera = c; c.data.lens = lens
    c.rotation_euler = (Vector(target) - Vector(eye)).to_track_quat("-Z", "Y").to_euler()
    c.data.dof.use_dof = True; c.data.dof.aperture_fstop = fstop; c.data.dof.focus_distance = (Vector(target) - Vector(eye)).length
    return c
world = bpy.data.worlds.new("w"); sc.world = world; world.use_nodes = True
world.node_tree.nodes["Background"].inputs[0].default_value = CREAM if CREAMSET else DARK
world.node_tree.nodes["Background"].inputs[1].default_value = 1.0 if CREAMSET else 0.0
floor_m = mat("floor", CREAM if CREAMSET else DARK); wall_m = mat("wall", lin((226, 218, 204)) if CREAMSET else lin((32, 30, 28)))
och = mat("ochre", OCHRE, 0.6)
accent = []
cell = 0.02

if SCENE == "cafe":            # F&B: a coffee cart at night, two customers on bar stools, the till the only colour
    box((12, 12, 0.1), (0, 0, -0.05), floor_m, "floor"); box((12, 0.2, 5), (0, 3.2, 2.5), wall_m, "back wall")
    cart, _ = prop("CoffeeCart_01", (0, 0.6, 0), 180)
    _, till = prop("CashRegister_01", (0.45, 0.35, 1.02), 200, grey=0.3)
    for o in till: o.data.materials.clear(); o.data.materials.append(och)
    accent += till
    prop("croissant", (-0.35, 0.3, 1.02), 30); prop("carrot_cake", (-0.05, 0.35, 1.02), 0)
    for i, x in enumerate((-0.9, 0.0, 0.9)):
        prop("bar_chair_round_01", (x, -0.75, 0), rnd.uniform(-20, 20))
    for n, x in (("m30", -0.9), ("f40", 0.9)):
        col, rig, hip = load_person(n); rig.location += Vector((x, -0.75, 0.8)) - hip; rig.rotation_euler[2] = math.radians(180)
    light("SPOT", (0.6, -0.3, 3.2), 380, rot=(-8, 6, 0), size=38)
    light("SPOT", (1.4, -1.2, 2.4), 120, rot=(-40, 25, 0), size=18)            # a key on the till
    light("AREA", (-3, -4, 3), 90, rot=(55, 0, -35), size=5, colour=(0.85, 0.88, 1))
    haze((12, 10, 4), (0, 0, 2)); bloom(0.25, 0.8, 0.6)
    camera((2.6, -3.6, 1.9), (0, 0.2, 0.9), lens=35)
elif SCENE == "street":        # retail: a row of shopfronts at night, one door lit ochre (the shop in the story)
    box((30, 30, 0.1), (0, 0, -0.05), floor_m, "road"); box((30, 3, 0.15), (0, 3.5, 0.07), wall_m, "pavement")
    for i, x in enumerate((-7.5, -3.6, 0.3, 4.2, 8.1)):
        h = rnd.uniform(4.5, 7.5); g = (0.3, 0.2, 0.26, 0.34, 0.22)[i]
        b = box((3.7, 3, h), (x, 6.5, h / 2), mat("clay shop %d" % i, (g, g * 0.97, g * 0.92, 1)), "shop %d" % i)
        box((3.2, 0.9, 0.12), (x, 4.6, 2.9), mat("clay awning %d" % i, (0.18, 0.17, 0.16, 1)), "awning %d" % i, rot=(-14, 0, 0))
        for k in range(2):                                        # upstairs windows
            box((0.9, 0.1, 1.1), (x - 0.9 + 1.8 * k, 4.98, h - 1.4), mat("clay win %d %d" % (i, k), (0.06, 0.06, 0.06, 1)), "win")
        door_m = och if i == 2 else mat("clay door %d" % i, (0.08, 0.08, 0.08, 1))
        d = box((1.2, 0.12, 2.3), (x, 4.95, 1.15), door_m, "door %d" % i)
        if i == 2: accent.append(d)
    light("AREA", (0.3, 4.4, 1.3), 220, rot=(-90, 0, 0), size=1.4)          # the lit shop spills onto the pavement
    light("SPOT", (0.3, 2.5, 6), 300, rot=(-20, 0, 0), size=50)
    light("SUN", (0, 0, 10), 0.25, rot=(55, 0, 30), colour=(0.7, 0.78, 1))   # moonlight
    car, _ = prop("covered_car", (-3, 1.6, 0), 0); prop("WetFloorSign_01", (1.5, 3.4, 0.15), 30)
    haze((30, 20, 8), (0, 2, 4), 0.02); bloom(0.3, 0.8, 0.7)
    camera((6.5, -4.5, 1.4), (-1, 5, 2.2), lens=28, fstop=5.6)
else:                          # data: coin stacks on a desk as a bar chart; the tallest stack ochre (the cost)
    cell = 0.008
    box((8, 8, 0.1), (0, 0, -0.05), floor_m, "floor")
    top = 0.76
    box((1.5, 0.85, 0.05), (0, 0.05, top - 0.025), mat("clay desk", (0.24, 0.23, 0.22, 1)), "desk")
    for lx in (-0.7, 0.7):
        for ly in (-0.33, 0.43): box((0.05, 0.05, top - 0.05), (lx, ly, (top - 0.05) / 2), mat("clay leg", (0.2, 0.2, 0.2, 1)), "desk leg")
    for k, n in enumerate((4, 7, 11, 16, 24)):
        x = -0.36 + 0.18 * k
        bpy.ops.mesh.primitive_cylinder_add(radius=0.045, depth=0.006, vertices=40)
        c = bpy.context.object; c.data.materials.append(och if k == 4 else mat("clay coin %d" % k, (0.32, 0.31, 0.29, 1)))
        c.location = (x, 0.05, top + 0.003)
        ar = c.modifiers.new("stack", "ARRAY"); ar.count = n; ar.use_relative_offset = False; ar.use_constant_offset = True
        ar.constant_offset_displace = (0, 0, 0.0065)
        if k == 4: accent.append(c)
    prop("clipboard", (0.48, -0.2, top), -25); prop("classic_laptop", (-0.52, 0.22, top), 20)
    if CREAMSET:
        light("SUN", (0, 0, 5), 3.2, rot=(40, 0, 35), size=2, colour=(1, 0.97, 0.92))
    else:
        light("SPOT", (0.25, -0.4, 2.6), 160, rot=(10, 4, 0), size=36)
        light("AREA", (-2, -2, 2), 25, rot=(50, 0, -40), size=3, colour=(0.85, 0.88, 1)); haze((6, 6, 3), (0, 0, 1.5), 0.04); bloom(0.25, 0.8, 0.6)
    camera((0.95, -1.15, 1.45), (0.0, 0.05, 0.82), lens=40, fstop=2.8)

# print everything except the accent; ink on paper (dark sets) or ink on cream (cream sets)
dot, ground = ((0.012, 0.011, 0.010, 1), CREAM) if CREAMSET else ((0.53, 0.50, 0.45, 1), (0.012, 0.011, 0.010, 1))
for m in list(bpy.data.materials):
    if m.name.startswith("clay ") and m.use_nodes: halftone(m, 3.0 if not CREAMSET else 2.4, cell=cell, dot=dot, ground=ground)
ink_outline([o for o in bpy.data.objects if o.type == "MESH" and o.data.materials and o.data.materials[0]
             and o.data.materials[0].name.startswith("clay ")], width=0.004 if cell < 0.01 else 0.009,
            colour=(0.012, 0.011, 0.010, 1) if CREAMSET else (0.47, 0.44, 0.40, 1))
sc.view_settings.view_transform = "Standard" if CREAMSET else "AgX"
if not CREAMSET: sc.view_settings.look = "AgX - Medium High Contrast"
sc.render.filepath = OUT; bpy.ops.render.render(write_still=True)

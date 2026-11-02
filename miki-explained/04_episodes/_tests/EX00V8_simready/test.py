# SimReady side-by-side (user approved the shape-only method, 2026-11-03): left = hand-built boxes (the house way),
# right = NVIDIA SimReady props (counter, trays, ketchup) in flat house colours, both under the EX17 night rig.
#   blender -b --python test.py -- <out.png>
import sys, os, math, bpy
from mathutils import Vector
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H + "/../../../tools/blender")
from isokit import *
import simready
OUT = sys.argv[sys.argv.index("--") + 1]
sc = setup()
[o for o in bpy.data.objects if o.type == "LIGHT"][0].data.energy = 1.1
[n for n in sc.world.node_tree.nodes if n.type == "BACKGROUND"][0].inputs[0].default_value = (0.10, 0.10, 0.13, 1)
S = 0.47                                                   # a 0.8-unit figure is ~1.7 m: metres -> world units
mf, mw, mp = mat("furniture", FURN), mat("wall", WALL), mat("people", PEOPLE)
TRAY, RED = mat("tray", hexc("#6A6A74")), mat("ketchup", WARM, emit=0.2)
box("floor", -4, -2.5, 4, 2.5, 0.2, mat("floor", hexc("#2E2E35")), z0=-0.2)
for side, x0 in (("hand", -2.0), ("simready", 2.0)):
    if side == "hand":
        box("counter", x0 - 0.15, -1.4, x0 + 0.15, 1.4, 0.44, mf, z0=0.0, bevel=0.03)
        for k in range(3):
            y = -0.9 + k * 0.9
            box("tray", x0 - 0.06, y - 0.07, x0 + 0.06, y + 0.07, 0.012, TRAY, z0=0.44, bevel=0.005)
            cyl("ketchup", x0, y + 0.03, 0.015, 0.08, RED, z0=0.452, verts=16, bevel=0.004)
    else:
        c = simready.load("fixture_counter_a01", mf); c.scale = (S, S * 0.93, S); c.location = (x0, 0, 0)
        for k in range(3):
            y = -0.9 + k * 0.9
            t = simready.load("dishware_plastic_tray_a01", TRAY) if k == 0 else bpy.data.objects["dishware_plastic_tray_a01"].copy()
            if k: sc.collection.objects.link(t)
            t.scale = (S,) * 3; t.location = (x0, y, 0.93 * S)
            kch = simready.load("food_condiment_ketchup_a01", RED) if k == 0 else bpy.data.objects["food_condiment_ketchup_a01"].copy()
            if k: sc.collection.objects.link(kch)
            kch.scale = (S,) * 3; kch.location = (x0, y + 0.03, 0.93 * S + 0.012)
    for k, y in enumerate((-0.8, 0.6)):
        p = person("guest", mp, 0.8); p.location = (x0 - 0.8, y, 0); p.rotation_euler.z = -math.pi / 2
bpy.ops.object.light_add(type="SPOT", location=(0, -4, 6)); s = bpy.context.object
s.rotation_euler = (Vector((0, 0, 0.3)) - s.location).to_track_quat("-Z", "Y").to_euler(); s.data.energy = 900; s.data.spot_size = math.radians(70)
sc.render.resolution_x, sc.render.resolution_y = 1920, 1080
rig = Rig(); rig.keys([(0, Vector((0, 0, 0.25)), 62, 20, 6.2), (1, Vector((0, 0, 0.25)), 62, 20, 6.2)]); rig.set(0)
sc.render.filepath = OUT; bpy.ops.render.render(write_still=True)

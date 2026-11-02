# Close-up test: EX18 opens tight on a tray. Left hand-built, right SimReady (tray, ketchup, cup), same light.
import sys, os, math, bpy
from mathutils import Vector
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H + "/../../../tools/blender")
from isokit import *
import simready
OUT = sys.argv[sys.argv.index("--") + 1]
sc = setup(); sc.render.resolution_x, sc.render.resolution_y = 1920, 1080
[o for o in bpy.data.objects if o.type == "LIGHT"][0].data.energy = 1.6
TRAY, RED, CUP = mat("tray", hexc("#6A6A74")), mat("ketchup", WARM, emit=0.2), mat("cup", hexc("#B9B6C0"))
box("table", -0.6, -0.35, 0.6, 0.35, 0.05, mat("table", FURN), z0=-0.05, bevel=0.005)
box("tray A", -0.42, -0.13, -0.16, 0.13, 0.012, TRAY, z0=0.0, bevel=0.004)
cyl("ketchup A", -0.2, 0.08, 0.022, 0.15, RED, z0=0.012, verts=24, bevel=0.004)
cyl("cup A", -0.32, 0.05, 0.04, 0.12, CUP, z0=0.012, verts=32, bevel=0.004)
t = simready.load("dishware_plastic_tray_a01", TRAY); t.location = (0.29, 0, 0)
k = simready.load("food_condiment_ketchup_a01", RED); k.location = (0.42, 0.08, 0.012)
c = simready.load("food_beverage_coffeeCup_a01", CUP); c.location = (0.3, 0.05, 0.012); c.scale = (0.9,) * 3
rig = Rig(); rig.keys([(0, Vector((0, 0, 0.05)), 58, 30, 1.0), (1, Vector((0, 0, 0.05)), 58, 30, 1.0)]); rig.set(0)
sc.render.filepath = OUT; bpy.ops.render.render(write_still=True)

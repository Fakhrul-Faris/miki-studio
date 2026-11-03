# EX00V9 look test (reference r45): one 7 s shot in the v4 language — a McDonald's shell on a studio grid floor; a
# glowing ring turns its walls to glass, the camera flies through the front into the till, green money runs as light
# from the till down into the land under the floor, the camera pulls back wide.
# Shot grammar: CU low 3/4 on the sign (50 mm, push, "two businesses") → ring wipe ("Only one") → fly-through (28 mm swoop,
# "sells burgers") → CU on the till, f/2 → wide pull-back (35 mm, f/5.6). Foreground: a metal bollard for parallax.
#   blender -b --python shot.py -- <out_dir> eevee|cycles [still f,f,…] [half]
import sys, os, math, bpy
from mathutils import Vector
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H + "/../../../tools/blender")
from isokit import setup, box, cyl, hexc, ease, span, back_out, Path
from camkit import *
A = sys.argv[sys.argv.index("--") + 1:]; OUT, ENG = A[0], A[1]
sc = setup(half="half" in A); [bpy.data.objects.remove(o) for o in bpy.data.objects if o.type == "LIGHT"]
engine(ENG, 64 if ENG == "eevee" else 96); sc.render.fps = 60
N = 420; sc.frame_start, sc.frame_end = 0, N - 1
studio()
RED = paint("mcd red", hexc("#C8261B")); YEL = paint("mcd yellow", hexc("#FFC72C"), rough=0.35)
GL = glass("glass"); DARK = metal("dark metal", hexc("#2A2D33"), 0.3); CHROME = metal("chrome", (0.8, 0.8, 0.82, 1), 0.12)
SHELL = xray_material("shell x-ray", RED, GL); xray_origin(SHELL, (0.0, -1.5, 0.5))
ROOF = xray_material("roof x-ray", RED, GL); xray_origin(ROOF, (0.0, -1.5, -1.1))
# shell: 4 walls + roof (each its own object; object-space origin at the restaurant centre so the ring is one sphere)
def wall(name, x0, y0, x1, y1, h, m, z0=0.0):
    o = box(name, x0, y0, x1, y1, h, m, z0=z0, bevel=0.02); o.data.transform(__import__("mathutils").Matrix.Translation(o.location)); o.location = (0, 0, 0); return o
for nm, a in (("front", (-2, -1.5, 2, -1.38)), ("back", (-2, 1.38, 2, 1.5)), ("left", (-2, -1.5, -1.88, 1.5)), ("right", (1.88, -1.5, 2, 1.5))):
    wall(nm, *a, 2.2, SHELL)
wall("roof", -2.1, -1.6, 2.1, 1.6, 0.14, ROOF, z0=2.2)
box("floor", -1.9, -1.4, 1.9, 1.4, 0.05, paint("floor", hexc("#5A4E48"), 0.6), z0=0.0, bevel=0.01)
PLOT = frosted("land", hexc("#57D100"), glow=0.0); box("land", -2.4, -2.0, 2.4, 2.0, 0.2, PLOT, z0=-0.2, bevel=0.03)
box("counter", -1.2, 0.2, 1.0, 0.55, 0.9, YEL, z0=0.05, bevel=0.03)
till = box("till", 0.45, 0.25, 0.85, 0.5, 0.22, DARK, z0=0.95, bevel=0.02)
box("till screen", 0.5, 0.24, 0.8, 0.26, 0.14, glow("screen", (0.5, 0.9, 0.6, 1), 2.0), z0=1.0, bevel=0.0)
bpy.ops.object.text_add(location=(0, -1.52, 1.7)); t = bpy.context.object; t.data.body = "McDONALD'S"
t.data.font = bpy.data.fonts.load(os.path.expanduser("~/Library/Fonts/InterDisplay-Black.ttf")); t.data.size = 0.42; t.data.extrude = 0.03
t.data.align_x = "CENTER"; t.rotation_euler = (math.pi / 2, 0, 0); t.data.materials.append(glow("sign", hexc("#FFC72C"), 3.0))
cyl("bollard", 1.6, -3.4, 0.12, 0.9, CHROME, z0=0.0, verts=48, bevel=0.03)                          # foreground for parallax
cyl("bollard 2", -2.3, -3.1, 0.12, 0.9, CHROME, z0=0.0, verts=48, bevel=0.03)
# the money: a path from the till down through the counter into the land
cu = bpy.data.curves.new("money", "CURVE"); cu.dimensions = "3D"; sp = cu.splines.new("POLY"); P = [(0.65, 0.37, 1.0), (0.65, 0.1, 0.9), (0.65, -0.3, 0.3), (0.4, -0.6, -0.1)]
sp.points.add(len(P) - 1)
for pt, q in zip(sp.points, P): pt.co = (*q, 1)
cu.bevel_depth = 0.025; MONEY = bpy.data.objects.new("money", cu); sc.collection.objects.link(MONEY); MONEY.data.materials.append(glow("money glow", hexc("#57D100"), 10.0))
rig = PerspRig()
SIGN = Vector((0, -1.5, 1.75)); TILL = Vector((0.65, 0.37, 1.05)); MID = Vector((0, 0, 0.9))
rig.keys([
    (-30, Vector((3.4, -7.6, 0.55)), SIGN, 35, 2.8), (0, Vector((3.4, -7.6, 0.55)), SIGN, 35, 2.8),
    (110, Vector((2.6, -6.3, 0.75)), SIGN + Vector((0, 0, -0.1)), 38, 2.8),                       # slow push (hold)
    (150, Vector((1.4, -4.2, 1.0)), MID, 40, 3.5),
    (205, Vector((0.7, -0.2, 1.25)), TILL, 28, 2.0),                                            # fly through the glass front
    (300, Vector((1.2, -0.45, 1.2)), TILL + Vector((-0.1, -0.3, -0.4)), 30, 2.0),                 # follow the money down
    (370, Vector((5.5, -7.5, 4.0)), MID, 35, 5.6), (N + 30, Vector((6.2, -8.2, 4.4)), MID, 35, 5.6)], drift=0.02)
for f in range(N):
    rig.set(f)
    r = 7.0 * ease(span(f, 100, 175)); xray_set(SHELL, f, r); xray_set(ROOF, f, r)
    streak(MONEY, f, span(f, 230, 300) * 1.25, 0.3)
    b = PLOT.node_tree.nodes["Principled BSDF"].inputs["Emission Strength"]; b.default_value = 2.5 * span(f, 285, 315); b.keyframe_insert("default_value", frame=f)
fr = [int(x) for x in A[A.index("still") + 1].split(",")] if "still" in A else range(N)
import time
for f in fr:
    t0 = time.time(); sc.frame_set(f); sc.render.filepath = f"{OUT}/{ENG}_{f:04d}.png"; bpy.ops.render.render(write_still=True)
    print(f"TIME {ENG} f{f} {time.time() - t0:.1f}s")

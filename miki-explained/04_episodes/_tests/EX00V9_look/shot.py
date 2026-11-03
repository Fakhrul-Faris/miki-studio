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
engine(ENG, (32 if "fast" in A else 64) if ENG == "eevee" else 96, fast="fast" in A); FPS = 30; sc.render.fps = FPS          # v4 runs at 30 fps (r45 does; halves the render)
def T(f): return int(round(f * FPS / 60))                                           # timings below are written at 60 fps
N = T(420); sc.frame_start, sc.frame_end = 0, N - 1
studio()
RED = paint("mcd red", hexc("#C8261B")); YEL = paint("mcd yellow", hexc("#FFC72C"), rough=0.35)
GL = glass("glass"); DARK = metal("dark metal", hexc("#2A2D33"), 0.3); CHROME = metal("chrome", (0.8, 0.8, 0.82, 1), 0.12)
SHELL = xray_material("shell cutaway", RED, ring_w=0.07); xray_origin(SHELL, (0.0, -1.5, 0.5))
ROOF = xray_material("roof cutaway", RED, ring_w=0.07); xray_origin(ROOF, (0.0, -1.5, -1.1))
# shell: 4 walls + roof (each its own object; object-space origin at the restaurant centre so the ring is one sphere)
def wall(name, x0, y0, x1, y1, h, m, z0=0.0):
    o = box(name, x0, y0, x1, y1, h, m, z0=z0, bevel=0.02); o.data.transform(__import__("mathutils").Matrix.Translation(o.location)); o.location = (0, 0, 0); return o
for nm, a, m in (("front", (-2, -1.5, 2, -1.38), SHELL), ("back", (-2, 1.38, 2, 1.5), RED), ("left", (-2, -1.5, -1.88, 1.5), RED),
                 ("right", (1.88, -1.5, 2, 1.5), RED)):
    wall(nm, *a, 2.2, m)                                     # only the front wall and the roof cut away: a diorama, not a void
wall("roof", -2.1, -1.6, 2.1, 1.6, 0.14, ROOF, z0=2.2)
box("floor", -1.9, -1.4, 1.9, 1.4, 0.05, paint("floor", hexc("#5A4E48"), 0.6), z0=0.0, bevel=0.01)
PLOT = paint("land", hexc("#3E6B12"), 0.4); PLOT.node_tree.nodes["Principled BSDF"].inputs["Emission Color"].default_value = hexc("#57D100")
box("land", -2.4, -2.0, 2.4, 2.0, 0.2, PLOT, z0=-0.2, bevel=0.03)
box("counter", -1.2, 0.2, 1.0, 0.55, 0.9, YEL, z0=0.05, bevel=0.03)
# a payment terminal you can read: a dark body, a tilted screen showing a green price and a card icon, a card in the slot
till = box("terminal", 0.48, 0.28, 0.82, 0.5, 0.06, DARK, z0=0.95, bevel=0.02)
scr = box("screen", 0.5, 0.26, 0.8, 0.3, 0.26, glow("screen bg", hexc("#0E1A14"), 1.0), z0=1.0, bevel=0.01); scr.rotation_euler.x = -0.25
FONT = bpy.data.fonts.load(os.path.expanduser("~/Library/Fonts/InterDisplay-Black.ttf"))
def label3d(txt, loc, size, m):
    bpy.ops.object.text_add(location=loc); o = bpy.context.object; o.data.body = txt; o.data.font = FONT; o.data.size = size
    o.data.align_x = "CENTER"; o.data.extrude = 0.004; o.rotation_euler = (math.pi / 2 - 0.25, 0, 0); o.data.materials.append(m); return o
label3d("$5.99", (0.65, 0.255, 1.16), 0.075, glow("price", hexc("#57D100"), 4.0))
label3d("TAP OR INSERT", (0.65, 0.262, 1.075), 0.022, glow("ui", hexc("#CFE8D8"), 2.0))
card = box("card", 0.56, 0.22, 0.74, 0.24, 0.11, paint("card", hexc("#EDE7DC"), 0.3), z0=0.92, bevel=0.005); card.rotation_euler.x = 0.1
box("card stripe", 0.56, 0.215, 0.74, 0.222, 0.02, paint("stripe", hexc("#57D100"), 0.3), z0=0.98, bevel=0.0)
bpy.ops.object.light_add(type="AREA", location=(0.0, 0.0, 2.0)); IL = bpy.context.object; IL.data.energy = 220; IL.data.size = 2.5; IL.data.color = (1.0, 0.9, 0.75)
bpy.ops.object.text_add(location=(0, -1.52, 1.7)); t = bpy.context.object; t.data.body = "McDONALD'S"
t.data.font = bpy.data.fonts.load(os.path.expanduser("~/Library/Fonts/InterDisplay-Black.ttf")); t.data.size = 0.42; t.data.extrude = 0.03
t.data.align_x = "CENTER"; t.rotation_euler = (math.pi / 2, 0, 0)
SIGNM = xray_material("sign cutaway", glow("sign", hexc("#FFC72C"), 3.0), ring_w=0.07); t.data.materials.append(SIGNM); bpy.context.view_layer.update()
xray_origin(SIGNM, tuple(t.matrix_world.inverted() @ Vector((0.0, -1.5, 0.5))))   # same ring centre, in the text's own space
cyl("bollard", 1.6, -3.4, 0.12, 0.9, CHROME, z0=0.0, verts=48, bevel=0.03)                          # foreground for parallax
cyl("bollard 2", -2.3, -3.1, 0.12, 0.9, CHROME, z0=0.0, verts=48, bevel=0.03)
# the money: a path from the till down through the counter into the land
cu = bpy.data.curves.new("money", "CURVE"); cu.dimensions = "3D"; sp = cu.splines.new("POLY"); P = [(0.65, 0.3, 1.02), (0.65, 0.17, 0.98), (0.65, 0.17, 0.12), (0.65, -0.3, 0.07), (0.65, -1.2, 0.07), (0.65, -1.75, -0.03)]
sp.points.add(len(P) - 1)
for pt, q in zip(sp.points, P): pt.co = (*q, 1)
cu.bevel_depth = 0.05; MONEY = bpy.data.objects.new("money", cu); sc.collection.objects.link(MONEY); MONEY.data.materials.append(glow("money glow", hexc("#57D100"), 10.0))
rig = PerspRig()
SIGN = Vector((0, -1.5, 1.75)); TILL = Vector((0.65, 0.37, 1.05)); MID = Vector((0, 0, 0.9))
rig.keys([
    (T(-30), Vector((3.4, -7.6, 0.55)), SIGN, 35, 2.8), (0, Vector((3.4, -7.6, 0.55)), SIGN, 35, 2.8),
    (T(110), Vector((2.6, -6.3, 0.75)), SIGN + Vector((0, 0, -0.1)), 38, 2.8),                  # slow push (hold)
    (T(150), Vector((1.4, -4.2, 1.0)), MID, 40, 3.5),
    (T(205), Vector((0.95, -0.9, 1.3)), TILL, 32, 2.8),                                         # fly through the cut-away front
    (T(300), Vector((1.15, -0.75, 1.15)), TILL + Vector((-0.05, -0.25, -0.3)), 34, 2.8),        # the terminal, then the money down
    (T(370), Vector((5.5, -7.5, 4.0)), MID, 35, 5.6), (T(450), Vector((6.2, -8.2, 4.4)), MID, 35, 5.6)], drift=0.02)
for f in range(N):
    g = f * 60 / FPS                                                                           # the 60 fps timeline
    rig.set(f)
    r = 7.4 * ease(span(g, 96, 180)) ** 1.6                                        # grows from nothing (it popped at 0.9 before)
    sg = span(g, 96, 112) * (1 - span(g, 165, 185))                              # the glow fades in, then out as the cut finishes
    for mm in (SHELL, ROOF, SIGNM): xray_set(mm, f, r, sg)
    streak(MONEY, f, span(g, 230, 300) * 1.25, 0.3)
    b = PLOT.node_tree.nodes["Principled BSDF"].inputs["Emission Strength"]; b.default_value = 2.5 * span(g, 285, 315); b.keyframe_insert("default_value", frame=f)
if "anim" in A:                                                                    # one animation job (benchmark)
    import time; t0 = time.time(); f0, f1 = [int(x) for x in A[A.index("anim") + 1].split("-")]
    render_range(f"{OUT}/{ENG}_", f0, f1); print(f"TIME anim {f1 - f0 + 1} frames {time.time() - t0:.1f}s"); raise SystemExit
fr = [int(x) for x in A[A.index("still") + 1].split(",")] if "still" in A else range(N)
import time
for f in fr:
    t0 = time.time(); sc.frame_set(f); sc.render.filepath = f"{OUT}/{ENG}_{f:04d}.png"; bpy.ops.render.render(write_still=True)
    print(f"TIME {ENG} f{f} {time.time() - t0:.1f}s")

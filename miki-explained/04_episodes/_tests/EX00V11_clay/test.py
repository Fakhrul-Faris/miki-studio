# EX00V11 — clay maquette look test (reference 04_episodes/Main Edit.mp4; accent green; EX00V9 light).
#   blender -b --python test.py -- <out_dir> A|B [still f,f] [half]
import sys, os, math, bpy
from mathutils import Vector as V
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H + "/../../../tools/blender")
from isokit import setup, box, cyl, hexc, ease, span
from camkit import *
from lib3d import model, part
from mpfbkit import Person
A = sys.argv[sys.argv.index("--") + 1:]; OUT, SHOT = A[0], A[1]
sc = setup(half="half" in A); FPS = 30; sc.render.fps = FPS; N = 150; sc.frame_start, sc.frame_end = 0, N - 1
for o in [o for o in bpy.data.objects if o.type == "LIGHT"]: bpy.data.objects.remove(o)
engine("eevee", 48, fast=True)
try: sc.eevee.use_fast_gi = True; sc.eevee.fast_gi_distance = 2.0
except Exception: pass
G = hexc("#57D100")
import json as _j
T = {"clay": [0.30, 0.32, 0.36], "key": 9000, "rim": 2000, "amb": 0.7, "fill": 1300, "xa": 0.34}   # tuned to Main Edit.mp4 (measured)
T.update(_j.loads(os.environ.get("TUNE", "{}")))
CC = T.get("clay", [0.40, 0.43, 0.47]); CLAY = clay("clay", (*CC, 1), 0.66)          # cool blue-grey clay (matched to Main Edit.mp4)
KEY, FILL, RIM, AMB = T.get("key", 6000), T.get("fill", 0.0), T.get("rim", 1500), T.get("amb", 0.25)
GREENC = clay("green mannequin", G, 0.5); GREENC.node_tree.nodes["Principled BSDF"].inputs["Emission Color"].default_value = G
GREENC.node_tree.nodes["Principled BSDF"].inputs["Emission Strength"].default_value = 0.35
DASH = glow("dash", G, 2.5)
# studio: a soft grey ground fading into a dark void, EX00V9 key + rim
FLOOR, _L = studio(); FLOOR.scale = (3, 3, 1)                                      # the EX00V9 dark reflective floor (no lines)
for L in _L.values(): bpy.data.objects.remove(L)
for n in sc.world.node_tree.nodes:
    if n.type == "BACKGROUND": n.inputs[1].default_value = AMB                     # low ambient: deep shadow sides
sc.view_settings.view_transform = "AgX"; sc.view_settings.look = "AgX - Medium High Contrast"
def area(loc, aim, e, size, col=(1, 1, 1)):
    bpy.ops.object.light_add(type="AREA", location=loc); L = bpy.context.object; L.data.energy = e; L.data.size = size; L.data.color = col
    L.rotation_euler = (V(aim) - V(loc)).to_track_quat("-Z", "Y").to_euler(); return L
rig = PerspRig()
if SHOT == "A":                                                                  # the gas station, Ronald at the pump
    GS = model("gas_station", height=8.2, at=(0, 0, 0)); clay_all(GS, CLAY)
    grass = [o for o in GS.children if o.name.startswith("Cube.001")][0]; bpy.context.view_layer.update()
    gz = max((grass.matrix_world @ V(c)).z for c in grass.bound_box); GS.location.z -= gz
    pump = [o for o in GS.children if o.name.startswith("Cube.009")][0]; bpy.context.view_layer.update()
    pts = [pump.matrix_world @ V(c) for c in pump.bound_box]; PP = sum(pts, V()) / 8; PP.z = 0
    car = model("car_b", length=4.3, at=(PP.x + 2.6, PP.y + 0.6, 0)); clay_all(car, CLAY)
    ATT = V((PP.x + 1.1, PP.y - 0.2, 0)); FIL = V((car.location.x - 0.92, car.location.y + 1.25, 0.82))
    ron = Person("ron_05", GREENC, GREENC, GREENC, GREENC, name="Ron")
    ron.place(0, (ATT.x, ATT.y), math.degrees(math.atan2(FIL.x - ATT.x, -(FIL.y - ATT.y)))); ron.act(0, "pump")
    bpy.context.view_layer.update(); hr = ron.hand("R")
    noz = box("nozzle", -0.04, -0.12, 0.04, 0.12, 0.06, GREENC, z0=-0.03, bevel=0.015); noz.location = hr; noz.rotation_euler = (FIL - hr).to_track_quat("-Y", "Z").to_euler()
    area((PP.x - 8, PP.y - 7, 13), PP + V((1, 0, 1)), KEY, 10, (0.93, 0.96, 1.0)); area((PP.x + 10, PP.y + 10, 6), PP + V((1, 0, 1)), RIM, 6, (0.8, 0.88, 1.0))
    if FILL: area((PP.x + 9, PP.y - 9, 4), PP + V((1, 0, 1)), FILL, 12, (0.85, 0.9, 1.0))
    bpy.ops.object.light_add(type="POINT", location=(PP.x + 1.3, PP.y, 4.0)); L = bpy.context.object; L.data.energy = 400; L.data.color = (1.0, 0.95, 0.85)
    aim = ATT + V((0.6, 0, 1.1))
    rig.keys([(0, ATT + V((3.4, -6.0, 2.6)), aim, 35, 4.0), (N, ATT + V((2.6, -4.6, 2.0)), aim, 40, 3.2)], drift=0.015)
else:                                                                             # an x-ray building, floors inside, a green figure, a dashed path in
    B = model("apartment", height=16, at=(0, 0, 0), face=180); bpy.context.view_layer.update()
    pts = [o.matrix_world @ V(c) for o in B.children for c in o.bound_box]; lo = V([min(p[i] for p in pts) for i in range(3)]); hi = V([max(p[i] for p in pts) for i in range(3)])
    clay_all(B, xray_shell(col=(0.5, 0.53, 0.58, 1), alpha=float(T.get("xa", 0.32)), edge=0.85))
    for k in range(6):                                                           # the floors you see through the shell
        box("floor", lo.x + 0.3, lo.y + 0.3, hi.x - 0.3, hi.y - 0.3, 0.18, CLAY, z0=k * 2.8, bevel=0.02)
    for k in range(5): box("stair", lo.x + 0.8, lo.y + 0.6 + k * 0.0, lo.x + 2.6, lo.y + 1.6, 0.15, CLAY, z0=k * 2.8 + 1.4, bevel=0.0)
    fig = Person("s_m50", GREENC, GREENC, GREENC, GREENC, name="fig"); fz = 3 * 2.8 + 0.18
    fig.place(0, ((lo.x + hi.x) / 2 + 1.2, (lo.y + hi.y) / 2), 0, z=fz)
    door = V(((lo.x + hi.x) / 2, lo.y - 3.5, 0.03))
    path = [door, V((door.x, lo.y + 1.0, 0.03)), V((lo.x + 1.7, lo.y + 1.0, 0.25)), V((lo.x + 1.7, lo.y + 1.1, fz + 0.05)), V(((lo.x + hi.x) / 2 + 1.0, (lo.y + hi.y) / 2, fz + 0.05))]
    D = dashed("dash", [tuple(p) for p in path], DASH, 0.4, 0.25, 0.05)
    for i, d in enumerate(D):                                                     # the path draws itself, dash by dash
        d.scale = (0, 0, 0); d.keyframe_insert("scale", frame=0); d.keyframe_insert("scale", frame=10 + i)
        d.scale = (1, 1, 1); d.keyframe_insert("scale", frame=14 + i)
    c = (lo + hi) / 2
    area((c.x - 16, c.y - 16, 26), c, KEY * 1.8, 14, (0.93, 0.96, 1.0)); area((c.x + 16, c.y + 14, 14), c, RIM * 2, 10, (0.8, 0.88, 1.0))
    rig.keys([(0, c + V((14, -26, 6)), c + V((0, 0, -1)), 35, 5.6), (N, c + V((10, -21, 9)), c + V((0, 0, 0)), 35, 5.6)], drift=0.015)
# bloom only (a mist fade erased the see-through shell: transparent surfaces write no depth)
tree = bpy.data.node_groups.new("comp", "CompositorNodeTree"); sc.compositing_node_group = tree
tree.interface.new_socket("Image", in_out="OUTPUT", socket_type="NodeSocketColor")
rl = tree.nodes.new("CompositorNodeRLayers"); go = tree.nodes.new("NodeGroupOutput")
gl = tree.nodes.new("CompositorNodeGlare"); gl.inputs["Type"].default_value = "Bloom"; gl.inputs["Threshold"].default_value = 0.9; gl.inputs["Strength"].default_value = 0.3
tree.links.new(rl.outputs["Image"], gl.inputs["Image"]); tree.links.new(gl.outputs["Image"], go.inputs["Image"]); sc.render.use_compositing = True
for f in range(N): rig.set(f)
bloom_tree = None
fr = [int(x) for x in A[A.index("still") + 1].split(",")] if "still" in A else None
if fr:
    for f in fr: sc.frame_set(f); sc.render.filepath = f"{OUT}/{SHOT}_{f:04d}.png"; bpy.ops.render.render(write_still=True)
else: render_range(f"{OUT}/{SHOT}_", 0, N - 1)

# paperkit v2 through the kit only: blender -b --python kit_test.py -- <out> [half]
import sys, math, bpy
sys.path.insert(0, "/Users/user/Private/miki-studio/miki-explained/tools/blender")
from paperkit import *
a = sys.argv[sys.argv.index("--") + 1:]; OUT = a[0]; D = "/Users/user/Private/miki-studio/miki-explained/04_episodes/_tests/EX00V5_paperkit2"
N = 72; sc = setup(N, 540 if "half" in a else 1080, 960 if "half" in a else 1920); sc.eevee.taa_render_samples = 32
box = shadowbox(D + "/box")
crowd = []
for i, (k, fx, fy, w) in enumerate([(3, 0.22, 0.79, 0.30), (3, 0.66, 0.80, 0.30), (2, 0.36, 0.63, 0.16), (2, 0.58, 0.63, 0.16), (2, 0.83, 0.64, 0.16)]):
    p, s = on_band(k, fx, fy); h = w * 4.0 * 1440 / 2560 * s * 1640 / 1282
    v = card(D + "/CO_viewer.png", h, loc=p, name="viewer %d" % i); v.location.z += h * 0.18
    if i % 2: v.scale.x = -v.scale.x
    crowd.append(v)
p, s = on_band(3, 0.47, 0.84, 0.06); pc = card(D + "/CO_popcorn.png", 0.22, loc=p, name="popcorn"); crowd.append(pc)
translucent(crowd); cc = collection("crowd", crowd)
sun, fill = lights(key=2.4, fill=12, key_dir=(30, 0, 25)); fill.location = (-2, -5, 4)
sp, _ = on_band(0, 0.51, 0.31, front=0.02)
practical_light((sp[0], -0.3, sp[2]), 1.7, 120, only=cc, glow_rect=((sp[0], sp[1], sp[2]), (1.7, 1.15)), glow_strength=0.8)
bloom()
ink_ring((p[0], p[1] - 0.04, p[2]), 0.2, 0.16, draw=(20, 32))                                    # draws on, frames 20–32
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, -0.6, 3.25)); bn = bpy.context.object; bn.scale = (1.6, 0.3, 1); bn.rotation_euler = (math.radians(90), 0, 0)
bpy.ops.object.transform_apply(scale=True); bpy.ops.object.mode_set(mode="EDIT"); bpy.ops.mesh.subdivide(number_cuts=40); bpy.ops.object.mode_set(mode="OBJECT")
mb = bpy.data.materials.new("banner"); mb.use_nodes = True; mb.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (0.79, 0.54, 0.17, 1); bn.data.materials.append(mb)
bpy.ops.object.empty_add(location=(0.8, -0.6, 3.25)); roll(bn, bpy.context.object, [(1, 0), (12, 0), (40, 1)])
fp, _ = on_band(3, 0.3, 0.86, front=0.12); tk = card(D + "/CO_popcorn.png", 0.2, loc=fp, name="flap")                     # a card folding up on a hinge
bpy.ops.object.empty_add(location=(fp[0], fp[1], fp[2] - 0.1)); fold(tk, bpy.context.object, [(1, -90), (44, -90), (46, -60), (48, -25), (50, 0)])
bpy.ops.object.empty_add(location=(0, 0, 2.0)); tgt = bpy.context.object
bpy.ops.object.camera_add(location=(-0.35, -frame_dist(4.0) * 0.95, 1.9)); cam = bpy.context.object; sc.camera = cam; cam.data.lens = 35
c = cam.constraints.new("TRACK_TO"); c.target = tgt; c.track_axis = "TRACK_NEGATIVE_Z"; c.up_axis = "UP_Y"
miniature(cam, crowd[0], fstop=5.6, lens=35)
for f, q, t in ((1, (-0.35, -frame_dist(4.0) * 0.95, 1.9), (0, 0, 2.0)), (N, (0.45, -frame_dist(4.0) * 0.62, 2.15), (0.05, 0, 2.2))):
    cam.location = q; cam.keyframe_insert("location", frame=f); tgt.location = t; tgt.keyframe_insert("location", frame=f)
interpolation(cam, "BEZIER"); interpolation(tgt, "BEZIER")
boil(crowd, N, amp=0.0012, rot=0.2); flicker(sun, N, pct=1.5)
render(OUT, frames=[1, 26, 50, 72], prefix="kit")

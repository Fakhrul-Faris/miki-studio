# EX09 paper supermarket (Blender). blender -b --python build/market.py -- <SEQ> <out_dir> [still f,f,…] [half]
#   SEP  143 f: three checkout lanes. 1A = f1–103: the camera rushes along lane 1, slows to near-still as lane 2's shopper
#        walks out (speed ramp, E8). f104–143: crane up to top-down (2A opens on it, then the lanes morph to a diagram).
#   ONE  307 f: one snaking line between rope posts, slow orbit (C2). From f262 the shoppers peel back into three lanes as
#        the camera returns to SEP's first pose: ONE's last frame = SEP's first frame (S1 loop).
import sys, math, random, bpy
sys.path.insert(0, "/Users/user/Private/miki-studio/miki-explained/tools/blender")
from paperkit import *
a = sys.argv[sys.argv.index("--") + 1:]; SEQ, OUT = a[0], a[1]
STILLS = [int(x) for x in a[a.index("still") + 1].split(",")] if "still" in a else None
L = "/Users/user/Private/miki-studio/miki-explained/04_episodes/EX09_other-line/layers/"
N = {"SEP": 143, "ONE": 307}[SEQ]
sc = setup(N, 540 if "half" in a else 1080, 960 if "half" in a else 1920); random.seed(9); sc.eevee.taa_render_samples = 32
def lin(c): return tuple((v / 255) ** 2.2 for v in c) + (1,)
def stand(o, z=0): o.location.z = z + o.scale.y / 2; return o
def hide(o, f_off=None, f_on=None):
    if f_on: o.hide_render = True; o.keyframe_insert("hide_render", frame=1); o.hide_render = False; o.keyframe_insert("hide_render", frame=f_on)
    if f_off: o.hide_render = False; o.keyframe_insert("hide_render", frame=1); o.hide_render = True; o.keyframe_insert("hide_render", frame=f_off)
    interpolation(o, "CONSTANT")
# ---- the set ----
sheet(10, 12, loc=(0, 0, 0), rot=(0, 0, 0), colour=lin((206, 196, 178)), name="floor")
wall = card(L + "paper.png", 9.0, loc=(0, 3.4, 4.5), wobble=0, name="wall"); wall.scale.x *= 2.2
sheet(9, 0.5, loc=(0, 3.38, 0.25), colour=lin((201, 138, 43)), name="skirting")
LX = [-1.2, 0.0, 1.2]
for i, x in enumerate(LX):
    sheet(0.86, 6.0, loc=(x, -0.6, 0.004), rot=(0, 0, 0), colour=lin((228, 220, 204)), name="lane %d" % i)
for x in (-1.8, -0.6, 0.6, 1.8):
    sheet(0.05, 6.0, loc=(x, -0.6, 0.006), rot=(0, 0, 0), colour=lin((30, 28, 26)), name="divider")
tills = [stand(card(L + "CO_checkout.png", 1.25, loc=(x + 0.1, 2.3, 0), name="till %d" % i)) for i, x in enumerate(LX)]
SH = ["CO_shopper1", "CO_shopper2", "CO_shopper1_ink", "CO_shopper2_light", "CO_shopper2_ink", "CO_shopper1_light", "CO_shopper2", "CO_shopper1_ink", "CO_shopper2_ink"]
people = []
for i, f in enumerate(SH):
    o = stand(card(L + f + ".png", 1.7, loc=(0, 0, 0), name="shopper %d" % i))
    if i % 2: o.scale.x = -o.scale.x
    people.append(o)
# lane positions (SEP): lane 1 is ours (4 deep, YOU last), lane 2 has 2, lane 3 has 3
SEPPOS = [(-1.2, 1.4), (-1.2, 0.7), (-1.2, 0.0), (-1.2, -0.7), (0.0, 1.4), (0.0, 0.7), (1.2, 1.4), (1.2, 0.7), (1.2, 0.0)]
YOU = 3
# one snaking line (ONE): rope posts and a serpentine path ending at the three tills
SNAKE = [(-0.6, 1.25), (0.15, 1.25), (0.9, 1.25), (0.9, 0.55), (0.15, 0.55), (-0.6, 0.55), (-0.6, -0.15), (0.15, -0.15), (0.9, -0.15)]
def place(o, xy, y_off=0.0): o.location.x, o.location.y = xy[0], xy[1] + y_off
# the YOU tag: a small ochre card with Anton type, just above our shopper's head (SEP only; she doesn't move there)
bpy.ops.mesh.primitive_plane_add(size=1); tag = bpy.context.object; tag.name = "you tag"; tag.scale = (0.26, 0.13, 1); tag.rotation_euler = (math.radians(90), 0, 0)
tagmat = bpy.data.materials.new("you tag"); tagmat.use_nodes = True; tagmat.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = lin((201, 138, 43)); tag.data.materials.append(tagmat)
import os
bpy.ops.object.text_add(); yt = bpy.context.object; yt.data.body = "YOU"; yt.data.size = 0.1; yt.data.align_x = "CENTER"; yt.data.align_y = "CENTER"; yt.data.extrude = 0.004
yt.data.font = bpy.data.fonts.load(os.path.expanduser("~/Library/Fonts/Anton-Regular.ttf")); yt.rotation_euler = (math.radians(90), 0, 0)
ink = bpy.data.materials.new("ink"); ink.use_nodes = True; ink.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = lin((24, 22, 20)); yt.data.materials.append(ink)
sun, fill = lights(key=3.0, fill=14, key_dir=(30, 0, 25)); fill.location = (-2.5, -4.5, 3.5)
# ---- camera ----
bpy.ops.object.empty_add(location=(0, 1.5, 1.0)); tgt = bpy.context.object
bpy.ops.object.camera_add(location=(0, -5, 1.6)); cam = bpy.context.object; sc.camera = cam
c = cam.constraints.new("TRACK_TO"); c.target = tgt; c.track_axis = "TRACK_NEGATIVE_Z"; c.up_axis = "UP_Y"
cam.data.lens = 30; cam.data.dof.use_dof = True; cam.data.dof.aperture_fstop = 5.0; cam.data.dof.focus_object = tgt
START = ((-1.15, -4.6, 1.55), (-0.5, 1.8, 1.05))                 # SEP f1 = ONE's last frame (the loop pose)
def camkeys(k):
    for f, p, t in k:
        cam.location = p; cam.keyframe_insert("location", frame=f); tgt.location = t; tgt.keyframe_insert("location", frame=f)
moving = []
if SEQ == "SEP":
    for o, xy in zip(people, SEPPOS): place(o, xy)
    # lane 2's front shopper walks out past the till on "because it usually does" (f64–90), on twos
    w = people[4]; x0, y0 = w.location.x, w.location.y
    for f in range(56, 92, 2):
        p = (f - 56) / 34.0; w.location.y = y0 + 1.6 * p; w.location.x = x0 + 0.55 * p; w.keyframe_insert("location", frame=f)
    w.location.x, w.location.y = x0, y0; w.keyframe_insert("location", frame=1); moving.append(w)
    camkeys([(1,) + START, (34, (-1.18, -2.9, 1.55), (-0.4, 1.9, 1.05)), (103, (-1.12, -2.55, 1.55), (0.25, 2.0, 1.0)),
             (143, (0.0, -2.6, 5.6), (0.0, 0.6, 0.0))])
    for i in range(cam.animation_data.action.layers[0].strips[0].channelbags[0].fcurves.__len__() if False else 0): pass
    interpolation(cam, "BEZIER"); interpolation(tgt, "BEZIER")
    # speed ramp: a fast rush (key 1→34), then a near-still crawl to 103: bezier handles do the ease
else:
    for o, xy in zip(people, SNAKE): place(o, xy)
    for k in range(4):                                              # rope posts along the snake
        for xy in ((-1.0, 0.9 - 0.7 * k + 0.35), (1.3, 0.9 - 0.7 * k + 0.35)):
            bpy.ops.mesh.primitive_cylinder_add(radius=0.03, depth=1.0, location=(xy[0], xy[1], 0.5)); p = bpy.context.object; p.data.materials.append(ink); hide(p, f_off=290 + 2 * k)   # posts go as the lanes come back (loop)
    for i, o in enumerate(people):                                   # peel back into the three lanes for the loop
        a0 = SNAKE[i]; a1 = SEPPOS[i]
        for f in range(262, 300, 2):
            q = (f - 262) / 36.0; o.location.x = a0[0] + (a1[0] - a0[0]) * q; o.location.y = a0[1] + (a1[1] - a0[1]) * q; o.keyframe_insert("location", frame=f)
        o.location.x, o.location.y = a0; o.keyframe_insert("location", frame=1); moving.append(o)
    orb = []
    for k in range(0, 9):
        f = 1 + k * 32; ang = math.radians(-35 + 70 * k / 8); r = 5.0
        orb.append((f, (r * math.sin(ang), 0.3 - r * math.cos(ang), 2.6), (0.15, 0.5, 0.8)))
    camkeys(orb[:-1] + [(262, orb[-1][1], orb[-1][2]), (N,) + START]); interpolation(cam, "BEZIER"); interpolation(tgt, "BEZIER")
on_twos(moving, N)
boil([o for o in people] + tills, N, amp=0.0015, rot=0.25); flicker(sun, N, pct=1.5)
yo = people[YOU]
hx, hy = SEPPOS[YOU]
for o, dz in ((tag, 0.0), (yt, -0.012)):
    o.location = (hx, hy - 0.03 + dz, 1.7 - 0.02)
    if SEQ == "ONE": hide(o, f_on=300)                              # back in the lanes for the loop: the tag returns
if STILLS: render(OUT, frames=STILLS, prefix="still")
elif "range" in a:
    r0, r1 = [int(x) for x in a[a.index("range") + 1].split(",")]; render(OUT, frames=range(r0, r1 + 1))
else: render(OUT)

# EX10 paper cinema (Blender): environment plates as backdrops, cut-outs in front for parallax; C1 infinite zoom.
#   blender -b --python build/cinema.py -- <SEQ> <out_dir> [still f,f,…] [half]
#   AUD    88 f: from the back row, past the seated viewer, into the blank screen until it fills the frame (→ 2A)
#   COUNTER 200 f: from inside the blank menu board, pull back to the counter, glide to the machine, push into the bucket (→ 4A)
#   AUDOUT 174 f: the reverse — out of the screen back to the whole auditorium (6A)
import sys, math, random, bpy
sys.path.insert(0, "/Users/user/Private/miki-studio/miki-explained/tools/blender")
from paperkit import *
a = sys.argv[sys.argv.index("--") + 1:]; SEQ, OUT = a[0], a[1]
STILLS = [int(x) for x in a[a.index("still") + 1].split(",")] if "still" in a else None
L = "/Users/user/Private/miki-studio/miki-explained/04_episodes/EX10_popcorn/layers/"
N = {"AUD": 88, "COUNTER": 200, "AUDOUT": 174}[SEQ]
sc = setup(N, 540 if "half" in a else 1080, 960 if "half" in a else 1920); random.seed(10); sc.eevee.taa_render_samples = 32
PH, PW, ZC = 4.0, 4.0 * 1440 / 2560, 2.0                    # plate height/width (m), plate centre height
def at(fx, fy): return (( fx - 0.5) * PW, 0.0, ZC + (0.5 - fy) * PH)   # a point on the plate from image fractions
def fill_dist(h): return (h / 2) / math.tan(math.atan(18 / 35))         # camera distance at which height h fills the frame (35 mm)
bpy.ops.object.empty_add(location=(0, 0, ZC)); tgt = bpy.context.object
bpy.ops.object.camera_add(location=(0, -fill_dist(PH), ZC)); cam = bpy.context.object; sc.camera = cam; cam.data.lens = 35
c = cam.constraints.new("TRACK_TO"); c.target = tgt; c.track_axis = "TRACK_NEGATIVE_Z"; c.up_axis = "UP_Y"
cam.data.dof.use_dof = True; cam.data.dof.aperture_fstop = 6.0; cam.data.dof.focus_object = tgt
def camkeys(k):
    for f, p, t in k:
        cam.location = p; cam.keyframe_insert("location", frame=f); tgt.location = t; tgt.keyframe_insert("location", frame=f)
    interpolation(cam, "BEZIER"); interpolation(tgt, "BEZIER")
sun, fill = lights(key=2.6, fill=14, key_dir=(30, 0, 25)); fill.location = (-2, -5, 4)
props = []
def glow(o, k=0.85):                                         # the plate keeps its own colours (partly self-lit), still takes shadows
    m = o.data.materials[0]; nt = m.node_tree; b = nt.nodes["Principled BSDF"]; t = [n for n in nt.nodes if n.type == "TEX_IMAGE"][0]
    nt.links.new(t.outputs["Color"], b.inputs["Emission Color"]); b.inputs["Emission Strength"].default_value = k
if SEQ in ("AUD", "AUDOUT"):
    plate = card(L + "ENV_auditorium.png", PH, loc=(0, 0, ZC), wobble=0, name="auditorium"); glow(plate)
    v = card(L + "CO_viewer.png", 1.5, loc=(-0.5, -2.0, 0.95), name="viewer"); props.append(v)
    pc = card(L + "CO_popcorn.png", 0.62, loc=(0.48, -2.3, 1.0), name="popcorn"); props.append(pc)
    S0 = at(0.51, 0.31); D_START = fill_dist(PH) * 0.92
    START = ((0.0, -D_START, ZC), (0.0, 0.0, ZC)); SCREEN = ((S0[0], -fill_dist(1.12), S0[2]), S0)
    mid = ((S0[0] * 0.5, -D_START * 0.55, ZC + 0.25), (S0[0], 0.0, S0[2] - 0.1))
    if SEQ == "AUD": camkeys([(1,) + START, (55,) + mid, (N,) + SCREEN])
    else: camkeys([(1,) + SCREEN, (70,) + mid, (N,) + START])
else:
    plate = card(L + "ENV_concession.png", PH, loc=(0, 0, ZC), wobble=0, name="concession"); glow(plate)
    pc = card(L + "CO_popcorn.png", 0.85, loc=(-0.38, -1.15, 0.72), name="popcorn"); props.append(pc)
    B = at(0.5, 0.26); M = at(0.21, 0.48)
    camkeys([(1, (B[0], -fill_dist(0.68), B[2]), B), (60, (0.0, -fill_dist(PH) * 0.9, ZC + 0.05), (0.0, 0.0, ZC + 0.05)),
             (140, (-0.42, -2.1, M[2] + 0.1), (-0.52, 0.0, M[2])), (N, (-0.38, -1.15 - fill_dist(0.8), 0.72), (-0.38, -1.15, 0.72))])
boil(props, N, amp=0.0012, rot=0.2); flicker(sun, N, pct=1.5)
if STILLS: render(OUT, frames=STILLS, prefix="still")
else: render(OUT)

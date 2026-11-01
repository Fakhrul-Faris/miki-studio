# EX00V7 poster + footage test: EX13's opening (L01–L02, frames 0–199 = MASTER frames) as one continuous camera through two
# generated constructivist posters (P1 clock tower, P2 endless queue), real black-and-white footage inside the clock.
#   blender -b --python build/poster.py -- <out_dir> [still f,f,…] [half]
# f0–70   in and up the tower to the clock; the hand spins backwards ("sixty … twenty-three")
# f70–85  the clock face opens as a six-leaf paper iris, the hand riding one leaf ("That's not luck.")
# f84–141 1960s Disneyland footage (footage.py --bw --twos) plays in the hole, cut on "Caribbean" (121) and "July" (137);
#         the camera creeps in
# f137–160 the card slides away; speed builds down the tunnel of holes through every band and out into P2 ("you groan")
# f160–200 the endless queue: the camera settles along the line; the ochre figure strides in on "join" (168), in line by "line" (177)
import sys, math, json, bpy
from mathutils import Vector, Matrix
sys.path.insert(0, "/Users/user/Private/miki-studio/miki-explained/tools/blender")
from paperkit import setup, render, card, glow, frame_dist, bloom
a = sys.argv[sys.argv.index("--") + 1:]; OUT = a[0]
STILLS = [int(x) for x in a[a.index("still") + 1].split(",")] if "still" in a else None
EP = "/Users/user/Private/miki-studio/miki-explained/04_episodes/_tests/EX00V7_poster/"; L = EP + "layers/"; F = EP + "footage/"
N = 200
sc = setup(N, 540 if "half" in a else 1080, 960 if "half" in a else 1920); sc.render.film_transparent = False
sc.eevee.taa_render_samples = 48
def lin(c): return tuple(((v / 255) / 12.92 if v / 255 <= 0.04045 else ((v / 255 + 0.055) / 1.055) ** 2.4) for v in c) + (1,)
INK, CREAM = lin((17, 17, 17)), lin((239, 232, 220))
world = bpy.data.worlds.new("w"); sc.world = world; world.use_nodes = True
world.node_tree.nodes["Background"].inputs[0].default_value = CREAM; world.node_tree.nodes["Background"].inputs[1].default_value = 1.0
PH, GAP, ASP = 4.0, 0.5, 1440 / 2560

def box(dir_, origin, gap=GAP):
    """A depth-band shadow box (tools/depth.py) whose back card is centred at `origin`, facing −Y; returns (bands, place)."""
    D = frame_dist(PH); bands = json.load(open(dir_ + "/bands.json")); objs = []
    for b in bands:
        k = b["band"]; d = gap * k; s = (D - d) / D
        o = card(dir_ + "/band_%d.png" % k, PH * s, loc=(origin.x, origin.y - d, origin.z), wobble=0 if k == 0 else 0.3, name=dir_[-2:] + " band %d" % k)
        glow(o, 0.92)
        if k: o.modifiers.new("t", "SOLIDIFY").thickness = 0.01
        objs.append(o)
    def place(k, fx, fy, front=0.02):            # a point on band k given as fractions of the plate (fx across, fy down)
        d = gap * k; s = (D - d) / D
        return Vector((origin.x + (fx - 0.5) * PH * ASP * s, origin.y - d - front, origin.z + (0.5 - fy) * PH * s)), s
    return objs, place, D

def flat(name, path, w, loc, emit=0.95):
    img = bpy.data.images.load(path); bpy.ops.mesh.primitive_plane_add(size=1, location=loc); o = bpy.context.object; o.name = name
    o.scale = (w, w * img.size[1] / img.size[0], 1); o.rotation_euler = (math.radians(90), 0, 0)
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; b = nt.nodes["Principled BSDF"]
    t = nt.nodes.new("ShaderNodeTexImage"); t.image = img; nt.links.new(t.outputs["Color"], b.inputs["Base Color"]); nt.links.new(t.outputs["Alpha"], b.inputs["Alpha"])
    nt.links.new(t.outputs["Color"], b.inputs["Emission Color"]); b.inputs["Emission Strength"].default_value = emit
    o.data.materials.append(m); return o, t

# ---------- P1: the tower ----------
O1 = Vector((0, 0, PH / 2)); b1, at1, D1 = box(L + "box_P1", O1)
dial = json.load(open(L + "P1_dial.json")); k = dial["band"]
C, s1 = at1(k, dial["cx"] / dial["W"], dial["cy"] / dial["H"], front=0.01)
R = dial["r"] / dial["H"] * PH * s1                                    # dial radius in world units

# the shutter: six paper leaves cut from the clean face, hinged on the rim, swinging out toward the camera (f70–84)
def disc(name, r, loc, mat, n=48, a0=0.0, a1=2 * math.pi, origin=None):
    """A flat circle (or sector a0..a1) of radius r facing −Y at loc, UVs mapping the unit square onto it; origin = pivot."""
    org = origin or loc; verts, uvs = [tuple(loc - org)], [(0.5, 0.5)]
    for j in range(n + 1):
        t = a0 + (a1 - a0) * j / n; verts.append(tuple(loc - org + Vector((r * math.cos(t), 0, r * math.sin(t))))); uvs.append((0.5 + 0.5 * math.cos(t), 0.5 + 0.5 * math.sin(t)))
    me = bpy.data.meshes.new(name); me.from_pydata(verts, [], [(0, j, j + 1) for j in range(1, n + 1)]); uv = me.uv_layers.new()
    for poly in me.polygons:
        for li, vi in zip(poly.loop_indices, poly.vertices): uv.data[li].uv = uvs[vi]
    me.materials.append(mat); ob = bpy.data.objects.new(name, me); sc.collection.objects.link(ob); ob.location = org; return ob
def matimg(name, img, emit):
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; b = nt.nodes["Principled BSDF"]; b.inputs["Roughness"].default_value = 0.9
    t = nt.nodes.new("ShaderNodeTexImage"); t.image = img; nt.links.new(t.outputs["Color"], b.inputs["Base Color"])
    nt.links.new(t.outputs["Color"], b.inputs["Emission Color"]); b.inputs["Emission Strength"].default_value = emit; return m, t
fm, _ = matimg("face", bpy.data.images.load(L + "P1_face.png"), 0.35)
leaves = []
for i in range(6):
    a0, a1 = 2 * math.pi * i / 6, 2 * math.pi * (i + 1) / 6; am = (a0 + a1) / 2
    pivot = C + Vector((R * math.cos(am), -0.002 * i, R * math.sin(am)))
    ob = disc("leaf %d" % i, R, C - Vector((0, 0.002 * i, 0)), fm, n=8, a0=a0, a1=a1, origin=pivot)
    ob.rotation_mode = "AXIS_ANGLE"; ob.rotation_axis_angle = (0, -math.sin(am), 0, math.cos(am))        # the rim tangent
    for f, deg in ((70 + i, 0), (82 + i, -170)):                                                    # − folds flat behind the plate
        ob.rotation_axis_angle[0] = math.radians(deg); ob.keyframe_insert("rotation_axis_angle", index=0, frame=f)
    leaves.append(ob)
# the hand: a black paper bar spinning backwards from "Disney's" to "twenty-three", then it rides a leaf into the tower
bpy.ops.mesh.primitive_cube_add(size=1); hand = bpy.context.object; hand.name = "hand"
hand.dimensions = (R * 0.07, 0.006, R * 0.92); bpy.ops.object.transform_apply(scale=True)
for v in hand.data.vertices: v.co.z += R * 0.42
hm = bpy.data.materials.new("hand"); hm.use_nodes = True; hm.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = INK; hand.data.materials.append(hm)
hand.location = C - Vector((0, 0.02, 0)); hand.rotation_euler = (0, math.radians(-40), 0)
for f, deg in ((1, -40), (24, -40), (60, 400), (69, 412)):
    hand.rotation_euler[1] = math.radians(deg); hand.keyframe_insert("rotation_euler", index=1, frame=f)
sc.frame_set(70); bpy.context.view_layer.update(); rel = leaves[0].matrix_world.inverted() @ hand.matrix_world   # it ends inside leaf 0
for f in range(70, 100):                                    # … and folds into the tower with it
    sc.frame_set(f); bpy.context.view_layer.update(); m = leaves[0].matrix_world @ rel
    hand.location = m.translation; hand.rotation_euler = m.to_euler("XYZ", hand.rotation_euler)
    hand.keyframe_insert("location", frame=f); hand.keyframe_insert("rotation_euler", frame=f)

# the tunnel axis: the plate's own viewpoint E0 through the dial. The hole is punched through every band, and those holes
# all line up on this ray, so the camera flies down it through the rings of every band and out the back into P2.
E0 = Vector((0, -D1, PH / 2)); AX = (C - E0).normalized()
def ray(y): return E0 + AX * ((y - E0.y) / AX.y)
# the footage card just behind the dial: three clips cut on the voice, then it slides down out of the hole (f137–148)
clips = [("crowd_bw_sq.mp4", 84, 121), ("monorail_bw_sq.mp4", 121, 137), ("crowd2_bw_sq.mp4", 137, 149)]
CARD = ray(C.y + 0.25); cards = []
for name, f0, f1 in clips:
    img = bpy.data.images.load(F + name); img.source = "MOVIE"; m, t = matimg(name, img, 1.0)
    t.image_user.frame_duration = 150; t.image_user.frame_start = f0; t.image_user.use_auto_refresh = True
    o = disc("footage " + name, 1.6 * R, CARD, m)
    for prop in ("hide_render", "hide_viewport"):
        setattr(o, prop, True); o.keyframe_insert(prop, frame=0)
        setattr(o, prop, False); o.keyframe_insert(prop, frame=f0)
        setattr(o, prop, True); o.keyframe_insert(prop, frame=f1)
    cards.append(o)
for o in cards:
    for f, dz in ((137, 0), (148, -3.4 * R)):
        o.location.z = CARD.z + dz; o.keyframe_insert("location", index=2, frame=f)
    for kp in o.animation_data.action.fcurves.find("location", index=2).keyframe_points if hasattr(o.animation_data.action, "fcurves") else []:
        kp.interpolation = "SINE"; kp.easing = "EASE_IN_OUT"                    # it slides down out of the hole
bm = bpy.data.materials.new("hole"); bm.use_nodes = True; bm.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = INK
back = disc("hole back", 1.1 * R, ray(C.y + 0.26), bm)
for prop in ("hide_render", "hide_viewport"):
    setattr(back, prop, False); back.keyframe_insert(prop, frame=0); setattr(back, prop, True); back.keyframe_insert(prop, frame=139)

# ---------- P2: the endless queue, far behind the hole ----------
PAST = ray(0.35); O2 = ray(PAST.y + frame_dist(PH) * 0.72); b2, at2, D2 = box(L + "box_P2", O2, gap=0.25)
b2[0].scale *= 1.2                                          # the far backdrop overfills so the pan to the corner never finds its edge
fj = json.load(open(L + "P2_figure.json")); x0, y0, x1, y1 = fj["bbox"]
fp, fs = at2(3, (x0 + x1) / 2 / fj["W"], (y0 + y1) / 2 / fj["H"], front=0.015)
fig, _ = flat("ochre figure", L + "P2_figure.png", (x1 - x0) / fj["H"] * PH * fs, fp, emit=0.6)
STEP = [(0, -0.30, 0, 0), (166, -0.30, 0, 0), (168, -0.26, 0.03, -6), (170, -0.20, 0, 3), (172, -0.16, 0.03, -6), (174, -0.10, 0, 3),
        (176, -0.05, 0.03, -6), (178, 0.0, 0, 2), (180, 0.0, 0, 0)]           # three strides on twos: steps off on "join", in the line by "line"
fig.rotation_mode = "XYZ"
for f, dx, dz, rock in STEP:
    fig.location = fp + Vector((dx, 0, dz)); fig.rotation_euler = (math.radians(90), math.radians(rock), 0)
    fig.keyframe_insert("location", frame=f); fig.keyframe_insert("rotation_euler", frame=f)
for fc in fig.animation_data.action.fcurves if hasattr(fig.animation_data.action, "fcurves") else []:
    for kp in fc.keyframe_points: kp.interpolation = "CONSTANT"

# ---------- camera (keyed every frame) ----------
bpy.ops.object.camera_add(); cam = bpy.context.object; sc.camera = cam; cam.data.lens = 35
cam.data.dof.use_dof = True; cam.data.dof.aperture_fstop = 4.0
def ease(u): u = max(0, min(1, u)); return u * u * (3 - 2 * u)
def pchip(ts, vs, settle=False):
    """Monotone cubic through (t, v): continuous speed, never overshoots a key (Fritsch–Carlson); settle = ease into the last key."""
    n = len(ts); h = [ts[i + 1] - ts[i] for i in range(n - 1)]; d = [(vs[i + 1] - vs[i]) / h[i] for i in range(n - 1)]
    m = [d[0]] + [0 if d[i - 1] * d[i] <= 0 else (3 * (h[i - 1] + h[i])) / ((2 * h[i] + h[i - 1]) / d[i - 1] + (h[i] + 2 * h[i - 1]) / d[i]) for i in range(1, n - 1)] + [0 if settle else d[-1]]
    def f(t):
        i = max(0, min(n - 2, next((j for j in range(n - 1) if t <= ts[j + 1]), n - 2))); u = (t - ts[i]) / h[i]
        return (2 * u ** 3 - 3 * u ** 2 + 1) * vs[i] + (u ** 3 - 2 * u ** 2 + u) * h[i] * m[i] + (-2 * u ** 3 + 3 * u ** 2) * vs[i + 1] + (u ** 3 - u ** 2) * h[i] * m[i + 1]
    return f
def spline(keys):                                           # keys: [(frame, Vector), …] → f(frame) → Vector, settling on the last
    fs = [k[0] for k in keys]; ch = [pchip(fs, [k[1][j] for k in keys], True) for j in range(3)]
    return lambda t: Vector([c(t) for c in ch])
P1_EYE, P1_T = Vector((0, -D1 * 0.9, PH / 2)), Vector((0, 0, PH / 2))
def ax(s): return C + AX * s                                # a point on the tunnel axis, s from the dial
NEAR_R = 1.7                                                # how close (in dial radii) the camera is when the iris opens
side = Vector((fp.x - O2.x, 0, fp.z - O2.z)); TW = (1.2, 0.95); DW = (152, 150)          # P2: how far the camera drifts and pans toward the figure
# f0–70: in first, up second (the frame stays inside the plate), arriving on the axis already moving
P1E = spline([(0, P1_EYE), (35, Vector((P1_EYE.x * 0.5 + ax(-NEAR_R * R).x * 0.5, P1_EYE.y + (ax(-NEAR_R * R).y - P1_EYE.y) * 0.875, (P1_EYE.z + ax(-NEAR_R * R).z) / 2))),
              (70, ax(-NEAR_R * R)), (84, ax(-1.8 * R))])
P1T = spline([(0, P1_T), (35, P1_T.lerp(C, 0.5)), (70, C), (84, C)])
# f70 on: one speed curve down the axis (speed and acceleration both continuous): ease to a creep while the footage
# plays, build through the tunnel of rings, ease to a glide in P2, settle to a stop on the last frame
def sstep(f, a, b): return ease((f - a) / (b - a))
V70 = (P1E(70.5) - P1E(69.5)).length; VC, VG = 0.0022, 0.02
def speed(f, vp):
    v = V70 + (VC - V70) * sstep(f, 70, 88)
    v += (vp - VC) * sstep(f, 135, 153); v += (VG - vp) * sstep(f, 155, 176); v += (0 - VG) * sstep(f, 176, 200)
    return v
S_P = (PAST - C).dot(AX)
def path(vp):
    s, out = -NEAR_R * R, {70: -NEAR_R * R}
    for f in range(71, 200): s += (speed(f - 0.5, vp)); out[f] = s
    return out
lo, hi = 0.01, 0.5
for _ in range(40):                                         # the peak speed that puts the camera through the back at f160
    vp = (lo + hi) / 2
    if path(vp)[160] < S_P: lo = vp
    else: hi = vp
SA = path(vp)
def EYE(f): return P1E(f) if f <= 70 else ax(SA[f]) + side * TW[0] * sstep(f, DW[0], 200)
def TGT(f): return P1T(f) if f <= 70 else O2.lerp(fp, TW[1] * sstep(f, DW[1], 198))     # O2 sits on the axis: no turn until P2
ROLL = pchip([0, 35, 70, 200], [-6, -3, 0, 0])
CARD_D = lambda e: max(0.05, (CARD - e).length)
for f in range(0, N):
    eye, tgt = EYE(f), TGT(f)
    q = (tgt - eye).to_track_quat("-Z", "Y"); cam.matrix_world = Matrix.Translation(eye) @ (q.to_matrix().to_4x4() @ Matrix.Rotation(math.radians(ROLL(f)), 4, "Z"))
    w1, w2 = ease((f - 76) / 10), ease((f - 142) / 10)       # focus eases dial → card → the queue
    cam.data.dof.focus_distance = (1 - w1) * (C - eye).length + w1 * ((1 - w2) * CARD_D(eye) + w2 * (fp - eye).length)
    cam.keyframe_insert("location", frame=f); cam.keyframe_insert("rotation_euler", frame=f); cam.data.dof.keyframe_insert("focus_distance", frame=f)
sc.view_settings.view_transform = "Standard"
render(OUT, frames=STILLS or list(range(0, N)), prefix="f")      # frame k = MASTER frame k (the word frames)

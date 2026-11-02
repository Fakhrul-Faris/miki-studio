# EX16 "Out of Turn" — one isometric ED floor, one camera, 60 fps, cut to audio/vo_timeline.json (house format).
# Bridge off (user, 2026-11-02): no shop scene, ends on Payoff -> End -> Follow, general audience.
#   blender -b --python build/episode.py -- <out_dir> preview          cheap look first -> out/preview.mp4
#   blender -b --python build/episode.py -- <out_dir> [still f,f,…] [half]
# Hero device: a reflow/resort queue. "You" (the accent figure) stands fixed near the front of the waiting line, calm,
# with a wait counter pinned above that keeps climbing. Background patients get triaged out of arrival order: a badge
# brightens over their head and they walk straight past "you" to the desk. Three arc gauges (built from tick marks,
# not a new hue — one accent only) sweep to 71.8%, 55.3% and 91.3%. A 3-bar "old system" legend fades into the 5-bar
# Malaysian Triage Scale. "You" is finally called at the loop point; the wait counter stops.
import sys, os, math, json, bpy
from mathutils import Vector
EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/"
sys.path.insert(0, EP + "../../tools/blender")
from isokit import *
A = sys.argv[sys.argv.index("--") + 1:]; OUT = A[0]
sc = setup(half="half" in A)
VT = json.load(open(EP + "audio/vo_timeline.json")); VW = VT["words"]
def w(L, i): return int(VW[L][i][1] * FPS)
N = int(math.ceil(VT["end"] * FPS)); sc.frame_start, sc.frame_end = 0, N - 1

# ---------- word frames ----------
L01, L01_71 = w("L01", 0), w("L01", 1)
L02, L02_55, L02_SORTED = w("L02", 0), w("L02", 4), w("L02", 14)
L03, L03_MINISTRY, L03_FIVE = w("L03", 0), w("L03", 19), w("L03", 25)
L04, L04_REBUILD, L04_NEW = w("L04", 0), w("L04", 1), w("L04", 15)
L05, L05_91, L05_SHARPER = w("L05", 0), w("L05", 5), w("L05", 13)
L06, L06_WORKING = w("L06", 0), w("L06", 11)
L07 = w("L07", 0)

def win(f, lo, hi): return f in (0, N - 1) or lo <= f <= hi

# ---------- the ED floor ----------
FW, FD = 16.0, 15.0           # kept short: at spin=45 a long room skews badly off-centre front-to-back
mw, mf, mp = mat("wall", WALL), mat("furniture", FURN), mat("people", PEOPLE)
box("floor", -0.6, -0.6, FW + 0.6, FD + 0.6, 0.12, mat("floor", FLOOR), z0=-0.12, bevel=0.05)
walls = [box("wall", 0, -0.08, FW, 0.08, 0.9, mw), box("wall", 0, FD - 0.08, FW, FD + 0.08, 0.9, mw),
         box("wall", -0.08, 0, 0.08, FD, 0.9, mw), box("wall", FW - 0.08, 0, FW + 0.08, 0.9, 0.9, mw)]
DESK = Vector((8.0, 2.5, 0))
box("desk", DESK.x - 1.3, DESK.y - 0.5, DESK.x + 1.3, DESK.y + 0.5, 0.95, mf)
box("desk sign", DESK.x - 0.9, DESK.y + 0.52, DESK.x + 0.9, DESK.y + 0.62, 0.55, mw, z0=1.05, bevel=0.02)
for bx in (3.2, 12.8):
    for by in (12.0, 13.0):
        box("bench", bx - 0.7, by - 0.28, bx + 0.7, by + 0.28, 0.42, mf)

# ---------- queue ----------
YOU_POS = Vector((8.0, 4.4, 0))
BG_Y = [5.6, 6.6, 7.6, 8.6, 9.6, 10.6, 11.6, 12.6]
BG_POS = [Vector((8.0, y, 0)) for y in BG_Y]
you = person("you", PEOPLE)                 # plain grey like everyone — a special colour would read as "the chosen one"
bg = [person("bg %d" % i, PEOPLE, 0.95) for i in range(len(BG_POS))]
for o, p in zip([you] + bg, [YOU_POS] + BG_POS):
    o.location = p; o.rotation_euler[2] = 0
# severity badges: a small flat disc above each head, colour keyable (grey -> accent), hidden until triaged
bm = colmat("badge", emit=0.6)
def badge(owner, at):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.2, segments=20, ring_count=12); d = bpy.context.object; d.name = "badge"
    d.data.materials.append(bm); d.parent = owner; d.location = (0, 0, 1.15)
    d.color = PEOPLE; d.scale = (0.001,) * 3; return d
you_badge = badge(you, YOU_POS)
bg_badge = [badge(o, p) for o, p in zip(bg, BG_POS)]

# triage events: (patient index, trigger frame) — a background patient is called out of arrival order
EVENTS = [(1, 350), (3, 680)]   # two clear reorders, each timed inside an actual camera hold (see rig.keys below) —
# four crammed across a continuously-drifting camera meant most of them played off-screen (found by comparing
# animation data against render output, then checking world_to_camera_view at the moment each should land)
YOU_CALL = L06

def triage_motion(o, badge_o, home, f0, walk0, gone0, f):
    """Dim badge brightens at f0 (+16), the figure walks from home to the desk over walk0..walk0+70, fades gone0..gone0+20.
    The target sits on the queue side of the desk (y+0.65, not behind it) — behind it, the desk box occludes the figure
    from camera at the exact moment it arrives (found by comparing animation data against render output, EX16)."""
    bk = span(f, f0, f0 + 16)
    badge_o.color = mix_col(PEOPLE, ACCENT, bk); badge_o.scale = (0.14 * bk,) * 3
    u = span(f, walk0, walk0 + 70)
    pos = home.lerp(DESK + Vector((0, 0.65, 0)), ease(u))
    g = 1 - span(f, gone0, gone0 + 20)
    o.location = (pos.x, pos.y, 0.03 * abs(math.sin(u * math.pi * 3)) if 0 < u < 1 else 0)
    o.scale = (max(0.0, g),) * 3
    if u > 0.02:
        d = (DESK + Vector((0, 0.65, 0))) - home
        o.rotation_euler[2] = yaw(d)
    key(o, f, "location", "rotation_euler", "scale"); key(badge_o, f, "color", "scale")

# ---------- 3 arc gauges: a ring of ticks, dim grey -> accent as they fill (one accent only, no new hue) ----------
def gauge(name, center, radius, pct, f0, f1, n=22, a0=200, a1=-20):
    """a0/a1 in degrees, swept clockwise from a0 to a1 (a speedometer arc); pct in 0..100."""
    ticks = []; gm = colmat(name, emit=0.45)
    for i in range(n):
        t = math.radians(a0 + (a1 - a0) * i / (n - 1))
        pos = center + Vector((radius * math.cos(t), 0, radius * math.sin(t)))
        bpy.ops.mesh.primitive_cube_add(size=1, location=(pos.x, center.y, pos.z)); o = bpy.context.object; o.name = name + " tick"
        o.scale = (0.1, 0.03, 0.16); o.rotation_euler = (0, -t, 0); o.data.materials.append(gm); o.color = WALL
        ticks.append(o)
    filled = round(n * pct / 100)
    out = []
    for i, o in enumerate(ticks):
        on = i < filled
        f_i = f0 + (f1 - f0) * (i / max(1, filled - 1)) if on and filled > 1 else f0
        def at(f, f_i=f_i, on=on):             # default args bind per-tick now, not at call time (late-binding bug)
            k = span(f, f_i, f_i + 10) if on else 0.0
            return mix_col(WALL, ACCENT, k)
        out.append((o, at))                    # bpy Objects don't accept arbitrary Python attrs, so pair instead
    return out
G1 = gauge("gauge 718", Vector((3.6, 1.3, 1.25)), 0.85, 71.8, L01, L01 + 70)
G2 = gauge("gauge 553", Vector((5.6, 1.3, 1.05)), 0.6, 55.3, L02_55, L02_55 + 55, n=18)
G3 = gauge("gauge 913", Vector((1.8, 1.3, 0.95)), 0.55, 91.3, L05_91, L05_91 + 55, n=18)
for gset in (G2, G3):
    for o, _ in gset:
        for prop in ("hide_render", "hide_viewport"):
            setattr(o, prop, True); o.keyframe_insert(prop, frame=0)
G2_SHOW, G3_SHOW = L02_55 - 8, L05_91 - 8

# ---------- the 5-level legend (fades in over a 3-bar ghost of the old system) ----------
LEG = Vector((12.4, 2.6, 0))
old_bars = [box("old bar %d" % i, LEG.x - 0.9 + i * 0.7, LEG.y, LEG.x - 0.3 + i * 0.7, LEG.y + 0.55, h, mat("old bar", WALL), bevel=0.02)
            for i, h in enumerate((0.5, 0.9, 1.3))]
new_bars = []
for i in range(5):
    h = 1.5 - i * 0.26
    o = box("level %d" % i, LEG.x - 1.1 + i * 0.48, LEG.y, LEG.x - 0.68 + i * 0.48, LEG.y + 0.42, h, colmat("level %d" % i, emit=0.35))
    o.color = mix_col(PEOPLE, ACCENT, 1 - i / 4); new_bars.append((o, h))
for o, h in new_bars:
    for prop in ("hide_render", "hide_viewport"):
        setattr(o, prop, True); o.keyframe_insert(prop, frame=0)

# ---------- camera ----------
rig = Rig()
FLOOR_C = Vector((6.3, 8.0, 0)); G1_C = Vector((3.6, 1.3, 1.1)); DESK_C = Vector((8.0, 3.7, 0.6))   # wide enough to hold the desk and the first few queue slots together
LEGEND_C = LEG + Vector((-0.3, 0.3, 0.6)); GAUGES_C = Vector((3.2, 1.3, 1.0))
rig.keys([
    (-40, FLOOR_C, 0, 0, 20), (0, G1_C, 54.7, 45, 5.2), (85, G1_C, 54.7, 45, 5.0),
    (270, FLOOR_C, 54.7, 45, 13.5), (L02_SORTED - 20, FLOOR_C, 54.7, 45, 13),        # hold wide through EVENT_A
    (L02_SORTED, DESK_C, 54.7, 45, 11.5), (820, DESK_C, 54.7, 45, 11.3),             # hold on the desk through EVENT_B
    (L03_MINISTRY, LEGEND_C, 54.7, 45, 8.5), (L04_REBUILD, LEGEND_C, 54.7, 48, 8.0),
    (L05_91, GAUGES_C, 54.7, 45, 15), (L05_SHARPER + 40, GAUGES_C, 54.7, 42, 15.5),
    (L06, FLOOR_C, 54.7, 45, 13.5), (L06_WORKING + 30, FLOOR_C, 30, 20, 20),
    (L07 - 10, FLOOR_C, 0, 0, 20), (N - 1, FLOOR_C, 0, 0, 20)])

# ---------- bake ----------
WAIT_START = 60   # "you"'s wait clock starts near frame 0
for f in range(N):
    rig.set(f)
    for i, (idx, f0) in enumerate(EVENTS):
        if win(f, f0 - 5, f0 + 100):
            triage_motion(bg[idx], bg_badge[idx], BG_POS[idx], f0, f0 + 10, f0 + 85, f)
    # you: fixed, badge stays dim until the final call, then walks to the desk like the others
    if f < YOU_CALL:
        you.location = YOU_POS; you.rotation_euler[2] = 0; you.scale = (1, 1, 1)
        you_badge.color = PEOPLE; you_badge.scale = (0.1,) * 3
        key(you, f, "location", "rotation_euler", "scale"); key(you_badge, f, "color", "scale")
    else:
        triage_motion(you, you_badge, YOU_POS, YOU_CALL, YOU_CALL + 10, YOU_CALL + 90, f)
    anchor("you counter", f, YOU_POS + Vector((0, 0, 1.55)))
    # gauges: tick colours (only while visible, cheap)
    if win(f, L01 - 5, L01 + 90):
        for o, at in G1: o.color = at(f); key(o, f, "color")
    if win(f, G2_SHOW, L02_55 + 70):
        for o, at in G2:
            for prop in ("hide_render", "hide_viewport"): setattr(o, prop, False); o.keyframe_insert(prop, frame=f)
            o.color = at(f); key(o, f, "color")
    if win(f, G3_SHOW, L05_91 + 70):
        for o, at in G3:
            for prop in ("hide_render", "hide_viewport"): setattr(o, prop, False); o.keyframe_insert(prop, frame=f)
            o.color = at(f); key(o, f, "color")
    anchor("gauge 718", f, Vector((3.6, 1.3 - 0.4, 1.25)))
    anchor("gauge 553", f, Vector((5.6, 1.3 - 0.4, 1.05)))
    anchor("gauge 913", f, Vector((1.8, 1.3 - 0.4, 0.95)))
    # legend: the 3-bar ghost fades as the 5-bar scale fades in, around "rebuild it"
    if win(f, L04_REBUILD - 30, L04_NEW + 40):
        ok = 1 - span(f, L04_REBUILD, L04_REBUILD + 30)
        for o in old_bars: o.scale = (ok, ok, ok); key(o, f, "scale")
        nk = span(f, L04_REBUILD + 10, L04_REBUILD + 45)
        for o, h in new_bars:
            for prop in ("hide_render", "hide_viewport"): setattr(o, prop, nk <= 0); o.keyframe_insert(prop, frame=f)
            o.scale = (1, 1, max(0.001, nk)); o.location.z = h * nk / 2; key(o, f, "scale", "location")
    elif f < L04_REBUILD - 30:
        for o in old_bars: key(o, f, "scale")

def flat_all():
    gauge_objs = [o for o, _ in G1] + [o for o, _ in G2] + [o for o, _ in G3]
    objs = [rig.pivot, rig.cam.data, you, you_badge] + bg + bg_badge + gauge_objs + old_bars + [o for o, _ in new_bars]
    for o in objs:
        ad = getattr(o, "animation_data", None)
        if ad and ad.action and hasattr(ad.action, "fcurves"):
            for fc in ad.action.fcurves:
                if not fc.data_path.startswith("hide"):
                    for kp in fc.keyframe_points: kp.interpolation = "LINEAR"
flat_all()

finish(EP, N, OUT, A)

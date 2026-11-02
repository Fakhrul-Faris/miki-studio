# EX16 "Out of Turn" v2 — remake (user, 2026-11-02: "too simple, similar to previous episode… push the boundaries").
# What v1 (build/episode_v1.py) broke, and v2 fixes:
#   no number was felt          -> 100 beds in a cutaway tower; 71.8% = 72 beds light green (the scale anchor)
#   no dominant hero object     -> the tower is the hero; the triage sorter is the mechanism at its foot
#   flat neutral light          -> night: dark sky, warm ceiling strips inside, green bed lights that bloom
#   "fall through the cracks"   -> literal: the old 3-lane sorter has gaps, a patient drops through into the dark
#   labels floating off objects -> labels pinned to the tower, the lanes, the crack and the clinic
# One continuous camera, 60 fps, Bridge off. Starts tight on one bed; ends on a slow drift over the lit campus.
#   blender -b --python build/episode.py -- <out_dir> preview | anchors | still f,f,… [half] | (full render)
import sys, os, math, json, random, bpy
from mathutils import Vector
EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/"
sys.path.insert(0, EP + "../../tools/blender")
from isokit import *
A = sys.argv[sys.argv.index("--") + 1:]; OUT = A[0]
sc = setup(half="half" in A)
VT = json.load(open(EP + "audio/vo_timeline.json")); VW = VT["words"]
def w(L, i): return int(VW[L][i][1] * FPS)
N = int(math.ceil(VT["end"] * FPS)); sc.frame_start, sc.frame_end = 0, N - 1

# ---------- night: low sun, dim ambient, bloom on the practicals ----------
[o for o in bpy.data.objects if o.type == "LIGHT"][0].data.energy = 1.1
[n for n in sc.world.node_tree.nodes if n.type == "BACKGROUND"][0].inputs[0].default_value = (0.10, 0.10, 0.13, 1)
def bloom(strength=0.35, threshold=0.9, size=0.6):
    tree = bpy.data.node_groups.new("bloom", "CompositorNodeTree"); sc.compositing_node_group = tree
    tree.interface.new_socket("Image", in_out="OUTPUT", socket_type="NodeSocketColor")
    rl = tree.nodes.new("CompositorNodeRLayers"); gl = tree.nodes.new("CompositorNodeGlare"); out = tree.nodes.new("NodeGroupOutput")
    gl.inputs["Type"].default_value = "Bloom"; gl.inputs["Threshold"].default_value = threshold
    gl.inputs["Strength"].default_value = strength; gl.inputs["Size"].default_value = size
    tree.links.new(rl.outputs["Image"], gl.inputs["Image"]); tree.links.new(gl.outputs["Image"], out.inputs["Image"])
    sc.render.use_compositing = True
bloom()

# ---------- word frames ----------
L01, L01_HOURS = w("L01", 0), w("L01", 16)
L02, L02_55, L02_SORTED = w("L02", 0), w("L02", 4), w("L02", 14)
L03, L03_ROUTINE = w("L03", 0), w("L03", 30)
L04, L04_OLD, L04_FALL, L04_CRACKS, L04_NEW, L04_FIRST = (w("L04", i) for i in (0, 6, 11, 14, 15, 20))
L05, L05_91, L05_SHARPER = w("L05", 0), w("L05", 5), w("L05", 13)
L06, L07 = w("L06", 0), w("L07", 0)
def win(f, lo, hi): return f in (0, N - 1) or lo <= f <= hi

mw, mf, mp, mfl = mat("wall", WALL), mat("furniture", FURN), mat("people", PEOPLE), mat("floor", FLOOR)
WARMI = mat("warm strip", WARM, emit=2.2)

# ---------- the hero: a 10-floor cutaway tower, 100 beds (open on the two faces the camera sees) ----------
FLOORS, NB, FH = 10, 10, 1.5
D = 1.95                                                    # shallow floors: a near-level camera sees each one's full depth
def zf(k): return 0.25 + k * FH
box("tower ground", -1.0, -0.8, 11.0, D + 0.8, 0.25, mfl, z0=0.0, bevel=0.03)
box("back wall", -0.2, D - 0.2, 10.2, D, zf(FLOORS) + 0.2, mw, z0=0.0, bevel=0.02)
box("left wall", -0.2, -0.3, 0.0, D, zf(FLOORS) + 0.2, mw, z0=0.0, bevel=0.02)
box("roof", -0.25, -0.35, 10.25, D + 0.05, 0.18, mw, z0=zf(FLOORS), bevel=0.03)
for k in range(FLOORS):
    box("slab", -0.15, -0.3, 10.15, D - 0.1, 0.1, mw, z0=zf(k) - 0.1, bevel=0.01)
    box("ceiling strip", 0.3, 0.7, 9.7, 1.0, 0.04, WARMI, z0=zf(k) + FH - 0.18, bevel=0.0)
for x in (0.0, 5.0, 10.0):
    box("column", x - 0.12, -0.32, x + 0.12, -0.08, zf(FLOORS), mw, z0=0.0, bevel=0.01)
bedlight_m = colmat("bed light", emit=3.0)
BEDS = []
for k in range(FLOORS):
    for i in range(NB):
        x = 0.5 + i; z = zf(k)
        box("bed", x - 0.3, 0.3, x + 0.3, 1.55, 0.32, mf, z0=z, bevel=0.04)
        box("pillow", x - 0.24, 1.25, x + 0.24, 1.5, 0.42, mp, z0=z, bevel=0.04)
        bl = box("blanket", x - 0.31, 0.28, x + 0.31, 1.15, 0.06, bedlight_m, z0=z + 0.3, bevel=0.03); bl.color = WALL
        lt = box("bed light", x - 0.24, D - 0.27, x + 0.24, D - 0.21, 0.22, bedlight_m, z0=z + 0.85, bevel=0.0); lt.color = WALL
        BEDS.append((lt, bl))
rnd = random.Random(16)
ORDER = list(range(100)); rnd.shuffle(ORDER)
B0 = 5 * NB + 7; ORDER.remove(B0); ORDER.insert(0, B0)       # frame 0 sits on this bed; it lights first
BED0 = Vector((7.5, 0.9, zf(5) + 0.5))
def bed_on_frame(rank):
    if rank == 0: return L01 + 4
    return int(L01 + 60 + (L01_HOURS - L01 - 60) * (rank / 71) ** 0.85)
def bed_state(rank, f):
    """72 lit by "hours"; ranks 55-71 go dark on "55.3" (last year), back on "sorted first"."""
    if rank >= 72: return 0.0
    on = span(f, bed_on_frame(rank), bed_on_frame(rank) + 10)
    if rank >= 55:
        off0 = L02_55 + (71 - rank) * 2; on0 = L02_SORTED + (rank - 55) * 3
        on = on * (1 - span(f, off0, off0 + 10)) if f < on0 else max(on * (1 - span(f, off0, off0 + 10)), span(f, on0, on0 + 10))
    return on

# ---------- the triage sorter: a floating plaza in front of the tower (dark void below) ----------
PLAZA = mat("plaza", hexc("#2E2E35"))              # lighter than the void, so a missing tile reads as a hole
TILES = {}
for tx in range(-1, 11):
    for ty in range(-16, -1):
        TILES[(tx, ty)] = box("tile", tx + 0.03, ty + 0.03, tx + 0.97, ty + 0.97, 0.25, PLAZA, z0=-0.25, bevel=0.03)
CRACK = [(6, -8), (6, -7), (7, -8)]
ENTRY = Path([(5.5, -16.6), (5.5, -11.5)], r=0.5)
LANES_PTS = [
    [(5.5, -11.5), (5.5, -1.0)],
    [(5.5, -11.5), (3.5, -10.5), (3.5, -1.0)],
    [(5.5, -11.5), (7.5, -10.5), (7.5, -1.0)],
    [(5.5, -11.5), (9.5, -11.5), (9.5, -6.5), (8.6, -6.5), (8.6, -4.0), (9.5, -4.0), (9.5, -1.0)],
    [(5.5, -11.5), (0.5, -11.5), (0.5, -14.5), (1.6, -14.5), (1.6, -6.0), (0.5, -6.0), (0.5, -3.5), (1.6, -3.5), (1.6, -1.0)]]
LANES = [Path(p, r=0.45) for p in LANES_PTS]
LANE_COL = [ACCENT, hexc("#9A9AA4"), hexc("#7A7A84"), hexc("#5E5E68"), hexc("#4A4A53")]
lane_objs = [pth.curve("lane %d" % (li + 1), mat("lane %d" % li, col, emit=0.9 if li == 0 else 0.15), depth=0.09, z=0.03, drawn=0.0)
             for li, (pth, col) in enumerate(zip(LANES, LANE_COL))]
OLD_PTS = [[(5.5, -11.5), (4.0, -10.5), (4.0, -1.0)], [(5.5, -11.5), (6.5, -10.0), (6.5, -1.0)], [(5.5, -11.5), (9.0, -11.5), (9.0, -1.0)]]
old_objs = [Path(p, r=0.45).curve("old lane %d" % i, mat("old lane", hexc("#55555E"), emit=0.1), depth=0.09, z=0.03, drawn=0.0)
            for i, p in enumerate(OLD_PTS)]
entry_o = ENTRY.curve("entry", mat("entry", hexc("#55555E"), emit=0.1), depth=0.09, z=0.03, drawn=0.0)
for li in range(5):
    x = LANES_PTS[li][-1][0]
    box("door", x - 0.38, -0.95, x + 0.38, -0.75, 0.9, mat("door glow", WARM, emit=1.2), z0=0.0, bevel=0.01)

badge_m = colmat("badge", emit=1.4)
def walker(name):
    p = person(name, PEOPLE, 0.8); p.scale = (0, 0, 0)
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.17, segments=20, ring_count=12); b = bpy.context.object
    b.data.materials.append(badge_m); b.parent = p; b.location = (0, 0, 1.05); b.color = PEOPLE; b.scale = (0, 0, 0)
    return p, b
SEQ = [2, 4, 0, 3, 1, 4, 2, 0, 3, 4, 1, 2]
STREAM = [walker("patient %d" % n) + (lane, L03 - 20 + n * 34) for n, lane in enumerate(SEQ)]
LANE_SPEED = [0.13, 0.09, 0.09, 0.085, 0.085]
faller = person("faller", PEOPLE, 0.8); faller.scale = (0, 0, 0)
caught, cb = walker("caught")
bpy.ops.object.light_add(type="SPOT", location=(6.5, -7.6, 7.0)); spot = bpy.context.object
spot.data.energy = 0.0; spot.data.spot_size = math.radians(32); spot.data.spot_blend = 0.6; spot.data.color = (0.85, 0.9, 1.0)
FALL_PATH = Path([(5.5, -13.0), (5.5, -11.5), (6.5, -10.0), (6.5, -7.6)], r=0.4)

# ---------- the small clinic (L05): one floor, roof off, 100 small beds, 91 light ----------
CX0, CY0 = 14.0, -9.0
box("clinic floor", CX0 - 0.4, CY0 - 0.4, CX0 + 7.4, CY0 + 7.4, 0.2, mfl, z0=-0.2, bevel=0.03)
for (a, b_, c_, d_) in ((CX0 - 0.4, CY0 - 0.4, CX0 + 7.4, CY0 - 0.25), (CX0 - 0.4, CY0 + 7.25, CX0 + 7.4, CY0 + 7.4),
                        (CX0 - 0.4, CY0 - 0.4, CX0 - 0.25, CY0 + 7.4), (CX0 + 7.25, CY0 - 0.4, CX0 + 7.4, CY0 + 7.4)):
    box("clinic wall", a, b_, c_, d_, 0.7, mw, z0=0.0, bevel=0.01)
cl_m = colmat("clinic light", emit=3.0)
CLIN = []
for r in range(10):
    for c in range(10):
        x, y = CX0 + 0.35 + c * 0.7, CY0 + 0.35 + r * 0.7
        box("mini bed", x - 0.18, y - 0.25, x + 0.18, y + 0.25, 0.14, mf, z0=0.0, bevel=0.03)
        d = box("mini light", x - 0.1, y + 0.1, x + 0.1, y + 0.22, 0.05, cl_m, z0=0.14, bevel=0.0); d.color = WALL
        CLIN.append(d)
CORD = list(range(100)); rnd.shuffle(CORD)
CLINIC_C = Vector((CX0 + 3.5, CY0 + 3.5, 0.2))

# ---------- camera ----------
rig = Rig()
TOWER_C = Vector((5.0, 0.8, 7.8)); SORT_C = Vector((5.0, -8.5, 0.0)); CRACK_C = Vector((6.3, -8.2, 0.0))
CAMPUS_C = Vector((9.0, -4.0, 3.0))
rig.keys([
    (-40, BED0, 74, 35, 2.4), (0, BED0, 74, 35, 2.4), (70, BED0, 74, 36, 2.7),
    (L01_HOURS, TOWER_C, 76, 30, 18.5), (L02_SORTED - 10, TOWER_C + Vector((0.6, 0, 0.4)), 72, 58, 17.5),   # slow orbit through 72 -> 55 -> 72
    (L03 + 40, SORT_C + Vector((0, -2.0, 0)), 50, 28, 14), (L03_ROUTINE, SORT_C + Vector((0.5, 1.5, 0)), 58, 62, 15.5),   # orbit + drift up the lanes
    (L04_OLD, CRACK_C, 58, 45, 6.8), (L04_CRACKS + 40, CRACK_C, 58, 45, 6.3),
    (L04_FIRST + 30, SORT_C, 54.7, 45, 14),
    (L05_91, CLINIC_C, 54.7, 45, 10.5), (L05_SHARPER + 40, CLINIC_C, 54.7, 49, 11),
    (L06 + 60, CAMPUS_C, 46, 45, 30), (N + 40, CAMPUS_C + Vector((0.5, 0.5, 0)), 46, 50, 32)])   # the follow card sits on a slow campus drift (v2's push back into the bed whipped)

# ---------- bake ----------
for f in range(N):
    rig.set(f); bpy.context.view_layer.update()
    if win(f, L01 - 2, L02_SORTED + 90):
        for rank, bi in enumerate(ORDER):
            lt, bl = BEDS[bi]; s = bed_state(rank, f)
            for o in (lt, bl): o.color = mix_col(WALL, ACCENT, s); key(o, f, "color")
    anchor("tower top", f, Vector((5.0, 0.8, zf(FLOORS) + 1.0)))
    old_k = span(f, L04_OLD - 20, L04_OLD + 10) * (1 - span(f, L04_NEW, L04_NEW + 25))
    new_k = span(f, L03 - 10, L03 + 50) * (1 - span(f, L04_OLD - 20, L04_OLD)) + span(f, L04_NEW + 10, L04_NEW + 45)
    if win(f, L03 - 15, L05 + 30):
        entry_o.data.bevel_factor_end = span(f, L03 - 15, L03 + 20); entry_o.data.keyframe_insert("bevel_factor_end", frame=f)
        for o in lane_objs:
            o.data.bevel_factor_end = min(1.0, new_k); o.data.keyframe_insert("bevel_factor_end", frame=f)
        for o in old_objs:
            o.data.bevel_factor_end = old_k; o.data.keyframe_insert("bevel_factor_end", frame=f)
        for j, c in enumerate(CRACK):
            g = span(f, L04_OLD + j * 6, L04_OLD + j * 6 + 30) * (1 - span(f, L04_NEW + 5, L04_NEW + 35))
            t = TILES[c]; t.location.z = -7.0 * g * g; t.rotation_euler = (0.7 * g, 0.4 * g * (j - 1), 0)
            t.scale = (1 - 0.3 * g,) * 3; key(t, f, "location", "rotation_euler", "scale")
    anchor("lane 1", f, Vector((5.5, -6.0, 0.3)))           # mid-lane points: the lane starts sit outside the sorter framing
    anchor("lane 5", f, Vector((1.6, -9.0, 0.3)))
    if win(f, L03 - 25, L04_OLD + 60):
        for p, b, lane, t0 in STREAM:
            if f < t0:
                p.scale = (0, 0, 0); key(p, f, "scale"); continue
            s = (f - t0) * 0.09; vis = span(f, t0, t0 + 10); bk = 0.0
            if s < ENTRY.LEN:
                q, d = ENTRY.at(s)
            else:
                s2 = (s - ENTRY.LEN) * LANE_SPEED[lane] / 0.09
                q, d = LANES[lane].at(s2); bk = span(s2, 0.0, 0.8)
                if s2 >= LANES[lane].LEN: vis *= 1 - span(s2, LANES[lane].LEN, LANES[lane].LEN + 0.6)
            vis *= 1 - span(f, L04_OLD - 30, L04_OLD)
            p.location = (q.x, q.y, 0.03 * abs(math.sin(s * 5.7))); p.rotation_euler[2] = yaw(d); p.scale = (vis,) * 3
            b.color = mix_col(PEOPLE, LANE_COL[lane], bk); b.scale = (0.9 * bk,) * 3
            key(p, f, "location", "rotation_euler", "scale"); key(b, f, "color", "scale")
    if win(f, L04_OLD - 10, L04_CRACKS + 80):
        s = (f - (L04_OLD - 10)) * 0.07; q, d = FALL_PATH.at(s)
        drop = span(f, L04_FALL, L04_CRACKS + 30)
        faller.location = (q.x, q.y, -9.0 * drop * drop); faller.rotation_euler = (0.9 * drop, 0.0, yaw(d) + 2.0 * drop)
        faller.scale = (span(f, L04_OLD - 10, L04_OLD + 5) * (1 - span(f, L04_CRACKS + 50, L04_CRACKS + 70)),) * 3
        key(faller, f, "location", "rotation_euler", "scale")
    if win(f, L04_NEW - 10, L05 + 40):
        s = (f - (L04_NEW - 10)) * 0.07
        if s < 1.5:
            q, d = ENTRY.at(ENTRY.LEN - 1.5 + s); bk = 0.0
        else:
            s2 = (s - 1.5) * 1.2; q, d = LANES[1].at(s2); bk = span(s2, 0.0, 0.6)
        caught.location = (q.x, q.y, 0.03 * abs(math.sin(s * 5.7))); caught.rotation_euler[2] = yaw(d)
        caught.scale = (span(f, L04_NEW - 10, L04_NEW + 5) * (1 - span(f, L05 + 10, L05 + 35)),) * 3
        cb.color = mix_col(PEOPLE, LANE_COL[1], bk); cb.scale = (0.9 * bk,) * 3
        key(caught, f, "location", "rotation_euler", "scale"); key(cb, f, "color", "scale")
    anchor("crack", f, Vector((6.5, -7.5, 0.4)))
    if win(f, L04_OLD - 30, L04_FIRST + 60):                # a cold pool of light on the crack while it is open
        spot.data.energy = 900.0 * span(f, L04_OLD - 20, L04_OLD + 10) * (1 - span(f, L04_NEW + 20, L04_FIRST + 40))
        spot.data.keyframe_insert("energy", frame=f)
    if win(f, L05_91 - 5, L05_91 + 110):
        for rank, ci in enumerate(CORD):
            on = span(f, L05_91 + rank * 0.9, L05_91 + rank * 0.9 + 8) if rank < 91 else 0.0
            CLIN[ci].color = mix_col(WALL, ACCENT, on); key(CLIN[ci], f, "color")
    anchor("clinic top", f, CLINIC_C + Vector((0, 0, 1.6)))

for o in bpy.data.objects:
    ad = o.animation_data
    if ad and ad.action and hasattr(ad.action, "fcurves"):
        for fc in ad.action.fcurves:
            if not fc.data_path.startswith("hide"):
                for kp in fc.keyframe_points: kp.interpolation = "LINEAR"
finish(EP, N, OUT, A)

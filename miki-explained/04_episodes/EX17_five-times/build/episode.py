# EX17 "Five Times" — built on the EX16 v2 base (night, warm practicals, green accent, bloom, one continuous camera,
# numbers made physical). User 2026-11-02: "ex16 is the new base… push more boundaries". New past EX16:
#   walk cycles (legs and arms swing, not sliding pins) · world haze so the spots throw cones · a scale journey
#   (crowd -> geological cutaway -> two roads of customers -> back to the monument) · the ground opening like a cake cut
#   and the core under the monument crumbling away in chunks while the 5× stays in mid-air (the surprise).
#   blender -b --python build/episode.py -- <out_dir> preview | anchors | still f,f,… [half] | (full render)
import sys, os, math, json, random, bpy
from mathutils import Vector, Matrix
EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/"
sys.path.insert(0, EP + "../../tools/blender")
from isokit import *
A = sys.argv[sys.argv.index("--") + 1:]; OUT = A[0]
sc = setup(half="half" in A)
VT = json.load(open(EP + "audio/vo_timeline.json")); VW = VT["words"]
def w(L, i): return int(VW[L][i][1] * FPS)
N = int(math.ceil(VT["end"] * FPS)); sc.frame_start, sc.frame_end = 0, N - 1
FONT = bpy.data.fonts.load(os.path.expanduser("~/Library/Fonts/InterDisplay-Black.ttf"))

# ---------- night (EX16 rig) + haze ----------
[o for o in bpy.data.objects if o.type == "LIGHT"][0].data.energy = 1.1
wn = sc.world.node_tree
[n for n in wn.nodes if n.type == "BACKGROUND"][0].inputs[0].default_value = (0.10, 0.10, 0.13, 1)
try: sc.eevee.volumetric_end = 200; sc.eevee.volumetric_tile_size = "4"
except AttributeError as e: print("volumetric settings:", e)
def bloom(strength=0.35, threshold=0.9, size=0.6):
    tree = bpy.data.node_groups.new("bloom", "CompositorNodeTree"); sc.compositing_node_group = tree
    tree.interface.new_socket("Image", in_out="OUTPUT", socket_type="NodeSocketColor")
    rl = tree.nodes.new("CompositorNodeRLayers"); gl = tree.nodes.new("CompositorNodeGlare"); out = tree.nodes.new("NodeGroupOutput")
    gl.inputs["Type"].default_value = "Bloom"; gl.inputs["Threshold"].default_value = threshold
    gl.inputs["Strength"].default_value = strength; gl.inputs["Size"].default_value = size
    tree.links.new(rl.outputs["Image"], gl.inputs["Image"]); tree.links.new(gl.outputs["Image"], out.inputs["Image"])
    sc.render.use_compositing = True
bloom()
def spot(loc, aim, energy, size=35, col=(1, 1, 1)):
    bpy.ops.object.light_add(type="SPOT", location=loc); s = bpy.context.object
    s.rotation_euler = (Vector(aim) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
    s.data.energy = energy; s.data.spot_size = math.radians(size); s.data.spot_blend = 0.7; s.data.color = col; return s

# ---------- word frames ----------
L01, L01_NOBODY = w("L01", 0), w("L01", 12)
L02, L02_80S, L02_RULE, L02_1990, L02_PRINTED, L02_NO = (w("L02", i) for i in (0, 10, 11, 15, 19, 21))
L03, L03_GREW, L03_2014, L03_25, L03_STILL = (w("L03", i) for i in (0, 2, 4, 11, 13))
L04, L04_TIME = w("L04", 0), w("L04", 10)
L05, L05_CARD, L05_51, L05_LEFT, L05_21, L05_HALVE, L05_134, L05_300 = (w("L05", i) for i in (0, 2, 5, 12, 18, 19, 31, 33))
L06, L06_STUDY, L07 = w("L06", 0), w("L06", 8), w("L07", 0)
def win(f, lo, hi): return f in (0, N - 1) or lo <= f <= hi

mw, mf, mp = mat("wall", WALL), mat("furniture", FURN), mat("people", PEOPLE)
PLAZA = mat("plaza", hexc("#2E2E35")); WARMI = mat("warm strip", WARM, emit=2.2); ACC = mat("accent", ACCENT, emit=0.6)
STRATA = [mat("s2014", hexc("#56535B")), mat("s1990", hexc("#413E46")), mat("s1980", hexc("#2D2B31"))]
ZL = [0.0, -0.3, -1.9, -3.5, -5.1]                       # top tile layer, then 2014 / 1990 / late 1980s strata

def text3d(name, s, size, m, extrude=0.14):
    cu = bpy.data.curves.new(name, "FONT"); cu.body = s; cu.font = FONT; cu.size = size; cu.extrude = extrude
    cu.align_x = "CENTER"; cu.align_y = "BOTTOM"
    o = bpy.data.objects.new(name, cu); sc.collection.objects.link(o); o.rotation_euler = (math.pi / 2, 0, 0)
    o.data.materials.append(m); return o

# ---------- figures with a walk cycle ----------
def limb(name, r, d, m, loc, parent):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=d, vertices=16, location=(0, 0, 0)); o = bpy.context.object; o.name = name
    o.data.transform(Matrix.Translation((0, 0, -d / 2)))      # origin at the top: it swings from the hip / shoulder
    bv = o.modifiers.new("b", "BEVEL"); bv.width = r * 0.8; bv.segments = 3
    o.data.materials.append(m); o.parent = parent; o.location = loc; return o
class Fig:
    """Head, torso, two legs and two arms under a root (moves/turns) and a lift (raised by the coin stack)."""
    def __init__(self, name, m=mp, h=0.8):
        self.root = bpy.data.objects.new(name, None); sc.collection.objects.link(self.root)
        self.lift = bpy.data.objects.new(name + " lift", None); sc.collection.objects.link(self.lift); self.lift.parent = self.root
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.15 * h, location=(0, 0, 0.9 * h), segments=24, ring_count=12)
        hd = bpy.context.object; hd.data.materials.append(m); hd.parent = self.lift
        bpy.ops.mesh.primitive_cylinder_add(radius=0.17 * h, depth=0.36 * h, location=(0, 0, 0.6 * h), vertices=24)
        tb = bpy.context.object; tb.data.materials.append(m); tb.parent = self.lift
        bv = tb.modifiers.new("b", "BEVEL"); bv.width = 0.07 * h; bv.segments = 4
        sw = tb.modifiers.new("s", "SIMPLE_DEFORM"); sw.deform_method = "TAPER"; sw.factor = 0.3; sw.deform_axis = "Z"
        self.legs = [limb("leg", 0.06 * h, 0.42 * h, m, (s * 0.08 * h, 0, 0.44 * h), self.lift) for s in (-1, 1)]
        self.arms = [limb("arm", 0.045 * h, 0.32 * h, m, (s * 0.2 * h, 0, 0.74 * h), self.lift) for s in (-1, 1)]
        self.h = h; self.root.scale = (0, 0, 0)
    def pose(self, f, phase, amp):
        """phase in radians of the stride; amp 0 = standing still."""
        a = math.sin(phase) * amp
        self.legs[0].rotation_euler.x, self.legs[1].rotation_euler.x = a * 0.5, -a * 0.5
        self.arms[0].rotation_euler.x, self.arms[1].rotation_euler.x = -a * 0.4, a * 0.4
        for o in self.legs + self.arms: key(o, f, "rotation_euler")
        self.lift.location.z += 0.025 * amp * abs(math.sin(phase))

# ---------- the island: plaza on three strata, floating in the void ----------
plat = []
def tile(x0, y0, x1, y1, parent=None):
    t = box("tile", x0 + 0.03, y0 + 0.03, x1 - 0.03, y1 - 0.03, 0.3, PLAZA, z0=-0.3, bevel=0.03)
    if parent: t.parent = parent
    return t
FRONT = [bpy.data.objects.new("front " + s, None) for s in ("L", "R")]
for e in FRONT: sc.collection.objects.link(e)
for tx in range(-6, 6):
    for ty in range(-6, 6):
        if ty < 0: tile(tx, ty, tx + 1, ty + 1, FRONT[0 if tx < 0 else 1])
        elif not -1 <= tx < 1: tile(tx, ty, tx + 1, ty + 1)
for k in range(3):                                         # the strata: big blocks, except the core under the monument
    z0, z1 = ZL[k + 2], ZL[k + 1]
    for (a, b_, c_, d_) in ((-6, 0, -1, 6), (1, 0, 6, 6)):
        box("stratum", a, b_, c_, d_, z1 - z0, STRATA[k], z0=z0, bevel=0.0)
    for i, (a, c_) in enumerate(((-6, 0), (0, 6))):
        box("front stratum", a, -6, c_, 0, z1 - z0, STRATA[k], z0=z0, bevel=0.0).parent = FRONT[i]
rnd = random.Random(17)
for k in range(3):                                         # stones in the cut face, so it reads as ground, not a wall
    for _ in range(14):
        x = rnd.uniform(-5.6, 5.6)
        if abs(x) < 1.3: continue
        z = rnd.uniform(ZL[k + 2] + 0.2, ZL[k + 1] - 0.2); s = rnd.uniform(0.12, 0.3)
        box("stone", x - s, -0.04, x + s, 0.2, s * 1.2, STRATA[max(0, k - 1)] if k else mat("stone", hexc("#55535B")), z0=z - s * 0.6, bevel=0.04)
for z in ZL[1:4]:                                          # a pale seam between strata, so the layers read as layers
    for a, c_ in ((-6, -1), (1, 6)): box("seam", a, -0.03, c_, 0.0, 0.035, mat("seam", hexc("#8A8690"), emit=0.25), z0=z - 0.017, bevel=0.0)
CORE = []                                                  # a 4 × 12 column of 0.5 cells under the monument, 4 layers: it crumbles
for layer in range(4):
    z0, z1 = ZL[layer + 1], ZL[layer]
    for i in range(4):
        for j in range(12):
            x, y = -1 + i * 0.5, j * 0.5
            m = PLAZA if layer == 0 else STRATA[layer - 1]
            CORE.append((box("core", x + 0.01, y + 0.01, x + 0.49, y + 0.49, z1 - z0 - 0.01, m, z0=z0, bevel=0.015), layer))
plinth = box("plinth", -0.9, 0.05, 0.9, 1.85, 1.0, mat("plinth", hexc("#5A5862")), z0=0.0, bevel=0.05)
CORE.append((plinth, 4))
# evidence in the cut face under the monument: 2014 magazines, 1990 bound journals, one late-1980s memo, then nothing
PAGE = mat("page", hexc("#CFCAC0"), emit=0.15); INK = mat("ink", hexc("#55535B"))
EVID = []
for n, x in enumerate((-0.55, -0.1, 0.35, 0.65)):
    z = -0.75 - (n % 2) * 0.35
    o = box("magazine", x - 0.22, -0.12, x + 0.22, 0.4, 0.05, PAGE, z0=z, bevel=0.01); o.rotation_euler.y = rnd.uniform(-0.2, 0.2)
    sp = box("spine", x - 0.22, -0.13, x + 0.22, -0.09, 0.05, ACC, z0=z, bevel=0.0); EVID.append((o, 1)); EVID.append((sp, 1))
for n in range(6):
    x = -0.6 + n * 0.24
    EVID.append((box("journal", x - 0.1, -0.12, x + 0.1, 0.5, 0.62, mat("journal", hexc("#8A6F4E")), z0=-3.15 + (n % 2) * 0.05, bevel=0.015), 2))
memo = box("memo", -0.32, -0.08, 0.32, -0.05, 0.84, PAGE, z0=-4.75, bevel=0.0); memo.rotation_euler.y = 0.06
EVID.append((memo, 3))
for r in range(5):
    l = box("memo line", -0.24, -0.1, 0.24 - (0.12 if r == 4 else 0), -0.085, 0.035, INK, z0=-4.0 - r * 0.12, bevel=0.0)
    l.parent = memo; l.matrix_parent_inverse = memo.matrix_world.inverted(); EVID.append((l, 3))
# the monument
M5 = text3d("5x", "5×", 1.7, ACC); M5.location = (0, 1.0, 1.0)
M25 = text3d("5-25x", "5–25×", 1.7, ACC); M25.location = (0, 1.0, 1.0); M25.scale = (0, 0, 0)
spot((0, -7, 9), (0, 1, 1.8), 1400, 28, (1.0, 0.92, 0.8))
haze = box("haze", -8, -8, 8, 8, 12.0, bpy.data.materials.new("haze"), z0=0.2, bevel=0.0)
hm = haze.data.materials[0]; hm.use_nodes = True; hn = hm.node_tree; hn.nodes.remove(hn.nodes["Principled BSDF"])
hv = hn.nodes.new("ShaderNodeVolumePrincipled"); hv.inputs["Density"].default_value = 0.015
hn.links.new(hv.outputs[0], hn.nodes["Material Output"].inputs["Volume"])
void_spot = spot((0, -1.5, -11), (0, 1.0, -4), 0.0, 24, (0.8, 0.88, 1.0))

# crowd at the plinth: standing, phones up, flashes
CROWD = []
FLASH = colmat("flash", emit=6.0)
for n in range(26):
    a = math.radians(rnd.uniform(-8, 188)); r = rnd.uniform(1.9, 5.0)
    x, y = r * math.cos(a), 1.0 + r * math.sin(a)
    if abs(x) < 1.6: continue
    if y < 0.4: y = 0.4
    fg = Fig("crowd %d" % n); fg.root.location = (x, y, 0); fg.root.rotation_euler.z = math.atan2(1.0 - y, -x) - math.pi / 2
    fg.root.scale = (1, 1, 1)
    ph = box("phone", -0.05, 0.13, 0.05, 0.16, 0.14, FLASH, z0=0.72, bevel=0.0); ph.parent = fg.root; ph.color = WALL
    CROWD.append((fg, ph, sorted(rnd.sample(range(20, max(60, L02 - 20)), 3))))
# two people crossing the back of the plaza (walk cycle in the opening shot)
PASS = [(Fig("passer %d" % n), (-5.5 + n * 11, 4.6 - n * 0.8), 1 - 2 * n) for n in range(2)]

# ---------- the two roads of years (L05) ----------
RY = [1.0, -2.2]; GX = [12.0, 14.5, 17.0, 19.5, 22.0]; X0 = 8.0
for y in RY:
    box("road", 7.0, y - 0.85, 25.2, y + 0.85, 0.3, PLAZA, z0=-0.3, bevel=0.03)
    for k, gx in enumerate(GX):
        for s in (-1, 1): box("gate post", gx - 0.07, y + s * 0.95 - 0.07, gx + 0.07, y + s * 0.95 + 0.07, 1.7, mw, z0=0.0, bevel=0.01)
        box("gate bar", gx - 0.08, y - 1.02, gx + 0.08, y + 1.02, 0.12, mf, z0=1.7, bevel=0.01)
        t = text3d("year", str(k + 1), 0.42, mat("year glow", WARM, emit=0.8), 0.03); t.location = (gx, y - 1.06, 1.86)
        spot((gx, y, 4.5), (gx + 0.6, y, 0), 260, 70, (1.0, 0.85, 0.65))   # a warm pool of light under every year gate
box("shop floor", 25.0, -3.8, 28.4, 2.6, 0.3, PLAZA, z0=-0.3, bevel=0.03)
box("shop", 25.2, -3.6, 28.0, 2.4, 2.4, mf, z0=0.0, bevel=0.03)
box("shop roof", 25.05, -3.75, 28.15, 2.55, 0.15, mw, z0=2.4, bevel=0.03)
for y in (-0.6,): box("shop window", 25.12, y - 0.5, 25.22, y + 0.5, 0.7, mat("shop glow", WARM, emit=0.9), z0=0.6, bevel=0.0)
for y in RY: box("shop door", 25.12, y - 0.55, 25.22, y + 0.55, 1.3, mat("door glow", WARM, emit=0.9), z0=0.0, bevel=0.0)
box("shop sign", 25.1, -2.8, 25.2, 1.6, 0.25, mat("shop glow", WARM, emit=0.9), z0=1.9, bevel=0.0)
COIN = mat("coin", ACCENT, emit=0.5)
VBAR = [box("value bar", 23.7, RY[ri] + o * 1.15 - 0.3, 24.3, RY[ri] + o * 1.15 + 0.3, 1.0, ACC, z0=0.0, bevel=0.03) for ri, o in ((0, 1), (1, -1))]
VH = [1.34, 3.0]                                           # value per customer: $134 vs $300, 1 unit = $100
for b in VBAR: b.scale = (0, 0, 0); b.location.z = 0.0
V = (GX[0] - X0 - 0.0) / (L05_LEFT - L05_CARD - 40)       # the crowd's lead reaches gate 1 on "left"
WALK0 = L05_CARD + 40
LEAVE = [[4, 3, 3, 2, 2], [2, 2, 2, 1, 1]]                 # 20 -> 6 (20% a year) and 20 -> 12 (10% a year)
ROAD = []
for ri, y in enumerate(RY):
    people = []
    for n in range(20):
        fg = Fig("customer %d %d" % (ri, n)); dx = -(n // 5) * 0.5 - rnd.uniform(0, 0.15); dy = (n % 5 - 2) * 0.3 + rnd.uniform(-0.05, 0.05)
        coins = []
        for c in range(5):
            bpy.ops.mesh.primitive_cylinder_add(radius=0.17, depth=0.1, vertices=24, location=(0, 0, 0.05 + 0.105 * c))
            co = bpy.context.object; co.data.materials.append(COIN); co.parent = fg.root; co.scale = (0, 0, 0); coins.append(co)
        people.append({"fig": fg, "dx": dx, "dy": dy, "coins": coins, "leave": None, "phase": rnd.uniform(0, 6.3), "pop": L05_CARD + n * 2})
    alive = list(range(20))
    for k, cnt in enumerate(LEAVE[ri]):
        for n in rnd.sample(alive, cnt): people[n]["leave"] = k; alive.remove(n)
    ROAD.append(people)
FIRST_LEAVER = min((p for p in ROAD[0] if p["leave"] == 0), key=lambda p: -p["dx"])
def lead(f): return X0 + V * max(0, f - WALK0)

# ---------- camera ----------
rig = Rig()
MON = Vector((0, 1.0, 1.9))
rig.keys([
    (-40, MON, 82, 0, 7.6), (0, MON, 82, 0, 7.6), (L01_NOBODY, MON + Vector((0, 0, -0.1)), 82, 3, 7.2),          # the monument, crowd behind
    (L02 + 30, Vector((0, 0.5, 0.2)), 84, 4, 8.5),                                                         # tilt down as the ground opens
    (L02_RULE, Vector((0, 0, -4.2)), 87, 6, 4.8), (L02_1990 - 10, Vector((0, 0, -4.0)), 87, 6, 5.0),      # the memo at the bottom
    (L02_PRINTED, Vector((0, 0, -2.7)), 87, 8, 5.2), (L02_NO - 8, Vector((0, 0, -2.6)), 87, 8, 5.4),      # the 1990 journals
    (L02_NO + 40, Vector((0, 0.5, -1.6)), 85, 10, 13.0), (L03_GREW + 20, Vector((0, 0.5, -1.4)), 85, 12, 13.0),   # the surprise: hold
    (L03_25 + 10, Vector((0, 0.8, 0.6)), 80, 18, 10.5), (L04, Vector((0, 0.8, 0.3)), 79, 22, 11.0),       # it grew, still floating
    (L04_TIME + 30, Vector((10.5, -0.6, 0.4)), 60, -38, 9.0),                                               # swing to the road of years
    (L05_LEFT - 20, Vector((11.0, -0.6, 0.4)), 58, -37, 8.6), (L05_21 + 20, Vector((12.5, -0.6, 0.4)), 58, -36, 9.0),
    (L05_HALVE + 50, Vector((17.5, -0.6, 0.6)), 56, -35, 12.5), (L05_134 - 20, Vector((22.0, -0.6, 0.9)), 56, -33, 14.0),
    (L06 - 5, Vector((22.4, -0.6, 1.0)), 56, -32, 14.2),
    (L06_STUDY, Vector((0, 1.0, 0.3)), 80, 6, 10.5), (N + 40, Vector((0, 1.0, 0.4)), 80, 4, 10.8)])  # back to the floating 5×, high in frame above the follow card

# ---------- bake ----------
OPEN0 = L02 + 4
for f in range(N):
    rig.set(f); bpy.context.view_layer.update()
    # the ground opens like a cake cut: the two front halves slide apart and drop
    if win(f, OPEN0 - 2, OPEN0 + 70):
        g = span(f, OPEN0, OPEN0 + 60)
        for i, e in enumerate(FRONT):
            s = -1 if i == 0 else 1
            e.location = (s * 9 * g, -2.0 * g, -14 * g * g); e.rotation_euler = (0, s * 0.25 * g, 0); key(e, f, "location", "rotation_euler")
    # crowd: phone flashes, a little sway; passers walk
    if f <= L02 + 60:
        for fg, ph, fl in CROWD:
            on = max([0.0] + [1 - span(f, t, t + 7) for t in fl if f >= t])
            ph.color = mix_col(WALL, (1, 1, 1, 1), on); key(ph, f, "color")
        for fg, (x0, y0), d in PASS:
            fg.root.scale = (1, 1, 1); fg.lift.location.z = 0
            fg.root.location = (x0 + d * 0.022 * f, y0, 0); fg.root.rotation_euler.z = -d * math.pi / 2
            fg.pose(f, f * 0.16, 1.0); key(fg.root, f, "location", "rotation_euler", "scale"); key(fg.lift, f, "location")
    # erosion: the memo first, then the core bottom-up, the plinth last; the 5× stays where it was
    E0 = L02_NO
    if win(f, E0 - 4, E0 + 130):
        for idx, (o, layer) in enumerate(CORE + EVID):
            if (o, layer) in EVID and o.parent: continue
            base = {3: 2, 2: 22, 1: 40, 0: 58, 4: 66}[layer] if (o, layer) in CORE else {3: 0, 2: 20, 1: 38}[layer]
            t0 = E0 + base + (idx * 7) % 14 + (int(o.location.y * 2) * 2 if (o, layer) in CORE and layer < 4 else 0)
            g = span(f, t0, t0 + 48)
            if "z0" not in o: o["z0"] = o.location.z; o["r"] = (idx * 0.37) % 1.0 - 0.5
            o.location.z = o["z0"] - 9.0 * g * g; o.rotation_euler.x = 1.2 * g * o["r"]; o.rotation_euler.z = 0.8 * g * o["r"]
            o.scale = ((1 - 0.4 * g) if g < 0.98 else 0.0,) * 3; key(o, f, "location", "rotation_euler", "scale")
        void_spot.data.energy = 1100 * span(f, E0 + 60, E0 + 110); void_spot.data.keyframe_insert("energy", frame=f)
    # the 5×: a small sag when the plinth goes, caught by nothing; then it grows and rises (L03)
    if win(f, E0 + 50, L04 + 20):
        sag = 0.12 * math.sin(math.pi * span(f, E0 + 66, E0 + 100))
        rise = span(f, L03_GREW, L03_GREW + 140)
        z = 1.0 - sag + 0.6 * rise + 0.04 * math.sin(f * 0.05) * rise
        sA = (1 + 0.22 * rise) * (1 - span(f, L03_25 - 4, L03_25 + 10)); sB = (1 + 0.22 * rise) * back_out(span(f, L03_25, L03_25 + 20))
        for o, s in ((M5, sA), (M25, sB)): o.location.z = z; o.scale = (s, s, s); key(o, f, "location", "scale")
    anchor("monument", f, Vector((0, 1.0, 3.4)))
    anchor("s2014", f, Vector((-3.4, 0, -1.1))); anchor("s1990", f, Vector((0, -0.2, -2.4))); anchor("s1980", f, Vector((0, -0.2, -3.7)))
    anchor("memo", f, Vector((0, 0, -3.8))); anchor("void", f, Vector((0, 0.5, -6.3)))
    # the roads: 20 customers each; at each year gate some leave (step off the edge and fall), the rest gain a coin
    if win(f, L05_CARD - 4, L07 + 10):
        for ri, people in enumerate(ROAD):
            out = 1 if ri == 0 else -1
            for p in people:
                fg = p["fig"]; x = lead(f) + p["dx"]; y = RY[ri] + p["dy"]; z = 0.0; amp = 1.0 if f > WALK0 else 0.0; vis = back_out(span(f, p["pop"], p["pop"] + 14))
                crossed = sum(1 for gx in GX if x >= gx); yaw_ = -math.pi / 2
                if p["leave"] is not None and crossed > p["leave"]:
                    gx = GX[p["leave"]]; fl = WALK0 + (gx - X0 - p["dx"]) / V      # the frame it reached its gate
                    side = span(f, fl, fl + 45); x = gx + 0.3 * side; y += out * 1.6 * side; yaw_ = -math.pi / 2 + out * (math.pi / 2) * min(1, side * 2)
                    drop = span(f, fl + 40, fl + 85); z = -7 * drop * drop; vis *= 1 - span(f, fl + 70, fl + 90)
                    crossed = p["leave"]
                if x > 25.0: vis *= 1 - span(x, 25.0, 25.3)
                fg.lift.location.z = 0.105 * crossed
                fg.root.location = (x, y, z); fg.root.rotation_euler.z = yaw_; fg.root.scale = (vis,) * 3
                fg.pose(f, p["phase"] + (x - X0) * 5.5, amp)
                key(fg.root, f, "location", "rotation_euler", "scale"); key(fg.lift, f, "location")
                for c, co in enumerate(p["coins"]):
                    k = back_out(span(x, GX[c], GX[c] + 0.25)) if c < crossed else 0.0
                    co.scale = (k, k, k); key(co, f, "scale")
            alive = [p for p in people if p["leave"] is None]
            cx = sum(lead(f) + p["dx"] for p in alive) / len(alive)
            anchor("road %d" % ri, f, Vector((cx, RY[ri], 1.9)))
        q = FIRST_LEAVER; gx = GX[0]; fl = WALK0 + (gx - X0 - q["dx"]) / V; sd = span(f, fl, fl + 45)
        anchor("leaver", f, Vector((gx + 0.3 * sd, RY[0] + q["dy"] + 1.6 * sd, 1.4)))
        anchor("road start", f, Vector((X0 - 0.6, 0.0, 1.6)))
        for ri, (b, t0) in enumerate(zip(VBAR, (L05_134 - 10, L05_300 - 10))):   # the bars rise on "$134" and "$300"
            h = VH[ri] * back_out(span(f, t0, t0 + 30), 1.2); k = 1.0 if h > 0.02 else 0.0; b.scale = (k, k, max(h, 0.0001)); b.location.z = h / 2
            key(b, f, "scale", "location")
            anchor("bar %d" % ri, f, Vector((24.0, RY[ri] + (1 if ri == 0 else -1) * 1.15, h + 0.5)))
        anchor("shop", f, Vector((25.2, -0.6, 1.2)))

for o in bpy.data.objects:
    ad = o.animation_data
    if ad and ad.action and hasattr(ad.action, "fcurves"):
        for fc in ad.action.fcurves:
            if not fc.data_path.startswith("hide"):
                for kp in fc.keyframe_points: kp.interpolation = "LINEAR"
finish(EP, N, OUT, A)

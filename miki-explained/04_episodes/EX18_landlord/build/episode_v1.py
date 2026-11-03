# EX18 "The Landlord" — first long-edu (72 s), built on the EX17 base (night look, green accent, walk cycles, one
# continuous camera). New this time:
#   SimReady hero props (tray, cup) for the opening close-up · a 1954 world in warm daylight that the camera reaches by
#   falling through the void under the present-day world (light, sun and sky change while the screen is black) · the
#   fold/reveal hero: a stand lifts off its plot and the ground underneath glows green · a nested zoom out from one
#   restaurant to a city to 45,000 green plots · buildings sinking so only the ground stays lit (the debate made visual).
#   blender -b --python build/episode.py -- <out_dir> preview | anchors | still f,f,… [half] | (full render)
import sys, os, math, json, random, bpy, bmesh
from mathutils import Vector, Matrix
EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/"
sys.path.insert(0, EP + "../../tools/blender")
from isokit import *
import simready
A = sys.argv[sys.argv.index("--") + 1:]; OUT = A[0]
sc = setup(half="half" in A)
VT = json.load(open(EP + "audio/vo_timeline.json")); VW = VT["words"]
def w(L, i): return int(VW[L][i][1] * FPS)
N = int(math.ceil(VT["end"] * FPS)); sc.frame_start, sc.frame_end = 0, N - 1
FONT = bpy.data.fonts.load(os.path.expanduser("~/Library/Fonts/InterDisplay-Black.ttf"))
rnd = random.Random(18)

# ---------- word frames ----------
L01, L01_TWO, L01_BURGERS = w("L01", 0), w("L01", 8), w("L01", 17)
L02, L02_14, L02_139, L02_FOR = w("L02", 0), w("L02", 9), w("L02", 19), w("L02", 26)
L03, L03_1954, L03_RAY, L03_WALKS, L03_TWO, L03_FRAN = (w("L03", i) for i in (0, 6, 12, 14, 22, 33))
L04, L04_THIN, L04_HALF = w("L04", 0), w("L04", 8), w("L04", 14)
L05, L05_OWN, L05_BUILD, L05_RENT, L05_MARKUP = (w("L05", i) for i in (0, 16, 24, 28, 35))
L06, L06_27 = w("L06", 0), w("L06", 8)
L07, L07_45, L07_LAST, L07_130, L07_RENT = (w("L07", i) for i in (0, 6, 13, 18, 30))
L08, L08_31, L08_FUTURE = w("L08", 0), w("L08", 7), w("L08", 10)
L09, L09_LANDLORD = w("L09", 0), w("L09", 11)
L10 = w("L10", 0)
T1 = L03_1954 + 24                                        # teleport into 1954 (screen black, under the world)
T2 = L07 - 24                                             # teleport back to the present
def win(f, lo, hi): return f in (0, N - 1) or lo <= f <= hi

# ---------- light: present night <-> 1954 day, switched while the camera is in the void ----------
sun = [o for o in bpy.data.objects if o.type == "LIGHT"][0]
wn = sc.world.node_tree; bgs = [n for n in wn.nodes if n.type == "BACKGROUND"]
AMB = bgs[0].inputs[0]; SKY = bgs[1].inputs[0]
NIGHT = dict(sun=1.1, scol=(0.85, 0.9, 1.0), amb=(0.10, 0.10, 0.13, 1), sky=BG)
DAY = dict(sun=3.0, scol=(1.0, 0.9, 0.75), amb=(0.30, 0.27, 0.22, 1), sky=hexc("#1E1913"))
def bloom(strength=0.35, threshold=0.9, size=0.6):
    tree = bpy.data.node_groups.new("bloom", "CompositorNodeTree"); sc.compositing_node_group = tree
    tree.interface.new_socket("Image", in_out="OUTPUT", socket_type="NodeSocketColor")
    rl = tree.nodes.new("CompositorNodeRLayers"); gl = tree.nodes.new("CompositorNodeGlare"); out = tree.nodes.new("NodeGroupOutput")
    gl.inputs["Type"].default_value = "Bloom"; gl.inputs["Threshold"].default_value = threshold
    gl.inputs["Strength"].default_value = strength; gl.inputs["Size"].default_value = size
    tree.links.new(rl.outputs["Image"], gl.inputs["Image"]); tree.links.new(gl.outputs["Image"], out.inputs["Image"])
    sc.render.use_compositing = True
bloom()

mw, mf, mp = mat("wall", WALL), mat("furniture", FURN), mat("people", PEOPLE)
PLAZA = mat("plaza", hexc("#2E2E35")); WARMI = mat("warm strip", WARM, emit=2.2); ACC = mat("accent", ACCENT, emit=0.6)
FLOORM = mat("rest floor", hexc("#3E3E46")); COIN = mat("coin", ACCENT, emit=0.5); WCOIN = mat("warm coin", WARM, emit=0.6)
PLOT = colmat("plot", emit=0.35); LIGHTS = colmat("kitchen light", emit=2.0)
GREEN_PLOT = mix_col(ACCENT, (0, 0, 0, 1), 0.15)
# 1954 palette: warm, low saturation
CREAM, TAN, BROWN, ROAD = (mat(n, hexc(c)) for n, c in (("cream", "#E2D6BE"), ("tan", "#B89870"), ("brown", "#6E5438"), ("road54", "#4E463F")))
GROUND54 = mat("ground54", hexc("#A8987C")); PEOPLE54 = mat("people54", hexc("#8A7C6A"))

def text3d(name, s, size, m, extrude=0.03, face=-1):
    cu = bpy.data.curves.new(name, "FONT"); cu.body = s; cu.font = FONT; cu.size = size; cu.extrude = extrude
    cu.align_x = "CENTER"; cu.align_y = "BOTTOM"
    o = bpy.data.objects.new(name, cu); sc.collection.objects.link(o); o.rotation_euler = (math.pi / 2, 0, 0)
    o.data.materials.append(m); return o
def group(name, loc):
    g = bpy.data.objects.new(name, None); sc.collection.objects.link(g); g.location = loc; bpy.context.view_layer.update(); return g
def adopt(g, objs):
    for o in objs: o.parent = g; o.matrix_parent_inverse = g.matrix_world.inverted()

# ---------- figures with a walk cycle (EX17) ----------
def limb(name, r, d, m, loc, parent):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=d, vertices=16, location=(0, 0, 0)); o = bpy.context.object; o.name = name
    o.data.transform(Matrix.Translation((0, 0, -d / 2)))
    bv = o.modifiers.new("b", "BEVEL"); bv.width = r * 0.8; bv.segments = 3
    o.data.materials.append(m); o.parent = parent; o.location = loc; return o
class Fig:
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
    def pose(self, f, phase, amp):
        a = math.sin(phase) * amp
        self.legs[0].rotation_euler.x, self.legs[1].rotation_euler.x = a * 0.5, -a * 0.5
        self.arms[0].rotation_euler.x, self.arms[1].rotation_euler.x = -a * 0.4, a * 0.4
        for o in self.legs + self.arms: key(o, f, "rotation_euler")
def stand_fig(name, loc, face, m=mp):
    fg = Fig(name, m); fg.root.location = loc; fg.root.rotation_euler.z = face; return fg

# ---------- present: two cutaway restaurants on plots (R1 company-run, R2 franchised) ----------
TABLE_H = 0.36
def restaurant(name, cx, cy, detail=True):
    plot = box(name + " plot", cx - 1.7, cy - 1.7, cx + 1.7, cy + 1.7, 0.3, PLOT, z0=-0.3, bevel=0.03); plot.color = PLAZA.diffuse_color[:3] + (1,)
    plot.color = hexc("#2E2E35")
    g = group(name, (cx, cy, 0)); parts = []
    parts.append(box("floor", cx - 1.35, cy - 1.35, cx + 1.35, cy + 1.35, 0.06, FLOORM, z0=0.0, bevel=0.01))
    parts.append(box("back wall", cx - 1.35, cy + 1.2, cx + 1.35, cy + 1.35, 1.5, mw, z0=0.0, bevel=0.02))
    parts.append(box("left wall", cx - 1.35, cy - 1.35, cx - 1.2, cy + 1.35, 1.5, mw, z0=0.0, bevel=0.02))
    parts.append(box("sign", cx - 0.7, cy + 1.36, cx + 0.7, cy + 1.42, 0.3, WARMI, z0=1.12, bevel=0.0))
    k = box("kitchen", cx - 1.15, cy + 0.75, cx + 0.6, cy + 1.15, 0.5, mf, z0=0.06, bevel=0.02); parts.append(k)
    kl = box("kitchen light", cx - 1.1, cy + 0.78, cx + 0.55, cy + 0.82, 0.06, LIGHTS, z0=0.5, bevel=0.0); kl.color = (1.0, 0.82, 0.55, 1); parts.append(kl)
    parts.append(box("counter", cx - 1.15, cy + 0.2, cx + 0.9, cy + 0.42, 0.42, mf, z0=0.06, bevel=0.02))
    till = box("till", cx + 0.5, cy + 0.24, cx + 0.72, cy + 0.38, 0.12, mw, z0=0.48, bevel=0.01); parts.append(till)
    for tx, ty in ((cx - 0.5, cy - 0.6), (cx + 0.5, cy - 0.6)):
        parts.append(box("table", tx - 0.28, ty - 0.22, tx + 0.28, ty + 0.22, 0.04, mf, z0=TABLE_H - 0.04, bevel=0.01))
        parts.append(box("table leg", tx - 0.04, ty - 0.04, tx + 0.04, ty + 0.04, TABLE_H - 0.04, mw, z0=0.0, bevel=0.0))
    adopt(g, parts)
    figs = []
    if detail:
        for fg_name, loc, face in (("cashier", (cx + 0.2, cy + 0.6, 0.06), math.pi), ("cook", (cx - 0.6, cy + 0.55, 0.06), 0.0),
                                   ("guest", (cx + 0.5, cy - 1.0, 0.0), 0.0)):
            fg = stand_fig(name + " " + fg_name, loc, face); fg.root.scale = (1, 1, 1); adopt(g, [fg.root]); figs.append(fg)
    return dict(plot=plot, g=g, kl=kl, till=till, figs=figs, c=Vector((cx, cy, 0)))
R1 = restaurant("company-run", -3.2, 0.0); R2 = restaurant("franchised", 3.2, 0.0)
box("present ground", -6.0, -4.2, 6.0, 2.2, 0.3, PLAZA, z0=-0.6, bevel=0.03)

# the opening close-up: a burger on a SimReady tray, a SimReady cup, on R2's right-hand table
S = 0.47
TX, TY, TZ = R2["c"].x + 0.5, -0.6, TABLE_H
TRAYM = mat("tray", hexc("#6A6A74")); CUPM = mat("cup", hexc("#C9C5CF")); BUN = mat("bun", hexc("#D7B98A")); PATTY = mat("patty", hexc("#4A3A30"))
tray = simready.load("dishware_plastic_tray_a01", TRAYM); tray.scale = (S,) * 3; tray.location = (TX, TY, TZ)
cup = simready.load("food_beverage_coffeeCup_a01", CUPM); cup.scale = (S * 0.9,) * 3; cup.location = (TX + 0.035, TY + 0.03, TZ + 0.006)
bz = TZ + 0.006
cyl("bun bottom", TX - 0.025, TY - 0.015, 0.03, 0.012, BUN, z0=bz, verts=32, bevel=0.004)
cyl("patty", TX - 0.025, TY - 0.015, 0.032, 0.01, PATTY, z0=bz + 0.012, verts=32, bevel=0.003)
cyl("cheese", TX - 0.025, TY - 0.015, 0.031, 0.003, mat("cheese", hexc("#E3B04B")), z0=bz + 0.022, verts=4, bevel=0.0)
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.03, location=(TX - 0.025, TY - 0.015, bz + 0.025), segments=32, ring_count=16)
top = bpy.context.object; top.scale = (1, 1, 0.55); top.data.materials.append(BUN)
for v in top.data.vertices:
    if v.co.z < 0: v.co.z = 0
TRAY_P = Vector((TX - 0.025, TY - 0.015, bz + 0.05))
def coin(name, m, r=0.05, h=0.02):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=h, vertices=24); o = bpy.context.object; o.name = name
    o.data.materials.append(m); o.scale = (0, 0, 0); return o
C_TILL, C_FLOOR = coin("coin to till", WCOIN, 0.012, 0.004), coin("coin to floor", COIN, 0.012, 0.004)

# the two profit piles (franchised margins $13.9B vs company-run $1.4B -> 49 vs 5 coins)
PILE = []
for R, n in ((R1, 5), (R2, 49)):
    base = R["c"] + Vector((0, -2.35, 0)); cs = []
    for k in range(n):
        bpy.ops.mesh.primitive_cylinder_add(radius=0.32, depth=0.1, vertices=32, location=(base.x, base.y, 0.05 + 0.105 * k))
        o = bpy.context.object; o.data.materials.append(COIN); o.scale = (0, 0, 0); cs.append(o)
    PILE.append((cs, base))

# ---------- 1954: the brothers' stand, a road, Kroc, franchise copies (warm day) ----------
X54 = 60.0
box("ground 54", X54 - 14, -6, X54 + 26, 6, 0.4, GROUND54, z0=-0.4, bevel=0.04)
box("road 54", X54 - 14, -1.0, X54 + 26, 0.0, 0.02, ROAD, z0=0.0, bevel=0.0)
def stand(name, cx, cy, sign="HAMBURGERS"):
    plot = box(name + " plot", cx - 1.4, cy - 1.1, cx + 1.4, cy + 1.1, 0.12, PLOT, z0=-0.1, bevel=0.02); plot.color = hexc("#9A8A70")
    g = group(name, (cx, cy, 0)); parts = []
    parts.append(box("walls", cx - 0.95, cy - 0.7, cx + 0.95, cy + 0.7, 1.0, CREAM, z0=0.02, bevel=0.03))
    roof = box("roof", cx - 1.15, cy - 0.95, cx + 1.15, cy + 0.85, 0.09, TAN, z0=1.02, bevel=0.02); roof.rotation_euler.x = -0.12; parts.append(roof)
    parts.append(box("window", cx - 0.6, cy - 0.72, cx + 0.6, cy - 0.69, 0.45, mat("window54", hexc("#3A3028")), z0=0.42, bevel=0.0))
    parts.append(box("ledge", cx - 0.7, cy - 0.9, cx + 0.7, cy - 0.7, 0.04, BROWN, z0=0.4, bevel=0.01))
    t = text3d(name + " sign", sign, 0.2, BROWN, 0.02); t.location = (cx, cy - 0.2, 1.22); parts.append(t)
    adopt(g, parts); return dict(plot=plot, g=g, c=Vector((cx, cy, 0)))
BRO = stand("brothers", X54 - 7, 2.0)
COPIES = [stand("copy %d" % i, X54 - 2 + i * 4.2, 2.0) for i in range(6)]
for st in COPIES: st["g"].scale = (0, 0, 0)
OFFICE = box("kroc office", X54 - 9.2, -4.6, X54 - 7.2, -2.8, 0.9, CREAM, z0=0.0, bevel=0.03)
ot = text3d("office sign", "KROC", 0.22, BROWN, 0.02); ot.location = (X54 - 8.2, -4.62, 0.95)
box("car", X54 - 4.6, -0.85, X54 - 3.4, -0.25, 0.3, mat("car54", hexc("#7C8A86")), z0=0.06, bevel=0.08)
box("car top", X54 - 4.3, -0.8, X54 - 3.7, -0.3, 0.18, mat("car54", hexc("#7C8A86")), z0=0.36, bevel=0.06)
BROS = [stand_fig("brother %d" % i, (BRO["c"].x - 0.35 + i * 0.7, BRO["c"].y - 1.05, 0.0), 0.0, PEOPLE54) for i in range(2)]
for b in BROS: b.root.scale = (1, 1, 1)
KROC = Fig("kroc", PEOPLE54)
mixer = box("mixer", -0.08, 0.1, 0.08, 0.24, 0.2, mat("mixer", hexc("#C9C2B4")), z0=0.4, bevel=0.01); mixer.parent = KROC.lift
KROC_PATH = Path([(X54 - 12.5, -0.5), (X54 - 8.5, -0.5), (BRO["c"].x, BRO["c"].y - 1.7)], r=0.8)
KROC.root.location = (X54 - 12.5, -0.5, 0)
COPY_COIN = [coin("royalty %d" % i, WCOIN, 0.12, 0.04) for i in range(6)]
BRO_COIN = coin("brothers' cut", WCOIN, 0.07, 0.03)
RENT54 = [coin("rent 54 %d" % i, COIN, 0.14, 0.05) for i in range(4)]
bpy.context.view_layer.update()
OBJ54 = [o for o in bpy.data.objects if o.matrix_world.translation.x > 40 and o.type != "CAMERA"]

# ---------- present at scale: a city of franchised plots and a world of 45,000 green plots ----------
CITY = []
bmesh_cache = {}
for gx in range(-5, 6):
    for gy in range(-5, 6):
        if gy == 0 and gx in (-1, 0, 1): continue
        cx, cy = gx * 7.0, gy * 7.0 + rnd.uniform(-0.6, 0.6)
        p = box("city plot", cx - 1.5, cy - 1.5, cx + 1.5, cy + 1.5, 0.3, PLOT, z0=-0.3, bevel=0.0); p.color = GREEN_PLOT
        b = box("city restaurant", cx - 1.0, cy - 1.0, cx + 1.0, cy + 1.0, 1.0, mf, z0=0.0, bevel=0.0)
        s = box("city sign", cx - 0.5, cy - 1.02, cx + 0.5, cy - 1.0, 0.2, WARMI, z0=0.7, bevel=0.0)
        CITY += [p, b, s]
box("city ground", -40, -40, 40, 40, 0.3, PLAZA, z0=-0.62, bevel=0.0); CITY.append(bpy.data.objects["city ground"])
# 45,000 plots on a real land mask (Natural Earth ne_110m_land, public domain; build/land.json), the city at Chicago
LAND = json.load(open(EP + "build/land.json")); DEG = 2.11; LON0, LAT0 = -88.0, 42.0
pts = []
while len(pts) < 45000:
    c, r = LAND["cells"][rnd.randrange(len(LAND["cells"]))]
    lon = (c + rnd.random()) * 360 / LAND["W"] - 180; lat = 90 - (r + rnd.random()) * 180 / LAND["H"]
    x, y = (lon - LON0) * DEG, (lat - LAT0) * DEG
    if x * x + y * y < 48 * 48: continue
    pts.append((x, y))
me = bpy.data.meshes.new("world plots"); bm = bmesh.new(); d = 0.42
for x, y in pts:
    vs = [bm.verts.new((x + dx, y + dy, 0.0)) for dx, dy in ((-d, -d), (d, -d), (d, d), (-d, d))]; bm.faces.new(vs)
bm.to_mesh(me); bm.free()
WORLD = bpy.data.objects.new("world plots", me); sc.collection.objects.link(WORLD); me.materials.append(mat("world dot", ACCENT, emit=1.6))
WORLD_SEA = box("world sea", -215, -235, 585, 125, 0.2, mat("sea", hexc("#141418")), z0=-0.9, bevel=0.0)
RIBBON = Path([(3.2, -1.7), (40, -14), (110, -30), (190, -34), (260, -20)], r=10).curve("future rent", mat("ribbon", WARM, emit=1.0), depth=0.9, z=0.4, drawn=0.0)
PRESENT_FAR = CITY + [WORLD, WORLD_SEA, RIBBON]
def show(objs, f, on):
    for o in objs:
        o.hide_render = not on; o.keyframe_insert("hide_render", frame=f)
for o in PRESENT_FAR: o.hide_render = True
show(PRESENT_FAR, 0, False); show(PRESENT_FAR, T2, True); show([RIBBON], L09 + 30, False)
show(OBJ54, 0, False); show(OBJ54, T1, True); show(OBJ54, T2, False)

# ---------- camera (cam far back so the 800-unit world fits the clip range) ----------
rig = Rig(); rig.cam.location = (0, 0, 1200); rig.cam.data.clip_start = 1.0; rig.cam.data.clip_end = 4000
R2C, R1C = R2["c"], R1["c"]
MID = Vector((0.0, -1.2, 1.6))
rig.keys([
    (-40, TRAY_P, 38, 30, 0.42), (0, TRAY_P, 38, 30, 0.42), (L01_TWO, TRAY_P, 42, 32, 0.46),
    (L01_BURGERS + 30, TRAY_P + Vector((0, 0, 0.03)), 50, 35, 0.95),
    (L02_14, Vector((1.6, -0.9, 0.7)), 56, 38, 6.0), (L02_139 + 40, MID + Vector((0, 0, 1.2)), 58, 40, 12.5),
    (L02_FOR + 20, MID + Vector((0, 0, 1.3)), 58, 42, 13.0),
    (L03_1954 - 20, MID + Vector((0, 0, -5)), 72, 44, 13.0), (T1, MID + Vector((0, 0, -32)), 82, 45, 13.0),       # fall into the void
    (T1 + 1, Vector((X54 - 7, 0.5, -32)), 82, 20, 9.0),                                                     # (black: teleport)
    (L03_RAY - 20, Vector((X54 - 8.5, 0.6, 0.7)), 70, 20, 7.0), (L03_TWO + 20, Vector((X54 - 7.2, 0.8, 0.7)), 72, 24, 5.6),
    (L03_FRAN + 70, Vector((X54 + 3, 0.0, 0.5)), 56, 34, 19.0), (L04_THIN, Vector((X54 - 2.0, -0.6, 0.8)), 56, 32, 14.0),
    (L04_HALF + 60, Vector((X54 - 4.5, -0.8, 0.8)), 58, 30, 12.0),   # closer on the royalty streams (the wide hold ran ~15 s)
    (L05_OWN - 30, Vector((X54 - 2, 2.0, 1.9)), 72, 24, 8.2), (L05_RENT + 40, Vector((X54 - 2, 2.0, 1.2)), 70, 30, 7.4),
    (L05_MARKUP + 50, Vector((X54 + 4, 1.0, 0.5)), 58, 36, 17.0), (L06_27 + 10, Vector((X54 + 4.5, 1.0, 0.5)), 57, 38, 17.5),
    (T2 - 40, Vector((X54 + 4.5, 1.0, -5)), 72, 40, 17.5), (T2, Vector((X54 + 4.5, 1.0, -32)), 82, 42, 17.5),
    (T2 + 1, R2C + Vector((0, 0, -32)), 82, 45, 4.0),
    (L07 + 30, R2C + Vector((0, 0, 0.4)), 30, 45, 4.5), (L07_45, Vector((1.0, 0, 0.4)), 34, 45, 16),
    (L07_LAST, Vector((0, 0, 0)), 30, 45, 70), (L07_130 + 40, Vector((0, 0, 0)), 32, 45, 260),
    (L07_RENT, Vector((110, -30, 0)), 34, 45, 620), (L08_31, Vector((125, -32, 0)), 34, 45, 600), (L08_FUTURE + 40, Vector((135, -30, 0)), 34, 45, 590),
    (L09 + 20, Vector((20, -6, 0)), 40, 45, 160), (L09 + 90, Vector((1, -1, 0.5)), 50, 42, 30),
    (L09_LANDLORD - 20, Vector((0, -0.6, 0.8)), 56, 40, 14.5), (L10, Vector((0, -0.6, 0.8)), 56, 38, 15.0),
    (N + 40, Vector((0, -0.6, 0.9)), 56, 36, 15.5)])

# ---------- bake ----------
def lerp(a, b, k): return a + (b - a) * k
def light_at(f):
    """0 = night, 1 = day. Day from T1 to T2; a dusk dip during L06 before the fall back."""
    if f < T1 or f > T2: return 0.0
    return 1.0 - 0.35 * span(f, L06_27, T2 - 30)
for f in range(N):
    rig.set(f); bpy.context.view_layer.update()
    k = light_at(f)
    if win(f, T1 - 2, T1 + 2) or win(f, T2 - 2, T2 + 2) or win(f, L06_27 - 2, T2) or f in (0, N - 1):
        sun.data.energy = lerp(NIGHT["sun"], DAY["sun"], k); sun.data.color = [lerp(a, b, k) for a, b in zip(NIGHT["scol"], DAY["scol"])]
        AMB.default_value = [lerp(a, b, k) for a, b in zip(NIGHT["amb"], DAY["amb"])]
        SKY.default_value = [lerp(a, b, k) for a, b in zip(NIGHT["sky"], DAY["sky"])]
        sun.data.keyframe_insert("energy", frame=f); sun.data.keyframe_insert("color", frame=f)
        AMB.keyframe_insert("default_value", frame=f); SKY.keyframe_insert("default_value", frame=f)
    # L01: two coins leave the tray: one to the till, one down into the floor
    if win(f, L01_TWO - 4, L01_TWO + 120):
        for c, end, t0 in ((C_TILL, R2["till"].location + Vector((0, 0, 0.14)), L01_TWO), (C_FLOOR, TRAY_P + Vector((0.06, -0.08, -TZ - 0.1)), L01_TWO + 14)):
            g = span(f, t0, t0 + 50); p = TRAY_P.lerp(end, g); p.z += 0.15 * math.sin(math.pi * g) if c is C_TILL else 0.0
            vis = span(f, t0, t0 + 6) * (1 - span(f, t0 + 48, t0 + 56)); c.location = p; c.scale = (vis,) * 3
            c.rotation_euler = (math.pi / 2 * (1 - g) if c is C_TILL else 0, 0, 0); key(c, f, "location", "scale", "rotation_euler")
    # L02: the piles grow; the company-run kitchen goes dark on "for not cooking"
    if win(f, L02_14 - 4, L03_1954):
        for (cs, base), t0 in zip(PILE, (L02_14, L02_139)):
            for i, o in enumerate(cs):
                s = back_out(span(f, t0 + i * 1.6, t0 + i * 1.6 + 10)); o.scale = (s, s, s); key(o, f, "scale")
        R1["kl"].color = mix_col((1.0, 0.82, 0.55, 1), (0.05, 0.05, 0.06, 1), span(f, L02_FOR, L02_FOR + 12)); key(R1["kl"], f, "color")
    anchor("tray", f, TRAY_P + Vector((0, 0, 0.06)))
    anchor("pile r1", f, PILE[0][1] + Vector((0, 0, 0.9))); anchor("pile r2", f, PILE[1][1] + Vector((0, 0, 5.4)))
    # 1954: Kroc walks up with a milkshake mixer; copies pop up along the road
    if win(f, T1, T2):
        s = max(0.0, (f - (L03_RAY - 30)) * 0.03); s = min(s, KROC_PATH.LEN); q, dvec = KROC_PATH.at(s)
        walking = 0.0 < s < KROC_PATH.LEN
        KROC.root.location = (q.x, q.y, 0); KROC.root.rotation_euler.z = yaw(dvec); KROC.root.scale = (1, 1, 1)
        KROC.lift.location.z = 0.02 * abs(math.sin(s * 5.5)) if walking else 0.0
        KROC.pose(f, s * 5.5, 1.0 if walking else 0.0); key(KROC.root, f, "location", "rotation_euler", "scale"); key(KROC.lift, f, "location")
        for i, st in enumerate(COPIES):
            g = back_out(span(f, L03_FRAN + i * 9, L03_FRAN + i * 9 + 18)); st["g"].scale = (g, g, g); key(st["g"], f, "scale")
        # L04: a thin stream of royalties to Kroc's office; a thinner one on to the brothers
        office = Vector((X54 - 8.2, -3.7, 1.2))
        for i, (c, st) in enumerate(zip(COPY_COIN, COPIES)):
            ph = ((f - L04_THIN + i * 11) % 70) / 70.0; on = span(f, L04_THIN - 10, L04_THIN + 10) * (1 - span(f, L05 + 60, L05 + 90))
            p = (st["c"] + Vector((0, -0.8, 1.0))).lerp(office, ph); p.z += 2.0 * math.sin(math.pi * ph)
            c.location = p; c.scale = (on * (1 if 0.03 < ph < 0.97 else 0),) * 3; key(c, f, "location", "scale")
        ph = ((f - L04_HALF) % 90) / 90.0; on = span(f, L04_HALF - 10, L04_HALF + 10) * (1 - span(f, L05 + 60, L05 + 90))
        p = office.lerp(BRO["c"] + Vector((0, 0, 1.3)), ph); p.z += 1.5 * math.sin(math.pi * ph)
        BRO_COIN.location = p; BRO_COIN.scale = (on * (1 if 0.03 < ph < 0.97 else 0),) * 3; key(BRO_COIN, f, "location", "scale")
        # L05: the first franchise stand lifts off its plot; the ground glows green; rent drops into it
        st = COPIES[0]; lift = span(f, L05_OWN - 6, L05_OWN + 30) * (1 - span(f, L05_RENT - 30, L05_RENT + 10))
        st["g"].location.z = 2.4 * lift; key(st["g"], f, "location")
        st["plot"].color = mix_col(hexc("#9A8A70"), GREEN_PLOT, span(f, L05_OWN, L05_OWN + 16)); key(st["plot"], f, "color")
        for i, c in enumerate(RENT54):
            ph = ((f - L05_RENT + i * 15) % 60) / 60.0; on = span(f, L05_RENT, L05_RENT + 10)
            c.location = st["c"] + Vector((0.9, -0.9, 1.4 - 1.5 * ph * ph)); c.scale = (on * (1 if ph < 0.95 else 0),) * 3; key(c, f, "location", "scale")
        for i, st2 in enumerate(COPIES[1:]):
            st2["plot"].color = mix_col(hexc("#9A8A70"), GREEN_PLOT, span(f, L05_MARKUP + i * 6, L05_MARKUP + i * 6 + 14)); key(st2["plot"], f, "color")
        # L06: the brothers walk off their plot
        for i, b in enumerate(BROS):
            g = span(f, L06 + 30 + i * 10, L06 + 150 + i * 10)
            b.root.location = (BRO["c"].x - 0.35 + i * 0.7 + 1.5 * g, BRO["c"].y - 1.05 - 3.0 * g, 0); b.root.rotation_euler.z = math.pi * 0.85 if g > 0 else 0.0
            b.root.scale = ((1 - span(f, L06 + 120, L06 + 170)),) * 3
            b.pose(f, f * 0.16, 1.0 if 0 < g < 1 else 0.0); key(b.root, f, "location", "rotation_euler", "scale")
    anchor("kroc", f, KROC.root.location + Vector((0, 0, 1.0)))
    anchor("brothers", f, BRO["c"] + Vector((0, -1.0, 1.7))); anchor("office", f, Vector((X54 - 8.2, -3.7, 1.4)))
    anchor("stand1", f, COPIES[0]["c"] + Vector((0, 0, 0.4))); anchor("copies", f, Vector((X54 + 8, 2.0, 1.9)))
    # present again: every plot is green now; the future rent ribbon draws out; buildings sink on "landlord"
    if T2 - 4 <= f <= N - 1 or f == 0:                      # T2-4/T2-3 hold the dark plot so it doesn't fade green from frame 0
        for R in (R1, R2):
            R["plot"].color = GREEN_PLOT if f >= T2 - 2 else hexc("#2E2E35"); key(R["plot"], f, "color")
            R["kl"].color = (1.0, 0.82, 0.55, 1); key(R["kl"], f, "color")
            sink = span(f, L09_LANDLORD - 10, L09_LANDLORD + 50); R["g"].scale = (1, 1, max(0.001, 1 - sink)); key(R["g"], f, "scale")
        RIBBON.data.bevel_factor_end = span(f, L08_31 - 20, L08_FUTURE + 30); RIBBON.data.keyframe_insert("bevel_factor_end", frame=f)
        for cs, base in PILE:
            for o in cs: o.scale = (0, 0, 0); key(o, f, "scale")
    anchor("r2", f, R2C + Vector((0, 0, 1.8))); anchor("r1", f, R1C + Vector((0, 0, 1.8)))
    anchor("city", f, Vector((0, 0, 2))); anchor("world", f, Vector((115, -10, 0)))
    anchor("ribbon", f, Vector((101, -25, 1)))   # mid-Atlantic: clear of the land dots

for o in bpy.data.objects:
    ad = o.animation_data
    if ad and ad.action and hasattr(ad.action, "fcurves"):
        for fc in ad.action.fcurves:
            if not fc.data_path.startswith("hide"):
                for kp in fc.keyframe_points: kp.interpolation = "LINEAR"
finish(EP, N, OUT, A)

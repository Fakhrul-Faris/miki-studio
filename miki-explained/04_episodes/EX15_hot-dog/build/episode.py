# EX15 "The $1.50 Promise" — one isometric warehouse, one camera, 60 fps, cut to audio/vo_timeline.json (house format).
#   blender -b --python build/episode.py -- <out_dir> preview          cheap look first → out/preview.mp4 (show the user)
#   blender -b --python build/episode.py -- <out_dir> [still f,f,…] [half]   stills, or the full render
# Beats: the food-court hot dog lands ($1.50) → grey price bars rise, the hot dog's stays flat → the quote → a conveyor of
# hot dogs snakes through every aisle (245 million) → x-ray: membership cards fill a green column beside the profit
# column → members pay at the gate, loop past the hot dog, nine in ten come round again → a Shah Alam car wash → home.
# No Costco logo or branding: a generic warehouse.
import sys, os, json, math, random, bpy
from mathutils import Vector, Euler
EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/"
sys.path.insert(0, EP + "../../tools/blender")
from isokit import *
A = sys.argv[sys.argv.index("--") + 1:]; OUT = A[0]
sc = setup(half="half" in A)
VT = json.load(open(EP + "audio/vo_timeline.json")); VW = VT["words"]
def w(L, i): return int(VW[L][i][1] * FPS)
N = int(math.ceil(VT["end"] * FPS)); sc.frame_start, sc.frame_end = 0, N - 1

# ---------- word frames ----------
L01_DOLLAR, L01_PURPOSE = w("L01", 4), w("L01", 10)
L02, L02_DIDNT, L02_CEO, L02_IF, L02_KILL = w("L02", 0), w("L02", 7), w("L02", 8), w("L02", 22), w("L02", 29)
L03, L03_PROOF, L03_SOLD, L03_245, L03_MILLION, L03_EACH, L03_MOVE = (w("L03", i) for i in (0, 6, 10, 11, 12, 15, 20))
L04, L04_NOT, L04_FEES, L04_5, L04_PROFIT, L04_8 = (w("L04", i) for i in (0, 4, 9, 13, 16, 20))
L05, L05_HOTDOG, L05_ABOUT, L05_RENEW = w("L05", 0), w("L05", 5), w("L05", 14), w("L05", 19)
L06, L06_SHAH, L06_KEEP, L06_LET, L06_WAX, L06_VAC = (w("L06", i) for i in (0, 6, 8, 16, 18, 21))
L07, L08 = w("L07", 0), w("L08", 0)

def win(f, lo, hi): return f in (0, N - 1) or lo <= f <= hi       # key heavy props only inside their window

# ---------- the warehouse (20 × 28) ----------
WX, WY, WH = 20.0, 28.0, 0.9
mw, mf, mp = mat("wall", WALL), mat("furniture", FURN), mat("people", PEOPLE)
box("floor", -0.6, -0.6, WX + 0.6, WY + 0.6, 0.12, mat("floor", FLOOR), z0=-0.12, bevel=0.05)
walls = [box("wall", 0, -0.08, 2.8, 0.08, WH, mw), box("wall", 5.2, -0.08, WX, 0.08, WH, mw),           # entrance gap at x 2.8–5.2
         box("wall", 0, WY - 0.08, WX, WY + 0.08, WH, mw), box("wall", -0.08, 0, 0.08, WY, WH, mw), box("wall", WX - 0.08, 0, WX + 0.08, WY, WH, mw)]
RACKS = []                                          # every rack part, lowered together in the x-ray
rnd = random.Random(15)
for x in (2.5, 5.5, 8.5, 11.5, 14.5, 17.5):
    for y0, y1 in ((8.2, 16.2), (17.8, 26.0)):
        RACKS.append(box("rack", x - 0.5, y0, x + 0.5, y1, 0.08, mw, z0=2.05, bevel=0.01))           # top rail
        for yy in (y0, y1 - 0.1):
            for xx in (x - 0.5, x + 0.42): RACKS.append(box("post", xx, yy, xx + 0.08, yy + 0.1, 2.13, mw, bevel=0.01))
        for zs in (0.05, 0.75, 1.42):
            RACKS.append(box("shelf", x - 0.52, y0, x + 0.52, y1, 0.06, mw, z0=zs, bevel=0.01))
            yy = y0 + 0.2
            while yy < y1 - 0.9:
                L = rnd.uniform(0.7, 1.3); h = rnd.uniform(0.35, 0.58)
                RACKS.append(box("crate", x - 0.42, yy, x + 0.42, yy + L, h, mf if rnd.random() < 0.7 else mp, z0=zs + 0.06, bevel=0.02))
                yy += L + rnd.uniform(0.15, 0.5)
RZ = [(o, o.location.z) for o in RACKS]

# ---------- the food court (bottom right) ----------
FC = Vector((15.75, 4.6, 0.6))
box("counter", 13.0, 4.6, 18.5, 5.4, 0.95, mf)
box("counter top", 12.95, 4.55, 18.55, 5.45, 0.06, mw, z0=0.95, bevel=0.01)
box("menu board", 13.6, 5.9, 17.9, 6.0, 1.1, mw, z0=1.25, bevel=0.02)
box("menu stripe", 13.75, 5.86, 17.75, 5.9, 0.14, mat("accent dim", ACCENT, emit=0.3), z0=2.05, bevel=0.0)
for tx in (13.6, 15.6, 17.6): cyl("table", tx, 2.4, 0.5, 0.72, mf)
for i, (sx, sy) in enumerate(((12.6, 2.2), (16.6, 2.9), (18.3, 2.0))):
    o = person("diner %d" % i, PEOPLE, 0.95); o.location = (sx, sy, 0); o.rotation_euler[2] = 1.2 * i
ACC = mat("accent", ACCENT, emit=0.15); WARMM = mat("warm", WARM, emit=0.1)
def hotdog(name):
    root = bpy.data.objects.new(name, None); sc.collection.objects.link(root)
    bun = box(name + " bun", -0.27, -0.09, 0.27, 0.09, 0.11, WARMM, bevel=0.05); bun.parent = root
    bpy.ops.mesh.primitive_cylinder_add(radius=0.055, depth=0.6, vertices=24, location=(0, 0, 0.12)); s_ = bpy.context.object
    s_.rotation_euler = (0, math.radians(90), 0); bv = s_.modifiers.new("b", "BEVEL"); bv.width = 0.05; bv.segments = 6; s_.data.materials.append(ACC); s_.parent = root
    return root
hero = hotdog("hero hotdog"); cup = cyl("cup", 0, 0, 0.09, 0.26, WARMM); lid = cyl("lid", 0, 0, 0.095, 0.03, ACC, z0=0.26, bevel=0.0); lid.parent = cup
tray = box("tray", 15.2, 4.75, 16.3, 5.25, 0.03, mw, z0=1.01, bevel=0.01)
HERO_AT, CUP_AT = Vector((15.6, 5.0, 1.05)), Vector((16.05, 5.05, 1.05))

# ---------- price bars (in front of the entrance): 1985 → 2025, everything rises, the hot dog stays ----------
BARS = []
for i in range(8):
    x = 6.4 + i * 0.62; BARS.append((box("price bar %d" % i, x - 0.22, 2.7, x + 0.22, 3.14, 1.0, mf, bevel=0.02), 0.45 + i * 0.32))
hdbar = box("hotdog bar", 6.4 + 8 * 0.62 - 0.22, 2.7, 6.4 + 8 * 0.62 + 0.22, 3.14, 1.0, ACC, bevel=0.02)
for o, _ in BARS + [(hdbar, 0)]: o.scale = (0, 0, 0); o.location.z = 0.0

# ---------- the conveyor: a belt that snakes through every aisle; hot dogs ride it ----------
CPTS = [(16.0, 6.3), (16.0, 26.9), (13.0, 26.9), (13.0, 7.3), (10.0, 7.3), (10.0, 26.9), (7.0, 26.9), (7.0, 7.3), (4.0, 7.3), (4.0, 26.9), (1.0, 26.9), (1.0, 7.3)]
belt = Path(CPTS, r=0.9); beltO = belt.curve("belt", mat("belt", ARROW), depth=0.2, z=0.35, drawn=0.0)
for i in range(int(belt.LEN / 2.2)):
    p, d = belt.at(0.8 + i * 2.2); cyl("belt leg", p.x, p.y, 0.05, 0.3, mw, bevel=0.0)
RIDERS = [hotdog("rider %d" % i) for i in range(70)]
GAP = belt.LEN / 70

# ---------- the money columns at the entrance, the member cards, the gate ----------
COLS = Vector((7.4, -1.6, 0))
feesC = box("fees column", 6.2, -2.2, 7.2, -1.2, 1.0, ACC, bevel=0.04); profC = box("profit column", 7.7, -2.2, 8.7, -1.2, 1.0, mat("people", PEOPLE), bevel=0.04)
FEES_H, PROF_H = 5.3 * 0.55, 8.1 * 0.55
for o in (feesC, profC): o.scale = (0, 0, 0); o.location.z = 0.0
CARDS = [box("member card %d" % i, -0.22, -0.14, 0.22, 0.14, 0.03, WARMM, bevel=0.01) for i in range(10)]
gate = [box("gate post", 2.85, -0.3, 3.05, -0.1, 1.1, mw), box("gate post", 5.0, -0.3, 5.2, -0.1, 1.1, mw), box("gate bar", 3.05, -0.25, 5.0, -0.15, 0.08, ACC, z0=1.0, bevel=0.01)]
LOOP = Path([(4.0, -4.5), (4.0, 1.4), (12.0, 1.4), (12.0, 3.9), (18.6, 3.9), (18.6, 1.1), (5.6, 0.9), (5.6, -0.6), (4.6, -4.5)], r=0.8)
pm_mem = colmat("member", emit=0.3)
MEMBERS = []
for i in range(10):
    m_ = person("member %d" % i, pm_mem, 0.92)
    for ch in m_.children: ch.color = PEOPLE
    MEMBERS.append(m_)

# ---------- the Shah Alam car wash (to the left of the warehouse) ----------
CW = Vector((-10.0, 7.0, 0))
box("cw floor", -14.5, 0.5, -5.5, 13.5, 0.12, mat("floor", FLOOR), z0=-0.12, bevel=0.05)
box("cw lane", -11.6, 0.5, -8.4, 13.5, 0.02, mat("belt", ARROW), z0=0.0, bevel=0.0)
for xx in (-12.2, -7.8): box("cw wall", xx - 0.1, 3.0, xx + 0.1, 10.0, 1.7, mw)
def gantry(y, m):
    return [box("g post", -12.0, y - 0.15, -11.7, y + 0.15, 2.0, mw), box("g post", -8.3, y - 0.15, -8.0, y + 0.15, 2.0, mw),
            box("g beam", -12.0, y - 0.18, -8.0, y + 0.18, 0.28, m, z0=2.0, bevel=0.02)]
gBasic = gantry(4.2, mw); gWax = gantry(7.6, colmat("wax", emit=0.5)); gWax[2].color = WALL
vac = [box("vac post", -6.5, 11.0, -6.2, 11.3, 1.5, mw), box("vac head", -6.6, 10.9, -6.1, 11.4, 0.3, colmat("vac", emit=0.5), z0=1.5)]; vac[1].color = WALL
sign = box("basic sign", -13.6, 2.2, -12.6, 2.3, 0.7, mat("warm", WARM, emit=0.1), z0=1.0, bevel=0.02)
box("sign post", -13.15, 2.2, -13.05, 2.3, 1.0, mw, bevel=0.0)
def car(name, col):
    root = bpy.data.objects.new(name, None); sc.collection.objects.link(root)
    b_ = box(name + " body", -0.55, -1.0, 0.55, 1.0, 0.45, mat(name, col), z0=0.18, bevel=0.2); r_ = box(name + " roof", -0.45, -0.55, 0.45, 0.4, 0.32, mat(name, col), z0=0.6, bevel=0.15)
    parts = [b_, r_]
    for wx in (-0.55, 0.55):
        for wy in (-0.62, 0.62):
            bpy.ops.mesh.primitive_cylinder_add(radius=0.2, depth=0.14, vertices=24, location=(wx, wy, 0.2)); t_ = bpy.context.object
            t_.rotation_euler = (0, math.radians(90), 0); t_.data.materials.append(mat("tyre", hexc("#141416"))); parts.append(t_)
    for p_ in parts: p_.parent = root
    return root
CARS = [car("car a", hexc("#5C5C66")), car("car b", hexc("#43434B")), car("car c", hexc("#6E6E78"))]

# ---------- camera ----------
rig = Rig()
C0 = Vector((10.0, 13.6, 0)); BARS_C = Vector((8.4, 2.9, 1.0)); WH_C = Vector((10.0, 15.0, 0))
LOOP_C = Vector((8.2, 1.4, 0.4)); MID = (CW + C0) * 0.5     # LOOP_C: the gate and the near side of the members' loop, close
rig.keys([
    (-60, C0, 0, 0, 34), (0, C0, 2, 2, 33.5), (150, FC, 54.7, 45, 8.0), (L01_PURPOSE + 30, FC, 54.7, 45, 7.4),
    (L02 + 60, BARS_C, 54.7, 40, 10.4), (L02_DIDNT + 20, BARS_C + Vector((0.6, 0, 0)), 54.7, 42, 9.8),
    (L02_IF, FC + Vector((0, 0.1, 0.3)), 54.7, 45, 6.8), (L02_KILL + 40, FC, 54.7, 47, 6.6),
    (L03_PROOF, FC + Vector((0, 1.0, 0)), 50, 45, 9.5), (L03_245, WH_C, 40, 45, 31), (L03_MOVE, WH_C, 42, 42, 30),
    (L04_NOT, COLS + Vector((0.05, 0.3, 1.8)), 54.7, 45, 7.6), (L04_8 + 50, COLS + Vector((0.05, 0.3, 2.3)), 54.7, 48, 7.9),
    (L05 + 30, LOOP_C, 54.7, 45, 10.0), (L05_RENEW + 20, LOOP_C + Vector((1.0, 0, 0)), 54.7, 28, 10.5),
    (L06_SHAH + 10, CW, 54.7, 45, 11.0), (L06_VAC + 30, CW + Vector((0, 1.2, 0)), 54.7, 50, 10.5),
    (L07 + 40, MID, 25, 18, 36), (L08 - 10, C0, 0, 0, 34), (N + 60, C0, 0, 0, 34)])

# ---------- bake ----------
for f in range(N):
    rig.set(f); bpy.context.view_layer.update()            # the anchors project through this frame's camera
    # the hero hot dog and cup drop onto the tray on "$1.50"
    for o, at_, f0 in ((hero, HERO_AT, L01_DOLLAR - 10), (cup, CUP_AT, L01_DOLLAR - 4)):
        u = (f - f0) / 16; o.location = at_ + Vector((0, 0, 1.6 * (1 - back_out(u)) if u < 1 else 0)); o.scale = ((1.0 if f >= f0 else 0.0),) * 3
        key(o, f, "location", "scale")
    # price bars rise in turn on "Everything else got pricier"; the hot dog bar stays low, pulses on "didn't"
    if win(f, L02 - 5, L03 + 40):
        for i, (o, h) in enumerate(BARS):
            k = back_out((f - (L02 + i * 7)) / 26) if f >= L02 + i * 7 else 0.0; k *= 1 - span(f, L03 - 10, L03 + 30)
            o.scale = (1, 1, h * k) if k > 0.002 else (0, 0, 0); o.location.z = h * k / 2; key(o, f, "scale", "location")
        hk = (back_out((f - (L02 + 8 * 7)) / 26) if f >= L02 + 56 else 0.0) * (1 - span(f, L03 - 10, L03 + 30))
        pulse = 1 + 0.25 * math.sin(math.pi * min(1, max(0, (f - L02_DIDNT) / 24))) if f >= L02_DIDNT else 1
        hdbar.scale = (pulse, pulse, 0.45 * hk) if hk > 0.002 else (0, 0, 0); hdbar.location.z = 0.45 * hk / 2
        key(hdbar, f, "scale", "location")
    # the conveyor draws from the counter on "The hot dog", riders fill it from "proof" and run until the money beat
    beltO.data.bevel_factor_end = span(f, L03, L03_PROOF + 30); beltO.data.bevel_factor_start = span(f, L08, N - 4)
    beltO.data.keyframe_insert("bevel_factor_end", frame=f); beltO.data.keyframe_insert("bevel_factor_start", frame=f)
    if win(f, L03_PROOF - 5, L04 + 70):
        run = max(0.0, f - L03_PROOF) * 0.11
        for i, r in enumerate(RIDERS):
            s = run - i * GAP
            vis = (1.0 if s >= 0 else 0.0) * (1 - span(f, L04 + 20, L04 + 60))
            p, d = belt.at(s % belt.LEN if s >= 0 else 0); r.location = (p.x, p.y, 0.47); r.rotation_euler[2] = yaw(d) + math.pi / 2
            r.scale = (vis,) * 3; key(r, f, "location", "rotation_euler", "scale")
    # x-ray: the racks lower to their footprints on "where's the money?", come back after the members' loop
    kz = 1.0 - 0.9 * (span(f, L04, L04 + 40) - span(f, L06 - 40, L06 + 10))
    if win(f, L04 - 5, L06 + 15):
        for o, z0 in RZ: o.scale.z = kz; o.location.z = z0 * kz; key(o, f, "scale", "location")
    # the money: cards drop into the green fees column on "fees", the grey profit column rises on "profit"
    if win(f, L04_FEES - 30, L05 + 60):
        out_ = 1 - span(f, L05 + 10, L05 + 40)
        fh = FEES_H * span(f, L04_FEES, L04_5 + 50) * out_; ph = PROF_H * span(f, L04_PROFIT, L04_8 + 40) * out_
        feesC.scale = (1, 1, fh) if fh > 0.002 else (0, 0, 0); feesC.location.z = fh / 2
        profC.scale = (1, 1, ph) if ph > 0.002 else (0, 0, 0); profC.location.z = ph / 2
        key(feesC, f, "scale", "location"); key(profC, f, "scale", "location")
        for i, c_ in enumerate(CARDS):
            f0 = L04_FEES + i * 7; u = (f - f0) / 22
            c_.location = Vector((6.7, -1.7, fh + 0.2 + 3.0 * (1 - ease(u)))); c_.rotation_euler[2] = 2.0 * (1 - u)
            c_.scale = ((1.0 if 0 <= u < 1 else 0.0),) * 3; key(c_, f, "location", "rotation_euler", "scale")
    anchor("fees top", f, feesC.location + Vector((0, 0, feesC.scale.z / 2 + 0.5)))
    anchor("profit top", f, profC.location + Vector((0, 0, profC.scale.z / 2 + 0.5)))
    # members: through the gate (pay), round past the hot dog, back out; nine in ten turn green on "renew"
    if win(f, L05 - 30, L06 + 30):
        for i, m_ in enumerate(MEMBERS):
            s = (f - (L05 - 20) - i * 16) * 0.075
            p, d = LOOP.at(s % LOOP.LEN if s > 0 else 0)
            m_.location = (p.x, p.y, 0.03 * abs(math.sin(s * math.pi / 0.55))); m_.rotation_euler[2] = yaw(d)
            m_.scale = ((1.0 if s > 0 else 0.0) * (1 - span(f, L06, L06 + 20)),) * 3; key(m_, f, "location", "rotation_euler", "scale")
            g = span(f, L05_ABOUT + i * 4, L05_ABOUT + i * 4 + 14) if i != 6 else 0.0
            for ch in m_.children: ch.color = mix_col(PEOPLE, ACCENT, g); key(ch, f, "color")
    # the car wash: cars roll through; the basic gantry holds; wax and vacuum light on their words
    if win(f, L06 - 40, L07 + 120):
        for i, c_ in enumerate(CARS):
            y = -1.0 + (f - (L06 - 30) - i * 70) * 0.05
            c_.location = (-10.0, y, 0); c_.scale = ((1.0 if -1.5 < y < 14 else 0.0),) * 3; key(c_, f, "location", "scale")
        gWax[2].color = mix_col(WALL, ACCENT, span(f, L06_WAX, L06_WAX + 12)); key(gWax[2], f, "color")
        vac[1].color = mix_col(WALL, ACCENT, span(f, L06_VAC, L06_VAC + 12)); key(vac[1], f, "color")
    anchor("basic sign", f, Vector((-13.1, 2.25, 2.1)))
    anchor("basic gantry", f, Vector((-10.0, 4.2, 2.75)))
    anchor("wax", f, Vector((-10.0, 7.6, 2.75)))
    anchor("vacuum", f, Vector((-6.35, 11.15, 2.2)))
    anchor("hotdog bar", f, hdbar.location + Vector((0, 0, 0.9)))
    anchor("bar 1985", f, Vector((6.4, 2.5, 0.0)))

finish(EP, N, OUT, A)

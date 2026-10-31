# EX11 paper clinic (Blender, paperkit v2): two generated top-down plates as shadow boxes, paper hands doing the work.
#   blender -b --python build/clinic.py -- <DESK|ROOM> <out_dir> [still m,m,…] [half]
# C3 top-down: the camera looks straight down (+Y) at plates standing at y=0; "height above the table" is −y.
# A1 stop-motion: only every 3rd MASTER frame of each shot is rendered (8 fps); build/holds.py fills the gaps.
# Blender frame = MASTER frame + 1. Cuts (2 beats at 100 BPM) live in SHOTS; frame numbers below are MASTER frames.
import sys, math, random, json, bpy
from mathutils import Vector
sys.path.insert(0, "/Users/user/Private/miki-studio/miki-explained/tools/blender")
from paperkit import *
a = sys.argv[sys.argv.index("--") + 1:]; SEQ, OUT = a[0], a[1]
STILLS = [int(x) for x in a[a.index("still") + 1].split(",")] if "still" in a else None
EP = "/Users/user/Private/miki-studio/miki-explained/04_episodes/EX11_no-show/"; L = EP + "layers/"
ANTON, MONO = "/Users/user/Library/Fonts/Anton-Regular.ttf", "/Users/user/Library/Fonts/IBMPlexMono-Bold.ttf"
N = 462
sc = setup(N + 1, 540 if "half" in a else 1080, 960 if "half" in a else 1920); random.seed(11); sc.eevee.taa_render_samples = 32
def lin(c): return tuple(((v / 255) / 12.92 if v / 255 <= 0.04045 else ((v / 255 + 0.055) / 1.055) ** 2.4) for v in c) + (1,)
INK_L, OCHRE_L, CREAM_L, GREYP_L = lin((17, 17, 17)), lin((201, 138, 43)), lin((246, 241, 232)), lin((214, 208, 198))
def B(m): return m + 1

# ---------- plate space ----------
if SEQ == "DESK": PIMG, PH, BOX, GAP = (1440, 2560), 4.0, L + "box_ENV_desk", 0.02
else: PIMG, PH, BOX, GAP = (1440, 3960), 4.0 * 3960 / 2560, L + "box_ENV_waiting_long", 0.04
PW, ZC = PH * PIMG[0] / PIMG[1], PH / 2
def at(fx, fy, h=0.0): return Vector(((fx - 0.5) * PW, -h, ZC + (0.5 - fy) * PH))       # plate fraction → world, h above
def px(x, y, h=0.0): return at(x / PIMG[0], y / PIMG[1], h)
bands = shadowbox(BOX, height=PH, centre=ZC, gap=GAP)
back = card(L + "paper.png", PH * 1.6, loc=(0, 0.03, ZC), wobble=0, name="table paper"); glow(back, 0.8)

# ---------- camera: straight down, cut on the beat, a slow drift inside each shot ----------
bpy.ops.object.camera_add(location=(0, -frame_dist(PH), ZC)); cam = bpy.context.object; sc.camera = cam
cam.data.lens = 35; cam.rotation_euler = (math.radians(90), 0, 0)
cam.data.dof.use_dof = True; cam.data.dof.aperture_fstop = 9.0
def shot(m0, m1, c0, h0, c1, h1):
    """camera keys for MASTER frames m0..m1-1: centre c (plate fractions) and frame height h, drifting c0,h0 → c1,h1."""
    for m, (fx, fy), h in ((m0, c0, h0), (m1 - 1, c1, h1)):
        p = at(fx, fy); d = frame_dist(h)
        cam.location = (p.x, -d, p.z); cam.keyframe_insert("location", frame=B(m))
        cam.data.dof.focus_distance = d; cam.data.dof.keyframe_insert("focus_distance", frame=B(m))
def done_camera():
    interpolation(cam, "LINEAR"); interpolation(cam.data, "LINEAR")

# ---------- light ----------
def sun(direction, energy, shadow=True):
    bpy.ops.object.light_add(type="SUN"); s = bpy.context.object; s.data.energy = energy; s.data.angle = math.radians(4)
    s.rotation_euler = Vector(direction).normalized().to_track_quat("-Z", "Y").to_euler(); s.data.use_shadow = shadow; return s
key = sun((0.45, 1, -0.55), 2.2); sun((0, 1, 0), 0.9, False)

# ---------- helpers ----------
def mat(name, col, emit=0.0):
    m = bpy.data.materials.new(name); m.use_nodes = True; b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = col; b.inputs["Roughness"].default_value = 0.92
    if emit: b.inputs["Emission Color"].default_value = col; b.inputs["Emission Strength"].default_value = emit
    return m
def slab(w, h, loc, col, name, rot=0.0, emit=0.35):
    """a flat paper piece lying on the table (faces the camera)."""
    o = sheet(w, h, loc=tuple(loc), rot=(90, rot, 0), name=name); o.data.materials.clear(); o.data.materials.append(mat(name, col, emit))
    o.modifiers.new("thickness", "SOLIDIFY").thickness = 0.004; return o
_fonts = {}
def txt(body, font, size, loc, name, col=INK_L, align="CENTER", parent=None):
    f = _fonts.get(font) or bpy.data.fonts.load(font); _fonts[font] = f
    cu = bpy.data.curves.new(name, "FONT"); cu.body = body; cu.font = f; cu.size = size; cu.align_x = align; cu.align_y = "CENTER"
    o = bpy.data.objects.new(name, cu); sc.collection.objects.link(o); o.location = tuple(loc); o.rotation_euler = (math.radians(90), 0, 0)
    cu.materials.append(mat(name, col, 0.0))
    if parent: bpy.context.view_layer.update(); o.parent = parent; o.matrix_parent_inverse = parent.matrix_world.inverted()
    return o
def flat(o, rot):
    o.rotation_euler = (math.radians(90), math.radians(rot), 0); return o
def keep_parent(o, parent):
    bpy.context.view_layer.update(); o.parent = parent; o.matrix_parent_inverse = parent.matrix_world.inverted()
def key_loc(o, k):
    for m, p in k: o.location = tuple(p); o.keyframe_insert("location", frame=B(m))
def visible(o, spans):
    """hide_render/hide_viewport keys: shown only inside the MASTER spans [(m0, m1), …]."""
    for prop in ("hide_render", "hide_viewport"):
        setattr(o, prop, True); o.keyframe_insert(prop, frame=1)
        for m0, m1 in spans:
            setattr(o, prop, False); o.keyframe_insert(prop, frame=B(m0))
            setattr(o, prop, True); o.keyframe_insert(prop, frame=B(m1))
def hand(path, height, name):
    h = card(path, height, loc=(0, -0.2, -10), wobble=0, name=name); flat(h, 0); return h
def tip_offset(o, img_wh, tip_px, height):
    """world offset from a card's centre to a point in its image (x right, image y down)."""
    w, h = img_wh; s = height / h
    return Vector(((tip_px[0] - w / 2) * s, 0, (h / 2 - tip_px[1]) * s))
RENDER = []                                   # (m0, m1) MASTER spans this sequence renders
cutouts = []

if SEQ == "DESK":
    # 1A 0–58: a hand slaps the belief slip onto the desk (already moving on frame 0); 29: closer, the strike (H4)
    # 2A 58–86: a hand drops the documentary print on top (Barts Health, London)
    # 3A 144–259: a hand pushes the phone in (usual reminder); 187: the new line slides in word by word; 202–259: the pen writes £160
    # 4A 317–346: close on the line, an ochre underline ("one extra line")
    # 5A 346–432: the struck slip and the phone; a hand slaps THE PRICE DID. (380); 403: the follow card rides over this
    SLIP, PHONE, PRICE = at(0.40, 0.40, 0.05), at(0.60, 0.63, 0.055), at(0.40, 0.80, 0.05)  # above the depth bands (2 × GAP)
    slip = slab(1.22, 0.46, SLIP, CREAM_L, "slip", rot=-4)
    t1 = txt("A REMINDER TEXT\nSTOPS NO-SHOWS.", ANTON, 0.135, SLIP + Vector((0, -0.006, 0)), "slip text", parent=slip); t1.rotation_euler[1] = math.radians(-4)
    key_loc(slip, [(-1, SLIP + Vector((0.15, -0.25, -1.3))), (0, SLIP + Vector((0.06, -0.10, -0.45))), (3, SLIP + Vector((0, -0.02, -0.06))), (6, SLIP)])
    visible(slip, [(0, 86), (346, N)]); visible(t1, [(0, 86), (346, N)])
    h1 = hand(L + "CO_hand.png", 2.6, "hand slap"); off = Vector((0, 0, -1.2))
    key_loc(h1, [(-1, SLIP + off + Vector((0.15, -0.30, -1.3))), (0, SLIP + off + Vector((0.06, -0.14, -0.45))), (3, SLIP + off + Vector((0, -0.05, -0.06))),
                 (6, SLIP + off + Vector((0, -0.03, 0))), (12, SLIP + off + Vector((0, -0.06, -0.1))), (21, SLIP + off + Vector((0.1, -0.12, -1.6))), (24, SLIP + off + Vector((0.1, -0.12, -3)))])
    # the strike: two ochre lines through the two lines of type, drawn 30–36 and 36–42
    st = []
    for i, (zz, f0) in enumerate(((0.052, 30), (-0.092, 36))):
        pts = [SLIP + Vector((-0.56 + 1.12 * j / 23, -0.02, zz + 0.012 * math.sin(j * 1.7) - 0.03 * (j / 23 - 0.5))) for j in range(24)]
        s = ink(pts, colour=OCHRE_L, radius=0.016, name="strike %d" % i, draw=(B(f0), B(f0 + 6))); st.append(s); visible(s, [(0, 58), (346, N)])
    # the documentary print lands on top at 58 (already moving)
    pr = card(L + "M1_print.png", 1.55, loc=at(0.5, 0.45, 0.065), wobble=0, name="print"); flat(pr, 5); P0 = at(0.5, 0.45, 0.065)
    key_loc(pr, [(57, P0 + Vector((-0.2, -0.3, -1.6))), (58, P0 + Vector((-0.08, -0.12, -0.5))), (61, P0 + Vector((0, -0.03, -0.08))), (64, P0)])
    visible(pr, [(58, 86)])
    h2 = hand(L + "CO_hand.png", 2.6, "hand print")
    key_loc(h2, [(57, P0 + Vector((-0.1, -0.35, -2.9))), (58, P0 + Vector((0, -0.17, -1.8))), (61, P0 + Vector((0.05, -0.08, -1.35))), (64, P0 + Vector((0.05, -0.05, -1.3))),
                 (70, P0 + Vector((0.05, -0.08, -1.45))), (79, P0 + Vector((0.15, -0.15, -3.2)))]); visible(h2, [(58, 86)])
    # the phone: pushed in by a hand at 144, rests from 150
    ph = card(L + "CO_phone.png", 0.82, loc=PHONE, wobble=0, name="phone"); flat(ph, 3)
    bpy.ops.object.empty_add(location=tuple(PHONE)); rig = bpy.context.object; rig.name = "phone rig"; keep_parent(ph, rig)   # bubbles ride the rig, not the scaled card
    key_loc(rig, [(143, PHONE + Vector((0.25, 0, -1.3))), (144, PHONE + Vector((0.12, 0, -0.55))), (147, PHONE + Vector((0.03, 0, -0.12))), (150, PHONE)])
    visible(ph, [(144, 259), (317, N)])
    h3 = hand(L + "CO_hand.png", 2.6, "hand phone"); po = Vector((0.05, -0.04, -1.55))
    key_loc(h3, [(143, PHONE + po + Vector((0.25, 0, -1.3))), (144, PHONE + po + Vector((0.12, 0, -0.55))), (147, PHONE + po + Vector((0.03, 0, -0.12))), (150, PHONE + po),
                 (156, PHONE + po + Vector((0, -0.03, -0.12))), (165, PHONE + po + Vector((0.2, -0.06, -1.9)))]); visible(h3, [(144, 173)])
    # the usual reminder on the screen (grey bubble), then the extra line (cream bubble) word by word
    def onphone(dx, dz, h=0.006): return PHONE + Vector((dx, -h, dz))
    b1 = slab(0.31, 0.105, onphone(-0.005, 0.2), GREYP_L, "bubble 1", rot=3, emit=0.3); keep_parent(b1, rig)
    tb1 = txt("Reminder: your\nappointment is\nTue at 10:30.", MONO, 0.026, onphone(-0.005, 0.2, 0.01), "bubble 1 text", parent=rig); tb1.rotation_euler[1] = math.radians(3)
    b2 = slab(0.31, 0.2, onphone(0.0, 0.02), CREAM_L, "bubble 2", rot=3, emit=0.35); keep_parent(b2, rig)
    visible(b1, [(144, 259), (317, N)]); visible(tb1, [(144, 259), (317, N)]); visible(b2, [(187, 259), (317, N)])
    WORDS = [("This", 187, 0), ("appointment", 191, 0), ("costs", 198, 1), ("the", 206, 1), ("NHS", 211, 1)]
    x0, line_x = -0.135, [-0.135, -0.135]
    for w, m, ln in WORDS:
        o = txt(w, MONO, 0.026, onphone(line_x[ln], 0.085 - ln * 0.036, 0.01), "w " + w, align="LEFT")
        bpy.context.view_layer.update(); line_x[ln] += o.dimensions.x + 0.017
        keep_parent(o, rig); visible(o, [(m, 259), (317, N)])
    # £160 written by hand (ochre ink), 217–245, under "costs the NHS"; the pen tip follows the stroke
    G = {"£": [[(0.55, 0.85), (0.45, 0.98), (0.3, 0.95), (0.22, 0.8), (0.22, 0.5), (0.2, 0.25), (0.08, 0.04)], [(0.04, 0.03), (0.6, 0.03)], [(0.04, 0.5), (0.42, 0.5)]],
         "1": [[(0.12, 0.78), (0.32, 1.0), (0.32, 0.0)]],
         "6": [[(0.5, 0.96), (0.3, 0.82), (0.13, 0.52), (0.1, 0.25), (0.2, 0.04), (0.38, 0.0), (0.5, 0.12), (0.52, 0.3), (0.4, 0.45), (0.22, 0.45), (0.12, 0.3)]],
         "0": [[(0.32 + 0.22 * math.sin(2 * math.pi * k / 16), 0.5 + 0.5 * math.cos(2 * math.pi * k / 16)) for k in range(18)]]}
    GH, gx = 0.062, -0.125; base = onphone(0, -0.065, 0.01); strokes = []
    for ch in "£160":
        for s in G[ch]:
            pts = []
            for i in range(len(s) - 1):                      # densify so the reveal is smooth
                for k in range(4): u = k / 4; pts.append(base + Vector((gx + GH * (s[i][0] + (s[i + 1][0] - s[i][0]) * u), 0, GH * (s[i][1] + (s[i + 1][1] - s[i][1]) * u - 0.5))))
            pts.append(base + Vector((gx + GH * s[-1][0], 0, GH * (s[-1][1] - 0.5)))); strokes.append(pts)
        gx += GH * 0.68
    lens_ = [sum((p[i + 1] - p[i]).length for i in range(len(p) - 1)) for p in strokes]; tot = sum(lens_); f = 217.0; spans = []
    for p, ln in zip(strokes, lens_):
        d = 26.0 * ln / tot; spans.append((round(f), round(f + d))); f += d + 0.4
    inks = [ink(p, colour=OCHRE_L, radius=0.0042, name="pound %d" % i, draw=(B(s0), B(max(s0 + 1, s1)))) for i, (p, (s0, s1)) in enumerate(zip(strokes, spans))]
    for o in inks: visible(o, [(202, 259), (317, N)])
    hp_h = 2.4; hp = hand(L + "CO_hand_pen.png", hp_h, "hand pen"); toff = tip_offset(hp, (722, 2292), (37, 24), hp_h)
    def tip_at(m):
        for p, (s0, s1) in zip(strokes, spans):
            if m < s0: return p[0], 0.03
            if m <= s1: u = (m - s0) / max(1, s1 - s0); return p[min(len(p) - 1, int(u * (len(p) - 1)))], 0.0
        return strokes[-1][-1], 0.03
    pk = [(201, strokes[0][0] + Vector((0.5, -0.12, -0.9)) - toff), (202, strokes[0][0] + Vector((0.28, -0.08, -0.45)) - toff), (205, strokes[0][0] + Vector((0.06, -0.05, -0.08)) - toff)]
    for m in range(208, 248):
        p, lift = tip_at(m); pk.append((m, p + Vector((0, -0.012 - lift, 0)) - toff))
    pk += [(250, strokes[-1][-1] + Vector((0.05, -0.06, -0.1)) - toff), (256, strokes[-1][-1] + Vector((0.4, -0.1, -1.2)) - toff)]
    key_loc(hp, pk); visible(hp, [(202, 259)])
    # "one extra line": an ochre underline under the new line, 318–330
    ul = [onphone(-0.14 + 0.28 * j / 15, -0.108 + 0.004 * math.sin(j * 1.3), 0.012) for j in range(16)]
    u = ink(ul, colour=OCHRE_L, radius=0.005, name="underline", draw=(B(318), B(330))); visible(u, [(317, N)])
    # THE PRICE DID. slapped in by a hand, lands at 380
    ps = slab(1.0, 0.36, PRICE, CREAM_L, "price slip", rot=3)
    t2 = txt("THE PRICE DID.", ANTON, 0.15, PRICE + Vector((0, -0.006, 0)), "price text", parent=ps); t2.rotation_euler[1] = math.radians(3)
    key_loc(ps, [(373, PRICE + Vector((-0.2, -0.3, -1.4))), (374, PRICE + Vector((-0.1, -0.16, -0.7))), (377, PRICE + Vector((-0.02, -0.05, -0.15))), (380, PRICE)])
    visible(ps, [(374, N)]); visible(t2, [(374, N)])
    h4 = hand(L + "CO_hand.png", 2.6, "hand price"); qo = Vector((0, 0, -1.15))
    key_loc(h4, [(373, PRICE + qo + Vector((-0.2, -0.33, -1.4))), (374, PRICE + qo + Vector((-0.1, -0.19, -0.7))), (377, PRICE + qo + Vector((-0.02, -0.08, -0.15))), (380, PRICE + qo + Vector((0, -0.04, 0))),
                 (386, PRICE + qo + Vector((0, -0.07, -0.12))), (395, PRICE + qo + Vector((0.1, -0.12, -1.8)))]); visible(h4, [(374, 403)])
    cutouts = [slip, pr, ph, ps, h1, h2, h3, h4, hp]
    # camera
    shot(0, 29, (0.42, 0.44), 2.7, (0.42, 0.43), 2.55)
    shot(29, 58, (0.40, 0.41), 1.6, (0.40, 0.405), 1.5)
    shot(58, 86, (0.5, 0.45), 2.3, (0.5, 0.44), 2.2)
    shot(144, 173, (0.58, 0.60), 1.9, (0.59, 0.61), 1.75)
    shot(173, 202, (0.60, 0.62), 0.95, (0.60, 0.62), 0.9)
    shot(202, 259, (0.58, 0.64), 0.62, (0.58, 0.64), 0.56)
    shot(317, 346, (0.58, 0.64), 0.6, (0.58, 0.64), 0.55)
    shot(346, 374, (0.5, 0.56), 3.1, (0.5, 0.56), 3.0)
    shot(374, N, (0.5, 0.58), 3.1, (0.5, 0.58), 2.85)
    done_camera()
    RENDER = [(0, 29), (29, 58), (58, 86), (144, 173), (173, 202), (202, 259), (317, 346), (346, 374), (374, N)]
    lp = at(0.86, 0.06, 0.6)
    practical_light(tuple(lp), 0.4, 25, colour=(1, 0.85, 0.62), aim=(90, 0, 0), only=collection("cutouts", [o for o in cutouts]))
else:
    # 2A 86–115: close on the rows (patients sit; one empty seat in view); 115–144: the whole room, 4 of 36 seats empty,
    #   ink rings drawn round them (118–136)
    # 4A 259–288: the whole room; a giant paper hand carries a patient into one ringed seat (lands 282: "a quarter");
    #   288–317: close on that seat, the hand leaves
    S = json.load(open(L + "seats.json")); ROWS, COLS = S["rows"], S["cols"]
    EMPTY, FILL = [(1, 2), (3, 0), (5, 3), (7, 1)], (5, 3)
    CW = 223                                            # a plate seat's width (px)
    looks = ["CO_patient1", "CO_patient2", "CO_patient1_ink", "CO_patient2_ochre", "CO_patient1_ochre", "CO_patient2_ink"]
    rnd = random.Random(4)
    def patient(look, r, c, h=0.1, name=None):
        size = (1178, 2072 if "patient1" in look else 2313); s = CW * 0.97 / 943     # the cut-out's chair ≈ the plate's seat
        hgt = size[1] * s * PH / PIMG[1]; top = ROWS[r] - 105
        p = px(COLS[c] + (589 - 623) * s, top + size[1] * s / 2, h + 0.004 * r)
        o = card(L + look + ".png", hgt, loc=tuple(p), wobble=0, name=name or "patient %d,%d" % (r, c)); flat(o, rnd.uniform(-3, 3))
        if rnd.random() < 0.5: o.scale.x = -o.scale.x
        return o, p
    people = []
    for r in range(len(ROWS)):
        for c in range(len(COLS)):
            if (r, c) in EMPTY: continue
            o, _ = patient(looks[(r * 4 + c * 3 + r // 2) % len(looks)], r, c); people.append(o)
    rings = []
    for i, (r, c) in enumerate(EMPTY):
        ctr = px(COLS[c], ROWS[r] + 40, 0.1)
        g = ink_ring(tuple(ctr), 0.26, 0.3, colour=OCHRE_L, radius=0.016, name="ring %d" % i, draw=(B(118 + 4 * i), B(124 + 4 * i))); rings.append(g)
    # the late patient, carried in by a giant hand (4A)
    np_, SEAT = patient("CO_patient1_ink", FILL[0], FILL[1], name="late patient"); people.append(np_)
    hd = hand(L + "CO_hand.png", 3.4, "hand carry"); grip = Vector((0.02, -0.5, -1.75))
    carry = [(258, Vector((0.35, -0.55, -4.2))), (259, Vector((0.3, -0.5, -3.3))), (262, Vector((0.18, -0.42, -2.1))), (265, Vector((0.1, -0.35, -1.2))),
             (268, Vector((0.05, -0.25, -0.6))), (271, Vector((0.02, -0.16, -0.28))), (274, Vector((0.01, -0.09, -0.1))), (277, Vector((0, -0.04, -0.03))), (280, Vector((0, -0.01, 0))), (282, Vector((0, 0, 0)))]
    key_loc(np_, [(m, SEAT + d) for m, d in carry])
    key_loc(hd, [(m, SEAT + d + grip) for m, d in carry] + [(285, SEAT + grip + Vector((0, -0.08, -0.1))), (291, SEAT + grip + Vector((0.1, -0.2, -1.6))), (297, SEAT + grip + Vector((0.2, -0.3, -4.5)))])
    visible(hd, [(259, 317)])
    cutouts = people + [hd]
    shot(86, 115, (0.5, 0.38), 3.3, (0.5, 0.41), 3.1)
    shot(115, 144, (0.5, 0.5), 6.9, (0.5, 0.5), 6.6)
    shot(259, 288, (0.5, 0.5), 6.6, (0.5, 0.52), 6.3)
    shot(288, 317, (0.70, 0.62), 1.9, (0.70, 0.615), 1.75)
    done_camera()
    RENDER = [(86, 115), (115, 144), (259, 288), (288, 317)]
    collection("cutouts", cutouts)
translucent([o for o in cutouts if o.type == "MESH"], 0.15)
frames = [B(m) for m in STILLS] if STILLS else sorted({B(m) for m0, m1 in RENDER for m in range(m0, m1, 3)})
# the boil, only on the frames we render: read every pose first, then key pose + jitter (CONSTANT)
jr = random.Random(5); base = {}
for f in frames:
    sc.frame_set(f); base[f] = [(o.location.copy(), o.rotation_euler.copy()) for o in cutouts]
for f in frames:
    for o, (l, e) in zip(cutouts, base[f]):
        o.location = (l.x + jr.uniform(-1, 1) * 0.0015, l.y, l.z + jr.uniform(-1, 1) * 0.0015)
        o.rotation_euler = (e.x, e.y + math.radians(jr.uniform(-0.3, 0.3)), e.z)
        o.keyframe_insert("location", frame=f); o.keyframe_insert("rotation_euler", frame=f)
for o in cutouts: interpolation(o, "CONSTANT")
flicker(key, N + 1, pct=1.5, every=1)
render(OUT, frames=frames, prefix="f")
json.dump({"render": RENDER}, open(OUT + "/spans.json", "w"))

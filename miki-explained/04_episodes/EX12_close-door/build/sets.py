# EX12 paper sets (Blender, paperkit v2): five generated eye-level plates as shadow boxes, walked through first-person (C4).
#   blender -b --python build/sets.py -- <LIFT|CROSS|OFFICE|TABLE|COUNTER> <out_dir> [still m,m,…] [half]
# Plates stand at y=0 facing −Y; the camera looks along +Y (eye level). Blender frame = MASTER frame + 1; each sequence
# renders only its MASTER spans, on twos (12 fps), and build/holds.py fills the held frames.
# A8 paper mechanisms: our own paper button (CO_button) sits on each plate's button and presses in; the lift doors are
# two paper leaves that slide behind the wall; E13: shots 3–5 share one framing (the button, same size on screen).
import sys, math, random, json, bpy
from mathutils import Vector
sys.path.insert(0, "/Users/user/Private/miki-studio/miki-explained/tools/blender")
from paperkit import *
a = sys.argv[sys.argv.index("--") + 1:]; SEQ, OUT = a[0], a[1]
STILLS = [int(x) for x in a[a.index("still") + 1].split(",")] if "still" in a else None
EP = "/Users/user/Private/miki-studio/miki-explained/04_episodes/EX12_close-door/"; L = EP + "layers/"
INFO = json.load(open(L + "prep.json"))
N = 1150
sc = setup(N + 1, 540 if "half" in a else 1080, 960 if "half" in a else 1920); random.seed(12); sc.eevee.taa_render_samples = 32
def B(m): return m + 1
PH, PW, ZC = 4.0, 4.0 * 1440 / 2560, 2.0
def at(px, py, y=0.0, s=1.0): return Vector(((px / 1440 - 0.5) * PW * s, y, ZC + (0.5 - py / 2560) * PH * s))   # s: a band's shrink
def wpx(n): return n * PH / 2560                                  # plate pixels → world
sun, fill = lights(key=2.6, fill=14, key_dir=(30, 0, 25)); fill.location = (-2, -5, 4)

# ---------- camera (first-person: straight ahead, a small walking bob and sway) ----------
bpy.ops.object.camera_add(location=(0, -frame_dist(PH), ZC)); cam = bpy.context.object; sc.camera = cam
cam.data.lens = 35; cam.rotation_euler = (math.radians(90), 0, 0)
cam.data.dof.use_dof = True; cam.data.dof.aperture_fstop = 5.6
def frame(px, py, h, y0=0.0, s=1.0):
    """camera position that frames plate point (px, py) at frame height h (for a plane at y0)."""
    p = at(px, py, 0, s); return Vector((p.x, y0 - frame_dist(h), p.z))
def cam_keys(k, bob=0.0):
    """k = [(m, position), …]: eased; a cut is two keys on adjacent frames. bob adds a walking bob on the moving parts."""
    for m, p in k:
        cam.location = tuple(p); cam.keyframe_insert("location", frame=B(m))
        cam.data.dof.focus_distance = max(0.3, -p.y + 0.0); cam.data.dof.keyframe_insert("focus_distance", frame=B(m))
    interpolation(cam, "BEZIER"); interpolation(cam.data, "BEZIER")
def walk_sway(spans, amp=0.012, deg=0.35):
    """first-person handheld: a slow sway on rotation (never a jitter), only inside the given spans."""
    for m0, m1 in spans:
        for m in range(m0, m1, 6):
            cam.rotation_euler = (math.radians(90 + deg * math.sin(m / 9.0)), math.radians(deg * 0.6 * math.sin(m / 13.0)), math.radians(deg * 0.5 * math.sin(m / 11.0)))
            cam.keyframe_insert("rotation_euler", frame=B(m))

# ---------- the paper button and the pointing hand ----------
HAND_W, HAND_H = INFO["hand"]["size"]; TIP = INFO["hand"]["tip"]
def button(px, py, r_px, y, s=1.0):
    """our ochre paper button over the plate's button (r_px = the plate button's radius), on a band shrunk by s."""
    hb = wpx(2 * r_px) * 217 / 186 * s
    o = card(L + "CO_button.png", hb, loc=tuple(at(px, py, y, s)), wobble=0, name="button"); o.rotation_euler = (math.radians(90), 0, 0)
    o.modifiers.new("thickness", "SOLIDIFY").thickness = hb * 0.08; return o, hb
def hand_for(hb, name="hand"):
    s = hb * (186 / 217) / 372                                     # world per hand-image pixel (its painted button was 372 px)
    o = card(L + "CO_hand_point.png", HAND_H * s, loc=(0, 0, -20), wobble=0, name=name); o.rotation_euler = (math.radians(90), 0, math.radians(0))
    tip = Vector(((TIP[0] - HAND_W / 2) * s, 0, (HAND_H / 2 - TIP[1]) * s)); return o, tip
def presses(hand, tip, btn, centre, starts, y_front=0.012, approach=Vector((-0.5, 0, -0.9)), dist=0.9, depth=0.007):
    """the finger comes in from the lower left, presses (button and finger go in by `depth`), lets go, rests a little off."""
    k_h, k_b = [], []
    base_b = btn.location.copy()
    for i, m in enumerate(starts):
        far = centre + approach * dist; near = centre + Vector((0, -y_front, 0))
        if i == 0: k_h.append((m - 1, far - tip + Vector((0, -y_front, 0))))
        k_h += [(m, near + approach * 0.25 - tip), (m + 4, near - tip), (m + 6, near + Vector((0, depth, 0)) - tip), (m + 10, near + Vector((0, depth, 0)) - tip),
                (m + 13, near + approach * 0.12 - tip)]
        k_b += [(m + 4, base_b), (m + 6, base_b + Vector((0, depth, 0))), (m + 10, base_b + Vector((0, depth, 0))), (m + 12, base_b)]
    for m, p in k_h: hand.location = tuple(p); hand.keyframe_insert("location", frame=B(m))
    for m, p in k_b: btn.location = tuple(p); btn.keyframe_insert("location", frame=B(m))
    interpolation(hand, "LINEAR"); interpolation(btn, "CONSTANT")
def visible(o, spans):
    for prop in ("hide_render", "hide_viewport"):
        setattr(o, prop, True); o.keyframe_insert(prop, frame=1)
        for m0, m1 in spans:
            setattr(o, prop, False); o.keyframe_insert(prop, frame=B(m0)); setattr(o, prop, True); o.keyframe_insert(prop, frame=B(m1))
def band_y(box, px, py, gap):
    """depth (y) of the nearest band that covers plate pixel (px, py)."""
    bs = json.load(open(box + "/bands.json")); k0 = 0
    for b in bs:
        img = bpy.data.images.load(box + "/band_%d.png" % b["band"]); w, h = img.size
        i = ((h - 1 - int(py)) * w + int(px)) * 4
        if img.pixels[i + 3] > 0.5: k0 = b["band"]
    d = gap * k0; return -d, (frame_dist(PH) - d) / frame_dist(PH)

RENDER, paper = [], []
if SEQ == "LIFT":
    # 1  0–166   at the panel: jab (8, 27), "GUESS · 0:03"; turn to the doors that just wait (98–166)
    # 2a 166–274 the doors slide open (198–222, "doors… open"); walk toward the opening
    # 3  384–409 matched 1/3: the close button, finger presses
    # 8  979–1150 back at the panel (bookend), the doors open; jab (992); pull back; the doors close by themselves (1036–1060)
    GAP = 0.25; BOX = L + "box_ENV_lift"; bands = shadowbox(BOX, height=PH, centre=ZC, gap=GAP)
    D = INFO["door"]; MID = INFO["mid"]; dh = wpx(D[3] - D[1]); dw = wpx(MID - D[0])
    dl = card(L + "door_left.png", dh, loc=tuple(at((D[0] + MID) / 2, (D[1] + D[3]) / 2, 0.03)), wobble=0, name="door left")
    dr = card(L + "door_right.png", dh, loc=tuple(at((MID + D[2]) / 2, (D[1] + D[3]) / 2, 0.03)), wobble=0, name="door right")
    for o in (dl, dr): o.rotation_euler = (math.radians(90), 0, 0); glow(o, 0.8)
    dist0 = frame_dist(PH); k = (dist0 + 1.0) / dist0
    lv = card(L + "lobby_view.png", dh * k * 1.7, loc=tuple(at(720, (D[1] + D[3]) / 2, 1.0)), wobble=0, name="lobby view"); lv.rotation_euler = (math.radians(90), 0, 0); glow(lv, 0.85)
    def doors(k):                                                   # k = [(m, 0 closed … 1 open)], on twos
        for m, u in k:
            dl.location.x = at((D[0] + MID) / 2, 0).x - dw * 0.98 * u; dr.location.x = at((MID + D[2]) / 2, 0).x + dw * 0.98 * u
            dl.keyframe_insert("location", index=0, frame=B(m)); dr.keyframe_insert("location", index=0, frame=B(m))
    doors([(0, 0), (198, 0), (202, 0.08), (206, 0.25), (210, 0.48), (214, 0.7), (218, 0.86), (222, 0.96), (226, 1.0), (1036, 1.0), (1040, 0.92), (1044, 0.75), (1048, 0.52),
           (1052, 0.3), (1056, 0.12), (1060, 0.02), (1062, 0)])
    interpolation(dl, "CONSTANT"); interpolation(dr, "CONSTANT")
    BX, BY, BR = 1356, 1155, 36
    yb, sb = band_y(BOX, BX, BY, GAP); yb -= 0.025
    btn, hb = button(BX, BY, BR, yb, sb); hand, tip = hand_for(hb)
    presses(hand, tip, btn, at(BX, BY, yb, sb), [8, 27, 386, 990], approach=Vector((-0.45, 0, -0.85)), dist=0.55)
    visible(hand, [(0, 70), (384, 409), (979, 1030)])
    paper = [hand, btn, dl, dr]
    PANEL, M = frame(1085, BY + 40, 1.8, yb, sb), frame(BX, BY, 0.75 * sb, yb, sb)
    WIDE = Vector((0, -frame_dist(PH) * 0.97, ZC)); DOORW = Vector((at(720, 1300).x, -frame_dist(PH) * 0.85, ZC - 0.1))
    cam_keys([(0, PANEL + Vector((0.02, 0.05, 0))), (90, PANEL), (100, PANEL + Vector((-0.1, -0.05, 0))), (130, DOORW), (165, DOORW + Vector((0, 0.05, 0))),
              (166, DOORW + Vector((0, 0.05, 0))), (226, DOORW + Vector((0, 0.15, 0))), (273, Vector((DOORW.x, -1.15, ZC - 0.1))),
              (384, M + Vector((0, -0.01, 0))), (408, M), (979, PANEL), (1010, PANEL + Vector((0, 0.02, 0))), (1030, WIDE), (1149, WIDE + Vector((0, 0.12, 0)))])
    walk_sway([(0, 274), (979, 1150)])
    RENDER = [(0, 166), (166, 274), (384, 409), (979, 1150)]
elif SEQ in ("CROSS", "OFFICE"):
    # CROSS  409–591: matched 2/3 (the walk button, finger presses at 413), then step back to the street (445–480); a last press (566)
    # OFFICE 589–637: matched 3/3 (the thermostat), presses at 593 and 618
    plate, GAP, (BX, BY, BR) = ("crossing", 0.3, (441, 1155, 84)) if SEQ == "CROSS" else ("office", 0.3, (495, 1155, 100))
    BOX = L + "box_ENV_" + plate; shadowbox(BOX, height=PH, centre=ZC, gap=GAP)
    yb, sb = band_y(BOX, BX, BY, GAP); yb -= 0.025
    btn, hb = button(BX, BY, BR, yb, sb); hand, tip = hand_for(hb)
    s = BR / 36.0; M = frame(BX, BY, 0.75 * s * sb, yb, sb)
    if SEQ == "CROSS":
        presses(hand, tip, btn, at(BX, BY, yb, sb), [413, 566], approach=Vector((-0.45, 0, -0.85)), dist=1.2)
        st = Vector((0, -frame_dist(PH) * 0.92, ZC))
        cam_keys([(409, M), (444, M + Vector((0, 0.02, 0))), (480, st), (590, st + Vector((0.05, 0.25, 0)))])
        walk_sway([(445, 591)]); RENDER = [(409, 591)]
    else:
        presses(hand, tip, btn, at(BX, BY, yb, sb), [593, 618], approach=Vector((-0.45, 0, -0.85)), dist=1.2)
        cam_keys([(589, M), (636, M + Vector((0, 0.03, 0)))]); RENDER = [(589, 637)]
    paper = [hand, btn]
elif SEQ == "TABLE":
    # 6  637–797: the break. Starts on the thermostat prop framed like shot 5, then pulls back fast (645–668): the three
    #    "buttons" are paper props standing on one table, a paper hand still pressing.
    bpy.ops.mesh.primitive_plane_add(size=1, location=(0, -1.0, 0)); tb = bpy.context.object; tb.scale = (12, 8, 1); tb.name = "table"
    mt = bpy.data.materials.new("table"); mt.use_nodes = True; nt = mt.node_tree; bs_ = nt.nodes["Principled BSDF"]
    ti = nt.nodes.new("ShaderNodeTexImage"); ti.image = bpy.data.images.load(L + "paper.png"); nt.links.new(ti.outputs["Color"], bs_.inputs["Base Color"])
    bs_.inputs["Roughness"].default_value = 0.95; tb.data.materials.append(mt)
    back = card(L + "paper.png", 9, loc=(0, 2.6, 3.2), wobble=0, name="backdrop"); back.rotation_euler = (math.radians(90), 0, 0); glow(back, 0.6)
    props = {}
    for n, x in (("prop_lift", -0.66), ("prop_cross", 0.0), ("prop_office", 0.7)):
        w, h = INFO[n]["size"]; hh = 0.95 if n != "prop_lift" else 1.5
        o = card(L + n + ".png", hh, loc=(x, 0, hh / 2), wobble=0, name=n); o.rotation_euler = (math.radians(90), 0, math.radians(random.uniform(-6, 6)))
        o.modifiers.new("thickness", "SOLIDIFY").thickness = 0.02; props[n] = (o, hh, w, h); paper.append(o)
    def on_prop(n, bx, by, br):                                    # a point on a prop from its plate pixel
        o, hh, w, h = props[n]; box = INFO[n]["box"]; e = (w - (box[2] - box[0])) / 2; sp = hh / h
        return Vector((o.location.x + (bx - box[0] + e - w / 2) * sp, -0.03, hh / 2 + (h / 2 - (by - box[1] + e)) * sp)), br * sp
    for n, (bx, by, br) in (("prop_lift", (1356, 1155, 36)), ("prop_cross", (441, 1155, 84)), ("prop_office", (495, 1155, 100))):
        c, r = on_prop(n, bx, by, br); hb = 2 * r * 217 / 186
        b_ = card(L + "CO_button.png", hb, loc=tuple(c), wobble=0, name="button " + n); b_.rotation_euler = (math.radians(90), 0, 0); paper.append(b_)
        if n == "prop_office":
            hand, tip = hand_for(hb); hand.location = tuple(c + Vector((0, -0.02, 0)) - tip); paper.append(hand)
            OFF = c
    bpy.ops.object.empty_add(location=tuple(OFF)); tgt = bpy.context.object
    tr = cam.constraints.new("TRACK_TO"); tr.target = tgt; tr.track_axis = "TRACK_NEGATIVE_Z"; tr.up_axis = "UP_Y"
    near = OFF + Vector((0, -0.75, 0))
    def ck(m, p, t):
        cam.location = tuple(p); cam.keyframe_insert("location", frame=B(m)); tgt.location = tuple(t); tgt.keyframe_insert("location", frame=B(m))
    wide_t = Vector((0.03, 0, 0.62)); wide_p = Vector((0.05, -3.4, 1.05))
    ck(637, near, OFF); ck(645, near + Vector((0, -0.05, 0)), OFF); ck(668, wide_p + Vector((0, 0.6, -0.1)), wide_t); ck(796, wide_p, wide_t)
    interpolation(cam, "BEZIER"); interpolation(tgt, "BEZIER")
    cam.data.dof.focus_distance = 5.0; RENDER = [(637, 797)]
elif SEQ == "COUNTER":
    # 7  797–979: walk up behind ten waiting customers to the bubble tea counter
    GAP = 0.35; shadowbox(L + "box_ENV_counter", height=PH, centre=ZC, gap=GAP)
    looks = ["CO_waiting1", "CO_waiting2", "CO_waiting1_ink", "CO_waiting2_light", "CO_waiting1_light", "CO_waiting2_ink"]
    SPOTS = [(-0.75, -0.9), (0.15, -0.95), (0.85, -1.0), (-0.35, -1.45), (0.55, -1.5), (-1.0, -1.95), (0.05, -2.0), (0.95, -2.05), (-0.55, -2.55), (0.6, -2.6)]
    FLOOR, HP = 0.35, 1.78
    for i, (x, y) in enumerate(SPOTS):
        hh = HP * random.uniform(0.94, 1.04)
        o = card(L + looks[i % len(looks)] + ".png", hh, loc=(x, y, FLOOR + hh / 2), name="customer %d" % i)
        if i % 3 == 1: o.scale.x = -o.scale.x
        paper.append(o)
    st = Vector((0, -frame_dist(PH) * 1.0, ZC + 0.15))
    cam_keys([(797, st), (900, st + Vector((0.05, 0.75, -0.05))), (978, st + Vector((0.08, 0.95, -0.06)))])
    walk_sway([(797, 979)], amp=0.015, deg=0.5); RENDER = [(797, 979)]
translucent([o for o in paper if o.type == "MESH"], 0.15)
frames = [B(m) for m in STILLS] if STILLS else sorted({B(m) for m0, m1 in RENDER for m in range(m0, m1, 2)})
boil([o for o in paper if o.name.startswith(("customer", "prop", "button "))], N + 1, amp=0.001, rot=0.15, every=2)
flicker(sun, N + 1, pct=1.5, every=2)
render(OUT, frames=frames, prefix="f")
json.dump({"render": RENDER}, open(OUT + "/spans.json", "w"))

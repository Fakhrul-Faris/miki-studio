# EX05 paper barbershop (Blender). blender -b --python build/shop.py -- <SEQ> <out_dir> [still f,f,…] [half]
#   LOOP  144 f: calm shop; the middle barber turns and walks out from f52 (5A = f1–64, 1A = f65–144: seamless loop)
#   CALM  135 f: three barbers working, two waiting (1B)
#   QUEUE 138 f: the middle barber is lifted out, the queue fills on twos, the camera cranes back (2A)
import sys, math, random, bpy
sys.path.insert(0, "/Users/user/Private/miki-studio/miki-explained/tools/blender")
from paperkit import *
a = sys.argv[sys.argv.index("--") + 1:]; SEQ, OUT = a[0], a[1]
STILLS = [int(x) for x in a[a.index("still") + 1].split(",")] if "still" in a else None
HALF = "half" in a
L = "/Users/user/Private/miki-studio/miki-explained/04_episodes/EX05_one-barber-down/layers/"
N = {"LOOP": 144, "CALM": 135, "QUEUE": 138}[SEQ]
sc = setup(N, 540 if HALF else 1080, 960 if HALF else 1920); random.seed(7)
sc.eevee.taa_render_samples = 32

def stand(o, base_z):                                    # put a card's bottom edge at base_z
    o.location.z = base_z + o.scale.y / 2; return o
def hide(o, f_off=None, f_on=None):                      # keyed render visibility (call after on_twos/boil)
    if f_off is not None: o.hide_render = False; o.keyframe_insert("hide_render", frame=1 if f_on is None or f_on > f_off else f_on); o.hide_render = True; o.keyframe_insert("hide_render", frame=f_off)
    if f_on is not None: o.hide_render = True; o.keyframe_insert("hide_render", frame=1); o.hide_render = False; o.keyframe_insert("hide_render", frame=f_on)
    interpolation(o, "CONSTANT")
def mirror(o): o.scale.x = -o.scale.x; return o

# ---- the set ----
WALLPAPER, WAINSCOT = (0.604, 0.493, 0.355, 1), (0.42, 0.19, 0.025, 1)   # linear (sRGB 0.80/0.73/0.63, 0.68/0.47/0.17)
sheet(6.0, 7.0, loc=(0, -1.5, 0), rot=(0, 0, 0), colour=(0.78, 0.72, 0.62, 1), name="floor")
WH = 3.2; wall = stand(card(L + "wall.png", WH, loc=(0, 1.3, 0), wobble=0, name="wall"), 0)
WW = WH * 1440 / 2245
for sx in (-1, 1):                                        # plain paper either side, so the wall's edge never shows
    sheet(2.0, WH * (645 / 2245), loc=(sx * (WW / 2 + 1.0), 1.31, WH * (645 / 2245) / 2), colour=WAINSCOT, name="wainscot ext")
    sheet(2.0, WH * (1600 / 2245), loc=(sx * (WW / 2 + 1.0), 1.31, WH * (645 / 2245) + WH * (1600 / 2245) / 2), colour=WALLPAPER, name="wall ext")
sheet(6.0, 2.0, loc=(0, 1.31, WH + 1.0), colour=WALLPAPER, name="wall top")
X = [-491 / 1440 * WW, -5 / 1440 * WW, 481 / 1440 * WW]  # under the three mirrors
chairs = [stand(card(L + "CO_chair.png", 0.97, loc=(x, 0.95, 0), name="chair %d" % i), 0) for i, x in enumerate(X)]
barbers = [stand(card(L + "CO_barber.png", 1.6, loc=(x + 0.16, 1.14, 0), name="barber %d" % i), 0) for i, x in enumerate(X)]
CL = ["CO_wait1_ink", "CO_wait3_ink", "CO_wait1_ink"]
clients = [stand(card(L + CL[i] + ".png", 1.1, loc=(x, 0.9, 0), name="client %d" % i), 0.09) for i, x in enumerate(X)]
mirror(clients[2])
leaving = stand(card(L + "CO_barber_leaving.png", 1.6, loc=(0.1, 0.35, 0), name="leaving"), 0)
WAIT = [("CO_wait2", -0.6, -0.75, False), ("CO_wait3", 0.6, -0.75, True),        # the calm queue (two)
        ("CO_wait1", 0.0, -0.82, False), ("CO_wait2_light", -0.3, -0.3, True), ("CO_wait1", 0.3, -0.3, True), ("CO_wait3_ink", 0.88, -0.38, False)]
waiting = []
for i, (f, x, y, m) in enumerate(WAIT):
    o = stand(card(L + f + ".png", 1.1, loc=(x, y, 0), name="wait %d" % i), 0); waiting.append(mirror(o) if m else o)
sun, fill = lights(key=3.2, fill=35, key_dir=(52, 0, 32))

# ---- camera (world-space, tracks an empty) ----
bpy.ops.object.empty_add(location=(0, 0.6, 0.75)); tgt = bpy.context.object
bpy.ops.object.camera_add(location=(0, -3.4, 1.55)); cam = bpy.context.object; sc.camera = cam
c = cam.constraints.new("TRACK_TO"); c.target = tgt; c.track_axis = "TRACK_NEGATIVE_Z"; c.up_axis = "UP_Y"
cam.data.lens = 40; cam.data.dof.use_dof = True; cam.data.dof.aperture_fstop = 4.5; cam.data.dof.focus_object = barbers[1]
def camkeys(k):                                         # k = [(frame, cam_xyz, target_xyz), …]
    for f, p, t in k:
        cam.location = p; cam.keyframe_insert("location", frame=f); tgt.location = t; tgt.keyframe_insert("location", frame=f)
    interpolation(cam, "BEZIER"); interpolation(tgt, "BEZIER")

# ---- animation ----
moving, show, gone = [], [], []
def snip(b, seed):                                      # a working barber: small lean back and forth, held on twos
    r = random.Random(seed); z0 = b.rotation_euler.y
    for f in range(1, N + 1, 6):
        b.rotation_euler.y = z0 + math.radians(r.uniform(-1.8, 1.8)); b.keyframe_insert("rotation_euler", index=1, frame=f)
if SEQ in ("LOOP", "CALM"):
    for i in (2, 3, 4, 5): gone.append((waiting[i], None))
    for i, b in enumerate(barbers): snip(b, 10 + i)
    if SEQ == "LOOP":
        b = barbers[1]; gone.append((b, 52)); show.append((leaving, 52))
        x0 = leaving.location.x
        for f in range(52, N + 1):
            p = (f - 52) / 58.0; leaving.location.x = x0 + 1.8 * p
            leaving.location.z = 0.8 + 0.025 * abs(math.sin(math.pi * (f - 52) / 6)); leaving.keyframe_insert("location", frame=f)
        moving.append(leaving)
        camkeys([(1, (0.03, -3.6, 2.3), (0, 0.2, 0.85)), (N, (-0.03, -3.45, 2.36), (0, 0.2, 0.87))])
    else:
        gone.append((leaving, 0))
        camkeys([(1, (0, -3.7, 2.3), (0, 0.2, 0.85)), (N, (0, -3.0, 2.1), (0, 0.4, 0.92))])
else:   # QUEUE
    gone.append((leaving, 0)); gone.append((clients[1], 0))
    b = barbers[1]; z = b.location.z
    b.keyframe_insert("location", frame=4); b.location.z = z + 2.2; b.keyframe_insert("location", frame=16); moving.append(b); gone.append((b, 18))
    for i in (0, 2): snip(barbers[i], 20 + i)
    for k, i in enumerate((2, 3, 4, 5)):                  # "same customers walking in": they drop in on twos
        o = waiting[i]; f0 = 62 + 6 * k; z1 = o.location.z
        o.location.z = z1 + 0.14; o.keyframe_insert("location", frame=f0); o.location.z = z1; o.keyframe_insert("location", frame=f0 + 4)
        moving.append(o); show.append((o, f0))
    camkeys([(1, (0, -3.1, 2.1), (0, 0.4, 0.92)), (N, (0, -3.9, 2.6), (0, 0.1, 0.8))])
on_twos(moving, N)
boil(chairs + barbers + clients + waiting + [leaving], N, amp=0.0015, rot=0.25)
flicker(sun, N, pct=1.5)
for o, f in gone: hide(o, f_off=max(1, f) if f else 1)
for o, f in show: hide(o, f_on=f)
if "debug" in a:
    for f in (1, 60, 100, 130):
        sc.frame_set(f); print("DBG", f, [(o.name, o.hide_render, round(o.location.x, 2)) for o in waiting])
    raise SystemExit
if STILLS: render(OUT, frames=STILLS, prefix="still")
else: render(OUT)

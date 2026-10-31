# EX05 placeholder test: the paper barbershop as a 3D diorama. blender -b --python shop_test.py -- <out> [still]
import sys, math, random
sys.path.insert(0, "/Users/user/Private/miki-studio/miki-explained/tools/blender")
from paperkit import *
args = sys.argv[sys.argv.index("--") + 1:]; OUT = args[0]; STILL = len(args) > 1
PH = "/Users/user/Private/miki-studio/miki-explained/04_episodes/EX05_one-barber-down/build/blender_test/ph/"
N = 72
sc = setup(N, 540, 960); random.seed(4)
FZ = -0.5                                                     # floor height (camera target sits at the origin)
sheet(4.0, 6.0, loc=(0, -1.2, FZ), rot=(0, 0, 0), colour=(0.80, 0.74, 0.64, 1), name="floor")
sheet(3.4, 2.8, loc=(0, 1.4, FZ + 1.4), colour=(0.93, 0.89, 0.82, 1), name="wall")
sheet(3.4, 0.55, loc=(0, 1.39, FZ + 0.275), colour=(0.79, 0.54, 0.17, 1), name="wainscot")
X = [-0.58, 0, 0.58]
for i, x in enumerate(X):
    sheet(0.46, 0.62, loc=(x, 1.38, FZ + 1.15), colour=(0.16, 0.16, 0.17, 1), name="mirror %d" % i)
chairs = [card(PH + "chair.png", 0.6, loc=(x, 0.95, FZ + 0.3), name="chair %d" % i) for i, x in enumerate(X)]
barbers = [card(PH + "barber.png", 0.9, loc=(x + 0.22, 0.85, FZ + 0.45), name="barber %d" % i) for i, x in enumerate(X)]
bench = card(PH + "bench.png", 0.3, loc=(0, -0.2, FZ + 0.15), name="bench")
SEAT = FZ + 0.3 * (300 / 360) - 0.45 * (1 - 490 / 800) + 0.225  # seat line of a seated cut-out on the bench plank
cust = []
for i, x in enumerate([-0.45, -0.15, 0.15, 0.45]):
    c = card(PH + "customer%d.png" % (i % 3), 0.45, loc=(x, -0.16, SEAT), name="customer %d" % i); cust.append(c)
sun, fill = lights(key=3.5, fill=40, key_dir=(50, 0, 30))
tgt, cam = rig(distance=2.4, height=0.8, lens=32, target=(0, 0.35, -0.08))
miniature(cam, bench, fstop=3.5, lens=32)
# animation: the middle barber is already walking out (frame 1), customers drop onto the bench, camera cranes up
b = barbers[1]; x0 = b.location.x
for f in range(1, 41):
    b.location.x = x0 + 1.6 * (f - 1) / 39; b.location.z = FZ + 0.45 + 0.025 * abs(math.sin(math.pi * (f - 1) / 6))
    b.keyframe_insert("location", frame=f)
for i, c in enumerate(cust):
    f0 = 26 + 8 * i; z1 = c.location.z
    c.location.z = z1 + 0.12; c.keyframe_insert("location", frame=f0)
    c.location.z = z1; c.keyframe_insert("location", frame=f0 + 4)
cam.location = (0.05, -2.3, 0.55); cam.keyframe_insert("location", frame=1)
cam.location = (-0.05, -2.15, 0.8); cam.keyframe_insert("location", frame=N)
interpolation(cam, "BEZIER")
on_twos([b] + cust, N); boil(chairs + barbers + [bench] + cust, N, amp=0.002, rot=0.3); flicker(sun, N, pct=1.5)
for i, c in enumerate(cust):                                  # after on_twos/boil (they clear and re-key the object)
    f0 = 26 + 8 * i; c.hide_render = True; c.keyframe_insert("hide_render", frame=1)
    c.hide_render = False; c.keyframe_insert("hide_render", frame=f0); interpolation(c, "CONSTANT")
if STILL:
    render(OUT, frames=[1, 36, 72], prefix="still")
else:
    render(OUT, step=2)

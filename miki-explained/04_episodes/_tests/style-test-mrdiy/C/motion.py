"""Style C 10-s motion test: depth camera through the three plates, handed over by the shop's own light.
   ~/.local/bin/uv run --with numpy --with opencv-python python motion.py [--strip]"""
import math, subprocess, sys, numpy as np, cv2
FPS, DUR, OW, OH = 60, 10.0, 1080, 1920
def ease(u): u = min(max(u, 0.0), 1.0); return u * u * (3 - 2 * u) if False else (4*u**3 if u < .5 else 1 - (-2*u + 2)**3 / 2)
def lerp(a, b, u): return a + (b - a) * u
# plates (stills with overlays baked) and camera keys: (t, cx, cy, zoom) in plate px; zoom 1 = plate width fills frame
PL = {n: cv2.imread(f"stills/{n}.png").astype(np.float32) for n in ("C1", "C2", "C3")}
DP = {n: cv2.GaussianBlur(cv2.imread(f"depth/{n}.png", cv2.IMREAD_UNCHANGED).astype(np.float32) / 65535, (0, 0), 3) for n in PL}
SCENES = [  # name, t0, t1, keys
    ("C1", 0.0, 3.9, [(0.0, 720, 2050, 1.30), (2.2, 720, 1220, 1.22), (3.9, 690, 1360, 1.95)]),
    ("C2", 3.5, 7.0, [(3.5, 560, 1330, 2.10), (6.2, 720, 1480, 1.12), (7.0, 600, 1340, 1.45)]),
    ("C3", 6.6, 10.0, [(6.6, 560, 1330, 2.30), (10.0, 660, 1320, 1.55)]),
]
WASH = [(3.55, 3.85), (6.65, 6.95)]          # amber light-wash windows (push into the light → next plate out of it)
AMBER = np.array([110, 190, 255], np.float32)   # BGR
rng = np.random.default_rng(3)
RAIN = np.zeros((OH * 2, OW), np.float32)
for _ in range(1400):
    x, y, L = rng.integers(0, OW), rng.integers(0, OH * 2), rng.integers(18, 46)
    cv2.line(RAIN, (int(x), int(y)), (int(x - L * 0.18), int(y + L)), float(rng.uniform(0.25, 0.8)), 1, cv2.LINE_AA)
U, V = np.meshgrid(np.arange(OW, dtype=np.float32), np.arange(OH, dtype=np.float32))

def cam(keys, t):
    if t <= keys[0][0]: return keys[0][1:]
    for a, b in zip(keys, keys[1:]):
        if t <= b[0]:
            u = ease((t - a[0]) / (b[0] - a[0])); return tuple(lerp(a[i], b[i], u) for i in (1, 2, 3))
    return keys[-1][1:]
def render(name, keys, t):
    img, dep = PL[name], DP[name]; H, W = img.shape[:2]
    cx, cy, z = cam(keys, t); cx0, cy0, z0 = keys[0][1:]
    cx += 6 * math.sin(t * 0.9); cy += 4 * math.sin(t * 0.7 + 1)        # slow drift keeps holds alive
    s = OW / W * z
    hx, hy = OW / 2 / s * 1.04, OH / 2 / s * 1.04; cx = min(max(cx, hx), W - hx); cy = min(max(cy, hy), H - hy)
    x0 = cx + (U - OW / 2) / s; y0 = cy + (V - OH / 2) / s
    d = cv2.remap(dep, x0, y0, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)
    dref = float(dep[int(min(max(cy, 0), H - 1)), int(min(max(cx, 0), W - 1))])
    k = np.clip(d - dref, -0.5, 0.5)
    x = x0 + 0.35 * k * (cx - cx0) - (x0 - cx) * 0.18 * k * math.log(z / z0)
    y = y0 + 0.35 * k * (cy - cy0) - (y0 - cy) * 0.18 * k * math.log(z / z0)
    f = cv2.remap(img, x, y, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)
    b, g, r = f[..., 0], f[..., 1], f[..., 2]                          # warm light breathes
    warm = np.clip((r - b) / 120, 0, 1) * np.clip((r + g) / 510 - 0.35, 0, 1) * 1.6
    breath = 1 + 0.035 * math.sin(t * 2.3) + (0.02 * math.sin(t * 31) if name == "C1" else 0)
    f = f * (1 + (breath - 1) * cv2.GaussianBlur(np.clip(warm, 0, 1), (0, 0), 8)[..., None])
    if name in ("C1", "C2"):                                             # rain falls in screen space
        off = int((t * 1400) % OH); rain = RAIN[OH - off: 2 * OH - off] if off else RAIN[OH:]
        f = f + rain[..., None] * np.array([70, 70, 60], np.float32) * 0.35
    return f
def frame(t):
    out = None
    for name, t0, t1, keys in SCENES:
        if t0 <= t <= t1:
            fr = render(name, keys, t)
            out = fr if out is None else out              # later scene enters only through the wash (below)
            if out is not fr:
                for w0, w1 in WASH:
                    if w0 <= t <= w1: out = fr if t >= (w0 + w1) / 2 else out
    for w0, w1 in WASH:                                   # amber wash peaks mid-window
        if w0 <= t <= w1:
            u = 1 - abs((t - w0) / (w1 - w0) * 2 - 1); out = out * (1 - 0.72 * ease(u)) + AMBER * 0.72 * ease(u)
    out = out + np.random.default_rng(int(t * FPS)).normal(0, 4, out.shape[:2])[..., None]   # live grain
    return np.clip(out, 0, 255).astype(np.uint8)

if "--strip" in sys.argv:
    ts = [0.0, 1.5, 3.0, 3.6, 3.8, 5.8, 6.7, 7.6, 9.9]
    tiles = [cv2.resize(frame(t), (270, 480)) for t in ts]
    for im, t in zip(tiles, ts): cv2.putText(im, f"{t:.1f}s", (8, 24), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
    cv2.imwrite("strip.jpg", np.hstack(tiles)); sys.exit()
p = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{OW}x{OH}", "-r", str(FPS), "-i", "-",
                      "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "17", "-preset", "medium", "C-motion-test.mp4"], stdin=subprocess.PIPE)
for i in range(int(DUR * FPS)): p.stdin.write(frame(i / FPS).tobytes())
p.stdin.close(); p.wait(); print("ok")

#!/usr/bin/env python3
"""EX26 plate moves -> plates/S{n}_{plain|depth}.mp4 (1080x1920, 60 fps) + plates/S{n}_cam.json (per-frame cx, cy, s).
   ~/.local/bin/uv run --with numpy --with opencv-python --with pillow python build/plates.py [depth|plain] [S1 S2 ...] [--still t1,t2]
The plate is used whole (never cut). 'depth' adds 2.5D parallax from plates/P{n}_depth.png: the plate is warped per
pixel, near things travel and grow more than far things as the camera moves; the overlay plane (REF) does not move,
so the vector overlays pinned to it in HyperFrames stay locked. Light areas breathe a few percent."""
import json, math, os, subprocess, sys
import numpy as np, cv2
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from cams import EP, FPS, SLOTS, CAMS, path

KX, KZ, LIM = 0.35, 0.12, 60   # parallax: share of the camera's screen travel the depth difference adds (capped at LIM px),
                                # and of its zoom (log). A depth difference is at most ~0.5, so nothing shifts > ~30 px.
REF = {"S1": (338, 330), "S2": (436, 372), "S3": (345, 640), "S4": (420, 520), "S5": (566, 712)}   # overlay plane (preview px)

mode = "depth"; scenes = []; stills = None
args = sys.argv[1:]
while args:
    a = args.pop(0)
    if a in ("depth", "plain"): mode = a
    elif a == "--still": stills = [float(x) for x in args.pop(0).split(",")]
    else: scenes.append(a)
scenes = scenes or list(CAMS)
os.makedirs(f"{EP}/plates", exist_ok=True)

X, Y = np.meshgrid(np.arange(1080, dtype=np.float32), np.arange(1920, dtype=np.float32))

for sc in scenes:
    pl = CAMS[sc]["plate"]
    img = cv2.imread(f"{EP}/media/{pl}.png", cv2.IMREAD_COLOR).astype(np.float32)
    H, Wd = img.shape[:2]
    dep = cv2.imread(f"{EP}/plates/{pl}_depth.png", cv2.IMREAD_UNCHANGED).astype(np.float32) / 65535.0
    dep = cv2.GaussianBlur(dep, (0, 0), 2.0)
    f = H / 1200.0
    dref = float(dep[int(REF[sc][1] * f), int(REF[sc][0] * f)])
    # warm highlights breathe: mask = warm and bright
    b, g, r = img[..., 0], img[..., 1], img[..., 2]
    warm = np.clip((r - b) / 120.0, 0, 1) * np.clip((r + g) / 2 / 255.0 - 0.35, 0, 1) * 1.6
    warm = cv2.GaussianBlur(np.clip(warm, 0, 1), (0, 0), 6)[..., None]
    cam = path(sc, Wd, H)
    json.dump({"plate": pl, "w": Wd, "h": H, "f": f, "start": SLOTS[sc][0], "fps": FPS, "cam": cam},
              open(f"{EP}/plates/{sc}_cam.json", "w"))
    cx0, cy0, s0 = cam[0]
    frames = range(len(cam)) if stills is None else [int(round((t - SLOTS[sc][0]) * FPS)) for t in stills]
    out = f"{EP}/plates/{sc}_{mode}.mp4"
    enc = None
    if stills is None:
        enc = subprocess.Popen(["ffmpeg", "-loglevel", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", "1080x1920",
                                "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-preset", "medium", "-crf", "14",
                                "-pix_fmt", "yuv420p", "-movflags", "+faststart", out], stdin=subprocess.PIPE)
    for k in frames:
        k = min(max(k, 0), len(cam) - 1)
        cx, cy, s = cam[k]
        tt = SLOTS[sc][0] + k / FPS
        mx = cx + (X - 540) / s; my = cy + (Y - 960) / s
        if mode == "depth":
            lz = math.log(s / s0)
            vx, vy = -(cx - cx0) * s * KX, -(cy - cy0) * s * KX
            n = math.hypot(vx, vy)
            if n > LIM: vx, vy = vx * LIM / n, vy * LIM / n
            px, py = mx, my
            for _ in range(2):          # q = O + s (p - c)(1 + KZ lz off) + V off, solved for p
                off = cv2.remap(dep, px, py, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE) - dref
                den = s * (1 + KZ * lz * off)
                px = cx + (X - 540 - vx * off) / den
                py = cy + (Y - 960 - vy * off) / den
            mx, my = px, py
        fr = cv2.remap(img, mx, my, cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
        wm = cv2.remap(warm, mx, my, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)[..., None]
        fr = fr * (1 + 0.06 * math.sin(2 * math.pi * tt / 3.1) * wm)
        fr = np.clip(fr, 0, 255).astype(np.uint8)
        if enc: enc.stdin.write(fr.tobytes())
        else: cv2.imwrite(f"{EP}/plates/{sc}_{mode}_{tt:.2f}.png", fr)
    if enc:
        enc.stdin.close(); enc.wait(); print(sc, mode, len(cam), "frames ->", out)

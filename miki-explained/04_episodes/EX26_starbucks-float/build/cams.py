"""EX26 camera paths: one per plate, shared by build/plates.py (renders the plate move) and build/hf_ex26.py (pins the
vector overlays to the same move). Keys are (film time, x, y, zoom) with x, y in PREVIEW pixels (the plate scaled to
1200 px tall, which is how the frames were studied); zoom 1 = the plate's width fills the frame. Every move eases
cubic-bezier(0.65, 0, 0.35, 1), and a slow two-sine drift keeps holds alive."""
import json, math, os

EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TL = json.load(open(f"{EP}/audio/vo_timeline.json"))
W = TL["words"]
FPS = 60
END = round(TL["end"] + 1.0, 2)          # 1 s of end card after the last word


def t(line, frag, nth=0):
    hits = [x[1] for x in W[line] if frag.lower() in x[0].lower()]
    return round(hits[nth], 3)


# scene slots (start, end) in film seconds; neighbours overlap for the asset-built hand-offs
SLOTS = {
    "S1": (0.0, 4.95),
    "S2": (4.55, 9.5),           # runs on under S3's iris
    "S3": (8.55, 13.95),          # runs on under S4's light-shaft wipe
    "S4": (13.2, 20.6),
    "S5": (20.25, END),
}

# camera keys per scene: (time, x, y, zoom)
CAMS = {
    # P1: on the cup (the logo), pull down and out to the customers on "customers'", then dive into the right phone
    "S1": dict(plate="P1", keys=[
        (0.0, 338, 250, 2.35), (1.0, 338, 262, 2.2), (2.6, 338, 330, 1.75), (4.15, 337, 600, 1.06),
        (4.42, 337, 600, 1.06), (4.95, 553, 893, 4.2)]),
    # P2: out of the phone glow, back to the man at the counter, across to the shadow's cup
    "S2": dict(plate="P2", keys=[
        (4.55, 326, 514, 4.0), (5.5, 330, 540, 1.7), (6.3, 345, 560, 1.45), (7.2, 420, 450, 1.75),
        (8.3, 433, 395, 2.05), (8.95, 436, 372, 2.6)]),
    # P3: framed on the hanging coin, follow it down to the storefront (the money goes to work)
    "S3": dict(plate="P3", keys=[
        (8.55, 335, 300, 2.3), (9.6, 335, 330, 2.1), (10.9, 345, 640, 1.3), (12.9, 340, 650, 1.18),
        (13.55, 340, 650, 1.15)]),
    # P4: travel along the counter, phone to phone, to the coin stack; dive into its glow
    "S4": dict(plate="P4", keys=[
        (13.2, 230, 600, 1.75), (14.2, 245, 590, 1.7), (17.0, 420, 520, 1.6), (18.3, 520, 470, 1.85),
        (19.7, 560, 450, 2.1), (20.6, 597, 418, 4.0)]),
    # P5: out of the lit café (the Starbucks across the street), back over his shoulder, slow push in
    "S5": dict(plate="P5", keys=[
        (20.25, 566, 712, 3.2), (20.9, 560, 712, 2.9), (21.9, 380, 640, 1.22), (24.4, 360, 640, 1.32),
        (END, 360, 640, 1.42)]),
}


def ease(p):
    """cubic-bezier(0.65, 0, 0.35, 1) solved for y at x = p"""
    if p <= 0: return 0.0
    if p >= 1: return 1.0
    lo, hi = 0.0, 1.0
    for _ in range(40):
        u = (lo + hi) / 2
        x = 3 * (1 - u) ** 2 * u * 0.65 + 3 * (1 - u) * u ** 2 * 0.35 + u ** 3
        lo, hi = (u, hi) if x < p else (lo, u)
    u = (lo + hi) / 2
    return 3 * (1 - u) * u ** 2 + u ** 3


def path(scene, plate_w, plate_h):
    """per-frame (cx, cy, s) in plate pixels; s = screen px per plate px. Frame k is at film time start + k / FPS."""
    c = CAMS[scene]; keys = c["keys"]; a, b = SLOTS[scene]
    f = plate_h / 1200.0                    # preview -> plate
    out = []
    for k in range(int(round((b - a) * FPS)) + 1):
        tt = a + k / FPS
        if tt <= keys[0][0]: x, y, z = keys[0][1:]
        elif tt >= keys[-1][0]: x, y, z = keys[-1][1:]
        else:
            for (t0, x0, y0, z0), (t1, x1, y1, z1) in zip(keys, keys[1:]):
                if t0 <= tt <= t1:
                    e = ease((tt - t0) / (t1 - t0))
                    x, y = x0 + (x1 - x0) * e, y0 + (y1 - y0) * e
                    z = math.exp(math.log(z0) + (math.log(z1) - math.log(z0)) * e)   # zoom in log space: even speed
                    break
        P = 2 * math.pi                     # drift: a few preview px, scaled down as the zoom rises
        x += (2.0 * math.sin(P * tt / 7.3) + 1.4 * math.sin(P * tt / 11.9 + 1.3)) / z
        y += (1.6 * math.cos(P * tt / 7.3 + 0.7) + 1.2 * math.sin(P * tt / 11.9)) / z
        s = 1080.0 / plate_w * z
        cx, cy = x * f, y * f
        hw, hh = 540 / s, 960 / s           # keep the frame inside the plate
        cx = min(max(cx, hw), plate_w - hw); cy = min(max(cy, hh), plate_h - hh)
        out.append((round(cx, 2), round(cy, 2), round(s, 5)))
    return out

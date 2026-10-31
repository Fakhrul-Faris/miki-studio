#!/usr/bin/env python3
"""EX11 prep: the 36-seat waiting room (rows repeated), the documentary print, and the patient variants.
Run from the episode folder after build/cutout.py: python3 build/prep.py"""
import json
import numpy as np
from PIL import Image, ImageOps, ImageFilter
PAPER, INK = np.array([0xEF, 0xE8, 0xDC]), np.array([0x11, 0x11, 0x11])

# 1. waiting room: rows 1–2, then rows 3/4 repeated, then row 5 and the door → 9 rows × 4 = 36 seats
im = Image.open('media/ENV_waiting.png').convert('RGB'); a = np.asarray(im)
TOP, R3, R4, BOT = a[:1060], a[1060:1438], a[1438:1816], a[1816:]
parts = [TOP] + [R3, R4] * 3 + [BOT]
X = 16                                                     # feather each seam over X rows (floor tiles line up closely)
out = parts[0].astype(float)
for p in parts[1:]:
    p = p.astype(float); w = np.linspace(0, 1, X)[:, None, None]
    out[-X:] = out[-X:] * (1 - w) + p[:X] * w; out = np.concatenate([out, p[X:]])
Image.fromarray(out.astype('uint8')).save('layers/ENV_waiting_long.png')
H = out.shape[0]
# seat centres from the ochre seats (x, y in plate px)
o = out; m = (o[..., 0] > 150) & (o[..., 1] > 100) & (o[..., 1] < 175) & (o[..., 2] < 100)
rows = m[:, 400:1040].mean(1) > 0.3; ys = []; s = None
for y in range(H):
    if rows[y] and s is None: s = y
    if not rows[y] and s is not None:
        if y - s > 80: ys.append((s + y) / 2)
        s = None
cols = m[int(ys[0]) - 60:int(ys[0]) + 60].mean(0) > 0.15; xs = []; s = None
for x in range(1440):
    if cols[x] and s is None: s = x
    if not cols[x] and s is not None:
        if x - s > 80: xs.append((s + x) / 2)
        s = None
seats = [[x, y] for y in ys for x in xs]
json.dump({'w': 1440, 'h': H, 'rows': ys, 'cols': xs, 'seats': seats}, open('layers/seats.json', 'w'), indent=1)
print('room', H, 'rows', [round(y) for y in ys], 'cols', [round(x) for x in xs], len(seats), 'seats')

# 2. documentary print: ink-and-paper duotone with a cream print border
ph = ImageOps.autocontrast(Image.open('media/M1.png').convert('L'), cutoff=1).filter(ImageFilter.UnsharpMask(2, 80))
g = np.asarray(ph).astype(float)[..., None] / 255; duo = (INK + (PAPER - INK) * g).astype('uint8')
pr = Image.fromarray(duo); bw = 60; card = Image.new('RGB', (pr.width + 2 * bw, pr.height + 2 * bw), (246, 241, 232)); card.paste(pr, (bw, bw))
card.save('layers/M1_print.png'); print('print', card.size)

# 3. patient variants: the ochre jacket/chair recoloured (ink, light) — with mirroring that's 12 looks
def variant(src, dst, mode):
    im = Image.open('layers/%s.png' % src); a = np.asarray(im).astype(float); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mx, mn = np.maximum(np.maximum(r, g), b), np.minimum(np.minimum(r, g), b); sat = (mx - mn) / np.maximum(mx, 1)
    inner = np.asarray(im.getchannel('A').filter(ImageFilter.MinFilter(61))) > 128                    # away from the cream rim
    lum = 0.3 * r + 0.59 * g + 0.11 * b; shirt = inner & (sat < 0.3) & (lum > 110)                       # the light shirt
    v = lum * 0.42 if mode == 'ink' else 70 + lum * 0.62
    tint = (1.0, 0.96, 0.86) if mode == 'ink' else (0.92, 0.66, 0.30)
    for ch, k in enumerate(tint): a[..., ch] = np.where(shirt, v * k, a[..., ch])
    Image.fromarray(a.astype('uint8'), 'RGBA').save('layers/%s.png' % dst); print(dst)
for p in ('CO_patient1', 'CO_patient2'):
    variant(p, p + '_ink', 'ink'); variant(p, p + '_ochre', 'ochre')

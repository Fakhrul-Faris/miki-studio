#!/usr/bin/env python3
"""Cut the CO_* stills off their plain paper background: flood the paper colour in from the border, keep the rest.
Run from the episode folder: python3 build/cutout.py [names…]"""
import sys
import numpy as np
from collections import deque
from PIL import Image, ImageFilter
def cut(name, tol=24):
    im = Image.open('media/%s.png' % name).convert('RGB'); a = np.asarray(im).astype(int); h, w, _ = a.shape
    corners = np.concatenate([a[:40, :40].reshape(-1, 3), a[:40, -40:].reshape(-1, 3), a[-40:, :40].reshape(-1, 3), a[-40:, -40:].reshape(-1, 3)])
    bg = np.median(corners, 0); small = (np.abs(a - bg).sum(2) < tol)[::2, ::2]; H, W = small.shape
    seen = np.zeros_like(small); q = deque([(0, x) for x in range(W)] + [(H - 1, x) for x in range(W)] + [(y, 0) for y in range(H)] + [(y, W - 1) for y in range(H)])
    while q:
        y, x = q.popleft()
        if 0 <= y < H and 0 <= x < W and small[y, x] and not seen[y, x]:
            seen[y, x] = True; q.extend([(y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)])
    m = Image.fromarray(((~seen) * 255).astype('uint8')).resize((w, h), Image.NEAREST)
    m = m.filter(ImageFilter.MinFilter(9)).filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.GaussianBlur(1.2))   # drop grain specks
    out = im.convert('RGBA'); out.putalpha(m); bb = m.point(lambda v: 255 if v > 128 else 0).getbbox()
    out = out.crop((max(0, bb[0] - 8), max(0, bb[1] - 8), min(w, bb[2] + 8), min(h, bb[3] + 8))); out.save('layers/%s.png' % name)
    print(name, out.size)
for n in sys.argv[1:] or ['CO_checkout', 'CO_shopper1', 'CO_shopper2']: cut(n)

# customer variants so the queue isn't one man repeated: the ochre jacket (and his chair) recoloured
def variant(src, dst, mode):
    im = Image.open('layers/%s.png' % src); a = np.asarray(im).astype(float); r, g, b, al = a[..., 0], a[..., 1], a[..., 2], a[..., 3]
    mx, mn = np.maximum(np.maximum(r, g), b), np.minimum(np.minimum(r, g), b); sat = (mx - mn) / np.maximum(mx, 1)
    och = (sat > 0.35) & (r > g) & (g > b)                       # the ochre family
    lum = 0.3 * r + 0.59 * g + 0.11 * b
    if mode == 'ink': v = lum * 0.42
    else: v = 120 + lum * 0.55
    for ch, k in enumerate((1.0, 0.96, 0.86)): a[..., ch] = np.where(och, v * k, a[..., ch])
    Image.fromarray(a.astype('uint8'), 'RGBA').save('layers/%s.png' % dst); print(dst)
if not sys.argv[1:]:
    variant('CO_shopper1', 'CO_shopper1_ink', 'ink'); variant('CO_shopper1', 'CO_shopper1_light', 'light'); variant('CO_shopper2', 'CO_shopper2_ink', 'ink'); variant('CO_shopper2', 'CO_shopper2_light', 'light')

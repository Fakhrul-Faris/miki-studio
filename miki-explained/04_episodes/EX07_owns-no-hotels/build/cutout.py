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
for n in sys.argv[1:] or ['CO_hotel']: cut(n)

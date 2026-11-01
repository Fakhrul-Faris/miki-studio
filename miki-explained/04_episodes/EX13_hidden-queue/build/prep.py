#!/usr/bin/env python3
"""EX13 prep: the two documentary prints (ink-and-paper duotone, cream print border) and the plate in the palette.
Run from the episode folder after build/cutout.py: python3 build/prep.py"""
import numpy as np
from PIL import Image, ImageOps, ImageFilter
PAPER, INK, OCHRE = np.array([0xEF, 0xE8, 0xDC]), np.array([0x11, 0x11, 0x11]), np.array([0xC9, 0x8A, 0x2B])

for m in ('M1', 'M2'):        # documentary print: duotone + a cream border
    ph = ImageOps.autocontrast(Image.open('media/%s.png' % m).convert('L'), cutoff=1).filter(ImageFilter.UnsharpMask(2, 80))
    g = np.asarray(ph).astype(float)[..., None] / 255; duo = (INK + (PAPER - INK) * g).astype('uint8')
    pr = Image.fromarray(duo); bw = 60; card = Image.new('RGB', (pr.width + 2 * bw, pr.height + 2 * bw), (246, 241, 232)); card.paste(pr, (bw, bw))
    card.save('layers/%s_print.png' % m); print(m, card.size)

# the plate: its full-colour curry pulled into ink → ochre → paper (a tritone), alpha kept
im = Image.open('layers/CO_plate.png'); a = np.asarray(im).astype(float); L = (0.3 * a[..., 0] + 0.59 * a[..., 1] + 0.11 * a[..., 2])[..., None] / 255
lo = INK + (OCHRE - INK) * np.clip(L * 2, 0, 1); hi = OCHRE + (PAPER - OCHRE) * np.clip(L * 2 - 1, 0, 1)
a[..., :3] = np.where(L < 0.5, lo, hi); Image.fromarray(a.astype('uint8'), 'RGBA').save('layers/CO_plate.png'); print('plate')

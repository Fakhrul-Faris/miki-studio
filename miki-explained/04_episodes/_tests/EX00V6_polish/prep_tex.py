#!/usr/bin/env python3
"""Texture for the 3D audience: mark the paper background and the torn white border as unknown, then fill them with the
figure's own nearby colours (push-pull pyramid), so a projection that overshoots the silhouette never shows a white halo.
    python3 prep_tex.py P1_hands P2_bag …  → models/<name>_tex.png"""
import sys, numpy as np
from PIL import Image, ImageFilter
def resize(x, r):
    return np.stack([np.asarray(Image.fromarray(x[..., i].astype("float32"), "F").resize((r, r), Image.BOX)) for i in range(x.shape[2])], 2)
def up(x, r):
    return np.stack([np.asarray(Image.fromarray(x[..., i].astype("float32"), "F").resize((r, r), Image.BILINEAR)) for i in range(x.shape[2])], 2)
def pushpull(rgb, w):
    """fill where w == 0 from the weighted coarser levels."""
    n = rgb.shape[0]
    if n <= 4: return rgb
    r = n // 2; wc = resize(w, r); cc = resize(rgb * w, r) / np.maximum(wc, 1e-6)
    cc = pushpull(cc, (wc > 1e-6).astype(float))
    return rgb * w + up(cc, n) * (1 - w)
for name in sys.argv[1:]:
    a = np.asarray(Image.open(name + ".png").convert("RGB")).astype(float)
    bg = np.median(a[:30, :30].reshape(-1, 3), 0)
    isbg = np.abs(a - bg).sum(2) < 40
    near = np.asarray(Image.fromarray((isbg * 255).astype("uint8")).filter(ImageFilter.MaxFilter(45))) > 0   # a 22 px band
    lum = a.mean(2); mx, mn = a.max(2), a.min(2)
    paper = near & (lum > 185) & (mx - mn < 30)                  # white torn border: bright, unsaturated, next to the background
    w = (~(isbg | paper)).astype(float)
    w = np.asarray(Image.fromarray((w * 255).astype("uint8")).filter(ImageFilter.MinFilter(5))).astype(float)[..., None] / 255
    out = pushpull(a, w)
    Image.fromarray(np.clip(out, 0, 255).astype("uint8")).save("models/%s_tex.png" % name); print(name)

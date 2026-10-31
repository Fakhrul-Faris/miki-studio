#!/usr/bin/env python3
"""Environment plate → paper shadow box. Depth Anything V2 (Small) estimates depth from one still; the plate is split into
nested depth bands, each a torn-edge paper card (cream rim), ready to stand at its own distance in Blender.
  tools-venv/depth/bin/python miki-explained/tools/depth.py <plate.png> <out_dir> [bands=4]
Writes depth.png (16-bit, near = white), band_0.png (the full plate: the back card, no holes) … band_N.png (nearest), and
bands.json (each band's depth threshold and mean depth, 0 = far, 1 = near)."""
import sys, json, random
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter, ImageDraw
import torch
from transformers import pipeline

src, out = Path(sys.argv[1]), Path(sys.argv[2]); N = int(sys.argv[3]) if len(sys.argv) > 3 else 4
out.mkdir(parents=True, exist_ok=True)
img = Image.open(src).convert("RGB"); W, H = img.size
dev = "mps" if torch.backends.mps.is_available() else "cpu"
pipe = pipeline("depth-estimation", model="depth-anything/Depth-Anything-V2-Small-hf", device=dev)
d = np.asarray(pipe(img)["predicted_depth"].squeeze().cpu().float().numpy())
d = np.asarray(Image.fromarray(d).resize((W, H), Image.BICUBIC)); d = (d - d.min()) / (d.max() - d.min() + 1e-9)   # 1 = near
Image.fromarray((d * 65535).astype("uint16")).save(out / "depth.png")
qs = [float(np.quantile(d, q)) for q in np.linspace(0, 1, N + 1)[1:-1]]          # thresholds between bands
rng = random.Random(7); info = [{"band": 0, "threshold": 0.0, "mean": float(d.mean())}]
img.convert("RGBA").save(out / "band_0.png")
for k, t in enumerate(qs, start=1):
    m = Image.fromarray(((d >= t) * 255).astype("uint8"))
    m = m.filter(ImageFilter.GaussianBlur(6)).point(lambda v: 255 if v > 140 else 0)        # smooth, then crisp
    m = m.filter(ImageFilter.MinFilter(9)).filter(ImageFilter.MaxFilter(9))               # drop specks and pinholes
    rim = m.filter(ImageFilter.MaxFilter(15))                                              # the paper rim around the cut
    a = np.asarray(rim).copy(); edge = (np.asarray(rim) > 0) & (np.asarray(m.filter(ImageFilter.MaxFilter(5))) == 0)
    ys, xs = np.nonzero(edge)
    for i in rng.sample(range(len(ys)), min(len(ys) // 6, 40000)):                        # torn: nibble the rim
        y, x = ys[i], xs[i]; r = rng.randint(2, 5); a[max(0, y - r):y + r, max(0, x - r):x + r] = 0
    rim = Image.fromarray(a).filter(ImageFilter.GaussianBlur(0.8))
    card = Image.new("RGBA", (W, H), (244, 238, 228, 0)); card.putalpha(rim)
    body = img.convert("RGBA"); body.putalpha(m.filter(ImageFilter.GaussianBlur(0.8)))
    card = Image.alpha_composite(Image.composite(Image.new("RGBA", (W, H), (244, 238, 228, 255)), Image.new("RGBA", (W, H), (0, 0, 0, 0)), rim), body)
    card.save(out / f"band_{k}.png")
    info.append({"band": k, "threshold": t, "mean": float(d[d >= t].mean()), "coverage": float((np.asarray(m) > 0).mean())})
json.dump(info, open(out / "bands.json", "w"), indent=1)
print(json.dumps(info))

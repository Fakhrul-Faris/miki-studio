#!/usr/bin/env python3
"""Board pairs: each setup beside its reference frame (ref | ours), 4 pairs per row, numbered. python3 pairs.py BOARD_DIR REF_DIR OUT_PREFIX"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
B = sorted(Path(sys.argv[1]).glob("*.png")); R = sorted(Path(sys.argv[2]).glob("*.jpg")); f = ImageFont.truetype("media/fonts/Outfit.ttf", 26)
w, h, per = 216, 384, 12
for s in range(0, len(B), per):
    chunk = list(range(s, min(s + per, len(B)))); cols = 4; rows = (len(chunk) + cols - 1) // cols
    im = Image.new("RGB", (cols * (2 * w + 18), rows * (h + 10)), "#222"); d = ImageDraw.Draw(im)
    for j, k in enumerate(chunk):
        x, y = (j % cols) * (2 * w + 18), (j // cols) * (h + 10)
        im.paste(Image.open(R[k]).convert("RGB").resize((w, h)), (x, y)); im.paste(Image.open(B[k]).convert("RGB").resize((w, h)), (x + w + 4, y))
        d.rectangle([x, y + h - 34, x + 74, y + h], fill="#ffd400"); d.text((x + 5, y + h - 32), f"{k + 1} ref", font=f, fill="#000")
    im.save(f"{sys.argv[3]}_{s // per + 1}.jpg", quality=88)

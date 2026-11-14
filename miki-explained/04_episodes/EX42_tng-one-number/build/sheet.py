#!/usr/bin/env python3
"""Numbered contact sheet of the board stills: python3 sheet.py media/_bd ../stills/board_v1.jpg [cols]"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
src, out = Path(sys.argv[1]), sys.argv[2]; cols = int(sys.argv[3]) if len(sys.argv) > 3 else 6
fs = sorted(src.glob("*.png")); w, h = 360, 640; rows = (len(fs) + cols - 1) // cols
sh = Image.new("RGB", (cols * w + (cols + 1) * 8, rows * h + (rows + 1) * 8), "#111"); d = ImageDraw.Draw(sh)
f = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 34)
for i, p in enumerate(fs):
    x, y = 8 + (i % cols) * (w + 8), 8 + (i // cols) * (h + 8); sh.paste(Image.open(p).convert("RGB").resize((w, h)), (x, y))
    d.rectangle([x, y, x + 54, y + 44], fill="#ffd400"); d.text((x + 27, y + 22), str(i + 1), font=f, fill="#000", anchor="mm")
sh.save(out, quality=88); print(out)

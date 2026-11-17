#!/usr/bin/env python3
"""Numbered contact sheet of a board folder: python3 sheet.py DIR OUT.jpg [cols]"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
fs = sorted(Path(sys.argv[1]).glob("*.png")); cols = int(sys.argv[3]) if len(sys.argv) > 3 else 6
w, h = 270, 480; rows = (len(fs) + cols - 1) // cols
s = Image.new("RGB", (cols * (w + 6), rows * (h + 6)), "#222"); d = ImageDraw.Draw(s); f = ImageFont.truetype("media/fonts/Outfit.ttf", 30)
for i, p in enumerate(fs):
    x, y = (i % cols) * (w + 6), (i // cols) * (h + 6); s.paste(Image.open(p).convert("RGB").resize((w, h)), (x, y))
    d.rectangle([x, y + h - 40, x + 50, y + h], fill="#ffd400"); d.text((x + 6, y + h - 38), str(i + 1), font=f, fill="#000")
s.save(sys.argv[2], quality=88)

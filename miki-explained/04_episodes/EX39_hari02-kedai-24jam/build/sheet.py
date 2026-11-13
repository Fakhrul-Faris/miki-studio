#!/usr/bin/env python3
"""Board sheets: numbered stills in rows of 9 (for checking). Usage: sheet.py DIR OUT_PREFIX [width]"""
import sys, glob
from PIL import Image, ImageDraw, ImageFont
fr = sorted(glob.glob(sys.argv[1] + "/*.png")); w = int(sys.argv[3]) if len(sys.argv) > 3 else 300; f = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 26)
for k in range(0, len(fr), 9):
    part = fr[k:k + 9]; ims = [Image.open(p).convert("RGB") for p in part]; h = int(w * ims[0].height / ims[0].width)
    sh = Image.new("RGB", (w * len(part), h)); d = ImageDraw.Draw(sh)
    for i, im in enumerate(ims): sh.paste(im.resize((w, h)), (i * w, 0)); d.rectangle([i * w, 0, i * w + 44, 32], fill="#ffd400"); d.text((i * w + 6, 2), str(k + i + 1), font=f, fill="black")
    sh.save(f"{sys.argv[2]}_{k // 9 + 1}.jpg", quality=85)

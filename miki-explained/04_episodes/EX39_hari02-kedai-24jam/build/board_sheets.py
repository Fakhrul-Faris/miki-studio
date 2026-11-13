#!/usr/bin/env python3
"""EX38 board: (1) all 27 stills, numbered; (2) each still beside the reference frame it is modelled on. Run from build/."""
import subprocess, glob
from PIL import Image, ImageDraw, ImageFont
V = {"A": "../../../Video from Facebook.mp4", "B": "../../../Video from Facebook (1).mp4", "C": "../../../Video from Facebook (2).mp4"}
REF = [("B", 0.2), ("B", 1.4), ("B", 9.4), ("B", 11.0), ("B", 17.8), ("C", 1.0), ("B", 13.6), ("B", 25.6), ("B", 16.8), ("B", 16.4), ("B", 15.6), ("B", 80.8), ("B", 33.8), ("B", 36.4),
       ("B", 29.4), ("B", 64.6), ("C", 4.67), ("B", 25.8), ("B", 60.6), ("C", 14.67), ("C", 5.33), ("C", 35.67), ("B", 78.6), ("B", 79.8), ("B", 22.0), ("B", 71.0), ("B", 0.4)]
fr = sorted(glob.glob("media/_bd/*.png")); f = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 30); fs = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 20)
W, H = 360, 640
sh = Image.new("RGB", (W * 9, H * 3), "black"); d = ImageDraw.Draw(sh)
for i, p in enumerate(fr):
    x, y = (i % 9) * W, (i // 9) * H; sh.paste(Image.open(p).convert("RGB").resize((W, H)), (x, y)); d.rectangle([x, y, x + 52, y + 38], fill="#ffd400"); d.text((x + 8, y + 3), str(i + 1), font=f, fill="black")
sh.save("../stills/board_v3.jpg", quality=88)
for part in range(3):
    sh = Image.new("RGB", (W * 2 * 5, H * 2), "#202020"); d = ImageDraw.Draw(sh)
    for j in range(9):
        i = part * 9 + j; v, t = REF[i]; rp = f"media/_ref_{i + 1}.jpg"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(t), "-i", V[v], "-frames:v", "1", rp], check=True)
        x, y = (j % 5) * W * 2, (j // 5) * H
        sh.paste(Image.open(rp).convert("RGB").resize((W, H)), (x, y)); sh.paste(Image.open(fr[i]).convert("RGB").resize((W, H)), (x + W, y))
        d.rectangle([x, y, x + 150, y + 30], fill="black"); d.text((x + 6, y + 4), f"ref {v} {t:.1f}s", font=fs, fill="#aaaaaa")
        d.rectangle([x + W, y, x + W + 52, y + 38], fill="#ffd400"); d.text((x + W + 8, y + 3), str(i + 1), font=f, fill="black")
    sh.save(f"../stills/board_v3_vs_ref_{part + 1}.jpg", quality=85)
print("ok")

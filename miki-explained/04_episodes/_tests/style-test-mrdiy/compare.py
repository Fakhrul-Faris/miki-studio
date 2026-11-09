"""Side-by-side sheet: rows = styles A, B, C; columns = L01 hook, L03 mechanism, L04 payoff. Missing plates show as gaps.
   ~/.local/bin/uv run --with pillow python compare.py"""
import os
from PIL import Image, ImageDraw, ImageFont
H = os.path.dirname(os.path.abspath(__file__)); W, T = 432, 768
rows = [("A", [f"{H}/A/stills/A{i}.png" for i in (1, 2, 3)]), ("B", [f"{H}/B/stills/B{i}.png" for i in (1, 2, 3)]),
        ("C", [f"{H}/C/P{i}.png" for i in (1, 2, 3)])]
sheet = Image.new("RGB", (80 + 3 * (W + 16), 60 + 3 * (T + 16)), "#1A1A1E"); d = ImageDraw.Draw(sheet)
try: f = ImageFont.truetype("/Library/Fonts/InterDisplay-Bold.ttf", 28)
except Exception: f = ImageFont.load_default()
for c, lab in enumerate(("L01 hook", "L03 mechanism", "L04 payoff")): d.text((80 + c * (W + 16), 16), lab, fill="#DDD", font=f)
for r, (name, paths) in enumerate(rows):
    d.text((24, 60 + r * (T + 16) + T // 2), name, fill="#DDD", font=f)
    for c, p in enumerate(paths):
        x, y = 80 + c * (W + 16), 60 + r * (T + 16)
        if os.path.exists(p): sheet.paste(Image.open(p).convert("RGB").resize((W, T)), (x, y))
        else: d.rectangle([x, y, x + W, y + T], outline="#555"); d.text((x + 20, y + T // 2), "plate pending", fill="#777", font=f)
sheet.save(f"{H}/compare.png"); print("ok")

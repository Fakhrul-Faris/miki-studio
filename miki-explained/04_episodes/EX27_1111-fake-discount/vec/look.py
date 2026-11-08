"""Drawing aids (reference is a guide only, never traced):
  look.py grid  F3 x0 y0 x1 y1 out.png   -> reference crop (1080x1920 coords) with a labelled 20/100 px grid
  look.py onion F3 x0 y0 x1 y1 out.png   -> my drawing (vec/draw/F3.svg) at 55% over the reference crop
  look.py pair  F3 x0 y0 x1 y1 out.png   -> reference | drawing side by side"""
import sys, io, os
from PIL import Image, ImageDraw
HERE = os.path.dirname(os.path.abspath(__file__))
mode, f, x0, y0, x1, y1, out = sys.argv[1], sys.argv[2], *map(int, sys.argv[3:7]), sys.argv[7]
ref = Image.open(f"{HERE}/../media/{f}.png").convert("RGB").resize((1080, 1920), Image.LANCZOS)
def mine():
    import resvg_py
    return Image.open(io.BytesIO(bytes(resvg_py.svg_to_bytes(svg_path=f"{HERE}/draw/{f}.svg", width=1080)))).convert("RGB")
def grid(im):
    d = ImageDraw.Draw(im)
    for x in range((x0 // 20) * 20, x1 + 1, 20):
        d.line([(x - x0, 0), (x - x0, y1 - y0)], fill=(255, 255, 255) if x % 100 == 0 else (90, 90, 90), width=1)
        if x % 100 == 0: d.text((x - x0 + 2, 2), str(x), fill=(255, 255, 0))
    for y in range((y0 // 20) * 20, y1 + 1, 20):
        d.line([(0, y - y0), (x1 - x0, y - y0)], fill=(255, 255, 255) if y % 100 == 0 else (90, 90, 90), width=1)
        if y % 100 == 0: d.text((2, y - y0 + 2), str(y), fill=(255, 255, 0))
    return im
box = (x0, y0, x1, y1)
if mode == "grid": im = grid(ref.crop(box))
elif mode == "onion": im = grid(Image.blend(ref.crop(box), mine().crop(box), 0.55))
else:
    a, b = grid(ref.crop(box)), grid(mine().crop(box)); im = Image.new("RGB", (a.width * 2 + 8, a.height)); im.paste(a, (0, 0)); im.paste(b, (a.width + 8, 0))
im.save(out)

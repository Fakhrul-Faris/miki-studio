"""Rasterise SVGs: uv run --with resvg-py python rast.py out.png width a.svg b.svg ...  (side by side)"""
import sys, io, resvg_py
from PIL import Image
out, w, files = sys.argv[1], int(sys.argv[2]), sys.argv[3:]
ims = [Image.open(io.BytesIO(bytes(resvg_py.svg_to_bytes(svg_path=f, width=w)))) for f in files]
sheet = Image.new("RGB", (sum(i.width for i in ims), max(i.height for i in ims)), "white"); x = 0
for i in ims: sheet.paste(i, (x, 0)); x += i.width
sheet.save(out)

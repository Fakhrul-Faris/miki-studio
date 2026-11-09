"""Style C test stills: the user's plates + my overlays on the plates' own surfaces (logo on the blank sign, own-brand
stickers on the cartons, RM1 on the note, 11 SEN at the coin stack).  ~/.local/bin/uv run --with pillow --with numpy python overlay.py"""
import os, math, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops
H = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(H, "stills"); os.makedirs(OUT, exist_ok=True)
LOGO = Image.open("/Users/user/Private/miki-studio/miki-explained/02_kit/brand/logos/mrdiy_logo.png").convert("RGBA")
FONT = "/Library/Fonts/InterDisplay-Black.ttf"

def coeffs(dst, src):
    A, B = [], []
    for (x, y), (u, v) in zip(dst, src):
        A += [[x, y, 1, 0, 0, 0, -u * x, -u * y], [0, 0, 0, x, y, 1, -v * x, -v * y]]; B += [u, v]
    return np.linalg.solve(np.array(A, float), np.array(B, float)).tolist()
def warp(tex, quad, size):
    w, h = tex.size
    return tex.transform(size, Image.PERSPECTIVE, coeffs(quad, [(0, 0), (w, 0), (w, h), (0, h)]), Image.BICUBIC)
def blend(plate, layer, shade=0.85):
    """paste a warped layer, keeping the plate's light: multiply the layer by the plate's luminance (normalised)."""
    lum = plate.convert("L").filter(ImageFilter.GaussianBlur(6)); arr = np.asarray(lum, float); arr = np.clip(arr / max(arr.max(), 1) / shade, 0, 1)
    rgb = np.asarray(layer.convert("RGB"), float) * (0.55 + 0.45 * arr[..., None]); a = np.asarray(layer.split()[-1], float)[..., None] / 255
    base = np.asarray(plate.convert("RGB"), float); out = base * (1 - a) + rgb * a
    return Image.fromarray(out.clip(0, 255).astype("uint8"))
def lit(plate, layer, k=1.6, mix=0.85):
    """tint a warped layer by the plate's own light colour (so a blue note goes teal-gold under the amber drawer)."""
    base = np.asarray(plate.convert("RGB"), float); light = np.asarray(plate.convert("RGB").filter(ImageFilter.GaussianBlur(10)), float) / 255
    rgb = np.asarray(layer.convert("RGB"), float); a = np.asarray(layer.split()[-1], float)[..., None] / 255 * mix
    out = base * (1 - a) + np.clip(rgb * light * k, 0, 255) * a
    return Image.fromarray(out.clip(0, 255).astype("uint8"))
def grain(im, k=6):
    n = np.random.default_rng(9).normal(0, k, (im.size[1], im.size[0], 1)); return Image.fromarray((np.asarray(im, float) + n).clip(0, 255).astype("uint8"))

# P1: the real Mr DIY fascia on the blank sign (red board, logo with its yellow outline)
p = Image.open(f"{H}/P1.png").convert("RGB")
tex = Image.new("RGBA", (2000, 600), (205, 34, 38, 255)); lg = LOGO.resize((1840, int(1840 * LOGO.size[1] / LOGO.size[0])))
tex.alpha_composite(lg, (80, (600 - lg.size[1]) // 2))
quad = [(436, 735), (1020, 870), (1022, 1022), (435, 922)]
sign = warp(tex, quad, p.size); p = blend(p, sign, 0.8)
# the wet road mirrors the real sign: flip, squash, ripple, blur, then add it over the plate's blank reflection
ref = sign.crop((420, 720, 1040, 1030)).transpose(Image.FLIP_TOP_BOTTOM).resize((620, 230))
arr = np.asarray(ref).copy(); rows = arr.shape[0]
for y in range(rows): arr[y] = np.roll(arr[y], int(9 * math.sin(y / 5.0)), axis=0)
ref = Image.fromarray(arr).filter(ImageFilter.GaussianBlur(4)); a = ref.split()[-1].point(lambda v: v * 0.55); ref.putalpha(a)
lay = Image.new("RGBA", p.size, (0, 0, 0, 0)); lay.alpha_composite(ref, (410, 2150))
base = np.asarray(p, float); rl = np.asarray(lay.convert("RGB"), float); al = np.asarray(lay.split()[-1], float)[..., None] / 255
p = Image.fromarray((base * (1 - al) + np.maximum(base, rl) * al).clip(0, 255).astype("uint8")); grain(p).save(f"{OUT}/C1.png")

# P2: own-brand stickers on the truck's cartons
p = Image.open(f"{H}/P2.png").convert("RGB"); lay = Image.new("RGBA", p.size, (0, 0, 0, 0))
for cx, cy in ((985, 1452), (1066, 1468), (985, 1548), (1066, 1566), (1000, 1360)):
    st = Image.new("RGBA", (62, 24), (250, 246, 236, 255)); l2 = LOGO.resize((56, int(70 * LOGO.size[1] / LOGO.size[0]))); st.alpha_composite(l2, (3, (24 - l2.size[1]) // 2))
    lay.alpha_composite(st, (cx - 31, cy - 12))
p = lit(p, lay.filter(ImageFilter.GaussianBlur(0.6)), 1.9, 0.9); grain(p).save(f"{OUT}/C2.png")

# P3: RM1 on the banknote, 11 SEN at the coin stack
p = Image.open(f"{H}/P3.png").convert("RGB")
note = Image.new("RGBA", (800, 360), (46, 104, 196, 235)); d = ImageDraw.Draw(note)
d.rectangle([24, 24, 776, 336], outline=(30, 76, 160, 255), width=10); d.ellipse([560, 90, 740, 270], fill=(30, 76, 160, 255))
d.text((70, 95), "RM1", font=ImageFont.truetype(FONT, 170), fill=(240, 244, 250, 255))
p = lit(p, warp(note, [(195, 1328), (510, 1230), (560, 1365), (228, 1452)], p.size).filter(ImageFilter.GaussianBlur(0.8)), 2.2, 0.8)
lay = Image.new("RGBA", p.size, (0, 0, 0, 0)); d = ImageDraw.Draw(lay); f = ImageFont.truetype(FONT, 58)
d.text((702, 1222), "11 SEN", font=f, fill=(0, 0, 0, 150)); d.text((698, 1216), "11 SEN", font=f, fill=(255, 214, 120, 255))
p.paste(lay, (0, 0), lay); grain(p).save(f"{OUT}/C3.png")
print("ok")

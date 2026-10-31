#!/usr/bin/env python3
"""Code-drawn paper textures for the EX07 Blender world (no generated images). Palette: paper, ink, ochre.
Every texture starts from the house paper grain (layers/paper.png) so it reads as printed paper. Run: python3 build/tex.py"""
import random
from PIL import Image, ImageDraw, ImageChops, ImageFilter
PAPER, INK, OCHRE, DEEP, CREAM = (236, 228, 214), (24, 22, 20), (201, 138, 43), (150, 98, 30), (246, 240, 230)
grain = Image.open('layers/paper.png').convert('L')
def base(w, h, col):
    g = grain.resize((w, h)).point(lambda v: 200 + (v - 200) * 1.6 if v > 0 else 0).convert('RGB')
    return ImageChops.multiply(Image.new('RGB', (w, h), col), Image.merge('RGB', [g.split()[0]] * 3).point(lambda v: min(255, v + 25)))
def tint(name, col, w=512, h=512): base(w, h, col).save('layers/tex_%s.png' % name)
def wobble(d, box, fill=None, outline=None, width=4, seed=0):   # a hand-cut rectangle (slightly irregular corners)
    r = random.Random(seed); x0, y0, x1, y1 = box; j = lambda: r.randint(-3, 3)
    d.polygon([(x0 + j(), y0 + j()), (x1 + j(), y0 + j()), (x1 + j(), y1 + j()), (x0 + j(), y1 + j())], fill=fill, outline=outline, width=width)
def halftone(im, box, col, step=10, seed=1):
    d = ImageDraw.Draw(im); x0, y0, x1, y1 = box
    for y in range(y0, y1, step):
        for x in range(x0 + (y // step % 2) * step // 2, x1, step):
            rr = step * 0.32 * (0.6 + 0.4 * ((x - x0) / max(1, x1 - x0))); d.ellipse([x - rr, y - rr, x + rr, y + rr], fill=col)
# facade: cream paper, rows of ink windows with ochre-lit panes, a cornice band
im = base(1024, 1792, PAPER); d = ImageDraw.Draw(im)
for row in range(7):
    for col in range(4):
        x = 90 + col * 230; y = 120 + row * 240; lit = random.Random(row * 7 + col).random() < 0.45
        wobble(d, (x, y, x + 150, y + 175), fill=INK, seed=row * 9 + col)
        wobble(d, (x + 14, y + 14, x + 136, y + 161), fill=OCHRE if lit else (70, 64, 58), seed=row * 11 + col)
        d.line([(x + 75, y + 14), (x + 75, y + 161)], fill=INK, width=6); d.line([(x + 14, y + 88), (x + 136, y + 88)], fill=INK, width=6)
    d.rectangle([0, 92 + row * 240, 1024, 100 + row * 240], fill=(210, 200, 184))
halftone(im, (0, 1700, 1024, 1792), (200, 188, 170)); im.save('layers/tex_facade.png')
# wallpaper: cream, thin ochre stripes and a dado rail
im = base(1024, 1024, CREAM); d = ImageDraw.Draw(im)
for x in range(0, 1024, 64): d.rectangle([x, 0, x + 10, 760], fill=(226, 200, 150))
d.rectangle([0, 760, 1024, 790], fill=INK); d.rectangle([0, 790, 1024, 1024], fill=(214, 168, 96)); im.save('layers/tex_wall.png')
# floor: grey-ochre paper tiles
im = base(1024, 1024, (196, 184, 164)); d = ImageDraw.Draw(im)
for y in range(0, 1024, 128):
    for x in range(0, 1024, 128):
        if (x + y) // 128 % 2: d.rectangle([x, y, x + 128, y + 128], fill=(176, 164, 144))
        d.rectangle([x, y, x + 128, y + 128], outline=(150, 138, 120), width=2)
im = ImageChops.multiply(im, base(1024, 1024, (255, 255, 255))); im.save('layers/tex_floor.png')
# carpet: ochre with an ink diamond lattice
im = base(512, 512, OCHRE); d = ImageDraw.Draw(im)
for i in range(-512, 1024, 64): d.line([(i, 0), (i + 512, 512)], fill=DEEP, width=5); d.line([(i, 512), (i + 512, 0)], fill=DEEP, width=5)
im.save('layers/tex_carpet.png')
# door: cream, two ink panel outlines, a brass knob
im = base(512, 1024, CREAM); d = ImageDraw.Draw(im)
wobble(d, (60, 70, 452, 470), outline=INK, width=8, seed=3); wobble(d, (60, 540, 452, 960), outline=INK, width=8, seed=4)
d.ellipse([400, 500, 450, 550], fill=OCHRE, outline=INK, width=4); im.save('layers/tex_door.png')
# credit card: ochre, ink chip, a stripe, a printed star (no logo, no text)
im = base(860, 540, OCHRE); d = ImageDraw.Draw(im)
d.rectangle([0, 360, 860, 410], fill=DEEP); wobble(d, (90, 150, 220, 250), fill=(220, 190, 120), outline=INK, width=5, seed=5)
for k in range(3): d.line([(90, 183 + k * 22), (220, 183 + k * 22)], fill=INK, width=3)
def star(d, cx, cy, r, col):
    import math; pts = [(cx + (r if i % 2 == 0 else r * 0.45) * math.cos(math.pi / 2 + i * math.pi / 5), cy - (r if i % 2 == 0 else r * 0.45) * math.sin(math.pi / 2 + i * math.pi / 5)) for i in range(10)]
    d.polygon(pts, fill=col)
star(d, 700, 150, 70, INK); halftone(im, (480, 440, 860, 540), DEEP, 14); im.save('layers/tex_card.png')
# points card: cream, an ochre star, ink border
im = base(360, 220, CREAM); d = ImageDraw.Draw(im); wobble(d, (10, 10, 350, 210), outline=INK, width=6, seed=8); star(d, 180, 110, 70, OCHRE); im.save('layers/tex_points.png')
for n, c in (("ink", INK), ("ochre", OCHRE), ("cream", CREAM), ("paper", PAPER), ("grey", (200, 190, 174)), ("deep", DEEP)): tint(n, c)
print('textures ok')

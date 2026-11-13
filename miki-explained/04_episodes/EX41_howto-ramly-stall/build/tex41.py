#!/usr/bin/env python3
"""EX41 textures (run from build/, after tex.py): step tiles, the certificate and its stamp, the vaccination card, price
tags, a clock, the council sign, the phone screens (an illustration, not e-Lesen's design), the calendar months."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
T = Path("media/tx")
AB, AR = "/System/Library/Fonts/Supplemental/Arial Bold.ttf", "/System/Library/Fonts/Supplemental/Arial.ttf"
F = lambda sz, p=AB: ImageFont.truetype(p, sz)
YEL, INK, PAPER = "#ffd800", "#17181b", "#efece4"

for i in range(1, 5):                                   # step tiles: number + word
    for on in (0, 1):
        im = Image.new("RGB", (256, 256), YEL if on else "#26282d"); d = ImageDraw.Draw(im)
        d.text((128, 112), str(i), font=F(150), fill=INK if on else "#5d6068", anchor="mm")
        d.text((128, 214), ["COURSE", "JAB", "LICENCE", "CART"][i - 1], font=F(34), fill=INK if on else "#5d6068", anchor="mm")
        im.save(T / f"tile{i}{'_on' if on else ''}.png")

im = Image.new("RGB", (1024, 724), PAPER); d = ImageDraw.Draw(im)                       # certificate (illustration)
d.rectangle([24, 24, 1000, 700], outline="#9a8a5a", width=10); d.rectangle([44, 44, 980, 680], outline="#c9b98a", width=3)
d.text((512, 150), "SIJIL", font=F(64), fill=INK, anchor="mm")
d.text((512, 235), "LATIHAN PENGENDALI MAKANAN", font=F(48), fill=INK, anchor="mm")
d.text((512, 300), "Food Handler Training Certificate", font=F(34, AR), fill="#55585e", anchor="mm")
for y in (390, 450): d.line([(220, y), (804, y)], fill="#b9b3a3", width=4)
d.text((512, 640), "illustration", font=F(28, AR), fill="#8a8d93", anchor="mm"); im.save(T / "cert.png")
im = Image.new("RGBA", (512, 256), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
d.rounded_rectangle([10, 10, 502, 246], 30, outline=YEL, width=16); d.text((256, 100), "DIIKTIRAF KKM", font=F(62), fill=YEL, anchor="mm")
d.text((256, 180), "Health Ministry-recognised", font=F(32), fill=YEL, anchor="mm"); im.rotate(-7, expand=True, resample=Image.BICUBIC).save(T / "stamp_kkm.png")

im = Image.new("RGB", (856, 540), "#e9eef2"); d = ImageDraw.Draw(im); d.rectangle([0, 0, 856, 110], fill="#2f6f5a")  # vaccination card
d.text((40, 55), "REKOD SUNTIKAN", font=F(56), fill="#ffffff", anchor="lm"); d.text((40, 170), "vaccination record", font=F(32, AR), fill=INK)
d.rounded_rectangle([40, 230, 816, 330], 14, fill=YEL); d.text((428, 280), "TYPHOID", font=F(72), fill=INK, anchor="mm")
d.text((40, 400), "valid: 3 years", font=F(40), fill=INK); d.text((40, 480), "illustration", font=F(28, AR), fill="#6a7277"); im.save(T / "vax.png")

for v in ("RM50", "RM80", "RM120"):
    im = Image.new("RGB", (384, 192), "#f4f2ec"); d = ImageDraw.Draw(im); d.rectangle([0, 0, 384, 36], fill=YEL)
    d.text((192, 116), v, font=F(92), fill=INK, anchor="mm"); im.save(T / f"tag_{v.lower()}.png")

im = Image.new("RGB", (512, 512), "#f1eee6"); d = ImageDraw.Draw(im)                     # clock face
d.ellipse([8, 8, 504, 504], outline=INK, width=14)
for h in range(12):
    import math; a = h * math.pi / 6; d.line([(256 + 210 * math.sin(a), 256 - 210 * math.cos(a)), (256 + 236 * math.sin(a), 256 - 236 * math.cos(a))], fill=INK, width=10)
im.save(T / "clockface.png")

im = Image.new("RGB", (1024, 192), "#2b2d33"); d = ImageDraw.Draw(im)                   # council sign (generic)
d.text((512, 96), "MAJLIS / DEWAN BANDARAYA", font=F(70), fill="#f1eee6", anchor="mm"); im.save(T / "council_sign.png")
im = Image.open(T / "licence.png").convert("L").convert("RGB"); im.save(T / "licence_grey.png")

def screen(name, step):                                 # phone screens: an illustration of an online licence form
    im = Image.new("RGB", (540, 1150), "#f4f5f7"); d = ImageDraw.Draw(im)
    d.rectangle([0, 0, 540, 150], fill="#1f3b5c"); d.text((40, 95), "e-Lesen", font=F(54), fill="#ffffff", anchor="lm")
    d.text((500, 95), "illustration", font=F(24, AR), fill="#b9c6d6", anchor="rm")
    d.text((40, 220), "Permohonan Baru", font=F(44), fill=INK); d.text((40, 280), "new application", font=F(28, AR), fill="#6a7277")
    for k, lab in enumerate(["Premis", "Penjaja", "Iklan"]):
        y = 360 + k * 120; sel = step >= 1 and lab == "Penjaja"
        d.rounded_rectangle([40, y, 500, y + 96], 18, fill=YEL if sel else "#ffffff", outline="#c9cdd3", width=3)
        d.text((80, y + 48), lab, font=F(40), fill=INK, anchor="lm")
    if step >= 2:
        d.rounded_rectangle([40, 760, 500, 860], 18, fill="#e9eef2"); d.text((80, 810), "Lokasi: Kuala Lumpur", font=F(34, AR), fill=INK, anchor="lm")
    d.rounded_rectangle([40, 960, 500, 1070], 26, fill="#2f8f5a" if step >= 3 else "#9aa3ad")
    d.text((270, 1015), "Hantar  ✓" if step >= 3 else "Hantar", font=F(46), fill="#ffffff", anchor="mm"); im.save(T / name)
for s in range(4): screen(f"scr{s}.png", s)

MON = ["JAN", "FEB", "MAC", "APR", "MEI", "JUN", "JUL", "OGO", "SEP", "OKT", "NOV", "DIS"]
for i, m in enumerate(MON):                             # calendar months, 2025; June = DBKL's window (1–30 Jun 2025)
    for on in (0, 1):
        im = Image.new("RGB", (256, 256), YEL if on else "#2a2c31"); d = ImageDraw.Draw(im)
        d.text((128, 100), m, font=F(84), fill=INK if on else "#7a7d83", anchor="mm"); d.text((128, 190), "2025", font=F(40), fill=INK if on else "#5d6068", anchor="mm")
        if on and m == "JUN": d.text((128, 236), "1–30", font=F(28), fill=INK, anchor="mm")
        im.save(T / f"m{i}{'_on' if on else ''}.png")
print("ex41 textures in", T)

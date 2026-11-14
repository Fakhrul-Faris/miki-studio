#!/usr/bin/env python3
"""EX44 textures (run from build/): the stall price card RM3.68 (DOSM 2024 average)."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
T = Path("media/tx"); PS = "media/fonts/PublicSans.ttf"; F = lambda sz: ImageFont.truetype(PS, sz)
im = Image.new("RGB", (512, 320), "#f4f1e8"); d = ImageDraw.Draw(im)
d.rectangle([0, 0, 512, 70], fill="#a3321f"); d.text((256, 35), "NASI LEMAK", font=F(44), fill="#fff", anchor="mm")
d.text((256, 190), "RM3.68", font=F(128), fill="#1C2430", anchor="mm"); d.text((256, 290), "purata 2024 (DOSM)", font=F(30), fill="#5d6673", anchor="mm")
im.save(T / "tag368.png"); print("ex44 textures")
# shot 3/5: a small price tag for each ingredient, waiting on the leaf where it will land (same card language as tag368)
AN = ImageFont.truetype("media/fonts/Anton.ttf", 150)
for k, name, rm in (("beras", "Beras", "0.32"), ("santan", "Santan", "0.25"), ("telur", "Telur ½", "0.25"), ("bilis", "Ikan bilis", "0.30"),
                    ("kacang", "Kacang", "0.09"), ("timun", "Timun", "0.09"), ("sambal", "Sambal", "0.21"), ("bungkus", "Pembungkus", "0.10")):
    im = Image.new("RGB", (512, 320), "#f4f1e8"); d = ImageDraw.Draw(im)
    d.rectangle([0, 0, 512, 112], fill="#a3321f"); d.text((256, 56), name, font=F(78) if len(name) < 9 else F(64), fill="#fff", anchor="mm")
    d.text((256, 220), "RM" + rm, font=AN, fill="#1C2430", anchor="mm"); im.save(T / f"pt_{k}.png")
print("price tags")

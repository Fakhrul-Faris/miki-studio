#!/usr/bin/env python3
"""EX40 textures (run from build/): split-flap price digits, the patty pack, shelf label, menu board, franchise form,
hawker licence card, canopy stripes, factory sign. Wording follows episode.md; illustrations say so on the picture."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
M = Path("media"); T = M / "tx"; T.mkdir(exist_ok=True)
AB, AR = "/System/Library/Fonts/Supplemental/Arial Bold.ttf", "/System/Library/Fonts/Supplemental/Arial.ttf"
F = lambda sz, p=AB: ImageFont.truetype(p, sz)
YEL, MAR, INK, PAPER = "#ffd800", "#6e1f1c", "#17181b", "#efece4"

# --- split-flap characters (EX38 style) ---
for ch in "0123456789.+":
    im = Image.new("RGB", (256, 384), "#1b1c20"); d = ImageDraw.Draw(im)
    d.rounded_rectangle([6, 6, 250, 378], 14, fill="#202227")
    d.text((128, 196), ch, font=F(300), fill=YEL if ch == "+" else "#f1eee6", anchor="mm")
    d.rectangle([0, 188, 256, 195], fill="#0b0b0d"); d.ellipse([-10, 176, 12, 208], fill="#0b0b0d"); d.ellipse([244, 176, 266, 208], fill="#0b0b0d")
    im.save(T / f"flap_{ {'.': 'dot', '+': 'plus'}.get(ch, ch)}.png")
for nm, txt in (("rm", "RM"), ("sp", "")):
    im = Image.new("RGB", (256, 384), "#1b1c20"); d = ImageDraw.Draw(im); d.rounded_rectangle([6, 6, 250, 378], 14, fill="#202227")
    d.text((128, 196), txt, font=F(150), fill="#f1eee6", anchor="mm"); d.rectangle([0, 188, 256, 195], fill="#0b0b0d"); im.save(T / f"flap_{nm}.png")

# --- the pack's front, from the user's Jaya Grocer screenshot (13 Nov 2026) ---
Image.open("../refs/jaya_grocer_ramly_packs_2026-11-13.png").convert("RGB").crop((150, 85, 610, 665)).resize((512, 646)).save(T / "pack_front.png")
im = Image.new("RGB", (64, 64), "#e9ecf5"); im.save(T / "pack_side.png")

# --- shelf-edge label (generic, not the shop's own design) ---
im = Image.new("RGB", (768, 384), "#f4f2ec"); d = ImageDraw.Draw(im)
d.text((36, 40), "RAMLY CHICKEN BURGER", font=F(46), fill=INK); d.text((36, 98), "PATTIES 420G · 6 PCS", font=F(40, AR), fill="#55585e")
d.text((732, 300), "RM9.40", font=F(150), fill=INK, anchor="rm"); d.text((36, 330), "Jaya Grocer online, 13 Nov 2026", font=F(26, AR), fill="#7a7d83")
im.save(T / "shelf_label.png")

# --- small price tag on each patty ---
im = Image.new("RGB", (384, 192), "#f4f2ec"); d = ImageDraw.Draw(im); d.rectangle([0, 0, 384, 40], fill=YEL)
d.text((192, 118), "RM1.57", font=F(96), fill=INK, anchor="mm"); im.save(T / "tag157.png")

# --- stall menu board (illustration) ---
im = Image.new("RGB", (768, 1024), "#1d1e22"); d = ImageDraw.Draw(im)
lg = Image.open(M / "ramly_burger_logo.png").convert("RGBA"); lg = lg.resize((520, int(520 * lg.height / lg.width))); im.paste(lg, (124, 40), lg)
rows = [("BURGER AYAM", "RM5"), ("BURGER DAGING", "RM5.50"), ("SPECIAL", "RM7"), ("DOUBLE", "RM9")]
for i, (a, b) in enumerate(rows):
    y = 430 + i * 120; d.text((50, y), a, font=F(46), fill="#f1eee6"); d.text((718, y), b, font=F(46), fill=YEL if i == 0 else "#f1eee6", anchor="ra")
d.text((384, 975), "illustration", font=F(28, AR), fill="#7a7d83", anchor="mm"); im.save(T / "menu.png")

# --- canopy: the logo's yellow and maroon stripes ---
im = Image.new("RGB", (1024, 256), YEL); d = ImageDraw.Draw(im)
for i in range(0, 1024, 128): d.rectangle([i + 64, 0, i + 127, 256], fill=MAR)
im.save(T / "stripes.png")
im = Image.new("RGB", (1024, 256), YEL); d = ImageDraw.Draw(im)                       # the canopy's front valance with the logo
lg2 = lg.resize((360, int(360 * lg.height / lg.width))); im.paste(lg2, (332, (256 - lg2.height) // 2), lg2); im.save(T / "valance.png")

# --- franchise form (an illustration of what a franchise contract would ask; Ramly has none) ---
im = Image.new("RGB", (1024, 1448), PAPER); d = ImageDraw.Draw(im)
d.text((90, 90), "FRANCHISE AGREEMENT", font=F(64), fill=INK); d.text((90, 175), "illustration", font=F(30, AR), fill="#7a7d83")
for i, (a, b) in enumerate([("Franchise fee", ""), ("Royalty", ""), ("Brand", "Ramly Burger"), ("Patties", "buy from Ramly")]):
    y = 330 + i * 190; d.text((90, y), a.upper(), font=F(40), fill="#55585e"); d.line([(90, y + 120), (934, y + 120)], fill="#9a9da3", width=3)
    if b: d.text((90, y + 56), b, font=F(54, AR), fill=INK)
for y in range(1150, 1360, 44): d.line([(90, y), (934 - (y % 3) * 120, y)], fill="#c9c6bd", width=8)
im.save(T / "form.png")
for nm, txt in (("v_fee", "RM0"), ("v_roy", "0 %")):                                    # the values that write in on the words
    im = Image.new("RGBA", (512, 128), (0, 0, 0, 0)); ImageDraw.Draw(im).text((0, 64), txt, font=F(100), fill=INK, anchor="lm"); im.save(T / f"{nm}.png")

# --- hawker licence card (illustration) ---
im = Image.new("RGB", (856, 540), "#e8eef0"); d = ImageDraw.Draw(im); d.rectangle([0, 0, 856, 110], fill="#24577a")
d.text((40, 55), "LESEN PENJAJA", font=F(60), fill="#ffffff", anchor="lm"); d.text((40, 160), "hawker licence · from your local council", font=F(32, AR), fill=INK)
d.rectangle([40, 230, 260, 470], fill="#c3cbd0"); [d.line([(300, y), (800, y)], fill="#9aa4aa", width=10) for y in (260, 320, 380)]
d.text((300, 450), "illustration", font=F(30, AR), fill="#6a7277"); im.save(T / "licence.png")

# --- cart price tag ---
im = Image.new("RGB", (640, 256), "#f4f2ec"); d = ImageDraw.Draw(im); d.rectangle([0, 0, 640, 48], fill=YEL)
d.text((320, 150), "RM2,000–6,000", font=F(84), fill=INK, anchor="mm"); im.save(T / "carttag.png")

# --- factory sign ---
im = Image.new("RGB", (1024, 256), "#1d1e22"); lg3 = lg.resize((300, int(300 * lg.height / lg.width))); im.paste(lg3, (40, (256 - lg3.height) // 2), lg3)
ImageDraw.Draw(im).text((380, 128), "PATTIES · BUNS · SAUCE", font=F(60), fill="#f1eee6", anchor="lm"); im.save(T / "factory_sign.png")
print("textures in", T)

#!/usr/bin/env python3
"""EX39 textures + map dots (run from build/). Receipts carry the real logos (02_kit/brand/logos); notes are generic
illustrations (not Bank Negara designs); map dots are illustrative positions, counts from the sources."""
import json, math, random
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
M = Path("media"); T = M / "tx"; T.mkdir(parents=True, exist_ok=True)
LOGO = Path("../../../02_kit/brand/logos")
AB, AR, MONO = "/System/Library/Fonts/Supplemental/Arial Bold.ttf", "/System/Library/Fonts/Supplemental/Arial.ttf", "/System/Library/Fonts/Menlo.ttc"
F = lambda sz, p=AB: ImageFont.truetype(p, sz)
RED, INK, PAPER, THERM = "#c8202a", "#17181b", "#efece4", "#f2f1ec"

def fit(im, w=None, h=None):
    if w: return im.resize((w, round(w * im.height / im.width)), Image.LANCZOS)
    return im.resize((round(h * im.width / im.height), h), Image.LANCZOS)

# --- receipts (thermal paper, logo on top, the year's net profit) ---
kk = Image.open(LOGO / "kkmart_logo_commons.jpg").convert("RGB"); se = Image.open(LOGO / "7eleven.png").convert("RGB"); fm = Image.open(LOGO / "familymart.png").convert("RGB")
def receipt(name, logo, lw, title, rows, total, foot):
    im = Image.new("RGB", (640, 1100), THERM); d = ImageDraw.Draw(im)
    lg = fit(logo, w=lw) if logo.width / logo.height > 1.2 else fit(logo, h=230)
    im.paste(lg, ((640 - lg.width) // 2, 50)); y = 70 + lg.height
    d.text((320, y + 30), title, font=F(34, MONO), fill="#333", anchor="mm"); y += 80
    for i in range(0, 640, 16): d.line([(i, y), (i + 8, y)], fill="#888", width=3)
    y += 30
    for a, b in rows: d.text((40, y), a, font=F(30, MONO), fill="#444"); d.text((600, y), b, font=F(30, MONO), fill="#444", anchor="ra"); y += 52
    for i in range(0, 640, 16): d.line([(i, y + 6), (i + 8, y + 6)], fill="#888", width=3)
    d.text((40, y + 40), "NET PROFIT", font=F(36, MONO), fill=INK); d.text((600, y + 96), total, font=F(78, MONO), fill=INK, anchor="ra")
    d.text((320, 1050), foot, font=F(24, MONO), fill="#777", anchor="mm")
    for x in range(0, 640, 20): d.polygon([(x, 1100), (x + 10, 1088), (x + 20, 1100)], fill="#0d0e11")       # torn edge
    im.save(T / f"{name}.png")
receipt("rc_kk", kk, 420, "FY2025 · YEAR TO JUN 2025", [("STORES", "996"), ("REVENUE", "RM1.57b")], "RM97.0m", "source: KK Mart prospectus")
receipt("rc_7e", se, None, "FY2025 · YEAR TO DEC 2025", [("STORES", "2,735"), ("REVENUE", "RM3.18b")], "RM32.4m", "source: 7-Eleven 4Q25 report")
receipt("rc_fm", fm, 480, "APR-JUN 2026 · BEFORE TAX", [("STORES", "490"), ("SEGMENT", "CONV. STORES")], "-54%", "source: The Edge, 27 Aug 2026")

# --- generic notes (an illustration: no state emblem, no portrait, no Bank Negara wording) ---
def note(name, val, base, ink):
    im = Image.new("RGB", (1000, 460), base); d = ImageDraw.Draw(im)
    d.rounded_rectangle([18, 18, 982, 442], 22, outline=ink, width=8)
    for i in range(14): d.ellipse([600 + i * 9, 80 + i * 9, 940 - i * 9, 400 - i * 9], outline=ink, width=2)
    d.text((70, 230), val, font=F(190), fill=ink, anchor="lm"); d.text((70, 380), "ILUSTRASI · ILLUSTRATION", font=F(34), fill=ink)
    im.save(T / f"{name}.png")
note("note_rm1", "RM1", "#cfd3d6", "#5d666e")
note("note_rm1_kk", "RM1", "#d9cfcd", "#7a2a2a")
im = Image.new("RGB", (512, 128)); d = ImageDraw.Draw(im)                                   # bundle side: paper edges
for y in range(0, 128, 3): d.line([(0, y), (512, y)], fill=(198 + (y * 7) % 18, 200 + (y * 5) % 16, 196 + (y * 3) % 14), width=2)
im.save(T / "bundle_side.png")
for nm, c in (("band_kk", RED), ("band_7e", "#8d9196"), ("band_fm", "#8d9196")):
    im = Image.new("RGB", (256, 128), c); ImageDraw.Draw(im).text((128, 64), "RM10,000", font=F(34), fill="#ffffff", anchor="mm"); im.save(T / f"{nm}.png")

# --- drink can label (generic) + price tag ---
im = Image.new("RGB", (1024, 512), "#b9bcc0"); d = ImageDraw.Draw(im)
d.rectangle([0, 150, 1024, 360], fill="#8e9297"); d.rectangle([0, 186, 1024, 196], fill="#eceae4"); d.rectangle([0, 314, 1024, 324], fill="#eceae4")
for x in (128, 640): d.text((x, 430), "325 ml", font=F(44, AR), fill="#3a3c40", anchor="mm")
im.save(T / "can.png")
im = Image.new("RGB", (384, 256), PAPER); d = ImageDraw.Draw(im); d.text((192, 70), "HARGA", font=F(44), fill="#555", anchor="mm"); d.text((192, 165), "RM2.50", font=F(100), fill=INK, anchor="mm"); im.save(T / "price.png")

# --- cost tags and props ---
def tag(name, a, b, c="#2a2c31", fg="#f1eee6"):
    im = Image.new("RGB", (512, 256), c); d = ImageDraw.Draw(im); d.ellipse([28, 104, 76, 152], fill="#0d0e11")
    d.text((300, 92), a, font=F(76), fill=fg, anchor="mm"); d.text((300, 182), b, font=F(34, AR), fill="#a9acb2", anchor="mm"); im.save(T / f"{name}.png")
tag("t_rent", "RENT", "sewa kedai")
tag("t_power", "ELECTRICITY", "elektrik")
tag("t_kkrent", "RENT", "non-prime lots", c="#3a0c10")
im = Image.new("RGB", (512, 320), "#1a1b1f"); d = ImageDraw.Draw(im); d.rounded_rectangle([20, 20, 492, 300], 16, fill="#0b0c0e")
d.text((256, 110), "kWh", font=F(40, AR), fill="#8a8d93", anchor="mm"); d.text((256, 200), "048271", font=F(80, MONO), fill="#e9e6dd", anchor="mm"); im.save(T / "meter.png")
im = Image.new("RGB", (256, 384), "#e9e6dd"); d = ImageDraw.Draw(im); d.rectangle([0, 0, 256, 90], fill="#8d9196"); d.text((128, 45), "STAFF", font=F(48), fill="#fff", anchor="mm")
d.ellipse([78, 130, 178, 230], fill="#c4c1b9"); d.rectangle([40, 260, 216, 280], fill="#c4c1b9"); d.rectangle([40, 300, 180, 316], fill="#c4c1b9"); im.save(T / "lanyard.png")
# floor plan (top-down, one standard layout): walls, counter, five shelf runs, chillers
im = Image.new("RGB", (512, 768), "#1c1e22"); d = ImageDraw.Draw(im); d.rectangle([16, 16, 496, 752], outline="#d9d6ce", width=10)
d.rectangle([16, 640, 200, 700], fill="#d9d6ce")
for i in range(5): d.rectangle([250 + (i % 2) * 120, 90 + i * 100, 330 + (i % 2) * 120, 150 + i * 100], fill="#8d9196")
d.rectangle([40, 40, 472, 70], fill=RED); d.rectangle([180, 744, 330, 760], fill="#1c1e22"); im.save(T / "plan.png")
# 24-hour clock face, the night half (22:00 → 10:00) drawn separately as geometry
im = Image.new("RGB", (512, 512), "#e9e6dd"); d = ImageDraw.Draw(im); d.ellipse([6, 6, 506, 506], outline="#2a2c31", width=12)
for h in range(24):
    a = math.radians(h * 15 - 90); r0 = 210 if h % 6 else 190
    d.line([(256 + r0 * math.cos(a), 256 + r0 * math.sin(a)), (256 + 236 * math.cos(a), 256 + 236 * math.sin(a))], fill="#2a2c31", width=8 if h % 6 == 0 else 4)
    if h % 2 == 0: d.text((256 + 160 * math.cos(a), 256 + 160 * math.sin(a)), f"{h:02d}", font=F(30), fill="#2a2c31", anchor="mm")
d.text((256, 372), "24 JAM", font=F(28), fill="#5a5d63", anchor="mm"); im.save(T / "clock.png")
# shop fascias for the model street
sb = Image.open(LOGO / "kkmart_signboard.png").convert("RGB"); sb.resize((1024, 213)).save(T / "sign_kk.png")
im = Image.new("RGB", (1024, 213), "#f4f2ec"); d = ImageDraw.Draw(im)
for i, c in enumerate(("#ff6e00", "#ffffff", "#167753", "#ffffff", "#e81030")): d.rectangle([0, 150 + i * 12, 1024, 162 + i * 12], fill=c)
lg = fit(se, h=130); im.paste(lg, (60, 10)); im.save(T / "sign_7e.png")
for nm, c in (("sign_x1", "#4a4d54"), ("sign_x2", "#3b3e44")):
    im = Image.new("RGB", (1024, 213), c); ImageDraw.Draw(im).text((512, 106), "KEDAI", font=F(90), fill="#6d7078", anchor="mm"); im.save(T / f"{nm}.png")

# --- map dots: Malaysia's land (Natural Earth 50m), sampled near the populated places EX38 used; positions illustrative ---
G = json.load(open("ne_countries_50m.geojson")); my = next(f for f in G["features"] if f["properties"].get("NAME") == "Malaysia")
polys = [p[0] for p in (my["geometry"]["coordinates"] if my["geometry"]["type"] == "MultiPolygon" else [my["geometry"]["coordinates"]])]
def inside(x, y):
    for ring in polys:
        c = False
        for (x1, y1), (x2, y2) in zip(ring, ring[1:] + ring[:1]):
            if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1: c = not c
        if c: return True
    return False
seed = json.load(open("map.json"))
def sample(n, rs, sd):
    rnd = random.Random(sd); out = []
    while len(out) < n:
        bx, by = rnd.choice(seed["dots"]); x, y = bx + rnd.gauss(0, rs), by + rnd.gauss(0, rs)
        if inside(x, y): out.append([round(x, 3), round(y, 3)])
    return out
json.dump({"border": seed["border"], "kk": sample(1000, 0.12, 1), "se": sample(2700, 0.16, 2)}, open("map39.json", "w"))
print("ok", len(list(T.iterdir())))

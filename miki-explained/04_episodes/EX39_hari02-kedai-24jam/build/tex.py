#!/usr/bin/env python3
"""EX38 board/film textures and data (run from build/): split-flap digits, documents with sourced wording, labels, map dots."""
import json, math, random
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
M = Path("media"); T = M / "tx"; T.mkdir(exist_ok=True)
AB, AR, MONO = "/System/Library/Fonts/Supplemental/Arial Bold.ttf", "/System/Library/Fonts/Supplemental/Arial.ttf", "/System/Library/Fonts/Menlo.ttc"
F = lambda sz, p=AB: ImageFont.truetype(p, sz)
RED, INK, PAPER = "#c8202a", "#17181b", "#efece4"

# --- split-flap characters (dark flap, off-white glyph, hinge line) ---
for ch in "0123456789.?":
    im = Image.new("RGB", (256, 384), "#1b1c20"); d = ImageDraw.Draw(im)
    d.rounded_rectangle([6, 6, 250, 378], 14, fill="#202227")
    d.text((128, 196), ch, font=F(300), fill="#f1eee6", anchor="mm")
    d.rectangle([0, 188, 256, 195], fill="#0b0b0d"); d.ellipse([-10, 176, 12, 208], fill="#0b0b0d"); d.ellipse([244, 176, 266, 208], fill="#0b0b0d")
    im.save(T / f"flap_{'dot' if ch == '.' else 'q' if ch == '?' else ch}.png")
im = Image.new("RGB", (256, 384), "#1b1c20"); d = ImageDraw.Draw(im); d.text((128, 196), "RM", font=F(150), fill="#f1eee6", anchor="mm"); im.save(T / "flap_rm.png")

# --- logo band for the sign and shelf strips ---
logo = Image.open(M / "ecoshop_logo.jpg").convert("RGB")
band = Image.new("RGB", (1024, 160), RED); lw = 420; lg = logo.resize((lw, int(lw * logo.height / logo.width))); band.paste(lg, (24, (160 - lg.height) // 2))
ImageDraw.Draw(band).text((1000, 80), "SEMUA BARANG", font=F(44), fill="#ffffff", anchor="rm"); band.save(T / "band.png")

# --- till display ---
im = Image.new("RGB", (768, 256), "#07080a"); d = ImageDraw.Draw(im)
d.text((40, 56), "JUMLAH", font=F(40, MONO), fill="#8a8d93"); d.text((728, 150), "RM 2.60", font=F(120, MONO), fill="#f4f1e8", anchor="rm"); im.save(T / "till.png")

# --- hang tag ---
im = Image.new("RGB", (384, 256), PAPER); d = ImageDraw.Draw(im); d.rectangle([0, 0, 384, 64], fill=RED)
d.text((192, 32), "eco-shop", font=F(40), fill="#fff", anchor="mm"); d.text((192, 160), "RM2.60", font=F(96), fill=INK, anchor="mm"); im.save(T / "tag.png")

# --- bottle label (wraps the bottle; an illustration, not a real product) ---
im = Image.new("RGB", (1536, 512), "#e9e6dd"); d = ImageDraw.Draw(im)
for x0 in (384,):                                   # one panel, centred on the texture: it faces the camera at ry = 0
    d.rectangle([x0 + 24, 36, x0 + 744, 476], outline="#2a2c30", width=6)
    d.text((x0 + 384, 120), "PEMBERSIH", font=F(92), fill=INK, anchor="mm")
    d.text((x0 + 384, 204), "SERBAGUNA", font=F(92), fill=INK, anchor="mm")
    d.rectangle([x0 + 90, 268, x0 + 678, 372], fill=INK); d.text((x0 + 384, 320), "JENAMA RUMAH", font=F(70), fill="#f1eee6", anchor="mm")
    d.text((x0 + 384, 424), "house brand · label ilustrasi · 500 ml", font=F(32, AR), fill="#5a5d63", anchor="mm")
im.save(T / "bottle_label.png")
im = Image.new("RGBA", (640, 256), (0, 0, 0, 0)); d = ImageDraw.Draw(im); d.rounded_rectangle([8, 8, 632, 248], 24, outline=RED, width=14)
d.text((320, 128), "HOUSE BRAND", font=F(76), fill=RED, anchor="mm"); im = im.rotate(-8, expand=True, resample=Image.BICUBIC); im.save(T / "stamp.png")

# --- documents (wording from the sources; marked as summaries / illustrations) ---
def page(name, lines, w=1024, h=1448):
    im = Image.new("RGB", (w, h), PAPER); d = ImageDraw.Draw(im); y = 90
    for txt, sz, col, font, gap in lines:
        for ln in txt.split("\n"):
            d.text((90, y), ln, font=F(sz, font), fill=col); y += int(sz * 1.32)
        y += gap
    im.save(T / name)
page("calendar.png", [("APRIL", 150, RED, AB, 0), ("2025", 110, INK, AB, 40)] , 1024, 1024)
im = Image.open(T / "calendar.png"); d = ImageDraw.Draw(im)
for i, wd in enumerate("M T W T F S S".split()): d.text((120 + i * 122, 470), wd, font=F(40), fill="#7a7d83", anchor="mm")
for day in range(1, 31):
    c = (day + 0) % 7; r = (day + 0) // 7; x, y = 120 + c * 122, 560 + r * 96
    if day == 14: d.ellipse([x - 46, y - 46, x + 46, y + 46], outline=RED, width=8)
    d.text((x, y), str(day), font=F(46, AB if day == 14 else AR), fill=RED if day == 14 else INK, anchor="mm")
im.save(T / "calendar.png")
page("payslip.png", [("SLIP GAJI", 70, INK, AB, 4), ("payslip · illustration", 30, "#6a6d73", AR, 50),
    ("Gaji minimum / Minimum wage", 40, INK, AR, 16), ("RM1,700", 120, "#8a8d93", AB, 0), ("→ RM2,000", 150, INK, AB, 30),
    ("per month", 40, "#3c3f45", AR, 60), ("Source: The Star, 29 Oct 2026\n(\"to RM2,000 from RM1,700\")", 30, "#6a6d73", AR, 0)], 1024, 1100)
page("note.png", [("Eco-Shop to defend margins\nvia price hikes", 58, INK, AB, 10), ("The Star · 29 October 2026 · summary of analyst notes", 28, "#6a6d73", AR, 50),
    ("CIMB Securities expects Eco-Shop to", 38, "#3c3f45", AR, 6), ("raise its RM2.60 fixed price\n\"within the next 12 months\"", 46, INK, AB, 50),
    ("UOB Kay Hian has factored in a", 38, "#3c3f45", AR, 6), ("20 sen hike", 80, INK, AB, 6), ("\"the quantum and timing remain undecided\npending supplier discussions\"", 34, "#3c3f45", AR, 60),
    ("Cost pressures named: minimum wage to RM2,000\nfrom RM1,700; yuan appreciation against the ringgit.", 32, "#3c3f45", AR, 60),
    ("A forecast, not an announcement by Eco-Shop.", 30, RED, AB, 0)])
im = Image.new("RGB", (768, 384), "#141518"); d = ImageDraw.Draw(im)
d.text((40, 100), "CNY", font=F(120, MONO), fill="#f1eee6", anchor="lm"); d.polygon([(560, 150), (640, 40), (720, 150)], fill=RED)
d.text((40, 280), "MYR", font=F(120, MONO), fill="#8a8d93", anchor="lm"); d.polygon([(560, 230), (640, 340), (720, 230)], fill="#55585e"); d.rectangle([0, 188, 768, 194], fill="#0b0b0d")
im.save(T / "fx.png")
im = Image.new("RGB", (512, 256), "#b08d5b"); d = ImageDraw.Draw(im); d.text((256, 128), "MADE IN CHINA", font=F(56), fill="#2a2118", anchor="mm"); im.save(T / "carton.png")

# --- material names of the library models (for Refinish) ---
names = {}
for g in M.glob("*/*.gltf"): names[g.parent.name] = [m["name"] for m in json.loads(g.read_text())["materials"]]
Path("names.json").write_text(json.dumps(names))

# --- Malaysia: 462 dots inside the outline (Natural Earth 50m) + outline points. Positions are illustrative. ---
geo = json.loads(Path("ne_countries_50m.geojson").read_text())
polys = [p[0] for f in geo["features"] if f["properties"]["ADMIN"] == "Malaysia" for p in f["geometry"]["coordinates"]]
def inside(x, y, poly):
    c = False
    for i in range(len(poly)):
        x1, y1 = poly[i]; x2, y2 = poly[i - 1]
        if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1: c = not c
    return c
random.seed(462); pts = []
west = [p for p in polys if sum(q[0] for q in p) / len(p) < 105]; east = [p for p in polys if p not in west]
def sample(group, n):
    xs = [q[0] for p in group for q in p]; ys = [q[1] for p in group for q in p]; out = []
    while len(out) < n:
        x, y = random.uniform(min(xs), max(xs)), random.uniform(min(ys), max(ys))
        if any(inside(x, y, p) for p in group) and all((x - a) ** 2 + (y - b) ** 2 > 0.0045 for a, b in out): out.append((x, y))
    return out
pts = sample(west, 346) + sample(east, 116)          # 3 in 4 on the peninsula: a drawing choice, not a sourced split
border = [q for p in polys if len(p) > 20 for q in p]
Path("map.json").write_text(json.dumps({"dots": [[round(x, 3), round(y, 3)] for x, y in sorted(pts)], "border": [[round(x, 3), round(y, 3)] for x, y in border]}))
print("textures", len(list(T.glob('*.png'))), "dots", len(pts), "border", len(border), "models", len(names))

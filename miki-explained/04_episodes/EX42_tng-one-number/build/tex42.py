#!/usr/bin/env python3
"""EX42 textures (run from build/): phone screens (illustrations, not TNG's app design), the TnG card, the three 'bigger
things' cards, the fund jar label, toll / parking / top-up / bank signs, year tabs. Logos: Commons, public domain."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
M, T = Path("media"), Path("media/tx")
AB, AR = "/System/Library/Fonts/Supplemental/Arial Bold.ttf", "/System/Library/Fonts/Supplemental/Arial.ttf"
F = lambda sz, p=AB: ImageFont.truetype(p, sz)
BLUE, YEL, INK = "#2b5ba8", "#ffdd00", "#17181b"
WLOGO = Image.open(M / "tng_ewallet_logo.png").convert("RGBA"); LOGO = WLOGO          # the square eWallet logo (the wide logo PNG came out cropped)
fit = lambda im, w: im.resize((w, int(w * im.height / im.width)))

def screen(name, body):
    im = Image.new("RGB", (540, 1150), "#f4f6fa"); d = ImageDraw.Draw(im); d.rectangle([0, 0, 540, 170], fill=BLUE)
    lg = fit(WLOGO, 120); im.paste(lg, (30, 25), lg); d.text((510, 140), "illustration", font=F(24, AR), fill="#c9d6ee", anchor="rs")
    body(im, d); im.save(T / name)
def pay(im, d):
    d.ellipse([200, 260, 340, 400], fill="#2fa36b"); d.line([(232, 332), (262, 362), (312, 300)], fill="#fff", width=16)
    d.text((270, 470), "Payment successful", font=F(40), fill=INK, anchor="mm"); d.text((270, 600), "RM43.00", font=F(110), fill=INK, anchor="mm")
    for y in (740, 800, 860): d.rounded_rectangle([60, y, 480, y + 30], 8, fill="#e3e8f1")
screen("scr_pay.png", pay)
def goplus(im, d):
    d.text((40, 230), "GO+", font=F(110), fill=BLUE); d.text((40, 360), "money-market fund", font=F(40), fill=INK)
    d.rounded_rectangle([40, 450, 500, 640], 24, fill="#e8eef9"); d.text((270, 515), "Balance in GO+", font=F(34, AR), fill="#55606e", anchor="mm")
    d.text((270, 585), "RM 1,000.00", font=F(62), fill=INK, anchor="mm"); d.text((40, 700), "returns credited daily", font=F(36), fill="#2fa36b")
    d.text((40, 760), "returns not guaranteed", font=F(32, AR), fill="#7a828e")
screen("scr_go.png", goplus)

im = Image.new("RGB", (856, 540), BLUE); d = ImageDraw.Draw(im)                     # a TnG-style card (illustration)
lg = fit(LOGO, 220); im.paste(lg, (40, 40), lg); d.rounded_rectangle([600, 360, 810, 500], 18, fill="#d8b44a")
d.text((40, 470), "prepaid card · illustration", font=F(30, AR), fill="#c9d6ee"); im.save(T / "tng_card.png")

for name, title, sub, col in (("c_loan", "MICRO LOAN", "small loan", "#e8eef9"), ("c_ins", "MICRO INSURANCE", "takaful / insurance", "#eef6ea"), ("c_fund", "INVESTMENT FUND", "money-market fund", "#fbf3dd")):
    im = Image.new("RGB", (640, 400), col); d = ImageDraw.Draw(im); d.rectangle([0, 0, 640, 70], fill=BLUE)
    d.text((24, 35), title, font=F(40), fill="#fff", anchor="lm"); d.text((24, 120), sub, font=F(34, AR), fill=INK)
    if name == "c_fund":
        pts = [(40, 330), (140, 300), (240, 310), (340, 260), (440, 250), (600, 190)]; d.line(pts, fill=BLUE, width=10)
    else:
        for y in (200, 250, 300): d.rounded_rectangle([24, y, 600 - (y % 3) * 60, y + 24], 6, fill="#cdd6e4")
    d.text((616, 380), "illustration", font=F(22, AR), fill="#7a828e", anchor="rs"); im.save(T / f"{name}.png")

im = Image.new("RGB", (512, 256), "#f4f6fa"); d = ImageDraw.Draw(im); d.rectangle([0, 0, 512, 56], fill=BLUE)
d.text((256, 28), "GO+", font=F(44), fill="#fff", anchor="mm"); d.text((256, 140), "money-market", font=F(48), fill=INK, anchor="mm")
d.text((256, 200), "fund", font=F(48), fill=INK, anchor="mm"); im.save(T / "jar_label.png")

def sign(name, text, w=1024, h=256, bg=BLUE, fg="#ffffff", logo=False):
    im = Image.new("RGB", (w, h), bg); d = ImageDraw.Draw(im); x = w // 2
    if logo: lg = fit(LOGO, int(h * 1.25)); im.paste(lg, (24, (h - lg.height) // 2), lg); x = (w + lg.width + 24) // 2
    d.text((x, h // 2), text, font=F(int(h * 0.42)), fill=fg, anchor="mm"); im.save(T / f"{name}.png")
sign("s_toll", "TOLL", logo=True); sign("s_park", "PARKING", bg="#2a2c31"); sign("s_reload", "RELOAD · TOP-UP", bg="#c8352a")
sign("s_bank", "BANK NEGARA MALAYSIA", w=1280, bg="#2b2d33", fg="#f1eee6")
for y in ("2025", "2024"): sign(f"yr{y}", y, 256, 128, bg="#2a2c31", fg=YEL)
print("ex42 textures in", T)

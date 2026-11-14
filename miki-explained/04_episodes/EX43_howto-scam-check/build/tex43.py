#!/usr/bin/env python3
"""EX43 textures for the physical shots (run from build/): the scam flyer (an invented scheme), the phone's transfer screen
and the dial pad states. Interfaces in the UI scenes are drawn live in the film (HTML), not here."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
T = Path("media/tx"); FT = Path("media/fonts")
ANTON, PS = str(FT / "Anton.ttf"), str(FT / "PublicSans.ttf")
F = lambda sz, p=PS: ImageFont.truetype(p, sz)
INK, PAPER, TEAL, RED, GOLD = "#1C2430", "#EEF1F4", "#1F6F78", "#D6452E", "#E8B53A"

# the flyer: loud on purpose (the only loud thing in the film)
im = Image.new("RGB", (900, 1272), "#1a1206"); d = ImageDraw.Draw(im)
for y in range(1272):                                         # gold sheen, top to bottom
    k = abs((y / 1272) - 0.35); c = (int(232 - 90 * k), int(181 - 90 * k), int(58 - 30 * k)); d.line([(0, y), (900, y)], fill=c)
d.text((450, 120), "PROFIT EMAS CLUB", font=F(78, ANTON), fill="#2a1800", anchor="mm")
d.text((450, 330), "GUARANTEED", font=F(150, ANTON), fill="#ffffff", anchor="mm", stroke_width=6, stroke_fill="#5a3300")
d.text((450, 520), "20%", font=F(300, ANTON), fill="#ffffff", anchor="mm", stroke_width=8, stroke_fill="#5a3300")
d.text((450, 700), "A MONTH", font=F(130, ANTON), fill="#ffffff", anchor="mm", stroke_width=6, stroke_fill="#5a3300")
d.rounded_rectangle([170, 830, 730, 960], 60, fill=RED); d.text((450, 895), "INVEST NOW", font=F(84, ANTON), fill="#ffffff", anchor="mm")
d.text((450, 1050), "No risk! Limited slots! WhatsApp now", font=F(40), fill="#2a1800", anchor="mm")
d.text((450, 1215), "invented example · illustration", font=F(28), fill="#4a3410", anchor="mm"); im.save(T / "flyer.png")

def phone(name, body):
    im = Image.new("RGB", (540, 1150), PAPER); d = ImageDraw.Draw(im); body(im, d); im.save(T / name)
def transfer(im, d):
    d.rectangle([0, 0, 540, 150], fill=INK); d.text((40, 95), "Transfer", font=F(48), fill="#fff", anchor="lm")
    d.text((40, 220), "To account", font=F(32), fill="#5d6673"); d.rounded_rectangle([40, 260, 500, 360], 16, fill="#fff", outline="#c9d0d8", width=3)
    d.text((70, 310), "5621 0098 4412", font=F(46), fill=INK, anchor="lm")
    d.text((40, 420), "Amount", font=F(32), fill="#5d6673"); d.text((40, 500), "RM 5,000.00", font=F(70), fill=INK, anchor="lm")
    d.text((40, 600), "Recipient: Profit Emas Club", font=F(30), fill="#5d6673")
    d.rounded_rectangle([40, 960, 500, 1070], 26, fill=TEAL); d.text((270, 1015), "Transfer now", font=F(44), fill="#fff", anchor="mm")
    d.text((270, 1120), "illustration", font=F(22), fill="#8a93a0", anchor="mm")
phone("scr_transfer.png", transfer)
for n, typed in enumerate(["", "9", "99", "997"]):                  # the dial pad, as 997 is entered
    def pad(im, d, typed=typed):
        d.rectangle([0, 0, 540, 1150], fill="#121821")
        d.text((270, 170), typed or " ", font=F(120), fill="#fff", anchor="mm")
        keys = "123456789*0#"
        for i, k in enumerate(keys):
            x, y = 110 + (i % 3) * 160, 400 + (i // 3) * 150; hot = typed and k == typed[-1]
            d.ellipse([x - 62, y - 62, x + 62, y + 62], fill="#8EC9F0" if hot else "#26303d"); d.text((x, y), k, font=F(64), fill=INK if hot else "#fff", anchor="mm")
        d.ellipse([208, 1000, 332, 1124], fill="#2fa36b")
    phone(f"scr_dial{n}.png", pad)
print("ex43 textures in", T)

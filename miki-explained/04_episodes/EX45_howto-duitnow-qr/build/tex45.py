#!/usr/bin/env python3
"""EX45 textures (run from build/): the standee's QR card and the sticker. The QR is a made-up pattern (does not scan),
marked "ilustrasi". DuitNow mark: Wikimedia Commons CC0 (02_kit/brand/logos/CREDITS.md)."""
import random
from PIL import Image, ImageDraw, ImageFont
PINK = "#dd195c"; F = "media/fonts/Outfit.ttf"
mark = Image.open("media/duitnow_qr.png").convert("RGBA").crop((130, 0, 670, 510))
def qr(n=25, px=24, seed=45):
    r = random.Random(seed); im = Image.new("RGB", (n * px, n * px), "white"); d = ImageDraw.Draw(im)
    fz = lambda x, y: (x < 8 and y < 8) or (x >= n - 8 and y < 8) or (x < 8 and y >= n - 8)
    for y in range(n):
        for x in range(n):
            if not fz(x, y) and r.random() < 0.5: d.rectangle([x * px, y * px, x * px + px - 1, y * px + px - 1], fill="#111")
    for ox, oy in [(0, 0), (n - 7, 0), (0, n - 7)]:
        for k, c in [(0, "#111"), (1, "white"), (2, "#111")]:
            d.rectangle([(ox + k) * px, (oy + k) * px, (ox + 7 - k) * px - 1, (oy + 7 - k) * px - 1], fill=c)
    return im
def card(w, h, path, label):
    im = Image.new("RGB", (w, h), PINK); d = ImageDraw.Draw(im)
    d.rounded_rectangle([40, 40, w - 40, h - 40], 40, fill="white")
    m = mark.resize((150, 141)); im.paste(m, (w // 2 - 75, 80), m)
    q = qr().resize((w - 200, w - 200), Image.NEAREST); im.paste(q, (100, 260))
    f = ImageFont.truetype(F, 54); f.set_variation_by_axes([700]); d.text((w // 2, 260 + w - 200 + 50), label, font=f, fill="#1b1d22", anchor="mt")
    s = ImageFont.truetype(F, 30); d.text((w // 2, h - 70), "ilustrasi", font=s, fill="#9aa0a8", anchor="mm")
    im.save(path)
card(800, 1150, "media/tx/qr_card.png", "Imbas untuk bayar")
card(600, 860, "media/tx/sticker.png", "DuitNow QR")
print("ok")
# coins: a generic sen coin (not a BNM design): rim, ring of beads, a big "50"; and a milled-edge strip
def coinface(path, txt):
    s = 512; im = Image.new("RGB", (s, s), "#b9bcc2"); d = ImageDraw.Draw(im)
    d.ellipse([6, 6, s - 6, s - 6], fill="#c9ccd2", outline="#8e9299", width=18)
    import math
    for k in range(48):
        a = k / 48 * 6.283; x, y = s / 2 + math.cos(a) * 200, s / 2 + math.sin(a) * 200; d.ellipse([x - 7, y - 7, x + 7, y + 7], fill="#9a9ea5")
    f = ImageFont.truetype(F, 190); f.set_variation_by_axes([800]); d.text((s / 2, s / 2 - 10), txt, font=f, fill="#8e9299", anchor="mm")
    g = ImageFont.truetype(F, 46); g.set_variation_by_axes([700]); d.text((s / 2, s / 2 + 120), "SEN", font=g, fill="#8e9299", anchor="mm")
    im.save(path)
coinface("media/tx/coin50.png", "50")
e = Image.new("RGB", (256, 32), "#c4c7cd"); d = ImageDraw.Draw(e)
for x in range(0, 256, 4): d.rectangle([x, 0, x + 1, 32], fill="#8a8e95")
e.save("media/tx/coin_edge.png")
# price card for the stall (kraft, marker): what a hawker hangs up
pc = Image.new("RGB", (640, 440), "#b48a5a"); d = ImageDraw.Draw(pc)
d.rectangle([14, 14, 626, 426], outline="#7a5a36", width=6)
f = ImageFont.truetype(F, 74); f.set_variation_by_axes([800]); g = ImageFont.truetype(F, 60); g.set_variation_by_axes([600])
d.text((40, 40), "NASI LEMAK", font=f, fill="#1b1d22"); d.text((40, 140), "biasa   RM3.50", font=g, fill="#1b1d22"); d.text((40, 220), "ayam   RM7.00", font=g, fill="#1b1d22"); d.text((40, 300), "teh o    RM2.00", font=g, fill="#1b1d22")
pc.save("media/tx/pricecard.png")
print("coins ok")

# EX35 in-world signs and screens → build/media/*.png (words live on the world's objects)
#   ~/.local/bin/uv run -q --offline --with pillow python build/tex.py
import os
from PIL import Image, ImageDraw, ImageFont
M = "build/media"; F = os.path.expanduser("~/Library/Fonts/InterDisplay-{}.ttf")
f = lambda w, s: ImageFont.truetype(F.format(w), s)
BLUE, NAVY, WHITE, INK, CREAM = (32, 48, 168), (20, 30, 110), (255, 255, 255), (28, 28, 33), (246, 242, 234)
LOGO = Image.open(f"{M}/zus_white.png")
def logo(im, box):
    x, y, w, h = box; l = LOGO.copy(); l.thumbnail((w, h)); im.alpha_composite(l, (x + (w - l.width) // 2, y + (h - l.height) // 2))
def card(name, size, bg, draw):
    im = Image.new("RGBA", size, bg); d = ImageDraw.Draw(im); draw(im, d); im.save(f"{M}/{name}.png")
def ctext(d, y, s, font, fill, W):
    w = d.textlength(s, font=font); d.text(((W - w) / 2, y), s, font=font, fill=fill)
# price tags on the two cups
card("tag_zus", (512, 300), BLUE + (255,), lambda im, d: (logo(im, (60, 22, 392, 60)), ctext(d, 92, "FROM", f("Bold", 48), WHITE, 512), ctext(d, 140, "RM8.90", f("Black", 120), WHITE, 512)))
card("tag_sb", (512, 300), CREAM + (255,), lambda im, d: (ctext(d, 22, "STARBUCKS", f("Bold", 54), INK, 512), ctext(d, 92, "LATTE", f("Bold", 48), INK, 512), ctext(d, 140, "RM16", f("Black", 120), INK, 512)))
# the cup sleeve
card("sleeve", (512, 256), BLUE + (255,), lambda im, d: logo(im, (40, 70, 432, 116)))
# the phone screen: the ZUS app
def app(im, d):
    d.rectangle((0, 0, 400, 120), fill=NAVY); logo(im, (40, 30, 320, 60))
    d.rounded_rectangle((40, 180, 360, 420), 28, fill=(235, 238, 250)); ctext(d, 260, "Café Latte", f("Bold", 40), INK, 400)
    d.rounded_rectangle((60, 560, 340, 660), 40, fill=BLUE); ctext(d, 580, "ORDER", f("Black", 52), WHITE, 400)
card("app", (400, 760), (250, 250, 252, 255), app)
# menu board: normal, then the year's revenue (L05)
def menu(im, d):
    d.rectangle((0, 0, 1200, 160), fill=BLUE); logo(im, (200, 30, 800, 100))
    ctext(d, 215, "COFFEE FROM", f("Bold", 90), INK, 1200); ctext(d, 330, "RM8.90", f("Black", 210), BLUE, 1200)   # the user, 2026-11-11: cheapest coffee on ZUS is RM8.90
card("menu", (1200, 640), CREAM + (255,), menu)
def menu_bn(im, d):
    d.rectangle((0, 0, 1200, 160), fill=BLUE); logo(im, (200, 30, 800, 100))
    ctext(d, 200, "RM1 BILLION+", f("Black", 170), BLUE, 1200); ctext(d, 430, "a year", f("Bold", 90), INK, 1200)
card("menu_bn", (1200, 640), CREAM + (255,), menu_bn)
def aboard(im, d):
    d.rectangle((0, 0, 700, 200), fill=BLUE); logo(im, (80, 60, 540, 80))
    ctext(d, 260, "RM1", f("Black", 230), BLUE, 700); ctext(d, 500, "BILLION+", f("Black", 120), BLUE, 700); ctext(d, 660, "a year", f("Bold", 80), INK, 700)
card("aboard", (700, 820), CREAM + (255,), aboard)
# KLCC plaque, the floor label, rent boards, the lane sign
card("plaque", (600, 200), CREAM + (255,), lambda im, d: (ctext(d, 30, "EST. 2019", f("Black", 70), BLUE, 600), ctext(d, 115, "KLCC", f("Bold", 56), INK, 600)))
card("sqft", (800, 260), (0, 0, 0, 0), lambda im, d: ctext(d, 30, "200 sq ft", f("Black", 170), (40, 40, 48, 255), 800))
def rent(big):
    def dr(im, d):
        d.rectangle((0, 0, 900, 120), fill=INK); ctext(d, 18, "MALL FRONT ROW" if big else "SIDE STREET", f("Black", 70), WHITE, 900)
        ctext(d, 150, "RENT", f("Bold", 80), INK, 900)
        n = 5 if big else 1
        for i in range(n): d.rounded_rectangle((450 - n * 70 + i * 140, 280, 450 - n * 70 + i * 140 + 120, 400), 20, fill=(200, 40, 46) if big else (60, 140, 90))
        for i in range(n): ctext(d, 300, "", f("Black", 80), WHITE, 900)
        d.text((450 - n * 70 + 18 + 0 * 140, 296), "", font=f("Black", 80))
        for i in range(n): w = d.textlength("RM", font=f("Black", 60)); d.text((450 - n * 70 + i * 140 + 60 - w / 2, 305), "RM", font=f("Black", 60), fill=WHITE)
    return dr
card("rent_mall", (900, 440), CREAM + (255,), rent(True))
card("rent_lane", (900, 440), CREAM + (255,), rent(False))
# the store-count billboards (L04) and the legend
card("bb_zus", (1000, 520), BLUE + (255,), lambda im, d: (logo(im, (150, 50, 700, 120)), ctext(d, 200, "566", f("Black", 260), WHITE, 1000)))
card("bb_sb", (1000, 520), CREAM + (255,), lambda im, d: (ctext(d, 60, "STARBUCKS", f("Black", 110), INK, 1000), ctext(d, 200, "411", f("Black", 260), INK, 1000)))
card("legend", (900, 200), CREAM + (255,), lambda im, d: ctext(d, 50, "1 light = 10 stores · 2024", f("Bold", 70), INK, 900))
print("wrote", sorted(x for x in os.listdir(M) if x.endswith(".png") and not os.path.islink(f"{M}/{x}")))

# the phone a customer holds up (a UI card above them, with a little tail pointing down to them)
def phone(im, d):
    d.rounded_rectangle((0, 0, 399, 759), 46, fill=INK); d.rounded_rectangle((18, 18, 381, 741), 32, fill=(250, 250, 252))
    d.rectangle((18, 60, 381, 170), fill=NAVY); logo(im, (60, 85, 280, 60))
    d.rounded_rectangle((50, 210, 350, 420), 26, fill=(235, 238, 250)); ctext(d, 280, "Café Latte", f("Bold", 42), INK, 400)
    d.rounded_rectangle((60, 560, 340, 660), 40, fill=BLUE); ctext(d, 582, "ORDER", f("Black", 54), WHITE, 400)
card("phone", (400, 760), (0, 0, 0, 0), phone)
# QR standee on the counter: order on the app (pattern drawn, not a working code)
def qr(im, d):
    d.rectangle((0, 0, 400, 120), fill=BLUE); ctext(d, 30, "ORDER ON", f("Black", 50), WHITE, 400)
    import random; r = random.Random(35)
    for y in range(12):
        for x in range(12):
            if r.random() < 0.5: d.rectangle((80 + x * 20, 160 + y * 20, 99 + x * 20, 179 + y * 20), fill=INK)
    for (x, y) in ((80, 160), (240, 160), (80, 320)): d.rectangle((x, y, x + 79, y + 79), fill=INK); d.rectangle((x + 14, y + 14, x + 65, y + 65), fill=WHITE); d.rectangle((x + 26, y + 26, x + 53, y + 53), fill=INK)
    d.rectangle((0, 440, 400, 560), fill=BLUE); ctext(d, 470, "THE APP", f("Black", 50), WHITE, 400)
card("qr", (400, 560), (250, 250, 252, 255), qr)
# shop signboards for the street (generic, grey on white: life without competing colour)
for name, txt in (("sg_runcit", "KEDAI RUNCIT"), ("sg_farmasi", "FARMASI"), ("sg_kedai", "KEDAI KUNCI"), ("sg_makan", "RESTORAN"), ("sg_salon", "SALON"), ("sg_cetak", "KEDAI CETAK"), ("sg_jam", "KEDAI JAM"), ("sg_kain", "KEDAI KAIN"), ("sg_motor", "MOTOR"), ("sg_tuisyen", "PUSAT TUISYEN")):
    card(name, (1000, 160), (226, 221, 212, 255), lambda im, d, t=txt: ctext(d, 30, t, f("Black", 92), (92, 92, 100), 1000))

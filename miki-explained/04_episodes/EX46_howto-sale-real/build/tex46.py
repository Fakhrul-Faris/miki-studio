#!/usr/bin/env python3
"""EX46 textures (run from build/): the red sale tag in layers, the thermal receipt, the law card, the KPDN folder label,
the product box print, the counter drum digits, the 50% wall tag. Shop, product and prices are illustrative."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import random
O = Path("media/tx"); O.mkdir(parents=True, exist_ok=True)
RED, WHITE, INK, MUTE = "#c8161d", "#fbfbf8", "#1b1d22", "#8d929a"
def f(path, size, w=None):
    x = ImageFont.truetype(path, size)
    if w: x.set_variation_by_axes([w])
    return x
OUT, PS, MONO, MONOB, ANTON = "media/fonts/Outfit.ttf", "media/fonts/PublicSans.ttf", "media/fonts/PlexMono.ttf", "media/fonts/PlexMonoB.ttf", "media/fonts/Anton.ttf"
def grain(im, k=6, seed=1):
    r = random.Random(seed); px = im.load(); w, h = im.size
    for _ in range(w * h // 9):
        x, y = r.randrange(w), r.randrange(h); c = px[x, y]; d = r.randint(-k, k)
        px[x, y] = tuple(max(0, min(255, v + d)) for v in c[:3])
    return im

TW, TH = 600, 900                                   # tag 6 × 9 cm at 100 px/cm
def tag_base(path, with_149=True, big="RM149", top="JIMAT!", sub="harga sale"):
    im = Image.new("RGB", (TW, TH), RED); d = ImageDraw.Draw(im)
    d.ellipse([TW / 2 - 34, 46, TW / 2 + 34, 114], fill="#2a0b0c")              # punched hole (shows dark)
    d.ellipse([TW / 2 - 50, 30, TW / 2 + 50, 130], outline="#e8c9a0", width=10)   # eyelet ring
    d.text((TW / 2, 200), top, font=f(OUT, 70, 800), fill=WHITE, anchor="mm")
    d.line([60, 250, TW - 60, 250], fill="#e5777b", width=3)
    if with_149:
        d.text((TW / 2, 470), sub, font=f(OUT, 40, 500), fill="#f6c9cb", anchor="mm")
        d.text((TW / 2, 600), big, font=f(ANTON, 200), fill=WHITE, anchor="mm")
    d.rectangle([60, 760, TW - 60, 840], fill=WHITE)
    r = random.Random(46)
    x = 80
    while x < TW - 80: w = r.choice([2, 3, 5]); d.rectangle([x, 772, x + w, 828], fill=INK); x += w + r.choice([3, 4, 6])
    grain(im, 7).save(path)
tag_base(O / "tag_front.png")
tag_base(O / "tag_blank.png", with_149=False)                                  # the card under the sticker: nothing there
tag_base(O / "tag_50.png", big="50%", top="DISKAUN", sub="")
# the "was" sticker: a separate layer laid over the card (it is what splits off in the cutaway)
st = Image.new("RGB", (480, 170), RED); d = ImageDraw.Draw(st)
d.text((240, 92), "dari RM299", font=f(OUT, 84, 600), fill="#f3d2d3", anchor="mm"); grain(st, 6, 2).save(O / "was_sticker.png")
# the stamp's impression (what the stamp prints): same words, slightly blotchy
sp = Image.new("RGB", (480, 170), RED); d = ImageDraw.Draw(sp)
d.text((240, 92), "dari RM299", font=f(OUT, 84, 600), fill="#f3d2d3", anchor="mm")
sp = sp.filter(ImageFilter.GaussianBlur(1.2)); grain(sp, 14, 3).save(O / "was_stamped.png")

# thermal receipt (portrait): mono, faint grey print, one line that will be highlighted in 3D
RW, RH = 520, 1400
rc = Image.new("RGB", (RW, RH), "#f4f2ec"); d = ImageDraw.Draw(rc)
m, mb = f(MONO, 30), f(MONOB, 34)
y = 50
for s, fnt in [("KEDAI SERBANEKA", mb), ("Jalan Contoh, KL", m), ("17/11/2026  20:41", m)]: d.text((RW / 2, y), s, font=fnt, fill="#3a3c40", anchor="mt"); y += 48
y += 20; d.text((30, y), "-" * 26, font=m, fill="#6a6c70"); y += 50
rows = [("Periuk tekanan 6L", "169.00"), ("Beg plastik", "0.20")]
for a, b in rows: d.text((30, y), a, font=m, fill="#2c2e32"); d.text((RW - 30, y), b, font=m, fill="#2c2e32", anchor="ra"); y += 52
d.text((30, y), "-" * 26, font=m, fill="#6a6c70"); y += 54
d.text((30, y), "JUMLAH", font=mb, fill="#1d1f22"); d.text((RW - 30, y), "169.20", font=mb, fill="#1d1f22", anchor="ra"); y += 70
for s in ["Tunai      200.00", "Baki        30.80", "", "Terima kasih!", "Simpan resit ini."]: d.text((RW / 2, y), s, font=m, fill="#4a4c50", anchor="mt"); y += 46
d.text((RW / 2, RH - 60), "ilustrasi", font=f(OUT, 26, 400), fill="#b2b5ba", anchor="mm")
grain(rc, 5, 4).save(O / "receipt.png")
print("receipt row y:", 50 + 48 * 3 + 20 + 50, "of", RH)

# the law card (white, on the counter): name of the Order + the plain rule (paraphrase, no quote marks)
lc = Image.new("RGB", (900, 600), WHITE); d = ImageDraw.Draw(lc)
d.rectangle([0, 0, 900, 22], fill=INK)
d.text((50, 70), "PERINTAH KAWALAN HARGA DAN", font=f(OUT, 34, 700), fill=INK)
d.text((50, 112), "ANTIPENCATUTAN (PENANDAAN HARGA) 2020", font=f(OUT, 34, 700), fill=INK)
d.line([50, 190, 850, 190], fill="#d4d6da", width=3)
d.text((50, 230), "Harga tag lain dengan harga kaunter?", font=f(OUT, 44, 500), fill="#3c3f45")
d.text((50, 310), "Harga lebih rendah", font=f(OUT, 78, 800), fill=RED)
d.text((50, 400), "yang terpakai.", font=f(OUT, 78, 800), fill=RED)
d.text((50, 535), "ringkasan, bukan teks penuh", font=f(OUT, 28, 400), fill=MUTE)
grain(lc, 4, 5).save(O / "lawcard.png")

# KPDN folder tab label (name only, no logo)
fl = Image.new("RGB", (700, 200), "#e9e6dc"); d = ImageDraw.Draw(fl)
d.text((40, 40), "ADUAN · KPDN", font=f(OUT, 70, 800), fill=INK); d.text((40, 130), "gambar tag + resit", font=f(OUT, 40, 500), fill="#5c5f66")
grain(fl, 5, 6).save(O / "folder_label.png")

# the product box print (grey world: printed in greys)
bx = Image.new("RGB", (800, 600), "#8f9298"); d = ImageDraw.Draw(bx)
d.rounded_rectangle([60, 60, 740, 540], 30, outline="#d6d8dc", width=6)
d.text((100, 110), "PENGGORENG", font=f(OUT, 84, 800), fill="#eceef1"); d.text((100, 210), "UDARA 5L", font=f(OUT, 84, 800), fill="#eceef1")
d.ellipse([480, 300, 700, 520], outline="#d6d8dc", width=8); d.rectangle([540, 260, 640, 300], fill="#d6d8dc")
d.text((100, 440), "1500W · 8 menu", font=f(OUT, 44, 500), fill="#d6d8dc")
grain(bx, 8, 7).save(O / "box_print.png")

# counter drum digits 0–9 (vertical strip) for the RM100,000 counter
dg = Image.new("RGB", (160, 2400), "#16181c"); d = ImageDraw.Draw(dg)
for i in range(10): d.text((80, i * 240 + 120), str(i), font=f(ANTON, 190), fill="#f1f2f4", anchor="mm"); d.line([0, i * 240, 160, i * 240], fill="#2a2d33", width=4)
dg.save(O / "digits.png")
print("ok")
# the red "RM149" stamp mark for the receipt (ink, slightly rotated box)
sm = Image.new("RGBA", (420, 180), (0, 0, 0, 0)); d = ImageDraw.Draw(sm)
d.rounded_rectangle([10, 10, 410, 170], 18, outline="#c8161d", width=10)
d.text((210, 92), "RM149", font=f(ANTON, 120), fill="#c8161d", anchor="mm")
sm = sm.rotate(-6, expand=False, resample=Image.BICUBIC).filter(ImageFilter.GaussianBlur(0.8)); sm.save(O / "stamp149.png")
# the fine document (illustrative): maximum company fine, the Act and section
fd = Image.new("RGB", (800, 1100), "#f3f1ea"); d = ImageDraw.Draw(fd)
d.rectangle([0, 0, 800, 26], fill=INK)
d.text((60, 80), "DENDA MAKSIMUM", font=f(OUT, 64, 800), fill=INK)
d.text((60, 170), "syarikat · harga mengelirukan", font=f(OUT, 40, 500), fill="#4a4d54")
d.line([60, 250, 740, 250], fill="#d4d6da", width=3)
d.text((60, 300), "sehingga", font=f(OUT, 48, 500), fill="#4a4d54")
d.text((60, 640), "Akta Perlindungan Pengguna 1999", font=f(OUT, 40, 600), fill=INK)
d.text((60, 700), "seksyen 145", font=f(OUT, 40, 500), fill="#4a4d54")
d.text((60, 1020), "ilustrasi", font=f(OUT, 30, 400), fill=MUTE)
grain(fd, 4, 8).save(O / "fine_doc.png")
print("extra ok")
# step tags (shot 8): the same red card, a big number and the step word
for i, (w1, w2) in enumerate([("SCREENSHOT", "sebelum sale"), ("SEMAK", "resit"), ("REPORT", "KPDN")], 1):
    im = Image.new("RGB", (TW, TH), RED); d = ImageDraw.Draw(im)
    d.ellipse([TW / 2 - 34, 46, TW / 2 + 34, 114], fill="#2a0b0c"); d.ellipse([TW / 2 - 50, 30, TW / 2 + 50, 130], outline="#e8c9a0", width=10)
    d.text((TW / 2, 420), str(i), font=f(ANTON, 380), fill=WHITE, anchor="mm")
    d.text((TW / 2, 680), w1, font=f(OUT, 70, 800), fill=WHITE, anchor="mm"); d.text((TW / 2, 770), w2, font=f(OUT, 50, 500), fill="#f6c9cb", anchor="mm")
    grain(im, 7, 10 + i).save(O / f"step{i}.png")
print("steps ok")
# pegboard tile (one hole per 2.5 cm cell), repeated in 3D
pb = Image.new("RGB", (128, 128), "#3a3d43"); d = ImageDraw.Draw(pb)
d.ellipse([46, 46, 82, 82], fill="#0c0d0f"); d.arc([46, 46, 82, 82], 200, 360, fill="#55585f", width=3)
grain(pb, 5, 20).save(O / "pegboard.png")
print("pegboard ok")
# the fine's figure as its own print (stamps onto the document on the word)
fn = Image.new("RGBA", (860, 200), (0, 0, 0, 0)); d = ImageDraw.Draw(fn)
d.text((10, 100), "RM100,000", font=f(ANTON, 160), fill=RED, anchor="lm"); fn.save(O / "fine_num.png")
print("fine num ok")

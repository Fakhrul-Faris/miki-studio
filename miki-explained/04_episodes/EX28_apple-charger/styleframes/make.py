"""EX28 Style B stills, one per beat (BIBLE-B; flat-v3 playbook gate 3).
   ~/.local/bin/uv run --with resvg-py --with pillow python styleframes/make.py
No outlines, subtle grain, flat shapes with inner detail. Every scene is drawn twice — in night tones and in light
tones — and the light shape (window patch, shaft, spotlight) clips the lit copy over the dark one: the light is the
composition (B2) and objects in shadow melt into the ground (B3). The charger is the through-line (B7).
Palette: night ink-navy ground, warm cream light, the charger the only pure white, amber = the alarm (price tag only)."""
import os, io, math, re
HERE = os.path.dirname(os.path.abspath(__file__))
F = 'font-family="Inter Display"'
APPLE = re.search(r'd="([^"]+)"', open(f"{HERE}/../../../02_kit/brand/logos/apple.svg").read()).group(1)

DARK = dict(ground="#1E2440", ground2="#232A4A", w="#39426A", w2="#2E365A", s="#262D4E", cast="#161A30", deep="#12162A",
            wood="#2B3150", wood2="#252B48", phone="#34405F", lens="#1A2034", ink="#8A93B8", label="#3E4770", warm="#4A4660")
LIT = dict(ground="#EFDDBD", ground2="#E7D3AE", w="#FCFAF4", w2="#E9E3D6", s="#D9CDB6", cast="#C6B18B", deep="#A99572",
           wood="#D9B07A", wood2="#C79B62", phone="#A9BCD1", lens="#3A4358", ink="#232A40", label="#FFFFFF", warm="#F6C978")
WHITE, AMBER, AMBER_D, NAVY_T = "#FFFFFF", "#F4A51C", "#C9820E", "#1E2440"

DEFS = '''<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" seed="28"/>
  <feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.06"/></feComponentTransfer></filter>'''
def svg(body, defs=""):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920"><defs>{DEFS}{defs}</defs>'
            f'{body}<rect width="1080" height="1920" filter="url(#grain)"/></svg>')
def poly(pts, fill, extra=""): return f'<polygon points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in pts)}" fill="{fill}" {extra}/>'
def rr(x, y, w, h, r, fill, extra=""): return f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{r}" fill="{fill}" {extra}/>'
def g(body, tr): return f'<g transform="{tr}">{body}</g>'
def apple(x, y, h, fill):                       # the official glyph, h px tall, top-left at x, y
    s = h / 16.3
    return f'<g transform="translate({x},{y}) scale({s}) translate(0,-12.35)"><path d="{APPLE}" fill="{fill}"/></g>'
def two(scene, clip_shapes, cid):
    """dark copy, then the lit copy inside the light shape"""
    return (scene(DARK) + f'<clipPath id="{cid}">{clip_shapes}</clipPath>' + f'<g clip-path="url(#{cid})">{scene(LIT)}</g>')

# ---------------------------------------------------------------- shared objects
def charger_top(cx, cy, s, rot, p, lit_white=True):
    """the 20W adapter seen from its pin face: Malaysian 3-pin (BS 1363): earth pin up, two flat pins below"""
    b = WHITE if lit_white else p["w"]
    t = (rr(-60 * s + 10 * s, -60 * s + 14 * s, 120 * s, 120 * s, 22 * s, p["cast"]) +
         rr(-60 * s, -60 * s, 120 * s, 120 * s, 22 * s, b) +
         rr(-52 * s, -52 * s, 104 * s, 104 * s, 18 * s, p["w2"] if not lit_white else "#F1F0EC") +
         rr(-7 * s, -40 * s, 14 * s, 30 * s, 2 * s, p["deep"]) +                         # earth pin (vertical)
         rr(-34 * s, 14 * s, 24 * s, 10 * s, 2 * s, p["deep"]) + rr(10 * s, 14 * s, 24 * s, 10 * s, 2 * s, p["deep"]) +
         rr(-8 * s, -38 * s, 4 * s, 26 * s, 1 * s, "#5B6382"))                           # pin highlight
    return g(t, f"translate({cx},{cy}) rotate({rot})")

def charger_side(cx, cy, s, p, white=WHITE):
    """side view: body + USB-C port + the earth pin"""
    t = (rr(-55 * s, -50 * s, 110 * s, 100 * s, 18 * s, white) + rr(-55 * s, 30 * s, 110 * s, 20 * s, 10 * s, "#E4E2DC") +
         rr(-14 * s, -6 * s, 28 * s, 9 * s, 4.5 * s, "#2A3046") +                          # USB-C port
         rr(-6 * s, -78 * s, 12 * s, 28 * s, 2 * s, "#9AA0B4") + rr(-30 * s, -66 * s, 18 * s, 16 * s, 2 * s, "#9AA0B4") +
         rr(12 * s, -66 * s, 18 * s, 16 * s, 2 * s, "#9AA0B4"))
    return g(t, f"translate({cx},{cy})")

def iphone_box_side(x, y, w, h, p, cut=True, charger=False):
    """an iPhone box in side cutaway: lid, tray, phone layer, cable layer (and the old charger)"""
    t = rr(x + 10, y + 14, w, h, 10, p["cast"]) + rr(x, y, w, h, 10, p["w"])
    if cut:
        ins = 12
        t += rr(x + ins, y + ins, w - 2 * ins, h - 2 * ins, 6, p["s"])
        ph = min(46, (h - 2 * ins) * 0.45)
        t += rr(x + ins + 10, y + ins + 6, w - 2 * ins - 20, ph, 8, p["phone"])          # the phone, lying in the lid well
        t += rr(x + ins + 18, y + ins + 6 + ph * 0.3, 60, ph * 0.4, 6, p["lens"])          # camera bump edge
        cy = y + ins + 6 + ph + 8
        for k in range(5): t += rr(x + ins + 16 + k * 16, cy, 12, 12, 6, p["w2"])             # the cable coil, end-on
        if charger: t += charger_side(x + w - ins - 110, cy + 120, 0.95, p, p["w"] if p is DARK else WHITE)
    return t

# ---------------------------------------------------------------- S1 · L01 hook — top-down table, window patch
def s1(p):
    t = rr(0, 0, 1080, 1920, 0, p["ground"])
    for yy in range(-40, 1920, 132): t += rr(0, yy, 1080, 5, 0, p["ground2"])           # table boards
    # the lid (top-left, turned): white, Apple logo
    lid = (rr(14, 18, 400, 760, 30, p["cast"]) + rr(0, 0, 400, 760, 30, p["w"]) + rr(18, 18, 364, 724, 22, p["w2"]) +
           rr(0, 0, 400, 760, 30, p["w"], 'opacity=".55"') + apple(155, 300, 120, p["ink"]) +
           rr(170, 700, 60, 14, 7, p["s"]))                                                 # pull tab
    t += g(lid, "translate(70,180) rotate(-9)")
    # the base tray (centre), cut open: cable well + the EMPTY charger recess with a hard shadow
    tray = (rr(16, 20, 420, 800, 28, p["cast"]) + rr(0, 0, 420, 800, 28, p["w"]) + rr(16, 16, 388, 768, 20, p["w2"]) +
            rr(36, 60, 348, 330, 18, p["s"]))                                              # cable well
    for k in range(6):                                                                       # the coiled USB-C cable
        r = 120 - k * 14
        tray += f'<circle cx="210" cy="225" r="{r}" fill="{p["w"] if k % 2 == 0 else p["w2"]}"/>'
    tray += rr(150, 110, 120, 34, 10, p["w"]) + rr(190, 92, 40, 26, 6, p["lens"])          # paper band + connector
    tray += (rr(96, 440, 228, 228, 26, p["deep"]) + poly([(96, 440), (324, 440), (300, 466), (122, 466)], p["cast"]) +
             poly([(96, 440), (122, 466), (122, 644), (96, 668)], p["cast"]))             # the empty recess: deep shadow
    for dx, dy, w_, h_ in ((200, 486, 20, 52), (156, 590, 44, 18), (220, 590, 44, 18)):    # its pin dents: a charger WAS here
        tray += rr(dx, dy, w_, h_, 3, p["cast"])
    t += g(tray, "translate(330,640) rotate(6)")
    # the phone lying beside (lower right), back up: camera bump, logo
    ph = (rr(14, 18, 300, 620, 52, p["cast"]) + rr(0, 0, 300, 620, 52, p["phone"]) + rr(22, 24, 128, 128, 30, p["lens"]) +
          f'<circle cx="60" cy="62" r="24" fill="{p["deep"]}"/><circle cx="112" cy="114" r="24" fill="{p["deep"]}"/>'
          f'<circle cx="112" cy="62" r="9" fill="{p["warm"]}"/>' + apple(126, 270, 64, p["lens"]))
    t += g(ph, "translate(700,1240) rotate(-14)")
    return t

S1_PATCH = (poly([(150, 380), (566, 299), (606, 930), (190, 1008)], "#000") + poly([(580, 296), (1000, 214), (1040, 838), (620, 920)], "#000") +
            poly([(192, 1022), (607, 942), (642, 1560), (234, 1640)], "#000") + poly([(621, 936), (1044, 856), (1080, 1470), (656, 1556)], "#000"))

# ---------------------------------------------------------------- S2a · L02 the box gets thin — side cutaway
def s2a(p):
    t = rr(0, 0, 1080, 1920, 0, p["ground"]) + rr(0, 1180, 1080, 740, 0, p["ground2"])      # table edge
    t += iphone_box_side(70, 760, 440, 420, p, charger=True)                                  # OLD box: thick, charger inside
    t += iphone_box_side(570, 1040, 440, 140, p, charger=False)                               # NEW box: thin
    t += rr(570, 760, 440, 14, 7, p["s"], 'opacity=".7"') + rr(570, 760, 6, 280, 3, p["s"], 'opacity=".7"') + rr(1004, 760, 6, 280, 3, p["s"], 'opacity=".7"')   # ghost of the old height
    t += f'<text x="290" y="1250" {F} font-weight="800" font-size="34" fill="{p["ink"]}" text-anchor="middle" letter-spacing="3">2019</text>'
    t += f'<text x="790" y="1250" {F} font-weight="800" font-size="34" fill="{p["ink"]}" text-anchor="middle" letter-spacing="3">2020</text>'
    return t + charger_side(790, 560, 1.6, p)                                                   # the charger, lifted out (white everywhere)
S2A_SHAFT = poly([(0, 520), (1080, 300), (1080, 1300), (0, 1520)], "#000")

# ---------------------------------------------------------------- S2b · L02 +70% per pallet — side elevation, warehouse shaft
def s2b(p):
    t = rr(0, 0, 1080, 1920, 0, p["ground"]) + rr(0, 1500, 1080, 420, 0, p["ground2"])
    # the pallet: three deck boards, blocks, the stack of thin boxes held by stretch wrap
    pal = rr(0, 0, 760, 30, 4, p["wood"]) + rr(0, 70, 760, 26, 4, p["wood"])
    for bx in (0, 350, 712): pal += rr(bx, 30, 48, 40, 3, p["wood2"])
    t += g(pal, "translate(160,1404)")
    rows, colw, rowh = 15, 760 / 6, 52
    for r in range(rows):
        y = 1404 - (r + 1) * rowh
        for c in range(6):
            t += rr(160 + c * colw + 3, y + 3, colw - 6, rowh - 6, 6, p["w"]) + rr(160 + c * colw + 3, y + rowh - 14, colw - 6, 8, 4, p["w2"])
    for k in range(4): t += rr(150, 1404 - rows * rowh + 40 + k * 190, 780, 26, 6, p["s"], 'opacity=".55"')   # stretch-wrap bands
    t += rr(150, 1404 - rows * rowh - 6, 780, 10, 5, p["s"])
    # the old (2019) stack height, as a ghost line far lower: 9 rows
    t += rr(140, 1404 - 9 * rowh - 4, 800, 8, 4, AMBER if p is LIT else "#6B5A3A", 'opacity=".9"')
    t += f'<text x="950" y="{1404 - 9 * rowh - 16}" {F} font-weight="800" font-size="30" fill="{p["ink"]}" text-anchor="end">2019 LOAD</text>'
    # the shipping label on the wrap: +70% printed on the object (B4)
    lab = (rr(10, 12, 300, 270, 10, p["cast"]) + rr(0, 0, 300, 270, 10, p["label"]) + rr(0, 0, 300, 46, 10, p["ink"]) +
           f'<text x="18" y="33" {F} font-weight="800" font-size="24" fill="{p["label"]}" letter-spacing="2">PALLET 07 · IPHONE</text>'
           f'<text x="150" y="150" {F} font-weight="900" font-size="104" fill="{p["ink"]}" text-anchor="middle">+70%</text>'
           f'<text x="150" y="194" {F} font-weight="700" font-size="24" fill="{p["ink"]}" text-anchor="middle" letter-spacing="2">BOXES PER PALLET</text>')
    for k in range(18): lab += rr(18 + k * 15, 214, 6 + (k % 3) * 3, 40, 1, p["ink"])      # barcode, under the words
    t += g(lab, "translate(390,900)")
    return t
S2B_SHAFT = poly([(560, 0), (1080, 0), (1080, 120), (520, 1780), (40, 1780)], "#000")

# ---------------------------------------------------------------- S2c · L02 same truck — lorry cutaway (side elevation)
def s2c(p):
    t = rr(0, 0, 1080, 1920, 0, p["ground"]) + rr(0, 1390, 1080, 530, 0, p["ground2"]) + rr(0, 1386, 1080, 10, 0, p["s"])
    # the lorry, cut open along its side: cargo box with pallets of thin boxes, cab on the right
    t += rr(40, 700, 760, 640, 14, p["w"]) + rr(60, 720, 720, 600, 8, p["deep"])           # cargo box + its dark inside
    for c in range(4):                                                                         # four pallets, stacked to the roof
        x0 = 72 + c * 176
        t += rr(x0, 1286, 160, 20, 3, p["wood"])
        for r in range(11): t += rr(x0 + 4, 1286 - (r + 1) * 50 + 4, 152, 42, 5, p["w2"] if r % 2 else p["w"])
    t += rr(820, 980, 220, 360, 30, p["w"]) + rr(860, 1010, 150, 130, 18, p["s"])             # cab + window
    t += rr(1010, 1230, 40, 50, 8, p["warm"])                                                  # headlight
    for wx in (180, 640, 930):                                                                 # wheels
        t += f'<circle cx="{wx}" cy="1350" r="70" fill="{p["deep"]}"/><circle cx="{wx}" cy="1350" r="30" fill="{p["s"]}"/>'
    # the door's load sheet: same truck, far more iPhones (words on the object)
    sheet = (rr(0, 0, 260, 150, 8, p["label"]) + f'<text x="130" y="44" {F} font-weight="800" font-size="24" fill="{p["ink"]}" text-anchor="middle" letter-spacing="2">LOAD</text>'
             f'<text x="130" y="112" {F} font-weight="900" font-size="58" fill="{p["ink"]}" text-anchor="middle">+70%</text>')
    t += g(sheet, "translate(300,520)")
    return t + charger_side(860, 1500, 1.4, p)                                                 # the charger, rolled out onto the road
S2C_LIGHT = poly([(0, 0), (1080, 0), (1080, 760), (0, 1060)], "#000")

# ---------------------------------------------------------------- S3 · L03 RM99 — accessories shop, frontal elevation
def s3(p):
    t = rr(0, 0, 1080, 1920, 0, p["ground"])
    t += rr(60, 200, 960, 1220, 12, p["ground2"])                                              # pegboard
    for yy in range(240, 1400, 60):
        for xx in range(100, 1000, 60): t += f'<circle cx="{xx}" cy="{yy}" r="5" fill="{p["deep"]}"/>'
    packs = [(130, 300, "#4F7CC4"), (330, 300, "#D9534F"), (730, 300, "#3FA27A"), (130, 640, "#8E6BC9"), (730, 640, "#E08A3C"),
             (130, 980, "#2F9FB5"), (330, 980, "#C64B83"), (730, 980, "#5A6D86")]
    for x, y, c in packs:                                                                      # blister packs on pegs: cases, cables, earbuds
        col = c if p is LIT else "#3A4062"
        t += rr(x + 74, y - 22, 12, 30, 3, p["deep"]) + rr(x + 8, y + 10, 220, 290, 14, p["cast"])
        t += rr(x, y, 220, 290, 14, col) + rr(x + 20, y + 40, 180, 170, 18, p["w"], 'opacity=".55"') + rr(x + 20, y + 228, 120, 18, 6, p["w"], 'opacity=".6"')
    # THE charger box, centre, on its own peg: white box, charger drawn on the front, amber swing tag RM99
    t += rr(524, 560, 12, 40, 3, p["deep"]) + rr(410, 620, 240, 300, 16, p["cast"])
    t += rr(400, 600, 240, 300, 16, WHITE if p is LIT else p["w"]) + charger_side(520, 740, 0.85, p, "#ECEAE4" if p is LIT else p["w2"])
    t += apple(507, 830, 30, p["ink"])
    tag = (f'<path d="M0 0 C 30 -40, 70 -40, 92 -6" fill="none" stroke="{p["ink"]}" stroke-width="3"/>' +
           rr(70, -4, 210, 120, 14, AMBER_D if p is LIT else "#6B5A3A") + rr(64, -10, 210, 120, 14, AMBER if p is LIT else "#7A6640") +
           f'<circle cx="92" cy="20" r="9" fill="{p["ground2"]}"/>'
           f'<text x="176" y="82" {F} font-weight="900" font-size="66" fill="{NAVY_T}" text-anchor="middle">RM99</text>')
    t += g(tag, "translate(600,640) rotate(8)")
    # the shop's counter and signboard band (Malaysian accessories shop)
    t += rr(0, 1420, 1080, 500, 0, p["s"]) + rr(0, 1420, 1080, 24, 0, p["w2"])
    t += rr(0, 70, 1080, 110, 0, p["deep"]) + f'<text x="540" y="146" {F} font-weight="900" font-size="56" fill="{p["warm"]}" text-anchor="middle" letter-spacing="10">AKSESORI TELEFON</text>'
    return t
S3_SPOT = poly([(470, 0), (610, 0), (900, 1420), (180, 1420)], "#000")

# ---------------------------------------------------------------- S4 · L04 Brazil — low angle at the notice
def s4(p):
    G, Y = ("#1E9E4A", "#F7D117") if p is LIT else ("#2C4A44", "#5A5640")
    t = rr(0, 0, 1080, 1920, 0, p["ground"])
    # the ministry's columns seen from below (converging)
    for k in range(6):
        x0 = 40 + k * 190
        t += poly([(x0, 1920), (x0 + 120, 1920), (x0 + 96 + (540 - x0) * 0.22, 300), (x0 + 26 + (540 - x0) * 0.22, 300)], p["w2"])
    t += poly([(0, 300), (1080, 300), (1000, 180), (80, 180)], p["w"]) + rr(80, 130, 920, 54, 0, p["s"])
    # the notice, pinned flat in the foreground: words and numbers on the document
    doc = (rr(16, 20, 640, 860, 12, p["cast"]) + rr(0, 0, 640, 860, 12, p["label"]) + rr(0, 0, 640, 26, 12, G) + rr(0, 20, 640, 10, 0, Y) +
           f'<text x="48" y="110" {F} font-weight="800" font-size="30" fill="{p["ink"]}" letter-spacing="3">MINISTÉRIO DA JUSTIÇA</text>'
           f'<text x="48" y="150" {F} font-weight="600" font-size="24" fill="{p["ink"]}" opacity=".7">BRASIL · 2022 · APPLE INC.</text>'
           f'<text x="48" y="300" {F} font-weight="800" font-size="34" fill="{p["ink"]}">MULTA</text>'
           f'<text x="48" y="400" {F} font-weight="900" font-size="88" fill="{p["ink"]}">R$12,3 MI</text>')
    for k in range(6): doc += rr(48, 470 + k * 34, 420 + (k * 37) % 120, 12, 6, p["s"])      # body text lines
    doc += (f'<circle cx="500" cy="690" r="96" fill="none" stroke="{G}" stroke-width="10" opacity=".9"/>'
            f'<text x="500" y="680" {F} font-weight="900" font-size="30" fill="{G}" text-anchor="middle" transform="rotate(-12 500 690)">CARREGADOR</text>'
            f'<text x="500" y="716" {F} font-weight="900" font-size="30" fill="{G}" text-anchor="middle" transform="rotate(-12 500 690)">NA CAIXA</text>')
    t += g(doc, "translate(200,720) rotate(-4)")
    return t + charger_top(830, 520, 1.0, 20, p)                                               # the charger, on its way back
S4_LIGHT = poly([(0, 640), (1080, 520), (1080, 1720), (0, 1840)], "#000")

# ---------------------------------------------------------------- S5 · L05 end — top-down bookend: thin box + the charger's own box
def s5(p):
    t = rr(0, 0, 1080, 1920, 0, p["ground"])
    for yy in range(-40, 1920, 132): t += rr(0, yy, 1080, 5, 0, p["ground2"])
    box = rr(14, 18, 380, 740, 30, p["cast"]) + rr(0, 0, 380, 740, 30, p["w"]) + apple(140, 290, 120, p["ink"])
    t += g(box, "translate(130,560) rotate(-6)")
    cb = rr(12, 16, 240, 240, 20, p["cast"]) + rr(0, 0, 240, 240, 20, WHITE if p is LIT else p["w"]) + charger_top(120, 120, 0.9, 0, p, lit_white=p is LIT)
    t += g(cb, "translate(640,800) rotate(8)")
    tag = rr(64, -10, 190, 104, 14, AMBER if p is LIT else "#7A6640") + f'<text x="159" y="64" {F} font-weight="900" font-size="56" fill="{NAVY_T}" text-anchor="middle">RM99</text>'
    return t + g(tag, "translate(660,1060) rotate(-6)")
S5_PATCH = poly([(90, 470), (1000, 330), (1050, 1260), (140, 1400)], "#000")

FRAMES = [("S1_hook", s1, S1_PATCH), ("S2a_thin", s2a, S2A_SHAFT), ("S2b_pallet", s2b, S2B_SHAFT), ("S2c_truck", s2c, S2C_LIGHT),
          ("S3_rm99", s3, S3_SPOT), ("S4_brazil", s4, S4_LIGHT), ("S5_end", s5, S5_PATCH)]

if __name__ == "__main__":
    import resvg_py
    from PIL import Image
    ims = []
    for name, fn, clip in FRAMES:
        s = svg(two(fn, clip, f"c_{name}"))
        open(f"{HERE}/{name}.svg", "w").write(s)
        png = resvg_py.svg_to_bytes(svg_string=s, font_dirs=[os.path.expanduser("~/Library/Fonts")])
        im = Image.open(io.BytesIO(bytes(png))).convert("RGB"); im.save(f"{HERE}/{name}.png"); ims.append(im)
    sheet = Image.new("RGB", (len(ims) * 360 + (len(ims) - 1) * 12, 640), "#0E0F14")
    for i, im in enumerate(ims): sheet.paste(im.resize((360, 640)), (i * 372, 0))
    sheet.save(f"{HERE}/contact_sheet.jpg", quality=90); print("wrote", len(ims), "stills + contact_sheet.jpg")

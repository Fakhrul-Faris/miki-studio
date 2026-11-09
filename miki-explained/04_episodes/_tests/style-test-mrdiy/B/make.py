"""Style B test stills (BIBLE-B: no line, subtle grain, light as hard shapes, one invented object, words on objects).
   ~/.local/bin/uv run --with resvg-py --with pillow python make.py"""
import os, io, base64
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(HERE, "stills"); os.makedirs(OUT, exist_ok=True)
LOGOS = "/Users/user/Private/miki-studio/miki-explained/02_kit/brand/logos"
LIGHT, LIGHT2, SHADE, SHADE2, INK = "#F3EAD8", "#E6D9BF", "#2B3F7A", "#22336A", "#17204A"
RED, RED_D, YEL, YEL_D, WHITE = "#E3262B", "#B51C21", "#FFE500", "#D9C200", "#FFFDF6"
F = 'font-family="Inter Display"'
def b64(p): return "data:image/png;base64," + base64.b64encode(open(p, "rb").read()).decode()
DIY = b64(f"{LOGOS}/mrdiy_logo.png"); SPD = b64(f"{LOGOS}/99speedmart_logo.png")
DEFS = '''<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="29"/><feColorMatrix type="saturate" values="0"/>
<feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer></filter>
<filter id="mono"><feColorMatrix type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.6  0 0 0 0 0.8  0 0 0 0.75 0"/></filter>'''
def svg(body): return (f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1080 1920" width="1080" height="1920">'
                       f'<defs>{DEFS}</defs>{body}<rect width="1080" height="1920" filter="url(#grain)"/></svg>')
def R(x, y, w, h, c, extra=""): return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{c}" {extra}/>'
def P(pts, c, extra=""): return f'<polygon points="{" ".join(f"{a},{b}" for a, b in pts)}" fill="{c}" {extra}/>'
def T(x, y, s, txt, c, w=900, anchor="middle", extra=""): return f'<text x="{x}" y="{y}" {F} font-weight="{w}" font-size="{s}" fill="{c}" text-anchor="{anchor}" {extra}>{txt}</text>'

# ---------------- B1 hook: flat elevation of the shophouse row at noon; the sun line splits light (top) from shade (below)
def unit(x, w, diy=False, spd=False):
    t = []
    wall = YEL if diy else LIGHT; wall_shade = YEL_D if diy else SHADE
    t.append(R(x, 380, w, 520, wall))                                   # upper floor (sunlit)
    for j in range(3):                                                  # windows: dark recesses with a sun wedge inside
        wx = x + 46 + j * (w - 92) / 3; ww = (w - 92) / 3 - 26
        t.append(R(wx, 520, ww, 250, SHADE2 if not diy else RED_D))
        t.append(P([(wx, 520), (wx + ww, 520), (wx + ww, 600), (wx, 680)], LIGHT2 if not diy else YEL_D))
    t.append(R(x, 330, w, 50, wall)); t.append(R(x + 20, 300, w - 40, 30, wall))
    t.append(R(x, 900, w, 520, wall_shade))                             # arcade: everything below the line is in shade
    if diy:
        t.append(R(x + 10, 900, w - 20, 120, RED)); t.append(f'<image href="{DIY}" x="{x + 28}" y="{922}" width="{w - 56}" height="{(w - 56) * 177 / 981:.0f}"/>')
        t.append(R(x + 70, 1060, w - 140, 360, "#FFF4C9"))              # open, lit shop interior
        for r in range(4):
            for n in range(9):
                cols = [RED, SHADE, YEL_D, "#3BB273", RED_D, "#2F6FD6"]
                t.append(R(x + 92 + n * ((w - 184) / 9), 1100 + r * 78, (w - 184) / 9 - 8, 52, cols[(n + r * 2) % len(cols)]))
        for b in range(4): t.append(R(x + 30, 1300 + b * 26, 120, 22, RED))  # stack of red baskets
    else:
        t.append(R(x + 10, 900, w - 20, 120, SHADE2))
        if spd: t.append(f'<image href="{SPD}" x="{x + 70}" y="{924}" width="{w - 140}" height="70" filter="url(#mono)" preserveAspectRatio="xMidYMid meet"/>')
        t.append(R(x + 70, 1060, w - 140, 360, INK))
        t.append(R(x + 70, 1060, w - 140, 360, SHADE, 'opacity=".55"'))
    for cx in (x, x + w - 34): t.append(R(cx, 1020, 34, 400, YEL_D if diy else SHADE2))
    return "".join(t)
b = [R(0, 0, 1080, 1920, "#9DB3E3")]                                     # sky
b.append(unit(-300, 400)); b.append(unit(100, 520, diy=True)); b.append(unit(620, 460, spd=True)); b.append(unit(1080, 400))
b.append(R(0, 1420, 1080, 60, SHADE)); b.append(R(0, 1480, 1080, 440, "#8D93A8"))   # five-foot way, road
b.append(P([(0, 1480), (1080, 1480), (1080, 1560), (0, 1640)], SHADE, 'opacity=".55"'))   # long shadow of the row on the road
# the receipts: each shop's receipt rolls out of its door onto the road; Mr DIY's runs twice as far = twice the margin
b.append(P([(300, 1420), (420, 1420), (440, 1890), (320, 1890)], WHITE)); b.append(P([(300, 1420), (420, 1420), (424, 1500), (304, 1500)], LIGHT2))
for i in range(9): b.append(R(335, 1540 + i * 36, 70 + (i % 3) * 10, 8, SHADE, 'opacity=".45"'))
b.append(T(380, 1850, 30, "MARGIN 2×", RED))
b.append(P([(800, 1420), (900, 1420), (906, 1650), (806, 1650)], WHITE, 'opacity=".9"'))
for i in range(4): b.append(R(822, 1460 + i * 36, 56 + (i % 2) * 8, 8, SHADE, 'opacity=".45"'))
b.append(T(856, 1620, 26, "1×", SHADE))
B1 = svg("".join(b))

# ---------------- B2 mechanism: factory → conveyor straight into the shop's door; the middleman box is bypassed; own-brand stamp
b = [R(0, 0, 1080, 1920, LIGHT)]
b.append(P([(0, 0), (1080, 0), (1080, 760), (0, 1260)], LIGHT2))                       # sun wedge (light) over the top-left
b.append(P([(0, 1260), (1080, 760), (1080, 1920), (0, 1920)], SHADE))                 # shade below the wedge
# factory (top-left): sawtooth roof, chimney
b.append(R(60, 200, 420, 300, SHADE2)); b.append(P([(60, 200), (130, 120), (130, 200), (200, 120), (200, 200), (270, 120), (270, 200), (340, 120), (340, 200), (410, 120), (410, 200), (480, 120), (480, 200)], SHADE2))
b.append(R(400, 40, 46, 160, SHADE2)); b.append(R(180, 360, 140, 140, INK)); b.append(T(270, 300, 40, "FACTORY", LIGHT, 900))
# conveyor diagonal from the factory door down to the shop door
belt = [(250, 500), (330, 500), (930, 1430), (850, 1430)]
b.append(P(belt, INK)); b.append(P([(262, 500), (318, 500), (918, 1430), (862, 1430)], "#3A4A86"))
for i in range(12):
    u = i / 12; cx = 290 + (890 - 290) * u; cy = 500 + (1430 - 500) * u
    b.append(f'<circle cx="{cx - 46:.0f}" cy="{cy + 10:.0f}" r="9" fill="{LIGHT2}"/>')
# the middleman: a dashed ghost warehouse beside the belt, crossed out
b.append(R(70, 1400, 330, 230, "none", f'stroke="{LIGHT2}" stroke-width="6" stroke-dasharray="22 16" opacity=".7"'))
b.append(P([(70, 1400), (235, 1310), (400, 1400)], "none", f'stroke="{LIGHT2}" stroke-width="6" stroke-dasharray="22 16" opacity=".7"'))
b.append(T(235, 1530, 34, "MIDDLEMAN", LIGHT2, 800, extra='opacity=".7"'))
b.append(R(55, 1505, 360, 12, RED, 'transform="rotate(-28 235 1510)"'))
# cartons on the belt; the stamp arm prints the red own-brand label
for i, u in enumerate((0.18, 0.4, 0.62, 0.84)):
    cx = 290 + (890 - 290) * u; cy = 500 + (1430 - 500) * u
    b.append(R(cx - 70, cy - 120, 140, 110, "#E9C88E")); b.append(R(cx - 70, cy - 120, 140, 26, "#D9B474"))
    if u > 0.5:
        b.append(R(cx - 48, cy - 82, 96, 40, RED)); b.append(T(cx, cy - 54, 16, "OWN BRAND", WHITE, 800))
sx, sy = 290 + 600 * 0.52, 500 + 930 * 0.52
b.append(R(sx + 70, sy - 320, 26, 170, RED_D)); b.append(R(sx - 10, sy - 170, 120, 44, RED)); b.append(T(sx + 50, sy - 140, 18, "STAMP", WHITE, 800))
# the shop at the bottom right: signboard with the real logo, open door the belt runs into
b.append(R(600, 1430, 480, 490, YEL)); b.append(R(600, 1430, 480, 96, RED))
b.append(f'<image href="{DIY}" x="616" y="1445" width="448" height="81"/>')
b.append(R(760, 1560, 240, 360, "#FFF4C9")); b.append(R(760, 1560, 240, 30, YEL_D))
B2 = svg("".join(b))

# ---------------- B3 payoff: top-down counter; a window's sun patch holds the RM1 note and Mr DIY's tag; 99 Speedmart's tag in shade
b = [R(0, 0, 1080, 1920, SHADE)]
for y in range(0, 1920, 120): b.append(R(0, y, 1080, 4, SHADE2))                     # counter boards
patch = [(120, 260), (1000, 120), (1040, 1180), (160, 1320)]
b.append(P(patch, LIGHT)); b.append(P([(560, 190), (586, 186), (626, 1250), (600, 1254)], SHADE, 'opacity=".9"'))   # window bar shadow
# RM1 note in the light (blue, as the real note), lying at an angle
b.append(f'<g transform="rotate(-8 330 600)">{R(150, 470, 380, 190, "#1E64B4")}{R(166, 486, 348, 158, "#2E7BD0")}'
         f'<circle cx="440" cy="565" r="52" fill="#1E64B4"/>{T(250, 600, 72, "RM1", WHITE)}</g>')
# Mr DIY swing tag (in the light): string, tag, big number, one red bar
def tag(x, y, rot, big, small, frac, lit, logo=None):
    paper, ink = (WHITE, INK) if lit else ("#9AA6C8", SHADE2)
    g = [f'<g transform="rotate({rot} {x + 150} {y + 230})">',
         f'<path d="M{x + 150},{y - 140} C{x + 120},{y - 60} {x + 190},{y - 40} {x + 150},{y + 20}" stroke="{paper}" stroke-width="5" fill="none"/>',
         R(x, y, 300, 470, paper, 'rx="26"'), f'<circle cx="{x + 150}" cy="{y + 40}" r="16" fill="{SHADE if lit else INK}"/>']
    if logo: g.append(f'<image href="{logo}" x="{x + 24}" y="{y + 78}" width="252" height="{252 * 177 / 981:.0f}"/>')
    g.append(T(x + 150, y + 250, 120, big, ink))
    g.append(T(x + 150, y + 300, 30, small, ink, 700))
    g.append(R(x + 30, y + 340, 240, 34, SHADE2 if lit else INK, 'opacity=".25"'))
    g.append(R(x + 30, y + 340, 240 * frac, 34, RED if lit else "#6E7AA0"))
    g.append(T(x + 30, y + 420, 24, "OF EVERY RINGGIT", ink, 700, "start"))
    return "".join(g) + "</g>"
b.append(tag(600, 620, 6, "11", "SEN KEPT", 0.11 * 6, True, DIY))
b.append(tag(120, 1360, -10, "5", "SEN KEPT", 0.05 * 6, False))
b.append(T(270, 1890, 30, "99 SPEEDMART", "#6E7AA0", 800))
B3 = svg("".join(b))

import resvg_py
from PIL import Image
for n, s in (("B1", B1), ("B2", B2), ("B3", B3)):
    open(f"{OUT}/{n}.svg", "w").write(s)
    data = resvg_py.svg_to_bytes(svg_string=s); Image.open(io.BytesIO(bytes(data))).convert("RGB").save(f"{OUT}/{n}.png")
print("ok")

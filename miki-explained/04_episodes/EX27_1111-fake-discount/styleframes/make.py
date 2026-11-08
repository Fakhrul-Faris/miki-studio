"""EX27 style frames in the TomTom-reference language (flat geometry, new palette, a viewpoint per beat).
   python3 styleframes/make.py -> styleframes/hook.svg, styleframes/twist.svg (+ .png via resvg)"""
import os, re, random
HERE = os.path.dirname(os.path.abspath(__file__))
PAPER, ROAD, ROOF = "#E4E1D9", "#F3F1EB", "#F8F7F3"
COB, COB_D, INK = "#2E54C6", "#21409C", "#1C2554"
ORANGE, LILAC, GREY = "#F05A28", "#A79BF2", "#D3D0C7"
FONT = 'font-family="Inter Display"'
GRAIN = '''<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="11"/><feColorMatrix type="saturate" values="0"/>
  <feComponentTransfer><feFuncA type="linear" slope="0.07"/></feComponentTransfer></filter>'''
def svg(body): return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920"><defs>{GRAIN}</defs>{body}<rect width="1080" height="1920" filter="url(#grain)"/></svg>'
def block(x0, y0, x1, y1, d=26, roof=ROOF, side=COB):
    """top-down building: roof + a 45° extrusion falling down-left"""
    return (f'<path d="M{x0} {y0} L{x0 - d} {y0 + d} L{x0 - d} {y1 + d} L{x1 - d} {y1 + d} L{x1} {y1} L{x0} {y1} Z" fill="{side}"/>'
            f'<rect x="{x0}" y="{y0}" width="{x1 - x0}" height="{y1 - y0}" fill="{roof}"/>')
def hatch(x0, y0, x1, y1, col=COB, gap=18, w=4):
    cid = f"h{x0}{y0}"
    lines = "".join(f'<line x1="{x}" y1="{y1}" x2="{x + (y1 - y0)}" y2="{y0}"/>' for x in range(x0 - (y1 - y0), x1, gap))
    return f'<clipPath id="{cid}"><rect x="{x0}" y="{y0}" width="{x1 - x0}" height="{y1 - y0}"/></clipPath><g clip-path="url(#{cid})" stroke="{col}" stroke-width="{w}">{lines}</g>'
def tree(x, y, r=26): return f'<circle cx="{x + 9}" cy="{y + 9}" r="{r}" fill="{COB}"/><circle cx="{x}" cy="{y}" r="{r}" fill="{LILAC}"/>'
def van(x, y, rot=0):
    return (f'<g transform="translate({x},{y}) rotate({rot})"><rect x="-22" y="-44" width="44" height="88" rx="10" fill="{ROOF}" stroke="{COB}" stroke-width="4"/>'
            f'<rect x="-16" y="-34" width="32" height="16" rx="4" fill="{COB}"/><rect x="-14" y="-6" width="28" height="40" rx="3" fill="none" stroke="{GREY}" stroke-width="3"/></g>')
def parcel(x, y, s=50, rot=0):
    return (f'<g transform="translate({x},{y}) rotate({rot})"><rect x="{-s/2 + 7}" y="{-s/2 + 7}" width="{s}" height="{s}" fill="{COB_D}"/>'
            f'<rect x="{-s/2}" y="{-s/2}" width="{s}" height="{s}" fill="#F3E3C6"/><rect x="-4" y="{-s/2}" width="8" height="{s}" fill="#D9B98A"/></g>')
def voucher(x, y, rot):
    return (f'<g transform="translate({x},{y}) rotate({rot})"><rect x="-34" y="-17" width="76" height="42" rx="6" fill="{COB}"/>'
            f'<rect x="-40" y="-23" width="76" height="42" rx="6" fill="{LILAC}"/>'
            f'<line x1="-14" y1="-19" x2="-14" y2="15" stroke="{INK}" stroke-width="3" stroke-dasharray="4 5" opacity=".6"/>'
            f'<text x="12" y="6" {FONT} font-weight="900" font-size="16" fill="{INK}" text-anchor="middle">RM</text></g>')

# ---------------- hook: top-down marketplace map, the orange price lane runs through it
random.seed(27)
b = [f'<rect width="1080" height="1920" fill="{PAPER}"/>']
# the street and the price lane (right of centre: the left keeps a plaza for the headline)
b += [f'<rect x="600" y="0" width="300" height="1920" fill="{ROAD}"/>',
      f'<rect x="600" y="0" width="7" height="1920" fill="{COB}"/><rect x="893" y="0" width="7" height="1920" fill="{COB}"/>',
      f'<line x1="652" y1="0" x2="652" y2="1920" stroke="{GREY}" stroke-width="4" stroke-dasharray="34 30"/>',
      f'<line x1="848" y1="0" x2="848" y2="1920" stroke="{GREY}" stroke-width="4" stroke-dasharray="34 30"/>',
      f'<rect x="700" y="0" width="100" height="1920" fill="{ORANGE}"/>',
      f'<line x1="692" y1="0" x2="692" y2="1920" stroke="{LILAC}" stroke-width="3"/><line x1="808" y1="0" x2="808" y2="1920" stroke="{LILAC}" stroke-width="3"/>']
# a cross street low in the frame
b += [f'<rect x="0" y="1480" width="600" height="170" fill="{ROAD}"/>', f'<rect x="0" y="1480" width="600" height="6" fill="{COB}"/><rect x="0" y="1644" width="600" height="6" fill="{COB}"/>',
      f'<line x1="0" y1="1565" x2="600" y2="1565" stroke="{GREY}" stroke-width="4" stroke-dasharray="34 30"/>']
# right-hand blocks, cut by the frame edge
b += [block(950, 60, 1110, 430), hatch(980, 110, 1080, 380), block(950, 500, 1110, 980), block(950, 1050, 1110, 1420, roof=COB, side=COB_D),
      hatch(970, 1080, 1080, 1390, col=ROOF, w=3), block(950, 1490, 1110, 1960)]
# left-hand blocks below the plaza
b += [block(80, 640, 560, 1020), hatch(120, 690, 330, 820), f'<rect x="390" y="700" width="120" height="120" fill="none" stroke="{COB}" stroke-width="5"/>',
      f'<path d="M390 700 L510 820 M510 700 L390 820" stroke="{COB}" stroke-width="5"/>',
      f'<rect x="130" y="880" width="380" height="16" fill="{GREY}"/><rect x="130" y="920" width="260" height="16" fill="{GREY}"/>',
      block(80, 1090, 300, 1420), f'<rect x="120" y="1140" width="140" height="70" fill="{COB}"/>', f'<rect x="120" y="1240" width="140" height="70" fill="{COB}"/>',
      block(340, 1090, 560, 1420, roof=COB, side=COB_D), hatch(360, 1110, 540, 1400, col=ROOF, w=3),
      block(80, 1720, 560, 1960), hatch(120, 1760, 520, 1900, col=GREY)]
# trees along the kerb and the plaza edge
b += [tree(575, y) for y in range(660, 1440, 78)] + [tree(x, 580, 22) for x in range(110, 560, 70)]
# traffic: vans in the side lanes, parcels riding the price lane
b += [van(626, 260), van(626, 760, 0), van(626, 1240), van(874, 120, 180), van(874, 610, 180), van(874, 1100, 180), van(874, 1760, 180),
      van(220, 1565, 90), van(450, 1565, 90)]
b += [parcel(750, y, 52, random.choice([-6, 0, 4])) for y in (560, 760, 960, 1160, 1360, 1560, 1760)]
# vouchers raining across the plaza (already falling at frame 1)
b += [voucher(x, y, r) for x, y, r in ((120, 110, -14), (300, 80, 18), (500, 140, -8), (250, 505, 24), (430, 500, -20), (690, 330, 30), (860, 450, -12), (760, 640, 14), (560, 90, 8))]
# headline in the plaza's negative space
b += [f'<text x="70" y="250" {FONT} font-weight="700" font-size="40" letter-spacing="3" fill="{COB}">SHOPEE 11.11 BIG SALE</text>',
      f'<text x="66" y="340" {FONT} font-weight="900" font-size="80" fill="{INK}">RM11 MILLION</text>',
      f'<text x="66" y="420" {FONT} font-weight="900" font-size="80" fill="{INK}">IN VOUCHERS</text>']
open(f"{HERE}/hook.svg", "w").write(svg("".join(b)))

# ---------------- twist: flat side elevation on a horizon; the price line steps up RM40 over the ghost price
H, G, D = 1500, 800, 744             # horizon/floor, ghost top (RM500), deal top (RM540)
src = open(f"{HERE}/../vec/draw/F3.svg").read()
i = src.index('<g id="F3-vacuum">'); depth = 0
for m in re.finditer(r"<g[\s>]|</g>", src[i:]):
    depth += 1 if m.group(0).startswith("<g") else -1
    if depth == 0: vac = src[i:i + m.end()]; break
vac = vac.replace('id="F3-vacuum"', "").replace("#1B2A4E", COB_D).replace("#A89BF4", LILAC)
def cloud(x, y, s=1.0):
    return (f'<g transform="translate({x},{y}) scale({s})" fill="#D8D5CC"><rect x="0" y="40" width="360" height="56" rx="28"/>'
            f'<circle cx="110" cy="44" r="52"/><circle cx="200" cy="30" r="64"/><circle cx="280" cy="52" r="40"/></g>')
t = [f'<rect width="1080" height="1920" fill="{PAPER}"/>', cloud(-60, 560, 1.1), cloud(700, 470, 0.9)]
# far skyline on the horizon (depth)
x = 0; random.seed(5)
while x < 1080:
    w = random.choice([60, 80, 110, 140]); h = random.choice([40, 70, 100, 130])
    t.append(f'<rect x="{x}" y="{H - h}" width="{w}" height="{h}" fill="#D9D6CE"/>'); x += w + random.choice([0, 0, 12])
# floor
t += [f'<rect x="0" y="{H}" width="1080" height="{1920 - H}" fill="{COB}"/>',
      f'<rect x="0" y="{H}" width="1080" height="10" fill="{COB_D}"/>']
# deal pedestal: cast shadow, body, the RM40 slice
t += [f'<path d="M600 {H} L900 {H} L1010 {H + 110} L710 {H + 110} Z" fill="{COB_D}"/>',
      f'<rect x="600" y="{G}" width="300" height="{H - G}" fill="{ROOF}"/>',
      f'<rect x="600" y="{D}" width="300" height="{G - D}" fill="{ORANGE}"/>',
      f'<g transform="translate({750 - 395 * 0.34:.1f},{D - 1030 * 0.34:.1f}) scale(0.34)">{vac}</g>']
# ghost pedestal: the real price, dashed
t += [f'<rect x="140" y="{G}" width="300" height="{H - G}" fill="none" stroke="{COB}" stroke-width="5" stroke-dasharray="22 14"/>',
      f'<text x="290" y="{G + 210}" {FONT} font-weight="700" font-size="30" letter-spacing="3" fill="{COB}" text-anchor="middle">NORMAL PRICE</text>',
      f'<text x="290" y="{G + 290}" {FONT} font-weight="900" font-size="76" fill="{COB}" text-anchor="middle">RM500</text>',
      f'<text x="750" y="{G + 210}" {FONT} font-weight="700" font-size="30" letter-spacing="3" fill="{INK}" text-anchor="middle">AFTER 10% OFF</text>',
      f'<text x="750" y="{G + 290}" {FONT} font-weight="900" font-size="76" fill="{INK}" text-anchor="middle">RM540</text>']
# the price line: flat at RM500, steps up RM40 at the deal
t += [f'<path d="M0 {G} H560 Q580 {G} 584 {G - 20} Q588 {D} 610 {D} H1080" fill="none" stroke="{ORANGE}" stroke-width="14" stroke-linejoin="round"/>',
      f'<line x1="440" y1="{G}" x2="1080" y2="{G}" stroke="{INK}" stroke-width="3" stroke-dasharray="8 8"/>',
      f'<path d="M540 {D - 4} L540 {G + 4}" stroke="{INK}" stroke-width="3"/><path d="M530 {D - 4} H550 M530 {G + 4} H550" stroke="{INK}" stroke-width="3"/>',
      f'<text x="520" y="{G - 4}" {FONT} font-weight="900" font-size="66" fill="{ORANGE}" text-anchor="end">+RM40</text>']
# headline in the sky
t += [f'<text x="80" y="250" {FONT} font-weight="700" font-size="40" letter-spacing="3" fill="{COB}">THEN 10% OFF</text>',
      f'<text x="76" y="350" {FONT} font-weight="900" font-size="96" fill="{INK}">YOU STILL PAY</text>',
      f'<text x="76" y="452" {FONT} font-weight="900" font-size="96" fill="{ORANGE}">MORE</text>']
open(f"{HERE}/twist.svg", "w").write(svg("".join(t)))
print("hook.svg, twist.svg")

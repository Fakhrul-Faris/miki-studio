"""EX26 Style B stills (flat geometry v3, new palette): L01 hook and L04 signature.
   ~/.local/bin/uv run --with resvg-py --with pillow python styleframes/make.py"""
import os, io, math, random, base64
HERE = os.path.dirname(os.path.abspath(__file__))
CREAM, CREAM_L, GREEN, GREEN_D, INK = "#F1EADC", "#FAF5EC", "#1F5D4C", "#16463A", "#3B2A22"
AMBER, AMBER_D, CORAL, SAGE, GREYC = "#E9A23B", "#C07F22", "#E2553F", "#A9C7B6", "#D9D0C0"
FONT = 'font-family="Inter Display"'
LOGO = "data:image/png;base64," + base64.b64encode(open(f"{HERE}/starbucks_sign_crop.png", "rb").read()).decode()
GRAIN = '''<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="26"/><feColorMatrix type="saturate" values="0"/>
  <feComponentTransfer><feFuncA type="linear" slope="0.07"/></feComponentTransfer></filter>
  <clipPath id="logoc"><circle cx="300" cy="300" r="292"/></clipPath>'''
def svg(body): return f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1080 1920" width="1080" height="1920"><defs>{GRAIN}</defs>{body}<rect width="1080" height="1920" filter="url(#grain)"/></svg>'
def logo(x, y, d):
    s = d / 600
    return f'<g transform="translate({x},{y}) scale({s})"><circle cx="300" cy="300" r="300" fill="{INK}"/><image href="{LOGO}" width="600" height="600" clip-path="url(#logoc)"/></g>'
def coin(x, y, r=18):
    return (f'<circle cx="{x + 4}" cy="{y + 5}" r="{r}" fill="{AMBER_D}"/><circle cx="{x}" cy="{y}" r="{r}" fill="{AMBER}"/>'
            f'<circle cx="{x}" cy="{y}" r="{r * 0.62:.1f}" fill="none" stroke="{AMBER_D}" stroke-width="{max(2, r * 0.12):.1f}"/>')
def phone(x, y, rot, bal, w=150, h=280, dim=False, note=None):
    """an app phone lying on the table (top-down) or standing (elevation): body, header bar, balance"""
    scr = GREYC if dim else CREAM_L
    t = (f'<g transform="translate({x},{y}) rotate({rot})">'
         f'<rect x="{-w / 2 + 12}" y="{-h / 2 + 14}" width="{w}" height="{h}" rx="22" fill="{GREEN_D}" opacity=".55"/>'
         f'<rect x="{-w / 2}" y="{-h / 2}" width="{w}" height="{h}" rx="22" fill="{INK}"/>'
         f'<rect x="{-w / 2 + 9}" y="{-h / 2 + 9}" width="{w - 18}" height="{h - 18}" rx="15" fill="{scr}"/>'
         f'<rect x="{-w / 2 + 9}" y="{-h / 2 + 9}" width="{w - 18}" height="{h * 0.2:.0f}" rx="15" fill="{GREEN if not dim else "#8C9A92"}"/>'
         f'<rect x="{-w / 2 + 9}" y="{-h / 2 + 30}" width="{w - 18}" height="{h * 0.2 - 21:.0f}" fill="{GREEN if not dim else "#8C9A92"}"/>'
         f'<text x="0" y="{-h * 0.02:.0f}" {FONT} font-weight="700" font-size="{w * 0.11:.0f}" fill="{INK}" text-anchor="middle" opacity=".6">BALANCE</text>'
         f'<text x="0" y="{h * 0.14:.0f}" {FONT} font-weight="900" font-size="{w * 0.22:.0f}" fill="{INK if not dim else "#6E6458"}" text-anchor="middle">{bal}</text>')
    if note: t += f'<text x="0" y="{h * 0.33:.0f}" {FONT} font-weight="700" font-size="{w * 0.1:.0f}" fill="{CORAL}" text-anchor="middle">{note}</text>'
    return t + "</g>"

# ---------------- L01 hook: top-down table of phones, every balance streams into one Starbucks account
random.seed(3)
CX, CY = 540, 960
b = [f'<rect width="1080" height="1920" fill="{CREAM}"/>']
# table grain: faint wood boards
b += [f'<rect x="0" y="{y}" width="1080" height="3" fill="{GREYC}" opacity=".6"/>' for y in range(0, 1920, 96)]
phones = [(140, 640, -18, "$12.40"), (930, 600, 14, "$25.00"), (60, 1010, 8, "$8.75"), (1010, 1010, -10, "$40.00"),
          (170, 1420, 20, "$5.10"), (900, 1430, -16, "$18.60"), (540, 1600, 4, "$30.00"), (330, 1810, -8, "$9.90"),
          (760, 1830, 12, "$15.25"), (-20, 1700, -6, "$22.00"), (1100, 1760, 8, "$6.40")]
streams = []
for x, y, r, bal in phones:
    mx, my = (x + CX) / 2 + random.randint(-90, 90), (y + CY) / 2 + random.randint(-60, 60)
    streams.append(f'<path d="M{x} {y} Q{mx} {my} {CX} {CY}" fill="none" stroke="{AMBER}" stroke-width="6" stroke-dasharray="2 16" stroke-linecap="round"/>')
    tt = random.uniform(0.35, 0.7); qx = (1 - tt) ** 2 * x + 2 * (1 - tt) * tt * mx + tt ** 2 * CX; qy = (1 - tt) ** 2 * y + 2 * (1 - tt) * tt * my + tt ** 2 * CY
    streams.append(coin(round(qx), round(qy), 16))
b += streams + [phone(x, y, r, bal) for x, y, r, bal in phones]
# the account: Starbucks' balance of everyone's money
b += [f'<circle cx="{CX + 14}" cy="{CY + 16}" r="250" fill="{GREEN_D}" opacity=".5"/>', f'<circle cx="{CX}" cy="{CY}" r="250" fill="{GREEN}"/>',
      f'<circle cx="{CX}" cy="{CY}" r="226" fill="none" stroke="{AMBER}" stroke-width="5"/>',
      f'<text x="{CX}" y="{CY - 70}" {FONT} font-weight="700" font-size="28" letter-spacing="3" fill="{SAGE}" text-anchor="middle">CUSTOMERS\' BALANCES</text>',
      f'<text x="{CX}" y="{CY + 22}" {FONT} font-weight="900" font-size="104" fill="{AMBER}" text-anchor="middle">$1.75B</text>',
      f'<text x="{CX}" y="{CY + 82}" {FONT} font-weight="700" font-size="26" letter-spacing="3" fill="{CREAM}" text-anchor="middle">HELD BY STARBUCKS</text>']
# logo + headline
b += [logo(76, 168, 150),
      f'<text x="250" y="232" {FONT} font-weight="700" font-size="38" letter-spacing="3" fill="{GREEN}">STARBUCKS IS HOLDING</text>',
      f'<text x="250" y="280" {FONT} font-weight="700" font-size="38" letter-spacing="3" fill="{GREEN}">ITS CUSTOMERS\' MONEY</text>',
      f'<text x="72" y="420" {FONT} font-weight="900" font-size="104" fill="{INK}">US$1.75 BILLION</text>']
open(f"{HERE}/hook.svg", "w").write(svg("".join(b)))

# ---------------- L04 signature: the year 2025 as a horizon; balances that never go down; December's leftovers
TL = 1240
s = [f'<rect width="1080" height="1920" fill="{CREAM}"/>', f'<rect x="0" y="{TL}" width="1080" height="740" fill="{GREEN}"/>',
     f'<rect x="0" y="{TL}" width="1080" height="12" fill="{INK}"/>']
months = "JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split()
for i, m in enumerate(months):
    x = 60 + i * 78
    s += [f'<rect x="{x}" y="{TL}" width="4" height="{30 if i % 3 == 0 else 18}" fill="{CREAM}"/>',
          f'<text x="{x + 2}" y="{TL + 72}" {FONT} font-weight="700" font-size="22" fill="{SAGE}" text-anchor="middle">{m}</text>']
s += [f'<text x="540" y="{TL + 560}" {FONT} font-weight="900" font-size="400" fill="{GREEN_D}" text-anchor="middle" letter-spacing="-8">2025</text>']
# phones standing on the year, balances unchanged month after month
for x, bal in ((120, "$4.60"), (300, "$11.20"), (480, "$2.35"), (660, "$7.80")):
    s += [phone(x, TL - 150, 0, bal, 150, 280, dim=True, note="NOT SPENT")]
# December: the leftovers slide off into Starbucks' stack
s += [f'<path d="M150 {TL - 16} H840" stroke="{AMBER}" stroke-width="6" stroke-dasharray="2 16" stroke-linecap="round"/>']
s += [coin(x, TL - 22, 16) for x in (230, 410, 590, 760)]
stack = "".join(f'<rect x="850" y="{TL - 40 - i * 34}" width="190" height="30" rx="15" fill="{AMBER if i % 2 == 0 else "#F2B65A"}" stroke="{AMBER_D}" stroke-width="3"/>' for i in range(14))
s += [f'<rect x="866" y="{TL - 40 - 13 * 34 + 10}" width="190" height="{14 * 34}" rx="15" fill="{AMBER_D}" opacity=".35"/>', stack,
      f'<text x="945" y="{TL - 40 - 14 * 34 - 60}" {FONT} font-weight="700" font-size="24" letter-spacing="2" fill="{INK}" text-anchor="middle">EARNED BY</text>',
      f'<text x="945" y="{TL - 40 - 14 * 34 - 30}" {FONT} font-weight="700" font-size="24" letter-spacing="2" fill="{INK}" text-anchor="middle">STARBUCKS</text>',
      f'<text x="945" y="{TL - 40 - 14 * 34 + 8}" {FONT} font-weight="900" font-size="44" fill="{CORAL}" text-anchor="middle">+$222M</text>']
s += [f'<text x="72" y="240" {FONT} font-weight="700" font-size="38" letter-spacing="3" fill="{GREEN}">IN 2025, FORGOTTEN BALANCES</text>',
      f'<text x="68" y="340" {FONT} font-weight="900" font-size="86" fill="{INK}">EARNED STARBUCKS</text>',
      f'<text x="68" y="462" {FONT} font-weight="900" font-size="120" fill="{CORAL}">US$222M</text>']
open(f"{HERE}/twist.svg", "w").write(svg("".join(s)))

import resvg_py
from PIL import Image
ims = []
for n in ("hook", "twist"):
    data = resvg_py.svg_to_bytes(svg_path=f"{HERE}/{n}.svg", width=1080, font_dirs=[os.path.expanduser("~/Library/Fonts")], resources_dir=HERE)
    im = Image.open(io.BytesIO(bytes(data))).convert("RGB"); im.save(f"{HERE}/{n}.png"); ims.append(im)
pair = Image.new("RGB", (2170, 1920), "black"); pair.paste(ims[0], (0, 0)); pair.paste(ims[1], (1090, 0))
pair.resize((1085, 960)).save("/private/tmp/claude-501/-Users-user-Private-miki-studio/bf217f2b-f2a4-4094-96d7-46fe8461a02c/scratchpad/ex26pair.png")
print("ok")

"""EX27 flat-geometry kit (TomTom-reference language): palette + small SVG builders. Every shape is drawn here, nothing traced."""
import re

PAPER, ROAD, ROOF = "#E4E1D9", "#F3F1EB", "#F8F7F3"
COB, COB_D, COB_L, INK = "#2E54C6", "#21409C", "#4A6DD6", "#1C2554"
ORANGE, LILAC, GREY, CLOUD = "#F05A28", "#A79BF2", "#D3D0C7", "#D8D5CC"
FONT = 'font-family="Inter Display"'


def block(x0, y0, x1, y1, d=26, roof=ROOF, side=COB):
    """top-down building: roof + a 45° extrusion falling down-left"""
    return (f'<path d="M{x0} {y0} L{x0 - d} {y0 + d} L{x0 - d} {y1 + d} L{x1 - d} {y1 + d} L{x1} {y1} L{x0} {y1} Z" fill="{side}"/>'
            f'<rect x="{x0}" y="{y0}" width="{x1 - x0}" height="{y1 - y0}" fill="{roof}"/>')


def hatch(x0, y0, x1, y1, col=COB, gap=18, w=4):
    cid = f"h{x0}_{y0}_{x1}"
    lines = "".join(f'<line x1="{x}" y1="{y1}" x2="{x + (y1 - y0)}" y2="{y0}"/>' for x in range(x0 - (y1 - y0), x1, gap))
    return (f'<clipPath id="{cid}"><rect x="{x0}" y="{y0}" width="{x1 - x0}" height="{y1 - y0}"/></clipPath>'
            f'<g clip-path="url(#{cid})" stroke="{col}" stroke-width="{w}">{lines}</g>')


def tree(x, y, r=26, top=LILAC, shade=COB):
    return f'<circle cx="{x + 9}" cy="{y + 9}" r="{r}" fill="{shade}"/><circle cx="{x}" cy="{y}" r="{r}" fill="{top}"/>'


def van(x, y, rot=0, cls=""):
    return (f'<g class="{cls}" transform="translate({x},{y}) rotate({rot})"><g><rect x="-22" y="-44" width="44" height="88" rx="10" fill="{ROOF}" stroke="{COB}" stroke-width="4"/>'
            f'<rect x="-16" y="-34" width="32" height="16" rx="4" fill="{COB}"/><rect x="-14" y="-6" width="28" height="40" rx="3" fill="none" stroke="{GREY}" stroke-width="3"/></g></g>')


def parcel(x, y, s=50, rot=0):
    return (f'<g transform="translate({x},{y}) rotate({rot})"><rect x="{-s / 2 + 7}" y="{-s / 2 + 7}" width="{s}" height="{s}" fill="{COB_D}"/>'
            f'<rect x="{-s / 2}" y="{-s / 2}" width="{s}" height="{s}" fill="#F3E3C6"/><rect x="-4" y="{-s / 2}" width="8" height="{s}" fill="#D9B98A"/></g>')


def voucher(scale=1.0):
    """a voucher drawn around (0,0); place it with a wrapper transform"""
    return (f'<g transform="scale({scale})"><rect x="-34" y="-17" width="76" height="42" rx="6" fill="{COB}"/>'
            f'<rect x="-40" y="-23" width="76" height="42" rx="6" fill="{LILAC}"/>'
            f'<line x1="-14" y1="-19" x2="-14" y2="15" stroke="{INK}" stroke-width="3" stroke-dasharray="4 5" opacity=".6"/>'
            f'<text x="12" y="6" {FONT} font-weight="900" font-size="16" fill="{INK}" text-anchor="middle">RM</text></g>')


def cloud(x, y, s=1.0, col=CLOUD):
    return (f'<g transform="translate({x},{y}) scale({s})" fill="{col}"><rect x="0" y="40" width="360" height="56" rx="28"/>'
            f'<circle cx="110" cy="44" r="52"/><circle cx="200" cy="30" r="64"/><circle cx="280" cy="52" r="40"/></g>')


def house(x, y, s=1.0):
    """top-down small house: roof square with a ridge line"""
    return (f'<g transform="translate({x},{y}) scale({s})"><rect x="-30" y="-24" width="66" height="54" fill="{COB_D}"/>'
            f'<rect x="-36" y="-30" width="66" height="54" fill="{ROOF}"/><path d="M-36 -3 H30" stroke="{COB}" stroke-width="5"/></g>')


def vacuum(scale, foot_x, foot_y, recolour=True):
    """the hand-drawn vacuum from vec/draw/F3.svg, foot centred at (foot_x, foot_y)"""
    import os
    src = open(os.path.join(os.path.dirname(__file__), "../vec/draw/F3.svg")).read()
    i = src.index('<g id="F3-vacuum">'); depth = 0
    for m in re.finditer(r"<g[\s>]|</g>", src[i:]):
        depth += 1 if m.group(0).startswith("<g") else -1
        if depth == 0: v = src[i:i + m.end()]; break
    v = v.replace('id="F3-vacuum"', "")
    if recolour: v = v.replace("#1B2A4E", COB_D).replace("#A89BF4", LILAC)
    return f'<g transform="translate({foot_x - 395 * scale:.1f},{foot_y - 1030 * scale:.1f}) scale({scale})">{v}</g>'

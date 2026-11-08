#!/usr/bin/env python3
"""EX27 v3 — flat-geometry build (the TomTom reference: a new viewpoint per beat, one through-line, shape wipes).
   ~/.local/bin/uv run --with pillow python build/hf_v3.py   (from the episode folder; Pillow measures headline widths)  ->  hf/index.html + hf/compositions/*.html
The through-line is the orange PRICE LINE: a lane on the map, the price level on the shelf, the route the law blocks,
the road to the horizon. Times come from audio/vo_timeline.json (hf_build.t); captions + grain from hf_build.overlays()."""
import os, sys, random
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import hf_build as h
from flatkit import *

t, W_, HF, END = h.t, h.W_, h.HF, h.END

# ---- scene slots (start, duration): each hands over to the next by a shape, not a cut
S1 = (0.0, 8.50)                     # top-down marketplace map; ends by diving into the lane
S2 = (8.40, 22.10 - 8.40)            # flat elevation: RM500 -> 11.11 raise -> RM540 twist; ends by tilting down to the floor
S3 = (21.95, 29.95 - 21.95)          # top-down route map: the law blocks the route
S4 = (29.00, round(END - 29.00, 3))  # one-point horizon: the price history as hills; the sun becomes the logo

CSS = f"""
    #root {{ position: absolute; inset: 0; overflow: hidden; }}
    #SID-w {{ position: absolute; inset: 0; overflow: hidden; }}
    #SID-w svg.art {{ position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }}
    #SID-w .head {{ position: absolute; left: 76px; width: 940px; font-family: "Inter Display"; line-height: 1.04; }}
    #SID-w .kick {{ font-weight: 700; font-size: 40px; letter-spacing: 3px; }}
    #SID-w .big {{ font-weight: 900; font-size: 96px; letter-spacing: -0.5px; }}
    #SID-w .m {{ display: inline-block; overflow: hidden; vertical-align: top; padding: 0 0.03em 0.08em; margin-bottom: -0.08em; }}
    #SID-w .m > span {{ display: inline-block; }}
    #SID-w .stripe {{ position: absolute; z-index: 5; }}
"""

def scene(sid, slot, body, js, css=""):
    return f"""<template>
  <style>
    {h.FONTS}
    {CSS.replace("SID", sid)}
    {css}
  </style>
  <div id="root" data-composition-id="{sid}" data-width="1080" data-height="1920" data-layout-allow-overflow data-layout-allow-overlap>
    <div id="{sid}-w">
{body}
    </div>
  </div>
  <script>
    (() => {{
{h.PRELUDE}
      const T0 = {slot[0]};
      gsap.set("#{sid}-w .w", {{ yPercent: 115 }});
      gsap.set("#{sid}-w .stripe", {{ scaleX: 0 }});
      // headline swap: coloured stripes sweep in from the left over the old lines, the lines change under them,
      // and the stripes leave to the right revealing the new first line
      function wipe(at, outSel, inSel, key) {{
        const st = gsap.utils.toArray("#{sid}-w .st-" + key);
        tl.fromTo(st, {{ scaleX: 0, transformOrigin: "0% 50%" }}, {{ scaleX: 1, duration: 0.26, ease: "power2.in", stagger: 0.05 }}, at);
        tl.set(outSel, {{ yPercent: 115 }}, at + 0.37);
        if (inSel) tl.set(inSel, {{ yPercent: 0, scaleX: 1 }}, at + 0.37);
        tl.fromTo(st, {{ scaleX: 1, transformOrigin: "100% 50%" }}, {{ scaleX: 0, duration: 0.34, ease: "power2.out", stagger: 0.05, immediateRender: false }}, at + 0.37);
      }}
{js}
      window.__timelines["{sid}"] = tl;
    }})();
  </script>
</template>
"""

def text_w(text, weight, size, spacing=0):
    """real rendered width of a headline line (Inter Display), so wipe stripes fit their words"""
    from PIL import ImageFont
    f = ImageFont.truetype(os.path.expanduser(f"~/Library/Fonts/InterDisplay-{dict(bold='Bold', black='Black')[weight]}.ttf"), size)
    return f.getlength(text) + spacing * len(text)


def stripes(key, col, old, new, top=190):
    """one stripe per headline row, each as wide as the longer of the old/new line on that row.
    old/new: [(kind, text, size)], kind 'k' (kicker, bold 40 +3 tracking) or 'b' (big, black)"""
    def rows(lines):
        out, y = [], top
        for kind, text, size in lines:
            hgt = size * 1.04 + size * 0.08
            w = text_w(text, "bold", size, 3) if kind == "k" else text_w(text, "black", size, -0.5)
            out.append((y, hgt, w)); y += hgt - size * 0.08
        return out
    ro, rn = rows(old), rows(new); html = []
    for i in range(max(len(ro), len(rn))):
        y, hgt, w = (ro + rn)[i] if i < len(ro) else rn[i]
        w = max(ro[i][2] if i < len(ro) else 0, rn[i][2] if i < len(rn) else 0)
        html.append(f'<div class="stripe st-{key}" style="left:62px; top:{y - 2:.0f}px; height:{hgt + 2:.0f}px; width:{w + 28:.0f}px; background:{col};"></div>')
    return "".join(html)


def wave(cid, amp=38, lam=540, col=COB, back=COB_D):
    """a rising sea: two sine-topped bands (back one darker, offset), each two wavelengths wider than the frame"""
    def band(phase, fill, dy):
        pts = " ".join(f"L{x} {dy + amp * __import__('math').sin(2 * 3.14159 * (x / lam) + phase):.1f}" for x in range(-lam, 1080 + 2 * lam + 1, 20))
        return f'<path d="M{-lam} 2700 {pts} L{1080 + 2 * lam} 2700 Z" fill="{fill}"/>'
    return f'<g id="{cid}"><g id="{cid}-b">{band(1.3, back, -70)}</g><g id="{cid}-f">{band(0, col, 0)}</g></g>'


def lt(slot, x): return round(x - slot[0], 3)
def kick(text, cls, col): return f'<div class="kick" style="color:{col}">{W_(text, "w " + cls)}</div>'
def big(text, cls, col, size=96): return f'<div class="big" style="color:{col}; font-size:{size}px">{W_(text, "w " + cls)}</div>'


def s1():
    L = lambda x: lt(S1, x)
    random.seed(27)
    T = L(t("L02", "here"))                 # the hand-off word
    pieces = []                             # (side, svg, centre_x, centre_y): every piece leaves on its own
    def P(side, svg, cx, cy): pieces.append((side, svg, cx, cy))
    # the street, split in two halves that part like doors; the lane stays (it becomes the next scene's price line)
    P("L", f'<rect x="600" y="-200" width="100" height="3400" fill="{ROAD}"/><rect x="600" y="-200" width="7" height="3400" fill="{COB}"/>'
           f'<line x1="652" y1="-200" x2="652" y2="3200" stroke="{GREY}" stroke-width="4" stroke-dasharray="34 30"/>'
           f'<line x1="692" y1="-200" x2="692" y2="3200" stroke="{LILAC}" stroke-width="3"/>', 650, 1500)
    P("R", f'<rect x="800" y="-200" width="100" height="3400" fill="{ROAD}"/><rect x="893" y="-200" width="7" height="3400" fill="{COB}"/>'
           f'<line x1="848" y1="-200" x2="848" y2="3200" stroke="{GREY}" stroke-width="4" stroke-dasharray="34 30"/>'
           f'<line x1="808" y1="-200" x2="808" y2="3200" stroke="{LILAC}" stroke-width="3"/>', 850, 1500)
    for y in (2180, 2900):
        P("L", f'<rect x="-200" y="{y}" width="800" height="170" fill="{ROAD}"/><rect x="-200" y="{y}" width="800" height="6" fill="{COB}"/>'
               f'<rect x="-200" y="{y + 164}" width="800" height="6" fill="{COB}"/>'
               f'<line x1="-200" y1="{y + 85}" x2="600" y2="{y + 85}" stroke="{GREY}" stroke-width="4" stroke-dasharray="34 30"/>', 200, y + 85)
    for y0, y1, dark in ((-100, 430, 0), (500, 980, 0), (1050, 1420, 1), (1490, 1960, 0), (2030, 2480, 0), (2550, 3000, 1), (3070, 3300, 0)):
        P("R", block(950, y0, 1110, y1, roof=COB if dark else ROOF, side=COB_D if dark else COB)
               + hatch(975, y0 + 40, 1080, y1 - 40, col=ROOF if dark else COB, w=3 if dark else 4), 1010, (y0 + y1) / 2)
    P("L", block(80, 640, 560, 1020) + hatch(120, 690, 330, 820) + f'<rect x="390" y="700" width="120" height="120" fill="none" stroke="{COB}" stroke-width="5"/>'
           f'<path d="M390 700 L510 820 M510 700 L390 820" stroke="{COB}" stroke-width="5"/>'
           f'<rect x="130" y="880" width="380" height="16" fill="{GREY}"/><rect x="130" y="920" width="260" height="16" fill="{GREY}"/>', 320, 830)
    P("L", block(80, 1760, 300, 2120) + f'<rect x="120" y="1810" width="140" height="70" fill="{COB}"/><rect x="120" y="1910" width="140" height="70" fill="{COB}"/>', 190, 1940)
    P("L", block(340, 1760, 560, 2120, roof=COB, side=COB_D) + hatch(360, 1780, 540, 2100, col=ROOF, w=3), 450, 1940)
    P("L", block(80, 2420, 560, 2840) + hatch(120, 2460, 520, 2600, col=GREY) + f'<rect x="130" y="2660" width="200" height="120" fill="{COB}"/>', 320, 2630)
    P("L", block(80, 3110, 560, 3300), 320, 3200)
    for y in list(range(660, 1020, 78)) + list(range(1780, 2140, 78)): P("L", tree(575, y), 575, y)
    for yy in (1060, 1720):
        for x in range(110, 560, 70): P("L", tree(x, yy, 22), x, yy)
    for y in (260, 760, 1240, 1900, 2600): P("L", van(626, y, 0, "vu"), 626, y)
    for y in (120, 610, 1100, 1760, 2350, 2900): P("R", van(874, y, 180, "vd"), 874, y)
    for x in (120, 380): P("L", van(x, 2265, 90, "vx"), x, 2265)
    # exit choreography: outer pieces go first, the street halves last; pieces nearer the top lead (a diagonal sweep);
    # trees and vans travel further than buildings (they are "closer" — parallax)
    SCROLL = 1080; out = []
    for side, svg, cx, cy in pieces:
        dist = abs(cx - 750); sy = cy - SCROLL
        d = round(max(0.0, 0.34 - dist / 1600) + max(0.0, min(1.0, sy / 1920)) * 0.16, 3)
        far = 1.35 if ("circle" in svg or "rotate(" in svg) else 1.0
        dx = round((-1 if side == "L" else 1) * (1150 + 200 * random.random()) * far)
        out.append(f'<g class="pc" data-d="{d}" data-x="{dx}">{svg}</g>')
    parcels = "".join(f'<g class="pk" data-r="{(1 if k % 2 else -1) * random.randint(120, 260)}" data-x="{(1 if k % 2 else -1) * random.randint(700, 1000)}" data-y="{random.randint(-160, 160)}">'
                      f'{parcel(750, y, 52, random.choice([-6, 0, 4]))}</g>' for k, y in enumerate(range(160, 3200, 200)))
    rain = "".join(f'<g class="rv" id="s1-v{i}"><g>{voucher(1.15)}</g></g>' for i in range(12))
    body = f"""      <div id="s1-cam" style="position:absolute; inset:0;">
        <div id="s1-map" style="position:absolute; left:0; top:0; width:1080px; height:3200px;">
          <svg class="art" viewBox="0 0 1080 1920"><rect x="-200" y="-200" width="1480" height="3600" fill="{PAPER}"/>
            <rect id="s1-lane" x="700" y="-200" width="100" height="3400" fill="{ORANGE}"/>{''.join(out)}<g id="s1-parcels">{parcels}</g></svg>
          <img id="s1-logo" src="assets/shopee.svg" style="position:absolute; left:70px; top:190px; width:340px;">
          <div class="head" style="top:330px;">{kick("SHOPEE 11.11 BIG SALE", "a1", COB)}{big("RM11 MILLION", "a2", INK, 84)}{big("IN VOUCHERS", "a3", INK, 84)}</div>
          <div class="head" id="s1-hb" style="top:1290px;">{kick("BUT SOME SELLERS'", "b1", COB)}{big("10% OFF", "b2", INK, 84)}{big("COSTS MORE", "b3", ORANGE, 84)}</div>
        </div>
        <svg class="art" viewBox="0 0 1080 1920" id="s1-rain">{rain}<rect id="s1-lane2" x="700" y="-60" width="100" height="2040" fill="{ORANGE}" opacity="0"/></svg>
      </div>"""
    rain_js = "\n".join(
        f'tl.fromTo("#s1-v{i}", {{ x: {x}, y: -140, rotation: {r0} }}, {{ x: {x + dx}, y: 2100, rotation: {r0 + dr}, duration: {dur}, ease: "power1.in" }}, {L(t("L01", "million")) - 0.3 + 0.13 * i:.3f});'
        for i, (x, dx, r0, dr, dur) in enumerate(
            [(random.randint(60, 560), random.randint(-80, 120), random.randint(-30, 30), random.choice([-1, 1]) * random.randint(60, 160), round(random.uniform(2.4, 3.2), 2)) for _ in range(12)]))
    js = f"""
// the camera travels down the lane: a slow creep while the first headline reads, then it gathers speed and settles
CustomEase.create("scroll", "M0,0 C0.4,0.03 0.55,0.08 0.62,0.2 0.72,0.4 0.82,1 1,1");
tl.fromTo("#s1-map", {{ y: 0 }}, {{ y: -{SCROLL}, duration: {T - 0.95:.3f}, ease: "scroll" }}, 0);
tl.fromTo("#s1-parcels", {{ y: 0 }}, {{ y: 520, duration: {T - 0.95:.3f}, ease: "sine.inOut" }}, 0);
tl.fromTo("#s1-w .vu > g", {{ y: 0 }}, {{ y: -380, duration: 8.4, ease: "sine.inOut" }}, 0);
tl.fromTo("#s1-w .vd > g", {{ y: 0 }}, {{ y: -300, duration: 8.4, ease: "sine.inOut" }}, 0);
tl.fromTo("#s1-w .vx > g", {{ y: 0 }}, {{ y: -260, duration: 8.4, ease: "sine.inOut" }}, 0);
gsap.set("#s1-rain .rv", {{ y: -200 }});
{rain_js}
// the brand is on screen from frame 1 (most viewers watch muted): the real Shopee logo lands before any caption
tl.fromTo("#s1-logo", {{ opacity: 0, y: 24, scale: 0.92 }}, {{ opacity: 1, y: 0, scale: 1, duration: 0.6, ease: spring(0.6), transformOrigin: "0% 50%" }}, 0.0);
rise("#s1-w .a1", {L(t("L01", "shopee"))}, 0.12);
rise("#s1-w .a2", {L(t("L01", "11", 1))}, 0.12);
rise("#s1-w .a3", {L(t("L01", "in"))}, 0.12);
rise("#s1-w .b1", {L(t("L01", "some"))}, 0.08);
rise("#s1-w .b2", {L(t("L01", "10"))}, 0.25);
rise("#s1-w .b3", {L(t("L01", "costs"))}, 0.3);
// HAND-OFF 1 · the city breaks apart away from the lane: outer pieces first, the street halves last, parcels tumble out;
// the lane is left alone, thins to a line and swings flat — the next scene's price line, at the same height.
const T = {T};
const pcs = gsap.utils.toArray("#s1-w .pc");
tl.fromTo(pcs, {{ x: 0 }}, {{ x: (i, el) => +el.dataset.x, duration: 0.55, ease: "power2.in", stagger: (i, el) => +el.dataset.d }}, T - 1.0);
tl.fromTo("#s1-hb", {{ x: 0 }}, {{ x: -1200, duration: 0.55, ease: "power2.in" }}, T - 0.98);
tl.fromTo(gsap.utils.toArray("#s1-w .pk"), {{ x: 0, y: 0, rotation: 0 }}, {{ x: (i, el) => +el.dataset.x, y: (i, el) => +el.dataset.y, rotation: (i, el) => +el.dataset.r,
  transformOrigin: "50% 50%", duration: 0.5, ease: "power2.in", stagger: {{ each: 0.018, from: "center" }} }}, T - 1.0);
tl.set("#s1-lane2", {{ opacity: 1 }}, T - 0.45);
tl.set("#s1-lane", {{ opacity: 0 }}, T - 0.45);
gsap.set("#s1-lane2", {{ svgOrigin: "750 800" }});
tl.fromTo("#s1-lane2", {{ scaleX: 1, rotation: 0 }}, {{ scaleX: 0.14, rotation: -90, duration: 0.42, ease: "io" }}, T - 0.45);
"""
    return scene("s1", S1, body, js)


def s2():
    L = lambda x: lt(S2, x)
    H = 1500; P5, P6, P54 = H - 700, H - 840, H - 756          # 1.4 px per ringgit: RM500 / RM600 / RM540 tops
    random.seed(5); sky = []; x = -400
    while x < 1500:
        w = random.choice([60, 80, 110, 140]); hh = random.choice([40, 70, 100, 130])
        sky.append(f'<rect x="{x}" y="{H - hh}" width="{w}" height="{hh}" fill="#D9D6CE"/>'); x += w + random.choice([0, 0, 12])
    tile = (f'<g id="s2-tile"><line x1="800" y1="-400" x2="800" y2="190" stroke="{INK}" stroke-width="3"/><line x1="920" y1="-400" x2="920" y2="190" stroke="{INK}" stroke-width="3"/>'
            f'<rect x="770" y="190" width="200" height="230" rx="14" fill="{ROOF}" stroke="{COB}" stroke-width="5"/><rect x="770" y="190" width="200" height="62" rx="14" fill="{COB}"/>'
            f'<rect x="770" y="230" width="200" height="22" fill="{COB}"/>'
            f'<text x="870" y="236" {FONT} font-weight="700" font-size="34" letter-spacing="4" fill="{ROOF}" text-anchor="middle">NOV</text>'
            f'<text x="870" y="360" {FONT} font-weight="900" font-size="78" fill="{INK}" text-anchor="middle">11.11</text></g>')
    world = f"""<g id="s2-world">
          <rect x="-600" y="-900" width="2400" height="{H + 900}" fill="{PAPER}"/>
          <g id="s2-clouds"><g data-x="-700">{cloud(-80, 520, 1.1)}</g><g data-x="700">{cloud(760, 430, 0.9)}</g><g data-x="-600">{cloud(260, 120, 0.7)}</g></g><g id="s2-sky">{''.join(sky)}</g>
          <g id="s2-floor"><rect x="-600" y="{H}" width="2400" height="3000" fill="{COB}"/><rect x="-600" y="{H}" width="2400" height="10" fill="{COB_D}"/></g>
          {tile}
          <rect id="s2-ghost" x="-70" y="{P5}" width="300" height="700" fill="none" stroke="{COB}" stroke-width="5" stroke-dasharray="22 14"/>
          <text class="gl" x="80" y="{P5 + 230}" {FONT} font-weight="700" font-size="30" letter-spacing="3" fill="{COB}" text-anchor="middle">NORMAL PRICE</text>
          <text class="gl" x="80" y="{P5 + 312}" {FONT} font-weight="900" font-size="76" fill="{COB}" text-anchor="middle">RM500</text>
          <g id="s2-ped">
            <path id="s2-pshadow" d="M390 {H} L690 {H} L800 {H + 110} L500 {H + 110} Z" fill="{COB_D}"/>
            <rect id="s2-base" x="390" y="{P5}" width="300" height="700" fill="{ROOF}"/>
            <g id="s2-extra"><rect x="390" y="{P6}" width="300" height="140" fill="{ROOF}"/><rect id="s2-red" x="390" y="{P6}" width="300" height="140" fill="{ORANGE}" opacity="0"/>
              <line x1="390" y1="{P5}" x2="690" y2="{P5}" stroke="{GREY}" stroke-width="4"/></g>
            <text class="pk1" x="540" y="{P5 + 230}" {FONT} font-weight="700" font-size="30" letter-spacing="3" fill="{INK}" text-anchor="middle">USUALLY</text>
            <text class="pk2" x="540" y="{P5 + 230}" {FONT} font-weight="700" font-size="30" letter-spacing="3" fill="{INK}" text-anchor="middle" opacity="0">AFTER 10% OFF</text>
            <text id="s2-n" x="540" y="{P5 + 312}" {FONT} font-weight="900" font-size="76" fill="{INK}" text-anchor="middle">RM0</text>
            <g id="s2-vac">{vacuum(0.34, 540, P5)}</g>
            <g id="s2-deal"><rect x="-80" y="-34" width="160" height="68" rx="34" fill="{LILAC}"/><text x="0" y="13" {FONT} font-weight="900" font-size="36" fill="{INK}" text-anchor="middle">DEAL!</text></g>
          </g>
          <path id="s2-line" d="M-600 {P5} H364 V{P5} H1700" fill="none" stroke="{ORANGE}" stroke-width="14" stroke-linejoin="round"/>
          <g id="s2-measure" opacity="0"><line x1="230" y1="{P5}" x2="1300" y2="{P5}" stroke="{INK}" stroke-width="3" stroke-dasharray="8 8"/>
            <path d="M330 {P54 - 4} V{P5 + 4} M320 {P54 - 4} H340 M320 {P5 + 4} H340" stroke="{INK}" stroke-width="3"/>
            <text x="310" y="{P5 - 8}" {FONT} font-weight="900" font-size="66" fill="{ORANGE}" text-anchor="end">+RM40</text></g>
        </g>"""
    body = f"""      <svg class="art" viewBox="0 0 1080 1920"><g id="s2-cam"><g id="s2-drift">{world}</g></g>
        {wave("s2-wave")}</svg>
      {stripes("ab", ORANGE, [("k", "HERE'S HOW", 40)], [("k", "RIGHT BEFORE 11.11", 40)])}
      {stripes("bc", ORANGE, [("k", "RIGHT BEFORE 11.11", 40), ("b", "THE SELLER", 96), ("b", "LIFTS IT", 96)], [("k", "THEN 10% OFF", 40)])}
      <div class="head" style="top:190px;">{kick("HERE'S HOW", "a1", COB)}</div>
      <div class="head" style="top:190px;">{kick("RIGHT BEFORE 11.11", "b1", COB)}{big("THE SELLER", "b2", INK)}{big("LIFTS IT", "b3", INK)}</div>
      <div class="head" style="top:190px;">{kick("THEN 10% OFF", "c1", COB)}{big("YOU PAY", "c2", INK)}{big("RM540", "c3", INK, 120)}</div>"""
    lift, off, pay = L(t("L02", "lifts")), L(t("L03", "10")), L(t("L03", "pay"))
    js = f"""
const P5 = {P5}, P6 = {P6}, P54 = {P54};
// hand-off: the lane that filled the frame collapses into the price line (RM500 level)
// HAND-OFF 1 (arrival) · the price line is already here (it was the lane); the world assembles around it:
// the floor rises into place, the skyline grows up from the horizon, the clouds drift in from both sides
tl.fromTo("#s2-floor", {{ y: 760 }}, {{ y: 0, duration: 0.9, ease: "io" }}, 0.0);
tl.fromTo("#s2-sky rect", {{ scaleY: 0, transformOrigin: "50% 100%" }}, {{ scaleY: 1, duration: 0.7, ease: spring(0.7), stagger: {{ each: 0.018, from: "center" }} }}, 0.2);
tl.fromTo(gsap.utils.toArray("#s2-clouds > g"), {{ x: (i, el) => +el.dataset.x }}, {{ x: 0, duration: 1.1, ease: "power3.out", stagger: 0.08 }}, 0.05);
gsap.set("#s2-wave", {{ y: 2200 }});
// slow organic camera breathing on top of the moves
drift([["#s2-drift", 0.7]], {S2[1]}, T0);
gsap.set("#s2-cam", {{ svgOrigin: "750 {P54}" }});
gsap.set("#s2-base", {{ svgOrigin: "540 {H}" }});
gsap.set("#s2-tile", {{ svgOrigin: "860 -400" }});
// the shelf rises to meet the price line; the vacuum drops onto it
gsap.set("#s2-extra", {{ scaleY: 0, svgOrigin: "540 {P5}" }});
tl.fromTo("#s2-base", {{ scaleY: 0 }}, {{ scaleY: 1, duration: 0.9, ease: spring(0.9) }}, {L(t("L02", "vacuum")) - 0.15});
tl.fromTo("#s2-pshadow", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.5, ease: "io" }}, {L(t("L02", "vacuum"))});
tl.fromTo("#s2-vac", {{ y: -520, opacity: 0 }}, {{ y: 0, opacity: 1, duration: 0.8, ease: spring(0.8) }}, {L(t("L02", "usually")) - 0.1});
tl.fromTo("#s2-w .pk1", {{ opacity: 0, y: 10 }}, {{ opacity: 1, y: 0, duration: 0.4, ease: "io" }}, {L(t("L02", "usually"))});
tl.fromTo("#s2-n", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.2, ease: "io" }}, {L(t("L02", "500")) - 0.15});
gsap.set("#s2-n", {{ transformOrigin: "50% 50%" }});
count("#s2-n", 0, 500, {L(t("L02", "500")) - 0.1});
rise("#s2-w .a1", {L(t("L02", "here"))});
// 11.11: the camera tilts up into the sky; the calendar tile swings down on its strings
tl.fromTo("#s2-cam", {{ y: 0 }}, {{ y: 170, duration: 0.8, ease: "io" }}, {L(t("L02", "right")) - 0.1});
tl.fromTo("#s2-tile", {{ y: -620, rotation: -24 }}, {{ y: 0, rotation: 0, duration: 1.1, ease: spring(1.1) }}, {L(t("L02", "before")) - 0.1});
wipe({L(t("L02", "right")) - 0.37}, "#s2-w .a1", "#s2-w .b1", "ab");
rise("#s2-w .b2", {L(t("L02", "seller")) - 0.1}, 0.1);
rise("#s2-w .b3", {lift}, 0.12);
// the raise: a block grows under the vacuum, the price line rides up with it
tl.fromTo("#s2-extra", {{ scaleY: 0 }}, {{ scaleY: 1, duration: 0.8, ease: spring(0.8), immediateRender: false }}, {lift});
tl.fromTo("#s2-vac", {{ y: 0 }}, {{ y: -140, duration: 0.8, ease: spring(0.8), immediateRender: false }}, {lift + 0.08});
tl.fromTo("#s2-line", {{ attr: {{ d: "M-600 {P5} H364 V{P5} H1700" }} }}, {{ attr: {{ d: "M-600 {P6} H364 V{P6} H1700" }}, duration: 0.8, ease: spring(0.8), immediateRender: false }}, {lift + 0.04});
count("#s2-n", 500, 600, {L(t("L02", "600")) - 0.2});
tl.fromTo("#s2-tile", {{ y: 0 }}, {{ y: -700, duration: 0.6, ease: "io", immediateRender: false }}, {L(t("L03", "then")) - 0.6});
tl.fromTo("#s2-cam", {{ y: 170 }}, {{ y: 0, duration: 0.8, ease: "io", immediateRender: false }}, {L(t("L03", "then")) - 0.6});
// the twist: the camera trucks left to reveal the real price; the line drops back to RM500 on the left...
tl.fromTo("#s2-world", {{ x: 0 }}, {{ x: 210, duration: 0.9, ease: "io" }}, {L(t("L03", "then"))});
tl.fromTo("#s2-ghost", {{ opacity: 0, strokeDashoffset: 216 }}, {{ opacity: 1, strokeDashoffset: 0, duration: 1.0, ease: "io" }}, {L(t("L03", "then")) + 0.2});
tl.fromTo("#s2-w .gl", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.5, ease: "io" }}, {L(t("L03", "then")) + 0.5});
tl.fromTo("#s2-line", {{ attr: {{ d: "M-600 {P6} H364 V{P6} H1700" }} }}, {{ attr: {{ d: "M-600 {P5} H364 V{P6} H1700" }}, duration: 0.5, ease: "io", immediateRender: false }}, {L(t("L03", "then")) + 0.15});
// ...and 10% off brings the deal down to RM540: still RM40 above it, now orange
tl.fromTo("#s2-extra", {{ scaleY: 1 }}, {{ scaleY: 0.4, duration: 0.7, ease: "io", immediateRender: false }}, {off + 0.1});
tl.fromTo("#s2-vac", {{ y: -140 }}, {{ y: -56, duration: 0.7, ease: "io", immediateRender: false }}, {off + 0.12});
tl.fromTo("#s2-line", {{ attr: {{ d: "M-600 {P5} H364 V{P6} H1700" }} }}, {{ attr: {{ d: "M-600 {P5} H364 V{P54} H1700" }}, duration: 0.7, ease: "io", immediateRender: false }}, {off + 0.1});
tl.fromTo("#s2-red", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.4, ease: "io" }}, {off + 0.6});
tl.fromTo("#s2-w .pk1", {{ opacity: 1 }}, {{ opacity: 0, duration: 0.3, ease: "io", immediateRender: false }}, {off});
tl.fromTo("#s2-w .pk2", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.4, ease: "io" }}, {off + 0.3});
count("#s2-n", 600, 540, {off + 0.1}, 0.7);
wipe({L(t("L03", "then")) - 0.1}, "#s2-w .b1, #s2-w .b2, #s2-w .b3", "#s2-w .c1", "bc");
rise("#s2-w .c2", {pay - 0.1}, 0.1);
rise("#s2-w .c3", {L(t("L03", "540"))});
tl.fromTo("#s2-measure", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.5, ease: "io" }}, {pay + 0.3});
tl.fromTo("#s2-measure text", {{ scale: 1.2, transformOrigin: "100% 100%" }}, {{ scale: 1, duration: 0.6, ease: spring(0.6) }}, {pay + 0.3});
// push in on the slice; then "still feels like a deal": a sticker slaps onto the shelf
tl.fromTo("#s2-cam", {{ scale: 1 }}, {{ scale: 1.1, duration: 1.6, ease: "io", immediateRender: false }}, {pay});
tl.fromTo("#s2-deal", {{ x: 540, y: {P5 + 470}, scale: 0, rotation: -30 }}, {{ x: 540, y: {P5 + 470}, scale: 1, rotation: -8, duration: 0.6, ease: spring(0.6) }}, {L(t("L03", "feels"))});
// hand-off: tilt down to the floor (the next map's ground)
// HAND-OFF 2 · the blue floor rises as a sea with a moving crest (back band darker and ahead); the shelf world sinks a
// little as it goes under — the next scene is drawn on that water
sink("#s2-w .c1, #s2-w .c2, #s2-w .c3", {L(t("L04", "in")) - 1.05}, 0.03);
const wv = {L(t("L04", "in")) - 0.88};
tl.fromTo("#s2-wave", {{ y: 2200 }}, {{ y: -470, duration: 0.85, ease: "power2.inOut" }}, wv);
tl.fromTo("#s2-wave-f", {{ x: 0 }}, {{ x: -540, duration: 0.85, ease: "sine.inOut" }}, wv);
tl.fromTo("#s2-wave-b", {{ x: -540 }}, {{ x: 0, duration: 0.85, ease: "sine.inOut" }}, wv);
tl.fromTo("#s2-world", {{ y: 0 }}, {{ y: -260, duration: 0.85, ease: "power2.in", immediateRender: false }}, wv);
"""
    return scene("s2", S2, body, js)


def s3():
    L = lambda x: lt(S3, x)
    random.seed(12); g = [f'<rect x="-300" y="-300" width="1680" height="2520" fill="{COB}"/>']
    # the abstract city: dark blocks, outlined lots, hatching, lilac squares, a grid of thin streets
    for x in range(-120, 1200, 150):
        g.append(f'<line x1="{x}" y1="-300" x2="{x}" y2="2220" stroke="{COB_L}" stroke-width="3"/>')
    for y in range(-120, 2200, 150):
        g.append(f'<line x1="-300" y1="{y}" x2="1380" y2="{y}" stroke="{COB_L}" stroke-width="3"/>')
    lots = []
    for gy in range(-120, 2200, 150):
        for gx in range(-120, 1200, 150):
            k = random.random(); x0, y0 = gx + 14, gy + 14
            if 500 < gy < 1300 and 150 < gx < 950: continue                  # keep the route's field clear
            if gy < 520 and k < 0.55: continue                                # quiet sky band for the headline
            if k < 0.35: lots.append(f'<rect class="lot" x="{x0}" y="{y0}" width="122" height="{random.choice([56, 122])}" fill="{COB_D}"/>')
            elif k < 0.5: lots.append(f'<rect class="lot" x="{x0}" y="{y0}" width="122" height="122" fill="none" stroke="{ROOF}" stroke-width="4"/>')
            elif k < 0.6: lots.append(f'<g class="lot">{hatch(x0, y0, x0 + 122, y0 + 122, col=COB_L, w=4)}</g>')
            elif k < 0.68: lots.append(f'<rect class="lot" x="{x0 + 30}" y="{y0 + 30}" width="62" height="62" fill="{LILAC}"/>')
            elif k < 0.76: lots.append(f'<g class="lot">{tree(gx + 75, gy + 75, 22, LILAC, COB_D)}</g>')
    route = "M300 1120 V900 H600 V700 H840 V600"
    listing = (f'<g id="s3-listing"><rect x="152" y="1132" width="300" height="170" rx="16" fill="{COB_D}"/>'
               f'<rect x="140" y="1120" width="300" height="170" rx="16" fill="{ROOF}"/>'
               f'<rect x="160" y="1140" width="90" height="90" rx="10" fill="{LILAC}"/>'
               f'<text x="268" y="1176" {FONT} font-weight="700" font-size="24" fill="{INK}">LISTING</text>'
               f'<text x="268" y="1222" {FONT} font-weight="900" font-size="44" fill="{INK}">RM540</text>'
               f'<rect x="268" y="1238" width="96" height="36" rx="18" fill="{ORANGE}"/><text x="316" y="1264" {FONT} font-weight="900" font-size="22" fill="{ROOF}" text-anchor="middle">−10%</text>'
               f'<g id="s3-susp" opacity="0"><rect x="140" y="1120" width="300" height="170" rx="16" fill="{INK}" opacity=".72"/>'
               f'<rect x="166" y="1180" width="248" height="52" rx="26" fill="{ORANGE}"/><text x="290" y="1215" {FONT} font-weight="900" font-size="26" fill="{ROOF}" text-anchor="middle">SUSPENDED</text></g></g>')
    buyers = f'<g id="s3-buyers">{house(800, 560)}{house(880, 520)}{house(900, 610, 0.9)}</g>'
    gate = (f'<g id="s3-gate"><rect x="438" y="960" width="24" height="70" fill="{INK}"/>'
            f'<g id="s3-bar"><rect x="440" y="790" width="20" height="200" fill="{ROOF}"/>'
            + "".join(f'<rect x="440" y="{y}" width="20" height="26" fill="{ORANGE}"/>' for y in range(800, 990, 52)) + '</g></g>')
    sign = (f'<g id="s3-sign"><circle cx="0" cy="0" r="92" fill="{ROOF}"/><circle cx="0" cy="0" r="80" fill="none" stroke="{ORANGE}" stroke-width="14"/>'
            f'<text x="0" y="-6" {FONT} font-weight="900" font-size="30" fill="{INK}" text-anchor="middle">CPA 1999</text>'
            f'<text x="0" y="30" {FONT} font-weight="900" font-size="30" fill="{INK}" text-anchor="middle">s.12</text></g>')
    body = f"""      <svg class="art" viewBox="0 0 1080 1920"><g id="s3-cam"><g id="s3-grid">{''.join(g)}</g><g id="s3-lots">{''.join(lots)}</g>
          <path id="s3-route-bg" d="{route}" fill="none" stroke="{COB_D}" stroke-width="30" stroke-linejoin="round" transform="translate(8,8)"/>
          <path id="s3-route" d="{route}" fill="none" stroke="{ORANGE}" stroke-width="30" stroke-linejoin="round" stroke-linecap="round"/>
          <path id="s3-dead" d="M450 900 H600 V700 H840 V600" fill="none" stroke="{GREY}" stroke-width="30" stroke-linejoin="round" stroke-linecap="round" opacity="0"/>
          {buyers}{listing}{gate}<g transform="translate(180,760)">{sign}</g></g></svg>
      {stripes("ab", LILAC, [("k", "IN MALAYSIA", 40), ("b", "IT'S ILLEGAL", 96), ("k", "CONSUMER PROTECTION ACT 1999", 40)], [("k", "AND SHOPEE", 40)])}
      <div class="head" style="top:190px;">{kick("IN MALAYSIA", "a1", ROOF)}{big("IT'S ILLEGAL", "a2", ROOF)}{kick("CONSUMER PROTECTION ACT 1999", "a3", LILAC)}</div>
      <div class="head" style="top:190px;">{kick("AND SHOPEE", "b1", ROOF)}{big("SUSPENDS IT", "b2", ROOF)}</div>"""
    hit = L(t("L04", "illegal"))
    js = f"""
tl.fromTo("#s3-grid line", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.5, ease: "io" }}, 0.05);
// the floor we tilted onto becomes a city seen from above: the blocks rise into place, the camera pulls back
// HAND-OFF 2 (arrival) · the city is dropped onto the water from above, row by row: each block starts closer to the
// camera (bigger, transparent) and lands — top-down "falling" reads as shrinking onto the ground
tl.fromTo("#s3-lots > *", {{ opacity: 0, scale: 1.45, transformOrigin: "50% 50%" }}, {{ opacity: 1, scale: 1, duration: 0.42, ease: "power2.in", stagger: {{ each: 0.011, from: "start" }} }}, 0.05);
tl.fromTo("#s3-lots > *", {{ scale: 1 }}, {{ scale: 0.94, duration: 0.07, ease: "power1.out", yoyo: true, repeat: 1, stagger: {{ each: 0.011, from: "start" }}, immediateRender: false }}, 0.47);
gsap.set("#s3-cam", {{ svgOrigin: "540 900" }});
tl.fromTo("#s3-cam", {{ scale: 1.3 }}, {{ scale: 1, duration: 4.2, ease: "io" }}, 0);
drift([["#s3-lots", 0.4]], {S3[1]}, T0);
tl.fromTo("#s3-listing", {{ scale: 0, transformOrigin: "50% 50%" }}, {{ scale: 1, duration: 0.7, ease: spring(0.7) }}, 0.25);
tl.fromTo("#s3-buyers > g", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.4, ease: "io", stagger: 0.1 }}, 0.4);
// the listing's route heads for the buyers...
tl.fromTo("#s3-route, #s3-route-bg", {{ strokeDasharray: 1300, strokeDashoffset: 1300 }}, {{ strokeDashoffset: 0, duration: 1.6, ease: "io" }}, 0.45);
// ...and the law drops the gate across it
gsap.set("#s3-bar", {{ svgOrigin: "450 1000", rotation: 90 }});
tl.fromTo("#s3-gate", {{ opacity: 0, y: -30 }}, {{ opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }}, 0.75);
tl.fromTo("#s3-sign", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.01 }}, 0.0);
tl.fromTo("#s3-bar", {{ rotation: 90 }}, {{ rotation: 0, duration: 0.35, ease: "power3.in" }}, {hit - 0.35});
tl.fromTo("#s3-cam", {{ x: 0 }}, {{ x: 10, duration: 0.06, ease: "none", yoyo: true, repeat: 3, immediateRender: false }}, {hit});
tl.fromTo("#s3-dead", {{ opacity: 0 }}, {{ opacity: 0.9, duration: 0.4, ease: "io" }}, {hit + 0.05});
tl.fromTo("#s3-sign", {{ scale: 0, rotation: -40 }}, {{ scale: 1, rotation: 0, duration: 0.7, ease: spring(0.7) }}, {L(t("L04", "consumer")) - 0.2});
rise("#s3-w .a1", {L(t("L04", "malaysia")) - 0.15}, 0.1);
rise("#s3-w .a2", {hit - 0.1}, 0.15);
rise("#s3-w .a3", {L(t("L04", "consumer"))}, 0.15);
wipe({L(t("L04", "shopee")) - 0.4}, "#s3-w .a1, #s3-w .a2, #s3-w .a3", "#s3-w .b1", "ab");
rise("#s3-w .b2", {L(t("L04", "suspends"))}, 0.15);
// Shopee pulls the listing
tl.fromTo("#s3-susp", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.4, ease: "io" }}, {L(t("L04", "suspends")) + 0.1});
tl.fromTo("#s3-susp rect:nth-of-type(2), #s3-susp text", {{ scale: 1.3, transformOrigin: "50% 50%" }}, {{ scale: 1, duration: 0.6, ease: spring(0.6) }}, {L(t("L04", "suspends")) + 0.1});
tl.fromTo("#s3-route, #s3-route-bg", {{ opacity: 1 }}, {{ opacity: 0.35, duration: 0.6, ease: "io", immediateRender: false }}, {L(t("L04", "listings"))});
sink("#s3-w .b1, #s3-w .b2", {L(t("L05", "so")) - 0.55}, 0.03);
"""
    return scene("s3", S3, body, js)


def s4():
    L = lambda x: lt(S4, x)
    HZ = 1100
    hills = (f"M-100 {HZ} V{HZ - 90} H300 C330 {HZ - 90} 350 {HZ - 270} 392 {HZ - 270} H560 C600 {HZ - 270} 612 {HZ - 162} 650 {HZ - 162} H1180 V{HZ} Z")
    world = f"""<g id="s4-world">
          <rect x="-200" y="-200" width="1480" height="2400" fill="{PAPER}"/>
          {cloud(-60, 300, 1.0)}{cloud(700, 220, 0.8)}
          <g id="s4-hills"><path d="{hills}" fill="{COB_D}" transform="translate(10,10)"/><path d="{hills}" fill="{LILAC}"/>
            <text x="150" y="{HZ - 120}" {FONT} font-weight="700" font-size="28" letter-spacing="2" fill="{INK}" text-anchor="middle">LAST WEEK 500</text>
            <text x="476" y="{HZ - 300}" {FONT} font-weight="700" font-size="28" letter-spacing="2" fill="{INK}" text-anchor="middle">11.11 EVE 600</text>
            <text x="880" y="{HZ - 192}" {FONT} font-weight="900" font-size="34" letter-spacing="2" fill="{ORANGE}" text-anchor="middle">"DEAL" 540</text></g>
          <rect x="-200" y="{HZ}" width="1480" height="1200" fill="{COB}"/>
          <path d="M-200 {HZ + 60} C200 {HZ + 40} 300 {HZ + 120} 540 {HZ + 90} C780 {HZ + 60} 900 {HZ + 140} 1280 {HZ + 100} V{HZ} H-200 Z" fill="{COB_D}"/>
          <path id="s4-road" d="M532 {HZ} L548 {HZ} L820 2000 L260 2000 Z" fill="{ORANGE}"/>
          <path d="M532 {HZ} L250 2000 M548 {HZ} L830 2000" stroke="{ROOF}" stroke-width="6"/>
          <path d="M540 {HZ + 40} L540 2000" stroke="{ROOF}" stroke-width="6" stroke-dasharray="40 50"/>
        </g>"""
    random.seed(44); puffs = []
    for row, cy in enumerate(range(-40, 2060, 270)):
        for cx in range(-60 + (row % 2) * 150, 1260, 300):
            R = random.randint(200, 250); d_in = round((1140 - cx) / 1140 * 0.24 + random.random() * 0.06, 3)
            dist = ((cx - 540) ** 2 + (cy - 960) ** 2) ** 0.5; d_out = round(dist / 1100 * 0.3 + random.random() * 0.04, 3)
            ox, oy = round((cx - 540) * 1.7 + (240 if cx >= 540 else -240)), round((cy - 960) * 0.7)
            puffs.append(f'<g transform="translate({cx},{cy})"><g class="pf" data-i="{d_in}" data-o="{d_out}" data-x="{ox}" data-y="{oy}">'
                         f'<circle r="{R}" fill="{CLOUD}"/><circle cx="{-0.7 * R:.0f}" cy="{0.22 * R:.0f}" r="{0.72 * R:.0f}" fill="{CLOUD}"/>'
                         f'<circle cx="{0.72 * R:.0f}" cy="{0.18 * R:.0f}" r="{0.7 * R:.0f}" fill="{CLOUD}"/>'
                         f'<circle cx="{-0.12 * R:.0f}" cy="{-0.16 * R:.0f}" r="{0.8 * R:.0f}" fill="#ECEAE4"/></g></g>')
    clouds = "".join(puffs)
    _unused = "".join(f'<g class="cw" transform="translate(0,{y})"><g>{cloud(0, 0, s, c)}</g></g>' for y, s, c in
                     ((-120, 4.2, "#ECEAE4"), (260, 4.6, CLOUD), (700, 4.4, "#ECEAE4"), (1120, 4.8, CLOUD), (1560, 4.4, "#ECEAE4")))
    body = f"""      <svg class="art" viewBox="0 0 1080 1920"><g id="s4-cam">{world}</g>
        <rect id="s4-end" width="1080" height="1920" fill="{PAPER}" opacity="0"/>
        <circle id="s4-sun" cx="760" cy="760" r="120" fill="{ORANGE}"/>
        <g id="s4-clouds">{clouds}</g></svg>
      <img id="s4-logo" src="assets/logo.png" style="position:absolute; left:{540 - 141}px; top:{800 - 180}px; height:360px;">
      <div class="head" style="top:1130px; text-align:center; left:0; width:1080px;">{big("FOLLOW FOR MORE", "f1", INK, 60)}</div>
      {stripes("ab", ORANGE, [("k", "BEFORE YOU USE YOUR VOUCHERS", 40), ("b", "CHECK LAST", 96), ("b", "WEEK'S PRICE", 96)], [("b", "SEEN A FAKE DEAL?", 84)])}
      <div class="head" style="top:190px;">{kick("BEFORE YOU USE YOUR VOUCHERS", "a1", COB)}{big("CHECK LAST", "a2", INK)}{big("WEEK'S PRICE", "a3", INK)}</div>
      <div class="head" style="top:190px;">{big("SEEN A FAKE DEAL?", "b1", INK, 84)}{kick("DROP IT BELOW", "b2", COB)}</div>"""
    chk, fol = L(t("L05", "check")), L(t("L05", "follow"))
    js = f"""
// hand-off: a bank of clouds sweeps across, the horizon is behind it
// HAND-OFF 3 · a cloud front grows over the city from the right, puff by puff; when it has closed, it parts from the
// middle outward and the horizon is behind it (the clouds are the transition, not a slab over it)
const pf = gsap.utils.toArray("#s4-clouds .pf");
tl.fromTo(pf, {{ scale: 0 }}, {{ scale: 1, duration: 0.36, ease: "power2.out", stagger: (i, el) => +el.dataset.i }}, 0.0);
tl.fromTo("#s4-world", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.02, ease: "none" }}, 0.62);
tl.fromTo("#s4-sun", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.02, ease: "none" }}, 0.62);
// the front stays solid while it parts: puffs are pushed out from the middle (outer ones go furthest) and only thin
// out in their last moments, so the horizon opens like a gap in cloud, not a dissolve
tl.fromTo(pf, {{ x: 0, y: 0, scale: 1 }}, {{ x: (i, el) => +el.dataset.x, y: (i, el) => +el.dataset.y, scale: 0.7,
  duration: 0.75, ease: "power2.inOut", stagger: (i, el) => +el.dataset.o, immediateRender: false }}, 0.62);
tl.fromTo(pf, {{ opacity: 1 }}, {{ opacity: 0, duration: 0.2, ease: "power1.in", stagger: (i, el) => +el.dataset.o, immediateRender: false }}, 1.12);
gsap.set("#s4-cam", {{ svgOrigin: "540 {HZ}" }});
tl.fromTo("#s4-cam", {{ scale: 1.08 }}, {{ scale: 1, duration: 3.5, ease: "io" }}, 0.5);
drift([["#s4-sun", 0.6]], {S4[1]}, T0);
// the hills are the price history: they draw left to right on "check"
tl.fromTo("#s4-hills", {{ clipPath: "inset(0px 100% 0px 0px)" }}, {{ clipPath: "inset(0px 0% 0px 0px)", duration: 1.6, ease: "io" }}, {chk - 0.1});
rise("#s4-w .a1", {max(L(t("L05", "before")), 1.05)}, 0.06);
rise("#s4-w .a2", {chk}, 0.14);
rise("#s4-w .a3", {L(t("L05", "week"))}, 0.3);
wipe({L(t("L05", "seen")) - 0.37}, "#s4-w .a1, #s4-w .a2, #s4-w .a3", "#s4-w .b1", "ab");
rise("#s4-w .b2", {L(t("L05", "drop"))}, 0.1);
sink("#s4-w .b1, #s4-w .b2", {fol - 0.5}, 0.03);
// the end card (silent): the sun rolls to the middle, the world gives way to paper, the sun becomes the logo
tl.fromTo("#s4-sun", {{ attr: {{ cx: 760, cy: 760 }} }}, {{ attr: {{ cx: 540, cy: 800 }}, duration: 0.7, ease: "io" }}, {fol - 0.3});
tl.fromTo("#s4-end", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.5, ease: "io" }}, {fol + 0.1});
tl.fromTo("#s4-sun", {{ attr: {{ r: 120 }} }}, {{ attr: {{ r: 0 }}, duration: 0.5, ease: "io", immediateRender: false }}, {fol + 0.45});
tl.fromTo("#s4-logo", {{ opacity: 0, scale: 0.5 }}, {{ opacity: 1, scale: 1, duration: 0.9, ease: spring(0.9) }}, {fol + 0.55});
rise("#s4-w .f1", {fol + 0.8});
"""
    css = "#s4-end { } #s4-w #s4-logo { opacity: 0; }"
    return scene("s4", S4, body, js, css)


def build():
    os.makedirs(f"{HF}/compositions", exist_ok=True)
    for f in os.listdir(f"{HF}/compositions"): os.remove(f"{HF}/compositions/{f}")
    files = {"s1": s1(), "s2": s2(), "s3": s3(), "s4": s4()}
    files.update(h.overlays())
    # the scene file template scopes everything to its wrapper; the old #sN selectors would miss
    for k, v in files.items():
        open(f"{HF}/compositions/{k}.html", "w").write(v)
    slots = [("s1", S1), ("s2", S2), ("s3", S3), ("s4", S4)]
    hosts = "\n".join(f'      <div id="{n}" data-composition-id="{n}" data-composition-src="compositions/{n}.html" data-start="{s[0]}" data-duration="{s[1]:.3f}" '
                      f'data-track-index="{i + 1}" data-track-kind="graphics" data-width="1080" data-height="1920" style="z-index:{i + 1}"></div>' for i, (n, s) in enumerate(slots))
    over = "\n".join(f'      <div id="{n}" data-composition-id="{n}" data-composition-src="compositions/{n}.html" data-start="0" data-duration="{END}" '
                     f'data-track-index="{ti}" data-track-kind="{kind}" data-width="1080" data-height="1920" style="z-index:{z}"></div>'
                     for n, ti, kind, z in (("grain", 8, "graphics", 20), ("caps", 9, "captions", 30)))
    open(f"{HF}/index.html", "w").write(f"""<!doctype html>
<html lang="en" data-resolution="portrait">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/CustomEase.min.js"></script>
    <script>gsap.registerPlugin(CustomEase);</script>
    <style>
      * {{ margin: 0; padding: 0; box-sizing: border-box; }}
      html, body {{ margin: 0; width: 1080px; height: 1920px; overflow: hidden; background: {PAPER}; }}
      #root {{ position: relative; width: 1080px; height: 1920px; }}
    </style>
  </head>
  <body>
    <!-- EX27 v3 · generated by build/hf_v3.py — edit there and rebuild -->
    <div id="root" data-composition-id="main" data-start="0" data-duration="{END}" data-fps="60" data-width="1080" data-height="1920">
{hosts}
{over}
      <audio id="mix" class="clip" src="assets/mix.wav" data-start="0" data-duration="{END}" data-track-index="10" data-volume="1"></audio>
    </div>
    <script>
      window.__timelines["main"] = gsap.timeline({{ paused: true }});
    </script>
  </body>
</html>
""")
    print("v3 built:", [s for _, s in slots], "end", END)


if __name__ == "__main__":
    build()

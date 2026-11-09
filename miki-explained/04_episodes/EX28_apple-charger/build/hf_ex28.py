#!/usr/bin/env python3
"""EX28 The Missing Charger — Style B (BIBLE-B, flat-v3 playbook) → HyperFrames project in hf/.
   ~/.local/bin/uv run -q --with pillow python build/hf_ex28.py      (from the episode folder)
The look comes from the approved stills (styleframes/make.py): every scene is drawn twice — night tones and light
tones — and the scene's light shape clips the lit copy over the dark one; animating the light shape moves the light (B2).
Through-line: the white 20W charger (Malaysian 3-pin). Each scene hands over through the charger or the light."""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE); sys.path.insert(0, os.path.join(HERE, "..", "styleframes"))
import hfkit as h
from make import DARK, LIT, WHITE, AMBER, AMBER_D, NAVY_T, F, rr, poly, g, apple, charger_side, charger_top, iphone_box_side

t, END, HF = h.t, h.END, h.HF

# ---- scene slots (start, end): each overlaps the next so the hand-off covers the cut
S = {"s1": (0.0, 6.9), "s2": (6.55, 14.55), "s3": (14.3, 20.45), "s4": (20.15, 26.25), "s5": (25.55, END)}

def two(sid, world, light):
    """dark copy + lit copy clipped by the light shape (polygons directly in #sid-clip — a <g> there is ignored by Chrome)"""
    return (f'<svg class="art" viewBox="0 0 1080 1920"><defs><clipPath id="{sid}-clip">{light}</clipPath></defs>'
            f'<g class="dark">{world(DARK)}</g><g clip-path="url(#{sid}-clip)">{world(LIT)}</g></svg>')

def scene(sid, body, js):
    start = S[sid][0]
    return f"""<template>
  <style>
    {h.FONTS}
    #root {{ position: absolute; inset: 0; overflow: hidden; }}
    #{sid}-w {{ position: absolute; inset: 0; overflow: hidden; }}
    #{sid}-w svg.art {{ position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }}
  </style>
  <div id="root" data-composition-id="{sid}" data-width="1080" data-height="1920" data-layout-allow-overflow data-layout-allow-overlap>
    <div id="{sid}-w">
{body}
    </div>
  </div>
  <script>
    (() => {{
{h.PRELUDE}
      const T0 = {start};
      const Q = (s) => "#{sid}-w " + s;          // both copies (dark and lit) share the classes
      const at = (x) => +(x - T0).toFixed(3);    // film time → scene time
{js}
      window.__timelines["{sid}"] = tl;
    }})();
  </script>
</template>
"""

# ======================================================================= S1 · L01 hook — top-down tabletop
REC = (540, 1334)                       # the empty recess's centre on screen (the push-in target)
def s1():
    def world(p):
        b = rr(0, 0, 1080, 1920, 0, p["ground"]) + "".join(rr(0, y, 1080, 5, 0, p["ground2"]) for y in range(-40, 1920, 132))
        tray = (rr(16, 20, 420, 800, 28, p["cast"]) + rr(0, 0, 420, 800, 28, p["w"]) + rr(16, 16, 388, 768, 20, p["w2"]) +
                rr(36, 60, 348, 330, 18, p["s"]))
        for k in range(6): tray += f'<circle cx="210" cy="225" r="{120 - k * 14}" fill="{p["w"] if k % 2 == 0 else p["w2"]}"/>'
        tray += rr(150, 110, 120, 34, 10, p["w"]) + rr(190, 92, 40, 26, 6, p["lens"])
        # the empty charger recess: a hole in navy (the same navy as the next scene's ground: the push-in hands over on it)
        tray += rr(96, 440, 228, 228, 26, DARK["ground"])
        tray += f'<g class="dents" opacity="0">' + "".join(rr(x, y, w_, h_, 3, DARK["cast"]) for x, y, w_, h_ in ((200, 486, 20, 52), (156, 590, 44, 18), (220, 590, 44, 18))) + "</g>"
        b += g(tray, "translate(330,780)")
        ph = (rr(14, 18, 300, 620, 52, p["cast"]) + rr(0, 0, 300, 620, 52, p["phone"]) + rr(22, 24, 128, 128, 30, p["lens"]) +
              f'<circle cx="60" cy="62" r="24" fill="{p["deep"]}"/><circle cx="112" cy="114" r="24" fill="{p["deep"]}"/>'
              f'<circle cx="112" cy="62" r="9" fill="{p["warm"]}"/>' + apple(126, 270, 64, p["lens"]))
        b += f'<g class="phone">{g(ph, "translate(720,1290) rotate(-14)")}</g>'
        leaf = (f'<path d="M0 0 C 18 -30, 52 -34, 66 -40 C 62 -8, 40 18, 0 0 Z" fill="{p["ink"]}"/>'
                f'<path d="M4 -2 C 22 -16, 40 -24, 56 -32" stroke="{p["w"]}" stroke-width="3" fill="none"/>')
        lid = (rr(14, 18, 420, 800, 30, p["cast"]) + rr(0, 0, 420, 800, 30, p["w"]) + rr(18, 18, 384, 764, 22, p["w2"]) +
               rr(0, 0, 420, 800, 30, p["w"], 'opacity=".55"') + apple(160, 300, 120, p["ink"]) +
               f'<g class="leaf" opacity="0">{g(leaf, "translate(176,560)")}</g>' + rr(180, 740, 60, 14, 7, p["s"]))
        b += f'<g class="lid">{g(lid, "translate(330,780)")}</g>'
        return f'<g class="cam">{b}</g>'
    patch = (poly([(150, 380), (566, 299), (606, 930), (190, 1008)], "#000") + poly([(580, 296), (1000, 214), (1040, 838), (620, 920)], "#000") +
             poly([(192, 1022), (607, 942), (642, 1560), (234, 1640)], "#000") + poly([(621, 936), (1044, 856), (1080, 1470), (656, 1556)], "#000"))
    js = f"""
      gsap.set(Q(".cam"), {{ svgOrigin: "0 0" }});
      // frame 1 already moving: the window light drifts across the table the whole scene
      tl.fromTo("#s1-clip polygon", {{ x: 45, y: 30 }}, {{ x: 150, y: -20, duration: 6.9, ease: "none" }}, 0);
      // "box": the lid slides off to the upper left, the tray opens
      tl.fromTo(Q(".lid"), {{ x: 0, y: 0, rotation: 0, svgOrigin: "540 1180" }}, {{ x: -380, y: -560, rotation: -11, duration: 0.8, ease: "io" }}, at({t("L01", "box")} - 0.2));
      // "no charger": the pin dents show where a charger was
      tl.fromTo(Q(".dents"), {{ opacity: 0 }}, {{ opacity: 1, duration: 0.4, ease: "io" }}, at({t("L01", "charger")}));
      // "planet": the leaf mark on the lid
      tl.fromTo(Q(".leaf"), {{ opacity: 0, scale: 0.6, svgOrigin: "540 1300" }}, {{ opacity: 1, scale: 1, duration: 0.5, ease: spring() }}, at({t("L01", "planet")} - 0.15));
      // "very good business": push into the empty recess until its navy is the whole frame (grow-into-background hand-off)
      tl.to(Q(".phone"), {{ x: 260, y: 200, duration: 0.8, ease: "io" }}, at({t("L01", "very")} - 0.1));
      const s = 9.5, P = [{REC[0]}, {REC[1]}];
      tl.fromTo(Q(".cam"), {{ scale: 1, x: 0, y: 0 }}, {{ scale: s, x: 540 - s * P[0], y: 960 - s * P[1], duration: 1.15, ease: "power3.in" }}, at({t("L01", "business")} - 0.45));
"""
    return scene("s1", two("s1", world, patch), js)

# ======================================================================= S2 · L02 — one world, one pull-back: box → pallet → lorry
HERO = (252, 990, 152, 42)              # the hero thin box in the world (pallet 2, row 6): x, y, w, h
def s2():
    hx, hy, hw, hh = HERO
    def world(p):
        b = rr(-3000, -3000, 7080, 7920, 0, p["ground"]) + rr(-3000, 1386, 7080, 3000, 0, p["ground2"]) + rr(-3000, 1382, 7080, 8, 0, p["s"])
        # lorry: cargo box (dark inside), cab, wheels — it assembles in the last beat
        lorry = rr(40, 700, 760, 640, 14, p["w"]) + rr(60, 720, 720, 600, 8, p["deep"])
        cab = (rr(820, 980, 220, 360, 30, p["w"]) + rr(860, 1010, 150, 130, 18, p["s"]) + rr(1010, 1230, 40, 50, 8, p["warm"]) +
               rr(1040, 1030, 14, 70, 5, p["deep"]) + rr(860, 1180, 120, 14, 6, p["s"]) + rr(845, 1290, 60, 14, 5, p["deep"]) +
               rr(880, 1250, 130, 38, 6, "#111318") + f'<text x="945" y="1278" {F} font-weight="800" font-size="26" fill="#F2F2F2" text-anchor="middle" letter-spacing="2">WVA 2028</text>')
        lorry += rr(70, 1320, 50, 40, 4, p["deep"])   # mud flap (no side livery: this side is cut open)
        wheels = "".join(f'<circle cx="{wx}" cy="1350" r="70" fill="{p["deep"]}"/><circle cx="{wx}" cy="1350" r="30" fill="{p["s"]}"/>' for wx in (180, 640, 930))
        b += f'<g class="lorry" opacity="0">{lorry}</g><g class="cab" opacity="0">{cab}{wheels}</g>'
        sheet = (rr(0, 0, 260, 150, 8, p["label"]) + f'<text x="130" y="44" {F} font-weight="800" font-size="24" fill="{p["ink"]}" text-anchor="middle" letter-spacing="2">LOAD</text>'
                 f'<text x="130" y="112" {F} font-weight="900" font-size="58" fill="{p["ink"]}" text-anchor="middle">+70%</text>')
        b += f'<g class="sheet" opacity="0">{g(sheet, "translate(290,540)")}</g>'
        # four pallets of thin boxes; every box but the hero arrives row by row as we pull back
        for c in range(4):
            x0 = 72 + c * 176
            b += f'<g class="pal pal{c}" opacity="{1 if c == 1 else 0}">{rr(x0, 1286, 160, 20, 3, p["wood"])}{rr(x0 + 8, 1306, 22, 26, 2, p["wood2"])}{rr(x0 + 130, 1306, 22, 26, 2, p["wood2"])}</g>'
            for r in range(11):
                if c == 1 and r == 5: continue
                y = 1286 - (r + 1) * 50 + 4
                b += f'<g class="bx bx{c}" data-r="{r}">{rr(x0 + 4, y, 152, 42, 5, p["w"])}{rr(x0 + 4, y + 30, 152, 7, 3, p["w2"])}{rr(x0 + 12, y + 8, 30, 6, 3, p["s"])}</g>'
        # the 2019 load line on pallet 2 (6.5 rows), with its tag
        b += f'<g class="old" opacity="0">{rr(56, 1286 - 6.5 * 50 - 3, 380, 6, 3, AMBER if p is LIT else "#6B5A3A")}<text x="440" y="{1286 - 6.5 * 50 + 6}" {F} font-weight="800" font-size="18" fill="{p["ink"]}">2019 LOAD</text></g>'
        # the shipping label on pallet 2: +70% counts up (words on the object)
        lab = (rr(4, 5, 130, 116, 6, p["cast"]) + rr(0, 0, 130, 116, 6, p["label"]) + rr(0, 0, 130, 22, 6, p["ink"]) +
               f'<text x="8" y="16" {F} font-weight="800" font-size="11" fill="{p["label"]}" letter-spacing="1">PALLET 07 · IPHONE</text>'
               f'<text class="pct" x="65" y="74" {F} font-weight="900" font-size="44" fill="{p["ink"]}" text-anchor="middle">+0%</text>'
               f'<text x="65" y="94" {F} font-weight="800" font-size="13" fill="{p["ink"]}" text-anchor="middle">BOXES PER PALLET</text>')
        lab += "".join(rr(10 + k * 6.4, 100, 2.5 + (k % 3), 12, 0.5, p["ink"]) for k in range(18))
        b += f'<g class="lab" opacity="0">{g(lab, "translate(262,1090)")}</g>'
        # the hero: the 2019 box (thick, cut open, the charger inside) that presses down into the thin 2020 box
        old = (rr(hx + 4, hy - 30 + 4, hw, hh + 30, 6, p["cast"]) + rr(hx, hy - 30, hw, hh + 30, 6, p["w"]) + rr(hx + 5, hy - 25, hw - 10, hh + 20, 4, p["s"]) +
               rr(hx + 9, hy - 22, hw - 18, 16, 4, p["phone"]) + rr(hx + 12, hy - 19, 22, 10, 3, p["lens"]) +
               "".join(rr(hx + 10 + k * 7, hy - 2, 5, 5, 2.5, p["w2"]) for k in range(5)))
        b += f'<g class="hero">{old}</g>'
        b += f'<g class="ghost" opacity="0">{rr(hx - 6, hy - 32, hw + 12, 3, 1.5, p["s"])}{rr(hx - 6, hy - 32, 2, 34, 1, p["s"])}{rr(hx + hw + 4, hy - 32, 2, 34, 1, p["s"])}</g>'
        b += f'<g class="yr"><text class="y19" x="{hx + hw / 2}" y="{hy + hh + 22}" {F} font-weight="800" font-size="12" fill="{p["ink"]}" text-anchor="middle" letter-spacing="2">2019</text>'
        b += f'<text class="y20" x="{hx + hw / 2}" y="{hy + hh + 22}" {F} font-weight="800" font-size="12" fill="{p["ink"]}" text-anchor="middle" letter-spacing="2" opacity="0">2020</text></g>'
        # the charger, inside the old box at first (white everywhere: the one pure white)
        b += f'<g class="chg">{charger_side(0, 0, 1.0, p)}</g>'
        return f'<g class="cam">{b}</g>'
    shaft = poly([(560, -200), (1300, -200), (1300, 120), (520, 1980), (-200, 1980)], "#000")
    hcx, hcy = HERO[0] + HERO[2] / 2, HERO[1] - 4
    js = f"""
      const cam = (s, px, py) => ({{ scale: s, x: 540 - s * px, y: 960 - s * py }});
      gsap.set(Q(".cam"), {{ svgOrigin: "0 0", ...cam(6.2, {hcx}, {hcy} + 34) }});
      gsap.set(Q(".hero"), {{ svgOrigin: "{HERO[0]} {HERO[1] + HERO[3]}" }});
      gsap.set(Q(".chg"), {{ svgOrigin: "0 0", x: {HERO[0] + HERO[2] - 26}, y: {HERO[1] - 8}, scale: 0.17 }});
      tl.fromTo("#s2-clip polygon", {{ x: -1500 }}, {{ x: -60, duration: 0.8, ease: "io" }}, 0.15).to("#s2-clip polygon", {{ x: 60, duration: 7, ease: "none" }}, 0.95);
      // the cut lands on navy (S1's recess); the box rises into view
      tl.fromTo(Q(".hero, .yr"), {{ y: 60, opacity: 0 }}, {{ y: 0, opacity: 1, duration: 0.5, ease: spring() }}, 0.08);
      tl.fromTo(Q(".chg"), {{ opacity: 0 }}, {{ opacity: 1, duration: 0.4 }}, 0.18);
      // "without the charger": it lifts out of the box and up
      tl.to(Q(".chg"), {{ y: {HERO[1] - 70}, x: {HERO[0] + HERO[2] - 20}, duration: 0.6, ease: "io" }}, at({t("L02", "charger")} - 0.1));
      // as the camera pulls back the charger rises clear of the stack and keeps its size on screen
      tl.to(Q(".chg"), {{ x: 470, y: 640, scale: 0.55, duration: 1.2, ease: "io" }}, at({t("L02", "70%")} - 0.45));
      tl.to(Q(".chg"), {{ x: 600, y: 622, scale: 1.15, duration: 1.3, ease: "io" }}, at({t("L02", "Same")} - 0.3));   // riding on the lorry roof
      // "the box got thin": the old box presses down to the thin box; a ghost keeps the old height; 2019 → 2020
      tl.to(Q(".ghost"), {{ opacity: 1, duration: 0.2 }}, at({t("L02", "box")} - 0.05));
      tl.to(Q(".hero"), {{ scaleY: {HERO[3]} / {HERO[3] + 30}, duration: 0.45, ease: "power2.in" }}, at({t("L02", "got")} - 0.1));
      tl.to(Q(".y19"), {{ opacity: 0, duration: 0.15 }}, at({t("L02", "thin")})).to(Q(".y20"), {{ opacity: 1, duration: 0.2 }}, at({t("L02", "thin")} + 0.1));
      // "70% more boxes … every pallet": pull back to the pallet; the stack fills row by row; the label counts
      tl.to(Q(".cam"), {{ ...cam(2.35, 328, 1080), duration: 1.2, ease: "io" }}, at({t("L02", "70%")} - 0.45));
      tl.to(Q(".ghost, .yr"), {{ opacity: 0, duration: 0.3 }}, at({t("L02", "70%")} + 0.25));
      tl.fromTo(Q(".bx1"), {{ y: -120, opacity: 0 }}, {{ y: 0, opacity: 1, duration: 0.35, ease: "fall", stagger: (i, el) => +el.dataset.r * 0.08 }}, at({t("L02", "70%")} - 0.2));
      tl.to(Q(".old"), {{ opacity: 1, duration: 0.3 }}, at({t("L02", "70%")} - 0.3));
      tl.to(Q(".lab"), {{ opacity: 1, duration: 0.3 }}, at({t("L02", "70%")} - 0.1));
      const o = {{ v: 0 }}, els = document.querySelectorAll(Q(".pct"));
      tl.fromTo(o, {{ v: 0 }}, {{ v: 70, duration: 0.9, ease: "io", onUpdate() {{ els.forEach((e) => (e.textContent = "+" + Math.round(o.v) + "%")); }} }}, at({t("L02", "70%")}));
      // "same truck, far more iPhones": pull back to the lorry; it assembles around the pallets; the others fill
      tl.to(Q(".cam"), {{ ...cam(0.92, 540, 1060), duration: 1.3, ease: "io" }}, at({t("L02", "Same")} - 0.3));
      tl.to(Q(".lorry, .cab"), {{ opacity: 1, duration: 0.5, ease: "io" }}, at({t("L02", "Same")} - 0.1));
      tl.to(Q(".pal0, .pal2, .pal3"), {{ opacity: 1, duration: 0.3 }}, at({t("L02", "truck")} - 0.2));
      tl.fromTo(Q(".bx0, .bx2, .bx3"), {{ y: -120, opacity: 0 }}, {{ y: 0, opacity: 1, duration: 0.3, ease: "fall", stagger: (i, el) => +el.dataset.r * 0.06 }}, at({t("L02", "truck")}));
      tl.to(Q(".lab, .old"), {{ opacity: 0, duration: 0.3 }}, at({t("L02", "Same")} - 0.3));
      tl.to(Q(".sheet"), {{ opacity: 1, duration: 0.4, ease: "io" }}, at({t("L02", "far")} - 0.1));
      // hand-off: the charger rolls out along the floor and off to the right
      tl.to(Q(".chg"), {{ x: 1060, y: 1325, duration: 0.5, ease: "fall" }}, at({t("L02", "iPhones")} + 0.25));      // off the back of the roof, onto the road
      tl.to(Q(".chg"), {{ x: 1700, duration: 0.6, ease: "power2.in" }}, at({t("L02", "iPhones")} + 0.8));
      tl.to("#s2-clip polygon", {{ x: 1600, duration: 0.6, ease: "io" }}, at(13.7));   // the light leaves; the cut is dark to dark
"""
    return scene("s2", two("s2", world, shaft), js)

# ======================================================================= S3 · L03 — the accessories shop
def s3():
    packs = [(130, 300, "#4F7CC4", "case"), (330, 300, "#D9534F", "cable"), (730, 300, "#3FA27A", "buds"), (130, 640, "#8E6BC9", "cable"),
             (730, 640, "#E08A3C", "case"), (130, 980, "#2F9FB5", "buds"), (330, 980, "#C64B83", "case"), (730, 980, "#5A6D86", "cable")]
    def pack_art(kind, x, y, p):
        """the product seen through the blister window: a phone case, a coiled cable, an earbud case"""
        w = p["w"]
        if kind == "case":
            return rr(x + 70, y + 46, 80, 156, 18, w) + rr(x + 80, y + 56, 28, 28, 8, p["deep"])
        if kind == "cable":
            return "".join(f'<circle cx="{x + 110}" cy="{y + 124}" r="{58 - k * 10}" fill="{w if k % 2 == 0 else p["s"]}"/>' for k in range(5)) + rr(x + 100, y + 54, 20, 30, 4, p["deep"])
        return rr(x + 62, y + 70, 96, 110, 40, w) + rr(x + 62, y + 108, 96, 4, 2, p["s"]) + f'<circle cx="{x + 110}" cy="{y + 150}" r="5" fill="{p["warm"]}"/>'
    def world(p):
        b = rr(0, 0, 1080, 1920, 0, p["ground"]) + rr(60, 200, 960, 1220, 12, p["ground2"])
        b += "".join(f'<circle cx="{xx}" cy="{yy}" r="5" fill="{p["deep"]}"/>' for yy in range(240, 1400, 60) for xx in range(100, 1000, 60))
        for i, (x, y, c, kind) in enumerate(packs):
            col = c if p is LIT else "#3A4062"
            pk = (rr(x + 104, y - 22, 12, 30, 3, p["deep"]) + rr(x + 8, y + 10, 220, 290, 14, p["cast"]) + rr(x, y, 220, 290, 14, col) +
                  rr(x + 22, y + 34, 176, 186, 20, p["w"], 'opacity=".35"') + pack_art(kind, x, y, p) +
                  rr(x + 20, y + 236, 120, 16, 6, p["w"], 'opacity=".7"') + rr(x + 20, y + 260, 80, 10, 5, p["w"], 'opacity=".45"'))
            b += f'<g class="pk" data-i="{i}">{pk}</g>'
        box = (rr(524, 560, 12, 40, 3, p["deep"]) + rr(410, 620, 240, 300, 16, p["cast"]) + rr(400, 600, 240, 300, 16, WHITE if p is LIT else p["w"]) +
               charger_side(520, 740, 0.85, p, "#ECEAE4" if p is LIT else p["w2"]) + apple(507, 830, 30, p["ink"]))
        b += f'<g class="cbox" opacity="0">{box}</g>'
        tag = (f'<path d="M0 0 C 30 -40, 70 -40, 92 -6" fill="none" stroke="{p["ink"]}" stroke-width="3"/>' +
               rr(70, -4, 210, 120, 14, AMBER_D if p is LIT else "#6B5A3A") + rr(64, -10, 210, 120, 14, AMBER if p is LIT else "#7A6640") +
               f'<circle cx="92" cy="20" r="9" fill="{p["ground2"]}"/>'
               f'<text class="rm" x="176" y="82" {F} font-weight="900" font-size="66" fill="{NAVY_T}" text-anchor="middle" opacity="0">RM99</text>')
        b += f'<g class="tag" opacity="0">{g(tag, "translate(600,640)")}</g>'
        b += rr(0, 1420, 1080, 500, 0, p["s"]) + rr(0, 1420, 1080, 24, 0, p["w2"])
        b += rr(0, 70, 1080, 110, 0, p["deep"]) + f'<text x="540" y="146" {F} font-weight="900" font-size="56" fill="{p["warm"]}" text-anchor="middle" letter-spacing="10">AKSESORI TELEFON</text>'
        b += f'<g class="chg">{charger_side(0, 0, 1.0, p)}</g>'
        return b
    cone = f'<polygon class="cone" points="-200,0 1280,0 1280,1420 -200,1420" fill="#000"/>'
    js = f"""
      tl.fromTo("#s3-clip .cone", {{ attr: {{ points: "530,0 550,0 550,1420 530,1420" }} }}, {{ attr: {{ points: "-200,0 1280,0 1280,1420 -200,1420" }}, duration: 0.7, ease: "io", immediateRender: true }}, 0.25);
      // the charger arrives from the left (it rolled out of the lorry), turning upright
      gsap.set(Q(".chg"), {{ x: -200, y: 1200, rotation: -40, svgOrigin: "0 0" }});
      tl.to(Q(".chg"), {{ x: 540, y: 760, rotation: 0, scale: 1.6, duration: 0.9, ease: "io" }}, 0.1);
      // "moved to the shelf": the pegboard fills (packs swing down onto their pegs); the charger shrinks into its own box
      document.querySelectorAll(Q(".pk")).forEach((el) => {{ const b = el.getBBox(); gsap.set(el, {{ svgOrigin: `${{b.x + b.width / 2}} ${{b.y - 20}}` }}); }});
      tl.fromTo(Q(".pk"), {{ rotation: -24, opacity: 0 }}, {{ rotation: 0, opacity: 1, duration: 0.55, ease: spring(), stagger: 0.05 }}, at({t("L03", "moved")} - 0.2));
      tl.to(Q(".chg"), {{ x: 520, y: 740, scale: 0.85, duration: 0.5, ease: "io" }}, at({t("L03", "shelf")} - 0.3));
      tl.to(Q(".cbox"), {{ opacity: 1, duration: 0.35, ease: "io" }}, at({t("L03", "shelf")} - 0.1));
      tl.to(Q(".chg"), {{ opacity: 0, duration: 0.2 }}, at({t("L03", "shelf")} + 0.2));
      // "here": the light narrows to a spotlight on the box (the dark copy takes the rest); "RM99": the tag swings in
      tl.fromTo("#s3-clip .cone", {{ attr: {{ points: "-200,0 1280,0 1280,1420 -200,1420" }} }}, {{ attr: {{ points: "470,0 610,0 900,1420 180,1420" }}, duration: 0.8, ease: "io", immediateRender: false }}, at({t("L03", "Here")} - 0.2));
      gsap.set(Q(".tag"), {{ svgOrigin: "600 640" }});
      tl.fromTo(Q(".tag"), {{ opacity: 0, rotation: -70 }}, {{ opacity: 1, rotation: 8, duration: 0.7, ease: spring(0.9, 9) }}, at({t("L03", "it's")} - 0.15));
      tl.to(Q(".rm"), {{ opacity: 1, duration: 0.2 }}, at({t("L03", "RM99")}));
      // hand-off: the spotlight closes to a thin vertical bar (the next scene's light opens from it)
      tl.to("#s3-clip .cone", {{ attr: {{ points: "530,0 550,0 550,1420 530,1420" }}, duration: 0.45, ease: "io" }}, at(19.62));
      tl.to("#s3-w .dark", {{ opacity: 0, duration: 0.4, ease: "io" }}, at(19.65));   // only the bar of light crosses the cut
"""
    return scene("s3", two("s3", world, cone), js)

# ======================================================================= S4 · L04 — Brazil, low angle
def s4():
    def world(p):
        G, Y = ("#1E9E4A", "#F7D117") if p is LIT else ("#2C4A44", "#5A5640")
        b = rr(0, 0, 1080, 1920, 0, p["ground"])
        cols = "".join(f'<g class="col">{poly([(x0, 1920), (x0 + 120, 1920), (x0 + 96 + (540 - x0) * 0.22, 300), (x0 + 26 + (540 - x0) * 0.22, 300)], p["w2"])}</g>' for x0 in (40 + k * 190 for k in range(6)))
        b += cols + f'<g class="roof">{poly([(0, 300), (1080, 300), (1000, 180), (80, 180)], p["w"])}{rr(80, 130, 920, 54, 0, p["s"])}</g>'
        doc = (rr(16, 20, 640, 760, 12, p["cast"]) + rr(0, 0, 640, 760, 12, p["label"]) + rr(0, 0, 640, 26, 12, G) + rr(0, 20, 640, 10, 0, Y) +
               f'<text x="48" y="110" {F} font-weight="800" font-size="30" fill="{p["ink"]}" letter-spacing="3">MINISTÉRIO DA JUSTIÇA</text>'
               f'<text x="48" y="150" {F} font-weight="700" font-size="28" fill="{p["ink"]}" opacity=".75">BRASIL · 2022 · APPLE INC.</text>'
               f'<g class="fine" opacity="0"><text x="48" y="290" {F} font-weight="800" font-size="34" fill="{p["ink"]}">MULTA</text>'
               f'<text x="48" y="390" {F} font-weight="900" font-size="88" fill="{p["ink"]}">R$12,3 MI</text></g>')
        doc += "".join(rr(48, 450 + k * 34, 420 + (k * 37) % 120, 12, 6, p["s"]) for k in range(5))
        doc += (f'<g class="stamp" opacity="0"><circle cx="500" cy="630" r="96" fill="none" stroke="{G}" stroke-width="10"/>'
                f'<text x="500" y="620" {F} font-weight="900" font-size="30" fill="{G}" text-anchor="middle" transform="rotate(-12 500 630)">CARREGADOR</text>'
                f'<text x="500" y="656" {F} font-weight="900" font-size="30" fill="{G}" text-anchor="middle" transform="rotate(-12 500 630)">NA CAIXA</text></g>')
        b += f'<g class="doc">{g(doc, "translate(200,560) rotate(-4)")}</g>'
        # the open iPhone box at the foot of the frame (side view): the charger goes back in, the lid closes
        bx = rr(320, 1460, 440, 150, 12, p["cast"]) + rr(310, 1450, 440, 150, 12, p["w"]) + rr(326, 1466, 408, 60, 8, p["s"])
        b += f'<g class="ibox" opacity="0">{bx}<g class="blid">{rr(310, 1420, 440, 34, 10, p["w2"])}{apple(512, 1424, 26, p["ink"])}</g></g>'
        b += f'<g class="chg">{charger_top(830, 360, 0.95, 20, p)}</g>'
        return b
    band = '<polygon class="band" points="530,0 550,0 550,1920 530,1920" fill="#000"/>'
    js = f"""
      // the light opens from the thin bar into the band across the notice
      tl.to("#s4-clip .band", {{ attr: {{ points: "0,520 1080,400 1080,1700 0,1820" }}, duration: 0.7, ease: "io" }}, 0.1);
      // "Brazil": the ministry's columns rise from the ground; the notice drops onto the frame
      document.querySelectorAll(Q(".col")).forEach((el) => gsap.set(el, {{ svgOrigin: "540 1920" }}));
      tl.fromTo(Q(".col"), {{ scaleY: 0 }}, {{ scaleY: 1, duration: 0.6, ease: "io", stagger: 0.05 }}, 0.1);
      tl.fromTo(Q(".roof"), {{ y: -260 }}, {{ y: 0, duration: 0.6, ease: "io" }}, 0.35);
      tl.fromTo(Q(".doc"), {{ y: -1400, rotation: 6, svgOrigin: "520 940" }}, {{ y: 0, rotation: 0, duration: 0.8, ease: spring() }}, at({t("L04", "planet")} - 0.4));
      // "fined Apple": the fine appears on the notice; "ordered": the stamp lands
      tl.fromTo(Q(".fine"), {{ opacity: 0, y: 20 }}, {{ opacity: 1, y: 0, duration: 0.35, ease: "io" }}, at({t("L04", "fined")}));
      tl.fromTo(Q(".stamp"), {{ opacity: 0, scale: 1.5, svgOrigin: "684 1190" }}, {{ opacity: 1, scale: 1, duration: 0.22, ease: "power3.in" }}, at({t("L04", "ordered")}));
      // "back in the box": the box rises in, the charger drops into it, the lid closes
      tl.fromTo(Q(".ibox"), {{ opacity: 0, y: 220 }}, {{ opacity: 1, y: 0, duration: 0.5, ease: "io" }}, at({t("L04", "chargers")} - 0.3));
      tl.to(Q(".chg"), {{ x: -300, y: 1120, rotation: -20, duration: 0.55, ease: "fall" }}, at({t("L04", "back")} - 0.2));
      tl.to(Q(".chg"), {{ opacity: 0, duration: 0.1 }}, at({t("L04", "back")} + 0.33));
      gsap.set(Q(".blid"), {{ rotation: -180, svgOrigin: "310 1437" }});
      tl.to(Q(".blid"), {{ rotation: 0, duration: 0.4, ease: "power2.in" }}, at({t("L04", "box")} - 0.05));
      // hand-off: everything slides down out of frame as the table comes in from above
      tl.to("#s4-w svg", {{ y: 1920, duration: 0.6, ease: "io" }}, at(25.55));
"""
    return scene("s4", two("s4", world, band), js)

# ======================================================================= S5 · L05 — top-down bookend
def s5():
    def world(p):
        b = rr(0, 0, 1080, 1920, 0, p["ground"]) + "".join(rr(0, y, 1080, 5, 0, p["ground2"]) for y in range(-40, 1920, 132))
        box = rr(14, 18, 380, 740, 30, p["cast"]) + rr(0, 0, 380, 740, 30, p["w"]) + apple(140, 290, 120, p["ink"])
        b += f'<g class="ibox">{g(box, "translate(130,560) rotate(-6)")}</g>'
        cb = rr(12, 16, 240, 240, 20, p["cast"]) + rr(0, 0, 240, 240, 20, WHITE if p is LIT else p["w"]) + charger_top(120, 120, 0.9, 0, p, lit_white=p is LIT)
        b += f'<g class="cbox" opacity="0">{g(cb, "translate(640,800) rotate(8)")}</g>'
        tag = rr(64, -10, 190, 104, 14, AMBER if p is LIT else "#7A6640") + f'<text x="159" y="64" {F} font-weight="900" font-size="56" fill="{NAVY_T}" text-anchor="middle">RM99</text>'
        b += f'<g class="tag" opacity="0">{g(tag, "translate(660,1060) rotate(-6)")}</g>'
        return f'<g class="slide">{b}</g>'
    patch = poly([(90, 470), (1000, 330), (1050, 1260), (140, 1400)], "#000")
    js = f"""
      tl.fromTo(Q(".slide"), {{ y: -1920 }}, {{ y: 0, duration: 0.6, ease: "io" }}, 0);
      tl.fromTo("#s5-clip polygon", {{ y: -1920 }}, {{ y: 0, duration: 0.6, ease: "io" }}, 0);
      // "one more sale": the charger's own box drops onto the table (top-down: falling reads as shrinking), the tag slides out
      tl.fromTo(Q(".cbox"), {{ opacity: 0, scale: 1.45, svgOrigin: "760 920" }}, {{ opacity: 1, scale: 1, duration: 0.45, ease: "power2.in" }}, at({t("L05", "One")} - 0.25));
      tl.fromTo(Q(".tag"), {{ opacity: 0, x: -60 }}, {{ opacity: 1, x: 0, duration: 0.4, ease: "io" }}, at({t("L05", "sale")}));
      // the light leaves the table: the end is the dark
      tl.to("#s5-clip polygon", {{ x: 1300, duration: 1.4, ease: "io" }}, at(29.5));
"""
    return scene("s5", two("s5", world, patch), js)

def build():
    os.makedirs(f"{HF}/compositions", exist_ok=True)
    for f in os.listdir(f"{HF}/compositions"): os.remove(f"{HF}/compositions/{f}")
    files = {"s1": s1(), "s2": s2(), "s3": s3(), "s4": s4(), "s5": s5()}
    files.update(h.overlays())
    for k, v in files.items(): open(f"{HF}/compositions/{k}.html", "w").write(v)
    hosts = "\n".join(f'      <div id="{n}" data-composition-id="{n}" data-composition-src="compositions/{n}.html" data-start="{a}" data-duration="{b - a:.3f}" '
                      f'data-track-index="{i + 1}" data-track-kind="graphics" data-width="1080" data-height="1920" style="z-index:{i + 1}"></div>' for i, (n, (a, b)) in enumerate(S.items()))
    over = "\n".join(f'      <div id="{n}" data-composition-id="{n}" data-composition-src="compositions/{n}.html" data-start="0" data-duration="{END}" '
                     f'data-track-index="{ti}" data-track-kind="{kind}" data-width="1080" data-height="1920" style="z-index:{z}"></div>'
                     for n, ti, kind, z in (("grain", 8, "graphics", 20), ("caps", 9, "captions", 30)))
    audio = '      <audio id="mix" class="clip" src="assets/mix.wav" data-start="0" data-duration="{END}" data-track-index="10" data-volume="1"></audio>'.replace("{END}", str(END)) if os.path.exists(f"{HF}/assets/mix.wav") else ""
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
      html, body {{ margin: 0; width: 1080px; height: 1920px; overflow: hidden; background: {DARK["ground"]}; }}
      #root {{ position: relative; width: 1080px; height: 1920px; }}
    </style>
  </head>
  <body>
    <!-- EX28 · generated by build/hf_ex28.py — edit there and rebuild -->
    <div id="root" data-composition-id="main" data-start="0" data-duration="{END}" data-fps="60" data-width="1080" data-height="1920">
{hosts}
{over}
{audio}
    </div>
    <script>
      window.__timelines["main"] = gsap.timeline({{ paused: true }});
    </script>
  </body>
</html>
""")
    print("built", list(S), "end", END)

if __name__ == "__main__":
    build()

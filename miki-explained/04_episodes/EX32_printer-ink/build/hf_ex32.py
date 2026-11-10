#!/usr/bin/env python3
"""EX32 The Ink Is the Business — Style B (BIBLE-B, flat-v3 playbook) → HyperFrames project in hf/.
   ~/.local/bin/uv run -q --offline --with pillow python build/hf_ex32.py      (from the episode folder)
No window light (user 2026-11-10: "chase new idea"): the light and the hand-offs come from the printer itself — each scene
is PRINTED IN by a print head (a cyan/magenta/yellow band sweeping down, the scene laid down behind it), and the ending is
the head sweeping back up, leaving blank paper. Palette from the product: paper grey, ink black, and the process inks
cyan / magenta / yellow as the only accents; magenta = the prices. Through-line: one black ink drop."""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import hfkit as h
t, END, HF = h.t, h.END, h.HF

PAPER, PAPER2, SHADE, INK, INK2, GREY, GREY2 = "#E8E4DB", "#DDD8CC", "#C9C2B4", "#17171C", "#2C2C34", "#D3CFC6", "#B4AEA2"
C, M, Y = "#00A2D8", "#E2187B", "#F5C400"
F = 'font-family="Inter Display"'
HP = open(f"{HF}/assets/hp.svg").read().split('<path d="')[1].split('"')[0]

def rr(x, y, w, h_, r, fill, extra=""): return f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h_:.1f}" rx="{r}" fill="{fill}" {extra}/>'
def g(body, tr="", cls="", extra=""): return f'<g {f"class={chr(34)}{cls}{chr(34)}" if cls else ""} {f"transform={chr(34)}{tr}{chr(34)}" if tr else ""} {extra}>{body}</g>'
def txt(x, y, s, size, fill, weight=900, anchor="middle", extra=""): return f'<text x="{x}" y="{y}" {F} font-weight="{weight}" font-size="{size}" fill="{fill}" text-anchor="{anchor}" {extra}>{s}</text>'
def hp(x, y, d, fill=INK): s = d / 32; return f'<g transform="translate({x},{y}) scale({s})"><path d="{HP}" fill="{fill}"/></g>'
def shadow(x, y, w, h_, r=18, dx=16, dy=18, fill=SHADE): return rr(x + dx, y + dy, w, h_, r, fill)

S = {"s1": (0.0, 6.2), "s2": (5.75, 13.2), "s3": (12.75, 18.95), "s4": (18.6, 22.65), "s5": (22.3, END)}

def scene(sid, body, js, bg=PAPER):
    start = S[sid][0]
    return f"""<template>
  <style>
    {h.FONTS}
    #root {{ position: absolute; inset: 0; overflow: hidden; }}
    #{sid}-w {{ position: absolute; inset: 0; overflow: hidden; background: {bg}; }}
    #{sid}-w svg.art {{ position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }}
    #{sid}-w .head {{ position: absolute; left: 0; width: 1080px; height: 46px; }}
  </style>
  <div id="root" data-composition-id="{sid}" data-width="1080" data-height="1920" data-layout-allow-overflow data-layout-allow-overlap>
    <div id="{sid}-w">
      <svg class="art" viewBox="0 0 1080 1920">{body}</svg>
      <div class="head" id="{sid}-head"><svg viewBox="0 0 1080 46" width="1080" height="46">{rr(0, 0, 1080, 14, 0, C)}{rr(0, 14, 1080, 14, 0, M)}{rr(0, 28, 1080, 14, 0, Y)}{rr(0, 42, 1080, 4, 0, INK)}</svg></div>
    </div>
  </div>
  <script>
    (() => {{
{h.PRELUDE}
      const T0 = {start};
      const Q = (s) => "#{sid}-w " + s;
      const at = (x) => +(x - T0).toFixed(3);
      // the print head lays the scene down, top to bottom (a scene's own entrance); `printOut` lifts it back off
      function printIn(a, d = 0.75, target = "#{sid}-w") {{
        tl.fromTo(target, {{ clipPath: "inset(0px 0px 1920px 0px)" }}, {{ clipPath: "inset(0px 0px 0px 0px)", duration: d, ease: "power1.inOut" }}, a);
        tl.fromTo("#{sid}-head", {{ y: -46, opacity: 1 }}, {{ y: 1920, duration: d, ease: "power1.inOut", immediateRender: false }}, a);
        tl.set("#{sid}-head", {{ opacity: 0 }}, a + d);
      }}
      gsap.set("#{sid}-head", {{ y: -46, opacity: 0 }});
{js}
      window.__timelines["{sid}"] = tl;
    }})();
  </script>
</template>
"""

# ---------------------------------------------------------------------------------------------------- the printer (front)
def printer(cx, cy, s=1.0, door_cls="door", tag=True):
    """front elevation, centre (cx, cy) of the body; door opens to show the two cartridges"""
    W_, H_ = 640 * s, 300 * s; x0, y0 = cx - W_ / 2, cy - H_ / 2
    b = shadow(x0, y0 - 40 * s, W_, H_ + 40 * s, 26 * s)
    b += rr(x0, y0 - 40 * s, W_, 70 * s, 22 * s, GREY2)                                       # scanner lid
    b += rr(x0 + 30 * s, y0 - 52 * s, W_ - 60 * s, 16 * s, 8 * s, GREY)                          # lid hinge strip
    b += rr(x0, y0, W_, H_, 26 * s, GREY)                                                        # body
    b += rr(x0 + 40 * s, y0 + 22 * s, W_ - 80 * s, 14 * s, 7 * s, INK2)                          # paper output slot
    b += rr(x0 + 120 * s, y0 + H_ - 34 * s, W_ - 240 * s, 18 * s, 9 * s, GREY2)                  # input tray lip
    # control panel (right) and status lights
    b += rr(x0 + W_ - 170 * s, y0 + 64 * s, 130 * s, 120 * s, 16 * s, GREY2)
    for i, c in enumerate((C, PAPER, PAPER)): b += f'<circle cx="{x0 + W_ - 142 * s + i * 38 * s:.1f}" cy="{y0 + 96 * s:.1f}" r="{11 * s:.1f}" fill="{c}"/>'
    b += rr(x0 + W_ - 156 * s, y0 + 128 * s, 102 * s, 36 * s, 8 * s, INK2)
    b += hp(x0 + 54 * s, y0 + 70 * s, 76 * s)                                                     # the real HP mark
    # the ink access door (front, centre): inside, the black and the tri-colour cartridge
    dx, dy, dw, dh = x0 + 170 * s, y0 + 64 * s, 270 * s, 150 * s
    inside = rr(dx, dy, dw, dh, 12 * s, INK2)
    inside += rr(dx + 30 * s, dy + 22 * s, 90 * s, 110 * s, 10 * s, INK) + rr(dx + 30 * s, dy + 22 * s, 90 * s, 26 * s, 8 * s, "#3B3B44")
    inside += rr(dx + 150 * s, dy + 22 * s, 90 * s, 110 * s, 10 * s, "#4A4A52")
    for i, c in enumerate((C, M, Y)): inside += rr(dx + 156 * s + i * 27 * s, dy + 92 * s, 22 * s, 30 * s, 4 * s, c)
    b += g(inside, cls="inside")
    b += g(rr(dx, dy, dw, dh, 12 * s, GREY2) + rr(dx + dw / 2 - 40 * s, dy + 18 * s, 80 * s, 10 * s, 5 * s, GREY), cls=door_cls)
    if tag:                                                                                      # the swing tag on its string
        tg = (f'<path d="M0 0 C 10 40, -6 80, 4 118" stroke="{INK2}" stroke-width="4" fill="none"/>' + rr(-82, 112, 190, 108, 16, "#B31163") +
              rr(-92, 104, 190, 108, 16, M) + f'<circle cx="4" cy="128" r="9" fill="{PAPER}"/>' + txt(4, 186, "RM268", 52, PAPER))
        b += g(tg, tr=f"translate({x0 + W_ - 40 * s:.1f},{y0 - 30 * s:.1f})", cls="tag")
    return b

# ======================================================================================== S1 · L01 the printer, RM268
def s1():
    P = rr(0, 1180, 1080, 740, 0, PAPER2) + rr(0, 1180, 1080, 20, 0, SHADE)                       # desk
    P += '<clipPath id="slotclip"><rect x="0" y="0" width="1080" height="880"/></clipPath>'
    P += g(g(rr(310, 600, 460, 600, 6, "#FBFAF6") + "".join(rr(360, 680 + i * 44, 360 - (i % 3) * 60, 12, 6, SHADE) for i in range(6)), cls="sheet"), extra='clip-path="url(#slotclip)"')   # the page feeding out of the slot
    P += printer(540, 1000)
    P += g(f'<path d="M0 0 C 14 18, 14 34, 0 50 C -14 34, -14 18, 0 0 Z" fill="{INK}"/>', tr="translate(620,1120)", cls="drop")   # the ink drop
    js = f"""
      // frame 1 already moving: a page feeds out of the printer
      tl.fromTo(Q(".sheet"), {{ y: 170 }}, {{ y: -60, duration: 2.4, ease: "power1.out" }}, 0);   // already part-way out on frame 1
      gsap.set(Q(".tag"), {{ transformOrigin: "0px 0px" }});
      tl.fromTo(Q(".tag"), {{ rotation: -60, opacity: 0 }}, {{ rotation: 6, opacity: 1, duration: 0.8, ease: spring(0.9, 9) }}, at({t("L01", "RM268")} - 0.2));
      // "the ink inside it": the access door drops open; the cartridges are lit
      gsap.set(Q(".door"), {{ transformOrigin: "50% 100%" }});
      tl.to(Q(".door"), {{ scaleY: 0.08, y: 6, duration: 0.45, ease: "power2.in" }}, at({t("L01", "expensive")} - 0.1));
      tl.fromTo(Q(".inside"), {{ opacity: 0.6 }}, {{ opacity: 1, duration: 0.3 }}, at({t("L01", "expensive")}));
      // "ink": a drop forms under the black cartridge and falls (it carries the cut into S2)
      gsap.set(Q(".drop"), {{ transformOrigin: "50% 0%", scale: 0 }});
      tl.to(Q(".drop"), {{ scale: 1, duration: 0.35, ease: "power2.out" }}, at({t("L01", "ink")}));
      tl.to(Q(".drop"), {{ y: 900, duration: 0.7, ease: "power2.in" }}, at(5.35));
"""
    return scene("s1", P, js)

# ======================================================================== S2 · L02 the cartridge: 8.5 ml · RM51 · RM6,000/l
def s2():
    cx, top, cw, ch = 540, 420, 420, 760
    cart = shadow(cx - cw / 2, top, cw, ch, 30) + rr(cx - cw / 2, top, cw, ch, 30, "#3B3B44")
    cart += rr(cx - cw / 2 + 36, top + 120, cw - 72, ch - 200, 18, INK2)                          # the cutaway window
    cart += g(rr(cx - cw / 2 + 36, top + 120, cw - 72, ch - 200, 18, INK), cls="ink")            # the ink
    cart += rr(cx - cw / 2, top, cw, 90, 30, "#4A4A52") + hp(cx - 34, top + 12, 68, "#E8E4DB")   # cap with the mark
    cart += txt(cx, top + ch - 34, "HP 682 · BLACK", 34, PAPER, 800)
    for i in range(9):                                                                           # a millilitre scale on the side
        yy = top + ch - 80 - i * 62; cart += rr(cx + cw / 2 - 30, yy, 30 if i % 2 == 0 else 18, 5, 2, PAPER)
    cart += g(rr(cx + cw / 2 + 14, top + 96, 210, 84, 14, PAPER) + txt(cx + cw / 2 + 119, top + 152, "8.5 ml", 46, INK), cls="ml")
    stick = f'<circle cx="0" cy="0" r="118" fill="#B31163"/><circle cx="-8" cy="-8" r="118" fill="{M}"/>' + txt(-8, 12, "RM51", 64, PAPER)
    cart += g(stick, tr=f"translate({cx - cw / 2 + 40},{top + 300})", cls="sticker")
    P = g(cart, cls="cart")
    # the 1-litre bottle (right), filled drop by drop, its label counting to RM6,000
    bx, by, bw, bh = 700, 560, 300, 640
    bott = shadow(bx, by, bw, bh, 40) + rr(bx, by + 90, bw, bh - 90, 40, "#F7F5EF") + rr(bx + 100, by, 100, 110, 16, "#F7F5EF") + rr(bx + 90, by - 20, 120, 34, 10, INK2)
    bott += f'<clipPath id="bclip"><rect x="{bx + 14}" y="{by + 104}" width="{bw - 28}" height="{bh - 118}" rx="30"/></clipPath>'
    bott += g(rr(bx + 14, by + 104, bw - 28, bh - 118, 30, INK), cls="fill", extra='clip-path="url(#bclip)"')
    bott += rr(bx + 30, by + 300, bw - 60, 210, 16, PAPER) + txt(bx + bw / 2, by + 360, "1 LITRE", 34, INK, 800)
    bott += txt(bx + bw / 2, by + 456, "RM0", 54, M, 900, extra='class="cnt"')
    P += g(bott, cls="bottle")
    for i in range(5): P += g(f'<path d="M0 0 C 10 13, 10 24, 0 36 C -10 24, -10 13, 0 0 Z" fill="{INK}"/>', tr="translate(0,0)", cls=f"d{i}")
    P += g(rr(0, 1920, 1080, 1920, 0, INK), cls="flood")                                         # the ink flood → S3's ground
    js = f"""
      printIn(0.0, 0.7);
      // "holds 8.5 ml": the scale's label; "RM51": the price sticker slaps on
      tl.fromTo(Q(".ml"), {{ x: 60, opacity: 0 }}, {{ x: 0, opacity: 1, duration: 0.4, ease: "io" }}, at({t("L02", "8.5")} - 0.1));
      gsap.set(Q(".sticker"), {{ transformOrigin: "50% 50%" }});
      tl.fromTo(Q(".sticker"), {{ scale: 1.6, opacity: 0, rotation: -20 }}, {{ scale: 1, opacity: 1, rotation: -8, duration: 0.25, ease: "power3.in" }}, at({t("L02", "RM51")} - 0.15));
      // "about RM6,000 a litre": the cartridge steps aside, the bottle prints in; drops fill it; the label counts
      gsap.set(Q(".cart"), {{ transformOrigin: "540px 800px" }});
      tl.to(Q(".cart"), {{ x: -250, y: 60, scale: 0.55, duration: 0.6, ease: "io" }}, at({t("L02", "That's")} - 0.3));
      tl.fromTo(Q(".bottle"), {{ opacity: 0, y: 40 }}, {{ opacity: 1, y: 0, duration: 0.45, ease: "io" }}, at({t("L02", "That's")} - 0.05));
      gsap.set(Q(".fill"), {{ svgOrigin: "850 1186", scaleY: 0 }});
      tl.to(Q(".fill"), {{ scaleY: 1, duration: 1.4, ease: "power1.inOut" }}, at({t("L02", "RM6,000")} - 0.1));
      for (let i = 0; i < 5; i++) {{
        gsap.set(Q(".d" + i), {{ x: 452, y: 700, opacity: 0 }});
        tl.fromTo(Q(".d" + i), {{ x: 452, y: 700, opacity: 1 }}, {{ x: 850, y: 600, duration: 0.32, ease: "power1.in", immediateRender: false }}, at({t("L02", "RM6,000")} - 0.15 + i * 0.26));
        tl.set(Q(".d" + i), {{ opacity: 0 }}, at({t("L02", "RM6,000")} + 0.17 + i * 0.26));
      }}
      const o = {{ v: 0 }}, els = document.querySelectorAll(Q(".cnt"));
      tl.fromTo(o, {{ v: 0 }}, {{ v: 6000, duration: 1.3, ease: "power1.inOut", onUpdate() {{ els.forEach((e) => (e.textContent = "RM" + Math.round(o.v).toLocaleString("en-US"))); }} }}, at({t("L02", "RM6,000")}));
      // hand-off: the ink rises past the bottle and fills the frame (S3's ground)
      tl.fromTo(Q(".flood"), {{ y: 0 }}, {{ y: -1920, duration: 0.7, ease: "power2.in" }}, at(12.45));
"""
    return scene("s2", P, js)

# ========================================================== S3 · L03 HP's printing money, top-down: a three-slot tray
def s3():
    tx, ty, tw, th = 110, 300, 860, 940
    P = shadow(tx, ty, tw, th, 34, 0, 26, "#000000") + rr(tx, ty, tw, th, 34, PAPER)
    sw = (tw - 80) / 3
    for i in range(3): P += rr(tx + 20 + i * (sw + 20), ty + 30, sw, th - 230, 20, PAPER2)
    P += rr(tx + 20, ty + th - 180, tw - 40, 150, 20, GREY)
    P += txt(tx + tw / 2, ty + th - 118, "HP PRINTING MONEY · FY2025", 34, INK, 800)
    P += txt(tx + 20 + sw + 10, ty + th - 50, "≈ ⅔  (65%)", 44, M, 900, extra='class="pct" opacity="0"')
    P += f'<g class="bracket" opacity="0">{rr(tx + 40, ty + th - 210, 2 * sw, 8, 4, M)}</g>'
    # ink and toner cartridges (top-down: bodies with coloured caps) for the two left slots; one printer for the right
    items = []
    for s_ in range(2):
        for r in range(4):
            col = [C, M, Y, INK2][(r + s_) % 4]; x = tx + 20 + s_ * (sw + 20) + 26; y = ty + 60 + r * 160
            items.append((f"it{s_}{r}", rr(x, y, sw - 52, 128, 14, "#3B3B44") + rr(x, y, 64, 128, 14, col) + (rr(x + 90, y + 50, sw - 170, 28, 8, "#55555E") if s_ == 1 else "")))
    for n, (cls, b) in enumerate(items): P += g(b, cls=f"it {cls}")
    px = tx + 20 + 2 * (sw + 20) + 20
    pr = rr(px, ty + 260, sw - 40, 200, 20, GREY2) + rr(px + 16, ty + 276, sw - 72, 50, 10, GREY) + hp(px + 20, ty + 372, 64)
    P += g(pr, cls="pr")
    P = g(P, cls="all")
    js = f"""
      // the ink ground is already here (S2's flood); the tray prints in
      printIn(0.05, 0.7, "#s3-w svg.art");
      // "ink and toner": cartridges drop into the two left slots (top-down: falling reads as shrinking), one after another
      document.querySelectorAll(Q(".it")).forEach((el) => {{ const b = el.getBBox(); gsap.set(el, {{ svgOrigin: `${{b.x + b.width / 2}} ${{b.y + b.height / 2}}` }}); }});
      tl.fromTo(Q(".it"), {{ scale: 1.5, opacity: 0 }}, {{ scale: 1, opacity: 1, duration: 0.3, ease: "power2.in", stagger: 0.07 }}, at({t("L03", "ink")} - 0.35));
      tl.to(Q(".bracket"), {{ opacity: 1, duration: 0.3 }}, at({t("L03", "toner")}));
      tl.to(Q(".pct"), {{ opacity: 1, duration: 0.3 }}, at({t("L03", "toner")} + 0.1));
      // "not printers": one printer drops into the last slot
      const pb = document.querySelector(Q(".pr")).getBBox(); gsap.set(Q(".pr"), {{ svgOrigin: `${{pb.x + pb.width / 2}} ${{pb.y + pb.height / 2}}` }});
      tl.fromTo(Q(".pr"), {{ scale: 1.5, opacity: 0 }}, {{ scale: 1, opacity: 1, duration: 0.3, ease: "power2.in" }}, at({t("L03", "not")} - 0.15));
      // hand-off: push into the printer in its slot until its grey is the next scene's printer
      tl.to(Q(".all"), {{ scale: 6, svgOrigin: `${{pb.x + pb.width / 2}} ${{pb.y + pb.height / 2}}`, duration: 0.6, ease: "power2.in" }}, at(18.2));
"""
    return scene("s3", P, js, bg=INK)

# ================================================================= S4 · L04 the bait: hooked, and every page pulls a coin
def s4():
    P = rr(0, 1240, 1080, 680, 0, PAPER2) + rr(0, 1240, 1080, 18, 0, SHADE)
    side = shadow(290, 860, 500, 300, 24) + rr(290, 860, 500, 300, 24, GREY) + rr(290, 820, 500, 60, 18, GREY2) + rr(760, 900, 30, 40, 6, INK2)
    side += rr(470, 812, 140, 12, 6, INK2)                                                       # the coin slot on top
    side += hp(320, 930, 70)
    side += f'<path d="M540 812 L 540 760" stroke="{INK2}" stroke-width="10" stroke-linecap="round"/>'   # handle the hook takes
    for i in range(3):   # behind the printer: pages come OUT of it, coins drop INTO its slot (nothing crosses its body)
        P += g(rr(790, 950, 360, 12, 6, "#FBFAF6") + rr(790, 950, 360, 200, 6, "#FBFAF6") + "".join(rr(820, 990 + k * 30, 260 - (k % 2) * 60, 9, 4, SHADE) for k in range(5)), cls=f"pg pg{i}")
        P += g(f'<circle cx="0" cy="0" r="54" fill="#B31163"/><circle cx="-5" cy="-5" r="54" fill="{M}"/>' + txt(-5, 14, "RM", 40, PAPER), cls=f"cn cn{i}")
    P += g(side, cls="pr")
    P += g(f'<path d="M540 -40 L 540 700" stroke="{INK2}" stroke-width="5"/><path d="M540 700 L 540 760 C 540 800, 590 800, 590 760" stroke="{INK2}" stroke-width="10" fill="none" stroke-linecap="round"/>', cls="line")
    js = f"""
      printIn(0.0, 0.6);
      // "the printer is the bait": a fishing line drops, the hook takes the handle, the printer lifts and dangles
      tl.fromTo(Q(".line"), {{ y: -820 }}, {{ y: 0, duration: 0.45, ease: "power2.out" }}, at({t("L04", "printer")} - 0.05));
      tl.to(Q(".line, .pr"), {{ y: -240, duration: 0.5, ease: "io" }}, at({t("L04", "bait")} - 0.15));
      gsap.set(Q(".line, .pr"), {{ svgOrigin: "540 -40" }});
      tl.to(Q(".line, .pr"), {{ rotation: 2.5, duration: 0.7, ease: "sine.inOut", yoyo: true, repeat: 3 }}, at({t("L04", "bait")} + 0.35));
      // "you keep paying with every page": a page slides out, and a coin drops into the slot — three times
      for (let i = 0; i < 3; i++) {{
        const a = at({t("L04", "You")} + 0.05) + i * 0.42;
        gsap.set(Q(".pg" + i), {{ x: -360, y: -240, opacity: 0 }});
        tl.fromTo(Q(".pg" + i), {{ x: -360, opacity: 1 }}, {{ x: 60 + i * 30, duration: 0.35, ease: "power2.out", immediateRender: false }}, a);
        gsap.set(Q(".cn" + i), {{ x: 540, y: -80, opacity: 0 }});
        tl.fromTo(Q(".cn" + i), {{ y: -80, opacity: 1 }}, {{ y: 640, duration: 0.3, ease: "power2.in", immediateRender: false }}, a + 0.1);   // into the slot, behind the top edge
        tl.set(Q(".cn" + i), {{ opacity: 0 }}, a + 0.4);
      }}
      // hand-off: the last page grows to fill the frame (S5 is printed on it)
      tl.to(Q(".pg2"), {{ scale: 6, x: -900, y: -2600, duration: 0.5, ease: "power2.in" }}, at(22.05));
"""
    return scene("s4", P, js)

# ==================================================== S5 · L05 bookend: the cheap printer, the tall stack of refills; erased
def s5():
    P = rr(0, 1180, 1080, 740, 0, PAPER2) + rr(0, 1180, 1080, 20, 0, SHADE)
    P += printer(330, 1050, 0.62, door_cls="door5")
    for i in range(9):
        x, y = 690, 1150 - (i + 1) * 92
        P += g(shadow(x, y, 260, 84, 12, 8, 8) + rr(x, y, 260, 84, 12, "#3B3B44") + rr(x, y, 70, 84, 12, [C, M, Y, INK2][i % 4]), cls=f"st st{i}")
    js = f"""
      printIn(0.0, 0.6);
      // "expensive refills": the stack builds, each cartridge landing on the one below
      for (let i = 0; i < 9; i++) tl.fromTo(Q(".st" + i), {{ y: -400, opacity: 0 }}, {{ y: 0, opacity: 1, duration: 0.22, ease: "power2.in" }}, at({t("L05", "Expensive")} - 0.1) + i * 0.09);
      // the end: the print head sweeps back up and lifts everything off, leaving the blank page
      tl.fromTo("#s5-w svg", {{ clipPath: "inset(0px 0px 0px 0px)" }}, {{ clipPath: "inset(0px 0px 1920px 0px)", duration: 1.0, ease: "power1.inOut" }}, at(25.9));
      tl.set("#s5-head", {{ opacity: 1, y: 1920 }}, at(25.9));
      tl.to("#s5-head", {{ y: -46, duration: 1.0, ease: "power1.inOut" }}, at(25.9));
"""
    return scene("s5", P, js)

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
    audio = f'      <audio id="mix" class="clip" src="assets/mix.wav" data-start="0" data-duration="{END}" data-track-index="10" data-volume="1"></audio>' if os.path.exists(f"{HF}/assets/mix.wav") else ""
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
    <!-- EX32 · generated by build/hf_ex32.py — edit there and rebuild -->
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

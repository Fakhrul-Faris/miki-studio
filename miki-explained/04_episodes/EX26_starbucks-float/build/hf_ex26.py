#!/usr/bin/env python3
"""EX26 plates build (route B): the user's five illustrated plates, used whole, with the camera move rendered by
build/plates.py; my vector overlays sit on top, pinned to the same camera (plate coordinates) or in screen space.
   python3 build/hf_ex26.py [depth|plain]    (from the episode folder)  ->  hf/index.html + hf/compositions/*.html
Then: cd hf && npx hyperframes check --json && npx hyperframes render --quality delivery --fps 60 -o ../export/EX26-Final.mp4
Hand-offs are made from the plates: phone glow -> phone glow (S1 -> S2), the paid coin becomes the crane's coin (S2 -> S3),
the window's light shafts wipe in the bar (S3 -> S4), the coin stack's glow becomes the lit café (S4 -> S5)."""
import json, os, shutil, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from cams import EP, FPS, SLOTS, END, t
sys.path.insert(0, os.path.join(EP, "../EX27_1111-fake-discount/build"))
import hf_build as h
h.EP = EP                                   # the shared EX15 captions read raea/captions60.json from this episode

VAR = sys.argv[1] if len(sys.argv) > 1 else "depth"
HF = f"{EP}/hf"
NAVY, INK, CREAM, AMBER, PAPER = "#16213E", "#2B2420", "#F4EBDD", "#F2A33A", "#F3EADB"
CAM = {s: json.load(open(f"{EP}/plates/{s}_cam.json")) for s in SLOTS}


def P(s, x, y):
    """preview px -> plate px for scene s"""
    f = CAM[s]["f"]; return round(x * f, 1), round(y * f, 1)


def screen(s, at, x, y):
    """where a preview point is on screen at film time `at` (plain camera)"""
    c = CAM[s]["cam"]; k = min(max(round((at - SLOTS[s][0]) * FPS), 0), len(c) - 1)
    cx, cy, sc = c[k]; px, py = P(s, x, y)
    return round(540 + (px - cx) * sc, 1), round(960 + (py - cy) * sc, 1)


PRELUDE = h.PRELUDE.split("// iris:")[0] + """
function rise(sel, at, stagger = 0.08) {
  tl.fromTo(sel, { yPercent: 115 }, { yPercent: 0, duration: 0.5, ease: "io", stagger }, at);
}
// the pinned layer follows the plate's camera, frame by frame (same path the plate video was rendered with)
function pin(sel, cam) {
  const el = document.querySelector(sel), o = { k: 0 };
  const put = () => { const c = cam[Math.min(cam.length - 1, Math.max(0, Math.round(o.k)))];
    el.style.transform = `matrix(${c[2]},0,0,${c[2]},${540 - c[0] * c[2]},${960 - c[1] * c[2]})`; };
  put();
  tl.fromTo(o, { k: 0 }, { k: cam.length - 1, duration: (cam.length - 1) / 60, ease: "none", onUpdate: put }, 0);
}
// a value counts up into an element's text
function count(sel, a, b, at, d, fmt) {
  const o = { v: a }, el = document.querySelector(sel);
  tl.fromTo(o, { v: a }, { v: b, duration: d, ease: "io", immediateRender: false, onUpdate() { el.textContent = fmt(o.v); } }, at);
}
"""

CSS = f"""
    #root {{ position: absolute; inset: 0; overflow: hidden; }}
    #SID-w {{ position: absolute; inset: 0; overflow: hidden; }}
    #SID-w video.plate {{ position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }}
    #SID-w .pin {{ position: absolute; left: 0; top: 0; width: 1px; height: 1px; transform-origin: 0 0; }}
    #SID-w .pin > * {{ position: absolute; }}
    #SID-w .t {{ font-family: "Inter Display"; white-space: nowrap; }}
    #SID-w .m {{ display: inline-block; overflow: hidden; vertical-align: top; padding: 0 0.03em 0.08em; margin-bottom: -0.08em; }}
    #SID-w .m > span {{ display: inline-block; }}
    #SID-w .glow {{ border-radius: 50%; mix-blend-mode: screen;
                    background: radial-gradient(circle, rgba(255,246,226,1.000) 0.0%, rgba(254,238,209,0.973) 4.8%, rgba(252,229,192,0.897) 9.5%, rgba(251,221,176,0.784) 14.2%, rgba(250,213,159,0.649) 19.0%, rgba(248,204,142,0.509) 23.8%, rgba(247,196,125,0.378) 28.5%, rgba(246,188,108,0.266) 33.2%, rgba(245,180,92,0.177) 38.0%, rgba(243,171,75,0.112) 42.8%, rgba(242,163,58,0.067) 47.5%, rgba(242,163,58,0.038) 52.2%, rgba(242,163,58,0.020) 57.0%, rgba(242,163,58,0.010) 61.8%, rgba(242,163,58,0.005) 66.5%, rgba(242,163,58,0.002) 71.2%, rgba(242,163,58,0.000) 76.0%); }}   /* bell falloff: no rings */
    #SID-w .fill {{ position: absolute; inset: 0; background: #FFF0D4; opacity: 0; }}
    #SID-w .coin {{ background: url(assets/coin.svg) center / 100% 100% no-repeat; filter: drop-shadow(0 0 12px rgba(242,163,58,.6)); }}
    #SID-w .pill {{ font-family: "Inter Display"; font-weight: 700; border-radius: 999px; white-space: nowrap; text-align: center; }}
"""


def scene(sid, body, js, css=""):
    a, b = SLOTS[sid.upper()]
    return f"""<template>
  <style>
    {h.FONTS}
    {CSS.replace("SID", sid)}
    {css}
  </style>
  <div id="root" data-composition-id="{sid}" data-width="1080" data-height="1920" data-layout-allow-overflow data-layout-allow-overlap>
    <div id="{sid}-w">
      <video id="{sid}-v" class="clip plate" src="assets/plates/{sid.upper()}.mp4" data-start="0" data-duration="{b - a:.3f}" data-track-index="0" muted playsinline></video>
{body}
    </div>
  </div>
  <script>
    (() => {{
{PRELUDE}
const T0 = {a};
{js}
      window.__timelines["{sid}"] = tl;
    }})();
  </script>
</template>
"""


def cam_js(S):
    return "const CAM = " + json.dumps([[round(c[0], 1), round(c[1], 1), round(c[2], 4)] for c in CAM[S]["cam"]]) + ";\n"


def L(S, x):
    return round(x - SLOTS[S][0], 3)


def glow_div(S, cid, x, y, r):
    px, py = P(S, x, y)
    return f'<div id="{cid}" class="glow" style="left:{px - r}px; top:{py - r}px; width:{2 * r}px; height:{2 * r}px; opacity:0;"></div>'


# ------------------------------------------------------------------ S1 · P1: Starbucks is holding US$1.75B of customers' money
def s1():
    S = "S1"; lx, ly = P(S, 342, 205); nx, ny = P(S, 342, 302); f = CAM[S]["f"]
    D = 104 * f; FS = 34 * f
    body = f"""      <div id="s1-pin" class="pin">
        <img id="s1-logo" src="assets/starbucks.png" style="left:{lx - D / 2:.1f}px; top:{ly - D / 2:.1f}px; width:{D:.1f}px; height:{D:.1f}px; mix-blend-mode:multiply; opacity:.94;">
        <div class="t" style="left:{nx - 400}px; top:{ny - FS * 0.62:.1f}px; width:800px; text-align:center; font-weight:900; font-size:{FS:.1f}px; line-height:1; letter-spacing:-0.01em; color:{INK}; mix-blend-mode:multiply;">
          <span class="m"><span id="s1-n">US$0.00B</span></span></div>
        {glow_div(S, "s1-glow", 553, 891, 120)}
      </div>
      <div id="s1-fill" class="fill"></div>"""
    js = cam_js(S) + f"""pin("#s1-pin", CAM);
tl.fromTo("#s1-logo", {{ opacity: .55, scale: 1.04 }}, {{ opacity: .94, scale: 1, duration: 0.9, ease: "io" }}, 0);
rise("#s1-n", {L(S, t("L01", "$1")) - 0.3});
count("#s1-n", 0, 1.75, {L(S, t("L01", "$1"))}, {t("L01", "billion") - t("L01", "$1") + 0.2:.2f}, v => "US$" + v.toFixed(2) + "B");
tl.fromTo("#s1-n", {{ scale: 1.06 }}, {{ scale: 1, duration: 0.5, ease: "io", immediateRender: false }}, {L(S, t("L01", "billion")) + 0.1});
// the dive: the right-hand customer's phone glow swells until it is the whole frame
tl.fromTo("#s1-glow", {{ opacity: 0, scale: 0.25 }}, {{ opacity: 1, scale: 1, duration: 0.28, ease: "io" }}, {L(S, 4.25)});
tl.fromTo("#s1-glow", {{ scale: 1 }}, {{ scale: 4.2, duration: 0.42, ease: "power2.in", immediateRender: false }}, {L(S, 4.53)});
tl.fromTo("#s1-fill", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.22, ease: "power1.in" }}, {L(S, 4.68)});
"""
    return scene("s1", body, js)


# ------------------------------------------------------------------ S2 · P2: top up = paying for coffee not ordered yet
def s2():
    S = "S2"; f = CAM[S]["f"]
    cx, cy = P(S, 192, 418); CW, CH = 116 * f, 176 * f          # the app card, beside him, pinned to the plate
    ph = P(S, 326, 513); cup = P(S, 435, 377)
    u = f                                                       # 1 preview px in plate px
    cup_path = (f"M{cup[0] - 13 * u:.1f},{cup[1] - 17 * u:.1f} L{cup[0] + 13 * u:.1f},{cup[1] - 17 * u:.1f} "
                f"L{cup[0] + 10 * u:.1f},{cup[1] + 21 * u:.1f} L{cup[0] - 10 * u:.1f},{cup[1] + 21 * u:.1f} Z")
    tag = P(S, 435, 335)
    body = f"""      <div id="s2-pin" class="pin">
        {glow_div(S, "s2-glow", 326, 513, 120)}
        <div id="s2-card" style="left:{cx - CW / 2:.1f}px; top:{cy - CH / 2:.1f}px; width:{CW:.1f}px; height:{CH:.1f}px; border-radius:{12 * u:.1f}px;
             background:{CREAM}; box-shadow: 0 {6 * u:.1f}px {24 * u:.1f}px rgba(0,0,0,.45); opacity:0;">
          <div class="t" style="position:absolute; left:0; width:100%; top:{26 * u:.1f}px; text-align:center; font-weight:700; font-size:{12.5 * u:.1f}px; letter-spacing:.14em; color:#7A6E62;">BALANCE</div>
          <div id="s2-bal" class="t" style="position:absolute; left:0; width:100%; top:{44 * u:.1f}px; text-align:center; font-weight:900; font-size:{25 * u:.1f}px; color:{NAVY};">RM0.00</div>
          <div id="s2-btn" class="pill" style="position:absolute; left:{14 * u:.1f}px; right:{14 * u:.1f}px; top:{112 * u:.1f}px; padding:{9 * u:.1f}px 0; font-size:{12 * u:.1f}px; letter-spacing:.12em; background:{AMBER}; color:{NAVY};">TOP UP</div>
        </div>
        <div id="s2-coin" class="coin" style="left:{ph[0] - 11 * u:.1f}px; top:{ph[1] - 11 * u:.1f}px; width:{22 * u:.1f}px; height:{22 * u:.1f}px; opacity:0;"></div>
        <svg style="left:0; top:0; width:{CAM[S]['w']}px; height:{CAM[S]['h']}px; overflow:visible;" viewBox="0 0 {CAM[S]['w']} {CAM[S]['h']}">
          <path id="s2-out" d="{cup_path}" fill="none" stroke="{AMBER}" stroke-width="{2.2 * u:.1f}" stroke-dasharray="{5 * u:.1f} {4 * u:.1f}" stroke-linejoin="round" opacity="0"/></svg>
        <div id="s2-tag" class="pill" style="left:{tag[0] - 70 * u:.1f}px; top:{tag[1] - 9 * u:.1f}px; width:{150 * u:.1f}px; font-size:{10 * u:.1f}px; letter-spacing:.12em; padding:{4 * u:.1f}px 0; background:{NAVY}; color:{CREAM}; opacity:0;">PAID · NOT ORDERED</div>
      </div>
      <div id="s2-fill" class="fill"></div>
      <div id="s2-big" class="coin" style="position:absolute; left:0; top:0; width:800px; height:800px; opacity:0;"></div>"""
    # the paid coin rises out of the shadow's cup and becomes the crane's coin (S3 opens inside it)
    bx, by = screen(S, 8.35, 435, 362)
    js = cam_js(S) + f"""pin("#s2-pin", CAM);
gsap.set("#s2-w", {{ opacity: 0 }}); tl.set("#s2-w", {{ opacity: 1 }}, {L(S, 4.9)});
tl.set("#s2-glow", {{ opacity: 1 }}, {L(S, 4.9)});
tl.fromTo("#s2-fill", {{ opacity: 1 }}, {{ opacity: 0, duration: 0.4, ease: "power1.out" }}, {L(S, 4.9)});
tl.fromTo("#s2-glow", {{ scale: 5 }}, {{ scale: 0.3, duration: 0.75, ease: "io" }}, {L(S, 4.9)});
tl.fromTo("#s2-glow", {{ opacity: 1 }}, {{ opacity: 0, duration: 0.35, ease: "io", immediateRender: false }}, {L(S, 5.35)});
tl.fromTo("#s2-card", {{ opacity: 0, scale: 0.9, y: {10 * u:.1f} }}, {{ opacity: 1, scale: 1, y: 0, duration: 0.6, ease: spring(0.6) }}, {L(S, 5.45)});
tl.fromTo("#s2-btn", {{ scale: 1 }}, {{ scale: 0.9, duration: 0.1, ease: "io", yoyo: true, repeat: 1 }}, {L(S, t("L02", "top")) - 0.05});
count("#s2-bal", 0, 50, {L(S, t("L02", "up"))}, 0.5, v => "RM" + v.toFixed(2));
// the coin leaves the phone on "pay" and lands in the shadow's cup on "coffee"
tl.fromTo("#s2-coin", {{ opacity: 0, scale: 0.4 }}, {{ opacity: 1, scale: 1, duration: 0.25, ease: "io" }}, {L(S, t("L02", "pay")) - 0.1});
tl.fromTo("#s2-coin", {{ x: 0, y: 0 }}, {{ x: {cup[0] - ph[0]:.1f}, y: {cup[1] - 26 * u - ph[1]:.1f}, duration: 0.85, ease: "io", immediateRender: false }}, {L(S, t("L02", "pay"))});
tl.fromTo("#s2-coin", {{ scale: 1 }}, {{ scale: 0.6, opacity: 0, duration: 0.25, ease: "power1.in", immediateRender: false }}, {L(S, t("L02", "pay")) + 0.8});
tl.fromTo("#s2-card", {{ opacity: 1 }}, {{ opacity: 0, y: {8 * u:.1f}, duration: 0.4, ease: "io", immediateRender: false }}, {L(S, t("L02", "coffee")) + 0.1});
// the cup only exists as a shadow: outline it on "haven't ordered"
tl.fromTo("#s2-out", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.3, ease: "io" }}, {L(S, t("L02", "haven't")) - 0.2});
tl.fromTo("#s2-out", {{ strokeDashoffset: 0 }}, {{ strokeDashoffset: {-36 * u:.1f}, duration: 1.2, ease: "none" }}, {L(S, t("L02", "haven't")) - 0.2});
tl.fromTo("#s2-tag", {{ opacity: 0, y: {6 * u:.1f} }}, {{ opacity: 1, y: 0, duration: 0.35, ease: "io" }}, {L(S, t("L02", "haven't")) - 0.1});
tl.to("#s2-tag, #s2-out", {{ opacity: 0, duration: 0.25, ease: "io" }}, {L(S, 8.5)});
gsap.set("#s2-big", {{ x: {bx - 400}, y: {by - 400}, scale: 0.035, scaleX: 0.035, rotation: 0 }});
tl.fromTo("#s2-big", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.15, ease: "io" }}, {L(S, 8.3)});
tl.fromTo("#s2-big", {{ x: {bx - 400}, y: {by - 400}, scaleX: 0.035, scaleY: 0.035, rotation: 0 }},
  {{ x: 140, y: 560, scaleX: 0.8, scaleY: 1, rotation: -33, duration: 0.5, ease: "power2.inOut", immediateRender: false }}, {L(S, 8.3)});
"""
    return scene("s2", body, js)


# ------------------------------------------------------------------ S3 · P3: until you spend it, the money works for Starbucks
def s3():
    S = "S3"; f = CAM[S]["f"]; ax, ay = P(S, 385, 646); D = 54 * f
    row = lambda k, lab, val: (f'<div style="position:absolute; left:48px; right:48px; top:{118 + k * 92}px; height:70px; border-top:2px dashed rgba(22,33,62,.25);">'
                               f'<div class="t" style="position:absolute; left:0; top:20px; font-weight:700; font-size:34px; letter-spacing:.1em; color:{NAVY};">{lab}</div>'
                               f'<div id="s3-v{k}" class="t" style="position:absolute; right:0; top:4px; font-weight:900; font-size:60px; color:#C9761A; transform:rotate(-6deg); opacity:0;">{val}</div></div>')
    body = f"""      <div id="s3-pin" class="pin">
        <img id="s3-logo" src="assets/starbucks.png" style="left:{ax - D / 2:.1f}px; top:{ay - D / 2:.1f}px; width:{D:.1f}px; height:{D:.1f}px; filter: drop-shadow(0 0 {10 * f:.0f}px rgba(242,163,58,.55)); opacity:0;">
      </div>
      <div id="s3-slip" style="position:absolute; left:200px; top:150px; width:680px; height:330px; background:{PAPER}; border-radius:6px;
           box-shadow: 0 18px 50px rgba(0,0,0,.45); transform: rotate(-2.5deg); opacity:0;">
        <div class="t" style="position:absolute; left:48px; top:46px; font-weight:900; font-size:40px; letter-spacing:.06em; color:{NAVY};">LOAN · FROM YOU</div>
        {row(0, "INTEREST", "0%")}{row(1, "DUE DATE", "NONE")}
      </div>"""
    js = cam_js(S) + f"""pin("#s3-pin", CAM);
{{ const w = document.querySelector("#s3-w"), o = {{ r: 0 }}, a = -33 * Math.PI / 180;
  const put = () => {{ const pts = []; for (let k = 0; k < 72; k++) {{ const u = k / 72 * 2 * Math.PI, x = 0.8 * o.r * Math.cos(u), y = o.r * Math.sin(u);
      pts.push(`${{(540 + x * Math.cos(a) - y * Math.sin(a)).toFixed(1)}}px ${{(960 + x * Math.sin(a) + y * Math.cos(a)).toFixed(1)}}px`); }}
    w.style.clipPath = o.r > 2400 ? "none" : `polygon(${{pts.join(",")}})`; }};
  put();
  tl.fromTo(o, {{ r: 0 }}, {{ r: 330, duration: 0.2, ease: "io", onUpdate: put }}, {L(S, 8.76)});
  tl.fromTo(o, {{ r: 330 }}, {{ r: 2500, duration: 0.5, ease: "io", onUpdate: put, immediateRender: false }}, {L(S, 9.0)}); }}
tl.fromTo("#s3-logo", {{ opacity: 0, scale: 0.4 }}, {{ opacity: 1, scale: 1, duration: 0.7, ease: spring(0.7) }}, {L(S, t("L03", "starbucks")) - 0.15});
tl.fromTo("#s3-slip", {{ opacity: 0, y: -420 }}, {{ opacity: 1, y: 0, duration: 0.7, ease: spring(0.7) }}, {L(S, t("L03", "no")) - 0.45});
tl.fromTo("#s3-v0", {{ opacity: 0, scale: 1.5 }}, {{ opacity: 1, scale: 1, duration: 0.22, ease: "power2.out" }}, {L(S, t("L03", "interest"))});
tl.fromTo("#s3-v1", {{ opacity: 0, scale: 1.5 }}, {{ opacity: 1, scale: 1, duration: 0.22, ease: "power2.out" }}, {L(S, t("L03", "due"))});
tl.to("#s3-slip", {{ opacity: 0, y: -60, duration: 0.4, ease: "io" }}, {L(S, 13.0)});
"""
    return scene("s3", body, js)


# ------------------------------------------------------------------ S4 · P4: never spent; in 2025 forgotten balances earned US$220M
PHONES = [(130, 600, "$4.60"), (320, 548, "$11.20"), (428, 515, "$2.35"), (506, 492, "$7.80"), (568, 472, "$18.60")]
STACK = (605, 412)

def s4():
    S = "S4"; f = CAM[S]["f"]; u = f
    pills, coins = [], []
    for i, (x, y, v) in enumerate(PHONES):
        px, py = P(S, x, y - 24)
        pills.append(f'<div id="s4-p{i}" class="pill" style="left:{px - 34 * u:.1f}px; top:{py - 9 * u:.1f}px; width:{68 * u:.1f}px; padding:{3 * u:.1f}px 0; font-size:{11 * u:.1f}px; '
                     f'background:rgba(22,33,62,.82); color:{AMBER}; opacity:0;">{v}</div>')
        cx, cy = P(S, x, y)
        coins.append(f'<div id="s4-c{i}" class="coin" style="left:{cx - 8 * u:.1f}px; top:{cy - 8 * u:.1f}px; width:{16 * u:.1f}px; height:{16 * u:.1f}px; opacity:0;"></div>')
    lx, ly = P(S, STACK[0] - 26, STACK[1] - 50)
    body = f"""      <div id="s4-pin" class="pin">
        {''.join(pills)}{''.join(coins)}
        {glow_div(S, "s4-glow", *STACK, 110)}
        <div class="t" style="left:{lx - 600:.1f}px; top:{ly - 26 * u:.1f}px; width:600px; text-align:right; font-weight:900; font-size:{30 * u:.1f}px; color:{CREAM};
             text-shadow: 0 {2 * u:.1f}px {12 * u:.1f}px rgba(10,14,30,.8);"><span class="m"><span id="s4-n">+US$0M</span></span></div>
      </div>
      <div class="t" style="position:absolute; left:70px; top:170px; font-weight:900; font-size:230px; line-height:1; color:{CREAM}; opacity:.92; text-shadow: 0 8px 40px rgba(10,14,30,.55);">
        <span class="m"><span id="s4-yr">2025</span></span></div>
      <div id="s4-fill" class="fill"></div>"""
    js = cam_js(S) + f"""pin("#s4-pin", CAM);
// the window's light shafts wipe the bar in
{{ const w = document.querySelector("#s4-w"), K = Math.tan(28 * Math.PI / 180), Y0 = -260, Y1 = 2180, YB = 2400;
  const st = [0, 1, 2, 3, 4, 5, 6, 7].map(i => ({{ x: -560 + i * 330, h: 0 }}));
  const put = () => {{ const p = [];
    st.forEach(s => {{ const xt = s.x + (Y0 - 960) * K, xb = s.x + (Y1 - 960) * K;
      p.push(`${{xb - s.h}}px ${{YB}}px`, `${{xb - s.h}}px ${{Y1}}px`, `${{xt - s.h}}px ${{Y0}}px`, `${{xt + s.h}}px ${{Y0}}px`, `${{xb + s.h}}px ${{Y1}}px`, `${{xb + s.h}}px ${{YB}}px`); }});
    w.style.clipPath = st[st.length - 1].h >= 166 ? "none" : `polygon(${{p.join(",")}})`; }};
  put();
  st.forEach((s, i) => tl.fromTo(s, {{ h: 0 }}, {{ h: 166, duration: 0.45, ease: "io", onUpdate: put }}, 0.05 * i)); }}
{chr(10).join(f'tl.fromTo("#s4-p{i}", {{ opacity: 0, y: {6 * u:.1f} }}, {{ opacity: 1, y: 0, duration: 0.35, ease: "io" }}, {L(S, t("L04", "never")) + 0.12 * i:.2f});' for i in range(5))}
rise("#s4-yr", {L(S, t("L04", "2025")) - 0.1});
tl.to("#s4-yr", {{ opacity: 0, duration: 0.4, ease: "io" }}, {L(S, t("L04", "earned")) - 0.3});
// earned: every forgotten balance slides down the counter into Starbucks' stack
{chr(10).join(f'''tl.set("#s4-c{i}", {{ opacity: 1 }}, {L(S, t("L04", "earned")) + 0.08 * i:.2f});
tl.fromTo("#s4-c{i}", {{ x: 0, y: 0 }}, {{ x: {P(S, *STACK)[0] - P(S, x, y)[0]:.1f}, y: {P(S, *STACK)[1] + 30 * u - P(S, x, y)[1]:.1f}, duration: 0.9, ease: "io" }}, {L(S, t("L04", "earned")) + 0.08 * i:.2f});
tl.to("#s4-c{i}", {{ opacity: 0, duration: 0.15 }}, {L(S, t("L04", "earned")) + 0.08 * i + 0.85:.2f});
tl.to("#s4-p{i}", {{ opacity: 0, duration: 0.3 }}, {L(S, t("L04", "earned")) + 0.08 * i:.2f});''' for i, (x, y, _) in enumerate(PHONES))}
rise("#s4-n", {L(S, t("L04", "$220")) - 0.35});
count("#s4-n", 0, 220, {L(S, t("L04", "$220")) - 0.25}, 0.8, v => "+US$" + Math.round(v) + "M");
tl.to("#s4-n", {{ opacity: 0, duration: 0.3, ease: "io" }}, {L(S, 19.8)});
// the dive into the stack's glow
tl.fromTo("#s4-glow", {{ opacity: 0, scale: 0.3 }}, {{ opacity: 1, scale: 1, duration: 0.37, ease: "io" }}, {L(S, 19.75)});
tl.fromTo("#s4-glow", {{ scale: 1 }}, {{ scale: 4.5, duration: 0.42, ease: "power2.in", immediateRender: false }}, {L(S, 20.12)});
tl.fromTo("#s4-fill", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.22, ease: "power1.in" }}, {L(S, 20.28)});
"""
    return scene("s4", body, js)


# ------------------------------------------------------------------ S5 · P5: next time the app asks you to top up, ask who's lending to whom
def s5():
    S = "S5"; f = CAM[S]["f"]; u = f
    sg = P(S, 550, 650); D = 34 * f
    ph = P(S, 252, 636); card = P(S, 330, 560)
    a0, a1 = P(S, 262, 615), P(S, 545, 668)
    ctl = (round((a0[0] + a1[0]) / 2, 1), round(min(a0[1], a1[1]) - 120 * u, 1))
    arc = f"M{a0[0]},{a0[1]} Q{ctl[0]},{ctl[1]} {a1[0]},{a1[1]}"
    you, them = P(S, 262, 682), P(S, 550, 700)
    body = f"""      <div id="s5-pin" class="pin">
        {glow_div(S, "s5-glow", 550, 716, 110)}
        <img id="s5-logo" src="assets/starbucks.png" style="left:{sg[0] - D / 2:.1f}px; top:{sg[1] - D / 2:.1f}px; width:{D:.1f}px; height:{D:.1f}px; filter: drop-shadow(0 0 {8 * f:.0f}px rgba(242,163,58,.7));">
        <div id="s5-card" style="left:{card[0] - 62 * u:.1f}px; top:{card[1] - 33 * u:.1f}px; width:{124 * u:.1f}px; height:{66 * u:.1f}px; border-radius:{9 * u:.1f}px; background:{CREAM};
             box-shadow: 0 {4 * u:.1f}px {18 * u:.1f}px rgba(0,0,0,.5); opacity:0;">
          <div class="t" style="position:absolute; left:0; width:100%; top:{10 * u:.1f}px; text-align:center; font-weight:900; font-size:{15 * u:.1f}px; color:{NAVY};">Top up RM50?</div>
          <div id="s5-btn" class="pill" style="position:absolute; left:{14 * u:.1f}px; right:{14 * u:.1f}px; top:{35 * u:.1f}px; padding:{5 * u:.1f}px 0; font-size:{13 * u:.1f}px; letter-spacing:.12em; background:{AMBER}; color:{NAVY};">TOP UP</div>
        </div>
        <svg style="left:0; top:0; width:{CAM[S]['w']}px; height:{CAM[S]['h']}px; overflow:visible;" viewBox="0 0 {CAM[S]['w']} {CAM[S]['h']}">
          <path id="s5-arc" d="{arc}" fill="none" stroke="{AMBER}" stroke-width="{2.4 * u:.1f}" stroke-linecap="round" opacity="0"/></svg>
        {''.join(f'<div id="s5-c{i}" class="coin" style="left:{-7 * u:.1f}px; top:{-7 * u:.1f}px; width:{14 * u:.1f}px; height:{14 * u:.1f}px; opacity:0;"></div>' for i in range(3))}
        <div id="s5-you" class="pill" style="left:{you[0] - 54 * u:.1f}px; top:{you[1]:.1f}px; width:{108 * u:.1f}px; padding:{3 * u:.1f}px 0; font-size:{13 * u:.1f}px; letter-spacing:.14em; background:{AMBER}; color:{NAVY}; opacity:0;">LENDER</div>
        <div id="s5-them" class="pill" style="left:{them[0] - 64 * u:.1f}px; top:{them[1]:.1f}px; width:{128 * u:.1f}px; padding:{3 * u:.1f}px 0; font-size:{13 * u:.1f}px; letter-spacing:.14em; background:{CREAM}; color:{NAVY}; opacity:0;">BORROWER</div>
      </div>
      <div id="s5-fill" class="fill"></div>
      <div id="s5-end" style="position:absolute; inset:0; background:{NAVY}; opacity:0;"></div>
      <img id="s5-mk" src="assets/logo.png" style="position:absolute; left:{540 - 141}px; top:{780 - 180}px; height:360px; opacity:0;">
      <div class="t" style="position:absolute; left:0; width:1080px; top:1110px; text-align:center; font-weight:900; font-size:60px; color:{CREAM};"><span class="m"><span id="s5-f">FOLLOW FOR MORE</span></span></div>"""
    fol = t("L05", "follow"); ASK = L(S, t("L05", "ask", 1))   # nth=1: "asks" comes first
    js = cam_js(S) + f"""pin("#s5-pin", CAM);
gsap.set("#s5-w", {{ opacity: 0 }}); tl.set("#s5-w", {{ opacity: 1 }}, {L(S, 20.52)});
tl.set("#s5-glow", {{ opacity: 1 }}, {L(S, 20.52)});
tl.fromTo("#s5-fill", {{ opacity: 1 }}, {{ opacity: 0, duration: 0.4, ease: "power1.out" }}, {L(S, 20.52)});
tl.fromTo("#s5-glow", {{ scale: 5 }}, {{ scale: 0.6, duration: 0.7, ease: "io" }}, {L(S, 20.52)});
tl.fromTo("#s5-glow", {{ opacity: 1 }}, {{ opacity: 0, duration: 0.4, ease: "io", immediateRender: false }}, {L(S, 20.95)});
tl.fromTo("#s5-card", {{ opacity: 0, scale: 0.85 }}, {{ opacity: 1, scale: 1, duration: 0.55, ease: spring(0.55) }}, {L(S, t("L05", "asks")) - 0.1});
tl.fromTo("#s5-btn", {{ scale: 1 }}, {{ scale: 1.08, duration: 0.18, ease: "io", yoyo: true, repeat: 1 }}, {L(S, t("L05", "top")) - 0.05});
tl.to("#s5-card", {{ opacity: 0, duration: 0.3, ease: "io" }}, {ASK - 0.2});
// who's lending to whom: your money arcs across the street into the Starbucks sign
{{ const arc = document.querySelector("#s5-arc"), n = arc.getTotalLength();
  gsap.set(arc, {{ strokeDasharray: n, strokeDashoffset: n, opacity: 0.85 }});
  tl.fromTo(arc, {{ strokeDashoffset: n }}, {{ strokeDashoffset: 0, duration: 0.9, ease: "io" }}, {ASK}); }}
{{ const A = [{a0[0]}, {a0[1]}], C = [{ctl[0]}, {ctl[1]}], B = [{a1[0]}, {a1[1]}];
  const q = (p) => [(1 - p) * (1 - p) * A[0] + 2 * (1 - p) * p * C[0] + p * p * B[0], (1 - p) * (1 - p) * A[1] + 2 * (1 - p) * p * C[1] + p * p * B[1]];
  [0, 1, 2].forEach(i => {{ const o = {{ p: 0 }}, el = document.querySelector("#s5-c" + i);
    const put = () => {{ const [x, y] = q(o.p); el.style.transform = `translate(${{x}}px, ${{y}}px)`; }};
    put();
    tl.set(el, {{ opacity: 1 }}, {ASK} + 0.18 * i);
    tl.fromTo(o, {{ p: 0 }}, {{ p: 1, duration: 0.9, ease: "io", onUpdate: put }}, {ASK} + 0.18 * i);
    tl.to(el, {{ opacity: 0, duration: 0.12 }}, {ASK} + 0.85 + 0.18 * i);
  }});
}}
tl.fromTo("#s5-you", {{ opacity: 0, y: {5 * u:.1f} }}, {{ opacity: 1, y: 0, duration: 0.35, ease: "io" }}, {L(S, t("L05", "lending"))});
tl.fromTo("#s5-them", {{ opacity: 0, y: {5 * u:.1f} }}, {{ opacity: 1, y: 0, duration: 0.35, ease: "io" }}, {L(S, t("L05", "whom"))});
// end card (silent): the night closes to navy, Meikigo
tl.fromTo("#s5-end", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.5, ease: "io" }}, {L(S, fol) - 0.1});
tl.fromTo("#s5-mk", {{ opacity: 0, scale: 0.6 }}, {{ opacity: 1, scale: 1, duration: 0.9, ease: spring(0.9) }}, {L(S, fol) + 0.3});
rise("#s5-f", {L(S, fol) + 0.6});
"""
    return scene("s5", body, js)


COIN = open(f"{EP}/build/coin.svg").read()

GRAIN = """<template>
  <style> #root { position: absolute; inset: 0; pointer-events: none; } #grain-in svg { position: absolute; inset: 0; width: 1080px; height: 1920px; mix-blend-mode: overlay; opacity: 0; } </style>
  <div id="root" data-composition-id="grain" data-width="1080" data-height="1920" data-layout-ignore><div id="grain-in">
""" + "".join(f"""    <svg viewBox="0 0 1080 1920"><filter id="g{k}"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="{26 + k * 7}"/><feColorMatrix type="saturate" values="0"/></filter>
      <rect width="1080" height="1920" filter="url(#g{k})" opacity=".22"/></svg>
""" for k in range(4)) + f"""  </div></div>
  <script>
    (() => {{
      const tl = gsap.timeline({{ paused: true }}), g = document.querySelectorAll("#grain-in svg"), o = {{ t: 0 }};
      const put = () => {{ const k = Math.floor(o.t * 12) % 4; g.forEach((s, i) => s.style.opacity = i === k ? .5 : 0); }};
      put();
      tl.fromTo(o, {{ t: 0 }}, {{ t: {END}, duration: {END}, ease: "none", onUpdate: put }}, 0);   // grain at 12 fps, like film
      window.__timelines["grain"] = tl;
    }})();
  </script>
</template>
"""


def build():
    os.makedirs(f"{HF}/compositions", exist_ok=True); os.makedirs(f"{HF}/assets/plates", exist_ok=True)
    for f in os.listdir(f"{HF}/compositions"): os.remove(f"{HF}/compositions/{f}")
    for s in SLOTS: shutil.copyfile(f"{EP}/plates/{s}_{VAR}.mp4", f"{HF}/assets/plates/{s}.mp4")
    shutil.copyfile(f"{EP}/raea/media/mix.wav", f"{HF}/assets/mix.wav")
    open(f"{HF}/assets/coin.svg", "w").write(COIN)
    files = {"s1": s1(), "s2": s2(), "s3": s3(), "s4": s4(), "s5": s5(), "caps": h.overlays()["caps"], "grain": GRAIN}
    for k, v in files.items(): open(f"{HF}/compositions/{k}.html", "w").write(v)
    hosts = "\n".join(f'      <div id="s{i + 1}" data-composition-id="s{i + 1}" data-composition-src="compositions/s{i + 1}.html" data-start="{a}" data-duration="{b - a:.3f}" '
                      f'data-track-index="{i + 1}" data-track-kind="graphics" data-width="1080" data-height="1920" style="z-index:{i + 1}"></div>'
                      for i, (a, b) in enumerate(SLOTS.values()))
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
      html, body {{ margin: 0; width: 1080px; height: 1920px; overflow: hidden; background: {NAVY}; }}
      #root {{ position: relative; width: 1080px; height: 1920px; }}
    </style>
  </head>
  <body>
    <!-- EX26 plates build ({VAR}) · generated by build/hf_ex26.py — edit there and rebuild -->
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
    print("EX26 built:", VAR, dict(SLOTS), "end", END)


if __name__ == "__main__":
    build()

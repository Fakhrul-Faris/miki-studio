#!/usr/bin/env python3
"""EX27 editorial-vector pilot -> HyperFrames project in hf/ (index.html + compositions/*.html).
   python3 build/hf_build.py   (from the episode folder)
Vector parts come from vec/parts/F{i}.svg (vec/split.py); every time comes from audio/vo_timeline.json."""
import json, os, re

EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HF = f"{EP}/hf"
TL = json.load(open(f"{EP}/audio/vo_timeline.json"))
W = TL["words"]
END = round(TL["end"] + 0.6, 2)

def t(line, frag, nth=0):
    """time of the nth word in a line that contains frag"""
    hits = [x[1] for x in W[line] if frag.lower() in x[0].lower()]
    return round(hits[nth], 3)

O, NAVY, CREAM, LILAC, RED = "#E8692A", "#1B2A4E", "#F6EAD7", "#9C8CF0", "#FF3B30"

def parts(i):
    """the hand-drawn frame's named groups (vec/draw/F{i}.svg; F2/F4 come from vec/draw/make.py)"""
    s = open(f"{EP}/vec/draw/F{i}.svg").read(); out = {}
    for m in re.finditer(rf'<g id="F{i}-(\w+)"', s):
        depth = 0
        for n in re.finditer(r"<g[\s>]|</g>", s[m.start():]):
            depth += 1 if n.group(0).startswith("<g") else -1
            if depth == 0: out[m.group(1)] = s[m.start():m.start() + n.end()]; break
    d = re.search(r"<defs>.*?</defs>", s, re.S); out["defs"] = d.group(0) if d else ""
    return out

# ---- scene slots: each scene starts 0.1 s before its first word (the iris), and stays 1 s under the next one
CUTS = [0, t("L02", "here") - 0.1, t("L02", "right") - 0.1, t("L03", "then") - 0.1, t("L04", "in") - 0.1,
        t("L05", "so") - 0.1, END]
SLOT = [(round(CUTS[k], 3), round((CUTS[k + 1] + (1.0 if k < 5 else 0)) - CUTS[k], 3)) for k in range(6)]

# the Ring through the film: (start, cx, cy, r); each move is 0.5 s ease-in-out
RING = [(9.0, 860, 780, 170), (12.62, 830, 440, 175), (16.95, 773, 1079, 190), (18.45, 773, 1109, 180),
        (22.55, 553, 1025, 235), (29.6, 705, 1160, 110), (30.75, 760, 660, 200), (34.45, 540, 820, 300)]
RING0 = (540, 760, 280)

def ring_at(at):
    """ring centre/radius at absolute time (after any move that has finished)"""
    c = RING0
    for s, x, y, r in RING:
        if s + 0.5 <= at: c = (x, y, r)
    return c

FONTS = "".join(f"""@font-face {{ font-family: "Inter Display"; font-weight: {w}; src: url("assets/fonts/InterDisplay-{n}.ttf"); }}
""" for w, n in ((500, "Medium"), (700, "Bold"), (900, "Black")))

PRELUDE = """
const tl = gsap.timeline({ paused: true });
CustomEase.create("io", "0.65,0,0.35,1");
CustomEase.create("fall", "0.55,0,1,0.45");
// critically damped spring (stiffness 170, damping 26, mass 1): arrives with weight, no bounce
const spring = (d = 0.8, w = 13.04) => { const e = 1 - (1 + w * d) * Math.exp(-w * d); return (p) => (1 - (1 + w * p * d) * Math.exp(-w * p * d)) / e; };
// organic camera: each layer drifts on two offset sines (7.3 s, 11.9 s); k = depth (0 far .. 1 near)
function drift(layers, dur, t0) {
  const o = { t: 0 }, P = Math.PI * 2;
  layers.forEach(([sel]) => gsap.set(sel, { transformOrigin: "50% 50%" }));
  tl.fromTo(o, { t: 0 }, { t: dur, duration: dur, ease: "none", onUpdate() {
    const s = o.t + t0;
    layers.forEach(([sel, k]) => gsap.set(sel, {
      x: k * (8 * Math.sin(P * s / 7.3) + 6 * Math.sin(P * s / 11.9 + 1.3)),
      y: k * (6 * Math.cos(P * s / 7.3 + 0.7) + 5 * Math.sin(P * s / 11.9)),
      rotation: k * 0.4 * Math.sin(P * s / 11.9 + 0.4) }));
  } }, 0);
}
// iris: opens to the Ring first (the contents swap inside it), then to the whole frame
function iris(sel, cx, cy, r) {
  tl.fromTo(sel, { clipPath: `circle(0px at ${cx}px ${cy}px)` }, { clipPath: `circle(${r}px at ${cx}px ${cy}px)`, duration: 0.35, ease: "io" }, 0)
    .fromTo(sel, { clipPath: `circle(${r}px at ${cx}px ${cy}px)` }, { clipPath: `circle(2300px at ${cx}px ${cy}px)`, duration: 0.5, ease: "io", immediateRender: false }, 0.45);
}
// kinetic type: a word rises out of its mask, tracking tightens +4% -> 0
function rise(sel, at, stagger = 0.1) {
  tl.fromTo(sel, { yPercent: 115, scaleX: 1.04 }, { yPercent: 0, scaleX: 1, duration: 0.5, ease: "io", stagger }, at);
}
function sink(sel, at, stagger = 0.06) {
  tl.fromTo(sel, { yPercent: 0 }, { yPercent: -115, duration: 0.45, ease: "io", stagger, immediateRender: false }, at);
}
// a key number counts, then settles 1.08 -> 1.00
function count(sel, a, b, at, d = 0.6, pre = "RM") {
  const o = { v: a }, el = document.querySelector(sel);
  tl.fromTo(o, { v: a }, { v: b, duration: d, ease: "io", immediateRender: false, onUpdate() { el.textContent = pre + Math.round(o.v); } }, at);
  tl.fromTo(sel, { scale: 1.08 }, { scale: 1, duration: 0.5, ease: "io", immediateRender: false }, at + d - 0.1);
}
"""

def W_(text, cls="w"):
    """words wrapped in masks for rise()"""
    return " ".join(f'<span class="m"><span class="{cls}">{x}</span></span>' for x in text.split())

def scene(k, body, js, css=""):
    sid = f"s{k}"; start, dur = SLOT[k - 1]
    # the host id isn't on the page once mounted: scope everything to the scene's own wrapper
    return _scene(sid, start, body, js, css).replace(f"#{sid} ", f"#{sid}-iris ")

def _scene(sid, start, body, js, css):
    return f"""<template>
  <style>
    {FONTS}
    #root {{ position: absolute; inset: 0; overflow: hidden; }}
    #{sid}-iris {{ position: absolute; inset: 0; overflow: hidden; }}
    #{sid}-cam {{ position: absolute; inset: 0; }}
    #{sid} svg.art {{ position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }}
    #{sid} .head {{ position: absolute; font-family: "Inter Display"; font-weight: 900; color: {CREAM}; line-height: 1.02; letter-spacing: -0.01em; }}
    #{sid} .m {{ display: inline-block; overflow: hidden; vertical-align: top; padding: 0 0.02em 0.06em; margin-bottom: -0.06em; }}
    #{sid} .m > span {{ display: inline-block; }}
    #{sid} .lab {{ position: absolute; font-family: "Inter Display"; text-align: center; white-space: nowrap; }}
    {css}
  </style>
  <div id="root" data-composition-id="{sid}" data-width="1080" data-height="1920" data-layout-allow-overflow data-layout-allow-overlap>
    <div id="{sid}-iris"><div id="{sid}-cam">
{body}
    </div></div>
  </div>
  <script>
    (() => {{
{PRELUDE}
const T0 = {start};   // this scene's start in the film; times below are film times minus T0
{js}
      window.__timelines["{sid}"] = tl;
    }})();
  </script>
</template>
"""

def L(x):  # film time -> scene-local time for the scene being built
    return round(x - CUR[0], 3)
CUR = [0]

def overlays():
    """EX15 captions + grain: shared by every EX27 build"""
    files = {}
    # ---------- captions (EX15: centred lines on their own width, the panel grows with the words)
    caps = json.load(open(f"{EP}/raea/captions60.json"))
    # user 2026-11-08: captions took too much of the screen -> 36 px (widths were measured at 46 px; they scale linearly)
    SIZE, MAXW, BOTTOM, PADX, PADY = 36, 640, 1420, 22, 14
    for b in caps:
        for wd in b["words"]: wd["width"] = wd["width"] * SIZE / 46
    LH, SP = round(SIZE * 1.34), SIZE * 0.27
    html, js = [], []
    for bi, b in enumerate(caps):
        lines, lw = [[]], [0]
        for i, wd in enumerate(b["words"]):
            add = (SP if lines[-1] else 0) + wd["width"]
            if lines[-1] and lw[-1] + add > MAXW: lines.append([]); lw.append(0); add = wd["width"]
            lines[-1].append(i); lw[-1] += add
        bh = len(lines) * LH + 2 * PADY - (LH - SIZE * 1.12); top = BOTTOM - bh
        pos = {}
        for r, ln in enumerate(lines):
            x = 540 - lw[r] / 2
            for i in ln: pos[i] = (x, top + PADY + r * LH, r); x += b["words"][i]["width"] + SP
        tin, tout = b["in"] / 60, b["out"] / 60
        bid = f"cap{bi}"
        spans = "".join(f'<span class="cw" style="left:{pos[i][0]:.1f}px; top:{pos[i][1]:.1f}px;">{wd["w"]}</span>' for i, wd in enumerate(b["words"]))
        html.append(f'    <div id="{bid}" class="clip cb" data-start="{tin:.3f}" data-duration="{tout - tin:.3f}"><div class="ci">'
                    f'<div class="cp" style="top:{top:.1f}px; height:{bh:.1f}px;"></div>{spans}</div></div>')
        # panel: full width of the block, revealed from the centre by clip-path as each word lands
        full = max(max(abs(pos[i][0] - 540), abs(pos[i][0] + wd["width"] - 540)) for i, wd in enumerate(b["words"])) + PADX
        js.append(f'gsap.set("#{bid} .cp", {{ left: {540 - full:.1f}, width: {2 * full:.1f} }});')
        rows_h = lambda n: n * LH + 2 * PADY - (LH - SIZE * 1.12)
        half0 = max(abs(pos[0][0] - 540), abs(pos[0][0] + b["words"][0]["width"] - 540)) + PADX   # open on the first word
        clip = lambda h, n: f"inset(0px {full - h:.1f}px {bh - rows_h(n):.1f}px {full - h:.1f}px round 14px)"
        js.append(f'tl.fromTo("#{bid} .cp", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.17, ease: "power2.out" }}, {tin:.3f});')
        js.append(f'gsap.set("#{bid} .cp", {{ clipPath: "{clip(half0, 1)}" }});')
        half = half0; rows = 1
        for i, wd in enumerate(b["words"]):
            ft = wd["f"] / 60
            reach = max(abs(pos[i][0] - 540), abs(pos[i][0] + wd["width"] - 540)) + PADX
            h2, r2 = max(half, reach), max(rows, pos[i][2] + 1)
            js.append(f'tl.fromTo("#{bid} .cw:nth-of-type({i + 1})", {{ opacity: 0, y: 10 }}, {{ opacity: 1, y: 0, duration: 0.23, ease: "power2.out" }}, {ft:.3f});')
            if (h2, r2) != (half, rows):   # the panel leads its word: it is open before the word lands
                js.append(f'tl.fromTo("#{bid} .cp", {{ clipPath: "{clip(half, rows)}" }}, {{ clipPath: "{clip(h2, r2)}", duration: 0.12, ease: "power2.out", immediateRender: false }}, {max(tin, ft - 0.06):.3f});')
            half, rows = h2, r2
        js.append(f'tl.fromTo("#{bid} .ci", {{ opacity: 1 }}, {{ opacity: 0, duration: 0.13, ease: "power1.in", immediateRender: false }}, {tout - 0.13:.3f});')
    files["caps"] = f"""<template>
  <style>
    {FONTS}
    #root {{ position: absolute; inset: 0; }}
    #caps-in .cb, #caps-in .ci {{ position: absolute; inset: 0; }}
    #caps-in .cp {{ position: absolute; border-radius: 14px; background: rgba(14,14,16,0.82); }}
    #caps-in .cw {{ position: absolute; font-family: "Inter Display"; font-weight: 500; font-size: {SIZE}px; line-height: {SIZE}px; color: #EDE7DC; white-space: nowrap; }}
  </style>
  <div id="root" data-composition-id="caps" data-width="1080" data-height="1920" data-layout-allow-caption-zone><div id="caps-in">
{chr(10).join(html)}
  </div></div>
  <script>
    (() => {{
      const tl = gsap.timeline({{ paused: true }});
      {chr(10).join(js)}
      window.__timelines["caps"] = tl;
    }})();
  </script>
</template>
"""

    # ---------- grain (static monochrome noise, 6%)
    files["grain"] = """<template>
  <style> #root { position: absolute; inset: 0; pointer-events: none; } #grain svg { position: absolute; inset: 0; width: 1080px; height: 1920px; mix-blend-mode: overlay; opacity: .5; } </style>
  <div id="root" data-composition-id="grain" data-width="1080" data-height="1920" data-layout-ignore>
    <svg viewBox="0 0 1080 1920"><filter id="grain-f"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="27"/><feColorMatrix type="saturate" values="0"/></filter>
      <rect width="1080" height="1920" filter="url(#grain-f)" opacity=".24"/></svg>
  </div>
  <script> window.__timelines["grain"] = gsap.timeline({ paused: true }); </script>
</template>
"""
    return files

def build():
    os.makedirs(f"{HF}/compositions", exist_ok=True)
    files = {}

    # ---------- S1 · hook: hands + phone, the Ring as a lens; Shopee, vouchers, the tag that flips
    CUR[0] = SLOT[0][0]; p = parts(1); cx, cy, r = RING0
    vouchers = "".join(f'<g class="v" id="s1-v{i}"><rect x="-92" y="-52" width="184" height="104" rx="12" fill="{LILAC}"/>'
                       f'<line x1="-38" y1="-44" x2="-38" y2="44" stroke="{NAVY}" stroke-width="3" stroke-dasharray="6 7" opacity=".55"/>'
                       f'<text x="24" y="14" font-family="Inter Display" font-weight="900" font-size="38" fill="{NAVY}" text-anchor="middle">RM</text></g>' for i in range(6))
    body = f"""      <svg class="art" viewBox="0 0 1080 1920"><rect width="1080" height="1920" fill="{O}"/>
        <circle id="s1-disc" cx="{cx}" cy="{cy}" r="{r - 14}" fill="{CREAM}"/>
        <g id="s1-hands-d"><g id="s1-hands">{p['hands']}</g></g>
        <g id="s1-vs">{vouchers}</g></svg>
      <img id="s1-logo" src="assets/shopee.svg" style="position:absolute; left:{cx - 210}px; top:{cy - 67}px; width:420px;">
      <div id="s1-tag" style="position:absolute; left:{cx - 170}px; top:{cy - 100}px; width:340px; height:200px; perspective:900px;">
        <div id="s1-tag-in" style="position:absolute; inset:0; transform-style:preserve-3d;">
          <div class="face" style="background:{LILAC};">−10%</div>
          <div class="face back" style="background:{RED}; color:{CREAM};">+RM40</div>
        </div></div>
      <div class="head" id="s1-ha" style="left:0; width:1080px; top:200px; text-align:center;">
        <div style="font-size:112px;">{W_("Shopee 11.11", "w a1")}</div>
        <div style="font-size:52px; font-weight:700; margin-top:18px; opacity:.92;">{W_("RM11 million in vouchers", "w a2")}</div></div>
      <div class="head" id="s1-hb" style="left:0; width:1080px; top:200px; text-align:center; font-size:112px;">
        <div>{W_("10% off", "w b1")}</div><div>{W_("= more?", "w b2")}</div></div>"""
    css = f"""#s1 .face {{ position:absolute; inset:0; border-radius: 28px 28px 28px 28px; display:flex; align-items:center; justify-content:center;
      font-family:"Inter Display"; font-weight:900; font-size:84px; padding-left:34px; color:{NAVY}; backface-visibility:hidden; clip-path: polygon(14% 0, 100% 0, 100% 100%, 14% 100%, 0 50%); }}
    #s1 .face.back {{ transform: rotateY(180deg); }}
    #s1 .face::before {{ content:""; position:absolute; left:9%; top:46%; width:18px; height:18px; border-radius:50%; background:{O}; }}"""
    fan = [(-215, -40, -28), (-130, -95, -14), (-40, -120, -2), (55, -110, 10), (140, -80, 22), (210, -25, 32)]
    js = f"""
drift([["#s1-hands-d", 1]], {SLOT[0][1]}, T0);
tl.fromTo("#s1-cam", {{ scale: 1 }}, {{ scale: 1.03, duration: {SLOT[0][1]}, ease: "sine.inOut", transformOrigin: "50% 60%" }}, 0);
// frame 1 is already moving: the hands rise into frame, the lens opens, the logo lands
tl.fromTo("#s1-hands", {{ y: 520, rotation: -5, transformOrigin: "50% 100%" }}, {{ y: 0, rotation: 0, duration: 1.1, ease: spring(1.1) }}, 0);
tl.fromTo("#s1-disc", {{ scale: 0.2, transformOrigin: "50% 50%" }}, {{ scale: 1, duration: 0.8, ease: spring(0.8) }}, 0);
tl.fromTo("#s1-logo", {{ scale: 0.6, opacity: 0 }}, {{ scale: 1, opacity: 1, duration: 0.7, ease: spring(0.7) }}, 0.1);
tl.fromTo("#s1-logo", {{ scale: 1, opacity: 1 }}, {{ scale: 0.85, opacity: 0, duration: 0.4, ease: "io", immediateRender: false }}, {L(t("L01", "million")) - 0.35});
// vouchers fan out of the phone into the lens (like the banknotes), 90 ms apart
gsap.set("#s1-vs .v", {{ x: 470, y: 1180, scale: 0.3, rotation: -20, opacity: 0 }});
{chr(10).join(f'tl.fromTo("#s1-v{i}", {{ x: 470, y: 1180, scale: 0.3, rotation: -20, opacity: 0 }}, {{ x: {cx + dx}, y: {cy + dy + 60}, scale: 1, rotation: {rot}, opacity: 1, duration: 0.8, ease: spring(0.8) }}, {L(t("L01", "million")) + 0.09 * i});' for i, (dx, dy, rot) in enumerate(fan))}
// ...and fold into one tag on "but"
tl.fromTo("#s1-vs .v", {{ opacity: 1 }}, {{ x: {cx}, y: {cy}, scale: 0.5, opacity: 0, rotation: 0, duration: 0.45, ease: "io", stagger: 0.05, immediateRender: false }}, {L(t("L01", "but")) - 0.3});
tl.fromTo("#s1-tag", {{ scale: 0.4, opacity: 0, rotation: -8 }}, {{ scale: 1, opacity: 1, rotation: -6, duration: 0.8, ease: spring(0.8) }}, {L(t("L01", "but")) - 0.05});
tl.fromTo("#s1-tag-in", {{ rotationY: 0 }}, {{ rotationY: 180, duration: 0.5, ease: "io" }}, {L(t("L01", "costs"))});
// headline A, then B
rise("#s1 .a1", {L(t("L01", "shopee"))}, 0.48);
rise("#s1 .a2", {L(t("L01", "11", 1)) - 0.05}, 0.08);
sink("#s1-ha .w", {L(t("L01", "but")) - 0.4}, 0.03);
gsap.set("#s1-hb .w", {{ yPercent: 115 }});
rise("#s1 .b1", {L(t("L01", "10"))}, 0.7);
rise("#s1 .b2", {L(t("L01", "costs"))}, 0.34);
sink("#s1-hb .w", {L(t("L02", "here")) - 0.45}, 0.03);
"""
    files["s1"] = scene(1, body, js, css)

    # ---------- S2 · the monument: vacuum on a pedestal; the Ring is its price tag
    CUR[0] = SLOT[1][0]; p = parts(2); ix, iy, ir = ring_at(CUR[0])
    body = f"""      <svg class="art" viewBox="0 0 1080 1920"><rect width="1080" height="1920" fill="{O}"/>
        <g id="s2-sh-d"><g id="s2-sh">{p['shadow']}</g></g>
        <g id="s2-ped-d"><g id="s2-ped">{p['pedestal']}</g></g>
        <g id="s2-per-d">{p['person']}</g>
        <g id="s2-vac-d"><g id="s2-vac">{p['vacuum']}</g></g>
        <path id="s2-string" d="M 742 1236 C 790 1120, 800 1000, 820 945" fill="none" stroke="{CREAM}" stroke-width="3"/></svg>
      <div class="lab" style="left:700px; width:320px; top:686px; font-weight:700; font-size:38px; color:{CREAM};">{W_("usually", "w k")}</div>
      <div class="lab" style="left:700px; width:320px; top:742px; font-weight:900; font-size:80px; color:{CREAM};"><span class="m"><span class="w n" id="s2-n">RM0</span></span></div>"""
    js = f"""
iris("#s2-iris", {ix}, {iy}, {ir});
drift([["#s2-sh-d", .3], ["#s2-ped-d", .6], ["#s2-vac-d", .9]], {SLOT[1][1]}, T0);
tl.fromTo("#s2-cam", {{ scale: 1 }}, {{ scale: 1.03, duration: {SLOT[1][1]}, ease: "sine.inOut", transformOrigin: "40% 60%" }}, 0);
tl.fromTo("#s2-ped", {{ y: 60 }}, {{ y: 0, duration: 0.9, ease: spring(0.9) }}, 0.1);
tl.fromTo("#s2-vac", {{ y: 110 }}, {{ y: 0, duration: 1.0, ease: spring(1.0) }}, 0.2);
tl.fromTo("#s2-sh", {{ scaleX: 0.5, transformOrigin: "0% 50%" }}, {{ scaleX: 1, duration: 1.0, ease: "io" }}, 0.3);
gsap.set("#s2 .w", {{ yPercent: 115 }});
rise("#s2 .k", {L(t("L02", "usually"))});
tl.fromTo("#s2-string", {{ strokeDasharray: 400, strokeDashoffset: 400 }}, {{ strokeDashoffset: 0, duration: 0.5, ease: "io" }}, {L(t("L02", "500")) - 0.2});
rise("#s2 .n", {L(t("L02", "500")) - 0.1});
count("#s2-n", 0, 500, {L(t("L02", "500")) - 0.1});
sink("#s2 .k, #s2 .n", {L(t("L02", "right")) - 0.55}, 0.05);
tl.fromTo("#s2-string", {{ strokeDashoffset: 0 }}, {{ strokeDashoffset: -400, duration: 0.45, ease: "io", immediateRender: false }}, {L(t("L02", "right")) - 0.55});
"""
    files["s2"] = scene(2, body, js)

    # ---------- S3 · the raise: a giant hand slides a block in; the Ring is a calendar dial, then the new price
    CUR[0] = SLOT[2][0]; p = parts(3); ix, iy, ir = ring_at(CUR[0]); dx, dy, _ = RING[1][1:]
    body = f"""      <svg class="art" viewBox="0 0 1080 1920"><rect width="1080" height="1920" fill="{O}"/>
        <g id="s3-sh-d"><g id="s3-sh">{p['shadow']}</g></g>
        <g id="s3-per-d"><g id="s3-per">{p['person']}</g></g>
        <g id="s3-low-d"><g id="s3-low">{p['lowblock']}</g></g>
        <g id="s3-rise-d"><g id="s3-rise">{p['riser']}</g></g>
        <g id="s3-hand-d"><g id="s3-hand">{p['hand']}</g></g></svg>
      <div class="lab" style="left:{dx - 160}px; width:320px; top:{dy - 92}px; font-weight:700; font-size:38px; color:{CREAM};">
        <span class="m"><span class="w k1">before</span></span></div>
      <div class="lab" style="left:{dx - 160}px; width:320px; top:{dy - 48}px; font-weight:900; font-size:80px; color:{CREAM}; height:100px;">
        <span class="m" style="position:absolute; left:0; right:0;"><span class="w d1">11.11</span></span>
        <span class="m" style="position:absolute; left:0; right:0;"><span class="w n" id="s3-n">RM500</span></span></div>"""
    t_lift = L(t("L02", "lifts"))
    js = f"""
iris("#s3-iris", {ix}, {iy}, {ir});
drift([["#s3-sh-d", .3], ["#s3-per-d", .5], ["#s3-low-d", .8], ["#s3-rise-d", .8], ["#s3-hand-d", 1.2]], {SLOT[2][1]}, T0);
tl.fromTo("#s3-cam", {{ scale: 1.02 }}, {{ scale: 1.05, duration: {SLOT[2][1]}, ease: "sine.inOut", transformOrigin: "40% 70%" }}, 0);
// the raise: block and hand slide in together, the vacuum lifts 100 ms later, the hand lets go and leaves
tl.fromTo("#s3-rise", {{ y: 240 }}, {{ y: -36, duration: 0.5, ease: "io" }}, {t_lift - 0.45});
tl.fromTo("#s3-low", {{ x: 1000 }}, {{ x: 0, duration: 0.9, ease: spring(0.9) }}, {t_lift - 0.3});
tl.fromTo("#s3-hand", {{ x: 760, y: 0 }}, {{ x: 0, y: 0, duration: 0.9, ease: spring(0.9) }}, {t_lift - 0.2});
tl.fromTo("#s3-rise", {{ y: -36 }}, {{ y: 0, duration: 0.7, ease: spring(0.7), immediateRender: false }}, {t_lift + 0.45});
tl.fromTo("#s3-hand", {{ x: 0, y: 0 }}, {{ x: 420, y: -260, duration: 0.7, ease: "io", immediateRender: false }}, {t_lift + 1.25});
tl.fromTo("#s3-per", {{ x: 0 }}, {{ x: 46, duration: 0.6, ease: "io" }}, {t_lift + 0.15});
gsap.set("#s3 .w", {{ yPercent: 115 }});
rise("#s3 .k1", {L(t("L02", "before"))});
rise("#s3 .d1", {L(t("L02", "11", 0))});
sink("#s3 .k1, #s3 .d1", {L(t("L02", "600")) - 0.45}, 0.05);
rise("#s3 .n", {L(t("L02", "600")) - 0.2});
count("#s3-n", 500, 600, {L(t("L02", "600")) - 0.2});
"""
    files["s3"] = scene(3, body, js)

    # ---------- S4 · the signature: ghost RM500 vs the "deal" pedestal; the red slice in the Ring
    CUR[0] = SLOT[3][0]; p = parts(4); ix, iy, ir = ring_at(CUR[0])
    BASE, TOP500 = 1629, 1129          # 1 px per ringgit: RM500 = 500 px
    body = f"""      <svg class="art" viewBox="0 0 1080 1920"><rect width="1080" height="1920" fill="{O}"/>
        <polygon id="s4-shadow" points="939,{BASE} 1080,{BASE} 1080,{BASE - 40} 939,{BASE - 64}" fill="{NAVY}" opacity=".9"/>
        <rect id="s4-ghost" x="140" y="{TOP500}" width="332" height="500" fill="none" stroke="{CREAM}" stroke-width="4" stroke-dasharray="18 14"/>
        <g id="s4-ped-d"><g id="s4-ped">
          <rect x="607" y="{TOP500}" width="332" height="500" fill="{CREAM}"/>
          <rect id="s4-red" x="607" y="{TOP500 - 100}" width="332" height="100" fill="{RED}"/></g></g>
        <g id="s4-vac-d"><g id="s4-vac">{p['vacuum']}</g></g>
        <line id="s4-line" x1="110" y1="{TOP500}" x2="990" y2="{TOP500}" stroke="{CREAM}" stroke-width="3"/></svg>
      <div class="lab" style="left:140px; width:332px; top:{TOP500 + 40}px; font-weight:700; font-size:34px; color:{CREAM};">{W_("normal", "w g0")}</div>
      <div class="lab" style="left:140px; width:332px; top:{TOP500 + 80}px; font-weight:900; font-size:72px; color:{CREAM};">{W_("RM500", "w g1")}</div>
      <div class="lab" style="left:607px; width:332px; top:{TOP500 + 80}px; font-weight:900; font-size:72px; color:{NAVY};"><span class="m"><span class="w n" id="s4-n">RM600</span></span></div>
      <div class="lab" style="left:120px; width:400px; top:{TOP500 - 150}px; font-weight:900; font-size:84px; color:{RED};"><span class="m"><span class="w r">+RM40</span></span></div>
      <div class="head" style="left:80px; top:300px; width:520px; font-size:100px;">
        <div>{W_("10% off.", "w h1")}</div><div>{W_("You pay", "w h2")}</div><div style="font-size:140px; color:{LILAC};">{W_("RM540", "w h3")}</div></div>"""
    js = f"""
iris("#s4-iris", {ix}, {iy}, {ir});
drift([["#s4-ped-d", .6], ["#s4-vac-d", .6]], {SLOT[3][1]}, T0);
tl.fromTo("#s4-cam", {{ scale: 1 }}, {{ scale: 1.03, duration: {SLOT[3][1]}, ease: "sine.inOut", transformOrigin: "70% 60%" }}, 0);
gsap.set("#s4 .w", {{ yPercent: 115 }});
// the vacuum stands on the RM600 pedestal (its feet at y 1000 in the trace)
gsap.set("#s4-vac", {{ y: {TOP500 - 100 - 1000} }});
tl.fromTo("#s4-ghost", {{ strokeDashoffset: 1700 }}, {{ strokeDashoffset: 0, duration: 0.9, ease: "io" }}, 0.4);
rise("#s4 .g0, #s4 .g1", 0.6);
rise("#s4 .n", 0.3);
// 10% off: the top comes down to RM540, but the red stays above the real price
const off = {L(t("L03", "10"))};
tl.fromTo("#s4-red", {{ scaleY: 1, transformOrigin: "50% 100%" }}, {{ scaleY: 0.4, duration: 0.7, ease: "io" }}, off + 0.1);
tl.fromTo("#s4-vac", {{ y: {TOP500 - 100 - 1000} }}, {{ y: {TOP500 - 40 - 1000}, duration: 0.7, ease: "io", immediateRender: false }}, off + 0.2);
count("#s4-n", 600, 540, off + 0.1, 0.7);
rise("#s4 .h1", off, 0.2);
const pay = {L(t("L03", "pay"))};
rise("#s4 .h2", pay - 0.1, 0.1);
rise("#s4 .h3", {L(t("L03", "540"))});
tl.fromTo("#s4-line", {{ strokeDasharray: 900, strokeDashoffset: 900 }}, {{ strokeDashoffset: 0, duration: 0.5, ease: "io" }}, pay);
rise("#s4 .r", pay + 0.35);
tl.fromTo("#s4 .r", {{ scale: 1.08 }}, {{ scale: 1, duration: 0.5, ease: "io", immediateRender: false }}, pay + 0.75);
"""
    files["s4"] = scene(4, body, js)

    # ---------- S5 · the stamp: the law lands on the listing; the Ring becomes the seal
    CUR[0] = SLOT[4][0]; p = parts(5); ix, iy, ir = ring_at(CUR[0])
    SH = -180                          # the whole frame sits 180 px higher (keeps the card above the captions)
    CX, CY, ROT = 553, 1025, 11.0      # card centre after the shift, and its tilt (from vec/draw/F5.svg)
    card = f"""<g id="s5-cardui" transform="translate({CX},{CY}) rotate({ROT})"><g class="li">
          <rect x="-262" y="-112" width="150" height="150" rx="14" fill="{NAVY}"/>
          <rect x="-218" y="-92" width="22" height="96" rx="8" fill="{LILAC}"/><rect x="-232" y="0" width="64" height="20" rx="8" fill="{LILAC}"/>
          <text x="-86" y="-70" font-family="Inter Display" font-weight="700" font-size="36" fill="{NAVY}">Vacuum cleaner</text>
          <text x="-86" y="-16" font-family="Inter Display" font-weight="500" font-size="32" fill="{NAVY}" opacity=".55" text-decoration="line-through">RM600</text>
          <rect x="26" y="-48" width="96" height="44" rx="22" fill="{LILAC}"/><text x="74" y="-15" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="28" fill="{NAVY}">−10%</text>
          <text x="-86" y="54" font-family="Inter Display" font-weight="900" font-size="64" fill="{NAVY}">RM540</text></g>
          <g id="s5-seal" opacity="0"><g transform="rotate(-14)">
            <text x="0" y="-6" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="96" fill="{NAVY}" letter-spacing="4">ILLEGAL</text>
            <text x="0" y="40" text-anchor="middle" font-family="Inter Display" font-weight="700" font-size="30" fill="{NAVY}" letter-spacing="3">CPA 1999 · s.12</text></g></g>
          <g id="s5-veil" opacity="0"><rect x="-322" y="-168" width="644" height="336" rx="14" fill="{NAVY}" opacity=".62"/>
            <rect x="-210" y="92" width="420" height="58" rx="29" fill="{CREAM}"/>
            <text x="0" y="131" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="32" fill="{NAVY}">Listing suspended</text></g></g>"""
    face = (626 - CX, 400 + SH - CY)   # the stamp face's centre -> card centre
    body = f"""      <svg class="art" viewBox="0 0 1080 1920"><rect width="1080" height="1920" fill="{O}"/>
        <g transform="translate(0,{SH})"><g id="s5-card-d"><g id="s5-card">{p['card']}</g></g></g>
        <g id="s5-card2-d"><g id="s5-card2">{card}</g></g>
        <ellipse id="s5-shadow" cx="{CX}" cy="{CY}" rx="300" ry="190" fill="{NAVY}" opacity="0"/>
        <g transform="translate(0,{SH})"><g id="s5-stamp">{p['stamp']}</g></g></svg>
      <div class="head" style="left:0; width:1080px; top:220px; text-align:center; font-size:100px;">
        <div class="hl1">{W_("In Malaysia,", "w a1")}</div><div class="hl1">{W_("it's illegal", "w a2")}</div></div>
      <div class="head" style="left:0; width:1080px; top:220px; text-align:center; font-size:100px;">
        <div>{W_("Shopee", "w b1")}</div><div>{W_("suspends it", "w b2")}</div></div>"""
    hit = L(t("L04", "illegal"))
    js = f"""
iris("#s5-iris", {ix}, {iy}, {ir});
drift([["#s5-card-d", .5], ["#s5-card2-d", .5]], {SLOT[4][1]}, T0);
tl.fromTo("#s5-cam", {{ scale: 1 }}, {{ scale: 1.03, duration: {SLOT[4][1]}, ease: "sine.inOut", transformOrigin: "50% 45%" }}, 0);
gsap.set("#s5 .w", {{ yPercent: 115 }});
rise("#s5 .a1", {L(t("L04", "malaysia")) - 0.2}, 0.12);
// the stamp falls (accelerating), lands on "illegal", lifts away
gsap.set("#s5-stamp", {{ transformOrigin: "50% 50%" }});
tl.fromTo("#s5-stamp", {{ x: {-face[0]}, y: -1300, scale: 1.25 }}, {{ x: {-face[0]}, y: {-face[1]}, scale: 0.92, duration: 0.42, ease: "fall" }}, {hit - 0.42});
tl.fromTo("#s5-shadow", {{ opacity: 0, scale: 1.6, transformOrigin: "50% 50%" }}, {{ opacity: 0.55, scale: 1, duration: 0.42, ease: "fall" }}, {hit - 0.42});
tl.fromTo("#s5-card, #s5-card2", {{ scale: 1, transformOrigin: "50% 50%" }}, {{ scale: 0.97, duration: 0.08, ease: "io", yoyo: true, repeat: 1 }}, {hit});
tl.fromTo("#s5-cardui .li", {{ opacity: 1 }}, {{ opacity: 0.18, duration: 0.3, ease: "io" }}, {hit + 0.02});
tl.fromTo("#s5-seal", {{ opacity: 0, scale: 1.15 }}, {{ opacity: 1, scale: 1, duration: 0.3, ease: "io" }}, {hit + 0.02});
tl.fromTo("#s5-stamp", {{ x: {-face[0]}, y: {-face[1]}, scale: 0.92 }}, {{ x: {-face[0] + 160}, y: -1500, scale: 1.25, duration: 0.8, ease: "io", immediateRender: false }}, {hit + 0.35});
tl.fromTo("#s5-shadow", {{ opacity: 0.55 }}, {{ opacity: 0, duration: 0.5, ease: "io", immediateRender: false }}, {hit + 0.35});
rise("#s5 .a2", {hit - 0.2}, 0.1);
sink("#s5 .a1, #s5 .a2", {L(t("L04", "shopee")) - 0.45}, 0.04);
rise("#s5 .b1", {L(t("L04", "shopee"))});
rise("#s5 .b2", {L(t("L04", "suspends"))}, 0.12);
tl.fromTo("#s5-veil", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.5, ease: "io" }}, {L(t("L04", "suspends")) + 0.1});
"""
    files["s5"] = scene(5, body, js)

    # ---------- S6 · night check: the Ring is the phone's halo, then the price history; end card
    CUR[0] = SLOT[5][0]; p = parts(6); ix, iy, ir = ring_at(CUR[0])
    gx, gy, gr = RING[6][1:]
    body = f"""      <svg class="art" viewBox="0 0 1080 1920">
        <defs><radialGradient id="s6-g"><stop offset="0" stop-color="{O}" stop-opacity=".75"/><stop offset="1" stop-color="{O}" stop-opacity="0"/></radialGradient></defs>
        <rect width="1080" height="1920" fill="#0E152A"/>
        {p['defs']}
        <g id="s6-room-d"><g id="s6-room">{p['room']}</g></g>
        <circle id="s6-glow" cx="705" cy="1160" r="260" fill="url(#s6-g)" style="mix-blend-mode:screen"/>
        <g id="s6-chart">
          <circle cx="{gx}" cy="{gy}" r="{gr - 6}" fill="#0E152A" opacity=".88"/>
          <line x1="{gx - 150}" y1="{gy + 60}" x2="{gx + 150}" y2="{gy + 60}" stroke="{CREAM}" stroke-width="2" stroke-dasharray="6 8" opacity=".45"/>
          <path id="s6-line" d="M {gx - 150} {gy + 60} L {gx - 40} {gy + 60} L {gx - 22} {gy - 60} L {gx + 40} {gy - 60} L {gx + 56} {gy + 12} L {gx + 150} {gy + 12}"
            fill="none" stroke="{CREAM}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
          <circle id="s6-dot" cx="{gx + 150}" cy="{gy + 12}" r="11" fill="{LILAC}"/>
          <text class="cl" x="{gx - 150}" y="{gy + 104}" font-family="Inter Display" font-weight="700" font-size="30" fill="{CREAM}" opacity=".8">last week 500</text>
          <text class="cl" x="{gx + 9}" y="{gy - 80}" text-anchor="middle" font-family="Inter Display" font-weight="700" font-size="30" fill="{CREAM}" opacity=".8">600</text>
          <text class="cl" x="{gx + 150}" y="{gy - 16}" text-anchor="end" font-family="Inter Display" font-weight="900" font-size="34" fill="{LILAC}">540</text></g>
        <rect id="s6-end" width="1080" height="1920" fill="{NAVY}" opacity="0"/></svg>
      <img id="s6-logo" src="assets/logo.png" style="position:absolute; left:{540 - 141}px; top:{820 - 180}px; height:360px;">
      <div class="lab" style="left:0; width:1080px; top:1160px; font-weight:700; font-size:54px; color:{CREAM};">{W_("Follow for more", "w f1")}</div>
      <div class="head" style="left:0; width:1080px; top:200px; text-align:center; font-size:92px;">
        <div>{W_("Check last", "w a1")}</div><div>{W_("week's price", "w a2")}</div></div>
      <div class="head" style="left:0; width:1080px; top:200px; text-align:center; font-size:92px;">
        <div>{W_("Seen a fake deal?", "w b1")}</div><div>{W_("Drop it below", "w b2")}</div></div>"""
    chk, fol = L(t("L05", "check")), L(t("L05", "follow"))
    js = f"""
iris("#s6-iris", {ix}, {iy}, {ir});
drift([["#s6-room-d", .5]], {SLOT[5][1]}, T0);
tl.fromTo("#s6-cam", {{ scale: 1 }}, {{ scale: 1.04, duration: {SLOT[5][1]}, ease: "sine.inOut", transformOrigin: "65% 60%" }}, 0);
// the phone glow breathes (two sines, never linear)
const g = {{ t: 0 }};
tl.fromTo(g, {{ t: 0 }}, {{ t: {SLOT[5][1]}, duration: {SLOT[5][1]}, ease: "none", onUpdate() {{
  const s = g.t; gsap.set("#s6-glow", {{ opacity: 0.75 + 0.15 * Math.sin(s * 2.1) + 0.08 * Math.sin(s * 3.7 + 1), scale: 1 + 0.04 * Math.sin(s * 1.3), transformOrigin: "50% 50%" }}); }} }}, 0);
gsap.set("#s6 .w", {{ yPercent: 115 }});
tl.fromTo("#s6-chart", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.5, ease: "io" }}, {chk - 0.3});
tl.fromTo("#s6-line", {{ strokeDasharray: 700, strokeDashoffset: 700 }}, {{ strokeDashoffset: 0, duration: 1.2, ease: "io" }}, {chk});
tl.fromTo("#s6-dot", {{ scale: 0, transformOrigin: "50% 50%" }}, {{ scale: 1, duration: 0.6, ease: spring(0.6) }}, {chk + 1.0});
tl.fromTo("#s6 .cl", {{ opacity: 0, y: 10 }}, {{ opacity: 0.85, y: 0, duration: 0.5, ease: "io", stagger: 0.25 }}, {chk + 0.3});
rise("#s6 .a1", {chk}, 0.14);
rise("#s6 .a2", {L(t("L05", "week"))}, 0.3);
sink("#s6 .a1, #s6 .a2", {L(t("L05", "seen")) - 0.45}, 0.04);
rise("#s6 .b1", {L(t("L05", "seen"))}, 0.12);
rise("#s6 .b2", {L(t("L05", "drop"))}, 0.12);
sink("#s6 .b1, #s6 .b2", {fol - 0.5}, 0.03);
// end card: the room goes navy, the Ring closes on the logo (silent)
tl.fromTo("#s6-chart", {{ opacity: 1 }}, {{ opacity: 0, duration: 0.4, ease: "io", immediateRender: false }}, {fol - 0.4});
tl.fromTo("#s6-end", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.5, ease: "io" }}, {fol - 0.1});
tl.fromTo("#s6-logo", {{ opacity: 0, scale: 0.7 }}, {{ opacity: 1, scale: 1, duration: 0.9, ease: spring(0.9) }}, {fol + 0.25});
rise("#s6 .f1", {fol + 0.45}, 0.1);
"""
    files["s6"] = scene(6, body, js)

    # ---------- the Ring (one hairline through the whole film)
    keys = "\n".join(f'tl.to("#ring-c", {{ attr: {{ cx: {x}, cy: {y}, r: {r} }}, duration: 0.5, ease: "io" }}, {s});' for s, x, y, r in RING)
    files["ring"] = f"""<template>
  <style> #root {{ position: absolute; inset: 0; }} #ring svg {{ position: absolute; inset: 0; width: 1080px; height: 1920px; }} </style>
  <div id="root" data-composition-id="ring" data-width="1080" data-height="1920" data-layout-ignore>
    <svg viewBox="0 0 1080 1920"><circle id="ring-c" cx="{RING0[0]}" cy="{RING0[1]}" r="{RING0[2]}" fill="none" stroke="{CREAM}" stroke-width="3" pathLength="1000" stroke-dasharray="1000"/></svg>
  </div>
  <script>
    (() => {{
      const tl = gsap.timeline({{ paused: true }});
      CustomEase.create("io", "0.65,0,0.35,1");
      tl.fromTo("#ring-c", {{ strokeDashoffset: 1000, rotation: -90, transformOrigin: "50% 50%" }}, {{ strokeDashoffset: 0, rotation: 0, duration: 0.9, ease: "io" }}, 0);
{keys}
      window.__timelines["ring"] = tl;
    }})();
  </script>
</template>
"""

    files.update(overlays())
    for k, v in files.items():
        open(f"{HF}/compositions/{k}.html", "w").write(v)

    hosts = "\n".join(f'      <div id="s{k + 1}" data-composition-id="s{k + 1}" data-composition-src="compositions/s{k + 1}.html" data-start="{s}" data-duration="{d}" '
                      f'data-track-index="{k + 1}" data-track-kind="graphics" data-width="1080" data-height="1920" style="z-index:{k + 1}"></div>' for k, (s, d) in enumerate(SLOT))
    over = "\n".join(f'      <div id="{n}" data-composition-id="{n}" data-composition-src="compositions/{n}.html" data-start="0" data-duration="{END}" '
                     f'data-track-index="{ti}" data-track-kind="{kind}" data-width="1080" data-height="1920" style="z-index:{z}"></div>'
                     for n, ti, kind, z in (("ring", 7, "graphics", 10), ("grain", 8, "graphics", 20), ("caps", 9, "captions", 30)))
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
      html, body {{ margin: 0; width: 1080px; height: 1920px; overflow: hidden; background: {O}; }}
      #root {{ position: relative; width: 1080px; height: 1920px; }}
    </style>
  </head>
  <body>
    <!-- EX27 · generated by build/hf_build.py — edit there and rebuild -->
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
    print("slots", SLOT, "end", END)

if __name__ == "__main__":
    build()

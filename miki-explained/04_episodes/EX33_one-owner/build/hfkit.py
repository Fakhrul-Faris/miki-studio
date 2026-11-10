#!/usr/bin/env python3
"""Shared HyperFrames pieces for Style B episodes (from EX27 hf_build.py, 2026-11-09): fonts, the motion prelude
(io ease, critically damped spring, drift, rise, count), W_ word masks, EX15 captions (36 px) + grain overlays."""
import json, os
EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HF = f"{EP}/hf"
TL = json.load(open(f"{EP}/audio/vo_timeline.json"))
W = TL["words"]
END = TL["end"]

def t(line, frag, nth=0):
    """time of the nth word in a line that contains frag"""
    hits = [x[1] for x in W[line] if frag.lower() in x[0].lower()]
    return round(hits[nth], 3)

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

def overlays():
    """EX15 captions + grain"""
    files = {}
    # ---------- captions (EX15: centred lines on their own width, the panel grows with the words)
    caps = json.load(open(f"{EP}/build/caps60.json"))   # widths measured at 36 px (build/vo.py)
    # user 2026-11-08: captions took too much of the screen -> 36 px (widths were measured at 46 px; they scale linearly)
    SIZE, MAXW, BOTTOM, PADX, PADY = 36, 640, 1420, 22, 14
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


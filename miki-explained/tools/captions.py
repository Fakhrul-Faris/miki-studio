#!/usr/bin/env python3
"""Caption phrases → build/captions.jsx (var CAPS).

Usage: python3 miki-explained/tools/captions.py <episode_dir> L01=0.4 L02=4.6 ... [--mute 15.2-17.3,40.7-42.0] [--fix "And Airport=An airport"]
- Phrases of up to 6 words, broken at punctuation, pauses > 0.35s, or 4+ words (never leaving a 1–2 word tail).
- --mute: drop any phrase that starts inside a window. Use it for moments where the big on-screen headline already
  says the same words (the guess, the named concept), so captions don't double them.
- --fix: find=replace fixes for whisper mishearings.
"""
import json, sys
from pathlib import Path

args = sys.argv[1:]; ep = Path(args.pop(0)); mute = []; fixes = []
T = {}
while args:
    a = args.pop(0)
    if a == "--mute": mute = [tuple(map(float, r.split("-"))) for r in args.pop(0).split(",")]
    elif a == "--fix": fixes.append(args.pop(0).split("=", 1))
    else: k, v = a.split("="); T[k] = float(v)
w = json.loads((ep / "audio" / "words.json").read_text())
chunks = []
for L in T:
    ws = w[L]; cur = []
    for i, (word, a, b) in enumerate(ws):
        cur.append((word, T[L] + a, T[L] + b))
        nxt = ws[i + 1] if i + 1 < len(ws) else None
        gap = (nxt[1] - b) if nxt else 9
        k, left = i + 1, 0
        while k < len(ws):
            left += 1
            if ws[k][0][-1] in ".,?!": break
            k += 1
        if word[-1] in ".,?!" or gap > 0.35 or len(cur) >= 6 or (len(cur) >= 4 and left > 2):
            chunks.append(cur); cur = []
    if cur: chunks.append(cur)
out = []
for i, c in enumerate(chunks):
    text = " ".join(x[0] for x in c)
    for a, b in fixes: text = text.replace(a, b)
    s = c[0][1]; e = c[-1][2] + 0.25
    if i + 1 < len(chunks): e = min(e, chunks[i + 1][0][1] - 0.02)
    if any(m0 <= s <= m1 for m0, m1 in mute): continue
    out.append({"t": text, "s": round(s, 2), "e": round(e, 2), "w": [round(x[1], 2) for x in c]})
(ep / "build" / "captions.jsx").write_text("var CAPS = " + json.dumps(out) + ";\n")
print(f"{len(out)} captions ({len(chunks) - len(out)} muted)")
for o in out: print(f"{o['s']:6.2f}  {o['t']}")

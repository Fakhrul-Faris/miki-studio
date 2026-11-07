#!/usr/bin/env python3
"""EX15 caption blocks straight from audio/vo_timeline.json (raea episodes; the EffectCraft-era caps.py did the same into
caps.jsx): a block ends at a sentence end once it is long enough, or at MAXC characters; words from STOP on (the end card)
are skipped; FIX maps Whisper's spelling back to the script's (an empty right side drops the fragment). Word widths are measured in Inter Display Medium 46 px.
   python3 tools/raea/caps_from_timeline.py EPISODE_DIR OUT.json [--stop L05:follow] [--fix 'sixty-six=66'] ..."""
import argparse, json, os
from PIL import ImageFont
ap = argparse.ArgumentParser(); ap.add_argument("ep"); ap.add_argument("out")
ap.add_argument("--stop", default=""); ap.add_argument("--fix", action="append", default=[]); ap.add_argument("--fps", type=int, default=30)
a = ap.parse_args()
FPS, HOLD, MINC, MAXC = a.fps, 18, 9, 64
tl = json.load(open(os.path.join(a.ep, "audio", "vo_timeline.json")))
fix = dict(x.split("=", 1) for x in a.fix)
stop_line, stop_word = (a.stop.split(":") + [""])[:2] if a.stop else ("", "")
font = ImageFont.truetype(os.path.expanduser("~/Library/Fonts/InterDisplay-Medium.ttf"), 46)
seq = []
for line, ws in tl["words"].items():
    for i, (w, t) in enumerate(ws):
        if line == stop_line and stop_word.lower() in w.lower(): break
        r = fix.get(w, w)
        if r == "": continue                       # --fix ',000=' drops a Whisper fragment
        seq.append((r, int(t * FPS)))
    else:
        continue
    break
blocks, cur = [], []
for j, (w, fr) in enumerate(seq):
    cur.append((w, fr))
    chars = sum(len(x[0]) + 1 for x in cur)
    nxt = seq[j + 1][1] if j + 1 < len(seq) else None
    if (w[-1:] in ".?!" and chars >= MINC) or chars >= MAXC or nxt is None or (nxt - fr) > 1.2 * FPS:
        blocks.append(cur); cur = []
out = []
for b_i, b in enumerate(blocks):
    nxt_in = blocks[b_i + 1][0][1] if b_i + 1 < len(blocks) else None
    end = min(nxt_in, b[-1][1] + HOLD + 12) if nxt_in else b[-1][1] + HOLD + 12
    out.append({"in": b[0][1], "out": end, "words": [{"w": w, "f": fr, "width": round(font.getlength(w), 1)} for w, fr in b]})
json.dump(out, open(a.out, "w"), indent=1)
print(len(out), "blocks →", a.out)

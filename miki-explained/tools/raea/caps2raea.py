#!/usr/bin/env python3
"""EX15 caption blocks (build/caps.jsx, written by the episode's caps.py) → captions.json for raea's <Captions>, with each
word's width measured in the caption face (Inter Display Medium, 46 px), so raea lays the words out and grows the panel
exactly as lib.jsx capBlock did.   python3 tools/raea/caps2raea.py EPISODE_DIR OUT.json"""
import json, os, re, sys
from PIL import ImageFont
ep, out = sys.argv[1], sys.argv[2]
src = open(os.path.join(ep, "build", "caps.jsx")).read()
cap = json.loads(re.search(r"var CAP = (\[.*?\]);\s*$", src, re.S | re.M).group(1))
font = ImageFont.truetype(os.path.expanduser("~/Library/Fonts/InterDisplay-Medium.ttf"), 46)
blocks = [{"in": c[0], "out": c[1], "words": [{"w": w, "f": f, "width": round(font.getlength(w), 1)} for w, f in c[2]]} for c in cap]
json.dump(blocks, open(out, "w"), indent=1)
print(len(blocks), "caption blocks →", out)

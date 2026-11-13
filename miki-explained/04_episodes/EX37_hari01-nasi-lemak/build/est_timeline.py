# Provisional word times (no voice yet): ~2.75 words/s, 0.4 s between lines → audio/vo_timeline.json + build/caps60.json.
# Replaced by build/vo.py as soon as the real lines exist.
import json, os
from PIL import ImageFont
S = {"L01": "Nasi lemak was RM2.03 in 2011. Now it's RM3.68.", "L02": "Inflation over those years? Only 29%.", "L03": "But nasi lemak rose 81%. Roti canai, 71%.",
     "L04": "Its santan went from RM7.39 a kilo to RM11.54.", "L05": "In late 2024, some markets lost half their coconuts.", "L06": "Inflation is everyone's average. Breakfast is yours.",
     "L07": "Still worth it at RM3.68?", "L08": "Follow Meikigo for more."}
t, tl, off = 0.3, {}, {}
for L, txt in S.items():
    off[L] = round(t, 2); ws = txt.split(); tl[L] = []
    for w in ws: tl[L].append([w, round(t, 2)]); t += 0.36 + (0.25 if w[-1] in ".?," else 0) + (0.35 if any(c.isdigit() for c in w) else 0)
    t += 0.45 + (0.8 if L == "L06" else 0)
END = round(t + 1.6, 2)
json.dump({"words": tl, "offsets": off, "end": END, "provisional": True}, open("audio/vo_timeline.json", "w"), indent=1)
font = ImageFont.truetype(os.path.expanduser("~/Library/Fonts/InterDisplay-Medium.ttf"), 36)
seq = [(w, x) for L in tl for w, x in tl[L]]; blocks, cur = [], []
for w, x in seq:
    cur.append((w, x))
    if w[-1] in ".?!": blocks.append(cur); cur = []
caps = []
for i, b in enumerate(blocks):
    nxt = blocks[i + 1][0][1] if i + 1 < len(blocks) else END
    caps.append({"in": round(b[0][1] * 60), "out": round(min(nxt, b[-1][1] + 0.9) * 60), "words": [{"w": w, "f": round(x * 60), "width": round(font.getlength(w), 1)} for w, x in b]})
json.dump(caps, open("build/caps60.json", "w"), indent=1); print("provisional end", END)

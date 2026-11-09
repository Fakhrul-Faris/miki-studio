# Re-chunks build/caps.json at the script's phrase breaks (caps_from_timeline splits on pauses and length only).
import json
from PIL import ImageFont
import os
font = ImageFont.truetype(os.path.expanduser("~/Library/Fonts/InterDisplay-Medium.ttf"), 36)
B = json.load(open("build/caps.json")); words = [w for b in B for w in b["words"]]
REN = {"cheap,": "cheap.", "but": "But", "part": "Part"}
for i, w in enumerate(words):
    if w["w"] == "Speedmart," and words[i + 1]["w"] == "part": w["w"] = "Speedmart."
    w["w"] = REN.get(w["w"], w["w"]); w["width"] = round(font.getlength(w["w"]), 1)
BREAK_AFTER = {"cheap.", "Speedmart.", "two.", "of.", "China.", "middleman.", "brand.", "pay.", "salaries,", "ringgit.", "five.", "them.", "three.", "pick.", "below.", "models."}
out, cur = [], []
for w in words:
    cur.append(w)
    if w["w"] in BREAK_AFTER: out.append(cur); cur = []
if cur: out.append(cur)
res = []
for i, b in enumerate(out):
    nxt = out[i + 1][0]["f"] if i + 1 < len(out) else None
    end = b[-1]["f"] + 30
    res.append({"in": b[0]["f"], "out": min(nxt, end) if nxt else end, "words": b})
json.dump(res, open("build/caps.json", "w"), indent=1)
for b in res: print(b["in"], b["out"], " ".join(w["w"] for w in b["words"]))

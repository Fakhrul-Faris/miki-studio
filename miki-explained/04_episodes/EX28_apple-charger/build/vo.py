# EX28 voice on the film clock (no tightening) → audio/voice_full.wav + audio/vo_timeline.json; captions → build/caps60.json
#   ~/.local/bin/uv run -q --with pillow python build/vo.py
import json, os, subprocess
from PIL import ImageFont
OFF = {"L01": 0.3, "L02": 6.63, "L03": 14.4, "L04": 20.26, "L05": 25.63}; END = 31.3
W = json.load(open("audio/words.json"))
MERGE = [("70", "%", "70%"), ("99", "ringgit.", "RM99.")]
SWAP = {"and": "And", "planet's": "planet"}
tl = {}
for L, off in OFF.items():
    ws, out, i = W[L], [], 0
    while i < len(ws):
        m = next((m for m in MERGE if i + 1 < len(ws) and ws[i][0] == m[0] and ws[i + 1][0] == m[1]), None)
        if m: out.append([m[2], round(off + ws[i][1], 3)]); i += 2; continue
        w = ws[i][0] if (ws[i][0] == "and" and i > 0) else SWAP.get(ws[i][0], ws[i][0]); out.append([w, round(off + ws[i][1], 3)]); i += 1   # "And" only as a first word
    tl[L] = out
json.dump({"words": tl, "offsets": OFF, "end": END}, open("audio/vo_timeline.json", "w"), indent=1)
ins = sum((["-i", f"audio/{L}.mp3"] for L in OFF), [])
f = ";".join(f"[{k}]adelay={int(o * 1000)}:all=1[a{k}]" for k, o in enumerate(OFF.values()))
f += ";" + "".join(f"[a{k}]" for k in range(len(OFF))) + f"amix=inputs={len(OFF)}:normalize=0,apad=whole_dur={END}[o]"
subprocess.run(["ffmpeg", "-y", "-v", "error", *ins, "-filter_complex", f, "-map", "[o]", "-ar", "48000", "audio/voice_full.wav"], check=True)
# captions: one block per sentence (the script's phrasing), word frames at 60 fps, widths at 36 px (EX15 rule)
font = ImageFont.truetype(os.path.expanduser("~/Library/Fonts/InterDisplay-Medium.ttf"), 36)
seq = [(w, t) for L in OFF for w, t in tl[L]]
blocks, cur = [], []
for w, t in seq:
    cur.append((w, t))
    if w[-1] in ".?!": blocks.append(cur); cur = []
if cur: blocks.append(cur)
caps = []
for i, b in enumerate(blocks):
    nxt = blocks[i + 1][0][1] if i + 1 < len(blocks) else END
    caps.append({"in": round(b[0][1] * 60), "out": round(min(nxt, b[-1][1] + 0.9) * 60),
                 "words": [{"w": w, "f": round(t * 60), "width": round(font.getlength(w), 1)} for w, t in b]})
json.dump(caps, open("build/caps60.json", "w"), indent=1)
for L in OFF: print(L, " ".join(w for w, _ in tl[L]))
print(len(caps), "caption blocks:", " | ".join(" ".join(x["w"] for x in c["words"]) for c in caps))

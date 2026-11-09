# EX30 voice on the film clock → audio/voice_full.wav + audio/vo_timeline.json; captions (36 px, 30 fps) → build/caps.json
#   ~/.local/bin/uv run -q --with pillow python build/vo.py
# The words' TEXT comes from the script (Whisper hears "Mishwe"); their TIMES from Whisper, matched one to one after
# joining Whisper's split numbers ("two ringgit" → RM2, "60 ,000", "97 %").
import json, os, subprocess
from PIL import ImageFont
OFF = {"L01": 0.3, "L02": 5.1, "L03": 8.75, "L04": 16.75, "L05": 23.2}; END = 28.8
SCRIPT = {"L01": "Mixue sells you ice cream for RM2. But you're not its real customer.",
          "L02": "It has almost 60,000 shops. More than McDonald's.",
          "L03": "Mixue owns almost none of them. Each one is a franchise, and it has to buy its milk, syrup, cups and machines from Mixue.",
          "L04": "That's where 97% of Mixue's money comes from. Not from you. From its own shop owners.",
          "L05": "Cheap cone. Expensive supplies. Follow for more hidden business models."}
JOIN = [("two", "ringgit"), ("60", "000"), ("97", "%")]   # compared with commas and full stops stripped
W = json.load(open("audio/words.json"))
tl = {}
for L, off in OFF.items():
    ws, times, i = W[L], [], 0
    while i < len(ws):
        if i + 1 < len(ws) and any(ws[i][0].strip(",.").lower() == a and ws[i + 1][0].strip(",.").lower() == b for a, b in JOIN): times.append(ws[i][1]); i += 2; continue
        times.append(ws[i][1]); i += 1
    words = SCRIPT[L].split()
    assert len(words) == len(times), (L, len(words), len(times), [w[0] for w in ws])
    tl[L] = [[w, round(off + t, 3)] for w, t in zip(words, times)]
json.dump({"words": tl, "offsets": OFF, "end": END}, open("audio/vo_timeline.json", "w"), indent=1)
ins = sum((["-i", f"audio/{L}.mp3"] for L in OFF), [])
f = ";".join(f"[{k}]adelay={int(o * 1000)}:all=1[a{k}]" for k, o in enumerate(OFF.values()))
f += ";" + "".join(f"[a{k}]" for k in range(len(OFF))) + f"amix=inputs={len(OFF)}:normalize=0,apad=whole_dur={END}[o]"
subprocess.run(["ffmpeg", "-y", "-v", "error", *ins, "-filter_complex", f, "-map", "[o]", "-ar", "48000", "audio/voice_full.wav"], check=True)
font = ImageFont.truetype(os.path.expanduser("~/Library/Fonts/InterDisplay-Medium.ttf"), 36)
seq = [(w, t) for L in OFF for w, t in tl[L]]; blocks, cur = [], []
for w, t in seq:
    cur.append((w, t))
    if w[-1] in ".?!" or w == "franchise,": blocks.append(cur); cur = []   # the long L03 sentence splits at its middle comma
caps = []
for i, b in enumerate(blocks):
    nxt = blocks[i + 1][0][1] if i + 1 < len(blocks) else END
    caps.append({"in": round(b[0][1] * 30), "out": round(min(nxt, b[-1][1] + 0.9) * 30),
                 "words": [{"w": w, "f": round(t * 30), "width": round(font.getlength(w), 1)} for w, t in b]})
json.dump(caps, open("build/caps.json", "w"), indent=1)
print(len(caps), "blocks:", " | ".join(" ".join(x["w"] for x in c["words"]) for c in caps))

# EX32 voice on the film clock → audio/voice_full.wav + audio/vo_timeline.json; captions (36 px, 60 fps for HyperFrames) → build/caps60.json
#   ~/.local/bin/uv run -q --with pillow python build/vo.py
# The words' TEXT comes from the script ; their TIMES from Whisper, matched one to one after
# joining Whisper's split numbers ("two ringgit" → RM2, "60 ,000", "97 %").
import json, os, subprocess
from PIL import ImageFont
OFF = {"L01": 0.3, "L02": 5.85, "L03": 12.97, "L04": 18.78, "L05": 22.42}; END = 28.0
SCRIPT = {"L01": "This printer costs RM268. The expensive part is the ink inside it.",
          "L02": "One black cartridge holds 8.5 millilitres and costs RM51. That's about RM6,000 a litre.",
          "L03": "Last year, about two thirds of HP's printing money came from ink and toner, not printers.",
          "L04": "So the printer is the bait. You keep paying with every page.",
          "L05": "Cheap machine. Expensive refills. Follow for more hidden business models."}
JOIN = [("6", "000", "ringgit"), ("268", "ringgit"), ("8", "5"), ("51", "ringgit")]   # compared with commas and full stops stripped
W = json.load(open("audio/words.json"))
tl = {}
for L, off in OFF.items():
    ws, times, i = W[L], [], 0
    while i < len(ws):
        m = next((jn for jn in JOIN if i + len(jn) <= len(ws) and all(ws[i + q][0].strip(",.").lower() == jn[q] for q in range(len(jn)))), None)
        if m: times.append(ws[i][1]); i += len(m); continue
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
    if w[-1] in ".?!" or w == "money": blocks.append(cur); cur = []   # the long L03 sentence splits at its middle comma
caps = []
for i, b in enumerate(blocks):
    nxt = blocks[i + 1][0][1] if i + 1 < len(blocks) else END
    caps.append({"in": round(b[0][1] * 60), "out": round(min(nxt, b[-1][1] + 0.9) * 60),
                 "words": [{"w": w, "f": round(t * 60), "width": round(font.getlength(w), 1)} for w, t in b]})
json.dump(caps, open("build/caps60.json", "w"), indent=1)
print(len(caps), "blocks:", " | ".join(" ".join(x["w"] for x in c["words"]) for c in caps))

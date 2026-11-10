# EX33 voice on the film clock → audio/voice_full.wav + audio/vo_timeline.json; captions (36 px, 60 fps for HyperFrames) → build/caps60.json
#   ~/.local/bin/uv run -q --with pillow python build/vo.py
# The words' TEXT comes from the script ; their TIMES from Whisper, matched one to one after
# joining Whisper's split numbers ("two ringgit" → RM2, "60 ,000", "97 %").
import json, os, subprocess
from PIL import ImageFont
OFF = {"L01": 0.3, "L02": 5.2, "L03": 10.85, "L04": 18.4, "L05": 26.95}; END = 32.0
# until the real voice lands the film runs on the temporary Kokoro lines (audio/tmp/ep/audio, tools/words.py run there)
SRC = "audio" if os.path.exists("audio/L01.mp3") else "audio/tmp/ep/audio"
SCRIPT = {"L01": "Ray-Ban and Oakley look like rivals. They're owned by the same company.",
          "L02": "So is Sunglass Hut, the shop that sells them. And Essilor, which makes the lenses.",
          "L03": "It also makes the glasses for Prada, Chanel and Armani. Last year: €28.5 billion.",
          "L04": "And in 2025 it agreed to buy A-Look, Seen and OWL. Over 90 optical shops in Malaysia.",
          "L05": "Different names. One owner. Follow for more hidden business models."}
JOIN = [("ray", "ban"), ("28", "5"), ("billion", "euros"), ("a", "-look")]   # compared with commas and full stops stripped
W = json.load(open(f"{SRC}/words.json"))
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
ins = sum((["-i", f"{SRC}/{L}.mp3"] for L in OFF), [])
f = ";".join(f"[{k}]adelay={int(o * 1000)}:all=1[a{k}]" for k, o in enumerate(OFF.values()))
f += ";" + "".join(f"[a{k}]" for k in range(len(OFF))) + f"amix=inputs={len(OFF)}:normalize=0,apad=whole_dur={END}[o]"
subprocess.run(["ffmpeg", "-y", "-v", "error", *ins, "-filter_complex", f, "-map", "[o]", "-ar", "48000", "audio/voice_full.wav"], check=True)
font = ImageFont.truetype(os.path.expanduser("~/Library/Fonts/InterDisplay-Medium.ttf"), 36)
seq = [(w, t) for L in OFF for w, t in tl[L]]; blocks, cur = [], []
for w, t in seq:
    cur.append((w, t))
    if w[-1] in ".?!": blocks.append(cur); cur = []
caps = []
for i, b in enumerate(blocks):
    nxt = blocks[i + 1][0][1] if i + 1 < len(blocks) else END
    caps.append({"in": round(b[0][1] * 60), "out": round(min(nxt, b[-1][1] + 0.9) * 60),
                 "words": [{"w": w, "f": round(t * 60), "width": round(font.getlength(w), 1)} for w, t in b]})
json.dump(caps, open("build/caps60.json", "w"), indent=1)
print(len(caps), "blocks:", " | ".join(" ".join(x["w"] for x in c["words"]) for c in caps))

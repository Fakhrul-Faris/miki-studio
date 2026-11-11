# EX36 voice on the film clock → audio/voice_full.wav + audio/vo_timeline.json; captions (36 px, 60 fps) → build/caps60.json
#   ~/.local/bin/uv run -q --with pillow python build/vo.py
# VOICE: Nathan (ElevenLabs), audio/L01–L07.mp3 (user 2026-11-11: Kokoro opted out). L08 ("Follow Meikigo for more.") is used
# when audio/L08.mp3 exists; until then the film closes on L07 + the silent end card.
# Text from the script; times from Whisper (tools/words.py), joined where Whisper splits a word.
import json, os, subprocess
from PIL import ImageFont
OFF = {"L01": 0.3, "L02": 4.05, "L03": 8.35, "L04": 12.95, "L05": 18.15, "L06": 22.55, "L07": 27.45}
SRC = "audio"
def dur(f): return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f], capture_output=True, text=True).stdout)
if os.path.exists("audio/L08.mp3"): OFF["L08"] = round(OFF["L07"] + dur("audio/L07.mp3") + 0.4, 2); END = round(OFF["L08"] + dur("audio/L08.mp3") + 1.7, 2)
else: END = round(OFF["L07"] + dur("audio/L07.mp3") + 2.2, 2)   # + the silent end card
SCRIPT = {"L01": "Everything at Daiso costs RM5.90. How?",
          "L02": "It's not a sale. That price hasn't moved since 2018.",
          "L03": "Its founder got tired of pricing every item, so he made one price.",
          "L04": "But one price needs huge orders. Bigger orders, cheaper factory prices.",
          "L05": "This month, Daiso opened its biggest warehouse ever. In Selangor.",
          "L06": "Other shops price each item. Daiso prices the whole shop.",
          "L07": "So, RM5.90: worth it or not?",
          "L08": "Follow Meikigo for more."}
JOIN = [("5", "ring", "at", "90"), ("5", "ringgit", "90"), ("make", "-a", "-go")]
W = json.load(open(f"{SRC}/words.json"))
tl = {}
for L, off in OFF.items():
    if L not in W: raise SystemExit(f"{L}: run tools/words.py with the same offsets first")
    ws, times, i = W[L], [], 0
    while i < len(ws):
        m = next((jn for jn in JOIN if i + len(jn) <= len(ws) and all(ws[i + q][0].strip(",.?").lower() == jn[q] for q in range(len(jn)))), None)
        times.append(ws[i][1]); i += len(m) if m else 1
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

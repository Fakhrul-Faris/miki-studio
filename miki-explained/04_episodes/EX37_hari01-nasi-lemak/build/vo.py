# EX37 voice (Nathan, audio/L01–L08; L08 reused from EX36, same voice and line) on the film clock
#   → audio/voice_full.wav + audio/vo_timeline.json; captions (36 px, 60 fps) → build/caps60.json
#   ~/.local/bin/uv run -q --with pillow python build/vo.py      (after tools/words.py with the same offsets)
import json, os, subprocess
from PIL import ImageFont
OFF = {"L01": 0.3, "L02": 7.2, "L03": 10.9, "L04": 16.0, "L05": 22.4, "L06": 26.6, "L07": 30.6, "L08": 34.1}
def dur(f): return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f], capture_output=True, text=True).stdout)
END = round(OFF["L08"] + dur("audio/L08.mp3") + 1.7, 2)
SCRIPT = {"L01": "Nasi lemak was RM2.03 in 2011. Now it's RM3.68.", "L02": "Inflation over those years? Only 29%.", "L03": "But nasi lemak rose 81%. Roti canai, 71%.",
          "L04": "Its santan went from RM7.39 a kilo to RM11.54.", "L05": "In late 2024, some markets lost half their coconuts.", "L06": "Inflation is everyone's average. Breakfast is yours.",
          "L07": "Still worth it at RM3.68?", "L08": "Follow Meikigo for more."}
# (whisper words, how many script words they stand for) — Nathan reads the money in full ("two ringgit and three sen")
JOIN = [(("2", "ringgit", "and", "3", "sen"), 1), (("3", "ringgit", "and", "68", "sen"), 1), (("3", "ringgit", "and", "68", "cents"), 1),
        (("7", "-ringit", "and", "39", "-sena"), 2), (("11", "-ringit", "and", "54", "-sena"), 1)]
W = json.load(open("audio/words.json")); tl = {}
for L, off in OFF.items():
    ws, times, i = W[L], [], 0
    while i < len(ws):
        m = next(((jn, n) for jn, n in JOIN if i + len(jn) <= len(ws) and all(ws[i + q][0].strip(",.?").lower() == jn[q] for q in range(len(jn)))), None)
        if m: jn, n = m; times.append(ws[i][1]); times += [ws[i + len(jn) - 1][1]] * (n - 1); i += len(jn)
        else: times.append(ws[i][1]); i += 1
    words = SCRIPT[L].split()
    assert len(words) == len(times), (L, len(words), len(times), [w[0] for w in ws])
    tl[L] = [[w, round(off + t, 3)] for w, t in zip(words, times)]
json.dump({"words": tl, "offsets": OFF, "end": END}, open("audio/vo_timeline.json", "w"), indent=1)
ins = sum((["-i", f"audio/{L}.mp3"] for L in OFF), [])
f = ";".join(f"[{k}]adelay={int(o * 1000)}:all=1[a{k}]" for k, o in enumerate(OFF.values())) + ";" + "".join(f"[a{k}]" for k in range(len(OFF))) + f"amix=inputs={len(OFF)}:normalize=0,apad=whole_dur={END}[o]"
subprocess.run(["ffmpeg", "-y", "-v", "error", *ins, "-filter_complex", f, "-map", "[o]", "-ar", "48000", "audio/voice_full.wav"], check=True)
font = ImageFont.truetype(os.path.expanduser("~/Library/Fonts/InterDisplay-Medium.ttf"), 36)
seq = [(w, t) for L in OFF for w, t in tl[L]]; blocks, cur = [], []
for w, t in seq:
    cur.append((w, t))
    if w[-1] in ".?!": blocks.append(cur); cur = []
caps = []
for i, b in enumerate(blocks):
    nxt = blocks[i + 1][0][1] if i + 1 < len(blocks) else END
    caps.append({"in": round(b[0][1] * 60), "out": round(min(nxt, b[-1][1] + 0.9) * 60), "words": [{"w": w, "f": round(t * 60), "width": round(font.getlength(w), 1)} for w, t in b]})
json.dump(caps, open("build/caps60.json", "w"), indent=1)
print(END, len(caps), "blocks:", " | ".join(" ".join(x["w"] for x in c["words"]) for c in caps))

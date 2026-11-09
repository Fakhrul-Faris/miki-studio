# EX29 full voice on the episode timeline (no tightening): audio/voice_full.wav + audio/vo_timeline.json (absolute word
# starts, Whisper's splits merged back to the script's spelling). Offsets are the shots' line starts in video_a.tsx.
import json, subprocess
OFF = {"L01": 0.3, "L02": 7.05, "L03": 12.78, "L04": 22.74, "L05": 31.03}; END = 39.4
W = json.load(open("audio/words.json"))
MERGE = [("speed", "mart,", "Speedmart,"), ("Speed", "Mart", "Speedmart"), ("1", ",600", "1,600")]
SWAP = {"scene": "sen", "Mr.": "Mr", "3.": "three.", "5.": "five.", "two.": "two."}
tl = {}
for L, off in OFF.items():
    ws, out, i = W[L], [], 0
    while i < len(ws):
        w, t = ws[i][0], ws[i][1]
        m = next((m for m in MERGE if i + 1 < len(ws) and ws[i][0] == m[0] and ws[i + 1][0] == m[1]), None)
        if m: out.append([m[2], round(off + t, 3)]); i += 2; continue
        out.append([SWAP.get(w, w), round(off + t, 3)]); i += 1
    tl[L] = out
json.dump({"words": tl, "offsets": OFF, "end": END}, open("audio/vo_timeline.json", "w"), indent=1)
ins = sum((["-i", f"audio/{L}.mp3"] for L in OFF), [])
f = ";".join(f"[{k}]adelay={int(o * 1000)}:all=1[a{k}]" for k, o in enumerate(OFF.values()))
f += ";" + "".join(f"[a{k}]" for k in range(len(OFF))) + f"amix=inputs={len(OFF)}:normalize=0,apad=whole_dur={END}[o]"
subprocess.run(["ffmpeg", "-y", "-v", "error", *ins, "-filter_complex", f, "-map", "[o]", "-ar", "48000", "audio/voice_full.wav"], check=True)
for L, ws in tl.items(): print(L, " ".join(w for w, _ in ws))

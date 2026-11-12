#!/usr/bin/env python3
"""EX38: join audio/L01..L11.wav (trimmed, short gaps) -> audio/vo.wav + build/tl.json (line starts, caption words with times)."""
import json, subprocess, wave, re
from pathlib import Path
GAP = {"L04": 0.30, "L07": 0.38, "L10": 0.34}        # a breath before the turn lines; others 0.16
LEAD = 0.25
DISPLAY = {   # caption text (display form); * marks the key word (selection box)
 "L01": "*Eco-Shop sells almost everything for *RM2.60, and it has never made *more money per item.",
 "L02": "Its gross margin just hit a record *33%, up from under 20%, just *four years ago.",
 "L03": "Imagine *one bottle on that shelf. You pay *RM2.60. On average, about *87 sen of that stays with Eco-Shop, before rent and wages.",
 "L04": "How? Look at the *label. It isn't a brand you know. It's Eco-Shop's *own.",
 "L05": "House brands are now *60% of its sales, and they earn Eco-Shop *more than the names you know.",
 "L06": "More than *65% of its products come from *China, bought for *462 stores at once.",
 "L07": "But here's the part the sign *doesn't say. Fixed doesn't mean *forever.",
 "L08": "Until April last year, it was *RM2.40.",
 "L09": "Now minimum wage is rising to *RM2,000, the Chinese *yuan is getting stronger, and analysts expect the price to *move again within 12 months. One has pencilled in *20 sen.",
 "L10": "So the price was never really the product. The *promise is. One number, on every shelf, that you never have to *check.",
 "L11": "And the day that number changes, *462 stores change with it.",
}
A = Path("audio"); words = json.loads((A / "words.json").read_text())
t = LEAD; parts = []; lines = {}; caps = []
for L in DISPLAY:
    ws = words[L]; a0 = max(0, ws[0][1] - 0.04); a1 = ws[-1][2] + 0.10
    tmp = A / f"_{L}.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(A / f"{L}.wav"), "-ss", f"{a0}", "-to", f"{a1}", "-ar", "48000", "-ac", "1", str(tmp)], check=True)
    t += GAP.get(L, 0.16) if parts else 0
    lines[L] = {"start": round(t, 3), "end": round(t + a1 - a0, 3)}
    # display words spread over the heard words' times (by position when counts differ)
    disp = DISPLAY[L].split(); n = len(disp); m = len(ws)
    for i, w in enumerate(disp):
        j = min(m - 1, round(i * (m - 1) / max(1, n - 1))) if n != m else i
        caps.append({"L": L, "w": w.lstrip("*"), "key": w.startswith("*"), "t": round(t + ws[j][1] - a0, 3)})
    parts.append((t, tmp)); t += a1 - a0
# monotonic word times
for i in range(1, len(caps)): caps[i]["t"] = max(caps[i]["t"], caps[i - 1]["t"] + 0.06)
dur = round(t + 1.6, 3)   # hold for the end text
# phrases: break after punctuation or every 4 words
ph = 0; cnt = 0
for i, c in enumerate(caps):
    c["p"] = ph; cnt += 1
    if re.search(r"[.,?]$", c["w"]) or cnt >= 4 or (i + 1 < len(caps) and caps[i + 1]["L"] != c["L"]): ph += 1; cnt = 0
ins = []; flt = []
for k, (st, f) in enumerate(parts): ins += ["-i", str(f)]; flt.append(f"[{k}]adelay={int(st * 1000)}[a{k}]")
subprocess.run(["ffmpeg", "-v", "error", "-y", *ins, "-filter_complex", ";".join(flt) + ";" + "".join(f"[a{k}]" for k in range(len(parts))) + f"amix=inputs={len(parts)}:normalize=0,apad=whole_dur={dur}[o]", "-map", "[o]", "-ar", "48000", str(A / "vo.wav")], check=True)
for f in A.glob("_L*.wav"): f.unlink()
Path("build/tl.json").write_text(json.dumps({"dur": dur, "lines": lines, "caps": caps}))
print("dur", dur, {k: v["start"] for k, v in lines.items()})

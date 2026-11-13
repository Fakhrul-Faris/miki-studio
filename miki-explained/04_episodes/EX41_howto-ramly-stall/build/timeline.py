#!/usr/bin/env python3
"""EX41 (from EX40): join audio/L01..L08.wav (trimmed, short gaps) -> audio/vo.wav + build/tl.json (line starts, caption words with times)."""
import json, subprocess, wave, re
from pathlib import Path
GAP = {"L02": 0.3, "L03": 0.3, "L04": 0.3, "L06": 0.3, "L07": 0.3}   # a breath before each step and the list; others 0.16
LEAD = 0.25
DISPLAY = {   # caption text; * marks the key word (selection box)
 "L01": "If you want to open a Ramly Burger stall, here's how. Four *steps, and no franchise *fee.",
 "L02": "Step one. A food handler *course, recognised by the Health Ministry. About *RM50, half a day.",
 "L03": "Step two. A *typhoid jab. Around *RM50 to *RM120, and you renew it every *three years.",
 "L04": "Without both, the council won't give you a *licence. That's step three: apply to your local *council. In KL, it's online, on *e-Lesen.",
 "L05": "Councils open applications in *windows. DBKL's last one ran for *one month. Miss it, and you *wait.",
 "L06": "Step four. A *cart, a griddle, and stock. A few *thousand ringgit, and the patties come from *Ramly.",
 "L07": "So about *RM200 of paperwork, then the *cart. Which step stops you?",   # as recorded (v2 text); v3 re-record pending
}
A = Path("audio"); words = json.loads((A / "words.json").read_text())
TEMPO = 1.0; LONG = 0.35; KEEP = 0.30    # trim long pauses only; the user's pace kept
import numpy as np
def tighten(L, ws):
    """Cut pauses > LONG between words down to KEEP, then atempo TEMPO. Returns (word times in the new file, file)."""
    with wave.open(str(A / f"{L}.wav")) as f: sr = f.getframerate(); x = np.frombuffer(f.readframes(f.getnframes()), np.int16)
    a0 = max(0, ws[0][1] - 0.04); segs = []; cur = a0; out = []; pos = 0.0
    for i, (w, s0, e0) in enumerate(ws):
        if i and s0 - ws[i - 1][2] > LONG:          # cut the middle of the pause, keep KEEP s, short crossfade-free cut at low level
            g0 = ws[i - 1][2] + KEEP / 2; g1 = s0 - KEEP / 2
            segs.append((cur, g0)); pos += g0 - cur; cur = g1
        out.append([w, pos + (s0 - cur), pos + (e0 - cur)])
    end = ws[-1][2] + 0.10; segs.append((cur, end))
    y = np.concatenate([x[int(a * sr):int(b * sr)] for a, b in segs])
    raw = A / f"_{L}_raw.wav"
    with wave.open(str(raw), "wb") as f: f.setnchannels(1); f.setsampwidth(2); f.setframerate(sr); f.writeframes(y.tobytes())
    tmp = A / f"_{L}.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(raw), "-af", f"atempo={TEMPO}", "-ar", "48000", "-ac", "1", str(tmp)], check=True)
    raw.unlink()
    return [[w, a / TEMPO, b / TEMPO] for w, a, b in out], tmp
import difflib
def _n(w):
    w = re.sub(r"[^a-z0-9]", "", w.lower().replace("eleven", "11").replace("ramley", "ramly")); return re.sub(r"^rm(?=\d)", "", w).replace("kkmart", "kk")
def align(disp, ws):
    """Display words -> start times: merge Whisper's split tokens ('2' + ',700'), match by normalised text, interpolate the rest."""
    h = []
    for w, a, b in ws:
        if h and (re.match(r"^[-,.]", w) or (re.match(r"^\d", w) and re.match(r"^\d+$", h[-1][0]) is None and False)): h[-1] = [h[-1][0] + w, h[-1][1], b]
        else: h.append([w, a, b])
    dn = [_n(w) for w in disp]; hn = [_n(w) for w, _, _ in h]
    t = [None] * len(disp)
    for blk in difflib.SequenceMatcher(None, dn, hn, autojunk=False).get_matching_blocks():
        for k in range(blk.size): t[blk.a + k] = h[blk.b + k][1]
    if t[0] is None: t[0] = h[0][1]
    for i in range(len(t)):
        if t[i] is None:
            j = next((k for k in range(i + 1, len(t)) if t[k] is not None), None)
            prev = t[i - 1]; nxt = t[j] if j is not None else h[-1][1]; gaps = (j if j is not None else len(t)) - i + 1
            t[i] = prev + (nxt - prev) / gaps
    return list(zip(disp, t))
t = LEAD; parts = []; lines = {}; caps = []
for L in DISPLAY:
    ws, tmp = tighten(L, words[L]); a0 = 0.0; a1 = ws[-1][2] + 0.10 / TEMPO
    t += GAP.get(L, 0.16) if parts else 0
    lines[L] = {"start": round(t, 3), "end": round(t + a1 - a0, 3)}
    # display words spread over the heard words' times (by position when counts differ)
    disp = DISPLAY[L].split()
    for w, tt in align(disp, ws):
        caps.append({"L": L, "w": w.lstrip("*"), "key": w.startswith("*"), "t": round(t + tt - a0, 3)})
    parts.append((t, tmp)); t += a1 - a0
# monotonic word times
for i in range(1, len(caps)): caps[i]["t"] = max(caps[i]["t"], caps[i - 1]["t"] + 0.06)
dur = round(t + 3.2, 3)   # end text + the signature sound (2.8 s)
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

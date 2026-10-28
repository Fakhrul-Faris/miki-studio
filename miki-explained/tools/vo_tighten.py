#!/usr/bin/env python3
"""Tighten an episode's narration into one continuous track (the Doorway method).

Usage (from the repo root, after tools/words.py has written audio/words.json):
  python3 miki-explained/tools/vo_tighten.py <episode_dir> [--hold L01@2.12:1.0] [--hold L06@5.29:1.0] ...

- Lines L01…L0n play back to back with GAP s between them.
- Any pause inside a line longer than LONG s (between two words) is cut down to about 0.3 s.
- --hold inserts deliberate silence at a file time inside a line (pick a point inside a real pause).
Writes audio/voice.wav and audio/vo_timeline.json (every word's start in the tightened track) and prints each word
with its index and MASTER frame, so shots can start on words: start frame = floor(t * 24).
Whisper's start for a word right after a cut can be early: check cut points with silencedetect on voice.wav.
"""
import json, math, subprocess, sys
from pathlib import Path

LEAD, GAP, LONG, FPS = 0.2, 0.25, 0.45, 24
ep = Path(sys.argv[1]); args = sys.argv[2:]
holds = {}
while args:
    flag, spec = args[0], args[1]; args = args[2:]
    if flag == "--hold":
        L, rest = spec.split("@"); t, d = rest.split(":"); holds[(L, float(t))] = float(d)
W = json.loads((ep / "audio/words.json").read_text())
def audio_end(f):   # start of the trailing silence (whisper's last-word end clips the tail)
    out = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(f), "-af", "silencedetect=noise=-38dB:d=0.12", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(f)], capture_output=True, text=True).stdout)
    starts = [float(l.split("silence_start: ")[1]) for l in out.splitlines() if "silence_start" in l]
    ends = [float(l.split("silence_end: ")[1].split()[0]) for l in out.splitlines() if "silence_end" in l]
    return starts[-1] if starts and (len(ends) < len(starts) or abs(ends[-1] - dur) < 0.05) else dur
segs, newW, lineEnd, t = [], {}, {}, LEAD
for L in sorted(W):
    ws = W[L]; end = audio_end(ep / "audio" / f"{L}.mp3") + 0.05
    cuts = [(e0 + 0.12, s1 - 0.18) for (_, s0, e0), (_, s1, _) in zip(ws, ws[1:]) if s1 - e0 > LONG]
    for (l, ft) in holds:
        if l == L and not any(a - 0.01 <= ft <= b + 0.01 for a, b in cuts): cuts.append((ft, ft))
    cuts.sort(); pts = [0.0] + [x for c in cuts for x in c] + [end]
    nw = []
    pieces = list(zip(pts[::2], pts[1::2]))
    for k, (src0, src1) in enumerate(pieces):
        segs.append((L, src0, src1, t))
        nw += [(w, round(t + s - src0, 3)) for w, s, _ in ws if src0 - 0.01 <= s < src1]
        t += src1 - src0
        if k + 1 < len(pieces):   # a hold whose point falls in the gap after this piece
            t += sum(d for (l, ft), d in holds.items() if l == L and src1 - 0.01 <= ft <= pieces[k + 1][0] + 0.01)
    newW[L] = nw; lineEnd[L] = round(t, 3); t += GAP
total = t - GAP
(ep / "audio/vo_timeline.json").write_text(json.dumps({"segs": segs, "words": newW, "lineEnd": lineEnd, "end": total}, indent=1))
ins, fl = [], []
for i, (L, a, b, d) in enumerate(segs):
    ins += ["-i", str(ep / "audio" / f"{L}.mp3")]; ms = int(d * 1000)
    fl.append(f"[{i}:a]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=in:d=0.01,afade=t=out:st={b - a - 0.015}:d=0.015,aresample=44100,adelay={ms}|{ms}[s{i}]")
fl.append("".join(f"[s{i}]" for i in range(len(segs))) + f"amix=inputs={len(segs)}:normalize=0,atrim=0:{total + 2}[out]")
subprocess.run(["ffmpeg", "-loglevel", "error", "-y"] + ins + ["-filter_complex", ";".join(fl), "-map", "[out]", "-ac", "2", str(ep / "audio/voice.wav")], check=True)
for L, nw in newW.items():
    print(L, " ".join(f"{i}:{w}@f{math.floor(s * FPS)}" for i, (w, s) in enumerate(nw)))
print(f"voice ends {total:.2f}s; wrote audio/voice.wav and audio/vo_timeline.json")

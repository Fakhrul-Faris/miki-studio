#!/usr/bin/env python3
"""Word timings for an episode → audio/words.json + build/times.jsx (absolute comp seconds).

Usage (from the repo root):
  archive-ignore/comedy-autopsy/.venv/bin/python miki-explained/tools/words.py <episode_dir> L01=0.4 L02=4.6 ...
Offsets are the comp start time of each line. Pick them so each line starts ~0.35–0.45s after the previous
file ends (check durations with ffprobe first). Then put the same offsets in build/config.jsx (T).
"""
import json, sys
from pathlib import Path
from faster_whisper import WhisperModel

ep = Path(sys.argv[1]); T = {k: float(v) for k, v in (a.split("=") for a in sys.argv[2:])}
m = WhisperModel("small", compute_type="int8")
words, absolute = {}, {}
for L, off in T.items():
    segs, _ = m.transcribe(str(ep / "audio" / f"{L}.mp3"), word_timestamps=True, vad_filter=False, language="en")
    ws = [(w.word.strip(), round(w.start, 2), round(w.end, 2)) for s in segs for w in s.words]
    words[L] = ws; absolute[L] = [round(off + a, 2) for _, a, _ in ws]
    print(L, len(ws), " ".join(f"{i}:{w}[{off + a:.2f}]" for i, (w, a, _) in enumerate(ws)))
(ep / "audio" / "words.json").write_text(json.dumps(words, indent=1))
(ep / "build").mkdir(exist_ok=True)
(ep / "build" / "times.jsx").write_text("// absolute word start times (comp s), from tools/words.py\nvar WT = " + json.dumps(absolute) + ";\n")
print("wrote audio/words.json and build/times.jsx. The printed indices are what w(L, i) uses.")

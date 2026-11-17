#!/usr/bin/env python3
"""EX45 (from EX43 words.py): audio/Lnn.wav (already fixed by voice_fix.py) -> word timings audio/words.json (faster-whisper small, Malay)."""
import json, subprocess, wave
import numpy as np
from pathlib import Path
from faster_whisper import WhisperModel
A = Path("audio"); m = WhisperModel("small", compute_type="int8"); words = {}
for w in sorted(A.glob("L[0-9]*.wav")):
    L = w.stem
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(w), "-ar", "16000", "-ac", "1", "-f", "s16le", "-"], capture_output=True, check=True).stdout
    segs, _ = m.transcribe(np.frombuffer(raw, np.int16).astype(np.float32) / 32768, word_timestamps=True, language="ms")
    words[L] = [(x.word.strip(), round(x.start, 2), round(x.end, 2)) for s in segs for x in s.words]
    with wave.open(str(w)) as h: dur = h.getnframes() / h.getframerate()
    print(f"{L} {dur:.2f}s | {' '.join(x[0] for x in words[L])}")
(A / "words.json").write_text(json.dumps(words, indent=1))

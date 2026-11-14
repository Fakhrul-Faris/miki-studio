#!/usr/bin/env python3
"""EX40: the user's ElevenLabs lines (audio/L0n.mp3) -> L0n.wav + word timings audio/words.json (faster-whisper small)."""
import json, subprocess, wave
import numpy as np
from pathlib import Path
from faster_whisper import WhisperModel
A = Path("audio"); m = WhisperModel("small", compute_type="int8"); words = {}
for f in sorted(A.glob("L0*.mp3")):
    L = f.stem; w = A / f"{L}.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(f), "-ar", "48000", "-ac", "1", str(w)], check=True)
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(w), "-ar", "16000", "-ac", "1", "-f", "s16le", "-"], capture_output=True, check=True).stdout
    segs, _ = m.transcribe(np.frombuffer(raw, np.int16).astype(np.float32) / 32768, word_timestamps=True, language="en")   # array in: the pinned av can't open files
    words[L] = [(x.word.strip(), round(x.start, 2), round(x.end, 2)) for s in segs for x in s.words]
    with wave.open(str(w)) as h: dur = h.getnframes() / h.getframerate()
    print(f"{L} {dur:.2f}s | {' '.join(x[0] for x in words[L])}")
(A / "words.json").write_text(json.dumps(words, indent=1))

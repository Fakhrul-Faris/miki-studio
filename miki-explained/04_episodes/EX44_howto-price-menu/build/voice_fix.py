#!/usr/bin/env python3
"""EX44 voice fix (run from the episode folder): audio/raw/L0n.mp3 (the user's Eleven v3 takes, kept untouched) →
audio/L0n.wav, tighter and cleaner. User 2026-11-14: "a bit slow and not a studio quality. can you fix it for me?"

1. Pauses longer than LONG are cut down to KEEP (energy-based, 10 ms windows, -42 dBFS), with 15 ms fades at each cut.
2. Tempo ×TEMPO with pitch kept (ffmpeg atempo).
3. Voice chain: high-pass 75 Hz · warmth +1.5 dB @120 Hz · de-box −2.5 dB @260 Hz · presence +2.5 dB @3.4 kHz ·
   air +1.5 dB @10 kHz · de-esser · compressor 3:1 @ −20 dB · loudness −16 LUFS, true peak −1.5 dB.
Usage: python3 build/voice_fix.py [TEMPO]   (default 1.12)
"""
import subprocess, sys, wave
import numpy as np
from pathlib import Path
TEMPO = float(sys.argv[1]) if len(sys.argv) > 1 else 1.12
LONG, KEEP, TH, SR = 0.30, 0.22, 10 ** (-42 / 20), 48000
A, R = Path("audio"), Path("audio/raw")
CHAIN = ("highpass=f=75,equalizer=f=120:t=q:w=1:g=1.5,equalizer=f=260:t=q:w=1.2:g=-2.5,equalizer=f=3400:t=q:w=1:g=2.5,"
         "highshelf=f=10000:g=1.5,deesser=i=0.35:m=0.5:f=0.5,acompressor=threshold=-20dB:ratio=3:attack=5:release=80:makeup=2,"
         "loudnorm=I=-16:TP=-1.5:LRA=7")

def load(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(p), "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768

def tighten(x):
    w = int(SR * 0.01); env = np.array([np.abs(x[i:i + w]).max() for i in range(0, len(x) - w, w)])
    loud = env > TH; segs, i, n = [], 0, len(env)
    while i < n:                                   # find quiet runs
        if not loud[i]:
            j = i
            while j < n and not loud[j]: j += 1
            if (j - i) * 0.01 > LONG and i > 0 and j < n: segs.append((i * w, j * w))
            i = j
        else: i += 1
    out, cur, f = [], 0, int(SR * 0.015)
    for a, b in segs:
        mid = (a + b) // 2; half = int(SR * KEEP / 2)
        piece = x[cur:mid - half].copy(); piece[-f:] *= np.linspace(1, 0, f); out.append(piece)
        cur = mid + half; nxt = x[cur:cur + f].copy()
        x = x.copy(); x[cur:cur + f] = nxt * np.linspace(0, 1, f)
    out.append(x[cur:]); return np.concatenate(out), len(segs)

for p in sorted(R.glob("L0*.mp3")):
    x = load(p); y, cuts = tighten(x)
    tmp = A / f"_{p.stem}.wav"
    with wave.open(str(tmp), "wb") as h: h.setnchannels(1); h.setsampwidth(2); h.setframerate(SR); h.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes())
    out = A / f"{p.stem}.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(tmp), "-af", f"atempo={TEMPO},{CHAIN}", "-ar", str(SR), "-ac", "1", str(out)], check=True)
    tmp.unlink()
    with wave.open(str(out)) as h: d = h.getnframes() / h.getframerate()
    print(f"{p.stem}: {len(x) / SR:5.2f}s → {d:5.2f}s ({cuts} long pauses trimmed)")

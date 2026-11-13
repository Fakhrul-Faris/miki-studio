#!/usr/bin/env python3
"""EX38 audio: voice (audio/vo.wav) + sparse effects and bed (sfx/sfx_mix.wav, from tools/sfxmix.py) -> audio/mix.wav at
-14 LUFS. Gain is measured, applied through a peak limiter and re-measured until within 0.15 LU. Run from the episode folder."""
import re, subprocess
def meas(f):
    o = subprocess.run(["ffmpeg", "-hide_banner", "-i", f, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
    s = o[o.rindex("Summary:"):]
    return float(re.search(r"I:\s+(-?[\d.]+) LUFS", s).group(1)), float(re.search(r"Peak:\s+(-?[\d.]+) dBFS", s).group(1))
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", "audio/vo.wav", "-i", "sfx/sfx_mix.wav", "-filter_complex", "[1]volume=0.5[s];[0][s]amix=inputs=2:normalize=0:duration=first", "-ar", "48000", "audio/_pre.wav"], check=True)
g = -14 - meas("audio/_pre.wav")[0]
for _ in range(6):
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", "audio/_pre.wav", "-af", f"volume={g:.2f}dB,alimiter=limit=0.8:level=disabled", "-ar", "48000", "audio/mix.wav"], check=True)
    i, p = meas("audio/mix.wav"); print(f"gain {g:.1f} dB -> {i} LUFS, peak {p} dBFS")
    if abs(i + 14) < 0.15: break
    g += -14 - i
subprocess.run(["rm", "audio/_pre.wav"])

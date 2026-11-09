# EX28 sound → hf/assets/mix.wav (voice + sparse hits + drone bed, loudness −14 LUFS). Times from audio/vo_timeline.json.
#   ~/.local/bin/uv run -q --with numpy python build/sfx.py
# Six hits on the physical moments the picture shows (house rule: sparse, silent ending): the lid slides off, the old box
# presses thin, the pallet fills, the price tag swings, the stamp lands (library sample), the lid shuts.
import json, subprocess
import numpy as np
SR = 48000
TL = json.load(open("audio/vo_timeline.json")); END = TL["end"]
def t(line, frag): return next(x[1] for x in TL["words"][line] if frag.lower() in x[0].lower())
LIB = "../../06_sfx/library/"
rng = np.random.default_rng(28)
mix = np.zeros(int(END * SR))
def put(sig, at, gain):
    i = int(at * SR); sig = sig[: max(0, len(mix) - i)]; mix[i:i + len(sig)] += gain * sig
def load(path, start=0.0, dur=None):
    cmd = ["ffmpeg", "-v", "error", "-ss", str(start)] + (["-t", str(dur)] if dur else []) + ["-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).astype(float)
def lowpass(x, k): return np.convolve(x, np.ones(k) / k, "same")
def env(n, a, d): e = np.exp(-np.arange(n) / (d * SR)); e[: int(a * SR)] *= np.linspace(0, 1, int(a * SR)); return e
def slide(d=0.6):                    # cardboard lid sliding off: soft filtered noise swelling and fading
    n = int(d * SR); x = lowpass(rng.standard_normal(n), 18) - lowpass(rng.standard_normal(n), 120)
    return x * np.sin(np.linspace(0, np.pi, n)) ** 1.5 / 3
def thump(f=70, d=0.35):             # a box pressed / a lid shut: low body + paper tap
    n = int(d * SR); tt = np.arange(n) / SR
    return np.sin(2 * np.pi * f * tt * (1 - 0.3 * tt)) * env(n, 0.002, 0.07) + 0.4 * lowpass(rng.standard_normal(n), 6) * env(n, 0.001, 0.012)
def tap(): n = int(0.08 * SR); return lowpass(rng.standard_normal(n), 10) * env(n, 0.001, 0.01)
def swing(d=0.45):                   # the tag swinging in: a short airy swish up
    n = int(d * SR); x = lowpass(rng.standard_normal(n), 8) - lowpass(rng.standard_normal(n), 40)
    return x * np.sin(np.linspace(0, np.pi, n)) ** 2 / 2

put(slide(0.7), t("L01", "box") - 0.2, 0.35)                                        # the lid slides off
put(thump(80, 0.4), t("L02", "got") + 0.25, 0.55)                                   # the box presses thin
for r in range(10): put(tap(), t("L02", "70%") - 0.2 + r * 0.08 + 0.3, 0.18)        # the pallet fills, row by row
put(swing(), t("L03", "it's") - 0.15, 0.4)                                          # the RM99 tag swings in
put(load(LIB + "Traditional Stamp Sound Effect.mp3", 0, 0.82), t("L04", "ordered") + 0.2 - 0.546, 0.6)   # the stamp lands
put(thump(60, 0.45), t("L04", "box") + 0.33, 0.6)                                   # the lid shuts
bed = load(LIB + "Free Drone Bed Sound Effects.mp3", 40, END)
e = np.clip(np.minimum(np.arange(len(bed)) / (1.5 * SR), (END - 1.2 - np.arange(len(bed)) / SR) / 2.0), 0, 1)
put(bed * e, 0, 0.12)
mix.astype(np.float32).tofile("build/_sfx.f32")
subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "build/_sfx.f32", "-i", "audio/voice_full.wav",
                "-filter_complex", "[0]volume=0.9[s];[1]volume=1.0[v];[v][s]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]",
                "-map", "[a]", "-ac", "2", "build/_mix.wav"], check=True)
# loudnorm's single pass lands short (−16.3 measured): measure, then trim the gain to exactly −14 LUFS (house standard, user 2026-11-09)
import re
m = subprocess.run(["ffmpeg", "-i", "build/_mix.wav", "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
def lufs(f):
    e = subprocess.run(["ffmpeg", "-i", f, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    return float(re.search(r"Summary:.*?I:\s+(-?[\d.]+) LUFS", e, re.S).group(1))
src = "build/_mix.wav"
for k in range(3):                                   # the limiter moves the loudness a little: correct until within 0.3 LU
    d = -14 - lufs(src)
    if abs(d) < 0.3: break
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", src, "-af", f"volume={d:.2f}dB,alimiter=limit=0.84:level=false", f"build/_mix{k}.wav"], check=True)
    src = f"build/_mix{k}.wav"
subprocess.run(["cp", src, "hf/assets/mix.wav"]); subprocess.run("rm -f build/_mix*.wav", shell=True)
print("mix loudness", lufs("hf/assets/mix.wav"), "LUFS")
subprocess.run(["rm", "build/_sfx.f32"])
print("wrote hf/assets/mix.wav")

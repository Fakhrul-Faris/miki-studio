# EX30 sound → build/mix.wav (voice + rain bed + sparse hits, −14 LUFS measured). Times from audio/vo_timeline.json.
#   cd build && ~/.local/bin/uv run -q --with numpy python sfx.py
# Rain under the street scenes, a low room tone in the lane; hits on what the picture does: the crane rising, the dive
# into the sign, a carton landing on each of "milk, syrup, cups, machines", the lorry pulling away, the push into the cone,
# the shutter rolling down and landing. Silent last second.
import json, re, subprocess
import numpy as np
SR = 48000
TL = json.load(open("../audio/vo_timeline.json")); END = TL["end"]
rng = np.random.default_rng(30); mix = np.zeros(int(END * SR))
def put(sig, at, g): i = int(at * SR); sig = sig[: max(0, len(mix) - i)]; mix[i:i + len(sig)] += g * sig
def lp(x, k): return np.convolve(x, np.ones(k) / k, "same")
def env(n, a, d): e = np.exp(-np.arange(n) / (d * SR)); m = int(a * SR); e[:m] *= np.linspace(0, 1, m); return e
def swoosh(d, up=True):
    n = int(d * SR); x = lp(rng.standard_normal(n), 6) - lp(rng.standard_normal(n), 60); s = np.sin(np.linspace(0, np.pi, n)) ** 2
    return x * (s if up else s[::-1]) / 2
def thump(f=75, d=0.35):
    n = int(d * SR); t = np.arange(n) / SR
    return np.sin(2 * np.pi * f * t * (1 - 0.3 * t)) * env(n, 0.002, 0.07) + 0.4 * lp(rng.standard_normal(n), 6) * env(n, 0.001, 0.012)
def rumble(d):
    n = int(d * SR); x = lp(rng.standard_normal(n), 400) * 8; return x * np.sin(np.linspace(0, np.pi, n)) ** 0.7
def shutter(d):
    n = int(d * SR); s = np.zeros(n); t = 0.0
    while t < d - 0.03:
        i = int(t * SR); m = int(0.025 * SR); s[i:i + m] += rng.standard_normal(m) * np.exp(-np.arange(m) / (0.004 * SR)) * rng.uniform(.5, 1); t += 0.05 + 0.03 * t / d
    return (s + lp(rng.standard_normal(n), 300) * 5) * np.minimum(1, np.arange(n) / (0.1 * SR)) / 3
# rain: band-limited noise with drops; street scenes full, lane and factory quieter
n = len(mix); rain = (lp(rng.standard_normal(n), 3) - lp(rng.standard_normal(n), 25)) * 0.5
drops = np.zeros(n); idx = rng.integers(0, n, 900); drops[idx] = rng.uniform(.2, 1, 900); rain += np.convolve(drops, np.exp(-np.arange(200) / 30), "same") * 0.4
tt = np.arange(n) / SR; lvl = np.interp(tt, [0, 0.6, 8.5, 8.7, 16.6, 16.8, 23.0, 23.2, 27.4, 28.4], [0, 1, 1, .35, .35, .25, .25, 1, 1, 0])
put(rain * lvl, 0, 0.09)
put(swoosh(1.9), 4.35, 0.25)                                                     # the crane rises over the town
put(swoosh(0.9), 7.75, 0.3)                                                      # the dive into the sign
for w in (13.15, 13.71, 14.23, 14.79): put(thump(85, 0.3), w + 0.02, 0.45)        # cartons land: milk, syrup, cups, machines
put(rumble(1.6), 15.5, 0.5)                                                      # the lorry pulls away
put(swoosh(0.8), 22.3, 0.25)                                                     # the push into the cone
put(shutter(2.1), 23.3, 0.3); put(thump(60, 0.45), 25.4, 0.55)                   # the shutter rolls down and lands
mix.astype(np.float32).tofile("_sfx.f32")
subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "_sfx.f32", "-i", "../audio/voice_full.wav",
                "-filter_complex", "[0]volume=0.9[s];[1]volume=1.0[v];[v][s]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]", "-map", "[a]", "-ac", "2", "_mix.wav"], check=True)
def lufs(f): return float(re.search(r"Summary:.*?I:\s+(-?[\d.]+) LUFS", subprocess.run(["ffmpeg", "-i", f, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr, re.S).group(1))
src = "_mix.wav"
for i in range(3):
    d = -14 - lufs(src)
    if abs(d) < 0.3: break
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", src, "-af", f"volume={d:.2f}dB,alimiter=limit=0.84:level=false", f"_mix{i}.wav"], check=True); src = f"_mix{i}.wav"
subprocess.run(["cp", src, "mix.wav"]); subprocess.run("rm -f _mix*.wav _sfx.f32", shell=True)
print("mix.wav", lufs("mix.wav"), "LUFS")

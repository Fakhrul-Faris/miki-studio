# EX31 sound → build/mix.wav (voice + drone bed + sparse hits, −14 LUFS measured). Times from audio/vo_timeline.json.
#   cd build && ~/.local/bin/uv run -q --with numpy python sfx.py
# Hits on what the picture does: the car arriving, the fare note's flutter, the slice flying to the tower, the week's bars,
# the fleet lighting, the stamp (library sample), the car leaving. Silent last second.
import json, re, subprocess
import numpy as np
SR = 48000
TL = json.load(open("../audio/vo_timeline.json")); END = TL["end"]; CARD = 1.6      # + the silent Meikigo end card
rng = np.random.default_rng(31); mix = np.zeros(int((END + CARD) * SR))
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
LIB = "../../../06_sfx/library/"
def load(path, start=0.0, dur=None):
    cmd = ["ffmpeg", "-v", "error", "-ss", str(start)] + (["-t", str(dur)] if dur else []) + ["-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).astype(float)
def tick(): n = int(0.06 * SR); return lp(rng.standard_normal(n), 4) * env(n, 0.001, 0.008)
n = len(mix); tt = np.arange(n) / SR
bed = load(LIB + "Free Drone Bed Sound Effects.mp3", 70, END); e = np.clip(np.minimum(tt[:len(bed)] / 1.5, (END - 1.2 - tt[:len(bed)]) / 2.0), 0, 1)   # fades out before the card
put(bed * e, 0, 0.11)
put(rumble(2.3), 0.2, 0.45)                                                       # the car glides in
put(swoosh(0.5), 2.9, 0.22)                                                       # the fare note floats to the car
put(swoosh(1.8), 5.5, 0.28)                                                       # the slice flies up to the tower
put(thump(90, 0.3), 7.4, 0.35)                                                    # it lands in "MAX 20%"
put(rumble(4.4), 9.3, 0.35); put(rumble(1.4), 14.5, 0.3)                          # one move: pull out → brake behind the jam · on to the next rider
for d in range(7): put(tick(), 16.25 + d * 0.15, 0.28)                            # the week's bars rise
put(swoosh(1.6), 19.4, 0.22); [put(tick(), 19.95 + m * 0.07, 0.12) for m in range(22)]   # up over the street; the fleet lights
put(load(LIB + "Traditional Stamp Sound Effect.mp3", 0, 0.82), 24.75 - 0.546, 0.6)  # the stamp lands on "reviewing"
put(swoosh(0.6), 26.6, 0.22); put(rumble(2.4), 28.5, 0.45)                        # the new fare · the car drives off
mix.astype(np.float32).tofile("_sfx.f32")
subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "_sfx.f32", "-i", "../audio/voice_full.wav",
                "-filter_complex", "[0]volume=0.45[s];[1]volume=1.0[v];[v][s]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]", "-map", "[a]", "-ac", "2", "_mix.wav"], check=True)
def lufs(f): return float(re.search(r"Summary:.*?I:\s+(-?[\d.]+) LUFS", subprocess.run(["ffmpeg", "-i", f, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr, re.S).group(1))
src = "_mix.wav"
for i in range(3):
    d = -14 - lufs(src)
    if abs(d) < 0.3: break
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", src, "-af", f"volume={d:.2f}dB,alimiter=limit=0.84:level=false", f"_mix{i}.wav"], check=True); src = f"_mix{i}.wav"
subprocess.run(["cp", src, "mix.wav"]); subprocess.run("rm -f _mix*.wav _sfx.f32", shell=True)
print("mix.wav", lufs("mix.wav"), "LUFS")

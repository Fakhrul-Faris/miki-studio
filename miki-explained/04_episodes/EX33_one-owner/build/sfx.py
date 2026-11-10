# EX33 sound → hf/assets/mix.wav (voice + drone bed + hits on what the picture does, −14 LUFS measured)
#   ~/.local/bin/uv run -q --offline --with numpy python build/sfx.py
# The motif is the strings: a plucked string (Karplus-Strong) whenever something is lowered on one; the bar is wood
# (a knock); the tag a paper flick; the shops a cascade of small wooden clicks; the 90 strings a rising run of plucks;
# "One owner" every string at once (a chord). Times come from audio/vo_timeline.json, so the real voice retimes it.
import json, re, subprocess
import numpy as np
SR = 48000; TL = json.load(open("audio/vo_timeline.json")); END = TL["end"]; W = TL["words"]
def at(L, frag, n=0): return [t for w, t in W[L] if frag.lower() in w.lower()][n]
LIB = "../../06_sfx/library/"
rng = np.random.default_rng(33); mix = np.zeros(int(END * SR))
def put(sig, t, g): i = int(t * SR); sig = sig[: max(0, len(mix) - i)]; mix[i:i + len(sig)] += g * sig
def lp(x, k): return np.convolve(x, np.ones(k) / k, "same")
def env(n, a, d): e = np.exp(-np.arange(n) / (d * SR)); m = max(1, int(a * SR)); e[:m] *= np.linspace(0, 1, m); return e
def load(path, start=0.0, dur=None):
    cmd = ["ffmpeg", "-v", "error", "-ss", str(start)] + (["-t", str(dur)] if dur else []) + ["-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).astype(float)
def pluck(f, d=1.2, bright=0.5):                  # Karplus-Strong: a taut string
    n, p = int(d * SR), int(SR / f); buf = lp(rng.standard_normal(p), 1 + int(4 * (1 - bright))); out = np.zeros(n)
    for i in range(n): out[i] = buf[i % p]; buf[i % p] = 0.996 * 0.5 * (buf[i % p] + buf[(i + 1) % p])
    return out / (np.abs(out).max() + 1e-9) * env(n, 0.002, d / 3)
def knock(f=180, d=0.25): n = int(d * SR); t = np.arange(n) / SR; return (np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * 2.7 * f * t)) * env(n, 0.001, 0.035) + 0.3 * lp(rng.standard_normal(n), 4) * env(n, 0.0005, 0.006)
def click(f=1700): n = int(0.05 * SR); t = np.arange(n) / SR; return np.sin(2 * np.pi * f * t) * env(n, 0.0005, 0.007) + 0.4 * lp(rng.standard_normal(n), 3) * env(n, 0.0005, 0.003)
def flick(d=0.35): n = int(d * SR); x = lp(rng.standard_normal(n), 3) - lp(rng.standard_normal(n), 30); return x * np.sin(np.linspace(0, np.pi, n)) ** 3
def whoosh(d=0.9): n = int(d * SR); x = lp(rng.standard_normal(n), 40) - lp(rng.standard_normal(n), 160); return x * np.sin(np.linspace(0, np.pi, n)) ** 2 * 3
def unreel(d=0.6): n = int(d * SR); t = np.arange(n) / SR; ratchet = (np.sin(2 * np.pi * np.cumsum(np.linspace(28, 12, n)) / SR) > 0.95).astype(float); return lp(ratchet, 3) * np.sin(np.linspace(0, np.pi, n))

bed = load(LIB + "Free Drone Bed Sound Effects.mp3", 60, END); tt = np.arange(len(bed)) / SR
fade_end = at("L05", "Follow") + 0.6
put(bed * np.clip(np.minimum(tt / 1.2, (END - 0.4 - tt) / (END - 0.4 - fade_end)), 0, 1), 0, 0.09)
put(pluck(98, 1.6, 0.3), 0.05, 0.10)                                               # frame 1: the strings already taut
put(knock(170), at("L01", "company") - 0.05, 0.45); put(pluck(73.4, 2.0, 0.4), at("L01", "company"), 0.16)   # the bar: wood + its low string
for w, f in (("Sunglass", 146.8), ("Essilor", 164.8)):
    t0 = at("L02", w) - 0.25; put(unreel(0.7), t0, 0.12); put(pluck(f, 1.4), t0 + 0.75, 0.2)            # lowered, then the string goes taut
for w, f in (("Prada", 196.0), ("Chanel", 220.0), ("Armani", 246.9)):
    t0 = at("L03", w) - 0.2; put(unreel(0.5), t0, 0.08); put(pluck(f, 1.2), t0 + 0.7, 0.18)
put(flick(0.4), at("L03", "€28.5") - 0.45, 0.3)                                   # the tag turns over
put(whoosh(1.0), at("L04", "2025") - 0.3, 0.22)                                    # the map rises out of the floor
t0 = at("L04", "A-Look") - 0.15
for i in range(60): put(click(1300 + rng.random() * 900), t0 + (i / 60) ** 1.4 * 1.8 + rng.random() * 0.05, 0.10 * (1 - i / 90))   # the shops, KL outward
t0 = at("L04", "Over") - 0.1
for i, f in enumerate(np.geomspace(110, 440, 14)): put(pluck(f, 0.9, 0.7), t0 + i * 0.045 + rng.random() * 0.02, 0.07)   # 90 strings shoot up
t0 = at("L05", "One") - 0.05
for f in (73.4, 110, 146.8, 185, 220): put(pluck(f, 2.4, 0.5), t0 + rng.random() * 0.03, 0.11)   # every string at once: one owner
mix.astype(np.float32).tofile("build/_sfx.f32")
subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "build/_sfx.f32", "-i", "audio/voice_full.wav",
                "-filter_complex", "[0]volume=0.9[s];[1]volume=1.0[v];[v][s]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]", "-map", "[a]", "-ac", "2", "build/_mix.wav"], check=True)
def lufs(f): return float(re.search(r"Summary:.*?I:\s+(-?[\d.]+) LUFS", subprocess.run(["ffmpeg", "-i", f, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr, re.S).group(1))
src = "build/_mix.wav"
for i in range(3):
    d = -14 - lufs(src)
    if abs(d) < 0.3: break
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", src, "-af", f"volume={d:.2f}dB,alimiter=limit=0.84:level=false", f"build/_mix{i}.wav"], check=True); src = f"build/_mix{i}.wav"
subprocess.run(["cp", src, "hf/assets/mix.wav"]); subprocess.run("rm -f build/_mix*.wav build/_sfx.f32", shell=True)
print("mix", lufs("hf/assets/mix.wav"), "LUFS")

# EX34 sound → hf/assets/mix.wav (voice + bed + hits from the picture's own equations, −14 LUFS measured)
#   ~/.local/bin/uv run -q --offline --with numpy python build/sfx.py
# Motion and sound from one equation: the coin's rattle integrates the same φ(t) as world.src.html (Euler's disk:
# the tilt θ falls to 0 in finite time, the precession rate climbs) — a click each time the contact point comes round,
# louder as the coin flattens, then the settle. The flap board clacks on each flip (same lock times), the sundial
# ticks on each mark, the truck's reverse beeper, the CRT's whine, the repaint's spray, the fleet's pass.
import json, math, re, subprocess
import numpy as np
SR = 48000; TL = json.load(open("audio/vo_timeline.json")); END = TL["end"]; W = TL["words"]
def at(L, frag, n=0): return [t for w, t in W[L] if frag.lower() in w.lower()][n]
LIB = "../../06_sfx/library/"
rng = np.random.default_rng(34); mix = np.zeros(int(END * SR))
def put(sig, t, g): i = int(max(0, t) * SR); sig = sig[: max(0, len(mix) - i)]; mix[i:i + len(sig)] += g * sig
def lp(x, k): return np.convolve(x, np.ones(k) / k, "same")
def env(n, a, d): e = np.exp(-np.arange(n) / (d * SR)); m = max(1, int(a * SR)); e[:m] *= np.linspace(0, 1, m); return e
def load(path, start=0.0, dur=None):
    cmd = ["ffmpeg", "-v", "error", "-ss", str(start)] + (["-t", str(dur)] if dur else []) + ["-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).astype(float)
def tone(f, d, a=0.002, dec=0.1): n = int(d * SR); t = np.arange(n) / SR; return np.sin(2 * np.pi * f * t) * env(n, a, dec)
def ping(f=2300, d=0.9): return sum(g * tone(f * m, d, 0.0005, d / (2 + i)) for i, (m, g) in enumerate(((1, 1), (2.76, 0.5), (5.4, 0.25)))) / 1.7
def click(f=1800, d=0.03): n = int(d * SR); return (np.sin(2 * np.pi * f * np.arange(n) / SR) * env(n, 0.0003, 0.004) + 0.5 * lp(rng.standard_normal(n), 2) * env(n, 0.0002, 0.002))
def noise(d, k1=4, k2=60): n = int(d * SR); return lp(rng.standard_normal(n), k1) - lp(rng.standard_normal(n), k2)
T = {"rm1": at("L01", "RM1"), "rm40": at("L02", "RM40"), "cut": at("L03", "cut"), "meals": at("L03", "meals"), "online": at("L03", "online"),
     "back": at("L03", "back"), "minutes": at("L03", "minutes"), "within": at("L04", "Within"), "cleared": at("L04", "cleared"),
     "y2024": at("L05", "2024"), "m63": at("L05", "63"), "one": at("L06", "RM1"), "follow": at("L06", "Follow")}

# ---- the coin (constants = world.src.html SPINS / coinPose)
P2 = 2 * math.pi
for t0, t1, th0 in ((-2.0, T["rm1"] + 0.42, 1.25), (T["one"] - 0.25, END - 0.55, 1.3)):
    span, phi, x, dt, nxt = t1 - t0, 0.0, t0, 1 / 4800, 0.0
    while x < t1:
        th = th0 * max(0.0, (t1 - x) / span) ** 0.62
        phi += P2 * 1.1 / math.sqrt(max(0.035, math.sin(th))) * dt; x += dt
        if phi >= nxt:                                     # the contact point comes round: a click, louder as it flattens
            nxt += P2 / 2
            if x >= 0: put(click(1500 + 900 * (1 - th / th0)), x, 0.05 + 0.22 * (1 - th / th0) ** 2)
    put(ping(2350, 1.4), t1, 0.32); put(tone(140, 0.25, 0.001, 0.05), t1, 0.35)   # the settle: a ring and the thud of it lying down
put(ping(2350, 0.8), T["one"] - 0.25, 0.25)                                       # flicked up again (L06)

bed = load(LIB + "Free Drone Bed Sound Effects.mp3", 30, END); tt = np.arange(len(bed)) / SR
put(bed * np.clip(np.minimum(tt / 1.0, (END - 0.6 - tt) / 2.5), 0, 1), 0, 0.08)
put(noise(1.6, 30, 200) * np.sin(np.linspace(0, np.pi, int(1.6 * SR))) ** 2 * 2.5, T["rm40"] - 0.5, 0.18)   # the debt's shadow slides in (a low rush)
put(tone(62, 1.2, 0.05, 0.6), T["rm40"] + 0.1, 0.3)
t0 = T["meals"] - 0.35                                                            # the catering truck: reverse beeper while it backs off
for i in range(4): put(tone(1250, 0.22, 0.003, 0.5) * (np.arange(int(0.22 * SR)) < 0.16 * SR), t0 + i * 0.42, 0.10)
put(tone(15700, 1.0, 0.01, 0.6), T["online"] - 0.55, 0.036); put(click(900, 0.06), T["online"] - 0.55, 0.12)   # the CRT: a degauss thunk and its whine
put(tone(55, 0.5, 0.003, 0.12), T["online"] - 0.55, 0.3)
for i in range(6): put(click(2600, 0.04), (T["back"] - 0.25) + i * ((T["minutes"] + 0.1) - (T["back"] - 0.25)) / 5, 0.28)   # the sundial's marks, as the shadow crosses
put(noise(2.4, 8, 90) * np.linspace(0, 1, int(2.4 * SR)) ** 1.5 * 2, T["minutes"] + 0.1, 0.16)           # the plane lifts off: engine rush
put(noise(1.3, 2, 12) * np.sin(np.linspace(0, np.pi, int(1.3 * SR))), T["within"] - 0.1, 0.07)          # the repaint's spray
flaps = [T["y2024"] + 0.2 + i * 0.075 for i in range(10)] + [T["y2024"] + 0.95 + i * 0.075 for i in range(4)] + [T["m63"] - 0.25 + i * 0.075 for i in range(10)]
for lock in flaps:                                                                # the split-flap board: a riffle, then the lock clack
    for j in range(6): put(click(3200 + rng.random() * 800, 0.012), lock - 0.9 + j * 0.15 + rng.random() * 0.03, 0.035)
    put(click(2100, 0.035), lock, 0.16)
for j in range(5): put(noise(1.6, 6, 120) * np.sin(np.linspace(0, np.pi, int(1.6 * SR))) ** 2 * 2, T["m63"] + 0.5 + j * 0.25, 0.10)   # the fleet passes over
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

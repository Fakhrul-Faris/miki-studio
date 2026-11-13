# EX37 sound → hf/assets/mix.wav (voice + a quiet bed + hits on what the picture does, −14 LUFS measured)
#   ~/.local/bin/uv run -q --with numpy python build/sfx.py
# Sparse (memory explained-sfx-restraint): the sfx bus sits under the voice (×0.3 after the user's 'tone it down'); the end card is silent.
# Motifs: paper (the tag, the stickers, the flips), switches (the shop's lights = the years), cardboard (the cartons).
# Times come from audio/vo_timeline.json with the same cut rules as build/world.src.html, so a new voice retimes it.
import json, re, subprocess
import numpy as np
SR = 48000; TL = json.load(open("audio/vo_timeline.json")); END = TL["end"]; W = TL["words"]
def at(L, frag, n=0): return [t for w, t in W[L] if frag.lower() in w.lower()][n]
LIB = "../../06_sfx/library/"
rng = np.random.default_rng(37); sfx = np.zeros(int(END * SR))
def put(sig, t, g): i = max(0, int(t * SR)); sig = sig[: max(0, len(sfx) - i)]; sfx[i:i + len(sig)] += g * sig
def lp(x, k): return np.convolve(x, np.ones(k) / k, "same")
def env(n, a, d): e = np.exp(-np.arange(n) / (d * SR)); m = max(1, int(a * SR)); e[:m] *= np.linspace(0, 1, m); return e
def load(path, start=0.0, dur=None):
    cmd = ["ffmpeg", "-v", "error", "-ss", str(start)] + (["-t", str(dur)] if dur else []) + ["-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).astype(float)
def knock(f=180, d=0.25): n = int(d * SR); t = np.arange(n) / SR; return (np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * 2.7 * f * t)) * env(n, 0.001, 0.035) + 0.3 * lp(rng.standard_normal(n), 4) * env(n, 0.0005, 0.006)
def click(f=1700): n = int(0.05 * SR); t = np.arange(n) / SR; return np.sin(2 * np.pi * f * t) * env(n, 0.0005, 0.007) + 0.4 * lp(rng.standard_normal(n), 3) * env(n, 0.0005, 0.003)
def switch(): k2 = 0.6 * knock(320, 0.08); c2 = np.zeros(len(k2)); c2[:2400] = 0.8 * click(2400); return k2 + c2
def flick(d=0.3): n = int(d * SR); x = lp(rng.standard_normal(n), 3) - lp(rng.standard_normal(n), 30); return x * np.sin(np.linspace(0, np.pi, n)) ** 3
def peel(d=0.35): n = int(d * SR); x = lp(rng.standard_normal(n), 2) * (np.sin(np.linspace(0, 40 * np.pi, n)) > 0.2); return x * np.linspace(1, 0.2, n) * env(n, 0.01, d)
def whoosh(d=0.9): n = int(d * SR); x = lp(rng.standard_normal(n), 40) - lp(rng.standard_normal(n), 160); return x * np.sin(np.linspace(0, np.pi, n)) ** 2 * 3
def thump(): return knock(95, 0.3) + 0.5 * lp(rng.standard_normal(int(0.3 * SR)), 12) * env(int(0.3 * SR), 0.001, 0.02)
def hum(d, f=100): n = int(d * SR); t = np.arange(n) / SR; x = np.sin(2 * np.pi * f * t) * 0.6 + np.sin(2 * np.pi * 2 * f * t) * 0.3 + 0.2 * lp(rng.standard_normal(n), 60); return x * np.clip(np.minimum(t / 0.3, (d - t) / 0.4), 0, 1)
# the same clock as the picture (build/ex37.tsx, Style A)
T = dict(p368=at("L01", "RM3.68"), infl=at("L02", "Inflation"), p81=at("L03", "81"), p71=at("L03", "71"), its=at("L04", "Its"),
         p1154=at("L04", "RM11.54"), half=at("L05", "half"), more=at("L08", "more"))
END_CARD = T["more"] + 0.55
rip, tick, stamp = load(LIB + "Rip Sound Effect.mp3", 0.15, 0.5), load(LIB + "tick.wav"), load(LIB + "Traditional Stamp Sound Effect.mp3", 0, 0.9)
rev, pop = load(LIB + "Low End Reverse Whoosh Sound.mp3", 1.6, 2.4), load(LIB + "pop.wav")
fade = lambda x, o=0.15: x * np.clip(np.minimum(np.arange(len(x)) / (0.01 * SR), (len(x) - np.arange(len(x))) / (o * SR)), 0, 1)
bed = load(LIB + "Free Drone Bed Sound Effects.mp3", 30, END); tt = np.arange(len(bed)) / SR
put(bed * np.clip(np.minimum(tt / 1.0, (END_CARD - tt) / 0.8), 0, 1), 0, 0.06)      # quiet bed, out before the silent end card
put(pop, T["p368"] - 0.15, 0.3)                                                         # the board flips to RM3.68
put(fade(rev, 0.3), T["infl"] - 0.9, 0.18)                                              # the inflation line draws along the signs
put(fade(stamp, 0.3), T["p81"] - 0.05, 0.35)                                            # the board rises to +81 %
put(tick, T["p71"] - 0.1, 0.35)                                                         # the mamak at +71 %
put(fade(lp(rip, 6), 0.3), T["its"] - 0.3, 0.25)                                        # the shutter rolls up (softened rip = the slats)
put(tick, T["p1154"] - 0.1, 0.35)                                                       # the santan label flips
put(pop, T["half"] + 0.1, 0.3)                                                          # half the coconuts go
sfx.astype(np.float32).tofile("build/_sfx.f32")
subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "build/_sfx.f32", "-i", "audio/voice_full.wav",
                "-filter_complex", "[0]volume=0.3[s];[1]volume=1.0[v];[v][s]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]", "-map", "[a]", "-ac", "2", "build/_mix.wav"], check=True)
def lufs(f): return float(re.search(r"Summary:.*?I:\s+(-?[\d.]+) LUFS", subprocess.run(["ffmpeg", "-i", f, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr, re.S).group(1))
src = "build/_mix.wav"
for i in range(3):
    d = -14 - lufs(src)
    if abs(d) < 0.3: break
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", src, "-af", f"volume={d:.2f}dB,alimiter=limit=0.84:level=false", f"build/_mix{i}.wav"], check=True); src = f"build/_mix{i}.wav"
subprocess.run(["cp", src, "hf/assets/mix.wav"]); subprocess.run("rm -f build/_mix*.wav build/_sfx.f32", shell=True)
print("mix", lufs("hf/assets/mix.wav"), "LUFS")

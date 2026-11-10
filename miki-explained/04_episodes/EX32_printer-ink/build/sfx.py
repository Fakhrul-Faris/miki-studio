# EX32 sound → hf/assets/mix.wav (voice + drone bed + hits on what the picture does, −14 LUFS measured)
#   ~/.local/bin/uv run -q --offline --with numpy python build/sfx.py
# The print head has its own sound (a short motor zip) on every print-in, so the hand-off is heard the same way each
# time; the rest are the objects: paper feed, tag, door, drops, sticker, the ink flood, cartridges into the tray, the
# fishing line, pages and coins, the stack. The print head's last sweep (the erase) and the silence after end it.
import json, re, subprocess
import numpy as np
SR = 48000; TL = json.load(open("audio/vo_timeline.json")); END = TL["end"]
LIB = "../../06_sfx/library/"
rng = np.random.default_rng(32); mix = np.zeros(int(END * SR))
def put(sig, at, g): i = int(at * SR); sig = sig[: max(0, len(mix) - i)]; mix[i:i + len(sig)] += g * sig
def lp(x, k): return np.convolve(x, np.ones(k) / k, "same")
def env(n, a, d): e = np.exp(-np.arange(n) / (d * SR)); m = max(1, int(a * SR)); e[:m] *= np.linspace(0, 1, m); return e
def load(path, start=0.0, dur=None):
    cmd = ["ffmpeg", "-v", "error", "-ss", str(start)] + (["-t", str(dur)] if dur else []) + ["-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).astype(float)
def motor(d, f0=180, f1=260):                     # the print head / paper feed: a buzzy stepper whine with a soft edge
    n = int(d * SR); t = np.arange(n) / SR; f = np.linspace(f0, f1, n)
    x = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * 0.4 + lp(rng.standard_normal(n), 30) * 0.5
    return lp(x, 6) * np.sin(np.linspace(0, np.pi, n)) ** 0.6
def click(f=2600, d=0.05): n = int(d * SR); t = np.arange(n) / SR; return np.sin(2 * np.pi * f * t) * env(n, 0.0005, 0.008) + lp(rng.standard_normal(n), 3) * env(n, 0.0005, 0.004)
def thump(f=80, d=0.3): n = int(d * SR); t = np.arange(n) / SR; return np.sin(2 * np.pi * f * t * (1 - 0.3 * t)) * env(n, 0.002, 0.06) + 0.3 * lp(rng.standard_normal(n), 6) * env(n, 0.001, 0.01)
def plip(f=900): n = int(0.18 * SR); t = np.arange(n) / SR; return np.sin(2 * np.pi * f * (1 + 2 * t) * t) * env(n, 0.001, 0.04)
def swish(d=0.4): n = int(d * SR); x = lp(rng.standard_normal(n), 8) - lp(rng.standard_normal(n), 50); return x * np.sin(np.linspace(0, np.pi, n)) ** 2 / 2
def clink(): n = int(0.4 * SR); t = np.arange(n) / SR; return sum(a * np.sin(2 * np.pi * f * t) * np.exp(-t / d) for f, a, d in ((2400, 1, .08), (5600, .5, .05), (8100, .3, .03))) / 1.8

bed = load(LIB + "Free Drone Bed Sound Effects.mp3", 120, END); tt = np.arange(len(bed)) / SR
put(bed * np.clip(np.minimum(tt / 1.5, (END - 1.2 - tt) / 2.0), 0, 1), 0, 0.10)
put(motor(2.4, 160, 200), 0.0, 0.16)                                                # the page feeds out (frame 1)
put(swish(0.5), 0.95, 0.25)                                                          # the RM268 tag swings in
put(thump(110, 0.22), 3.25, 0.4); put(click(1800), 3.27, 0.3)                       # the ink door drops open
put(plip(700), 4.4, 0.25); put(plip(520), 6.05, 0.3)                                 # the drop forms; it lands
for a in (5.75, 12.8, 18.6, 22.3): put(motor(0.7, 240, 340), a, 0.22)               # every print-in: the print head
put(thump(140, 0.18), 8.9, 0.45)                                                     # the RM51 sticker slaps on
for i in range(5): put(plip(900 + i * 60), 10.9 + i * 0.26, 0.2)                      # drops into the litre bottle
put(swish(0.8), 12.45, 0.35)                                                         # the ink floods up
for i in range(8): put(click(1500 + (i % 3) * 300, 0.06), 16.0 + i * 0.07, 0.3)      # cartridges into the tray
put(thump(90, 0.3), 17.45, 0.45)                                                     # the printer into its slot
put(swish(0.45), 19.15, 0.3)                                                         # the fishing line drops
for i in range(3): a = 20.35 + i * 0.42; put(motor(0.3, 300, 380), a, 0.14); put(clink(), a + 0.38, 0.28)   # a page out, a coin in
for i in range(9): put(thump(70 + i * 4, 0.16), 23.08 + i * 0.09 + 0.2, 0.3)        # the refills stack up
put(motor(1.0, 340, 220), 25.9, 0.2)                                                 # the last sweep lifts the page clean
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

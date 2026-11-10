# EX35 sound → build/mix.wav (voice + a soft day bed + sparse hits on what the picture does, −14 LUFS measured)
#   ~/.local/bin/uv run -q --offline --with numpy python build/sfx.py
# The cups slide on the counter, the tags tick up, the floor square draws itself, the café seats clatter in and fold
# away, the phones chime, each order ping zips down and pops into the pickup shelf, the till powers down, the RENT boards
# land, the city lights come on (blue a little higher than white), the A-board thuds down, the shutter rolls. Silent end.
import json, re, subprocess
import numpy as np
SR = 48000; TL = json.load(open("audio/vo_timeline.json")); END = TL["end"]
rng = np.random.default_rng(35); mix = np.zeros(int(END * SR))
LIB = "../../06_sfx/library/"
def put(sig, t, g): i = int(max(0, t) * SR); sig = sig[: max(0, len(mix) - i)]; mix[i:i + len(sig)] += g * sig
def lp(x, k): return np.convolve(x, np.ones(k) / k, "same")
def env(n, a, d): e = np.exp(-np.arange(n) / (d * SR)); m = max(1, int(a * SR)); e[:m] *= np.linspace(0, 1, m); return e
def load(path, start=0.0, dur=None):
    cmd = ["ffmpeg", "-v", "error", "-ss", str(start)] + (["-t", str(dur)] if dur else []) + ["-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).astype(float)
def tone(f, d, a=0.002, dec=0.1): n = int(d * SR); t = np.arange(n) / SR; return np.sin(2 * np.pi * f * t) * env(n, a, dec)
def tick(f=2400): n = int(0.04 * SR); return np.sin(2 * np.pi * f * np.arange(n) / SR) * env(n, 0.0005, 0.006) + 0.4 * lp(rng.standard_normal(n), 3) * env(n, 0.0003, 0.003)
def scrape(d): n = int(d * SR); x = lp(rng.standard_normal(n), 3) - lp(rng.standard_normal(n), 25); return x * np.sin(np.linspace(0, np.pi, n)) ** 1.5 * (1 - np.linspace(0, 1, n)) ** 0.5
def thump(f=90, d=0.3): n = int(d * SR); t = np.arange(n) / SR; return np.sin(2 * np.pi * f * t * (1 - 0.3 * t)) * env(n, 0.002, 0.06) + 0.35 * lp(rng.standard_normal(n), 6) * env(n, 0.001, 0.01)
def zip_(d=0.8): n = int(d * SR); t = np.arange(n) / SR; f = np.linspace(1500, 600, n); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.linspace(0, np.pi, n)) ** 2 * 0.5
def chime(f): return tone(f, 0.7, 0.003, 0.18) + 0.4 * tone(f * 2, 0.7, 0.003, 0.1)
bed = load(LIB + "Free Drone Bed Sound Effects.mp3", 90, END); tt = np.arange(len(bed)) / SR
put(bed * np.clip(np.minimum(tt / 1.0, (END - 1.2 - tt) / 2.0), 0, 1), 0, 0.07)
for s0 in (0.0, 0.05): put(scrape(1.1), s0, 0.22)                                  # two cups slide along the counter (frame 1)
put(thump(160, 0.12), 1.1, 0.25)                                                   # they stop together
put(tick(2600), 2.3, 0.3); put(tick(2200), 4.75, 0.3)                              # RM10, RM16 tags
put(load(LIB + "Low End Reverse Whoosh Sound.mp3", 0, 1.4)[::-1] * np.linspace(1, 0, int(1.4 * SR)), 5.8, 0.25)   # pull back to the kiosk
for n in range(4): put(scrape(0.35), 8.8 + n * 0.36, 0.12)                          # the 200 sq ft square draws itself
for n in range(6): put(thump(420 + n * 30, 0.08), 11.3 + n * 0.05, 0.12)            # café seats clatter in…
for n in range(6): put(thump(360 - n * 20, 0.08), 12.2 + n * 0.06, 0.1)             # …and fold away ("No seats")
for n in range(6): put(chime(1320 + (n % 3) * 220), 13.5 + n * 0.16, 0.08)          # phones light up
for t0 in (14.05, 14.35, 14.6, 14.9, 15.2, 15.45):                                  # each order: zips down, pops into the shelf
    put(zip_(0.8), t0, 0.1); put(load(LIB + "pop.wav"), t0 + 0.8, 0.25)
put(tone(220, 0.6, 0.001, 0.25) * np.linspace(1, 0.2, int(0.6 * SR)), 16.6, 0.2)    # the till powers down
put(thump(110, 0.3), 17.85, 0.4); put(thump(80, 0.35), 19.7, 0.5)                  # RENT boards: the lane's, the mall's
for n in range(0, 57, 2): put(chime(1046 + (n % 5) * 131), 22.6 + n * 0.028, 0.015)        # blue lights (566)
for n in range(0, 41, 2): put(chime(523 + (n % 5) * 65), 24.9 + n * 0.035, 0.015)          # white lights (411), lower
put(thump(120, 0.3), 24.2, 0.35); put(thump(95, 0.3), 26.45, 0.35)                 # the two counts land
put(thump(75, 0.4), 29.3, 0.5)                                                     # the A-board: RM1 billion
for n in range(26): put(tick(700 + rng.random() * 300) * 2, 32.2 + n * 0.068, 0.12) # the shutter rolls down
put(thump(60, 0.4), 34.0, 0.45)
mix.astype(np.float32).tofile("build/_sfx.f32")
subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "build/_sfx.f32", "-i", "audio/voice_full.wav",
                "-filter_complex", "[0]volume=0.45[s];[1]volume=1.0[v];[v][s]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]", "-map", "[a]", "-ac", "2", "build/_mix.wav"], check=True)
def lufs(f): return float(re.search(r"Summary:.*?I:\s+(-?[\d.]+) LUFS", subprocess.run(["ffmpeg", "-i", f, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr, re.S).group(1))
src = "build/_mix.wav"
for i in range(3):
    d = -14 - lufs(src)
    if abs(d) < 0.3: break
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", src, "-af", f"volume={d:.2f}dB,alimiter=limit=0.84:level=false", f"build/_mix{i}.wav"], check=True); src = f"build/_mix{i}.wav"
subprocess.run(["cp", src, "build/mix.wav"]); subprocess.run("rm -f build/_mix*.wav build/_sfx.f32", shell=True)
print("mix", lufs("build/mix.wav"), "LUFS")

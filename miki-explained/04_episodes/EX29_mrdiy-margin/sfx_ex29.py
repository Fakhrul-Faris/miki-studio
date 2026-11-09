# EX29 sound: sparse effects on the key moments + a low drone bed, mixed under the voice → export/EX29_full_v1_sfx.mp4
#   uv run --with numpy python sfx_ex29.py
# Synthesised here (no sample in 06_sfx): the roller shutter (slat rattle) and coin clinks (inharmonic metal partials),
# each clink placed on a coin's real first impact from the physics bake (A2/media/phys_s3.json). From the library: the
# stamp, the sign power-on hum, the drone bed. House rule: sparse, nothing on the ending.
import json, subprocess, wave
import numpy as np

SR, END, SH = 48000, 39.4, 5.73                    # S3 runs on the test clock: episode time = test time + SH
LIB = "../../06_sfx/library/"
A2 = "../_tests/style-test-mrdiy/A2/"
mix = np.zeros(int(END * SR))
rng = np.random.default_rng(29)

def put(sig, t, gain):
    i = int(t * SR); sig = sig[: max(0, len(mix) - i)]; mix[i:i + len(sig)] += gain * sig

def load(path, start=0.0, dur=None):            # any file → mono float at SR
    cmd = ["ffmpeg", "-v", "error", "-ss", str(start)] + (["-t", str(dur)] if dur else []) + ["-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).astype(float)

def clink(size=1.0):                           # small metal coin hitting a tray: a few inharmonic partials, fast decay
    n = int(0.45 * SR); t = np.arange(n) / SR; s = np.zeros(n)
    for f, a, tau in ((2350, 1.0, 0.09), (5480, 0.6, 0.05), (8350, 0.35, 0.03), (11900, 0.2, 0.02)):
        f = f / size * rng.uniform(0.97, 1.03); s += a * np.sin(2 * np.pi * f * t + rng.uniform(0, 6)) * np.exp(-t / tau)
    s += 0.25 * rng.standard_normal(n) * np.exp(-t / 0.004)          # the tick of contact
    return s / np.abs(s).max()

def shutter(dur=1.0):                          # roller shutter going up: slat clacks at a slowing rate over a rumble
    n = int(dur * SR); s = np.zeros(n); t = 0.0
    while t < dur - 0.03:
        i = int(t * SR); m = int(0.025 * SR)
        s[i:i + m] += rng.standard_normal(m) * np.exp(-np.arange(m) / (0.004 * SR)) * rng.uniform(0.5, 1)
        t += 0.045 + 0.04 * (t / dur)
    rum = np.convolve(rng.standard_normal(n), np.ones(400) / 400, "same") * 6
    env = np.minimum(1, np.arange(n) / (0.08 * SR)) * np.minimum(1, (n - np.arange(n)) / (0.15 * SR))
    return (s + rum) * env / np.abs(s + rum).max()

# 1 · L01: Mr DIY's shutter rolls up (0.5–1.5 s) and the lights come on
put(shutter(1.05), 0.5, 0.35)
# 2 · L02: the signs across the back street light up on "1,600" (power-on hum swell)
hum = load(LIB + "Voltage Stabilizer Power On Sequence.mp3", 3.4, 1.6); hum *= np.minimum(1, np.arange(len(hum)) / (0.3 * SR))
put(hum, 7.25, 0.25)
# 3 · L03: the stamp lands on "own brand" (contact at 14.0 s test clock; the sample's hit is 0.546 s in)
put(load(LIB + "Traditional Stamp Sound Effect.mp3", 0, 0.82), 14.0 + SH - 0.546, 0.7)
# 4 · L04: every coin's first impact in the physics bake (the travelling coin bigger and lower)
P = json.load(open(A2 + "media/phys_s3.json")); f0 = P["f0"]
for name, c in P["coins"].items():
    fr = c["frames"]; r = c["release"] - f0
    for i in range(max(r, 1) + 1, len(fr) - 1):
        if fr[i][1] < fr[i - 1][1] and fr[i + 1][1] >= fr[i][1]:          # first frame it stops falling = impact
            big = name == "token"
            put(clink(1.6 if big else 1.0), (f0 + i) / 30 + SH, 0.32 if big else 0.18); break
# bed: the drone, low, faded in and out; silent last 1.5 s
bed = load(LIB + "Free Drone Bed Sound Effects.mp3", 10, END)
env = np.clip(np.minimum(np.arange(len(bed)) / (1.5 * SR), (END - 1.5 - np.arange(len(bed)) / SR) / 2.0), 0, 1)
put(bed * env, 0, 0.12)

out = (np.clip(mix, -1, 1) * 32767).astype(np.int16)
with wave.open("sfx/sfx_mix.wav", "wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(out.tobytes())
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", "export/EX29_full_v1.mp4", "-i", "audio/voice_full.wav", "-i", "sfx/sfx_mix.wav",
                "-filter_complex", "[1]volume=1.0[v];[2]volume=0.9[s];[v][s]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]",
                "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "export/EX29_full_v1_sfx.mp4"], check=True)
print("wrote sfx/sfx_mix.wav and export/EX29_full_v1_sfx.mp4")

#!/usr/bin/env python3
"""EX26 sound: the voice + a low drone + ~9 sparse hits on the key words (none on the end card). → raea/media/mix.wav
   python3 build/sfx.py   (from the episode folder)"""
import json, math, sys, wave, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../tools"))
from sfxsynth import Mix, SR, synth as S
tl = json.load(open("audio/vo_timeline.json")); W = tl["words"]
def t(line, frag, nth=0):
    f = frag.lower()
    return [x[1] for x in W[line] if f in x[0].lower()][nth]
end = t("L05", "follow"); dur = tl["end"] + 1.0   # = the film (cams.END)
m = Mix(dur)
# the voice
with wave.open("audio/voice.wav") as v:
    ch, sw, sr, n = v.getnchannels(), v.getsampwidth(), v.getframerate(), v.getnframes(); raw = v.readframes(n)
import array
a = array.array("h", raw); mono = [a[i * ch] / 32768 for i in range(n)]
if sr != SR: mono = [mono[int(i * sr / SR)] for i in range(int(n * SR / sr))]
m.put(0, mono, gain=1.0)
# drone bed (A minor-ish, low), fading out before the end card
D = [55.0, 82.41, 110.0]
l, r = S.pad(end + 0.3, [(0, D), (12, [55.0, 73.42, 110.0]), (24, D)], volume=S.envelope([(0, 0.0), (0.8, 0.10), (end - 0.6, 0.10), (end + 0.2, 0.0)]))
m.put_stereo(0, l, r)
hits = [
  (0.0, S.whoosh(0.9, 300, 2400, peak=0.3), 0.30),
  (t("L01", "billion"), S.chime([523.25, 783.99]), 0.20),          # US$1.75B lands on the cup
  (4.45, S.whoosh(0.6, 500, 3000, peak=0.6), 0.20),               # the dive into the phone glow
  (t("L02", "top"), S.click(1400), 0.30),                         # TOP UP pressed
  (t("L02", "pay") + 0.8, S.pop(800, 1500), 0.28),                # the coin lands in the shadow's cup
  (8.3, S.riser(0.45, 300, 1600), 0.18),                          # the coin grows into the crane's coin
  (t("L03", "interest"), S.click(1200), 0.35),                    # 0% stamped
  (t("L03", "due"), S.click(1000), 0.35),                         # NONE stamped
  (13.2, S.whoosh(0.7, 400, 2200, peak=0.5), 0.20),               # the light shafts wipe in
  (t("L04", "earned"), S.blip(440), 0.22),                        # balances slide to the stack
  (t("L04", "$220") - 0.45, S.riser(0.45, 300, 2600), 0.18),
  (t("L04", "$220"), S.impact(0.9), 0.36),                        # +US$220M (the one impact)
  (20.1, S.whoosh(0.6, 500, 3000, peak=0.6), 0.18),               # into the stack's glow
  (t("L05", "ask", 1), S.pop(900, 1600), 0.26),                   # your money arcs to the sign
]
def fade(x, ms=60):
    n = min(len(x), int(SR * ms / 1000)); x = list(x)
    for i in range(n): x[len(x) - n + i] *= 1 - i / n
    return x
for at, snd, g in hits: m.put(max(0, at), fade(snd), gain=g)
m.master(target_lufs=-18.5); m.write("raea/media/mix.wav"); print("mix", round(dur, 2), "s,", len(hits), "hits")

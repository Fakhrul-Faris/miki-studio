#!/usr/bin/env python3
"""EX25 v2 sound: the voice + a low drone + ~9 sparse hits on the key words (none on the end card). → raea/media/mix.wav
   python3 build/sfx.py   (from the episode folder)"""
import json, math, sys, wave, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../tools"))
from sfxsynth import Mix, SR, synth as S
tl = json.load(open("audio/vo_timeline.json")); W = tl["words"]
def t(line, frag):
    f = frag.lower()
    return next(x[1] for x in W[line] if f in x[0].lower())
end = t("L05", "follow"); dur = tl["end"] + 0.6
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
  (0.0, S.whoosh(0.9, 300, 2400, peak=0.3), 0.35),               # the swoop
  (t("L01", "not"), S.blip(880), 0.28),                            # the second customer
  (t("L02", "over"), S.whoosh(1.0, 1800, 400, peak=0.4), 0.30),    # out to the country
  (t("L02", "next"), S.pop(700, 1400), 0.30),                      # back to the street
  (t("L03", "keeps"), S.click(900), 0.40),                         # the coin splits
  (t("L03", "five"), S.chime([523.25, 783.99]), 0.20),             # 5 sen into the till
  (t("L04", "shelf"), S.pop(900, 1500), 0.28),                     # fee 1
  (t("L04", "targets"), S.pop(1000, 1700), 0.28),                  # fee 2
  (t("L04", "warehouses"), S.pop(1100, 1900), 0.28),               # fee 3
  (t("L04", "half") - 0.5, S.riser(0.5, 300, 2600), 0.20),
  (t("L04", "half"), S.impact(0.9), 0.38),                         # the pillar fills (the one impact)
]
def fade(x, ms=60):
    n = min(len(x), int(SR * ms / 1000)); x = list(x)
    for i in range(n): x[len(x) - n + i] *= 1 - i / n
    return x
for at, snd, g in hits: m.put(max(0, at), fade(snd), gain=g)
m.master(target_lufs=-18.5); m.write("raea/media/mix.wav"); print("mix", round(dur, 2), "s,", len(hits), "hits")

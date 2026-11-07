#!/usr/bin/env python3
"""EX27 sound: the voice + a low drone + ~9 sparse hits on the key words (none on the end card). → raea/media/mix.wav
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
  (0.0, S.whoosh(0.9, 300, 2400, peak=0.3), 0.35),
  (t("L01", "million"), S.chime([659.25, 987.77]), 0.18),        # vouchers rain
  (t("L01", "costs"), S.click(500), 0.40),                        # the tag turns
  (t("L02", "vacuum"), S.riser(0.8, 200, 900), 0.18),             # the column builds to 500
  (t("L02", "lifts"), S.pop(600, 300), 0.32),                     # +RM100 stacked on
  (t("L03", "10"), S.whoosh(0.6, 1600, 500, peak=0.4), 0.28),     # 10% slides off
  (t("L03", "pay") - 0.4, S.riser(0.4, 300, 2600), 0.18),
  (t("L03", "pay"), S.impact(0.9), 0.36),                         # RM540 above the real price (the one impact)
  (t("L04", "illegal"), S.click(300), 0.50),                      # the law stamps
  (t("L04", "suspends"), S.blip(330), 0.28),
  (t("L05", "check"), S.scratch(0.9), 0.18),                      # the price line draws
]
def fade(x, ms=60):
    n = min(len(x), int(SR * ms / 1000)); x = list(x)
    for i in range(n): x[len(x) - n + i] *= 1 - i / n
    return x
for at, snd, g in hits: m.put(max(0, at), fade(snd), gain=g)
m.master(target_lufs=-18.5); m.write("raea/media/mix.wav"); print("mix", round(dur, 2), "s,", len(hits), "hits")

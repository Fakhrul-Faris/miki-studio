# EX21 sound hits, synthesized offline with tools/sfxsynth (adopted 2026-11-05). Sparse (house rule): a shutter on each
# click, a coin on each pay, silence on the free click, a soft thud as the box lands, one impact on "bankruptcy",
# one chime on "a billion", the last click. Nothing on the follow card. Mixed under the voice by build/sfxmix.py.
#   cd miki-explained/tools && python3 -m sfxsynth ../04_episodes/EX21_kodak/build/cues.py
import json, os
from sfxsynth.synth import click, pop, chime, impact, whoosh
EP = os.path.dirname(os.path.abspath(__file__)) + "/../"
TIMELINE = EP + "audio/vo_timeline.json"
OUT = EP + "sfx/hits.wav"
TARGET_LUFS = -24.0                                                   # hits only; sfxmix sets them under the voice
def score(mix, tl):
    w = lambda L, i: tl["words"][L][i][1]
    shutter = lambda: [a + 0.6 * b for a, b in zip(click(2600, 0.05) + [0.0] * 2400, [0.0] * 1700 + click(1300, 0.07))]   # two-part shutter
    mix.put(w("L03", 16), shutter(), 0.9)                              # "pressed the button"
    for t in (18.10, 19.60): mix.put(t, shutter(), 0.9)               # "Click"
    for t in (18.81, 20.42): mix.put(t, pop(1400, 2100, 0.14), 0.55)  # "pay": a coin into the tower
    # the free click (L04 "click"): deliberately silent
    mix.put(w("L05", 28) + 0.22, pop(160, 90, 0.22), 0.6)             # the box lands over the prototype
    mix.put(w("L06", 26), impact(1.2), 0.8)                           # "bankruptcy"
    mix.put(w("L07", 11), chime([523.25, 659.25, 783.99], 1.6), 0.35) # "billion"
    mix.put(w("L08", 21), shutter(), 1.0)                             # "a free click"

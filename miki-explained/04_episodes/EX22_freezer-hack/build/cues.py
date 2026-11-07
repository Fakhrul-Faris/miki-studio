# EX22 sound hits, synthesized offline with tools/sfxsynth. Sparse (house rule): a riser as the freezers turn to ovens,
# a hit on "fifty degrees", a typing burst as the password fills, a click as the calendar turns, one low impact on
# "across Europe", a soft blip on the router. Nothing on the follow card. Mixed under the voice by build/sfxmix.py.
#   cd miki-explained/tools && python3 -m sfxsynth ../04_episodes/EX22_freezer-hack/build/cues.py
import os
from sfxsynth.synth import click, pop, riser, impact, blip
EP = os.path.dirname(os.path.abspath(__file__)) + "/../"
TIMELINE = EP + "audio/vo_timeline.json"
OUT = EP + "sfx/hits.wav"
TARGET_LUFS = -24.0
def score(mix, tl):
    w = lambda L, i: tl["words"][L][i][1]
    mix.put(w("L01", 17) - 1.2, riser(1.2, 220, 2600), 0.35)           # the freezers warm … "ovens"
    mix.put(w("L02", 0), pop(900, 600, 0.18), 0.4)                      # "Fifty degrees"
    mix.typing(w("L03", 17) - 0.1, w("L03", 19) + 0.25, 10)             # the password types itself
    mix.put(w("L03", 22), click(1500, 0.06), 0.5)                       # "day": the calendar turns
    mix.put(w("L04", 6), impact(1.2), 0.7)                              # "across Europe"
    mix.put(w("L05", 12), blip(1320, 0.3), 0.3)                         # "a box": the router's light

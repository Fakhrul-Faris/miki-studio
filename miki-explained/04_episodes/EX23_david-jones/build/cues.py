# EX23 sound hits, synthesized offline with tools/sfxsynth. Sparse: a low falling whoosh as the store sinks, a tick as the
# price tag flips, soft pops as the stores rise on the map, a whoosh as the brands appear, one impact as the doors close,
# two low thuds as the loss bars drop, a soft thud for each rent envelope, a stamp on "hasn't been paid". Nothing on the
# follow card. Mixed under the voice by build/sfxmix.py.
#   cd miki-explained/tools && python3 -m sfxsynth ../04_episodes/EX23_david-jones/build/cues.py
import os
from sfxsynth.synth import whoosh, click, pop, impact
EP = os.path.dirname(os.path.abspath(__file__)) + "/../"
TIMELINE = EP + "audio/vo_timeline.json"
OUT = EP + "sfx/hits.wav"
TARGET_LUFS = -24.0
def score(mix, tl):
    w = lambda L, i: tl["words"][L][i][1]
    mix.put(0.05, whoosh(3.6, 900, 160, peak=0.7), 0.35)                # the store sinks like a lift
    mix.put(w("L02", 15) + 0.2, click(1700, 0.05), 0.5)                 # the price tag flips to $100M
    for k in range(5): mix.put(w("L02", 23) + k * 0.12, pop(700 + k * 80, 900 + k * 80, 0.12), 0.18)   # stores rise on the map
    mix.put(w("L04", 2), whoosh(0.6, 400, 1800), 0.25)                  # the brands open their own shops
    mix.put(w("L04", 34), impact(1.2), 0.7)                             # "closed the doors"
    for L, i in (("L05", 2), ("L05", 5)): mix.put(w(L, i) + 0.2, pop(180, 90, 0.25), 0.5)   # the loss bars drop
    for k in range(3): mix.put(w("L05", 12) + 0.15 + k * 0.3, pop(260, 160, 0.14), 0.35)   # an envelope for each month
    mix.put(w("L05", 20), click(400, 0.09), 0.7)                        # "paid": the UNPAID stamp

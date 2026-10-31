#!/usr/bin/env python3
"""A1 stop-motion: sets.py renders every 2nd frame of each shot; fill the gaps with hard links to the last rendered
frame so layers/<SEQ>/f_0001 … f_1151 is a full sequence for EffectCraft. Run from the episode folder: python3 build/holds.py LIFT CROSS OFFICE TABLE COUNTER"""
import os, sys, json
for seq in sys.argv[1:]:
    d = 'layers/%s/' % seq
    spans = json.load(open(d + 'spans.json'))['render']
    have = sorted({m + 1 for m0, m1 in spans for m in range(m0, m1, 2)})          # the frames sets.py rendered
    made = 0
    for f in range(1, 1152):
        p = d + 'f_%04d.png' % f
        if f in have: continue
        src = max([h for h in have if h <= f], default=have[0])
        if os.path.exists(p): os.remove(p)
        os.link(d + 'f_%04d.png' % src, p); made += 1
    print(seq, len(have), 'rendered,', made, 'held')

#!/usr/bin/env python3
"""House subtitles from audio/vo_timeline.json → build/caps.jsx. Phrases end on punctuation; long phrases split into balanced
chunks of ≤ 22 characters. Hidden where a stamp carries the same words."""
import json, math
T = json.load(open('audio/vo_timeline.json'))
words = []
for L in sorted(T['words']):
    for w, t in T['words'][L]:
        if words and (w.startswith('.') or w.startswith(',') or w.startswith('%')) and words[-1][2] == L: words[-1][0] += w; continue
        words.append([w, math.floor(t * 24), L])
HIDE = [(77, 97), (363, 386), (434, 466), (954, 1041)]                      # NOT LUCK stamp · BROKEN CLOCK? · "a Machiavellian twist" on the quote card · "IT FEELS WON" + the follow card
phrases, cur = [], []
for w in words:
    if cur and cur[-1][2] != w[2]: phrases.append(cur); cur = []
    cur.append(w)
    if w[0][-1] in '.,?:!' and w[0] != 'U.S.': phrases.append(cur); cur = []
if cur: phrases.append(cur)
FIX = {'weights': 'waits', 'weighted': 'waited', 'Q': 'queue', 'fansite': 'fan site', 'Clocks,': 'clocks?', 'one.': 'won.',
       'MikiGo': 'Meikigo', 'around': 'round', '1': 'one', 'o': "o'clock.", "'clock.": ''}   # Whisper's mishearings → the script
def text(g):
    s = ' '.join(FIX.get(x[0], x[0]) for x in g)
    return ' '.join(s.split()).replace(' %', '%').replace('71 %', '71%')
caps = []
for p in phrases:
    n = max(1, math.ceil(len(text(p)) / 22)); k = math.ceil(len(p) / n)
    while True:
        parts = [p[i:i + k] for i in range(0, len(p), k)]
        if all(len(text(q)) <= 24 for q in parts) or k == 1: break
        k -= 1
    caps += parts
out = []
for i, g in enumerate(caps):
    f0 = g[0][1]; nxt = caps[i + 1][0][1] if i + 1 < len(caps) else f0 + 40
    f1 = min(nxt - 1, g[-1][1] + 30)
    if any(a <= f0 <= b for a, b in HIDE): continue
    for a, b in HIDE:
        if f0 < a <= f1: f1 = a - 1
    out.append([f0, f1, text(g).upper().replace('U.S.', 'US'), [x[1] for x in g]])
open('build/caps.jsx', 'w').write('// T1 big word captions (build/caps.py): [in, out, text, word frames]\nvar CAP = ' + json.dumps(out) + ';\n')
for c in out: print(c[0], c[1], c[2])

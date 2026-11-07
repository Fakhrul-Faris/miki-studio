#!/usr/bin/env python3
"""EX21 captions (EX15 style, user 2026-11-05: "its perfect already so stick with it") from audio/vo_timeline.json → build/caps.jsx (30 fps frames). The reference (user's screen recording,
2026-11-01): a sentence builds as a small paragraph of one or two lines, sentence case, each word fading in and rising into
place on its spoken frame. Blocks end at a sentence or clause end once they are long enough, on a long pause, at MAXC
characters, or before a centre card. Words under a card (the quote, the counter, the follow card) are skipped.
Run from the episode folder."""
import json
FPS, HOLD = 30, 35
W = json.load(open("audio/vo_timeline.json"))["words"]
# words under a card or a pinned label: the price card ($1.50, since 1985), the quote, the counter, the two money labels,
# the title card (over "You pay to get in."), the follow card
SKIP = {("L09", i) for i in range(4)}                  # under the follow card
BLOCKS = [1949]                                        # follow card only
# Whisper: "boss's", "and" lower-case, "10"; the captions use the script's words
FIX = {("L05", 18): "bosses'", ("L05", 0): "And", ("L05", 38): "ten", ("L01", 8): "anyone.", ("L01", 9): "Then",
       ("L02", 4): "race.", ("L02", 5): "It", ("L02", 7): "it.", ("L02", 8): "And", ("L03", 22): "buy,",
       ("L03", 28): "Click,", ("L03", 30): "Click,", ("L03", 31): "pay.", ("L03", 32): "For",
       ("L05", 23): '"That\'s', ("L05", 24): 'cute.', ("L05", 25): "But", ("L05", 28): 'anyone."'}
GAP, MINC, MAXC = 25, 9, 70
out = []
for L in sorted(W):
    ws, i = W[L], 0
    while i < len(ws):
        t, f = ws[i][0], int(ws[i][1] * FPS); nxt = ws[i + 1][0] if i + 1 < len(ws) else ""
        if (L, i) in FIX:
            if FIX[(L, i)] is None: i += 1; continue
            t = FIX[(L, i)]
        if (t == "60" and nxt.startswith("%")) or (t == "light" and nxt.startswith("bulbs")) or (t == "torch" and nxt.startswith("lights")):
            t = t + nxt; i += 1
        if (L, i) not in SKIP: out.append((f, t))
        i += 1
blk, cur = [], []
for f, t in out:
    n = sum(len(x[1]) + 1 for x in cur)
    if cur and (n + len(t) > MAXC or (cur[-1][1][-1] in ".?" ) or (cur[-1][1][-1] in ",:" and n >= MINC) or
                f - cur[-1][0] > GAP or any(cur[0][0] < b <= f for b in BLOCKS)):
        blk.append(cur); cur = []
    cur.append((f, t))
blk.append(cur)
caps = []
for k, b in enumerate(blk):
    f_out = blk[k + 1][0][0] if k + 1 < len(blk) else b[-1][0] + HOLD
    f_out = min([f_out, b[-1][0] + HOLD] + [x - 2 for x in BLOCKS if x > b[-1][0] + 4])
    caps.append([b[0][0], f_out, [[t, f] for f, t in b]])
open("build/caps.jsx", "w").write("// caption blocks (build/caps.py): [in, out, [[word, frame], …]]\nvar CAP = " + json.dumps(caps) + ";\n")
print(len(caps), "blocks")
for c in caps: print(c[0], c[1], " ".join(w[0] for w in c[2]))

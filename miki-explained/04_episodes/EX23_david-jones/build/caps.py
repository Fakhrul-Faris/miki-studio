#!/usr/bin/env python3
"""EX23 captions (EX15 style, user 2026-11-05: "its perfect already so stick with it") from audio/vo_timeline.json → build/caps.jsx (30 fps frames). The reference (user's screen recording,
2026-11-01): a sentence builds as a small paragraph of one or two lines, sentence case, each word fading in and rising into
place on its spoken frame. Blocks end at a sentence or clause end once they are long enough, on a long pause, at MAXC
characters, or before a centre card. Words under a card (the quote, the counter, the follow card) are skipped.
Run from the episode folder."""
import json
FPS, HOLD = 30, 35
W = json.load(open("audio/vo_timeline.json"))["words"]
# words under a card or a pinned label: the price card ($1.50, since 1985), the quote, the counter, the two money labels,
# the title card (over "You pay to get in."), the follow card
SKIP = {("L07", i) for i in range(4)}                  # under the follow card
BLOCKS = [1883]                                        # follow card only
# Whisper: numbers split, a misheard word; the captions use the script's words
FIX = {("L01", 0): "$2.1", ("L01", 1): None, ("L01", 2): "billion.", ("L01", 3): "Then", ("L01", 4): "$100",
       ("L02", 9): "$2.1", ("L02", 10): None, ("L02", 15): "$100", ("L02", 20): "188", ("L05", 4): "then", ("L05", 2): "$74",
       ("L05", 5): "$95.", ("L04", 24): "$400", ("L06", 11): "up.", ("L06", 12): "You're", ("L02", 7): "Sold", ("L02", 13): "2014,", ("L02", 17): "ten",
       ("L03", 5): "thing:", ("L03", 6): "everything", ("L02", 6): "store.", ("L03", 17): "malls,", ("L05", 1): "grew:", ("L05", 3): "million,", ("L05", 12): "September,"}
GAP, MINC, MAXC = 40, 9, 74
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

#!/usr/bin/env python3
"""EX17 captions from audio/vo_timeline.json → build/caps.jsx (60 fps frames). The reference (user's screen recording,
2026-11-01): a sentence builds as a small paragraph of one or two lines, sentence case, each word fading in and rising into
place on its spoken frame. Blocks end at a sentence or clause end once they are long enough, on a long pause, at MAXC
characters, or before a centre card. Words under a card (the quote, the counter, the follow card) are skipped.
Run from the episode folder."""
import json
FPS, HOLD = 60, 70
W = json.load(open("audio/vo_timeline.json"))["words"]
# no centre cards this episode (no quote/title/counter card — the gauges and legend carry the numbers in-world);
# only the follow card needs skipping
SKIP = {("L07", i) for i in range(4)}
BLOCKS = [2121]                                        # follow card only
FIX = {("L01", 0): "Keeping", ("L01", 3): "costs", ("L06", 6): "ask:", ("L06", 8): "study?", ("L02", 9): "1980s", ("L02", 10): None, ("L05", 19): "Halve"}   # Whisper: "cost", "1" ",980s", "Have"
GAP, MINC, MAXC = 50, 18, 64
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
        while t and t[0].isdigit() and i + 1 < len(ws) and (ws[i + 1][0].startswith(".") or ws[i + 1][0] == "%"):
            i += 1; t += ws[i][0]                       # Whisper splits "71.8%." into "71" "." "8%." — rejoin numbers
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

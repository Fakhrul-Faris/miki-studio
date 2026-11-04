#!/usr/bin/env python3
"""EX20 captions from audio/vo_timeline.json → build/caps.jsx (30 fps frames). v4 (clay look, reference Main Edit.mp4):
short uppercase phrases of up to three words in Bebas Neue, centred low, each word rising in on its spoken frame; one key
word per phrase at most in the accent green (KEY). Words under the follow card are skipped. Run from the episode folder."""
import json
FPS, HOLD = 30, 30
W = json.load(open("audio/vo_timeline.json"))["words"]
SKIP = {("L08", i) for i in range(4)}
BLOCKS = [1714]                                        # follow card only
FIX = {("L02", 4): "Read.", ("L07", 9): "Read", ("L04", 21): "in", ("L04", 23): "safe-deposit", ("L04", 24): None, ("L04", 27): "five",
       ("L06", 2): "$4.8", ("L06", 3): None, ("L06", 10): "$1.2", ("L06", 11): None}   # Whisper: "Reed", "and his", split numbers
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
# the phrases, written by hand (a mechanical split broke "HE DROVE A / USED TOYOTA"); * = the green key word
PHRASES = """THIS JANITOR | HAD ALMOST | *$8 MILLION. | NOBODY KNEW | UNTIL HE *DIED.
HIS NAME WAS | RONALD *READ. | HE PUMPED GAS | AND CLEANED FLOORS | HIS WHOLE LIFE. | HE DROVE | A USED *TOYOTA. | HE HELD HIS JACKET |
TOGETHER WITH | A SAFETY *PIN. | HE GATHERED | FALLEN *BRANCHES | TO HEAT HIS HOUSE.
HE BOUGHT | SMALL PIECES | OF COMPANIES | HE UNDERSTOOD. | *RAILROADS, | *BANKS, | *DRUGSTORES, | *PHONE COMPANIES, | ONES THAT PAID HIM |
A LITTLE *CASH | EVERY YEAR | JUST FOR OWNING THEM.
THEN HE HELD ON | FOR *DECADES | AND KEPT BUYING. | BY THE END, | HE OWNED AT LEAST | *95 COMPANIES. | THE PAPER CERTIFICATES |
IN HIS SAFE-DEPOSIT BOX | STOOD *FIVE INCHES | HIGH.
HE DIDN'T EARN | A *FORTUNE. | HE *OWNED ONE. | ONE SMALL *PIECE | AT A TIME.
HE LEFT | *$4.8 MILLION | TO HIS TOWN'S | *HOSPITAL | AND *$1.2 MILLION | TO ITS *LIBRARY. | THE *BIGGEST GIFTS | EITHER HAD | EVER RECEIVED.
MOST PEOPLE | SPEND THEIR LIVES | WORKING FOR | BUSINESSES. | RONALD READ | QUIETLY *OWNED THEM."""
norm = lambda x: "".join(ch for ch in x.lower() if ch.isalnum() or ch in "$.'-").strip(".")
blk, k = [], 0
for ph in [p_.strip() for p_ in PHRASES.replace("|\n", "|").replace("\n", "|").split("|") if p_.strip()]:
    b = []
    for tok in ph.split():
        f, t = out[k]; k += 1
        assert norm(tok.lstrip("*")) == norm(t), (tok, t)
        b.append((f, t, tok.startswith("*")))
    blk.append(b)
assert k == len(out), (k, len(out))
caps = []
for k, b in enumerate(blk):
    f_out = blk[k + 1][0][0] if k + 1 < len(blk) else b[-1][0] + HOLD
    f_out = min([f_out, b[-1][0] + HOLD] + [x - 2 for x in BLOCKS if x > b[-1][0] + 4])
    ws = [[t.upper(), f, 1 if key else 0] for f, t, key in b]
    caps.append([b[0][0], f_out, ws])
open("build/caps.jsx", "w").write("// caption blocks (build/caps.py): [in, out, [[WORD, frame, key], …]]\nvar CAP = " + json.dumps(caps) + ";\n")
print(len(caps), "blocks")
for c in caps: print(c[0], c[1], " ".join(("*" + w[0]) if w[2] else w[0] for w in c[2]))

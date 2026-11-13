#!/usr/bin/env python3
"""EX40 provisional timeline (no voice yet): ~3.4 words/s -> tl.json (same shape as EX39's timeline.py output).
Replaced by timeline.py once the user's ElevenLabs lines are in audio/."""
import json, re
DISPLAY = {   # caption text; * marks the key word (selection box)
 "L01": "Ramly Burger doesn't actually sell you a burger. It sells the *patty.",
 "L02": "A pack of *six chicken patties is *RM9.40 at Jaya Grocer. About *RM1.60 each.",
 "L03": "At the stall, with egg, cabbage and sauce, it sells for *RM5 or more.",
 "L04": "And here's what most people don't know. There's *no franchise fee. *No royalty.",
 "L05": "You buy the patties, get a *hawker licence from your council, and a *cart for a few thousand ringgit. That's a Ramly Burger stall.",
 "L06": "About *30,000 people did exactly that.",
 "L07": "Ramly sells to every one of them. About *RM1 billion a year, and it never paid for a single *cart.",
}
t, caps, lines = 0.25, [], {}
for L, txt in DISPLAY.items():
    t += 0.16 if caps else 0; s = t
    for w in txt.split():
        caps.append({"L": L, "w": w.lstrip("*"), "key": w.startswith("*"), "t": round(t, 3)})
        t += 0.29 + (0.3 if re.search(r"\d", w) else 0) + (0.12 if w.endswith(",") else 0) + (0.28 if re.search(r"[.?]$", w) else 0)
    lines[L] = {"start": round(s, 3), "end": round(t - 0.15, 3)}
dur = round(t + 3.2, 3)          # end text + the signature sound (2.8 s)
json.dump({"dur": dur, "lines": lines, "caps": caps, "provisional": True}, open("tl.json", "w"))
for i, c in enumerate(caps): print(i, c["w"], c["t"], end=" | ")
print("\ndur", dur)

# After a PNG-sequence render: lists all-black frames (GPU glitch) and one-frame flicker suspects.
# uv run --with pillow --with numpy python frames_check.py media/full_frames [cut frames...]
import sys, glob
import numpy as np
from PIL import Image
fs = sorted(glob.glob(sys.argv[1] + "/*.png")); cuts = {int(c) for c in sys.argv[2:]}
a = [np.asarray(Image.open(f).convert("L").resize((270, 480)), float) for f in fs]
black = [i for i, x in enumerate(a) if x.mean() < 3]
flick = []
for i in range(2, len(a) - 1):
    if {i - 1, i, i + 1} & cuts or {i - 1, i, i + 1} & set(black): continue
    d1 = np.abs(a[i] - a[i - 1]).mean(); d2 = np.abs(a[i + 1] - a[i - 1]).mean()
    if d1 > 0.4 and d1 > 1.5 * d2: flick.append(i)
print("BLACK", ",".join(map(str, black)) or "-"); print("FLICKER", ",".join(map(str, flick)) or "-")

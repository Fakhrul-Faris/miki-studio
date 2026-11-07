# set LOOK dials in BlendShot.tsx, render the 3 test frames, print luma vs EEVEE.  python3 sweep.py key=1600 panel=1400 fill=1300 amb=55 exp=0
import re, subprocess, sys
K = "/Users/user/Private/miki-studio/miki-explained/tools/raea/kit/BlendShot.tsx"
names = {"key": "keyGain", "panel": "keyPanelGain", "fill": "fillGain", "amb": "ambient", "exp": "exposure", "con": "contrast"}
s = open(K).read()
for a in sys.argv[1:]:
    k, v = a.split("="); s = re.sub(rf"({names[k]}: )[-\d.]+", rf"\g<1>{v}", s)
open(K, "w").write(s)
def luma(p, crop=None):
    vf = (f"crop={crop}," if crop else "") + "scale=64:114,format=gray"
    b = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-vf", vf, "-f", "rawvideo", "-"], capture_output=True).stdout
    return round(sum(b) / len(b), 1)
out = []
for f, r in ((40, "0040"), (672, "0672"), (1090, "1090")):
    subprocess.run([".local/bin/raea".join(["/Users/user/", ""]), "render", "look.tsx", "-o", f"raea_{f}.png", "--frame", str(f)], capture_output=True)
    out.append(f"{f}: {luma(f'raea_{f}.png')}/{luma(f'ref/eevee_{r}.png')} c {luma(f'raea_{f}.png','540:960:270:480')}/{luma(f'ref/eevee_{r}.png','540:960:270:480')}")
print(" ".join(sys.argv[1:]), "|", " | ".join(out))

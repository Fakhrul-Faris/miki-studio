import sys
from PIL import Image
def lum(p): return 0.2126*p[0]+0.7152*p[1]+0.0722*p[2]
for f in sys.argv[1:]:
    im = Image.open(f).convert("RGB").resize((144, 256)); px = list(im.get_flattened_data() if hasattr(im, "get_flattened_data") else im.getdata()); srt = sorted(px, key=lum); n = len(srt)
    avg = lambda S: tuple(round(sum(p[i] for p in S)/len(S)) for i in range(3))
    print(f.split("/")[-1], "lit", avg(srt[int(n*.85):]), "mid", avg(srt[int(n*.45):int(n*.55)]), "dark", avg(srt[:int(n*.15)]))

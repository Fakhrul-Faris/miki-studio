#!/usr/bin/env python3
"""Prepare a reference collection for a one-by-one art-direction review (series bible).
   ~/.local/bin/uv run --with pillow --with numpy python miki-explained/tools/refs_view.py \
       "<collection>/Style A" A miki-explained/00_bible/series-bible/work/A [--chunk 58]
1. Renames every file IN PLACE to a stable id: A-core-001.jpg, A-light-014.png, A-motion-003.mp4 … (folder order, then the
   original name). The original names are kept in <collection>/_rename_map.csv (and a copy in the work dir); rerunning
   skips files that already have an id. Undo: rename back from the map.
2. view/<id>.jpg: a 768 px (long edge) copy of every image for viewing (~550 tokens instead of ~1,600); animated GIFs
   use their first frame and are also treated as clips.
3. chunks/C01.txt …: the image ids split into review chunks of about --chunk images, in folder order (one chunk = one
   session). Motion clips go in chunks/M01.txt, M02.txt.
4. strips/<id>.jpg: key moments of each clip (and GIF): frames at shot changes (scene score > 0.25), topped up with
   even samples to at least 8, at most 12, tiled 4 across at 384 px, each labelled with its time.
5. dups.txt: exact byte duplicates (md5), the only files safe to skip; look-alike pairs are listed for checking, never skipped."""
import csv, hashlib, io, math, os, re, subprocess, sys
from PIL import Image, ImageDraw, ImageSequence
Image.MAX_IMAGE_PIXELS = None

SRC, LETTER, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
CHUNK = int(sys.argv[sys.argv.index("--chunk") + 1]) if "--chunk" in sys.argv else 58
IMG = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tif", ".tiff"}
VID = {".mp4", ".mov", ".mkv", ".webm", ".m4v"}
CODE = {"core look": "core", "core": "core", "look": "core", "lighting": "light", "light": "light", "color": "color",
        "colour": "color", "camera": "cam", "people": "people", "places": "places", "props": "props", "type": "type",
        "motion": "motion"}
ORDER = ["core", "light", "color", "cam", "people", "places", "props", "type", "motion"]
for d in ("view", "chunks", "strips"): os.makedirs(f"{OUT}/{d}", exist_ok=True)
IDRE = re.compile(rf"^{LETTER}-[a-z]+-\d{{3}}$")

# ---- 1. rename in place (folder order, then original name), with a map
mapf = os.path.join(SRC, "_rename_map.csv")
old = list(csv.DictReader(open(mapf))) if os.path.exists(mapf) else []
done = {r["new"] for r in old}
files = []
for root, _, fs in os.walk(SRC):
    top = os.path.relpath(root, SRC).split(os.sep)[0]
    if top == ".": continue
    code = CODE.get(top.lower(), re.sub(r"[^a-z]", "", top.lower())[:8])
    for f in fs:
        ext = os.path.splitext(f)[1].lower()
        if ext in IMG | VID: files.append((code, os.path.join(root, f), f, ext))
files.sort(key=lambda x: (ORDER.index(x[0]) if x[0] in ORDER else 99, x[1].lower()))
count = {}
for r in old:
    c = r["new"].split("-")[1]; count[c] = max(count.get(c, 0), int(r["new"].split("-")[2].split(".")[0]))
new_rows = []
for code, path, f, ext in files:
    if IDRE.match(os.path.splitext(f)[0]): continue
    count[code] = count.get(code, 0) + 1
    nid = f"{LETTER}-{code}-{count[code]:03d}"
    dst = os.path.join(os.path.dirname(path), nid + (".jpg" if ext == ".jpeg" else ext))
    os.rename(path, dst)
    new_rows.append(dict(new=os.path.relpath(dst, SRC), old=os.path.relpath(path, SRC)))
rows = old + new_rows
with open(mapf, "w", newline="") as fh:
    w = csv.DictWriter(fh, fieldnames=["new", "old"]); w.writeheader(); w.writerows(rows)
with open(f"{OUT}/rename_map.csv", "w", newline="") as fh:
    w = csv.DictWriter(fh, fieldnames=["new", "old"]); w.writeheader(); w.writerows(rows)
print(f"renamed {len(new_rows)} files (map: {mapf})")

# ---- 2. view copies + 5. duplicates
items, clips, md5s, dh = [], [], {}, {}
def dhash(im):
    g = im.convert("L").resize((9, 8), Image.LANCZOS); px = list(g.getdata())
    return sum(1 << i for i in range(64) if px[(i // 8) * 9 + i % 8 + 1] > px[(i // 8) * 9 + i % 8])
for r in sorted(rows, key=lambda r: (ORDER.index(r["new"].split("-")[1]) if r["new"].split("-")[1] in ORDER else 99, r["new"])):
    p = os.path.join(SRC, r["new"]); nid = os.path.splitext(os.path.basename(p))[0]; ext = os.path.splitext(p)[1].lower()
    if not os.path.exists(p): continue
    if ext in VID: clips.append((nid, p)); continue
    md5s.setdefault(hashlib.md5(open(p, "rb").read()).hexdigest(), []).append(nid)
    try:
        im = Image.open(p); anim = getattr(im, "is_animated", False)
        if anim: im.seek(0); clips.append((nid, p))
        im = im.convert("RGB")
    except Exception as e:
        print("unreadable", p, e); continue
    dh[nid] = dhash(im)
    v = f"{OUT}/view/{nid}.jpg"
    if not os.path.exists(v):
        im.thumbnail((768, 768), Image.LANCZOS); im.save(v, quality=85)
    items.append(nid)
dup_exact = [ids for ids in md5s.values() if len(ids) > 1]
look = [(a, b) for i, a in enumerate(items) for b in items[i + 1:] if bin(dh[a] ^ dh[b]).count("1") <= 5]
with open(f"{OUT}/dups.txt", "w") as fh:
    fh.write("# exact byte duplicates (safe to skip all but the first)\n" + "".join(" = ".join(d) + "\n" for d in dup_exact))
    fh.write("\n# look-alike pairs (check by eye; different images in one series often match; never skip)\n" + "".join(f"{a} ~ {b}\n" for a, b in look))
print(f"images {len(items)} · clips/gifs {len(clips)} · exact dups {len(dup_exact)} · look-alike pairs {len(look)}")

# ---- 3. chunks (images), then motion chunks
skip = {x for d in dup_exact for x in d[1:]}
todo = [i for i in items if i not in skip]
n = max(1, math.ceil(len(todo) / CHUNK)); size = math.ceil(len(todo) / n)
for k in range(n):
    open(f"{OUT}/chunks/C{k + 1:02d}.txt", "w").write("\n".join(todo[k * size:(k + 1) * size]) + "\n")
m = max(1, math.ceil(len(clips) / 22)); msz = math.ceil(len(clips) / m)
for k in range(m):
    open(f"{OUT}/chunks/M{k + 1:02d}.txt", "w").write("\n".join(c for c, _ in clips[k * msz:(k + 1) * msz]) + "\n")
print(f"chunks: {n} image chunks of ~{size}, {m} motion chunks of ~{msz}")

# ---- 4. key-moment strips
def frame_at(p, t):
    out = subprocess.run(["ffmpeg", "-loglevel", "error", "-ss", f"{t:.2f}", "-i", p, "-frames:v", "1", "-vf", "scale=384:-2",
                          "-f", "image2pipe", "-vcodec", "png", "-"], capture_output=True).stdout
    return Image.open(io.BytesIO(out)).convert("RGB") if out else None
for nid, p in clips:
    dst = f"{OUT}/strips/{nid}.jpg"
    if os.path.exists(dst): continue
    pr = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p], capture_output=True, text=True).stdout.strip()
    try: dur = float(pr)
    except ValueError: dur = 0
    if dur <= 0 and p.lower().endswith(".gif"):
        dur = sum(fr.info.get("duration", 100) for fr in ImageSequence.Iterator(Image.open(p))) / 1000
    if dur <= 0: continue
    info = subprocess.run(["ffmpeg", "-hide_banner", "-i", p, "-vf", "scale=160:-2,select='gt(scene,0.25)',showinfo", "-an", "-f", "null", "-"],
                          capture_output=True, text=True).stderr
    cuts = [float(x) for x in re.findall(r"pts_time:([\d.]+)", info)]
    ts = sorted(set([0.2] + [c + 0.15 for c in cuts]))
    if len(ts) > 12: ts = [ts[round(i * (len(ts) - 1) / 11)] for i in range(12)]
    while len(ts) < 8:                                   # top up with even samples in the biggest gaps
        edges = [0] + ts + [dur]; g = max(range(len(edges) - 1), key=lambda i: edges[i + 1] - edges[i])
        ts = sorted(ts + [(edges[g] + edges[g + 1]) / 2])
    tiles = [(t, frame_at(p, min(t, dur - 0.05))) for t in ts]; tiles = [(t, im) for t, im in tiles if im]
    if not tiles: continue
    th = max(im.height for _, im in tiles); rows_n = math.ceil(len(tiles) / 4)
    sh = Image.new("RGB", (384 * 4, (th + 24) * rows_n), (20, 20, 20)); d = ImageDraw.Draw(sh)
    for i, (t, im) in enumerate(tiles):
        x, y = (i % 4) * 384, (i // 4) * (th + 24); sh.paste(im, (x, y + 24))
        d.text((x + 6, y + 5), f"{t:.1f}s{'  cut' if any(abs(t - c - 0.15) < 0.01 for c in cuts) else ''}", fill=(255, 220, 90))
    d.text((6, sh.height - 14), f"{nid} · {dur:.1f}s · {len(cuts)} cuts", fill=(160, 160, 160))
    sh.save(dst, quality=82)
print("strips:", len(os.listdir(f"{OUT}/strips")))

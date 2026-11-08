#!/usr/bin/env python3
"""Reference-collection prep for a series bible: measures every image with code and tiles contact sheets, so the
judging pass looks at sheets (about 100 tokens an image) instead of single files (about 1,600).
   ~/.local/bin/uv run --with pillow --with numpy --with opencv-python python miki-explained/tools/refs_prep.py \
       "<collection>/Style A" miki-explained/00_bible/series-bible/work/A
Writes into the out dir:
  inventory.csv   one row per image: id, folder, file, w, h, aspect, dup_of, and the measurements below
  summary.txt     per-folder medians + the collection's overall palette/accent picture (read this first; text only)
  sheets/<folder>_NN.jpg   4x4 contact sheets, 1568 px square, each tile labelled with its id
  motion/<clip>.jpg        8 frames of each video (and animated GIF) + motion.csv (duration, cuts per second, motion)
  links.txt       text pulled from .rtf / .textClipping / .txt link files
Measurements (on a 512 px copy): lum_mean (0 dark..1 light), lum_std (contrast), sat_mean, colourfulness
(Hasler-Suesstrunk), grain (high-pass energy: flat vector ~0, textured/noisy higher), edges (Canny density),
palette (6 colours by share), accent (the most saturated colour that holds >= 2 % of the image), dark_share
(pixels with lum < 0.2). Near-duplicates (dHash distance <= 5) are marked dup_of and left off the sheets."""
import csv, json, os, subprocess, sys
from collections import defaultdict
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageSequence
Image.MAX_IMAGE_PIXELS = None          # some references are huge (225 MP); we only read them to thumbnail

SRC, OUT = sys.argv[1], sys.argv[2]
IMG = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tif", ".tiff"}
VID = {".mp4", ".mov", ".mkv", ".webm", ".m4v"}
TXT = {".rtf", ".textclipping", ".txt", ".md", ".webloc"}
os.makedirs(f"{OUT}/sheets", exist_ok=True); os.makedirs(f"{OUT}/motion", exist_ok=True)
SLUG = lambda s: "".join(c.lower() if c.isalnum() else "-" for c in s).strip("-")


def dhash(im):
    g = np.asarray(im.convert("L").resize((9, 8), Image.LANCZOS), dtype=np.int16)
    return int("".join("1" if b else "0" for b in (g[:, 1:] > g[:, :-1]).flatten()), 2)


def measure(im):
    im = im.convert("RGB"); im.thumbnail((512, 512))
    a = np.asarray(im, dtype=np.float32) / 255
    lum = 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
    hsv = cv2.cvtColor((a * 255).astype(np.uint8), cv2.COLOR_RGB2HSV)
    sat = hsv[..., 1] / 255
    rg, yb = a[..., 0] - a[..., 1], 0.5 * (a[..., 0] + a[..., 1]) - a[..., 2]
    colourful = float(np.hypot(rg.std(), yb.std()) + 0.3 * np.hypot(rg.mean(), yb.mean()))
    g8 = (lum * 255).astype(np.uint8)
    grain = float(np.abs(lum - cv2.GaussianBlur(lum, (0, 0), 1.2)).mean())
    edges = float((cv2.Canny(g8, 60, 160) > 0).mean())
    q = im.quantize(colors=6, method=Image.Quantize.MEDIANCUT)
    pal, counts = q.getpalette()[:18], sorted(q.getcolors(), reverse=True)
    tot = sum(c for c, _ in counts)
    palette = [("#%02X%02X%02X" % tuple(pal[i * 3:i * 3 + 3]), round(c / tot, 3)) for c, i in counts]
    def s_of(h):
        r, g_, b = (int(h[k:k + 2], 16) / 255 for k in (1, 3, 5)); mx, mn = max(r, g_, b), min(r, g_, b)
        return 0 if mx == 0 else (mx - mn) / mx
    acc = [p for p in palette if p[1] >= 0.02 and s_of(p[0]) > 0.45]
    accent = max(acc, key=lambda p: s_of(p[0]))[0] if acc else ""
    return dict(lum_mean=round(float(lum.mean()), 3), lum_std=round(float(lum.std()), 3), sat_mean=round(float(sat.mean()), 3),
                colourful=round(colourful, 3), grain=round(grain, 4), edges=round(edges, 4),
                dark_share=round(float((lum < 0.2).mean()), 3), palette=json.dumps(palette), accent=accent)


def open_image(p):
    im = Image.open(p)
    animated = getattr(im, "is_animated", False)
    if animated: im.seek(0)
    return im.convert("RGB"), animated


rows, links, clips = [], [], []
seen = {}
for root, _, files in os.walk(SRC):
    for f in sorted(files):
        p = os.path.join(root, f); ext = os.path.splitext(f)[1].lower()
        folder = os.path.relpath(root, SRC).split(os.sep)[0]
        if ext in TXT:
            try:
                if ext == ".rtf": t = subprocess.run(["textutil", "-convert", "txt", "-stdout", p], capture_output=True, text=True).stdout
                elif ext == ".textclipping":
                    t = subprocess.run(["plutil", "-p", p], capture_output=True, text=True).stdout
                else: t = open(p, errors="ignore").read()
            except Exception as e: t = f"(unreadable: {e})"
            links.append(f"## {os.path.relpath(p, SRC)}\n{t.strip()}\n")
        elif ext in VID: clips.append((folder, p))
        elif ext in IMG:
            try:
                im, animated = open_image(p)
            except Exception as e:
                print("skip", p, e); continue
            if animated: clips.append((folder, p))
            fid = f"{SLUG(folder)[:10]}-{sum(1 for r in rows if r['folder'] == folder) + 1:03d}"
            h = dhash(im); dup = next((k for k, v in seen.items() if bin(h ^ v).count("1") <= 5), "")
            if not dup: seen[fid] = h
            r = dict(id=fid, folder=folder, file=os.path.relpath(p, SRC), w=im.width, h=im.height,
                     aspect=round(im.width / im.height, 3), animated=int(animated), dup_of=dup)
            r.update(measure(im)); rows.append(r)

keys = list(rows[0].keys()) if rows else []
with open(f"{OUT}/inventory.csv", "w", newline="") as fh:
    w = csv.DictWriter(fh, fieldnames=keys); w.writeheader(); w.writerows(rows)
open(f"{OUT}/links.txt", "w").write("\n".join(links))

# contact sheets: 4x4, 392 px tiles, id label on each; duplicates left out
T, N = 392, 4
by = defaultdict(list)
for r in rows:
    if not r["dup_of"]: by[r["folder"]].append(r)
sheet_list = []
for folder, rs in by.items():
    for k in range(0, len(rs), N * N):
        sh = Image.new("RGB", (T * N, T * N), (24, 24, 24)); d = ImageDraw.Draw(sh)
        for j, r in enumerate(rs[k:k + N * N]):
            im, _ = open_image(os.path.join(SRC, r["file"])); im.thumbnail((T - 8, T - 30))
            x, y = (j % N) * T, (j // N) * T
            sh.paste(im, (x + (T - im.width) // 2, y + 26 + (T - 30 - im.height) // 2))
            d.rectangle([x, y, x + T, y + 22], fill=(0, 0, 0)); d.text((x + 6, y + 5), r["id"], fill=(255, 220, 90))
        name = f"sheets/{SLUG(folder)}_{k // (N * N) + 1:02d}.jpg"; sh.save(f"{OUT}/{name}", quality=82); sheet_list.append(name)

# motion: 8 frames per clip on one 1568 px sheet (4x2) + cut rate and motion energy
mrows = []
for folder, p in clips:
    name = f"{SLUG(folder)}_{SLUG(os.path.splitext(os.path.basename(p))[0])[:40]}"
    try:
        dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p],
                                   capture_output=True, text=True).stdout.strip() or 0)
    except ValueError: dur = 0
    if dur <= 0 and p.lower().endswith(".gif"):
        g = Image.open(p); dur = sum(fr.info.get("duration", 100) for fr in ImageSequence.Iterator(g)) / 1000
    if dur <= 0: continue
    tiles = []
    for i in range(8):
        tt = dur * (i + 0.5) / 8
        fr = subprocess.run(["ffmpeg", "-loglevel", "error", "-ss", f"{tt:.2f}", "-i", p, "-frames:v", "1", "-vf", "scale=392:-2",
                             "-f", "image2pipe", "-vcodec", "png", "-"], capture_output=True).stdout
        if fr:
            tiles.append(Image.open(__import__("io").BytesIO(fr)).convert("RGB"))
    if not tiles: continue
    th = max(t.height for t in tiles); sh = Image.new("RGB", (392 * 4, (th + 26) * 2), (24, 24, 24)); d = ImageDraw.Draw(sh)
    for i, t in enumerate(tiles):
        x, y = (i % 4) * 392, (i // 4) * (th + 26); sh.paste(t, (x, y + 26)); d.text((x + 6, y + 6), f"{dur * (i + 0.5) / 8:.1f}s", fill=(255, 220, 90))
    sh.save(f"{OUT}/motion/{name}.jpg", quality=82)
    sc = subprocess.run(["ffmpeg", "-hide_banner", "-i", p, "-vf", "scale=160:-2,select='gt(scene,0.3)',showinfo", "-an", "-f", "null", "-"],
                        capture_output=True, text=True).stderr.count("pts_time:")
    mo = subprocess.run(["ffmpeg", "-hide_banner", "-i", p, "-vf", "scale=160:-2,fps=10,tblend=all_mode=difference,signalstats,metadata=print:key=lavfi.signalstats.YAVG",
                         "-an", "-f", "null", "-"], capture_output=True, text=True).stderr
    vals = [float(l.split("=")[1]) for l in mo.splitlines() if "YAVG=" in l]
    mrows.append(dict(clip=name, folder=folder, file=os.path.relpath(p, SRC), dur=round(dur, 2), cuts=sc,
                      cuts_per_s=round(sc / dur, 3), motion=round(float(np.mean(vals)) if vals else 0, 2)))
with open(f"{OUT}/motion/motion.csv", "w", newline="") as fh:
    if mrows:
        w = csv.DictWriter(fh, fieldnames=list(mrows[0].keys())); w.writeheader(); w.writerows(mrows)

# summary: per-folder medians + overall accent hues (text only; read this before any sheet)
lines = [f"source: {SRC}", f"images: {len(rows)} ({sum(1 for r in rows if r['dup_of'])} near-duplicates left off sheets) · clips/gifs: {len(mrows)} · link files: {len(links)}",
         f"sheets: {len(sheet_list)} (4x4) · motion sheets: {len(mrows)}", ""]
num = ["lum_mean", "lum_std", "sat_mean", "colourful", "grain", "edges", "dark_share", "aspect"]
lines.append("folder        n   " + "  ".join(f"{k:>10}" for k in num))
groups = defaultdict(list)
for r in rows: groups[r["folder"]].append(r)
groups["ALL"] = rows
for f, rs in groups.items():
    lines.append(f"{f[:12]:12} {len(rs):3}   " + "  ".join(f"{np.median([float(r[k]) for r in rs]):>10.3f}" for k in num))
hues = defaultdict(int)
for r in rows:
    if r["accent"]:
        rr, gg, bb = (int(r["accent"][k:k + 2], 16) for k in (1, 3, 5))
        hue = int(cv2.cvtColor(np.uint8([[[rr, gg, bb]]]), cv2.COLOR_RGB2HSV)[0, 0, 0]) * 2
        hues[["red", "orange", "yellow", "green", "cyan", "blue", "violet", "magenta", "red"][min(8, (hue + 20) // 45)]] += 1
lines += ["", "accent hue counts (images with a saturated accent): " + ", ".join(f"{k} {v}" for k, v in sorted(hues.items(), key=lambda x: -x[1])),
          f"images without a saturated accent: {sum(1 for r in rows if not r['accent'])}"]
if mrows:
    lines += ["", "motion: median clip %.1f s, median cuts/s %.2f, median motion %.1f" % (
        np.median([m['dur'] for m in mrows]), np.median([m['cuts_per_s'] for m in mrows]), np.median([m['motion'] for m in mrows]))]
open(f"{OUT}/summary.txt", "w").write("\n".join(lines) + "\n")
print("\n".join(lines))

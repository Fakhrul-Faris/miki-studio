#!/usr/bin/env python3
"""Measured evidence for a frame before anyone looks at it (adopted 2026-11-11).

Method from majidmanzarpour/threejs-game-skills (threejs-qa-release inspector, MIT): a coarse grid
(90x160 portrait, nearest sample), 4-bit colour buckets, Rec.709 luminance. Thresholds are the
inspector's, plus a mean-luminance check for our white world. Signals, not verdicts: a flag needs an
explanation or a fix, never noise added to raise a number.

  flag        metric                    threshold   what the user called it
  EMPTY       edgeDensity               < 0.04      "the world is pretty empty", "too plain"
  ONE-TONE    dominantColorShare        > 0.60      "white washing", one colour fills the frame
  FLAT        colorEntropyBits          < 3.0       sparse flat palette
  WASHOUT     luminance p95 - p5        < 60        "washed out" (fog / cone / darkness compression)
  BLOWN       luminance mean            > 200       whites with no value range

The caption band (y 1340-1460 at 1080x1920) is ignored by default so captions don't hide an empty world.

Usage: frame_metrics.py IMG_OR_DIR [...] [--style A|B] [--keep-captions] [--json]   (default A)
       exit 1 if any frame is flagged.
"""
import json, math, sys
from pathlib import Path
from PIL import Image

TH = dict(edge=0.04, dominant=0.60, entropy=3.0, contrast=60, mean=200)
# House baseline (means over a film's frames, sampled every 3 s), measured 2026-11-11:
#   approved  EX29 v1 edge 0.260 ent 5.73 | EX35 final edge 0.221 ent 4.43
#   rejected  EX35 preview ("empty", "white washing", "lack of texture") edge 0.150 ent 3.89
#             A v1 clay boxes ("too empty, too plain") ent 2.54 contrast 39.8
# A set of frames whose MEAN falls under these is BELOW-BASELINE (per-frame flags only catch blunt failures).
# Style B is two-tone flat by design: FLAT is off and its baseline is contrast / one-colour share instead,
#   liked EX33 contrast 131 dominant 0.34 | rejected EX34 ("plain back, not enough detail") contrast 86 dominant 0.41
#   (two films only: recalibrate as more B episodes are judged).
BASE = {"A": dict(edge=0.20, entropy=4.3), "B": dict(contrast=110, dominant=0.37)}


def metrics(path, skip_captions=True, style="A"):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    if skip_captions and h > w:  # portrait: drop the EX15 caption band, scaled to this size
        a, b = round(h * 1340 / 1920), round(h * 1460 / 1920)
        top, bot = im.crop((0, 0, w, a)), im.crop((0, b, w, h))
        im = Image.new("RGB", (w, a + h - b)); im.paste(top, (0, 0)); im.paste(bot, (0, a))
        w, h = im.size
    cols, rows = (90, 160) if h > w else (160, 90)
    g = im.resize((cols, rows), Image.NEAREST)
    b = g.tobytes(); px = [tuple(b[i:i + 3]) for i in range(0, len(b), 3)]
    lum = [0.2126 * r + 0.7152 * gg + 0.0722 * b for r, gg, b in px]
    buckets = {}
    for r, gg, b in px:
        k = (r >> 4, gg >> 4, b >> 4); buckets[k] = buckets.get(k, 0) + 1
    n = len(px)
    ent = -sum(c / n * math.log2(c / n) for c in buckets.values())
    s = sorted(lum)
    edges = checked = 0
    for y in range(rows - 1):
        for x in range(cols - 1):
            i = y * cols + x
            if max(abs(lum[i] - lum[i + 1]), abs(lum[i] - lum[i + cols])) > 12: edges += 1
            checked += 1
    m = dict(edge=round(edges / checked, 3), dominant=round(max(buckets.values()) / n, 3),
             entropy=round(ent, 2), contrast=round(s[int(n * .95)] - s[int(n * .05)], 1),
             mean=round(sum(lum) / n, 1))
    flags = [f for f, bad in (("EMPTY", m["edge"] < TH["edge"]), ("ONE-TONE", m["dominant"] > TH["dominant"]),
                              ("FLAT", style != "B" and m["entropy"] < TH["entropy"]), ("WASHOUT", m["contrast"] < TH["contrast"]),
                              ("BLOWN", m["mean"] > TH["mean"])) if bad]
    return m, flags


def main():
    argv = sys.argv[1:]
    style = argv[argv.index("--style") + 1].upper() if "--style" in argv else "A"
    args = [a for i, a in enumerate(argv) if not a.startswith("--") and (i == 0 or argv[i - 1] != "--style")]
    keep, as_json = "--keep-captions" in sys.argv, "--json" in sys.argv
    files = []
    for a in args:
        p = Path(a)
        files += sorted(q for q in p.iterdir() if q.suffix.lower() in (".png", ".jpg", ".jpeg")) if p.is_dir() else [p]
    if not files: sys.exit(__doc__)
    rows, bad = [], 0
    for f in files:
        m, fl = metrics(f, not keep, style); bad += bool(fl)
        rows.append(dict(file=str(f), **m, flags=fl))
    if as_json: print(json.dumps(rows, indent=1))
    else:
        print(f"{'frame':28} edge  dom   ent  contr  mean  flags")
        for r in rows:
            print(f"{Path(r['file']).name[-28:]:28} {r['edge']:.3f} {r['dominant']:.2f} {r['entropy']:5.2f} {r['contrast']:5.1f} {r['mean']:5.1f}  {' '.join(r['flags'])}")
        avg = lambda k: sum(r[k] for r in rows) / len(rows)
        bs = BASE[style]
        miss = [f"{k} {'<=' if k == 'dominant' else '>='} {v}" for k, v in bs.items()
                if (avg(k) > v if k == "dominant" else avg(k) < v)]
        below = len(rows) >= 8 and bool(miss)  # baseline = a film-wide mean; a 4-frame sheet is too small a sample
        print(f"{'MEAN':28} {avg('edge'):.3f} {avg('dominant'):.2f} {avg('entropy'):5.2f} {avg('contrast'):5.1f} {avg('mean'):5.1f}  {bad}/{len(rows)} flagged"
              + (f"  BELOW-BASELINE {style} (needs {', '.join(miss)})" if below else ""))
        bad += below
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()

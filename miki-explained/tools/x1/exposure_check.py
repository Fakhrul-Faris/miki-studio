"""Exposure / colour QC for rendered stills (client rule: never too bright, rich detailed colour).

  py film/tools/exposure_check.py [--day] [--ui] film/tests/4F_v5_f0034.jpg [more.jpg ...]

--ui (Miki Explained, added 2026-11-16 after EX45): interface shots. A white app screen is meant to be bright and
grey-on-white is meant to be low in colour, so the clip / near-white / overexposed / desaturated / dull tests are
skipped; what still fails is a muddy screen (low contrast between the page and its text, or a murky frame).

Per image prints luma percentiles, clipped/near-white area, lifted blacks, contrast, saturation and
colourfulness, then PASS or the list of problems. Thresholds are for normal shots; a deliberate flash
frame or an "inside the cloud/dust" transition frame may fail on purpose — say so in your notes.
"""
import subprocess, sys
import numpy as np


def load(p):
    probe = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height',
                            '-of', 'csv=p=0', p], capture_output=True, text=True).stdout.strip().split(',')
    w, h = int(probe[0]), int(probe[1])
    s = 640 / w
    W, H = 640, int(h * s) // 2 * 2
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-vf', f'scale={W}:{H}', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'],
                         capture_output=True).stdout
    return np.frombuffer(raw, np.uint8).reshape(H, W, 3).astype(np.float32) / 255.0


UI = False   # --ui: interface shots (see the docstring)
DAY = False  # --day: daylight exteriors (Act III sky, Act IV temple) may sit brighter and hazier


def check(p):
    im = load(p)
    lum = im @ np.array([0.2126, 0.7152, 0.0722], np.float32)
    p1, p5, p50, p95, p99 = np.percentile(lum, [1, 5, 50, 95, 99])
    clipped = float((im.max(axis=2) > 0.985).mean() * 100)
    white = float((lum > 0.92).mean() * 100)
    mx, mn = im.max(axis=2), im.min(axis=2)
    sat = np.where(mx > 1e-3, (mx - mn) / np.maximum(mx, 1e-3), 0)
    msat = float(sat[lum > 0.08].mean()) if (lum > 0.08).any() else 0.0
    rg = im[..., 0] - im[..., 1]
    yb = 0.5 * (im[..., 0] + im[..., 1]) - im[..., 2]
    colorful = float((np.sqrt(rg.std() ** 2 + yb.std() ** 2) + 0.3 * np.sqrt(rg.mean() ** 2 + yb.mean() ** 2)) * 255)
    hue_spread = float(np.std(np.arctan2(yb[sat > 0.2], rg[sat > 0.2]))) if (sat > 0.2).sum() > 100 else 0.0
    probs = []
    if UI:
        if p95 - p5 < 0.45: probs.append(f'MUDDY UI: p95-p5 = {p95 - p5:.2f} (page vs text/bezel contrast; want > 0.45)')
        if p50 < 0.04 and p95 < 0.25: probs.append(f'UNDEREXPOSED / MURKY: median {p50:.2f}, p95 {p95:.2f}')
        print(f'{p}  [ui]\n  luma p5 {p5:.2f} p50 {p50:.2f} p95 {p95:.2f}')
        print('  ' + ('PASS' if not probs else '\n  '.join(probs)))
        return not probs
    if clipped > 0.5:
        probs.append(f'TOO BRIGHT: {clipped:.1f}% of pixels clipped (max 0.5%: nothing may clip except a pinpoint)')
    if white > 2.0:
        probs.append(f'TOO BRIGHT: {white:.1f}% near-white area (max 2%)')
    if p50 > (0.58 if DAY else 0.45):
        probs.append(f'OVEREXPOSED: median luma {p50:.2f} (aim 0.12-0.45 interiors/macro, <= 0.58 daylight)')
    if p50 < 0.04 and p95 < 0.25:
        probs.append(f'UNDEREXPOSED / MURKY: median {p50:.2f}, p95 {p95:.2f}')
    if p5 > (0.15 if DAY else 0.08):
        probs.append(f'WASHED OUT: blacks lifted (p5 luma {p5:.2f}; want < 0.08) - too much fog/haze or flat light')
    if p95 - p5 < 0.35:
        probs.append(f'LOW CONTRAST: p95-p5 = {p95 - p5:.2f} (want > 0.45)')
    if colorful < 18:
        probs.append(f'DULL COLOUR: colourfulness {colorful:.0f} (want > 25): add colour contrast (warm key vs cool fill, coloured practicals, material hue variation)')
    if msat < 0.12:
        probs.append(f'DESATURATED: mean saturation {msat:.2f}')
    print(f'{p}\n  luma p1 {p1:.2f} p5 {p5:.2f} p50 {p50:.2f} p95 {p95:.2f} p99 {p99:.2f} | clipped {clipped:.1f}% white {white:.1f}% '
          f'| sat {msat:.2f} colourful {colorful:.0f} hue-spread {hue_spread:.2f}')
    print('  ' + ('PASS' if not probs else '\n  '.join(probs)))
    return not probs


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if a not in ('--day', '--ui')]
    DAY = '--day' in sys.argv; UI = '--ui' in sys.argv
    ok = all([check(p) for p in args])
    sys.exit(0 if ok else 2)

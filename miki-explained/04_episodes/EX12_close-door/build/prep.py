#!/usr/bin/env python3
"""EX12 prep (run from the episode folder after build/cutout.py CO_finger CO_waiting1 CO_waiting2):
- the pointing hand and its paper button, separated (the button under the finger is filled from the opposite side);
- the lift plate's door hole (in every depth band), the two door leaves, the lobby view behind them;
- the three props for the pull-back (lift panel, crossing box, thermostat box), the M1 print, customer recolours."""
import json, math
import numpy as np
from PIL import Image, ImageOps, ImageFilter
PAPER, INK = np.array([0xEF, 0xE8, 0xDC]), np.array([0x11, 0x11, 0x11])
info = {}

# 1. hand / button
im = Image.open('layers/CO_finger.png').convert('RGBA'); a = np.asarray(im).astype(float); H, W = a.shape[:2]
r, g, b = a[..., 0], a[..., 1], a[..., 2]
och = (r > 150) & (g > 100) & (g < 180) & (b < 110) & (r - b > 70)
ys, xs = np.nonzero(och); cx, cy = (xs.min() + xs.max()) / 2 + 5, (ys.min() + ys.max()) / 2 + 5; R = 218
yy, xx = np.mgrid[:H, :W]; d = np.hypot(xx - cx, yy - cy)
tip, far = np.array([cx - 43, cy - 8]), np.array([cx - 135, cy + 300])          # the finger's axis (tip → knuckles)
v = far - tip; t = np.clip(((xx - tip[0]) * v[0] + (yy - tip[1]) * v[1]) / (v @ v), 0, 1)
fd = np.hypot(xx - (tip[0] + t * v[0]), yy - (tip[1] + t * v[1])); finger = fd < 50 + 25 * t
inbtn = d < R
lum = 0.3 * r + 0.59 * g + 0.11 * b; mx = np.maximum(np.maximum(r, g), b); sat = (mx - np.minimum(np.minimum(r, g), b)) / np.maximum(mx, 1)
cream = (lum > 185) & (sat < 0.2); fing = finger & ~och
erase = (d < R + 70) & ~fing & ~((xx < cx - 120) & (yy > cy + 150))       # the button and its rim go; the knuckles stay
side_r = ((xx - tip[0]) * v[1] - (yy - tip[1]) * v[0]) / np.hypot(*v)                 # signed distance to the right of the finger axis
erase |= (side_r > (50 + 25 * t)) & (yy < cy + 200)                                 # the torn rim beside the finger
erase |= (yy < tip[1] - 30)
L_ = Image.fromarray(lum.astype('uint8')); m1 = np.asarray(L_.filter(ImageFilter.BoxBlur(6))).astype(float)
var = np.asarray(Image.fromarray(np.clip((lum - m1) ** 2, 0, 255).astype('uint8')).filter(ImageFilter.BoxBlur(6))).astype(float)
smooth_paper = (var < 30) & (lum > 140) & (sat < 0.25)                                 # the torn backing, not the halftone skin
erase |= smooth_paper & (side_r > 40)
hand = a.copy(); hand[..., 3] = np.where(erase, 0, a[..., 3])
Image.fromarray(hand.astype('uint8')).save('layers/CO_hand_point.png')
# the button, redrawn clean: ochre paper disc (texture from the clean upper-right), a shaded side, a halftone ink ring, a torn cream rim
S2 = 2 * R; yy2, xx2 = np.mgrid[:S2, :S2]; dd = np.hypot(xx2 - R, yy2 - R); ang = np.arctan2(yy2 - R, xx2 - R)
rng = np.random.default_rng(3); grain = rng.normal(0, 9, (S2, S2))
tex = np.stack([201 + grain, 138 + grain * 0.8, 43 + grain * 0.5], -1)
btn = np.zeros((S2, S2, 4)); btn[..., :3] = tex
side = (dd > 150) & (dd < 186) & (np.cos(ang - 0.4) > 0.2); btn[..., :3] = np.where(side[..., None], tex * 0.72, btn[..., :3])
ring = (dd >= 186) & (dd < 204); dots = ((xx2 // 4 + yy2 // 4) % 2 == 0); btn[..., :3] = np.where((ring & (dots | (dd < 198)))[..., None], INK, btn[..., :3])
edge = 212 + 5 * np.sin(ang * 23) + 3 * np.sin(ang * 61 + 1)
rim = (dd >= 204) & (dd < edge); btn[..., :3] = np.where((rim | (ring & ~(dots | (dd < 198))))[..., None], [244, 238, 228], btn[..., :3])
btn[..., 3] = np.where(dd < edge, 255, 0)
Image.fromarray(btn.astype('uint8')).save('layers/CO_button.png')
info['hand'] = {'size': [W, H], 'tip': [float(tip[0] + 6), float(tip[1] + 4)], 'button_r_px': 186}
print('hand', W, H, 'button centre', round(cx), round(cy))

# 2. the lift: door hole in every band, door leaves, lobby view
DOOR = (318, 500, 1128, 2085); MID = 723
for k in range(3):
    p = 'layers/box_ENV_lift/band_%d.png' % k; bimg = Image.open(p).convert('RGBA'); ba = np.asarray(bimg).copy()
    ba[DOOR[1]:DOOR[3], DOOR[0]:DOOR[2], 3] = 0; Image.fromarray(ba).save(p)
lift = Image.open('media/ENV_lift.png').convert('RGBA')
lift.crop((DOOR[0], DOOR[1], MID, DOOR[3])).save('layers/door_left.png'); lift.crop((MID, DOOR[1], DOOR[2], DOOR[3])).save('layers/door_right.png')
lob = Image.open('media/ENV_lobby.png').convert('RGB').crop((DOOR[0] + 6, DOOR[1] + 6, DOOR[2] - 6, DOOR[3] - 6))
lob.resize((int(lob.width * 1.7), int(lob.height * 1.7)), Image.LANCZOS).save('layers/lobby_view.png')
info['door'] = DOOR; info['mid'] = MID

# 3. props for the pull-back: the three button boxes as standing paper cards (torn-ish rim)
PROPS = {'prop_lift': ('ENV_lift', (1270, 690, 1440, 1640)), 'prop_cross': ('ENV_crossing', (205, 820, 590, 1490)),
         'prop_office': ('ENV_office', (150, 765, 625, 1530))}
for n, (pl, box) in PROPS.items():
    c = Image.open('media/%s.png' % pl).convert('RGBA').crop(box); m = Image.new('L', c.size, 0)
    rng = np.random.default_rng(len(n)); arr = np.zeros((c.height, c.width), 'uint8'); e = 14
    arr[e:-e, e:-e] = 255; ed = Image.fromarray(arr).filter(ImageFilter.GaussianBlur(3)).point(lambda q: 255 if q > 120 else 0)
    rim = Image.new('RGBA', (c.width + 2 * e, c.height + 2 * e), (244, 238, 228, 255)); rim.paste(c, (e, e), ed)
    rim.save('layers/%s.png' % n); info[n] = {'size': list(rim.size), 'box': box}
print('props ok')

# 4. M1 print (ink-and-paper duotone, cream border)
ph = ImageOps.autocontrast(Image.open('media/M1.png').convert('L'), cutoff=1).filter(ImageFilter.UnsharpMask(2, 80))
gg = np.asarray(ph).astype(float)[..., None] / 255; duo = (INK + (PAPER - INK) * gg).astype('uint8')
pr = Image.fromarray(duo); bw = 60; card = Image.new('RGB', (pr.width + 2 * bw, pr.height + 2 * bw), (246, 241, 232)); card.paste(pr, (bw, bw))
card.save('layers/M1_print.png')

# 5. customers: the ochre jacket recoloured (ink, light) → with mirroring, 6 looks
def variant(src, dst, mode):
    im = Image.open('layers/%s.png' % src); a = np.asarray(im).astype(float); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mx, mn = np.maximum(np.maximum(r, g), b), np.minimum(np.minimum(r, g), b); sat = (mx - mn) / np.maximum(mx, 1)
    och = (sat > 0.35) & (r > g) & (g > b); lum = 0.3 * r + 0.59 * g + 0.11 * b
    v = lum * 0.45 if mode == 'ink' else 120 + lum * 0.55
    for ch, k in enumerate((1.0, 0.96, 0.86)): a[..., ch] = np.where(och, v * k, a[..., ch])
    Image.fromarray(a.astype('uint8'), 'RGBA').save('layers/%s.png' % dst)
for p in ('CO_waiting1', 'CO_waiting2'):
    variant(p, p + '_ink', 'ink'); variant(p, p + '_light', 'light')
json.dump(info, open('layers/prep.json', 'w'), indent=1); print('prep ok')

# EX31 vehicle paths (single source of truth) + the collision check, before any render (user 2026-11-10: the Grab car
# drove through parked cars, the scooter and the jam car).
#   ~/.local/bin/uv run -q python paths.py         → paths.json (per frame: Grab car x, z, yaw; jam cars x) + the check
# ex31.tsx reads paths.json, so what is checked is exactly what is rendered. Footprints are oriented boxes on the ground
# (x along the street, z toward the camera); a car is 4.22 × 1.80 m (car_b). Exit code 1 if anything overlaps.
import json, math, sys
FPS, END = 60, 32.6                          # 60 fps from 2026-11-11 (EX35 rule); + the Meikigo end card
CARD = 1.6
N = round((END + CARD) * FPS)
W, AR = 4.6, 2.2
KERB, LANE = AR + 1.75, AR + 5.2              # kerb lane (parked cars, pick-ups) and the driving lane (z)
STOP, PICK = -3.0, 24.5                      # the first rider's spot; the next rider's spot
CAR = (4.22, 1.80)

def clamp(u): return max(0.0, min(1.0, u))
def k(t, a, b): return clamp((t - a) / (b - a))
def io3(u): return 4 * u ** 3 if u < 0.5 else 1 - (-2 * u + 2) ** 3 / 2
def out3(u): return 1 - (1 - u) ** 3
def in2(u): return u * u
def smooth(u): u = clamp(u); return u * u * (3 - 2 * u)
def lerp(a, b, u): return a + (b - a) * u

def lane_change(x, x0, x1, z0, z1):          # an S-curve between lanes over the street stretch x0 → x1
    return lerp(z0, z1, smooth((x - x0) / (x1 - x0)))

def grab(t):
    """the Grab car's centre (x, z) at film time t"""
    if t < 9.4:                                                   # L01: already rolling on frame 1, easing into the kerb at the rider
        x = lerp(-24, STOP, out3(k(t, -0.6, 2.6)))
        return x, lane_change(x, STOP - 10, STOP - 0.5, LANE, KERB)
    if t < 26.4:                                                  # L03
        if t < 14.55: x = lerp(STOP, 12.3, io3(k(t, 9.4, 13.6)))  # one eased move: pull out, then brake 1.5 m behind the jam
                                                                  # (was a stop at 12.6 + a full-speed restart at 12.7)
        else: x = lerp(12.3, PICK, io3(k(t, 14.55, 15.9)))        # the jam has moved: on to the next rider
        if x < 7.0: return x, lane_change(x, STOP + 1, STOP + 10, KERB, LANE)
        return x, lane_change(x, PICK - 9, PICK - 0.5, LANE, KERB)
    if t < 28.6: return STOP, KERB                                # L05: back at the first rider
    x = lerp(STOP, 26.0, io3(k(t, 28.6, 31.4)))                   # drives off: out to the lane, then away
    return x, lane_change(x, STOP + 1, STOP + 10, KERB, LANE)

JAM0 = [18.0, 23.0, 28.0]
def jam(t, n):                                                   # they pull away just before the Grab car moves, and keep going
    u = (t - 14.4) / 1.2                                          # (was: accelerate, then a dead stop at 15.6)
    return JAM0[n] + (0 if u <= 0 else 18 * u * u if u < 1 else 18 + 36 * (u - 1))

FLEET = [(-26 + (n // 2) * 5.3 + (n % 2) * 2.6, AR + 4.6 if n % 2 else AR + 7.4) for n in range(22)]
def fleet_on(t, n): return k(t, 19.3 + n * 0.03, 19.8 + n * 0.03) * (1 - k(t, 25.9, 26.3))

# --- per-frame paths (yaw from the direction of travel; held when still)
frames, yaw = [], 0.0
for f in range(N):
    t = f / FPS; x, z = grab(t); x2, z2 = grab(t + 1 / FPS); d = math.hypot(x2 - x, z2 - z)
    if 1e-4 < d < 1.0: yaw = math.atan2(-(z2 - z), x2 - x)       # heading from travel; a cut's teleport (d >= 1 m) never turns it
    frames.append([round(x, 4), round(z, 4), round(yaw, 4), *[round(jam(t, n), 4) for n in range(3)]])

# --- the camera, as data (was inline in ex31.tsx): every move eased in-out; the L03 track follows a smoothed car; then each
#     continuous stretch between the cuts is Gaussian-smoothed so no velocity jumps remain (user 2026-11-11)
TW, BBX, PX = (14, 0, -34), 3 * W + W / 2, 60
def L3(a, b, u): return [a[i] + (b[i] - a[i]) * u for i in range(3)]
def gauss(vals, sigma):                                           # edge-padded Gaussian, sigma in frames
    r = int(3 * sigma); w = [math.exp(-0.5 * (i / sigma) ** 2) for i in range(-r, r + 1)]; sw = sum(w); n = len(vals)
    return [sum(w[j] * vals[min(n - 1, max(0, i + j - r))] for j in range(2 * r + 1)) / sw for i in range(n)]
CX = gauss([fr[0] for fr in frames], 0.35 * FPS); CZ = gauss([fr[1] for fr in frames], 0.35 * FPS)
def camera(f):
    T = f / FPS; K = lambda a, b: io3(k(T, a, b)); fov = 0.62
    if T < 4.7:
        u = K(0, 4.6); return L3([-20, 16, 22], [STOP - 5, 7.5, 13], u), L3([-6, 1.5, 1.5], [STOP, 1.6, AR + 1.4], u), fov
    if T < 9.2:
        up = K(5.5, 7.7)
        return L3([STOP - 1.4, 3.0, AR + 6.2], [STOP - 10, 18, 26], up), L3([STOP + 0.2, 2.3, AR + 2.2], [TW[0], 40, TW[2]], up), lerp(0.55, 0.62, up)
    if T < 19.4:
        down, board = K(9.2, 10.9), K(15.95, 17.3); cx, cz = CX[f], CZ[f]   # was 1.0 s / 0.9 s: whip tilts
        return (L3(L3([STOP - 10, 18, 26], [cx - 9, 11, cz + 15], down), [BBX - 4, 12.5, 12], board),
                L3(L3([TW[0], 40, TW[2]], [cx + 2, 1.2, cz - 1], down), [BBX, 10.6, -5.4], board), fov)
    if T < 23.05:
        # the street from above as the fleet lights → a calm tilt up the tower to its LED "170,000 DRIVERS" → a short push
        # toward its signs into the cut (was a 77 m flight in 0.85 s to "MAX 20%", up to 175 m/s)
        rise, tilt, push = K(19.25, 20.5), K(20.6, 22.3), io3(k(T, 22.3, 23.6))
        c = L3(L3([BBX - 4, 12.5, 12], [-2, 15, 27], rise), [0, 17, 48], tilt)
        l = L3(L3([BBX, 10.6, -5.4], [3, 0, 4], rise), [8, 24, -26], tilt)
        return L3(c, [TW[0], 40.5, TW[2] + 9], 0.16 * push), L3(l, [TW[0], 40.5, TW[2]], 0.45 * push), lerp(0.62, 0.58, push)
    if T < 26.4:
        # tower → desk: blend the view DIRECTION (slerp), not the aim point, so the ~100 deg tilt turns at an even rate
        d = K(23.05, 24.55); c0, c1 = [PX - 3, 2.2, 16], [PX, 3.4, 11.7]; cm = L3(c0, c1, d)
        def nrm(v): n = math.sqrt(sum(x * x for x in v)); return [x / n for x in v]
        u0 = nrm([PX + 5 - c0[0], 26 - c0[1], -26 - c0[2]]); u1 = nrm([PX - c1[0], 0.8 - c1[1], 10.05 - c1[2]])
        om = math.acos(max(-1, min(1, sum(p * q for p, q in zip(u0, u1)))))
        dv = [(math.sin((1 - d) * om) * p + math.sin(d * om) * q) / math.sin(om) for p, q in zip(u0, u1)]
        dist = lerp(40, math.dist(c1, [PX, 0.8, 10.05]), d)
        return cm, [cm[i] + dv[i] * dist for i in range(3)], 0.75
    out, wide = K(26.4, 27.6), K(28.5, 30.5)
    return (L3(L3([STOP + 0.2, 2.6, AR + 4.0], [STOP - 6, 8, 15], out), [-14, 15, 24], wide),
            L3(L3([STOP + 0.2, 2.3, AR + 2.2], [STOP, 1.6, AR + 1.5], out), [2, 1.5, 2], wide), fov)
CUTS = [round(c * FPS) for c in (4.7, 23.05, 26.4)]               # the intended hard cuts on words (match framing kept)
raw = [camera(f) for f in range(N)]; cam = [None] * N
for a, b in zip([0] + CUTS, CUTS + [N]):
    ch = [gauss([raw[f][p][i] for f in range(a, b)], 0.12 * FPS) for p in (0, 1) for i in range(3)]
    fv = [raw[f][2] for f in range(a, b)]
    for j, f in enumerate(range(a, b)): cam[f] = [round(ch[c][j], 4) for c in range(6)] + [round(fv[j], 4)]
# speed check: camera acceleration per frame inside each stretch (a jump = a jerk on screen)
worst = []
for a, b in zip([0] + CUTS, CUTS + [N]):
    for f in range(a + 2, b):
        acc = max(abs(cam[f][i] - 2 * cam[f - 1][i] + cam[f - 2][i]) for i in range(6)) * FPS * FPS
        worst.append((round(acc, 1), round(f / FPS, 2)))
worst.sort(reverse=True); print("camera: peak acceleration (m/s^2, time):", worst[:4])
json.dump({"fps": FPS, "frames": frames, "fleet": FLEET, "cam": cam}, open("paths.json", "w"))

# --- the check: oriented boxes (centre, size, yaw) vs every obstacle near the street
def corners(cx, cz, L, Wd, yw):
    c, s = math.cos(yw), math.sin(yw); out = []
    for dx, dz in ((L / 2, Wd / 2), (L / 2, -Wd / 2), (-L / 2, -Wd / 2), (-L / 2, Wd / 2)):
        out.append((cx + dx * c + dz * s, cz - dx * s + dz * c))       # yaw turns +x toward -z
    return out
def overlap(a, b, margin=0.08):
    for poly in (a, b):
        for i in range(4):
            (x1, z1), (x2, z2) = poly[i], poly[(i + 1) % 4]; nx, nz = -(z2 - z1), x2 - x1; L = math.hypot(nx, nz); nx, nz = nx / L, nz / L
            pa = [px * nx + pz * nz for px, pz in a]; pb = [px * nx + pz * nz for px, pz in b]
            if max(pa) + margin <= min(pb) or max(pb) + margin <= min(pa): return False
    return True
STATIC = {f"parked car x{x}": (x, KERB, *CAR, 0) for x in (-15, -11.5, 6, 13)}
STATIC.update({"rider": (STOP - 0.4, AR + 0.2, 0.5, 0.5, 0), "next rider": (26.5, AR + 0.2, 0.5, 0.5, 0), "figure x0.7": (0.7, 2.6, 0.5, 0.5, 0),
               "tele pole x20": (20, AR + 0.5, 0.4, 0.4, 0), "tele pole x-26": (-26, AR + 0.5, 0.4, 0.4, 0), "lamp x34": (34, AR + 9.4, 0.4, 0.4, 0),
               "stall": (-9.5, AR + 9.6, 1.8, 1.0, 0), "kerb (five-foot way edge)": (0, AR + 0.15, 200, 0.28, 0), "far pavement": (0, AR + 10, 200, 2.2, 0)})
for x in range(-6, 7): STATIC[f"column x{x * W:.1f}"] = (x * W, 1.95, 0.54, 0.54, 0)
bad = []
for f, (x, z, yw, *jx) in enumerate(frames):
    t = f / FPS; me = corners(x, z, *CAR, yw)
    others = dict(STATIC)
    for n in range(3): others[f"jam car {n}"] = (jx[n], LANE, *CAR, 0)
    for n, (fx, fz) in enumerate(FLEET):
        if fleet_on(t, n) > 0.05: others[f"fleet car {n}"] = (fx, fz, *CAR, 0)
    for name, (ox, oz, L, Wd, oy) in others.items():
        if overlap(me, corners(ox, oz, L, Wd, oy)): bad.append((round(t, 2), name))
    for n in range(3):                                            # the jam cars vs the fleet and the parked cars
        for name, (ox, oz, L, Wd, oy) in others.items():
            if name.startswith(("fleet", "parked")) and overlap(corners(jx[n], LANE, *CAR, 0), corners(ox, oz, L, Wd, oy)): bad.append((round(t, 2), f"jam car {n} × {name}"))
fl = [corners(fx, fz, *CAR, 0) for fx, fz in FLEET]
for i in range(len(FLEET)):
    for j in range(i + 1, len(FLEET)):
        if overlap(fl[i], fl[j]): bad.append(("fleet", f"fleet {i} × fleet {j}"))
if bad:
    seen = {}
    for t, name in bad: seen.setdefault(name, []).append(t)
    for name, ts in seen.items(): print(f"OVERLAP {name}: {min(ts) if isinstance(ts[0], float) else ''}–{max(ts) if isinstance(ts[0], float) else ''} s ({len(ts)} frames)")
    sys.exit(1)
print(f"paths.json written; collision check clean ({N} frames, {len(STATIC) + 3 + len(FLEET)} obstacles)")

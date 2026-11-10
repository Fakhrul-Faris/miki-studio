# EX31 vehicle paths (single source of truth) + the collision check, before any render (user 2026-11-10: the Grab car
# drove through parked cars, the scooter and the jam car).
#   ~/.local/bin/uv run -q python paths.py         → paths.json (per frame: Grab car x, z, yaw; jam cars x) + the check
# ex31.tsx reads paths.json, so what is checked is exactly what is rendered. Footprints are oriented boxes on the ground
# (x along the street, z toward the camera); a car is 4.22 × 1.80 m (car_b). Exit code 1 if anything overlaps.
import json, math, sys
FPS, N = 30, 978
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
    if t < 9.4:                                                   # L01: in the driving lane, curving into the kerb at the rider
        x = lerp(-22, STOP, out3(k(t, 0.3, 2.6)))
        return x, lane_change(x, STOP - 10, STOP - 0.5, LANE, KERB)
    if t < 26.4:                                                  # L03
        if t < 12.7: x = lerp(STOP, 6.0, io3(k(t, 9.4, 12.6)))    # pull out, "every trip"
        elif t < 14.55: x = lerp(6.0, 12.3, out3(k(t, 12.7, 13.6)))   # "distance": brakes 1.5 m behind the jam ("traffic")
        else: x = lerp(12.3, PICK, io3(k(t, 14.55, 15.9)))        # the jam has moved: on to the next rider
        if x < 7.0: return x, lane_change(x, STOP + 1, STOP + 10, KERB, LANE)
        return x, lane_change(x, PICK - 9, PICK - 0.5, LANE, KERB)
    if t < 28.6: return STOP, KERB                                # L05: back at the first rider
    x = lerp(STOP, 26.0, io3(k(t, 28.6, 31.4)))                   # drives off: out to the lane, then away
    return x, lane_change(x, STOP + 1, STOP + 10, KERB, LANE)

JAM0 = [18.0, 23.0, 28.0]
def jam(t, n): return JAM0[n] + 18 * in2(k(t, 14.4, 15.6))       # they pull away just before the Grab car moves

FLEET = [(-26 + (n // 2) * 5.3 + (n % 2) * 2.6, AR + 4.6 if n % 2 else AR + 7.4) for n in range(22)]
def fleet_on(t, n): return k(t, 19.3 + n * 0.03, 19.8 + n * 0.03) * (1 - k(t, 25.9, 26.3))

# --- per-frame paths (yaw from the direction of travel; held when still)
frames, yaw = [], 0.0
for f in range(N):
    t = f / FPS; x, z = grab(t); x2, z2 = grab(t + 1 / FPS)
    if math.hypot(x2 - x, z2 - z) > 1e-3: yaw = math.atan2(-(z2 - z), x2 - x)
    frames.append([round(x, 4), round(z, 4), round(yaw, 4), *[round(jam(t, n), 4) for n in range(3)]])
json.dump({"fps": FPS, "frames": frames, "fleet": FLEET}, open("paths.json", "w"))

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

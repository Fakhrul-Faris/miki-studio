# Accepts a bake when every coin ends in its compartment and is still once settled (sign-aware quaternion change).
import json, sys
d = json.load(open("media/phys_s3.json")); bad = []
for n, c in d["coins"].items():
    fr = c["frames"]; e = fr[-1]; r = c["release"] - d["f0"]
    land = next((i for i in range(r, len(fr)) if fr[i][1] < 1.32), None)
    if land is None: bad.append(n); continue
    def dq(a, b):
        s = sum(x * y for x, y in zip(a[3:], b[3:])); return 1 - abs(s)          # 0 when the rotations match
    jit = max((sum(abs(fr[i][j] - fr[i - 1][j]) for j in range(3)) + dq(fr[i], fr[i - 1]) for i in range(land + 30, len(fr))), default=0)
    zz = -1.45 if n[0] == "b" else 0.0
    inside = (-0.68 < e[0] < -0.355) if n == "token" else abs(e[0]) < 0.33
    if not (inside and abs(e[2] - zz) < 0.48 and 1.15 < e[1] < 1.4 and jit < 0.002): bad.append(f"{n}(x{e[0]:.2f} j{jit:.4f})")
print(len(bad), bad)

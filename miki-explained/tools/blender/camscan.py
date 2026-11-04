# camscan — before handing over a check .blend: find frames where the camera sits inside a visible mesh (it clips
# through a wall, a lamp, a slab) and frames where it swoops (moves faster than MAXV m/s). EX20 postmortem, 2026-11-05.
#   blender -b <check.blend> --python miki-explained/tools/blender/camscan.py -- [step=2] [maxv=25]
import sys, bpy
from mathutils import Vector
A = dict(a.split("=") for a in (sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []))
STEP, MAXV = int(A.get("step", 2)), float(A.get("maxv", 25))
sc = bpy.context.scene; cam = sc.camera; fps = sc.render.fps; hits = {}; fast = []; prev = None
meshes = [o for o in bpy.data.objects if o.type == "MESH"]
for f in range(sc.frame_start, sc.frame_end + 1, STEP):
    sc.frame_set(f); p = cam.matrix_world.translation.copy()
    if prev is not None and (p - prev).length * fps / STEP > MAXV: fast.append((f, round((p - prev).length * fps / STEP, 1)))
    prev = p
    for o in meshes:
        if o.hide_render or min(o.matrix_world.to_scale()) < 1e-4: continue
        bb = [o.matrix_world @ Vector(v) for v in o.bound_box]
        lo = [min(b[i] for b in bb) for i in range(3)]; hi = [max(b[i] for b in bb) for i in range(3)]
        if all(lo[i] - 0.1 <= p[i] <= hi[i] + 0.1 for i in range(3)): hits.setdefault(o.name.split(".")[0], []).append(f)
def runs(fs):
    out, s, q = [], fs[0], fs[0]
    for f in fs[1:] + [None]:
        if f is None or f - q > STEP: out.append((s, q)); s = f
        if f is not None: q = f
    return out
for n, fs in sorted(hits.items(), key=lambda x: x[1][0]): print("CLIP", n, [(a, b, round(a / fps, 1)) for a, b in runs(fs)])
for f, v in fast: print("FAST", f, round(f / fps, 1), f"{v} m/s")   # a hard cut on the frame hides a jump: ignore those
print("camscan:", len(hits), "objects clipped,", len(fast), "fast frames")

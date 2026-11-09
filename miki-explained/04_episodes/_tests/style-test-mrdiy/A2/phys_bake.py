# Bakes the S3 coin drops with Blender's rigid-body engine (Bullet) → media/phys_s3.json, played back by video_a.tsx.
# Drawers sit at their final places, relative to the S3 set's origin (DX): Mr DIY's at z 0, 99's at z -1.45 (raea).
# Coins are held (kinematic) until their release frame, then fall for real: they hit the tray, bounce, tilt and settle.
# Axes: raea x = Blender x, raea y = Blender z, raea z = -Blender y.
# blender -b -P phys_bake.py
import bpy, json, math, random
from mathutils import Quaternion, Vector

OUT = "/Users/user/Private/miki-studio/miki-explained/04_episodes/_tests/style-test-mrdiy/A2/media/phys_s3.json"
FPS, F0, F1 = 30, 505, 780            # bake 16.8 s → 26 s (S3 starts 17.01 s)
G = 9.81 * 3                          # the drawers are ~5x life size; stronger gravity keeps coins feeling small and quick
random.seed(3)

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.fps = FPS; sc.frame_start = F0; sc.frame_end = F1
bpy.ops.rigidbody.world_add()
rw = sc.rigidbody_world
rw.substeps_per_frame = 60; rw.solver_iterations = 60
rw.point_cache.frame_start = F0; rw.point_cache.frame_end = F1
sc.gravity = (0, 0, -G)

def R(x, y, z):                       # raea → Blender location
    return (x, -z, y)

def box(name, cx, cy, cz, sx, sy, sz):  # raea centre + size → static collider
    bpy.ops.mesh.primitive_cube_add(size=1, location=R(cx, cy, cz))
    o = bpy.context.active_object; o.name = name; o.scale = (sx, sz, sy)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)   # keep the origin: Bullet centres a BOX on it
    bpy.ops.rigidbody.object_add(); o.rigid_body.type = "PASSIVE"; o.rigid_body.collision_shape = "BOX"
    o.rigid_body.friction = 0.6; o.rigid_body.restitution = 0.1; o.rigid_body.collision_margin = 0.002
    return o

def drawer(n, zz):                    # mirrors Drawers() in video_a.tsx (tray, dividers, walls)
    box(f"{n}_tray", 0, 1.165, zz, 1.36, 0.02, 0.96)
    for dx in (-0.34, 0.34): box(f"{n}_div{dx}", dx, 1.235, zz, 0.03, 0.15, 0.96)
    for sx in (-0.695, 0.695): box(f"{n}_wl{sx}", sx, 1.235, zz, 0.03, 0.17, 0.96)
    for sz in (-0.495, 0.495): box(f"{n}_wb{sz}", 0, 1.235, zz + sz, 1.42, 0.17, 0.03)

drawer("diy", 0.0); drawer("spd", -1.45)

COINS = []                            # (name, radius, release frame, raea start x, y, z)
COINS.append(("token", 0.14, 511, -0.545, 3.4, -0.02))                       # the travelling coin into Mr DIY's left slot
# small coins wait in a column (0.13 apart so none touch); each is released so it lands on its beat
def column(tag, n, land0, zz, y0):
    for i in range(n):
        y = y0 + 0.13 * i; fall = math.sqrt(2 * (y - 1.2) / G)
        COINS.append((f"{tag}{i}", 0.11, round((land0 + i * 0.09 - fall) * FPS), random.uniform(-0.1, 0.1), y, zz + random.uniform(-0.2, 0.15)))
column("a", 11, 20.75, 0.0, 2.2)     # "eleven" at 20.73 s (each coin grows in over its first frames of fall)
column("b", 5, 24.15, -1.45, 2.2)    # "five" at 24.15 s

objs = {}
for name, r, rel, x, y, z in COINS:
    t = r * 0.13 / 0.42                # same proportions as the raea token
    bpy.ops.mesh.primitive_cylinder_add(vertices=20, radius=r, depth=t, location=R(x, y, z))
    o = bpy.context.active_object; o.name = name
    o.rotation_mode = "XYZ"; o.rotation_euler = (random.uniform(-0.25, 0.25), random.uniform(-0.25, 0.25), random.uniform(0, 6.28))
    bpy.ops.rigidbody.object_add(); rb = o.rigid_body
    rb.type = "ACTIVE"; rb.collision_shape = "CONVEX_HULL"; rb.use_margin = True; rb.mass = 0.01 * (r / 0.11) ** 2
    rb.friction = 0.6; rb.restitution = 0.05; rb.collision_margin = 0.001
    rb.linear_damping = 0.1; rb.angular_damping = 0.4
    rb.use_deactivation = True; rb.deactivate_linear_velocity = 0.15; rb.deactivate_angular_velocity = 0.6   # settled coins sleep (no jitter)
    rb.enabled = True; rb.kinematic = True   # held until release
    o.keyframe_insert("location", frame=F0); o.keyframe_insert("rotation_euler", frame=F0)
    rb.keyframe_insert("kinematic", frame=rel - 1)
    rb.kinematic = False; rb.keyframe_insert("kinematic", frame=rel)
    objs[name] = (o, rel)

bpy.ops.ptcache.bake_all(bake=True)

# local fix: the raea token's axis is z; Blender's cylinder axis is local Z (→ raea y). q_local turns raea z onto raea y.
QL = Quaternion((1, 0, 0), -math.pi / 2)
out = {"fps": FPS, "f0": F0, "coins": {}}
for name, (o, rel) in objs.items():
    fr = []
    for f in range(F0, F1 + 1):
        sc.frame_set(f)
        m = o.matrix_world; p = m.to_translation(); q = m.to_quaternion()
        # Blender → raea basis change: raea = B * blender, B maps (x, y, z) → (x, z, -y)
        qb = Quaternion((math.cos(-math.pi / 4), math.sin(-math.pi / 4), 0, 0))   # -90° about X
        qr = qb @ q @ qb.inverted()
        qf = qr @ QL
        fr.append([round(p.x, 4), round(p.z, 4), round(-p.y, 4), round(qf.x, 5), round(qf.y, 5), round(qf.z, 5), round(qf.w, 5)])
    out["coins"][name] = {"release": rel, "r": [c for c in COINS if c[0] == name][0][1], "frames": fr}
    last = fr[-1]; print("COIN", name, "rel", rel, "end", last[:3])
json.dump(out, open(OUT, "w"))
print("WROTE", OUT)

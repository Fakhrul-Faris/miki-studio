# EX45 S16: the standee and two stickers dropped onto the counter with Blender's rigid-body engine (Bullet) → media/phys45.json,
# played back by film45 (WORKING-RULES/LESSONS: anything that falls is baked, never hand-keyed). Copied in spirit from
# _tests/style-test-mrdiy/A2/phys_bake.py. Axes: raea x = Blender x, raea y = Blender z, raea z = -Blender y.
# blender -b -P phys45.py
import bpy, json, math
from mathutils import Quaternion
B = "/Users/user/Private/miki-studio/miki-explained/04_episodes/EX45_howto-duitnow-qr/build/"
TL = json.load(open(B + "tl.json")); W = lambda i: TL["caps"][i]["t"]
FPS = 30; CT = 1.057; TOP = CT + 0.006
F0 = round((W(98) - 0.12) * FPS); F1 = round((W(108) - 0.1) * FPS)
REL = {"sd": round((W(100) - 0.15) * FPS), "sk0": round((W(104) - 0.1) * FPS), "sk1": round((W(106) - 0.1) * FPS)}
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene; sc.render.fps = FPS; sc.frame_start = F0; sc.frame_end = F1
bpy.ops.rigidbody.world_add(); rw = sc.rigidbody_world; rw.substeps_per_frame = 60; rw.solver_iterations = 60
rw.point_cache.frame_start = F0; rw.point_cache.frame_end = F1; sc.gravity = (0, 0, -9.81)
R = lambda x, y, z: (x, -z, y)
bpy.ops.mesh.primitive_cube_add(size=1, location=R(0, TOP - 0.05, 0)); g = bpy.context.active_object; g.scale = (3, 3, 0.1)
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
bpy.ops.rigidbody.object_add(); g.rigid_body.type = "PASSIVE"; g.rigid_body.friction = 0.7; g.rigid_body.restitution = 0.15
def body(name, parts, at, yaw, mass):
    objs = []
    for (cx, cy, cz, sx, sy, sz, rx) in parts:           # raea-local centre + size, tilt about x
        bpy.ops.mesh.primitive_cube_add(size=1, location=R(at[0] + cx, at[1] + cy, at[2] + cz))
        o = bpy.context.active_object; o.scale = (sx, sz, sy); o.rotation_euler = (rx, 0, 0); objs.append(o)
    bpy.ops.object.select_all(action="DESELECT")
    for o in objs: o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]; bpy.ops.object.join(); o = bpy.context.active_object; o.name = name
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    sc.cursor.location = R(*at); bpy.ops.object.origin_set(type="ORIGIN_CURSOR")
    o.rotation_mode = "XYZ"; o.rotation_euler = (0.08, -0.05, yaw)
    bpy.ops.rigidbody.object_add(); rb = o.rigid_body; rb.type = "ACTIVE"; rb.collision_shape = "CONVEX_HULL"; rb.mass = mass
    rb.friction = 0.7; rb.restitution = 0.12; rb.linear_damping = 0.1; rb.angular_damping = 0.5; rb.collision_margin = 0.0005
    rb.use_deactivation = True; rb.deactivate_linear_velocity = 0.05; rb.deactivate_angular_velocity = 0.3
    rb.kinematic = True; o.keyframe_insert("location", frame=F0); o.keyframe_insert("rotation_euler", frame=F0)
    rb.keyframe_insert("kinematic", frame=REL[name] - 1); rb.kinematic = False; rb.keyframe_insert("kinematic", frame=REL[name])
    return o
# standee: acrylic base + the card tilted back (as Standee() in film45.part.tsx); origin = bottom centre
sd = body("sd", [(0, 0.006, -0.012, 0.134, 0.012, 0.06, 0), (0, 0.012 + 0.085 * math.cos(0.2), -0.085 * math.sin(0.2), 0.126, 0.178, 0.008, -0.2)], (-0.12, TOP + 0.22, 0.12), 0.0, 0.25)
s0 = body("sk0", [(0, 0.0006, 0, 0.07, 0.0012, 0.1, 0)], (0.12, TOP + 0.16, 0.2), 0.4, 0.004)
s1 = body("sk1", [(0, 0.0006, 0, 0.07, 0.0012, 0.1, 0)], (-0.02, TOP + 0.2, 0.26), -0.5, 0.004)
bpy.ops.ptcache.bake_all(bake=True)
qb = Quaternion((math.cos(-math.pi / 4), math.sin(-math.pi / 4), 0, 0))
out = {"fps": FPS, "f0": F0, "top": TOP, "bodies": {}}
for o in (sd, s0, s1):
    fr = []
    for f in range(F0, F1 + 1):
        sc.frame_set(f); m = o.matrix_world; p = m.to_translation(); q = qb @ m.to_quaternion() @ qb.inverted()
        fr.append([round(p.x, 4), round(p.z, 4), round(-p.y, 4), round(q.x, 5), round(q.y, 5), round(q.z, 5), round(q.w, 5)])
    out["bodies"][o.name] = {"release": REL[o.name], "frames": fr}; print("BODY", o.name, "end", fr[-1][:3])
json.dump(out, open(B + "media/phys45.json", "w")); print("WROTE")

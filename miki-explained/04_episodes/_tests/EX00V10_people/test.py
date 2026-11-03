# EX00V10: which people for v4 (user, 2026-11-04: "are we limited to stick figure? … ok even if faceless").
# Three walkers side by side in the EX20 dusk gas-station corner, one camera:
#   A = our primitive Figure (camkit)   B = MPFB human "s_m50" (work suit, faceless matte, bone walk)
#   C = Quaternius "Animated Human" (CC0, its own Walk action)
#   blender -b --python test.py -- <out_dir> [still f,f] [half]
import sys, os, math, bpy
from mathutils import Vector
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H + "/../../../tools/blender")
from isokit import setup, box, cyl, hexc, span
from camkit import *
import crowd
A = sys.argv[sys.argv.index("--") + 1:]; OUT = A[0]
sc = setup(half="half" in A); engine("eevee", 32, fast=True); FPS = 30; sc.render.fps = FPS; N = 90; sc.frame_start, sc.frame_end = 0, N - 1
for o in [o for o in bpy.data.objects if o.type == "LIGHT"]: bpy.data.objects.remove(o)
CLOTH, SKIN, NAVY = paint("work clothes", hexc("#4F5A6E"), 0.7, 0.0), paint("skin", hexc("#C29A80"), 0.55, 0.0), paint("navy", hexc("#2E3A52"), 0.75, 0.0)
# set: plain ground, a pump, two canopy posts, dusk sky, a canopy down-light + low sun
box("ground", -12, -12, 12, 12, 0.1, paint("concrete", hexc("#3A3C40"), 0.8, 0.0), z0=-0.1, bevel=0.0)
box("pump", 3.6, 1.6, 4.4, 2.4, 1.6, paint("pump", hexc("#B23A2E"), 0.35, 0.5), z0=0)
for x in (-4.5, 5.5): box("post", x - 0.15, 2.8, x + 0.15, 3.1, 4.5, paint("post", hexc("#D8D2C4"), 0.4, 0.2), z0=0)
box("canopy", -6, 0, 7, 4, 0.4, paint("canopy", hexc("#D8D2C4"), 0.4, 0.2), z0=4.5)
w = sc.world; w.use_nodes = True; wn = w.node_tree; bg = [n for n in wn.nodes if n.type == "BACKGROUND"]
for n in list(wn.nodes): wn.nodes.remove(n)
out = wn.nodes.new("ShaderNodeOutputWorld"); b = wn.nodes.new("ShaderNodeBackground"); b.inputs[0].default_value = hexc("#2A3550"); b.inputs[1].default_value = 0.5
wn.links.new(b.outputs[0], out.inputs[0])
bpy.ops.object.light_add(type="SUN"); s_ = bpy.context.object; s_.data.energy = 2.0; s_.data.color = (1, 0.84, 0.7); s_.rotation_euler = (math.radians(70), 0, math.radians(-50))
bpy.ops.object.light_add(type="AREA", location=(0.5, 2, 4.3)); a_ = bpy.context.object; a_.data.energy = 700; a_.data.size = 8
WALK = 1.1                                                             # m/s along -x … +x
# A: our Figure
fa = Figure("A primitive", CLOTH, SKIN); fa.root.rotation_euler.z = -math.pi / 2
# B: MPFB, faceless matte: every material becomes cloth or skin; eyes/brows hidden
col, rig, hip = crowd.load_person("s_m50", link=True)
for o in col.objects:
    if o.type == "MESH":
        low = o.name.lower()
        if any(k in low for k in ("eye", "brow", "lash", "teeth", "tongue")): o.hide_render = True; continue
        m = SKIN if low.startswith("body") else NAVY if "suit" in low else paint("shoe", hexc("#1E1E22"), 0.6, 0.2) if "shoe" in low else paint("hair", hexc("#3A3530"), 0.8, 0.0)
        o.data.materials.clear(); o.data.materials.append(m)          # names are "body …", "Human.<suit|shoes|hair>"
for side, up, low in (("L", (0.08, 0.02, -1), (0.06, -0.12, -1)), ("R", (-0.08, 0.02, -1), (-0.06, -0.12, -1))):   # arms down first
    crowd.aim(rig, "upperarm01." + side, up); crowd.aim(rig, "lowerarm01." + side, low)
for bn in ("upperleg01.L", "upperleg01.R", "lowerleg01.L", "lowerleg01.R", "upperarm01.L", "upperarm01.R"):
    rig.pose.bones[bn].rotation_mode = "XYZ"
base = {bn: rig.pose.bones[bn].rotation_euler.copy() for bn in ("upperleg01.L", "upperleg01.R", "lowerleg01.L", "lowerleg01.R")}
rig.rotation_euler.z = math.pi / 2                                   # MPFB faces -y; turn to walk +x
# C: Quaternius, its own Walk
bpy.ops.import_scene.gltf(filepath="/Users/user/Private/miki-studio/archive-ignore/quaternius/170235d2-cdeb-4cb2-a82f-4828585138fe.glb")
qarm = next(o for o in bpy.context.selected_objects if o.type == "ARMATURE") if any(o.type == "ARMATURE" for o in bpy.context.selected_objects) else next(o for o in bpy.data.objects if o.type == "ARMATURE" and o.name.startswith("Human"))
qroot = qarm.parent or qarm; qroot.scale = (1.78 / 5.32,) * 3; qroot.rotation_euler.z = math.pi / 2
act = next(a for a in bpy.data.actions if a.name.endswith("|Walk")); qarm.animation_data_create(); qarm.animation_data.action = act
for fc in getattr(act, "fcurves", []): fc.modifiers.new("CYCLES")
for o in qarm.children_recursive:
    if o.type == "MESH":
        for m in o.data.materials:
            if m and m.use_nodes and "Principled BSDF" in m.node_tree.nodes:
                bn = m.node_tree.nodes["Principled BSDF"]; bn.inputs["Roughness"].default_value = 0.75
                if not bn.inputs["Base Color"].is_linked and sum(bn.inputs["Base Color"].default_value[:3]) > 2.4: bn.inputs["Base Color"].default_value = hexc("#5A6680")
# motion: all three walk left to right in parallel lanes
for f in range(N):
    t = f / FPS; x = -3.0 + WALK * t
    fa.root.location = (x, -1.6, 0); fa.root.keyframe_insert("location", frame=f); fa.pose(f, t * 6.2, 1.0)
    rig.location = Vector((x, 0.0, 0)) - Vector((0, 0, 0)); rig.keyframe_insert("location", frame=f)
    ph = t * 6.2
    for side, sgn in (("L", 1), ("R", -1)):
        a_up = math.radians(28) * math.sin(ph) * sgn; a_low = math.radians(35) * max(0.0, math.sin(ph + (0 if sgn > 0 else math.pi) - 1.2))
        pu = rig.pose.bones["upperleg01." + side]; pu.rotation_euler = (base["upperleg01." + side].x - a_up, base["upperleg01." + side].y, base["upperleg01." + side].z); pu.keyframe_insert("rotation_euler", frame=f)
        pl = rig.pose.bones["lowerleg01." + side]; pl.rotation_euler = (base["lowerleg01." + side].x + a_low, base["lowerleg01." + side].y, base["lowerleg01." + side].z); pl.keyframe_insert("rotation_euler", frame=f)
    qroot.location = (x, 1.6, 0); qroot.keyframe_insert("location", frame=f)
rig_c = PerspRig(); rig_c.keys([(0, Vector((2.8, -7.5, 1.5)), Vector((-1.2, 0, 1.0)), 32, 4.0), (N, Vector((3.6, -7.2, 1.5)), Vector((0.2, 0, 1.0)), 32, 4.0)])
for f in range(N): rig_c.set(f)
if "still" in A:
    for f in [int(x) for x in A[A.index("still") + 1].split(",")]:
        sc.frame_set(f); sc.render.filepath = f"{OUT}/s_{f:04d}.png"; bpy.ops.render.render(write_still=True)
else:
    render_range(f"{OUT}/f_", 0, N - 1)

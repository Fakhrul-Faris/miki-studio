# paperkit v2 test: blender -b --python test.py -- <out> <flat|v2> [still f,f] [half]
import sys, math, json, random, bpy, os
sys.path.insert(0, "/Users/user/Private/miki-studio/miki-explained/tools/blender")
from paperkit import *
a = sys.argv[sys.argv.index("--") + 1:]; OUT, MODE = a[0], a[1]
STILLS = [int(x) for x in a[a.index("still") + 1].split(",")] if "still" in a else None
D = os.path.dirname(os.path.abspath(__file__)) if "__file__" in dir() else "/Users/user/Private/miki-studio/miki-explained/04_episodes/_tests/EX00V5_paperkit2"
D = "/Users/user/Private/miki-studio/miki-explained/04_episodes/_tests/EX00V5_paperkit2"
N = 72; sc = setup(N, 540 if "half" in a else 1080, 960 if "half" in a else 1920); sc.eevee.taa_render_samples = 32; random.seed(3)
PH, ZC = 4.0, 2.0; DIST = (PH / 2) / math.tan(math.atan(18 / 35))                      # camera distance that frames the plate
def glow(o, k=0.85):
    m = o.data.materials[0]; nt = m.node_tree; b = nt.nodes["Principled BSDF"]; t = [n for n in nt.nodes if n.type == "TEX_IMAGE"][0]
    nt.links.new(t.outputs["Color"], b.inputs["Emission Color"]); b.inputs["Emission Strength"].default_value = k
def coll(name, objs):
    c = bpy.data.collections.new(name); bpy.context.scene.collection.children.link(c)
    for o in objs:
        for u in o.users_collection: u.objects.unlink(o)
        c.objects.link(o)
    return c
# ---- environment: flat card (EX10) vs depth shadow box (v2) ----
env = []
if MODE == "flat":
    p = card(D + "/ENV_auditorium.png", PH, loc=(0, 0, ZC), wobble=0, name="plate"); glow(p); env.append(p)
else:
    info = json.load(open(D + "/box/bands.json"))
    for b in info:
        dk = 0.0 if b["band"] == 0 else 0.55 * b["band"]                               # each nearer band stands 55 cm closer
        s = (DIST - dk) / DIST                                                          # shrink so it lines up from the start pose
        p = card(D + "/box/band_%d.png" % b["band"], PH * s, loc=(0, -dk, ZC * s + (1 - s) * 0), wobble=0 if b["band"] == 0 else 0.4, name="band %d" % b["band"])
        p.location.z = ZC + (p.location.z - ZC) * 1                                      # keep centred on the camera's eye line
        p.location.z = ZC * 1 - (ZC - ZC) ; p.location.z = ZC                           # (the camera looks at ZC)
        glow(p, 0.8); env.append(p)
        if b["band"]:
            p.modifiers.new("thick", "SOLIDIFY").thickness = 0.012                       # card thickness: a real paper edge
PW = PH * 1440 / 2560
def on_band(k, fx, fy, front=0.03):                  # a point on band k's card, from fractions of the plate image (0..1)
    dk = 0.0 if k == 0 else 0.55 * k; s = (DIST - dk) / DIST
    return ((fx - 0.5) * PW * s, -dk - front, ZC + (0.5 - fy) * PH * s), s
# ---- cut-outs: a scattered crowd of seated viewers (one cut-out, mirrored and recoloured), popcorn ----
crowd = []
SEATS = [(-0.55, -1.72, 0.62, 0.78), (0.6, -1.72, 0.6, 0.78), (-0.05, -1.17, 1.05, 0.5), (0.75, -1.17, 1.06, 0.5), (-0.75, -1.17, 1.05, 0.5)]
SEATS = [(3, 0.22, 0.79, 0.30), (3, 0.66, 0.80, 0.30), (2, 0.36, 0.63, 0.16), (2, 0.58, 0.63, 0.16), (2, 0.83, 0.64, 0.16)]   # band, x, y, seat width (fractions)
for i, (k, fx, fy, w) in enumerate(SEATS):
    xyz, sk = on_band(k, fx, fy); h = w * PW * sk * 1640 / 1282
    v = card(D + "/CO_viewer.png", h, loc=xyz, name="viewer %d" % i); v.location.z += h * 0.18
    if i % 2: v.scale.x = -v.scale.x
    crowd.append(v)
xyz, sk = on_band(3, 0.47, 0.84, 0.06); pc = card(D + "/CO_popcorn.png", 0.22, loc=xyz, name="popcorn"); crowd.append(pc)
if MODE == "v2":
    for o in crowd:                                                                     # thin paper lets light through
        m = o.data.materials[0]; b = m.node_tree.nodes["Principled BSDF"]; b.inputs["Subsurface Weight"].default_value = 0.25
        b.inputs["Subsurface Radius"].default_value = (0.02, 0.015, 0.01)
sun, fill = lights(key=2.4, fill=12, key_dir=(30, 0, 25)); fill.location = (-2, -5, 4)
if MODE == "v2":
    # the screen is a practical light: a glowing card on the screen and an area light that backlights the crowd (linked)
    bpy.ops.mesh.primitive_plane_add(size=1, location=(0.04, -0.02, ZC + 0.76)); scr = bpy.context.object; scr.name = "screen glow"
    scr.scale = (1.7, 1.15, 1); scr.rotation_euler = (math.radians(90), 0, 0)
    em = bpy.data.materials.new("screen"); em.use_nodes = True; bb = em.node_tree.nodes["Principled BSDF"]
    bb.inputs["Base Color"].default_value = (1, 0.93, 0.8, 1); bb.inputs["Emission Color"].default_value = (1, 0.9, 0.72, 1); bb.inputs["Emission Strength"].default_value = 0.9
    scr.data.materials.append(em)
    bpy.ops.object.light_add(type="AREA", location=(0.04, -0.3, ZC + 0.76)); rim = bpy.context.object; rim.name = "screen light"
    rim.data.energy = 120; rim.data.color = (1, 0.88, 0.7); rim.data.size = 1.7; rim.rotation_euler = (math.radians(-90), 0, 0)
    cc = coll("crowd", crowd)
    rim.light_linking.receiver_collection = cc                                         # light linking: only the crowd is rimmed
    rim.light_linking.blocker_collection = cc                                          # shadow linking: only the crowd blocks it
    # an ink circle drawn in 3D around the popcorn (Grease Pencil v3): it stays on the bucket as the camera moves
    gp = bpy.data.grease_pencils.new("ink") if hasattr(bpy.data, "grease_pencils") else None
    if gp:
        go = bpy.data.objects.new("ink circle", gp); bpy.context.scene.collection.objects.link(go)
        lay = gp.layers.new("ink"); fr = lay.frames.new(1); dr = fr.drawing; n = 48; dr.add_strokes([n]); st = dr.strokes[0]
        for i in range(n):
            ang = 2 * math.pi * i / (n - 6); r = 0.34 + 0.02 * math.sin(i)
            st.points[i].position = (xyz[0] + 0.5 * r * math.cos(ang), xyz[1] - 0.04, xyz[2] + 0.45 * r * math.sin(ang)); st.points[i].radius = 0.006
        gm = bpy.data.materials.new("ink ochre"); bpy.data.materials.create_gpencil_data(gm); gm.grease_pencil.color = (0.79, 0.54, 0.17, 1)
        gp.materials.append(gm)
    # a paper banner that unrolls (Simple Deform bend, keyed): a fold/roll mechanism
    bpy.ops.mesh.primitive_plane_add(size=1, location=(0, -0.6, ZC + 1.25)); bn = bpy.context.object; bn.name = "banner"
    bn.scale = (1.6, 0.32, 1); bn.rotation_euler = (math.radians(90), 0, 0); bpy.ops.object.transform_apply(scale=True)
    bpy.ops.object.mode_set(mode="EDIT"); bpy.ops.mesh.subdivide(number_cuts=40); bpy.ops.object.mode_set(mode="OBJECT")
    bm = bpy.data.materials.new("banner"); bm.use_nodes = True; bm.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (0.79, 0.54, 0.17, 1); bn.data.materials.append(bm)
    bpy.ops.object.empty_add(location=(0.8, -0.6, ZC + 1.25)); ax = bpy.context.object
    sd = bn.modifiers.new("roll", "SIMPLE_DEFORM"); sd.deform_method = "BEND"; sd.deform_axis = "Z"; sd.origin = ax
    sd.angle = math.radians(540); sd.keyframe_insert("angle", frame=1); sd.angle = math.radians(540); sd.keyframe_insert("angle", frame=12)
    sd.angle = 0.0; sd.keyframe_insert("angle", frame=40)
    bn.modifiers.new("thick", "SOLIDIFY").thickness = 0.006
    # bloom on the practicals (the compositor's Glare node; EEVEE's own bloom left in 4.2)
    try:
        tree = bpy.data.node_groups.new("bloom", "CompositorNodeTree"); sc.compositing_node_group = tree
        rl = tree.nodes.new("CompositorNodeRLayers"); gl = tree.nodes.new("CompositorNodeGlare"); out = tree.nodes.new("NodeGroupOutput")
        tree.interface.new_socket("Image", in_out="OUTPUT", socket_type="NodeSocketColor")
        gl.inputs["Type"].default_value = "Bloom"; gl.inputs["Threshold"].default_value = 1.0; gl.inputs["Strength"].default_value = 0.15; gl.inputs["Size"].default_value = 0.5
        tree.links.new(rl.outputs["Image"], gl.inputs["Image"]); tree.links.new(gl.outputs["Image"], out.inputs["Image"])
        sc.render.use_compositing = True
    except Exception as e:
        print("compositor skipped:", e)
# ---- camera: a slow push with a drift sideways, to show parallax ----
bpy.ops.object.empty_add(location=(0, 0, ZC)); tgt = bpy.context.object
bpy.ops.object.camera_add(location=(0, -DIST * 0.95, ZC)); cam = bpy.context.object; sc.camera = cam; cam.data.lens = 35
c = cam.constraints.new("TRACK_TO"); c.target = tgt; c.track_axis = "TRACK_NEGATIVE_Z"; c.up_axis = "UP_Y"
cam.data.dof.use_dof = True; cam.data.dof.aperture_fstop = 5.6; cam.data.dof.focus_object = crowd[0]
for f, p, t in ((1, (-0.35, -DIST * 0.95, ZC - 0.1), (0, 0, ZC)), (N, (0.45, -DIST * 0.62, ZC + 0.15), (0.05, 0, ZC + 0.2))):
    cam.location = p; cam.keyframe_insert("location", frame=f); tgt.location = t; tgt.keyframe_insert("location", frame=f)
interpolation(cam, "BEZIER"); interpolation(tgt, "BEZIER")
boil(crowd, N, amp=0.0012, rot=0.2); flicker(sun, N, pct=1.5)
if STILLS: render(OUT, frames=STILLS, prefix=MODE)
else: render(OUT, prefix=MODE)

# EX07: one unbroken first-person take through a procedural paper hotel (Blender 5).
#   blender -b --python build/world.py -- <out_dir> [still f,f,…] [half] [frames N]
# Everything is built here: paper boxes and sheets, code-drawn textures (build/tex.py → layers/tex_*.png), 3D type, hinges,
# rigid-body and cloth physics. Beat frames come from audio/vo_timeline.json when it exists (else placeholder timings).
import sys, os, math, random, json, bpy
from mathutils import Vector
sys.path.insert(0, "/Users/user/Private/miki-studio/miki-explained/tools/blender")
from paperkit import setup, interpolation, render
EP = "/Users/user/Private/miki-studio/miki-explained/04_episodes/EX07_owns-no-hotels/"
a = sys.argv[sys.argv.index("--") + 1:]; OUT = a[0]
STILLS = [int(x) for x in a[a.index("still") + 1].split(",")] if "still" in a else None
HALF = "half" in a
# ---- beats (frame numbers) ----
B = {"L01": 1, "L02": 70, "question": 120, "minibar": 175, "L03": 215, "fees": 300, "L04": 360, "banks": 410,
     "L05": 440, "points": 470, "L06": 560, "END": 640}
tl = EP + "audio/vo_timeline.json"
if os.path.exists(tl):
    d = json.load(open(tl)); w = d["words"]; fr = lambda L, i: round(w[L][i][1] * 24) + 1
    B.update({"L01": 1, "L02": fr("L02", 0), "L03": fr("L03", 0), "L04": fr("L04", 0), "L05": fr("L05", 0), "L06": fr("L06", 0),
              "END": round(d["end"] * 24) + 30})
N = int(a[a.index("frames") + 1]) if "frames" in a else B["END"]
sc = setup(N, 540 if HALF else 1080, 960 if HALF else 1920)
sc.render.film_transparent = False
sc.eevee.taa_render_samples = 24 if HALF else 48
w0 = bpy.data.worlds.new("paper sky"); sc.world = w0; w0.use_nodes = True
w0.node_tree.nodes["Background"].inputs[0].default_value = (0.86, 0.80, 0.70, 1); w0.node_tree.nodes["Background"].inputs[1].default_value = 0.35
random.seed(11)

# ---- materials ----
def lin(c): return tuple((v / 255) ** 2.2 for v in c) + (1,)
PAPER, INK, OCHRE, DEEP, CREAM, GREY = lin((236, 228, 214)), lin((24, 22, 20)), lin((201, 138, 43)), lin((150, 98, 30)), lin((246, 240, 230)), lin((200, 190, 174))
MATS = {}
def mat(name, col=None, tex=None, rough=0.9, rep=(1, 1), coords="UV"):
    """Paper material: a code-drawn texture (layers/tex_*.png), repeated rep times; coords "Generated" for text/boxes."""
    if name in MATS: return MATS[name]
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; b = nt.nodes["Principled BSDF"]; b.inputs["Roughness"].default_value = rough
    if tex and os.path.exists(EP + "layers/" + tex):
        tc = nt.nodes.new("ShaderNodeTexCoord"); mp = nt.nodes.new("ShaderNodeMapping"); mp.inputs["Scale"].default_value = (rep[0], rep[1], 1)
        t = nt.nodes.new("ShaderNodeTexImage"); t.image = bpy.data.images.load(EP + "layers/" + tex); t.extension = "REPEAT"
        nt.links.new(tc.outputs[coords], mp.inputs["Vector"]); nt.links.new(mp.outputs["Vector"], t.inputs["Vector"])
        nt.links.new(t.outputs["Color"], b.inputs["Base Color"])
    else:
        b.inputs["Base Color"].default_value = col or PAPER
    MATS[name] = m; return m
def box(name, size, loc, m, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc); o = bpy.context.object; o.name = name
    o.scale = size; o.rotation_euler = tuple(math.radians(r) for r in rot)
    bpy.ops.object.transform_apply(scale=True); o.data.materials.append(m); return o
def plane(name, w, h, loc, m, rot=(90, 0, 0)):
    bpy.ops.mesh.primitive_plane_add(size=1, location=loc); o = bpy.context.object; o.name = name
    o.scale = (w, h, 1); o.rotation_euler = tuple(math.radians(r) for r in rot); bpy.ops.object.transform_apply(scale=True)
    o.data.materials.append(m); return o
def type3d(name, txt, loc, size, m, rot=(90, 0, 0), depth=0.04, align="CENTER", font="Anton-Regular.ttf"):
    bpy.ops.object.text_add(location=loc); o = bpy.context.object; o.name = name; cu = o.data
    cu.body = txt; cu.size = size; cu.extrude = depth; cu.align_x = align; cu.align_y = "CENTER"
    cu.font = bpy.data.fonts.load(os.path.expanduser("~/Library/Fonts/" + font))
    o.rotation_euler = tuple(math.radians(r) for r in rot); o.data.materials.append(m); return o
def hinge(o, pivot):                                      # an empty at the hinge line, the door parented to it
    bpy.ops.object.empty_add(location=pivot); e = bpy.context.object; e.name = o.name + " hinge"
    o.parent = e; o.matrix_parent_inverse = e.matrix_world.inverted(); return e
def swing(e, f0, f1, deg, every=2):                       # door swing held on twos (stop-motion), eased out
    for f in range(f0, f1 + 1, every):
        t = (f - f0) / max(1, f1 - f0); q = 1 - (1 - t) ** 3
        e.rotation_euler[2] = math.radians(deg * q); e.keyframe_insert("rotation_euler", index=2, frame=f)
    e.rotation_euler[2] = 0; e.keyframe_insert("rotation_euler", index=2, frame=1)
    interpolation(e, "CONSTANT")
def appear(o, f):                                         # hidden until f
    o.hide_render = True; o.keyframe_insert("hide_render", frame=1); o.hide_render = False; o.keyframe_insert("hide_render", frame=f)
    interpolation(o, "CONSTANT")
def lamp(loc, energy, col=(1.0, 0.82, 0.6), size=0.3):
    bpy.ops.object.light_add(type="POINT", location=loc); l = bpy.context.object; l.data.energy = energy; l.data.color = col; l.data.shadow_soft_size = size; return l

G = "Generated"
mP, mI, mO, mC, mG = (mat("paper", PAPER, "tex_paper.png", coords=G, rep=(3, 3)), mat("ink", INK, "tex_ink.png", coords=G, rep=(2, 2)),
    mat("ochre", OCHRE, "tex_ochre.png", coords=G, rep=(2, 2)), mat("cream", CREAM, "tex_cream.png", coords=G, rep=(2, 2)), mat("grey", GREY, "tex_grey.png", rep=(12, 16)))
mFacade, mDoor = mat("facade", PAPER, "tex_facade.png"), mat("door", CREAM, "tex_door.png")
mWall, mWallLong = mat("wall", PAPER, "tex_wall.png", rep=(3, 1)), mat("wall long", PAPER, "tex_wall.png", rep=(5, 1))
mFloor, mCarpet = mat("floor", GREY, "tex_floor.png", rep=(3, 3)), mat("carpet", OCHRE, "tex_carpet.png", rep=(2, 10))
mCard, mPts = mat("card", OCHRE, "tex_card.png", 0.6), mat("points", CREAM, "tex_points.png")

# ---- 1. the street (y 0–8) ----
plane("street", 30, 40, (0, 4, 0), mG, rot=(0, 0, 0))
FY = 9.0
box("facade L", (5.2, 0.25, 9), (-3.2, FY, 4.5), mP); box("facade R", (5.2, 0.25, 9), (3.2, FY, 4.5), mP)
box("facade top", (1.2, 0.25, 6.6), (0, FY, 5.7), mP)
for k, x in enumerate((-3.2, 3.2)): plane("facade front %d" % k, 5.2, 9, (x, FY - 0.13, 4.5), mFacade)
plane("facade front top", 1.2, 6.6, (0, FY - 0.13, 5.7), mat("facade top", PAPER, "tex_paper.png", rep=(1, 4)))
for i, x in enumerate((-9.5, 9.5)):                          # the neighbours: more paper hotels, set back
    box("neighbour %d" % i, (7, 0.25, 7 + i * 2), (x, FY + 1.5, (7 + i * 2) / 2), mP); plane("neighbour front %d" % i, 7, 7 + i * 2, (x, FY + 1.37, (7 + i * 2) / 2), mFacade)
box("sign plate", (4.4, 0.08, 1.1), (0, FY - 0.2, 6.6), mI)
box("owned panel", (6.4, 0.06, 1.7), (0, FY - 0.2, 3.6), mC); type3d("owned", "<1% OWNED", (0, FY - 0.3, 3.6), 1.15, mO, depth=0.1)
door = box("front door", (1.2, 0.06, 2.4), (0.6, 0, 1.2), mDoor); door.location = (0, FY - 0.05, 1.2)
dh = hinge(door, (0.6, FY - 0.05, 1.2)); swing(dh, B["L02"] - 30, B["L02"] - 10, -100)
lamp((0, FY - 1.2, 3.0), 60); lamp((0, FY + 2.5, 2.8), 110)
bpy.ops.object.light_add(type="SUN", location=(4, -4, 8)); sun = bpy.context.object; sun.data.energy = 1.8; sun.data.angle = math.radians(4)
sun.rotation_euler = (math.radians(55), 0, math.radians(30))

# ---- 2. the lobby (y 9–17) ----
plane("lobby floor", 7, 8, (0, 13, 0.01), mFloor, rot=(0, 0, 0))
plane("lobby wall L", 8, 4, (-3.5, 13, 2), mWall, rot=(90, 0, 90)); plane("lobby wall R", 8, 4, (3.5, 13, 2), mWall, rot=(90, 0, -90))
plane("lobby ceiling", 7, 8, (0, 13, 4), mP, rot=(0, 0, 0))
box("desk", (2.6, 0.8, 1.05), (-1.0, 12.6, 0.525), mC); box("desk top", (2.8, 0.9, 0.06), (-1.0, 12.6, 1.08), mI)
hotels = type3d("hotels", "9,361 HOTELS", (-1.0, 12.17, 0.58), 0.3, mI, depth=0.03)
for i in range(5):                                           # owner plates behind the desk
    p = box("plate %d" % i, (0.5, 0.03, 0.18), (-2.3 + 0.62 * i, 13.4, 1.9), mO)
    type3d("owner %d" % i, "OWNER", (-2.3 + 0.62 * i, 13.38, 1.9), 0.09, mI, depth=0.01)
mb = box("minibar", (0.6, 0.55, 0.85), (1.9, 14.2, 0.425), mI)
mbd = box("minibar door", (0.56, 0.04, 0.8), (1.9, 13.9, 0.43), mC); mbh = hinge(mbd, (1.62, 13.9, 0.43)); swing(mbh, B["minibar"], B["minibar"] + 10, -110)
loses = type3d("loses", "LOSES\nMONEY", (1.9, 14.2, 1.75), 0.32, mI, depth=0.04); appear(loses, B["minibar"] + 4)
lamp((-1.0, 11.2, 2.6), 60, size=0.6); lamp((1.9, 13.6, 2.2), 30)

# ---- 3. the corridor (y 17–29) ----
box("lobby back L", (3.0, 0.2, 4), (-2.1, 17, 2), mC); box("lobby back R", (3.0, 0.2, 4), (2.1, 17, 2), mC); box("lobby back top", (1.2, 0.2, 1.4), (0, 17, 3.3), mC)
plane("corridor floor", 2.4, 12, (0, 23, 0.01), mCarpet, rot=(0, 0, 0))
plane("corridor wall L", 12, 3, (-1.2, 23, 1.5), mWallLong, rot=(90, 0, 90)); plane("corridor wall R", 12, 3, (1.2, 23, 1.5), mWallLong, rot=(90, 0, -90))
plane("corridor ceiling", 2.4, 12, (0, 23, 3), mP, rot=(0, 0, 0))
for i in range(4):
    for s in (-1, 1):
        y = 18.8 + 2.6 * i
        box("cdoor %d%s" % (i, "LR"[s > 0]), (0.05, 0.95, 2.2), (s * 1.17, y, 1.1), mDoor)
        type3d("cplate %d%s" % (i, "LR"[s > 0]), "OWNER", (s * 1.14, y, 1.75), 0.08, mO, rot=(90, 0, -90 * s), depth=0.01)
    lamp((0, 18.8 + 2.6 * i, 2.3), 14, size=0.5)
fees = type3d("fees", "$5.4B", (0.15, 24.0, 0.42), 0.85, mI, depth=0.16)
F0 = B["fees"]; DROP = [(0, 3.4, 0), (2, 2.6, 0), (4, 1.2, 0), (6, 0.42, 0), (8, 0.36, -4), (10, 0.45, 3), (12, 0.42, -1), (14, 0.42, 0)]   # (frame, z, tilt°) on twos
for df, z, tilt in DROP:
    fees.location.z = z; fees.rotation_euler[1] = math.radians(tilt); fees.keyframe_insert("location", index=2, frame=F0 + df); fees.keyframe_insert("rotation_euler", index=1, frame=F0 + df)
interpolation(fees, "CONSTANT"); appear(fees, F0)
bpy.ops.rigidbody.world_add(); sc.rigidbody_world.point_cache.frame_start = 1; sc.rigidbody_world.point_cache.frame_end = N

# ---- 4. the room (y 29–35) ----
box("room front L", (0.6, 0.2, 3), (-0.9, 29, 1.5), mC); box("room front R", (0.6, 0.2, 3), (0.9, 29, 1.5), mC)
plane("room floor", 6, 6, (0, 32, 0.012), mFloor, rot=(0, 0, 0))
plane("room wall back", 6, 3, (0, 35, 1.5), mWall); plane("room wall L", 6, 3, (-3, 32, 1.5), mWall, rot=(90, 0, 90)); plane("room wall R", 6, 3, (3, 32, 1.5), mWall, rot=(90, 0, -90))
plane("room ceiling", 6, 6, (0, 32, 3), mP, rot=(0, 0, 0))
bed = box("bed", (1.8, 2.1, 0.5), (-0.6, 33.6, 0.25), mC); box("headboard", (1.9, 0.12, 1.1), (-0.6, 34.7, 0.55), mI)
bpy.ops.mesh.primitive_plane_add(size=1, location=(-0.6, 33.5, 1.4)); sheet = bpy.context.object; sheet.name = "sheet"
sheet.scale = (2.2, 2.3, 1); bpy.ops.object.transform_apply(scale=True)
bpy.ops.object.mode_set(mode="EDIT"); bpy.ops.mesh.subdivide(number_cuts=20); bpy.ops.object.mode_set(mode="OBJECT")
sheet.data.materials.append(mO)
cl = sheet.modifiers.new("cloth", "CLOTH").settings; cl.quality = 6; cl.mass = 0.15; cl.bending_stiffness = 1.5; cl.tension_stiffness = 30; cl.air_damping = 3
sheet.modifiers["cloth"].point_cache.frame_start = 1; sheet.modifiers["cloth"].point_cache.frame_end = N
bed.modifiers.new("collision", "COLLISION"); bpy.data.objects["room floor"].modifiers.new("collision", "COLLISION")
box("nightstand", (0.55, 0.5, 0.6), (1.0, 34.2, 0.3), mI)
card = box("card", (0.34, 0.215, 0.006), (1.0, 34.2, 0.605), mCard)
CARD = Vector((1.0, 34.2, 0.61))
million = type3d("million", "$716M", (1.0, 34.6, 0.98), 0.22, mO, depth=0.03); appear(million, B["points"])
million.keyframe_insert("hide_render", frame=B["L06"]); million.hide_render = True; million.keyframe_insert("hide_render", frame=B["L06"] + 1); interpolation(million, "CONSTANT")
yours = type3d("yours", "YOU'RE\nTHE POINTS", (1.0, 34.45, 0.95), 0.12, mI, depth=0.02); appear(yours, B["L06"] + 4)
lamp((0.9, 33.8, 1.5), 30, size=0.15); lamp((-0.6, 32, 2.2), 26, size=0.6)
# points cards: thin rigid paper cards dropped in a burst over the nightstand
pts = []
for i in range(36):
    p = box("pt %d" % i, (0.09, 0.055, 0.002), (1.0 + random.uniform(-0.35, 0.35), 34.2 + random.uniform(-0.3, 0.3), 1.5 + random.uniform(0, 0.8)), mPts,
            rot=(random.uniform(0, 360), random.uniform(0, 360), random.uniform(0, 360)))
    bpy.ops.rigidbody.object_add(); p.rigid_body.mass = 0.01; p.rigid_body.linear_damping = 0.6; p.rigid_body.angular_damping = 0.3
    p.rigid_body.kinematic = True; p.keyframe_insert("rigid_body.kinematic", frame=1)
    p.rigid_body.kinematic = False; p.keyframe_insert("rigid_body.kinematic", frame=B["points"] + i // 6)
    appear(p, B["points"] + i // 6); pts.append(p)
for n in ("nightstand", "room floor", "bed"):
    o = bpy.data.objects[n]; bpy.context.view_layer.objects.active = o
    for x in bpy.context.selected_objects: x.select_set(False)
    o.select_set(True); bpy.ops.rigidbody.object_add(type="PASSIVE")

# ---- the camera: one unbroken first-person walk, smooth (camera clock), with a head-bob ----
bpy.ops.object.empty_add(location=(0, 9, 1.6)); tgt = bpy.context.object; tgt.name = "look"
bpy.ops.object.camera_add(location=(0, 0, 1.6)); cam = bpy.context.object; sc.camera = cam
c = cam.constraints.new("TRACK_TO"); c.target = tgt; c.track_axis = "TRACK_NEGATIVE_Z"; c.up_axis = "UP_Y"
cam.data.lens = 22; cam.data.dof.use_dof = True; cam.data.dof.aperture_fstop = 2.8; cam.data.dof.focus_object = tgt
PATH = [  # (frame, camera xyz, look-at xyz)
    (1, (0, 3.2, 1.6), (0, 9, 3.3)),                                  # the facade, "<1% OWNED"
    (B["L02"] - 30, (0, 5.8, 1.6), (0, 9, 2.6)),
    (B["L02"], (-0.1, 9.9, 1.6), (-1.0, 12.2, 0.75)),                  # through the door: the desk, 9,361 HOTELS
    (B["question"], (-0.9, 10.3, 1.5), (-1.0, 12.4, 1.1)),
    (B["minibar"], (0.85, 12.55, 1.5), (1.9, 14.0, 1.25)),
    (B["minibar"] + 22, (0.95, 12.75, 1.5), (1.9, 14.0, 1.3)),               # the minibar opens
    (B["L03"], (0.3, 15.6, 1.6), (0, 20, 1.5)),
    (B["fees"], (0, 20.6, 1.6), (0.15, 24, 1.4)),
    (B["fees"] + 30, (0, 21.6, 1.55), (0.15, 24, 0.55)),                       # $5.4B drops ahead
    (B["L04"], (0, 25.6, 1.6), (0, 30, 1.3)),
    (B["banks"], (0, 29.8, 1.6), (0.4, 33.6, 0.7)),                    # into the room: bed, nightstand
    (B["L05"], (0.5, 32.2, 1.45), (1.0, 34.2, 0.62)),                  # push into the card
    (B["L06"], (0.85, 33.55, 1.05), (1.0, 34.25, 0.7)),
    (N, (0.9, 33.75, 0.95), (1.0, 34.3, 0.8)),
]
for f, p, t in PATH:
    cam.location = p; cam.keyframe_insert("location", frame=f); tgt.location = t; tgt.keyframe_insert("location", frame=f)
interpolation(cam, "BEZIER"); interpolation(tgt, "BEZIER")
bob = cam.animation_data.action                          # head-bob on the walk (z), one bob per step, fading into the room
fc = None
for st in bob.layers[0].strips:
    for cb in st.channelbags:
        for x in cb.fcurves:
            if x.data_path == "location" and x.array_index == 2: fc = x
m = fc.modifiers.new("NOISE"); m.scale = 7; m.strength = 0.05; m.phase = 3
for o in (dh, mbh): pass
if STILLS:
    for f in range(1, max(STILLS) + 1): sc.frame_set(f)       # step the physics up to the last still
    render(OUT, frames=STILLS, prefix="still")
else:
    for f in range(1, N + 1): sc.frame_set(f)
    render(OUT)

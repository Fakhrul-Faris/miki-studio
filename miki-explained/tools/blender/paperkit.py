"""Miki Explained Blender kit: cut-paper sets, camera moves, paper physics. Headless (Blender 5.2):

    blender -b --python my_shot.py -- <out_dir>

where my_shot.py does `import sys; sys.path.insert(0, "<repo>/miki-explained/tools/blender"); from paperkit import *`.
Renders 9:16 transparent PNG frames for EffectCraft. Camera rig and moves adapted from kevinbadi/blender-skills
(turntable, perfect-loop, dynamic-full-loop, crane-shot, dolly-rotate, slow-zoom); paper-craft and cloth notes from
arjun988/blender-skills (slight thickness, imperfect edges, stiff-cloth preset, pre-roll). Colour: Standard view transform.
"""
import bpy, math, random


# ---------- scene ----------
def setup(frames, w=1080, h=1920, fps=24):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.engine = "BLENDER_EEVEE"
    sc.render.resolution_x, sc.render.resolution_y, sc.render.fps = w, h, fps
    sc.render.film_transparent = True
    sc.view_settings.view_transform = "Standard"          # AgX (default) washes the stills out
    sc.frame_start, sc.frame_end = 1, frames
    return sc


def lights(key=4.0, fill=60.0, key_dir=(55, 0, 35)):
    """Hard side key (sun, small angle = crisp paper shadows) + soft fill (area)."""
    bpy.ops.object.light_add(type="SUN", location=(2, -2, 2)); sun = bpy.context.object
    sun.data.energy = key; sun.data.angle = math.radians(3)
    sun.rotation_euler = tuple(math.radians(a) for a in key_dir)
    bpy.ops.object.light_add(type="AREA", location=(-2, -2, 0.5)); f = bpy.context.object; f.data.energy = fill
    return sun, f


# ---------- paper ----------
def _material(name, img=None, colour=(0.937, 0.910, 0.863, 1)):
    m = bpy.data.materials.new(name); m.use_nodes = True
    nt = m.node_tree; b = nt.nodes["Principled BSDF"]; b.inputs["Roughness"].default_value = 0.92
    if img:
        t = nt.nodes.new("ShaderNodeTexImage"); t.image = img
        nt.links.new(t.outputs["Color"], b.inputs["Base Color"]); nt.links.new(t.outputs["Alpha"], b.inputs["Alpha"])
        m.blend_method = "CLIP" if hasattr(m, "blend_method") else None
    else:
        b.inputs["Base Color"].default_value = colour
    return m


def card(path, height=1.0, loc=(0, 0, 0), rot_z=0.0, thickness=0.0, wobble=0.6, name=None):
    """A still or cut-out standing upright (facing -Y). PNG alpha cuts the shape (cut-outs keep their torn edge).
    thickness > 0 adds a Solidify edge (use for full rectangular sheets only; cut-outs get a shadow card instead).
    wobble: a slight random tilt in degrees, so nothing sits machine-perfect (paper-craft rule)."""
    img = bpy.data.images.load(path); w, h = img.size
    bpy.ops.mesh.primitive_plane_add(size=1, location=loc); o = bpy.context.object
    o.name = name or path.split("/")[-1]
    o.scale = (height * w / h, height, 1)
    r = random.uniform(-wobble, wobble)
    o.rotation_euler = (math.radians(90 + r * 0.5), math.radians(r), math.radians(rot_z))
    if thickness:
        mod = o.modifiers.new("thickness", "SOLIDIFY"); mod.thickness = thickness
    o.data.materials.append(_material("paper " + o.name, img))
    return o


def sheet(width, height, loc=(0, 0, 0), colour=(0.86, 0.82, 0.75, 1), rot=(90, 0, 0), name="sheet"):
    """A plain paper sheet (backing, floor, wall)."""
    bpy.ops.mesh.primitive_plane_add(size=1, location=loc); o = bpy.context.object; o.name = name
    o.scale = (width, height, 1); o.rotation_euler = tuple(math.radians(a) for a in rot)
    o.data.materials.append(_material(name, None, colour)); return o


# ---------- camera rig (kevinbadi pattern: camera tracks a target empty; moves animate the target or the camera) ----------
def rig(distance=2.6, height=0.0, lens=50, target=(0, 0, 0)):
    bpy.ops.object.empty_add(type="PLAIN_AXES", location=target); tgt = bpy.context.object; tgt.name = "target"
    bpy.ops.object.camera_add(location=(target[0], target[1] - distance, target[2] + height)); cam = bpy.context.object
    cam.data.lens = lens
    t = cam.constraints.new(type="TRACK_TO"); t.target = tgt; t.track_axis = "TRACK_NEGATIVE_Z"; t.up_axis = "UP_Y"
    cam.parent = tgt                                   # rotate the target = orbit the camera
    bpy.context.scene.camera = cam
    return tgt, cam


def interpolation(obj, kind):
    """Set every key of obj to 'LINEAR', 'BEZIER' or 'CONSTANT' (Blender 5 layered actions: layers → strips → channelbags)."""
    a = obj.animation_data.action if obj.animation_data else None
    if not a:
        return
    curves = []
    if hasattr(a, "layers") and a.layers:
        for st in a.layers[0].strips:
            for cb in st.channelbags:
                curves += list(cb.fcurves)
    else:
        curves = list(a.fcurves)
    for fc in curves:
        for kp in fc.keyframe_points:
            kp.interpolation = kind


def orbit(tgt, frames, deg=(-20, 20)):
    """Arc the camera between two angles, eased (BEZIER)."""
    tgt.rotation_euler[2] = math.radians(deg[0]); tgt.keyframe_insert("rotation_euler", index=2, frame=1)
    tgt.rotation_euler[2] = math.radians(deg[1]); tgt.keyframe_insert("rotation_euler", index=2, frame=frames)
    interpolation(tgt, "BEZIER")


def perfect_loop(tgt, frames, deg=360):
    """Seamless loop: the end key sits one frame past the last rendered frame, LINEAR, so frame N flows into frame 1."""
    tgt.rotation_euler[2] = 0; tgt.keyframe_insert("rotation_euler", index=2, frame=1)
    tgt.rotation_euler[2] = math.radians(deg); tgt.keyframe_insert("rotation_euler", index=2, frame=frames + 1)
    interpolation(tgt, "LINEAR")


def swing_loop(tgt, frames, amp=15):
    """Seamless back-and-forth sway (for flat paper sets that must not show their backs): sine on Z rotation."""
    for f in range(1, frames + 2):
        tgt.rotation_euler[2] = math.radians(amp * math.sin(2 * math.pi * (f - 1) / frames))
        tgt.keyframe_insert("rotation_euler", index=2, frame=f)
    interpolation(tgt, "LINEAR")


def speed_ramp(tgt, keys):
    """Slow reveals, fast whips: keys = [(frame, degrees), …] bunched where it should be slow (kevinbadi dynamic-full-loop)."""
    for f, d in keys:
        tgt.rotation_euler[2] = math.radians(d); tgt.keyframe_insert("rotation_euler", index=2, frame=f)
    interpolation(tgt, "BEZIER")


def crane(cam, frames, start=(0.4, -1.6, -0.6), end=(0.6, -2.8, 0.9), lens=(45, 35)):
    """Low-to-high reveal while pulling back and widening (kevinbadi crane-shot). Positions are relative to the target."""
    cam.location = start; cam.keyframe_insert("location", frame=1)
    cam.data.lens = lens[0]; cam.data.keyframe_insert("lens", frame=1)
    cam.location = end; cam.keyframe_insert("location", frame=frames)
    cam.data.lens = lens[1]; cam.data.keyframe_insert("lens", frame=frames)
    interpolation(cam, "BEZIER")


def push(cam, frames, distance=(2.6, 1.6), lens=None):
    """Slow push-in (kevinbadi slow-zoom), optionally a lens change for a dolly-zoom feel."""
    cam.location = (0, -distance[0], 0); cam.keyframe_insert("location", frame=1)
    cam.location = (0, -distance[1], 0); cam.keyframe_insert("location", frame=frames)
    if lens:
        cam.data.lens = lens[0]; cam.data.keyframe_insert("lens", frame=1)
        cam.data.lens = lens[1]; cam.data.keyframe_insert("lens", frame=frames)
    interpolation(cam, "BEZIER")


def walk(cam, frames, distance=3.0, bob=0.015, steps=8):
    """First-person walk: move forward with a small head-bob, one bob per step."""
    for f in range(1, frames + 1):
        p = (f - 1) / max(1, frames - 1)
        cam.location = (0, -distance * (1 - p), bob * abs(math.sin(math.pi * steps * p)))
        cam.keyframe_insert("location", frame=f)
    interpolation(cam, "LINEAR")


# ---------- paper physics ----------
def falling_paper(path, height=0.6, drop=1.2, frames=48, stiffness=2.0, floor=-1.0):
    """A sheet that drops and bends like paper: cloth with a stiff preset (bending ~1–3) and a floor to land on.
    The sim starts at frame 1 and only advances frame by frame: call bake_physics(frames) before render()."""
    img = bpy.data.images.load(path); w, h = img.size
    bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, drop)); o = bpy.context.object; o.name = "falling paper"
    o.scale = (height * w / h, height, 1); bpy.ops.object.transform_apply(scale=True)
    o.rotation_euler = (math.radians(20), math.radians(8), 0)
    bpy.ops.object.mode_set(mode="EDIT"); bpy.ops.mesh.subdivide(number_cuts=12); bpy.ops.object.mode_set(mode="OBJECT")
    o.data.materials.append(_material("paper falling", img))
    c = o.modifiers.new("cloth", "CLOTH").settings
    c.quality = 8; c.mass = 0.08; c.bending_stiffness = stiffness; c.tension_stiffness = 40; c.air_damping = 4.0
    bpy.ops.mesh.primitive_plane_add(size=6, location=(0, 0, floor)); fl = bpy.context.object; fl.name = "floor"
    fl.modifiers.new("collision", "COLLISION"); fl.hide_render = True
    o.modifiers["cloth"].point_cache.frame_start = 1
    o.modifiers["cloth"].point_cache.frame_end = frames
    return o


def bake_physics(frames):
    """Step every frame from 1 in order so cloth/physics caches fill (a jump to a later frame would skip the sim)."""
    sc = bpy.context.scene
    for f in range(1, frames + 1):
        sc.frame_set(f)


# ---------- render ----------
def render(out, frames=None, step=1, prefix="f"):
    """Render frames (list or all) to out/prefix_0001.png. step=2 renders every other frame (12 fps look, hold in EffectCraft)."""
    sc = bpy.context.scene
    fr = frames or range(sc.frame_start, sc.frame_end + 1, step)
    for f in fr:
        sc.frame_set(f); sc.render.filepath = f"{out}/{prefix}_{f:04d}.png"
        bpy.ops.render.render(write_still=True)


# ---------- stop-motion feel (from angrypenguinpng/blender-claymation-skill, look-guide numbers) ----------
def on_twos(objs, frames, every=2):
    """Re-key each object's evaluated transform every `every` frames and hold it (CONSTANT): 12 fps 'on twos'.
    Smooth tweening is the biggest tell that it's CG. Use on paper pieces, never on the camera."""
    sc = bpy.context.scene; poses = {}
    for f in range(1, frames + 1, every):
        sc.frame_set(f)
        poses[f] = [(o.location.copy(), o.rotation_euler.copy(), o.scale.copy()) for o in objs]
    for o in objs:
        if o.animation_data:
            o.animation_data_clear()
    for f, ps in poses.items():
        for o, (l, r, s) in zip(objs, ps):
            o.location, o.rotation_euler, o.scale = l, r, s
            o.keyframe_insert("location", frame=f); o.keyframe_insert("rotation_euler", frame=f); o.keyframe_insert("scale", frame=f)
    for o in objs:
        interpolation(o, "CONSTANT")


def boil(objs, frames, amp=0.0006, rot=0.25, every=2, seed=1):
    """Hand-placement jitter: a tiny random offset (amp in metres, rot in degrees) per held pose, also during holds.
    Run after on_twos (or on still pieces). Leave the backdrop still."""
    r = random.Random(seed)
    for o in objs:
        base = [(o.location.copy(), o.rotation_euler.copy())]
        for f in range(1, frames + 1, every):
            bpy.context.scene.frame_set(f)
            l, e = o.location.copy(), o.rotation_euler.copy()
            o.location = (l.x + r.uniform(-amp, amp), l.y + r.uniform(-amp, amp) * 0.5, l.z + r.uniform(-amp, amp))
            o.rotation_euler = (e.x + math.radians(r.uniform(-rot, rot)), e.y + math.radians(r.uniform(-rot, rot)), e.z + math.radians(r.uniform(-rot, rot)))
            o.keyframe_insert("location", frame=f); o.keyframe_insert("rotation_euler", frame=f)
            o.location, o.rotation_euler = l, e
        interpolation(o, "CONSTANT")


def flicker(light, frames, pct=1.5, every=2, seed=2):
    """Real stop-motion sets flicker: key light energy ±pct % per held frame (practicals can go ±10 %)."""
    r = random.Random(seed); e0 = light.data.energy
    for f in range(1, frames + 1, every):
        light.data.energy = e0 * (1 + r.uniform(-pct, pct) / 100); light.data.keyframe_insert("energy", frame=f)
    light.data.energy = e0
    interpolation(light.data, "CONSTANT")


def miniature(cam, focus_obj=None, fstop=4.0, lens=50):
    """Tabletop-miniature depth of field (50 mm, f/3–5): the background softens like a real paper set."""
    cam.data.lens = lens; cam.data.dof.use_dof = True; cam.data.dof.aperture_fstop = fstop
    if focus_obj:
        cam.data.dof.focus_object = focus_obj


# ---------- v2 (EX00V5, 2026-10-31): depth shadow boxes, in-set ink, practical lights, paper mechanisms ----------
import json as _json
_PH, _ZC, _DIST = 4.0, 2.0, None                     # shadow-box plate height (m), centre height, camera distance that frames it


def frame_dist(h, lens=35):
    """Camera distance at which a height h fills a 9:16 frame (vertical, sensor 36 mm)."""
    return (h / 2) / math.tan(math.atan(18 / lens))


def glow(o, k=0.85):
    """Let a plate keep its own colours: feed its texture into emission (still takes the cut-outs' shadows)."""
    m = o.data.materials[0]; nt = m.node_tree; b = nt.nodes["Principled BSDF"]; t = [n for n in nt.nodes if n.type == "TEX_IMAGE"][0]
    nt.links.new(t.outputs["Color"], b.inputs["Emission Color"]); b.inputs["Emission Strength"].default_value = k
    return o


def shadowbox(box_dir, height=4.0, centre=2.0, gap=0.55, lens=35, thickness=0.012):
    """A generated environment plate as a paper shadow box. box_dir comes from tools/depth.py (band_0 = the full plate …
    band_N = the nearest layer, bands.json). Band k stands gap·k m in front and is shrunk so all bands line up from a camera
    at frame_dist(height) on the axis. Returns the band objects; use on_band() to place cut-outs."""
    global _PH, _ZC, _DIST
    _PH, _ZC, _DIST = height, centre, frame_dist(height, lens)
    out = []
    for b in _json.load(open(box_dir + "/bands.json")):
        k = b["band"]; d = gap * k; s = (_DIST - d) / _DIST
        o = card(box_dir + "/band_%d.png" % k, height * s, loc=(0, -d, centre), wobble=0 if k == 0 else 0.4, name="band %d" % k)
        glow(o, 0.8)
        if k and thickness:
            o.modifiers.new("thickness", "SOLIDIFY").thickness = thickness
        out.append(o)
    return out


def on_band(k, fx, fy, front=0.03, gap=0.55, aspect=1440 / 2560):
    """World position of a point on band k, given as fractions of the plate image (fx across, fy down), plus the band's
    scale. Seat a cut-out just in front of the band whose seats/counter it belongs to."""
    d = gap * k; s = (_DIST - d) / _DIST
    return ((fx - 0.5) * _PH * aspect * s, -d - front, _ZC + (0.5 - fy) * _PH * s), s


def translucent(objs, weight=0.25):
    """Thin paper lets a little light through (subsurface on cut-outs)."""
    for o in objs:
        b = o.data.materials[0].node_tree.nodes["Principled BSDF"]
        b.inputs["Subsurface Weight"].default_value = weight; b.inputs["Subsurface Radius"].default_value = (0.02, 0.015, 0.01)


def collection(name, objs):
    c = bpy.data.collections.new(name); bpy.context.scene.collection.children.link(c)
    for o in objs:
        for u in o.users_collection:
            u.objects.unlink(o)
        c.objects.link(o)
    return c


def practical_light(loc, size, energy, colour=(1, 0.88, 0.7), aim=(-90, 0, 0), only=None, glow_rect=None, glow_strength=0.9):
    """A practical (screen, lamp, window): an area light, optionally linked so it lights — and is shadowed by — only the
    collection `only` (light + shadow linking). glow_rect=(centre, (w, h)) adds a visible emissive card for the source."""
    bpy.ops.object.light_add(type="AREA", location=loc); l = bpy.context.object
    l.data.energy = energy; l.data.color = colour; l.data.size = size; l.rotation_euler = tuple(math.radians(a) for a in aim)
    if only is not None:
        l.light_linking.receiver_collection = only; l.light_linking.blocker_collection = only
    if glow_rect:
        (cx, cy, cz), (w, h) = glow_rect
        bpy.ops.mesh.primitive_plane_add(size=1, location=(cx, cy, cz)); g = bpy.context.object; g.name = "practical glow"
        g.scale = (w, h, 1); g.rotation_euler = (math.radians(90), 0, 0)
        m = bpy.data.materials.new("practical"); m.use_nodes = True; b = m.node_tree.nodes["Principled BSDF"]
        b.inputs["Base Color"].default_value = colour + (1,); b.inputs["Emission Color"].default_value = colour + (1,)
        b.inputs["Emission Strength"].default_value = glow_strength; g.data.materials.append(m)
    return l


def bloom(strength=0.15, threshold=1.0, size=0.5):
    """Soft bloom on practicals (EEVEE's own bloom left in 4.2). Blender 5: the compositor tree is a data-block and the
    Glare type is an input. A broken tree renders black — keep this exact shape."""
    sc = bpy.context.scene
    tree = bpy.data.node_groups.new("bloom", "CompositorNodeTree"); sc.compositing_node_group = tree
    tree.interface.new_socket("Image", in_out="OUTPUT", socket_type="NodeSocketColor")
    rl = tree.nodes.new("CompositorNodeRLayers"); gl = tree.nodes.new("CompositorNodeGlare"); out = tree.nodes.new("NodeGroupOutput")
    gl.inputs["Type"].default_value = "Bloom"; gl.inputs["Threshold"].default_value = threshold
    gl.inputs["Strength"].default_value = strength; gl.inputs["Size"].default_value = size
    tree.links.new(rl.outputs["Image"], gl.inputs["Image"]); tree.links.new(gl.outputs["Image"], out.inputs["Image"])
    sc.render.use_compositing = True
    return tree


def ink(points, colour=(0.79, 0.54, 0.17, 1), radius=0.006, name="ink", frame=1, draw=None):
    """A hand-inked stroke that lives in the set (Grease Pencil v3), so it stays on its object as the camera moves.
    points: [(x, y, z), …]. draw=(f0, f1) reveals it along its length on twos (points appear in order)."""
    gp = bpy.data.grease_pencils.new(name); o = bpy.data.objects.new(name, gp); bpy.context.scene.collection.objects.link(o)
    m = bpy.data.materials.new(name + " ink"); bpy.data.materials.create_gpencil_data(m); m.grease_pencil.color = colour; gp.materials.append(m)
    lay = gp.layers.new("ink"); n = len(points)
    steps = [(frame, n)] if not draw else [(f, max(2, round(n * (f - draw[0]) / max(1, draw[1] - draw[0])))) for f in range(draw[0], draw[1] + 1, 2)]
    for f, k in steps:
        dr = lay.frames.new(f).drawing; dr.add_strokes([k]); st = dr.strokes[0]
        for i in range(k):
            st.points[i].position = points[i]; st.points[i].radius = radius
    return o


def ink_ring(centre, rx, rz, n=48, **kw):
    """An ink circle drawn around a point, slightly open like a hand-drawn loop (faces the camera on -Y)."""
    cx, cy, cz = centre; pts = []
    for i in range(n):
        a = 2 * math.pi * i / (n - 6); r = 1 + 0.05 * math.sin(3 * i)
        pts.append((cx + rx * r * math.cos(a), cy - 0.02, cz + rz * r * math.sin(a)))
    return ink(pts, **kw)


def roll(o, axis_obj, frames, turns_deg=540):
    """Unroll a paper strip (Simple Deform bend about axis_obj): keys = [(frame, 0..1 unrolled), …] → angle turns_deg → 0.
    The object should be a subdivided plane (paper)."""
    sd = o.modifiers.new("roll", "SIMPLE_DEFORM"); sd.deform_method = "BEND"; sd.deform_axis = "Z"; sd.origin = axis_obj
    for f, u in frames:
        sd.angle = math.radians(turns_deg * (1 - u)); sd.keyframe_insert("angle", frame=f)
    return sd


def fold(o, hinge_obj, frames, axis="X"):
    """Fold a card on a hinge (pop-up / flap): parent o to hinge_obj (an Empty on the fold line) and key its rotation.
    frames = [(frame, degrees), …], held on twos (stop-motion)."""
    o.parent = hinge_obj; o.matrix_parent_inverse = hinge_obj.matrix_world.inverted()
    i = "XYZ".index(axis)
    for f, deg in frames:
        hinge_obj.rotation_euler[i] = math.radians(deg); hinge_obj.keyframe_insert("rotation_euler", index=i, frame=f)
    interpolation(hinge_obj, "CONSTANT")
    return hinge_obj

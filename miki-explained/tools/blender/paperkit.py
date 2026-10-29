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

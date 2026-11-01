# isokit — the house format's Blender kit (smooth isometric, from EX14 "The Long Path"). An episode's build/episode.py does
#   sys.path.insert(0, ".../miki-explained/tools/blender"); from isokit import *
#   S = setup(); … build the set with box()/cyl()/person()/Path …; rig = Rig(); bake every frame; finish(EP, N, OUT)
# Look: near-black ground, flat greys, soft sun + grey ambient (the camera sees the ground colour), one accent (green
# #57D100), Isotype people, orthographic camera, 60 fps, motion blur. See 00_bible/visual-system.md.
import sys, os, math, json, bpy
from mathutils import Vector, Euler, Matrix
from bpy_extras.object_utils import world_to_camera_view

FPS = 60
ISO = math.radians(54.7356)


def hexc(h):
    v = [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    return tuple((c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4) for c in v) + (1.0,)


BG, FLOOR, WALL, FURN, PEOPLE, WARM, ARROW = (hexc(x) for x in ("#0E0E10", "#1B1B1F", "#3A3A42", "#4C4C55", "#8C8C96", "#EDE7DC", "#2C2C33"))
ACCENT = hexc("#57D100")
# the accent renders a touch brighter than its hex under the sun: emission stays low so the screen colour stays close


def setup(half=False, samples=32):
    sc = bpy.context.scene
    for o in list(bpy.data.objects): bpy.data.objects.remove(o)
    sc.render.engine = "BLENDER_EEVEE"; sc.render.fps = FPS
    sc.render.resolution_x, sc.render.resolution_y = (540, 960) if half else (1080, 1920)
    sc.render.image_settings.file_format = "PNG"; sc.render.film_transparent = False
    sc.view_settings.view_transform = "Standard"; sc.view_settings.look = "None"
    sc.eevee.taa_render_samples = samples; sc.render.use_motion_blur = True; sc.render.motion_blur_shutter = 0.5
    w = bpy.data.worlds.new("w"); sc.world = w; w.use_nodes = True; nt = w.node_tree; nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputWorld"); mix = nt.nodes.new("ShaderNodeMixShader"); lp = nt.nodes.new("ShaderNodeLightPath")
    b1 = nt.nodes.new("ShaderNodeBackground"); b1.inputs[0].default_value = (0.32, 0.32, 0.36, 1)
    b2 = nt.nodes.new("ShaderNodeBackground"); b2.inputs[0].default_value = BG
    nt.links.new(lp.outputs["Is Camera Ray"], mix.inputs[0]); nt.links.new(b1.outputs[0], mix.inputs[1]); nt.links.new(b2.outputs[0], mix.inputs[2])
    nt.links.new(mix.outputs[0], out.inputs[0])
    bpy.ops.object.light_add(type="SUN", rotation=(math.radians(38), math.radians(-18), math.radians(-30)))
    sun = bpy.context.object; sun.data.energy = 3.2; sun.data.angle = math.radians(14)
    return sc


MATS = {}
def mat(name, col, emit=0.0):
    if name in MATS: return MATS[name]
    m = bpy.data.materials.new(name); m.use_nodes = True; b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = col; b.inputs["Roughness"].default_value = 1.0; b.inputs["Specular IOR Level"].default_value = 0.0
    if emit: b.inputs["Emission Color"].default_value = col; b.inputs["Emission Strength"].default_value = emit
    MATS[name] = m; return m


def colmat(name, emit=0.4, alpha=None):
    """Colour from the object's colour (keyable per object): o.color = …; o.keyframe_insert("color", frame=f)."""
    m = bpy.data.materials.new(name); m.use_nodes = True; n = m.node_tree; b = n.nodes["Principled BSDF"]
    oi = n.nodes.new("ShaderNodeObjectInfo"); n.links.new(oi.outputs["Color"], b.inputs["Base Color"]); n.links.new(oi.outputs["Color"], b.inputs["Emission Color"])
    b.inputs["Emission Strength"].default_value = emit; b.inputs["Roughness"].default_value = 1.0; b.inputs["Specular IOR Level"].default_value = 0.0
    if alpha is not None: b.inputs["Alpha"].default_value = alpha; m.surface_render_method = "BLENDED"
    return m


def box(name, x0, y0, x1, y1, h, m, z0=0.0, bevel=0.03):
    """A flat box from (x0, y0) to (x1, y1), height h, standing on z0; its origin is at its centre."""
    bpy.ops.mesh.primitive_cube_add(size=1, location=((x0 + x1) / 2, (y0 + y1) / 2, z0 + h / 2))
    o = bpy.context.object; o.name = name; o.scale = (abs(x1 - x0), abs(y1 - y0), h)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)   # Blender 5.2 applies location too unless told not to
    if bevel:
        bv = o.modifiers.new("b", "BEVEL"); bv.width = bevel; bv.segments = 3; bv.limit_method = "ANGLE"
    o.data.materials.append(m); return o


def cyl(name, x, y, r, h, m, z0=0.0, verts=40, bevel=0.02):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=h, location=(x, y, z0 + h / 2), vertices=verts); o = bpy.context.object; o.name = name
    if bevel:
        bv = o.modifiers.new("b", "BEVEL"); bv.width = bevel; bv.segments = 3
    o.data.materials.append(m); return o


def person(name, col, h=1.0):
    """An Isotype pictogram: a round head on a tapered rounded body. Returns an empty (the root) to move and turn."""
    pm = mat(name, col) if isinstance(col, tuple) else col
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.15 * h, location=(0, 0, 0.86 * h), segments=32, ring_count=16); head = bpy.context.object
    bpy.ops.mesh.primitive_cylinder_add(radius=0.19 * h, depth=0.56 * h, location=(0, 0, 0.36 * h), vertices=32); body = bpy.context.object
    bv = body.modifiers.new("b", "BEVEL"); bv.width = 0.09 * h; bv.segments = 6
    sw = body.modifiers.new("s", "SIMPLE_DEFORM"); sw.deform_method = "TAPER"; sw.factor = 0.35; sw.deform_axis = "Z"
    for p in (head, body): p.data.materials.append(pm)
    root = bpy.data.objects.new(name, None); bpy.context.scene.collection.objects.link(root)
    for p in (head, body): p.parent = root
    return root


class Path:
    """A rounded polyline (quadratic corners of radius r), sampled by arc length: p, d = path.at(s); path.LEN."""
    def __init__(self, pts, r=0.9, n=10):
        P = [Vector((x, y, 0)) for x, y in pts]; out = [P[0]]
        for i in range(1, len(P) - 1):
            a, b, c = P[i - 1], P[i], P[i + 1]; d1 = (b - a).normalized(); d2 = (c - b).normalized(); p0, p1 = b - d1 * r, b + d2 * r
            for k in range(n + 1): t = k / n; out.append(p0 * (1 - t) ** 2 + b * 2 * t * (1 - t) + p1 * t * t)
        out.append(P[-1]); self.P = out; self.CUM = [0.0]
        for i in range(1, len(out)): self.CUM.append(self.CUM[-1] + (out[i] - out[i - 1]).length)
        self.LEN = self.CUM[-1]
    def at(self, s):
        s = max(0.0, min(self.LEN, s)); i = next((j for j in range(1, len(self.CUM)) if self.CUM[j] >= s), len(self.CUM) - 1)
        t = (s - self.CUM[i - 1]) / max(1e-6, self.CUM[i] - self.CUM[i - 1]); return self.P[i - 1].lerp(self.P[i], t), (self.P[i] - self.P[i - 1]).normalized()
    def curve(self, name, m, depth=0.11, z=0.03, drawn=1.0):
        """The path as a flat ribbon; animate .data.bevel_factor_end (draw) / bevel_factor_start (erase)."""
        cu = bpy.data.curves.new(name, "CURVE"); cu.dimensions = "3D"; sp = cu.splines.new("POLY"); sp.points.add(len(self.P) - 1)
        for p, q in zip(sp.points, self.P): p.co = (q.x, q.y, z, 1)
        cu.bevel_depth = depth; cu.bevel_resolution = 4; cu.use_fill_caps = True; cu.bevel_factor_mapping_end = "SPLINE"
        cu.bevel_factor_mapping_start = "SPLINE"; cu.bevel_factor_end = drawn
        o = bpy.data.objects.new(name, cu); bpy.context.scene.collection.objects.link(o); o.scale = (1, 1, 0.25); o.data.materials.append(m); return o


def yaw(d): return math.atan2(d.y, d.x) - math.pi / 2


# ---------- motion ----------
def ease(u): u = max(0.0, min(1.0, u)); return u * u * u * (u * (u * 6 - 15) + 10)           # smootherstep
def span(f, a, b): return ease((f - a) / (b - a))
def back_out(u, s=1.6): u = max(0.0, min(1.0, u)) - 1; return 1 + u * u * ((s + 1) * u + s)  # small overshoot on arrival
def mix_col(c0, c1, k): return tuple(c0[i] + (c1[i] - c0[i]) * k for i in range(3)) + (1,)


def pchip(ts, vs):
    """Monotone cubic through (t, v): continuous speed, no overshoot, flat at both ends."""
    n = len(ts); h = [ts[i + 1] - ts[i] for i in range(n - 1)]; d = [(vs[i + 1] - vs[i]) / h[i] for i in range(n - 1)]
    m = [0.0] + [0 if d[i - 1] * d[i] <= 0 else (3 * (h[i - 1] + h[i])) / ((2 * h[i] + h[i - 1]) / d[i - 1] + (h[i] + 2 * h[i - 1]) / d[i]) for i in range(1, n - 1)] + [0.0]
    def f(t):
        if t <= ts[0]: return vs[0]
        if t >= ts[-1]: return vs[-1]
        i = next(j for j in range(n - 1) if t <= ts[j + 1]); u = (t - ts[i]) / h[i]
        return (2 * u ** 3 - 3 * u ** 2 + 1) * vs[i] + (u ** 3 - 2 * u ** 2 + u) * h[i] * m[i] + (-2 * u ** 3 + 3 * u ** 2) * vs[i + 1] + (u ** 3 - u ** 2) * h[i] * m[i + 1]
    return f


def vcurve(keys):
    fs = [k[0] for k in keys]; ch = [pchip(fs, [Vector(k[1])[j] for k in keys]) for j in range(3)]
    return lambda t: Vector([c(t) for c in ch])


class Rig:
    """The orthographic camera: a pivot (location, tilt, spin) + ortho scale. Camera keys: [(frame, pivot, tilt°, spin°, scale)]."""
    def __init__(self):
        sc = bpy.context.scene
        self.pivot = bpy.data.objects.new("pivot", None); sc.collection.objects.link(self.pivot)
        bpy.ops.object.camera_add(); self.cam = bpy.context.object; sc.camera = self.cam
        self.cam.data.type = "ORTHO"; self.cam.data.clip_end = 300; self.cam.parent = self.pivot; self.cam.location = (0, 0, 80); self.cam.rotation_euler = (0, 0, 0)
    def keys(self, ck):
        fs = [k[0] for k in ck]; self.LOC = vcurve([(k[0], k[1]) for k in ck])
        self.TILT, self.SPIN, self.SCALE = (pchip(fs, [k[i] for k in ck]) for i in (2, 3, 4))
    def up(self, f):                                         # screen-up, on the floor
        s = math.radians(self.SPIN(f)); return Vector((-math.sin(s), math.cos(s), 0))
    def set(self, f, loc=None):
        p = self.pivot; p.location = loc if loc is not None else self.LOC(f)
        p.rotation_euler = (math.radians(self.TILT(f)), 0, math.radians(self.SPIN(f))); self.cam.data.ortho_scale = self.SCALE(f)
        p.keyframe_insert("location", frame=f); p.keyframe_insert("rotation_euler", frame=f); self.cam.data.keyframe_insert("ortho_scale", frame=f)


def key(o, f, *props):
    for p in props: o.keyframe_insert(p, frame=f)


# ---------- anchors: 2D screen positions of world points, for EffectCraft labels that stick to the world ----------
ANCH = {}
def anchor(name, f, point):
    sc = bpy.context.scene; v = world_to_camera_view(sc, sc.camera, Vector(point))
    ANCH.setdefault(name, []).append([f, round(v.x * 1080, 1), round((1 - v.y) * 1920, 1)])


def finish(EP, N, OUT, argv):
    """Write build/anchors.jsx, then render full frames to OUT, the stills asked for, or the cheap preview (argv has "preview").
    argv "anchors": only write the anchors (a label moved to another point needs no re-render)."""
    sc = bpy.context.scene
    if ANCH:
        open(EP + "build/anchors.jsx", "w").write("// world anchors (episode.py): name → [[frame, x, y], …] in 1080×1920 comp px\nvar ANCH = " + json.dumps(ANCH) + ";\n")
    if "anchors" in argv: return
    if "preview" in argv:
        sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); from preview import preview
        preview(EP + "out/preview.mp4", range(N), audio=EP + "audio/voice.wav"); return
    frames = [int(x) for x in argv[argv.index("still") + 1].split(",")] if "still" in argv else range(N)
    for f in frames:
        sc.frame_set(f); sc.render.filepath = f"{OUT}/f_{f:04d}.png"; bpy.ops.render.render(write_still=True)

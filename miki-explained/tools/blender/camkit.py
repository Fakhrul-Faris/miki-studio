# camkit — look v4 kit (2026-11-03, reference 01_references/r45-gopcb-drone-xray): a perspective camera rig with lens and
# depth-of-field keys, realistic materials (metal, glass, frosted, copper/gold, glow), a studio set (gradient backdrop +
# reflective grid floor + key/rim lights), the ring x-ray wipe and light streaks. Works next to isokit (setup(), box(),
# Path, pchip, ease/span). Under test in 04_episodes/_tests/EX00V9_look.
import math, bpy
from mathutils import Vector
from isokit import pchip, hexc, span, ease


# ---------- render engines ----------
def engine(kind="eevee", samples=64, fast=False):
    """eevee = EEVEE with ray tracing (reflections, refraction, soft shadows); cycles = path traced + denoise (Metal GPU)."""
    sc = bpy.context.scene
    if kind == "cycles":
        sc.render.engine = "CYCLES"; sc.cycles.samples = samples; sc.cycles.use_denoising = True
        try:
            prefs = bpy.context.preferences.addons["cycles"].preferences; prefs.compute_device_type = "METAL"; prefs.get_devices()
            for d in prefs.devices: d.use = True
            sc.cycles.device = "GPU"
        except Exception as e: print("cycles GPU:", e)
    else:
        sc.render.engine = "BLENDER_EEVEE"; e = sc.eevee; e.taa_render_samples = samples
        for attr, val in (("use_raytracing", True), ("use_shadows", True), ("use_fast_gi", True), ("shadow_ray_count", 2), ("shadow_step_count", 8)):
            try: setattr(e, attr, val)
            except Exception as ex: print("eevee", attr, ex)
        try: e.shadow_pool_size = "1024"                                      # bigger shadow pool: "Shadow buffer full" otherwise
        except Exception: pass
        try: e.ray_tracing_options.resolution_scale = "2" if fast else "1"     # half-res ray tracing: reflections stay clean
        except Exception: pass
        if fast:                                                                  # M5 profile (benchmarked in EX00V9)
            for attr, val in (("shadow_ray_count", 1), ("shadow_step_count", 6), ("fast_gi_resolution", "4")):
                try: setattr(e, attr, val)
                except Exception: pass
    sc.view_settings.view_transform = "AgX"; sc.view_settings.look = "AgX - Medium High Contrast"


# ---------- materials ----------
def _bsdf(name):
    m = bpy.data.materials.new(name); m.use_nodes = True; return m, m.node_tree.nodes["Principled BSDF"]
def metal(name, col, rough=0.35):
    m, b = _bsdf(name); m.diffuse_color = col; b.inputs["Base Color"].default_value = col; b.inputs["Metallic"].default_value = 1.0; b.inputs["Roughness"].default_value = rough; return m
def paint(name, col, rough=0.45, coat=0.4):
    m, b = _bsdf(name); m.diffuse_color = col; b.inputs["Base Color"].default_value = col; b.inputs["Roughness"].default_value = rough
    b.inputs["Coat Weight"].default_value = coat; return m
def glass(name, tint=(0.85, 0.95, 1.0, 1), rough=0.04):
    m, b = _bsdf(name); b.inputs["Base Color"].default_value = tint; b.inputs["Transmission Weight"].default_value = 1.0
    b.inputs["Roughness"].default_value = rough; b.inputs["IOR"].default_value = 1.45
    for attr, val in (("surface_render_method", "DITHERED"), ("use_raytrace_refraction", True)):
        try: setattr(m, attr, val)
        except Exception: pass
    return m
def frosted(name, col, glow=0.6):
    m = glass(name, col, rough=0.45); b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Emission Color"].default_value = col; b.inputs["Emission Strength"].default_value = glow; return m
def glow(name, col, strength=6.0):
    m, b = _bsdf(name); m.diffuse_color = col; b.inputs["Base Color"].default_value = col; b.inputs["Emission Color"].default_value = col
    b.inputs["Emission Strength"].default_value = strength; return m
COPPER, GOLD = (0.95, 0.52, 0.32, 1), (1.0, 0.76, 0.33, 1)


# ---------- studio set ----------
def studio(floor_col="#1C1F26", line_col="#3A4150", back_top="#2A3140", back_bottom="#0B0D12", size=60, cell=1.0, lines=False):
    # lines=False by default: user, 2026-11-03, "remove the line on the floor" — a plain reflective floor
    """A reflective grid floor and a curved gradient backdrop (the r45 set), plus a key and a rim light."""
    sc = bpy.context.scene
    bpy.ops.mesh.primitive_plane_add(size=size, location=(0, 0, 0)); fl = bpy.context.object; fl.name = "studio floor"
    m = bpy.data.materials.new("grid floor"); m.use_nodes = True; nt = m.node_tree; b = nt.nodes["Principled BSDF"]
    b.inputs["Roughness"].default_value = 0.28; b.inputs["Specular IOR Level"].default_value = 0.4
    tc = nt.nodes.new("ShaderNodeTexCoord"); sep = nt.nodes.new("ShaderNodeSeparateXYZ"); nt.links.new(tc.outputs["Object"], sep.inputs[0])
    lines = []
    for axis in ("X", "Y"):
        d = nt.nodes.new("ShaderNodeMath"); d.operation = "DIVIDE"; d.inputs[1].default_value = cell; nt.links.new(sep.outputs[axis], d.inputs[0])
        fr = nt.nodes.new("ShaderNodeMath"); fr.operation = "PINGPONG"; fr.inputs[1].default_value = 0.5; nt.links.new(d.outputs[0], fr.inputs[0])
        lt = nt.nodes.new("ShaderNodeMath"); lt.operation = "LESS_THAN"; lt.inputs[1].default_value = 0.02; nt.links.new(fr.outputs[0], lt.inputs[0]); lines.append(lt)
    mx = nt.nodes.new("ShaderNodeMath"); mx.operation = "MAXIMUM"; nt.links.new(lines[0].outputs[0], mx.inputs[0]); nt.links.new(lines[1].outputs[0], mx.inputs[1])
    mix = nt.nodes.new("ShaderNodeMix"); mix.data_type = "RGBA"; mix.inputs[6].default_value = hexc(floor_col); mix.inputs[7].default_value = hexc(line_col if lines else floor_col)
    nt.links.new(mx.outputs[0], mix.inputs[0]); nt.links.new(mix.outputs[2], b.inputs["Base Color"]); fl.data.materials.append(m)
    # backdrop: a big cylinder segment behind, emission gradient bottom -> top (camera sees it, lights barely do)
    w = sc.world; w.use_nodes = True; wn = w.node_tree; wn.nodes.clear()
    out = wn.nodes.new("ShaderNodeOutputWorld"); bg = wn.nodes.new("ShaderNodeBackground"); grad = wn.nodes.new("ShaderNodeValToRGB")
    tc2 = wn.nodes.new("ShaderNodeTexCoord"); sep2 = wn.nodes.new("ShaderNodeSeparateXYZ")
    mr = wn.nodes.new("ShaderNodeMapRange"); mr.inputs["From Min"].default_value = -0.05; mr.inputs["From Max"].default_value = 0.45
    wn.links.new(tc2.outputs["Normal"], sep2.inputs[0]); wn.links.new(sep2.outputs["Z"], mr.inputs["Value"]); wn.links.new(mr.outputs[0], grad.inputs[0])
    grad.color_ramp.elements[0].position = 0.0; grad.color_ramp.elements[0].color = hexc(back_bottom)       # the view direction's height:
    grad.color_ramp.elements[1].position = 1.0; grad.color_ramp.elements[1].color = hexc(back_top)          # dark at the horizon, lighter up
    wn.links.new(grad.outputs[0], bg.inputs[0]); bg.inputs[1].default_value = 0.6; wn.links.new(bg.outputs[0], out.inputs[0])
    lights = {}
    for name, loc, energy, col, size_ in (("key", (6, -8, 10), 1800, (1.0, 0.96, 0.9), 6), ("rim", (-7, 9, 6), 1500, (0.75, 0.85, 1.0), 4),
                                          ("fill", (-9, -6, 4), 250, (0.8, 0.85, 1.0), 8)):
        bpy.ops.object.light_add(type="AREA", location=loc); L = bpy.context.object; L.name = name
        L.data.energy = energy; L.data.color = col; L.data.size = size_
        L.rotation_euler = (Vector((0, 0, 1)) - Vector(loc)).to_track_quat("-Z", "Y").to_euler(); lights[name] = L
    return fl, lights


# ---------- the ring x-ray wipe ----------
def xray_material(name, solid, glass_m=None, ring_col=(1, 1, 1, 1), ring_w=0.06, world=False):
    """A material that is `solid` outside a sphere of radius R around point P (object space) and glass inside, with a
    glowing ring at the boundary. Animate with xray_set(m, f, radius). P is set with xray_origin(m, (x, y, z))."""
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    def clone(src):
        b = nt.nodes.new("ShaderNodeBsdfPrincipled"); sb = src.node_tree.nodes["Principled BSDF"]
        for inp in sb.inputs:
            if hasattr(inp, "default_value") and inp.name in b.inputs:
                try: b.inputs[inp.name].default_value = inp.default_value
                except Exception: pass
        return b
    bs = clone(solid)                                   # glass_m None = cut away (user, 2026-11-03: real surfaces, no glass everywhere)
    bg = clone(glass_m) if glass_m else nt.nodes.new("ShaderNodeBsdfTransparent")
    tc = nt.nodes.new("ShaderNodeTexCoord"); po = nt.nodes.new("ShaderNodeCombineXYZ"); po.name = "P"
    dist = nt.nodes.new("ShaderNodeVectorMath"); dist.operation = "DISTANCE"
    if world:                                                # world space: one ring across many objects (roof + parapets + walls)
        geo = nt.nodes.new("ShaderNodeNewGeometry"); nt.links.new(geo.outputs["Position"], dist.inputs[0])
    else: nt.links.new(tc.outputs["Object"], dist.inputs[0])
    nt.links.new(po.outputs[0], dist.inputs[1])
    rad = nt.nodes.new("ShaderNodeValue"); rad.name = "R"; rad.outputs[0].default_value = 0.0
    inside = nt.nodes.new("ShaderNodeMath"); inside.operation = "LESS_THAN"; nt.links.new(dist.outputs["Value"], inside.inputs[0]); nt.links.new(rad.outputs[0], inside.inputs[1])
    mix = nt.nodes.new("ShaderNodeMixShader"); nt.links.new(inside.outputs[0], mix.inputs[0]); nt.links.new(bs.outputs[0], mix.inputs[1]); nt.links.new(bg.outputs[0], mix.inputs[2])
    sub = nt.nodes.new("ShaderNodeMath"); sub.operation = "SUBTRACT"; nt.links.new(dist.outputs["Value"], sub.inputs[0]); nt.links.new(rad.outputs[0], sub.inputs[1])
    ab = nt.nodes.new("ShaderNodeMath"); ab.operation = "ABSOLUTE"; nt.links.new(sub.outputs[0], ab.inputs[0])
    ring = nt.nodes.new("ShaderNodeMapRange"); ring.interpolation_type = "SMOOTHSTEP"; ring.name = "ringw"   # soft edge, not a hard band
    ring.inputs["From Min"].default_value = 0.0; ring.inputs["From Max"].default_value = ring_w
    ring.inputs["To Min"].default_value = 1.0; ring.inputs["To Max"].default_value = 0.0; nt.links.new(ab.outputs[0], ring.inputs["Value"])
    gate = nt.nodes.new("ShaderNodeMath"); gate.operation = "GREATER_THAN"; gate.inputs[1].default_value = 0.001; nt.links.new(rad.outputs[0], gate.inputs[0])
    rg = nt.nodes.new("ShaderNodeMath"); rg.operation = "MULTIPLY"; nt.links.new(ring.outputs[0], rg.inputs[0]); nt.links.new(gate.outputs[0], rg.inputs[1])
    em = nt.nodes.new("ShaderNodeEmission"); em.inputs[0].default_value = ring_col; em.inputs[1].default_value = 1.0
    st = nt.nodes.new("ShaderNodeValue"); st.name = "S"; st.outputs[0].default_value = 0.0                    # ring brightness (keyed)
    rgs = nt.nodes.new("ShaderNodeMath"); rgs.operation = "MULTIPLY"; nt.links.new(rg.outputs[0], rgs.inputs[0]); nt.links.new(st.outputs[0], rgs.inputs[1])
    rgc = nt.nodes.new("ShaderNodeMath"); rgc.operation = "MINIMUM"; rgc.inputs[1].default_value = 1.0; nt.links.new(rgs.outputs[0], rgc.inputs[0])
    ems = nt.nodes.new("ShaderNodeMath"); ems.operation = "MULTIPLY"; ems.inputs[1].default_value = 10.0; nt.links.new(st.outputs[0], ems.inputs[0])
    nt.links.new(ems.outputs[0], em.inputs[1])
    add = nt.nodes.new("ShaderNodeMixShader"); nt.links.new(rgc.outputs[0], add.inputs[0]); nt.links.new(mix.outputs[0], add.inputs[1]); nt.links.new(em.outputs[0], add.inputs[2])
    nt.links.new(add.outputs[0], out.inputs[0])
    for attr, val in (("surface_render_method", "DITHERED"), ("use_raytrace_refraction", True)):
        try: setattr(m, attr, val)
        except Exception: pass
    return m
def xray_origin(m, p):
    n = m.node_tree.nodes["P"]
    for i, v in enumerate(p): n.inputs[i].default_value = v
def xray_set(m, f, radius, strength=1.0):
    """radius of the cut; strength 0..1 of the ring's glow (ramp it in so the ring never pops on)."""
    n = m.node_tree.nodes["R"]; n.outputs[0].default_value = radius; n.outputs[0].keyframe_insert("default_value", frame=f)
    s_ = m.node_tree.nodes["S"]; s_.outputs[0].default_value = strength; s_.outputs[0].keyframe_insert("default_value", frame=f)


# ---------- light streaks (money / energy running along a path) ----------
def streak(curve_obj, f, t, length=0.18):
    """Show a short glowing section of a curve object (bevelled, emissive material) whose head is at t in 0..1+length."""
    d = curve_obj.data; d.bevel_factor_mapping_start = "SPLINE"; d.bevel_factor_mapping_end = "SPLINE"
    d.bevel_factor_end = max(0.0, min(1.0, t)); d.bevel_factor_start = max(0.0, min(1.0, t - length))
    d.keyframe_insert("bevel_factor_end", frame=f); d.keyframe_insert("bevel_factor_start", frame=f)


# ---------- the perspective rig ----------
class PerspRig:
    """A perspective camera that looks at an aim point. Keys: [(frame, camera position, aim position, lens mm, f-stop)].
    Depth of field focuses on the aim point (an empty), so the subject stays sharp while the camera moves. A small
    handheld drift (amp in units) keeps holds alive."""
    def __init__(self, sensor=36.0):
        sc = bpy.context.scene
        self.aim = bpy.data.objects.new("aim", None); sc.collection.objects.link(self.aim)
        bpy.ops.object.camera_add(); self.cam = bpy.context.object; sc.camera = self.cam
        c = self.cam.data; c.type = "PERSP"; c.sensor_width = sensor; c.clip_start = 0.02; c.clip_end = 2000
        c.dof.use_dof = True; c.dof.focus_object = self.aim
        tr = self.cam.constraints.new("TRACK_TO"); tr.target = self.aim; tr.track_axis = "TRACK_NEGATIVE_Z"; tr.up_axis = "UP_Y"
    def keys(self, ck, drift=0.0):
        fs = [k[0] for k in ck]; self.drift = drift
        self.P = [pchip(fs, [Vector(k[1])[j] for k in ck]) for j in range(3)]
        self.T = [pchip(fs, [Vector(k[2])[j] for k in ck]) for j in range(3)]
        self.LENS = pchip(fs, [k[3] for k in ck]); self.FSTOP = pchip(fs, [k[4] for k in ck])
    def set(self, f):
        p = Vector([c(f) for c in self.P]); t = Vector([c(f) for c in self.T])
        if self.drift:
            p += Vector((math.sin(f * 0.031) * 0.6 + math.sin(f * 0.077) * 0.4, math.sin(f * 0.043 + 1.3) * 0.5, math.sin(f * 0.029 + 2.1) * 0.4)) * self.drift
        self.cam.location = p; self.aim.location = t
        self.cam.data.lens = self.LENS(f); self.cam.data.dof.aperture_fstop = self.FSTOP(f)
        self.cam.keyframe_insert("location", frame=f); self.aim.keyframe_insert("location", frame=f)
        self.cam.data.keyframe_insert("lens", frame=f); self.cam.data.dof.keyframe_insert("aperture_fstop", frame=f)


def render_range(out_pattern, f0, f1):
    """Render frames f0..f1 as one animation job (shaders and scene data stay loaded between frames: much faster than a
    per-frame render loop). out_pattern like '/path/f_' -> f_0000.png."""
    sc = bpy.context.scene; keep = (sc.frame_start, sc.frame_end, sc.render.filepath)
    sc.frame_start, sc.frame_end = f0, f1; sc.render.filepath = out_pattern; sc.render.image_settings.file_format = "PNG"
    sc.render.use_file_extension = True; bpy.ops.render.render(animation=True)
    sc.frame_start, sc.frame_end, sc.render.filepath = keep


# ---------- people (v4): a stylised figure with real proportions (1.75 m) and a run/walk cycle ----------
def _limb(name, r, d, m, loc, parent):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=d, vertices=16, location=(0, 0, 0)); o = bpy.context.object; o.name = name
    o.data.transform(__import__("mathutils").Matrix.Translation((0, 0, -d / 2)))
    bv = o.modifiers.new("b", "BEVEL"); bv.width = r * 0.9; bv.segments = 3
    o.data.materials.append(m); o.parent = parent; o.location = loc; return o
class Figure:
    """Head, torso, legs, arms under a root (move/turn it). pose(f, phase, amp, run=False) swings the limbs; amp 0 = still."""
    def __init__(self, name, body_m, skin_m=None, h=1.75):
        sc = bpy.context.scene; k = h / 1.75; skin_m = skin_m or body_m
        self.root = bpy.data.objects.new(name, None); sc.collection.objects.link(self.root)
        self.hip = bpy.data.objects.new(name + " hip", None); sc.collection.objects.link(self.hip); self.hip.parent = self.root
        self.hip.location = (0, 0, 0.92 * k)
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.11 * k, location=(0, 0, 0.78 * k), segments=24, ring_count=12)
        hd = bpy.context.object; hd.data.materials.append(skin_m); hd.parent = self.hip
        bpy.ops.mesh.primitive_cylinder_add(radius=0.17 * k, depth=0.56 * k, location=(0, 0, 0.34 * k), vertices=24)
        tb = bpy.context.object; tb.data.materials.append(body_m); tb.parent = self.hip
        bv = tb.modifiers.new("b", "BEVEL"); bv.width = 0.08 * k; bv.segments = 4
        sw = tb.modifiers.new("s", "SIMPLE_DEFORM"); sw.deform_method = "TAPER"; sw.factor = -0.25; sw.deform_axis = "Z"
        self.legs = [_limb("leg", 0.075 * k, 0.9 * k, body_m, (s * 0.1 * k, 0, 0.0), self.hip) for s in (-1, 1)]
        self.arms = [_limb("arm", 0.055 * k, 0.6 * k, body_m, (s * 0.23 * k, 0, 0.58 * k), self.hip) for s in (-1, 1)]
        self.parts = [hd, tb] + self.legs + self.arms; self.k = k
    def pose(self, f, phase, amp, run=False):
        a = math.sin(phase) * amp * (0.9 if run else 0.5)
        self.legs[0].rotation_euler.x, self.legs[1].rotation_euler.x = a, -a
        self.arms[0].rotation_euler.x, self.arms[1].rotation_euler.x = -a * (1.4 if run else 0.8), a * (1.4 if run else 0.8)
        self.hip.location.z = 0.92 * self.k + (0.05 if run else 0.02) * amp * abs(math.sin(phase))
        for o in self.legs + self.arms: o.keyframe_insert("rotation_euler", frame=f)
        self.hip.keyframe_insert("location", frame=f)
    def material(self, m):
        for p in self.parts: p.data.materials.clear(); p.data.materials.append(m)


def ghost(name, col=(0.35, 0.65, 1.0, 1), alpha=0.28, glow=0.7):
    """See-through glowing 'ghost' people: Transparent + Emission mixed (a Principled with Alpha came out solid in EEVEE)."""
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial"); tr = nt.nodes.new("ShaderNodeBsdfTransparent")
    em = nt.nodes.new("ShaderNodeEmission"); em.inputs[0].default_value = col; em.inputs[1].default_value = glow
    mx = nt.nodes.new("ShaderNodeMixShader"); mx.inputs[0].default_value = alpha
    nt.links.new(tr.outputs[0], mx.inputs[1]); nt.links.new(em.outputs[0], mx.inputs[2]); nt.links.new(mx.outputs[0], out.inputs[0])
    try: m.surface_render_method = "DITHERED"
    except Exception: pass
    return m


# ---------- entrances and exits (user, 2026-11-04: "every object that will be off camera must fade out … not harsh cut") ----------
def _s0(o):
    if "s0" not in o: o["s0"] = list(o.scale) if o.scale.length > 1e-6 else [1.0, 1.0, 1.0]
    return Vector(o["s0"])
def appear(objs, f, d=12, f_hidden_from=0):
    """grow in over d frames ending at f (eased by Blender's default bezier); hidden before."""
    for o in objs:
        s = _s0(o)
        o.hide_render = True; o.keyframe_insert("hide_render", frame=f_hidden_from)
        o.hide_render = False; o.keyframe_insert("hide_render", frame=max(f_hidden_from + 1, f - d))
        o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=max(f_hidden_from + 1, f - d))
        o.scale = s * 1.04; o.keyframe_insert("scale", frame=f); o.scale = s; o.keyframe_insert("scale", frame=f + 4)
def vanish(objs, f, d=12):
    """shrink out over d frames ending at f, then hide (a soft exit, never a pop)."""
    for o in objs:
        s = _s0(o)
        o.scale = s; o.keyframe_insert("scale", frame=f - d)
        o.scale = (0, 0, 0); o.keyframe_insert("scale", frame=f)
        o.hide_render = True; o.keyframe_insert("hide_render", frame=f + 1)


# ---------- Isotype people icons (one icon = N people; EX19 user pick over cubes) ----------
_ICON = {}
def isotype_mesh(h=1.0):
    """a flat-fronted pictogram: round head, shoulders-to-hips body, two legs; one shared mesh for every icon."""
    if h in _ICON: return _ICON[h]
    import bmesh
    me = bpy.data.meshes.new("isotype"); bm = bmesh.new()
    def capsule(x, z0, z1, r, depth):
        m = __import__("mathutils").Matrix
        bmesh.ops.create_cone(bm, cap_ends=True, segments=16, radius1=r, radius2=r * 0.92, depth=z1 - z0, matrix=m.Translation((x, 0, (z0 + z1) / 2)))
    bmesh.ops.create_uvsphere(bm, u_segments=20, v_segments=12, radius=0.13 * h, matrix=__import__("mathutils").Matrix.Translation((0, 0, 0.86 * h)))
    capsule(0, 0.42 * h, 0.72 * h, 0.17 * h, 0.12 * h)                          # body
    capsule(-0.075 * h, 0.0, 0.44 * h, 0.065 * h, 0.1 * h); capsule(0.075 * h, 0.0, 0.44 * h, 0.065 * h, 0.1 * h)   # legs
    capsule(-0.21 * h, 0.4 * h, 0.7 * h, 0.05 * h, 0.08 * h); capsule(0.21 * h, 0.4 * h, 0.7 * h, 0.05 * h, 0.08 * h)  # arms
    bm.to_mesh(me); bm.free(); _ICON[h] = me; return me
def isotype(name, loc, m, h=1.0, face=0.0):
    """one icon (shared mesh, its own material through an object-linked slot, so grey and green icons share geometry)."""
    me = isotype_mesh(h)
    if not me.materials: me.materials.append(m)
    o = bpy.data.objects.new(name, me); bpy.context.scene.collection.objects.link(o)
    o.location = loc; o.rotation_euler.z = face
    o.material_slots[0].link = "OBJECT"; o.material_slots[0].material = m
    return o
def recolor(o, m, f, d=6):
    """switch an icon's material at frame f (keyed via a hidden twin is overkill; a scale blink sells the change)."""
    o.material_slots[0].material = m


# ---------- Poly Haven (CC0) textures and sky (user, 2026-11-04: "you can add poly haven") ----------
PH = __import__("os").path.join(__import__("os").path.dirname(__import__("os").path.dirname(__import__("os").path.dirname(__import__("os").path.abspath(__file__)))), "02_kit", "polyhaven")
def pbr(name, role, scale=1.0, tint=None, rough_mul=1.0):
    """A textured material from 02_kit/polyhaven/<role>_{diff,rough,nor}.jpg, box-projected in object space (no UVs needed).
    scale = texture repeats per metre; tint multiplies the colour (keeps the palette)."""
    import os
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; b = nt.nodes["Principled BSDF"]
    tc = nt.nodes.new("ShaderNodeTexCoord"); mp = nt.nodes.new("ShaderNodeMapping"); mp.inputs["Scale"].default_value = (scale, scale, scale)
    nt.links.new(tc.outputs["Object"], mp.inputs["Vector"])
    def img(kind, non_color):
        p = os.path.join(PH, f"{role}_{kind}.jpg")
        if not os.path.exists(p): return None
        n = nt.nodes.new("ShaderNodeTexImage"); n.image = bpy.data.images.load(p, check_existing=True); n.projection = "BOX"; n.projection_blend = 0.25
        if non_color: n.image.colorspace_settings.name = "Non-Color"
        nt.links.new(mp.outputs["Vector"], n.inputs["Vector"]); return n
    d = img("diff", False); r = img("rough", True); nn = img("nor", True)
    if d:
        if tint:
            mx = nt.nodes.new("ShaderNodeMix"); mx.data_type = "RGBA"; mx.blend_type = "MULTIPLY"; mx.inputs[0].default_value = 1.0
            nt.links.new(d.outputs["Color"], mx.inputs[6]); mx.inputs[7].default_value = tint; nt.links.new(mx.outputs[2], b.inputs["Base Color"])
        else: nt.links.new(d.outputs["Color"], b.inputs["Base Color"])
    if r:
        mu = nt.nodes.new("ShaderNodeMath"); mu.operation = "MULTIPLY"; mu.inputs[1].default_value = rough_mul
        nt.links.new(r.outputs["Color"], mu.inputs[0]); nt.links.new(mu.outputs[0], b.inputs["Roughness"])
    if nn:
        nm = nt.nodes.new("ShaderNodeNormalMap"); nm.inputs["Strength"].default_value = 0.6
        nt.links.new(nn.outputs["Color"], nm.inputs["Color"]); nt.links.new(nm.outputs["Normal"], b.inputs["Normal"])
    m.diffuse_color = tint or (0.5, 0.5, 0.5, 1); return m


def world_hdri(strength=0.6, camera_top="#2A3A60", camera_bottom="#C89A82"):
    """Light the scene with the Poly Haven dusk HDRI; the camera still sees our own gradient sky (keeps the look)."""
    import os
    from isokit import hexc
    sc = bpy.context.scene; w = sc.world or bpy.data.worlds.new("w"); sc.world = w; w.use_nodes = True; wn = w.node_tree; wn.nodes.clear()
    out = wn.nodes.new("ShaderNodeOutputWorld"); env = wn.nodes.new("ShaderNodeTexEnvironment")
    env.image = bpy.data.images.load(os.path.join(PH, "sky.hdr"), check_existing=True)
    light = wn.nodes.new("ShaderNodeBackground"); nt_links = wn.links; nt_links.new(env.outputs["Color"], light.inputs["Color"]); light.inputs["Strength"].default_value = strength
    grad = wn.nodes.new("ShaderNodeValToRGB"); tc = wn.nodes.new("ShaderNodeTexCoord"); sep = wn.nodes.new("ShaderNodeSeparateXYZ"); mr = wn.nodes.new("ShaderNodeMapRange")
    mr.inputs["From Min"].default_value = -0.05; mr.inputs["From Max"].default_value = 0.5
    nt_links.new(tc.outputs["Normal"], sep.inputs[0]); nt_links.new(sep.outputs["Z"], mr.inputs["Value"]); nt_links.new(mr.outputs[0], grad.inputs[0])
    grad.color_ramp.elements[0].color = hexc(camera_bottom); grad.color_ramp.elements[1].color = hexc(camera_top); grad.color_ramp.elements[1].position = 0.45
    seen = wn.nodes.new("ShaderNodeBackground"); nt_links.new(grad.outputs[0], seen.inputs["Color"])
    lp = wn.nodes.new("ShaderNodeLightPath"); mix = wn.nodes.new("ShaderNodeMixShader")
    nt_links.new(lp.outputs["Is Camera Ray"], mix.inputs[0]); nt_links.new(light.outputs[0], mix.inputs[1]); nt_links.new(seen.outputs[0], mix.inputs[2])
    nt_links.new(mix.outputs[0], out.inputs[0])
    return light.inputs["Strength"], seen.inputs["Strength"]

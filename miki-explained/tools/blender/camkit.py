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
    m, b = _bsdf(name); b.inputs["Base Color"].default_value = col; b.inputs["Metallic"].default_value = 1.0; b.inputs["Roughness"].default_value = rough; return m
def paint(name, col, rough=0.45, coat=0.4):
    m, b = _bsdf(name); b.inputs["Base Color"].default_value = col; b.inputs["Roughness"].default_value = rough
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
    m, b = _bsdf(name); b.inputs["Base Color"].default_value = col; b.inputs["Emission Color"].default_value = col
    b.inputs["Emission Strength"].default_value = strength; return m
COPPER, GOLD = (0.95, 0.52, 0.32, 1), (1.0, 0.76, 0.33, 1)


# ---------- studio set ----------
def studio(floor_col="#1C1F26", line_col="#3A4150", back_top="#2A3140", back_bottom="#0B0D12", size=60, cell=1.0):
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
    mix = nt.nodes.new("ShaderNodeMix"); mix.data_type = "RGBA"; mix.inputs[6].default_value = hexc(floor_col); mix.inputs[7].default_value = hexc(line_col)
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
def xray_material(name, solid, glass_m=None, ring_col=(1, 1, 1, 1), ring_w=0.06):
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
    nt.links.new(tc.outputs["Object"], dist.inputs[0]); nt.links.new(po.outputs[0], dist.inputs[1])
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

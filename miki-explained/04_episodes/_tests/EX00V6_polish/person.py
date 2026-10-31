# 3D audience helper: a Hunyuan3D shape (no texture) + the user's front still projected onto it from the front.
# The front reads as the halftone print; faces turning away fade to a dark warm grey (the back is never seen lit).
import bpy, bmesh
from mathutils import Vector

# figure bounding box in each still (px, x0 x1 y0 y1), measured on the 1920² PNGs
BBOX = {"P1_hands": (603, 1341, 107, 1799), "P2_bag": (611, 1341, 90, 1811), "P3_phone": (547, 1386, 110, 1811)}
DIR = "/Users/user/Private/miki-studio/miki-explained/04_episodes/_tests/EX00V6_polish/"


def load(name, height=1.28, faces=40000, grey=0.15, back=(0.07, 0.065, 0.06, 1)):
    """Import models/<name>_shape.glb as one mesh, feet on z=0, facing −Y, `height` tall; returns the object."""
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=DIR + "models/%s_shape.glb" % name)
    new = [o for o in bpy.data.objects if o not in before]
    meshes = [o for o in new if o.type == "MESH"]
    bpy.ops.object.select_all(action="DESELECT")
    for o in meshes: o.select_set(True)
    bpy.context.view_layer.objects.active = meshes[0]
    if len(meshes) > 1: bpy.ops.object.join()
    o = bpy.context.view_layer.objects.active
    bpy.ops.object.parent_clear(type="CLEAR_KEEP_TRANSFORM"); bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    for e in new:
        if e != o and e.name in bpy.data.objects: bpy.data.objects.remove(e)
    o.name = name
    dec = o.modifiers.new("decimate", "DECIMATE"); dec.ratio = min(1, faces / max(1, len(o.data.polygons)))
    bpy.ops.object.modifier_apply(modifier="decimate")
    # normalise: feet at z=0, centred on x/y, `height` tall
    vs = [v.co for v in o.data.vertices]; lo = Vector((min(v.x for v in vs), min(v.y for v in vs), min(v.z for v in vs)))
    hi = Vector((max(v.x for v in vs), max(v.y for v in vs), max(v.z for v in vs))); s = height / (hi.z - lo.z)
    for v in o.data.vertices: v.co = Vector(((v.co.x - (lo.x + hi.x) / 2) * s, (v.co.y - (lo.y + hi.y) / 2) * s, (v.co.z - lo.z) * s))
    # front orthographic projection: mesh x/z bbox → the figure's bbox in the still
    vs = [v.co for v in o.data.vertices]; x0, x1 = min(v.x for v in vs), max(v.x for v in vs); z1 = max(v.z for v in vs)
    bx0, bx1, by0, by1 = BBOX[name]; W = H = 1920
    bm = bmesh.new(); bm.from_mesh(o.data); uv = bm.loops.layers.uv.new("front")
    for f in bm.faces:
        for l in f.loops:
            u = (l.vert.co.x - x0) / (x1 - x0); v = l.vert.co.z / z1
            l[uv].uv = ((bx0 + u * (bx1 - bx0)) / W, 1 - (by1 - v * (by1 - by0)) / H)
    bm.to_mesh(o.data); bm.free()
    for p in o.data.polygons: p.use_smooth = True
    o.data.materials.clear(); o.data.materials.append(_mat(name, grey, back))
    return o


def _mat(name, grey, back):
    m = bpy.data.materials.new("person " + name); m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial"); b = nt.nodes.new("ShaderNodeBsdfPrincipled"); b.inputs["Roughness"].default_value = 0.9
    t = nt.nodes.new("ShaderNodeTexImage"); t.image = bpy.data.images.load(DIR + "models/%s_tex.png" % name); t.extension = "EXTEND"
    uvn = nt.nodes.new("ShaderNodeUVMap"); uvn.uv_map = "front"; nt.links.new(uvn.outputs[0], t.inputs[0])
    hs = nt.nodes.new("ShaderNodeHueSaturation"); hs.inputs["Saturation"].default_value = grey; nt.links.new(t.outputs[0], hs.inputs["Color"])
    # facing: object-space normal −Y = toward the still's camera → print; away → dark grey
    tc = nt.nodes.new("ShaderNodeTexCoord"); sep = nt.nodes.new("ShaderNodeSeparateXYZ"); nt.links.new(tc.outputs["Normal"], sep.inputs[0])
    mr = nt.nodes.new("ShaderNodeMapRange"); mr.inputs["From Min"].default_value = 0.1; mr.inputs["From Max"].default_value = -0.35
    nt.links.new(sep.outputs["Y"], mr.inputs["Value"])
    mix = nt.nodes.new("ShaderNodeMix"); mix.data_type = "RGBA"; mix.inputs[6].default_value = back
    nt.links.new(mr.outputs[0], mix.inputs["Factor"]); nt.links.new(hs.outputs[0], mix.inputs[7])
    nt.links.new(mix.outputs[2], b.inputs["Base Color"]); nt.links.new(b.outputs[0], out.inputs[0])
    return m

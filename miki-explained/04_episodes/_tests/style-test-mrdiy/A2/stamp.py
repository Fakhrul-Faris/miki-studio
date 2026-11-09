# Builds media/parts/stamp.glb (Poly Pizza "Rubber Stamp" by Poly by Google, CC-BY: base on y=0, height 0.45 m, red pad).
# blender -b -P stamp.py
import bpy, bmesh, math
from mathutils import Vector, Matrix
D = "/Users/user/Private/miki-studio/miki-explained/04_episodes/_tests/style-test-mrdiy/A2/media/parts/"

def clear():
    bpy.ops.wm.read_factory_settings(use_empty=True)

def mat(name, col, metal, rough):
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*col, 1); b.inputs["Metallic"].default_value = metal; b.inputs["Roughness"].default_value = rough
    return m

# ---------- stamp ----------
clear()
bpy.ops.import_scene.gltf(filepath=D + "stamp_src.glb")
obs = [o for o in bpy.context.scene.objects if o.type == "MESH"]
for o in obs: o.select_set(True)
bpy.context.view_layer.objects.active = obs[0]
if len(obs) > 1: bpy.ops.object.join()
ob = bpy.context.view_layer.objects.active
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
cs = [ob.matrix_world @ Vector(c) for c in ob.bound_box]
mn = Vector([min(c[i] for c in cs) for i in range(3)]); mx = Vector([max(c[i] for c in cs) for i in range(3)])
print("STAMP src", [round(v, 3) for v in mn], [round(v, 3) for v in mx], [m.name for m in ob.data.materials])
sc = 0.45 / (mx.z - mn.z)
ob.location = (-(mn.x + mx.x) / 2 * sc, -(mn.y + mx.y) / 2 * sc, -mn.z * sc + 0.02); ob.scale = (sc, sc, sc)
bpy.ops.object.transform_apply(location=True, scale=True)
w = (mx.x - mn.x) * sc * 0.92; d = (mx.y - mn.y) * sc * 0.92
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0.01)); pad = bpy.context.active_object
pad.scale = (w, d, 0.02); bpy.ops.object.transform_apply(scale=True)
pad.data.materials.append(mat("pad", (0.75, 0.05, 0.06), 0.0, 0.7))
for o in (ob, pad): o.select_set(True)
cs = [ob.matrix_world @ Vector(c) for c in ob.bound_box]
print("STAMP out", [round(min(c[i] for c in cs), 3) for i in range(3)], [round(max(c[i] for c in cs), 3) for i in range(3)])
bpy.ops.export_scene.gltf(filepath=D + "stamp.glb", export_format="GLB", use_selection=True, export_yup=True)

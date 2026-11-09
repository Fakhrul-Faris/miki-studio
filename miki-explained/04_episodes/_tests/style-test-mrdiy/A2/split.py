# Blender as builder only: split Poly Haven variant files into single clean parts and fix scales, export GLB for raea.
import bpy, sys, os
H = os.path.dirname(os.path.abspath(__file__)) if "__file__" in dir() else os.getcwd()
def clear():
    for o in list(bpy.data.objects): bpy.data.objects.remove(o)
def part(src, keep, out, scale=1.0):
    clear(); bpy.ops.import_scene.gltf(filepath=src)
    for o in list(bpy.data.objects):
        if o.type == "MESH" and o.name != keep: bpy.data.objects.remove(o)
    for o in bpy.data.objects:
        if o.type == "MESH":
            o.location = (0, 0, 0); o.scale = (o.scale[0]*scale, o.scale[1]*scale, o.scale[2]*scale)
            bpy.context.view_layer.objects.active = o; o.select_set(True)
            bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
            # bottom at z=0, centred in x/y
            import mathutils
            vs = [o.matrix_world @ v.co for v in o.data.vertices]
            mn = mathutils.Vector((min(v.x for v in vs), min(v.y for v in vs), min(v.z for v in vs)))
            mx = mathutils.Vector((max(v.x for v in vs), max(v.y for v in vs), max(v.z for v in vs)))
            o.location = (-(mn.x+mx.x)/2, -(mn.y+mx.y)/2, -mn.z)
    bpy.ops.export_scene.gltf(filepath=out, export_format="GLB", use_selection=False, export_yup=True)
M = "media"
part(f"{M}/rollershutter_door/rollershutter_door.gltf", "rollershutter_door", f"{M}/parts/shutter.glb")
part(f"{M}/rollershutter_window_01/rollershutter_window_01.gltf", "rollershutter_window_01", f"{M}/parts/shutter_win.glb")
part(f"{M}/steel_frame_shelves_01/steel_frame_shelves_01.gltf", "steel_frame_shelves_01", f"{M}/parts/shelves.glb", 0.1)
clear(); bpy.ops.import_scene.gltf(filepath=f"{M}/vespa.glb")
for o in bpy.data.objects:
    if o.type == "MESH": o.name = "Circle"
part(f"{M}/vespa.glb", "Circle", f"{M}/parts/vespa.glb", 0.42)
print("SPLIT OK")

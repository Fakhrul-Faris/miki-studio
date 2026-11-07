# blend2raea — one shot of a built episode .blend → what raea needs to play it (user, 2026-11-07: "all raea").
#   blender -b EPISODE.blend --python tools/raea/blend2raea.py -- OUT_DIR NAME SET_X F0 F1 [RADIUS]
# writes OUT_DIR/media/NAME.glb (the set around x = SET_X, its animation baked from F0 to F1 so clip time 0 = F0) and
# OUT_DIR/NAME.json: per-frame camera (Y-up: position, a point 10 m ahead, vertical fov), the set's area lights and the
# world's backdrop colours. raea's shot component (tools/raea/kit) reads both.
import bpy, sys, json, math
from mathutils import Vector
A = sys.argv[sys.argv.index("--") + 1:]
OUT, NAME, SX, F0, F1 = A[0], A[1], float(A[2]), int(A[3]), int(A[4]); R = float(A[5]) if len(A) > 5 else 190.0
sc = bpy.context.scene
def yup(v): return [round(v[0], 4), round(v[2], 4), round(-v[1], 4)]
def near(o):
    sc.frame_set(F0); return abs(o.matrix_world.translation.x - SX) < R

# the camera, every frame of the shot
cam, track = sc.camera, []
for f in range(F0, F1 + 1):
    sc.frame_set(f); mw = cam.matrix_world; fwd = mw.to_3x3() @ Vector((0, 0, -1))
    sw = cam.data.sensor_width; ar = sc.render.resolution_x / sc.render.resolution_y
    vfov = 2 * math.atan(sw / 2 / cam.data.lens) if ar < 1 else 2 * math.atan(sw / 2 / cam.data.lens / ar)   # AUTO fit: the long side
    track.append({"p": yup(mw.translation), "t": yup(mw.translation + fwd * 10), "fov": round(vfov, 5)})

# the set's lights
lights = []
for o in bpy.data.objects:
    if o.type == "LIGHT" and near(o):
        d = o.matrix_world.to_3x3() @ Vector((0, 0, -1))
        lights.append({"type": o.data.type, "p": yup(o.matrix_world.translation), "aim": yup(o.matrix_world.translation + d * 10),
                       "watts": o.data.energy, "size": getattr(o.data, "size", 0.0), "color": list(o.data.color)})

# the world backdrop (V4: a vertical gradient the camera sees)
bg = {}
for n in sc.world.node_tree.nodes:
    if n.type == "VALTORGB": bg["ramp"] = [[e.position, list(e.color)] for e in n.color_ramp.elements]
    if n.type == "BACKGROUND": bg["strength"] = n.inputs[1].default_value

def merge_clips(path):
    """one clip named "shot" (raea blends at most 4 clips on a Model; the exporter writes one per animated object).
    Clip time is the episode clock: frame / fps."""
    import struct
    b = open(path, "rb").read(); n = struct.unpack("<I", b[12:16])[0]; j = json.loads(b[20:20 + n]); rest = b[20 + n:]
    anims = j.get("animations", [])
    if len(anims) > 1:
        one = {"name": "shot", "channels": [], "samplers": []}
        for a in anims:
            off = len(one["samplers"]); one["samplers"] += a["samplers"]
            one["channels"] += [dict(c, sampler=c["sampler"] + off) for c in a["channels"]]
        j["animations"] = [one]
    elif anims: anims[0]["name"] = "shot"
    js = json.dumps(j, separators=(",", ":")).encode(); js += b" " * (-len(js) % 4)
    body = struct.pack("<I", len(js)) + b"JSON" + js + rest
    open(path, "wb").write(b[:8] + struct.pack("<I", 12 + len(body)) + body)

# the set, animation baked over the shot (fonts become meshes in the export)
bpy.ops.object.select_all(action="DESELECT")
keep = [o for o in bpy.data.objects if o.type in ("MESH", "FONT", "EMPTY", "CURVE") and near(o) and not o.hide_render]
for o in keep:
    p = o.parent
    while p: p.select_set(True); p = p.parent                      # parents too, so their motion (the sink) comes along
    o.select_set(True)
sc.frame_start, sc.frame_end = F0, F1; sc.frame_set(F0)
root = bpy.data.objects.new("shot_root", None); sc.collection.objects.link(root)     # one root: raea plays a clip on a
for o in [o for o in bpy.context.selected_objects if o.parent is None]:                 # model's single animation player
    mw = o.matrix_world.copy(); o.parent = root; o.matrix_world = mw
root.select_set(True)
bpy.ops.export_scene.gltf(filepath=f"{OUT}/media/{NAME}.glb", use_selection=True, export_yup=True, export_apply=True,
                          export_animations=True, export_animation_mode="SCENE", export_force_sampling=True,
                          export_image_format="JPEG", export_lights=False, export_cameras=False)
merge_clips(f"{OUT}/media/{NAME}.glb")
json.dump({"name": NAME, "fps": sc.render.fps, "f0": F0, "f1": F1, "camera": track, "lights": lights, "backdrop": bg,
           "view": [sc.view_settings.view_transform, sc.view_settings.look]}, open(f"{OUT}/{NAME}.json", "w"))
print("B2R", NAME, len(keep), "objects,", len(lights), "lights,", F1 - F0 + 1, "frames")

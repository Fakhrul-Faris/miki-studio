# EX46: Google Scanned Objects (CC-BY 4.0) -> greyed GLBs for the Style D world (keep KEEP of the colour) + bounds.
# blender -b -P gso_grey.py   (run from build/). Writes media/gso/<id>_g.glb and media/gso/bounds.json
import bpy, json, os
import numpy as np
D = os.path.abspath("media/gso"); KEEP = 0.2
IDS = ["TriStar_Products_PPC_Power_Pressure_Cooker_XL_in_Black", "Threshold_Porcelain_Teapot_White", "Threshold_Porcelain_Pitcher_White",
       "Cole_Hardware_Mug_Classic_Blue", "Room_Essentials_Mug_White_Yellow", "Chefmate_8_Frypan", "Room_Essentials_Dish_Drainer_Collapsible_White",
       "Bradshaw_International_11642_7_Qt_MP_Plastic_Bowl", "Ecoforms_Plant_Container_12_Pot_Nova", "Threshold_Porcelain_Serving_Bowl_Coupe_White",
       "Black_Decker_Stainless_Steel_Toaster_4_Slice", "Cole_Hardware_Deep_Bowl_Good_Earth_1075"]
out = {}
for i in IDS:
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=f"{D}/{i}.glb")
    for im in bpy.data.images:
        if im.size[0] == 0: continue
        px = np.array(im.pixels[:], dtype=np.float32).reshape(-1, 4)
        lum = (0.2126 * px[:, 0] + 0.7152 * px[:, 1] + 0.0722 * px[:, 2])[:, None]
        px[:, :3] = lum + KEEP * (px[:, :3] - lum)
        im.pixels[:] = px.ravel(); im.pack()
    mn, mx = [1e9] * 3, [-1e9] * 3
    for o in bpy.context.scene.objects:
        if o.type != "MESH": continue
        for v in o.data.vertices:
            w = o.matrix_world @ v.co
            for k in range(3): mn[k] = min(mn[k], w[k]); mx[k] = max(mx[k], w[k])
    # Blender Z-up -> glTF Y-up: y_gltf = z_blender, z_gltf = -y_blender
    out[i] = {"min": [mn[0], mn[2], -mx[1]], "max": [mx[0], mx[2], -mn[1]]}
    bpy.ops.export_scene.gltf(filepath=f"{D}/{i}_g.glb", export_format="GLB", export_image_format="JPEG")
json.dump(out, open(f"{D}/bounds.json", "w"), indent=1)
print("GSO done", len(out))

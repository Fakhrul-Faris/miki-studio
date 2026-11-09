"""Fetch Poly Haven CC0 assets into media/: models as glTF 1k (with their bin + textures), textures (diff/nor_gl/rough
1k JPG), and an HDRI.  python3 fetch.py"""
import json, os, urllib.request
OP = urllib.request.build_opener(); OP.addheaders = [("User-Agent", "miki-studio-asset-fetch/1.0")]; urllib.request.install_opener(OP)
M = "media"; os.makedirs(M, exist_ok=True)
def get(url, path):
    if os.path.exists(path): return
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    urllib.request.urlretrieve(url, path)
def files(i): return json.load(urllib.request.urlopen(f"https://api.polyhaven.com/files/{i}"))
MODELS = ["rollershutter_door", "rollershutter_window_01", "exterior_aircon_unit", "plastic_crate_01", "plastic_monobloc_chair_01",
          "potted_plant_02", "steel_frame_shelves_01", "CashRegister_01", "cardboard_box_01", "hand_truck",
          "mounted_fluorescent_lights", "power_box_01", "street_lamp_01", "Drill_01", "metal_toolbox", "spray_paint_bottles",
          "plastic_container", "measuring_tape_01", "watering_can_metal_01", "folding_wooden_stool"]
for m in MODELS:
    g = files(m)["gltf"]["1k"]["gltf"]; d = f"{M}/{m}"
    get(g["url"], f"{d}/{m}.gltf")
    for rel, inc in g.get("include", {}).items(): get(inc["url"], f"{d}/{rel}")
    print("model", m)
TEX = ["brown_floor_tiles", "concrete_tiles", "grey_plaster", "damaged_plaster", "asphalt_02"]
for t in TEX:
    f = files(t)
    for key, name in (("Diffuse", "diff"), ("nor_gl", "nor_gl"), ("Rough", "rough")):
        if key in f: get(f[key]["1k"]["jpg"]["url"], f"{M}/tex/{t}_{name}_1k.jpg")
    print("tex", t)
h = files("modern_evening_street")["hdri"]["2k"]["hdr"]["url"]; get(h, f"{M}/sky.hdr"); print("hdri")

#!/usr/bin/env python3
"""EX38: neutral-grey copies of the library products that keep their surface detail (print, wear, weave).
Writes <id>/<id>_g.gltf + textures/*_g.jpg. Run from build/."""
import json
from pathlib import Path
from PIL import Image, ImageOps
M = Path("media")
IDS = json.loads(Path("names.json").read_text()).keys()
KEEP = {"cardboard_box_01": 0.6}                      # cardboard keeps a little of its colour so it reads as cardboard
for i in IDS:
    g = M / i / f"{i}.gltf"
    if not g.exists(): continue
    j = json.loads(g.read_text()); done = set()
    for m in j["materials"]:
        t = m.get("pbrMetallicRoughness", {}).get("baseColorTexture")
        if not t: continue
        img = j["images"][j["textures"][t["index"]]["source"]]
        if img["uri"] in done or "_g." in img["uri"]: continue
        src = M / i / img["uri"]; im = Image.open(src).convert("RGB")
        L = ImageOps.autocontrast(im.convert("L"), cutoff=1).point(lambda v: int(70 + v * 0.66))      # lift the darks: light neutral grey, detail kept
        out = Image.merge("RGB", (L.point(lambda v: min(255, int(v * 1.01))), L, L.point(lambda v: int(v * 0.97))))
        k = KEEP.get(i, 0)
        if k: out = Image.blend(out, im, k)
        dst = src.with_name(src.stem + "_g.jpg"); out.save(dst, quality=90)
        img["uri"] = str(Path(img["uri"]).with_name(dst.name)); done.add(img["uri"])
    (M / i / f"{i}_g.gltf").write_text(json.dumps(j))
    print(i, len(done))

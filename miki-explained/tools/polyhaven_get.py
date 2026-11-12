#!/usr/bin/env python3
"""Download Poly Haven models (CC0) as 1k glTF into a media folder.
Usage: tools/polyhaven_get.py MEDIA_DIR id1 id2 ..."""
import json, sys, urllib.request
from pathlib import Path
UA = {"User-Agent": "asset-fetch/1.0"}
def get(u):
    return urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=120).read()
out = Path(sys.argv[1])
for a in sys.argv[2:]:
    f = json.loads(get(f"https://api.polyhaven.com/files/{a}"))["gltf"]["1k"]["gltf"]
    d = out / a; d.mkdir(parents=True, exist_ok=True)
    (d / f"{a}.gltf").write_bytes(get(f["url"]))
    for rel, inc in f.get("include", {}).items():
        p = d / rel; p.parent.mkdir(parents=True, exist_ok=True); p.write_bytes(get(inc["url"]))
    print(a, "ok", len(f.get("include", {})), "files")

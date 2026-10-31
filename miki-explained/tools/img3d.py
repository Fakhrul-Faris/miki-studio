#!/usr/bin/env python3
"""Image → textured 3D model (.glb) via the free TRELLIS Hugging Face space (falls back to nothing: check the output).
    python3 tools/img3d.py <image.png> [out.glb] [seed]
Needs gradio_client. One clean figure on a plain background works best (see _tests/EX00V6_polish/how-i-generate.md).
Note: this uploads the image to a public Hugging Face space."""
import sys, shutil, time
from gradio_client import Client, handle_file
img = sys.argv[1]; out = sys.argv[2] if len(sys.argv) > 2 else img.rsplit(".", 1)[0] + ".glb"
seed = int(sys.argv[3]) if len(sys.argv) > 3 else 1
c = Client("trellis-community/TRELLIS", verbose=False)
t = time.time()
c.predict(api_name="/start_session")
pre = c.predict(handle_file(img), api_name="/preprocess_image")
_, glb, dl = c.predict(handle_file(pre), [], seed, 7.5, 12, 3.0, 12, "stochastic", 0.9, 2048, api_name="/generate_and_extract_glb")
shutil.copy(dl or glb, out)
print(out, "%.0f s" % (time.time() - t))

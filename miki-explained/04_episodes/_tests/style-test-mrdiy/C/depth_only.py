import sys, numpy as np, torch
from PIL import Image
from transformers import pipeline
dev = "mps" if torch.backends.mps.is_available() else "cpu"
pipe = pipeline("depth-estimation", model="depth-anything/Depth-Anything-V2-Base-hf", device=dev)
for n in ("C1", "C2", "C3"):
    img = Image.open(f"stills/{n}.png").convert("RGB"); W, H = img.size
    d = np.asarray(pipe(img)["predicted_depth"].squeeze().cpu().float().numpy())
    d = np.asarray(Image.fromarray(d).resize((W, H), Image.BICUBIC)); d = (d - d.min()) / (d.max() - d.min() + 1e-9)
    Image.fromarray((d * 65535).astype("uint16")).save(f"depth/{n}.png"); print(n, W, H)

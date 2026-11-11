# tools/cad — precise props as code (text-to-cad library, trial from 2026-11-11)

- `.venv/` — `cad[build123d,trimesh]==0.11.8`, project-only (git-ignored). Library only: no `cad-server`, so no telemetry.
  Recreate: `uv venv --python 3.13 .venv && uv pip install --python .venv/bin/python 'cad[build123d,trimesh]==0.11.8'`
- `props/*.py` — one script per prop family, modelled in mm, true size, named parts; `.venv/bin/python props/espresso.py`
- `out/*.glb` — metres, Y up, front +Z, origin = floor contact. Copy into the episode's `build/media/` for raea.
- `skill/` — text-to-cad's `cad` skill docs (MIT) for build123d patterns; ignore its server/`cad run` parts.

Rules: real scale (craft-fundamentals §7), working parts, cut real details (slots, recesses) instead of painting them,
fillet soft edges, GLB hygiene (§15). raea renders; never judge a prop alone: render it in the episode's light.

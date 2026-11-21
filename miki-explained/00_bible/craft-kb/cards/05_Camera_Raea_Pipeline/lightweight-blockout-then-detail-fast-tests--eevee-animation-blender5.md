---
title: Lightweight blockout first, animate, then detail; fast low-res test renders
bucket: 05_Camera_Raea_Pipeline
source: "Creating an Animation in Eevee (Blender 5.0).txt"
source_time: "01:12–01:54, 05:56–06:37, 18:29, 22:38–23:19"
blender_version_source: 5.0
tool_target: Blender bpy
tier: full
style_fit: strong — matches our shot-first gates (grey-box board → world → check .blend → preview before full render)
---

## METADATA
05_Camera_Raea_Pipeline | Blender 5.0 | Blender bpy + raea

## CREATIVE_INTENT
Block the set in very low detail first so the viewport stays smooth while you animate the camera; timing problems are easy to fix when nothing lags. Then dress the set. Check motion with quick test renders at 50% resolution and low samples (≈0.5 s/frame in EEVEE on an RTX 4090) before committing. Heavy late-stage geometry makes EEVEE's rendered viewport laggy, so keep animation decisions in the blockout stage.

## STE_PROCEDURE
1. Block out the set with cubes and simple primitives only.
2. Animate the camera / carrier on the blockout.
3. Before you add detail, render a test at Resolution % = 50 and low samples.
4. Watch the test; fix timing on the blockout.
5. Add detail and set dressing; re-test after each major addition.
6. When the viewport lags, switch to Solid shading for edits.

## AGENT_EXECUTION
```python
import bpy
sc = bpy.context.scene
sc.render.engine = 'BLENDER_EEVEE' if bpy.app.version >= (5, 0, 0) else 'BLENDER_EEVEE_NEXT'  # 4.2–4.5: EEVEE Next id; 5.0: renamed back
sc.render.resolution_x, sc.render.resolution_y = 1080, 1920       # vertical, as in the video's Instagram version
sc.render.resolution_percentage = 50
sc.eevee.taa_render_samples = 16                                   # ~ "low samples"
sc.render.filepath = "//test/"
bpy.ops.render.render(animation=True)
```
raea (our renderer): preview with `tools/raea/preview.sh` (cheap preview.mp4 shown before any full render) and single stills with `raea render EDIT.tsx --frame N -o F.png`. Blender stays the builder; its EEVEE test renders are only for checking blockout timing before export.

## NOTES
- Deprecated: in 4.2+ EEVEE Next replaced legacy EEVEE; its id was `BLENDER_EEVEE_NEXT` in 4.2–4.5 and is `BLENDER_EEVEE` again in 5.0. Check `bpy.app.version`.
- Visual gaps: exact sample count not given.
- Rule conflicts: none. The source says Cycles' viewport feels faster on heavy scenes — irrelevant to us (raea renders).

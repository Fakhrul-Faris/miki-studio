---
title: False Color view transform as an exposure check
bucket: 05_Camera_Raea_Pipeline
source: "The Power of LIGHTING in Blender!.txt"
source_time: "06:01–06:32"
blender_version_source: 3.2+
tool_target: Blender bpy | raea
tier: full
style_fit: Our "never too bright, rich colour" rule needs a measured check; raea has no false-colour mode, so measure stills.
---

## METADATA
05_Camera_Raea_Pipeline | any | Color Management → repo exposure_check.py

## CREATIVE_INTENT
Proper exposure gets the most colour and quality out of a render. False Color maps the image from dark blue (under) to red/white (over); aim for mostly light green, blue, yellow and grey. Some blown parts are fine — the sun overexposes things in real life too.

## STE_PROCEDURE
1. Set View Transform = False Color.
2. Adjust lights until most of the frame shows mid tones (grey / green / light blue / yellow).
3. Allow small overexposed areas on true highlights.
4. Switch back to AgX for the look.

## AGENT_EXECUTION
```python
import bpy
vs = bpy.context.scene.view_settings
vs.view_transform = "False Color"   # check
vs.view_transform = "AgX"           # restore
```
raea: no false-colour mode. Render the frame (`raea render EDIT.tsx --frame N -o F.png`) and run `python3 tools/x1/exposure_check.py F.png` (luma percentiles, clipped area, lifted blacks) and `tools/raea/frame_metrics.py` (BLOWN / WASHOUT flags).

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none.


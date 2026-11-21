---
title: Photorealism as the technical floor: reference images for materials and a camera a real person could hold
bucket: 04_Shading_Lighting
source: "Why your Blender renders look BORING.txt"
source_time: "00:19–03:31"
blender_version_source: n/a (art direction)
tool_target: principle-only
tier: full
style_fit: Strong fit with Style D (real surfaces, macro realism) and the studio-production pipeline's material pass.
---

## METADATA
04_Shading_Lighting | n/a | principle-only

## CREATIVE_INTENT
The goal of rendering is usually to not look like a render. Even stylised work borrows aspects of photorealism (models, textures that feel like the actual material, camera settings and angles a real person could have shot) to hide the plasticky "bad graphics" look; once that illusion breaks, the image is less pleasant to look at. Learn photoreal rules first, then break them. The single fastest technique is reference images.

## STE_PROCEDURE
1. Before building a material or object, collect photos of the real thing (and other artists' renders of it).
2. Keep them in view (PureRef beside Blender, or tab through a search page).
3. Compare each material against its reference: colour value, roughness spread, wear, scale of detail.
4. Choose camera height, focal length and angle that a real photographer could have used.
5. Reject any surface that reads as uniform CG plastic next to its reference.

## AGENT_EXECUTION
- Reference folder per shot: `ref/<object>/*.jpg` + a line per image in `ref_<shot>.md` naming what to copy.
- Blender "real camera" defaults:
```python
import bpy
cam = bpy.context.scene.camera.data
cam.sensor_fit = 'VERTICAL'; cam.sensor_height = 24.0   # full-frame stills height; 9:16 frame
cam.lens = 50.0                                          # ~ plausible handheld lens; 85–100 for macro product
```
- raea: realism comes from `<Environment src={staticFile("studio_1k.hdr")} intensity />` for real reflections, PBR maps (`base_color_texture`, `normal_map_texture`, `metallic_roughness_texture`), `<ToneMapping mode="agx" />` and a plausible `fov`: `fov = 2 * Math.atan(24 / (2 * focal_mm))` (vertical, full-frame).

## NOTES
- Deprecated: Filmic → AgX for the Blender preview view transform.
- Visual gaps: none (verbal).
- Rule conflicts: none. References are look targets, recreated, never traced.

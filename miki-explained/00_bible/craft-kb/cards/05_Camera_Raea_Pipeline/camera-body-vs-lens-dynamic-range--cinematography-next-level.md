---
title: Real camera body vs lens → where each setting lives in Blender (frame rate, dynamic range)
bucket: 05_Camera_Raea_Pipeline
source: "Take your Blender Cinematography to the Next Level!.txt"
source_time: "00:16–01:44"
blender_version_source: 3.x (Filmic as default view transform)
tool_target: Blender bpy | raea
tier: full
style_fit: supports the Style D dark-room / one-light look — a high-dynamic-range view transform keeps the hot top light and the dark falloff both readable
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x source; 4.2+ API | Blender bpy → raea ToneMapping

## CREATIVE_INTENT
A real camera is a body (resolution, sensor, frame rate, shutter speed, dynamic range) plus a lens (focal length, aperture
in f-stops, field of view). Blender's Camera object only carries the lens half; knowing where the body settings live stops
you hunting in the wrong panel and keeps highlights from clipping in contrasty shots.

## STE_PROCEDURE
1. Set focal length and aperture (f-stop) on the Camera object (Object Data Properties).
2. Set frame rate in Output Properties > Format > Frame Rate, not on the camera.
3. Note: Blender has no practical frame-rate ceiling, unlike a real body.
4. Before rendering contrasty scenes, set Color Management > View Transform to a wide-range transform, not Standard.
5. Note: Filmic ≈ 25 stops of dynamic range; Standard ≈ 8 stops; human eye ≈ 15–20 stops (per the video).
6. Note: Blender cameras have no shutter; motion blur is a separate render setting (see motion-blur card).

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy
sc = bpy.context.scene
sc.camera.data.lens = 50.0                 # lens: focal length
sc.camera.data.dof.aperture_fstop = 2.8    # lens: aperture (used when dof.use_dof = True)
sc.render.fps = 30                         # body: frame rate lives in Output Properties
sc.render.fps_base = 1.0
sc.view_settings.view_transform = 'AgX'    # 4.0+ default; 'Filmic' in 3.x; never 'Standard' for HDR lighting
sc.view_settings.look = 'None'
```
### raea
- Frame rate is the Composition's `fps` (house: 30 fps build, 60 fps final export in recent episodes).
```tsx
import { ToneMapping } from "raea/3d";
<ToneMapping mode="agx" exposure={0} />   // soft, holds highlights (Filmic/AgX-like); "tony" is raea's neutral default
```
- `mode="none"` is the "Standard"-like clip; avoid it on lit 3D. BlendShot already uses `agx` + a contrast grade.

## NOTES
- Deprecated: Filmic → AgX is the default view transform since Blender 4.0 (Filmic still selectable). "Filmic = 25 stops"
  is the video's figure.
- Visual gaps: none.
- Rule conflicts: none.

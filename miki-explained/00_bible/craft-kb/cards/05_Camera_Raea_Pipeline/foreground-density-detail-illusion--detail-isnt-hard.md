---
title: Dense foreground, sparse background — the detail illusion
bucket: 05_Camera_Raea_Pipeline
source: "Detail Isn't Hard  Blender Tutorial.txt"
source_time: "17:18–17:43, 27:18–28:55"
blender_version_source: 3.x
tool_target: principle-only
tier: full
style_fit: Matches Style D macro framing — spend modelling/texture budget on what is near the lens and in focus; let DoF and darkness carry the rest.
---

## METADATA
05_Camera_Raea_Pipeline | any version | principle-only (+ Blender placement, raea DoF)

## CREATIVE_INTENT
Viewers assume the detail they see up close continues everywhere. Put the densest, most specific props (stairs, pots, a
chest in the source) right in front of the camera; far parts can be janky, low-quality or repeated because they cannot
be read. A bare, minimal foreground breaks the illusion faster than anything in the distance.

## STE_PROCEDURE
1. Before you add detail anywhere, look through the shot camera and rank zones by distance.
2. Fill the zone nearest the lens with specific, high-detail props.
3. Give mid-ground medium detail; give background low detail or repeated low-quality packs.
4. If the foreground looks bland, add props there first — not to the background.
5. Build far clusters loosely ("messy and janky"); only check them from the camera, never from the viewport up close.

## AGENT_EXECUTION
### Blender
- Measure distance bands from the camera to choose the detail level per object:
```python
import bpy
cam = bpy.context.scene.camera
for o in bpy.context.scene.objects:
    if o.type in {'MESH', 'EMPTY'}:
        d = (o.matrix_world.translation - cam.matrix_world.translation).length
        o["detail_band"] = "fg" if d < 3 else "mid" if d < 12 else "bg"     # ~ thresholds, set per set scale
```
### raea
- Let the lens sell it: `<DepthOfField focal_distance={distToHero} aperture_f_stops={2.8} />` inside `<Camera3d>` (2.8 cinematic, 1.4 dreamy). Background low-detail parts blur.
- `<Fog color={bg} near={n} far={f} />` or a `<FogVolume>` dissolves far repeats into the backdrop colour.

## NOTES
- Visual gaps: none — principle stated in speech.
- Rule conflicts: none; for Style D the "foreground" is the hero object's surface and the real surface it sits on (macro texture, fresh 2k maps).
- Every new camera setup (every 2–3 s) moves the foreground — re-check which props are nearest for each setup.

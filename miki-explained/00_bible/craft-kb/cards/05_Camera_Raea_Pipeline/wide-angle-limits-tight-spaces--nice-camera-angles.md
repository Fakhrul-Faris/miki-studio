---
title: Wide-angle limits (16 mm max for natural, below 10 mm looks wrong) and lenses for tight spaces
bucket: 05_Camera_Raea_Pipeline
source: "How to Find Nice Camera Angles in Blender.txt"
source_time: "15:50–17:52"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D — gives a safe floor for wide establishing shots; in 9:16 a wide lens is the only way to show a narrow alley or aisle top to bottom.
---

## METADATA
05_Camera_Raea_Pipeline | 4.x | Blender bpy + raea

## CREATIVE_INTENT
In a narrow, tube-like space (an alley, a corridor of signs) you cannot back far enough to fit everything, so only a wide lens (~16 mm) captures it all. 16 mm is already extreme but still within what a real camera does; below ~10 mm the image starts to look crazy and unnatural. A long lens (50–70 mm) in the same space gives a completely different, isolated shot that needs the set built around it.

## STE_PROCEDURE
1. When the camera cannot pull back far enough to capture the space, lower Focal Length.
2. Stop at ~16 mm for the widest natural look.
3. Do not go below ~10 mm unless a deliberate distorted look is wanted.
4. Alternatively, raise the Focal Length to 50–70 mm and frame a smaller, specific view.
5. If you choose the long lens, build or dress the set around that narrower view.
6. Keep one focal point in either version (e.g., the signs).

## AGENT_EXECUTION
- Blender: `cam.data.lens = 16` (floor ~16; never < 10 for natural). `cam.data.lens = 70` for the isolated alternative.
- raea (9:16, 36 mm sensor on the tall side): 16 mm → `fov = 2*Math.atan(18/16)` ≈ 96.8° vertical; 10 mm ≈ 121°. Keep vertical fov ≤ ~97° for natural shots. Deliberate extreme wides: `<Fisheye strength fov />` or `<LensDistortion k1 />` instead of an extreme rectilinear fov (post.md).

## NOTES
- The 16/10 mm thresholds are for a full-frame (36 mm) sensor width; in 9:16 the sensor's 36 mm spans the height, so horizontal coverage is narrower than the source's landscape renders.
- Rule conflicts: none. Avoid animating into extreme wides quickly (crash-zoom feel).

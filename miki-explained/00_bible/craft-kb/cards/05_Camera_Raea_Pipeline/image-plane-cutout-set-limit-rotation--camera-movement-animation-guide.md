---
title: Image-plane cutout sets — push/truck freely, barely rotate
bucket: 05_Camera_Raea_Pipeline
source: "Motion Feel, Easing & Camera Choreography/Camera Movement Animation Guide.txt"
source_time: "03:16–04:43"
tool_target: raea
tier: principle
use_when: "a setup that uses flat ImagePlane elements (logo card, backdrop photo, sky, printed poster, UI card in 3D) and the camera map shows an orbit or turn"
style_fit: Fits — protects 2D/UI elements in 3D setups; generated images only as references, so planes carry real logos/photos/coded UI.
---

## METADATA
05_Camera_Raea_Pipeline | Blender image-as-plane 2D set (source) | raea `<ImagePlane>` + camera map check

## CREATIVE_INTENT
Principle: you can build a 3D camera move around a 2D set by placing assets (ground, sky, objects) as image planes
(Blender: Add › Image › Mesh Plane, shader "Shadeless"), arranging them in depth, checking often through the camera, and
keying the camera. But if the camera **rotates around** the scene, "the flatness of your objects becomes much more
obvious and doesn't look great" — for more angle freedom you need real 3D.

## STE_PROCEDURE
1. Arrange flat planes at different depths, each facing the camera.
2. Check the framing through the camera after every placement.
3. Move the camera by push, pull or truck; keep its turn around any plane small (~≤ 15°, inferred).
4. If the camera map shows an orbit past that, replace the plane with a real 3D object (GLB) or cut the turn.
5. Never let a plane's edge or thinness be seen.

## AGENT_EXECUTION
In the camera map pass (RECIPE-D §8), for each setup containing an `ImagePlane`, read the start → end orbit angle; flag
> ~15°. Unlit look in raea: use an unlit/emissive material on the plane (see `materials.md`); planes face +z by default.

### Worked example
Setup with a kopitiam's printed menu poster as an ImagePlane, line "Harga kopi naik ke RM2.80" (illustrative):
- BEFORE: `| 3 | "naik ke RM2.80" | orbit 40° around the poster wall |` — poster reads as a paper-thin card.
- AFTER: `| 3 | "naik ke RM2.80" | push in 8 % square to the poster, 5° drift, cup GLB in foreground | RM2.80 lights in accent on "RM2.80" | image-plane-limit-rotation |`

### Check
- Does any setup orbit > ~15° around an ImagePlane?
- Is any plane edge or flat side visible in the board stills?
- Do planes sit at different depths so a push gives parallax?

## NOTES
- The ~15° limit is inferred; source gives no number. Judge on the board still at the end pose.
- Dropped: PNG-sequence export and OpenShot/After Effects compositing (AE prohibited; raea composes 2D and 3D in one render).

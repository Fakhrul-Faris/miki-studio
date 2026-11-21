---
title: Place the camera where a person holding one could stand
bucket: 05_Camera_Raea_Pipeline
source: "How to Find Nice Camera Angles in Blender.txt"
source_time: "02:12–03:04, 05:30–06:02, 11:51–12:44, 15:35–15:44"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Partial fit — grounds explainer setups in a believable viewpoint; Style D's macro and "impossible" camera setups break it on purpose, so use it as the default, not a law.
---

## METADATA
05_Camera_Raea_Pipeline | 4.x | Blender bpy + raea

## CREATIVE_INTENT
Natural-looking shots come from imagining you are physically in the place with a real camera: standing or crouching, not flying at ceiling height or scraping the floor. Pick the general shooting direction early and build the set toward it. When you do break this (an elevated view), the height tells a story — it implies a balcony or raised walkway.

## STE_PROCEDURE
1. Before building the set, choose the general direction the camera will look; build detail only on that side.
2. Ask where a person with a camera would stand to get a nice view, and what zoom they would use.
3. Set camera height to standing (~1.5–1.7 m) or crouched (~0.8–1.0 m) for the scene's scale.
4. Avoid placing the camera far above the set or right at floor level unless the shot's story needs it.
5. If you choose an elevated angle, make the set support it (a balcony, bridge or raised surface the viewer could stand on).
6. For a walkway or bridge shot, put the camera on the walking surface so the view feels like exploring.

## AGENT_EXECUTION
- Blender:
  ```python
  import bpy
  cam = bpy.context.scene.camera
  EYE_STAND, EYE_CROUCH = 1.6, 0.9         # metres, human-scale set (~ inferred)
  floor_z = 0.0                            # height of the surface the "operator" stands on
  cam.location.z = floor_z + EYE_STAND
  cam.data.lens = 24
  ```
  For macro sets scale the "person" with the set: eye height = hero object height × ~1–3 (inferred `~`).
- raea: `<Camera3d transform={Transform.fromXyz(x, floorY + 1.6, z).lookingAt(target)} projection={{ Perspective: { fov: 2*Math.atan(18/24) } }} />`.

## NOTES
- "If I were holding a camera" is a heuristic for environment renders; our Style D setups often sit at macro scale or move impossibly between setups (flights, morphs) — keep it for establishing/room shots.
- Rule conflicts: none (no figures needed; the "person" is only the camera's imagined operator).
- bpy fixed for 5.3: incomplete snippet: defined `floor_z`.

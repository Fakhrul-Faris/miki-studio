---
title: Camera where a person could stand
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/camera-as-visitor-placement--detail-isnt-hard.md
  - cards/05_Camera_Raea_Pipeline/physically-plausible-camera-position--nice-camera-angles.md
sources: ["Detail Isn't Hard  Blender Tutorial.txt", "How to Find Nice Camera Angles in Blender.txt"]
use_when: "grounding a setup so it doesn't feel CG"
style_fit: Default heuristic for choosing each 2–3 s setup's viewpoint (establishing/room shots); Style D macro and "impossible" flights break it on purpose. Conflict: source disables DoF — house look keeps shallow DoF. The "person" is only an imagined operator; no figures, no walking/handheld moves.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x / 4.x sources → 4.2+/5.x / raea | Blender bpy + raea

## CREATIVE_INTENT
Natural-looking shots come from imagining you are physically in the place with a real camera: where would a person stand to
take this picture, at what height, with what zoom, and what are they feeling. Breaking it (an elevated view) must tell a story.
- Detail Isn't Hard: tie the viewpoint to a story moment ("discovering the pit over its edge" → high at the rim, looking down, 24 mm), then refine by comparing test renders.
- Nice Camera Angles: standing/crouching heights, choose the shooting direction before building, and make the set justify an elevated view (balcony, bridge, walkway).

## STE_PROCEDURE
1. Before building the set, choose the general direction the camera will look; build detail only on that side.
2. Name the story moment of the shot (e.g. "first discovery from the rim").
3. Ask where a person with a camera would stand for that moment, and what zoom they would use.
4. Set camera height to standing (~1.5–1.7 m) or crouched (~0.8–1.0 m) for the scene's scale (macro: hero height × ~1–3).
5. Avoid far above the set or right at floor level unless the shot's story needs it.
6. If you choose an elevated angle, make the set support it (a balcony, bridge or raised surface the viewer could stand on).
7. For a walkway or bridge shot, put the camera on the walking surface so the view feels like exploring.
8. Set Focal Length per setup (source: 24 mm, Perspective, for a vast pit).
9. Rotate and move the camera in small steps; make 2+ test renders, compare, keep what works from each.
10. Before you disable depth of field, check nothing is near enough to blur (Style D: keep DoF on).

## VALUES BY SOURCE
| parameter | Detail Isn't Hard | Nice Camera Angles | recommended for Style D (+ why) |
|---|---|---|---|
| height | high, at the opening, looking down | stand ~1.5–1.7 m / crouch ~0.8–1.0 m | macro: hero height × ~1–3; room shots: stand/crouch |
| focal length | 24 mm | 24 mm (example) | per setup from RECIPE-D; 24 mm only for vast/establishing |
| DoF | off (nothing close) | — | on, `aperture_f_stops` ~2.2–2.8 (house shallow DoF) |
| elevated view | story = discovery from the rim | must be justified by set (balcony) | allowed when the line asks for overview |

## AGENT_EXECUTION
Blender 5.x:
```python
import bpy
cam = bpy.context.scene.camera
floor_z = 0.0                             # height of the surface the "operator" stands on
EYE_STAND, EYE_CROUCH = 1.6, 0.9          # metres, human-scale set (~ inferred)
cam.location.z = floor_z + EYE_STAND
cam.data.type = 'PERSP'; cam.data.lens = 24
cam.data.dof.use_dof = True               # source had False; Style D keeps DoF
```
raea (24 mm with Blender sensor 36 mm, AUTO fit → long side = 9:16 height: vfov = 2·atan(18/24) ≈ 1.287 rad / 73.7°;
`blend2raea.py` already computes this per frame):
```tsx
<Camera3d transform={Transform.fromXyz(x, floorY + 1.6, z).lookingAt(target)}
  projection={{ Perspective: { fov: 2 * Math.atan(18 / 24) } }}>
  <DepthOfField focal_distance={d} aperture_f_stops={2.8} />
</Camera3d>
```

## NOTES
- Deprecated: none.
- Visual gaps: exact camera transforms are shown only.
- "If I were holding a camera" is a heuristic for environment renders; keep it for establishing/room shots, not a law.
- Rule conflicts: moves between setups are smooth eased in-out flights (≤ ~130°/s, ≤ ~40 m/s) — the visitor viewpoint picks
  the setup, never a walking/handheld move; no people placed in the scene.

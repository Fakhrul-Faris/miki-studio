---
title: Post punch-in — an adjustment clip keyed Zoom that reaches full zoom exactly on the beat
bucket: 05_Camera_Raea_Pipeline
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "2:53:17–2:56:03, 3:10:30–3:12:02"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: "conflict: a beat-snapped 2D zoom is a crash-zoom cousin; in Style D do a slow eased camera dolly in 3D instead"
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.3 | DaVinci Resolve (Edit page) → raea translation

## CREATIVE_INTENT
Add energy without re-rendering: a 2D zoom on an adjustment layer pushes into the can and peaks exactly as the beat hits; when the
zoom releases, the can is back in place on the ground.

## STE_PROCEDURE
### Source tool (DaVinci Resolve)
1. Effects › Toolbox › Adjustment Clip (only found in the Toolbox); drag it above the shot.
2. Trim it to start at the beat and end with the animation; keep the transition PNG track above it (drag with `Shift` to keep position).
3. Inspector › Transform › Zoom: key 1.0 before the beat and the zoomed value exactly on the beat (Position not used).
4. Copy the adjustment clips to later beats with `Alt`+drag; use Backspace (not Delete) to remove pieces without ripple.

## AGENT_EXECUTION
### Blender / raea translation
- Blender: key the camera's focal length (`cam.data.lens`) or a dolly on the beat frame instead of a 2D zoom (keeps resolution and parallax).
- raea: `const z = interpolate(f, [b - 18, b], [0, 1], { ...clamp, easing: inOut });`
  `projection={{ Perspective: { fov: lerp(0.55, 0.45, z) } }}` or dolly the camera along its view; `b = w("L05", "now")`.

## NOTES
- Deprecated: none.
- Visual gaps: zoom values are not given.
- Rule conflicts: house rules forbid crash zooms and snap-back pushes. Use ≥0.6 s eased push-ins in 3D and no snap-back.

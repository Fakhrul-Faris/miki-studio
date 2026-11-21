---
title: Focal length by shot type — 24 mm environment, 70–80 mm subject
bucket: 05_Camera_Raea_Pipeline
source: "10+ Blender Tricks That Will Make Your Renders Cinematic.txt"
source_time: "00:55–01:11"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: principle
style_fit: fits — Style D hero shots are subject shots (long lens); 24 mm only for an establishing/world beat
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x (4.2+ same) | Camera Lens > Focal Length → raea Perspective fov

## CREATIVE_INTENT
Principle: the lens should match what the shot is about. A wide 24 mm shows space and context (environment shots); a
long 70–80 mm isolates and flatters a subject (character/product shots). Idea: decide "is this shot about the place or
the thing?" before setting the lens.

## STE_PROCEDURE
1. Select the camera and open Object Data Properties > Lens.
2. If the shot is about an environment, set Focal Length to 24 mm.
3. If the shot is about a character (for us: the hero object), set Focal Length to 70 or 80 mm.
4. Move the camera (not the lens) to re-frame after changing Focal Length.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy
cam = bpy.context.scene.camera.data
cam.lens_unit = 'MILLIMETERS'
cam.lens = 24      # environment
# cam.lens = 75    # subject (70–80)
cam.sensor_fit = 'AUTO'; cam.sensor_width = 36.0   # default; needed for the fov conversion below
```

### raea (vertical fov in radians)
With Blender's default 36 mm sensor and AUTO fit, the 36 mm side spans the frame's longer edge — in 9:16 that is the
height, so vertical fov = `2 * atan(18 / f)`:
- 24 mm → ~73.7° (wide establishing)
- 70 mm → ~28.9°, 80 mm → ~25.4° (subject)
```tsx
const fovFromMm = (mm: number) => 2 * Math.atan(18 / mm); // 9:16, 36 mm sensor, AUTO fit
<Camera3d transform={Transform.fromXyz(0, 0.25, 1.4).lookingAt([0, 0.05, 0])} projection={{ Perspective: { fov: fovFromMm(75) } }} />
```
The scene skill calls ~40° vertical "a product lens" and 60°+ "wide".

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none. If the lens changes inside a shot, ease it in-out (no crash zoom); prefer moving the camera.

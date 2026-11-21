---
title: Outdoor key — sun behind or beside the subject, never in front
bucket: 04_Shading_Lighting
source: "10+ Blender Tricks That Will Make Your Renders Cinematic.txt"
source_time: "00:08–00:28"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: principle
style_fit: fits as a rim/edge light on the macro object; Style D's key stays the one soft top light
---

## METADATA
04_Shading_Lighting | Blender 3.x (applies 4.2+ unchanged) | Sun light placement → raea DirectionalLight

## CREATIVE_INTENT
Principle: a sun placed in front of the subject (behind the camera) flattens it — no shadow side, no rim, dull and dark.
Idea: put the sun behind the subject or to its side so the form is carved by a lit edge and a shadow side; this is the
first and most important lighting decision for any outdoor shot.

## STE_PROCEDURE
1. Add a Sun light.
2. Rotate the Sun so its light arrives from behind the subject (backlight) or from its side (side light).
3. Before you render, check the camera view: the Sun must not sit behind the camera pointing at the subject's front.
4. Adjust the Sun's angle until the subject shows a bright edge and a visible shadow side (by eye, `unknown (visual only)`).

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy, math
from mathutils import Vector
bpy.ops.object.light_add(type='SUN', location=(0, 0, 10))
sun = bpy.context.object
sun.data.energy = 4.0            # ~ not given in the video
# Aim from behind/side: camera looks along -Y at the subject; sun comes from +Y (behind) and +X (side)
subject = Vector((0, 0, 0))
from_dir = Vector((0.6, 1.0, 0.5)).normalized()   # ~ behind-right, ~30° up
sun.rotation_euler = (-from_dir).to_track_quat('-Z', 'Y').to_euler()
```

### raea
```tsx
// light comes FROM the transform's position toward lookingAt; put it behind/beside the subject relative to the camera
<Camera3d transform={Transform.fromXyz(0, 0.3, 2).lookingAt([0, 0, 0])} projection={{ Perspective: { fov: (35 * Math.PI) / 180 } }} />
<DirectionalLight transform={Transform.fromXyz(1.5, 2, -3).lookingAt([0, 0, 0])} illuminance={9000} shadow_maps_enabled soft_shadow_size={2} />
<AmbientLight brightness={60} />
```
For outdoor plates lit by an HDRI: `<Environment src rotation />` — turn `rotation` so the panorama's sun sits behind or
beside the subject (lights.md).

## NOTES
- Deprecated: none.
- Visual gaps: the sun angles in the demo are shown, not stated.
- Rule conflicts: none. In Style D the soft top light remains the key; use this as a back/side rim (low intensity) so
  the object's silhouette separates from the dark room.

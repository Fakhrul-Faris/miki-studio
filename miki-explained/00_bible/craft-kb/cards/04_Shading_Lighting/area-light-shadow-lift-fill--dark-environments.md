---
title: Dim area light above the camera to lift shadow detail without killing the dark
bucket: 04_Shading_Lighting
source: "How to Make DARK Environments in Blender.txt"
source_time: "06:56–12:15"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: The "little fill" under Style D's single top light; reveals the surface's texture in the shadow side so the macro object never sits in a black hole.
---

## METADATA
04_Shading_Lighting | 4.x → 4.2+ / raea | Blender bpy + raea

## CREATIVE_INTENT
After the key, the frame is too dark to read the detail you modelled. One big, soft, dim light over the camera reveals what is already there without making it daytime; key + this one light already gives ~80% of the final look.

## STE_PROCEDURE
1. Before adding the fill, settle the key light alone (see single-key card).
2. Add an Area Light almost directly above the camera, slightly in front of it.
3. Set its Power low (video: start 500 W, then 1,000 W; final 2,000 W).
4. Toggle it off/on and compare: it must only reveal shadow detail, not add a new light direction.
5. Push it too far once (video: 20,000 W = no longer dark; 5,000 W = shows much of the foreground) and dial back.
6. When deeper areas stay black, duplicate the area light, move it back into the scene and make it larger and still dim (video: 3,000 W, much bigger Size).
7. Place each duplicate where ambient bounce could plausibly come from (an opening, a reflective surface).

## AGENT_EXECUTION
Blender:
```python
import bpy
cam = bpy.context.scene.camera
d = bpy.data.lights.new("FillArea", type='AREA')
d.energy = 2000                 # video final; scene-dependent
d.size = 4.0                    # ~ not given
o = bpy.data.objects.new("FillArea", d); bpy.context.collection.objects.link(o)
o.location = cam.location + cam.matrix_world.to_3x3() @ __import__('mathutils').Vector((0, 2.0, -1.0))  # ~ above, slightly ahead
o.rotation_euler = (0, 0, 0)    # facing down
d2 = d.copy(); d2.energy = 3000; d2.size = 10.0   # rear duplicate, bigger + soft
o2 = bpy.data.objects.new("FillAreaRear", d2); bpy.context.collection.objects.link(o2)
```
raea:
```tsx
<AmbientLight brightness={40} color="#9fb2d9" />          {/* the floor of the shadows */}
<RectLight transform={Transform.fromXyz(0, 4, 3).lookingAt([0, 0, 0])}
  intensity={60_000} width={3} height={3} color="#dfe6f2" /> {/* ~ dim soft fill above camera */}
```
`RectLight` casts no shadows (fine for a fill). With an `<Environment>` lighting the scene keep `AmbientLight` ≤ 20–80 (lights.md). Bracket intensity off / ×4 / ×0.25 on stills.

## NOTES
- Deprecated: none.
- Visual gaps: exact area light position and Size are viewport-only (~08:21–09:00); rear duplicate's location not narrated.
- Rule conflicts: none; supports "dark room" without crushed blacks.

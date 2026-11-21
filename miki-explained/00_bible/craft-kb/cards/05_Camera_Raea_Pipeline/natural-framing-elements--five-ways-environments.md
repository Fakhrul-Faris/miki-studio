---
title: Frame the focal point with scene elements (arches, foliage, blurred foreground objects)
bucket: 05_Camera_Raea_Pipeline
source: "5 Ways to Create Better Environments in Blender.txt"
source_time: "06:40–07:32"
blender_version_source: n/a?
tool_target: Blender bpy | raea
tier: full
style_fit: Good fit for macro: an out-of-focus foreground object (another coin, a price tag edge) frames the hero; also a natural source for object-wipe transitions.
---

## METADATA
05_Camera_Raea_Pipeline | n/a → 4.2+ | Blender bpy + raea

## CREATIVE_INTENT
Like a picture frame, but made of things in the scene: trees and foliage at the edges, an archway, blurred foreground objects, even a literal picture frame. Intentionally blocking parts of the image around the focal point tells the viewer where to look.

## STE_PROCEDURE
1. Identify the focal point and its place in frame.
2. Place one or more objects between camera and subject, at the frame edges, leaving an opening around the focal point.
3. Keep framing objects darker or out of focus so they don't compete.
4. Check the opening: the focal point must sit fully inside it.
5. Before a cut or flight, consider using the framing object as the wipe that carries the camera into the next setup.

## AGENT_EXECUTION
Blender:
```python
import bpy
from mathutils import Vector
cam = bpy.context.scene.camera
cam.data.dof.use_dof = True
cam.data.dof.focus_object = bpy.data.objects["Hero"]
cam.data.dof.aperture_fstop = 2.0          # ~ so the near frame elements blur
fg = bpy.data.objects["FG_Frame"]           # ~ arch / foliage / prop placed near the lens edge
fg.location = cam.matrix_world @ Vector((0.35, -0.2, -0.6))   # ~ camera-local offset
```
raea:
```tsx
<Camera3d transform={Transform.fromXyz(...cam).lookingAt(hero)} projection={{ Perspective: { fov: (35 * Math.PI) / 180 } }}>
  <DepthOfField focal_distance={distToHero} aperture_f_stops={2} />
</Camera3d>
<Model name="fg-frame" src={staticFile("tag.glb")} position={nearLensEdge} />   {/* dark, unlit side toward camera */}
```

## NOTES
- Deprecated: none.
- Visual gaps: example framings shown only on screen.
- Rule conflicts: a framing object entering the shot must fade/slide in over ~0.4 s, never pop. Transitions are built from these scene objects (allowed and encouraged).

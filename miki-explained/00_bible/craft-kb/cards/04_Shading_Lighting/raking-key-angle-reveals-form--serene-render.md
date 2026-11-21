---
title: Rake the key at a more extreme angle (and turn the object away) so shadows reveal form; rotate the light to set mood
bucket: 04_Shading_Lighting
source: "Making a SERENE render in blender.txt"
source_time: "22:53–23:15, 24:34–25:50"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Essential for macro objects under a top light: a frontal/overhead key flattens embossing, coin relief, fabric weave; a raking key makes them read.
---

## METADATA
04_Shading_Lighting | 4.x → raea | Blender bpy + raea

## CREATIVE_INTENT
A face model lit frontally read as a blob; tilting the light to a steeper, more side-on angle and turning the face a little away from it made the shadows describe the features. Spinning the key around the scene changes the mood entirely; no angle is "right", only right for the look.

## STE_PROCEDURE
1. Before adding lights to fix a "blobby" subject, delete hidden clutter that blocks repositioning the key.
2. Rotate the key to a more extreme, raking angle relative to the surface.
3. Rotate the subject slightly away from the light.
4. Watch the shadows in the render until the defining features read.
5. To explore mood, orbit the key around the scene and compare stills.

## AGENT_EXECUTION
Blender:
```python
import bpy, math
key = bpy.data.objects["Key"]; face = bpy.data.objects["Face"]
key.rotation_euler.x += math.radians(25)   # ~ steeper rake
face.rotation_euler.z += math.radians(-15) # ~ turn away from light
```
raea (raking top-side key on a macro hero):
```tsx
<SpotLight transform={Transform.fromXyz(-1.2, 1.0, 0.2).lookingAt([0, 0, 0])}  /* low, side-on: ~40° above surface */
  intensity={1_500_000} outer_angle={0.5} inner_angle={0.25} radius={0.15}
  soft_shadows_enabled shadow_maps_enabled />
```
Mood exploration: render stills with the key at 4 azimuths (e.g. `Transform.fromXyz(r*cos a, h, r*sin a)`) and pick one; animating an orbit inside a shot must be slow and eased.

## NOTES
- Deprecated: none.
- Visual gaps: exact angles are viewport-only.
- Rule conflicts: Style D's key is "one soft top light" — a raking key is a top-side light; keep it soft (`radius`/`soft_shadow_size`) and single.

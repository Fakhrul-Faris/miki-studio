---
title: Off-screen shadow casters to darken a bright foreground
bucket: 04_Shading_Lighting
source: "How to get good lighting in blender.srt"
source_time: "00:05:35–00:07:07"
blender_version_source: 3.x (inferred)
tool_target: Blender bpy | raea
tier: full
style_fit: Strong fit — darkens the edges of a Style D frame and steers the eye to the hero; raea's shadow="only" does exactly this.
---

## METADATA
04_Shading_Lighting | 3.x (inferred) | Blender bpy, raea

## CREATIVE_INTENT
A brightly lit foreground competes with the subject. Put an object outside the frame (or invisible to camera) between the sun and that area so its shadow darkens it; the light is then "revealed" only where you want attention. Off-screen casters also make sunny scenes richer with dappled, motivated shadows.

## STE_PROCEDURE
1. Identify the bright area that pulls attention away from the subject.
2. Duplicate any object (a tree, a rock, a cube).
3. Hide the duplicate from the camera while keeping its shadow.
4. Move it between the light and the bright area.
5. Adjust its position until the shadow covers the unwanted brightness.
6. Compare before and after; keep it subtle.
7. Optionally repeat for smaller distracting highlights.

## AGENT_EXECUTION
Blender (4.2+ visibility flags; same in Cycles and EEVEE Next):
```python
import bpy
src = bpy.data.objects["Tree"]
c = src.copy(); c.data = src.data; bpy.context.collection.objects.link(c)
c.location = (3.0, -6.0, 0)                 # ~ between sun and foreground
c.visible_camera = False                    # Object > Visibility > Ray Visibility > Camera off
c.visible_shadow = True
```
raea (`lights.md`: shadow-only mesh, also blocks shafts in fog):
```tsx
<Mesh3d name="flag" shadow="only" transform={Transform.fromXyz(3, 2, -6)}>
  <Cuboid half_size={[1.5, 1.5, 0.05]} />
  <StandardMaterial base_color="#000000" />
</Mesh3d>
```
Works with DirectionalLight / Spot / Point that have `shadow_maps_enabled`; not with `Environment` (it casts no shadows).

## NOTES
- Deprecated: legacy EEVEE (≤4.1) had no per-object camera-ray visibility; used holdout or `hide_render` workarounds.
- Visual gaps: caster positions visual only.
- Rule conflicts: none; if a caster moves (cloud passing), move it slowly with an eased path.

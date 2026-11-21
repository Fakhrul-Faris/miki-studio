---
title: Track To constraint so every light always points at the product
bucket: 04_Shading_Lighting
source: "The Key to Realistic Renders in Blender.txt"
source_time: "11:21–11:35"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Lets lights move/orbit with the camera flights while staying on the hero.
---

## METADATA
04_Shading_Lighting | any | Blender bpy constraint → raea `.lookingAt(target)`

## CREATIVE_INTENT
Aiming lights by hand is slow; a Track To constraint keeps a light pointed at its target wherever you move it, so trying positions for the perfect look is fast.

## STE_PROCEDURE
1. Add an Empty at the product’s centre (or use the product itself).
2. Select the light; add Object Constraint › Track To.
3. Set Target = the Empty; Track Axis = -Z; Up Axis = Y.
4. Move the light freely; it keeps aiming.

## AGENT_EXECUTION
```python
import bpy
light = bpy.data.objects["Key"]
c = light.constraints.new("TRACK_TO"); c.target = bpy.data.objects["Hero"]
c.track_axis = "TRACK_NEGATIVE_Z"; c.up_axis = "UP_Y"
```
Export: tools/raea/blend2raea.py exports light position + aim (`p`, `aim`), so the constraint’s result travels. raea: `Transform.fromXyz(...p).lookingAt(target)` on any SpotLight/RectLight/DirectionalLight — the same idea natively.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none.


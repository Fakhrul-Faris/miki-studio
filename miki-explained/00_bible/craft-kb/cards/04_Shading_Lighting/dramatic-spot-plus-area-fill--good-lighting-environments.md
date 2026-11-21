---
title: Dramatic spotlight key + faint area fill, motivated by a real source
bucket: 04_Shading_Lighting
source: "How to get good lighting in blender.srt"
source_time: "00:15:54–00:21:43"
blender_version_source: 3.x (inferred)
tool_target: Blender bpy | raea
tier: full
style_fit: Closest to Style D: one soft spot key on the hero in a dark set, a barely-there fill, think of the real light it imitates.
---

## METADATA
04_Shading_Lighting | 3.x (inferred) | Blender bpy, raea

## CREATIVE_INTENT
A not-quite-realistic but striking look: one strong spotlight from the side shaping the hero, then a large area light lifting only the deepest blacks so detail survives. Think of what real source the spot imitates (moonlight, car headlights, a neon sign) and let that guide colour, position and brightness so it feels plausible.

## STE_PROCEDURE
1. Remove all lights.
2. Add a Spot light and set a high Power.
3. Rotate it toward the subject and move it off to one side.
4. Increase Radius a little to soften shadows; avoid extreme values.
5. Increase Spot Size if the pool looks too theatrical.
6. Increase Spot Blend to soften the cone edge.
7. Decide which real light the spot imitates and match its colour and angle.
8. Add an Area light above, aimed toward the darkest area.
9. Raise the Area light slowly until the pitch-black areas just show detail.
10. Increase the Area light Size; optionally tint it blue for moonlight.
11. Add a moody sky backdrop last if the background is empty.

## AGENT_EXECUTION
Blender:
```python
import bpy, math
bpy.ops.object.light_add(type='SPOT', location=(-6, -2, 6)); k = bpy.context.object.data   # ~
k.energy = 5000; k.shadow_soft_size = 0.3                     # ~ "a little" radius
k.spot_size = math.radians(60); k.spot_blend = 0.5            # ~ widened + softened
bpy.ops.object.light_add(type='AREA', location=(4, 2, 8)); f = bpy.context.object.data
f.energy = 100; f.size = 6; f.color = (0.75, 0.82, 1.0)       # ~ faint, big, moon-blue
```
raea:
```tsx
<SpotLight transform={Transform.fromXyz(-6, 6, 2).lookingAt([0, 0.5, 0])} intensity={9000000}
  outer_angle={0.52} inner_angle={0.26} shadow_maps_enabled soft_shadows_enabled radius={0.3} color="#dfe6ff" />
<RectLight transform={Transform.fromXyz(4, 8, -2).lookingAt([0, 0, 0])} intensity={200000}
  width={6} height={6} color="#9fb4ff" />
```
House calibration (kit/BlendShot.tsx LOOK): Blender area watts × 1100 → spot lumens (shadowed share), × 400 → panel lumens for fills.

## NOTES
- Deprecated: none.
- Visual gaps: all powers/angles by eye.
- Rule conflicts: none; Style D keeps fill colour neutral unless the tint is the line's accent.

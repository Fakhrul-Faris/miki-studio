---
title: One spotlight does almost all the lighting (second spot aimed the same way to read as one source)
bucket: 04_Shading_Lighting
source: "Making an Industrial Scene in Blender.txt"
source_time: "16:19–16:54"
blender_version_source: 3.x
tool_target: raea
tier: principle
style_fit: Matches Style D exactly — dark room, one soft top light; a helper light may only reinforce the same direction, never add a second look.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Blender bpy (blocking) → raea lights

## CREATIVE_INTENT
Principle: one well-placed spotlight carries the whole image; a second, weaker spot pointed the same direction only fills where the first falls short, and the viewer still reads one source. Idea: find the placement by moving the light around until the scene "makes the most sense", rather than adding lights.

## STE_PROCEDURE
Method:
1. Add one Spot light as the key.
2. Move and aim it through several positions; keep the one where the set reads best.
3. Add a second Spot behind/near the first, aimed the same direction, weaker in effect.
4. Toggle the key off to confirm it is "basically all the lighting".
How-to (raea):
5. Put one `SpotLight` with `shadow_maps_enabled` above the hero; set its cone with `outer_angle` / `inner_angle` (radians).
6. Add the helper spot along the same direction at lower intensity, without shadows.
7. Add a small `AmbientLight` only so shadows are not pure black.

## AGENT_EXECUTION
### Source tool (Blender)
```python
import bpy
bpy.ops.object.light_add(type='SPOT', location=(0, -2, 6))
key = bpy.context.active_object; key.data.energy = 245000     # video: ~245,000 W in a large scene (scene scale unknown)
key.data.spot_size = 0.9                                       # ~ radians, on screen only
key.data.shadow_soft_size = 0.5                                # ~
bpy.ops.object.light_add(type='SPOT', location=(0.6, -2.4, 6.2))
helper = bpy.context.active_object; helper.data.energy = 245000  # video: "same with this one"
# aim both at the same target
tgt = bpy.data.objects.new("KeyTarget", None); bpy.context.collection.objects.link(tgt)
for l in (key, helper):
    c = l.constraints.new('TRACK_TO'); c.target = tgt; c.track_axis = 'TRACK_NEGATIVE_Z'; c.up_axis = 'UP_Y'
```
### Blender / raea translation
```tsx
<SpotLight transform={Transform.fromXyz(0, 1.2, 0.3).lookingAt([0, 0, 0])} intensity={900000}
  outer_angle={0.45} inner_angle={0.225} shadow_maps_enabled soft_shadows_enabled radius={0.15} />
<SpotLight transform={Transform.fromXyz(0.15, 1.25, 0.35).lookingAt([0, 0, 0])} intensity={250000}
  outer_angle={0.6} inner_angle={0.3} />
<AmbientLight brightness={40} />
```
Intensities are lumens; tune from a still (`raea render EDIT.tsx --frame N -o F.png`) — lights.md: 900,000 lm lights a surface 3 m away like daylight; at macro distance (~1 m) far less is needed (`~`). With a BlendShot export, the key is the strongest light in the shot data and `LOOK.keyGain` converts Blender watts.

## NOTES
- The 245,000 W value is tied to the video's large warehouse scale; do not copy it to macro scale.
- Volumetric haze (see `volume-scatter-cube-atmosphere--industrial-scene`) makes this single source visible as a shaft.
- Visual gaps: light placement is found by trial in the viewport.
- Rule conflicts: none; light animation (sweeps) must use eased in-out curves.

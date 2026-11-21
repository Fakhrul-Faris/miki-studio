---
title: Start with point lamps, convert to spots to cut spill
bucket: 04_Shading_Lighting
source: "Fundamentals of Lighting in Blender.txt"
source_time: "37:17–39:38"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Direct match — Style D's dark room comes from lights that touch only the hero; spots with a narrow cone keep the floor and background dark.
---

## METADATA
04_Shading_Lighting | 4.x | Blender bpy, raea

## CREATIVE_INTENT
Block in lights as point lamps (no rotation to manage) to settle position, size and colour; then, when you start carving shape, convert a lamp to a Spot and narrow its cone so it stops lighting floor and background that don't matter. The object keeps the same highlight; only the spill goes.

## STE_PROCEDURE
1. Set position, Radius and Color while the lamp is a Point.
2. Change the lamp Type to Spot.
3. Rotate the Spot so its centre line hits the centre of the object.
4. Reduce Spot Size until the foreground floor starts to fade out.
5. Adjust Spot Blend to soften the cone edge.
6. Repeat for any secondary lamp whose colour spills onto the visible floor.
7. Check that the object's highlights are unchanged.

## AGENT_EXECUTION
Blender:
```python
import bpy, math
o = bpy.data.objects["Key"]; o.data.type = 'SPOT'
L = o.data
L.spot_size = math.radians(45)   # ~ full cone angle
L.spot_blend = 0.3               # ~ edge softness
c = o.constraints.new('TRACK_TO'); c.target = bpy.data.objects["Crate"]
c.track_axis = 'TRACK_NEGATIVE_Z'; c.up_axis = 'UP_Y'
```
raea (`outer_angle` is the HALF-angle in radians; Blender `spot_size` is the full angle):
```tsx
// spot_size 45° -> outer_angle = 0.39; blend 0.3 -> inner ≈ outer × (1 − 0.3) ≈ 0.27 (~ mapping)
<SpotLight transform={Transform.fromXyz(0.8, 3, 1.2).lookingAt([0, 0.3, 0])} intensity={2000000}
  outer_angle={0.39} inner_angle={0.27} shadow_maps_enabled soft_shadows_enabled radius={0.3} />
```

## NOTES
- Deprecated: none.
- Visual gaps: 38:00–41:00 cone/blend values tuned by eye, not stated.
- Rule conflicts: none.

## ADDENDUM — Apple commercial Cinematography breakdown (egg-crate isolated top light)
Source: "Studio Lighting, Silhouettes & Color Theory/Apple commercial Cinematography breakdown.txt" (02:00–02:37, 03:13–03:48)

| parameter | Apple commercial breakdown | recommended for Style D |
|---|---|---|
| source | very small light mat placed above the window, with an egg crate | narrow soft top `SpotLight` |
| control | egg crate "really isolates the light, making it fall on him and not spill everywhere else" | small `outer_angle` (~0.2–0.35 rad) + `range` ≈ 2× light-to-subject distance |
| second instance | interior light with egg crate, "otherwise it would have spilled all over the room; this way it's only hitting him" | same: every helper light narrowed and range-limited |

Extra variant — top-down from above a motivated opening: hang the small, gridded key just above a visible
window/doorway so it reads as light from that opening, and keep the room around dark; matches Style D's single soft
top light. Extra steps: place the key above and slightly in front of the subject, near the motivating opening;
narrow its spread until walls and floor beyond the subject stay dark; check the subject's catch-light/highlight is
unchanged after narrowing. Note: light positions are inferred by the narrator from shadows, not shown on set.

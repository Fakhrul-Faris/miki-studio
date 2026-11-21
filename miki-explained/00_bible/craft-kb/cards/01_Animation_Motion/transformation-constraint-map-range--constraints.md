---
title: Transformation constraint as a "Map Range" between objects (location → rotation; drawbridge/handle mechanisms)
bucket: 01_Animation_Motion
source: "The_Power_of_CONSTRAINTS_in_Blender.md"
source_time: "9:57–12:10"
blender_version_source: 3.x+
tool_target: Blender bpy
tier: principle
style_fit: Mechanism-style state changes (a crank turns → a gate lifts; a slider moves → a dial rotates) driven by one control; ideal for "how it works" beats. In raea it is literally `interpolate`.
---

## METADATA
01_Animation_Motion | 3.x+ → 4.2+ | Blender bpy → raea interpolate

## CREATIVE_INTENT
Principle: the Transformation constraint maps a range of the target's location/rotation/scale onto a range of any transform of the owner — a map-range node for objects. Ideas: a drawbridge whose deck rotation follows the handle's rotation; a slider whose position turns a dial; one animated control drives a whole mechanism coherently.

## STE_PROCEDURE
Method:
1. Add a Transformation constraint to the owner (e.g. the monkey/bridge); set Target (cylinder/handle).
2. In Map From, choose Location; set X Min = -1 and X Max = 1.
3. In Map To, choose Rotation; set X Min = 0° and X Max = 180°.
4. Move the target along X: the owner rotates from 0° to 180° across that range.
5. Enable Extrapolate to keep mapping beyond the From range (owner keeps rotating).
6. If the owner already has its own transforms, change Mix to combine them.
7. To feed From X into a different To axis (e.g. To Y), set that To axis's Source to X.

## AGENT_EXECUTION
### Source tool (Blender)
```python
import bpy, math
bridge, handle = bpy.data.objects["Bridge"], bpy.data.objects["Handle"]
c = bridge.constraints.new('TRANSFORM')
c.target = handle
c.map_from = 'LOCATION'
c.from_min_x, c.from_max_x = -1.0, 1.0          # video values
c.map_to = 'ROTATION'
c.to_min_x_rot, c.to_max_x_rot = 0.0, math.radians(180)   # video values
c.map_to_x_from = 'X'                            # Source axis for To X (set to 'X' when routing From X → To Y via map_to_y_from)
c.use_motion_extrapolate = False                 # True = keep rotating past the range
c.mix_mode_rot = 'ADD'                           # when the owner has its own rotation (~)
# drawbridge variant: c.map_from = 'ROTATION'; c.from_min_x_rot / from_max_x_rot on the handle
```
Bake before export: `bpy.ops.nla.bake(..., visual_keying=True, clear_constraints=True, bake_types={'OBJECT'})`.

### Blender / raea translation
`interpolate` is the same map-range; drive both parts from one value:
```tsx
const x = interpolate(f, [0, 30], [-1, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const rot = interpolate(x, [-1, 1], [0, Math.PI], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });  // drop clamps = Extrapolate
<Mesh3d name="handle" transform={Transform.fromXyz(x * 0.05, 0, 0)}>...</Mesh3d>
<Mesh3d name="bridge" transform={Transform.IDENTITY.withRotation(Quat.fromEuler("XYZ", rot, 0, 0))}>...</Mesh3d>
```

## NOTES
- Video values: From X −1…1 → To rotation X 0…180°.
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: the driving control must ease in-out; keep any rotation under ~130°/s on screen.

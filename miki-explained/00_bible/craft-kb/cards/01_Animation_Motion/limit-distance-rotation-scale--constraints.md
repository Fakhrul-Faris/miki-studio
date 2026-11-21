---
title: Limit constraints — Limit Distance (fixed orbit), Limit Rotation (door swing range), Limit Scale (stretch caps)
bucket: 01_Animation_Motion
source: "The_Power_of_CONSTRAINTS_in_Blender.md"
source_time: "7:08–8:26"
blender_version_source: 3.x+
tool_target: Blender bpy
tier: principle
style_fit: Keeps object state-changes physically plausible during Blender animation (a lid that opens only to 110°, a coin orbiting a fixed radius); in raea the same is a clamp in frame math.
---

## METADATA
01_Animation_Motion | 3.x+ → 4.2+ | Blender bpy → raea math clamps

## CREATIVE_INTENT
Principle: Limit constraints cap a transform so hand animation cannot leave a sensible range. Ideas: planets (or coins around a jar) that never leave their orbit radius; a door, lid or flap that stops at its hinge limits; cartoon-stretch caps on scale.

## STE_PROCEDURE
Method (Limit Distance):
1. Add Limit Distance to the orbiting object; set Target = centre object.
2. Set Distance = orbit radius; set Limit Mode to keep it on that distance (On Surface for a fixed radius).
3. Use Influence to soften.
Method (Limit Rotation):
4. Add Limit Rotation; enable the hinge axis; set Min and Max angles.
5. Leave Order on Default.
6. Watch for snapping when the rotation passes the limit (author's caveat).
Method (Limit Scale):
7. Add Limit Scale; enable per-axis Min/Max; set Influence.
How-to:
8. Bake before GLB export.

## AGENT_EXECUTION
### Source tool (Blender)
```python
import bpy, math
coin, jar = bpy.data.objects["Coin"], bpy.data.objects["Jar"]
d = coin.constraints.new('LIMIT_DISTANCE')
d.target = jar; d.distance = 0.15            # ~ macro orbit radius
d.limit_mode = 'LIMITDIST_ONSURFACE'         # fixed radius (INSIDE / OUTSIDE also exist)

lid = bpy.data.objects["Lid"]
r = lid.constraints.new('LIMIT_ROTATION')
r.use_limit_x = True; r.min_x = 0.0; r.max_x = math.radians(110)   # ~ hinge range
r.euler_order = 'AUTO'                       # "Default"
# 4.x also has r.use_legacy_behavior (False) which avoids the old snapping behaviour

blob = bpy.data.objects["Blob"]
s = blob.constraints.new('LIMIT_SCALE')
s.use_min_z = s.use_max_z = True; s.min_z = 0.8; s.max_z = 1.3     # ~
s.use_transform_limit = True                 # also clamp the gizmo while animating
```
### Blender / raea translation
Clamp in TSX instead of constraining:
```tsx
const ang = Math.min(Math.PI * 110 / 180, Math.max(0, interpolate(f, [0, 20], [0, 2.2], { easing: Easing.inOut(Easing.cubic) })));
const t = f * 0.03;   // orbit on a fixed radius = the Limit Distance case
<Mesh3d name="coin" transform={Transform.fromXyz(0.15 * Math.cos(t), 0.05, 0.15 * Math.sin(t))}>...</Mesh3d>
```
For hinged parts, rotate an `<Entity>` placed at the hinge and nest the lid inside it.

## NOTES
- The snapping caveat at limits: Blender 4.x Limit Rotation added "Legacy Behavior" (off = improved wrapping) — `~`, not from the video.
- Visual gaps: none.
- Rule conflicts: a clamp creates a hard stop; ease into the limit (the driving curve should already decelerate) so nothing "hits" its stop.

---
title: Faked bounce light — point lights with MIS, glossy and volume-scatter visibility off
bucket: 04_Shading_Lighting
source: "How to Make DARK Environments in Blender.txt"
source_time: "13:33–16:40"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Optional finishing layer; in raea it is the main way to fake bounce because Bevy has no path-traced GI.
---

## METADATA
04_Shading_Lighting | 4.x (Cycles) → 4.2+ / raea | Blender bpy + raea

## CREATIVE_INTENT
Light naturally bounces off bright surfaces onto neighbours; boosting that with hidden point lights ties the scene together and makes it feel "special". Place them only where bounce would already exist, and stop them from showing up as glowing orbs in reflections or fog.

## STE_PROCEDURE
1. Before placing bounce lights, find where the key hits a bright surface next to other geometry.
2. Add a Point Light just off that lit surface, on the side facing the receivers.
3. Disable Multiple Importance on the light so puddles do not show a glowing sphere.
4. In Object Properties > Visibility > Ray Visibility, uncheck Glossy (no reflection in water/metal).
5. In the same panel, uncheck Volume Scatter (no glowing orb in the fog volume).
6. Duplicate the light to other natural bounce spots; keep each faint.
7. Toggle the group off/on; keep it only if it ties the image together.

## AGENT_EXECUTION
Blender (Cycles):
```python
import bpy
d = bpy.data.lights.new("Bounce", type='POINT'); d.energy = 200   # ~ not given
d.cycles.use_multiple_importance_sampling = False
o = bpy.data.objects.new("Bounce", d); bpy.context.collection.objects.link(o)
o.visible_glossy = False
o.visible_volume_scatter = False
```
raea: `PointLight` with no shadows and a short `range` so it only touches its neighbours:
```tsx
<PointLight transform={Transform.fromXyz(0.3, 0.15, 0.4)} intensity={60_000}
  range={1.5} color="#ffd9b0" />  {/* ~ warm bounce off a lit wooden surface */}
```
- Volume-scatter off: raea lights only shaft through fog when marked `volumetric`; leave the flag off on bounce lights (the default) — equivalent.
- Glossy visibility off: raea: no equivalent (Bevy lights always add specular). Keep bounce lights dim and placed so their specular highlight falls out of shot, or use a `RectLight` (broad, so its highlight is a soft sheen, not a dot).
- MIS: raea: no equivalent (not a path tracer; nothing to sample).

## NOTES
- Deprecated: none; the Cycles light property is `light.cycles.use_multiple_importance_sampling` in 4.x.
- Visual gaps: the bounce lights' exact positions and powers are not narrated.
- Rule conflicts: none.

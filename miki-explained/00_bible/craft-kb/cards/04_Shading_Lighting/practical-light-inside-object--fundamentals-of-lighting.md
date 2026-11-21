---
title: Practical light inside the object (area lamp under a lid + emissive LED)
bucket: 04_Shading_Lighting
source: "Fundamentals of Lighting in Blender.txt"
source_time: "40:36–42:23"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits object state changes (open, x-ray): a glow inside the object reveals what's in it; an emissive LED + bloom is a natural accent spot.
---

## METADATA
04_Shading_Lighting | 4.x | Blender bpy, raea

## CREATIVE_INTENT
A light source inside the object (behind a window, under a lid) adds story — something is in there — and a warm incandescent tone gives a vintage feel. Use a flat Area lamp so no light leaks above its plane; use emissive materials for small LEDs.

## STE_PROCEDURE
1. Add an Area lamp, not a Point (a point with radius has thickness and leaks).
2. Place it just under the inside top of the object, facing down.
3. Reduce its Size to fit inside the object.
4. Set a warm incandescent colour (or a garish hue for a sci-fi feel).
5. If the model has an LED, raise its emission strength in the material.

## AGENT_EXECUTION
Blender:
```python
import bpy
bpy.ops.object.light_add(type='AREA', location=(0, 0, 0.55))   # ~ just under lid
a = bpy.context.object; a.data.size = 0.3; a.data.energy = 20  # ~
a.data.color = (1.0, 0.72, 0.42)                                # ~ incandescent
led = bpy.data.materials["LED"].node_tree.nodes["Principled BSDF"]
led.inputs["Emission Strength"].default_value = 10             # ~
```
raea:
```tsx
<RectLight transform={Transform.fromXyz(0, 0.55, 0).lookingAt([0, 0, 0])} intensity={40000}
  width={0.3} height={0.3} color="#ffb874" range={2} />   {/* faces -Z; shadowless */}
<Mesh3d name="led" ...><Sphere radius={0.01} />
  <StandardMaterial base_color="#111111" emissive={LinearRgba.from(Srgba.hex("#ff3b30")).mul(6)} /></Mesh3d>
<Bloom intensity={0.6} threshold={0.9} />
```
Emissive surfaces don't light neighbours in raea (`materials.md`) — pair with a small light if the glow must spill.

## NOTES
- Deprecated: Principled "Emission" → "Emission Color" + "Emission Strength" (4.0+).
- Visual gaps: sizes/strengths not stated.
- Rule conflicts: none; fade the inner light up over ≥ 0.4 s when the object opens, never pop.

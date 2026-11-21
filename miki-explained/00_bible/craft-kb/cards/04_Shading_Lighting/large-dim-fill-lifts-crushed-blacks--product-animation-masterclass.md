---
title: Very large, very dim fill area light to lift crushed blacks for grading headroom
bucket: 04_Shading_Lighting
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "42:55–43:59"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Keeps a dark-room look but stops black products clipping to 0 so detail survives the grade.
---

## METADATA
04_Shading_Lighting | Blender 4.3 | Blender bpy + raea

## CREATIVE_INTENT
A black product in a black world clips to pure black; there is nothing to grade. One huge, low-power area light at an angle adds
just enough soft fill that the dark side has texture — "it doesn't do that much, but enough".

## STE_PROCEDURE
1. Add an Area light; set Size ~8 m (huge relative to a 15 cm can) for very soft light.
2. Set Power ~30 W.
3. Place it off to one side, angled toward the can.
4. Compare on/off: the shadow side should move from crushed black to dark grey with visible form; keep it subtle.

## AGENT_EXECUTION
- Blender:
```python
d = bpy.data.lights.new("Fill", 'AREA'); d.size = 8.0; d.energy = 30.0
o = bpy.data.objects.new("Fill", d); o.location = (-3.0, -2.0, 1.5); o.rotation_euler = (1.2, 0, -0.9)   # placement ~
bpy.context.collection.objects.link(o)
```
- raea: `<AmbientLight brightness={20} />` (lifts shadows evenly) or a big soft panel
  `<RectLight transform={Transform.fromXyz(-2, 1, 1.5).lookingAt([0, 0.08, 0])} width={4} height={4} intensity={40000} />` (`~`);
  `<AmbientOcclusion quality="high" />` then keeps contact shadows, since AO shades ambient light only (post.md).

## NOTES
- Deprecated: none.
- Visual gaps: position/angle are visual only.
- Rule conflicts: none — keep the fill well below the top key so the dark-room mood stays.

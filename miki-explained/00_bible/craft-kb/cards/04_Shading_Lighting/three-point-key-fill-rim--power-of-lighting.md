---
title: Three-point lighting — key, fill, rim (creative, not rule-bound, in 3D)
bucket: 04_Shading_Lighting
source: "The Power of LIGHTING in Blender!.txt"
source_time: "01:35–02:36"
blender_version_source: 3.2+
tool_target: Blender bpy | raea
tier: full
style_fit: Style D variant: key = the one soft top light, fill = AmbientLight, rim = only when the hero must separate from a dark background.
---

## METADATA
04_Shading_Lighting | any | Blender bpy (or Tri-Lighting add-on) → raea lights

## CREATIVE_INTENT
Almost always works: key gives most light, fill opens the key’s shadows to show detail, rim separates subject from background and defines its shape. Real sets have fixed ratios/angles; in 3D use what serves the subject.

## STE_PROCEDURE
1. Add the key light ~45° to the side and above the subject.
2. Add a weaker fill on the opposite side to lift shadow detail.
3. Add a rim behind the subject, aimed toward the camera side, to outline it.
4. Or enable the "Tri-Lighting" add-on (Add › Light › 3 Point Lights) for an instant rig.
5. Adjust intensities/angles by eye for the subject.

## AGENT_EXECUTION
```python
import bpy
# needs extension: Tri-Lighting (extensions.blender.org) — core fallback below builds the same three lights
# manual
for name, loc, e in (("Key", (2, -2, 3), 500), ("Fill", (-2.5, -1.5, 2), 120), ("Rim", (0, 2.5, 2.5), 400)):
    bpy.ops.object.light_add(type="AREA", location=loc); o = bpy.context.object; o.name = name; o.data.energy = e
    c = o.constraints.new("TRACK_TO"); c.target = bpy.data.objects["Hero"]; c.track_axis = "TRACK_NEGATIVE_Z"
```
raea:
```tsx
<SpotLight transform={Transform.fromXyz(2, 3, 2).lookingAt(hero)} intensity={2700000} outer_angle={0.6} inner_angle={0.3} radius={0.4} soft_shadows_enabled shadow_maps_enabled />
<AmbientLight brightness={60} />                       {/* fill */}
<PointLight transform={Transform.fromXyz(0, 2.5, -2.5)} intensity={500000} range={6} color="#dfe8ff" />  {/* rim */}
```

## NOTES
- Deprecated: Tri-Lighting add-on became an extension in 4.2.
- Visual gaps: values ~.
- Rule conflicts: Style D prefers one key; add fill/rim only when the delete-test shows they earn it.
- bpy fixed for 5.3: Tri-Lighting add-on is not in 5.3 core → `addon_enable` line replaced by a `# needs extension: Tri-Lighting` comment; the manual (core) loop is the fallback.

---
title: Secondary lights = the key duplicated at lower power, pointing the same way
bucket: 04_Shading_Lighting
source: "How To Use Lighting In Your Renders  Blender Tutorial.txt"
source_time: "03:35–03:58"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Keeps a single motivated light source even when more coverage is needed — no competing shadow directions.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Blender bpy → raea extra lights

## CREATIVE_INTENT
When one light can’t cover the set, add copies of it — weaker and aimed the same direction — so the viewer still reads one source (one window, one sun), not a cluster of lamps.

## STE_PROCEDURE
1. Duplicate the key light (Shift+D).
2. Lower the copy’s Power well below the key.
3. Offset it to cover the dark area, keeping its rotation parallel to the key.
4. Check that all shadows still fall the same way.

## AGENT_EXECUTION
```python
import bpy
key = bpy.data.objects["Key"]
d = key.copy(); d.data = key.data.copy(); bpy.context.scene.collection.objects.link(d)
d.data.energy = key.data.energy * 0.2      # ~ "lowered a bit"
d.location.x += 1.5                         # ~ offset; rotation unchanged = same direction
```
raea: repeat the key with the same aim vector, e.g. `<SpotLight transform={Transform.fromXyz(...keyP + offset).lookingAt(aim + offset)} intensity={key * 0.2} />` (no `shadow_maps_enabled` on the copies, so only the key casts — avoids double shadows and cost).

## NOTES
- Deprecated: none.
- Visual gaps: values only on screen.
- Rule conflicts: none.


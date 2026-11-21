---
title: Lighting setups in hideable collections for A/B testing
bucket: 05_Camera_Raea_Pipeline
source: "How to get good lighting in blender.srt"
source_time: "00:14:23–00:15:54"
blender_version_source: 3.x (inferred)
tool_target: Blender bpy | raea
tier: full
style_fit: Fits stills-for-look-tests and the A/B/C style tests: try radical alternatives without losing the approved one.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x (inferred) | Blender bpy, raea

## CREATIVE_INTENT
When stuck on lighting, park the current setup in its own collection, hide it, and try something completely different in a new collection. Toggling collections switches whole setups instantly, so experimentation is risk-free.

## STE_PROCEDURE
1. Select every light source of the current setup, including the world/HDRI proxies.
2. Press M and choose New Collection; name it after the setup (e.g. "Golden hour").
3. Disable the collection; the scene goes black.
4. Build the next setup in a new collection.
5. Toggle collections to compare setups.

## AGENT_EXECUTION
Blender:
```python
import bpy
lights = [o for o in bpy.context.scene.objects if o.type == 'LIGHT']
col = bpy.data.collections.new("Light_GoldenHour"); bpy.context.scene.collection.children.link(col)
for o in lights:
    for c in o.users_collection: c.objects.unlink(o)
    col.objects.link(o)
col.hide_render = True; col.hide_viewport = True
```
The World (HDRI) is not an object; store alternatives as separate World datablocks and switch `bpy.context.scene.world = bpy.data.worlds["W_Overcast"]`.
raea: put each rig in its own component and pick by a constant, then render one still each:
```tsx
const RIG = "golden"; // "golden" | "spot" | "overcast"
{RIG === "golden" && <GoldenRig />}{RIG === "spot" && <SpotRig />}
```

## NOTES
- Deprecated: none.
- Rule conflicts: none.

---
title: Shadow reveals form (off-axis key, never light shadows away)
bucket: 04_Shading_Lighting
source: "Fundamentals of Lighting in Blender.txt"
source_time: "00:49–04:09"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Core of Style D — one soft top light that still casts readable shadow; tilt it off the lens axis so the hero object's bevels, cut-outs and stickers read.
---

## METADATA
04_Shading_Lighting | 4.x (EEVEE Next) | Blender bpy, raea

## CREATIVE_INTENT
Shadow is how the eye reads shape: without it a viewer cannot tell a protrusion from an intrusion. When the hero object looks flat or "pasted on", the fix is to move the one light off-axis — not to add more lights to kill the shadows.

## STE_PROCEDURE
1. Set the World Background Strength to 0 so only placed lamps light the scene.
2. Add one Point lamp near the subject.
3. Before you add a second lamp, look at the shadow side and decide if it hides needed detail.
4. Do not add lamps only to remove shadows; each extra lamp flattens the form.
5. If the key is straight above or straight behind the camera, rotate it a few degrees off-axis.
6. Check that recesses and protrusions now show a clear shadow edge.
7. If the shadow side hides important detail, add one dim lamp (see card "dim-fill-for-shadow-side").

## AGENT_EXECUTION
Blender:
```python
import bpy, math
bpy.context.scene.world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.0
bpy.ops.object.light_add(type='POINT', location=(1.5, -1.0, 2.0))   # Shift+A > Light > Point
key = bpy.context.object; key.data.energy = 460                      # video's value (W)
# top-down sun reads flat; tilt it off-axis:
bpy.ops.object.light_add(type='SUN', rotation=(math.radians(25), math.radians(10), 0))  # ~ angles inferred
```
raea:
```tsx
<DirectionalLight transform={Transform.fromXyz(1.2, 6, 2).lookingAt([0, 0, 0])} illuminance={10000} shadow_maps_enabled />
// a light at the camera position (Transform == camera) gives flash-photo flat light — offset it 20–45° ~
```
Shadows only appear with `shadow_maps_enabled` and a floor/surface to receive them.

## NOTES
- Deprecated: none.
- Visual gaps: exact rotation that made the crate readable is shown, not stated (`~`).
- Rule conflicts: none. Style D wants this shadow; keep the AmbientLight low (40–80 ~) so the shadow side stays dark but not black.

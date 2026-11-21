---
title: Accent lights parented to the moving hero so its shape stays lit through the move
bucket: 04_Shading_Lighting
source: "Making a Car Animation in Blender!.txt"
source_time: "08:58–09:24"
blender_version_source: 3.x/4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Keeps the hero lit through camera flights and object travel (a coin rolling, a parcel sliding) — the one soft key stays fixed, these are small cheat rims.
---

## METADATA
04_Shading_Lighting | 3.x/4.x → 4.2+ | Blender bpy + raea

## CREATIVE_INTENT
3D lets you cheat: lights that travel with the object keep its silhouette and key edges readable wherever it moves in the set.

## STE_PROCEDURE
1. Add the extra light(s) aimed at the hero's important shape lines.
2. Parent each light to the hero (Ctrl+P > Object, Keep Transform).
3. Animate only the hero; the lights follow.

## AGENT_EXECUTION
Blender:
```python
import bpy
hero = bpy.data.objects["Hero"]
ld = bpy.data.lights.new("Rim", 'AREA'); ld.energy = 50; ld.size = 0.3   # ~ not given
rim = bpy.data.objects.new("Rim", ld); bpy.context.collection.objects.link(rim)
rim.location = (0.3, -0.2, 0.25)                                        # ~ relative placement
rim.parent = hero; rim.matrix_parent_inverse = hero.matrix_world.inverted()
```
raea: put the light inside the hero's `<Entity>` so their transforms compose:
```tsx
<Entity transform={heroTransform(f)}>
  <Model src={staticFile("hero.glb")} />
  <SpotLight transform={Transform.fromXyz(0.3, 0.25, -0.2).lookingAt([0, 0, 0])} intensity={300000} outer_angle={0.5} inner_angle={0.25} range={3} color="#eef2ff" />
</Entity>
```
(lookingAt inside an Entity is in the Entity's local space.)

## NOTES
- Deprecated: none.
- Visual gaps: light positions/powers not given.
- Rule conflicts: keep these rims subtle and neutral so the frame still reads as "one soft top light"; a coloured rim only in the brand accent and only when the line is about the hero.

---
title: Light linking — rim light hits the product but not the reflective floor
bucket: 04_Shading_Lighting
source: "How to Make Perfect Product Animations in Blender.txt"
source_time: "21:40–23:19"
blender_version_source: 4.x (~4.4)
tool_target: Blender bpy
tier: full
style_fit: strong — keeps one clean rim on the hero without a hot streak on the surface below
---

## METADATA
04_Shading_Lighting | Blender 4.0+ light linking (Cycles; EEVEE Next 4.2+) | Blender bpy + raea

## CREATIVE_INTENT
A backlight that rims the product also throws a big glare onto a glossy floor. Light linking limits a light to a chosen collection so the rim stays on the product and the floor stays dark.

## STE_PROCEDURE
1. Add an Area light behind the product facing the camera; scale it up to rim the edges.
2. Select every object that belongs to the product.
3. In the Outliner, create a New Collection and move those objects into it.
4. Toggle the collection's visibility; if anything stays visible, it is not in the collection — move it in.
5. Select the light; in Object Properties → Shading → Light Linking, click New.
6. Drag the product collection into the Light Linking receiver box.
7. Check rendered view: the rim remains, the floor reflection is gone.

## AGENT_EXECUTION
```python
import bpy
parts = [o for o in bpy.data.objects if o.name.startswith("Product")]   # whatever makes up the product
col = bpy.data.collections.new("ProductLit"); bpy.context.scene.collection.children.link(col)
for o in parts:
    for c in list(o.users_collection): c.objects.unlink(o)
    col.objects.link(o)
rim = bpy.data.objects["RimLight"]
rim.light_linking.receiver_collection = col      # Blender 4.0+; blocker_collection does shadow linking
```
raea: `layers` exist on parts, lights and the camera (limits.md), which is Bevy's RenderLayers; in Bevy a light lights only meshes on a shared layer — so put product and rim on a layer the floor lacks, and the camera on both. Exact prop format is not documented in the skill: check `raea guide coverage` before use. Fallbacks with documented props: shorten the rim's `range`, aim a `SpotLight` with a narrow `outer_angle` at the product only, or raise the floor's `perceptual_roughness` so the glare spreads and dims.

## NOTES
- Deprecated: none (light linking added in 4.0; EEVEE supports it from 4.2).
- Visual gaps: none.
- Rule conflicts: none.

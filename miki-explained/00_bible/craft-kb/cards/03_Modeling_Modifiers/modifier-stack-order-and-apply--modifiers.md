---
title: Modifier stacks — top-down evaluation order, reordering to fix results, applying (Ctrl+A)
bucket: 03_Modeling_Modifiers
source: "The Power of MODIFIERS in Blender!.txt"
source_time: "00:00–01:09, 04:23–05:36"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Foundation for every Style D hero build — non-destructive stacks let the object be reshaped late; the GLB export applies the stack once (export_apply=True).
---

## METADATA
03_Modeling_Modifiers | 3.x → 4.2+ | Blender bpy

## CREATIVE_INTENT
Modifiers are non-destructive operations on an object's geometry (categories Modify, Generate, Deform, Physics). Stacking several on one object is where they save the most time, but the stack runs top to bottom, so the order changes the result.

## STE_PROCEDURE
1. Add modifiers in Properties → Modifiers (wrench tab); they fall into Modify, Generate, Deform and Physics.
2. Read the stack top-down: the top modifier is evaluated first, each one below works on that result.
3. If the stack gives an unexpected result, drag modifiers into a different order and compare.
4. Accept any order that produces the intended result; there is no single correct order.
5. To make a modifier permanent, hover it and press Ctrl+A (or its dropdown arrow → Apply); it loses non-destructive editing.
6. Apply from the top of the stack down so each result matches what the viewport showed.

## AGENT_EXECUTION
```python
import bpy
obj = bpy.context.active_object
m1 = obj.modifiers.new("Mirror", 'MIRROR')
m2 = obj.modifiers.new("Subdivision", 'SUBSURF')
print([m.name for m in obj.modifiers])                  # evaluation order, top first

# reorder: move a modifier to an index (4.x)
bpy.ops.object.modifier_move_to_index(modifier="Subdivision", index=0)
bpy.ops.object.modifier_move_up(modifier="Mirror")     # or one step

# apply (Ctrl+A over the modifier)
bpy.ops.object.modifier_apply(modifier="Mirror")

# usual pipeline: leave the stack live, the GLB export applies it
bpy.ops.export_scene.gltf(filepath="//hero.glb", use_selection=True, export_apply=True)
```
raea: no stack at render time; raea receives the evaluated mesh in the GLB. Code-built shapes have the same top-down idea in Manifold chains (`solid.minus(...).smooth(...)` — each call works on the previous result; meshes.md), built once at module level.

## NOTES
- Physics modifiers are simulations; out of scope of this video.
- Deprecated: none. (Blender 4.x adds `modifier_move_to_index`; older scripts used repeated `modifier_move_up`.)
- `export_apply=True` evaluates the stack at the current frame; animated modifier parameters do not reach the GLB (bake to shape keys — see the deform-modifier cards).
- Visual gaps: none.
- Rule conflicts: none.

---
title: Start with the blockout or the biggest / most important object, never peripheral detail
bucket: 03_Modeling_Modifiers
source: "How To Create Beautiful Environments In Blender.txt"
source_time: "11:17–13:12"
blender_version_source: n/a (general advice)
tool_target: Blender bpy | principle-only
tier: principle
style_fit: Style D has one hero object; build and light it first, then dress around it.
---

## METADATA
03_Modeling_Modifiers | n/a → 4.2+ | Blender bpy (principle)

## CREATIVE_INTENT
Principle: start with whatever has the biggest effect on the final image: a primitive blockout of the whole scene, drop-in finished models as blockers, or the focal object itself. The frame reads from the first minutes, and you never spend 40 minutes on a piece that ends up 1% of the frame.
Ideas: in Style D the hero object (gas pump, phone, receipt) is that first object; everything else is built around its silhouette in camera.

## STE_PROCEDURE
1. Place the hero / largest object first (a finished library model if one exists).
2. Otherwise block out with cubes and cylinders where every major object will sit.
3. Add basic lighting and a basic camera angle immediately after the blockout.
4. Check frame coverage: anything under ~5% of frame area gets low priority.
5. Replace blockers with detail, largest-on-screen first.

## AGENT_EXECUTION
### Blender
```python
import bpy
def block(name, kind, loc, dims):
    if kind == 'CUBE': bpy.ops.mesh.primitive_cube_add(location=loc)
    else: bpy.ops.mesh.primitive_cylinder_add(location=loc)
    o = bpy.context.active_object; o.name = f"BLK_{name}"; o.dimensions = dims
    return o
block("hero", 'CYLINDER', (0, 0, 0.5), (0.4, 0.4, 1.0))      # ~ sizes per shot
block("counter", 'CUBE', (0, 0, -0.05), (3, 1.2, 0.1))
bpy.ops.object.light_add(type='AREA', location=(0, 0, 2))
bpy.context.active_object.data.size = 1.0                       # ~
# then camera; then stills; then replace BLK_* largest-first
```
### raea translation
Same order in TSX: hero `<Model>` / `<Mesh3d>` + `<Camera3d>` + key light first; set dressing later in its own component.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none; matches the grey-box board gate.

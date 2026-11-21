---
title: Background depth layers — arrayed arch towers and a 100× scaled rock in fog
bucket: 03_Modeling_Modifiers
source: "Creating an Animation in Eevee (Blender 5.0).txt"
source_time: "13:34–14:14, 15:42–16:23"
blender_version_source: 5.0
tool_target: Blender bpy
tier: full
style_fit: limited — Style D backgrounds are mostly dark and blurred; useful for a wider establishing setup where far shapes in fog give scale
---

## METADATA
03_Modeling_Modifiers | Blender 5.0 | Blender bpy + raea

## CREATIVE_INTENT
Distant shapes in fog only need silhouettes. Build tall "towers" from four arches on a box, bevel the corners slightly, stack them with an Array modifier; scatter a few. For far terrain, scale a single rock model ~100× with low subdivision. Fog hides the lack of detail and adds depth without much work.

## STE_PROCEDURE
1. Place an arch asset on each of the four sides of a Cube (four arches in a square).
2. Bevel the box corners slightly so they are not razor sharp.
3. Join the unit; add an Array modifier, Relative Offset Z = 1, Count for the tower height.
4. Before you use the Geometry-Nodes "Array" modifier, check viewport speed; if laggy, use the classic Array modifier.
5. Duplicate towers into the far background.
6. For far terrain, import a rock model, scale it ~100×, add a texture with minimal subdivision.
7. Rely on volume/fog to fade them.

## AGENT_EXECUTION
```python
import bpy
tower = bpy.data.objects["arch_unit"]                     # 4 arches + box, joined
arr = tower.modifiers.new("Stack", 'ARRAY')
arr.use_relative_offset = True; arr.relative_offset_displace = (0, 0, 1)
arr.count = 6                                             # ~
rock = bpy.data.objects["rock_scan"]; rock.scale = (100, 100, 100)
sub = rock.modifiers.new("Sub", 'SUBSURF'); sub.levels = sub.render_levels = 1
```
Apply modifiers on export.

raea: GLB `<Model>` for the towers; distance fade with `<Fog color="#0b0d10" near={20} far={120} />` (fog colour = background) or the `<FogVolume>` haze. Keep the far pieces' materials rough and dark so bloom doesn't catch them.

## NOTES
- Deprecated: Blender 5.0 adds a Geometry-Nodes-based "Array" modifier asset; the author found it laggier and reverted to the classic Array (`'ARRAY'`).
- Visual gaps: arch asset (author's free pack), counts and spacing are visual only (`~`).
- Rule conflicts: none.

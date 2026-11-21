---
title: Array modifier set dressing — repeat wall lights, street lights, kit pieces along a run
bucket: 03_Modeling_Modifiers
source: "Making a Car Animation in Blender!.txt"
source_time: "08:58–09:24"
blender_version_source: 3.x/4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fast density for backgrounds (shelves, shopfronts, lamp rows) behind the macro hero; exported as GLB for raea.
---

## METADATA
03_Modeling_Modifiers | 3.x/4.x → 4.2+ | Blender bpy + raea

## CREATIVE_INTENT
Long environments (a tunnel, a corridor, a row of shops) need repetition; Array modifiers on downloaded kit pieces fill them in minutes, and repeated lights give rhythm and depth lines for the camera.

## STE_PROCEDURE
1. Import the kit asset (wall, light fixture, lamp post).
2. Add an Array modifier; set Count and Relative Offset along the run axis.
3. For gaps between items, use Constant Offset (metres) instead of / with Relative Offset.
4. Stack a second Array for a second axis (rows/floors).
5. Fix the light fixtures to the wall pieces (parent) so they repeat with them.
6. Before export, apply the modifiers (or export with Apply Modifiers).

## AGENT_EXECUTION
Blender:
```python
import bpy
o = bpy.data.objects["WallLight"]
a = o.modifiers.new("ArrayX", 'ARRAY'); a.count = 12                     # ~
a.use_relative_offset = False; a.use_constant_offset = True; a.constant_offset_displace = (4.0, 0, 0)  # ~ m spacing
a.use_merge_vertices = False
bpy.ops.export_scene.gltf(filepath="//media/street_run.glb", use_selection=True, export_apply=True)
```
raea: import the applied GLB (`<Model src={staticFile("street_run.glb")} />`), or repeat in code:
```tsx
{Array.from({ length: 12 }, (_, i) => <Model key={i} src={staticFile("wall_light.glb")} position={[i * 4, 2.2, -6]} />)}
```
Emissive lamp heads + a few real `PointLight`s (max 1–2 with shadows) and `<Bloom>`.

## NOTES
- Deprecated: none.
- Visual gaps: counts/offsets not given ("multiple array modifiers").
- Rule conflicts: none; "no people in street scenes by default". Exact repeats read as CG at macro distance — vary with a second seed/scale or keep them in the DoF blur.

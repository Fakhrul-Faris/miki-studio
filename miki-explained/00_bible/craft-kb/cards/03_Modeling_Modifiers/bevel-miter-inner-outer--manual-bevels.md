---
title: Bevel miters — Outer Miter = Arc for smooth subdivided corners, Inner Miter = Sharp for clean quads
bucket: 03_Modeling_Modifiers
source: "The Trick that will Make Your 3D Models 10X Better!.txt"
source_time: "08:54–09:23, 11:20–11:58"
blender_version_source: 4.x
tool_target: Blender bpy
tier: full
style_fit: Clean corners where bevels meet matter at macro distance — a pinched corner is the first artifact a close camera shows.
---

## METADATA
03_Modeling_Modifiers | 4.x → 4.2+ | Blender bpy

## CREATIVE_INTENT
Where two bevelled edges meet at an angle, the miter decides the corner's shape and topology. The right miter keeps corners smooth under subdivision and avoids shading artifacts on the hero.

## STE_PROCEDURE
1. Know the two cases: Inner Miter applies to angles under 180°, Outer Miter to angles over 180°.
2. Default choice: Outer Miter = Arc, Inner Miter = Sharp.
3. Use Outer Miter = Arc when a Subdivision Surface modifier follows and the corner must stay smooth.
4. Use Outer Miter = Sharp when quad topology around the corner matters more (the final small pass on all edges).
5. Apply the bevel, then judge geometry and shading; switch miter types if the corner pinches.

## AGENT_EXECUTION
```python
import bpy
# operator (manual bevel)
bpy.ops.mesh.bevel(affect='EDGES', offset=0.002, segments=2, clamp_overlap=True,
                   miter_outer='ARC', miter_inner='SHARP')        # 'SHARP' | 'PATCH' | 'ARC'
# same on the Bevel modifier
bev = bpy.context.active_object.modifiers.new("Bevel", 'BEVEL')
bev.miter_outer = 'MITER_ARC'                                     # modifier enums: 'MITER_SHARP' | 'MITER_PATCH' | 'MITER_ARC'
bev.miter_inner = 'MITER_SHARP'
bev.spread = 0.1                                                   # ~ Spread is used by Arc/Patch miters (not in video)
```
raea: no equivalent (topology is fixed before GLB export).

## NOTES
- The video says the best miter is "dependent on your model": the defaults above are the author's preference.
- `spread` is not mentioned in the video (`~`).
- Visual gaps: the miter comparisons are on screen only.
- Rule conflicts: none.

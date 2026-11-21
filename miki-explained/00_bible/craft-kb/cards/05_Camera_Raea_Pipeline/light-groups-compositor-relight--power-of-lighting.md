---
title: Light Groups — re-balance each light’s exposure and colour in the compositor without re-rendering
bucket: 05_Camera_Raea_Pipeline
source: "The Power of LIGHTING in Blender!.txt"
source_time: "02:36–03:07"
blender_version_source: 3.2+
tool_target: Blender bpy | raea
tier: full
style_fit: Useful for Blender look-tests; raea renders in seconds, so re-balancing there is a re-render with new values.
---

## METADATA
05_Camera_Raea_Pipeline | 3.2+ (Cycles) | Blender view layer light groups → raea: no equivalent

## CREATIVE_INTENT
Render once, then change each light’s brightness and colour afterwards — fast iteration on balance.

## STE_PROCEDURE
1. Select a light; Object Properties › Shading › Light Group: add to a new or existing group.
2. Render in Cycles.
3. Compositor: enable Use Nodes; each light group appears as a Render Layers output.
4. Combine groups with Mix nodes (Blend = Add) — the sum equals the normal render.
5. Insert Exposure and Hue/Saturation nodes per group to relight.

## AGENT_EXECUTION
```python
import bpy
vl = bpy.context.view_layer
for g in ("key", "fill"): vl.lightgroups.add(name=g)
bpy.data.objects["Key"].lightgroup = "key"; bpy.data.objects["Fill"].lightgroup = "fill"
```
Compositor: `Render Layers [Combined_key] -> Exposure -> Mix(Add) [A]`; `Render Layers [Combined_fill] -> Hue/Saturation/Value -> Mix(Add) [B]`.
raea: no equivalent (no per-light passes documented); re-render a still with changed `intensity`/`color` — cheap.

## NOTES
- Deprecated: none; 5.x compositor uses node groups.
- Visual gaps: none.
- Rule conflicts: Blender is never the final renderer — light groups are for look decisions only.


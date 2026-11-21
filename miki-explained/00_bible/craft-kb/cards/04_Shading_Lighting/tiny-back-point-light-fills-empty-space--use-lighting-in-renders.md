---
title: A small background point light to fill empty dark space
bucket: 04_Shading_Lighting
source: "How To Use Lighting In Your Renders  Blender Tutorial.txt"
source_time: "09:57–10:41"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Lifts a dead black background patch behind the macro hero without adding a competing key; keep it barely visible.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Blender bpy → raea PointLight

## CREATIVE_INTENT
After the main light and the emissive signs, one weak point light deep in the background "balances things out" — not doing much, just filling an empty area so the frame isn’t a hole.

## STE_PROCEDURE
1. Find the empty dark area at the back of the frame.
2. Add a Point light there.
3. Set Power low — compare on/off; it should be noticeable only when toggled.
4. Don’t chase absolute values; they depend on scene scale and distance.

## AGENT_EXECUTION
```python
import bpy
bpy.ops.object.light_add(type="POINT", location=(0, 6, 1.5))   # ~ back of set
bpy.context.object.data.energy = 50                              # ~ low
```
raea: `<PointLight transform={Transform.fromXyz(0, 1.5, -6)} intensity={150000} range={6} color="#b8c4d8" />` (~ values; lumens fall off with distance², lights.md). No `shadow_maps_enabled` (saves six shadow maps).

## NOTES
- Deprecated: none.
- Visual gaps: exact power shown only.
- Rule conflicts: must not create a second hotspot that competes with the hero.


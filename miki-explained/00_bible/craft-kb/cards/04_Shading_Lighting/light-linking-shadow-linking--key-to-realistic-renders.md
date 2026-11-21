---
title: Light Linking and Shadow Linking (Blender 4.0, Cycles) — choose which objects a light lights or shadows
bucket: 04_Shading_Lighting
source: "The Key to Realistic Renders in Blender.txt"
source_time: "03:13–04:16"
blender_version_source: 4.0
tool_target: Blender bpy | raea
tier: full
style_fit: Useful at Blender build/bake stage only; raea has no documented per-light include list — plan the rig so it isn’t needed.
---

## METADATA
04_Shading_Lighting | 4.0+ (Cycles only) | Blender bpy → raea: no direct equivalent

## CREATIVE_INTENT
Link a light to chosen objects so it lights the cube but not the floor, or exclude objects from casting its shadow — a way to steer the viewer’s eye impossible on a real set.

## STE_PROCEDURE
1. Select the light; open Object Properties › Shading › Light Linking.
2. Create a new Light Linking collection (Receivers); drag in the objects it should affect.
3. Toggle the per-object check marks to include/exclude.
4. For shadows, create a Shadow Linking collection (Blockers) and exclude objects from casting.
5. Render in Cycles (EEVEE ignores linking in 4.0; EEVEE Next 4.2+ supports light linking).

## AGENT_EXECUTION
```python
import bpy
light = bpy.data.objects["Key"]
rx = bpy.data.collections.new("Key_receivers"); rx.objects.link(bpy.data.objects["Hero"])
light.light_linking.receiver_collection = rx
bx = bpy.data.collections.new("Key_blockers"); bx.objects.link(bpy.data.objects["Hero"])
light.light_linking.blocker_collection = bx
```
raea: no equivalent documented (lights affect every mesh; every mesh casts and receives). Workarounds with real props: `receiveShadow={false}` on a part (limits.md), `<Mesh3d shadow={false}>` to stop a part casting; narrow a `<SpotLight outer_angle>` so its cone misses the floor; raise floor `perceptual_roughness` so the light’s highlight doesn’t streak. `layers` on parts/lights/camera exist (limits.md) but light-to-layer exclusion is untested — verify on a still before relying on it.

## NOTES
- Deprecated: none; 4.0 feature. EEVEE Next (4.2) added light linking support.
- Visual gaps: none.
- Rule conflicts: none.


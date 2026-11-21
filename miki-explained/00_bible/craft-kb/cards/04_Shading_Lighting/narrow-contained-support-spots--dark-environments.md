---
title: Supporting spots — duplicated key at a quarter power with a narrow cone
bucket: 04_Shading_Lighting
source: "How to Make DARK Environments in Blender.txt"
source_time: "12:15–13:33, 19:36–20:14"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Lets a secondary detail read (e.g. the price tag behind the hero) while keeping the hero the brightest point; keeps the room dark.
---

## METADATA
04_Shading_Lighting | 4.x → 4.2+ / raea | Blender bpy + raea

## CREATIVE_INTENT
Small, concentrated pools of light tell the viewer "something is over there" without stealing attention from the key. The pools can be bright locally as long as they are tightly contained, so the rest of the frame stays dark.

## STE_PROCEDURE
1. Before adding a support spot, confirm the key and the shadow-lift fill are final.
2. Duplicate the key Spot Light.
3. Set the duplicate's Power to about a quarter of the key's (video: 200,000 W vs 1,000,000 W key — speaker calls it "a quarter"; numerically a fifth).
4. Reduce Spot Size until it is a narrow beam on one chosen spot.
5. Aim it through a narrow gap or past blockers so geometry trims its spill.
6. Repeat only for spots worth seeing; keep every support spot clearly dimmer than the key.

## AGENT_EXECUTION
Blender:
```python
import bpy
key = bpy.data.objects["Key"]
sup = key.copy(); sup.data = key.data.copy(); sup.name = "SupportSpot"
bpy.context.collection.objects.link(sup)
sup.data.energy = key.data.energy * 0.2      # video 200k vs 1M
sup.data.spot_size = 0.25                    # ~ rad, "turned way down"
sup.location = (2.0, -1.0, 4.0)              # ~ aim at the chosen detail
```
raea:
```tsx
<SpotLight transform={Transform.fromXyz(1.5, 3, -1).lookingAt([1.2, 0, -1.4])}
  intensity={500_000} outer_angle={0.18} inner_angle={0.09}
  shadow_maps_enabled range={8} />   {/* ~ narrow pool on a secondary detail */}
```
Spot lights cost one shadow map each (cheap); keep shadowed point lights to 1–2 (limits.md).

## NOTES
- Deprecated: none.
- Visual gaps: target spots and exact cone sizes are shown in viewport only.
- Rule conflicts: if the support pool falls on the line's subject, it is not a support light — swap roles. Accent colour stays on the subject, not the pools.

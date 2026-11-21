---
title: Terraced steps descending into water — duplicate a ring inward and down to show depth levels
bucket: 03_Modeling_Modifiers
source: "Making a SERENE render in blender.txt"
source_time: "23:15–23:38"
blender_version_source: 3.x/4.x?
tool_target: Blender bpy
tier: full
style_fit: A cheap depth cue for any surface the camera looks into (a cup, a tank, a bowl of coins): stepped levels read depth at a glance in a 2–3 s shot.
---

## METADATA
03_Modeling_Modifiers | 3.x/4.x? → 4.2+ | Blender bpy

## CREATIVE_INTENT
Under a transparent surface the eye can't judge depth; a few concentric steps going down give it rungs to count. It also makes the space inviting ("you'd want to go and sit there"). Use whenever the shot looks into a container or liquid.

## STE_PROCEDURE
1. Select the inner ring (platform edge) mesh that borders the water.
2. Duplicate it (Shift+D) and scale it inward (~0.85–0.9) about the ring's centre.
3. Move the duplicate down by one step height (~ the ring's own thickness).
4. Repeat 2–3 times so the steps descend under the water surface.
5. Check from the shot camera that each step stays visible through the water.

## AGENT_EXECUTION
```python
import bpy
src = bpy.data.objects["InnerRing"]          # the platform ring at water level
step_h, shrink = 0.25, 0.88                  # ~ not given
for i in range(1, 4):
    d = src.copy(); d.data = src.data        # linked duplicate (Alt+D); use src.data.copy() to edit separately
    d.name = f"InnerRing_step{i}"
    d.scale = [s * shrink**i for s in src.scale]
    d.location.z = src.location.z - step_h * i
    bpy.context.collection.objects.link(d)
```
Export with the scene GLB. raea renders the water plane over it (`alpha_mode="Blend"`, low `perceptual_roughness`); the steps need no special material.

## NOTES
- Deprecated: none.
- Visual gaps: number of steps, scale and depth are viewport-only.
- Rule conflicts: none. If steps appear on a word, grow/slide each in over ~0.4 s, never pop.

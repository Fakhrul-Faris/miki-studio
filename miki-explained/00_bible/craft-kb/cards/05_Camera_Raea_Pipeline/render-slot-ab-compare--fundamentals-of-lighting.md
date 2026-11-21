---
title: Render-slot A/B comparison and "throw a spanner" variants
bucket: 05_Camera_Raea_Pipeline
source: "Fundamentals of Lighting in Blender.txt"
source_time: "39:38–40:36; 42:23–42:40"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits "stills for look tests" — compare lighting on stills, keep both, and ask a fresh eye (fresh-critic) to break tunnel vision.
---

## METADATA
05_Camera_Raea_Pipeline | 4.x | Blender bpy, raea

## CREATIVE_INTENT
Lighting judgements drift; flipping between the previous and current render shows whether a change helped. Occasionally try a completely different setup to escape micro-tweaks, and show the options to someone who has not been staring at them.

## STE_PROCEDURE
1. Render the current lighting into a render slot.
2. Switch to the next empty slot.
3. Make one lighting change and render again.
4. Flip between the two slots and keep the better one.
5. Sometimes build a radically different setup and compare it too.
6. Show the options to a fresh viewer before deciding.

## AGENT_EXECUTION
Blender:
```python
import bpy
img = bpy.data.images["Render Result"]
img.render_slots.active_index = 3          # slot 4 (0-based)
bpy.ops.render.render()                    # F12 into this slot
# save each for side-by-side
img.save_render(filepath="//light_try_04.png")
```
raea: one still per variant — `raea render EDIT.tsx --frame N -o light_vA.png`, `... -o light_vB.png` — then a side-by-side (`ffmpeg -i A -i B -filter_complex hstack ab.png`). The "fresh viewer" is the house `fresh-critic` skill.

## NOTES
- Deprecated: none.
- Rule conflicts: none.

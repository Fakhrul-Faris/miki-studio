---
title: Polish pass — nudge the key so adjacent faces get different values
bucket: 04_Shading_Lighting
source: "Fundamentals of Lighting in Blender.txt"
source_time: "32:49–35:38"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits — macro objects read through value steps between top/front/side; small key moves fix "faces blending" without adding lights.
---

## METADATA
04_Shading_Lighting | 4.x | Blender bpy, raea

## CREATIVE_INTENT
Once the basic look works there is almost always a slightly better light position. If two faces (top and side, or a panel and the face above it) have the same luminance, the shape blurs; move the key a little so each face gets its own value, but not so far that the front loses its detail.

## STE_PROCEDURE
1. Before you adjust a lamp, hide every other lamp.
2. Find two adjacent faces with similar brightness.
3. Move the key a small step to darken one face relative to the other.
4. If the front detail disappears, move back part of the way.
5. Check smaller shapes; nudge along X if they blend with the shape above.
6. Keep a little light on each face you want readable.
7. Show all lamps and compare with the previous render.

## AGENT_EXECUTION
Blender:
```python
import bpy
for o in bpy.data.objects:
    if o.type == 'LIGHT': o.hide_render = (o.name != "Key")   # isolate
bpy.data.objects["Key"].location.x -= 0.15                      # ~ "a little"; offsets not stated
```
raea: move the light's `Transform.fromXyz(...)`; render one still per try (`raea render EDIT.tsx --frame N -o try_N.png`) and compare. To isolate, comment out the other light elements.

## NOTES
- Deprecated: none.
- Visual gaps: 33:15–35:20 offsets are "a little like this" only — not recoverable from speech.
- Rule conflicts: none. A light move during the shot must be an eased in-out curve.

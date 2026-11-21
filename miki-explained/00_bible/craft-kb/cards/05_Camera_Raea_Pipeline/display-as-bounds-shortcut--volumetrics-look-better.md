---
title: Show the fog cube as Bounds (with a custom D shortcut) to keep the viewport clear and fast
bucket: 05_Camera_Raea_Pipeline
source: "How I Make Any Environment Instantly Look Better With Volumetrics - Blender Tutorial.txt"
source_time: "02:43–03:52"
blender_version_source: 3.x?
tool_target: Blender bpy
tier: full
style_fit: Build-stage convenience for any volume/helper object in our .blend scenes.
---

## METADATA
05_Camera_Raea_Pipeline | any | Blender bpy (viewport display)

## CREATIVE_INTENT
A fog cube hides the scene while you work. Displaying it as its bounding box gets it out of the way instantly.

## STE_PROCEDURE
1. Select the volume cube.
2. Object Properties › Viewport Display › Display As = Bounds.
3. Optional: right-click the Display As field › Assign Shortcut (author uses D) for a quick pop-up.

## AGENT_EXECUTION
```python
import bpy
bpy.data.objects["Fog"].display_type = "BOUNDS"   # back: "TEXTURED"
```
raea: n/a (no viewport); a FogVolume is drawn only as fog.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none.


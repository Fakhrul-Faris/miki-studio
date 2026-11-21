---
title: Cinematic aspect: letterbox blinders vs anamorphic pixel-aspect squeeze (unsqueeze in comp)
bucket: 05_Camera_Raea_Pipeline
source: "CG Cinematography 101 | Chapter 2 | Basic Camera Breakdown.txt"
source_time: "03:43–04:21"
blender_version_source: n/a (Houdini)
tool_target: principle-only | Blender bpy
tier: principle
style_fit: Low fit — our delivery is full-frame 9:16; recorded so agents don't add letterboxing by habit.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Houdini) → Blender 4.2+ | principle

## CREATIVE_INTENT
Principle: after placing the first camera, set a cinematic aspect. Either show blinders (top/bottom bars) to frame for a wide ratio, or set pixel aspect ~1.33 so the image renders squeezed at the same HD resolution and is unsqueezed in compositing (Nuke), as with anamorphic lenses.
Ideas: for us, the only useful part is composing inside a guide; we never deliver letterboxed or squeezed.

## STE_PROCEDURE
Method:
1. Set the camera's aspect / blinder guide to the target ratio to compose inside it.
2. For anamorphic: set pixel aspect ~1.33; render at the same resolution (squeezed).
3. Unsqueeze in the compositor by scaling width ×1.33.

## AGENT_EXECUTION
### Source tool (Houdini)
Camera > View: Pixel Aspect Ratio 1.33 (the resolution stays HD); blinders via the camera's aspect/crop mask display.
### Blender / raea translation
```python
import bpy
r = bpy.context.scene.render
r.pixel_aspect_x, r.pixel_aspect_y = 1.33, 1.0      # squeeze (rarely wanted)
# composing guide only: camera passepartout + safe areas
bpy.context.scene.camera.data.show_safe_areas = True
```
raea: no equivalent (no pixel-aspect squeeze). Anamorphic look elements live elsewhere (bokeh shape, `aberration` in `<Grade>`). For a guide, overlay page divs in review renders only.

## NOTES
- Deprecated: none.
- Visual gaps: settings panel shown on screen.
- Rule conflicts: no letterbox bars in 9:16 finals (wasted vertical frame, captions need the space). Record only.

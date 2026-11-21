---
title: Start pitch black, add one light at a time
bucket: 04_Shading_Lighting
source: "How to get good lighting in blender.srt"
source_time: "00:00:30–00:01:58; 00:20:56–00:21:43"
blender_version_source: 3.x (inferred; any 2.8+)
tool_target: Blender bpy | raea
tier: full
style_fit: Matches Style D's single-top-light discipline — every light after the first must fix a named problem.
---

## METADATA
04_Shading_Lighting | 3.x (inferred) | Blender bpy, raea

## CREATIVE_INTENT
A uniform grey world lights from every direction, so there are no shadows and the image is boring. Before any lighting setup, turn everything off; then add one light, get it right, and add the next only to solve a problem the first could not. Several lights tuned at once interfere and become unmanageable.

## STE_PROCEDURE
1. Unplug the World Background (or set its Strength to 0).
2. Turn off every lamp in the scene, including dim practicals.
3. Confirm the rendered view is pitch black.
4. Add one light and position it until it works.
5. Name the problem the first light leaves (dark shadows, empty sky).
6. Only then add a second light that solves that problem.
7. Repeat; stop when no named problem remains.
8. Before building a setup, gather photo or film references of the target mood.

## AGENT_EXECUTION
Blender:
```python
import bpy
w = bpy.context.scene.world.node_tree
for l in list(w.nodes["World Output"].inputs["Surface"].links): w.links.remove(l)  # unplug background
for o in bpy.data.objects:
    if o.type == 'LIGHT': o.hide_render = True; o.hide_viewport = True
```
raea: start the scene with no `<AmbientLight>`, no `<Environment>`, no lights (renders black — `lights.md`), then add one element at a time, rendering a still after each (`raea render EDIT.tsx --frame N -o step_k.png`).

## NOTES
- Deprecated: none.
- Rule conflicts: none.

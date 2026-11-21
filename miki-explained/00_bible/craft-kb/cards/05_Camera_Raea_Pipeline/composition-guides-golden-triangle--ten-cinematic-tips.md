---
title: Camera composition guides (thirds, golden ratio, golden triangle, diagonals)
bucket: 05_Camera_Raea_Pipeline
source: "10 Tips to make Your 3D Render more Cinematic.txt"
source_time: "09:44–11:32"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Fits Style D — turn guides on for every check .blend camera; the golden triangle suits tilted/diagonal macro setups.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x | Blender bpy

## CREATIVE_INTENT
Rule of thirds / golden ratio place important things on line intersections; centre lines suit graphic, one-point-perspective shots; the golden triangle adds diagonals that pair with a tilted camera. Use them as a check, not dogma — the source drifts things slightly toward the edges by taste.

## STE_PROCEDURE
1. Open Camera properties > Viewport Display > Composition Guides.
2. Enable the guide that fits the shot (Centre for symmetric/graphic, Thirds or Golden for general, Golden Triangle A/B for diagonal compositions).
3. Move the camera until the focus and secondary element sit on the chosen intersections/regions.
4. If the guides and your eye disagree, follow your eye.

## AGENT_EXECUTION
- Blender:
  ```python
  d = bpy.data.objects["Camera"].data
  d.show_composition_thirds = True
  d.show_composition_golden = False
  d.show_composition_golden_tria_a = True   # or _tria_b
  d.show_composition_center = False; d.show_composition_center_diagonal = False
  d.show_composition_harmony_tri_a = False
  d.passepartout_alpha = 0.9                # dim outside the frame
  ```
- raea: no equivalent (guides are a viewport aid). Check a raea still with an overlay drawn in a test-only page element (thin absolute-positioned divs at 1/3 and 2/3) removed before final.

## NOTES
- Visual gap: which two regions the source targets on the golden triangle is shown on screen only.
- Rule conflicts: none.

---
title: Model at real-world scale so lights and depth of field behave (scale about the base with a 3D-cursor pivot)
bucket: 05_Camera_Raea_Pipeline
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "36:20–38:52, 43:59–45:26, 2:07:54–2:09:08"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Essential for Style D macro shots — real-scale objects give natural shallow DoF at believable f-stops and correct light falloff.
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.3 | Blender bpy + raea

## CREATIVE_INTENT
A 1.92 m tall "can" needs absurd light power and an f/0.8 lens to look like a product shot. Scaled to its true 15 cm, a 10 W
area light works and f/2.8 gives real macro bokeh. (Exception: fluid sims need the scene scaled up — see the Mantaflow card.)

## STE_PROCEDURE
1. Open the N panel › Item › Dimensions to read the current size (here Z 1.92 m).
2. Measure a real reference (author: phone ~16 cm) and choose the true height (can: 15 cm).
3. In Edit Mode select a bottom edge loop (`Alt+click`); Snap › Cursor to Selected (`Shift+S`).
4. Set Pivot Point to 3D Cursor; in Object Mode scale (`S`) until Dimensions Z reads 0.15 m.
5. Apply scale (`Ctrl+A` › Scale) and move the object so its base sits on the grid floor.
6. Set Pivot Point back to Median Point.
7. Check: the area light at ~10 W should now light the can; with scale wrong, bokeh needs f/0.8-ish and looks unnatural.

## AGENT_EXECUTION
- Blender:
```python
ob = bpy.context.object
s = 0.15 / ob.dimensions.z
bpy.context.scene.cursor.location = (ob.location.x, ob.location.y, min((ob.matrix_world @ v.co).z for v in ob.data.vertices))
bpy.context.scene.tool_settings.transform_pivot_point = 'CURSOR'
bpy.ops.transform.resize(value=(s, s, s))
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
bpy.context.scene.tool_settings.transform_pivot_point = 'MEDIAN_POINT'
```
  glTF is metres; export with `export_yup=True` so raea (Y up) gets the same 0.15 m.
- raea: keep scene units in metres: camera a few tens of cm away, `<DepthOfField focal_distance={0.35} aperture_f_stops={2.8} />`
  inside `<Camera3d>`, light `intensity` scaled for short distances (falls off with distance squared, lights.md), and
  `<Shadows distance={2} firstCascade={0.5} />` so sun shadows are sharp at macro scale.

## NOTES
- Deprecated: none.
- Visual gaps: none (0.276 → 0.15 scale shown in the N panel).
- Rule conflicts: none.

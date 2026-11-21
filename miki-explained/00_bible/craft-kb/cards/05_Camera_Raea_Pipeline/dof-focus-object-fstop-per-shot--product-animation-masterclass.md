---
title: Depth of field — focus on the hero object; f/2.8 to isolate, f/13 when a reveal needs the background readable
bucket: 05_Camera_Raea_Pipeline
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "43:59–45:26, 2:41:02–2:41:36"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Style D shallow DoF on the subject; stop down only when several objects must read (a "multiply" beat).
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.3 | Blender bpy + raea

## CREATIVE_INTENT
Shallow focus makes a single product cinematic; but in a reveal where objects appear behind the hero, too much blur hides the
payoff — the author stops down until the background reads, then backs off ("f/41 too much … f/8 … f/13").

## STE_PROCEDURE
1. Camera › Depth of Field › enable; Focus Object = the hero can.
2. For a hero beat at real scale, use F-Stop 2.8 (wide aperture → strong bokeh).
3. For a reveal/group beat, raise F-Stop until the background objects are readable but softer than the hero (author ends at 13).
4. Make sure the correct object is the focus target after duplicating/swapping cans.

## AGENT_EXECUTION
- Blender:
```python
cam = bpy.data.objects["Camera"].data
cam.dof.use_dof = True; cam.dof.focus_object = bpy.data.objects["Can_Hero"]
cam.dof.aperture_fstop = 2.8      # hero; 13 for the reveal shot
```
- raea: `<Camera3d transform={...} projection={{ Perspective: { fov } }}><DepthOfField focal_distance={dist} aperture_f_stops={2.8} /></Camera3d>`;
  there is no focus object — compute `dist` per frame as the camera-to-hero distance
  (`Math.hypot(cx-hx, cy-hy, cz-hz)`) so focus tracks during camera flights (focal_distance animates per frame, post.md).

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none; Style D defaults to shallow focus, so reserve deep focus for beats where the count/row is the message.

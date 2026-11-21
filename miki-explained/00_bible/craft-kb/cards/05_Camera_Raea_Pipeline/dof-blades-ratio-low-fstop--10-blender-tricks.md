---
title: Shallow DoF preset — 8 blades, ratio 2, very low f-stop on the subject
bucket: 05_Camera_Raea_Pipeline
source: "10+ Blender Tricks That Will Make Your Renders Cinematic.txt"
source_time: "01:11–01:26"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: principle
style_fit: fits Style D's shallow DoF; raea has no blade count or anamorphic ratio
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x (4.2+ same) | Camera Depth of Field → raea DepthOfField

## CREATIVE_INTENT
Principle: a shallow depth of field isolates the subject and gives the "shot on a real lens" feel. Idea: focus on the
selected object, use an 8-blade aperture (octagonal bokeh) stretched with ratio 2 (an anamorphic oval), and push the
f-stop very low.

## STE_PROCEDURE
1. In camera Object Data Properties, enable Depth of Field.
2. Set Focus Object to the subject (the video says "select your object").
3. Under Aperture, set Blades to 8.
4. Set Ratio to 2.
5. Set F-Stop between 0.1 and 0.8 and judge the blur by eye.
- Before you copy the f-stop, check scene scale: Blender's blur depends on real units, so 0.1–0.8 is only right for a
  scene built at the video's (unknown) scale.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy
scn = bpy.context.scene; cam = scn.camera.data
dof = cam.dof
dof.use_dof = True
dof.focus_object = bpy.data.objects["Hero"]   # the subject
dof.aperture_blades = 8
dof.aperture_ratio = 2.0      # >1 = anamorphic oval bokeh
dof.aperture_fstop = 0.5      # video range 0.1–0.8
```

### raea
```tsx
<Camera3d transform={camT} projection={{ Perspective: { fov } }}>
  <DepthOfField focal_distance={distToHero} aperture_f_stops={2} mode="bokeh" />
</Camera3d>
```
- `focal_distance` = camera-to-subject distance in metres (compute from the transforms each frame; animatable).
- `aperture_f_stops`: skill guide 1.4 dreamy, 2.8 cinematic, 8 nearly sharp. Blender f-stops 0.1–0.8 do not transfer
  numerically — match the look on a still. The kit's `pro.tsx` wraps this (`focus`, `aperture`).
- Blades and Ratio: raea: no equivalent (Bevy's DoF has no aperture-shape or anamorphic-ratio parameter).

## NOTES
- Deprecated: none (`dof.aperture_*` unchanged since 2.8).
- Visual gaps: the scene scale behind 0.1–0.8 is unknown; the resulting blur is visual only.
- Rule conflicts: none. Any focus pull is eased in-out, starting on the spoken word.

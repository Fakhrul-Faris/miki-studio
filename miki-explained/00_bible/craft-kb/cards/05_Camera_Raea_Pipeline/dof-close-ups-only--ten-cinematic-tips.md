---
title: Reserve depth of field for close-ups, not wide shots
bucket: 05_Camera_Raea_Pipeline
source: "10 Tips to make Your 3D Render more Cinematic.txt"
source_time: "26:14–26:34"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D — macro hero shots are close-ups, so shallow DoF is house; keep wides (establishing) sharper.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x | Blender bpy + raea

## CREATIVE_INTENT
Depth of field reads naturally on close-ups; on wide establishing shots it shrinks the world and muddles the read, so the source leaves it off there.

## STE_PROCEDURE
1. Decide if the shot is a close-up or a wide.
2. For a close-up, enable Depth of Field on the camera and set Focus Distance to the subject.
3. For a wide, leave Depth of Field off (or use a high f-stop).

## AGENT_EXECUTION
- Blender: `cam.data.dof.use_dof = True; cam.data.dof.focus_object = hero; cam.data.dof.aperture_fstop = 2.8`.
- raea: inside the camera: `<Camera3d ...><DepthOfField focal_distance={dist} aperture_f_stops={2.8} /></Camera3d>`; wides: `aperture_f_stops={8}` or omit. `focal_distance` animates per frame (pull focus).

## NOTES
- Rule conflicts: none.

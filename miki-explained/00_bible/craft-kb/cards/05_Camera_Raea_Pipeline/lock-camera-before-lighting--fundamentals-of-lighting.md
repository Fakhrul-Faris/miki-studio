---
title: Lock the camera before lighting (lighting is view-dependent)
bucket: 05_Camera_Raea_Pipeline
source: "Fundamentals of Lighting in Blender.txt"
source_time: "05:07–06:49"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits shot-first gates — light each camera setup after the camera map is fixed; Style D's new setup every 2–3 s means a light check per setup.
---

## METADATA
05_Camera_Raea_Pipeline | 4.x | Blender bpy, raea

## CREATIVE_INTENT
Lighting only works for one view: a three-quarter setup can turn into flat flash-photo light when the camera swings round. Fix the camera first, then light for it. Lock Camera to View lets you frame the camera with normal viewport navigation.

## STE_PROCEDURE
1. Add a Camera (Shift+A > Camera).
2. Look through it (Numpad 0).
3. Open the Sidebar (N) > View tab and enable Lock Camera to View.
4. Frame the shot with orbit, pan and zoom.
5. Disable Lock Camera to View when the framing is set.
6. Only then start placing lights.
7. If the camera later moves to a new setup, recheck the lighting from that view.

## AGENT_EXECUTION
Blender:
```python
import bpy
bpy.ops.object.camera_add(location=(4, -4, 2.2)); cam = bpy.context.object
bpy.context.scene.camera = cam
for a in bpy.context.screen.areas:
    if a.type == 'VIEW_3D':
        sp = a.spaces.active
        sp.region_3d.view_perspective = 'CAMERA'   # Numpad 0
        sp.lock_camera = True                      # Lock Camera to View
        # ...frame... then:
        sp.lock_camera = False
```
raea: the camera is per-frame data; light each setup against its `<Camera3d transform=... />` and check stills at each setup's frames (`raea render EDIT.tsx --frame N`). Lights can be keyed per setup from the frame (eased crossfade of `intensity`, not a pop).

## NOTES
- Deprecated: none.
- Rule conflicts: none. In a camera flight between setups, lights that suit both ends should be chosen, or crossfaded over ≥ 0.4 s.

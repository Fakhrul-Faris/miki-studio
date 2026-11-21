---
title: Camera "external monitor" workspace (camera view split, viewport DoF, passepartout 1, limits + name)
bucket: 05_Camera_Raea_Pipeline
source: "Making blenders camera actually good.txt"
source_time: "01:45–03:55"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Supports the check .blend / camera-map stage (RECIPE-D § 8.1): the user and I judge each setup through a clean camera monitor before raea renders.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x → 4.2+ | Blender bpy

## CREATIVE_INTENT
A camera operator always has a monitor. Splitting the screen into a working view and a locked camera view with depth of field on lets you frame each 2–3 s setup by what the audience will actually see, not by the orbit view.

## STE_PROCEDURE
1. Split the 3D Viewport vertically (Area > Vertical Split) to make a second window.
2. In the new window, set the view to Camera (Numpad 0), then View All / fit camera (Home).
3. In that window's Viewport Shading, enable Depth of Field so focus shows even in Solid mode.
4. If hardware allows, set that window to Rendered shading and enable viewport denoising.
5. In Camera properties > Camera Presets, leave the default sensor unless matching real footage (then pick the real body, e.g. ARRI / IMAX).
6. In Camera properties > Viewport Display, enable Limits (shows Clip Start/End and the focus-distance cross).
7. Enable Name in Viewport Display so the monitor shows which camera is live.
8. Set Passepartout to 1.0 so nothing outside the frame distracts.
9. Hide the toolbar (T) and the navigation gizmos in the monitor window.

## AGENT_EXECUTION
Blender (check .blend only — raea renders the final):
```python
import bpy
cam = bpy.context.scene.camera
cam.data.show_limits = True
cam.data.show_name = True
cam.data.passepartout_alpha = 1.0
cam.data.show_passepartout = True
# monitor window (only when running with a UI; skipped in -b):
for area in bpy.context.screen.areas:
    if area.type == 'VIEW_3D':
        sp = area.spaces.active
        sp.shading.use_dof = True          # "Depth of Field" in Viewport Shading (Solid/Material)
        sp.region_3d.view_perspective = 'CAMERA'
        sp.show_region_toolbar = False
        sp.show_gizmo_navigate = False
        break
```
raea: no equivalent needed (raea has no viewport). The monitor equivalent is `tools/raea/preview.sh EDIT.tsx f1,f2,… sheet.jpg` — a contact sheet at 540 px of the frames that matter, with `<DepthOfField>` on the camera so focus reads as it will in the final.

## NOTES
- Deprecated: none. `shading.use_dof` exists for Solid/Material Preview in 2.8+.
- Visual gaps: the exact button for the vertical split and the gizmo toggle are shown, not named; the named menu items above are the standard ones.
- Rule conflicts: none. Camera presets matter only when matching footage; our 9:16 renders set sensor/fov in raea (`projection={{ Perspective: { fov } }}`) — fov does not transfer automatically from a Blender sensor + focal length; convert: `fov = 2*atan(sensor_height/(2*focal))` for the 9:16 vertical axis.

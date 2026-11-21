---
title: Camera monitor viewport / workspace
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/camera-monitor-workspace--blender-camera-rig.md
  - cards/05_Camera_Raea_Pipeline/dual-viewport-camera-preview--nice-camera-angles.md
sources: ["Making blenders camera actually good.txt", "How to Find Nice Camera Angles in Blender.txt"]
use_when: "seeing the shot framing while editing"
style_fit: Supports the check .blend / camera-map stage (RECIPE-D § 8.1) — every setup judged through the lens before raea renders. No rule conflicts; Blender's monitor is for the check .blend only, raea renders the final.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x / 4.x sources → 4.2+/5.x | Blender bpy (+ raea still-render equivalent)

## CREATIVE_INTENT
A camera operator always has a monitor: work in a fast free viewport while a second, locked camera view shows exactly what the
audience will see, so every prop/light move is judged in the final frame, not in a free view that lies about composition.
- Blender Camera Rig: the monitor's dressing — viewport DoF on, Limits + Name shown, Passepartout 1.0, toolbar/gizmos hidden.
- Nice Camera Angles: the monitor in Rendered shading with a Ctrl+B render region cropped to the frame; working view stays Solid.

## STE_PROCEDURE
1. Split the 3D Viewport vertically (Area > Vertical Split, or drag an editor edge and set it to 3D Viewport).
2. Keep the working viewport in Solid (or Wireframe) shading for speed.
3. In the new window, set View > Cameras > Active Camera (Numpad 0), then fit the camera (Home).
4. In the monitor's Viewport Shading, enable Depth of Field so focus shows even in Solid.
5. If hardware allows, set the monitor to Rendered shading and enable viewport denoising.
6. In the camera view press Ctrl+B and drag over the camera frame to set a Render Region (clear with Ctrl+Alt+B).
7. In Camera > Viewport Display, enable Limits (Clip Start/End + focus-distance cross) and Name (which camera is live).
8. Set Passepartout to 1.0 so nothing outside the frame distracts.
9. Hide the toolbar (T) and the navigation gizmos in the monitor.
10. Leave Camera Presets on the default sensor unless matching real footage (then pick the real body, e.g. ARRI / IMAX).
11. Keep the monitor open beside the working view while moving objects and lights.

## VALUES BY SOURCE
| parameter | Blender Camera Rig | Nice Camera Angles | recommended for Style D (+ why) |
|---|---|---|---|
| monitor shading | Solid + viewport DoF (Rendered if hardware allows) | Rendered | Material Preview/Rendered EEVEE + DoF in the check .blend; final judgement on a raea still |
| frame crop | Passepartout 1.0 | Ctrl+B render region | Passepartout 1.0 (no border to forget before renders) |
| overlays | Limits + Name on; toolbar/gizmos off | — | Limits + Name on |
| sensor | default unless matching footage | — | default; raea uses vertical fov (convert, below) |

## AGENT_EXECUTION
Blender 5.x (check .blend only; UI parts skipped under `-b`):
```python
import bpy
sc = bpy.context.scene; cam = sc.camera
cam.data.show_limits = True
cam.data.show_name = True
cam.data.show_passepartout = True
cam.data.passepartout_alpha = 1.0
v3d = [a for a in bpy.context.screen.areas if a.type == 'VIEW_3D']
if v3d:
    with bpy.context.temp_override(area=v3d[0]):
        bpy.ops.screen.area_split(direction='VERTICAL', factor=0.5)
    v3d = [a for a in bpy.context.screen.areas if a.type == 'VIEW_3D']
    work, mon = v3d[0], v3d[1]
    work.spaces.active.shading.type = 'SOLID'
    sp = mon.spaces.active
    sp.shading.type = 'RENDERED'
    sp.shading.use_dof = True                  # Viewport Shading > Depth of Field (Solid/Material)
    sp.region_3d.view_perspective = 'CAMERA'   # Numpad 0
    sp.show_region_toolbar = False
    sp.show_gizmo_navigate = False
# optional render region (Ctrl+B); clear before Blender renders
sc.render.use_border = True
sc.render.border_min_x, sc.render.border_max_x = 0.0, 1.0
sc.render.border_min_y, sc.render.border_max_y = 0.0, 1.0
```
raea: no viewport (no equivalent needed). The monitor is a still render: `raea render EDIT.tsx --frame N -o check.png`,
or a contact sheet `tools/raea/preview.sh EDIT.tsx f1,f2,… sheet.jpg` (540 px), with `<DepthOfField>` on the camera so focus
reads as in the final. Sensor → raea: `fov = 2*atan(sensor_height/(2*focal))` on the 9:16 vertical axis (`blend2raea.py` does this per frame).

## NOTES
- Deprecated: none (`shading.use_dof` exists for Solid/Material Preview in 2.8+).
- Ctrl+B in camera view sets `render.use_border`; in a non-camera viewport it sets a viewport clipping/render region instead.
- Visual gaps: the exact split button and gizmo toggle are shown, not named; standard menu items used.
- Rule conflicts: none; preview-before-render and stills-for-look-tests rules still apply.

---
title: Adjust set dressing to the composition (fill empty spots, align props to guides)
bucket: 05_Camera_Raea_Pipeline
source: "10 Tips to make Your 3D Render more Cinematic.txt"
source_time: "27:11–27:39"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Fits Style D's set-dressing rule — small props on the real surface, angled to the guide lines, never stealing the accent.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x | Blender bpy

## CREATIVE_INTENT
The environment is not fixed: once camera and light are set, add or move small props (planks, cans) to fill empty patches and tilt them so their lines follow the chosen composition guide, reinforcing where the eye should travel.

## STE_PROCEDURE
1. View through the final camera with composition guides on.
2. Identify empty or dead areas of the frame.
3. Add small low-importance props there (the source: planks, cans).
4. Rotate the props so their long edges align with a guide diagonal.
5. Keep props dim and neutral so they stay lower in the hierarchy than the focus.

## AGENT_EXECUTION
- Blender:
  ```python
  import bpy, math
  p = bpy.data.objects["Plank"].copy(); bpy.context.collection.objects.link(p)
  p.location = (1.2, 0.4, 0); p.rotation_euler.z = math.radians(32)   # ~ inferred: match guide diagonal
  ```
  Check through camera: `bpy.ops.view3d.view_camera()`.
- raea: props arrive in the GLB via BlendShot; or place a library model: `<Model src={staticFile("can.glb")} position={[x,y,z]} scale={s} />`.

## NOTES
- Rule conflicts: no people as dressing in street scenes by default.
- bpy fixed for 5.3: incomplete snippet: added `import bpy, math`.

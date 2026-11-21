---
title: Prioritise lighting and camera angle over modelling detail; train the eye with photography
bucket: 05_Camera_Raea_Pipeline
source: "How To Create Beautiful Environments In Blender.txt"
source_time: "02:29–05:18"
blender_version_source: n/a (general advice)
tool_target: principle-only
tier: principle
style_fit: Matches our camera bar and anti-slop rules: a well-lit, well-framed simple object beats a detailed one shot badly.
---

## METADATA
05_Camera_Raea_Pipeline | n/a | principle-only

## CREATIVE_INTENT
Principle: modelling, UVs, geometry nodes and sculpting are worthless if the frame doesn't capture them pleasingly. Good light and camera can carry technically weak assets; never the reverse. Photography is the same skill, so study how photographers choose angles and settings.
Ideas: spend build time on the camera setup and key light of each 2–3 s setup first; when a shot fails review, fix light/angle before adding geometry.

## STE_PROCEDURE
1. Before modelling detail, set the camera angle and key light for each setup on blockout geometry.
2. Judge the frame in rendered view; change angle or light until it pleases with placeholder geometry.
3. Spend detail time only on what the camera actually sees.
4. Practise angles with a real (phone) camera; collect photographs whose angle and lens you want to copy.
5. Record each reference photo's focal length, camera height and light direction in the shot's ref file.

## AGENT_EXECUTION
### Blender
Order of work in the build script: camera + key light → preview still → detail pass only on objects inside the frustum.
```python
import bpy
from bpy_extras.object_utils import world_to_camera_view
scn = bpy.context.scene; cam = scn.camera
def in_frame(o):
    v = world_to_camera_view(scn, cam, o.matrix_world.translation)
    return 0 <= v.x <= 1 and 0 <= v.y <= 1 and v.z > 0
print("detail only these:", [o.name for o in scn.objects if o.type == 'MESH' and in_frame(o)])
```
### raea translation
Lock `<Camera3d transform projection>` and the key light on grey stand-ins first; render stills (`raea render EDIT.tsx --frame N -o F.png`) before any material or detail work.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none. Consistent with the shot-first gates (grey-box board before world).

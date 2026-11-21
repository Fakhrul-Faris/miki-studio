---
title: Three clear depth layers: foreground, midground, background
bucket: 05_Camera_Raea_Pipeline
source: "How to Add DEPTH to Your Renders.txt"
source_time: "02:48–06:03"
blender_version_source: 3.x?
tool_target: Blender bpy | raea | principle-only
tier: full
style_fit: Gives macro setups depth: a blurred near object, the sharp hero, and a faded room behind.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x → 4.2+ | Blender bpy + raea

## CREATIVE_INTENT
Landscape photographs read deep because they always have a foreground close to the lens, a midground and a background. The bands don't need hard cut-offs; they only need to exist. Deliberately putting objects very close to the camera, something in the middle and something far away maximises the range of depth in the image.

## STE_PROCEDURE
1. Decide which band holds the focal point (usually midground).
2. Place at least one object very close to the camera at a frame edge (often silhouetted / dark).
3. Place at least one element far behind the subject (wall, shelf, sky) that fades in haze.
4. Check the camera view: each band must be readable as its own layer.
5. Separate bands further with light (see the light-pool card) and haze (volume card).

## AGENT_EXECUTION
Blender layout check (camera-space depth per object):
```python
import bpy
scn = bpy.context.scene; cam = scn.camera
inv = cam.matrix_world.inverted()
for o in scn.objects:
    if o.type == 'MESH':
        d = -(inv @ o.matrix_world.translation).z
        band = "FG" if d < 0.5 else "MG" if d < 3 else "BG"     # ~ macro-scale thresholds in metres
        print(f"{o.name:24s} {d:6.2f} {band}")
```
raea:
```tsx
<Camera3d transform={Transform.fromXyz(...cam).lookingAt(hero)} projection={{ Perspective: { fov: (30 * Math.PI) / 180 } }}>
  <DepthOfField focal_distance={distToHero} aperture_f_stops={2.2} />
</Camera3d>
<Fog color="#0b0b0d" near={2.5} far={9} />          {/* background dissolves into the room colour */}
```

## NOTES
- Deprecated: none.
- Visual gaps: the band boundaries are circled on screen over example images.
- Rule conflicts: none. A foreground object that slides across frame must ease in/out (no whip).

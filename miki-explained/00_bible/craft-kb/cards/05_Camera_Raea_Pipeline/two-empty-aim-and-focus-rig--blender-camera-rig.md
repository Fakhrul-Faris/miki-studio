---
title: Two-empty camera rig — Focal Target (aim) + Focal Point (focus), saved as a reusable collection
bucket: 05_Camera_Raea_Pipeline
source: "Making blenders camera actually good.txt"
source_time: "03:55–05:35"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Core Style D tool: rack focus and "look at the thing the line is about" become two points you animate; exports cleanly to raea as camera position + look-at + focal distance per frame.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x → 4.2+ | Blender bpy + raea

## CREATIVE_INTENT
Separate WHERE the camera looks from WHAT is sharp. One empty aims the camera, a second sets focus, and focus rides along when the aim moves — so a camera flight keeps the hero object framed and sharp, and a rack focus is one empty sliding.

## STE_PROCEDURE
1. Add two Empties of different display types (to tell them apart).
2. Rename one `FT` (Focal Target, aim) and one `FP` (Focal Point, focus).
3. Select the camera; in Camera data > Depth of Field, enable it and set Focus on Object = `FP`.
4. Add a Copy Location constraint to `FP`; set Target = `FT`; enable Offset.
5. Add a Damped Track constraint to the camera; set Target = `FT`, Track Axis = -Z.
6. Move `FT` to aim; move `FP` (it keeps its offset from `FT`) to set focus.
7. Before saving, remember DoF depends on focal length, sensor size and above all the F-Stop.
8. Move the camera and both empties into one collection; save the file in a personal library folder.
9. In later projects, File > Append that collection.

## AGENT_EXECUTION
Blender:
```python
import bpy
scn = bpy.context.scene
cam = scn.camera
def empty(name, kind):
    e = bpy.data.objects.new(name, None); e.empty_display_type = kind
    scn.collection.objects.link(e); return e
ft = empty("FT", 'SPHERE'); fp = empty("FP", 'PLAIN_AXES')
cam.data.dof.use_dof = True
cam.data.dof.focus_object = fp
cam.data.dof.aperture_fstop = 2.8            # ~ not given in video
c = fp.constraints.new('COPY_LOCATION'); c.target = ft; c.use_offset = True
t = cam.constraints.new('DAMPED_TRACK'); t.target = ft; t.track_axis = 'TRACK_NEGATIVE_Z'
rig = bpy.data.collections.new("CameraRig"); scn.collection.children.link(rig)
for o in (cam, ft, fp):
    for col in o.users_collection: col.objects.unlink(o)
    rig.objects.link(o)
# reuse: bpy.ops.wm.append(directory="/path/lib.blend/Collection/", filename="CameraRig")
```
raea (render time): the rig collapses to three per-frame values — camera position, the look-at point (`FT`) and the focus distance (|cam − FP|):
```tsx
const p: V3 = camAt(f), aim: V3 = ftAt(f), fp: V3 = fpAt(f);   // from the bake (blend2raea) or interpolate()
const focus = Math.hypot(fp[0]-p[0], fp[1]-p[1], fp[2]-p[2]);
<Camera3d transform={Transform.fromXyz(...p).lookingAt(aim)} projection={{ Perspective: { fov: (35 * Math.PI) / 180 } }}>
  <DepthOfField focal_distance={focus} aperture_f_stops={2.8} mode="bokeh" />
</Camera3d>
```
`kit/BlendShot.tsx` already plays `{p, t, fov}` per frame from `tools/raea/blend2raea.py`; add the focus distance to the export if the shot racks focus. `kit/pro.tsx` `ProStage` takes `cam: {p, t, fov}` + `focus` + `aperture` directly.

## NOTES
- Deprecated: none (Damped Track, Copy Location offset and `dof.focus_object` are stable 2.8 → 5.x).
- Visual gaps: none — fully narrated.
- Rule conflicts: none. Animate `FT`/`FP` with eased in-out keys (Bezier, Auto Clamped), never linear starts/stops; a rack focus is `FP` moving over ~0.4–0.8 s on the word.

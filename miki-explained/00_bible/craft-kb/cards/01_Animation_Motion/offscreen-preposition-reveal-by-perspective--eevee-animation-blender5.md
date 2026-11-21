---
title: Off-screen pre-positioning — keep set pieces hidden, move them in where the camera can't see, reveal by perspective
bucket: 01_Animation_Motion
source: "Creating an Animation in Eevee (Blender 5.0).txt"
source_time: "17:04–17:49, 20:31–21:58"
blender_version_source: 5.0
tool_target: Blender bpy
tier: full
style_fit: strong — lets a continuous flight change "state" (new objects present) without any pop on screen; matches "never pop"
---

## METADATA
01_Animation_Motion | Blender 5.0 | Blender bpy + raea

## CREATIVE_INTENT
Objects that would block the early shot shouldn't exist yet, but must be there when the camera arrives. Map what the camera cannot see at each moment, then teleport ("blip") those objects into place only while they are hidden, so they appear to have been there all along as the moving viewpoint reveals them.

## STE_PROCEDURE
1. Block out the areas the camera can't see during the move (an occlusion map from the camera path).
2. Keyframe each hidden object far below / outside the set at the start.
3. Find the frame where its final spot is out of the camera's view.
4. On that frame, key the object at its final location (Constant interpolation for the jump).
5. Scrub the camera path; confirm the jump is never visible.
6. Before you render, check shadows and reflections don't reveal the jump.

## AGENT_EXECUTION
```python
import bpy
def blip_in(ob, final_loc, hide_frame, park=(0, 0, -500)):
    ob.location = park;      ob.keyframe_insert("location", frame=bpy.context.scene.frame_start)
    ob.location = final_loc; ob.keyframe_insert("location", frame=hide_frame)
    for fc in ob.animation_data.action.fcurves:                  # 4.4+: use channelbag fcurves
        for kp in fc.keyframe_points: kp.interpolation = 'CONSTANT'
# visibility check per frame:
from bpy_extras.object_utils import world_to_camera_view
def in_view(scene, cam, ob):
    import mathutils
    for c in ob.bound_box:
        co = world_to_camera_view(scene, cam, ob.matrix_world @ mathutils.Vector(c))
        if 0 <= co.x <= 1 and 0 <= co.y <= 1 and co.z > 0: return True
    return False
```
(`in_view` tests the frustum only, not occlusion — confirm occlusion by viewing a still at the jump frame.)

raea: put the piece in `<Sequence from={hideFrame} layout="none">` with a `name`, so it exists only from the hidden frame on. Same rule: pick `hideFrame` where the camera can't see its spot; check with `raea render EDIT.tsx --frame hideFrame -o F.png` and the frames either side. Shadows: a `shadow_maps_enabled` light can betray the piece — check the floor too.

## NOTES
- Deprecated: Blender 5.0 removed `action.fcurves`; use `bpy_extras.anim_utils.action_get_channelbag_for_slot(...)` for the interpolation loop.
- Visual gaps: which objects and frames are visual only.
- Rule conflicts: none — this is the opposite of a pop. If the piece cannot be hidden, grow/fade it in over ~0.4 s instead.

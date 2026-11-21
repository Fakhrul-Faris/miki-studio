---
title: Camera markers (Ctrl+B) — switch the active camera on chosen frames
bucket: 05_Camera_Raea_Pipeline
source: "Making a Car Animation in Blender!.txt"
source_time: "05:31–06:32"
blender_version_source: 3.x/4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Useful for the check .blend/animatic (several setups in one file). In raea it maps to one camera whose transform jumps at the cut frame; Style D prefers flights, so use this only for the rare match cut or a hard cut on a word.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x/4.x → 4.2+ | Blender bpy + raea

## CREATIVE_INTENT
Several angles of the same moment (front lights, then the rear) in one scene, switched on the beat, without separate files or an editor.

## STE_PROCEDURE
1. Add a second camera; frame the new angle.
2. Make it active (Scene > Camera, or the camera icon in the Outliner).
3. Hover the Timeline at the switch frame; Marker > Bind Camera to Markers (Ctrl+B).
4. Repeat for the first camera at its start frame.
5. Play: Blender switches the active camera at each marker.

## AGENT_EXECUTION
Blender:
```python
import bpy
scn = bpy.context.scene
for frame, cam_name in [(1, "CamFront"), (96, "CamRear")]:     # ~ frames on the beat/word
    m = scn.timeline_markers.new(f"cut_{frame}", frame=frame)
    m.camera = bpy.data.objects[cam_name]
```
raea: one camera only (two cameras are a known mistake); switch its transform at the cut frame:
```tsx
const cams = [{ from: 0, p: [0.4, 0.1, 0.9] as V3, t: [0, 0.05, 0] as V3 }, { from: 96, p: [-0.3, 0.2, -0.8] as V3, t: [0, 0.05, 0] as V3 }];
const c = [...cams].reverse().find((k) => f >= k.from)!;
<Camera3d transform={Transform.fromXyz(...c.p).lookingAt(c.t)} projection={{ Perspective: { fov: 0.6 } }} />
```
`blend2raea.py` evaluates `scene.camera` per frame, so marker switches export as jumps automatically (keep the cut list for `render_ep.sh … [cuts]`).

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: Style D joins setups with flights and morphs, "almost no hard cuts". A marker cut is allowed for a match cut in identical framing or a deliberate cut on a word; motion blur and heading logic must ignore the teleport frame.

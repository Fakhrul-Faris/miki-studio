---
title: One Blender scene per shot (New Scene empty / Full Copy) to keep setups isolated
bucket: 05_Camera_Raea_Pipeline
source: "Making a Car Animation in Blender!.txt"
source_time: "06:32–07:00, 09:53–10:23"
blender_version_source: 3.x/4.x
tool_target: Blender bpy
tier: full
style_fit: Fits the build side: each setup's lights and dressing can be tuned without breaking another; matches blend2raea's one-shot-per-export model.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x/4.x → 4.2+ | Blender bpy

## CREATIVE_INTENT
Each shot gets its own lights and camera "cheats" (extra lights parented to the hero, a prop moved closer). A clean scene per shot stops one shot's cheats from leaking into another.

## STE_PROCEDURE
1. For a shot with a new set: Scene selector > New > New (empty: no lights, cameras or objects).
2. Copy the hero object over (Object > Link/Transfer Data > Link Objects to Scene, or copy/paste).
3. For a shot sharing a set: Scene selector > New > Full Copy.
4. In the copy, delete the old camera, add a new one (video: top view parented to the car), re-tune lights, move props (car to a lane closer to the wall).

## AGENT_EXECUTION
Blender:
```python
import bpy
bpy.ops.scene.new(type='EMPTY')            # clean shot scene
shot = bpy.context.scene; shot.name = "S02_shape"
shot.collection.objects.link(bpy.data.objects["Hero"])   # linked (shared data); use .copy() for an independent one
bpy.ops.scene.new(type='FULL_COPY')        # shot sharing the previous set (copies objects + data)
```
raea: no equivalent needed — each setup is already its own branch of TSX (a `<Sequence>` per setup, or one GLB per shot exported by `blend2raea.py` and played by `<BlendShot>`).

## NOTES
- Deprecated: none.
- Visual gaps: the scene-menu icon is shown only.
- Rule conflicts: none. The Houdini chase video (cg-cine-ch4-chase) did all shots in one file and advised against it — same conclusion.
- Caution: Full Copy duplicates heavy data; Link Objects shares mesh data, so edits propagate.

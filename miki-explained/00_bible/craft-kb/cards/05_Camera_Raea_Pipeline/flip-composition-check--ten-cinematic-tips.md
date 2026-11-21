---
title: Flip the frame horizontally to re-check balance
bucket: 05_Camera_Raea_Pipeline
source: "10 Tips to make Your 3D Render more Cinematic.txt"
source_time: "15:03–16:16"
blender_version_source: 3.x
tool_target: Blender bpy | principle-only
tier: full
style_fit: Fits Style D — a cheap QC step for board stills and tilted setups.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x | Blender bpy

## CREATIVE_INTENT
Concept artists mirror their image to "reset" their eyes: problems invisible in the normal view (too much tilt, a heavy side, weak focus) jump out when flipped. Use it after a tilt or before locking a board.

## STE_PROCEDURE
1. Select the camera.
2. Scale the camera by -1 on its local X axis (S, X, X, -1) to mirror the view.
3. Look for imbalance, excessive tilt and a lost focal point.
4. Scale the camera back by -1 on local X when done.
5. Alternatively, in the Compositor, insert a Flip node (X) between Render Layers/Image and Composite.

## AGENT_EXECUTION
- Blender viewport: `bpy.ops.transform.resize(value=(-1, 1, 1), orient_type='LOCAL')` on the selected camera (run again to undo).
- Blender compositor (4.x): `n = tree.nodes.new('CompositorNodeFlip'); n.axis = 'X'`, link `Render Layers [Image] -> Flip [Image] -> Composite [Image]`. 5.x: compositor lives in `scene.compositing_node_group`.
- Outside Blender (faster for raea stills): `ffmpeg -i still.png -vf hflip still_flip.png`.
- raea: no equivalent needed; check rendered stills.

## NOTES
- A negative camera scale also flips normals in some viewport modes; never leave it on for a final render.
- Rule conflicts: none.

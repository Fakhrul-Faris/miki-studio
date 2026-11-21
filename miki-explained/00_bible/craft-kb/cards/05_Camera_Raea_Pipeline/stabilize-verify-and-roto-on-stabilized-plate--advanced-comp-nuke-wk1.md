---
title: Stabilize to verify a track, and rotoscope on the stabilized plate
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "07:16; 2:17:19–2:24:40; 2:35:19–2:37:23"
blender_version_source: n/a (NukeX)
tool_target: principle-only
tier: principle
style_fit: Method transfers to our checks: lock the view to the moving object to expose sliding labels/clipping (camera-locked review). No conflict.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (NukeX) | principle-only

## CREATIVE_INTENT
Principle: the inverse of a track is a stabilize; viewing the shot stabilized on the attach point reveals every drift. Idea: draw masks on the stabilized plate (motion removed), then re-apply the track so the mask sticks, which cuts roto keyframes to a few small nudges.

## STE_PROCEDURE
1. Track the surface (PlanarTracker on the flat outer part of the object, not on protrusions that turn differently).
2. Track forward and backward; accept "sticky enough" for a mask base.
3. Create a CornerPin2D from the track; set it to invert (stabilize).
4. Draw the roto shape (ellipse/bezier) on the stabilized view.
5. Set the frame-jump increment to 12; step 12 frames at a time and nudge the shape.
6. Step to the midpoints (6 frames between keys) and fix small errors; good midpoints mean the track holds.
7. Copy the same CornerPin2D, un-invert it, and place it after the roto; the mask now follows the plate.
8. Before you merge, turn off unneeded overlays and check the mask over the unstabilized plate in motion.
9. Check the last frames separately; tracks commonly fail where the object turns most.

## AGENT_EXECUTION
### Source tool (Nuke)
`PlanarTracker` → Export `CornerPin2D (relative)` → `CornerPin2D [invert]` → `Roto` → `CornerPin2D [no invert]` → `Merge (mask/stencil)`. Viewer frame increment = 12 (Shift+arrow jumps).
### Blender / raea translation
- Review analogue for raea: render a check pass with the camera parented to the hero (`<Camera3d transform={heroT.mul(offset)}>` computed per frame) so any label or decal that slides relative to the object shows; run the paths/collision checks as usual.
- Blender: Movie Clip Editor "Stabilization" (`clip.tracking.stabilization.use_2d_stabilization = True`) and Mask editor with `mask_layer` parented to a plane track.
- raea: no equivalent for plate roto.

## NOTES
- Reflections move differently from the object that holds them: track the reflection for a reflection paint-out and the surface for its mask.
- Rule conflicts: none.

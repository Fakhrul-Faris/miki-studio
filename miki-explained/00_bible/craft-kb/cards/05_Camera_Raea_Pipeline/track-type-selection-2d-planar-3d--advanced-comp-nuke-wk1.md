---
title: Choose the attach method by parallax and dimensionality (2D / 2.5D planar / 3D track)
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "05:36–17:14"
blender_version_source: n/a (Nuke)
tool_target: principle-only
tier: principle
style_fit: Serves Style D labels, screens and price tags that must stick to a moving hero object; in raea the "track" is free (parent to the object), but the parallax/dimensionality test decides whether an element may be a flat card or must be real 3D.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | principle-only

## CREATIVE_INTENT
Principle: an added element only "sticks" if it moves with the same parallax (relative speed of two objects at different distances) and dimensionality (relative speed of parts of one object) as the thing it sits on. Idea: start with the cheapest method that could work and escalate only when it slides; a flat surface (a screen, a wall, a floor, a phone in a waving hand) never needs a full 3D solve.

## STE_PROCEDURE
1. Check the area where the element goes for parallax against its surroundings.
2. Check the target object for dimensionality (front moving faster than its sides).
3. If neither shows, use a 2D point track (x/y; add trackers for scale/rotation on zooms).
4. If the target is a flat plane with perspective change, use a 2.5D planar track (four corners, corner pin).
5. If the element sits on a round or deep object, or in space with strong parallax, use a 3D camera track.
6. If no plane exists at the element's depth (a statue in an empty midground), skip 2.5D: try 2D, then 3D.
7. Decide by what you add, not by the shot: a sky replacement on a drone shot may stay 2D/2.5D while foreground props need 3D.
8. Verify every track with a stabilize on the attach point; any drift the stabilize shows will show in motion.
9. Judge the final stick in motion at 100 %, not on the stabilized view alone.

## AGENT_EXECUTION
### Source tool (Nuke)
- 2D: `Tracker` → `Transform (match-move)`; verify with the same tracker set to stabilize.
- 2.5D: `PlanarTracker` (NukeX) → `CornerPin2D`.
- 3D: `CameraTracker` → `Camera` → `ScanlineRender`; check with test cards/cubes on the point cloud.
### Blender / raea translation
- raea renders the whole world from one camera, so "tracking" is parenting: put the label, `<Screen>` or `<ImagePlane>` inside the hero object's `<Entity transform>`; it inherits position and rotation exactly.
- 2D-equivalent (no parallax needed): page elements after the 3D (captions, source line) — they never move with the world.
- 2.5D-equivalent: a flat `<Screen>` / `<ImagePlane src width position rotation>` on the object's surface plane.
- 3D-equivalent: a real `<Mesh3d>` / `<Model>` (Text3D, a GLB prop) when the element has depth or the camera orbits it.
- Blender build stage: `obj.parent = hero` then `obj.matrix_parent_inverse = hero.matrix_world.inverted()` before GLB export.

## NOTES
- Lens distortion makes 2D tracks slide near frame corners; raea has no distortion unless `<LensDistortion>` is on, and the page layer is never bent by it (post.md).
- Visual gaps: the demo scenes' node wiring is shown, not spoken.
- Rule conflicts: none.

---
title: Paint out by sliding a tracked patch of the moving plate, then restore the surface edge with a stencil
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "2:01:27–2:02:34; 2:06:01–2:06:37; 2:12:38–2:17:19; 2:24:40–2:27:21; 2:31:39–2:37:23"
blender_version_source: n/a (Nuke)
tool_target: principle-only
tier: principle
style_fit: Only for cleaning live-action or screen-capture inserts. Transferable idea: reflections move on their own path, not with the surface that carries them.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | principle-only

## CREATIVE_INTENT
Principle: when footage under the object is moving and textured, the cheapest clean patch is the plate itself, shifted a few pixels so nearby texture covers the object — it keeps grain, distortion and motion for free. A reflection moves with the reflection angle, not the surface, so track the reflection, not the helmet. Idea: do paint before keying so despill tweaks don't force paint redo.

## STE_PROCEDURE
1. Place the paint-out before the key in the tree.
2. Track the reflection itself (offset trackers as features leave), not the reflective surface.
3. Draw a roto roughly over the object; use it to mask the plate, bbox set to intersection.
4. Add an alpha to the patch (auto alpha) so merging doesn't brighten it.
5. Transform the patch a few pixels (~10–11 px) to bring clean neighbouring texture over the object.
6. Match-move the roto with the reflection track; feather it.
7. Verify with a stabilize; anything that slips shows immediately.
8. Where the patch spills over the surface border, roto the border on a planar-stabilized plate and stencil the original back on top.
9. For a few frames where the patch reveals wrong content, freeze-frame a clean frame and switch to it.
10. Re-zero the existing track for the frozen frame with an expression offset instead of duplicating the tracker.
11. Soften leftover lines with a luma-key + roto-masked colour correct (offset) and a small blur.
12. Intersect masks with premultiply to protect the original edge; label the section with a backdrop.

## AGENT_EXECUTION
### Source tool (Nuke)
`Tracker` (adjust for luminance changes ✓; Ctrl-drag offset) → `Transform (MatchMove)`; `Roto` → `Merge (mask, bbox intersection)` → `Shuffle/AutoAlpha` → `Transform` (~10 px) → `Merge(over)`; border: `PlanarTracker` → `CornerPin` (invert to stabilize, roto every 12 frames then 6) → `Merge (stencil)`; few frames: `FrameHold` + `Switch` (expression by frame); re-zero: `= (tracker.translate) - <value at ref frame>`.
### Blender / raea translation
- raea: no equivalent (no plate paint). Clean captures before import.
- Transfer for our CG: a reflection in a glossy hero object slides differently from the object's texture; keep that in mind when choosing camera moves past chrome — it adds life for free.

## NOTES
- Visual gaps: roto shapes and exact transform values partly visual (~10–11 px spoken).
- Rule conflicts: none.

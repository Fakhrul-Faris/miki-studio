---
title: Let the big thing spill out of frame so it feels bigger
bucket: 05_Camera_Raea_Pipeline
source: "CG Cinematography 101 | Chapter 3 | Camera Analysis (The Nuke).txt"
source_time: "05:55–07:13"
blender_version_source: n/a (Houdini)
tool_target: principle-only
tier: principle
style_fit: Fits Style D — macro framing that crops the hero object implies scale beyond the 9:16 frame; a "multiplying" stack or growing chart reads bigger if it runs off the edges.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Houdini source) | principle → Blender bpy + raea

## CREATIVE_INTENT
Principle: don't keep the whole event (an explosion, a shockwave) inside the frame. Let it grow past the edges. The viewer's brain fills in what continues left and right, so the frame — and the event — feel larger than anything you could show in full. Ideas: a pile of coins or receipts that keeps multiplying until it overflows the frame; a chart bar that rises past the top edge on the "it doubled" line.

## STE_PROCEDURE
Method:
1. Frame the event so its final size exceeds the frame on at least one axis.
2. Keep the camera tight (or push the focal length longer) rather than pulling back to contain it.
3. Leave visible cues (rings, debris, edges) leaving the frame so the viewer infers what continues.
How-to:
4. If the full event fits in frame at its peak, lengthen the lens or move closer until it spills.

## AGENT_EXECUTION
### Source tool (Houdini)
- Explosion shot framed so the rings exit frame left/right; second camera on 250 mm and later 355 mm focal length so the blast fills and overflows the frame.
### Blender / raea translation
- Blender: check overflow with `world_to_camera_view` on the event's bounding box corners: any coordinate < 0 or > 1 means it spills (desired).
- raea: scale the event's mesh/entity beyond the frame bounds at its peak (`Transform.fromXyz(...).withScale([s, s, s])` with `s` growing from the frame), keep `fov` narrow (e.g., `2*Math.atan(18/85)`).

## NOTES
- Rule conflicts: none; growth itself eases in (~0.4 s or longer), never pops.

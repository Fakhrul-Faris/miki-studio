---
title: Free-look (one-node) vs point-of-interest (two-node) camera — choose per setup
bucket: 05_Camera_Raea_Pipeline
source: "Motion Feel, Easing & Camera Choreography/Animate After Effects Camera Guide.txt"
source_time: "00:52–01:39, 04:36–05:01, 09:50–11:05"
tool_target: raea
tier: full
use_when: "planning the camera of each shot-list row: does the camera look AT the object the line names, or look around freely?"
style_fit: "⚠ source prefers one-node by default → adapted: Style D defaults to the aimed camera (lookingAt the object the line is about); free-look only for flights whose heading is the point."
---

## METADATA
05_Camera_Raea_Pipeline | After Effects (prohibited) → raea Camera3d | raea, shot-list

## CREATIVE_INTENT
Head-as-camera analogy: turning your head changes what you see, but you "can't control your eyeball". The ability to look
at different things "without changing your position or rotation is called point of interest". A **one-node** camera
rotates around itself; a **two-node** camera always orients toward its point of interest, so moving the camera keeps the
target framed. The source recommends one-node for free looking, because with two-node "you have to keyframe the point
of interest in order to look at any other layer" — "choose the camera wisely depending on your need".

## STE_PROCEDURE
1. Before animating a setup, name what the camera must keep framed (the object the line is about).
2. If one object stays the subject, use an aimed camera: position + look-at point.
3. If the subject changes mid-setup, keyframe (ease) the look-at point from object A to object B.
4. If the move is about travelling (heading matters, no single subject), use a free-look camera: position + rotation.
5. Never mix both on one setup; switch only at a cut.
6. When adding a new object to an already-moving shot, place it at the current look-at point, not at the world origin.

## AGENT_EXECUTION
raea:
- Aimed (two-node): `Transform.fromXyz(...p).lookingAt(target)` — animate `p` and `target` separately (each eased).
- Free-look (one-node): `Transform.fromXyz(...p).withRotation(Quat.fromEuler("XYZ", pitch, yaw, 0))` — animate the angles (radians).
- New prop in a moving shot: spawn it at/near `target(f)` of the frame it enters (AE equivalent: Ctrl+Alt+Home then Ctrl+Home to centre it in front of the camera).
Shot-list "Setup and camera" cell: tag `aim: <object>` or `free-look: heading <dir>`.

### Worked example
Topic: "Berapa sebenarnya kos secawan teh tarik kat gerai" (illustrative RM).
Row BEFORE: `| 7 | "Gula, susu, teh, semua naik harga" | camera orbits the table | items appear | |`
Row AFTER: `| 7 | "Gula, susu, teh, semua naik harga" | aimed camera, slow eased arc; aim point eased sugar tin → milk can → tea pack on each word | each item's price tag rises RM0.20 in accent as the aim lands on it | free-look-vs-point-of-interest-camera |`

### Check
- Does each row state `aim:` or `free-look:`?
- When the subject changes, is the aim point eased (not jumped) between objects?
- Is the object the line names in frame and in focus for the whole aimed setup?
- Do new props enter near the look-at point (not off at the origin)?

## NOTES
- AE steps dropped: camera-type dialog, POI drag line, unified camera tool, custom views 1/2/3, 3D reference axis, orbit-around-cursor tool.
- Related set-1 cards: `cards/05_Camera_Raea_Pipeline/two-empty-aim-and-focus-rig--blender-camera-rig.md`, `aim-target-follows-moving-subject--blender-camera-rig.md` (Blender side). This card adds the per-setup choice rule.
- Covered elsewhere from this video: focal length / dolly zoom (`masters/05_Camera_Raea_Pipeline/focal-length-choice.md`, `cards/05_Camera_Raea_Pipeline/dolly-zoom--cinematography-next-level.md`), DoF (`masters/05_Camera_Raea_Pipeline/dof-focus-fstop.md`), easing (`masters/01_Animation_Motion/linear-vs-eased-interpolation.md`), two-view workspace (`masters/05_Camera_Raea_Pipeline/camera-monitor-viewport.md`).

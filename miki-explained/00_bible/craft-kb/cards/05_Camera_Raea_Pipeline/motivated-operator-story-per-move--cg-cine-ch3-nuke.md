---
title: Give every camera move an imagined operator's reason (incl. motivated dutch)
bucket: 05_Camera_Raea_Pipeline
source: "CG Cinematography 101 | Chapter 3 | Camera Analysis (The Nuke).txt"
source_time: "03:18–03:59, 07:13–08:30, 09:09–09:46, 38:51–39:34"
blender_version_source: n/a (Houdini)
tool_target: principle-only
tier: principle
style_fit: Partial — "nothing by mistake, every move has a narrative" fits Style D's camera bar; the specific stories (operator losing balance, overshoot, panic zoom) conflict with our smooth eased language.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Houdini source) | principle → Blender bpy + raea

## CREATIVE_INTENT
Principle: "nothing is done by mistake". Even with no characters or emotion in the shot, the artist writes a little story for an imagined camera operator and each move follows from it: the pan overshoots because the operator was surprised; the frame tilts (dutch) because, staring up at something huge, they forgot to keep level; they try to zoom out but the event outruns them. Dutch angle origin used: comics/manga, where dynamic action is drawn tilted, close to camera and wide. Ideas for us: write one sentence of motivation per camera setup in the shot list ("we lean in because the number is small", "we rise because the profit grows") so moves serve the line.

## STE_PROCEDURE
Method:
1. For each setup, write one sentence: who is holding the camera, and why it moves now.
2. Derive the move (push, rise, tilt, follow) from that sentence.
3. Reject any move without a reason.
How-to:
4. For a dutch tilt, motivate it (imbalance, unease, overwhelming scale) and keep it small.
5. For a reaction (operator "surprised"), Style D translates it into a slower, eased reframe — not an overshoot or jolt.

## AGENT_EXECUTION
### Source tool (Houdini)
- Overshoot: pan keyed past the target with the subject left in the upper frame, then a correction key back. Dutch: rotation Z keyed on top as the camera rises after the blast. Panic zoom: focal length keyed out late on the 355 mm camera.
### Blender / raea translation
- Blender: add a text field to the shot list / camera custom property: `cam["motive"] = "rise with the profit"`.
- raea: dutch roll via the `up` argument of `lookingAt(target, up)` (as in dutch-tilt-small-roll--ten-cinematic-tips): for a camera looking roughly down -Z, `up = [Math.sin(r), Math.cos(r), 0]` with `r` eased from 0 to ~0.05 rad; `<Camera3d transform={Transform.fromXyz(...eye).lookingAt(aim, up)} … />`.

## NOTES
- Rule conflicts: overshoot-and-correct pans, operator wobble and panic zooms are "bouncy/rushed/flashy" — do not copy them. Keep the habit of motivation, express it with eased in-out moves (≤ ~130°/s). Dutch tilts only small (2–4°) and eased.

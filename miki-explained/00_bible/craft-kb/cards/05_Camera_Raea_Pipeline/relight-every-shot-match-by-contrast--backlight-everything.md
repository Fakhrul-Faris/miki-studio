---
title: Relight every shot for itself; match shots by contrast, not by light direction
bucket: 05_Camera_Raea_Pipeline
source: "Backlight Everything - A Cinematographer's Hammer.txt"
source_time: "01:25–01:52, 10:44–11:41, 19:50–20:16, 23:27"
blender_version_source: n/a (live-action cinematography)
tool_target: principle-only
tier: principle
style_fit: Fits Style D — a new setup every 2–3 s can move its lights freely; continuity comes from one contrast/colour language.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (live-action) | principle → Blender bpy + raea

## CREATIVE_INTENT
Principle: in fast-cut work nobody notices that the light comes from a different side in each shot. Each setup is relit to look its best (backlit wide, then a close-up where the "sun" swings behind the subject again), and shots shot on different days or times still cut together as long as the contrast level and colour warmth match. "Make every shot look good and get somebody else to cut them together." Tight shots allow the most freedom. Ideas: per-setup light rigs in Style D (key always behind the hero from that camera), with a shared contrast/grade target across the episode.

## STE_PROCEDURE
Method:
1. Fix the episode's contrast target (lit vs shadow ratio) and colour warmth first.
2. For each setup, place the key relative to that camera (behind the subject), ignoring the previous setup's direction.
3. Check the new setup against the target contrast, not against the previous light direction.
4. Use tighter framings where the relight would otherwise be obvious (no ground or wide set visible).
How-to:
5. Add atmosphere and small motion (wind) where available to help the cut feel continuous.

## AGENT_EXECUTION
### Source tool (live-action set)
- Wides first in the backlight window; close-ups later or another day/location, re-backlit by turning the subject; contrast matched via diffusion/bounce/neg.
### Blender / raea translation
- Blender: one light rig per shot (collection per setup, or lights keyed to jump on the cut frame); a shared compositor/grade.
- raea: compute the key from the current setup's camera every frame range: `const key = keyBehind(cam.p, hero)`; jump it on the cut frame together with the camera (one camera whose transform jumps at the cut, per scene.md). One `<Grade>` and one `<ToneMapping>` for the whole piece (they hold the first frame's values) give the shared look.

## NOTES
- On camera flights (no cut) the light can't jump; animate the key's transform with the same eased curve as the camera, or keep it fixed for the flight.
- Rule conflicts: lights must not pop on/off visibly mid-shot; jump only on hard cuts, otherwise fade/move ~0.4 s.

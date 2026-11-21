---
title: F-Curve Noise modifier for subtle organic wobble
bucket: 01_Animation_Motion
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "1:27:50–1:29:37"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Tiny life on a held hero object or camera; must stay barely perceptible (no jitter, no shake).
---

## METADATA
01_Animation_Motion | Blender 4.3 | Blender bpy (F-Curve modifiers) + raea

## CREATIVE_INTENT
Adding procedural noise on top of keyed rotation makes a static, keyframed shot "seem way more complicated than it really is"
and more real; the same trick is used on hands and arms. Kept really subtle.

## STE_PROCEDURE
1. Select the X Rotation F-curve in the Graph Editor; open the Sidebar (`N`) › Modifiers.
2. Add Modifier › Noise.
3. Increase Scale (frequency period) so the wobble is softer.
4. Set Strength (amplitude) to 0.1, then down to ~0.01 for a really subtle result.
5. Copy the modifier (Copy F-Modifiers), select Y Rotation, Paste F-Modifiers.

## AGENT_EXECUTION
- Blender:
```python
fc = ob.animation_data.action.fcurves.find("rotation_euler", index=0)
m = fc.modifiers.new('NOISE'); m.scale = 10.0   # ~ "increase the scale"
m.strength = 0.01; m.phase = 1.0
fy = ob.animation_data.action.fcurves.find("rotation_euler", index=1)
m2 = fy.modifiers.new('NOISE'); m2.scale = m.scale; m2.strength = m.strength; m2.phase = 7.0  # different phase
```
- raea: no F-modifier; compute a seeded smooth noise from the frame, e.g. two summed sines:
  `const wob = 0.01 * (Math.sin(f * 0.11) + 0.5 * Math.sin(f * 0.27 + 1.3));` added to the Euler angle (deterministic per frame,
  so render = play).

## NOTES
- Deprecated: none.
- Visual gaps: the Scale value is not given ("increase the scale"), `~10`.
- Rule conflicts: noise on a camera reads as handheld shake — not in the house style; on objects keep amplitude ≤ ~0.01 rad.

## ADDENDUM — How to actually make eye-catching 3D Scenes | After Effects
AE expression equivalent of the same subtle organic wobble, applied to a stationary two-node camera rather than an
object's rotation: `wiggle(1,8)` on the position stopwatch — frequency 1/second, amplitude 8 (AE position
units/pixels) — "especially... when the camera's stationary," for a little life/shake. ⚠ Rule conflict reaffirmed:
noise/wiggle on the camera reads as handheld shake, not house style; if ever used, amplitude must sit far below this
8-unit value and only while the camera is otherwise fully static, never combined with an eased move.

## ADDENDUM — Mastering Blender Graph Editor
Same Noise F-modifier demoed on a whole held-shot rotation channel (a pan, not a secondary wobble): default
Scale/Strength "freaks out" and "makes the pan go crazy," tuned down to **Scale = 10, Strength = 0.5** ("much more
mild") — yet the narrator still calls that result "a little bit jittery." ⚠ Rule conflict reaffirmed, stronger than
the card's own note: this source's own Strength 0.5 is a documented *upper bound to avoid*, one full order of
magnitude above this card's subtle Strength ~0.01 ceiling. Keep Strength at this card's low end; do not use 0.5.

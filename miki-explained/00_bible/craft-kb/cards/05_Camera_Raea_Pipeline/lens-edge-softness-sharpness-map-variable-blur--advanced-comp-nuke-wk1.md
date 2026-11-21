---
title: Lens edge softness — measure frame sharpness with a blur difference, then soften edges with a variable-size blur
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "50:39–51:12; 3:52:07–3:58:23"
blender_version_source: n/a (Nuke, IBlur)
tool_target: raea
tier: principle
style_fit: Fits the macro lens look as a subtle effect (top/bottom of a 9:16 frame slightly softer); not a substitute for DoF.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: many lenses (anamorphics especially) are tack sharp in the centre and softer toward edges and corners. Idea: measure where the plate is soft by extracting its high-frequency detail, then apply a blur whose size (not opacity) shrinks across a mask, so the softening fades physically instead of looking like a glow.

## STE_PROCEDURE
1. Blur the plate ~5 px and subtract the blur from the plate to extract edge detail.
2. Brighten the result; darker regions show where the plate is softer.
3. Denoise first so noise does not skew the reading.
4. Sharpen the soft regions through an inverted, centre-protecting mask (feather ~-200 to -300 px) until detail is even.
5. On that even plate, apply a variable blur through the same mask to recreate the falloff.
6. Use a blur whose size shrinks with the mask, not a uniform blur faded by opacity.
7. Tune blur size to the original softness (~1.5 px in the example).
8. Copy the variable blur onto the final comp, before the final reformat.

## AGENT_EXECUTION
### Source tool (Nuke)
`Blur(5)` → `Merge (from)` [plate − blur] → `Grade` up (diagnostic); `Sharpen` masked by inverted `Roto` (feather -200…-300); `IBlur` (inputs: image + mask; size ~1.5) — compare against `Blur(10)` faded, which glows instead of softening.
### Blender / raea translation
- raea: no equivalent (no screen-space variable blur). Closest: keep the hero in the centre band of `<DepthOfField>` and let objects nearer the frame top/bottom sit off the focal plane; or a slight `<LensDistortion k1>` for edge character.
- Diagnostic still holds for our renders (~): in Python, `img - gaussian_blur(img, 5)` on a rendered PNG to check where the frame is soft vs sharp.

## NOTES
- Visual gaps: mask shape drawn on screen; only feather values spoken.
- Rule conflicts: none.

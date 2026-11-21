---
title: Every frame needs one focal point that stands out above everything else
bucket: 05_Camera_Raea_Pipeline
source: "Why your Blender renders look BORING.txt"
source_time: "10:56–12:24"
blender_version_source: n/a (art direction)
tool_target: principle-only
tier: full
style_fit: Equals our rule: one hero object per setup, one brand accent only on what the line is about.
---

## METADATA
05_Camera_Raea_Pipeline | n/a | principle-only

## CREATIVE_INTENT
Beginner renders can be technically flawless and still feel like "nothing is happening, there was no reason for the picture" because nothing stands out. The focal point is the reason the picture was captured. It doesn't have to be wildly interesting; it only has to look more important than everything else, through higher contrast, framing or leading lines.

## STE_PROCEDURE
1. Before framing a setup, name its focal point in one word (from the script line).
2. Give the focal point the highest contrast in frame (value, colour accent, sharpest focus).
3. Lower contrast on everything else (darker, desaturated, defocused).
4. Add framing or leading lines toward it if it still doesn't win.
5. Review the still: if a stranger can't point at the focal point in one second, the setup fails.

## AGENT_EXECUTION
- Shot list: a `focal` column per setup; one entry only.
- raea: focus on it (`<DepthOfField focal_distance={distToFocal} aperture_f_stops={2} />`), give only it the accent (`base_color` / `emissive` in the brand hex, others neutral), and the key light on it (see darken-unimportant-areas card).
- Check: fresh-critic / still-qc review asks "what is the focal point?" before any score.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none. Composition techniques beyond this are deferred by the video to Blender Guru's composition video (not in our raw set).

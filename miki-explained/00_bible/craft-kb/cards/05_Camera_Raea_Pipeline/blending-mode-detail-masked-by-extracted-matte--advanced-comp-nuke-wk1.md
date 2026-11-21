---
title: Blending-mode texture on bright areas, held out by an extracted matte
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "37:04–37:36; 42:53–43:38"
blender_version_source: n/a (Nuke)
tool_target: raea
tier: principle
style_fit: Useful for adding subtle texture to a blown-out area (sky, lit screen, a bright tabletop) without rebuilding edges; keep it subtle.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: a blending mode (multiply, plus, overlay, colour dodge) combines layers by math, so it keeps the existing edges; an extracted matte on top limits where it shows. Idea: multiply sky detail into a blown-out background behind a subject instead of re-keying and rebuilding the subject's edges.

## STE_PROCEDURE
1. Merge the detail layer onto the finished comp with operation multiply.
2. Check that the multiply blends into existing edges without halos.
3. Merge the extracted subject matte over the result so the subject is untouched.
4. Toggle both on/off to confirm detail appears only in the bright area.

## AGENT_EXECUTION
### Source tool (Nuke)
`Merge (multiply)` [A: sky detail, B: comp] → `Merge (over)` [A: premultiplied subject extraction, B: multiplied comp].
### Blender / raea translation
- raea: no per-layer blending modes on 3D. The equivalent is in the material: put the detail in the surface's texture (`base_color_texture`) or as an emissive pattern, so lighting and DoF handle edges.
- On the page layer (HTML/CSS over the 3D) `mix-blend-mode: multiply` exists in CSS but page elements sit over the 3D, not inside it; use only for 2D overlays (~).

## NOTES
- Rule conflicts: none.

---
title: Intertwine with a soft overlap bleed — one shape shows faintly through the other where they cross
bucket: 09_UI_Motion
source: "Procedural Mograph & 3D-to-AI Render Passes/Three motion graphics techniques for your After Effects projects.txt"
source_time: "04:33–08:19"
tool_target: HyperFrames
tier: principle
use_when: "two flat UI/diagram shapes overlap (two circles = two accounts, Venn of 'untung' vs 'rugi', two cards overlapping) and you want them to read as linked, not stacked"
style_fit: "Flat 2D layer (HyperFrames or raea 2D layer); keep the brand accent on one shape only; no glow halos beyond a subtle inner shadow."
---

## METADATA
09_UI_Motion | After Effects (Set Matte + invert, compositing-options mask reference, Choke 50, Fast Box Blur 20, opacity, Inner Glow + Inner Shadow) → HyperFrames SVG / CSS | HyperFrames scene

## CREATIVE_INTENT
Make two closed shapes look intertwined (each passes over the other in one overlap region) without duplicating
layers, then add a faint "transparency" where they overlap: the back shape bleeds through the front one at low
opacity with a soft edge, and inner glow + inner shadow give the flat shapes depth.

## STE_PROCEDURE
1. Put shape A over shape B.
2. In ONE of the two overlap regions, cut A by B's shape (inverted matte) so B appears on top there.
3. Restrict that cut to a mask around that region only (source: compositing options → mask reference "Add").
4. Duplicate the back shape's overlap area, choke it inward (source: Choke 50), blur it (source: Fast Box Blur 20).
5. Lower its opacity until the bleed is faint (value unknown, visual only).
6. Repeat for the other shape with the matte inverted.
7. Add a subtle inner glow and inner shadow to each shape for depth.

## AGENT_EXECUTION
HyperFrames/SVG: two `<circle>`s; a `<clipPath>` limited to one lens region draws B over A there; bleed = the
lens region clipped, `filter: blur(~6px)` with an inset `feMorphology erode` (choke), opacity ~0.2–0.3 (inferred).
raea 2D layer: no matte primitive confirmed — raea: no equivalent (no set-matte/clip node documented) → do it in
HyperFrames and overlay.
### Worked example
Topic: "Duit bisnes vs duit peribadi — kenapa kena asingkan" (illustrative).
- BEFORE: two flat circles labelled "Bisnes" and "Peribadi" overlapping; one simply sits on top.
- AFTER: the two circles interlock like chain links; in the overlap the RM200 (illustrative) "duit bercampur" shows as a faint blurred bleed; the accent (green) is only on the "Bisnes" ring, which pulls free on "asingkan".
### Check
- Does each shape cross over the other once (true interlock)?
- Is the bleed faint and soft-edged, not a hard third colour?
- Is the accent on one shape only?

## NOTES
- Choke 50 / blur 20 are AE units; pixel equivalents are inferred.
- The second half (circles returning) needed an animated mask; source did not record it (visual only).

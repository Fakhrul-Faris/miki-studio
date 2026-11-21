---
title: Faceted "clay" look via Decimate + Shade Flat
bucket: 06_Art_Direction
source: "3D Documentary Explainer Breakdowns/How to Make 3D Characters Like Fern and Imperial.txt"
source_time: "13:25–14:55"
tool_target: raea
tier: principle
use_when: "briefing the material pass for a stylized, non-photoreal hero object or prop (RECIPE-D §5.1 material pass)"
style_fit: "The faceting is a surface/material technique, not a figure technique — use it on props/objects, never on a person (house rule: MPFB library figures only, no Mixamo/generic humans)."
---

## METADATA
06_Art_Direction | Blender (Decimate modifier + Shade Flat) | raea material/mesh pass

## CREATIVE_INTENT
A smooth subdivided mesh reads as generic CG. Collapsing its geometry (Decimate) and switching to flat per-face
shading (Shade Flat) turns the surface into visible facets — a cheap, deliberate "low-poly clay" look used by
3D-documentary channels (Fern, Imperial, Cipher-style) to make characters/props feel hand-made rather than realistic.

## STE_PROCEDURE
1. Add a Decimate modifier (Collapse) to the mesh.
2. Lower the ratio until facets are clearly visible (author used ~0.3, then ~0.15 for a stronger effect; ~6 on a
   dense hair mesh read as near-flat).
3. Right-click → Shade Flat so each face reads as one flat plane (no interpolated normals).
4. Before animating the mesh, apply both modifiers — an un-applied Decimate glitches under animation.
5. Drop motion blur on faceted meshes; the author could not get it working with this effect.

## AGENT_EXECUTION
Blender-side prep (asset built once, exported GLB for raea): decimate + shade-flat the hero prop, apply, export.
In raea, this bakes into the mesh normals, so no extra raea prop is needed beyond a flat/unlit-leaning
`StandardMaterial` (low roughness variance, no smooth-normal override) — just don't re-smooth the imported mesh.
### Worked example
Topic: a kedai runcit's weighing scale, built as a stylized hero prop (illustrative numbers).
BEFORE: smooth, photoreal scale model — reads like stock 3D, no personality.
AFTER: same scale decimated to ~0.2 ratio + Shade Flat — visible facets on the dial and base give it the same
hand-made "clay" read as the reference channels, before the brand accent light hits it.
### Check
- Is the facet size visible on camera (not so fine it looks like render noise, not so coarse it reads broken)?
- Are both modifiers applied before any animation or render?
- Is the technique used only on props/objects, never a human figure?

## NOTES
- Visual gaps: exact ratio values were chosen by eye on screen; "~" values above are from the author's screen, not stated numbers.
- Rule conflict: the source applies this to Mixamo/Meta Tailor generic human characters, which our house rules
  prohibit (MPFB library figures only, no primitive/generic/Mixamo people) — adapted here as a prop/object-only material technique.

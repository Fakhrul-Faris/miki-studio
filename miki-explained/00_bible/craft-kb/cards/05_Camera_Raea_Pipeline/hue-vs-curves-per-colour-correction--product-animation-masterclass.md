---
title: Per-colour fixes with Hue-vs curves — desaturate a nauseating green, push orange, recolour a liquid
bucket: 05_Camera_Raea_Pipeline
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "3:15:25–3:19:27"
blender_version_source: 4.3
tool_target: Shader nodes | raea
tier: full
style_fit: Keeps the one brand accent clean and other colours quiet; in our pipeline fix colours at the material, not in post.
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.3 | DaVinci Resolve Curves → Blender material / raea material

## CREATIVE_INTENT
One hue misbehaves in a single shot (green can too loud, orange not orange enough, liquid wrong colour). Isolate just that hue and
change its saturation, brightness or hue without touching the rest.

## STE_PROCEDURE
### Source tool (DaVinci Resolve)
1. Add a node (`Alt+S`) on that clip only.
2. Curves › Hue vs Sat: pick the green (click-hold on the image or the swatch) and drag down to desaturate; widen the range a little.
3. Hue vs Lum: pick green; lower or raise slightly.
4. On the orange shot, Hue vs Hue: pick the reds and shift toward orange; Hue vs Lum to brighten; Hue vs Sat to saturate.
5. To recolour a liquid, Hue vs Hue on its colour with a much broader range; watch for edge artifacts and pick a target hue that holds clean.
6. Compare with `Ctrl+D` on the node.

## AGENT_EXECUTION
### Blender / raea translation
- Blender: change the source material instead (Mix colour A / Hue/Saturation/Value node on that material).
- raea: set the material hex directly (`base_color="#e9771c"`), or re-cover a model's material
  `<Model src={...}><StandardMaterial material="Liquid" base_color="#3a7bd5" /></Model>`; raea's `<Grade>` has no per-hue curves,
  so per-hue fixes belong in the material.

## NOTES
- Deprecated: none.
- Visual gaps: curve amounts are by eye.
- Rule conflicts: none.

---
title: Keep detail approaching black — no crushed shadows from punchy view transforms
bucket: 05_Camera_Raea_Pipeline
source: "How to Make DARK Environments in Blender.txt"
source_time: "23:29–25:57"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Directly supports no-cheap-defaults; dark ≠ black. Our ToneMapping/Grade choice must not crush the shadow side of the hero.
---

## METADATA
05_Camera_Raea_Pipeline | 4.x (AgX/Filmic) → raea | Blender bpy + raea

## CREATIVE_INTENT
Even the darkest professional renders have almost no pure black — the shadows approach black but keep visible detail, with only a few pixels reaching 0. Large patches of absolute black look over-contrasted and amateur.

## STE_PROCEDURE
1. Before raising contrast, zoom into the darkest region and confirm detail is visible.
2. Avoid high-contrast looks (AgX / Filmic "Punchy", "High Contrast") that crush shadows.
3. Lift shadows with a little ambient/fill light (see area-fill card) rather than with contrast.
4. Alternatively lift shadows slightly in post; do not overdo it.
5. Accept only a few pixels at absolute black in the darkest zones.

## AGENT_EXECUTION
Blender:
```python
import bpy
vs = bpy.context.scene.view_settings
vs.view_transform = 'AgX'
vs.look = 'None'          # avoid 'AgX - Punchy' / 'AgX - High Contrast' (look names vary by version ~)
```
raea:
```tsx
<ToneMapping mode="tony" />           {/* or "agx": soft, holds highlights; avoid "aces" for dark shots — darker, punchier */}
<AmbientLight brightness={30} />
<Grade shadows={{ lift: 0.01, contrast: 1, gamma: 1, gain: 1, saturation: 1 }} />   {/* ~ tiny lift */}
```
Check: render a still, then measure the share of pixels at 0 (e.g. `ffmpeg`/PIL histogram); a few pixels OK, patches not. `frame_metrics` in the craft tools can log this if present.

## NOTES
- Deprecated: Filmic (pre-4.0 default) → AgX in 4.0+; Filmic "Base Contrast" looks → AgX looks.
- Visual gaps: none.
- Rule conflicts: none — reinforces house rules.

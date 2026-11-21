---
title: AgX instead of Filmic — highlights roll to white like a real camera
bucket: 05_Camera_Raea_Pipeline
source: "The Key to Realistic Renders in Blender.txt"
source_time: "07:44–08:15"
blender_version_source: 4.0
tool_target: Blender bpy | raea
tier: full
style_fit: Our look runs AgX (BlendShot LOOK: AgX + contrast 1.12); keep look tests in Blender on AgX so they match raea.
---

## METADATA
05_Camera_Raea_Pipeline | 4.0+ | Color Management → raea ToneMapping

## CREATIVE_INTENT
AgX (Blender 4.0 default) gives truer colours, especially in highlights: bright areas desaturate to white as a camera does, where Filmic skewed them into odd neon hues. It also handles saturation better, so vibrant, well-lit renders are easier.

## STE_PROCEDURE
1. Open Render Properties › Color Management.
2. Set View Transform = AgX (not Filmic).
3. Pick a Look (e.g. Medium High Contrast / Punchy).
4. Check bright, saturated areas (emissive accents) for clean roll-off to white.

## AGENT_EXECUTION
```python
import bpy
vs = bpy.context.scene.view_settings
vs.view_transform = "AgX"; vs.look = "AgX - Medium High Contrast"
```
raea: `<ToneMapping mode="agx" exposure={0} />` + `<Grade midtones={{ contrast: 1.12 }} />` (kit BlendShot LOOK). Alternatives: `"tony"` (default, keeps colour), `"aces"` (contrasty, can muddy brand colours).

## NOTES
- Deprecated: Filmic → AgX (4.0 default). Look names in 4.x are prefixed "AgX - ".
- Visual gaps: none.
- Rule conflicts: none.


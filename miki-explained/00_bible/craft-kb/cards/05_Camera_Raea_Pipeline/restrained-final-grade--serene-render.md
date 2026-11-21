---
title: Restrained final grade — small exposure fix, a little clarity and saturation, nothing extreme
bucket: 05_Camera_Raea_Pipeline
source: "Making a SERENE render in blender.txt"
source_time: "30:07–31:01"
blender_version_source: 4.x
tool_target: raea
tier: full
style_fit: Fits no-cheap-defaults; heavy contrast/saturation is slop. Grade lives in raea `<Grade>` (no Photoshop/AE in our pipeline).
---

## METADATA
05_Camera_Raea_Pipeline | 4.x → raea | raea

## CREATIVE_INTENT
Post-processing should mostly correct: a small exposure adjustment, some clarity/sharpening, a bit of saturation. Over-adding contrast and cranking saturation looks worse than a lightly edited image — less is more.

## STE_PROCEDURE
1. Before grading, confirm the lighting is right in the raw render.
2. Correct exposure in small steps.
3. Add slight local contrast/clarity and sharpening.
4. Add a small amount of saturation.
5. Stop before contrast or saturation becomes noticeable as an effect.

## AGENT_EXECUTION
raea:
```tsx
<ToneMapping mode="tony" exposure={0.2} />                 {/* ~ small exposure fix, stops */}
<Grade saturation={1.06} midtones={{ contrast: 1.04, saturation: 1, gamma: 1, gain: 1, lift: 0 }} />
```
raea: no clarity/sharpen equivalent (no unsharp-mask pass listed in post.md). Get crispness from textures, `AntiAliasing` mode and focus instead.
Source also rendered at 4000×5000, ~300 samples (Cycles) — irrelevant to raea (real-time, no samples); our output is 1080×1920 at 60 fps.

## NOTES
- Deprecated: none.
- Visual gaps: exact Photoshop values not given.
- Rule conflicts: Photoshop post is replaced by `<Grade>`; first frame's grade holds for the whole piece.

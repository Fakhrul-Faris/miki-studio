---
title: Add film grain to remove the "rendery" look
bucket: 05_Camera_Raea_Pipeline
source: "How to Add That Special Look To Your Renders.txt"
source_time: "14:10–14:43"
blender_version_source: n/a (Photoshop Camera Raw)
tool_target: principle-only
tier: principle
style_fit: Fine grain helps the real-surface macro look read as photographed, but raea's standard look has no grain prop and grain costs bitrate on TikTok.
---

## METADATA
05_Camera_Raea_Pipeline | Photoshop Camera Raw | principle-only (raea: no equivalent in the PBR look)

## CREATIVE_INTENT
Principle: straight-from-the-renderer images look computer-made; camera-like grain makes them feel like a real thing being
photographed. Idea: the author adds it "always", at a moderate amount.

## STE_PROCEDURE
Method:
1. Before you add grain, finish all other grade moves.
2. In Camera Raw → Effects, set Grain Amount ~20–30.
3. Leave Size and Roughness at defaults.
4. Check at 100% and at viewing size.

## AGENT_EXECUTION
### Source tool (Photoshop)
Camera Raw → Effects → Grain: Amount 20–30, Size/Roughness default.
### Blender / raea translation
- raea: no equivalent (no film-grain prop for the PBR look; `grain` exists only on `<Look mode="paint">` as fixed paper grain
  and on the "site"/"pixel" looks as dither — wrong look for Style D).
- If wanted, add it outside raea at encode, e.g. ffmpeg `-vf noise=alls=6:allf=t` (~; not raea — test bitrate first).
- Blender compositor equivalent (look-dev only): none built-in; would need a noise texture overlay.

## NOTES
- Deprecated: none.
- Visual gaps: none (value spoken).
- Rule conflicts: none with house rules, but grain inflates bitrate and TikTok re-compression smears it; raea's fog grid is noted
  to encode small precisely because it has no noise (post.md). Test on a phone before adopting.

---
title: Denoise the plate first (and pre-render it) before keying, tracking or paint
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "33:57–35:00; 2:02:34–2:05:27; 2:07:42–2:08:16"
blender_version_source: n/a (Nuke, NeatVideo Reduce Noise)
tool_target: principle-only
tier: principle
style_fit: Applies only when real footage or screen recordings enter a shot (UI captures, phone video); clean inputs keep the CG-clean Style D look.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | principle-only

## CREATIVE_INTENT
Principle: grain makes keys chatter at the edges and makes high-contrast tracking filters noisy; a denoised working plate gives smooth mattes and sticky tracks. Idea: denoise once at the head of the comp, write it to disk, and read it back so the expensive step never re-runs.

## STE_PROCEDURE
1. Before any key, track or paint, gain the viewer up and check the shadows for chatter.
2. Denoise with a noise profile taken from a flat, slightly grainy area of consistent colour.
3. Accept a profile quality above ~60 (73 in the example).
4. Check the shadows again; a bright-area profile may miss shadow noise.
5. Write the denoised plate as an EXR sequence (scene linear, 5-digit padding) and read it back.
6. A/B the read-back against the live node to confirm they match.
7. Key, track and paint on the denoised plate; regrain only at the end.

## AGENT_EXECUTION
### Source tool (Nuke)
`ReduceNoise` (Neat Video) → Options → Auto Profile → Apply; `Write` `.../name_rn_v001.#####.exr`, colourspace scene_linear, create directories ✓; `Read` it back.
### Blender / raea translation
- For screen recordings / stock clips used via `raea/video`: denoise them before import (~ ffmpeg `hqdn3d` or `nlmeans`), then use the clean file.
- raea renders: noiseless already; nothing to do.

## NOTES
- Rule conflicts: none.

---
title: Pre-render expensive stages and render to image sequences
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "2:04:45–2:05:27; 3:24:12–3:26:08; 4:11:56–4:13:27"
blender_version_source: n/a (Nuke)
tool_target: raea
tier: principle
style_fit: Matches WORKING-RULES render budget (chunked renders, frames checked, cached bakes); no conflict.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: compute each expensive, settled stage once (denoise, heavy defocus) and read the cached result afterwards, so previews stay fast. Idea: render long outputs as image sequences so a crash loses one frame, not the movie; and distrust a render that finishes suspiciously fast.

## STE_PROCEDURE
1. Identify settled, expensive stages (denoise, optical defocus, physics) and write each to disk once.
2. Write EXR when the bounding box or extra data must survive; enable "create directories".
3. Read the cached result back and A/B it against the live node before deleting the live branch.
4. Render long outputs as numbered image sequences (5-digit padding), not a single movie file.
5. If a render finishes much faster than expected, stop and check paths, enabled nodes and frame range.
6. Organise and label the script while a render runs.
7. Re-render a cache whenever an upstream change (e.g. new camera shake) invalidates it.

## AGENT_EXECUTION
### Source tool (Nuke)
`Write` (file `.../rbl2_010_footage_v001_rn.#####.exr`, colourspace scene_linear, create directories ✓) → `Read` back; 5 pound signs = 5-digit padding.
### Blender / raea translation
- raea finals: `tools/raea/render_ep.sh EDIT.tsx FRAMES OUT.mp4 AUDIO.wav [cuts]` (300-frame chunks, every frame checked); looks: `tools/raea/preview.sh`.
- Caches in our pipeline: physics bake (Blender rigid body → JSON), `paths.py` output, GLB exports; re-run when an input changes.
- Blender bakes: `bpy.ops.ptcache.bake_all(bake=True)`; GLB via `bpy.ops.export_scene.gltf(filepath=..., use_selection=True)`.
- Fast-render check = read raea's chunk logs (`media/_render/c*.log`) and run `frames_check.py`.

## NOTES
- Rule conflicts: none.

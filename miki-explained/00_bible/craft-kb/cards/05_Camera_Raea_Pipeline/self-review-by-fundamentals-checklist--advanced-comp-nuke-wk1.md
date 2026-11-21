---
title: Self-review by walking the fundamentals, under several viewing transforms
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "3:26:38–3:35:00; 3:35:30–3:36:04; 4:43:30–4:45:14"
blender_version_source: n/a (Nuke, ACES/OCIO)
tool_target: raea
tier: principle
style_fit: Supports WORKING-RULES §4 gates and the independent-critic loop; the builder still never scores its own work.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: no first version is final; review against a fixed list (tracking, levels, grain, focus, lens effects, perspective, lighting, edge detail) and then ask a creative question ("how can this be more interesting?"). Idea: a correct comp holds up under every grade, so check it under the show LUT, raw, sRGB and a log view; numbers (sampled luminance) catch what eyes accept.

## STE_PROCEDURE
1. Render the current version and play it full screen under the show LUT (viewer set to raw so nothing double-applies).
2. Walk each fundamental in order and write a note for every miss (e.g. "no grain added", "defocus not matched to reference").
3. Scrub edges in motion at zoom; note darkening or pops frame by frame.
4. Sample luminance of related areas (sky ≈ 0.98 vs its reflection ≈ 0.82): a reflection may not be brighter than its source.
5. Ask the creative question; note improvements (highlight pops, real camera shake, film grain).
6. Check for black borders entering frame from transforms.
7. Switch the viewer to sRGB and log; in log look for super-blacks below the plate's darkest value.
8. Keep two note columns, "to address" and "addressed"; move each note as it is fixed.
9. Version up and A/B the new render against the previous one.

## AGENT_EXECUTION
### Source tool (Nuke)
Project: OCIO ACES config, Read colourspace scene_linear; Viewer process raw + `Vectorfield` (LUT) node; sample with Ctrl+Shift-drag; sticky notes (`<left>` tag left-aligns text).
### Blender / raea translation
- Our list: WORKING-RULES §4 gates + `tools/raea/frame_metrics.py` + the fresh-critic skill (independent scorer).
- raea grade variants to stress-test a still: render the same frame under `<ToneMapping mode="tony" />`, `"agx"` and `"aces"` and with `exposure={-1}` / `{+1}`; a correct scene stays coherent in all.
- Luminance sampling: read pixel values from the rendered PNG (Python PIL) for source vs reflection/glow consistency.
- Black-border check: the frame edges of every rendered frame (`frames_check.py`).

## NOTES
- Rule conflicts: none; note that the critic must be a separate agent (WORKING-RULES §7.5).

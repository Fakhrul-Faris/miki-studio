---
title: High-pass + offset tracker for low-contrast or occluded features
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "2:06:01–2:12:38"
blender_version_source: n/a (Nuke)
tool_target: principle-only
tier: principle
style_fit: Only applies if we ever track real footage (user-shot B-roll, a phone recording) to attach raea or 2D overlays; no conflict.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | principle-only

## CREATIVE_INTENT
Principle: a tracker needs contrast; a high-pass filter turns faint texture (a dirt mark, wrinkles in a green screen) into a trackable pattern. Idea: when a feature leaves frame or slips, keep the same track alive by offsetting it onto a neighbouring feature ("death by a thousand cuts") instead of starting a new track.

## STE_PROCEDURE
1. Before you track, denoise the plate; a high-pass on a noisy plate chatters.
2. Add a high-pass filter to the denoised plate; raise blur size and contrast until faint detail reads.
3. Track on the high-pass branch only; apply the result to the original plate.
4. Enable "adjust for luminance changes" on every tracker.
5. Start at a frame where the feature is clear; track backwards, then forwards.
6. When the track starts to slip, delete keyframes from the slip onward.
7. Ctrl-drag the pattern box to a nearby high-contrast feature (offset) and continue tracking.
8. Repeat the offset until the frames you need are covered; drop a segment early if it looks slippy.
9. Inspect at ~500 % zoom; a track that holds there holds at 100 %.
10. Verify with a stabilize; ignore hitches on frames where nothing is replaced.

## AGENT_EXECUTION
### Source tool (Nuke)
`Read (denoised EXR)` → `HighPass` (gizmo; blur size, contrast amount) → `Tracker` (adjust for luminance changes on; offset with Ctrl-drag) → `Transform (match-move)` on the original branch → `Tracker` in stabilize mode to check.
### Blender / raea translation
- Blender Movie Clip Editor: `bpy.ops.clip.add_marker_at_click` / `bpy.ops.clip.track_markers(backwards=True, sequence=True)`; set `clip.tracking.settings.default_pattern_match = 'KEYFRAME'` (~), and preprocess with `track.use_red/green/blue_channel` or a pre-filtered proxy clip; offset = `bpy.ops.clip.disable_markers` + new track continuing.
- raea: no equivalent (raea does not track footage; tracked data would be imported as JSON and read per frame, as `paths.py` data is).

## NOTES
- STT fix: "too detractable" → "2D trackable".
- Visual gaps: exact high-pass slider values not spoken.
- Rule conflicts: none.

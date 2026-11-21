---
title: Audio first, then shot list — cut the storyboard to the track's segments
bucket: 05_Camera_Raea_Pipeline
source: "Making a Car Animation in Blender!.txt"
source_time: "01:50–04:14"
blender_version_source: unknown
tool_target: principle-only
tier: full
style_fit: Matches our pipeline: the voice (vo_timeline.json) exists before the shot list, and every setup lands on a word; the music-segment logic becomes "setup per line/phrase".
---

## METADATA
05_Camera_Raea_Pipeline | n/a | principle-only (+ Blender VSE note)

## CREATIVE_INTENT
It is far easier to build shots to a finished soundtrack than to find audio that fits finished shots. The audio's structure decides the film's length, the number of shots and where each changes.

## STE_PROCEDURE
1. Before planning shots, list what the reference/competitor version is missing (video: design emphasis, the product's unique feature, a real hero shot).
2. Lock the audio first (video: a generated ambient/restless track cut down to 41 s).
3. Count the audio's segments and their lengths (video: 7 segments of ~6–7 s each).
4. Reserve the last segment for the logo/end card.
5. Assign one shot per remaining segment (video: 6 shots).
6. Give each shot one job: shots 1–3 build intrigue, shots 4–6 show the product.
7. End on a quieter shot after the busiest ones.
8. Load the audio into Blender before animating so events (lights switching on) land on the beat.

## AGENT_EXECUTION
Blender (timing reference only):
```python
import bpy
scn = bpy.context.scene
if not scn.sequence_editor: scn.sequence_editor_create()
scn.sequence_editor.strips.new_sound("VO", "//audio/vo.wav", channel=1, frame_start=1)
scn.use_audio_scrub = True
```
raea / our pipeline: the voice is the soundtrack. Build the shot list from `audio/vo_timeline.json` (word times), one setup every 2–3 s on a word, the last beat = Meikigo end card with the signature sound. In TSX, put each setup in `<Sequence from={wordFrame} durationInFrames={n} layout="none">` and time events to word frames.

## NOTES
- Deprecated: Blender 5.0 renames VSE `sequences` → `strips` (`sequence_editor.strips.new_sound`).
- Visual gaps: the storyboard sketch is shown only.
- Rule conflicts: the video's "add spicy transitions in the editor" step — conflict: no generic transitions; joins are built from scene objects (camera flights, morphs). AI-generated music: our SFX/bed rules are sparse; music is not the master clock, the voice is.
- bpy fixed for 5.3: sequence_editor.sequences → .strips.

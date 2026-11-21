---
title: Time shots by counting frames to the beat in the edit, then set Blender keyframes to land on it
bucket: 05_Camera_Raea_Pipeline
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "1:43:59–1:44:34, 2:01:47–2:02:29, edit 2:51:48–2:53:17, 3:04:21–3:06:11"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Same idea as Style D "change on the spoken word" — replace the music beat with word timings (kit `words`/`w()`).
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.3 | Blender bpy + raea

## CREATIVE_INTENT
Build the edit and the 3D in parallel: lay the music under the already-rendered shots, count frames from the cut to the next
beat, and make the new shot's key action land there (7-frame camera move to the beat; 39 frames to a drop, minus 2 frames because
the action reads earlier than it lands).

## STE_PROCEDURE
1. Place the music and the previous renders on the edit timeline at 24 fps; pick a section with a clear beat.
2. From the planned cut point, count frames to the next beat (or hi-hat/snare) with the arrow keys.
3. In Blender, put the key "arrival" keyframe at that frame count (author: camera settles at frame 7; swing ends at 37 = 39 − 2).
4. Render, drop into the edit, and nudge by single frames; shift the music rather than re-render when possible.
5. Before final export, set the edit's Out point one frame back from the last frame (Resolve places it one frame late → a black frame).
6. For a looping ad, cut the music back to its start at the end so it feels looped.

## AGENT_EXECUTION
- Blender: `scn.render.fps = 24; scn.frame_end = beat_frames`; place keys with `keyframe_insert(..., frame=beat_frames - 2)`.
- raea: key actions on word frames instead of beats: `w("L03", "profit")` (kit/ui.tsx words timeline) gives the frame of the
  word; set `interpolate(f, [w(...) - 12, w(...)], ...)` so the move lands on (or ~2 frames before) the word.

## NOTES
- Deprecated: none.
- Visual gaps: the beat positions are audible only.
- Rule conflicts: none; for us the "beat" is the spoken word. Music downloaded from YouTube (ytmp3) must be licensed for
  commercial use — the author warns; use licensed beds only.
